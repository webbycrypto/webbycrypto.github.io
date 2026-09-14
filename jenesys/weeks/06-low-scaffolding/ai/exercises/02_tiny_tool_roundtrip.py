"""
Exercise 2: the smallest possible complete tool_use / tool_result
round trip.

notes/01-tool-use-mechanics.md walks through the request/response
cycle in words. This exercise is that exact cycle, in the smallest
amount of real, runnable code that still does the whole thing
honestly: one tool, one call, one real result, sent back, one final
answer. No Notes Assistant, no retrieval, nothing else competing for
your attention. Once this shape feels obvious, applying it to two
chained tools in the real project (this week's actual goal) is mostly
just "the same thing, twice, with a real decision in between."

This DOES need a real API call. Make sure ANTHROPIC_API_KEY is set in
your environment.

Run it with:
    python 02_tiny_tool_roundtrip.py
"""

import anthropic

client = anthropic.Anthropic()
MODEL = "claude-haiku-4-5"


convert_temperature_tool = {
    "name": "convert_temperature",
    "description": "Convert a temperature from Celsius to Fahrenheit.",
    "input_schema": {
        "type": "object",
        "properties": {
            "celsius": {"type": "number", "description": "The temperature in Celsius to convert."},
        },
        "required": ["celsius"],
    },
}


def convert_temperature(celsius: float) -> float:
    """The real function. Deliberately trivial, so nothing about the
    MATH can distract from the MESSAGE-PASSING this exercise is
    actually about.
    """
    return round((celsius * 9 / 5) + 32, 1)


def run():
    messages = [
        {"role": "user", "content": "What's 100 degrees Celsius in Fahrenheit?"},
    ]

    # --- Turn 1: send the question, with the tool available ---
    response = client.messages.create(
        model=MODEL,
        max_tokens=512,
        tools=[convert_temperature_tool],
        messages=messages,
    )
    print(f"Turn 1 stop_reason: {response.stop_reason}")

    # Whatever Claude sent back (text, tool_use, or both) becomes the
    # next assistant turn in the running history. This has to happen
    # BEFORE you send anything back, or the next request's history is
    # missing an entire turn.
    messages.append({"role": "assistant", "content": response.content})

    if response.stop_reason != "tool_use":
        # Nothing to run; Claude answered directly. Shouldn't happen
        # for this particular question, but a real loop always checks.
        final_text = next((b.text for b in response.content if b.type == "text"), "")
        print(f"No tool call happened. Final answer: {final_text}")
        return

    # --- Run the real tool, for every tool_use block in this turn ---
    #
    # There's only one tool_use block for this simple question, but
    # the loop below is written to handle more than one anyway,
    # because that's the realistic shape (see
    # notes/01-tool-use-mechanics.md's warning about collecting ALL
    # results from a turn into ONE message before sending anything
    # back; exercise 03 in this folder is entirely about that case).
    tool_result_blocks = []
    for block in response.content:
        if block.type != "tool_use":
            continue
        print(f"Claude called {block.name} with input {block.input}")
        result = convert_temperature(**block.input)
        tool_result_blocks.append({
            "type": "tool_result",
            "tool_use_id": block.id,  # MUST match the tool_use block's own id
            "content": str(result),
        })

    # --- Turn 2: send the real result(s) back, as a new user message ---
    messages.append({"role": "user", "content": tool_result_blocks})

    response = client.messages.create(
        model=MODEL,
        max_tokens=512,
        tools=[convert_temperature_tool],  # keep offering the tool on every request
        messages=messages,
    )
    print(f"Turn 2 stop_reason: {response.stop_reason}")

    final_text = next((b.text for b in response.content if b.type == "text"), "")
    print(f"Final answer: {final_text}")


if __name__ == "__main__":
    run()

    # --- What to look at afterward ---
    #
    # Print len(messages) right before the second messages.create()
    # call. You should count three entries: the original user
    # question, the assistant turn containing the tool_use block, and
    # the user turn containing the tool_result. All three get resent
    # together on turn 2, because (Week 5's multi-turn exercise, again)
    # the API has no memory between requests at all.
    #
    # Try this: change convert_temperature_tool's description to
    # something wrong on purpose, like "Convert a distance from miles
    # to kilometers," while leaving the actual convert_temperature
    # function and its real math untouched. Ask the same Celsius
    # question again. Does Claude still call the tool? Does it trust
    # the (now-mismatched) result it gets back, or does the final
    # answer get confused? A tool's description is the ONLY thing
    # Claude has to go on when deciding whether, and how, to use it;
    # your code being correct doesn't help if the description lies
    # about what the code actually does.
