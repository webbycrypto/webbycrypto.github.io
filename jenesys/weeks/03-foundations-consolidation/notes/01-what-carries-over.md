# What carries over from Week 2

[← Back to Week 3: Foundations consolidation](../README.md)

## TL;DR

This page is a pointer, not new material: it lists which Week 2 skills carry straight into this week's project unchanged, and names the one new idea covered separately.

- Flask basics (routes, path parameters, `jsonify()`, reading a request body) work exactly the same as they did in Week 2.
- Saving and loading data as JSON files uses the same `load_...()`/`save_...()` pattern as before. Only what you're storing is different.
- Error handling still means catching expected failures, like a missing id, and returning an honest status code, instead of letting the program crash.
- Debugging still means reading the full error message, forming a specific guess about the cause, and testing that guess directly.
- Organizing your code (one job per function, grouping related code together) still applies, but now it's on you to do it without being reminded.
- The one genuinely new idea this week, covered in the next note, is what a link shortener does with redirects and short codes.

Everything you need for this week's project, apart from one new idea (covered in `02-redirects-and-short-codes.md`), was already covered in Week 2. This note is deliberately short: it's a pointer back, not a re-teaching. If any of the following feels shaky rather than just "a little fuzzy," that's worth actually going back and rereading the linked note in full, rather than pushing forward and hoping it comes back to you.

**Flask itself:** creating an app, defining routes with `@app.route(...)`, specifying `methods=[...]`, path parameters like `<int:some_id>`, `jsonify()` for responses, `request.get_json()` for reading a request body. All of this is exactly the same regardless of what the app is actually for. See [`../../02-foundations-ii/notes/01-web-frameworks.md`](../../02-foundations-ii/notes/01-web-frameworks.md) and [`../../02-foundations-ii/notes/02-endpoints-and-routes.md`](../../02-foundations-ii/notes/02-endpoints-and-routes.md).

**File-based JSON persistence:** the same `load_...()`/`save_...()` pattern, using `json.load`/`json.dump` with `open(..., "r")`/`open(..., "w")` inside `with` blocks, and the same bootstrapping check (does the file exist yet?) before trying to read it. The specific thing you're persisting is different (link mappings instead of notes), but the mechanism is identical. See [`../../02-foundations-ii/notes/03-persistence.md`](../../02-foundations-ii/notes/03-persistence.md).

**Error handling:** the same distinction between a bug and an expected failure case, the same `try`/`except` pattern for genuinely unpredictable failures, and the same idea of returning a proper JSON error with an honest status code (404 for "this doesn't exist") instead of letting something crash. See [`../../02-foundations-ii/notes/04-error-handling.md`](../../02-foundations-ii/notes/04-error-handling.md).

**Debugging methodology:** read the traceback fully, form a specific hypothesis before changing anything, test that hypothesis directly (print-statement debugging is still fair game), isolate the smallest reproducible piece. This is the actual skill the Foundations checkpoint is testing for, and it applies exactly as much here as it did to Week 2's notes API, on code you're now writing with less guidance. See [`../../02-foundations-ii/notes/05-debugging-methodology.md`](../../02-foundations-ii/notes/05-debugging-methodology.md).

**Organizing your code:** one job per function, extracting repeated logic instead of copying it, names that tell you what something returns without opening it, grouping related code together. Apply this without being reminded this time; nobody's telling you to do an organization pass at the end, the way Week 2 did. See [`../../02-foundations-ii/notes/06-organizing-your-code.md`](../../02-foundations-ii/notes/06-organizing-your-code.md). This week adds exactly one genuinely new idea on top, covered in `03-organizing-a-growing-file.md`: what to do when one file stops being enough.

If you find yourself unsure how to structure a route, how to persist something to a file, or how to handle a missing-id case while building this week's project, the honest first move is to go reread the relevant Week 2 note, the same way you'd reach for documentation on the job, rather than waiting for this week's material to re-explain it. That's a deliberate design choice for this week, not a gap.
