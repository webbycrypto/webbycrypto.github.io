"""
Week 2 project: a notes/task API

Read project/README.md for the full walkthrough. Compare against
solutions/notes_api.py once you've made a real attempt at each route.

Endpoints to build:
    GET    /notes              list all notes
    GET    /notes/<note_id>    get one note (404 if it doesn't exist)
    POST   /notes               create a note
    PUT    /notes/<note_id>    update a note's text (404 if missing)
    DELETE /notes/<note_id>    delete a note (404 if missing)

Each note looks like: {"id": 1, "text": "Buy milk"}
"""

import json
import os

from flask import Flask, jsonify, request

app = Flask(__name__)

NOTES_FILE = os.path.join(os.path.dirname(__file__), "notes.json")


def load_notes():
    """
    Load the notes list from NOTES_FILE. Should return an empty list
    if the file doesn't exist yet (the very first run of this app).
    """
    # your code here
    pass


def save_notes(notes):
    """
    Save the given notes list to NOTES_FILE, overwriting whatever was
    there before.
    """
    # your code here
    pass


notes = load_notes()


def find_note(note_id):
    """
    Look through `notes` for one whose "id" matches note_id.
    Return the matching note dict if found, or None if not.

    This is a small helper you can reuse across GET-one, PUT, and
    DELETE, all of which need to do this same lookup.
    """
    # your code here
    pass


@app.route("/notes", methods=["GET"])
def list_notes():
    """Return every note as a JSON list."""
    # your code here
    pass


@app.route("/notes", methods=["POST"])
def create_note():
    """
    Read the new note's text from the request body, assign it a new
    unique id (don't trust a client-supplied one), append it, save,
    and return the new note with status 201.
    """
    # your code here
    pass


@app.route("/notes/<int:note_id>", methods=["GET"])
def get_note(note_id):
    """
    Return the note matching note_id, or a JSON error with status
    404 if no note has that id.
    """
    # your code here
    pass


@app.route("/notes/<int:note_id>", methods=["PUT"])
def update_note(note_id):
    """
    Update the "text" field of the note matching note_id, using the
    new text from the request body. Save afterward. Return a JSON
    error with status 404 if no note has that id.
    """
    # your code here
    pass


@app.route("/notes/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    """
    Remove the note matching note_id from the list. Save afterward.
    Return a JSON error with status 404 if no note has that id.
    """
    # your code here
    pass


if __name__ == "__main__":
    app.run(debug=True)
