"""
Exercise 1: One endpoint

Read notes/01-web-frameworks.md and notes/02-endpoints-and-routes.md
before starting this if you haven't yet.

Task:
Build a tiny Flask app with exactly one endpoint: GET /notes, which
returns the hardcoded `notes` list below as a JSON response (use
jsonify).

This is deliberately small. The goal is just to get comfortable with
the core loop: define the Flask app, define one route, run the server,
and confirm the response in a browser or with curl.

How to run and test:
    python exercises/01_single_endpoint.py
Then, in a browser or a second terminal, visit:
    http://127.0.0.1:5000/notes
(or run: curl http://127.0.0.1:5000/notes)
You should see the notes list come back as JSON.

Stop the server with Ctrl+C in the terminal it's running in when
you're done.
"""

from flask import Flask, jsonify

app = Flask(__name__)

notes = [
    {"id": 1, "text": "Buy milk"},
    {"id": 2, "text": "Walk the dog"},
]


# your code here: define the GET /notes route


if __name__ == "__main__":
    app.run(debug=True)
