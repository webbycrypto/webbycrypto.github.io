# Practice: the seen-it-before check, with fake data

[← Back to Week 7 (Blockchain track): Low-scaffolding build, continued](../README.md)

This is a throwaway exercise with no blockchain, no network, and no relationship to `AssetRegistry` at all. Its only job is to give you one cheap, low-stakes rep of the exact pattern `notes/01-idempotency-and-retries.md` describes (`processed_events`, a set of ids you check before acting and update after), on data simple enough that the pattern is the only thing you have to think about, before you have to apply it to real events for real this week.

## The scenario

Imagine a small system that processes incoming order notifications. Each notification is a plain Python dictionary:

```python
notifications = [
    {"order_id": "A100", "amount": 25},
    {"order_id": "A101", "amount": 40},
    {"order_id": "A100", "amount": 25},  # redelivered, same order as the first one
    {"order_id": "A102", "amount": 15},
    {"order_id": "A101", "amount": 40},  # redelivered
]
```

Notice `A100` and `A101` each show up twice. This is standing in for exactly the situation `notes/01-idempotency-and-retries.md` describes: the same real-world event, delivered to your handling logic more than once, for reasons outside your control (a retry, a redelivered webhook, a re-scanned block range, doesn't matter which for this exercise).

## What to do

Write a function, `process_notifications(notifications)`, that processes each notification's `amount` into a running total, but only counts each distinct `order_id` once, no matter how many times it appears in the input list. Use exactly the pattern from the notes: a `set` of ids you've already seen, checked before you add to the total, updated after.

```python
def process_notifications(notifications):
    seen_order_ids = set()
    total = 0

    for notification in notifications:
        order_id = notification["order_id"]
        if order_id in seen_order_ids:
            continue  # already processed this exact order; redelivery is safe to ignore

        total += notification["amount"]
        seen_order_ids.add(order_id)

    return total
```

Don't just read the snippet above. Type it yourself, from the description, before looking at it, the same "predict, then confirm" discipline the read-and-predict exercises in Week 5 asked of you. Run it against the `notifications` list above and confirm the total comes out to `80` (`25 + 40 + 15`, each order counted exactly once), not `105` (what you'd get if the two duplicates were counted twice).

## What to check next

- Comment out the `if order_id in seen_order_ids: continue` line and rerun. The total should jump to `105`. Seeing the wrong number appear on purpose, from a change you made and understand, is more convincing than trusting that the check matters just because a note said so.
- Add a notification with an `order_id` you've already used but a *different* `amount`. Confirm your function still ignores it entirely, counting neither the new amount nor a corrected total. That's a deliberate, honest limitation worth naming out loud: this pattern makes redelivery of the *same* event harmless, it does not attempt to detect or reconcile a *conflicting* second delivery under the same id. Real systems that need that second guarantee do something more involved; this week's project, and this exercise, only need the first one.

## Why this, and why now

The real version of this pattern, inside your Week 6 service, is tangled up with actual event objects, actual transaction hashes and log indices, and an actual live network you're also debugging at the same time. Getting the core logic wrong here, on three fake dictionaries you can hold in your head at once, costs you a few minutes. Getting it wrong for the first time inside the real service costs you a debugging session that's simultaneously about the pattern *and* about web3.py *and* about whatever else is happening on a live testnet at that moment. This exercise exists to separate those two kinds of difficulty.
