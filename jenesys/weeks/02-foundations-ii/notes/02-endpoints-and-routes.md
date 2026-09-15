# Endpoints and routes

[← Back to Week 2: Foundations II and first project](../README.md)

## TL;DR

This page covers what an endpoint is, how one route can handle more than one HTTP method, and how to read data coming in through a URL or a request body.

- An endpoint is one specific URL path plus one specific HTTP method. The same path can mean two different things depending on the method, like GET (read) versus POST (create).
- Add `methods=[...]` to `@app.route(...)` to make a path respond to something other than GET, its default.
- `jsonify(...)` converts a Python list or dictionary into a proper JSON response, and `request.get_json()` does the reverse, reading the JSON body a client sent in.
- Returning `(body, status_code)`, like `jsonify(new_task), 201`, lets you send back a specific status code instead of Flask's default `200`.
- A path parameter like `<int:task_id>` captures part of the URL as a variable and converts it to the type you asked for, here an `int` instead of a plain string.
- If a lookup function falls through without hitting a `return`, it silently gives back `None`, which is the exact gap the next note fixes with proper error handling.

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

tasks = [
    {"id": 1, "title": "Write report"},
]


@app.route("/tasks", methods=["GET"])
def list_tasks():
    return jsonify(tasks)


@app.route("/tasks", methods=["POST"])
def create_task():
    new_task = request.get_json()
    tasks.append(new_task)
    return jsonify(new_task), 201


@app.route("/tasks/<int:task_id>")
def get_task(task_id):
    for task in tasks:
        if task["id"] == task_id:
            return jsonify(task)
```

## What an endpoint is

An **endpoint** is a specific, named place in your API that a client can send a request to, to get a specific kind of result. If an API is a menu (the analogy from Week 1's notes), an endpoint is one line item on that menu: "GET `/notes` gives you the full list of notes," "POST `/notes` creates a new one." Each endpoint is defined by two things together: a URL path (like `/notes`) and an HTTP method (like GET or POST). The same path can mean two different things depending on the method: GET `/notes` (read the list) and POST `/notes` (create a new entry) are two separate endpoints that happen to share a path.

In Flask, you define an endpoint by decorating a function with `@app.route(...)`, exactly as in the previous note. The word **route** refers to this same thing from the framework's point of view: it's the rule that routes ("directs") an incoming request to the right function based on its path and method.

## Handling more than one HTTP method

By default, `@app.route("/notes")` only responds to GET requests. To also handle POST on the same path, tell the decorator explicitly which methods it should respond to:

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

notes = [
    {"id": 1, "text": "Buy milk"},
    {"id": 2, "text": "Walk the dog"},
]


@app.route("/notes", methods=["GET"])
def list_notes():
    return jsonify(notes)


@app.route("/notes", methods=["POST"])
def create_note():
    new_note = request.get_json()
    notes.append(new_note)
    return jsonify(new_note), 201
```

A few new pieces here, worth unpacking one at a time.

`jsonify(notes)` converts a Python list or dictionary into a proper JSON HTTP response (recall from Week 1: JSON is just structured text). You almost always want `jsonify(...)` rather than returning a plain Python list or dict directly from most other frameworks, since the client on the other end needs an actual JSON-formatted response, not Python's internal representation of the data.

`request.get_json()` reads the JSON body the client sent along with its POST request, and converts it into a Python dictionary, the mirror image of what `jsonify()` does on the way out. `request` here is an object Flask provides that represents the incoming request currently being handled; you `import` it from `flask` alongside `Flask` itself.

`return jsonify(new_note), 201` returns two things: the response body, and a status code (`201`, meaning "Created," the conventional status code for a successful POST that created something new, as opposed to `200`, generally used for a successful GET). If you don't specify a status code, Flask defaults to `200`. Being deliberate about status codes matters: a client (a person's browser, or another program calling your API) uses that number to know whether to treat the request as successful, and if not, roughly what kind of failure it was, without needing to parse your response body just to find out.

## Path parameters: endpoints with a variable piece

Often you want an endpoint for one specific item, identified by something in the URL itself, like `/notes/2` meaning "the note with id 2." Flask lets you capture part of the path as a variable:

```python
@app.route("/notes/<int:note_id>")
def get_note(note_id):
    for note in notes:
        if note["id"] == note_id:
            return jsonify(note)
```

`<int:note_id>` tells Flask: "this part of the path is a variable, convert it to an `int`, and pass it into the function as the parameter `note_id`." Visit `/notes/2`, and Flask calls `get_note(2)`, with `note_id` already converted from the text `"2"` in the URL into the actual integer `2`, ready to compare against the `id` values already stored as integers in your `notes` list. Without the `int:` type converter, `note_id` would arrive as the string `"2"` instead, and comparing a string to an int with `==` would always be `False`, even when they "look" the same, a subtle version of the type-mismatch issue from Week 1's notes on variables.

Notice the function above has a real problem: if no note matches `note_id`, it falls through without ever hitting a `return` at all, which (as you learned in Week 1) means it implicitly returns `None`. Flask doesn't know what to do with `None` as a response and will raise its own error. This exact gap, an endpoint that doesn't yet handle the "not found" case on purpose, is precisely what the next note (`03-persistence.md`'s companion, `04-error-handling.md`) and this week's exercises walk you through fixing properly.

## What to watch for

- Forgetting `jsonify(...)` and returning a raw Python list or dict directly. Depending on your Flask version this sometimes still works, but rely on `jsonify()` deliberately rather than by accident.
- Forgetting to specify `methods=["POST"]` (or the right method) on a route, then being confused why your POST request gets rejected with a "Method Not Allowed" error; by default a route only accepts GET.
- Mixing up the path parameter's type. `<note_id>` alone captures it as a string; `<int:note_id>` converts it to an int. If you're comparing IDs and it never seems to match, check whether you're comparing a string to an int.
- Writing a lookup function (like `get_note` above) that has no `return` at all on the "not found" path, silently returning `None`. This is the error case you're expected to fix deliberately, not an accident to leave in.
