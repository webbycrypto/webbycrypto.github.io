# Dataclasses

[← Back to Going further](../README.md)

## TL;DR

A dataclass is a class whose `__init__` (and a couple of other methods) get written for you, generated automatically from type-hinted attributes instead of typed out by hand.

- Add `@dataclass` above a class, list its attributes as type hints with no `__init__` method at all, and Python generates one that sets each attribute from a matching parameter, in the order you listed them.
- It also generates `__repr__` (a readable printed form, instead of `<SupportTicket object at 0x...>`) and `__eq__` (comparing two instances by their values, instead of only being equal if they're the literal same object in memory).
- Dataclasses have the exact same mutable-default trap as functions do (see Week 1's [note on functions](../../01-foundations-i/notes/04-functions.md)), a default value created once and shared across every instance that doesn't override it. The difference: a dataclass catches the mistake immediately with a loud error at class-definition time, instead of silently sharing state three calls later like the plain-function version does.
- The fix uses `field(default_factory=list)` from the `dataclasses` module: a function that runs fresh for each new instance, instead of a single shared value.

```python
from dataclasses import dataclass, field


@dataclass
class SupportTicket:
    topic: str
    urgency: str
    tags: list[str] = field(default_factory=list)


first = SupportTicket("billing", "high")
first.tags.append("refund")

second = SupportTicket("dark mode request", "low")
print(second.tags)   # [], not ["refund"] -- each instance got its own list
print(first)          # SupportTicket(topic='billing', urgency='high', tags=['refund'])
```

## Comparing this to Week 1's [note on functions](../../01-foundations-i/notes/04-functions.md)

That note's example was:

```python
def add_item(item, cart=None, note="added"):
    if cart is None:
        cart = []
    cart.append(item)
    ...
```

`cart=[]` directly as the default would have been the bug: one list, created once when the function was defined, silently reused and appended to on every call that didn't pass its own `cart`. The fix was checking for `None` and creating a fresh list inside the function body.

Try the equivalent mistake in a dataclass:

```python
@dataclass
class SupportTicket:
    topic: str
    urgency: str
    tags: list[str] = []   # this line does not work
```

This doesn't quietly cause the same bug later. It raises `ValueError: mutable default <class 'list'> for field tags is not allowed` the moment Python defines the class, before you've created a single instance. Same underlying problem as the function version, a mutable default that would otherwise be shared, but a much friendlier failure: loud, immediate, and pointing at the exact line, instead of silent and only obvious three calls later when two unrelated tickets somehow share tags.

## Why this is the bridge to pydantic

A pydantic model is written almost exactly like the dataclass above: type-hinted attributes, no `__init__` you write by hand. The real difference is what happens when the data doesn't match the hints. A dataclass trusts you; passing a number where `topic: str` expects a string just... happens, silently, the same way an unenforced type hint always does (see `notes/02-type-hints.md`). Pydantic reads those exact same hints and actually checks incoming data against them, raising a clear validation error if something doesn't fit, instead of accepting it and failing somewhere else later. Everything in this note (the `@dataclass` decorator, type-hinted fields, generated `__init__`) is the shape pydantic reuses; it just adds real enforcement on top.

## What to watch for

- Reaching for `field(default_factory=...)` even for immutable defaults like `0`, `""`, or `False`. Those are fine as plain defaults; the mutable-default rule only applies to things like lists, dicts, and sets, which can be changed in place after creation.
- Assuming a dataclass validates its data because it has type hints. It doesn't, on its own; see `notes/02-type-hints.md`. That enforcement is specifically what a library like pydantic adds.
- Forgetting the import. `@dataclass` and `field` both come from the standard library's `dataclasses` module; neither is a builtin.
