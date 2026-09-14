# Week 5 project: Notes Assistant v1

[← Back to Week 5 (AI track): Guided build](../README.md)

Full context: [Week 5 README](../README.md), and read `notes/` in this folder before starting if you haven't yet. This walkthrough assumes you already know what retrieval is and why it matters, why "hand it to the model" means literally putting text in the prompt, and why this week's retrieval is a simple keyword version rather than real embeddings.

## What you're building

A command-line tool, `notes_assistant.py`, that:

1. Loads every `.txt` file out of a folder of notes (`sample_notes/`, included so this runs out of the box; point it at your own notes folder later by changing `NOTES_DIR`).
2. Can summarize any single note using Claude.
3. Can answer a question by finding the note chunks that share the most words with the question, handing ONLY those chunks to Claude, and reporting exactly which note(s) it used.

This is the app you'll keep extending through Weeks 6 and 7: Week 6 turns the search-and-answer step into real tool calls Claude makes itself, and Week 7 adds persistence and a second tool-chaining scenario on top of that. Nothing here is throwaway.

If you haven't already, work through `../exercises/00-guided-build-retrieval.md` first. It has you type and test the retrieval core (chunking, scoring, filtering) yourself, from scratch, with no API key needed, before you've read any explanation of the finished version. What follows here is that same idea, now inside the real, complete `notes_assistant.py` in this folder, walked through piece by piece, so you understand every line, not just running something that works.

## Step 1: load the notes

```python
def load_notes(folder_path: str) -> dict:
    notes = {}
    for filename in sorted(os.listdir(folder_path)):
        if not filename.endswith(".txt"):
            continue
        full_path = os.path.join(folder_path, filename)
        with open(full_path, "r", encoding="utf-8") as f:
            notes[filename] = f.read()
    return notes
```

Nothing AI-specific here, just plain file I/O: list a directory, keep only `.txt` files, read each one into a dictionary keyed by filename. The filename is kept as the dictionary key deliberately, because it becomes the citation later. If you only stored the text and threw the filename away here, there would be no way to answer "which note did this come from" further down, no matter how good the rest of the code was.

## Step 2: split each note into chunks

```python
def chunk_note(text: str) -> list:
    raw_chunks = text.split("\n\n")
    return [chunk.strip() for chunk in raw_chunks if chunk.strip()]
```

This is the "simple version of retrieval" the notes promised. Splitting on blank lines treats each paragraph as one chunk. Open any file in `sample_notes/` and you'll see each one is written as 2-3 short paragraphs, each covering one idea, exactly so this simple splitting strategy produces sensible chunks. If your own notes are written as one giant unbroken paragraph, this function will hand back one giant chunk for that note, which defeats the purpose of chunking at all. That's a real limitation worth knowing about, not a hidden bug: production retrieval systems chunk by token count or sentence boundaries specifically so document formatting doesn't determine chunk quality. For this week, writing (or reformatting) your notes with blank lines between ideas is the expected fix, not more code.

## Step 3: build a searchable index of chunks

```python
def build_chunk_index(notes: dict) -> list:
    index = []
    for filename, text in notes.items():
        for position, chunk_text in enumerate(chunk_note(text)):
            index.append({
                "filename": filename,
                "position": position,
                "text": chunk_text,
            })
    return index
```

This flattens every note's chunks into one list, and, critically, tags each chunk with exactly where it came from. `position` is the chunk's index within its own file (0, 1, 2, ...), not a global counter. This is the data structure everything else in the file searches over. If you're used to thinking of "a database" as something separate and heavyweight, notice that this Python list of dictionaries IS the database for this project. That's a completely legitimate database for a folder of a few dozen short notes. It would stop being a reasonable choice somewhere past a few thousand chunks, which is the point at which real systems reach for the vector databases mentioned in this week's notes.

## Step 4: score a chunk against a question

```python
STOPWORDS = {"a", "an", "the", "is", ...}  # see the full list in notes_assistant.py

def significant_words(text: str) -> set:
    text = text.lower().translate(str.maketrans("", "", string.punctuation))
    words = text.split()
    return {w for w in words if w and w not in STOPWORDS}


def score_chunk(chunk_text: str, question_words: set) -> int:
    chunk_words = significant_words(chunk_text)
    return len(question_words & chunk_words)
```

