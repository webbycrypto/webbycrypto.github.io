# Why a small test suite matters, even with no one grading it

[← Back to Week 7 (Blockchain track): Low-scaffolding build, continued](../README.md)

## The obvious objection, taken seriously

This is a solo, self-paced project. Nobody is going to run a CI pipeline against it. Nobody is going to reject a pull request because coverage dropped. It would be reasonable to ask: if the only person who will ever look at this code is me, and I already believe it works because I ran it and watched it behave correctly, what is a test suite actually buying me?

Here's the honest answer: **a test is the concrete, checkable version of "I can defend this decision."** Look back at the Week 8 self-sufficiency rubric in the root README, specifically the Debugging category ("can you explain exactly why that bug happened and why your fix addressed the real cause") and the Code comprehension category ("is there any block you wrote by copying a docs example that you never fully worked through afterward?"). Those questions are hard to answer honestly from memory, days or weeks after you wrote the code, under no time pressure, with nobody checking. A test that specifically exercises the double-processing scenario from `notes/01-idempotency-and-retries.md` is not just documentation of what you believe the code does; it's a standing, rerunnable proof of it, one you can point to instead of just asserting it from memory.

Watching your service behave correctly once, by eye, while you're actively thinking about the idempotency bug, tells you the code worked in that one moment, under your attention. It doesn't tell you it will still work after you've refactored something three weeks from now and forgotten exactly why that one `if` check was there. A test does.

## What this project specifically needs tested

The one property this week's project must be able to prove is precisely the one described in `notes/01-idempotency-and-retries.md`: **redelivering the same event twice does not cause it to be processed twice.** A minimal test for that looks roughly like this (this is illustrative, not the actual test to copy; building the real one, against your real handler, is the project's job):

```python
def test_duplicate_event_is_not_double_processed():
    event = make_fake_holder_registered_event(tx_hash="0xabc...", log_index=0)

    handle_holder_registered(event)
    handle_holder_registered(event)  # the exact same event, redelivered

    assert count_of_side_effect() == 1
```

The specific shape of `make_fake_holder_registered_event` and `count_of_side_effect` depends on how you built your Week 6 service; that's yours to design.

## Why this test doesn't need a live testnet connection, and why that's a feature

Notice the test above never touches an RPC endpoint, never sends a real transaction, and never waits for anything. That's deliberate, and it's worth understanding why it's the *better* design, not a shortcut: this test isn't trying to verify "does Sepolia work" or "does web3.py correctly submit transactions." Those are real concerns, but they're not concerns about *your* code; they're concerns about infrastructure you don't control and don't need to re-prove works. What you specifically need to verify is narrower and entirely within your control: given a specific event, does your own handling logic behave correctly, including on the second, redundant delivery?

Getting to that narrow, fast, no-network-required test usually requires a small design choice made *before* you write the test: your event-handling function should take an event (a plain dictionary or object with the fields you need) as an argument, rather than reaching out to fetch the next event itself. If `handle_holder_registered` is written to accept an event and act on it, you can hand it a fake one directly, with no chain, no provider, and no waiting, and the test runs in a fraction of a second, as many times as you want. If, instead, your handling logic is tangled together with the code that polls the chain for new events, testing it in isolation becomes much harder, and you'd be forced to either mock out substantial parts of web3.py or actually hit a real network just to test a decision your own code makes. That separation (fetching events, versus deciding what to do with one you already have) is a genuinely useful habit for backend code in general, not a blockchain-specific trick.

## `pytest` or `unittest`

Either is a completely reasonable choice; this program has no opinion on which one you pick. `unittest` is in the standard library and needs no installation; `pytest` is more concise and has become the more common choice in the wider Python ecosystem. If you haven't used either yet, this is a fine, low-stakes place to try `pytest` for the first time, since the test you need to write is small and focused.

## What "done" looks like for this note's purpose

You should be able to run your test suite, watch the duplicate-processing test pass, then deliberately break the idempotency check in your handler (comment out the `if event_id in processed_events: return` line, for instance), rerun the suite, and watch that specific test fail, clearly, for the reason you expect. If you can't make it fail on purpose, you don't yet know that it would have caught the bug it's meant to catch, and that's worth fixing before you consider this week finished.
