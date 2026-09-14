# Project: a tiny chatbot with memory

[← Back to Week 4: Track exposure](../../README.md)

This is the Days 1-2 deliverable: a command-line chatbot that calls a hosted model through Groq's free API and remembers the conversation within a single run. There's no separate solutions file for this one; `chatbot.py` in this same folder is the real, complete, runnable result.

If you haven't already, work through `../exercises/00-guided-build-the-chatbot.md` first. It has you type and run this same program in four small, tested-in-isolation steps, before you've read any explanation of the finished file. What follows here is a second pass over that same file, chunk by chunk, useful for extra depth on any piece, not your first exposure to it.

Read the notes in `../notes/` first if you haven't (what a hosted API is, what prompts and tokens are, what billing looks like). This walkthrough assumes you already have that vocabulary.

**Why Groq for this specific week:** its free tier needs no credit card at all, which keeps this taste week completely frictionless. Starting Week 5, once you've committed to the AI track for real, the project switches to Anthropic's Claude, whose SDK is shaped a little differently (a separate `system` parameter instead of a system-role message, and replies shaped as a list of content blocks instead of a plain string). The underlying pattern, request in, response out, memory is just resending the transcript, is identical either way. You're learning that pattern now, for free, before the provider-specific details matter.

## Step 1: install the SDK

Groq publishes an official Python package for calling their API. In a terminal, inside your project's Python environment:

```
pip install groq
```

That's the library that handles the actual network request/response mechanics for you: building the HTTP request, sending it, parsing the response into a usable Python object, and raising a proper Python exception when something goes wrong instead of leaving you to guess from a raw error string.

## Step 2: set your API key as an environment variable

Week 0 told you never to put your API key directly in a code file. Here's exactly how to avoid that.

An environment variable is a named value that lives in your terminal session (or your operating system), outside of any file, that running programs can read. Setting one means your key exists only in your terminal's memory for that session, never typed into a file that could get committed to git and pushed to a public GitHub repo by accident.

**On macOS or Linux** (bash or zsh), in your terminal:

```
export GROQ_API_KEY="your-key-here"
```

This only lasts for the current terminal session. If you close the terminal, you'll need to set it again next time, unless you add that line to your shell's startup file (`~/.zshrc` or `~/.bashrc`), which is worth doing once you're tired of retyping it.

**On Windows (PowerShell)**:

```
$env:GROQ_API_KEY = "your-key-here"
```

Same idea: this lasts for the current PowerShell window only, unless you set it as a permanent system environment variable through Windows' Settings app.

Either way, confirm it worked before writing any code. In Python:

```
python -c "import os; print(bool(os.environ.get('GROQ_API_KEY')))"
```

That should print `True`. If it prints `False`, the environment variable isn't visible to Python yet, usually because you set it in a different terminal window than the one you're running Python from, or set it in the wrong shell.

(There's a common convenience pattern using a `.env` file plus a package called `python-dotenv`, which loads variables from a file into the environment automatically when your script starts. It's worth knowing that pattern exists, but it isn't necessary here: a plain environment variable, set the way above, is enough for this project. Whichever approach you use, that `.env` file must never be committed to git; add it to `.gitignore` if you go that route.)

## Step 3: read through `chatbot.py`, piece by piece

Open `chatbot.py` in this folder. Here's what each part is doing and why.

### Imports and setup

```python
import os
import sys
import groq
```

`os` reads the environment variable. `sys` lets us exit cleanly with an error message if something's wrong before we even try to call the API. `groq` is the SDK you just installed.

```python
MODEL = "llama-3.3-70b-versatile"
```

This is the model identifier string the API expects. Groq's free tier hosts a handful of open models; this is a solid general-purpose default as of when this was written. Which models are available changes over time, so check Groq's docs for the current list rather than assuming this string will be right forever. Hardcoding the model as a constant at the top of the file, instead of burying it inside a function, means changing models later is a one-line edit.

```python
SYSTEM_PROMPT = (
    "You are a friendly, concise assistant helping a brand-new programmer "
    "learn how hosted AI APIs work. Keep answers short unless asked for detail."
)
```

Recall from the notes: a system prompt is an instruction from you, the developer, not something the user typed. This one just asks for short, friendly answers, so your terminal doesn't fill up with essays while you're testing. Note that this is just a plain string here; unlike Anthropic's SDK (which you'll use starting Week 5 and which takes a separate `system` parameter), Groq's API expects this string to be inserted into the `messages` list itself, with `role` set to `"system"`. You'll see exactly where that happens below.

### Building the client safely

```python
def build_client() -> groq.Groq:
    if not os.environ.get("GROQ_API_KEY"):
        sys.exit(
            "GROQ_API_KEY is not set. See README.md in this folder for "
            "how to set it as an environment variable before running this script."
        )
    return groq.Groq()
```

