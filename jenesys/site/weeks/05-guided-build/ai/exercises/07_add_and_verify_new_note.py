"""
Exercise 7: add your own note, and verify retrieval actually finds it.

Every exercise so far has run against sample data someone else wrote
for you. This one is different on purpose: you're going to add a REAL
note of your own into ../project/sample_notes/, the exact folder
notes_assistant.py reads from, and then use the exact retrieval logic
from Week 5 (copied here so this file stays a standalone, runnable
script) to confirm it was found correctly, for a question only your
new note actually answers.

This exercise does NOT need an API key. It only exercises retrieval
(chunking, scoring, filtering), not the calls to Claude.

Run it with:
    python 07_add_and_verify_new_note.py

Read the whole file before you touch anything.
"""

import os
import string

# Points at the real Week 5 project's sample notes folder, one level
# up and over, so this exercise tests against the SAME data
# notes_assistant.py actually uses, not a copy.
NOTES_DIR = os.path.join(os.path.dirname(__file__), "..", "project", "sample_notes")

STOPWORDS = {
    "a", "an", "the", "is", "are", "was", "were", "be", "been", "am",
    "i", "you", "he", "she", "it", "we", "they", "me", "my", "your",
    "of", "in", "on", "at", "to", "for", "and", "or", "but", "with",
    "how", "what", "why", "when", "where", "do", "does", "did", "can",
    "should", "would", "this", "that", "these", "those", "not", "no",
    "so", "as", "if", "than", "then", "about", "from",
}


# --- Retrieval core, identical in spirit to notes_assistant.py ---
# (See 00-guided-build-retrieval.md if any of this looks unfamiliar.)

def load_notes(folder_path: str) -> dict:
    notes = {}
    for filename in sorted(os.listdir(folder_path)):
        if not filename.endswith(".txt"):
            continue
        with open(os.path.join(folder_path, filename), "r", encoding="utf-8") as f:
            notes[filename] = f.read()
    return notes


def chunk_note(text: str) -> list:
    raw_chunks = text.split("\n\n")
    return [c.strip() for c in raw_chunks if c.strip()]


def build_chunk_index(notes: dict) -> list:
    index = []
    for filename, text in notes.items():
        for position, chunk_text in enumerate(chunk_note(text)):
            index.append({"filename": filename, "position": position, "text": chunk_text})
    return index


def significant_words(text: str) -> set:
    text = text.lower().translate(str.maketrans("", "", string.punctuation))
    return {w for w in text.split() if w and w not in STOPWORDS}


def score_chunk(chunk_text: str, question_words: set) -> int:
    return len(significant_words(chunk_text) & question_words)


def find_relevant_chunks(chunk_index: list, question: str, top_k: int = 3) -> list:
    question_words = significant_words(question)
    scored = [(score_chunk(r["text"], question_words), r) for r in chunk_index]
    scored = [(s, r) for s, r in scored if s > 0]
    scored.sort(key=lambda pair: pair[0], reverse=True)
    return [r for s, r in scored[:top_k]]


# --- Step 1: sanity check against the EXISTING sample notes ---
#
# Run the file as-is first, before adding anything. This confirms the
# retrieval code above actually works against the notes that are
# already there, so if something goes wrong later, you'll know it's
# your new note, not this code, that needs a second look.

SANITY_QUESTION = "why is the modem blinking orange"
SANITY_EXPECTED_FILE = "wifi-setup.txt"


# --- Step 2: add your own note ---
#
# Create a new .txt file directly inside ../project/sample_notes/
# (the same folder this script points NOTES_DIR at). Write it about
# something the other five sample notes don't cover: a hobby, a
# recipe, a task at work, whatever you actually know something about.
#
# Format it the same way the existing sample notes are formatted,
# because chunk_note() (above, and in notes_assistant.py) splits on
# blank lines: a short title on the first line, a blank line, then
# 2-3 short paragraphs, EACH SEPARATED BY A BLANK LINE. If you write
# it as one giant unbroken paragraph, it becomes exactly one chunk,
# which will still probably work for this exercise, but see the "if
# this fails" note near the bottom before assuming something's wrong.
#
# Then fill in the two lines below to match what you actually wrote:

NEW_NOTE_FILENAME = "REPLACE_ME.txt"  # the exact filename you created
QUESTION_ABOUT_MY_NOTE = "REPLACE ME with a question only your new note answers"


def run_check(chunk_index: list, question: str, expected_filename: str, label: str) -> bool:
    matches = find_relevant_chunks(chunk_index, question)
    found_filenames = {m["filename"] for m in matches}
    passed = expected_filename in found_filenames
    status = "PASS" if passed else "FAIL"
    print(f"[{status}] {label}")
    print(f"  question: {question!r}")
    print(f"  expected to find: {expected_filename}")
    print(f"  actually matched: {[ (m['filename'], m['position']) for m in matches ] or '(nothing)'}")
    return passed


if __name__ == "__main__":
    notes = load_notes(NOTES_DIR)
    print(f"Loaded {len(notes)} notes from {NOTES_DIR}: {sorted(notes.keys())}\n")
    chunk_index = build_chunk_index(notes)

    run_check(chunk_index, SANITY_QUESTION, SANITY_EXPECTED_FILE, "Sanity check (existing notes)")
    print()

    if NEW_NOTE_FILENAME == "REPLACE_ME.txt":
        print("Add your own note and fill in NEW_NOTE_FILENAME and")
        print("QUESTION_ABOUT_MY_NOTE near the top of this file, then rerun.")
    else:
        run_check(chunk_index, QUESTION_ABOUT_MY_NOTE, NEW_NOTE_FILENAME, "Your new note")

    # --- If your new note's check fails ---
    #
    # Two likely causes, both worth checking before assuming the
    # retrieval code is broken:
    #   1. Your question's significant words don't actually overlap
    #      with any word in your note's text. Try
    #      significant_words(QUESTION_ABOUT_MY_NOTE) at a Python
    #      prompt and compare it, by eye, against your note's own
    #      text. Retrieval can only ever find what it shares words
    #      with; it has no idea what your note MEANS (this is the
    #      exact limitation notes/02-embeddings-and-vector-search.md
    #      described).
    #   2. Your file doesn't end in .txt, or isn't actually sitting
    #      inside ../project/sample_notes/, so load_notes() never
    #      picked it up at all. Check the "Loaded N notes" line printed
    #      above and confirm your filename is really in that list.
