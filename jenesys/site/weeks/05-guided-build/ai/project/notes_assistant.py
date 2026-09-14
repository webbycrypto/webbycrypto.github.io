"""
Notes Assistant v1 (Week 5)

A small command-line tool that:
  1. Loads every .txt file in a folder of personal notes.
  2. Can summarize any one note using Claude.
  3. Can answer a question using ONLY the notes that seem relevant to
     it (a simple, from-scratch version of retrieval), and says which
     note(s) it used to answer.

This is the guided version: every function below is complete,
working, and explained in project/README.md. Weeks 6 and 7 extend
this exact project (tool use, persistence, more robustness), so get
comfortable with how this file is organized now.

Run it with:
    python notes_assistant.py
"""

import os
import string

import anthropic

NOTES_DIR = os.path.join(os.path.dirname(__file__), "sample_notes")

# See exercises/01_single_prompt.py for why claude-haiku-4-5: it's the
# fastest, cheapest current model, which suits a free-tier key while
# you're still learning these shapes. Swap it for a more capable model
# any time; nothing else in this file needs to change if you do.
MODEL = "claude-haiku-4-5"

client = anthropic.Anthropic()

# A tiny stopword list: common words that don't tell us anything about
# TOPIC. This is not exhaustive and isn't meant to be. It's good
# enough for simple keyword scoring, which is exactly what this week's
# notes/02-embeddings-and-vector-search.md said this project would do.
STOPWORDS = {
    "a", "an", "the", "is", "are", "was", "were", "be", "been", "am",
    "i", "you", "he", "she", "it", "we", "they", "me", "my", "your",
    "of", "in", "on", "at", "to", "for", "and", "or", "but", "with",
    "how", "what", "why", "when", "where", "do", "does", "did", "can",
    "should", "would", "this", "that", "these", "those", "not", "no",
    "so", "as", "if", "than", "then", "about", "from",
}


def load_notes(folder_path: str) -> dict:
    """Return {filename: full_text} for every .txt file in folder_path."""
    notes = {}
    for filename in sorted(os.listdir(folder_path)):
        if not filename.endswith(".txt"):
            continue
        full_path = os.path.join(folder_path, filename)
        with open(full_path, "r", encoding="utf-8") as f:
            notes[filename] = f.read()
    return notes


def chunk_note(text: str) -> list:
    """Split a note into chunks along blank lines (paragraphs).

    This is the "simple version of retrieval" this week's notes talk
    about. A production system might chunk by token count with
    overlap, or embed whole documents at once. Splitting on blank
    lines is enough for short personal notes, and it keeps each chunk
    a self-contained idea, which matters more here than getting an
    exact chunk size.
    """
    raw_chunks = text.split("\n\n")
    return [chunk.strip() for chunk in raw_chunks if chunk.strip()]


def build_chunk_index(notes: dict) -> list:
    """Turn {filename: text} into a flat list of chunk records.

    Each record remembers which file and which position within that
    file it came from. A citation is useless if you can't say where it
    came from, and this is the only point in the program where that
    information is still easy to attach.
    """
    index = []
    for filename, text in notes.items():
        for position, chunk_text in enumerate(chunk_note(text)):
            index.append({
                "filename": filename,
                "position": position,
                "text": chunk_text,
            })
    return index


def significant_words(text: str) -> set:
    """Lowercase, strip punctuation, drop stopwords, return a set of words."""
    text = text.lower().translate(str.maketrans("", "", string.punctuation))
    words = text.split()
    return {w for w in words if w and w not in STOPWORDS}


def score_chunk(chunk_text: str, question_words: set) -> int:
    """How many of the question's significant words appear in this chunk?

    This is deliberately the simplest possible scoring function: plain
    overlap counting. It has no idea that "dense" and "rising" might be
    about the same bread problem. That's the real limitation of
    keyword search versus embeddings described in this week's notes,
    not an oversight in this code.
    """
    chunk_words = significant_words(chunk_text)
    return len(question_words & chunk_words)


