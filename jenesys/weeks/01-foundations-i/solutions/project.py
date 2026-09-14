"""
Solution: Week 1 project, calling a public API

See project/README.md for the full walkthrough and project/starter.py
for the file this fills in.
"""

import requests

API_URL = "https://catfact.ninja/fact"


def get_cat_fact():
    """
    Request one random cat fact from the API and return just the fact
    text as a string, or None if the request failed for any reason.

    Wrapping the request in try/except means a temporary network
    problem, a slow server, or an unexpected server error doesn't
    crash the whole script with a raw traceback. Instead, we print a
    clear, human-readable message and return None, letting the rest
    of the program decide what to do about that (in this case, main()
    just does nothing further).
    """
    try:
        # timeout=5 means: if the server hasn't responded within 5
        # seconds, give up and raise an exception rather than hanging
        # indefinitely.
        response = requests.get(API_URL, timeout=5)

        # raise_for_status() raises an exception if the status code
        # indicates a failure (like a 404 or 500), saving us from
        # manually checking response.status_code ourselves.
        response.raise_for_status()

        # .json() converts the raw JSON text the server sent back
        # into a Python dictionary we can work with normally.
        data = response.json()

        return data["fact"]

    except requests.exceptions.RequestException as error:
        # This catches connection problems, timeouts, and the
        # exception raised by raise_for_status(), all in one place.
        # `error` holds details about exactly what went wrong, which
        # we include in the message rather than hiding it.
        print(f"Couldn't fetch a cat fact right now: {error}")
        return None


def main():
    fact = get_cat_fact()

    # Only print a fact sentence if we actually got one back. If
    # get_cat_fact() returned None, it already printed its own
    # failure message, so there's nothing left to do here.
    if fact is not None:
        print(f"Cat fact: {fact}")


if __name__ == "__main__":
    main()
