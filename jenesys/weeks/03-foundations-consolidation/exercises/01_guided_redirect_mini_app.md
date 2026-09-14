# Guided walkthrough: a tiny redirect-only app, line by line

[← Back to Week 3 exercises](README.md)

Everything else this week carries over directly from Week 2 (see `../notes/01-what-carries-over.md`): routes, persistence, error handling, all already-practiced skills. The one genuinely new piece is the redirect itself, covered conceptually in `../notes/02-redirects-and-short-codes.md`. Before you build the full URL shortener with all its own decisions to make (how to generate a code, whether to check for collisions, what your data shape looks like), this walkthrough isolates just the new part, `redirect()`, in the smallest possible app, and tells you exactly what to type, the same close, line-by-line treatment Week 1 and Week 2 gave their own genuinely new mechanics.

This is the only guided walkthrough this week, and the only thing in `exercises/` at all; everything else about "how much guidance you get" this week is intentionally light, per this folder's own design (see `README.md` in this same folder). A single genuinely new idea still gets a real rep before you're asked to build with it under low scaffolding, which is exactly what Week 1's and Week 2's own guided walkthroughs did for their own new mechanics.

Open `01_guided_redirect_mini_app.py` (it starts nearly empty) and type each step below into it, in order, restarting the server (`python 01_guided_redirect_mini_app.py`) after every step to test it.

## Step 1: the app and a hardcoded mapping

```python
from flask import Flask, jsonify, redirect

app = Flask(__name__)

links = {
    "gh": "https://github.com",
    "py": "https://python.org",
}
```

No persistence and no POST endpoint for creating new links in this walkthrough; that's deliberate, since persistence and routes are both things you've already built twice over (Week 2's notes API, and exercises 5-6 from that same week). `links` here is a plain dict, not a list of dicts like the notes API used: a straightforward direct mapping from a short code to a URL, which is a completely reasonable shape for this specific job, since you always look one up by its exact code, never by scanning. Run the file now; nothing happens yet.

## Step 2: the route, reading the path parameter

```python
@app.route("/<code>")
def go_to_url(code):
    long_url = links.get(code)
```

`<code>` (no type converter, unlike `<int:note_id>` from Week 2) captures whatever text is in that part of the URL as a plain string; a short code like "gh" is text, not a number, so there's nothing to convert here. `links.get(code)` looks it up, returning `None` if `code` isn't a key in the dict, the same `.get(...)` behavior you've used on request bodies since Week 2, just applied to a plain dict you defined yourself this time.

## Step 3: the not-found case

```python
    if long_url is None:
        return jsonify({"error": f"No link with code {code}"}), 404
```

The exact same "expected failure case, not a bug" shape from `../02-foundations-ii/notes/04-error-handling.md`: someone visiting a code that was never set up isn't a mistake in your code, it's normal, foreseeable behavior, so it gets a deliberate 404 with a clear message. Restart the server and test this specific case:

```
curl http://127.0.0.1:5000/nonexistent
```

You should get a 404 with a clear error message.

## Step 4: the actual redirect

```python
    return redirect(long_url)
```

This is the one genuinely new line in this whole file. `redirect(long_url)` builds an HTTP response with a 300-series status code and a `Location` header pointing at `long_url`, exactly as `../notes/02-redirects-and-short-codes.md` described. Restart the server and test:

```
curl -L http://127.0.0.1:5000/gh
```

The `-L` flag tells `curl` to actually follow the redirect, the same thing a browser does automatically; without it, `curl` would just show you the raw redirect response (the status code and the `Location` header) instead of following it to GitHub's actual homepage content. Try it once without `-L` too, specifically to see the difference: you'll see a 302 status and a `Location` header naming the real URL, but none of GitHub's actual page content, since `curl` stopped at the redirect itself instead of following it.

## Step 5: the entry point

```python
if __name__ == "__main__":
    app.run(debug=True)
```

Add this if you haven't already while testing the earlier steps. Run through both a working code (`gh` or `py`) and a nonexistent one, back to back, and confirm each behaves the way its specific case should.

## What you just did

One new function, `redirect()`, in the smallest possible context: a hardcoded dict, one route, one lookup, one branch. Everything else in this file was already familiar. That's on purpose: the goal was isolating the one new idea cleanly, the same reason Week 1's guided walkthrough kept its combined program small even though it used four concepts you already knew individually. Compare against `solutions/01_guided_redirect_mini_app.py`, then move on to `project/README.md` (the URL shortener) or `project/second-project-config-store.md`, where you'll make every other decision (data shape, persistence, code generation, what else to build) yourself.
