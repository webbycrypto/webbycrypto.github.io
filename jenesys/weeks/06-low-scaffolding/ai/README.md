# Week 6 (AI track): Low-scaffolding build

[← Back to Weeks](../../README.md)

Full context: [root README, Week 6](../../../README.md#week-6-chosen-track-low-scaffolding-build).

## Goal

Tool use and agents at a beginner level. Instructions give the goal and point to documentation, not step-by-step directions. This is deliberate.

## Scope

- The model calls at least two functions the learner wrote, chained: the output of one can decide whether the other gets called.
- Handle a tool call that fails or returns something unexpected, without crashing or fabricating a result.
- A few small, standalone exercises practicing tool-definition syntax and the tool_use/tool_result message shape on a throwaway scenario, before applying either for real.
- Optional stretch goal: a third tool, chained in through a trigger condition genuinely different from the required pair's.

## The project: Notes Assistant, continued

This week extends the exact same **Notes Assistant** project started in Week 5, not a new app. The Week 5 keyword-search-and-answer logic becomes something Claude itself decides to invoke, through real tool calls, and a second tool gets chained onto the first.

## Do this in order

Steps 1-2 are required. Steps 3-4 are optional; skipping them leaves no gap in what Week 7 assumes you know.

1. [ ] `notes/01-tool-use-mechanics.md` through `03-organizing-as-it-grows.md`, in order.
2. [ ] `project/README.md`'s goal: extend `notes_assistant.py` with two chained tools and real failure handling. No numbered steps, on purpose.
3. Optional, before step 2, if the mechanics feel shaky: `exercises/01_tool_schema_practice.py`, `02_tiny_tool_roundtrip.py`, `03_parallel_tool_calls.py`, cheap throwaway reps unrelated to Notes Assistant. All three need a real API call.
4. Optional, after step 2: `project/README.md`'s stretch goal, a third, differently-triggered tool.

## Status

Notes, exercises, and the project brief (including the stretch goal) are written. There is deliberately no step-by-step walkthrough in `project/`; see `project/README.md` for what that means and why.
