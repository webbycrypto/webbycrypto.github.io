# Organizing Notes Assistant as it grows

[← Back to Week 6 (AI track): Low-scaffolding build](../README.md)

[Week 5's organization note](../../../05-guided-build/ai/notes/03-organizing-notes-assistant.md) pointed out that `notes_assistant.py` reads as three concerns: loading/retrieval, talking to Claude, and the CLI loop. Tool use adds a fourth: deciding which tool to call, running it, and feeding the result back. That's not the same job as "talk to Claude" (that's just sending a request and getting text back) or "retrieval" (that's finding relevant chunks). It's its own thing: reading a `tool_use` block, matching it to a real Python function, running that function, and shaping the result into a `tool_result` block.

## The actual decision this week

Apply the same one-sentence test from Week 2, honestly, to the file as it will look once you're done: can you still describe `notes_assistant.py` in one sentence without an "and"? If tool-calling logic (the function definitions Claude can request, the code that actually runs them, the loop that keeps sending results back until Claude stops asking for more) is small, and reads naturally next to the Claude-calling functions it's extending, one file may still be the right call, the same way Week 3's link shortener solution stayed one file. If it's grown enough that scrolling past tool-handling code to find the retrieval logic (or the reverse) is genuinely slowing you down, that's the signal from Week 3's note, showing up for real this time instead of as a thought experiment: pull the tool definitions and tool-running logic into their own file (something like `tools.py`), and import from it.

Neither answer is required. What's required is that you actually asked the question and can say which way you decided and why, the same expectation `project/README.md` states directly for this week's other decisions. Don't split just because it's now possible to name a fourth concern; don't refuse to split just because Week 3's example didn't need to. Decide based on what your specific file actually looks like once you've built it.

## Why this matters more this week specifically

Once code is doing something as consequential as deciding whether to actually run a function the model asked for, being able to find and reread that exact logic quickly (whether it's a clearly-named section of one file or its own module) is not just a tidiness question. `notes/02-failure-handling-and-hallucinated-results.md` asks you to handle a tool call failing safely; you can't do that with any confidence in code you can't quickly locate and reread.
