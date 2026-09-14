"""
Exercise 5: A bookmarks API (a second rep of routes, standalone)

This exercise does NOT build on exercises 1-4, and the main project
doesn't build on this either. It exists purely to give you a second,
independent rep at defining routes and path parameters, in a different
domain (bookmarks instead of notes), before you tackle the full notes
API in project/. Read notes/02-endpoints-and-routes.md first if you
haven't yet, or want a refresher.

Task:
Build three endpoints for a tiny bookmarks service, entirely in memory
(no persistence needed here; persistence gets its own separate rep in
exercise 6):

    GET /bookmarks
        Return every bookmark in `bookmarks` as JSON.

    POST /bookmarks
        Read a new bookmark's data from the request body
        (request.get_json()), which will have "url" and "title" keys.
        Assign it a new, unique id yourself (one more than the highest
        existing id, or 1 if the list is empty; do not trust a
        client-supplied id). Append it to `bookmarks`. Return the new
        bookmark as JSON with status 201.

    GET /bookmarks/<int:bookmark_id>
        Return the one bookmark matching bookmark_id as JSON. If no
        bookmark has that id, return a JSON error object (something
        like {"error": "No bookmark with id 5"}) with status 404,
        instead of crashing.

How to test once it's running (python exercises/05_bookmarks_routes.py):
    curl http://127.0.0.1:5000/bookmarks
    curl -X POST http://127.0.0.1:5000/bookmarks \
        -H "Content-Type: application/json" \
        -d "{\"url\": \"https://example.com\", \"title\": \"Example\"}"
    curl http://127.0.0.1:5000/bookmarks/1
    curl http://127.0.0.1:5000/bookmarks/999
(That last one should come back with a 404 and a clear error message.)
"""

from flask import Flask, jsonify, request

app = Flask(__name__)

bookmarks = [
    {"id": 1, "url": "https://python.org", "title": "Python"},
    {"id": 2, "url": "https://flask.palletsprojects.com", "title": "Flask"},
]


# your code here: define GET /bookmarks


# your code here: define POST /bookmarks


# your code here: define GET /bookmarks/<int:bookmark_id>, with the 404 case


if __name__ == "__main__":
    app.run(debug=True)
