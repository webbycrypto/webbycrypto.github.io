# Project: harden the AssetRegistry service

[← Back to Week 7 (Blockchain track): Low-scaffolding build, continued](../README.md)

Read all three notes in this week's `notes/` folder before starting. As in Week 6, this is a goal and a set of constraints, not a numbered walkthrough. You're extending the service you built last week, not starting over.

## Goal

Extend your Week 6 backend service with three things:

1. **Retry logic that doesn't double-act.** Add handling for at least one realistic failure (a dropped connection to your RPC provider is a reasonable, easy-to-simulate choice) that retries safely, following the rule in `notes/01-idempotency-and-retries.md`: retry a call you know never reached the network; check status, don't resubmit, for one you're unsure about.
2. **Handling for a second event type.** Your `AssetRegistry` contract already emits `BalanceUpdated` and `EligibilityChanged` alongside `HolderRegistered`. Pick one you're not already handling and add a reaction to it, using the same event-driven approach (not polling) from Week 6.
3. **A small test suite that would catch double-processing.** At minimum, one test that redelivers the exact same event twice to your handling logic and asserts the resulting side effect happened once, not twice. `notes/02-why-tests-matter-here.md` walks through why this test shouldn't need a live network connection, and what that implies about how your handler function should be structured.

## Constraints

- Still testnet only, still a managed key from an environment variable, same as Week 6.
- The idempotency check has to actually be exercised by your test, not just present in the code. If you can comment out the check and watch the relevant test keep passing, the test isn't testing what you think it's testing.
- Don't just catch and swallow exceptions to make retries "work." A retry that silently gives up after failing, with no record of the failure, is not meaningfully safer than no retry logic at all; at minimum, log what happened.

## What's deliberately left for you to decide

The spec doesn't tell you which second event type to handle, what your retry logic should actually do once it decides retrying is safe, how many times to retry before giving up, exactly how you persist "which events have I already processed" (an in-memory set is enough to make the test suite pass; whether that's good enough for a service that might actually restart is a judgment call worth making and being able to defend, not a detail to skip past), or where that bookkeeping lives in your code relative to your event-handling and chain-talking logic (see `notes/03-organizing-under-more-weight.md`). Decide, and be ready to say why.

## Documentation to go read

- Whichever of `pytest` or `unittest` you choose (the standard library docs for `unittest`, or `pytest`'s own documentation, are both perfectly sufficient; you don't need a tutorial beyond them for a test suite this size).
- web3.py's documentation on the specific exceptions it raises for connection and provider failures, if you want your retry logic to catch something more specific than a bare `Exception`.

## Before you consider this done

You should be able to run your test suite and watch it fail on a deliberately broken idempotency check, then pass again once you fix it (see the end of `notes/02-why-tests-matter-here.md` for exactly why that step matters, not just "does it pass"). You should be able to explain, out loud, one thing your retry logic deliberately does *not* do (resubmit a transaction it isn't sure about), and why that restraint is the actual point, not a limitation.

## Optional stretch (not required)

If the required goal above came together without much of a fight, here's more of the same kind of work, not a different skill.

**Goal:** add a small metrics counter to your service: a running count of how many events it has processed for real, and a separate running count of how many it skipped specifically because the idempotency check recognized them as duplicates. Expose both counts however fits your service already (a log line on shutdown, a small endpoint if you already have an API, a `print` in a CLI, doesn't matter which).

**Constraint:** the duplicate-skipped count only increments through the exact same idempotency check your test suite already exercises. Don't add a second, separate way of detecting a duplicate just to feed this counter; that would leave you with two different sources of truth for the same fact, drifting apart the moment they're maintained even slightly differently, which is precisely the kind of "looks protected, isn't really" problem the Week 5 access-control note warned about, just relocated from access control to bookkeeping.

If you have appetite left after that: you were only required to handle a second event type this week (`AssetRegistry` emits three); handling the third one too, with the same idempotent, event-driven approach as the other two, is the other natural extension here, and it doubles as one more full rep of the entire pattern (fetch, decide, guard against duplicates) before Week 8 asks you to do all of this with no notes to lean on at all.

## If this feels easy

That's the signal the root README describes for this week: if Week 7 came together without a fight, you're ready for Week 8. If you're still fighting the tools here, more than the ideas, staying another few days on this project is a better use of time than pushing into the capstone under-prepared.
