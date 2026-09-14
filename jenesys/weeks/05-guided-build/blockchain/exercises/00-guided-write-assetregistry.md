# Guided walkthrough: write AssetRegistry, line by line

[← Back to Week 5 (Blockchain track): Guided build](../README.md)

Week 4's `00-guided-write-greeter.md` had you type a trivial contract with one state variable and two functions. `AssetRegistry` is bigger: a struct, a mapping, an access-control modifier, and three state-changing functions instead of one. `../project/README.md` explains the finished version; this exercise has you type the genuinely new pieces yourself first, compiling after each one.

Create `../project/contracts/AssetRegistryPractice.sol` and build it up below, running `ape compile` from the `project/` folder after every step. You won't retype all three state-changing functions; once you've typed the first one in full, the other two follow the identical shape, and you'll read them directly from the real file instead.

## Step 1: the header, the contract, and the owner

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AssetRegistryPractice {
    address public owner;
}
```

Same license and pragma lines as Greeter. `address` is Solidity's type for an account or contract identifier, a new type you haven't declared a variable of yet; `notes/01-state-and-storage.md` covers it if that's unfamiliar. `public` here (unlike Greeter's `private greeting`) means Solidity auto-generates a free read function for this variable, so anyone can call `owner()` and get the current value back without you writing a getter yourself. Compile.

## Step 2: a struct, to group one holder's fields together

```solidity
    struct Holder {
        uint256 balance;
        bool eligible;
        bool registered;
        uint256 lastUpdated;
    }
```

A struct bundles related fields into one named type, the same "group related things together" instinct from Week 2's `organizing-your-code.md`, just as a language feature here instead of file layout. `registered` exists specifically so a mapping's default, all-zero entry can be told apart from a holder who was deliberately registered with a zero balance, which `notes/01-state-and-storage.md` explains in more depth. Compile. A struct declared but never used anywhere yet is completely valid.

## Step 3: a mapping, to store one Holder per address

```solidity
    mapping(address => Holder) public holders;
```

A mapping is Solidity's version of a dictionary: give it a key type and a value type, and it stores a `Holder` for every `address` that's ever been written to it, permanently, in contract storage. Compile.

## Step 4: the events

```solidity
    event HolderRegistered(address indexed holder, bool eligible, uint256 initialBalance, uint256 timestamp);
    event BalanceUpdated(address indexed holder, uint256 previousBalance, uint256 newBalance, uint256 timestamp);
    event EligibilityChanged(address indexed holder, bool eligible, uint256 timestamp);
```

Three events, the same idea as Greeter's single `GreetingChanged`, just one per kind of change this contract can make. Compile.

## Step 5: the access-control modifier

```solidity
    modifier onlyOwner() {
        require(msg.sender == owner, "AssetRegistryPractice: caller is not the owner");
        _;
    }
```

This is genuinely new: Greeter never restricted who could call `setGreeting`. A modifier is a reusable pre-check you attach to a function's declaration; `require(condition, "message")` reverts the whole transaction with that message if the condition is false, and `_;` is where the function's own body actually runs, once the check passes. `notes/02-access-control.md` covers this in depth if the shape feels unfamiliar. Compile.

## Step 6: the constructor

```solidity
    constructor() {
        owner = msg.sender;
    }
```

Runs once, at deployment, and sets `owner` to whoever deployed the contract. `msg.sender` here is filled in by the network as the deploying account, the same way it's filled in as the transaction sender inside any function. Compile.

## Step 7: one full state-changing function, using everything above

```solidity
    function registerHolder(address holder, bool eligible, uint256 initialBalance) external onlyOwner {
        require(holder != address(0), "AssetRegistryPractice: holder is the zero address");
        require(!holders[holder].registered, "AssetRegistryPractice: holder already registered");

        holders[holder] = Holder({
            balance: initialBalance,
            eligible: eligible,
            registered: true,
            lastUpdated: block.timestamp
        });

        emit HolderRegistered(holder, eligible, initialBalance, block.timestamp);
    }
```

`onlyOwner` (Step 5) runs before anything else here; a non-owner calling this reverts before reaching the first `require`. The two `require` lines guard against a real mistake (registering the zero address) and a real business rule (no double-registering), each with its own message, so a failed transaction tells you specifically which rule it broke. `holders[holder] = Holder({...})` writes a whole struct into the mapping at once. `block.timestamp` is the current block's time, this contract's stand-in for "when did this happen," which the acceptance-gate capstone in Week 8 will care about directly. Compile one final time.

## Read the rest, don't type it

Open `../project/contracts/AssetRegistry.sol` and find `updateBalance` and `setEligibility`. Both follow `registerHolder`'s exact shape: `onlyOwner`, a `require` guarding a real precondition, a state change, an update to `lastUpdated`, an emit. You've typed this pattern once already; reading the other two should take a minute, not require re-deriving anything. You can delete `AssetRegistryPractice.sol` now, or leave it; nothing in this project deploys it unless you write a script that specifically does.
