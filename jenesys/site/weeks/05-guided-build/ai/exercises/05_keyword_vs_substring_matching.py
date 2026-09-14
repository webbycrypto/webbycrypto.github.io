"""
Exercise 5: keyword overlap versus naive substring matching.

notes_assistant.py scores a chunk against a question by counting shared
SIGNIFICANT words (lowercased, punctuation stripped, stopwords removed,
compared as sets). That's a real, deliberate design choice, not the
only way a beginner might think to check "does this chunk match this
question." A tempting, simpler-looking alternative is: just check
whether each word of the question literally appears somewhere inside
the chunk's text, with `in`, and count how many do.

This exercise builds both approaches side by side, on the same two
tiny sample chunks and two questions, and prints exactly where they
disagree, and why. No API key or network call is needed; this is pure
Python, the same as 00_guided_build_retrieval.py and
04_guided_build_citations.py.

Run it with:
    python 05_keyword_vs_substring_matching.py
"""

import string

STOPWORDS = {
    "a", "an", "the", "is", "are", "how", "do", "does", "i", "my",
    "to", "for", "in", "of", "on", "it", "you", "your", "why",
}


def significant_words(text: str) -> set:
    """The real notes_assistant.py approach: lowercase, strip
    punctuation, split on whitespace, drop stopwords, compare as sets.
    """
    text = text.lower().translate(str.maketrans("", "", string.punctuation))
    return {w for w in text.split() if w and w not in STOPWORDS}


def keyword_overlap_score(question: str, chunk: str) -> int:
    return len(significant_words(question) & significant_words(chunk))


def naive_substring_score(question: str, chunk: str) -> int:
    """A tempting-looking alternative: lowercase the chunk, split the
    RAW question on whitespace (no punctuation stripping, no stopword
    removal), and count how many of those raw words appear anywhere
    inside the chunk as a literal substring.

    This looks like it should work, and sometimes it even lands on the
    same total score as keyword_overlap_score by coincidence. What it
    does NOT do is check whether a match means anything: a one- or
    two-letter word matching because it happens to be hiding inside a
    completely unrelated longer word counts exactly the same as a real,
    meaningful shared word.
    """
    chunk_lower = chunk.lower()
    words = question.lower().split()
    return sum(1 for w in words if w in chunk_lower)


def which_words_matched(question: str, chunk: str) -> list:
    """Same logic as naive_substring_score, but returns the actual
    words that matched instead of just a count, so you can SEE what's
    really driving that number.
    """
    chunk_lower = chunk.lower()
    words = question.lower().split()
    return [w for w in words if w in chunk_lower]


sample_chunks = {
    "wifi-note": "If the wifi drops, restart the router to fix the connection issue.",
    "bike-note": "The bike gears felt unfamiliar to me until the shop showed me how each one works.",
}

questions = [
    "How do I fix my wifi?",
    "Why does my bike feel unfamiliar to ride?",
]

if __name__ == "__main__":
    for question in questions:
        print(f"Question: {question!r}")
        for label, chunk in sample_chunks.items():
            kw_score = keyword_overlap_score(question, chunk)
            sub_score = naive_substring_score(question, chunk)
            matched_words = which_words_matched(question, chunk)
            print(f"  {label}:")
            print(f"    keyword_overlap_score  = {kw_score}  (shared significant words: {significant_words(question) & significant_words(chunk)})")
            print(f"    naive_substring_score  = {sub_score}  (raw words that matched:  {matched_words})")
        print()

    # --- What to notice ---
    #
    # Run this as-is first. Then read the printed "raw words that
    # matched" list for the "How do I fix my wifi?" question against
    # bike-note, the note that has NOTHING to do with wifi. You should
    # see naive_substring_score come back as 2, the SAME nonzero score
    # it gives for topics that actually match, purely because "how"
    # happens to appear as a real word inside "how each one works,"
    # and "i" happens to appear as a substring inside completely
    # unrelated words. keyword_overlap_score correctly scores that
    # same pair as 0, because "how" and "i" are stopwords, filtered out
    # before comparison, on both sides.
    #
    # Try this: add "how" and "i" to STOPWORDS at the top of this file
    # (they're partly there already; try removing "how" from the list
    # and rerunning to watch keyword_overlap_score start making the
    # same mistake). Then try adding a THIRD sample chunk of your own,
    # deliberately containing a short, common word like "to" or "a"
    # buried inside an unrelated sentence, and see whether
    # naive_substring_score falsely credits it as relevant to a
    # question that has nothing to do with it.
    #
    # The lesson isn't "never use substring checks." It's that ANY
    # matching strategy is only as good as what it decides counts as a
    # meaningful signal versus noise, and naive substring matching, as
    # written above, has no concept of "noise" at all: every character
    # sequence is treated as equally meaningful, whether it's "wifi" or
    # the letter "i" hiding inside "unfamiliar."
