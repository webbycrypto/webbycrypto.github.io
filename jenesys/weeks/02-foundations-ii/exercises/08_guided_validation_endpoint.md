# Guided walkthrough: a validated endpoint, line by line

[← Back to Week 2 exercises](README.md)

`project/guided-first-endpoint.md` was your first fully-guided rep inside Flask: persistence plus one GET route, typed one line at a time. This is a second one, for a different mechanic this week's notes cover: validating a request body and returning the right error status for the right reason, the actual subject of `notes/04-error-handling.md`. Exercises 1-4 and 7 already had you write validation and error cases with hints and a task description; this walkthrough instead tells you exactly what to type, the same close, line-by-line treatment the first guided walkthrough gave persistence.

Open `08_guided_validation_endpoint.py` (it starts nearly empty) and type each step below into it, in order, restarting the server (`python 08_guided_validation_endpoint.py`) after every step to test it. Don't paste; typing it is part of the point, the same as every other guided exercise in this program.

The tiny service you're building: a feedback collector. A client sends a star rating (1 to 5) and a comment; your job is rejecting anything that doesn't look like a valid rating or a real comment, with a clear, specific 400 error for each distinct way a request can be invalid, before ever accepting it.

## Step 1: the app and the (empty, in-memory) data

```python
from flask import Flask, jsonify, request

app = Flask(__name__)

feedback_entries = []
```

No persistence this time; that's deliberately not the point of this walkthrough (you already have two separate reps of persistence, from `project/guided-first-endpoint.md` and exercise 6). `feedback_entries` just lives in memory while the server runs. Run the file now (it won't do much yet, but confirm it starts without error).

## Step 2: the route, and reading the body

```python
@app.route("/feedback", methods=["POST"])
def create_feedback():
    body = request.get_json()
```

Same shape as every POST route you've written this week: a route decorator specifying the method, and `request.get_json()` to read whatever JSON the client sent. Nothing to test yet; this function doesn't return anything, so Flask itself will complain if you actually send it a request right now. That's expected at this exact step; keep going.

## Step 3: validating the rating's type

```python
    rating = body.get("rating")
    if type(rating) is not int:
        return jsonify({"error": "rating must be a whole number"}), 400
```

`body.get("rating")` reads whatever the client sent under the key "rating", however unreasonable (a string, a list, nothing at all if the key's missing, which makes `.get(...)` return `None`). `type(rating) is not int` catches all of those at once: only an actual whole number passes. Restart the server and test this specific case:

```
curl -X POST http://127.0.0.1:5000/feedback -H "Content-Type: application/json" -d "{\"rating\": \"five\", \"comment\": \"Great!\"}"
```

You should get a 400 with the "must be a whole number" message, since `"five"` is a string, not an int.

## Step 4: validating the rating's range

```python
    if rating < 1 or rating > 5:
        return jsonify({"error": "rating must be between 1 and 5"}), 400
```

This runs only if Step 3's check already passed, meaning `rating` is definitely a real int by this point; now check that it's actually a valid star rating, not, say, `0` or `47`. Test:

```
curl -X POST http://127.0.0.1:5000/feedback -H "Content-Type: application/json" -d "{\"rating\": 9, \"comment\": \"Great!\"}"
```

You should get a 400 with the "must be between 1 and 5" message, a different, more specific error than Step 3's, even though both are technically "something's wrong with rating."

## Step 5: validating the comment

```python
    comment = body.get("comment", "").strip()
    if not comment:
        return jsonify({"error": "comment is required"}), 400
```

The same pattern exercise 7's solution used: default to an empty string if "comment" is missing entirely, strip whitespace, then check for emptiness, which catches a missing comment and a comment that's just spaces in one check. Test:

```
curl -X POST http://127.0.0.1:5000/feedback -H "Content-Type: application/json" -d "{\"rating\": 5, \"comment\": \"   \"}"
```

You should get a 400 with the "comment is required" message, even though a "comment" key was technically present in the request.

## Step 6: the success path

```python
    entry = {"rating": rating, "comment": comment}
    feedback_entries.append(entry)
    return jsonify(entry), 201
```

Only reachable once all three checks above have passed without returning early. Test a genuinely valid request:

```
curl -X POST http://127.0.0.1:5000/feedback -H "Content-Type: application/json" -d "{\"rating\": 5, \"comment\": \"Great!\"}"
```

You should get a 201 back with the entry you just sent.

## Step 7: a GET route, so you can actually see what's stored

```python
@app.route("/feedback", methods=["GET"])
def list_feedback():
    return jsonify(feedback_entries)
```

Nothing new here; it's the same list-everything pattern from every GET route you've written this week. It exists purely so you have a way to confirm entries are actually accumulating, since there's no persistence to inspect by opening a file this time.

## Step 8: the entry point

```python
if __name__ == "__main__":
    app.run(debug=True)
```

If you haven't already added this while testing the earlier steps, add it now. Run through all three invalid requests from Steps 3-5 again, back to back, followed by a valid one and a `GET /feedback`, and confirm each one gets exactly the response its specific problem deserves.

## What you just did

Three separate validation checks, each catching a genuinely different way a request can be wrong (wrong type, out-of-range value, missing text), each returning its own specific message rather than one generic "bad request" for all three. That specificity is the actual skill here: a client (or a person debugging your API) can tell exactly what was wrong from the message alone, without guessing. Compare this to `solutions/08_guided_validation_endpoint.py` once you're done, then carry the same instinct (validate each distinct thing that can go wrong, separately, with its own message) into your own notes API in `project/`.
