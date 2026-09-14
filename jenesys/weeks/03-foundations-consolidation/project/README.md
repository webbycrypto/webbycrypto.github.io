# Week 3 project: a URL shortener

[← Back to Week 3: Foundations consolidation](../README.md)

## Goal

Build a small Flask service that shortens URLs: a person (or another program) submits a long URL, your service gives back a short code, and visiting that short code redirects to the original long URL.

## Constraints

Your service must:

- Accept a long URL and produce a short code for it, through some endpoint you design.
- Redirect a request for a valid short code to the original long URL, using a real HTTP redirect (see `notes/02-redirects-and-short-codes.md`), not just returning the URL as text for a human to copy.
- Persist the short-code-to-URL mappings to a file, so they survive a server restart, the same underlying idea as Week 2's notes API, just applied to different data.
- Handle a request for a short code that doesn't exist with a proper 404 and a clear JSON error message, not a crash.
- Provide at least one more endpoint beyond the two above. A reasonable option: listing every short link you've created so far, or looking up the original long URL for a given short code without triggering the redirect (useful for confirming what a code maps to). The choice is yours; pick something genuinely useful and be ready to explain why you picked it.

## What's deliberately left for you to decide

This project brief doesn't specify: the exact endpoint URLs and HTTP methods, the exact JSON shapes for requests and responses, how you generate a short code (random characters, an incrementing counter, something else), what happens if someone tries to shorten a URL that's already been shortened before (is that an error, or does it just return the existing short code, or does it create a new one anyway?), what counts as "a valid URL" worth accepting in the first place (do you check the format at all, or accept anything?), or whether your code stays in one file or gets split into more than one (see `notes/03-organizing-a-growing-file.md` for the actual signal to use, rather than defaulting to either choice out of habit).

None of these are things to ask about. They're things to decide, the same way Week 2's project asked you to decide small structural details on your own (like whether to write a shared `find_note`-style helper). Make a call for each one, and be able to say why you made it. If you're unsure, "what would a reasonable, predictable API do here" is a fine guide, and so is looking at what a real link shortener you've used seems to do.

## Suggested approach, not a required order

Unlike Week 2, this section is intentionally brief. A reasonable path: get one endpoint working end to end first (creation, returning a short code), confirm it with `curl` before building anything else, add persistence once creation works in memory, add the redirect endpoint, then add your error handling and your fourth endpoint. But if you'd rather design your data shape and all your routes on paper first and then build them together, that's a legitimate approach too. Week 2's project told you the order; this one trusts you to find a working order yourself.

## Stretch goal (optional)

If you finish with time to spare: add per-link click tracking. Every time a short code is successfully visited and redirected (not when it's created, and not when a request for a nonexistent code returns a 404), increment a counter stored alongside that link's mapping, and expose it through your "look up without redirecting" endpoint (or a new one) so the click count is visible. This touches your data shape directly (each link now needs to carry a count, not just a code and a URL) and your persistence (that count needs saving too, on every successful redirect, not just at creation time), which makes it a genuinely different kind of change than adding an unrelated new endpoint would be. Decide for yourself whether incrementing the count should happen before or after you've confirmed the code actually maps to something, and be able to explain why that order matters (or doesn't). See `solutions/link_shortener_with_clicks.py` for one way to build this, after attempting it yourself.

## When you're done

Compare against `solutions/link_shortener.py` only after your own version works, or after you've been stuck long enough that you've genuinely exhausted your own ideas and Week 2's notes. The solution is one reasonable design, not the design; if yours differs in its data shape or its short-code strategy but satisfies the constraints above, that's a completely legitimate outcome, not a wrong answer.

Then, if you haven't yet, build the second project, `second-project-config-store.md` in this same folder, a genuinely different small service using the same underlying skills. Only after both projects are done, move on to `../checkpoint.md` for the actual Foundations self-check.
