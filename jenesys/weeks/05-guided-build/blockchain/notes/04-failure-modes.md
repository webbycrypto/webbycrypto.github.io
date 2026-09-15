# Common failure modes: reentrancy, overflow, and access control mistakes

[← Back to Week 5 (Blockchain track): Guided build](../README.md)

## TL;DR

This page covers three specific, nameable contract bugs and the habit that prevents each one.

- Every state-changing function needs an explicit, correct check on who can call it. Don't assume a neighboring function's protection covers this one too.
- If a function sends funds (or otherwise hands control to another contract) before it finishes updating its own state, an attacker's contract can call back in while your records still look unchanged, and drain more than it should. That's reentrancy.
- The fix is checks, then effects, then interactions: confirm the conditions first, update your own state second, and only make the external call last, once nothing stale is left for anyone to exploit.
- Solidity 0.8+ automatically reverts a transaction if arithmetic would overflow or underflow (like a subtraction dropping below zero), instead of silently wrapping around, unless you deliberately opt out with `unchecked`.

```solidity
function withdraw(uint256 amount) external onlyRegisteredUser {       // access check: who can call this at all
    require(balances[msg.sender] >= amount, "insufficient balance");  // check: confirm the conditions first

    balances[msg.sender] -= amount;  // effect: state updated before any external call (also where Solidity 0.8+
                                      // auto-reverts if this ever underflowed past zero)

    (bool sent, ) = msg.sender.call{value: amount}("");  // interaction: happens last, so a reentrant callback
    require(sent, "transfer failed");                    // from msg.sender would already see the reduced balance
}
```

## Why this note exists before you write anything complex

It would be easy to treat smart contract security as an advanced topic to worry about later, once the "real" skills are in place. That ordering is backwards, and this program deliberately avoids it. A contract's mistakes are not like a typical Python script's mistakes: there's usually no way to patch a deployed contract, no way to roll back a transaction that already went through, and the thing being protected is often, in a real deployment, actual money. Once you understand what these three failure modes actually are, in plain language, you'll notice you're already watching for them every time you write a function, the same automatic way you already watch for an off-by-one error in a loop. That's the goal: a habit, not a scary warning label.

None of this should feel intimidating. Every one of these bugs comes from a small, specific, nameable mistake in *ordering* or *checking*, not from some deep mystery. Let's take them one at a time.

## Reentrancy: handing over the safe combination before locking the safe

**The setup.** Imagine a withdraw function that (1) checks you have enough balance, (2) sends you the money, and only then (3) records that your balance went down:

```solidity
function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "insufficient balance");

    (bool sent, ) = msg.sender.call{value: amount}(""); // step 2: send first
    require(sent, "transfer failed");

    balances[msg.sender] -= amount; // step 3: record it after
}
```

**Why step 2 is dangerous.** `msg.sender.call{value: amount}("")` doesn't just move funds; it hands control of execution to whatever is at that address. If `msg.sender` is a normal externally owned account (a person's wallet), nothing unusual happens. But if `msg.sender` is a *contract*, that contract can define a special fallback function that runs automatically the instant it receives funds, and inside that fallback function, it is free to do anything, including calling `withdraw` again, immediately, before the original call has finished executing step 3.

Because step 3 (the bookkeeping) hasn't run yet, `balances[msg.sender]` still shows the original, un-decremented balance. The `require` check at the top of the second call passes, because as far as the contract's state is concerned, no withdrawal has happened yet. The attacker's fallback function calls `withdraw` again. And again. Each nested call sends more funds out, each one still sees the stale, unchanged balance, and the whole chain can keep going, nested many calls deep, until the contract runs out of funds entirely, all before the very first call ever reaches its own step 3.

**The analogy this note promised.** Picture a bank teller handing you your withdrawal in cash first, and only writing the new balance into the ledger after you've walked away with the money. While the teller's hand is still on the cash, before the ledger is touched at all, you ask "actually, can I withdraw again?" The teller checks the ledger, sees your original, still-unchanged balance, and hands you more cash. You ask again. And again. The ledger never had a chance to catch up, because it was always updated *last*. That's reentrancy: **an external call happens before the contract finishes updating its own records, and the gap between those two moments is where an attacker calls back in and exploits the stale state.**

**The fix.** Update your bookkeeping *before* making any external call, not after: checks, then effects (state updates), then interactions (external calls). This is called the checks-effects-interactions pattern:

```solidity
function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "insufficient balance"); // check

    balances[msg.sender] -= amount; // effect, happens BEFORE the external call

    (bool sent, ) = msg.sender.call{value: amount}(""); // interaction, happens last
    require(sent, "transfer failed");
}
```

Now, if the attacker's fallback calls back into `withdraw`, the balance has already been reduced, so the second call's `require` fails honestly, and the reentrant chain stops immediately.

**Does `AssetRegistry` have this problem?** No, and it's worth understanding exactly why not, rather than just trusting that it doesn't: none of `AssetRegistry`'s functions send funds, call another contract, or make any external call at all. They only read and write the contract's own state. There is no step where control gets handed to someone else's code, so there's no gap for an attacker to jump into. Reentrancy specifically requires an external call; recognizing which of your functions make one (usually anything sending value, or calling a function on another contract or an interface) is the actual skill, more than memorizing the fix.

