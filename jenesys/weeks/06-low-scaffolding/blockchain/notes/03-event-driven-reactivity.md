# Event-driven reactivity: listening instead of asking

[← Back to Week 6 (Blockchain track): Low-scaffolding build](../README.md)

## TL;DR

Instead of repeatedly asking a contract if anything changed, your service can listen for the events it emits. This page covers the two ways to do that, and why only one of them survives a restart.

- A filter's position (`get_new_entries`) lives on the connected node, not in your own program, so it disappears if your service restarts.
- `get_logs` with a block range you track yourself is more code, but that range is your own state, so a restart can pick up exactly where you left off.
- Persist that cursor (the last block you've fully processed) somewhere durable, and only move it forward once you're done handling everything up to that point.
- Advancing the cursor too early, or keeping it only in memory, is what lets a restart process the exact same event twice.

```python
def load_cursor():
    with open("cursor.txt") as f:
        return int(f.read())          # your own state, unlike a filter, survives a restart

def poll_for_events(w3, contract):
    start_block = load_cursor() + 1
    end_block = w3.eth.block_number
    events = contract.events.HolderRegistered.get_logs(from_block=start_block, to_block=end_block)

    for event in events:
        handle_holder_registered(event)   # fully process before moving the cursor forward

    with open("cursor.txt", "w") as f:
        f.write(str(end_block))           # only advance once everything above is done
```

## Recap, briefly, then the new part

Week 5's `notes/03-events.md` covered what an event actually is: a cheap, timestamped log entry written into a transaction's receipt, readable by anything watching from outside the contract, not stored as queryable state. That note ended by promising this exact topic would come back once you were building something that actually needed to react to events as they happened, rather than just reading a receipt you already had in hand. This is that note.

The problem restated concretely: your service wants to know, promptly, every time `AssetRegistry` emits a `HolderRegistered` event (or, from Week 7 onward, other event types too), so it can log it, update an internal record, or trigger some follow-up action. Repeatedly calling `getHolder` for every address you might care about, on a timer, comparing each result to what you saw last time, technically works but wastes most of its effort on checks that find nothing changed, and it still can't tell you about an address you didn't think to check. Listening for the events themselves is the right tool here, and web3.py gives you two real ways to do it.

## Option one: filters and `get_new_entries`

```python
event_filter = contract.events.HolderRegistered.create_filter(from_block="latest")

while True:
    for event in event_filter.get_new_entries():
        handle_holder_registered(event)
    time.sleep(POLL_INTERVAL_SECONDS)
```

`create_filter` asks the connected node to start tracking matching logs on your behalf, and hands you back a filter object; each call to `get_new_entries()` returns whatever has matched since the last time you asked, then moves the filter's own position forward. This is simple to write, and it's the version you'll see in most introductory examples, including web3.py's own docs.

The catch: the filter's position lives on the *node*, not in your own process. If your service restarts (a crash, a redeploy, you stopping and starting it while developing), the filter object you had is gone, and you have no way to resume the old one; you'd create a brand new filter starting from whatever `from_block` you give it next time. Some RPC providers, especially free tiers behind load-balanced infrastructure, may not reliably preserve a given filter's state across requests at all. For a service that genuinely cannot afford to silently miss or double-handle an event, depending on state you don't control and can't inspect is a real risk, not a theoretical one.

## Option two: tracking your own cursor with `get_logs`

```python
logs = contract.events.HolderRegistered.get_logs(from_block=last_processed_block + 1, to_block=current_block)

for event in logs:
    handle_holder_registered(event)

last_processed_block = current_block
```

`get_logs` takes an explicit block range and returns every matching event in it, with no server-side memory involved at all: you decide the range, every single time, based on state *you* keep track of. This is slightly more code than the filter approach, and it's exactly the extra bit of bookkeeping that makes it the more dependable choice for a service that has to survive restarts: `last_processed_block` is your own variable, and if you persist it somewhere durable (a file, a database row, anything that outlives the process), a restarted service can pick up exactly where it left off, rather than guessing.

## Why naive polling can double-count events on a restart

This is the exact problem Week 7 is going to make you defend against on purpose, so it's worth sitting with now, before you've written any code, rather than discovering it by accident later.

Picture a service that polls for new events every few seconds but keeps `last_processed_block` only in an ordinary Python variable, in memory. It works fine, correctly logging each new `HolderRegistered` event exactly once, for as long as it keeps running. Then it restarts, for any reason. The in-memory variable is gone, and with it, any memory of where the service had gotten to. If the service's restart logic picks some fallback starting point (say, a fixed number of blocks behind the current head, or worse, the network's genesis), it will call `get_logs` over a range that includes blocks it already fully processed before the restart, and every event in that range gets handled again, exactly as if it were brand new.

For a `HolderRegistered` event, "handled again" might just mean an extra, harmless log line. Depending on what "handling" actually *does* in a more consequential system, though, "handled again" could mean crediting an account twice, sending a duplicate notification, or, in a system less careful than this one, taking a real action a second time that should only ever happen once. The bug isn't in the blockchain, the contract, or web3.py; it's entirely in the service's own decision to keep its position only in memory, with nothing durable to recover from a restart.

The fix isn't complicated, and it's the same shape regardless of which of the two options above you choose: **persist your cursor (the last block, or the last specific event, you've fully processed) somewhere that survives a restart, and only advance it after you've actually finished handling everything up to that point, never before.** Week 7 pushes this one step further: even with a correctly persisted cursor, a crash *in the middle* of processing a batch of events can still leave you uncertain whether the last one was fully handled or not, which is exactly why idempotent handling (processing the same event twice safely) is the more robust guarantee to build toward, on top of, not instead of, a decent cursor.

## A note on very recent blocks

One more piece of rigor worth knowing about, even though this week's project doesn't require you to act on it: on some networks, the very newest blocks can, rarely, be reorganized (reordered or dropped in favor of a different chain of blocks) before they're considered fully final. A service that wants to be extra careful sometimes waits for a small number of additional blocks to be mined on top of an event's block before treating it as settled, rather than reacting the instant it first appears. Testnets you'll use in this program don't make this a pressing concern, but it's worth knowing the concept exists before you encounter it described as "confirmations" in someone else's documentation.

## What to actually go read

This note deliberately doesn't hand you a complete, working event-listening loop; the project goal for this week asks you to build one yourself, informed by this note and by web3.py's own documentation. Specifically worth looking up before you start: web3.py's documentation on events and filtering (search for "Events and Logs" in their docs), the shape of the event objects you get back from either approach (what fields does one actually have, and how do you get at the specific values your event emitted, like `holder` or `eligible`), and how `w3.eth.block_number` gives you the current chain height to poll against.
