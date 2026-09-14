"""
Bonus (optional): what does "vector similarity" actually look like in code?

This script is NOT used by notes_assistant.py, and you do not need to
run it to finish Week 5. It exists purely so the word "vector" in
notes/02-embeddings-and-vector-search.md has something concrete
attached to it.

To be clear about what this is and isn't: we are still not calling any
embedding model here. Real embeddings come from a trained model and
place words with similar MEANING near each other, even when the
wording is completely different. What we're building below is a much
dumber cousin: a word-COUNT vector, which only understands literal
shared words, exactly like the keyword scoring already used in
notes_assistant.py. What IS worth seeing is that this version is
written as an explicit vector, compared with a real, textbook
similarity formula (cosine similarity), so you can see the actual
shape of what a real vector search does under the hood: build a
vector, compare it to other vectors, keep the closest ones.

Run it with:
    python bonus_vector_similarity.py
"""

import math
import string
from collections import Counter


def to_vector(text: str) -> Counter:
    """Turn text into a word-count vector, e.g. {"bread": 2, "starter": 1}.

    A Counter behaves like a dictionary here. Two texts that share more
    words, with similar counts, will produce a higher similarity score
    below.
    """
    cleaned = text.lower().translate(str.maketrans("", "", string.punctuation))
    return Counter(cleaned.split())


def cosine_similarity(vec_a: Counter, vec_b: Counter) -> float:
    """The standard formula for "how similar are these two vectors":
    their dot product, divided by the product of their lengths
    (magnitudes).

    Returns a number from 0 (nothing in common) to 1 (identical in
    direction, meaning the same words in the same proportions). Real
    embedding-based search compares vectors exactly this way, just
    with much richer, model-generated vectors instead of raw word
    counts.
    """
    shared_words = set(vec_a) & set(vec_b)
    dot_product = sum(vec_a[word] * vec_b[word] for word in shared_words)

    magnitude_a = math.sqrt(sum(count ** 2 for count in vec_a.values()))
    magnitude_b = math.sqrt(sum(count ** 2 for count in vec_b.values()))

    if magnitude_a == 0 or magnitude_b == 0:
        return 0.0

    return dot_product / (magnitude_a * magnitude_b)


if __name__ == "__main__":
    question = "why is my bread dense"

    candidates = {
        "sourdough note, section 3 (shares 'bread' and 'dense')": (
            "If bread keeps coming out dense instead of light and airy, "
            "the most common cause is not letting the dough rise long "
            "enough before baking."
        ),
        "wifi note, section 2 (shares nothing relevant)": (
            "If the internet drops, the fastest fix is usually to unplug "
            "the router, wait 10 seconds, and plug it back in."
        ),
    }

    question_vector = to_vector(question)
    print(f"Question: {question!r}\n")
    for label, text in candidates.items():
        similarity = cosine_similarity(question_vector, to_vector(text))
        print(f"{label}\n  similarity = {similarity:.3f}\n")

    # Try this: change `question` to "why is my loaf not rising" (no
    # shared words with the sourdough excerpt above at all, "loaf" and
    # "rising" versus "bread" and "dense") and watch the similarity
    # score drop toward zero, even though a human would say the two
    # sentences are clearly about the same problem. That gap is
    # exactly the limitation of word-count vectors that real, trained
    # embeddings are built to close.
