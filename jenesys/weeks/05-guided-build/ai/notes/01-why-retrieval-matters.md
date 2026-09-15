# Why retrieval matters

[← Back to Week 5 (AI track): Guided build](../README.md)

## TL;DR

This page explains why an AI model can't answer questions about your own notes unless you put the relevant text directly into the prompt, and why retrieval is the step that figures out which text to include.

- A model only knows two things when it answers: what was in its training data, frozen in the past, and whatever text is in the prompt for this one request. It has no other way to know anything.
- If the answer isn't in either of those, the model can't know it, though it might still answer confidently and just be wrong.
- "Handing it to the model" means putting the actual text of your note into the prompt string yourself. There's no attach-a-file button; the text just becomes part of the conversation.
- You can't paste your whole notes folder in every time. It costs more tokens than you need, the context window has a limit, and irrelevant text can actually make the answer worse.
- Retrieval is the fix: store your documents somewhere searchable, find the specific piece relevant to the question, and hand only that piece, plus the question, to the model.

```python
# the model only knows two things: its training data, and whatever text is in this prompt
notes = load_notes("plant_notes/")                    # your notes aren't in either, until you add them

relevant_chunk = find_relevant_chunk(notes, question)  # retrieval: pick only the piece that matters
# not the whole folder -- that would cost more tokens, might not fit, and can confuse the model

prompt = f"""Here is a note I wrote:

{relevant_chunk}

Question: {question}
"""

answer = ask_model(prompt)   # the model can only use relevant_chunk plus whatever it already knew
```

## What a model actually knows

Every model you've used so far, including the tiny memory chatbot you built in Week 4, only "knows" two things when it generates a response:

1. Whatever was in its training data, frozen at some point in the past. It has no idea what you had for breakfast, what's in your personal notes folder, or what happened in the news this morning, unless that specific information happened to be public and old enough to have been part of training.
2. Whatever text you put in the prompt for this specific request.

That's it. There is no third source. The model cannot reach out and check a file on your computer, browse to a webpage you didn't give it, or remember a conversation from last week unless you hand it that conversation again. This sounds obvious once it's stated plainly, but it's the single most common source of confusion for beginners building their first real AI application, so it's worth being blunt about: if the answer to your question isn't in the model's training data AND isn't in your prompt, the model cannot know it. It might still answer anyway, confidently and fluently, and just be wrong. That's not a bug in the model, it's the model doing exactly what it's built to do (predict a plausible continuation of text) with incomplete information.

## The problem this creates

Say you keep a folder of personal notes: recipes, how-tos, trip planning, whatever. You want to ask a question like "how do I fix my sourdough coming out dense" and get an answer based on YOUR notes, the ones you actually wrote, not a generic answer pulled from the model's training data (which might describe a totally different starter, a different flour, different advice that doesn't match what you actually wrote down for yourself).

The model has never seen your notes folder. It never will, unless you show it. So the only way to get an answer grounded in your own notes is to put the relevant text from your notes into the prompt, before you ask the question.

## "Hand it to the model," concretely

This phrase is going to come up a lot this week, so here's exactly what it means in code terms: it means the actual text of your note (or the relevant part of it) becomes part of the `content` string you send in the `messages` list, in the same request as your question. Something like:

```python
prompt = f"""Here is a note I wrote:

{note_text}

Question: how do I fix my sourdough coming out dense?
"""
```

That's the entire mechanism. There's no special "attach a file" button, no separate memory the model reaches into later. The note's text is now just part of the conversation, exactly as if you'd typed it yourself, and the model can refer to it because it's sitting right there in front of it, in this one request.

## Why you can't just hand it everything, every time

If handing text to the model is that simple, why not just paste your entire notes folder into every single question, every time, and skip the hard part?

Three real reasons:

- **Cost.** You pay for every token you send, including the note text you paste in, whether or not any of it was relevant to the question. Pasting 50 notes to answer a question that only needed one is paying 50 times more than you needed to.
- **The context window has a limit.** Even a generous context window runs out eventually. A small personal notes folder might fit today. A notes folder that's grown for two years, or a folder of scanned documents, will not.
- **Irrelevant text can hurt the answer, not just cost more.** Models can get distracted or produce a worse answer when the prompt is cluttered with unrelated material. More text is not automatically more helpful.

So you need a step in between "here's my question" and "here's the model's answer" that figures out WHICH small piece of text is actually worth handing over. That step is retrieval.

## Retrieval, defined

Retrieval is the general pattern:

1. Store your documents somewhere you can search them (for now: a folder of text files on your own computer).
2. Given a question, find the specific piece or pieces of those documents that are actually relevant to it.
3. Hand ONLY that piece (not the whole folder) to the model, along with the question.
4. Ask the question.

A useful mental model: the AI model is taking an open-book exam. It's allowed to use the book, it's just not allowed to go find the book itself. You are the one flipping to the right page before you slide the exam over to it. If you flip to the wrong page, or hand it the whole library and say "somewhere in here," it's not really an open-book exam anymore, it's a guessing game with extra props.

This week's project builds exactly this pattern, in its simplest possible form: split your notes into small pieces, use a simple technique to find the pieces that share the most in common with your question, and only send those pieces to the model. Step 2, finding the relevant piece, is the part with real technique behind it, and that's what the next note in this folder is about: what a "vector" and an "embedding" actually are, and how real systems (bigger than what you're building this week) find the relevant piece automatically, even when the wording doesn't match at all.

## Why this matters beyond this week

Look ahead briefly at the Week 8 capstone spec for the "docs assistant" project: it requires refusing to answer when the documents don't contain the answer, and citing exactly which document (and section) an answer came from. Both of those requirements are retrieval problems, not model problems. You cannot refuse to guess unless you know, concretely, whether the piece of text you retrieved actually covers the question. You cannot cite a source unless you tracked, from the very first step, which document and which section each piece of text came from. The habits you're building this week (splitting documents into traceable pieces, only answering from pieces you actually retrieved, being honest when nothing relevant turned up) are the exact same habits that spec will test later, with no tutorial to lean on at that point.
