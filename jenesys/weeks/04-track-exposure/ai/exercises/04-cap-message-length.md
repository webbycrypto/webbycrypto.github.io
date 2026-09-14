# Exercise: cap how long a single message can be

[← Back to Week 4: Track exposure](../../README.md)

Another short, optional tweak on `../project/chatbot.py`. `chatbot.py` already strips whitespace from `user_text` and ignores it if it comes back empty, which handles one edge case (someone just hitting enter). This exercise adds a different one: what happens if someone pastes in a huge wall of text, whether by accident or on purpose.

## Why this matters, not just "because it's good practice"

Go back to `../notes/02-prompts-and-tokens.md` for a second. More text in means more input tokens, and every model has a maximum context window it simply cannot exceed. A single enormous paste (someone dropping in an entire article, or an accidental double-paste) could, on its own, use a large chunk of that budget, or in an extreme case push a request over the limit and cause it to fail outright. A length cap on a single message is a small, real piece of the same discipline `01-tweak-the-bot.md`'s exercise 3 introduced for the *whole conversation history*: deciding on purpose how much you're willing to send, instead of finding out the hard way when something breaks.

## The task

Pick a maximum length in characters (500 is a reasonable choice for a chat message; feel free to use a different number, but pick one deliberately rather than an arbitrary tiny value that would reject normal sentences). Add a check, after the existing blank-input check and before the message gets appended to `conversation_history`, that does the following if `user_text` is longer than your chosen limit:

- Prints a friendly message telling the user their message was too long, stating both their message's actual length and the limit, so they understand exactly why it was rejected instead of just seeing it silently vanish.
- Does **not** send that message to the model, and does **not** add it to `conversation_history` either; a rejected message should leave no trace in memory, the same way the existing blank-input check already does.
- Goes back to the top of the loop to wait for the next line, the same `continue` pattern you've now used twice already in the other new exercises.

You're not given a code snippet for this one; by now you've seen the shape of this kind of check three times (blank input, `stats`, `clear`), all living in the same stretch of the loop, all following the same "check something about `user_text`, print a message, `continue`" pattern. Write this one the same way, in the same place, using an `if` statement and `len(user_text)`.

## Try it

Type a short, normal message and confirm it still works exactly as before. Then paste in (or generate, however you like, even just typing the same short phrase many times in a row) something well over your limit and confirm you get the friendly rejection instead of a response from the bot, and that a `stats` check afterward (if you did that exercise too) shows the rejected message didn't count as an exchange or add any tokens. If your bot still answers a too-long message, double check the comparison is `len(user_text) > your_limit`, not the other way around; a flipped comparison is an easy, common mistake here and won't error, it'll just silently do the opposite of what you meant.
