# Guided walkthrough: build the chatbot, line by line

[← Back to Week 4: Track exposure](../../README.md)

`project/README.md` explains the finished `chatbot.py` piece by piece, but it's explaining a file that already exists complete. This exercise is different, the same way Week 1's `09_guided_grade_report.md` and Week 2's `guided-first-endpoint.md` were: you type it yourself, in small steps, running it after each one, before you ever read the finished version's explanation.

Do this first. Type each step into a fresh file in this folder, `00_guided_build_the_chatbot.py` (it starts nearly empty). Once you're done, `project/README.md` becomes a second pass over the same file, useful for extra depth on any piece, not your first exposure to it.

## Step 1: imports and constants

```python
import os
import sys

import groq

MODEL = "llama-3.3-70b-versatile"

SYSTEM_PROMPT = "You are a friendly, concise assistant. Keep answers short."
```

Nothing runs yet, and that's fine; this step just declares the values everything else will use. `notes/01-hosted-model-apis.md` and `notes/02-prompts-and-tokens.md` cover what a system prompt is, if `SYSTEM_PROMPT` doesn't make sense yet. Save the file. There's nothing to observe running it right now, only confirm it doesn't error out from a typo.

## Step 2: a throwaway test call, to check the connection in isolation

```python
def build_client() -> groq.Groq:
    if not os.environ.get("GROQ_API_KEY"):
        sys.exit("GROQ_API_KEY is not set.")
    return groq.Groq()


client = build_client()
response = client.chat.completions.create(
    model=MODEL,
    max_tokens=50,
    messages=[{"role": "user", "content": "Say hello in five words or fewer."}],
)
print(response.choices[0].message.content)
```

Run it now: `python 00_guided_build_the_chatbot.py`. You should see a short greeting print. This last block is deliberately scratch code, not part of the final program; its only job is proving your API key and connection actually work, tested completely on its own, before any loop or memory logic gets added on top. If something's going to be broken (a bad key, a typo'd model name), you want to find that out here, against five lines, not after writing forty.

## Step 3: delete the scratch call, add the loop skeleton with no API call yet

Delete the last three lines from Step 2 (the `client = ...` line through the `print(...)` line), keeping `build_client`. Add:

```python
def main() -> None:
    client = build_client()
    conversation_history = []
    print("Tiny chatbot. Type 'quit' to exit.\n")

    while True:
        user_text = input("You: ").strip()
        if user_text.lower() in {"quit", "exit"}:
            break
        if not user_text:
            continue
        print(f"(you said: {user_text})")


if __name__ == "__main__":
    main()
```

Run it now. Type a few things and confirm each one gets echoed back with `(you said: ...)`. Type `quit` and confirm it actually exits. Press enter with nothing typed and confirm it just loops back and asks again instead of echoing or crashing. This step has no AI in it at all; you're testing the loop's mechanics (reading input, recognizing quit, ignoring blank input) completely separately from whether the API call works, the same isolate-then-combine idea from Step 2, just applied to a different piece.

## Step 4: replace the echo with the real call, combining Steps 2 and 3

Replace the `print(f"(you said: {user_text})")` line with:

```python
        conversation_history.append({"role": "user", "content": user_text})
        messages = [{"role": "system", "content": SYSTEM_PROMPT}] + conversation_history

        try:
            response = client.chat.completions.create(
                model=MODEL,
                max_tokens=1024,
                messages=messages,
            )
        except groq.AuthenticationError:
            sys.exit("Your API key was rejected.")
        except groq.RateLimitError:
            print("Rate limited. Try again in a moment.\n")
            continue
        except groq.APIStatusError as error:
            print(f"The API returned an error: {error.message}\n")
            continue

        reply_text = response.choices[0].message.content
        print(f"Bot: {reply_text}\n")
        conversation_history.append({"role": "assistant", "content": reply_text})
```

Notice this is almost exactly Step 2's API call, just using `messages` (the system prompt plus the growing history) instead of a single hardcoded question, wrapped in the loop you already proved works in Step 3, plus error handling for the specific failure modes worth naming instead of letting the program crash on. Run it now, and test memory directly:

```
You: My name is Alex and I have two cats.
Bot: ...
You: What's my name, and how many pets do I have?
Bot: ...
```

If the second answer correctly says "Alex" and "two cats," every piece is working together.

## Compare, don't copy

Open `../project/chatbot.py` now. It's the same program, with a fuller docstring and slightly more detail in a couple of the comments, but the same four pieces you just built, in the same order. If yours differs in small ways (variable names, the exact wording of an error message), that's fine. What matters is that you typed and ran each piece separately before combining them, not that the final file is character-for-character identical.
