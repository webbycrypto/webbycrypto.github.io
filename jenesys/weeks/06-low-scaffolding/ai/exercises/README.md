# Week 6 exercises

[← Back to Week 6 (AI track): Low-scaffolding build](../README.md)

Three small, standalone scripts, all unrelated to Notes Assistant on purpose. Before this week, tool use is a new mechanism (`notes/01-tool-use-mechanics.md` explains it in words); these exercises let you practice the exact syntax and message-passing shape once, cheaply, on a throwaway scenario, before you're also juggling retrieval, chaining, and failure handling in the real project. Getting the mechanics wrong on a toy dice-roller costs you nothing; getting them wrong for the first time inside the actual Week 6 build costs you a debugging session on two unfamiliar things at once instead of one.

All three need a real API call (this week's whole point is the model actually deciding to call something), so make sure `ANTHROPIC_API_KEY` is set in your environment and `anthropic` is installed, same as Week 5.

## 01_tool_schema_practice.py

Isolates just the `input_schema` (JSON Schema) syntax: a toy `roll_dice` tool with `minimum`/`maximum` constraints on its arguments, run against a few different prompts so you can watch how your `description` text and schema shape what Claude actually sends as input, before you write a schema that matters for real.

## 02_tiny_tool_roundtrip.py

The smallest possible complete tool_use / tool_result round trip: one tool, one call, one real result, sent back, one final answer. If the shape of this exercise (append the assistant turn, run the real function, append a tool_result turn with a matching `tool_use_id`, call again) ever feels unclear in the real project, this is the file to come back and reread.

## 03_parallel_tool_calls.py

Deliberately engineers a prompt likely to make Claude request two tools in the SAME turn, and walks through collecting both results into one reply. This is the exact bug notes/01-tool-use-mechanics.md calls out as the single most common mistake in a first tool-use loop; this exercise gives you a safe place to cause it on purpose and see the real error, before it happens by accident later.
