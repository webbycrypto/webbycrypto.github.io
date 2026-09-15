# Type hints

[← Back to Going further](../README.md)

## TL;DR

A type hint is a note in the code saying what type a value is supposed to be, written right after a variable or parameter name with a colon.

- The biggest thing to get right immediately: Python does not enforce type hints at runtime. They're documentation with a specific, checkable syntax, not a rule the language actually applies. Passing the wrong type where a hint says otherwise runs anyway and fails later, somewhere else, in a way that's harder to trace back to the real cause.
- Despite not being enforced, they're worth writing, because your editor, and later, libraries like pydantic, read them and use them: for autocomplete, for catching mistakes before you run anything, and (for pydantic specifically) for actually validating data against them at runtime instead of just hoping.
- `list[str]` means a list where every item is a string. `dict[str, int]` means a dict with string keys and integer values. Both describe the shape, not just "it's a list" or "it's a dict."
- `str | None` means the value is either a string or `None`, the type-hint way of saying "this is optional."

```python
def is_urgent(ticket: dict[str, str]) -> bool:
    return ticket["urgency"] == "high"


def summarize(topic: str, note: str | None = None) -> str:
    if note is None:
        return topic
    return f"{topic}: {note}"
```

## Reading the syntax

`ticket: dict[str, str]` is a parameter with a type hint: `ticket` is the parameter name, `dict[str, str]` is what it's supposed to be. `-> bool` after the closing parenthesis is the function's return type: this function is supposed to hand back a `bool`.

Hints go on class attributes too, and this is the form that matters most for what's coming next in `notes/03-dataclasses.md`:

```python
class SupportTicket:
    topic: str
    urgency: str

    def __init__(self, topic: str, urgency: str):
        self.topic = topic
        self.urgency = urgency
```

## The gotcha, said plainly

```python
def is_urgent(ticket: dict[str, str]) -> bool:
    return ticket["urgency"] == "high"


is_urgent("not a ticket at all")  # runs. doesn't raise. is just wrong.
```

Nothing about that hint stops you from calling `is_urgent` with a plain string instead of a dict. It'll fail eventually, likely with a confusing error somewhere inside the function body, not a clear "you passed the wrong type" message at the call site. A type checker (a separate tool, not something built into running Python) can catch this before you ever run the code, by reading the hints and flagging the mismatch. Without one, the hints are still useful as documentation, but they're not a safety net on their own. This is exactly the gap pydantic actually fills: it reads the same hint syntax you're learning here, and turns it into real, enforced validation at the moment data comes in.

## What to watch for

- Treating a type hint as a guarantee. It isn't one, by itself. Something has to actually read and enforce it (a type checker, or a library like pydantic) for a mismatch to be caught before it causes a real failure.
- `dict[str, str]` vs `dict` with no hint at all: the first tells you (and your editor) what's inside; the second is legal but gives up that information for no benefit.
- `Optional[str]` is the same thing as `str | None`, just older syntax. You'll see both in real code; they mean the same thing.
