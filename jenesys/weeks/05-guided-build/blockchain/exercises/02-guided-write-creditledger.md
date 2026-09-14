# Guided walkthrough: write CreditLedger, line by line

[← Back to Week 5 (Blockchain track): Guided build](../README.md)

`00-guided-write-assetregistry.md` had you type AssetRegistry's genuinely new pieces: a struct, a mapping, an access-control modifier, one full state-changing function, all at once. That's a lot of new surface area in one sitting. This exercise isolates just one piece of it, a mapping plus an access check, on its own, in a contract small enough to type and understand completely in a few minutes, before you move on to `01-read-and-predict.md` or the stretch goals at the end of `../project/README.md`.

`CreditLedger` has one job: let the owner hand out credits to any address, and let anyone read anyone's balance. No struct (a single `uint256` per address is little enough data that a struct would just be overhead), no events at all (events were already covered in depth by `notes/03-events.md` and by AssetRegistry itself; leaving them out here keeps this exercise's one new rep focused on mapping plus access control, not on re-explaining something you already have). It also skips the `modifier` keyword on purpose and writes the access check as a plain `require` directly inside the function, so you see the exact same rule, only the owner may call this, expressed a second way, not just retyped through the same abstraction you already used for AssetRegistry.

Create `../project/contracts/CreditLedger.sol` and build it up below, running `ape compile` from the `project/` folder after every step.

## Step 1: the header, the contract, and the owner

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CreditLedger {
    address public owner;

    constructor() {
        owner = msg.sender;
    }
}
```

Same shape as AssetRegistry's opening: `owner` is set once, at deployment, to whoever sent the deployment transaction, and stays fixed after that; nothing in this contract ever changes it. Compile.

## Step 2: a mapping, with no struct behind it

```solidity
    mapping(address => uint256) public credits;
```

AssetRegistry's mapping pointed at a `Holder` struct because a holder needed four different pieces of data tracked together. Here, one address needs exactly one number, so the mapping's value type is just `uint256` directly; no struct required. `public` still gives you the same free getter as before: `credits(someAddress)` is callable from outside with no function of your own written for it. Compile. A mapping with nothing written into it yet is completely valid; every address already reads back as `0`, the same default-value behavior `notes/01-state-and-storage.md` covered for AssetRegistry's `holders` mapping.

## Step 3: the one function that changes state, access check inline

```solidity
    function addCredits(address recipient, uint256 amount) external {
        require(msg.sender == owner, "CreditLedger: caller is not the owner");
        require(recipient != address(0), "CreditLedger: recipient is the zero address");

        credits[recipient] += amount;
    }
```

Compare this `require(msg.sender == owner, ...)` line to `onlyOwner`'s body back in AssetRegistry: it is the identical check, character for character in what it tests, just written directly inside the function instead of pulled out into a reusable modifier. That's a legitimate choice on a contract with only one state-changing function; there's nothing to reuse a modifier *across* yet, since a modifier only starts earning its keep once more than one function needs the same check. `credits[recipient] += amount;` is ordinary checked arithmetic; Solidity 0.8's automatic overflow protection covers it with no extra code from you (see `notes/04-failure-modes.md`, and Snippet 6 in `01-read-and-predict.md` if you want the overflow angle on a line that looks just like this one, on a smaller integer type). Compile one final time.

## Step 4 (optional continuation): add a second owner-only function, then earn the modifier

Everything above is a complete, working contract. This step is here for the exact moment the "what to notice" section below describes before you've read it: the moment a second owner-only function actually shows up, and a modifier stops being an abstraction you're taking on faith and starts being something you reach for because retyping the same `require` a second time would visibly be repeating yourself.

Add a second function:

```solidity
    function removeCredits(address holder, uint256 amount) external {
        require(msg.sender == owner, "CreditLedger: caller is not the owner");
        credits[holder] -= amount;
    }
```

Compile. Notice you just typed `require(msg.sender == owner, ...)` for the second time, word for word except the error message. Now extract it:

```solidity
    modifier onlyOwner() {
        require(msg.sender == owner, "CreditLedger: caller is not the owner");
        _;
    }
```

Add `onlyOwner` to both `addCredits` and `removeCredits` in place of their inline `require(msg.sender == owner, ...)` lines (keep each function's *other* `require`, like `addCredits`'s zero-address check; that one isn't about who's calling, so it isn't the modifier's job). Compile a final time and confirm nothing about either function's behavior changed, only where the access check lives.

This is the same refactor AssetRegistry already did for you, before you ever saw its source; here, you're the one deciding the exact moment it's worth doing, which is the part that doesn't come for free just from reading a finished contract someone else already refactored.

## What to notice, now that it's small enough to see all at once

- After Step 3, `CreditLedger` was already deployable and fully functional, with three lines of real logic inside its one state-changing function. AssetRegistry does the same underlying job, at a larger scale: three state-changing functions instead of one, four tracked fields instead of one, three events instead of zero. Nearly everything that made AssetRegistry feel like a lot at once was repetition of this exact mapping-plus-access-check shape, not new ideas layered on top of each other.
- Step 4 is the payoff of doing this small: you got to feel the exact moment a `modifier` earns its keep, right as you typed the same `require` a second time, instead of only ever seeing modifiers already-extracted in a finished contract you didn't write. That's the same "extract the repeated logic once it's actually repeated" instinct from Week 2's `organizing-your-code.md`, just showing up in Solidity instead of Python.
- Nothing in this project deploys `CreditLedger.sol` automatically. If you want the rep of actually seeing it live on a testnet, deploy it the same way you deployed AssetRegistry in `../project/README.md`'s Step 1: a fresh, tiny deploy script pointed at `project.CreditLedger` instead of `project.AssetRegistry` will do it, and writing that script yourself, from the shape of `../project/scripts/deploy.py`, is good, cheap practice for the low-scaffolding weeks coming up, where nobody hands you a script to start from at all. Otherwise, you can delete the file, or leave it; nothing else in this project references it.
