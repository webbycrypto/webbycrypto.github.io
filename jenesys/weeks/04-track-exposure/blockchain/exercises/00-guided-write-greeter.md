# Guided walkthrough: write Greeter, line by line

[← Back to Week 4: Track exposure](../../README.md)

`project/README.md`'s Step 2 explains `Greeter.sol` piece by piece, but it's explaining a file that's already sitting there, finished. This exercise has you type the same contract yourself, in small pieces, checking that it compiles after each one, before you read that explanation.

Do this first. Create a new file at `../project/contracts/GreeterPractice.sol` (a different filename from the real one, so both can exist side by side in the same Ape project without colliding) and type each step below into it, running `ape compile` from inside the `project/` folder after every step. Once you're done, `project/README.md`'s walkthrough of the real `Greeter.sol` becomes a second pass over material you've already typed once yourself.

## Step 1: the header

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
```

The first line is a license marker Solidity tooling expects. The second pins the compiler version this file targets. Save the file and run `ape compile`. Nothing meaningful can compile yet (there's no contract declared), and Ape may say so; that's expected at this step, you're just confirming the file is being picked up at all.

## Step 2: the contract and its one state variable

```solidity
contract GreeterPractice {
    string private greeting;
}
```

`contract` is Solidity's version of a class. `string private greeting;` declares a state variable, data that will live permanently in this contract's own storage once deployed, not just for the length of one function call. Run `ape compile` again. This should compile cleanly now, a contract with a state variable and nothing else is completely valid Solidity, even though it doesn't do anything useful yet.

## Step 3: an event

Add this line inside the contract, after `greeting`:

```solidity
    event GreetingChanged(string oldGreeting, string newGreeting, address changedBy);
```

An event is a log entry a transaction can emit, cheap to write and specifically designed to be watchable from outside the contract; `notes/04-smart-contracts.md` and `notes/02-transactions-and-gas.md` cover why that matters. Compile again. Declaring an event that's never emitted yet is also completely valid; you'll use it in Step 5.

## Step 4: the constructor

```solidity
    constructor(string memory initialGreeting) {
        greeting = initialGreeting;
    }
```

The constructor runs exactly once, at the moment of deployment, and never again. `memory` marks `initialGreeting` as temporary, existing only for this function call, unlike `greeting` itself, which lives in permanent contract storage. Compile again.

## Step 5: the two functions

```solidity
    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory newGreeting) public {
        string memory oldGreeting = greeting;
        greeting = newGreeting;
        emit GreetingChanged(oldGreeting, newGreeting, msg.sender);
    }
```

`view` marks `getGreeting` as read-only: it costs no gas and needs no signed transaction, because nothing on-chain changes. `setGreeting` has no `view`, because it does change stored data, so calling it for real requires a signed, gas-paying transaction. `msg.sender` is filled in automatically by the network as whoever actually signed that transaction; nothing in this function trusts a caller to say who they are. Compile one final time. A contract with a syntax mistake in one of these functions would fail to compile right here, on just this piece, rather than mixed in with four other functions' worth of errors if you'd written the whole thing at once and compiled only at the end.

## Compare, don't copy

Open `../project/contracts/Greeter.sol`. Function for function, it's the contract you just typed, just named `Greeter` instead of `GreeterPractice`. If your version differs slightly (a different parameter name, a comment you added), that's fine; what mattered was typing and compiling each piece separately, catching a mistake at the step that introduced it instead of at the end. You can delete `GreeterPractice.sol` now, or leave it; it doesn't get deployed by anything in this project unless you write a script that specifically does.
