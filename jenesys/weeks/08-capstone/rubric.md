# Self-sufficiency rubric (Week 8 gate)

[← Back to Week 8: Capstone, no safety net](README.md)

Full context: [root README, rubric section](../../README.md#self-sufficiency-rubric-week-8-gate).

Written for a solo learner with no mentor to score them. Each category has self-assessment questions to answer honestly about the actual week just finished, plus a scoring guide to turn those answers into a 1-4. A pass requires at least a 3 in every category. If every answer rounds up to a 4 without hesitation, treat that with suspicion; write down the actual evidence (the bug, the line, the decision) for each score, not just the number.

## Independent problem solving

- When you got stuck, was your first move to search docs/error messages, or to ask someone or give up?
- Count roughly how many times this week you resolved something using only documentation or experimentation, versus needing an outside answer.

Score: 4, every stuck point resolved independently. 3, mostly independent, at most one outside nudge that wasn't a handed answer. 2, needed a direct outside answer more than once. 1, regularly stuck for hours with no path forward without one.

## Debugging

- Pick your worst bug this week. Did you form a specific guess about the cause before changing anything, or did you just start changing things and see what happened?
- Right now, can you explain exactly why that bug happened and why your fix addressed the real cause, not just the symptom?

Score: 4, can explain root cause and fix for every real bug hit. 3, true for most, one or two fixes were "and then it worked" without full understanding. 2, several fixes were trial-and-error without understanding why they worked. 1, bugs got fixed by random changes, root causes mostly unknown.

## Code comprehension

- Open the capstone code now. Pick 5 random lines. Can you say what each one does and why it's there, without re-reading the surrounding code first?
- Is there any block you wrote by copying a docs example that you never fully worked through afterward?

Score: 4, any line, cold, explainable. 3, nearly all of it, except one narrow piece copied from docs and not fully unpacked. 2, multiple sections need re-reading before you can explain them. 1, large parts are "it works, I don't know why."

## Building from a spec

- Before writing code, did you plan or sketch what you were building, or start typing and figure out structure as you went with no plan at all?
- Did you finish the spec's actual core goal without looking for a tutorial or a full solution to copy from, even if you used docs for specific pieces along the way?

Score: 4, planned, then built the full core goal with no full-solution lookup. 3, built the core goal, leaned on a tutorial for one sub-piece only. 2, needed a tutorial or template for most of the structure. 1, couldn't start without finding something close to a full solution to copy.

## Judgment under ambiguity

- The spec left something undefined (a data format, an API shape, an edge case). Name one thing you decided on your own, and state why you chose it.
- When you hit an undefined edge case, did you make a call and move forward, or avoid/skip it?

Score: 4, made and can justify multiple independent calls on undefined parts of the spec. 3, made calls but second-guessed and revisited them more than needed. 2, avoided or skipped ambiguous parts rather than deciding. 1, got stuck specifically because the spec didn't spell out every detail.

## If a category scores below 3

Repeat the relevant part of Weeks 5-8 rather than moving on. There is no time pressure to pass on the first attempt.
