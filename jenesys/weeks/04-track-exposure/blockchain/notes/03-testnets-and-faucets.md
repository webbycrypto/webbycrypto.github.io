# Testnets and faucets

[← Back to Week 4: Track exposure](../../README.md)

## TL;DR

This page explains what a testnet is, why this program only ever uses one, and what a faucet is.

- A testnet is a full, independent copy of a blockchain that works exactly like the real network (the "mainnet"), except its currency has no real-world value.
- Testnets exist so you can make every possible mistake (a broken contract, a transaction to the wrong address) at zero cost, because the funds were never worth anything.
- This program never uses real cryptocurrency or a browser wallet. Every transaction goes to a testnet from plain Python code, because that matches how backend engineering with blockchains actually works in practice.
- A faucet is a free service that gives out small amounts of testnet currency to anyone who provides their public address. You never give a faucet your private key, only the address, the same way you'd only give someone a mailbox address, not the key to it.

## What a testnet is

A testnet (short for "test network") is a full, independent copy of a blockchain's software and rules, running as its own separate network from the real, live network (the "mainnet") that carries actual financial value. Sepolia, the specific testnet this program's examples use for Ethereum, works exactly like Ethereum's mainnet in every way that matters for learning: the same kind of addresses, the same kind of transactions, the same gas mechanics, the same smart contract language. The only real difference is that the currency used to pay for gas on a testnet has no real-world value whatsoever. It's play money, freely given away, that exists purely so people can practice, test, and build without financial risk.

That's the whole reason testnets exist: to give developers, and specifically people learning, a completely safe environment to make every possible mistake in. Deploy a broken contract. Send a transaction to the wrong address. Accidentally lock funds forever in a bug. On a testnet, the cost of any of that is exactly zero, because the funds were never worth anything to begin with.

## Why this entire program only ever uses one

You already read this in the root README, and it's worth repeating here with the actual mechanics behind it now in place: this program never uses real cryptocurrency and never connects a real wallet to a browser, at any point, in the core curriculum. Every single transaction anyone in this program ever sends goes to a testnet, using test accounts holding test funds, sent from plain Python code.

That constraint isn't a simplification made for beginners that gets removed later, either. It reflects what the blockchain track is actually training you for: backend engineering roles where a company's own service holds a managed key and signs and sends transactions programmatically. That's a Python problem end to end, with no browser wallet popup anywhere in the picture, whether you're on a testnet practicing or, eventually, working with a real network in a professional setting with a company's real, carefully managed keys. Using a testnet here isn't a workaround for not having real money to spend; it's the correct environment for exactly the kind of engineering this program teaches, at every stage.

## What a faucet is

Since testnet currency has no real value, there's no exchange where you'd buy it. Instead, "faucets" exist: websites or services that give out small, fixed amounts of testnet currency for free, to anyone who asks, usually by pasting in your public address (never your private key; a faucet only ever needs to know where to send funds, the same way anyone only needs your mailbox address to drop something into it).

Node providers like Infura and Alchemy, the same companies you created an account with in Week 0 for your RPC endpoint, typically link to a matching faucet for whichever testnet you're using directly from their dashboard. If you can't find one there, searching "Sepolia faucet" (or whichever testnet name you're targeting) will turn up several actively maintained public ones. You'll use one for real in this week's blockchain project, to fund the test account that deploys and interacts with your first smart contract.
