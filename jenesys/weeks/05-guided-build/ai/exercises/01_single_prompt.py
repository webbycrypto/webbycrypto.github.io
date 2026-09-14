"""
Exercise 1: one prompt in, one response out.

This is the simplest possible use of the Anthropic API. You send one
message, Claude sends back one response, and that's the entire
interaction. There is no memory of this exchange anywhere except in
the two local variables you're about to print. Run the script again
and Claude has no idea it already answered this exact question once.

Run it with:
    python 01_single_prompt.py

Then go change the `question` variable at the bottom and run it again.
"""

import anthropic

# Anthropic() with no arguments reads your API key from the
# ANTHROPIC_API_KEY environment variable. Never type your actual key
# into a script.
client = anthropic.Anthropic()

# claude-haiku-4-5 is the fastest, cheapest current model. It's a
# deliberate choice for this program's exercises: you're on a free-tier
# key while you're still learning the shapes of these calls, and a
# short single question doesn't need a more expensive model. Every
# example in Weeks 5-7 uses this same model for the same reason. Swap
# it for a more capable model any time; nothing about the API shape
# changes when you do.
MODEL = "claude-haiku-4-5"


def ask_once(question: str) -> str:
    response = client.messages.create(
        model=MODEL,
        max_tokens=1024,
        messages=[
            {"role": "user", "content": question},
        ],
    )

    # response.content is always a LIST of content blocks, never a
    # plain string. For a simple text answer there's normally exactly
    # one block, of type "text", but the shape is always a list, so
    # get in the habit now of checking .type before reading .text.
    # Later, when tools enter the picture in Week 6, this same list
    # can also contain "tool_use" blocks alongside, or instead of,
    # "text" blocks, and code that assumed a single string would break
    # the moment that happens.
    for block in response.content:
        if block.type == "text":
            return block.text

    return ""  # no text block came back; shouldn't happen for a plain question


if __name__ == "__main__":
    question = "In one sentence, what is a Python virtual environment for?"
    answer = ask_once(question)
    print(f"Q: {question}")
    print(f"A: {answer}")
