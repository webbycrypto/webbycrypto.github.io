# Guided walkthrough: build the citation-formatting logic, line by line

[← Back to Week 5 exercises](README.md)

`00-guided-build-retrieval.md` had you build the search half of retrieval (chunking, scoring, filtering) from scratch. This exercise has you build the OTHER small piece of `notes_assistant.py` that `answer_question` depends on, and that walkthrough only glanced at: turning a list of matched chunks into the labeled, source-tagged text that actually goes into the prompt Claude sees.

This is worth its own exercise, not a footnote on the last one, for a specific reason: it's the exact mechanism behind two promises this project makes and Week 8's "docs assistant" capstone will grade directly, that every answer says which source it came from, and that the model only ever sees text you actually retrieved, never the whole notes folder. Citation formatting is not decoration bolted onto a finished answer. It IS the thing that makes "which source did this come from" answerable at all, and it is small and self-contained enough to build and test in a few minutes, with no API key and no network call.

Type each step into a fresh file, `04_guided_build_citations.py`, and run it after every single one, the same discipline as the retrieval exercise.

## Step 1: format one chunk record into a labeled source block

```python
def format_source_block(record):
    return f'[Source: {record["filename"]}, section {record["position"]}]\n{record["text"]}'


example_record = {
    "filename": "wifi-setup.txt",
    "position": 1,
    "text": "If the internet drops, the fastest fix is usually to unplug the router, wait 10 seconds, and plug it back in.",
}

print(format_source_block(example_record))
```

Run it. You should see two lines: the bracketed source tag, then the chunk's actual text on the line below it. `record` here is the same three-key shape (`filename`, `position`, `text`) that `build_chunk_index` produces in `notes_assistant.py`; nothing about this function invents new data, it only rearranges data that retrieval already collected into a shape a human (and a model) can trace back to its origin.

## Step 2: join several labeled blocks into one context string

```python
def build_context_text(matches):
    blocks = [format_source_block(record) for record in matches]
    return "\n\n---\n\n".join(blocks)


matches = [
    {"filename": "wifi-setup.txt", "position": 1, "text": "If the internet drops, unplug the router for 10 seconds."},
    {"filename": "wifi-setup.txt", "position": 2, "text": "Blinking orange on the modem usually means an outage on the provider's side."},
]

print(build_context_text(matches))
```

Run it. You should see both labeled blocks, with a line containing `---` between them. That separator is doing real work, not just looking tidy: without something visually marking where one chunk ends and the next begins, a model reading two back-to-back excerpts with no boundary could misread where one source's claim stops and another's starts, especially if both chunks happen to be about a similar topic. A clear, consistent separator is a small, cheap way to keep that boundary honest.

## Step 3: build the full prompt text: excerpts, then the question

```python
def build_user_prompt(matches, question):
    context_text = build_context_text(matches)
    return f"Note excerpts:\n\n{context_text}\n\nQuestion: {question}"


print(build_user_prompt(matches, "why did my wifi drop"))
```

Run it. This is the exact string that becomes the `content` of the one user message `answer_question` sends to Claude, once you also picture the `system` prompt (from `notes/01-why-retrieval-matters.md` and the project walkthrough) telling Claude to answer ONLY from what's here. Notice this function does not call the model at all. Everything in it is string formatting. The only thing separating "a raw list of matched chunks" from "a prompt Claude can answer from, with sources it can point back to" is the plain Python you just wrote in Steps 1 through 3.

## Step 4: what happens with zero matches, and why the real code never lets that happen

```python
print(repr(build_context_text([])))
```

Run it. You should see `''`, an empty string. Sit with that for a second: if `main()` in `notes_assistant.py` called `answer_question` with an empty `matches` list anyway, the model would receive a prompt reading "Note excerpts:\n\n\n\nQuestion: ...", with nothing between "excerpts:" and the question, and a system prompt telling it to answer only from excerpts that were never actually provided. That's not a crash. It's worse: it's a prompt that LOOKS like it's offering grounded context while actually offering none, which is exactly the setup for a model to fall back on its training data and answer anyway, confidently, about notes it never saw. That's the real reason `main()` checks `if not matches: ... continue` and never calls `answer_question` at all when retrieval found nothing. The guard isn't defensive paranoia; it's preventing this exact function from being handed an empty result and asked to pretend otherwise.

## Compare, don't copy

Open `../project/notes_assistant.py` and find `answer_question`. You'll see the same three ideas you just built (label one chunk, join several with a separator, wrap the joined result into a full prompt with the question), but inlined directly inside the function instead of split into three named helpers the way you wrote them here. That's a real, deliberate style difference worth noticing, not a discrepancy to worry about: the real file's version builds `context_blocks` as a list comprehension, joins it into `context_text`, then builds `user_prompt` as an f-string, all in a handful of consecutive lines, because at that point in the file's life, three tiny one-line helper functions would have added more scrolling than they saved. Compare it against `notes/03-organizing-notes-assistant.md`'s one-sentence test if that tradeoff isn't obvious yet: "format citations for the prompt" is still one clear job, whether it's written as three functions or four lines in one.
