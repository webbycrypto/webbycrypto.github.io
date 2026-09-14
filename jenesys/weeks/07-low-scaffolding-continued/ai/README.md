# Week 7 (AI track): Low-scaffolding build, continued

[← Back to Weeks](../../README.md)

Full context: [root README, Week 7](../../../README.md#week-7-chosen-track-low-scaffolding-build-continued).

## Goal

Extend Week 6's project rather than starting a new one. Practice under low scaffolding before the safety net comes off entirely in Week 8. This is not new material.

## Scope

- Add persistence to the agent so it remembers past runs.
- Handle a second, different tool-chaining scenario.
- Make it robust to a bad or missing input it hasn't seen before.
- A few small, standalone exercises isolating the persistence gotchas (serializing SDK response objects before JSON, loading a missing or corrupted history file, capping saved history without breaking the conversation's shape) on a throwaway scenario first.
- Optional stretch goal: a fourth addition (a usage log the assistant can report on, or a basic "undo last action" concept), on top of the three required additions.

## The project: Notes Assistant, continued again

Still the same **Notes Assistant** from Weeks 5-6. This week adds durable memory across runs (not just within one running process), a second chained tool pair with a different kind of trigger condition than Week 6's, and deliberate handling of at least one bad or missing input the Week 6 build was never tested against.

## Do this in order

Steps 1-2 are required. Steps 3-4 are optional; skipping them leaves no gap in what Week 8 assumes you know.

1. [ ] `notes/01-persistence.md` through `03-organizing-the-second-addition.md`, in order.
2. [ ] `project/README.md`'s goal: persistence, a second chaining scenario, and robustness added to Week 6's build. No numbered steps, on purpose.
3. Optional, before step 2, if the persistence gotchas feel unfamiliar: `exercises/01_serialize_sdk_response.py`, `02_load_corrupted_history.py`, `03_trim_history_window.py`, pure Python, no API key needed, on throwaway data.
4. Optional, after step 2: `project/README.md`'s stretch goal, a fourth addition (a usage log, or a basic undo).

A learner who finds step 2 easy is ready for Week 8. A learner still fighting the tools here should stay another few days rather than move on.

## Status

Notes, exercises, and the project brief (including the stretch goal) are written. Nothing here is a placeholder.
