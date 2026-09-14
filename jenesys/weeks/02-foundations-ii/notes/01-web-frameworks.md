# Web frameworks

[← Back to Week 2: Foundations II and first project](../README.md)

## What a web framework actually is

In Week 1, your Python script was the *client*: it sent a request out to someone else's server and handled the response. This week, you flip roles and build the *server* yourself: a program that sits and waits for requests, and sends back responses.

You could, in principle, build a server completely from scratch, writing code that opens a network connection, listens for raw incoming bytes, figures out on its own that those bytes represent an HTTP request, parses the method and the URL out of that text by hand, and constructs a properly-formatted HTTP response byte by byte to send back. This is possible, and it's roughly what programmers actually did decades ago. It is also enormously repetitive: every single server, no matter what it actually does, needs this same groundwork done first.

A **web framework** is a library that already did all of that groundwork for you. It handles parsing incoming requests and formatting outgoing responses, and it gives you a clean way to say "when a request comes in for this specific URL, run this specific function," so you can focus entirely on what your application actually needs to do, not on the mechanics of speaking HTTP correctly. Think of it like buying a stove instead of forging one from raw metal: you still have to know how to cook, but you're not reinventing heat regulation and gas lines from scratch just to make dinner.

This program uses **Flask**, a small, popular Python web framework, specifically because it's minimal: there's very little "magic" hidden from you, and the mapping between your code and what actually happens over HTTP stays close to the surface, which matters a lot while you're still building your mental model of how any of this works. (FastAPI is another widely used Python framework you'll see mentioned elsewhere; it adds automatic data validation and interactive documentation on top of similar underlying ideas, but that extra machinery is more to understand up front than is worth it for your first-ever web service. Flask now is a deliberate choice to keep the moving parts visible.)

## A minimal Flask app

```python
from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, world!"


if __name__ == "__main__":
    app.run(debug=True)
```

Walk through this line by line. `app = Flask(__name__)` creates your application object; `__name__` here is the same built-in variable from Week 1's project note, and Flask uses it internally to figure out where your project's files live. Nearly every Flask app starts this way.

`@app.route("/")` is a **decorator**, a piece of syntax that attaches extra behavior to the function defined right below it, without you needing to understand decorators deeply yet. In plain terms: this line tells Flask, "whenever a request comes in for the URL path `/` (the root of the site), call the `home()` function below, and send back whatever it returns as the response." The function name (`home`) doesn't matter to Flask at all; what matters is the decorator above it, which is what actually connects a URL to this function.

`app.run(debug=True)` starts the server, so it actually begins listening for requests. `debug=True` turns on two developer-friendly behaviors while you're building: the server automatically restarts itself whenever you save a code change (instead of you having to stop and restart it by hand every time), and if your code raises an unhandled error while handling a request, Flask shows you a detailed error page with the traceback right in the browser, instead of just a blank failure. Never leave `debug=True` on for a real, publicly deployed app (that detailed error page can leak information you don't want strangers to see), but it's exactly what you want while developing on your own machine.

## Running it and trying it out

Save this as `app.py` and run it the same way you ran any Week 1 script:

```
python app.py
```

You'll see output telling you the server is running, usually pointing at an address like `http://127.0.0.1:5000`. `127.0.0.1` is a special address that always means "this same computer" (sometimes called `localhost`); `5000` is the **port**, a number identifying which specific service on this computer you're reaching, since one computer could be running several servers at once. Open that address in a browser, or visit it from a second terminal using `curl http://127.0.0.1:5000`, and you'll see `Hello, world!`, the exact string `home()` returned.

To stop the server, go back to the terminal it's running in and press `Ctrl+C`. The terminal is busy running the server the whole time it's up, so you won't be able to type other commands into that same terminal window until you stop it (or open a second terminal tab/window alongside it).

## What to watch for

- Confusing the framework (Flask) with the language (Python). Flask is a library you `import`, like `requests` in Week 1; it doesn't replace anything you already learned about variables, functions, or conditionals, it just gives you tools specifically for handling web requests.
- Leaving the server running in a terminal and then being confused that the terminal "won't accept commands." It's busy; stop it with `Ctrl+C` first, or use a separate terminal tab.
- Forgetting to save the file before checking your browser. With `debug=True`, Flask reloads on save, but only once you've actually saved.
