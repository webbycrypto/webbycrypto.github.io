# State and storage: why a contract "remembers" things

[← Back to Week 5 (Blockchain track): Guided build](../README.md)

## The problem this solves

In every Python script you've written so far, variables live in memory for as long as the script is running, and vanish the instant it ends. If you want a value to survive between runs, you write it to a file or a database yourself. That's such a normal fact of programming that it's easy to forget it's a choice, not a law of nature.

A smart contract doesn't work that way, and the difference matters enough that it needs its own name: **state**.

## What "state" means here

A contract's **state variables** are the variables declared at the top level of the contract, outside any function. Look at the shape of `AssetRegistry` (the full contract is in `project/contracts/AssetRegistry.sol`, but you only need this piece for now):

```solidity
contract AssetRegistry {
    address public owner;

    struct Holder {
        uint256 balance;
        bool eligible;
        bool registered;
        uint256 lastUpdated;
    }

    mapping(address => Holder) public holders;

    // functions go here
}
```

`owner` and `holders` are state variables. They are not local to any one function call. Once `registerHolder` writes a value into `holders[someAddress]`, that value exists as part of the contract's permanent record on the network. It's still there tomorrow, next year, whether or not anyone ever calls the contract again. Every full node running that network is keeping a copy of it, in sync, forever (or until the network itself stops existing).

That's the core idea: **state is data the network itself remembers, not data your script remembers.** Your Python script is a visitor that shows up, asks a question or requests a change, and leaves. The contract's state is what's still there after every visitor has gone home.

## Why this costs money and a normal variable doesn't

Every node on the network has to store and maintain a copy of contract state. That's real, ongoing cost, spread across thousands of machines, and someone has to pay for it or the network would be flooded with junk data for free. The payment mechanism is **gas**: every operation that changes state costs gas, and writing to a state variable (a `mapping` or any other state variable) is one of the more expensive things you can do in a contract, specifically because of that permanence.

Reading state back (a `view` function, called without sending a transaction) doesn't change anything, so it doesn't cost gas when you call it from outside the network the way `getHolder` does in the project script. Writing does, every time, because you are asking every node, permanently, to remember something new.

This is the single biggest mental shift from ordinary Python: **assignment is not free.** `balance = 500` in Python costs nothing extra. `holders[holder].balance = 500` inside a contract function costs gas, because it's not really "setting a variable," it's "asking a global, permanent, distributed ledger to update its records and keep them that way forever."

## storage, memory, and why `getHolder` uses both

You'll see this line inside `getHolder`:

```solidity
Holder memory h = holders[holder];
```

`holders[holder]` on its own refers to the actual struct living in permanent **storage** (the expensive, permanent kind covered above). `Holder memory h = ...` copies that struct into a temporary, cheaper workspace called **memory**, that exists only for the duration of the function call and disappears afterward, exactly like a normal Python variable would. Reading a few fields off of `h` afterward inside the function is cheap; reading them directly off `holders[holder]` repeatedly would keep touching storage each time.

You don't need to memorize every rule of Solidity's storage/memory system yet. The habit worth building now is narrower: **whenever you see a state variable being read or written, ask "is this touching the network's permanent record, or a scratch copy that disappears when the function returns?"** That question will make every gas cost, every failure mode, and every access-control rule in this program make more sense, because almost all of them come back to protecting or economizing on that one distinction.

## Mappings answer "no" by default, which is why `registered` exists

`mapping(address => Holder)` behaves like a Python dictionary in one way (you look values up by key) and differs from one in an important way: a Solidity mapping has no concept of a missing key. Every possible address, even one that has never been touched, already "has" a `Holder` struct, silently defaulted to `balance: 0, eligible: false, registered: false, lastUpdated: 0`. There's no `KeyError`, no `.get(key, default)`, nothing to catch.

That's exactly why `AssetRegistry` has an explicit `registered` boolean field instead of just checking whether `balance` is nonzero. Without it, there would be no way to tell "this address was deliberately registered with a zero starting balance" apart from "this address was never registered at all." Any time you design a mapping like this, ask yourself the same question: is there a meaningful difference between "never set" and "set to the zero-like value," and if so, have you given yourself an explicit way to tell them apart?

## The free getter you didn't write

Because `holders` is declared `public`, Solidity automatically generates a read-only function for you that looks up a single entry, taking the mapping's key as an argument and returning the struct's fields. That's why, later, a web3.py script can call `contract.functions.holders(some_address).call()` even though nobody wrote a function named `holders` that takes an address and returns a tuple. The compiler wrote it for you, purely because of the `public` keyword. `owner` works the same way: `address public owner;` gives you a callable `owner()` for free.

## Why this note comes first

Access control (the next note) is really "who is allowed to trigger an expensive, permanent change to this state." Events (after that) are "a cheap side-note the network keeps about a state change, for code watching from outside." Reentrancy and the other failure modes are, almost without exception, about state being read or written in the wrong order relative to something else happening. Every one of those ideas assumes you already have a solid, intuitive answer to "what does it mean for a contract to remember something, and what does that cost." That's what this note was for.
