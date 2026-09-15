# Persistence

[← Back to Week 2: Foundations II and first project](../README.md)

## TL;DR

This page covers why data needs to be saved to disk to survive a restart, and how to do that with a plain JSON file instead of a database.

- Data kept only in a Python variable disappears the moment your program stops. Persistence means storing it somewhere, like a file, that's still there after the program exits.
- This week uses a plain JSON file instead of a full database, since a database brings in a lot of new concepts (tables, schemas, a whole new piece of software) you don't need yet.
- Before loading, check `os.path.exists(...)` and return an empty list if the file isn't there yet. Otherwise the very first run crashes with `FileNotFoundError`.
- `with open(path) as file:` is a context manager. It guarantees the file gets closed properly even if something goes wrong while reading or writing.
- `json.load(file)` reads JSON text back into a Python object, and `json.dump(data, file)` does the reverse, writing a Python object out as JSON text.
- Rewriting the whole file on every single change is simple and fine at this small scale, but it's not how a real production system would store data once it gets bigger.

```python
import json
import os

CART_FILE = "cart.json"


def load_cart():
    if not os.path.exists(CART_FILE):
        return []
    with open(CART_FILE, "r") as file:
        return json.load(file)


def save_cart(cart):
    with open(CART_FILE, "w") as file:
        json.dump(cart, file)


cart = load_cart()
cart.append({"item": "apple"})
save_cart(cart)
```

## What persistence actually means

Look back at the example in the previous note: `notes = [...]` is a plain Python list, sitting in memory while the program runs. Every note you add with the POST endpoint gets appended to that same list, and everything works fine, right up until you stop the server. The moment the Flask process ends (you press `Ctrl+C`, or the computer restarts, or `debug=True`'s auto-reload kicks in after a code change), that list is gone completely. Restart the server, and you're back to whatever the list was hardcoded to at the top of the file. Nothing you added survives.

**Persistence** means data survives after the program that created it stops running. A notes app where your notes vanish every time the server restarts isn't really usable; the whole point of a notes app is that your notes are still there tomorrow. To get real persistence, you need to store data somewhere that isn't just a variable living in your program's temporary memory: somewhere that still exists on disk after the program exits, so a future run of the same program can read it back.

## Why a JSON file, not a database, for this level

The standard, production-grade answer to persistence is a database. Databases are powerful, but they're also a genuinely new, fairly deep topic on their own: new concepts (tables, schemas, queries), and usually a new piece of software you'd need to install and run alongside your app. Introducing that right now would bury this week's actual goal (endpoints, persistence as a concept, and error handling) under a pile of unrelated new material.

Instead, this week uses the simplest possible form of persistence: a plain JSON file on disk. Every time your data changes, you write the entire current state out to a file. Every time your server starts up, you read that file back in. It's not how a real production service would store data at scale (a file gets slow and risky to write concurrently once many things are happening at once, which is exactly what a database is built to handle well), but it demonstrates the actual concept, data outliving the process, using tools you already have (Python's built-in `json` module, no new install, no new service to run) and skills you already have (reading and writing files).

## Reading and writing JSON files in Python

Python's built-in `json` module converts between Python objects (lists, dictionaries) and JSON text, the same conceptual conversion `jsonify()` and `request.get_json()` do for you automatically inside Flask, just now applied to a file on disk instead of an HTTP request/response.

```python
import json

# Writing: take a Python object, save it as JSON text in a file.
def save_notes(notes):
    with open("notes.json", "w") as file:
        json.dump(notes, file)


# Reading: load JSON text from a file back into a Python object.
def load_notes():
    with open("notes.json", "r") as file:
        return json.load(file)
```

`open("notes.json", "w")` opens (creating, if it doesn't already exist) a file for writing (`"w"` mode); opening in write mode and writing to it replaces the file's entire previous content. `open("notes.json", "r")` opens it for reading (`"r"` mode) instead.

The `with` keyword matters here beyond just being conventional style. It's called a **context manager**, and its job is to guarantee the file gets properly closed when you're done with it, even if an error happens partway through reading or writing. Without `with`, you'd need to remember to call `file.close()` yourself every single time, including in every place an error might occur partway through, which is easy to forget. Always reach for `with open(...) as file:` when working with files; it's the standard, safe pattern.

`json.dump(notes, file)` writes `notes` (a Python list or dict) into the already-open `file` as JSON text. `json.load(file)` does the reverse: reads JSON text from the already-open `file` and converts it back into a Python list or dict. (Note the naming: `dump`/`load` work directly with an open file; `dumps`/`loads`, with an "s," work with JSON as a plain Python string instead of a file, if you ever need that variant.)

## The bootstrapping problem: what if the file doesn't exist yet?

The very first time your app runs, `notes.json` doesn't exist yet; nothing has saved it. Calling `load_notes()` at that point would try to open a file that isn't there, and raise a `FileNotFoundError`. You need to handle this on purpose:

```python
import json
import os

NOTES_FILE = "notes.json"


def load_notes():
    if not os.path.exists(NOTES_FILE):
        return []
    with open(NOTES_FILE, "r") as file:
        return json.load(file)
```

`os.path.exists(...)` (from Python's built-in `os` module) checks whether a file exists at that path before you try to open it. If it doesn't exist yet, return an empty list, a perfectly reasonable starting state for a notes app that's never been used before, rather than letting the missing file crash your program.

## The tradeoff of "rewrite the whole file every time"

The pattern shown here, save the entire current list back to the file after every change, is simple and easy to reason about, which is exactly why it's the right choice for this level. It does mean that every single change (adding one note) rewrites the *entire* file, not just the new piece. For a small notes app with a handful of entries, this cost is invisible. It would become a real problem at a much larger scale (thousands of entries, many changes per second), which is one of the concrete reasons real production systems reach for a database instead once they outgrow this approach. Knowing this tradeoff exists, even without needing to solve it yet, is part of building good instincts.

## What to watch for

- Forgetting that a Flask app storing data only in a plain Python variable loses everything on every restart. If your data needs to survive a restart, it needs to be written to (and read from) a file, or eventually a database, not just held in memory.
- Trying to read a JSON file before it's ever been created (the very first run), and crashing with `FileNotFoundError` instead of handling that case on purpose.
- Opening a file without `with`, and forgetting to close it, which can cause subtle bugs (like a file that never actually gets its contents flushed to disk) that are easy to miss until they cause a real problem.
- Mixing up `json.dump`/`json.load` (file-based) with `json.dumps`/`json.loads` (string-based, note the extra "s"). Using the wrong pair with the wrong kind of argument raises a clear error, but it's an easy typo to make.
