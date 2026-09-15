# Prompts and tokens

[← Back to Week 4: Track exposure](../../README.md)

## TL;DR

This page covers what actually makes up a prompt, and what a token is, since both determine cost and length limits.

- A prompt is just the text you send. It's built from up to three parts: a system prompt you set in advance, the conversation so far, and the user's newest message.
- A token is a small chunk of text, roughly a word or a piece of a word, and it's what pricing and length limits are measured in, not words or characters.
- More text you send in means more input tokens, and more text the model generates back means more output tokens. Both get counted and billed, usually at different rates.
- Every model has a maximum context window (a token limit for the whole request), and every request you send sets a `max_tokens` cap on how much the model is allowed to generate back.

```python
system_prompt = "You are a concise, friendly assistant."    # part 1 of the prompt
conversation = [
    {"role": "user", "content": "What's the capital of France?"},
    {"role": "assistant", "content": "Paris."},
]                                                             # part 2: history so far
new_message = {"role": "user", "content": "And of Japan?"}   # part 3: newest message

# every word above becomes tokens: more text in means more input tokens billed
request_payload = {
    "system": system_prompt,
    "messages": conversation + [new_message],
    "max_tokens": 200,   # caps how much text (and tokens) the model can generate back
}
```

## What a prompt is

A prompt is simply the text you send to the model. That's the whole definition. It sounds anticlimactic because it is: the entire skill of "prompt engineering" that gets talked about so much is really just the skill of writing clear instructions and giving relevant context to something that can only see the words you actually send it, with no other way of reading your mind.

A prompt usually has a few parts working together:

- **A system prompt** (optional, but common): instructions you, the developer, set up in advance to shape how the model should behave for the whole conversation. The user never sees this directly. Think of it as a standing instruction sheet you hand the model before the user says anything, like briefing a new employee before their first customer call.
- **The conversation so far**: everything the user and the model have said up to this point, if you're building something with memory (this week's project does exactly this).
- **The newest message**: whatever the user just typed.

All of that together, every time, is the prompt for that particular request. There is no hidden extra context the model secretly remembers. If it isn't in the prompt, the model has no way to know it.

## What a token actually is

Pricing, and the limits on how much text you can send or receive, are not measured in words or characters. They're measured in tokens.

A token is a small chunk of text, roughly a word or a piece of a word. A rough rule of thumb for English text: one token is about four characters, or about three-quarters of a word. So "roughly a word" is a fine mental model for now, but it isn't exact. Common short words are often a single token each ("the", "cat", "is"). Longer or less common words often get split into multiple pieces. As an example, "tokenization" might come out of the model's tokenizer as something like "token" plus "ization": two tokens, one word.

You don't need to memorize exact tokenization rules. What you need is the intuition that:

- More text in equals more input tokens.
- More text generated back equals more output tokens.
- Both directions count, and both directions are billed, usually at different rates (output is typically priced higher than input, because generating new text is more computationally expensive than reading text that's handed to you).

## Why tokens matter beyond cost

Every model also has a maximum context window: the total number of tokens (prompt plus the reply it's about to generate) it can handle in a single request. If your conversation history grows long enough (lots of back-and-forth turns, or long messages), you can eventually exceed that limit. This week's model has a context window in the tens of thousands of tokens (check Groq's docs for the exact current number); the Claude models you'll use from Week 5 onward go much higher, into the hundreds of thousands. Either way, it's enormous compared to most single conversations, but it is not infinite, and it's worth knowing the ceiling exists: it's the reason very long-running assistants eventually need strategies like summarizing old context instead of keeping every single message forever. That's a Week 5-and-beyond problem, not a today problem, but now you know why it will eventually come up.

The practical takeaway for this week: every request you make has a `max_tokens` setting, a hard cap on how much the model is allowed to generate in its reply. You'll see this in the starter code as a plain number. Setting it too low can cut a reply off mid-sentence; setting it very high doesn't cost you anything extra by itself (you're only billed for tokens actually generated), but it's still good practice to pick a sensible number for what you're building instead of an arbitrarily huge one.
