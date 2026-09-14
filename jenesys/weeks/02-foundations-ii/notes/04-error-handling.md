# Error handling

[← Back to Week 2: Foundations II and first project](../README.md)

## Two very different kinds of "something went wrong"

Not every unexpected situation in a program is the same kind of problem, and it's worth separating them clearly before writing any error-handling code.

A **bug** is a mistake in your code: you wrote something that doesn't do what you intended, and the fix is to correct the code itself. An off-by-one loop error is a bug. A forgotten `return` is a bug.

An **expected failure case** is different: it's a situation your code didn't cause, that you can anticipate happening during completely normal, correct operation, and that you need to handle gracefully rather than let crash the program. A client requesting a note that doesn't exist isn't a bug in your code; people request nonexistent things all the time (they mistype an ID, or the note was already deleted). A network request timing out isn't a bug in your code either; networks are unreliable. The right response to a bug is to fix the code. The right response to an expected failure case is to handle it on purpose: detect it, and respond with something sensible instead of an ugly, uncontrolled crash.

This week's error case (a client requesting a note ID that doesn't exist) is squarely in the second category, and that distinction is exactly why the fix is "detect this on purpose and return a proper 404," not "prevent this from ever happening" (you can't; you don't control what IDs clients ask for).

## `try`/`except`: catching a failure instead of crashing

```python
try:
    result = risky_operation()
except SomeSpecificError:
    result = None
    print("That didn't work, using a fallback.")
```

Python attempts everything inside the `try` block. If a specific kind of error (an **exception**) occurs while running it, instead of the program crashing immediately, Python jumps straight into the matching `except` block and runs that instead, then continues on normally afterward. If nothing goes wrong, the `except` block is simply skipped entirely.

You saw this already in Week 1's project, catching `requests.exceptions.RequestException` around a network call. The same pattern applies generally: wrap the specific operation that might fail, and specify what to do instead of crashing if it does.

**Be specific about what you catch.** `except Exception:` (or worse, a bare `except:`) will catch *every single kind* of error, including ones you never anticipated and that might indicate a real bug elsewhere in your code, silently swallowing them instead of surfacing them. This can turn a bug that should have been loud and obvious (and easy to fix, because you saw it immediately) into a program that just quietly does the wrong thing with no error at all, which is far harder to track down later. Catch the specific exception type you actually expect and know how to handle (`FileNotFoundError`, `requests.exceptions.RequestException`, and so on), not everything indiscriminately.

## HTTP status codes as the language of "what happened," for machines

Recall from Week 1: every HTTP response carries a status code. In a real API, that status code is how the client (a person's code, not a person reading prose) knows what happened, without needing to parse a message and guess. Getting these right, and returning them deliberately rather than always defaulting to `200`, is a core part of building an API someone else's code can actually rely on. The ones you'll use constantly:

- `200 OK`, a successful GET (or generally, a successful request that isn't specifically a creation).
- `201 Created`, a successful POST that created a new resource.
- `400 Bad Request`, the client sent something malformed or missing required data; the request itself was invalid.
- `404 Not Found`, the specific thing being asked for (a note with this ID, say) doesn't exist.
- `500 Internal Server Error`, something broke on the server's side that wasn't the client's fault; ideally you almost never return this on purpose, since it usually means an actual bug slipped through unhandled.

## Returning a proper error response in Flask

Here's the `get_note` endpoint from the previous note, fixed to handle the "not found" case on purpose instead of silently returning `None`:

```python
@app.route("/notes/<int:note_id>")
def get_note(note_id):
    for note in notes:
        if note["id"] == note_id:
            return jsonify(note)

    return jsonify({"error": f"No note with id {note_id}"}), 404
```

Notice the shape: this still returns JSON (a client's code can reliably parse the response body the same way regardless of success or failure), it returns it with the correct status code (`404`, not the default `200`), and the message is specific enough to actually be useful (`f"No note with id {note_id}"`, not just `"error"`). A client hitting this endpoint for a nonexistent ID gets back a clear, structured, predictable answer instead of a raw Flask crash page or, worse, a `200 OK` response that quietly contains nothing useful.

This is the difference between a program that crashes on a normal, foreseeable situation and one that handles it. The underlying situation (someone asked for a note that isn't there) is identical either way; what differs is whether your code anticipated it.

## What to watch for

- Reaching for a broad `except Exception:` (or bare `except:`) instead of catching the specific error you actually expect, which can hide real bugs behind a false sense of "handled."
- Returning `200 OK` (Flask's default if you don't specify otherwise) for a response that's actually reporting an error. If something went wrong, say so with the status code, not just in prose the client has to parse.
- Treating an expected failure case (like a missing note ID) the same way you'd treat an actual bug, by trying to prevent it from ever happening, instead of detecting it and responding to it gracefully, since you can't control what a client asks for.
- Forgetting that a function which falls through every `if` without hitting a `return` implicitly returns `None`, which is not a valid Flask response and will itself raise an error, not the 404 you meant to send.
