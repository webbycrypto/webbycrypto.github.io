"""
Exercise 8: does overlapping windows fix what fixed-size chunking broke?

06_fixed_size_chunking.py showed a real problem: cutting a note into
fixed-size character windows can slice a word, or a whole idea, in
half, right at the boundary between two chunks. A common fix in real
retrieval systems is to let consecutive windows OVERLAP: instead of
each window starting exactly where the last one ended, it starts a
little bit BEFORE the last one ended, so a sentence sitting near a
boundary has a decent chance of appearing whole in at least one chunk.

This exercise reuses 06's chunk_by_fixed_size function (already built
with an `overlap` parameter, unused until now) and compares
overlap=0 against overlap=30 on the exact same note, so you can see
whether overlap actually rescues the split sentence from 06, or just
moves the problem around.

No API key or network call is needed; this is pure Python.

Run it with:
    python 08_chunk_overlap_sliding_window.py
"""

sample_note = """Sourdough Starter Care

Feed the starter once a day if it lives on the counter, or once a week if it lives in the fridge. Feeding means discarding about half of it and mixing in equal parts flour and water by weight.

A healthy starter should smell pleasantly sour, almost like yogurt, and should roughly double in size a few hours after feeding. If it smells like acetone or paint thinner, it's just hungry, feed it and it usually recovers within a day or two.

If bread keeps coming out dense instead of light and airy, the most common cause is not letting the dough rise long enough before baking, especially in a cold kitchen. A longer, slower rise almost always helps more than adding more starter."""


def chunk_by_fixed_size(text: str, window_size: int = 120, overlap: int = 0) -> list:
    """Same function as in 06_fixed_size_chunking.py. `overlap` is how
    many characters the end of one window and the start of the next
    window have in common. overlap=0 means no repetition at all
    (06's behavior); overlap=30 means each window after the first
    "backs up" 30 characters before continuing, so the last 30
    characters of one chunk are also the first 30 characters of the
    next one.
    """
    text = " ".join(text.split())
    chunks = []
    start = 0
    while start < len(text):
        end = start + window_size
        chunks.append(text[start:end])
        start += max(window_size - overlap, 1)
    return chunks


if __name__ == "__main__":
    no_overlap = chunk_by_fixed_size(sample_note, window_size=120, overlap=0)
    with_overlap = chunk_by_fixed_size(sample_note, window_size=120, overlap=30)

    print(f"No overlap: {len(no_overlap)} chunks")
    for i, chunk in enumerate(no_overlap):
        print(f"  [{i}] {chunk!r}")

    print()
    print(f"30-character overlap: {len(with_overlap)} chunks")
    for i, chunk in enumerate(with_overlap):
        print(f"  [{i}] {chunk!r}")

    print()
    print("The sentence that got split with no overlap:")
    print("  no_overlap[3] tail:", repr(no_overlap[3][-30:]))
    print("  no_overlap[4] head:", repr(no_overlap[4][:30]))

    # --- What to notice ---
    #
    # With no overlap, "If bread keeps coming out dense..." gets sliced
    # apart: chunk [3] ends with "...keeps comin" and chunk [4] starts
    # with "g out dense...". Neither chunk, on its own, contains the
    # complete idea "bread keeps coming out dense."
    #
    # Now look at with_overlap[5]. Because each window backs up 30
    # characters before continuing, this chunk contains the ENTIRE
    # phrase "If bread keeps coming out dense instead of light and
    # airy, the most common cause is not letting the dough rise" in
    # one piece. Overlap really did rescue this particular sentence
    # from being split.
    #
    # But look closely at what that cost: with_overlap produced 8
    # chunks instead of 6 for the exact same note, and a decent chunk
    # of text (literally, the overlapping parts) now exists TWICE in
    # the index, once at the tail of one chunk and again at the head
    # of the next. Every one of those duplicated characters gets
    # scored twice during retrieval, and sent to the model twice if
    # both chunks happen to be selected as a match. Overlap trades
    # "fewer split sentences" for "more chunks, more duplication, more
    # tokens." Neither choice is free.
    #
    # Try this: set overlap to 60 (half the window size) and rerun.
    # Count how many chunks come out, and estimate, roughly, what
    # fraction of the note's total characters you're now storing more
    # than once. There's a real limit to how much overlap is worth
    # paying for, and it's the same "cost" argument from
    # notes/01-why-retrieval-matters.md, just applied one level down,
    # to chunking instead of to whole notes.
