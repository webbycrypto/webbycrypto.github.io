# Debugging methodology

[← Back to Week 2: Foundations II and first project](../README.md)

## TL;DR

This page lays out the actual process for debugging systematically instead of guessing.

- Read a traceback from the bottom up. The error type and message come last, but the real mistake often lives further up the call chain, so trace upward to the last line that points into your own file.
- Before changing anything, write down one specific, testable hypothesis about the cause ("I think X is happening because of Y"), instead of changing code and rerunning to see what happens.
- Test that exact hypothesis directly, usually with a temporary print statement that shows you the real values at that point, or the smallest possible check.
- If a bug is hard to pin down inside your full app, reproduce it in the smallest separate piece of code that still shows the problem, away from everything else that isn't related.
- Once it's fixed, remove any temporary print statements and rerun everything, not just the part you changed, to confirm nothing else broke.

This is arguably the single most important note in the entire Foundations phase. The root README frames the whole program's target outcome as a "self-sufficient developer," and the Foundations checkpoint you'll self-assess against at the end of Week 3 is specifically about this skill: can you read an error message, form a hypothesis about the cause, and fix it, without being told the answer, on something you haven't seen before? Everything below is the actual process behind that.

## Reading a traceback properly (a deeper pass)

Week 1 introduced the basic shape of a traceback: read the last line first (the error type and message), then find the line number, then look at your code there. Now that your programs are getting more complex (multiple functions, calling into a framework like Flask), it's worth going one level deeper.

A traceback shows you the full chain of function calls that led to the error, ordered from the oldest call at the top to the most recent (where the error actually surfaced) at the bottom. When your own code calls a function that calls another function, and the deepest one fails, you'll see several "File ..., line ..., in ..." entries stacked up, each one a step deeper into the call chain.

The specific line and error message at the very bottom tell you exactly *where the error was detected* and *what kind of problem it is*. That is not always the same place as *where the actual mistake lives*. Sometimes the true mistake is several calls further up: a function passed the wrong value in, three calls before anything actually broke. This is why you scan the entries above the final error, looking specifically for the last entry that points into *your own file* (as opposed to Flask's internal code, or Python's own standard library), since that's usually the most useful place to start looking, even if the error technically "happened" one level deeper inside library code you didn't write and don't need to debug.

## Form a hypothesis before you touch anything

This is the single habit that separates efficient debugging from flailing. When you hit a bug, resist the urge to immediately start changing code and rerunning to see what happens. Instead, stop and write down (even just mentally, though actually typing it as a comment is better) one specific, falsifiable guess: "I think X is happening because of Y."

For example: "I think `get_note` is returning `None` because none of the notes in the list have an `id` that matches `note_id`, possibly because `note_id` is a string and the stored ids are integers." That's a specific, testable claim, not a vague feeling that something's wrong.

Why does this matter so much? Changing code randomly and rerunning to see if the symptom goes away can accidentally "fix" a bug's visible symptom while leaving its actual cause in place, or introduce a second bug that happens to mask the first one. Worse, if you make several changes at once without a specific hypothesis, and the symptom changes, you often can't tell *which* change actually mattered, so you haven't actually learned anything about the bug, and you might not be able to reproduce the fix reliably or explain it later. A specific hypothesis gives you something to actually check, and if you check it and you're wrong, you've still learned something real (you've ruled out an explanation), which narrows down where the actual problem is.

## Test your hypothesis with the smallest possible check

Once you have a specific hypothesis, the next move isn't to rewrite a bunch of code and hope. It's to check the *specific thing your hypothesis claims*, as directly as possible.

Continuing the example above: if you suspect `note_id` might be a string when the stored ids are integers, the direct check is to look at both values' actual types, right at the point where they're compared. This is where **print-statement debugging** comes in: temporarily insert a `print()` statement that shows you exactly what's happening at that point in the code, run the program, and look at the actual output.

```python
@app.route("/notes/<int:note_id>")
def get_note(note_id):
    print(f"Looking for note_id={note_id!r} (type: {type(note_id)})")
    for note in notes:
        print(f"Comparing to note['id']={note['id']!r} (type: {type(note['id'])})")
        if note["id"] == note_id:
            return jsonify(note)
    return jsonify({"error": f"No note with id {note_id}"}), 404
```

Run this, make the request that triggers the bug, and read the printed output. Either it confirms your hypothesis (you see the types genuinely don't match) or it disproves it (both are the same type after all, meaning your hypothesis was wrong and you need a new one, informed by what you just observed). Either outcome moves you forward. This is temporary, throwaway code: once you understand the bug and have fixed it, remove the print statements. They were a diagnostic tool, not part of the finished program.

This scales down to the smallest useful version of the problem, too. If a bug is buried inside a large function, don't try to debug the whole thing at once; add prints (or, later in your programming life, use a proper debugger) at each meaningful step to narrow down exactly which line first produces a wrong value, rather than staring at fifteen lines at once trying to spot the issue by inspection alone.

## Isolate the smallest reproducible case

If a bug is hard to pin down inside your full application, try to reproduce it in the smallest, simplest piece of code that still shows the problem, separate from all the surrounding complexity (the Flask routes, the file I/O, everything else that isn't actually related). If you suspect a comparison between two values is behaving unexpectedly, test just that comparison, on its own, with made-up values, outside the rest of your app. This removes everything that isn't relevant to the bug, so you're not fighting the framework and the bug at the same time.

## Putting the whole process together

1. Read the error message and traceback fully (bottom line first, then trace up to the last relevant entry in your own code).
2. Form a specific, falsifiable hypothesis about the cause. Say it out loud or write it down.
3. Test that specific hypothesis directly, usually with a targeted print statement or the smallest possible reproduction, not a broad set of speculative code changes.
4. Based on what you observe, either confirm the hypothesis and fix the actual cause, or revise your hypothesis with what you just learned, and repeat.
5. Once fixed, remove any temporary debugging prints, and re-run everything (not just the one broken part) to confirm the fix didn't break something else.

This week's debugging drill (`project/debugging_drill.py`) exists specifically to give you real practice at this exact loop, on bugs you don't yet know the cause of. Resist looking at `solutions/debugging_drill_explained.md` until you've actually gone through this process yourself; the value is in the process, not in knowing these four specific answers.

## What to watch for

- Changing code speculatively without a specific hypothesis, then losing track of which change actually mattered (or didn't).
- Reading only the final error message and giving up if it doesn't immediately make sense, instead of tracing upward through the call stack to find where in your own code the chain actually starts.
- Leaving debugging print statements in your finished code. They're a temporary tool; take them out once you understand and fix the bug.
- Trying to debug a large, complex piece of code all at once instead of isolating the smallest piece that reproduces the problem.
