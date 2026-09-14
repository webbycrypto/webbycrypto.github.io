"""
Exercise 6: A recipe box API (a second rep of persistence, standalone)

This exercise does NOT build on exercise 5 or on exercises 1-4, and the
main project doesn't build on this either. It exists purely to give you
a second, independent rep at file-based persistence, in a different
domain (recipes instead of notes), before you tackle the full notes API
in project/. Read notes/03-persistence.md first if you haven't yet, or
want a refresher.

Task:
Both endpoints below (GET and POST /recipes) are already written for
you, using an in-memory list. Your only job is to make the data survive
a server restart:

    1. Write a load_recipes() function that reads recipes from a file
       called "recipes.json" in this same folder, and returns an empty
       list if that file doesn't exist yet (the very first run).
    2. Write a save_recipes(recipes) function that writes the current
       recipes list to "recipes.json".
    3. Replace the hardcoded starting list below with a call to
       load_recipes().
    4. Call save_recipes(recipes) at the end of create_recipe(), after
       appending the new recipe, so every change gets written to disk
       immediately.

How to test once it's running (python exercises/06_recipe_box_persistence.py):
    1. POST a new recipe:
       curl -X POST http://127.0.0.1:5000/recipes \
           -H "Content-Type: application/json" \
           -d "{\"title\": \"Toast\", \"ingredients\": [\"bread\"]}"
    2. Confirm GET /recipes shows it.
    3. Stop the server (Ctrl+C) and start it again.
    4. GET /recipes again. If persistence is working, your new recipe
       is still there, even though the server restarted.

A recipes.json file will appear in this folder once you run this.
That's expected; it's your saved data.
"""

import json
import os

from flask import Flask, jsonify, request

app = Flask(__name__)

RECIPES_FILE = os.path.join(os.path.dirname(__file__), "recipes.json")


# your code here: define load_recipes()


# your code here: define save_recipes(recipes)


# your code here: replace this hardcoded starting list with a call to
# load_recipes()
recipes = [
    {"id": 1, "title": "Scrambled eggs", "ingredients": ["eggs", "butter", "salt"]},
]


@app.route("/recipes", methods=["GET"])
def list_recipes():
    return jsonify(recipes)


@app.route("/recipes", methods=["POST"])
def create_recipe():
    new_recipe = request.get_json()
    next_id = max((recipe["id"] for recipe in recipes), default=0) + 1
    new_recipe["id"] = next_id
    recipes.append(new_recipe)
    # your code here: save to disk after appending
    return jsonify(new_recipe), 201


if __name__ == "__main__":
    app.run(debug=True)
