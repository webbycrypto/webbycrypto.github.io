"""
Exercise 10: what changing top_k actually does, on real sample data.

find_relevant_chunks in notes_assistant.py takes a top_k argument
(default 3) that caps how many chunks get handed to the model. This
exercise runs the exact same question against the real Week 5 sample
notes three times, with top_k set to 1, 3, and 10, and prints what
comes back each time, so "top_k controls how many results you get"
stops being an abstract sentence and becomes something you've actually
watched happen, including a genuinely surprising result.

This uses the real ../project/sample_notes/ folder, and no API key or
network call is needed; this is pure Python.

Run it with:
    python 10_top_k_tuning.py
"""

import os
import string

NOTES_DIR = os.path.join(os.path.dirname(__file__), "..", "project", "sample_notes")

STOPWORDS = {
    "a", "an", "the", "is", "are", "was", "were", "be", "been", "am",
    "i", "you", "he", "she", "it", "we", "they", "me", "my", "your",
    "of", "in", "on", "at", "to", "for", "and", "or", "but", "with",
    "how", "what", "why", "when", "where", "do", "does", "did", "can",
    "should", "would", "this", "that", "these", "those", "not", "no",
    "so", "as", "if", "than", "then", "about", "from",
}


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


if __name__ == "__main__":
    notes = load_notes(NOTES_DIR)
    chunk_index = build_chunk_index(notes)
    question = "how do I fix my wifi"
    question_words = significant_words(question)
    print(f"Question: {question!r}  (significant words: {question_words})\n")

    for k in (1, 3, 10):
        matches = find_relevant_chunks(chunk_index, question, top_k=k)
        print(f"top_k={k}: {len(matches)} matches")
        for record in matches:
            s = score_chunk(record["text"], question_words)
            print(f"  score={s}  {record['filename']} (section {record['position']}): {record['text'][:55]!r}...")
        print()

    # --- What to notice ---
    #
    # This is worth running before reading further, then coming back to
    # this comment.
    #
    # With top_k=1, the ONLY chunk that comes back is from
    # budgeting-basics.txt, not wifi-setup.txt. Read that budgeting
    # chunk: "Track every expense for one full month before making any
    # changes. You cannot fix a budget you don't actually understand
    # yet." It shares exactly one word with the question, "fix," and
    # that's enough to tie it with every genuinely wifi-related chunk,
    # all of which ALSO score exactly 1 for this question (check the
    # top_k=3 and top_k=10 output above; every match shown has
    # score=1). When several chunks tie on score, find_relevant_chunks
    # doesn't have any second tiebreaker; Python's sort keeps ties in
    # their original order, which here just happens to be alphabetical
    # by filename, since that's the order load_notes reads files in.
    # With top_k=1, you got the alphabetically-first tied chunk, not
    # the most relevant one; there's no meaningful difference between
    # them AS FAR AS THIS SCORING FUNCTION CAN TELL.
    #
    # top_k=3 and top_k=10 both happen to surface the real wifi content
    # too, simply because there's room for more than one result. That's
    # not top_k "getting smarter." It's the same underlying weakness
    # (ties break arbitrarily) getting papered over by having enough
    # slots that the arbitrary pick isn't the ONLY thing that comes
    # back.
    #
    # Try this: write a question that ties three or more chunks at
    # score 1 across totally unrelated notes (skim significant_words()
    # for each sample note to find a shared filler-ish word that
    # survived the stopword list), and watch what top_k=1 hands back
    # for it. Then consider: is top_k=1 ever actually safe to use with
    # this scoring function, given what you just watched happen? What
    # would need to change (a better score, a real tiebreaker, a
    # minimum score threshold above 0) to make top_k=1 trustworthy?
