# Project: a managed-key backend service for AssetRegistry

[← Back to Week 6 (Blockchain track): Low-scaffolding build](../README.md)

Read all four notes in this week's `notes/` folder before starting. This brief gives you a goal and constraints, not a numbered walkthrough. That's deliberate: figuring out how to structure the code, what libraries and functions to reach for, and how to test your own understanding against the documentation is the actual skill this week is building.

## Goal

Build a Python backend service that:

1. **Holds and uses its own managed key**, read from an environment variable (never hardcoded, never committed), to sign and send transactions to your Week 5 `AssetRegistry` contract on its own, without a human manually triggering each one.
2. **Sends at least one transaction on its own initiative**, calling one of `registerHolder`, `updateBalance`, or `setEligibility`. What triggers it (a schedule, a simple internal rule, a manual API endpoint you expose that the service itself then handles end-to-end) is your call to make and justify.
3. **Listens for `AssetRegistry`'s events and reacts to them**, rather than polling contract state on a timer to notice changes. "Reacts" can be as simple as structured logging, or as involved as updating an internal record; the point is that the reaction is driven by the event arriving, not by you asking the contract "did anything change?"

Reading state back and exposing results (through a CLI, a small API, whatever fits) are skills you already have from Week 5 and Foundations. Reapply them; this week isn't testing whether you can build an API from scratch again.

## Constraints

- **Testnet only**, using a managed key that holds no real value, exactly as every other week in this program.
- The key must come from an environment variable (or a local, gitignored `.env` file), never a literal string in your source.
- The service must survive being stopped and restarted without needing you to manually re-trigger anything it was already supposed to be doing (this doesn't yet mean "handles a restart perfectly," that's next week's explicit focus; it means don't design something that only works if it never restarts).
- Don't poll `getHolder` (or the `holders` mapping) on a timer as your event mechanism. If you catch yourself doing that, go back to `notes/03-event-driven-reactivity.md`.

## What's deliberately left for you to decide

The spec doesn't tell you: what exactly triggers the service's outgoing transaction, what your service does with an event once it receives one, what shape your internal records take, whether your service is a long-running script, a small API with a background task, or something else you've reasoned your way to, or whether chain-talking mechanics and decide-what-to-do logic live in the same file or separate ones (see `notes/04-organizing-a-service.md`). Make a call on each, and be ready to explain why. This is the same kind of judgment-under-ambiguity the Week 8 rubric asks you to demonstrate; there's no reason not to start practicing it now, while the stakes are a lot smaller.

## Documentation to go read, not a tutorial to copy

- web3.py's account and signing documentation: how `Account.from_key` and `sign_transaction` work, and how a signed transaction gets sent with `send_raw_transaction`.
- web3.py's documentation on events and logs (sometimes titled "Events and Logs" or "Filtering" depending on the version): both `create_filter` / `get_new_entries`, and `get_logs` with an explicit block range. `notes/03-event-driven-reactivity.md` explains why this project leans toward the second approach for anything meant to survive a restart, but read both before you decide.
- Whatever you already know about running a long-lived Python process (a `while True` loop with a sleep interval is a perfectly legitimate answer for a service at this stage; you don't need a task queue or a scheduler library to satisfy this week's goal).

## Before you consider this done

You should be able to point at the exact line where your service reads its private key, and explain what would happen if that environment variable were unset (it should fail loudly and immediately, not silently proceed with something unsafe). You should be able to demonstrate the service reacting to an event you caused, live, without you polling anything yourself to notice it. If you can't do both of those on request, the project isn't finished yet, regardless of whether the code runs.

## Optional stretch (not required)

If the required goal above came together without much of a fight, here's a genuinely new capability worth adding, not a variation on what you already built.

**Goal:** give your service a manual "force re-check" path: a way to tell it, right now, "go re-read this specific holder's actual on-chain state and reconcile your internal record to match it," outside of its normal event-driven flow entirely. A small CLI command that takes an address as an argument is enough; a single API endpoint that does the same thing is also enough. Either way, the intent is the same one a real operations team would reach for: "I think our records have drifted from the chain for this one holder, go check."

**Constraints:**

- The manual path has to call the exact same chain-talking function your event handler already uses to read a holder's state and update your internal record, not a second, separate copy of that logic written to look similar. If you find yourself duplicating a function instead of calling it from a second place, that's the signal to actually separate chain-talking from deciding-what-to-do, per `notes/04-organizing-a-service.md`, before adding this.
- It does not need retry logic or idempotency protection; that's next week's explicit focus, and a manual, human-triggered action doesn't carry the same "redelivered without anyone asking" risk an automated event handler does.
- It has to actually change your internal record when the two are out of sync, not just print a warning that they don't match. A force re-check that only observes drift, without correcting it, isn't the capability being asked for here.

This is a small brief on purpose, the same shape as everything else this week: a goal, a constraint, and the judgment calls (what the CLI command or endpoint looks like exactly, what "reconcile" means for your specific internal record shape) left to you.
