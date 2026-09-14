"""
Exercise 1: the SDK-response-to-JSON gotcha, in a tiny throwaway scenario.

notes/01-persistence.md flags a real, specific trap: `response.content`
from a real `client.messages.create(...)` call is a list of typed SDK
objects (a TextBlock, a ToolUseBlock, and so on), not plain
dictionaries. That's fine when you're just reusing the object inside
the same Python process, but the moment you try to `json.dump()` it
to save it to a history file, you get a real `TypeError`, because
`json.dump()` only understands plain dicts, lists, strings, numbers,
and booleans.

This exercise reproduces that exact trap WITHOUT needing an API key or
a network call, using small stand-in classes (FakeTextBlock,
FakeToolUseBlock, FakeMessage) built specifically to mirror the real
SDK's shape closely enough to practice the actual fix once, cheaply,
here, before it matters for real in this week's persistence work.

Run it with:
    python 01_serialize_sdk_response.py
"""

import json


class FakeTextBlock:
    """Stands in for the SDK's real TextBlock. Same two things that
    matter for this exercise: a `.type` attribute, and a `.to_dict()`
    method that returns a plain, JSON-safe dict version of itself.
    """

    def __init__(self, text):
        self.type = "text"
        self.text = text

    def to_dict(self):
        return {"type": self.type, "text": self.text}


class FakeToolUseBlock:
    """Stands in for the SDK's real ToolUseBlock."""

    def __init__(self, id, name, input):
        self.type = "tool_use"
        self.id = id
        self.name = name
        self.input = input

    def to_dict(self):
        return {"type": self.type, "id": self.id, "name": self.name, "input": self.input}


class FakeMessage:
    """Stands in for the SDK's real Message (what response.create(...)
    actually returns). Its own `.to_dict()` converts EVERYTHING nested
    inside `content`, not just itself, which is exactly what the real
    SDK's `.to_dict()` does.
    """

    def __init__(self, content, stop_reason):
        self.content = content
        self.stop_reason = stop_reason

    def to_dict(self):
        return {
            "content": [block.to_dict() for block in self.content],
            "stop_reason": self.stop_reason,
        }


# A fake response, shaped like a real one where Claude replied with
# some text AND asked to call a tool in the same turn.
fake_response = FakeMessage(
    content=[
        FakeTextBlock("Let me check that note for you."),
        FakeToolUseBlock(id="toolu_01abc", name="search_notes", input={"query": "wifi password"}),
    ],
    stop_reason="tool_use",
)


def try_dump_raw(messages: list) -> None:
    print("Attempting json.dumps() on the RAW SDK-shaped objects...")
    try:
        json.dumps(messages)
        print("  Unexpectedly succeeded. (This should not happen.)")
    except TypeError as e:
        print(f"  TypeError, exactly as notes/01-persistence.md warns: {e}")


def dump_with_to_dict(messages_raw: list) -> str:
    """The fix: replace any raw SDK-shaped content with its
    .to_dict()'d version BEFORE it goes anywhere near json.dumps().
    """
    fixed_messages = []
    for message in messages_raw:
        content = message["content"]
        if hasattr(content, "to_dict"):
            content = content.to_dict()["content"]
        elif isinstance(content, list) and content and hasattr(content[0], "to_dict"):
            content = [block.to_dict() for block in content]
        fixed_messages.append({"role": message["role"], "content": content})
    return json.dumps(fixed_messages, indent=2)


if __name__ == "__main__":
    # The exact shape a real conversation history builds up: a plain
    # dict for the user's turn, and the SDK's own object for the
    # assistant's turn, straight out of response.content.
    messages = [
        {"role": "user", "content": "What is my wifi password?"},
        {"role": "assistant", "content": fake_response.content},
    ]

    try_dump_raw(messages)

    print()
    print("Now fixing it with .to_dict() before dumping...")
    dumped = dump_with_to_dict(messages)
    print(dumped)

    reloaded = json.loads(dumped)
    print()
    print(f"Reloaded successfully: {len(reloaded)} messages, no exception.")

    # --- What to notice ---
    #
    # The raw version fails with a TypeError naming the exact class
    # (FakeTextBlock) that json.dumps() didn't know how to handle. In
    # the real project, that error will name a real SDK class instead
    # (something like TextBlock or ToolUseBlock), but it's the SAME
    # underlying problem: a typed object sitting where json.dumps()
    # expects a plain dict.
    #
    # The fix does exactly one thing: call .to_dict() on anything that
    # has it, BEFORE it gets anywhere near json.dumps(), not after.
    # There's no way to "catch" this with a try/except around
    # json.dumps() and recover; by the time the exception fires, the
    # dump has already failed. The fix has to happen on the way in.
    #
    # Try this: add a THIRD fake block type of your own (something
    # like FakeImageBlock, with a made-up field or two), append an
    # instance of it to fake_response's content list, and rerun. Does
    # dump_with_to_dict still handle it correctly with no changes?
    # (It should, since it calls .to_dict() generically rather than
    # checking for each block type by name; that's a deliberate design
    # choice worth noticing, not an accident.)
