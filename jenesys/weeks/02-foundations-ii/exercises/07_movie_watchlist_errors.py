"""
Exercise 7: A movie watchlist API (a second rep of error handling, standalone)

This exercise does NOT build on exercises 5-6 or on exercises 1-4, and
the main project doesn't build on this either. It exists purely to give
you a second, independent rep at deliberate error handling, in a
different domain (movies instead of notes), before you tackle the full
notes API in project/. Read notes/04-error-handling.md first if you
haven't yet, or want a refresher.

Task:
Persistence isn't the point here, so this uses a plain in-memory list,
already set up. GET /movies and POST /movies are already written, but
POST currently has no validation at all, and GET /movies/<movie_id> is
missing entirely. Your job:

    1. Add validation to create_movie(): if the request body has no
       "title" key, or "title" is blank/whitespace-only, return a JSON
       error ({"error": "title is required"}) with status 400 instead
       of creating a movie with missing data. (This is the same kind
       of validation notes/06-organizing-your-code.md's
       get_valid_text() example demonstrated; you don't need to reuse
       that exact helper, just apply the same idea.)

    2. Define GET /movies/<int:movie_id>: return the matching movie as
       JSON if found. If no movie has that id, return a JSON error
       ({"error": "No movie with id 5"}) with status 404, instead of
       crashing.

Two different status codes, two different meanings: 400 means "what you
sent me is invalid," 404 means "what you're asking for doesn't exist."
Don't mix them up; using 404 for a bad POST body, or 400 for a missing
id, would be technically working code that reports the wrong thing to
whoever's calling your API.

How to test once it's running (python exercises/07_movie_watchlist_errors.py):
    curl -X POST http://127.0.0.1:5000/movies \
        -H "Content-Type: application/json" -d "{}"
    (should be a 400, missing title)
    curl -X POST http://127.0.0.1:5000/movies \
        -H "Content-Type: application/json" \
        -d "{\"title\": \"Arrival\", \"watched\": false}"
    (should be a 201)
    curl http://127.0.0.1:5000/movies/1
    (should be a 200, an existing movie)
    curl http://127.0.0.1:5000/movies/999
    (should be a 404, not a crash)
"""

from flask import Flask, jsonify, request

app = Flask(__name__)

movies = [
    {"id": 1, "title": "The Matrix", "watched": True},
    {"id": 2, "title": "Arrival", "watched": False},
]


@app.route("/movies", methods=["GET"])
def list_movies():
    return jsonify(movies)


@app.route("/movies", methods=["POST"])
def create_movie():
    body = request.get_json()

    # your code here: validate that body has a non-blank "title"
    # before proceeding. Return the 400 error case described above if
    # it doesn't, and stop there (an early return, so the rest of this
    # function never runs for an invalid request).

    next_id = max((movie["id"] for movie in movies), default=0) + 1
    new_movie = {"id": next_id, "title": body.get("title"), "watched": False}
    movies.append(new_movie)
    return jsonify(new_movie), 201


# your code here: define GET /movies/<int:movie_id>, with the 404 case


if __name__ == "__main__":
    app.run(debug=True)
