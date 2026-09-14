"""
Solution: Exercise 6, a recipe box API (persistence)

See exercises/06_recipe_box_persistence.py for the task description.
"""

import json
import os

from flask import Flask, jsonify, request

app = Flask(__name__)

RECIPES_FILE = os.path.join(os.path.dirname(__file__), "recipes.json")


def load_recipes():
    """Load recipes from disk, or start empty if there's no saved file yet."""
    if not os.path.exists(RECIPES_FILE):
        return []
    with open(RECIPES_FILE, "r") as file:
        return json.load(file)


def save_recipes(recipes):
    """Write the current recipes list to disk, overwriting the file."""
    with open(RECIPES_FILE, "w") as file:
        json.dump(recipes, file)


recipes = load_recipes()


@app.route("/recipes", methods=["GET"])
def list_recipes():
    return jsonify(recipes)


@app.route("/recipes", methods=["POST"])
def create_recipe():
    new_recipe = request.get_json()
    next_id = max((recipe["id"] for recipe in recipes), default=0) + 1
    new_recipe["id"] = next_id
    recipes.append(new_recipe)
    save_recipes(recipes)
    return jsonify(new_recipe), 201


if __name__ == "__main__":
    app.run(debug=True)
