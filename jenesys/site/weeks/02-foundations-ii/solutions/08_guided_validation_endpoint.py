"""
Solution: Exercise 8, guided walkthrough, a validated feedback endpoint

See exercises/08_guided_validation_endpoint.md for the full walkthrough.
"""

from flask import Flask, jsonify, request

app = Flask(__name__)

feedback_entries = []


@app.route("/feedback", methods=["POST"])
def create_feedback():
    body = request.get_json()

    rating = body.get("rating")
    if type(rating) is not int:
        return jsonify({"error": "rating must be a whole number"}), 400

    if rating < 1 or rating > 5:
        return jsonify({"error": "rating must be between 1 and 5"}), 400

    comment = body.get("comment", "").strip()
    if not comment:
        return jsonify({"error": "comment is required"}), 400

    entry = {"rating": rating, "comment": comment}
    feedback_entries.append(entry)
    return jsonify(entry), 201


@app.route("/feedback", methods=["GET"])
def list_feedback():
    return jsonify(feedback_entries)


if __name__ == "__main__":
    app.run(debug=True)
