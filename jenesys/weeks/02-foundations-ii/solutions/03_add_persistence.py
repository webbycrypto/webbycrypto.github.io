"""
Solution: Exercise 3, add persistence

See exercises/03_add_persistence.py for the task description.
"""

import json
import os

from flask import Flask, jsonify, request

app = Flask(__name__)

NOTES_FILE = os.path.join(os.path.dirname(__file__), "notes.json")


def load_notes():
    # If notes.json doesn't exist yet (the very first run, before
    # anything has ever been saved), there's nothing to load; start
    # from an empty list rather than crashing with FileNotFoundError.
    if not os.path.exists(NOTES_FILE):
        return []
    with open(NOTES_FILE, "r") as file:
        return json.load(file)


def save_notes(notes):
    # "w" mode overwrites the file completely with the current state
    # of `notes` every time. Simple, and fine at this scale; see
    # notes/03-persistence.md for the tradeoffs of this approach.
    with open(NOTES_FILE, "w") as file:
        json.dump(notes, file)


# Load whatever was saved from a previous run (or start empty) as
# soon as the app starts, instead of hardcoding a starting list.
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

    # Save immediately after every change, so the file on disk never
    # falls out of sync with what's actually in memory.
    save_notes(notes)

    return jsonify(new_note), 201


if __name__ == "__main__":
    app.run(debug=True)
