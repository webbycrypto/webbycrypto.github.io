# Foundations checkpoint: self-check

[← Back to Week 3: Foundations consolidation](README.md)

Full context: [root README, Foundations checkpoint](../../README.md#week-3-foundations-consolidation), and the rubric style this follows is closer to [`../08-capstone/rubric.md`](../08-capstone/rubric.md), which you're not expected to read yet, just know it's the same spirit of honest self-scoring, applied much earlier and much smaller here.

This is the real check for the question the whole Foundations phase (Weeks 1 through 3) was building toward: **can you read an error message, form a hypothesis about the cause, and fix it, without being told the answer, on a project you haven't seen before?** Answer honestly, based on what actually happened this week while building the link shortener and the config store, not on how the week was supposed to go. There's no score to report anywhere, and no one grading this. The only cost of an inflated self-assessment is that you carry an unsolid foundation into Week 4, where everything assumes this is already working.

## 1. The error message

Think of a specific moment this week when your code raised an error (not a bug you just spotted by reading, an actual error Python or Flask threw at you). What did the error message and traceback actually say? Could you point to the exact line it was about, and explain in your own words what that error type means, without looking it up again right now?

If you can't remember hitting a single real error this week, that's worth being honest about too. It might mean the project went unusually smoothly, or it might mean you were copying patterns from Week 2 closely enough that you never really tested your own understanding against something going wrong. Which do you think it was?

## 2. The hypothesis

Pick the trickiest problem you ran into this week, error or not (maybe a redirect that wasn't redirecting, or a short code that wasn't matching). Before you changed any code to fix it, did you form a specific, sayable guess about the cause first ("I think X is happening because of Y"), the way `notes/05-debugging-methodology.md` from Week 2 described? Or did you start changing things and see what happened?

If you didn't form a hypothesis first this time, try to reconstruct what a good one would have been, now that you know the actual cause. Would stating it up front have gotten you to the fix faster?

## 3. Explaining it cold

Open your finished `link_shortener.py` (or whatever you named it) right now, without rereading it first. Pick any function in it at random. Can you explain, out loud or in writing, exactly what it does and why it's written that way, on the spot? Is there any part of it you wrote by adapting Week 2's code, or by copying a piece of `notes/02-redirects-and-short-codes.md`, that you never actually worked through afterward, and that you'd struggle to explain right now?

## 4. Organization, without being told to

Week 2 explicitly told you to go back and run an organization pass before calling that project done. This week didn't remind you. Did you still do one, on your own, before comparing against the solution, or only when this checkpoint just brought it up? Point to one real place in your own code where you either extracted a repeated pattern into a function, renamed something so it wouldn't need re-reading, or deliberately decided your file didn't need splitting yet. If you can't point to a specific example, that's the honest answer, and it means the organization habit from Week 2 hasn't actually transferred yet, only the memory that it was mentioned once.

## 5. Two projects, not one

This week now asks you to build two different low-scaffolding services, the URL shortener and the config store, not just one. Compare your own experience across them honestly. Did the second one (whichever order you built them in) go noticeably faster, or feel noticeably more confident, than the first, specifically on the parts that were supposed to have already transferred from Week 2 (routes, persistence, error handling)? Or did you find yourself relearning, or re-looking-up, something on the second project that you'd have said you already knew after finishing the first one?

Neither answer is a failure by itself. Real transfer usually shows up as genuinely faster, more confident work the second time, not zero friction; some re-checking of a detail you were fuzzy on is normal. But if the second project felt just as effortful as the first, start to finish, with no sense of "I've made this exact kind of decision before," that's worth taking seriously rather than assuming it'll resolve itself once Week 4 starts. Name one specific thing (a pattern, a decision, a piece of Flask syntax) that felt genuinely easier the second time, and one thing, if any, that didn't.

## If any of this gave you pause

That's genuinely useful information, not a failure. The honest answer to "was this solid" is more valuable here than a comfortable one, since Week 4 onward assumes Foundations is done. If something above felt shaky, the right move is to go back and spend real time on the specific shaky part (rereading the relevant Week 1 or Week 2 note, then rebuilding the specific piece of this week's project that gave you trouble) before treating Week 3 as finished. There's no deadline attached to this; repeating part of Weeks 1 through 3 now is exactly what the checkpoint is there to catch, and it's far cheaper than discovering the gap in Week 6.
