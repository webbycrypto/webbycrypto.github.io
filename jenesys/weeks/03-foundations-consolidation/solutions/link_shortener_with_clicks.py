"""
Reference solution: Week 3 project, URL shortener WITH its stretch goal

See project/README.md's "Stretch goal" section for the brief this
fills in. This is `solutions/link_shortener.py` extended with per-link
click tracking: every successful redirect (not creation, not a 404)
increments a counter stored alongside that link's mapping. Compare
against this only after attempting the stretch goal yourself.

What changed from link_shortener.py:
    - Every link now also carries a "clicks" field, starting at 0.
    - go_to_long_url() increments it, and saves, on every successful
      redirect, AFTER confirming the code actually maps to something
      (a 404 doesn't count as a click; nothing was actually visited).
    - get_link() (look up without redirecting) now shows the current
      click count, since it already returns the full link dict.
"""

import json
import os
import random
import string

from flask import Flask, jsonify, redirect, request

app = Flask(__name__)

LINKS_FILE = os.path.join(os.path.dirname(__file__), "links_with_clicks.json")

SHORT_CODE_LENGTH = 6
SHORT_CODE_CHARACTERS = string.ascii_letters + string.digits


def load_links():
    if not os.path.exists(LINKS_FILE):
        return []
    with open(LINKS_FILE, "r") as file:
        return json.load(file)


def save_links(links):
    with open(LINKS_FILE, "w") as file:
        json.dump(links, file)


links = load_links()


def find_link(short_code):
    for link in links:
        if link["short_code"] == short_code:
            return link
    return None


def generate_unique_short_code():
    while True:
        code = "".join(
            random.choices(SHORT_CODE_CHARACTERS, k=SHORT_CODE_LENGTH)
        )
        if find_link(code) is None:
            return code


@app.route("/links", methods=["POST"])
def create_link():
    body = request.get_json()

    long_url = body.get("long_url") if body else None
    if not long_url:
        return jsonify({"error": "long_url is required"}), 400

    short_code = generate_unique_short_code()

    # The one line that's actually new here: every link starts life
    # with a clicks count of 0, the same way a note started with
    # completed=False in Week 2's stretch goals, a fresh field with a
    # sensible starting value, set once, at creation.
    new_link = {"short_code": short_code, "long_url": long_url, "clicks": 0}
    links.append(new_link)
    save_links(links)

    return jsonify(new_link), 201


@app.route("/links", methods=["GET"])
def list_links():
    return jsonify(links)


@app.route("/links/<short_code>", methods=["GET"])
def get_link(short_code):
    link = find_link(short_code)

    if link is None:
        return jsonify({"error": f"No link with code {short_code}"}), 404

    return jsonify(link)


@app.route("/<short_code>", methods=["GET"])
def go_to_long_url(short_code):
    link = find_link(short_code)

    if link is None:
        return jsonify({"error": f"No link with code {short_code}"}), 404

    # Design decision: the click only counts once we know for certain
    # the code maps to something real. Incrementing before this check
    # (or incrementing regardless of whether the lookup succeeded)
    # would count requests for codes that don't exist as "clicks,"
    # which doesn't match what a click count is supposed to mean: how
    # many times has someone actually been sent somewhere.
    link["clicks"] = link["clicks"] + 1
    save_links(links)

    return redirect(link["long_url"])


if __name__ == "__main__":
    app.run(debug=True)
