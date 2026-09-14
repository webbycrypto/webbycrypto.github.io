# Practice: filters and get_new_entries, the other option

[← Back to Week 6 (Blockchain track): Low-scaffolding build](../README.md)

`00-practice-get-logs.md` covered `get_logs`, the approach `notes/03-event-driven-reactivity.md` recommends for anything that has to survive a restart. This exercise gives you the same kind of cheap rep, on the same throwaway `Greeter` contract, for the *other* option the notes describe: `create_filter` and `get_new_entries`. You should understand both well enough to explain, in your own words, why this week's service should lean on one over the other, and that's hard to do honestly if you've only ever typed one of them.

Same setup as the previous exercise: your Week 4 `Greeter` contract, its address and ABI, your funded testnet account. No new deployment.

## What to do

Write a second small, standalone script that:

1. Creates a filter for `GreetingChanged` starting from the current block: `event_filter = contract.events.GreetingChanged.create_filter(from_block="latest")`.
2. Immediately calls `event_filter.get_new_entries()` once and prints however many events come back (this should be zero; nothing has happened since the filter was created a moment ago).
3. Calls `setGreeting` with a new string and waits for its receipt, the same as before.
4. Calls `event_filter.get_new_entries()` again. This time it should return exactly the one event from step 3.
5. Calls `event_filter.get_new_entries()` a third time, with no new transaction in between. It should come back empty. This is the detail worth actually seeing rather than just reading about: the filter only ever hands you what's *new* since your last call, never the same event twice, because asking moves its position forward on the node's side, whether or not you were the one to ask.

## What to check, and then break on purpose

- Run the whole script a second time, as a fresh process, right after `setGreeting` succeeded from the first run. `create_filter(from_block="latest")` in this new run starts from whatever the current block is *now*, not from wherever the previous run's filter had gotten to. Call `get_new_entries()` immediately in this new run: it should come back empty, even though a `GreetingChanged` event genuinely happened a moment ago, in the previous run. That gap, a real event that already happened, invisible to a brand-new filter that started after it, is the exact weakness `notes/03-event-driven-reactivity.md` names directly: a filter's position lives on the node, not in your process, so a restart (or here, simply a second run) doesn't pick up where the last one left off. It starts over, from "now."
- Contrast that with what `00-practice-get-logs.md` showed you: `get_logs` with an explicit `from_block` you chose yourself would have caught that same event without difficulty, because nothing about it depends on one continuously running process's memory.

## Why this, and why now

You don't need to fully decide, yet, which approach your Week 6 service will use; the project brief and the notes leave that call to you on purpose. What you do need is to have actually watched a filter lose track of something real, on a contract simple enough that there's no other explanation for the gap, so that when you make that design decision for the real service, it's based on something you've personally reproduced, not just a warning you read and took on faith.
