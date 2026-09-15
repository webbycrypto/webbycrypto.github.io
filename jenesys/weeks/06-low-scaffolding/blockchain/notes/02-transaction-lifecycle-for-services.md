# The transaction lifecycle, from a backend's point of view

[← Back to Week 6 (Blockchain track): Low-scaffolding build](../README.md)

## TL;DR

A backend service can't send a transaction and just sit there waiting for it, the way a one-shot script can. This page covers what changes: not blocking callers on a confirmation, and treating a slow transaction as still pending, not failed.

- Track your own next nonce as part of the service's state, resyncing it once when it starts up, instead of asking the network for a fresh nonce before every send.
- When your code sends a transaction, don't make an API caller wait for it to confirm. Hand back the transaction hash right away, and check on it separately.
- A transaction that hasn't confirmed yet is not the same as one that failed. Don't react to "it's taking a while" by sending a second, duplicate transaction. That's the mistake that gets something registered, or paid, twice.

```python
next_nonce = w3.eth.get_transaction_count(account.address)  # resync once, on startup

def send_registration(address):
    global next_nonce
    tx = registry.functions.registerHolder(address).build_transaction({
        "from": account.address,
        "nonce": next_nonce,          # your own count, not a fresh network lookup
    })
    signed = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction)
    next_nonce += 1                    # advance right away, don't wait for a receipt
    return tx_hash                     # hand this back immediately; confirm separately, later

def check_status(tx_hash):
    receipt = w3.eth.get_transaction_receipt(tx_hash)
    return receipt   # None means still pending, not failed -- don't resend because of this
```

## What's different this time

Week 5's project README walked through the transaction lifecycle (build, sign, send, pending, mined, confirmed) from the point of view of a script you run once and watch finish. That explanation doesn't need repeating here; go back and reread it if it's fuzzy, since everything below assumes you already have it.

What's new this week is that a *service* doesn't get to behave like a script that blocks and waits comfortably for one transaction to finish before doing anything else. A service has to keep functioning: maybe it's also serving API requests, maybe it needs to send another transaction before the first one confirms, and it absolutely has to survive being restarted without getting confused about what it already did. Those constraints change what "waiting for a receipt" actually means in practice.

## Don't block a request on a confirmation

If this service exposes an API (reapplying the already-practiced skill from Week 5 and Foundations, as the README notes), think carefully about what happens when an API call needs to trigger a transaction. Blocking that whole HTTP request until `wait_for_transaction_receipt` returns means a caller's request can hang for as long as the transaction takes to confirm, anywhere from a few seconds to well over a minute on a busy testnet. A more realistic backend pattern is to kick the transaction off, hand the caller back something to track it with (the transaction hash, or an internal job id) immediately, and let confirmation happen in the background, either checked later on demand or reported through whatever mechanism fits your design. You don't have to build a full job queue for this project, but design your service with the question in mind: *what is a caller supposed to do while a transaction I started is still pending?* Leaving that undefined is exactly the kind of ambiguity the Week 8 rubric expects you to notice and decide on deliberately.

## The mistake this note exists to prevent

Here's the concrete failure this note is building toward, because it's the one that actually happens in real, careless integrations: your service sends a transaction, starts waiting for a receipt, and for whatever reason (network conditions, gas priced a little too low, a genuinely slow testnet), the receipt doesn't show up quickly. If your code interprets "slow" as "must have failed" and reacts by sending a second, independent transaction to accomplish the same thing, you can end up with *both* transactions eventually confirming. Depending on what the transaction does, that means registering the same holder twice (which, in `AssetRegistry`'s case, the contract's own `require` would catch and revert, at the cost of gas spent on the failed attempt), or, in a system less defensively written than this one, actually double-spending or double-crediting something.

**Pending is not failed.** A transaction sitting unconfirmed in the mempool has not failed; it simply hasn't been picked up yet. The only two honest outcomes for a submitted transaction are "eventually mined with `status == 1`," "eventually mined with `status == 0` (a real revert)," or, much more rarely on an active network, "never mined at all because it was replaced or dropped." None of those outcomes is "still pending," and "still pending" is not a signal to act as though something went wrong. Week 7 builds retry logic on top of this exact distinction: retrying a network call that genuinely failed (a dropped connection to your RPC provider, for instance) is reasonable; retrying, meaning resubmitting a brand new transaction, just because a real, valid transaction is taking a while to confirm, is not.

## Nonce management, once you're sending more than one transaction

Week 5's script only ever sent a single transaction, so asking the network "what's the next nonce for this account" once, right before sending, was perfectly fine. A service that might send a second transaction before the first one confirms needs to think about this differently.

`w3.eth.get_transaction_count(address)` defaults to counting only transactions that have already been *mined*. If your service has already submitted a transaction that's still pending, and you ask for the transaction count again before that one confirms, you can get back the *same* nonce you already used, since the network doesn't yet count your still-pending transaction as final. Sending a second transaction with a nonce that's already in use doesn't queue up politely; it either gets rejected outright or, depending on gas pricing, replaces the earlier one. Some providers let you pass a `'pending'` block parameter to include transactions still sitting in the mempool, but different providers implement this with different consistency, so it's not something to build a service's correctness around.

The more robust habit, and the one worth adopting here: **have your own service track the next nonce it intends to use, as its own piece of state, incrementing it locally every time it sends a transaction, rather than asking the network fresh before every single send.** Resync that local counter against `get_transaction_count` on startup, and treat a mismatch (the network's count is higher than what you expected) as a signal worth investigating, not silently overwriting. This is a small preview of exactly the kind of durable, service-owned bookkeeping Week 7's idempotency work builds on more fully.

## "Stuck" transactions, briefly

Occasionally a transaction sits pending for an unusually long time because the gas price you offered turns out to be too low relative to what the network is currently accepting. Real systems handle this with strategies like resubmitting the *same* transaction (same nonce) with a higher gas price to replace the stuck one, rather than sending an entirely new, independent transaction alongside it. That's a real technique worth knowing exists, but it's beyond what this week's project asks of you; the goal here is understanding why "it's taking a while" is not automatically a problem to react to, not building a full gas-bumping system. If you want to read further, this is a good moment to open web3.py's own documentation and look specifically for how it represents transaction receipts and pending state, rather than taking this note's word for it.
