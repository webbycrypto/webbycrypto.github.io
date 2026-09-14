# Week 1 project: call a public API

[← Back to Week 1: Foundations I](../README.md)

## What you're building

A small Python script that sends a request to a real, live server on the internet, gets back a response, and prints something derived from it. This is the deliverable for Week 1, Days 4-5, and it's the first time in this program your code talks to something outside your own computer.

You'll use the **Cat Facts API** (`https://catfact.ninja/fact`), a free, public API that needs no account, no API key, and no signup. Send it a request, and it hands back a random fact about cats as JSON. It's deliberately simple: one small piece of data, no authentication to fumble with, so the entire exercise can stay focused on the request/response/JSON pattern itself, not on account setup.

## Before you start: install `requests`

Python doesn't come with the ability to make web requests built into the language itself; that capability lives in a library (a package of pre-written code) called `requests`, which you install separately. In your terminal:

```
pip install requests
```

`pip` is Python's package installer; this command downloads `requests` and makes it available to `import` in your scripts, the same way you might `import` anything else.

## Step 1: make the request

```python
import requests

response = requests.get("https://catfact.ninja/fact")
```

`requests.get(url)` sends an HTTP GET request to that URL (recall from `notes/07`: GET means "give me this thing," no changes made) and waits for the server to respond. Whatever comes back is stored in `response`, an object that holds everything about the server's reply: the status code, the actual content, and more.

## Step 2: check that it actually worked

Recall the status codes from the notes: `200` means everything went fine. Real code should check this before assuming the response contains what you expect, because networks and servers can fail in ways that have nothing to do with your code being wrong.

```python
if response.status_code == 200:
    print("Request succeeded.")
else:
    print(f"Something went wrong. Status code: {response.status_code}")
```

## Step 3: parse the JSON

The `response` object has a `.json()` method that takes the raw text the server sent back and converts it into a regular Python dictionary (and lists, if the JSON contains any), exactly the JSON-to-Python mapping described in `notes/07`.

```python
data = response.json()
print(data)
```

If you run just this much and print `data`, you'll see something like:

```python
{'fact': 'A cat has 32 muscles in each ear.', 'length': 34}
```

That's a Python dictionary with two keys: `'fact'` and `'length'`. You can pull out just the fact text the same way you'd look up any dictionary value, by key:

```python
fact_text = data["fact"]
print(f"Cat fact: {fact_text}")
```

## Step 4: handle the request failing

So far, this assumes the request works. In the real world, requests fail: your internet connection drops, the server is temporarily down, or the address is wrong. If any of that happens, `requests.get()` can raise an exception instead of calmly returning a normal response. Rather than letting your whole script crash with an unhandled error, wrap the request in a `try`/`except` (you'll cover error handling properly in Week 2; this is a small, early preview):

```python
import requests

try:
    response = requests.get("https://catfact.ninja/fact", timeout=5)
    response.raise_for_status()   # raises an exception if status code signals an error
    data = response.json()
    print(f"Cat fact: {data['fact']}")
except requests.exceptions.RequestException as error:
    print(f"Couldn't fetch a cat fact right now: {error}")
```

`timeout=5` tells `requests` to give up and raise an exception if the server hasn't responded within 5 seconds, rather than waiting forever. `raise_for_status()` is a shortcut that raises an exception automatically if the status code indicates a failure (like a 404 or 500), so you don't have to manually check `response.status_code` yourself. The `except` block catches any request-related failure and prints something reasonable instead of crashing with a wall of traceback text.

## A small idiom you'll see in the starter file: `if __name__ == "__main__":`

Open `starter.py` and you'll notice the actual work happens inside a function called `main()`, and at the very bottom of the file there's this:

```python
if __name__ == "__main__":
    main()
```

Here's what that's doing. Every Python file has a built-in variable called `__name__`. When you run a file directly (`python starter.py`), Python sets `__name__` to `"__main__"` for that file. But if this file were instead *imported* into another file (something you'll do more of once your projects have multiple files), `__name__` would be set to the file's actual name instead, not `"__main__"`.

This check, then, means: "only run `main()` if this file was run directly, not if it was imported elsewhere." Right now, with a single small script, this distinction barely matters. It starts to matter once your projects grow past one file, because it lets other files import useful functions from this one without accidentally triggering this file's own script logic just from the act of importing it. You'll see this same pattern again in Week 2's Flask apps. For now, just know it means "this is the entry point when the file is run directly," and follow the pattern rather than worrying about it further.

## Putting it together

Your finished script should: send a GET request to the cat facts API, handle the case where that request fails, parse the JSON response, and print the fact text in a readable sentence. `starter.py` in this folder has the skeleton with `# your code here` markers; `solutions/project.py` has a complete, commented reference version once you've given it a real attempt.

## Stretch goals (optional)

These are goals with constraints, not new starter files. If you finish the main script quickly, pick one (or more) and build it directly on top of your own working `starter.py`, deciding the implementation details yourself the way the constraints describe. Reference solutions exist for these (see below) so you can check your approach once you've built your own version, but there's no skeleton to fill in; that's deliberate.

**1. Fetch until you have 5 unique facts.** A single call to `requests.get()` on this API returns one random fact, and nothing stops it from returning the exact same fact twice in a row. Write a version of your script that keeps fetching facts in a loop until it's collected 5 *different* ones (checking each new fact against the ones you've already kept, the same "have I seen this before" check you'd use anywhere), while protecting against an unlikely-but-possible run of repeated duplicates by giving up after some fixed maximum number of attempts (say, 15) rather than looping forever. Print the final list of 5, numbered. This is a real use of a `while` loop with a condition that depends on two things at once (do I have 5 yet, and have I tried too many times), not just the simple countdown from Week 1's loop notes. See `solutions/project_stretch_unique_facts.py` for one way to build this.

**2. A generic multi-source fetcher.** The three APIs mentioned above (Cat Facts, Advice Slip, Useless Facts) all follow the same request/response/JSON pattern, but each one buries its actual text in a different place in the response (`data["fact"]` for one, `data["slip"]["advice"]` for another, `data["text"]` for the third). Write one function that can fetch from any of them, handling each one's specific JSON shape and handling a failed request for that specific source without crashing the other two. Call it for all three sources in one run of your script, and print all three results (or a clear per-source failure message if one of them didn't work). Deciding how your function's parameters express "which source, and how do I dig the text out of its specific response shape" is the actual design problem here; there's more than one reasonable way to do it. See `solutions/project_stretch_multi_source.py` for one way.

**3. An interactive fetch loop.** Using Python's built-in `input()` function (which pauses your script, waits for the person running it to type something and press Enter, and returns whatever they typed as a string), build a version of your script that keeps asking "Fetch another fact? (y to continue, anything else to stop): " and fetching a new fact each time the answer is "y", until the person answers with something else. Keep a running count of how many facts were fetched during the session, and print that count once the loop ends. `input()` itself isn't covered in this week's notes; treat looking up how it behaves as a small, safe first rep of reading documentation for something not explicitly taught, the exact habit later weeks assume you already have. See `solutions/project_stretch_interactive.py` for one way.
