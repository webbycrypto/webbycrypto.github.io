# Exercise: retry automatically when rate limited

[← Back to Week 4: Track exposure](../../README.md)

Another optional tweak on `../project/chatbot.py`. Right now, when `groq.RateLimitError` fires, the bot just prints a message and moves on, leaving it entirely up to the human to notice and try again later. This exercise replaces that with something more like what real production code actually does: retry automatically a few times, waiting a little longer between each attempt, before finally giving up and telling the human.

This is a genuinely different kind of change from the other exercises in this folder, because it's not adding a new command; it's restructuring the shape of the existing API call itself, wrapping it in a small loop instead of calling it once per turn.

## Prove the mechanism first, completely separately from the real API

Before touching `chatbot.py` at all, do this in a throwaway scratch file, the same isolate-then-combine approach `00-guided-build-the-chatbot.md` used back in its Step 2. Groq's free tier doesn't make it easy to deliberately trigger a real rate limit on demand, so testing this mechanism against a fake, guaranteed failure first is both easier and a better way to actually see it work.

Write a small function that fails the first two times it's called and only succeeds on the third:

```python
attempt_count = 0

def flaky():
    global attempt_count
    attempt_count += 1
    if attempt_count < 3:
        raise ValueError("simulated failure")
    return "success"
```

`global attempt_count` matters here: without it, the line `attempt_count += 1` inside the function would create a brand-new local variable instead of modifying the one defined outside it, and Python would actually raise an error the moment it tried to increment a local variable that was never given a starting value inside the function. This is a real, common beginner trip-up worth hitting once on purpose, in a five-line throwaway function, rather than for the first time somewhere bigger.

Now write a retry loop around calling `flaky()`, catching `ValueError` (standing in for `groq.RateLimitError` for now), that tries up to 3 times, printing how long it's waiting and which attempt it's on, sleeping between tries using `time.sleep()` (`import time` at the top), and doubling the wait each time (1 second, then 2, then 4, a common backoff pattern, so a genuinely overloaded server gets progressively more breathing room instead of getting hit again immediately). Run it and confirm you see two "waiting" messages followed by `"success"`, in that order, not immediately, since the sleeps are real.

## Wire the same shape into chatbot.py

Once you've watched that mechanism actually work on fake, guaranteed failures, apply the same loop shape for real, inside the main loop's existing `try`/`except` block, replacing the single API call with a small `for attempt in range(1, 4):` loop around it. Inside that loop:

- On success, keep the response and `break` out of the loop immediately.
- On `groq.RateLimitError`, if this wasn't the last allowed attempt, print the same kind of waiting message as your scratch version and sleep before the loop continues to the next attempt; if it *was* the last attempt, print a final "still rate limited" message and treat this turn as failed (no response to print or add to history).
- Leave `groq.AuthenticationError` and `groq.APIStatusError` handled exactly as they already are, outside this new retry behavior entirely; retrying doesn't make sense for a rejected key or a genuine API error, only for "the server is asking you to slow down and try again."

Have the loop's *result* (a real response, or nothing) decide what happens next: if nothing came back after all attempts, skip straight to waiting for the next line of input instead of trying to read `response.choices[0].message.content` on something that was never actually set.

## Try it

Testing this against the real API after wiring it in is optional, and depends on your luck hitting an actual rate limit, which the free tier doesn't make easy to trigger on purpose. That's fine; trust the version you already proved works in isolation above. What you should do regardless is have a completely normal conversation afterward and confirm nothing about ordinary, successful turns changed at all: the retry loop should be invisible when nothing's actually going wrong, breaking out on the very first attempt every time, exactly as before this exercise.
