# Week 5 (AI track): Guided build

[← Back to Weeks](../../README.md)

Full context: [root README, Week 5](../../../README.md#week-5-chosen-track-guided-build).

## Goal

A small app around a model, plus an intro to retrieval, with instructions that are still fairly step-by-step.

## Scope

- A summarizer, classifier, or chatbot with real memory, built around a hosted model's API.
- Retrieval, conceptually: why raw model calls aren't enough for anything that needs facts, what a vector search does.

## The project: Notes Assistant

This week (and Weeks 6-7 after it) builds one continuous project: **Notes Assistant**, a command-line tool that summarizes personal text notes and answers questions about them using a simple, from-scratch version of retrieval. It's chosen specifically because it maps onto the skills the Week 8 "docs assistant" capstone needs (retrieval, source citation, refusing to guess when the documents don't cover a question), without building that capstone itself.

## Do this in order

Steps 1-4 are required. Everything after is optional extra practice; skipping straight to Week 6 without it leaves no gap in what Week 6 assumes you know.

1. [ ] `notes/01-why-retrieval-matters.md` through `03-organizing-notes-assistant.md`, in order.
2. [ ] `exercises/00-guided-build-retrieval.md`, a line-by-line guided build of the retrieval core (no API key needed), before the project walkthrough.
3. [ ] `exercises/01_single_prompt.py`, `02_multi_turn_chat.py`, `03_structured_extraction.py`, in order: the API-shape progression from a single call to real memory to structured output.
4. [ ] `project/README.md`'s full walkthrough of the finished `notes_assistant.py`.
5. Optional: `exercises/04-guided-build-citations.md`, a second guided, line-by-line build (also no API key needed), the citation-formatting logic `answer_question` depends on.
6. Optional, any order: `exercises/05` through `11`, further standalone reps (naive substring matching vs. keyword overlap, a second chunking strategy, adding your own sample note, chunk overlap, stopword tuning, `top_k` tuning, whether the system prompt is really grounding the answer). Most need no API key; see `exercises/README.md` for exactly which ones do.
7. Optional: `project/bonus_vector_similarity.py`, a real vector and similarity formula in plain Python.

## Status

Notes, exercises, and the guided project walkthrough are written. Weeks 6 and 7 extend `project/notes_assistant.py` from this week; nothing here is a placeholder.
