# Organizing a service, not a script

[← Back to Week 6 (Blockchain track): Low-scaffolding build](../README.md)

[Week 5's note](../../../05-guided-build/blockchain/notes/05-organizing-a-walkthrough-script.md) explained why `interact.py` was written as one linear block on purpose: it ran once, top to bottom, for a human to watch. This week's service does not get that excuse. It runs on its own, potentially for a long time, reacting to triggers you don't control the timing of. That's precisely the condition where Week 2's "one job per function" test stops being optional polish and starts being how you keep the thing debuggable at all.

## The seams this week actually has

By the time your service holds a managed key, builds and sends transactions on its own initiative, and separately listens for and reacts to events, you have at least two genuinely different concerns, whether or not your code currently reflects that: **talking to the chain** (signing, sending, waiting for receipts, reading state, all the mechanics `interact.py` walked through inline) and **deciding what to do** (what triggers a transaction, what happens when an event arrives). These change for different reasons. The chain-talking mechanics are the same regardless of what your service is for; the deciding logic is specific to this project and will keep changing as you extend it in Week 7.

## The decision to make, and justify

This week's `project/README.md` already tells you the trigger mechanism and the internal record shapes are yours to decide. Add this to that list: whether the chain-talking mechanics live in their own functions (at minimum) or their own file (if the split earns its keep), separate from the deciding-what-to-do logic. There's no single correct answer here, the same as every other open decision this week, but there is a wrong reason to make either choice: doing it because it "seems like the professional thing to do" instead of because you looked at your actual code and it genuinely has two concerns tangled together that are getting in each other's way.

One concrete test, borrowed from Week 3's note: could you hand someone (or your future self) just the chain-talking functions, with no context about why your service sends transactions, and have them make sense on their own? If yes, they're probably already a coherent, separable unit, whether or not they're literally in a separate file yet. If the chain-talking code is full of references to your specific business rule for when to register a holder, the two concerns aren't actually separated yet, regardless of how many files the code is spread across.
