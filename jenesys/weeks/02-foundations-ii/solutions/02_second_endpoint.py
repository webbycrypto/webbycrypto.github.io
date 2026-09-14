"""
Solution: Exercise 2, a second endpoint

See exercises/02_second_endpoint.py for the task description.
"""

from flask import Flask, jsonify, request

app = Flask(__name__)

notes = [
    {"id": 1, "text": "Buy milk"},
    {"id": 2, "text": "Walk the dog"},
]


@app.route("/notes", methods=["GET"])
def list_notes():
    return jsonify(notes)


@app.route("/notes", methods=["POST"])
def create_note():
    # request.get_json() reads the JSON body the client sent and
    # turns it into a Python dict, e.g. {"text": "Read a book"}.
    new_note = request.get_json()

    # Assign a new id ourselves rather than trusting the client to
    # supply one. max(..., default=0) handles the empty-list case
    # (an empty notes list has no ids to take the max of at all)
    # without crashing; without `default=0`, max() on an empty
    # sequence raises a ValueError.
    next_id = max((note["id"] for note in notes), default=0) + 1
    new_note["id"] = next_id

    notes.append(new_note)

    # 201 Created is the conventional status code for "a POST request
    # that successfully created something new," distinct from the
    # default 200 used for a plain successful GET.
    return jsonify(new_note), 201


if __name__ == "__main__":
    app.run(debug=True)
