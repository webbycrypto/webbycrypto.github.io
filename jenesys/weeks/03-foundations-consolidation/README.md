# Week 3: Foundations consolidation

[← Back to Weeks](../README.md)

Full context: [root README, Week 3](../../README.md#week-3-foundations-consolidation).

## Goal

Prove the Foundations checkpoint against material you haven't already memorized, not just repeat Week 2. This week deliberately gives you less explicit instruction than Week 2 did. That's not an oversight, it's the point: Week 2 taught you the pieces (routes, persistence, error handling, debugging) with heavy guidance. This week checks whether those pieces actually transferred to something new, with the guidance mostly removed, which is a much closer test of what Week 4 onward will actually feel like.

## Days

- Days 1-4: before either project, work through the one guided walkthrough this week (`exercises/01_guided_redirect_mini_app.md`), a line-by-line rep of the one genuinely new idea this week introduces (`redirect()`), in the smallest possible app. Then build a URL shortener (a link shortener), a different kind of small service than Week 2's notes API, using the same underlying skills: Flask routes, file-based JSON persistence, and deliberate error handling. Once that's working, build a second, different low-scaffolding service this same week, a key-value config store (`project/second-project-config-store.md`), the same way, with its own decisions to make. Two different services, built the same low-scaffolding way, is a real second rep of the actual thing Week 3 is testing, not repetition of the first one. Each project has its own optional stretch goal for anyone who finishes early.
- Day 5: retrospective and the real self-check against the Foundations checkpoint (see `checkpoint.md` in this folder), now with two projects' worth of evidence instead of one.

## Do this in order

Everything below is required, in the order shown, except the two lines marked optional.

1. [ ] `notes/01-what-carries-over.md`, mostly pointers back to Week 2, plus `notes/02-redirects-and-short-codes.md`, this week's one domain-specific new concept.
2. [ ] `exercises/01_guided_redirect_mini_app.md`, a guided, line-by-line rep of `redirect()` in the smallest possible app, before you need it for real.
3. [ ] `project/README.md`, the URL shortener brief: a goal and constraints, no starter skeleton, no walkthrough. Decide the implementation yourself.
4. Optional, if you finish step 3 with time to spare: its stretch goal (click tracking).
5. [ ] `notes/03-organizing-a-growing-file.md`, before the second project, since it's the note that project's own brief points back to.
6. [ ] `project/second-project-config-store.md`, a second, genuinely different low-scaffolding project (a settings store, not a list of links), built the same way as step 3.
7. Optional, if you finish step 6 with time to spare: its stretch goal (a full value-history endpoint).
8. [ ] `checkpoint.md` (Day 5): the real Foundations self-check, with two projects' worth of evidence to draw on.

After a real attempt at either project, compare against `solutions/`, which has both projects and both stretch goals.

## Deliverable

A working link shortener AND a working config store, each of which you can explain endpoint by endpoint, both built with noticeably less hand-holding than Week 2's notes API, and your honest answers to `checkpoint.md`.

## Status

Notes, project brief, solutions, and the checkpoint are written for this week.
