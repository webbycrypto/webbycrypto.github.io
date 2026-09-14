# Organizing a growing file

[← Back to Week 3: Foundations consolidation](../README.md)

Everything in [`../../02-foundations-ii/notes/06-organizing-your-code.md`](../../02-foundations-ii/notes/06-organizing-your-code.md) still applies exactly as written: one job per function, extract repeated logic instead of copying it, name things so you don't have to reread them to know what they do, group related code together. Reread it if it's fuzzy; this note assumes it, rather than repeating it.

There's one genuinely new idea for this week: what happens when "grouping related things together" inside a single file stops being enough, and the right move is splitting that file into more than one.

## The signal isn't a line count

There's no rule like "split at 200 lines." The actual signal is this: you're scrolling past code for one concern just to reach code for a completely different one, often enough that it slows you down. Two concerns living in the same file is fine right up until working on one of them regularly requires you to hold the other one in your head too, or scroll past it, to get anything done.

A useful test: can you describe what the file is "for" in one sentence, the same one-job idea from Week 2's note, just applied to a whole file instead of a single function? `app.py` in Week 2 is "the notes API": routes and the persistence they need, together, because at that size, that's genuinely one coherent thing. The moment a file's honest one-sentence description needs an "and" (routes *and* a rate limiter *and* user accounts), that's the same signal as a function needing "and" to describe it, just one level up.

## Recognizing when NOT to split is also the skill

Look at `solutions/link_shortener.py` in this same week's folder: roughly 150 lines, a handful of routes, three small helper functions. That file is not big enough to need splitting, and it would be a mistake to split it just because "multiple files" sounds more sophisticated than one. Structure that exists before it's needed is its own kind of clutter: extra files to jump between, extra imports to keep straight, for no actual benefit yet. Recognizing "this doesn't need it yet" is exactly as much a real judgment call as recognizing "this does," and it's the correct call for this specific file, as it stands today.

## What splitting would actually look like, if this file grew

Here's a concrete thought experiment, not something to go do to `link_shortener.py` right now. Imagine this service grew to also handle user accounts (so links belong to someone) and rate limiting (so one person can't create a thousand links a minute). At that point, the file would genuinely be doing several unrelated jobs: talking to storage, deciding who's allowed to do what, and handling the actual routes. The natural first cut is usually along exactly that kind of seam, separating *how data is stored* from *how requests are handled*, because those two concerns tend to change for different reasons and on different schedules (you might swap file storage for a real database without touching a single route; you'd almost never do the reverse).

Concretely, that would mean pulling `load_links`, `save_links`, and `find_link` out into their own file, say `storage.py`, and importing them into `app.py`:

```python
# storage.py
import json
import os

LINKS_FILE = os.path.join(os.path.dirname(__file__), "links.json")


def load_links():
    if not os.path.exists(LINKS_FILE):
        return []
    with open(LINKS_FILE, "r") as file:
        return json.load(file)


def save_links(links):
    with open(LINKS_FILE, "w") as file:
        json.dump(links, file)


def find_link(links, short_code):
    for link in links:
        if link["short_code"] == short_code:
            return link
    return None
```

```python
# app.py
from flask import Flask, jsonify, redirect, request
from storage import load_links, save_links, find_link

app = Flask(__name__)
links = load_links()

# ...routes exactly as before, calling load_links/save_links/find_link
# from storage instead of defining them locally...
```

Nothing about *what* the code does changed. `import` is just Python's way of saying "the functions I need live in another file; go get them from there." The only thing that changed is where each piece of logic lives, grouped now by what it's *for* (storage concerns in one file, request-handling concerns in another) rather than by which file happened to exist when you wrote it.

## Applying this to your own project

This week's brief deliberately doesn't tell you whether to split your own URL shortener into more than one file. That's a real decision, the same kind covered in "what's deliberately left for you to decide" in `project/README.md`: make a call, and be ready to explain it. If your version stays roughly the size of the reference solution, one file is almost certainly the right, unglamorous choice. If you've added enough on top (your own stretch features, extra endpoints, more validation) that it's started to feel tangled, that's worth noticing and acting on, not pushing through.
