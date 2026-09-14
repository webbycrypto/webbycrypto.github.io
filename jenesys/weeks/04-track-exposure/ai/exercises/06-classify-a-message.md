# Exercise: classify a message into a category

[← Back to Week 4: Track exposure](../../README.md)

Every other exercise so far has been a tweak to the chatbot: a loop that keeps running, taking one message at a time, remembering what came before. This one is conceptually different, even though it reuses the exact same API mechanics you already have working: no loop that runs forever, no memory, no back-and-forth. You send one piece of text, the model sends back one word, and the program ends. This is closer to what a real "classify this support ticket" or "tag this piece of feedback" feature actually looks like in production than a chat window is, and it's the same basic shape Week 8's ticket triage capstone spec (if you end up choosing that one, much later) is built around.

This is semi-guided: you get a starter file with the mechanical, already-seen parts sketched in, and a clear description of what to build, but not a line-by-line walkthrough like `00-guided-build-the-chatbot.md`. You've now built and modified `chatbot.py` enough times that reusing its pieces in a new shape should feel more familiar than intimidating.

## Set up the file

Create a new file in this folder, `06_classify_a_message.py` (a starter already exists here with the client setup sketched in; open it before writing anything). It reuses the same `GROQ_API_KEY` environment variable and the same `build_client()` pattern from `chatbot.py`, since the connection mechanics (check the key exists, create the client, handle the specific error types) don't change just because what you're asking the model to do is different. Copy `build_client()` over essentially as-is; that part is given, not the point of this exercise.

## The task

Write a program that:

1. Defines a fixed, small list of categories a piece of text could belong to. Pick a theme: support messages (`"billing"`, `"technical"`, `"feedback"`, `"other"`) is a solid default, but a different theme (news headlines into topics, short reviews into sentiment) works just as well if you'd rather use that.
2. Writes a system prompt that tells the model exactly what its job is: read one message, and respond with *only* the single category label that best fits it, one of the exact words from your list, nothing else, no explanation, no punctuation around it. Getting a model to reliably output just one word instead of a full sentence is a real, common prompt-writing skill; be explicit and literal in the instruction rather than assuming the model will guess what "just the category" means. Naming the exact allowed words directly in the system prompt (spell out the list) makes a real difference here; try it both with and without that if you want to see the difference yourself.
3. Defines a short list of 4-6 sample messages to classify, hardcoded directly in the file as plain strings, covering a range that should hit different categories (for the support theme: something clearly about a charge or refund, something clearly a bug report, something clearly praise or complaint about the product itself, and at least one deliberately ambiguous or unrelated one to see what the model does with a case that doesn't obviously fit).
4. Loops over that list, and for each message, sends a request with your system prompt and that one message as the only user content (no conversation history at all this time; each classification is a single, independent request, exactly like the notes described requests being stateless by default), then prints the original message next to whatever category came back.

Keep `max_tokens` small for this one (10 is plenty; you're expecting a single word back, not a paragraph), and reuse the same `try`/`except` structure around the API call that `chatbot.py` already has, since a rate limit or a bad key is exactly as possible here as anywhere else.

## Handle the case where the model doesn't cooperate

Models don't always follow instructions perfectly, even simple ones. After getting a reply back, check whether it actually matches one of your defined categories exactly (after stripping whitespace and normalizing case). If it doesn't, print a clear note that the model returned something unexpected, along with what it actually said, instead of silently treating a stray reply as a valid category or crashing. This is a small, real dose of the same lesson Week 8's ticket triage spec states outright: handle output you didn't fully expect without pretending it was fine.

## Try it

Run `python 06_classify_a_message.py` and look at the output for all of your sample messages at once. If one gets classified in a way that seems wrong to you, try rewording your system prompt (more specific category descriptions, an example of each category included directly in the prompt) and rerun to see whether it changes. That loop, noticing a wrong output, adjusting the instructions, rerunning, is what "prompt engineering" actually is in practice, in miniature, on a task small enough to reason about in one sitting.

## Then make it interactive

Hardcoded sample messages are fine for a first pass, but you already know how to build a loop that reads real input, since `chatbot.py` has one. After your hardcoded list finishes classifying, add a small loop right after it, reusing that same `input()` pattern, that lets you type your own messages one at a time and see each one classified immediately:

```python
print("\nType your own messages to classify, or 'quit' to exit.")
while True:
    user_text = input("Message: ").strip()
    if user_text.lower() in {"quit", "exit"}:
        break
    if not user_text:
        continue
    print("Category:", classify(client, user_text))
```

Notice what's deliberately missing compared to `chatbot.py`: no `conversation_history`, no system-prompt-plus-history assembly, because this task genuinely doesn't need memory. Each message you type is classified completely independently of every other one, exactly like the hardcoded list above, just typed live instead of hardcoded. Try a few messages that don't obviously belong to any of your categories and see how the model handles the ambiguity; that's the same "handle it without crashing or guessing confidently" habit Week 8's ticket triage spec asks for later, just showing up here first, in miniature, on a task small enough to actually watch happen.