`significant_words` turns a string into a set of lowercase words with punctuation stripped and common filler words removed. Two sets, intersected with `&`, gives you the words they have in common; `len()` of that intersection is the score. Ask "how do I fix my wifi" against the wifi note's second paragraph and you'd share words like `fix`, `wifi` (well, `wi` and `fi` if you're not careful about punctuation stripping, which is exactly why punctuation stripping happens first). Ask the same question against the sourdough note and you'd likely share zero words, giving a score of 0.

This is genuinely the entire "search engine" for this project. It's a bag-of-words overlap count, nothing more. Compare it against `bonus_vector_similarity.py` in this same folder if you want to see the same basic idea expressed as an actual numeric vector and a real similarity formula, which is closer to what a production embeddings-based system does mechanically, just with far richer vectors.

## Step 5: find the best-matching chunks for a question

```python
def find_relevant_chunks(chunk_index: list, question: str, top_k: int = 3) -> list:
    question_words = significant_words(question)
    scored = [
        (score_chunk(record["text"], question_words), record)
        for record in chunk_index
    ]
    scored = [(score, record) for score, record in scored if score > 0]
    scored.sort(key=lambda pair: pair[0], reverse=True)
    return [record for score, record in scored[:top_k]]
```

Score every chunk, throw out anything that scored exactly 0 (no shared words means no real basis to call it relevant), sort what's left best-first, and keep the top 3. That last filtering step, dropping 0-score chunks instead of just taking "the top 3 no matter what," is the difference between honest retrieval and retrieval that always hands the model SOMETHING whether or not it's actually relevant. Go re-read this week's notes/01-why-retrieval-matters.md if it's not obvious why that distinction matters: it's the same distinction the Week 8 docs-assistant capstone will grade you on directly (refuse to answer rather than guess, when nothing in the documents actually covers the question).

## Step 6: summarize one note

```python
def summarize_note(filename: str, text: str) -> str:
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
```

The first genuinely new piece: a real API call. The `system` parameter sets standing instructions for how Claude should behave for this whole request (summarize briefly, stay factual), separate from the specific note text in the `messages` list. Note the explicit instruction not to add outside advice: without it, a helpful-sounding model will happily pad a summary with generic tips that weren't in your actual note, which quietly breaks the promise that this tool only tells you what's in YOUR notes.

The last line is worth memorizing, because it appears, unchanged, in every function in this file that calls the API: `response.content` is a list of content blocks, and `next(... if block.type == "text" ...)` grabs the text out of the first text block, or returns `""` if somehow there wasn't one, rather than crashing with an index error on an empty list.

## Step 7: answer a question, grounded in retrieved chunks

```python
def answer_question(question: str, matches: list) -> str:
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
```

This is Step 3 from `notes/01-why-retrieval-matters.md` made real: `matches` (the chunks Step 5 decided were relevant) get formatted with their source labels attached, then the WHOLE labeled block becomes part of the prompt, alongside the question. The system prompt does real work here too: it explicitly tells Claude to answer only from the given excerpts and to say plainly when they don't cover the question, rather than trusting the model to figure that boundary out on its own. Without that instruction, a model asked "how do I fix a flat tire" with only sourdough and wifi notes as context will very often still attempt a generic answer from its training data, which is exactly the failure mode this whole project exists to prevent.

## Step 8: tie it together with a simple command loop

```python
def main():
    notes = load_notes(NOTES_DIR)
    if not notes:
        print(f"No .txt notes found in {NOTES_DIR}")
        return

    chunk_index = build_chunk_index(notes)
    # ... print available commands ...

    while True:
        command = input("> ").strip()
        if command in ("quit", "exit"):
            break
        if command == "list":
            ...
        if command.startswith("summarize "):
            ...
        if command.startswith("ask "):
            question = command[len("ask "):].strip()
            matches = find_relevant_chunks(chunk_index, question)
            if not matches:
                print("None of the notes seem to mention that. Not answering.")
                continue
            print(answer_question(question, matches))
            ...
```

The full version is in `notes_assistant.py`. The one line worth pointing at specifically is `if not matches: ... continue`. When retrieval finds nothing relevant, the program does not call the model at all. This is a deliberate, cheap, and completely reliable way to enforce "don't guess when there's nothing to go on": the guarantee doesn't rely on the model behaving itself, because the model was never given the chance to answer in the first place.

## Run it

```bash
cd weeks/05-guided-build/ai/project
python notes_assistant.py
```

Try, in order:

```
list
summarize sourdough-starter.txt
ask why is my bread coming out dense
ask how do I fix my wifi
ask what's the best programming language
```

The last question should get you the "none of the notes seem to mention that" response (or, if it makes it to the model at all through some keyword coincidence, a clear "the notes don't cover this" answer), since nothing in `sample_notes/` is about programming languages. If instead you get a confident, generic answer, that's worth debugging: check what `find_relevant_chunks` actually returned for that question, and whether the system prompt in `answer_question` is doing its job.

## Before you move to Week 6

Point `NOTES_DIR` at a real folder of your own short notes (or add a few more `.txt` files into `sample_notes/`) and try a few of your own questions. Notice what it gets right, and notice at least one question where the keyword-based retrieval clearly missed something a human would have found immediately, because the wording didn't match. That gap is exactly what this week's notes on embeddings described, and it's worth having actually seen it happen once before moving on.
