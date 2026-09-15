# Organizing (or not) a walkthrough script

[← Back to Week 5 (Blockchain track): Guided build](../README.md)

## TL;DR

This page explains why `interact.py` is written as one long linear script instead of being broken into functions, and when that choice would stop being right.

- Splitting code into functions is usually good practice, but `interact.py`'s whole job is teaching the transaction lifecycle in order, once, so reading it top to bottom as one continuous story is easier to follow than jumping between several short functions.
- Extracting functions here wouldn't make the script more organized. It would just scatter one linear story across more places with no real benefit to the reader.
- The moment this logic needs to run more than once, from more than one place, or without a person watching it step by step (like the always-on service you build in Week 6), that same logic belongs in named, callable functions instead.

Everything from [Week 2's organizing-your-code note](../../../02-foundations-ii/notes/06-organizing-your-code.md) and [Week 3's note on splitting a growing file](../../../03-foundations-consolidation/notes/03-organizing-a-growing-file.md) still applies to Python code in general, including this track's. This note is about a case those two didn't cover: when the right call is writing something as one long, linear sequence, on purpose, with no functions extracted at all.

## Look at `interact.py`, and notice what's missing

Everything in `interact.py`, apart from `main()` itself, happens inline: build the transaction, sign it, send it, wait for the receipt, read the state back, all as one continuous block of code with numbered comments marking the steps. By Week 2's "one job per function" standard, this looks like exactly the kind of thing that should be five separate functions (`build_registration_tx`, `sign_and_send`, `wait_for_success`, `read_holder_state`...). It isn't written that way, and that's a deliberate choice, not an oversight.

## Why linear, this time, is the right call

`interact.py`'s actual job this week is teaching you the transaction lifecycle, in order, once: submitted, pending, mined, and only then confirmed as actually successful. Reading it top to bottom as one continuous story, with the numbered comments narrating each step as it happens, is a better way to learn that sequence than jumping between five short functions and holding the overall order in your head yourself. Extracting functions here, for a script whose entire purpose is being read once, linearly, start to finish, wouldn't make it more organized. It would just scatter a story across more places for no reader benefit. Recognizing that a "same job repeated" case (the many functions Notes Assistant needs) and a "one continuous narrative" case (this script) call for different structure is the same judgment call from Week 3's note, just showing up as "should I even write functions here at all" instead of "should I split this into multiple files."

## Watch for the moment this stops being true

The instant this logic needs to run more than once, from more than one place, or without a human watching it execute top to bottom, the calculus flips completely. That's exactly what Week 6 asks you to build: a service that sends transactions on its own, repeatedly, potentially while also reacting to events at the same time. A long-running service re-running one giant inline block every time something triggers it is far harder to reason about than the same logic living in named, callable functions. `notes/01-managed-keys.md` and `notes/02-transaction-lifecycle-for-services.md` in Week 6 pick this up from exactly this point.
