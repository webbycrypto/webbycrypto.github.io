# Exercise: add a clear command

[← Back to Week 4: Track exposure](../../README.md)

Another short, optional tweak on `../project/chatbot.py`, same spirit as `01-tweak-the-bot.md` and `02-add-a-stats-command.md`. This one is the smallest of the new exercises, but it's worth doing carefully, because it's easy to get subtly wrong in a way that looks fine until you actually test it.

## The task

Add a `clear` command: when the user types `clear` instead of a normal message, wipe the bot's memory of the conversation so far, print a short confirmation that says how many messages were just cleared, and go back to waiting for the next line of input, without contacting the model at all for that turn.

Add this branch in the same spot as the `stats` branch from the previous exercise (after the blank-input check, before `user_text` gets appended to `conversation_history`):

```python
if user_text.lower() == "clear":
    # your code here
    continue
```

Fill in the body yourself. You need to do two things, in this order: capture how many entries were in `conversation_history` *before* you clear it (you need this number to print a meaningful confirmation message; if you clear first, you'll only ever be able to report zero), then actually empty the list. Emptying a list in place, so the same list object keeps being used everywhere else in the loop, is `conversation_history.clear()`. Reassigning with `conversation_history = []` would also make the list empty, but only if nothing else in the file holds a separate reference to the original list expecting it to update; for this program, where `conversation_history` is a single local variable inside `main()` and never handed off elsewhere, either approach happens to work fine here. It's still worth knowing the difference exists, since in a larger program with multiple things referencing the same list, `.clear()` and reassignment are not always interchangeable, and picking the wrong one can produce a bug where one part of the code still sees the old data.

## Prove it actually forgot

This is the part that makes the exercise worth doing instead of just reading about it. After adding the command, run the bot and test this exact sequence:

```
You: My name is Alex and I have two cats.
Bot: ...
You: clear
Cleared 2 messages.
You: What's my name, and how many pets do I have?
Bot: ...
```

If the fix is correct, that last answer should be a version of "I don't know" or "you haven't told me," not "Alex" and "two cats." If the bot still remembers, the most likely cause is that the `clear` branch was placed *after* the line that builds `messages` for the request instead of before it, so the API call for that same turn still went out. Reread where exactly you placed the branch relative to the rest of the loop before assuming the bug is anywhere fancier than that.
