# Organizing Notes Assistant

[← Back to Week 5 (AI track): Guided build](../README.md)

## TL;DR

This page points out where Week 2 and Week 3's file-organization ideas already show up in `notes_assistant.py`, and what to watch for as later weeks add to it.

- A good test for whether a file still does one coherent job: can you describe what it's for in one sentence, without using "and"?
- `notes_assistant.py` is grouped into three sections, in order: loading and retrieval functions, functions that talk to Claude, then the CLI loop. That's the same "group related things together" idea from Week 2.
- Week 6 (tool-calling) and Week 7 (persistence) will each add a genuinely new concern to this same file. Ask the one-sentence question again each time, instead of assuming today's answer still holds later.

```python
# notes_assistant.py -- one sentence, no "and": a tool that finds relevant notes and asks Claude about them

# 1. loading and retrieval
def load_notes(folder): ...
def find_relevant_chunks(question, chunks): ...

# 2. talking to Claude
def summarize_note(note): ...
def answer_question(question, context): ...

# 3. the CLI loop
def main(): ...

# Weeks 6-7 add new concerns (tool-calling, persistence) to this file --
# ask the one-sentence question again then, don't assume these three sections stay the right split forever
```

Everything from [Week 2's organizing-your-code note](../../../02-foundations-ii/notes/06-organizing-your-code.md) and [Week 3's note on splitting a growing file](../../../03-foundations-consolidation/notes/03-organizing-a-growing-file.md) still applies. This note doesn't repeat them; it points out where their ideas already show up in `notes_assistant.py`, and what to watch for as Weeks 6 and 7 add to this exact file.

## The file is already grouped by concern, on purpose

Open `project/notes_assistant.py` and notice it reads as three sections, in this order: loading and retrieval (`load_notes`, `chunk_note`, `build_chunk_index`, `significant_words`, `score_chunk`, `find_relevant_chunks`), talking to Claude (`summarize_note`, `answer_question`), then the CLI loop (`main`). That ordering isn't arbitrary. It's the same "group related things together" idea from Week 2, just with a genuinely new third concern (calling a hosted model) that Week 2's notes API never had. If you were asked "what is this file for" right now, you could still answer in one sentence without an "and": it's a small tool that finds relevant notes and asks Claude about them. That's why it's still one file. Three sections inside one coherent file is not the same thing as three unrelated jobs crammed together.

## Watch this seam as Weeks 6 and 7 add to it

Week 6 adds tool-calling logic. Week 7 adds persistence. Neither of those is one of the three concerns already listed above; both are genuinely new. That's worth noticing in the moment, not after the fact: each time you add a new concern to this file, ask the same one-sentence question again. The point isn't to split preemptively (Week 3's note is just as much about recognizing when *not* to split), it's to keep asking the question honestly as the file grows, instead of only asking it once, now, and assuming the answer stays the same forever.
