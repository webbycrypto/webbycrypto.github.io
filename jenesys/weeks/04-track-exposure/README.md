# Week 4: Track exposure

[← Back to Weeks](../README.md)

Full context: [root README, Week 4](../../README.md#week-4-track-exposure).

## Goal

A hands-on taste of both tracks, enough evidence to choose one for Weeks 5-7, rather than choosing based on hype from before Week 1.

## Days

- Days 1-2: AI track taste. Call a hosted model's API from code, understand tokens/prompts/cost, build a tiny chatbot with memory. See [ai/](ai/).
- Days 3-4: Blockchain track taste. What a private key and a transaction actually are, testnet only, write and deploy a first, trivial Solidity contract, and call it from a Python script using web3.py. See [blockchain/](blockchain/).
- Day 5: choose the primary track for Weeks 5-7.

## Deliverable

A tiny chatbot (AI) and a trivial deployed contract called from Python (blockchain), both built, before choosing.

## AI track: [ai/](ai/)

Do this in order. Only step 4 is optional.

1. [ ] `ai/notes/` 01 through 04, in order.
2. [ ] `ai/exercises/00-guided-build-the-chatbot.md`, a line-by-line guided build, before you read the finished version's explanation.
3. [ ] `ai/project/README.md`, the full walkthrough of the same, now-complete `chatbot.py`.
4. Optional, standalone, any order, any number of them: small tweaks directly on `chatbot.py`. [01](ai/exercises/01-tweak-the-bot.md) personality/cost/memory-cap · [02](ai/exercises/02-add-a-stats-command.md) a stats command · [03](ai/exercises/03-add-a-clear-command.md) a clear command · [04](ai/exercises/04-cap-message-length.md) cap message length · [05](ai/exercises/05-log-the-conversation-to-a-file.md) log to a file on exit · [06](ai/exercises/06-classify-a-message.md) classify a message (its own starter script) · [07](ai/exercises/07-retry-with-backoff.md) retry with backoff · [08](ai/exercises/08-switch-models-mid-conversation.md) switch models mid-conversation.

## Blockchain track: [blockchain/](blockchain/)

Do this in order. Only step 4 is optional.

1. [ ] `blockchain/notes/` 01 through 04, in order.
2. [ ] `blockchain/exercises/00-guided-write-greeter.md`, a line-by-line guided build, compiling after every step, before you read the finished version's explanation.
3. [ ] `blockchain/project/README.md`, the full walkthrough: generate a testnet keypair, deploy the now-familiar `Greeter.sol` with Ape, call it from Python with web3.py.
4. Optional, standalone, any order, any number of them: extensions to `Greeter.sol`, each its own full edit/recompile/redeploy/call cycle. [01](blockchain/exercises/01-extend-the-contract.md) a change counter and reset · [02](blockchain/exercises/02-restrict-an-emergency-reset-to-the-owner.md) an owner-only emergency reset · [03](blockchain/exercises/03-add-a-second-event.md) a second event · [04](blockchain/exercises/04-cap-the-length-and-handle-the-revert.md) a length cap and revert handling · [05](blockchain/exercises/05-track-the-longest-greeting.md) tracking the longest greeting.

## Status

Content written. No `solutions/` folder here or in any later week, by design; each project's walkthrough is written to be thorough enough to build from directly.
