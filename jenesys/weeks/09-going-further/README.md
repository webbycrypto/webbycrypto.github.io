# Going further: classes, type hints, and reading a library cold

[← Back to Weeks](../README.md)

Full context: [root README, After Jenesys](../../README.md#after-jenesys).

## TL;DR

This is an optional module, not a required week. It exists because two moments already happened somewhere in Weeks 4-8 without being explained: a comment about "Pydantic model objects" in the blockchain track's `get_abi.py`, and a hand-rolled JSON-parsing workaround in the AI track's structured extraction exercise that a typed library would normally handle. Both are the same gap, closed here.

- Classes and type hints are never covered in Weeks 0-8, on purpose (see Week 2's [note on web frameworks](../02-foundations-ii/notes/01-web-frameworks.md) for why Flask was chosen over FastAPI). That was the right call for a total beginner's first eight weeks, but it leaves a specific, nameable hole once those eight weeks are done.
- The hole isn't "you don't know pydantic." It's that `class UserModel(BaseModel): name: str` uses two pieces of syntax, a class and a type annotation, that never once appeared in Weeks 0-8. Trying to read pydantic's own docs cold hits that wall before the actual library concepts even start.
- Three short notes close it: classes, type hints, then `@dataclass` as the bridge between them. Each is scoped tightly. `notes/01-classes.md` covers only enough to read and write one plain class, not inheritance or design patterns.
- The last step is unguided on purpose, the same way Week 8 is: given pydantic's own quickstart page and a real task (rebuild Week 5's structured extraction exercise with an actual schema instead of a hand-parsed dict), see if the first three notes were actually enough.

## Why this exists

If you did the blockchain track, you've already seen this, in [Week 4's `get_abi.py`](../04-track-exposure/blockchain/project/scripts/get_abi.py) and again in [Week 5's `get_abi.py`](../05-guided-build/blockchain/project/scripts/get_abi.py):

```python
# Ape's ABI entries are Pydantic model objects, not plain
# dictionaries. Depending on the version of Ape (and the version of
# the Pydantic library it depends on) installed on your machine,
# either model_dump() or the older dict() converts one into a plain
# dictionary that Python's json module can write out.
```

That comment told you what to type to make the error go away. It didn't tell you what a "Pydantic model object" actually is, because at the time, you didn't have the prerequisite (classes, type hints) to make that explanation land. You worked around it correctly and moved on. This module is where you go back and find out what you were working around.

If you did the AI track instead, you've already seen the other half of the same gap, in Week 5's [structured extraction exercise](../05-guided-build/ai/exercises/03_structured_extraction.py). That exercise asks Claude for JSON in a prompt, then wraps `json.loads()` in a `try`/`except` because nothing guarantees the model's reply is actually valid JSON, or matches the shape you asked for. That works, and the exercise is honest about why it's needed. It's also exactly the problem a typed schema exists to solve properly: define the shape once, get a real object back or a real validation error, not a dict you're still checking by hand.

Both of those are the same missing piece from two different directions. This module is that piece, not a second curriculum. It's three short notes and one unguided exercise, built specifically to make that exercise possible, not to teach pydantic (or FastAPI, or SQLAlchemy) as their own topics.

## Goal

Enough class and type-hint fluency to read a typed Python library's own documentation without a tutorial, using pydantic as the concrete test, because a real example you can run and check beats an abstract claim that you "should" be able to do this now.

## Do this in order

Steps 1-3 are the notes, in order, each one short. Step 4 is the actual test, and it's meant to be genuinely unguided; treat wanting a walkthrough for it as useful information, the same way Week 8 does.

1. [ ] `notes/01-classes.md`
2. [ ] `notes/02-type-hints.md`
3. [ ] `notes/03-dataclasses.md`
4. [ ] `project/README.md`, no notes written for this part on purpose. Read pydantic's own quickstart documentation and use it for real.

Optional, after step 4, any order: the three isolated exercises in `exercises/`, one per note, if you want a smaller rep of a single idea before or after the project rather than only learning it inside a bigger task.

## Status

Notes and the project spec are written. There is deliberately no `solutions/` folder for the project step, the same reasoning as every other project in this curriculum: the point is reading real, external documentation and forming your own approach, not matching a reference answer.
