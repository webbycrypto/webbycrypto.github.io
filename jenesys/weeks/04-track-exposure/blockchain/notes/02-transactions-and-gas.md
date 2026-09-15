# Transactions and gas

[← Back to Week 4: Track exposure](../../README.md)

## TL;DR

This page explains what a transaction actually is and why sending one costs a fee called gas.

- A transaction is a signed instruction broadcast to the network: move currency from one address to another, or call a function on a smart contract.
- "Signed" means your private key produces a signature over the transaction's contents. Change even one character afterward and the signature no longer matches, which is what stops tampering or forgery.
- Once broadcast, thousands of independent computers (nodes) check the signature and your balance, then execute the transaction and add it permanently to the blockchain's history. It cannot be undone afterward.
- Gas has two parts: the gas amount (how much computation your transaction needs) and the gas price (how much you're willing to pay per unit of that computation). More work costs more gas, and gas prices rise when the network is busy.
- The total fee is roughly gas amount multiplied by gas price. On a testnet, that fee is paid in worthless test currency, but the mechanics work exactly like they would with real money.

## What a transaction actually is

A transaction is a signed instruction that gets broadcast to the network, asking it to do something: move some currency from one address to another, or run a specific function on a smart contract, along with any data that function needs.

Walk through what "signed" means concretely, because it's the whole point. Before a transaction gets sent anywhere, your software (Ape, web3.py, a wallet, whatever) uses your private key to produce a signature over the transaction's contents: the sender, the recipient, the amount, the data, and a few other fields. That signature is a mathematical proof that whoever holds the matching private key approved exactly this transaction, and it can be checked by anyone, instantly, without them ever seeing your private key. Change even one character of the transaction after it's signed, and the signature no longer matches. That's what stops anyone from tampering with a transaction in transit or forging one on your behalf.

Once signed, the transaction gets broadcast to the network, where thousands of independent computers (nodes) each check the signature, check that the sender actually has enough balance and permission to do what's being requested, and, if it all checks out, execute it and permanently add the result to the blockchain's shared history. "Permanently" is not an exaggeration: once enough of the network agrees a transaction happened, undoing it would mean rewriting history that everyone else already has a copy of. That's the core promise blockchains make, and it's also why sending a transaction is a genuinely different kind of operation than a normal database write, which you can update or roll back later.

## Why sending a transaction costs "gas"

Every one of those thousands of independent computers has to actually run the computation your transaction requested, not just record that you asked for it. Running computation on real hardware, everywhere, over and over, for every transaction that has ever happened, is not free: it costs real electricity and real hardware time. Gas is the fee mechanism that pays for that.

Gas works in two parts, worth keeping separate in your head:

- **Gas amount**: how much computational work your specific transaction requires. A simple transfer of currency from one address to another is cheap and uses very little gas. Calling a smart contract function that does a lot of work (loops, storage writes, math) uses more. This is roughly why more complex smart contract calls cost more to run than simple ones: you're paying for the actual work being done on your behalf, everywhere the network has to do it.
- **Gas price**: how much you're willing to pay per unit of that gas, in the network's native currency. When the network is busy, with lots of people trying to get their transactions processed, gas prices tend to rise, the same basic supply-and-demand dynamic as surge pricing.

Total transaction fee is, roughly, gas amount multiplied by gas price. On a testnet (the next note explains exactly what that is), this fee is paid in worthless test currency, so none of this ever costs you real money in this program. But the mechanics you're learning, why fees exist, why they vary, why some operations cost more than others, are identical to what you'd deal with on a real network with real money on the line. That's the entire reason this program bothers teaching it on a testnet at all, instead of skipping straight to "it costs some fee, don't worry about why."
