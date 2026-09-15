# Project: validate a support ticket with pydantic, cold

[← Back to Going further](../README.md)

No walkthrough here, on purpose, the same reasoning as Week 8. You've read `notes/01-classes.md`, `notes/02-type-hints.md`, and `notes/03-dataclasses.md`. This is where you find out if that was actually enough.

## What to do

pydantic is not part of Python's standard library; install it first (`pip install pydantic`). Then go to pydantic's own documentation (its official docs site, not a tutorial someone else wrote about it) and use it, cold, to do the following:

1. Define a model for a support ticket: a `topic` (a string), an `urgency` (one of exactly `"low"`, `"medium"`, or `"high"`, nothing else), and `tags` (a list of strings, optional, empty by default). This is the same shape `notes/01-classes.md` through `notes/03-dataclasses.md` built up by hand across three notes; here it's one model definition.
2. Feed it a handful of sample dicts, some valid, some deliberately broken (a missing field, an urgency value that isn't one of the three allowed, a tag that's a number instead of a string). Show what happens in each case: a successfully validated object for the good ones, and a real, readable error for the bad ones, not a crash with an unrelated traceback.
3. Write down, in a comment or a short paragraph, what pydantic actually did differently from the plain dataclass version in `notes/03-dataclasses.md`. Be specific: what check happened, and at what moment, that the dataclass never did on its own.

## Optional stretch, if you did the AI track and still have your API key set up

Go back to Week 5's [structured extraction exercise](../../05-guided-build/ai/exercises/03_structured_extraction.py). Replace its hand-rolled `try`/`except json.JSONDecodeError` block with your pydantic model from step 1: parse Claude's response directly into it, and let a validation failure (not a bare parse failure) be the signal that something's wrong. This is the actual moment the whole module was building toward. It's optional here because it needs a live API key, which not everyone doing this module will have handy; the core task above doesn't depend on it.

## Constraints

- Use pydantic's own current documentation as your source, not a summary or a blog post about it. Reading unfamiliar official docs and making them work is the actual point.
- Anything not specified here (exact field names, how you structure the sample data, whether you write this as a script or notes in a file) is your call to make and justify, not a gap to ask about.

## If you get stuck

Getting stuck on the actual syntax pydantic wants (how to constrain `urgency` to three specific values, for instance) is the expected, normal experience of reading a real library's docs cold, not a sign the first three notes failed you. Getting stuck on what a class is, what `self` refers to, or what a type hint means, is different: that's a sign to go back to `notes/01-classes.md` or `notes/02-type-hints.md` first, since those are supposed to already be solid going into this.
