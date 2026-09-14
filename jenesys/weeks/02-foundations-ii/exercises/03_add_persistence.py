"""
Exercise 3: Add persistence

Builds on exercise 2. Both endpoints (GET and POST /notes) are already
written for you below, using an in-memory list, exactly like exercise
2's solution. Your job is to make the data survive a server restart.

Task:
Read notes/03-persistence.md first if you haven't yet. Then:
    1. Write a load_notes() function that reads notes from a file
       called "notes.json" in this same folder, and returns an empty
       list if that file doesn't exist yet (the very first run).
    2. Write a save_notes(notes) function that writes the current
       notes list to "notes.json".
    3. Call load_notes() once, when the app starts, to set the
       starting value of the notes list (replacing the hardcoded list
       below).
    4. Call save_notes(notes) at the end of create_note(), after
       appending the new note, so every change gets written to disk
       immediately.

How to test once it's running (python exercises/03_add_persistence.py):
    1. POST a new note (see exercise 2 for the curl command).
    2. Confirm GET /notes shows it.
    3. Stop the server (Ctrl+C) and start it again.
    4. GET /notes again. If persistence is working, your new note is
       still there, even though the server restarted. If it's gone,
       something isn't being saved or loaded correctly.

A notes.json file will appear in this folder once you run this. That's
expected and fine; it's your saved data.
"""

import json
import os

from flask import Flask, jsonify, request

app = Flask(__name__)

NOTES_FILE = os.path.join(os.path.dirname(__file__), "notes.json")


# your code here: define load_notes()


# your code here: define save_notes(notes)


# your code here: replace this hardcoded starting list with a call to
# load_notes()
notes = [
    {"id": 1, "text": "Buy milk"},
    {"id": 2, "text": "Walk the dog"},
]


@app.route("/notes", methods=["GET"])
def list_notes():
    return jsonify(notes)


@app.route("/notes", methods=["POST"])
def create_note():
    new_note = request.get_json()
    next_id = max((note["id"] for note in notes), default=0) + 1
    new_note["id"] = next_id
    notes.append(new_note)
    # your code here: save to disk after appending
    return jsonify(new_note), 201


if __name__ == "__main__":
    app.run(debug=True)
