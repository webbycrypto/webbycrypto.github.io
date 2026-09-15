# Redirects and short codes

[← Back to Week 3: Foundations consolidation](../README.md)

## TL;DR

This page covers what a link shortener does and the two new mechanics it needs: HTTP redirects and generating short codes.

- A link shortener just stores a mapping: a short code like `ab12` points to one long URL.
- You generate the short code yourself, commonly with random letters and digits, and check whether that code is already taken before accepting it, since two different long URLs should never share a code.
- The mapping itself is just data, so you persist it to a JSON file the exact same way you persisted notes in Week 2.
- Visiting the short link doesn't show the destination page directly. The server sends back a redirect response (a status code plus a `Location` header), and the browser follows it automatically. If the code isn't in your mapping, that's an expected failure, not a bug, so return a proper 404 instead of crashing.

```python
import random
import string

links = load_links()   # short_code -> long_url, same JSON pattern as Week 2

def make_short_code():
    code = "".join(random.choices(string.ascii_lowercase + string.digits, k=6))
    while code in links:           # don't reuse a code that's already taken
        code = "".join(random.choices(string.ascii_lowercase + string.digits, k=6))
    return code

@app.route("/shorten", methods=["POST"])
def shorten():
    long_url = request.get_json()["url"]
    code = make_short_code()
    links[code] = long_url
    save_links(links)              # persisted to JSON, just like notes were
    return jsonify({"short_code": code}), 201

@app.route("/<code>")
def visit_short_link(code):
    long_url = links.get(code)
    if long_url is None:
        return jsonify({"error": f"No link with code {code}"}), 404
    return redirect(long_url)      # browser follows this automatically
```

This is the one genuinely new idea this week's project needs. Everything else is Week 2's material, reapplied (see `01-what-carries-over.md`).

## What a link shortener actually does

You've almost certainly used one of these before, even without thinking about it: a service takes a long, unwieldy URL and gives you back a short one, like `short.example/ab12`. Later, anyone who visits that short link ends up at the original, long URL, as if they'd typed it themselves. The service is just holding onto a mapping: "the short code `ab12` corresponds to this specific long URL," and looking that mapping up every time someone visits the short link.

## What an HTTP redirect actually is

Recall from Week 1's notes that every HTTP response carries a status code. A **redirect** is a response that doesn't contain the content you asked for at all; instead, it contains a status code in the 300s (`302 Found` is the common one for this kind of temporary redirect) and a special response header called `Location`, which tells the client "the thing you actually want is over here instead." A browser receiving a redirect response automatically follows it: it immediately makes a new request to the URL in that `Location` header, without the person needing to click anything again. From the person's point of view, they clicked a short link and simply ended up at the real destination; the redirect step happened invisibly in between.

Flask has a built-in helper for exactly this, so you don't need to construct the status code and header by hand:

```python
from flask import redirect

@app.route("/<short_code>")
def go_to_long_url(short_code):
    long_url = look_up_long_url(short_code)   # your own lookup logic
    if long_url is None:
        return jsonify({"error": f"No link with code {short_code}"}), 404
    return redirect(long_url)
```

`redirect(long_url)` builds a response with the right status code and `Location` header pointing at `long_url`, automatically. Notice the same error-handling shape from Week 2 is still exactly the right move here: if the short code doesn't map to anything, that's an expected failure case (someone visited a link that doesn't exist, or mistyped one), not a bug, so it gets a deliberate, honest 404, the same way a missing note id did last week.

## Generating a short code

You need some way to produce the short, distinctive-looking code itself (the `ab12` part) when a new long URL is submitted. There's no single correct way to do this, and deciding on your own approach (and being able to explain why) is genuinely part of this week's exercise in judgment, not something to look up a definitive answer for. A few reasonable approaches, roughly in order of how much they ask of you:

- **Random characters:** pick a handful of characters at random from letters and digits (Python's built-in `random` module, specifically `random.choices(...)`, can do this) to build a code of some fixed length, say 6 characters. Simple, and collisions (accidentally generating a code you've already used for a different URL) are rare at small scale, but not impossible, so a thorough version checks whether a freshly generated code is already taken before accepting it, and tries again if so.
- **An incrementing counter:** keep a running count of how many links you've ever shortened, and use that number (perhaps converted into a shorter form) as the code. Guarantees no collisions, but makes codes predictable and sequential, which may or may not matter for what you're building.

Whichever you choose, the mapping itself (short code to long URL) is just data, and you already know how to persist data to a JSON file from Week 2. Nothing about persisting a link mapping is different in kind from persisting a note; only the shape of what's stored changes (`{"short_code": "ab12", "long_url": "https://example.com/very/long/path"}` instead of `{"id": 1, "text": "Buy milk"}`).

## What to watch for

- Forgetting that a redirect is a response *about* where to go, not the actual destination content itself. If you're debugging and a request to a short link seems to "not do anything" in a raw HTTP client, check whether you're actually following the redirect (browsers do this automatically; some command-line tools like `curl` need an extra flag, `-L`, to follow redirects rather than just showing you the redirect response itself).
- Not deciding, on purpose, what happens if two different long URLs happen to generate the same short code (a collision), especially if you're generating codes randomly rather than sequentially.
- Treating "this short code doesn't exist" as anything other than the same kind of expected, plan-for-it-on-purpose failure case as Week 2's missing note id.
