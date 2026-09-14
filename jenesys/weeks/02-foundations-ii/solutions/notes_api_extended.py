"""
Reference solution: Week 2 project, notes API WITH stretch goals

See project/README.md's "Stretch goals" section for the brief each of
these features fills in. This is `solutions/notes_api.py` extended with
seven optional features: a completed flag, tags, keyword search,
sorting, pagination, a bulk-create endpoint, and a stats summary
endpoint. None of this is required for the base Week 2 deliverable; it
exists so you can check your own approach to any stretch goal you
attempt, after building your own version first.

Every new piece of filtering/sorting/pagination logic below deliberately
uses plain for loops and if-statements, the accumulator pattern from
Week 1's notes, rather than more compact tools like list comprehensions.
Those tools exist in Python and you'll meet them eventually, but nothing
here needs them, and introducing new syntax silently in a "solution"
file would work against the whole point of a reference you can actually
read and understand cold.

Endpoints (beyond the base five from notes_api.py):
    GET  /notes?completed=true|false   filter by the completed flag
    GET  /notes?tag=<tag>                filter to notes containing a tag
    GET  /notes?search=<text>            filter to notes whose text contains this, case-insensitive
    GET  /notes?sort=id|text             sort the (already filtered) results
    GET  /notes?limit=<n>&offset=<n>     paginate the (already filtered, sorted) results
    POST /notes/bulk                     create several notes in one request
    PATCH /notes/<note_id>/complete       toggle a note's completed flag
    GET  /notes/stats                     total/completed/incomplete counts, and a count per tag

Query parameters can be combined; list_notes() applies them in a fixed
order (filter, then sort, then paginate), the same order you'd want if
you were doing this by hand: narrow down to what matters, put it in
order, then slice out one page of it.
"""

import json
import os

from flask import Flask, jsonify, request

app = Flask(__name__)

NOTES_FILE = os.path.join(os.path.dirname(__file__), "notes_extended.json")


def load_notes():
    if not os.path.exists(NOTES_FILE):
        return []
    with open(NOTES_FILE, "r") as file:
        return json.load(file)


def save_notes(notes):
    with open(NOTES_FILE, "w") as file:
        json.dump(notes, file)


notes = load_notes()


def find_note(note_id):
    for note in notes:
        if note["id"] == note_id:
            return note
    return None


def next_note_id():
    """
    Shared id-assignment logic, pulled out into its own function since
    both create_note() and create_notes_bulk() need it now. Repeating
    this one-liner in two places would be exactly the kind of repeated
    logic notes/06-organizing-your-code.md asks you to notice and
    extract instead of copying.
    """
    return max((note["id"] for note in notes), default=0) + 1


def build_note(body):
    """
    Build one new note dict from a request body, filling in the two
    stretch-goal fields with sensible defaults if the client didn't
    provide them. Centralizing this here means create_note() and
    create_notes_bulk() build notes the exact same way, rather than
    each hardcoding the same set of default values separately.
    """
    return {
        "id": next_note_id(),
        "text": body.get("text"),
        "completed": body.get("completed", False),
        "tags": body.get("tags", []),
    }


@app.route("/notes", methods=["GET"])
def list_notes():
    # Start from every note, then narrow down step by step. Each
    # filtering step below builds a brand new list with the
    # accumulator pattern (an empty list, then .append(...) inside a
    # loop for anything that qualifies) rather than modifying the
    # `notes` list itself, since list_notes() should never change the
    # actual stored data, only what it shows back for this one request.
    results = []
    for note in notes:
        results.append(note)

    completed_param = request.args.get("completed")
    if completed_param is not None:
        want_completed = completed_param.lower() == "true"
        filtered = []
        for note in results:
            if note.get("completed", False) == want_completed:
                filtered.append(note)
        results = filtered

    tag_param = request.args.get("tag")
    if tag_param:
        filtered = []
        for note in results:
            if tag_param in note.get("tags", []):
                filtered.append(note)
        results = filtered

    search_param = request.args.get("search")
    if search_param:
        search_lower = search_param.lower()
        filtered = []
        for note in results:
            note_text = note.get("text") or ""
            if search_lower in note_text.lower():
                filtered.append(note)
        results = filtered

    # Sorting: Python's built-in sorted() takes a `key` function that
    # tells it what to compare. We're not using a lambda here (a
    # shorthand, unnamed function you'll likely meet in a later week)
    # to keep this readable with only what's already been taught;
    # instead, two tiny named functions, one per sort option, do the
    # exact same job.
    sort_param = request.args.get("sort")
    if sort_param == "text":
        results = sorted(results, key=get_note_text_lower)
    else:
        results = sorted(results, key=get_note_id)

    # Pagination: offset says how many results to skip from the front,
    # limit says the maximum to return after that. Both come in from
    # the URL as strings, so they need converting to int before use.
    offset_param = request.args.get("offset", "0")
    offset = int(offset_param)
    limit_param = request.args.get("limit")

    if limit_param is not None:
        limit = int(limit_param)
        results = results[offset:offset + limit]
    else:
        results = results[offset:]

    return jsonify(results)


