# Exercises: small tweaks to the chatbot

[← Back to Week 4: Track exposure](../../README.md)

This is a taste week, not a challenge week, so these are short and optional beyond the first one. Do them directly on top of `../project/chatbot.py`; there's nothing to submit or compare against an answer key. If it does what the task describes, you're done.

## 1. Give it a personality

Change `SYSTEM_PROMPT` to give the assistant a distinct voice or role (a pirate, a terse senior engineer who hates small talk, a patient tutor, whatever you like). Run it and confirm the tone actually changes. This is the fastest way to feel, directly, that the system prompt is a real lever and not just decoration.

## 2. Watch the tokens, and what they'd cost on a paid provider

Every response object carries usage information. After the API call in the main loop, add:

```python
print(f"(used {response.usage.prompt_tokens} input tokens, {response.usage.completion_tokens} output tokens)")
```

Have a short conversation and watch the numbers. Notice that `prompt_tokens` grows over the course of the conversation even though you're typing short messages each time. That's the conversation history note from the AI notes made visible: you're resending the whole transcript every turn, so the input side keeps growing as the conversation gets longer. This request was free, on Groq's tier. Using the pricing table from the cost-and-billing note (which is for Anthropic's paid API, the provider you'll actually use starting Week 5), do the arithmetic on what this exact conversation *would* have cost on a paid provider. That number is the one that becomes real in a few weeks.

## 3. Cap the memory on purpose

Because the whole history gets resent every turn, a long enough conversation would eventually cost more per message and, in principle, could exceed the model's context window. Modify the loop so that `conversation_history` only keeps, say, the last 10 messages (5 exchanges), instead of growing forever. A plain Python list slice like `conversation_history[-10:]` used when building the request (while still appending to the full list, or deciding to actually trim it, your call) is enough. Afterward, ask the bot something from earlier in a long conversation, past that cutoff, and confirm it genuinely doesn't remember, since you've now deliberately thrown that part of the transcript away. This is a small, hands-on preview of a real tradeoff every long-running chat product has to make.
