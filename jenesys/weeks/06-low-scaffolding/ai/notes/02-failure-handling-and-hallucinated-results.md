# Failure handling, and why fabricated tool results are a real problem

[← Back to Week 6 (AI track): Low-scaffolding build](../README.md)

## Two different things that can go wrong

Once your code is actually calling real functions based on what the model asks for, there are two genuinely different categories of "something went wrong," and it's worth being precise about which one you're dealing with, because the right response differs:

1. **The tool call itself fails.** Your real Python function raises an exception: a file doesn't exist, a network request times out, a calculation gets bad input. This is an ordinary bug or an ordinary environmental failure, the same kind you've been handling since Week 1 or 2. It just happens to be triggered by the model instead of by a user typing something into a form.
2. **The tool call doesn't fail, but doesn't make sense.** Claude asks for a filename that doesn't exist, or asks your search tool for something with an empty query, or asks for a word count on a note it already knows was deleted two turns ago. Nothing crashes. The arguments are syntactically valid (they match your `input_schema`), just semantically wrong or pointless. The API validates the SHAPE of a tool call's arguments against your schema; it does not, and cannot, validate whether the request makes sense for your actual data. That's entirely on your code.

Both categories need handling. Neither should be handled by pretending nothing happened.

## The correct pattern: tell the model the truth

When a tool call fails or doesn't make sense, catch it in your code, and send back a `tool_result` with `is_error: true` and a short, specific, honest description of what went wrong:

```python
try:
    result = search_notes(query)
    tool_result_block = {
        "type": "tool_result",
        "tool_use_id": tool_id,
        "content": result,
    }
except FileNotFoundError as e:
    tool_result_block = {
        "type": "tool_result",
        "tool_use_id": tool_id,
        "content": f"Tool error: notes folder not found ({e}). Retrieval is unavailable right now.",
        "is_error": True,
    }
```

Setting `is_error: True` matters beyond being a nice-to-have flag. It's the signal that tells Claude, explicitly, that this result represents a failure, not a normal (if disappointing) outcome like "search ran fine and found zero matches." Those are two different things and your code should never blur them together. "The search ran and found nothing" is valid, useful information (it means: nothing in the notes covers this). "The search tool itself broke" is a completely different situation, and Claude reasoning as if the first happened when the second actually did will produce a confidently wrong final answer, phrased as if the notes were checked when they never actually were.

## The wrong pattern, and why it's specifically dangerous

```python
try:
    result = search_notes(query)
except FileNotFoundError:
    result = "No results found."  # WRONG
```

This looks almost identical to correct error handling. It even avoids crashing your program, which might make it feel like a reasonable fix if all you're checking for is "did the program stay alive." But look closely at what it actually does: it converts "the search tool is broken" into "the search tool ran successfully and found nothing," and hands that lie to the model as if it were a fact. Claude has no way to tell the difference between an honest empty result and this fabricated one. It will treat "no results found" as trustworthy information about your notes folder's actual contents, and may well tell the user "I checked your notes and didn't find anything about that," which is false. The notes were never actually checked. That's not a minor cosmetic issue. It's your code manufacturing a hallucination and handing it to the model as ground truth.

## Hallucinated tool results are a real, specific failure mode, not a hypothetical

It's worth naming this precisely, because "hallucination" gets used loosely enough that beginners sometimes assume it only means "the model said something false in its final answer," and treat it as an unavoidable AI quirk they can't do much about. There are actually two distinct versions of this problem in a tool-use system, and one of them is entirely within your control:

- **Your code fabricating a result.** This is the pattern shown above: an error gets silently converted into a plausible-looking success. This is a bug in YOUR error handling, full stop, not a property of the model at all. It is entirely preventable, and preventing it is most of what this week is actually testing.
- **The model disregarding a real failure you reported correctly.** Even when you DO set `is_error: True` and describe the failure honestly, models don't always handle that gracefully. A model can still occasionally produce a final answer that reads as if a lookup succeeded ("Based on your notes, the router password is..."), when the actual `tool_result` it was given said the tool failed. This is a real, documented behavior, not a beginner myth, and it's a second reason (on top of "don't fabricate results yourself") to always double check: does the model's final, human-facing text actually match what the tool results said happened? If a tool failed, the final answer should say so, not paper over it with a confident-sounding non-answer.

## The concrete rule for this week

Whenever a tool can fail or receive a nonsensical request (which, realistically, is any tool that touches the filesystem, the network, or user-controlled input), your handler must:

1. Catch the failure, specifically, not with a bare `except:` that also swallows unrelated bugs.
2. Never invent a substitute value that looks like a normal result.
3. Report the failure back to the model plainly, with `is_error: True` and a message that actually says what went wrong.
4. Make sure the final answer shown to the human user reflects that failure too. If your program's output to the person running it reads as confident and complete when a tool actually failed partway through, you've reintroduced the same problem one layer up, just outside the model this time.

This is also the exact skill the Week 8 "ticket triage" capstone grades directly (it must never claim to have taken an action the code didn't actually perform) and the "research agent" capstone needs too (degrade gracefully, saying what it couldn't determine, when a tool call fails). Getting comfortable with this distinction now, on a small notes app where the stakes are low, is the point.