def get_note_id(note):
    """Key function for sorting notes by id. See list_notes()'s sort step."""
    return note["id"]


def get_note_text_lower(note):
    """Key function for sorting notes by text, case-insensitively."""
    return (note.get("text") or "").lower()


@app.route("/notes/stats", methods=["GET"])
def notes_stats():
    """
    Stretch goal 7: a small summary endpoint. Useful for something
    like a dashboard that wants a few counts without fetching every
    note just to count them client-side itself.

    This route is defined before the /notes/<int:note_id> routes
    further down on purpose, purely for readability (grouping it near
    list_notes(), which it's conceptually closest to); it wouldn't
    actually collide with them either way, since Flask's <int:...>
    converter only ever matches a route segment that's a whole
    number, so a request for /notes/stats can never be mistaken for a
    request for /notes/<note_id> in the first place.
    """
    total = len(notes)
    completed = 0
    tag_counts = {}

    for note in notes:
        if note.get("completed", False):
            completed += 1
        for tag in note.get("tags", []):
            tag_counts[tag] = tag_counts.get(tag, 0) + 1

    return jsonify({
        "total": total,
        "completed": completed,
        "incomplete": total - completed,
        "tags": tag_counts,
    })


@app.route("/notes", methods=["POST"])
def create_note():
    body = request.get_json()
    new_note = build_note(body)
    notes.append(new_note)
    save_notes(notes)
    return jsonify(new_note), 201


@app.route("/notes/bulk", methods=["POST"])
def create_notes_bulk():
    """
    Stretch goal: create several notes in one request, instead of one
    POST /notes call per note. Expects a body shaped like
    {"notes": [{"text": "..."}, {"text": "...", "tags": ["x"]}]}.

    Design decision: if the body is missing the "notes" key entirely,
    or "notes" isn't a list, that's a 400 (the request itself is
    malformed), the same distinction notes/04-error-handling.md draws
    between a client mistake (400) and something not existing (404).
    """
    body = request.get_json()
    note_bodies = body.get("notes") if body else None

    if type(note_bodies) is not list:
        return jsonify({"error": "notes must be a list"}), 400

    created = []
    for note_body in note_bodies:
        new_note = build_note(note_body)
        notes.append(new_note)
        created.append(new_note)

    # Saving once, after the whole batch is built, rather than once
    # per note inside the loop, avoids rewriting the entire file to
    # disk N times for one request; it's still the same "rewrite
    # everything" persistence strategy from notes/03, just called a
    # single time for the whole batch instead of redundantly.
    save_notes(notes)
    return jsonify(created), 201


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
    note["text"] = body.get("text", note["text"])
    note["completed"] = body.get("completed", note["completed"])
    note["tags"] = body.get("tags", note["tags"])
    save_notes(notes)
    return jsonify(note)


@app.route("/notes/<int:note_id>/complete", methods=["PATCH"])
def toggle_complete(note_id):
    """
    Stretch goal: flip a note's completed flag without needing to
    resend its full text and tags the way a PUT would require. PATCH
    is the conventional HTTP method for "update part of this,"
    distinct from PUT's "replace this."
    """
    note = find_note(note_id)
    if note is None:
        return jsonify({"error": f"No note with id {note_id}"}), 404

    note["completed"] = not note.get("completed", False)
    save_notes(notes)
    return jsonify(note)


@app.route("/notes/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    note = find_note(note_id)
    if note is None:
        return jsonify({"error": f"No note with id {note_id}"}), 404

    notes.remove(note)
    save_notes(notes)
    return "", 204


if __name__ == "__main__":
    app.run(debug=True)
