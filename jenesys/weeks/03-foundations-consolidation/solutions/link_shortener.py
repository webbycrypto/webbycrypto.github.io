"""
Solution: Week 3 project, a URL shortener

See project/README.md for the brief this fills in. This is ONE
reasonable design, not the only correct one; the brief deliberately
left several decisions open. The choices made here, and why, are
called out in comments so you can compare your own decisions against
a worked example, not so you treat this as the single right answer.

Endpoints:
    POST /links              create a short link for a given long URL
    GET  /links               list every short link created so far
    GET  /<short_code>       redirect to the long URL for that code
    GET  /links/<short_code> look up a short code's long URL WITHOUT
                               redirecting (useful for confirming what
                               a code maps to, or for building a UI
                               around this service later)

Data shape persisted to disk (a list of mappings):
    [{"short_code": "aB3xY9", "long_url": "https://example.com/..."}]
"""

import json
import os
import random
import string

from flask import Flask, jsonify, redirect, request

app = Flask(__name__)

LINKS_FILE = os.path.join(os.path.dirname(__file__), "links.json")

# Design decision: short codes are 6 random letters/digits. Random,
# rather than an incrementing counter, so codes don't reveal how many
# links exist or in what order they were created. 6 characters keeps
# collisions very unlikely at the scale a learning project runs at,
# and the code below double-checks for a collision anyway, rather
# than assuming "very unlikely" means "never."
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
    """Return the mapping dict for short_code, or None if it doesn't exist."""
    for link in links:
        if link["short_code"] == short_code:
            return link
    return None


def generate_unique_short_code():
    """
    Generate a random short code, retrying if it happens to collide
    with one already in use. In practice, with 6 characters drawn
    from 62 possibilities each, a collision is extremely unlikely,
    but "extremely unlikely" is not the same as "impossible," so we
    check on purpose rather than assuming it away.
    """
    while True:
        code = "".join(
            random.choices(SHORT_CODE_CHARACTERS, k=SHORT_CODE_LENGTH)
        )
        if find_link(code) is None:
            return code


@app.route("/links", methods=["POST"])
def create_link():
    body = request.get_json()

    # Design decision: a request with no "long_url" at all, or an
    # empty one, is treated as a bad request (400), a genuine client
    # mistake, distinct from a 404 (which means "this specific thing
    # doesn't exist," not "you didn't send what was needed").
    long_url = body.get("long_url") if body else None
    if not long_url:
        return jsonify({"error": "long_url is required"}), 400

    # Design decision: shortening the same long URL twice creates two
    # separate short codes, rather than reusing an existing one. This
    # matches how most real link shorteners behave (each shortening
    # request is treated independently), and it's simpler than
    # searching for an existing match first. A different, equally
    # defensible choice would be to check for an existing mapping to
    # the same long_url and reuse its code; either is fine as long as
    # you've decided on purpose and can explain it.
    short_code = generate_unique_short_code()
    new_link = {"short_code": short_code, "long_url": long_url}
    links.append(new_link)
    save_links(links)

    return jsonify(new_link), 201


@app.route("/links", methods=["GET"])
def list_links():
    return jsonify(links)


@app.route("/links/<short_code>", methods=["GET"])
def get_link(short_code):
    """
    Look up what a short code maps to, WITHOUT redirecting. Useful
    for confirming a mapping exists (or inspecting it) without
    actually being sent to the destination URL.
    """
    link = find_link(short_code)

    if link is None:
        return jsonify({"error": f"No link with code {short_code}"}), 404

    return jsonify(link)


@app.route("/<short_code>", methods=["GET"])
def go_to_long_url(short_code):
    """
    The actual short link a person would visit. On a match, sends a
    real HTTP redirect to the original long URL. On no match, a
    proper 404, the same deliberate "expected failure case" handling
    from Week 2's missing-note-id endpoint, not a crash.
    """
    link = find_link(short_code)

    if link is None:
        return jsonify({"error": f"No link with code {short_code}"}), 404

    return redirect(link["long_url"])


if __name__ == "__main__":
    app.run(debug=True)
