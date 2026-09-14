"""
Exercise 2: a real conversation, with real memory.

The Claude API has no concept of "a conversation" on its own. Every
single request is completely independent: the server does not
remember anything about you between calls. If you want Claude to
remember what you said three messages ago, YOU have to send those
three messages again, every single time, as part of the `messages`
list you pass to messages.create().

That might sound wasteful (you do pay for that resent history every
turn, in tokens), but it's also what makes the API flexible: nothing
stops you from editing history, dropping old turns, or summarizing
them before resending. That flexibility is exactly what Week 7's
persistence work depends on: saving this same `messages` list to disk,
and loading a (possibly edited or trimmed) version of it back in on
the next run.

Run it with:
    python 02_multi_turn_chat.py
Type "quit" to stop.
"""

import anthropic

client = anthropic.Anthropic()
MODEL = "claude-haiku-4-5"


def chat():
    # This list IS the conversation's entire memory. Nothing else
    # stores it, and if you don't append to it correctly below, the
    # "memory" quietly stops working, with no error to warn you.
    messages = []

    print("Chat with Claude. Type 'quit' to exit.\n")

    while True:
        user_input = input("You: ").strip()
        if user_input.lower() in ("quit", "exit"):
            break
        if not user_input:
            continue

        # Add the new user turn to the running history BEFORE calling
        # the API, so this turn is included in what gets sent.
        messages.append({"role": "user", "content": user_input})

        response = client.messages.create(
            model=MODEL,
            max_tokens=1024,
            messages=messages,  # the FULL history so far, every single time
        )

        reply_text = next(
            (block.text for block in response.content if block.type == "text"),
            "",
        )

        print(f"Claude: {reply_text}\n")

        # Add Claude's reply to the history too. Skip this line and
        # the NEXT request you send will be missing half the
        # conversation, from the API's point of view, because the API
        # only knows what's actually inside the `messages` list you
        # send it, not what actually happened on your screen.
        messages.append({"role": "assistant", "content": reply_text})


if __name__ == "__main__":
    chat()

# Try this: after chatting for a few turns, add a line that prints
# len(messages) right before each API call. Watch it grow. That
# growing list, resent in full every time, is the entire mechanism
# behind what looks like "memory."
