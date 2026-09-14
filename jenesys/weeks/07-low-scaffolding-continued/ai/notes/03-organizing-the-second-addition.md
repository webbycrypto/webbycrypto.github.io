# Organizing Notes Assistant, with a second new concern on top

[← Back to Week 7 (AI track): Low-scaffolding build, continued](../README.md)

By this week, `notes_assistant.py` has grown across three straight weeks: retrieval, talking to Claude, tool-calling (Week 6), and now persistence, plus a second, different chained-tool scenario. That's a lot of concerns to keep asking the one-sentence organization question about one at a time, so this week, ask it once, about the whole file as it now stands, rather than concern by concern.

## Persistence is genuinely its own thing, again

Saving and loading conversation history (including tool-use and tool-result blocks, not just plain text, which is the specific wrinkle `notes/01-persistence.md` walks through) is not "talking to Claude" and it's not "retrieval." It's file I/O with its own failure modes (what if the save file is corrupted, or from an older version of this format). If you kept tool-calling logic in its own file back in Week 6, persistence is a reasonable second candidate for the same treatment; if you didn't split anything yet, this is the point where it's worth seriously asking again, not assuming last week's answer still holds.

## The judgment call to actually make this week

Don't treat "how many files should this be" as a question with one right answer that gets more correct the more you split things up. A `notes_assistant.py` that imports from `retrieval.py`, `tools.py`, and `storage.py` isn't automatically better organized than one well-structured single file; it's only better if each of those genuinely is its own coherent concern that changes for its own reasons, the same test from Week 3. Over-splitting has a real cost too: four small files you have to jump between to trace one code path is its own kind of hard to follow, not an improvement over one long file just because each individual piece is shorter.

Whatever you decide, be ready to explain it the way `project/README.md` already expects for this week's other decisions: not "I split it because that's what you're supposed to do," but a specific reason tied to what your file actually looks like.

## Why this is worth taking seriously, right now

This is the last week before Week 8's capstone, where nobody is checking your organization decisions for you and the rubric's "code comprehension" category asks whether you can explain any line of your own code, cold, without rereading it first. That's a much easier bar to clear in code you organized on purpose than in code that grew by accretion over three weeks without anyone, including you, stepping back to look at the whole shape of it.
