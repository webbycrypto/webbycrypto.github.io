"""
Exercise 9: what the stopword list is actually doing to your scores.

notes_assistant.py filters out a fixed list of common filler words
(STOPWORDS) before comparing a question against a chunk. It's easy to
skim past that list as boilerplate. This exercise makes its effect
concrete by scoring the SAME question against the SAME two chunks
three times, once with the real stopword list, once with no stopword
list at all, and once with a stopword list that removes a word or two
too many, so you can see both failure directions: too few stopwords,
and too many.

No API key or network call is needed; this is pure Python.

Run it with:
    python 09_stopword_impact.py
"""

import string

FULL_STOPWORDS = {
    "a", "an", "the", "is", "are", "was", "were", "be", "been", "am",
    "i", "you", "he", "she", "it", "we", "they", "me", "my", "your",
    "of", "in", "on", "at", "to", "for", "and", "or", "but", "with",
    "how", "what", "why", "when", "where", "do", "does", "did", "can",
    "should", "would", "this", "that", "these", "those", "not", "no",
    "so", "as", "if", "than", "then", "about", "from",
}

NO_STOPWORDS = set()

# Deliberately too aggressive: this removes two words that actually
# carry the topic of the question, "wifi" and "fix", as if someone
# had pasted them into the stopword list by mistake alongside real
# filler words.
TOO_AGGRESSIVE_STOPWORDS = FULL_STOPWORDS | {"wifi", "fix"}


def significant_words(text: str, stopwords: set) -> set:
    text = text.lower().translate(str.maketrans("", "", string.punctuation))
    return {w for w in text.split() if w and w not in stopwords}


def score(question: str, chunk: str, stopwords: set) -> int:
    return len(significant_words(question, stopwords) & significant_words(chunk, stopwords))


question = "How do I fix my wifi?"
chunk_a = "If the internet drops, restart the router to fix the connection issue."
chunk_b = "The bike gears felt unfamiliar to me until the shop showed me how each one works."


if __name__ == "__main__":
    for label, stopwords in [
        ("Full stopword list (the real notes_assistant.py list)", FULL_STOPWORDS),
        ("No stopwords at all", NO_STOPWORDS),
        ("Too-aggressive stopword list (wifi and fix removed)", TOO_AGGRESSIVE_STOPWORDS),
    ]:
        print(label)
        score_a = score(question, chunk_a, stopwords)
        score_b = score(question, chunk_b, stopwords)
        shared_a = significant_words(question, stopwords) & significant_words(chunk_a, stopwords)
        shared_b = significant_words(question, stopwords) & significant_words(chunk_b, stopwords)
        print(f"  wifi-note (chunk_a):  score={score_a}  shared words={shared_a}")
        print(f"  bike-note (chunk_b):  score={score_b}  shared words={shared_b}")
        print()

    # --- What to notice ---
    #
    # With the full, real stopword list, chunk_a (about wifi) scores 1
    # and chunk_b (about a bike, completely unrelated) scores 0. That's
    # the correct outcome: only the wifi note should look relevant to
    # a wifi question.
    #
    # With no stopwords at all, chunk_b jumps to a score of 1, sharing
    # the word "how" with the question, because "how" is a literal
    # word in "how each one works" and, with no filtering at all, a
    # completely generic filler word counts exactly the same as a real
    # topic word like "wifi." This is the same false-positive problem
    # exercise 05 showed for naive substring matching, but here it's
    # coming from a different place: not a bad matching STRATEGY, but
    # a missing filtering STEP that the real notes_assistant.py
    # includes specifically to prevent this.
    #
    # With the too-aggressive list, chunk_a's score drops to 0, the
    # SAME score as the totally unrelated bike note. Removing "wifi"
    # and "fix" from consideration didn't just filter noise, it threw
    # away the two words that actually made this chunk relevant in the
    # first place. A stopword list isn't "more stopwords is always
    # safer." Every word you add to it is a word retrieval can never
    # use as a signal again, for any question, ever.
    #
    # Try this: add "router" to FULL_STOPWORDS and rerun. Then write a
    # new question, in the same style, that only makes sense to answer
    # using the word "router" specifically (something like "what does
    # the router look like"), and watch what happens to chunk_a's
    # score for that new question once "router" can no longer count.
