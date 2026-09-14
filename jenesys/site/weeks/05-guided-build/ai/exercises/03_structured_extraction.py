"""
Exercise 3: getting structured data back, not just prose.

So far Claude has given you back free-form text. A lot of real
applications, including the "ticket triage" capstone waiting in Week
8, need something a PROGRAM can act on directly: a category, an
urgency level, a boolean, not a paragraph a human has to re-read to
figure out the actual answer.

The simplest way to get that is to ASK for JSON in your prompt, then
parse the response text as JSON with Python's json module. This works
most of the time with a capable model, but "most of the time" is a
real problem, not a minor detail: nothing forces Claude's reply to
actually be valid JSON. It might add a sentence of explanation before
the JSON, wrap it in markdown code fences, or, more rarely, produce
something JSON-shaped but subtly broken. Your code has to be ready for
that possibility, not just written for the happy path.

This exercise deliberately shows both:
  1. The simple "ask nicely and parse it" approach, with real handling
     around the parse instead of assuming it always works.
  2. A short, commented-out note on `output_config`, which is the more
     robust option when you need a guarantee instead of a good chance.
"""

import json
import anthropic

client = anthropic.Anthropic()
MODEL = "claude-haiku-4-5"


def classify_message(message: str) -> dict:
    """Ask Claude to classify a short support message.

    Returns a dict. On success it has "topic" and "urgency" keys. On
    failure it has an "error" key and a "raw_text" key instead, so the
    caller can see exactly what came back and decide what to do next,
    rather than the function pretending it has an answer when it
    doesn't.
    """
    prompt = f"""Classify the following support message.

Message: "{message}"

Reply with ONLY a JSON object, no other text, no markdown formatting,
in exactly this shape:
{{"topic": "<one or two word topic>", "urgency": "<low, medium, or high>"}}
"""

    response = client.messages.create(
        model=MODEL,
        max_tokens=256,
        messages=[{"role": "user", "content": prompt}],
    )

    raw_text = next(
        (block.text for block in response.content if block.type == "text"),
        "",
    )

    try:
        parsed = json.loads(raw_text)
        parsed["confident"] = True
        return parsed
    except json.JSONDecodeError:
        # This is the real failure mode described in the module
        # docstring above. We do NOT invent a fake topic or urgency
        # just to have something to return. We say plainly that
        # parsing failed, and hand back what Claude actually said, so
        # a human (or a calling function) can see the real problem.
        return {
            "error": "Could not parse a JSON classification from the model's reply",
            "raw_text": raw_text,
            "confident": False,
        }


if __name__ == "__main__":
    examples = [
        "My payment failed twice and I was charged both times, please help urgently.",
        "Just wondering if you have a dark mode planned for the app.",
    ]
    for msg in examples:
        result = classify_message(msg)
        print(f"Message: {msg}")
        print(f"Result:  {result}\n")


# --- A more robust alternative (worth knowing about, not required here) ---
#
# Instead of asking nicely in the prompt and hoping, you can make the
# API GUARANTEE a matching JSON shape with output_config:
#
# response = client.messages.create(
#     model=MODEL,
#     max_tokens=256,
#     messages=[{"role": "user", "content": f'Classify: "{message}"'}],
#     output_config={
#         "format": {
#             "type": "json_schema",
#             "schema": {
#                 "type": "object",
#                 "properties": {
#                     "topic": {"type": "string"},
#                     "urgency": {"type": "string", "enum": ["low", "medium", "high"]},
#                 },
#                 "required": ["topic", "urgency"],
#                 "additionalProperties": False,
#             },
#         }
#     },
# )
#
# With output_config set this way, the text block in the response is
# guaranteed to be valid JSON matching your schema, so you no longer
# need the try/except above for THIS call. The try/except version was
# shown first on purpose: understanding why the guarantee matters
# is more useful right now than skipping straight to the feature that
# makes the problem go away.
