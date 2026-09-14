# Exercise: log the conversation to a file when you quit

[← Back to Week 4: Track exposure](../../README.md)

`../project/README.md`'s "What to notice" section already pointed this out as a real extension worth trying: right now, quitting the chatbot throws the entire conversation away, because `conversation_history` is just a plain Python list living in memory for one run. This exercise is that extension, made concrete. It's the biggest of the new tweak exercises in this folder, since it introduces something none of the others touch: writing to a file.

## The task, part one: save on exit

When the user types `quit` or `exit` (the existing `break` in the loop), instead of just exiting immediately, first write the whole conversation out to a plain text file, then exit. Do this right after the `break` fires, either by moving the file-writing code to just before `main()` returns, or by writing a small helper function and calling it right where `break` currently is, before the loop actually exits. Either structure is fine; the point is that the file gets written exactly once, right before the program ends, using whatever `conversation_history` holds at that moment.

You'll need Python's `open()` in write mode, using a `with` block so the file closes automatically even if something goes wrong partway through:

```python
with open("conversation_log.txt", "w") as log_file:
    for entry in conversation_history:
        log_file.write(f"{entry['role']}: {entry['content']}\n")
```

That snippet is enough to get a working version. Read it before typing it, though, rather than copying blindly: `conversation_history` is a list of dictionaries, each with a `"role"` key (`"user"` or `"assistant"`) and a `"content"` key (the actual text), exactly like the notes on prompts described. Looping over it and pulling both fields out for each entry is the same idea as looping over any list of dictionaries you'd have written a plain exercise on back in Foundations, just applied to real data your own program generated.

Run a short conversation, quit, and open `conversation_log.txt` (it'll appear in whichever folder you ran the script from) in a text editor. Confirm every message you typed and every reply the bot gave is in there, in order, readable by a human, not as raw Python syntax.

## Make the filename a little more useful

A fixed filename means every run overwrites the last one's log. Fix that by putting a timestamp in the filename instead, using Python's built-in `datetime` module:

```python
import datetime
```

Add that import near the top of the file with the others, then build the filename right before opening it:

```python
timestamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
filename = f"conversation_log_{timestamp}.txt"
```

Use `filename` in place of the hardcoded `"conversation_log.txt"` from before. Run the bot twice, in two separate short sessions, and confirm you now get two different, clearly timestamped files sitting side by side instead of one overwriting the other.

## A stretch, not required: load the log back in on startup

The project README specifically called out that a bot which remembers you *across* separate runs (not just within one) would need to save the transcript and load it back in. You now have half of that (saving); if you want to see the other half too, try having `main()` check, right at startup, whether any `conversation_log_*.txt` files already exist in the current folder (the `glob` module's `glob.glob("conversation_log_*.txt")` finds them), and if so, offer to load the most recent one back into `conversation_history` before the loop starts, parsing each line back into a `{"role": ..., "content": ...}` dictionary the reverse of how you wrote it out. This is genuinely more involved than anything else in this file (you're now writing a small parser, and deciding what to do if a line looks malformed), which is exactly why it's optional rather than the core task. Skip it if you'd rather move on to the blockchain track; the save-on-exit half above is the part worth not skipping.
