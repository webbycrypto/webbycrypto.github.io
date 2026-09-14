# Week 7 project: persistence, a second chaining scenario, robustness

[← Back to Week 7 (AI track): Low-scaffolding build, continued](../README.md)

Full context: [Week 7 README](../README.md). Read `notes/` in this folder first. As with Week 6, this is goal-and-constraints, not a numbered walkthrough. This week is explicitly about practicing under low scaffolding before Week 8 removes the safety net entirely, so treat any temptation to look for a full worked example as a signal worth noticing in itself.

## Where you're starting from

Continue directly from your Week 6 build: tools, chaining, and honest failure handling should already be working before you add anything here. Don't restructure the project from scratch. If Week 6 doesn't feel solid, the root README says it plainly: stay there a few more days rather than build on a shaky foundation.

## The goal

Three additions to the same project, matching the Week 7 stub exactly:

1. Persistence: the agent remembers past runs.
2. A second, different tool-chaining scenario.
3. Robustness to a bad or missing input it hasn't seen before.

## 1. Persistence

- Save the conversation and tool-call history to a file between runs, and load it back in at startup, so a new run can genuinely reference something from a previous session. A real test: stop the program, restart it, and ask something that only makes sense if the earlier session actually happened (referencing a note you asked about last time, for instance).
- JSON is the natural format for a list of message dictionaries, but the exact format, filename, and location are your call.
- Handle a first-ever run (no history file exists yet) and a corrupted or empty history file, without crashing either way. See this week's `notes/01-persistence.md` for why raw SDK response objects need converting to plain dictionaries (`.to_dict()`) before they're safe to write with `json.dump()`.
- Decide, and be ready to justify, how much history you keep persisting: everything forever, a capped amount, one file per session, something else. There is no single right answer here; there is a defensible one you can explain.

## 2. A second, different tool-chaining scenario

Week 6 already has one chained pair of tools. This one needs to be genuinely different, not the same idea with new names. Two things should actually differ: the KIND of signal the second tool's firing depends on (not just "did the first tool find anything at all," which was Week 6's condition), and the real decision it represents for this app. Some directions, pick one or invent your own:

- A tool that reports how long ago a note was last modified, chained into a second tool that only fires when a note looks stale past some threshold you define and can justify (something like "flag this note for review").
- A tool that counts how many notes mention a given topic, chained into a second tool that only fires when there's enough material across multiple notes to be worth a combined summary, versus answering from just one.

Whatever you choose, the chaining condition should be visible and explainable: reading your code (or your program's logged output) should make it obvious WHY the second tool did or didn't fire for a given run, not just that it happened to, once, when you tested it.

## 3. Robust to a bad or missing input it hasn't seen before

Pick at least one input your Week 6 build was never actually tested against, and make it fail well instead of failing badly. Candidates, per this week's notes: an empty or malformed user command, a tool argument referencing a note that no longer exists, a corrupted persisted history file, a missing or empty notes folder on a fresh setup. "Fail well" means you decided in advance what should happen (a specific message, a specific `is_error` result, a clearly-announced fallback), not that Python's default traceback happened not to crash the process this particular time.

## 4. Take one honest look at the whole file's organization

Before moving on, step back from the three additions above and ask Week 2's question about `notes_assistant.py` as it now stands, not as it stood in Week 5: can you still describe it in one sentence without an "and"? See `notes/03-organizing-the-second-addition.md` for what to actually weigh in that decision. Whatever you conclude (stay as one file, or split out one or two of the concerns that have piled up), be ready to say why, the same as every other decision this week left open.

## Where to look

No code is spelled out here, on purpose. For persistence: look at how `.to_dict()` (or the equivalent JSON export) works on the SDK's response objects, and Python's own `json` module (`json.dump`, `json.load`, and the exception it raises on bad input, `json.JSONDecodeError`) for reading and writing the file itself. For the second chaining scenario: this is the exact same tool-use mechanism from Week 6, just a new pair of tools and a different condition connecting them. For robustness: this is ordinary Python input validation (`if` checks before risky operations, `try/except` as a backstop, not a primary strategy), not an AI-specific API at all.

## How you'll know you're ready for Week 8

- Stop the program mid-session, restart it, and ask something that only makes sense if it remembers the earlier session. It should work.
- Deliberately trigger your second chaining scenario, and separately, deliberately trigger a case where it should NOT fire. Confirm both, and be able to explain why each happened.
- Feed your program the bad input you picked, on purpose, in more than one session, and get a sensible, specific response every time, not a crash and not an invented answer.

If any of those three feel shaky rather than solid, the root README's advice applies directly here: stay another few days rather than move on. Week 8 has no tutorial and no safety net at all, and the self-sufficiency rubric there is looking for exactly the habits this week is meant to build: validating before acting, tracking state explicitly instead of hoping, and being honest, in the program's own output, about what actually happened versus what merely sounds plausible.

## Stretch goal (optional): a fourth addition

The three additions above are the actual Week 7 requirement. If they're solid, and you have time and energy left before Week 8, this stretch goal asks for one more genuinely new piece on top of them.

**The goal:** add a fourth capability, on your own judgment, from roughly this shape: something the assistant can report on ABOUT ITS OWN PAST BEHAVIOR, not about the notes themselves. Two concrete directions, pick one or invent your own:

- **A usage log the assistant can report on.** Record, somewhere durable (a simple log file, or a section of your existing history file), which tools got called, how often, and with what outcome (success or `is_error`), across every run so far. Then add a way to ASK the assistant about that log directly, something like "how many times have you searched my notes this week" or "which note gets asked about the most," answered from the real recorded data, not guessed.
- **A basic "undo last action" concept.** Let the user ask to undo the effect of the most recent tool call in the persisted history (removing it, and its result, from what gets resent on the next turn), and have the assistant confirm clearly what was undone. This is a real state-management problem worth sitting with: "undo" for a tool that only READS data (like your search tool) just means dropping that turn from history; "undo" for a tool that changes something would mean something else entirely, and part of this stretch goal is deciding, and being able to explain, which category each of your existing tools actually falls into.

**The constraint:** whichever direction you pick, it has to genuinely rely on state you're ALREADY persisting (or a small, deliberate addition to what you persist), not a one-off feature that ignores your existing history file entirely. Be ready to explain, in one sentence, what data this addition reads or writes, and why that data has to survive across runs to make the feature real rather than cosmetic.

No starter code here either, matching the rest of this week's style. If you attempt this, it's also a real test of `notes/03-organizing-the-second-addition.md`'s question, asked one more time: does a fourth concern still fit the shape you already decided on, or does it tip the balance toward splitting something out that hadn't needed to be split before now?
