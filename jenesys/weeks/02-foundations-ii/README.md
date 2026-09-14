# Week 2: Foundations II and first project

[← Back to Weeks](../README.md)

Full context: [root README, Week 2](../../README.md#week-2-foundations-ii-and-first-project).

## Goal

Build a complete small service from scratch, then deliberately break things to practice debugging without an answer key.

This is the first week where you build something you could actually call a "project," not just isolated exercises. Everything from Week 1 (variables, conditionals, loops, functions, the command line, git, and how request/response works) gets used here, together, for the first time. If something from Week 1 feels shaky while you're working through this week, that's worth going back and revisiting rather than pushing through, since this week assumes that foundation is solid.

## Days

- Days 1-3: a notes/task API with persistence, more than one endpoint, and at least one error case handled on purpose, using a lightweight Python framework (this program uses Flask; see `notes/01`). Before starting the main project, exercises 5-7 give you three additional, standalone reps (routes, persistence, and error handling, each in isolation, each in its own small unrelated domain) beyond the four ordered exercises, and exercise 8 gives you a second fully-guided walkthrough, this time for validating a request body, before you build the real thing. Before moving on, apply the organization pass from `notes/06` to your own code, not just to get it working but to get it readable. If you finish with time to spare, `project/README.md`'s stretch goals section has seven optional extensions to the notes API (a completed flag, tags, search, sorting, pagination, bulk create, and a stats summary).
- Day 4: debugging drills, fixing deliberately broken code with no answer key handed to you directly.
- Day 5: retrospective, and an honest first pass at the Foundations checkpoint (the real self-check happens in Week 3, but do an honest first pass now).

## Do this in order

Everything below is required, in the order shown, except the one line marked optional near the end.

1. [ ] `notes/01-web-frameworks.md`, then `exercises/01_single_endpoint.py`.
2. [ ] `notes/02-endpoints-and-routes.md`, then `exercises/02_second_endpoint.py`.
3. [ ] `notes/03-persistence.md`, then `exercises/03_add_persistence.py`.
4. [ ] `notes/04-error-handling.md`, then `exercises/04_add_error_case.py`.
5. [ ] `exercises/05`, `06`, `07` (any order): a second rep of routes, persistence, and error handling, each in its own small unrelated domain.
6. [ ] `exercises/08_guided_validation_endpoint.md`, a guided, line-by-line walkthrough of request validation.
7. [ ] `notes/05-debugging-methodology.md` and `notes/06-organizing-your-code.md`, before the main project, not after.
8. [ ] `project/guided-first-endpoint.md`, a guided, line-by-line walkthrough of the first two pieces (persistence, `GET /notes`).
9. [ ] `project/README.md`'s "Work through the routes in this order" section, starting at step 3, for the remaining routes.
10. [ ] Apply `notes/06`'s organization pass to your own finished `app.py` before moving on.
11. [ ] `project/debugging_drill.py` and `project/debugging_drill_symptoms.md` (Day 4): diagnose before you read `solutions/debugging_drill_explained.md`.
12. Optional, if you finish with time to spare: `project/README.md`'s "Stretch goals" section, seven extensions to the notes API. Skippable without leaving a gap in what Week 3 assumes you know.

After a real attempt at any step, compare against the matching file in `solutions/`, which covers every exercise, the finished API (plain and with all seven stretch goals built in), and the debugging drill's explanation.

## A note on the debugging drill

Do not open `solutions/debugging_drill_explained.md` before you've spent real time trying to diagnose `project/debugging_drill.py` yourself using only `project/debugging_drill_symptoms.md`. The entire point of Day 4 is practicing the process of forming a hypothesis from a symptom and testing it, not memorizing the specific bugs in this specific file. Skipping straight to the explanation defeats the exercise; you'd be practicing reading, not debugging.

## Deliverable

A working small service you can explain endpoint by endpoint: what each one does, what it returns, and what happens when something goes wrong.

## Status

Notes, exercises, project, and solutions are written for this week.
