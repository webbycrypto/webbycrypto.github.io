# What a smart contract actually is

[← Back to Week 4: Track exposure](../../README.md)

## TL;DR

This page explains what a smart contract actually is: a small program living at its own address on the blockchain that runs the same logic for everyone and, once deployed, can never be changed.

- Its address isn't controlled by a private key. It's controlled entirely by whatever code was deployed to it.
- It has storage, its own permanent slice of data on the blockchain, that its code reads and updates.
- Calling a function that changes stored data means sending a transaction, which costs gas. Calling a function that only reads data is free.
- Once deployed, the code runs exactly as written, forever. There's no "push an update" button like a normal app, so a bug you ship stays shipped.
- Smart contracts are written in a different language, usually Solidity, because Python cannot run directly on a blockchain.

```solidity
contract GreetingBoard {
    // lives at its own address once deployed -- no private key controls it, only this code does
    string public greeting;   // storage: a permanent slice of data only this contract's code can change

    function setGreeting(string memory newGreeting) public {
        greeting = newGreeting;   // changes storage -- calling this needs a transaction, and costs gas
    }

    function getGreeting() public view returns (string memory) {
        return greeting;          // only reads storage -- calling this is free, no transaction needed
    }
}
// once deployed, this exact code runs forever: no edits, no "push an update" like a normal web app
// written in Solidity, the one new language this week -- Python can't run directly on a blockchain
```

A smart contract is a small program that lives on the blockchain itself, at its own address, that anyone can call by sending it a transaction. That's the plain-language definition; the rest of this note is about making that actually mean something instead of just sounding impressive.

## A vending machine, not a legal document

Despite the name, a smart contract has nothing to do with lawyers or legal agreements. A far better mental model is a vending machine bolted to a wall in a public place. It runs the same fixed logic for absolutely everyone who interacts with it: insert the right input, get a deterministic, predictable output, every single time, with no human operator involved and no way to talk it into making an exception for you. A smart contract works the same way: it's code that runs exactly the same for every single person who calls it, with no customer service representative anywhere to override what the code actually does.

Concretely, a smart contract has:

- **Its own address**, just like a regular account, except this address isn't controlled by any private key. It's controlled entirely by whatever code was deployed to it.
- **Storage**, its own little slice of permanent data living on the blockchain, that the contract's code can read and update. This week's example contract stores a single piece of text.
- **Functions**, pieces of code other accounts (including your own Python scripts) can call by sending a transaction (if the function changes stored data) or a free, read-only request (if the function only reads data without changing anything).

## Once deployed, the code doesn't change

This is the detail that separates a smart contract from ordinary software, and it's worth sitting with. When you deploy a normal web app, you push a new version whenever you want; users get the update automatically. A smart contract, once deployed to a public blockchain, runs exactly the code it was deployed with, forever. There's no "push an update" button. If you find a bug in your contract after deploying it, you generally cannot fix that specific deployed copy; you'd need to deploy an entirely new contract at a new address and convince everyone to use that one instead (real systems have more sophisticated patterns for planned upgrades, but they're well beyond this week, and the underlying constraint, that deployed bytecode itself is immutable, never goes away).

That permanence is a feature, not a limitation grudgingly accepted. It's exactly what lets a total stranger trust that a contract will behave the way its code says it will, forever, without needing to trust the person who wrote it not to quietly change the rules later. That trust property is the actual reason smart contracts get used for things like tracking ownership or automating agreements between parties who don't know or trust each other. It's also exactly why Week 5's notes on common failure modes (reentrancy, overflow, access control) matter so much: a bug you ship is a bug that's staying shipped, at that specific address, whether you meant to leave it there or not.

## The one new piece of syntax this week

Everything else in this program is Python, end to end. Smart contracts are the single exception: they're written in a different language, most commonly Solidity, because Solidity is designed specifically to compile down into the low-level instructions a blockchain's nodes know how to run (this compiled form is usually called bytecode). Python can't run directly on a blockchain; Solidity, once compiled, can.

Don't let "a new language" sound bigger than it is. This week's contract is a handful of lines. You're not learning Solidity the way you spent three weeks learning Python; you're getting just enough of it to understand a tiny, real example, and then going right back to writing Python to talk to that contract from the outside, which is most of what the blockchain track's day-to-day engineering work actually looks like.
