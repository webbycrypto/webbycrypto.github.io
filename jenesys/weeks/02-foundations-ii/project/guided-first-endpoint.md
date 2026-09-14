# Guided walkthrough: your first endpoint, line by line

[← Back to Week 2 project: a notes/task API](README.md)

This week's "Work through the routes in this order" section (in `README.md`) tells you the order and gives you hints per route, but from there on, you're filling in each function's body yourself. That's the right amount of guidance for five of the six pieces you'll build this week. It's not enough for the very first one: this is the first time you're writing inside someone else's framework (Flask) instead of a plain script, and that jump deserves the same line-by-line treatment Week 1's guided exercise gave you.

This walkthrough builds exactly three things: `load_notes`, `save_notes`, and the `GET /notes` route. That's the minimum needed to see a real request get a real response. Type each step into `app.py`'s already-existing function stubs (replace the `# your code here` / `pass` lines), and restart the server (`python app.py`) after every step to test it. Once you finish Step 3 below, go back to `README.md`'s ordered list starting at step 3 (`POST /notes`) for the rest, with the scaffolding easing off from there, the same way Week 1 handed off from its guided exercise to Week 2's project as a whole.

## Step 1: `load_notes`, reading the file if it exists

```python
def load_notes():
    if not os.path.exists(NOTES_FILE):
        return []
    with open(NOTES_FILE, "r") as file:
        return json.load(file)
```

`os.path.exists(NOTES_FILE)` checks whether the file is even there yet; on the very first run of this app, it won't be, and trying to open a file that doesn't exist would crash. Returning an empty list in that case means "no notes yet," not an error. `with open(...) as file` opens the file and guarantees it gets closed afterward, even if something goes wrong while reading it. `json.load(file)` turns the JSON text sitting in that file back into a real Python list of dictionaries. See `notes/03-persistence.md` if any piece of this feels unfamiliar; it covers exactly this pattern.

## Step 2: `save_notes`, writing the current list back to disk

```python
def save_notes(notes):
    with open(NOTES_FILE, "w") as file:
        json.dump(notes, file)
```

`"w"` (versus `"r"` above) opens the file for writing, creating it if it doesn't exist yet, and erasing whatever was there before if it does. `json.dump(notes, file)` is the reverse of `json.load`: it takes a Python list and writes it into the file as JSON text. Restart the server now (`python app.py`) and confirm it starts without crashing. Nothing observable has changed yet from the outside; these two functions exist, but nothing has called them for real data yet.

## Step 3: `GET /notes`, returning every note

```python
@app.route("/notes", methods=["GET"])
def list_notes():
    return jsonify(notes)
```

`notes` here is the module-level variable a few lines above your functions (`notes = load_notes()`), the in-memory list this whole file works with while the server is running. `jsonify(notes)` converts that Python list into a proper JSON HTTP response, with the right content type set for you, which is why you use it instead of just `return notes`. Restart the server, then in a second terminal run:

```
curl http://127.0.0.1:5000/notes
```

You should see `[]`, an empty JSON list, since `notes.json` doesn't exist yet and `load_notes` returned an empty list. That empty response, arriving over an actual HTTP request, is your first real proof this framework is doing what the notes said it would.

## From here

You've now written the persistence layer and one working route, one line at a time, and watched each piece do something observable before moving to the next. The remaining four routes (`POST`, `GET /notes/<note_id>`, `PUT`, `DELETE`) follow the same request-in, logic, response-out shape you just built three times over. Go to `README.md`'s "Work through the routes in this order" section, starting at step 3, and build the rest with that lighter level of guidance; you've already had the fully-guided rep this file was for.
