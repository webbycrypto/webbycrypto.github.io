# Week 3, second project: a key-value config store API

[← Back to Week 3 project: a URL shortener](README.md)

## Why a second project this week

`README.md` (the URL shortener) is the one Week 3 originally shipped with, and it's still the primary deliverable for Days 1-4. This is a genuinely second, genuinely different one, in the same low-scaffolding style: a goal and a set of constraints, no starter skeleton, no file-by-file walkthrough. Build it after the URL shortener, not instead of it. The point of doing two different low-scaffolding services this week, instead of one, is exactly the point of Week 3 itself, applying skills you already have to shapes you haven't seen before, with the guidance mostly removed; one more genuinely different shape is one more real rep of that, not busywork repeating the first one.

## Goal

Build a small Flask service that acts as a settings store for some other application: a place to save named configuration values (a site name, a feature flag, a numeric limit, whatever a real app might need to look up at runtime) and read them back later, by name.

## Constraints

Your service must:

- Store a value under a given key, through some endpoint you design. Setting a key that doesn't exist yet should create it; setting a key that already exists should overwrite its previous value with the new one.
- Retrieve the value stored under a given key.
- List every key and its current value.
- Delete a key.
- Persist everything to a file, so the stored configuration survives a server restart, the same underlying idea as Week 2's notes API and this week's URL shortener, just applied to a third kind of data.
- Handle a request for a key that doesn't exist with a proper 404 and a clear JSON error message, not a crash. This is the same "expected failure case" category from Week 2's notes: someone (or something) asking for a config key that was never set is completely normal, foreseeable behavior, not a bug.
- Handle a malformed request (one that's missing the actual value it's supposed to be setting) with a proper 400, not a crash and not a silently-created key with a missing or nonsensical value. This is a different failure category than the 404 above: a 400 means "what you sent me doesn't make sense," a 404 means "what you're asking for doesn't exist." Reread `../02-foundations-ii/notes/04-error-handling.md` if the distinction between these two feels fuzzy; getting them backwards on purpose here would defeat the point of this constraint.
- Provide at least one more endpoint or piece of behavior beyond the four described above. A reasonable option: a way to set several keys at once in a single request, a way to check whether a key exists without fetching its value, restricting what types of value are even acceptable to store (deciding on purpose what counts as a valid config value, and rejecting anything else with a 400), or something else you can justify. The choice is yours.

## What's deliberately left for you to decide

This brief doesn't specify: the exact endpoint URLs and HTTP methods, the exact JSON shapes for requests and responses, what a "key" is allowed to look like (any string? letters and underscores only? does it matter?), what counts as a valid "value" (just strings? numbers and booleans too? nested objects?), what happens if someone tries to delete a key that was already deleted, or whether your code stays in one file or gets split into more than one (see `../notes/03-organizing-a-growing-file.md`, the same note the URL shortener pointed you to, for the actual signal to use rather than defaulting to either choice out of habit).

None of these are things to ask about. They're things to decide, the same way both the URL shortener and Week 2's notes API asked you to make small structural calls on your own. Make a call for each one, and be able to say why. If you already made a decision one way in the URL shortener (say, how you structured your error messages, or whether you split files), staying consistent with your own past decision is a perfectly good justification on its own, as long as you're doing it on purpose and not just by accident.

## Suggested approach, not a required order

Get the "set a value" and "get a value" endpoints working end to end first, confirmed with `curl`, before building anything else. Add persistence once that round trip works in memory. Add the "list everything" and "delete" endpoints. Add your error handling for both the 404 and 400 cases. Add your fifth endpoint or behavior last, once the core four are solid. This mirrors the order the URL shortener's own README suggested, since it's a reasonable default order for almost any small CRUD-shaped service, not something specific to either project.

## Stretch goal (optional)

If you finish with time to spare: add a `GET /config/<key>/history` endpoint that returns every value a key has ever held, oldest first, not just its current one. This means changing how you persist data (you'd need to keep a log of changes, not just the latest value for each key) and deciding what counts as a "change" worth recording (does setting a key to the same value it already had count? that's your call, same as everything else in this brief). This is a real, separate design problem, not a small tweak, since it touches your storage format directly; treat it as its own mini version of this same low-scaffolding process, goal plus constraints, your own implementation choices. See `../solutions/config_store_with_history.py` for one way to build this, after attempting it yourself.

## When you're done

Compare against `../solutions/config_store.py` only after your own version works, or after you've genuinely exhausted your own ideas and the relevant Week 2 notes. The solution is one reasonable design, not the design; if yours differs in its data shape, its key rules, or its fifth endpoint but satisfies the constraints above, that's a completely legitimate outcome.

Once both this project and the URL shortener are done, move on to `../checkpoint.md` for the actual Foundations self-check, now with two different pieces of evidence to draw honest answers from instead of one.