`groq.Groq()` with no arguments creates the client object you'll use to make requests. Called with no `api_key` argument like this, the SDK automatically looks for `GROQ_API_KEY` in your environment and uses that. That's the whole point of the environment variable: your key never has to be typed anywhere inside this file. The check above it exists purely to fail with a clear, readable message instead of a confusing error several lines deep inside the SDK if you forgot to set the key.

### The conversation history: where "memory" actually lives

```python
conversation_history = []
```

This is the entire trick behind a chatbot appearing to have memory. There is no persistent memory on Groq's servers tied to you between requests. Every single request stands alone. What creates the illusion of memory is that, before every new request, you hand the model the *entire conversation so far*, and it reads through all of it before replying, the same way you'd re-read an entire email thread before writing a reply, rather than only reading the newest message.

Every turn appends two entries to this list: what the user said, and what the model replied. Both get sent back next time. Notice this list holds only user/assistant turns, not the system prompt; that gets added back in fresh on every request, which the next section explains.

### The main loop

```python
while True:
    user_text = input("You: ").strip()
    if user_text.lower() in {"quit", "exit"}:
        break
    if not user_text:
        continue

    conversation_history.append({"role": "user", "content": user_text})

    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + conversation_history
```

Each entry in the conversation history is a dictionary with a `role` (`"user"` or `"assistant"`) and `content` (the text). Right before making the request, we build the *actual* list to send by putting a fresh `"system"`-role entry in front of the stored history. This is the specific difference from Anthropic's API mentioned above: Groq (like most OpenAI-shaped APIs) treats the system prompt as just another message with a special role, rather than as a separate top-level argument.

### Making the actual request

```python
    response = client.chat.completions.create(
        model=MODEL,
        max_tokens=1024,
        messages=messages,
    )
```

This is the one line in the whole file that actually talks to the internet. Everything before it was setup; everything after it is unpacking the result.

- `model`: which model answers this request.
- `max_tokens`: the hard cap on how many tokens the reply is allowed to contain (see the tokens note for why this exists).
- `messages`: the system prompt plus the full conversation history, including the message the user just typed.

The `try`/`except` block around this call catches a few specific, likely failure modes instead of letting the program crash with a wall of text: a rejected API key, being rate-limited (asking too fast, which on a free tier is the thing to watch for instead of cost), or any other error the API reports. Catching specific exception types like this, rather than a single catch-all, is exactly the debugging habit Foundations was building: knowing *which* thing went wrong tells you what to actually do about it.

### Reading the reply back out

```python
    reply_text = response.choices[0].message.content
```

Unlike Anthropic's SDK (Week 5 onward), where a reply comes back as a list of content blocks you loop over, Groq's response shape gives you the reply text directly as a plain string at `response.choices[0].message.content`. `choices` is a list because some APIs let you ask for several alternative replies to the same prompt at once; by default there's exactly one, so `choices[0]` is always the one you want here.

### Closing the loop

```python
    print(f"Bot: {reply_text}\n")
    conversation_history.append({"role": "assistant", "content": reply_text})
```

Print it for the human, then append it to history as an `"assistant"` message, so the next request includes what the model itself said. Skip this line and the bot would forget its own previous replies immediately, even while still remembering what the user said, which produces genuinely strange conversations if you ever want to see it break on purpose.

## Step 4: run it

```
python chatbot.py
```

Try a short conversation that tests the memory directly, since that's the actual point of this project. For example:

```
You: My name is Alex and I have two cats.
Bot: ...
You: What's my name, and how many pets do I have?
Bot: ...
```

If the second answer correctly says "Alex" and "two cats," the memory is working exactly as designed: not because the model recognized you, but because your code handed it the whole transcript again.

## What to notice while you test it

- This week's requests are free, on Groq's free tier, which is exactly why this week uses it. That's the exception, not the rule: starting Week 5, on Anthropic's API, every message you send and every reply you get costs a small, real amount of money (see the billing note for real numbers). Getting comfortable with the mechanics now, without worrying about a bill, is the point of doing it this way first.
- Instead of a bill to watch, a free tier has rate limits (a cap on requests or tokens per minute). If you hit one, the `RateLimitError` above is what catches it. Try adding a line after the API call that prints `response.usage.prompt_tokens` and `response.usage.completion_tokens`, which the SDK reports on every response, to see the numbers behind that limit directly.
- Try quitting and restarting the script. The conversation is gone. That's expected: `conversation_history` is a plain Python list living in memory for this one run, not saved anywhere. If you wanted the chatbot to remember you across separate runs (closing the program and reopening it later), you'd need to actually save that list somewhere, like a file or a database, and load it back in on startup. That's a real, useful extension you're welcome to try, but it's not required this week.
- If you get an authentication error, it's almost always the environment variable not being visible in the terminal you're actually running from. Close everything, open one fresh terminal, set the variable, and run the script in that same terminal.
