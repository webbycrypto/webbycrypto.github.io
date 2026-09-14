"""
Exercise 3: handling more than one tool_use block in the SAME turn.

notes/01-tool-use-mechanics.md names this directly: "the single most
common bug in a first tool-use loop" is dropping one of two tool
results when Claude asks for more than one tool call in a single
turn, because the API allows that (parallel tool calls) by default.
This exercise deliberately engineers a prompt likely to trigger
exactly that situation, with two unrelated toy tools, so you see the
real shape of a multi-tool_use turn and practice collecting ALL of its
results into ONE reply before this bug has a chance to bite you for
real in the Notes Assistant project.

This DOES need a real API call. Make sure ANTHROPIC_API_KEY is set in
your environment.

Run it with:
    python 03_parallel_tool_calls.py
"""

import anthropic

client = anthropic.Anthropic()
MODEL = "claude-haiku-4-5"


roll_dice_tool = {
    "name": "roll_dice",
    "description": "Roll a single six-sided die and return the result.",
    "input_schema": {"type": "object", "properties": {}, "required": []},
}

flip_coin_tool = {
    "name": "flip_coin",
    "description": "Flip a coin and return either 'heads' or 'tails'.",
    "input_schema": {"type": "object", "properties": {}, "required": []},
}


def roll_dice() -> int:
    return 4  # fixed, not random, so this exercise's output is reproducible


def flip_coin() -> str:
    return "heads"  # fixed, same reason


REAL_FUNCTIONS = {
    "roll_dice": roll_dice,
    "flip_coin": flip_coin,
}


def run():
    messages = [
        {
            "role": "user",
            "content": (
                "I need two things for a board game turn: roll a die, "
                "AND flip a coin, and tell me both results."
            ),
        }
    ]

    response = client.messages.create(
        model=MODEL,
        max_tokens=512,
        tools=[roll_dice_tool, flip_coin_tool],
        messages=messages,
    )
    print(f"stop_reason: {response.stop_reason}")

    tool_use_blocks = [b for b in response.content if b.type == "tool_use"]
    print(f"Number of tool_use blocks in this ONE turn: {len(tool_use_blocks)}")
    for block in tool_use_blocks:
        print(f"  - {block.name}  (id: {block.id})")

    messages.append({"role": "assistant", "content": response.content})

    if not tool_use_blocks:
        text = next((b.text for b in response.content if b.type == "text"), "")
        print(f"No tool calls happened this run; try rerunning. Text: {text!r}")
        return

    # --- The part this exercise is actually about ---
    #
    # Collect EVERY tool_result into ONE list, and send that ONE list
    # as a SINGLE user message. The wrong version of this loop calls
    # messages.create() again separately for each tool_use block,
    # which sends an incomplete history back on the FIRST of those
    # calls (a tool_use block with no matching tool_result yet), and
    # the API will reject it with a 400-level error naming the
    # orphaned tool_use id.
    tool_result_blocks = []
    for block in tool_use_blocks:
        real_function = REAL_FUNCTIONS[block.name]
        result = real_function(**block.input)
        tool_result_blocks.append({
            "type": "tool_result",
            "tool_use_id": block.id,
            "content": str(result),
        })

    print(f"Sending back {len(tool_result_blocks)} tool_result blocks, in ONE message.")
    messages.append({"role": "user", "content": tool_result_blocks})

    response = client.messages.create(
        model=MODEL,
        max_tokens=512,
        tools=[roll_dice_tool, flip_coin_tool],
        messages=messages,
    )
    final_text = next((b.text for b in response.content if b.type == "text"), "")
    print(f"Final answer: {final_text}")


if __name__ == "__main__":
    run()

    # --- Try this: cause the actual bug on purpose ---
    #
    # Comment out the loop above that builds tool_result_blocks, and
    # replace it with a version that calls messages.create() again
    # separately inside the for loop, once per tool_use block, each
    # time sending only ONE tool_result appended to messages instead
    # of collecting them first. Run it. You should hit a real
    # error response from the API, mentioning a tool_use id with no
    # tool_result. That error is the API telling you exactly what this
    # exercise is warning about, not a mysterious failure: the
    # PREVIOUS assistant turn asked for two things, and you only
    # answered one of them before sending a new request.
    #
    # If the model didn't request both tools in parallel this run (it
    # sometimes calls them one at a time across two separate turns
    # instead, which is also valid, just not the case this exercise is
    # built to show), rerun the script a few times, or make the prompt
    # more insistent that both results are needed together in one
    # response.
