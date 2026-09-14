# Exercise: add a stats command

[← Back to Week 4: Track exposure](../../README.md)

Same deal as `01-tweak-the-bot.md`: short, optional, done directly on `../project/chatbot.py`, nothing to submit or compare against an answer key. This one is a genuinely different kind of change from anything in that file, since it adds a whole new command the bot understands, rather than just changing a value or a limit that already existed.

## The task

Right now the only two things you can type that the loop treats specially are `quit`/`exit` (to leave) and a blank line (to be ignored). Add a third special word, `stats`, that when typed instead of a normal message, prints a short summary of the conversation so far instead of sending anything to the model at all. No API call happens for this command; it's a purely local report on numbers your own code has already been collecting.

The summary should include, at minimum:

- How many exchanges have happened so far (one exchange is one user message plus one bot reply). `len(conversation_history) // 2` gets you this, since every exchange appends exactly two entries.
- The total number of input tokens and output tokens used across the whole session, not just the most recent request.

That second one needs a small addition before you can report it: `conversation_history` only ever stored the text of each turn, never the token counts that came back with each response. You'll need two new variables, initialized to `0` before the `while True:` loop starts (call them whatever makes sense to you, `total_input_tokens` and `total_output_tokens` are reasonable names), and you'll need to add to them every time a request succeeds, using the same `response.usage.prompt_tokens` and `response.usage.completion_tokens` fields exercise 2 in `01-tweak-the-bot.md` already showed you exist on every response object. Put those additions right after the line that reads `reply_text = response.choices[0].message.content`, so they only run on a successful call, never on a turn that hit an exception and `continue`d past the API call entirely.

Then, near the top of the loop, right after the blank-input check and before the line that appends `user_text` to `conversation_history`, add the new branch:

```python
if user_text.lower() == "stats":
    print(f"Exchanges so far: {len(conversation_history) // 2}")
    print(f"Total tokens used: {total_input_tokens} input, {total_output_tokens} output")
    continue
```

That much is given to you directly, since it's mostly bookkeeping and not the point of the exercise. The actual task is everything that has to exist *before* this branch can work: the two counters, and the two lines that update them after each real API call. Get those wrong (forget to initialize one, or update it in the wrong place) and `stats` will either crash with a `NameError` or print `0` forever; both are useful, informative failures, not a sign to start over from scratch.

## Make it a little more real: estimate the paid cost too

Once the token totals are working, extend the `stats` output one more time, reusing the pricing table from `../notes/03-cost-and-billing.md`. Add two more lines to the summary that estimate what this exact session would have cost, in dollars, had it been running on Claude Sonnet 5 instead of Groq's free tier: $2.00 per million input tokens, $10.00 per million output tokens. The formula is the same one the billing note walked through by hand:

```
cost = (total_input_tokens / 1_000_000) * 2.00 + (total_output_tokens / 1_000_000) * 10.00
```

Print that as a dollar figure, formatted to a sensible number of decimal places (`f"${cost:.4f}"` is a reasonable choice, since these numbers are usually well under a cent for a short test conversation). Have a real back-and-forth of at least six or seven exchanges, run `stats`, and sanity-check the number against the arithmetic the billing note walked through: it should be in the same tiny ballpark (a fraction of a cent for a short conversation), not off by orders of magnitude. If it's wildly different, that's a sign one of the counters, or the formula, has a mistake worth tracking down before moving on, not something to shrug off.

## Try it

```
You: My name is Alex.
Bot: ...
You: I have two cats.
Bot: ...
You: stats
Exchanges so far: 2
Total tokens used: ... input, ... output
Estimated cost on Claude Sonnet 5: $0.000...
You: quit
```

Confirm `stats` never actually contacts the model (no new tokens get added to the totals just from calling it), and confirm the numbers keep growing correctly as you keep chatting after checking them once.
