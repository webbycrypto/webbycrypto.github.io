# Week 2 project: a notes/task API

[← Back to Week 2: Foundations II and first project](../README.md)

## What you're building

A small but complete Flask API for managing a list of notes (short text tasks), with:

- **GET /notes**, list every note.
- **GET /notes/\<note_id\>**, get one specific note. Returns a proper 404 if the id doesn't exist.
- **POST /notes**, create a new note.
- **PUT /notes/\<note_id\>**, update an existing note's text. Also returns a 404 if the id doesn't exist.
- **DELETE /notes/\<note_id\>**, delete a note. Also returns a 404 if the id doesn't exist.

Data persists to a JSON file on disk, so your notes survive a server restart. This pulls together everything from this week's notes: Flask routes and methods, path parameters, file-based persistence, and deliberate error handling, all in one working app.

If you worked through `exercises/01` through `04`, this will feel familiar: it's the same ideas, put together into one complete app with a couple of additional endpoints (update and delete) you haven't built yet.

## Data shape

Each note is a dictionary with two fields:

```python
{"id": 1, "text": "Buy milk"}
```

`id` is an integer, assigned automatically when a note is created (never supplied by the client). `text` is a string, the actual content of the note.

## `app.py`: the starter skeleton

`app.py` in this folder has the Flask app set up, the persistence functions' signatures declared, and every route declared with its decorator and docstring already in place, but the actual logic inside each function left for you to fill in (`# your code here`). This is more scaffolding than a blank file, but less than the earlier exercises gave you; you've already built each of these pieces once, in isolation, in `exercises/`. Now put them together and extend them (PUT and DELETE are new).

Work through the routes in this order, and test each one with `curl` or a browser before moving to the next:

1. `load_notes()` / `save_notes(notes)`, the persistence helpers (same as `exercises/03`).
2. `GET /notes`, list everything.

For these first two, use `guided-first-endpoint.md` in this same folder instead of the hints below: it walks through both persistence functions and this first route one line at a time, the same fully-guided treatment Week 1's `09_guided_grade_report.md` gave you, since this is the first time you're writing inside a framework instead of a plain script. Come back here at step 3 once you've finished it.

3. `POST /notes`, create a note. Remember: assign the id yourself, don't trust a client-supplied one.
4. `GET /notes/<note_id>`, get one, with the 404 case.
5. `PUT /notes/<note_id>`, update one's `text`, with the 404 case. New this week: read the updated text out of `request.get_json()`, find the matching note by id, update its `"text"` field in place, save, and return the updated note.
6. `DELETE /notes/<note_id>`, remove one, with the 404 case. New this week: find the matching note, remove it from the list (Python lists have a `.remove(...)` method, or you can rebuild the list with a list comprehension that excludes it), save, and return something reasonable, like the deleted note, or an empty response with status `204 No Content`, a status code specifically meaning "successful, and there's deliberately nothing to send back."

## A repeated pattern worth noticing

GET-one, PUT, and DELETE all start the same way: search for a note matching the given id, and do something different depending on whether it's there. That's exactly why `find_note` already exists in the starter as its own function instead of being left for you to invent: the lookup itself only needs writing once, in `find_note`'s body, and then reused by all three routes. Notice `find_note` returns `None` when nothing matches, rather than deciding on a 404 itself; that choice, lookup and response-deciding as two separate jobs, is a small, concrete example of the one-job-per-function idea in `notes/06-organizing-your-code.md`. As you write the three routes that call it, each one decides for itself what "not found" means for that specific endpoint.

## Testing your endpoints

