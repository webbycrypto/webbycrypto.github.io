"""
Reference solution: Week 3 second project, config store WITH its stretch goal

See project/second-project-config-store.md's "Stretch goal" section
for the brief this fills in: a GET /config/<key>/history endpoint that
returns every value a key has ever held, oldest first. Compare against
this only after attempting the stretch goal yourself.

This is NOT `config_store.py` with one new route bolted on; the brief
warns that this "touches your storage format directly," and that's
true here. `config_store.py` persists {key: current_value}. Keeping a
full history means each key needs to persist a LIST of values instead
of just its latest one, so every existing route that reads or writes a
value had to change to work with that new shape, not just the new
history route.

Data shape persisted to disk (a dict mapping each key to a list of
every value it's ever held, in order, oldest first, the LAST entry
always being the current value):
    {"site_name": ["My App"], "max_users": [50, 100, 250]}

Design decision: setting a key to the exact value it already currently
holds does NOT add a new history entry. The brief explicitly leaves
this open ("does setting a key to the same value it already had count
as a change?"); this file's answer is no, on the reasoning that
"history" should mean "when did this value actually change," not "how
many times was a PUT request sent." A different, equally defensible
answer would record every set attempt regardless of whether the value
actually changed; if you made that call instead, that's a legitimate
different decision, not a wrong one, as long as you can explain it.
"""

import json
import os

from flask import Flask, jsonify, request

app = Flask(__name__)

CONFIG_FILE = os.path.join(os.path.dirname(__file__), "config_store_history.json")

VALID_VALUE_TYPES = (str, int, float, bool)


def load_config():
    if not os.path.exists(CONFIG_FILE):
        return {}
    with open(CONFIG_FILE, "r") as file:
        return json.load(file)


def save_config(config):
    with open(CONFIG_FILE, "w") as file:
        json.dump(config, file)


# config maps each key to a LIST of values, oldest first. This is the
# one structural change everything else in this file has to respect.
config = load_config()


def is_valid_value(value):
    return type(value) in VALID_VALUE_TYPES


def current_value(key):
    """The current value of a key is just the last entry in its history list."""
    return config[key][-1]


def record_value(key, value):
    """
    Set a key's current value, appending a new history entry only if
    the value is actually different from whatever the key currently
    holds (or if the key is brand new). Centralized here so the
    single-key PUT and the bulk PUT below both apply this exact same
    rule, instead of each route repeating its own version of it.
    """
    if key not in config:
        config[key] = [value]
    elif config[key][-1] != value:
        config[key].append(value)
    # If the key already exists AND its current value already equals
    # `value`, neither branch above runs: nothing changes, on purpose,
    # per this file's design decision described at the top.


@app.route("/config", methods=["GET"])
def list_config():
    # Build a plain {key: current_value} view for the "list everything"
    # endpoint; a caller listing all config values almost always wants
    # what's true right now, not each key's entire history at once.
    current_values = {}
    for key in config:
        current_values[key] = current_value(key)

    return jsonify(current_values)


@app.route("/config/<key>", methods=["GET"])
def get_config_value(key):
    if key not in config:
        return jsonify({"error": f"No config key '{key}'"}), 404

    return jsonify({"key": key, "value": current_value(key)})


@app.route("/config/<key>/history", methods=["GET"])
def get_config_history(key):
    """The stretch goal itself: every value this key has ever held, oldest first."""
    if key not in config:
        return jsonify({"error": f"No config key '{key}'"}), 404

    return jsonify({"key": key, "history": config[key]})


@app.route("/config/<key>", methods=["PUT"])
def set_config_value(key):
    body = request.get_json()

    if body is None or "value" not in body:
        return jsonify({"error": "value is required"}), 400

    value = body["value"]
    if not is_valid_value(value):
        return jsonify({
            "error": "value must be a string, number, or boolean"
        }), 400

    record_value(key, value)
    save_config(config)

    return jsonify({"key": key, "value": current_value(key)})


@app.route("/config/<key>", methods=["DELETE"])
def delete_config_value(key):
    """
    Design decision: deleting a key removes its entire history, not
    just its current value. A learner could reasonably decide deleting
    should instead just clear the current value while keeping the
    history around for later reference; this file picks the simpler
    behavior (delete really means gone) since the brief doesn't ask
    for anything more nuanced than Week 2's own DELETE endpoints did.
    """
    if key not in config:
        return jsonify({"error": f"No config key '{key}'"}), 404

    del config[key]
    save_config(config)

    return "", 204


@app.route("/config", methods=["PUT"])
def bulk_set_config():
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
        record_value(key, value)
    save_config(config)

    current_values = {}
    for key in config:
        current_values[key] = current_value(key)
    return jsonify(current_values)


if __name__ == "__main__":
    app.run(debug=True)
