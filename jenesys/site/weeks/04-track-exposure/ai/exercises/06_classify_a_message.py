"""
Starter for 06-classify-a-message.md.

This is intentionally more empty than 00_guided_build_the_chatbot.py was.
Read 06-classify-a-message.md in this same folder for the full task
description. The pieces below are the mechanical, already-seen parts
(imports, the model constant, build_client), given to you so this file
runs the exact same way chatbot.py does; everything else is yours to write.
"""

import os
import sys

import groq

MODEL = "llama-3.3-70b-versatile"


def build_client() -> groq.Groq:
    """Same as chatbot.py: fail clearly if no API key is set, otherwise
    build the client from GROQ_API_KEY in the environment."""
    if not os.environ.get("GROQ_API_KEY"):
        sys.exit("GROQ_API_KEY is not set.")
    return groq.Groq()


# Define your category labels here, as a plain list of short strings.
# CATEGORIES = [...]


# Write your system prompt here. Be explicit: tell the model to reply with
# exactly one word, one of the labels above, and nothing else.
# SYSTEM_PROMPT = "..."


# Define 4-6 hardcoded sample messages to classify, as a plain list of
# strings, covering a range of categories plus at least one ambiguous case.
# SAMPLE_MESSAGES = [...]


def classify(client: groq.Groq, message: str) -> str:
    """Send one message to the model and return whatever it replies with.

    Use client.chat.completions.create(...), the same call chatbot.py
    makes, with a small max_tokens (10 is plenty), messages built from
    SYSTEM_PROMPT plus this one message only (no conversation history).
    Wrap the call in the same try/except pattern chatbot.py uses for
    groq.AuthenticationError, groq.RateLimitError, and groq.APIStatusError.
    Return the reply text, stripped of surrounding whitespace.
    """
    raise NotImplementedError("write this")


def main() -> None:
    client = build_client()

    # Loop over SAMPLE_MESSAGES, classify() each one, check whether the
    # result is actually one of CATEGORIES (after stripping and lowercasing
    # it), and print the message next to either its category or a clear
    # note that the model returned something unexpected.
    raise NotImplementedError("write this")


if __name__ == "__main__":
    main()
