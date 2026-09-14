# Week 2 exercises

[← Back to Week 2: Foundations II and first project](../README.md)

## The ordered set: 1 through 4

Four exercises, meant to be done **in order**, unlike Week 1's. Each one builds directly on the previous file rather than standing alone: exercise 2 starts from exercise 1's finished shape, exercise 3 from exercise 2's, and so on. Together, they walk you through the same ground the main project (`project/`) covers, one small step at a time, before you build the fuller version from a starter skeleton instead of a mostly-finished file.

1. `01_single_endpoint.py`, one GET endpoint, returning a hardcoded in-memory list.
2. `02_second_endpoint.py`, add a POST endpoint to create new entries (still in-memory, no persistence yet).
3. `03_add_persistence.py`, save and load the list from a JSON file, so data survives a server restart.
4. `04_add_error_case.py`, add a get-one-by-id endpoint, and handle the "doesn't exist" case with a proper 404 instead of a crash.

Each file has the task described in a docstring at the top, with `# your code here` markers, and generally already contains the *previous* exercise's finished code so you're not retyping it every time. Run each one the same way as Week 1: `python exercises/01_single_endpoint.py` (adjust the filename), then test it in a browser or with `curl` while it's running, and stop it with `Ctrl+C` when you're done.

Compare against the matching file in `solutions/` once you've made a real attempt.

## Standalone reps: 5 through 7

Exercises 1-4 build one continuous app, and the main project builds a fuller one still. Between those two, it's easy to end up practicing "extend a notes app" specifically, more than the underlying skills themselves. These three exercises are the opposite of exercises 1-4 on purpose: each one is a small, self-contained app in its own unrelated domain, isolating exactly one of this week's core skills for a second, independent rep before you build the real thing. None of them build on each other, and none of them build toward `project/`.

5. `05_bookmarks_routes.py`, a second rep of routes and path parameters (GET list, POST create, GET one by id), in the bookmarks domain.
6. `06_recipe_box_persistence.py`, a second rep of file-based persistence specifically (the routes are already written for you; only load/save are your job), in the recipes domain.
7. `07_movie_watchlist_errors.py`, a second rep of error handling specifically (one validation check on POST, one missing-id check on GET), in the movie watchlist domain.

Same workflow as always: read the relevant note first if it's not fresh, attempt the file, then check `solutions/`.

## A second guided walkthrough: 8

`project/guided-first-endpoint.md` gave you a fully-guided, line-by-line rep of persistence and your first route. `08_guided_validation_endpoint.md` does the same thing for a different mechanic: validating a request body and returning the specific, correct error status for each specific way a request can be wrong, the actual subject of `notes/04-error-handling.md`. Do this one after exercises 1-7, ideally right before starting `project/`; it's the closest rehearsal this week gives you for the kind of careful, multi-check validation logic a thorough notes API benefits from, walked through one line at a time instead of left to your own judgment the way exercise 7 mostly was.

8. `08_guided_validation_endpoint.md` (and its matching `08_guided_validation_endpoint.py` to type into), a tiny feedback-collector endpoint with three separate, deliberately distinct validation checks.
