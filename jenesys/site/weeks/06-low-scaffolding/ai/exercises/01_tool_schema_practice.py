"""
Exercise 1: writing a tool's input_schema, in a scenario that has
nothing to do with Notes Assistant.

Before you write your first REAL tool definition for the Notes
Assistant project, it's worth practicing the JSON Schema syntax itself
on something small and throwaway, so a typo in your schema and a
genuine misunderstanding of tool use don't show up mixed together the
first time you try this for real.

This exercise defines ONE toy tool, roll_dice, that Claude can call to
roll some number of dice with some number of sides each. It's a good
practice scenario specifically because the arguments have real
constraints worth expressing in the schema itself (a die needs at
least 4 sides to mean anything sensible, you probably don't want to
roll 1000 dice at once), not just a name and a type.

This DOES need a real API call, since the entire point is watching
Claude read your schema and description and decide what arguments to
actually send. Make sure ANTHROPIC_API_KEY is set in your environment.

Run it with:
    python 01_tool_schema_practice.py
"""

import json
import anthropic

client = anthropic.Anthropic()
MODEL = "claude-haiku-4-5"


# --- The tool definition ---
#
# Read this closely before running anything. `input_schema` is
# standard JSON Schema: `type: object` with a `properties` dict (one
# entry per argument, each with its own `type`, and optionally a
# `description`, a `minimum`/`maximum`, or an `enum`), plus a
# `required` list naming which properties MUST be present. Claude
# fills these arguments in based entirely on your `description` text
# and the conversation; it never sees the Python function below this
# dictionary at all.
roll_dice_tool = {
    "name": "roll_dice",
    "description": (
        "Roll one or more dice and return the results. Use this any "
        "time the user asks to roll dice, check a random outcome, or "
        "asks something like 'what are the odds' in a way that a dice "
        "roll could help answer."
    ),
    "input_schema": {
        "type": "object",
        "properties": {
            "sides": {
                "type": "integer",
                "description": "How many sides each die has. Standard dice are 4, 6, 8, 10, 12, or 20 sided.",
                "minimum": 4,
                "maximum": 100,
            },
            "count": {
                "type": "integer",
                "description": "How many dice to roll at once.",
                "minimum": 1,
                "maximum": 20,
            },
        },
        "required": ["sides", "count"],
    },
}


def roll_dice(sides: int, count: int) -> dict:
    """The REAL function. Deliberately not random for this exercise
    (see FIXED_ROLLS below), so the printed output is identical every
    time you run this file, which makes it easier to see exactly what
    Claude asked for versus what came back.
    """
    FIXED_ROLLS = [4, 1, 6, 3, 2, 5, 4, 6, 1, 3, 5, 2, 6, 4, 1, 3, 2, 5, 6, 4]
    rolls = [(FIXED_ROLLS[i % len(FIXED_ROLLS)] % sides) + 1 for i in range(count)]
    return {"sides": sides, "count": count, "rolls": rolls, "total": sum(rolls)}


def run_prompt(prompt: str):
    print(f"Prompt: {prompt!r}")
    response = client.messages.create(
        model=MODEL,
        max_tokens=512,
        tools=[roll_dice_tool],
        messages=[{"role": "user", "content": prompt}],
    )

    tool_use_blocks = [b for b in response.content if b.type == "tool_use"]
    if not tool_use_blocks:
        text = next((b.text for b in response.content if b.type == "text"), "")
        print(f"  No tool call. stop_reason={response.stop_reason}, text={text!r}")
        return

    for block in tool_use_blocks:
        print(f"  Claude wants to call: {block.name}")
        print(f"  With input: {json.dumps(block.input)}")
        # This is the part worth staring at: block.input is a plain
        # Python dict already, parsed from JSON by the SDK for you.
        # Claude decided these EXACT values (sides, count) from your
        # schema's descriptions plus the prompt text, not from running
        # any code.
        result = roll_dice(**block.input)
        print(f"  Real function result: {result}")
    print()


if __name__ == "__main__":
    run_prompt("Roll a d20 for me.")
    run_prompt("I need to roll two six-sided dice for a board game.")
    run_prompt("What's a good topping for a pizza?")  # should NOT trigger the tool at all

    # --- Try this ---
    #
    # 1. Change the `description` on the "sides" property to something
    #    vague, like just "a number", and rerun the "Roll a d20" prompt.
    #    Does Claude still correctly infer sides=20 from "d20", or does
    #    a worse description lead to a worse (or missing) argument?
    #    The API validates that your arguments match the schema's
    #    TYPES; it has no way to check whether Claude's guess at the
    #    right VALUE was reasonable. That part rides entirely on how
    #    clearly you described what each argument means.
    #
    # 2. Remove "count" from the `required` list (leave it in
    #    `properties`) and ask "roll a d6" with no count mentioned at
    #    all. Does Claude still send a count? What value? A required
    #    field with no default forces Claude to have an opinion; an
    #    optional one leaves your real function to decide what happens
    #    if the argument never shows up (this is exactly why
    #    roll_dice(**block.input) below would raise a real Python
    #    TypeError if "count" were ever missing; try it and see the
    #    actual error before deciding how you'd want to guard against
    #    it).
