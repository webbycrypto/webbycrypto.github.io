"""
Exercise 6: a second chunking strategy, fixed-size character windows.

notes_assistant.py chunks a note by splitting on blank lines, one
chunk per paragraph. That's a real, working strategy, but it's not the
only one, and it's worth seeing a genuinely different strategy applied
to the SAME text so the tradeoff is something you've actually watched
happen, not just read about.

This exercise builds a second chunking function, chunk_by_fixed_size,
which ignores paragraph breaks entirely and instead just slices the
note's text into windows of a fixed number of characters, one after
another, and runs it on the same sample note as chunk_by_paragraph, so
you can compare the two chunk lists directly.

No API key or network call is needed; this is pure Python.

Run it with:
    python 06_fixed_size_chunking.py
"""

sample_note = """Sourdough Starter Care

Feed the starter once a day if it lives on the counter, or once a week if it lives in the fridge. Feeding means discarding about half of it and mixing in equal parts flour and water by weight.

A healthy starter should smell pleasantly sour, almost like yogurt, and should roughly double in size a few hours after feeding. If it smells like acetone or paint thinner, it's just hungry, feed it and it usually recovers within a day or two.

If bread keeps coming out dense instead of light and airy, the most common cause is not letting the dough rise long enough before baking, especially in a cold kitchen. A longer, slower rise almost always helps more than adding more starter."""


def chunk_by_paragraph(text: str) -> list:
    """The real notes_assistant.py strategy: one chunk per blank-line-
    separated paragraph. See chunk_note() in ../project/notes_assistant.py.
    """
    raw_chunks = text.split("\n\n")
    return [c.strip() for c in raw_chunks if c.strip()]


def chunk_by_fixed_size(text: str, window_size: int = 120, overlap: int = 0) -> list:
    """A different strategy: collapse all whitespace (so paragraph
    breaks stop mattering at all), then slice the result into
    windows of exactly `window_size` characters each, one after
    another. `overlap` (0 here) is how many characters the end of one
    window and the start of the next share; exercise 08 in this folder
    explores what changing that does.

    This has no idea where a sentence, a paragraph, or even a word
    ends. It just counts characters and cuts.
    """
    text = " ".join(text.split())  # collapse all whitespace to single spaces
    chunks = []
    start = 0
    while start < len(text):
        end = start + window_size
        chunks.append(text[start:end])
        start += window_size - overlap
    return chunks


if __name__ == "__main__":
    paragraph_chunks = chunk_by_paragraph(sample_note)
    fixed_chunks = chunk_by_fixed_size(sample_note, window_size=120)

    print(f"Paragraph chunking: {len(paragraph_chunks)} chunks")
    for i, chunk in enumerate(paragraph_chunks):
        print(f"  [{i}] ({len(chunk)} chars) {chunk!r}")

    print()
    print(f"Fixed-size chunking (120 chars): {len(fixed_chunks)} chunks")
    for i, chunk in enumerate(fixed_chunks):
        print(f"  [{i}] ({len(chunk)} chars) {chunk!r}")

    # --- What to notice ---
    #
    # Look at fixed-size chunk [3] and [4]. Chunk [3] ends mid-word,
    # "...If bread keeps comin", and chunk [4] picks up with
    # "g out dense instead of light and airy...". Fixed-size windows
    # do not know or care that they just sliced the word "coming" in
    # half, or that they cut a sentence in half along with it. Every
    # word-level, sentence-level, and paragraph-level idea "coming out
    # dense is caused by an under-risen dough" is now split across two
    # separate chunks, and a retrieval step working chunk-by-chunk (the
    # way find_relevant_chunks does) has to somehow score two half-
    # sentence fragments against a question, instead of one coherent
    # paragraph that says the whole thing.
    #
    # Now look at fixed-size chunk [0]: it starts with the note's
    # TITLE, "Sourdough Starter Care", then keeps going straight into
    # the first paragraph's content with no boundary between them,
    # because fixed-size chunking has no concept of "this line is a
    # title" any more than it has a concept of "this is the end of a
    # sentence." Paragraph chunking, by contrast, gave the title its
    # own tiny 22-character chunk (paragraph_chunks[0]), which has the
    # opposite problem: a chunk with barely any content in it at all.
    #
    # Try this: change window_size to 60, then to 300, and rerun.
    # Smaller windows cut words and sentences apart more often (more
    # boundary damage, but each chunk is cheaper to send to the model).
    # Larger windows cut less often, but you start approaching "the
    # whole note in one chunk," which defeats the point of chunking in
    # the first place. There is no window_size that eliminates the
    # problem entirely, because the function has no idea where a
    # sentence ends; it only knows how to count characters. That's the
    # real, concrete tradeoff behind the design choice notes_assistant.py
    # actually made: splitting on blank lines respects the boundaries a
    # human writer already put there, at the cost of producing chunks
    # of very uneven size (22 characters versus 243 characters, in the
    # paragraph output above).
