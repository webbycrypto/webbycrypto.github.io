"""
Exercise 4: A third endpoint, with a deliberate error case

Builds on exercise 3 (persistence is already wired up below, the same
way exercise 3 asked you to build it). Your job now is to add a new
endpoint that can fail in a completely normal, expected way, and
handle that failure on purpose.

Task:
Read notes/04-error-handling.md first if you haven't yet. Then add a
GET /notes/<int:note_id> endpoint that:
    1. Searches the notes list for a note whose "id" matches note_id.
    2. If found, returns it as JSON (status code 200, the default).
    3. If NOT found, returns a JSON error object (something like
       {"error": "No note with id 5"}) with status code 404, the
       proper "not found" status, instead of crashing or silently
       returning nothing.

How to test once it's running (python exercises/04_add_error_case.py):
    1. GET /notes to see which ids actually exist right now.
    2. GET /notes/<one of those ids> and confirm you get that note
       back with a 200.
    3. GET /notes/9999 (or any id you know doesn't exist) and confirm
       you get a 404 with a clear error message, NOT a crash. If you
       see Flask's debug error page instead of a clean JSON 404, your
       function is probably falling through without an explicit
       return for the not-found case; check notes/02 and notes/04
       again.
"""

import json
import os

from flask import Flask, jsonify, request

app = Flask(__name__)

NOTES_FILE = os.path.join(os.path.dirname(__file__), "notes.json")


def load_notes():
    if not os.path.exists(NOTES_FILE):
        return []
    with open(NOTES_FILE, "r") as file:
        return json.load(file)


def save_notes(notes):
    with open(NOTES_FILE, "w") as file:
        json.dump(notes, file)


notes = load_notes()


@app.route("/notes", methods=["GET"])
def list_notes():
    return jsonify(notes)


@app.route("/notes", methods=["POST"])
def create_note():
    new_note = request.get_json()
    next_id = max((note["id"] for note in notes), default=0) + 1
    new_note["id"] = next_id
    notes.append(new_note)
    save_notes(notes)
    return jsonify(new_note), 201


# your code here: define GET /notes/<int:note_id>, with the 404
# error case handled on purpose


if __name__ == "__main__":
    app.run(debug=True)