You can test with `curl` in a second terminal while the server runs, or with a browser for GET requests (browsers can't easily send POST/PUT/DELETE without extra tools). A few example `curl` commands:

```
curl http://127.0.0.1:5000/notes
curl -X POST http://127.0.0.1:5000/notes -H "Content-Type: application/json" -d "{\"text\": \"Buy milk\"}"
curl http://127.0.0.1:5000/notes/1
curl -X PUT http://127.0.0.1:5000/notes/1 -H "Content-Type: application/json" -d "{\"text\": \"Buy oat milk\"}"
curl -X DELETE http://127.0.0.1:5000/notes/1
curl http://127.0.0.1:5000/notes/999
```

That last one should come back with a 404 and a clear JSON error message, not a crash.

## When you're done

Compare your finished `app.py` against `solutions/notes_api.py`. It's fine, and expected, if your structure differs in small ways (different variable names, a helper function you added, a slightly different error message). What matters is that all five endpoints work, persistence actually survives a restart, and the missing-id case returns a proper 404 rather than crashing.

## Organize before you call it done

Working is not the same finish line as done. Before moving on to the debugging drill, go back through your own `app.py` with `notes/06-organizing-your-code.md`'s four-point checklist in hand: any function you'd need "and" to describe, any logic repeated across routes, any name that doesn't say what it returns, anything sitting somewhere a reader wouldn't expect to find it. This isn't a formality. Budget a real few minutes for it, separate from getting the routes working in the first place. Week 3's project gives you noticeably less guidance than this one did, and it assumes this pass is already a habit, not something you're doing for the first time under pressure.

## Stretch goals (optional)

If your five endpoints work, persistence survives a restart, and you've done the organization pass above, and you still have time before Day 4's debugging drill, these are goals with constraints, not new starter files: build them directly on top of your own working `app.py`, deciding the implementation details yourself. `solutions/notes_api_extended.py` is a full reference implementation of all seven below, together, in case you want to check your approach once you've built your own version of one or more; there's no separate starter skeleton for any of them.

**1. A `completed` boolean field, with a filter.** Let a note optionally carry a `"completed": true/false` field (default `false` if the client doesn't send one when creating it), and add a way to update it (either through your existing PUT, or a dedicated endpoint like `PATCH /notes/<note_id>/complete` that just flips it). Then add a query parameter to `GET /notes`, something like `GET /notes?completed=true`, that returns only the notes matching that value. Reading a query parameter in Flask uses `request.args.get("completed")`, a new piece of `request`'s toolkit beyond the `request.get_json()` you've already used for request bodies; query parameters live in the URL itself, not the body, which is why they need their own way of being read.

**2. A `tags` field, with a filter.** Let a note optionally carry a `"tags"` field, a list of short strings (default an empty list `[]` if not provided). Add a query parameter, `GET /notes?tag=work`, that returns only notes whose `tags` list contains that value.

**3. Keyword search.** Add `GET /notes?search=milk`, returning only notes whose text contains that word or phrase, case-insensitively (so a search for "MILK" still matches a note whose text contains "milk"). Decide for yourself whether this should require an exact substring match or something fuzzier; a plain substring check is a completely reasonable choice, and worth being able to explain why you picked it.

**4. Sorting.** Add `GET /notes?sort=text`, returning notes sorted alphabetically by their text instead of in whatever order they happen to sit in your list (which is probably creation order, since that's the order `append()` puts them in). Decide what the default order should be when `sort` isn't specified at all.

**5. Pagination.** Add `GET /notes?limit=2&offset=0` support, returning only a slice of the (possibly filtered, possibly sorted) results: `offset` says how many to skip from the front, `limit` says the maximum to return after that. This is the same idea behind "page 1 of results, page 2 of results" on any site with a long list of things. If a learner combines this with goals 1-4 above, decide for yourself what order the operations should happen in (filter first, then sort, then paginate is one reasonable, defensible choice; be ready to explain why that order and not another).

**6. A bulk-create endpoint.** Add `POST /notes/bulk`, accepting a body shaped like `{"notes": [{"text": "..."}, {"text": "..."}]}`, creating every note in the list in one request instead of requiring one `POST /notes` call per note. Decide what should happen if the body is malformed (missing the `"notes"` key entirely, or `"notes"` isn't actually a list); a 400, the same "the request itself is invalid" status from `notes/04-error-handling.md`, is the reasonable choice here, not a 404 or a silent empty response.

**7. A stats endpoint.** Add `GET /notes/stats`, returning a small summary: how many notes exist in total, how many are completed, how many aren't, and (if you also built goal 2) a count of how many notes carry each tag. This is a different kind of exercise than the others: instead of filtering or reshaping the existing list of notes, you're calculating new numbers *about* it, using the same accumulator pattern from Week 1's loop notes (running totals, just several of them at once, tallied in a single pass over the list instead of one loop per number).

None of these change what "done" means for the core Week 2 deliverable. They exist so a learner who finishes the required five endpoints with real time left over has somewhere genuine to point that time, rather than sitting idle until Day 4, or moving on to Week 3 without ever having practiced reading query parameters, which Week 3's own project may or may not ask you to use on your own initiative.

## Then: the debugging drill

Once your notes API works, move on to `debugging_drill.py` and `debugging_drill_symptoms.md` in this same folder. That's a separate, already-written small program with deliberate bugs in it; your job there is different: not to build something new, but to diagnose and fix problems in code you didn't write, using only the symptoms you'd observe, exactly like Week 3's checkpoint will eventually ask of you on a whole different project.
