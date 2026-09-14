# Idempotency and retries: doing something twice without it counting twice

[← Back to Week 7 (Blockchain track): Low-scaffolding build, continued](../README.md)

## Idempotency, defined concretely for this project

A piece of handling logic is **idempotent** if processing the same input twice has exactly the same effect as processing it once. Not "similar effect." Not "no big deal either way." *The same effect*, as if the second time never happened at all, from the point of view of anything that matters (your internal records, any action you took because of it, anything you'd report to someone else about what happened).

This isn't an abstract property to admire. It's the direct answer to a very concrete risk you already have the seeds of, if you built Week 6's service the straightforward way: your service listens for `AssetRegistry` events and reacts to them. If it is ever handed the same event twice, whether because your own polling logic rescanned a block range it had already covered, because a restart lost track of exactly where it left off, or because some retry logic (yours, or a library's, or the RPC provider's) redelivered something, does your reaction happen twice? If the answer is yes, you have a bug, even though nothing about the blockchain itself did anything wrong. `notes/03-event-driven-reactivity.md` from Week 6 already walked through exactly how a restart can cause this; this note is about defending against it on purpose, not just understanding how it happens.

## The mechanism: remember what you've already handled

The fix is almost embarrassingly simple to state, and the discipline is in actually doing it consistently: **give every event a unique identifier, check whether you've already recorded that identifier as handled before you act, and only record it as handled after you've actually finished acting.**

A single transaction can, in principle, emit more than one event, so the transaction hash alone isn't always a safe unique identifier; pairing it with the event's log index (its position within that transaction's list of logs) is:

```python
processed_events = set()  # a real service persists this durably; an in-memory set forgets on restart

def handle_holder_registered(event):
    event_id = (event["transactionHash"].hex(), event["logIndex"])
    if event_id in processed_events:
        return  # this exact event has already been handled; re-delivery is safe to ignore

    # ... do the actual work: log it, update an internal record, whatever your Week 6 service does ...

    processed_events.add(event_id)
```

Notice this doesn't prevent your service from being *handed* the same event twice. It doesn't need to. It makes being handed the same event twice harmless, which is the actually achievable, actually valuable guarantee. Preventing every possible source of redelivery is a much harder, often impossible problem; making redelivery safe is the realistic one, and it's the one Week 7's project asks you to build and prove.

## Retries: what's safe to retry, and what isn't

"Add retry logic" sounds simple until you ask a more precise question: retry *what*, exactly, and under what conditions? Not all failures are the same kind of failure, and treating them as if they were is exactly how a retry mechanism turns into a double-spend mechanism.

**Genuinely safe to retry:** a network-level failure that happened *before* your transaction ever reached the chain. If your code raised a connection error or a timeout while trying to reach your RPC provider, and you never received a transaction hash back at all, nothing was submitted. Retrying here means exactly what "retry" sounds like: try the same request again, because the first attempt plausibly never happened from the network's point of view.

**Not safe to retry by resubmitting:** anything where you already have a transaction hash, even if you're still waiting on its receipt. Recall from Week 6's transaction lifecycle note: pending is not failed. If your RPC provider is just slow to respond to a status check, or a receipt is taking a while to show up, the honest and safe move is to check that specific transaction's status again (`w3.eth.get_transaction_receipt(tx_hash)`, handling the case where it doesn't exist yet), not to build and send an entirely new transaction attempting the same action a second time. `AssetRegistry`'s `registerHolder` happens to revert harmlessly if you accidentally resend it for an already-registered holder, because of its own `require` check, but don't rely on every action you'll ever write having that kind of built-in protection. `updateBalance` has no such guard; calling it twice with the same intent doesn't fail loudly, it just quietly does the thing twice. In a system moving something with real value (loyalty points, credits, anything the Week 8 token-issuance alternate spec asks you to build), an unprotected duplicate action like that is a real, direct loss, not a harmless no-op.

**A genuine, final revert (`status == 0`) is worth thinking about before retrying at all.** If a transaction was actually mined and actually reverted, ask why before resending anything. If the cause was something that's now been fixed (you underpriced gas, and you're resending with more), a fresh attempt makes sense. If the cause was a condition that hasn't changed (the same `require` will fail again for the same reason), resending accomplishes nothing except spending more gas on the same failure.

## The rule to build into your own habits

Before writing any retry logic that resubmits a transaction, ask, specifically: **do I already know, with certainty, that this attempt reached the network?** If you have a transaction hash, the answer is yes, and your retry logic should be checking that transaction's actual status, not creating a new one. Only build and send a brand-new transaction when you're confident the original attempt never left your own process, for instance because an exception was raised before `send_raw_transaction` ever ran. This single question, asked consistently, is most of what separates a retry mechanism that makes a service more reliable from one that quietly makes it dangerous.
