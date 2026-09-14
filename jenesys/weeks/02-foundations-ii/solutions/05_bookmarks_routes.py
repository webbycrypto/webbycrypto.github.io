"""
Solution: Exercise 5, a bookmarks API

See exercises/05_bookmarks_routes.py for the task description.
"""

from flask import Flask, jsonify, request

app = Flask(__name__)

bookmarks = [
    {"id": 1, "url": "https://python.org", "title": "Python"},
    {"id": 2, "url": "https://flask.palletsprojects.com", "title": "Flask"},
]


@app.route("/bookmarks", methods=["GET"])
def list_bookmarks():
    return jsonify(bookmarks)


@app.route("/bookmarks", methods=["POST"])
def create_bookmark():
    body = request.get_json()
    next_id = max((bookmark["id"] for bookmark in bookmarks), default=0) + 1
    new_bookmark = {"id": next_id, "url": body.get("url"), "title": body.get("title")}
    bookmarks.append(new_bookmark)
    return jsonify(new_bookmark), 201


@app.route("/bookmarks/<int:bookmark_id>", methods=["GET"])
def get_bookmark(bookmark_id):
    for bookmark in bookmarks:
        if bookmark["id"] == bookmark_id:
            return jsonify(bookmark)

    return jsonify({"error": f"No bookmark with id {bookmark_id}"}), 404


if __name__ == "__main__":
    app.run(debug=True)
