"""
Solution: Exercise 7, a movie watchlist API (error handling)

See exercises/07_movie_watchlist_errors.py for the task description.
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

    # .get("title", "") means "title" missing entirely and "title": ""
    # both come back as an empty string here, so .strip() (which
    # removes leading/trailing whitespace) followed by checking for
    # emptiness catches a missing title, a blank title, and a
    # whitespace-only title, all with one check.
    title = body.get("title", "").strip()
    if not title:
        return jsonify({"error": "title is required"}), 400

    next_id = max((movie["id"] for movie in movies), default=0) + 1
    new_movie = {"id": next_id, "title": title, "watched": False}
    movies.append(new_movie)
    return jsonify(new_movie), 201


@app.route("/movies/<int:movie_id>", methods=["GET"])
def get_movie(movie_id):
    for movie in movies:
        if movie["id"] == movie_id:
            return jsonify(movie)

    return jsonify({"error": f"No movie with id {movie_id}"}), 404


if __name__ == "__main__":
    app.run(debug=True)
