// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// A trivial contract that stores one piece of text on the blockchain and
// lets anyone read it or replace it. See project/README.md in this folder
// for a full, line-by-line explanation of every part of this file.
contract Greeter {
    // A state variable: data that lives permanently in this contract's own
    // storage on the blockchain, not just in memory for one function call.
    string private greeting;

    // An event: a log entry a transaction can emit. Off-chain code (like a
    // Python script using web3.py) can watch for these instead of having to
    // constantly ask "did anything change?". Not used by this week's
    // project yet, but the contract emits one anyway since Week 6 builds on
    // exactly this pattern.
    event GreetingChanged(string oldGreeting, string newGreeting, address changedBy);

    // The constructor runs exactly once, at the moment this contract is
    // deployed, and never again after that.
    constructor(string memory initialGreeting) {
        greeting = initialGreeting;
    }

    // A "view" function: it only reads stored data and changes nothing, so
    // calling it doesn't cost gas and doesn't require a signed transaction.
    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    // This function changes stored data, so calling it requires a signed
    // transaction and costs gas. msg.sender is the address that sent that
    // transaction, filled in automatically by the network, not something
    // the caller can fake.
    function setGreeting(string memory newGreeting) public {
        string memory oldGreeting = greeting;
        greeting = newGreeting;
        emit GreetingChanged(oldGreeting, newGreeting, msg.sender);
    }
}
