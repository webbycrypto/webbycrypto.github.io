"""
Solution: guided walkthrough, a tiny redirect-only app

See exercises/01_guided_redirect_mini_app.md for the full walkthrough.
"""

from flask import Flask, jsonify, redirect

app = Flask(__name__)

links = {
    "gh": "https://github.com",
    "py": "https://python.org",
}


@app.route("/<code>")
def go_to_url(code):
    long_url = links.get(code)

    if long_url is None:
        return jsonify({"error": f"No link with code {code}"}), 404

    return redirect(long_url)


if __name__ == "__main__":
    app.run(debug=True)
