"""
Solution: Week 2 project, a notes/task API

See project/README.md for the full walkthrough and project/app.py for
the starter skeleton this fills in. This version adds PUT and DELETE
on top of what the exercises covered, and centralizes the repeated
"find a note or fail" logic into one helper, find_note(), reused by
GET-one, PUT, and DELETE.
"""

import json
import os

from flask import Flask, jsonify, request

app = Flask(__name__)

NOTES_FILE = os.path.join(os.path.dirname(__file__), "notes.json")


def load_notes():
    """Load notes from disk, or start with an empty list if there's
    no saved file yet (the very first run)."""
    if not os.path.exists(NOTES_FILE):
        return []
    with open(NOTES_FILE, "r") as file:
        return json.load(file)


def save_notes(notes):
    """Write the current notes list to disk, overwriting the file."""
    with open(NOTES_FILE, "w") as file:
        json.dump(notes, file)


# Loaded once, when the app starts. From then on, `notes` lives in
# memory while the server runs, and every change also gets written
# back to disk immediately via save_notes(), so a restart picks up
# right where things left off.
notes = load_notes()


def find_note(note_id):
    """
    Look for a note matching note_id. Returns the note dict if found,
    or None if there's no match. Centralizing this lookup here means
    GET-one, PUT, and DELETE don't each need to repeat the same loop;
    they just call this and check whether they got None back.
    """
    for note in notes:
        if note["id"] == note_id:
            return note
    return None


@app.route("/notes", methods=["GET"])
def list_notes():
    return jsonify(notes)


@app.route("/notes", methods=["POST"])
def create_note():
    body = request.get_json()

    # We only trust the "text" field from the client; the id is
    # always assigned by the server, never taken from the request.
    # This also means a request missing "text" entirely produces a
    # note with text=None rather than crashing; a more thorough app
    # might validate this and return a 400 Bad Request instead, which
    # is a reasonable extension to try on your own.
    next_id = max((note["id"] for note in notes), default=0) + 1
    new_note = {"id": next_id, "text": body.get("text")}

    notes.append(new_note)
    save_notes(notes)

    return jsonify(new_note), 201


@app.route("/notes/<int:note_id>", methods=["GET"])
def get_note(note_id):
    note = find_note(note_id)

    if note is None:
        return jsonify({"error": f"No note with id {note_id}"}), 404

    return jsonify(note)


@app.route("/notes/<int:note_id>", methods=["PUT"])
def update_note(note_id):
    note = find_note(note_id)

    if note is None:
        return jsonify({"error": f"No note with id {note_id}"}), 404

    body = request.get_json()

    # `note` here is the exact same dict object living inside the
    # `notes` list (find_note returned a reference to it, not a
    # copy), so mutating it in place with note["text"] = ... updates
    # it inside `notes` too, without needing to search for it again
    # or reassign anything back into the list.
    note["text"] = body.get("text")
    save_notes(notes)

    return jsonify(note)


@app.route("/notes/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    note = find_note(note_id)

    if note is None:
        return jsonify({"error": f"No note with id {note_id}"}), 404

    notes.remove(note)
    save_notes(notes)

    # 204 No Content: the request succeeded, and there's deliberately
    # no body to send back, since the thing being asked about no
    # longer exists to describe. Flask requires an explicit empty
    # string (or similar) alongside a 204, since it can't build a
    # meaningful JSON body for "nothing."
    return "", 204


if __name__ == "__main__":
    app.run(debug=True)