def find_relevant_chunks(chunk_index: list, question: str, top_k: int = 3) -> list:
    """Return up to top_k chunk records that share the most words with
    the question, best first.

    Chunks that score 0 are left out entirely, on purpose: a 0-word
    overlap means we have no real basis to call that chunk relevant,
    and handing it to the model anyway would just invite an answer
    that LOOKS grounded but isn't.
    """
    question_words = significant_words(question)
    scored = [
        (score_chunk(record["text"], question_words), record)
        for record in chunk_index
    ]
    scored = [(score, record) for score, record in scored if score > 0]
    scored.sort(key=lambda pair: pair[0], reverse=True)
    return [record for score, record in scored[:top_k]]


def summarize_note(filename: str, text: str) -> str:
    """Ask Claude to summarize one note."""
    response = client.messages.create(
        model=MODEL,
        max_tokens=512,
        system=(
            "You summarize personal notes in 2-3 short sentences. "
            "Stay factual to the note's content; do not add advice "
            "or information that isn't in the note."
        ),
        messages=[
            {"role": "user", "content": f"Note file: {filename}\n\n{text}"},
        ],
    )
    return next((b.text for b in response.content if b.type == "text"), "")


def answer_question(question: str, matches: list) -> str:
    """Ask Claude to answer a question using ONLY the given chunks.

    `matches` is a list of chunk records from find_relevant_chunks. If
    it's empty, main() never calls this function at all: there is
    nothing to hand the model, so there is nothing honest for it to
    answer with. See this week's notes/01-why-retrieval-matters.md.
    """
    context_blocks = []
    for record in matches:
        context_blocks.append(
            f'[Source: {record["filename"]}, section {record["position"]}]\n{record["text"]}'
        )
    context_text = "\n\n---\n\n".join(context_blocks)

    system_prompt = (
        "You answer questions using ONLY the note excerpts provided below. "
        "If the excerpts do not contain the answer, say clearly that the "
        "notes don't cover it. Do not use any outside knowledge, and do not "
        "guess. When you do answer, mention which source(s) you used."
    )

    user_prompt = f"Note excerpts:\n\n{context_text}\n\nQuestion: {question}"

    response = client.messages.create(
        model=MODEL,
        max_tokens=512,
        system=system_prompt,
        messages=[{"role": "user", "content": user_prompt}],
    )
    return next((b.text for b in response.content if b.type == "text"), "")


def main():
    notes = load_notes(NOTES_DIR)
    if not notes:
        print(f"No .txt notes found in {NOTES_DIR}")
        return

    chunk_index = build_chunk_index(notes)
    print(f"Loaded {len(notes)} notes, {len(chunk_index)} chunks.\n")
    print("Commands:")
    print("  list                   show loaded filenames")
    print("  summarize <filename>   e.g. summarize wifi-setup.txt")
    print("  ask <question>         e.g. ask how do I reset my router")
    print("  quit\n")

    while True:
        command = input("> ").strip()
        if not command:
            continue
        if command in ("quit", "exit"):
            break

        if command == "list":
            for filename in notes:
                print(f"  {filename}")
            continue

        if command.startswith("summarize "):
            filename = command[len("summarize "):].strip()
            if filename not in notes:
                print(f"No note named '{filename}'. Try 'list'.")
                continue
            print(summarize_note(filename, notes[filename]))
            continue

        if command.startswith("ask "):
            question = command[len("ask "):].strip()
            matches = find_relevant_chunks(chunk_index, question)
            if not matches:
                print("None of the notes seem to mention that. Not answering.")
                continue
            print(answer_question(question, matches))
            print("\nSources used:")
            for record in matches:
                print(f"  {record['filename']} (section {record['position']})")
            continue

        print("Unrecognized command. Try 'list', 'summarize <file>', 'ask <question>', or 'quit'.")


if __name__ == "__main__":
    main()
