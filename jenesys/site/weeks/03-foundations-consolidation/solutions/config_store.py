"""
Solution: Week 3 second project, a key-value config store API

See project/second-project-config-store.md for the brief this fills
in. This is ONE reasonable design, not the only correct one; the brief
deliberately left several decisions open. The choices made here, and
why, are called out in comments so you can compare your own decisions
against a worked example, not so you treat this as the single right
answer.

Endpoints:
    GET    /config              list every key and its current value
    GET    /config/<key>        get one key's value (404 if unset)
    PUT    /config/<key>        set one key's value (create or overwrite)
    DELETE /config/<key>        remove a key (404 if unset)
    PUT    /config              bulk-set several keys in one request

Data shape persisted to disk: a single JSON object (a plain dict),
mapping each key directly to its value:
    {"site_name": "My App", "max_users": 100, "maintenance_mode": false}

Design decision: unlike the notes API and the URL shortener, this
service's data is naturally a dict, not a list of dicts. Persistence
works exactly the same way either way (json.dump/json.load don't care
whether the top-level structure is a list or a dict); this is a
deliberate chance to notice that the *pattern* (write the whole current
state to a file, read it back on startup) doesn't depend on the shape
of the thing being persisted.

Design decision: a config value is only allowed to be a string, a
number (int or float), or a boolean. Anything else (a list, a nested
object, null) is rejected with a 400. This is the "restrict what types
are acceptable" option mentioned in the brief's fifth-endpoint-or-
behavior constraint; a config store for an application's settings
realistically only ever needs simple values like these, and rejecting
anything more complex up front avoids ever having to decide later what
a "config value" that's itself a whole nested object would even mean.
"""

import json
import os

from flask import Flask, jsonify, request

app = Flask(__name__)

CONFIG_FILE = os.path.join(os.path.dirname(__file__), "config_store.json")

# The types a config value is allowed to be, checked with type(),
# the same built-in from notes/01-variables-and-data-types.md in
# Week 1. Listing all four out explicitly and checking membership with
# `in` is a straightforward way to ask "is this exactly one of these
# kinds of value," without reaching for anything not already taught.
VALID_VALUE_TYPES = (str, int, float, bool)


def load_config():
    if not os.path.exists(CONFIG_FILE):
        return {}
    with open(CONFIG_FILE, "r") as file:
        return json.load(file)


def save_config(config):
    with open(CONFIG_FILE, "w") as file:
        json.dump(config, file)


config = load_config()


def is_valid_value(value):
    """
    Return True if `value` is a type this store accepts (string,
    number, or boolean), False otherwise. Centralized here so both the
    single-key PUT and the bulk PUT below apply the exact same rule,
    instead of each route repeating its own version of this check.
    """
    return type(value) in VALID_VALUE_TYPES


@app.route("/config", methods=["GET"])
def list_config():
    return jsonify(config)


@app.route("/config/<key>", methods=["GET"])
def get_config_value(key):
    if key not in config:
        return jsonify({"error": f"No config key '{key}'"}), 404

    return jsonify({"key": key, "value": config[key]})


@app.route("/config/<key>", methods=["PUT"])
def set_config_value(key):
    body = request.get_json()

    # Design decision: a body with no "value" field at all is a 400
    # (the request itself is malformed), not treated as "set this key
    # to nothing." "value" is required.
    if body is None or "value" not in body:
        return jsonify({"error": "value is required"}), 400

    value = body["value"]
    if not is_valid_value(value):
        return jsonify({
            "error": "value must be a string, number, or boolean"
        }), 400

    # This line does double duty by design: if `key` isn't in config
    # yet, this creates it; if it already exists, this overwrites it.
    # That single line correctly satisfies both halves of the brief's
    # "setting a key that doesn't exist should create it; setting one
    # that already exists should overwrite it" constraint, with no
    # if/else needed to distinguish the two cases.
    config[key] = value
    save_config(config)

    return jsonify({"key": key, "value": value})


@app.route("/config/<key>", methods=["DELETE"])
def delete_config_value(key):
    if key not in config:
        return jsonify({"error": f"No config key '{key}'"}), 404

    del config[key]
    save_config(config)

    return "", 204


@app.route("/config", methods=["PUT"])
def bulk_set_config():
    """
    The fifth piece of behavior the brief asked for: set several keys
    in one request. Expects a body that's itself a flat object of
    key/value pairs to merge into the existing config, for example
    {"site_name": "My App", "max_users": 100}.

    Design decision: validate every key/value pair in the request
    BEFORE applying any of them. If even one value is an invalid type,
    the whole request fails with a 400 and nothing is changed, rather
    than applying the valid ones and silently skipping the invalid
    ones. A learner could reasonably choose the opposite (apply what's
    valid, report what wasn't) instead; either is defensible as long
    as it's a decision, not an accident, and this file picks
    all-or-nothing specifically because it's easier for a caller to
    reason about: a 200 means everything in the request took effect,
    a 400 means none of it did.
    """
    updates = request.get_json()

    if type(updates) is not dict:
        return jsonify({"error": "request body must be a JSON object of key/value pairs"}), 400

    invalid_keys = []
    for key, value in updates.items():
        if not is_valid_value(value):
            invalid_keys.append(key)

    if invalid_keys:
        return jsonify({
            "error": "one or more values are an invalid type",
            "invalid_keys": invalid_keys,
        }), 400

    for key, value in updates.items():
        config[key] = value
    save_config(config)

    return jsonify(config)


if __name__ == "__main__":
    app.run(debug=True)
