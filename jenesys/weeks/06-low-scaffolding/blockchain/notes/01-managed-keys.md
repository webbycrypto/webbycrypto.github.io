# Managed keys: when there's no human left to click "approve"

[← Back to Week 6 (Blockchain track): Low-scaffolding build](../README.md)

## TL;DR

A managed key is a private key a service holds and uses on its own, with no human approving each transaction. This page covers how to keep that key safe once that check is gone.

- Read the key from an environment variable at runtime. Never write it as a literal string in your code, and never commit it to git, not even briefly.
- Give each environment (testnet, production) its own key, with a variable name that makes clear which one it is.
- Once you have the account, only print or log its public address. Printing the whole account object can reveal more than you intend.
- The stakes are low on testnet, but this exact pattern, key from environment, never in code, is what a real backend uses to protect funds that matter.

```python
import os
from eth_account import Account

# Never hardcode a key -- read it from the environment instead
private_key = os.environ["TESTNET_PRIVATE_KEY"]   # name says which environment this is
account = Account.from_key(private_key)

print(account.address)   # safe to show, this is meant to be public
# print(account)          # avoid this -- can reveal more than you intend
```

## What changed between Week 5 and this week

Look back at how signing actually happened in Week 5. `deploy.py` called `accounts.load("testnet-deployer")`, which unlocked an encrypted keyfile by prompting *you*, a human sitting at a terminal, for a passphrase. `interact.py` read a private key from an environment variable you set yourself, in your own shell, right before running the script once, by hand. Either way, a person was present, deliberately choosing to trigger that one signature, at that one moment.

This week's service doesn't have that. It's a program that starts up, keeps running, and signs and sends transactions on its own schedule or in response to its own logic, with nobody watching and nobody clicking "approve." That's the entire meaning of a **managed key**: a private key that a piece of software holds and uses autonomously, standing in for a human's authority, without a human re-confirming each individual use.

This is not a small implementation detail. It's the actual thing that makes "enterprise integration" (the phrase the root README uses for this whole track) different from a consumer wallet flow. A person using MetaMask reviews and approves one transaction at a time, deliberately, in a popup. A backend service holding a managed key has no popup, no review step, and no human in the loop at the moment of signing, by design, because the entire point is that it can act without waiting for one. That's also exactly why it demands more care, not less: every protection a human's judgment would normally provide (does this look right? should I really be signing this right now?) has to be built into the software instead, or it simply doesn't exist.

## The analogy

A human-approved wallet is like a security guard checking ID and personally waving each visitor through a door, one at a time, using their own judgment in the moment. A managed-key service is like giving a night-deposit box its own key and letting it accept drop-offs on a timer with nobody standing there. That's not automatically a bad idea (banks do exactly this, deliberately), but it only works safely because the box, the key, and the process around them are all designed assuming no one is watching in the moment. Removing the human bottleneck is the whole point; compensating for the check that bottleneck used to provide is the whole job.

## The concrete rule, and why it's not optional

**Never hardcode a private key in source code. Never commit one to git, even by accident, even briefly, even in a file you plan to delete later.** The standard pattern, and the one this project uses, is to read it from an environment variable at runtime:

```python
import os
from eth_account import Account

private_key = os.environ["PRIVATE_KEY"]
account = Account.from_key(private_key)
```

The key lives in the environment the process runs in (your shell session, a `.env` file that is listed in `.gitignore` and never committed, or, in a real deployment, a proper secrets manager like AWS Secrets Manager, HashiCorp Vault, or your cloud provider's equivalent), never inside a file that git tracks. This isn't a style preference. Git is built to remember everything, permanently, across every commit in a repository's history. A key committed once and "removed" in a later commit is still sitting in that earlier commit, recoverable by anyone with read access to the repository, forever, unless you rewrite history entirely (which is its own hassle, and doesn't undo a leak that's already public). Treat "committed to git" as equivalent to "compromised, permanently," and design your habits so that never happens in the first place, rather than planning to clean it up after.

## Beginner mistakes worth naming specifically

- **Hardcoding a key "just for testing," meaning to remove it before committing, and forgetting.** This is the single most common way real leaks happen, not some sophisticated attack. The fix isn't better memory; it's never writing the key as a literal string in a `.py` file at all, not even temporarily.
- **Committing a `.env` file.** A `.env` file is the right place to *keep* a key out of source code, but only if it's also excluded from git. Check your `.gitignore` before you create the file, not after.
- **Printing or logging more than you meant to.** `print(account)` or an unhandled exception's traceback can sometimes surface more of an object's internals than you expect. Get in the habit of printing `account.address` specifically (which is meant to be public) rather than the account object as a whole, and think, briefly, about what a stack trace would reveal if this line raised.
- **Using the same key across every environment.** If your local development key, your test key, and (eventually, in a real system) your production key are all the same key, a leak in the least-protected environment compromises all of them at once. This program is testnet-only throughout, so the stakes are intentionally low right now, but the habit of a distinct key per environment is worth building before the stakes are real.

## Why the low stakes here still matter

Everything in this program stays on testnets, using funds that have no real value. That's deliberate, and it means a leaked key this week costs you nothing but the mild annoyance of generating a new one. But the code you're writing, the pattern of "read the key from an environment variable, never write it in code," is exactly the pattern a real backend uses with a key that controls real funds. The habit is what transfers, not the specific stakes. Build it now, while a mistake is free, so it's already automatic by the time it isn't.
