# Week 6 project: give Notes Assistant real tools

[← Back to Week 6 (AI track): Low-scaffolding build](../README.md)

Full context: [Week 6 README](../README.md). Read `notes/` in this folder first if you haven't; this project assumes you understand the request/response tool-use cycle and the error-handling rules already, and won't re-explain them here.

Per the root README's philosophy, instructions from here on give you the goal, the constraints, and documentation pointers, not a numbered set of steps. That's deliberate, not an oversight. If you find yourself wanting a step-by-step walkthrough like Week 5 had, that's worth noticing (it might mean the concept notes need a re-read before you write code, not that something's missing here).

## Where you're starting from

You're extending the exact same Notes Assistant you built in Week 5, not starting a new project. Either continue directly in last week's `project/` folder, or copy `notes_assistant.py` and `sample_notes/` into this week's `project/` folder and work here instead. Either is fine; it's your call, and it's the kind of small structural decision the low-scaffolding phase expects you to make on your own.

## The goal

Right now, your `main()` function decides when to search the notes: it calls `find_relevant_chunks` directly, every time the user types `ask <question>`. This week, that decision moves to Claude. Instead of your code always searching, you give Claude a search TOOL, describe what it does, and let Claude decide, based on the conversation, whether and when to call it, the same way it might decide whether a question needs a tool at all.

## What you need to build

- **At least two tools Claude can call.** One should wrap your existing search logic (turn `find_relevant_chunks` into something Claude can invoke by name, with a `query` argument). The second should do something else genuinely useful for this app: some ideas, pick one or invent your own:
  - A tool that reports word count and last-modified date for one specific note file.
  - A tool that lists every note filename currently available.
  - A tool that returns one note's full text given a filename (useful when a chunk isn't enough context).
  It needs to be a real, separate action with its own arguments, not a copy of the first tool with a different name.
- **The two tools must be chained.** The second tool's use, or its arguments, has to genuinely depend on what the first tool actually returned, not fire unconditionally regardless of what happened. Concretely: if your second tool needs a filename, it should only get called with a filename that the search tool actually found. If the search tool found nothing, there's no valid filename to hand the second tool, and calling it anyway is exactly the "unexpected result" this week is about handling correctly, not triggering in the first place.
- **Handle a tool failure or a nonsensical tool call without crashing and without fabricating a result.** Something concrete to actually test, not just imagine: what happens right now if Claude calls your stats tool with a filename that doesn't exist? Run that scenario on purpose. If your program crashes, or silently prints made-up stats, that's the exact bug this week's constraint points at. Fix it so the tool reports the real problem back to the model honestly, using `is_error`, per this week's notes.

## What's not specified here (your call, and be ready to justify it)

- Exact tool names, argument names, and descriptions.
- Whether Claude decides on its own when to call the second tool (by seeing the first tool's result and choosing), or your code decides after inspecting the first tool's result and only offers the second tool when it's relevant. Both are legitimate implementations of "chained." Know which one you built.
- Whether you keep the Week 5 interactive command loop as the outer shell, or restructure it now that Claude is doing more of the deciding.
- Whether your tool definitions and tool-running logic stay in `notes_assistant.py` or move into their own file. See `notes/03-organizing-as-it-grows.md` for the actual test to apply here; either answer is fine, an unconsidered one isn't.

## Where to look

The tool-calling loop itself isn't spelled out here; that's the point of this week. In Anthropic's API documentation on tool use (sometimes called function calling), look specifically for:

- How a tool is described in a request: the `tools` list, and what the `name`, `description`, and `input_schema` fields do. `input_schema` is standard JSON Schema; if you haven't seen JSON Schema before, a plain web search for "JSON Schema basics" will get you there faster than the API docs will.
- What a response looks like when Claude wants to call a tool: which `stop_reason` value signals this, and the exact fields on a `tool_use` content block.
- How you send a result back: the `tool_result` content block, which message role it belongs to, and the field that ties a result back to a specific tool call.
- What `is_error` does on a `tool_result`, and when to set it (this week's `notes/02-failure-handling-and-hallucinated-results.md` covers the reasoning; the docs cover the exact field).

If you hit a confusing 400-level error mentioning a `tool_use` block with no matching `tool_result`, that's almost always a sign your loop dropped a result somewhere, most often when Claude made more than one tool call in a single turn. Re-check your own bookkeeping before assuming the API is broken.

## Syntax reminder (not a solution)

So you're not guessing the shape from a blank page, here's the skeleton of ONE generic tool definition. This is intentionally not either of the two tools you actually need to build, just a reminder of the syntax:

```python
tools = [
    {
        "name": "your_tool_name",
        "description": (
            "A clear, specific description of exactly what this does and "
            "when to use it. Claude decides WHEN to call a tool almost "
            "entirely based on this text plus the conversation, so a vague "
            "description produces unreliable tool use."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "some_argument": {"type": "string", "description": "..."},
            },
            "required": ["some_argument"],
        },
    },
]
```

## How you'll know it's working

- Ask a question that needs the search tool. Print the actual `tool_use` block Claude sends back (name and input) before you execute anything, and confirm the final answer is genuinely built from your real function's real return value, not something that merely sounds plausible.
- Ask something where your second tool should NOT fire (a note that doesn't exist, or a question your search tool finds nothing for), and confirm your program handles it cleanly instead of crashing or guessing.
- Deliberately break a tool on purpose (rename a file so the relevant `open()` call fails, for instance) and confirm your program tells both the model and you, on screen, that the tool failed, rather than continuing as if nothing happened.

If all three of those work, you're ready for Week 7, which adds persistence and a second chaining scenario on top of what you build here.

## Stretch goal (optional): a third tool, with a different trigger condition

Everything above is the actual Week 6 requirement: two tools, chained. If that's solid and you have time and energy left before Week 7, this stretch goal asks for a third tool, chained in through a genuinely different trigger than the first pair.

**The goal:** add a third tool where the DECISION to call it depends on something other than "did the search tool find a matching filename," which was the shape of your first chain. Some directions, pick one or invent your own:

- A tool that only gets called when your search tool's best match scores below some threshold you define (a weak, low-confidence match), and offers the user a broader listing of all available notes instead of answering from a shaky result.
- A tool that only gets called when a question's retrieved chunks span MORE THAN ONE note file, and produces a combined view across those notes rather than treating them as a single source.
- A tool that only fires after two or more "ask" turns in the same session have touched the same note file, on the theory that a note getting asked about repeatedly might be worth surfacing in full rather than one chunk at a time.

**The constraint:** the trigger condition has to be visibly different from Week 6's required pair, not the same "did the first tool find a matching filename" logic wearing a new tool name. Whatever you build, be ready to say, in one sentence, what specifically makes this third tool's trigger condition different from the first chain's, the same justification standard the rest of this week's brief already expects of you.

There's no starter code for this, on purpose, matching the rest of this week's style. If you attempt it, decide for yourself whether it lives as a third tool in your existing tool-calling loop or something structured differently, and be ready to explain why.
