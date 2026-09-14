# Guided walkthrough: build the retrieval core, line by line

[← Back to Week 5 exercises](README.md)

`../project/README.md` explains `notes_assistant.py` piece by piece, but it's explaining a finished file. This exercise has you type and test the single newest, most important idea in that file, the "simple version of retrieval" from `notes/01-why-retrieval-matters.md`, yourself, from scratch, before you read that explanation.

Every step below is pure Python: no API key, no network call, nothing that can fail for a reason outside your own code. That's deliberate, so you can test each piece immediately and know for certain whether it's your logic or something external. Type each step into a fresh file, `00_guided_build_retrieval.py`, and run it after every single one.

## Step 1: turn a sentence into meaningful words

```python
import string

STOPWORDS = {"a", "an", "the", "is", "are", "how", "do", "i", "my"}


def significant_words(text):
    text = text.lower().translate(str.maketrans("", "", string.punctuation))
    words = text.split()
    return {w for w in words if w and w not in STOPWORDS}


print(significant_words("How do I fix my wifi?"))
```

Run it: `python 00_guided_build_retrieval.py`. You should see `{'fix', 'wifi'}` (set order may vary). `.lower()` and `.translate(...)` strip case and punctuation so `"Wifi?"` and `"wifi"` count as the same word. `str.split()` with no argument splits on any whitespace. The set comprehension at the end keeps only words that aren't filler. Try changing the sentence and rerunning to see the output change; that loop, change one thing and rerun, is worth doing several times here before moving on.

## Step 2: score how well two pieces of text overlap

```python
def score_overlap(text_a, text_b):
    words_a = significant_words(text_a)
    words_b = significant_words(text_b)
    return len(words_a & words_b)


print(score_overlap("How do I fix my wifi?", "Restart the wifi router to fix connection issues."))
print(score_overlap("How do I fix my wifi?", "This sourdough starter needs feeding daily."))
```

Run it. You should see a positive number for the first pair (they share `fix` and `wifi`) and `0` for the second (no shared words at all). `&` between two sets is intersection: only the words present in both. This one function, called with a question and one chunk of text, is the entire "search engine" this project uses; nothing more sophisticated is happening underneath.

## Step 3: split a block of text into chunks

```python
def chunk_text(text):
    raw_chunks = text.split("\n\n")
    return [c.strip() for c in raw_chunks if c.strip()]


sample_note = """Wifi troubleshooting.

If the wifi drops, restart the router to fix it.

If that doesn't work, check the ISP outage map."""

for chunk in chunk_text(sample_note):
    print("CHUNK:", chunk)
```

Run it. You should see three separate `CHUNK:` lines, one per paragraph. `"\n\n"` is two newlines in a row, a blank line, which is how the sample note above separates its paragraphs. `.strip()` removes leading/trailing whitespace from each piece, and the `if c.strip()` filter drops anything that was blank to begin with (like a trailing blank line at the end of a file).

## Step 4: find the best-matching chunk for a question

```python
def find_best_chunk(chunks, question):
    scored = [(score_overlap(question, chunk), chunk) for chunk in chunks]
    scored = [(score, chunk) for score, chunk in scored if score > 0]
    if not scored:
        return None
    scored.sort(key=lambda pair: pair[0], reverse=True)
    return scored[0][1]


chunks = chunk_text(sample_note)
print(find_best_chunk(chunks, "how do I fix my wifi"))
print(find_best_chunk(chunks, "what's the best programming language"))
```

Run it. The first call should print `If the wifi drops, restart the router to fix it.`, the chunk that shares two words (`wifi` and `fix`) with the question, beating the other chunk's single shared word (`wifi` alone). The second should print `None`. Look closely at the middle line: `if score > 0` throws out any chunk with zero shared words, BEFORE sorting or picking a winner. Without that filter, `find_best_chunk` would always return something, even for a completely unrelated question, because sorting a list and taking the first item works even when every score is 0. That single filtering line is what turns "always give an answer" into "only answer when there's real evidence," which is exactly the property `notes/01-why-retrieval-matters.md` said mattered, and exactly what the Week 8 docs-assistant capstone will expect you to have built into a real project.

## Compare, don't copy

Open `../project/notes_assistant.py` and find `significant_words`, `score_chunk`, `chunk_note`, and `find_relevant_chunks`. They're the same four ideas you just built, with two differences worth noticing rather than being confused by: the real version tracks *which file and position* each chunk came from (needed for citations, which this scratch exercise didn't bother with), and `find_relevant_chunks` returns the top 3 matches instead of just the single best one. Neither difference changes the core logic you just wrote and tested four separate times.
