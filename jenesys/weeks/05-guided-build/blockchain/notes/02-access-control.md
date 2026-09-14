# Access control: locking specific doors, not the whole building

[← Back to Week 5 (Blockchain track): Guided build](../README.md)

## The problem this solves

Anyone with the network's RPC endpoint (which, on a public testnet, is anyone at all) can attempt to call any function on `AssetRegistry`. The contract does not run on your machine, behind your firewall, reachable only by people you trust. It runs on a public network, and its functions are, by default, callable by anybody who sends a correctly formatted transaction.

That's a very different starting posture from a Python function you write and only you ever call. If `registerHolder` did nothing to check who was calling it, any address on the network could register itself as an eligible holder with any balance it wanted, or overwrite someone else's eligibility flag out of spite. The contract has to defend itself, in its own code, every single time, because there is no outer layer (no login page, no firewall, no private network) doing that job for it.

## `msg.sender`: an identity you can actually trust

Every function call arrives with a special, built-in value: `msg.sender`, the address that sent the transaction (or, for an internal call, the address that made the call). This is worth pausing on, because it's not like an HTTP header a client could simply lie about. `msg.sender` is derived from the cryptographic signature on the transaction, verified by the network's own consensus process before your contract code ever runs. By the time your `require` statement checks it, the network has already confirmed that whoever holds the private key for that address really did authorize this exact call. You don't have to verify the signature yourself; the platform did that for you. You only have to decide what to do with the identity it hands you.

## The analogy: one shared building, some locked doors

Think of the whole contract as a building anyone can walk into. Some rooms (the `view` functions like `getHolder`, and any function with no access restriction) have open doors: anyone can walk in and look around, and no harm is done because nothing changes. Other rooms (`registerHolder`, `updateBalance`, `setEligibility`) have real consequences if the wrong person walks in and starts moving furniture, so they get a locked door with exactly one key: the owner's.

In code, that lock is a `require` statement checking `msg.sender` against the address you've designated as the owner:

```solidity
address public owner;

modifier onlyOwner() {
    require(msg.sender == owner, "AssetRegistry: caller is not the owner");
    _;
}

constructor() {
    owner = msg.sender;
}
```

The `constructor` runs exactly once, at deployment, and its `msg.sender` is whoever deployed the contract, that is, you, or in a real system, your backend's own deploying account. That's how `owner` gets set in the first place: not by a special admin panel, just by recording who happened to send the deployment transaction.

## Modifiers: writing the lock once, reusing it everywhere

A `modifier` is a reusable chunk of `require` logic you can attach to any function, instead of retyping the same check inside every function body. `onlyOwner` above is a modifier. The `_;` inside it is a placeholder that means "now run the actual function body." Attaching it to a function looks like this:

```solidity
function registerHolder(address holder, bool eligible, uint256 initialBalance) external onlyOwner {
    // ... function body runs only after the require() inside onlyOwner passes
}
```

When someone who isn't the owner calls `registerHolder`, execution never reaches the function body at all. The `require` inside `onlyOwner` fails first, the whole transaction reverts (as if it never happened, though the caller still pays gas for the attempt, more on that in the project walkthrough), and none of the function's own logic ever runs.

## Why this specific contract needs it

Every function in `AssetRegistry` that changes state (`registerHolder`, `updateBalance`, `setEligibility`) is marked `onlyOwner`. Concretely, this is protecting exactly the fields the Week 8 acceptance-gate capstone will care about: eligibility and holder status. If anyone could flip their own `eligible` flag to `true`, the registry would be worthless as a source of truth. Access control isn't decoration here; it's the entire reason the registry can be trusted by anything reading it later, including your own future backend service.

## A mistake worth naming now: partial protection

A subtler version of "forgot the lock entirely" is protecting some sensitive functions and missing a sibling one. Imagine a contract that correctly guards `registerHolder` and `updateBalance` with `onlyOwner`, but the person writing it adds `setEligibility` later, in a hurry, and forgets to copy the modifier over. The contract looks protected at a glance (two out of three functions have the lock), but it has exactly the same real-world consequence as having no access control at all for the one function that matters most to a compliance-style use case: anyone can grant or revoke their own eligibility.

The habit to build, and the one the failure-modes note leans on directly, is this: **for every single function that changes state, explicitly decide and write down who is allowed to call it.** Don't assume a function is safe because a similar-looking function nearby is protected. Check each one on its own.

## What access control is not

It's worth being precise about what `onlyOwner` does and doesn't buy you. It restricts who can call specific functions. It does nothing about:

- what happens if the owner's private key is lost or stolen (there's no recovery mechanism here; a real system might add one, like transferring ownership to a new address, but that's beyond this contract's scope),
- whether the owner itself makes a good decision (the contract will happily let the owner register an obviously wrong balance; access control stops the wrong caller, not a wrong decision by the right caller), or
- anything about the order in which operations happen within a single function, which is exactly what the next note, on failure modes, covers.

Access control answers "who." The next note answers "what can still go wrong even when the 'who' is correct."