## Integer overflow and underflow: the odometer problem

**The setup.** `uint256` (an unsigned integer) can represent a huge range of values, but it is still a fixed-size number under the hood, not an infinitely growing one. If you try to subtract more than a `uint256` currently holds, or add past its maximum, the *mathematically* correct answer doesn't fit, and older versions of Solidity would silently wrap around to the other end of the range instead of raising any error at all. Subtracting 1 from a `uint256` holding `0` didn't give you `-1` (unsigned integers can't represent negative numbers at all); it wrapped around to a number close to `2^256 - 1`, an almost incomprehensibly large value.

**The analogy.** A car's mechanical odometer with six digits rolls from `999999` back to `000000` once the car has driven one more mile. The car hasn't suddenly become brand new, but the display now says it has zero miles on it. Anyone trusting that number at face value, without knowing wraparound is possible, would draw a wildly wrong conclusion. Integer overflow in a contract is the exact same phenomenon, applied to a balance, a supply count, or any other on-chain number, except the "wildly wrong conclusion" might be "this account has an enormous amount of a valuable token," rather than just an odd mileage reading.

**Where Solidity stands today.** Since Solidity 0.8.0 (the version family this program uses throughout), the compiler adds automatic overflow and underflow checks to ordinary arithmetic. If an operation would overflow or underflow, the transaction now **reverts** by default, exactly the same way a failed `require` does, instead of silently wrapping. This is a real, meaningful safety improvement, and it's why we're not asking you to hand-roll safety checks around every addition and subtraction.

**Why the concept still matters even though the compiler now protects you.** Three reasons, and each is concrete, not hypothetical:

1. Solidity 0.8+ still lets you explicitly opt back out, with an `unchecked { ... }` block, specifically because the automatic checks cost a small amount of extra gas on every arithmetic operation, and sometimes a contract author wants to skip that cost in a spot they're confident is already safe for other reasons. If you ever see `unchecked`, or write one yourself, you are personally taking back exactly the responsibility the compiler was otherwise handling for you.
2. An enormous amount of real value still sits in contracts written before 0.8, or written in other languages and other ecosystems entirely, where this protection either doesn't exist or has to be added by hand (older code commonly imported a library called `SafeMath` specifically to get this behavior manually). Reading old or unfamiliar contract code without understanding what you're looking for here means missing a real, historically exploited bug class.
3. Understanding *why* the compiler now reverts is the same thing as understanding what it's reverting to prevent. "The compiler handles it" is a satisfying answer only if you already know what "it" is.

**Does `AssetRegistry` have this problem?** `updateBalance` takes a complete new balance as an argument and simply assigns it (`holders[holder].balance = newBalance;`); there's no addition or subtraction happening, so there's nothing to overflow. If you ever extend this contract with a function like "add this many tokens to the existing balance" (`holders[holder].balance += amount;`), you'd be relying on 0.8's automatic checks to catch a case where `amount` would push the balance past what a `uint256` can hold, or where a subtraction would try to go below zero. That reliance is fine, exactly as designed, as long as you know it's there and know when it stops being there (inside an `unchecked` block).

## Access control mistakes: the lock you forgot, or forgot to copy

This one was covered in depth in the access-control note, so this is a short, deliberate recap, because it belongs in the same list as the other two failure modes, not as a footnote to a different topic.

**The mistake:** writing a function that changes sensitive state, `registerHolder`, `updateBalance`, `setEligibility`, or anything like them, without a `require(msg.sender == owner, ...)` check (or the `onlyOwner` modifier that wraps one). Without it, the function is fully public to anyone on the network, and "anyone on the network" for a public testnet or mainnet contract genuinely means anyone, not "anyone on our team."

**The subtler version:** protecting most of your sensitive functions, but missing one, often because it was added later, in a hurry, and the modifier didn't get copied over. A contract that protects two out of three sensitive functions is not "mostly safe." It's exactly as exploitable, for that one function, as a contract with no access control at all.

**The habit:** for every function you write that changes state, stop and explicitly answer "who is allowed to call this," and write that answer into the code as a check, rather than assuming it's obvious or that a nearby function's protection covers it too. This is genuinely the cheapest of the three failure modes to prevent, because the fix is a one-line check you write deliberately, not a subtle reordering of operations or a numeric edge case. That's exactly why it's worth making into reflex before moving on to anything more complex than `AssetRegistry`.

## The pattern across all three

Notice what all three failure modes have in common: each one is a small, specific, checkable question you can ask about a piece of code, not a vague sense of "something might be wrong." *Does this function make an external call before updating its own state? Does this arithmetic operation happen inside `unchecked`, and if so, could it realistically overflow or underflow? Does this state-changing function have an explicit, correct check on `msg.sender`?* Asking those three questions about every function you write, from here on, is most of what "security is a habit, not an afterthought" actually means in practice.
