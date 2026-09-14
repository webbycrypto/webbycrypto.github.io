# Week 7 (Blockchain track): Low-scaffolding build, continued

[← Back to Weeks](../../README.md)

Full context: [root README, Week 7](../../../README.md#week-7-chosen-track-low-scaffolding-build-continued).

## Goal

Extend Week 6's project rather than starting a new one. Practice under low scaffolding before the safety net comes off entirely in Week 8. This is not new material.

## Scope

- Add retry logic and idempotency to the backend service.
- Handle a second event type from the contract.
- Write a small test suite that would catch it if the service double-processed an event.

## Note

A learner who finds this week easy is ready for Week 8. A learner still fighting the tools here should stay another few days rather than move on.

## Same project, still

You're extending the exact backend service you built in Week 6, against the exact `AssetRegistry` contract from Week 5. Nothing new gets deployed. Nothing gets rewritten from scratch. This week adds robustness to a service that already works, which is a meaningfully different (and, for what it's worth, more true-to-real-engineering) task than building something new.

This week's outcome maps directly onto what the Week 8 acceptance-gate capstone will assume you can already do without re-teaching it: a service that sends transactions defensively, doesn't act twice on the same trigger, and can be trusted because you can point at a test that proves it.

## Do this in order

Steps 1-2 are required. Steps 3-4 are optional; skipping them leaves no gap in what Week 8 assumes you know.

1. [ ] `notes/01-idempotency-and-retries.md` through `03-organizing-under-more-weight.md`, in order.
2. [ ] `project/README.md`'s goal: retry logic, idempotency, a second event type, and a test suite that would catch double-processing. No numbered steps, on purpose.
3. Optional, before step 2, if idempotency or writing a real test feels unfamiliar: `exercises/00-practice-seen-it-before.md` and `01-practice-catch-the-regression.md`, fake data only, no network.
4. Optional, after step 2: `project/README.md`'s stretch goal, a processed-versus-skipped metrics counter and a third event type.
