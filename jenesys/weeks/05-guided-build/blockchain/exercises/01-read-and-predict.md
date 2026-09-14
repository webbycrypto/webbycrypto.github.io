# Exercises: read and predict

[← Back to Week 5 (Blockchain track): Guided build](../README.md)

These are not full contracts, and you're not asked to fix or deploy anything here. Each snippet below is a small, isolated piece of Solidity. For each one:

1. Read it slowly, out loud if that helps.
2. Write down, in your own words, what it's supposed to do.
3. Write down what's actually wrong with it, and what a specific bad outcome would look like if someone exploited it.

Only after you've done that for a snippet, read the explanation underneath it. If you find yourself wanting to peek early, that's a sign to slow down, not a sign the exercise is too hard. Snippets 1 through 3 map directly onto the three failure modes from `notes/04-failure-modes.md`, in the same order. Snippets 4 through 6 are a second pass over the same three failure modes, each one a genuinely different concrete scenario from its first-pass counterpart, so recognizing the shape matters more than remembering the specific example.

---

## Snippet 1

```solidity
mapping(address => bool) public eligible;

function setEligible(address holder, bool value) external {
    eligible[holder] = value;
}
```

**What does this function do, and what's wrong with it?**

<details>
<summary>Explanation (read only after you've made your own guess)</summary>

The function does exactly what it looks like: it sets whether an address is eligible. The problem is that literally anyone can call it, for any address, including addresses that aren't their own. There is no `require` checking `msg.sender` against anything at all. A stranger could call `setEligible(theirOwnAddress, true)` and grant themselves eligibility with no permission check whatsoever, or call `setEligible(someoneElsesAddress, false)` purely to mess with another holder's status. This is the "access control mistake" failure mode: a state-changing function with no lock on the door at all.

</details>

---

## Snippet 2

```solidity
mapping(address => uint256) public balances;

function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "insufficient balance");

    (bool sent, ) = msg.sender.call{value: amount}("");
    require(sent, "transfer failed");

    balances[msg.sender] -= amount;
}
```

**Predict specifically: what happens if `msg.sender` is a contract whose fallback function calls `withdraw` again, before the first call finishes?**

<details>
<summary>Explanation (read only after you've made your own guess)</summary>

The balance check passes, the funds get sent via the external call, and control passes to the caller's fallback function *before* `balances[msg.sender] -= amount;` ever runs. If that fallback function calls `withdraw` again immediately, the `require` at the top checks the same, still-unchanged balance, and passes again, so more funds go out. This can repeat multiple times, nested, before the very first call ever reaches its own bookkeeping line. This is reentrancy: the external call (`.call{value: amount}("")`) happens before the effect (decrementing the balance), leaving a window where stale state gets read and trusted again. The fix is to reorder the last two lines: decrement `balances[msg.sender]` before making the external call.

</details>

---

## Snippet 3

```solidity
mapping(uint256 => uint256) public tokensByIndex;

function decreaseTokens(uint256 index, uint256 amount) external {
    unchecked {
        tokensByIndex[index] -= amount;
    }
}
```

**Predict specifically: what happens if `amount` is larger than the current value of `tokensByIndex[index]`?**

<details>
<summary>Explanation (read only after you've made your own guess)</summary>

Outside of an `unchecked` block, Solidity 0.8+ would catch this automatically: subtracting a larger `uint256` from a smaller one would revert the whole transaction, with no state change at all. Inside `unchecked {}`, that automatic protection is deliberately switched off. Since `uint256` can't represent a negative number, the subtraction wraps around to a value near the top of the `uint256` range, a number close to `2^256 - 1`, instead of reverting or going negative. `tokensByIndex[index]` would appear to suddenly hold an enormous value. This is the odometer problem: the true, honest math produced a value smaller than zero, so the fixed-size number wrapped around to the opposite end of its range instead. Removing the `unchecked` block (or narrowing exactly what's inside it) restores the automatic revert-on-underflow behavior.

</details>

---

## Snippet 4

```solidity
address public owner;
mapping(address => uint256) public credits;

modifier onlyOwner() {
    require(msg.sender == owner, "not owner");
    _;
}

function grantCredits(address who, uint256 amount) external onlyOwner {
    credits[who] += amount;
}

function revokeCredits(address who, uint256 amount) external {
    credits[who] -= amount;
}
```

**What's wrong here, and how is it different from Snippet 1's problem?**

<details>
<summary>Explanation (read only after you've made your own guess)</summary>

`grantCredits` is properly protected: the `onlyOwner` modifier runs first, so only the owner can hand out credits. `revokeCredits` has no modifier at all, and no `require` of its own, so any address on the network can call it against any other address's credits. This is the "subtler version" the access-control note named directly: a contract that looks protected at a glance, since one of its two sensitive functions clearly has a lock on it, but is exactly as exploitable as having no access control at all for the one function that was missed. A stranger could call `revokeCredits(someoneElsesAddress, someoneElsesEntireBalance)` and drain another address's recorded credits down to zero, with zero permission to touch that address's record at all. Unlike Snippet 1, where no function had any lock, the bug here is not "forgot access control entirely," it's "protected the function that looked more important, and forgot its sibling."

</details>

---

## Snippet 5

```solidity
mapping(address => bool) public claimed;
uint256 public rewardAmount = 1 ether;

function claimReward() external {
    require(!claimed[msg.sender], "already claimed");

    (bool sent, ) = msg.sender.call{value: rewardAmount}("");
    require(sent, "transfer failed");

    claimed[msg.sender] = true;
}
```

**Predict specifically: what happens if `msg.sender` is a contract whose fallback function calls `claimReward` again, before the first call finishes? Is this the same bug as Snippet 2, or a different one?**

<details>
<summary>Explanation (read only after you've made your own guess)</summary>

Same failure mode as Snippet 2 (reentrancy), a different concrete shape. Here the state being protected isn't a numeric balance, it's a boolean flag meant to mean "this address has already claimed, exactly once." `claimed[msg.sender]` is still `false` at the moment the external call goes out, because `claimed[msg.sender] = true;` is the very last line, after the transfer. A contract calling in as `msg.sender` can, from its own fallback function, call `claimReward()` again before that last line ever runs, and `require(!claimed[msg.sender], ...)` still passes, since the flag hasn't flipped yet. Each reentrant call sends another `rewardAmount`, potentially many times, all before the first call ever marks the claim as used. The fix is the same reordering principle as Snippet 2's, checks, then effects, then interactions: set `claimed[msg.sender] = true;` immediately after the `require` and before the external call, so any reentrant attempt sees the claim already marked used and reverts on the very first line.

</details>

---

## Snippet 6

```solidity
uint8 public dailyVisitorCount;

function recordVisitor() external {
    dailyVisitorCount += 1;
}

function resetDaily() external {
    dailyVisitorCount = 0;
}
```

**Predict specifically: `dailyVisitorCount` is currently `255`, its maximum possible value as a `uint8`, and nobody has called `resetDaily()` yet. What happens when `recordVisitor()` is called one more time? Is this the same outcome as Snippet 3, or a different one?**

<details>
<summary>Explanation (read only after you've made your own guess)</summary>

This is not the same outcome as Snippet 3, and the difference is the entire point of this snippet. There is no `unchecked` block anywhere here. `dailyVisitorCount += 1;` is ordinary, checked arithmetic, and Solidity 0.8's automatic overflow protection applies to every integer size, not just `uint256`; `uint8` included. Adding 1 to 255 (the largest value a `uint8` can hold) would overflow, so the call reverts, with no state change, exactly the way a failed `require` would. `dailyVisitorCount` stays at 255 until someone calls `resetDaily()`. This is worth sitting with precisely because it's tempting to assume overflow protection only shows up when you see the word `unchecked` written somewhere. It doesn't; `unchecked` is the one way to turn the protection *off*. Left alone, as it is here, the compiler's default behavior already prevents the odometer problem from happening silently, on any integer size, everywhere in your contract that isn't explicitly marked otherwise.

</details>

---

## Before you move on

If any of your six guesses were wrong, don't just note that and move on. Go back to the matching section of `notes/04-failure-modes.md` and re-read it with that specific snippet in mind. The goal of this exercise isn't a score, it's making sure these three failure shapes, in more than one concrete disguise each, are recognizable on sight before you read or write `project/contracts/AssetRegistry.sol`, which was written specifically to avoid all three.
