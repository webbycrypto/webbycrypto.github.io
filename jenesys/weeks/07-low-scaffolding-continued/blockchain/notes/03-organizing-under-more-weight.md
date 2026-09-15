# Organizing under more weight

[← Back to Week 7 (Blockchain track): Low-scaffolding build, continued](../README.md)

## TL;DR

This page names a third organizational concern this week's project adds: tracking which events you've already handled needs its own clearly separated place, not mixed into the code that talks to the chain or the code that decides what to do.

- Idempotency bookkeeping (tracking which events you've already handled) is a separate concern from both talking to the chain and deciding what a new event should trigger, and it deserves its own clearly named place in your code.
- Checking "have I already handled this" inline, wherever an event happens to be handled, means every place that could receive an event has to remember to do that check correctly and consistently every time. It's easy to get wrong, or to forget, in just one of those spots.
- This is the same "extract the repeated logic instead of duplicating it" instinct from Week 2, just applied to state (what you've already done) instead of a stateless calculation.
- The real test: can you point to one specific place in your code responsible for idempotency, hand just that piece to someone else, and have them understand what it guarantees without reading your event-handling logic? If yes, it's properly separated.

`notes/02-why-tests-matter-here.md` in this same folder already makes the strongest version of this argument, from the testing side: it explains why separating "fetching an event" from "deciding what to do with one you already have" is what lets you test your handler in a fraction of a second with no live network at all. That's the same organization judgment this whole track has been building since Week 5 (Week 5: why a linear script didn't need functions; Week 6: why a service does, split roughly into chain-talking versus deciding-what-to-do). This note doesn't repeat that argument. It's here to name the third concern this week adds on top: **idempotency bookkeeping**, tracking which events you've already handled, separate from both talking to the chain and deciding what a fresh event should trigger.

## Why this one deserves to be its own, clearly named thing

It's tempting to bury a duplicate check inline, right where you handle an event ("if I've seen this one before, skip it"). That works, but it also means every place that could receive an event needs to remember to do that check, correctly, in the same way, every time, which is exactly the repeated-logic problem from Week 2's note, just showing up as a correctness risk instead of a readability one this time. A single, named place responsible for "have I already processed this" (a set of seen event ids, a small persisted store, whatever fits your design) that every handler checks and updates through, rather than each handler managing its own bookkeeping inline, is the same "extract the repeated logic once" instinct from Week 2, applied to state instead of a stateless calculation.

## The actual test, again

Same as every other week: can you point to the specific place in your code responsible for idempotency, hand someone just that piece, and have them understand what it guarantees without needing to read your event-handling logic first? If tracing "have we seen this event before" means reading through business logic to find where that check happens to live this time, it's not separated yet, regardless of what file it's in. If you can point to one clear answer immediately, it is, and that clarity is exactly what makes the test in `notes/02-why-tests-matter-here.md` straightforward to write in the first place.
