# Week 5 exercises

[← Back to Week 5 (AI track): Guided build](../README.md)

Two guided, line-by-line walkthroughs (`00` and `04`, no API key needed for either) plus eight small, standalone scripts, each one step up from the last. Run them in order. Each is a complete, working program on its own, not a fragment to fill in, so read the comments, run it, then go change something and run it again. That last part matters more than reading the code silently ever will.

Before running any exercise that calls the API (01, 02, 03, and 11), make sure `ANTHROPIC_API_KEY` is set in your environment (same setup as Week 4) and that the `anthropic` package is installed (`pip install anthropic`). Exercises 00, 04, 05, 06, 07, 08, 09, and 10 need neither; they're pure Python, runnable offline, on purpose, so a slow connection or a missing key is never what's standing between you and finishing one.

## 00-guided-build-retrieval.md

Line-by-line guided build of the retrieval core (chunking, scoring, filtering), from scratch, before you've read the finished version in `project/`. Do this one first.

## 01_single_prompt.py

The simplest possible use of the API: one message in, one response out, nothing remembered afterward. This is a deliberate recap of the shape you already used in Week 4, but with the response-parsing pattern (`response.content` is a list of blocks, not a string) called out explicitly, because that pattern shows up in every single exercise and project file for the rest of this program.

## 02_multi_turn_chat.py

Extends the first exercise into an actual back-and-forth conversation. The core idea to walk away with: the API itself has no memory. Every single request is independent on the server's side. If Claude appears to "remember" what you said two turns ago, it's because your code resent the entire conversation, including that earlier turn, as part of this request. Read the comments in this file carefully if that surprises you. It's the single most important mental model for everything else this program builds on the AI track.

## 03_structured_extraction.py

Instead of asking Claude for prose and reading it yourself, this exercise asks for a specific, structured shape (a small JSON object) so a program (not a human) can act on the answer directly. This matters a lot for later work, including the Week 8 "ticket triage" capstone, which needs exactly this kind of structured classification. The exercise also shows what happens when the model's reply ISN'T valid JSON (it happens more than beginners expect), and handles that case honestly instead of crashing or silently making something up. That habit, treating "the response wasn't what I expected" as a real case to handle rather than an edge case to ignore, is the same habit Week 6 and 7 build on for tool calls specifically.

## 04-guided-build-citations.md

A second guided, line-by-line build, this time of the citation-formatting logic `answer_question` depends on: turning a list of matched chunks into the `[Source: ...]`-labeled blocks that actually go into the prompt. Small and self-contained on purpose, and worth its own rep, since it's a separate piece of real logic from the retrieval core `00` already covered. No API key needed.

## 05_keyword_vs_substring_matching.py

Builds a second, tempting-looking way to score a chunk against a question (does each question word appear anywhere in the chunk as a literal substring) next to the real keyword-overlap approach, on the same two sample chunks, and shows exactly where the two disagree, including a case where the naive approach scores a totally unrelated note as "relevant" for the wrong reasons. No API key needed.

## 06_fixed_size_chunking.py

A second chunking strategy: fixed-size character windows instead of paragraph splits. Runs both strategies on the same sample note and shows, concretely, a sentence that fixed-size chunking slices in half mid-word, something paragraph-based chunking never does. No API key needed.

## 07_add_and_verify_new_note.py

Add a real note of your own into `../project/sample_notes/`, then use this exercise's copy of the retrieval logic to confirm the real system actually finds it for a question only your note answers. The one exercise in this folder that has you produce your own sample data, not just read someone else's. No API key needed.

## 08_chunk_overlap_sliding_window.py

Extends 06 with an `overlap` parameter: does letting consecutive fixed-size windows share some characters actually rescue the sentence 06 showed getting split in half? Compares overlap=0 against overlap=30 on the same note and shows the real tradeoff (fewer split sentences, more duplicated text). No API key needed.

## 09_stopword_impact.py

Scores the same question against the same two chunks three times: with the real stopword list, with no stopword list at all, and with a stopword list that accidentally removes a real topic word. Shows both failure directions of stopword tuning, not just the one notes_assistant.py already gets right. No API key needed.

## 10_top_k_tuning.py

Runs one real question against the real sample notes with top_k set to 1, 3, and 10, and surfaces a genuinely surprising result: with top_k=1, a scoring tie gets broken by file-loading order, not by relevance, and the single result you get back can be the wrong one. No API key needed.

## 11_system_prompt_grounding.py

Asks the same out-of-scope question, with the same irrelevant excerpts attached, once with the real grounding system prompt and once with no system prompt at all, so you can see empirically whether that system prompt is doing real work. Needs a real API call.
