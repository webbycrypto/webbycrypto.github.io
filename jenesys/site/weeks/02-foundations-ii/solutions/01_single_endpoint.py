"""
Solution: Exercise 1, one endpoint

See exercises/01_single_endpoint.py for the task description.
"""

from flask import Flask, jsonify

app = Flask(__name__)

notes = [
    {"id": 1, "text": "Buy milk"},
    {"id": 2, "text": "Walk the dog"},
]


@app.route("/notes", methods=["GET"])
def list_notes():
    # jsonify() converts the Python list `notes` into a proper JSON
    # HTTP response. Flask defaults to status code 200 when you don't
    # specify one, which is exactly right for a successful GET.
    return jsonify(notes)


if __name__ == "__main__":
    app.run(debug=True)
