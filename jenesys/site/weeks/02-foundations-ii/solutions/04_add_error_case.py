"""
Solution: Exercise 4, a third endpoint, with a deliberate error case

See exercises/04_add_error_case.py for the task description.
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


@app.route("/notes/<int:note_id>", methods=["GET"])
def get_note(note_id):
    # Search for a matching note. If the loop finishes without
    # returning, we fall through to the line after it: that's the
    # deliberate "not found" path, not an accident.
    for note in notes:
        if note["id"] == note_id:
            return jsonify(note)

    # A proper 404: still valid JSON (so any client's code can parse
    # the response the same way regardless of success or failure),
    # with a status code that honestly reflects what happened, and a
    # message specific enough to actually be useful.
    return jsonify({"error": f"No note with id {note_id}"}), 404


if __name__ == "__main__":
    app.run(debug=True)
