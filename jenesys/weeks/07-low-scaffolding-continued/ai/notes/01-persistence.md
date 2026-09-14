# Persistence, for an agent specifically

[← Back to Week 7 (AI track): Low-scaffolding build, continued](../README.md)

## What's actually missing right now

Everything your Notes Assistant has done since Week 5 lives in one place: the `messages` list inside `main()`, sitting in your computer's memory (RAM) while the program runs. The moment you quit the program, whether on purpose or because your laptop restarted, that list is gone. Run the program again and Claude starts from a completely blank conversation. It has no idea what you asked yesterday, what tools got called, or what your search tool found the last time you asked about your wifi note.

This is the same "the API is stateless" fact from Week 5's multi-turn exercise, just showing up at a different scale. Within a single run, you handle statelessness by resending `messages` on every request. Persistence is the same idea, one level up: handling statelessness ACROSS runs, by writing that same history to a file before the program ends, and reading it back in the next time the program starts.

## In-memory memory versus persisted memory

Be precise about the difference, because "the app remembers things" is doing double duty here for two genuinely different guarantees:

- **In-memory conversation (Weeks 5-6):** real, but temporary. It survives as long as the Python process is running, and evaporates completely when it exits. This is what you already built.
- **Persistence (this week):** durable. It survives the process exiting, the computer restarting, days passing between runs. This is genuinely new, and it's what lets the second sentence of a brand-new run reference something from a session that ended a day ago.

## What to actually persist for a tool-using agent

For a plain chatbot with no tools, persisting "the conversation" is straightforward: save the list of user and assistant text turns, load it back, done. An agent that uses tools has one more thing to get right: the saved history has to include the actual `tool_use` and `tool_result` content blocks, not just the plain-text parts of the conversation.

Here's the beginner mistake to specifically avoid: it's tempting to persist only the human-readable text (what the user typed, and Claude's final text replies), since that's the part that "looks like the conversation" when you print it. If you do that, and later load it back in as the starting history for a new run, you've thrown away the structured record of what tools were actually called and what they actually returned. Claude, resuming from that trimmed history, has no way to know a tool was ever involved. At best it has to re-derive everything from vaguer text; at worst, it might reference "the note I found earlier" in a way that no longer has any real data behind it, because the actual `tool_result` that grounded that claim never made it into the saved file.

The fix is to save the real message list, tool blocks included, not a human-readable summary of it.

## A genuine practical wrinkle: SDK objects aren't automatically JSON

When you call `client.messages.create(...)`, you get back a typed response object (the SDK's `Message` type), and the blocks inside `response.content` are typed objects too (a `TextBlock`, a `ToolUseBlock`, and so on), not plain Python dictionaries. That's fine, and actually convenient, when you're immediately reusing that response in the SAME Python process: the SDK accepts its own response objects wherever it expects message content, so `messages.append({"role": "assistant", "content": response.content})` just works, and you've already been doing something like it since Week 6.

It stops being fine the moment you try to hand that same object to `json.dump()`, because `json.dump()` only knows how to write plain dictionaries, lists, strings, numbers, and booleans. A typed SDK object isn't any of those, and you'll get a `TypeError` if you try.

The fix: the SDK's response objects expose a `.to_dict()` method that converts the whole object (including everything nested inside `content`) into plain, JSON-safe dictionaries and lists. Use `response.to_dict()["content"]` as the value you store for that assistant turn, both when you append it to your in-memory `messages` list for the next API call within the same run, AND when you write it out to your history file. Using the exact same plain-dict representation in both places means there's only ever one version of "what Claude actually said and did" floating around your program, not two slightly different ones that can quietly drift out of sync with each other.

## Loading back in: expect the file to sometimes be wrong

The other half of persistence is reading the file back in at startup, and this is where this week's second topic, robustness, immediately becomes relevant. What should your program do if:

- The history file doesn't exist yet, because this is the very first time the program has ever run? (Not an error. This is the normal first-run case; start with an empty history.)
- The file exists but is empty, or contains something that isn't valid JSON, because a previous run crashed halfway through writing it? (This IS worth handling deliberately, not letting a raw `json.JSONDecodeError` crash your program on startup, which would be a uniquely bad first impression for a "remembers past runs" feature to make.)

Decide, on purpose, what happens in each case, and say so somewhere visible (a printed message, at minimum) rather than silently and invisibly starting over. See this week's second note for the general version of that same principle.

## A decision that's genuinely yours to make

There's no single correct answer for how much history to keep persisting forever. Options include: one file that grows across every run indefinitely, a file that only keeps the last N turns, a new file per day or per session, or something else entirely. Each has a real tradeoff (an ever-growing file eventually makes every request more expensive in tokens, since you're resending it all; aggressively trimming loses context that might have mattered). Pick one, and be ready to explain why you picked it. That's the actual skill Week 8's "judgment under ambiguity" rubric category is going to be looking for.
