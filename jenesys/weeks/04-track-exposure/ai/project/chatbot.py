"""
A tiny command-line chatbot that remembers the conversation.

Run it with:
    python chatbot.py

Before running it, set an environment variable named GROQ_API_KEY to your
API key. See README.md in this same folder for exactly how to do that on
your operating system, and for a full, line-by-line walkthrough of how
this file works.

This week uses Groq specifically because its free tier needs no credit
card and no billing setup at all, which keeps this "taste" week completely
frictionless. Starting Week 5, once you've committed to the AI track for
real, the project switches to Anthropic's Claude, which has a different
(but similarly shaped) SDK. Learning the general pattern here, request in,
response out, memory is just resending the transcript, transfers directly;
a handful of details (how the reply is shaped, what the usage fields are
called) will look slightly different there, and that's expected, not a sign
something broke.
"""

import os
import sys

import groq

# Pick a current Groq model. Groq's free tier hosts several open models;
# this one is a solid general-purpose default as of when this was written.
# Which models are available on the free tier changes over time, so check
# https://console.groq.com/docs/models for the current list rather than
# assuming this string will be right forever.
MODEL = "llama-3.3-70b-versatile"

# A system prompt sets the assistant's behavior for the whole conversation.
# It is not something the user typed; it is an instruction you, the
# developer, give the model before the conversation even starts. Groq's API
# (like most OpenAI-shaped APIs) expects the system prompt as one more
# entry in the messages list, with role "system", rather than as its own
# separate parameter.
SYSTEM_PROMPT = (
    "You are a friendly, concise assistant helping a brand-new programmer "
    "learn how hosted AI APIs work. Keep answers short unless asked for detail."
)


def build_client() -> groq.Groq:
    """Create the API client, failing with a clear message if no key is set."""
    if not os.environ.get("GROQ_API_KEY"):
        sys.exit(
            "GROQ_API_KEY is not set. See README.md in this folder for "
            "how to set it as an environment variable before running this script."
        )
    # With no api_key argument, the SDK reads GROQ_API_KEY from the
    # environment itself. That is deliberate: it means your key never has
    # to appear anywhere in this file.
    return groq.Groq()


def main() -> None:
    client = build_client()

    # This list is the chatbot's "memory," and it holds only the user/
    # assistant turns, not the system prompt. Every turn, both what the
    # user said and what the model replied get appended here, and the
    # *entire* list gets sent back to the API on the next request. The API
    # itself has no memory between separate requests; the "memory" you'll
    # see while chatting is really just your own code resending the
    # transcript every single time.
    conversation_history = []

    print("Tiny Groq chatbot. Type 'quit' to exit.\n")

    while True:
        user_text = input("You: ").strip()
        if user_text.lower() in {"quit", "exit"}:
            break
        if not user_text:
            continue

        conversation_history.append({"role": "user", "content": user_text})

        # The system prompt is prepended fresh on every request, ahead of
        # the stored history, rather than being stored inside
        # conversation_history itself. That keeps conversation_history as
        # a clean record of just what the user and the model actually said
        # to each other.
        messages = [{"role": "system", "content": SYSTEM_PROMPT}] + conversation_history

        try:
            response = client.chat.completions.create(
                model=MODEL,
                max_tokens=1024,
                messages=messages,
            )
        except groq.AuthenticationError:
            sys.exit("Your API key was rejected. Double-check it's set correctly.")
        except groq.RateLimitError:
            print("Rate limited by the API. Try again in a moment.\n")
            continue
        except groq.APIStatusError as error:
            print(f"The API returned an error: {error.message}\n")
            continue

        # Unlike Anthropic's SDK, which you'll meet in Week 5, a Groq (and
        # more broadly, OpenAI-shaped) response's reply text is just a
        # plain string at response.choices[0].message.content. There's no
        # list of content blocks to loop over for a plain chat reply like
        # this one.
        reply_text = response.choices[0].message.content

        print(f"Bot: {reply_text}\n")

        conversation_history.append({"role": "assistant", "content": reply_text})


if __name__ == "__main__":
    main()
