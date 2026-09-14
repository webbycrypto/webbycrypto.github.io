"""
Exercise 2: A second endpoint (a different HTTP method)

Builds on exercise 1. This file already has the GET /notes endpoint
finished for you; your job is to add a second one.

Task:
Add a POST /notes endpoint that:
    1. Reads the new note's data from the request body using
       request.get_json() (see notes/02-endpoints-and-routes.md).
    2. Assigns it a new, unique id. A simple way: one more than the
       highest existing id currently in the notes list (or 1, if the
       list is empty). Don't hardcode a fixed number; if you delete
       and re-add notes later, hardcoding will produce duplicate ids.
    3. Appends the new note (as a dict with "id" and "text") to the
       notes list.
    4. Returns the newly created note as JSON, with status code 201
       (Created), not the default 200.

How to test once it's running (python exercises/02_second_endpoint.py):
    curl -X POST http://127.0.0.1:5000/notes \
        -H "Content-Type: application/json" \
        -d "{\"text\": \"Read a book\"}"
Then confirm it actually shows up by visiting GET /notes again.

Note: this exercise does NOT yet add persistence. If you restart the
server, any notes you added with POST will be gone. That's exercise 3.
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


# your code here: define the POST /notes route


if __name__ == "__main__":
    app.run(debug=True)
