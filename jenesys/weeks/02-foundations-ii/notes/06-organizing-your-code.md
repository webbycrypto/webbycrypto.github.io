# Organizing your code

[← Back to Week 2: Foundations II and first project](../README.md)

Everything you've written before this week was small enough that organization barely mattered. A handful of loops and functions in one file, read top to bottom, is fine. `app.py` for this week's project is longer than anything you've written so far, with several routes and helper functions in play at once, and that's exactly the size where sloppy organization starts costing you real time, not just looking untidy.

This note is about a skill separate from "does it run": can someone (including you, in three weeks) open this file and understand what it does without re-reading every line first.

## The one-sentence test for a function

If you can't describe what a function does in one plain sentence without using the word "and," it's doing too much.

"Loads the notes from disk" is one job. "Loads the notes from disk and filters out the completed ones and sorts them by date" is three jobs wearing one function's name tag. That's not a hard rule you have to obey every time, it's a smell test: when you notice yourself reaching for "and" to describe a function, ask whether it should actually be two functions, one that does the first thing and one that does the second, with the first one's result handed to the second.

Look at `find_note` in this week's `app.py` starter. Its whole job is: given an id, return the matching note or `None`. That's it. `list_notes`, `create_note`, `get_note`, `update_note`, and `delete_note` all end up needing that exact lookup, so it exists once, as its own function, instead of being retyped five times. That's not an accident; it's the pattern this whole note is about, already sitting in your starter code before you've even filled in the bodies.

## Repeated code is a signal, not just extra typing

If you catch yourself writing nearly the same few lines in two different routes (the same lookup, the same validation check, the same way of building an error response), that's a specific, concrete signal to extract a function, not a style preference. It matters for a reason beyond neatness: when that logic needs to change later (say, notes gain a "completed" flag and every lookup needs to account for it), you want to fix it in the one function every route already calls, not hunt down every place you copy-pasted it and hope you found them all. Bugs from an update that only got applied to three of the five copies are extremely common, and entirely avoidable by not having five copies in the first place. This idea has a name you'll see referenced elsewhere: DRY, "don't repeat yourself."

This doesn't mean panic the moment two lines look similar. Two functions that happen to both contain `return None` are not "repeated code" in any sense that matters. The signal is repeated *logic*, a specific rule or calculation, not repeated syntax.

## Names that tell you what's inside, without opening it

Compare two names for the same function: `helper2` and `find_note`. Both might do the exact same thing. Only one of them tells you that from the call site, without scrolling up to check.

A good name answers "what does this give me back, or what does it do to the world" clearly enough that you don't need the function's body open to use it correctly. `find_note(note_id)` tells you: give it an id, get a note back (or nothing). `process(data)` tells you almost nothing; you'd have to read the whole function every single time you called it, which defeats the entire point of writing a function in the first place, which is to let you *stop* thinking about the details once it's written and tested.

This matters more as your programs grow, not less, because you will not remember what `helper2` does two weeks from now. You will barely remember what it does tomorrow.

## Grouping related things together

Right now, `app.py`'s layout already follows a sensible order: persistence functions (`load_notes`, `save_notes`) together near the top, then the shared `find_note` helper, then the routes, roughly in the same order as the endpoint list in the file's own docstring. That ordering isn't required by Python, the code would run identically shuffled into a random order, but reading it would get noticeably harder. Grouping by what things are *for* (all the persistence code together, all the routes together) means that when you're hunting for "the code that saves to disk," you look in one place instead of scanning the entire file.

As you write your own version, keep that same instinct: when you add a new piece of functionality, ask where it belongs among what's already there, not just whether it works if you paste it at the bottom.

## A before-and-after, so this isn't just abstract advice

Here's the same tiny piece of logic (checking whether a note's text is blank before saving it) written two ways.

Disorganized version, repeated inline in two different routes:

```python
@app.route("/notes", methods=["POST"])
def create_note():
    data = request.get_json()
    if not data.get("text") or not data.get("text").strip():
        return jsonify({"error": "text is required"}), 400
    # ... create the note ...


@app.route("/notes/<int:note_id>", methods=["PUT"])
def update_note(note_id):
    data = request.get_json()
    if not data.get("text") or not data.get("text").strip():
        return jsonify({"error": "text is required"}), 400
    # ... update the note ...
```

Organized version, the check extracted once:

```python
def get_valid_text(data):
    """Return the stripped text from a request body, or None if it's missing or blank."""
    text = data.get("text", "")
    return text.strip() or None


@app.route("/notes", methods=["POST"])
def create_note():
    data = request.get_json()
    text = get_valid_text(data)
    if text is None:
        return jsonify({"error": "text is required"}), 400
    # ... create the note using text ...


@app.route("/notes/<int:note_id>", methods=["PUT"])
def update_note(note_id):
    data = request.get_json()
    text = get_valid_text(data)
    if text is None:
        return jsonify({"error": "text is required"}), 400
    # ... update the note using text ...
```

Both versions work. The second one is the one you want, because the validation rule now lives in exactly one place. If "text is required" later needs to also reject a note that's just whitespace-padded emoji, or gains a max length, you write that once, in `get_valid_text`, and both routes get the fix automatically, instead of you needing to remember there were two copies and find them both.

## Apply this before you consider Day 1-3 done

Once your version of `app.py` runs and passes your own manual testing, go back through it once specifically looking for these four things, before moving on to the debugging drill:

1. Any function you'd need "and" to describe in one sentence.
2. Any block of logic that appears, nearly identically, in more than one route.
3. Any name that doesn't tell you what it returns or does without reading its body.
4. Anything placed somewhere that doesn't match where a reader would instinctively look for it.

This is a real pass, not a formality: budget a few minutes for it specifically, separate from getting the routes working in the first place. Week 3 assumes you've built this habit and expects you to apply it with even less prompting.
