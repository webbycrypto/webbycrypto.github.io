# Robust to a bad or missing input it hasn't seen before

[← Back to Week 7 (AI track): Low-scaffolding build, continued](../README.md)

## TL;DR

Not crashing is not the same as being robust. This page covers checking risky input before you act on it, and deciding on purpose what your program does when that check fails.

- Real robustness means checking a risky input before you act on it, not just catching whatever error falls out afterward.
- Check for the big, structural problem first, like an empty notes folder, and refuse cleanly with a plain explanation rather than pretending to search and finding nothing.
- Check whether a more specific input, like a filename a tool call asked for, is actually valid right now, while you still have the full list of what counts as valid, so you can give a specific answer instead of a vague one.
- Keep a try/except around the whole thing too, but only as a last-resort backstop for genuine surprises, not as your main way of handling bad input.

```python
def search_notes_tool(filename):
    if not notes:                                             # empty notes folder: refuse cleanly
        return {"content": "No notes exist yet, nothing to search.", "is_error": True}

    if filename not in notes:                                 # validate first, while you still
        available = ", ".join(notes.keys())                   # know the full list of what's valid
        return {"content": f"'{filename}' isn't one of your notes. Try: {available}", "is_error": True}

    return {"content": notes[filename], "is_error": False}

try:
    result = search_notes_tool(tool_input["filename"])
except Exception as e:                                        # backstop for surprises you can't predict
    result = {"content": f"Unexpected error: {e}", "is_error": True}
```

## Raising the bar past "doesn't crash"

"Doesn't crash" is the absolute floor, not the goal. A program that catches every possible exception with a bare `except: pass` technically never crashes, and is also nearly useless, because it has no actual answer for what SHOULD happen when something goes wrong, only "not that." Genuine robustness has two parts, and the second one is the part beginners tend to skip: validating a piece of input BEFORE acting on it, and deciding, deliberately, what your program DOES when that validation fails. Not just "doesn't explode," but does something specific and sensible instead.

## Validate before acting, not just react after

There are two general strategies for handling something that might go wrong:

- **React:** try the risky operation, and catch whatever exception comes out if it fails.
- **Validate:** check, up front, whether the operation is even reasonable to attempt, before you attempt it.

Both have a place, but they are not interchangeable, and leaning entirely on the first one produces worse failures than leaning on the second. Here's why: by the time an exception is raised deep inside some function, a lot of context about WHY the operation was attempted in the first place may already be gone. Compare these two ways of handling "the model asked for a note file that doesn't exist":

```python
# Reactive only: catch the exception after the fact
try:
    with open(filename) as f:
        text = f.read()
except FileNotFoundError:
    result = "Error reading file"  # vague; you've lost the useful specifics
```

```python
# Validate first: check before acting, with full context available
if filename not in notes:
    result = (
        f"'{filename}' is not one of the currently available notes: "
        f"{', '.join(notes.keys())}. Did you mean one of these?"
    )
else:
    with open(os.path.join(NOTES_DIR, filename)) as f:
        text = f.read()
```

The second version isn't just "safer." It's a genuinely more useful response, because the check happens at the point where you still know the full list of what IS valid, and can say something specific and actionable, instead of translating a low-level exception into a generic message after the fact.

This doesn't mean try/except disappears. Keep a try/except around the outer loop or the main entry point as a real last-resort safety net, for the failures you genuinely can't predict or check for in advance (a disk that fills up mid-write, a network blip, a race condition). The point is that this backstop should catch surprises, not carry the entire burden of input handling that a simple `if` check earlier could have handled better and more specifically.

## What "bad or missing input it hasn't seen before" actually covers, for this app

Be concrete about the categories, because "handle bad input" is vague enough to accidentally skip entirely if you don't pin down what counts:

- **A malformed or incomplete user command.** Someone types `summarize` with no filename, or `ask` with nothing after it, or just hits enter on an empty line.
- **A tool argument from the model that doesn't correspond to anything real.** Claude calls your stats tool with a filename that was valid an hour ago but has since been renamed or deleted. The API validated that the ARGUMENT is a string, per your schema; it has no way to know whether that string refers to something that actually exists in your notes folder right now.
- **A persisted history file that's missing, empty, or not valid JSON.** Covered in this week's other note, but worth repeating here: this is exactly the kind of input your Week 6 build was never tested against, because persistence didn't exist yet.
- **An empty or missing notes folder entirely.** What happens on a completely fresh checkout, before any sample notes exist, or if someone accidentally points `NOTES_DIR` at the wrong path?

Pick at least one of these (the project brief asks for at least one) that your current build genuinely has not been tested against, and deliberately trigger it, more than once, before deciding your handling is solid.

## Deciding what the agent should DO, not just avoiding a crash

For each case you handle, write down (in a comment, in your own head, doesn't matter, just actually decide) what the RIGHT response is, specifically. Some real options, all valid depending on the situation:

- Ask for clarification (a malformed user command: tell them what the command needs, don't just silently ignore it).
- Report the specific problem honestly (a tool argument referring to something that no longer exists: this is exactly the `is_error` pattern from Week 6, applied to a new situation).
- Fall back to a safe, clearly-labeled default (a corrupted history file: start a fresh conversation, but SAY that you're doing so, rather than silently discarding someone's history without a trace).
- Refuse cleanly, with a reason (an empty notes folder: don't pretend to search zero notes and "find" nothing; say plainly that there's nothing to search yet).

The common thread across all four: the person (or the model) on the other end of the failure gets told something true and specific, and the program keeps functioning afterward instead of getting stuck in a broken state. That combination, true and specific plus still-functional, is what "robust" actually means here. Neither half alone is enough: a program that crashes with a perfectly accurate error message is not robust, and neither is one that stays running by silently pretending nothing went wrong.
