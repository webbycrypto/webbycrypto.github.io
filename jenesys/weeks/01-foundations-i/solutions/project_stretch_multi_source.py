"""
Stretch goal 2: a generic multi-source fact fetcher

See project/README.md's "Stretch goals" section for the brief this
fills in. One reasonable design, not the only correct one.

Design decision: each source is described as a small dictionary with
its own URL and its own way of digging the actual text out of that
source's specific JSON shape. The "how do I dig the text out" part is
itself a function, stored as a value in that dictionary, which lets
one shared fetch_fact() work for all three sources without needing an
if/elif chain that checks which source it's dealing with.
"""

import requests


def get_cat_fact_text(data):
    return data["fact"]


def get_advice_text(data):
    return data["slip"]["advice"]


def get_useless_fact_text(data):
    return data["text"]


SOURCES = [
    {
        "name": "Cat Facts",
        "url": "https://catfact.ninja/fact",
        "extract": get_cat_fact_text,
    },
    {
        "name": "Advice Slip",
        "url": "https://api.adviceslip.com/advice",
        "extract": get_advice_text,
    },
    {
        "name": "Useless Facts",
        "url": "https://uselessfacts.jsph.pl/random.json?language=en",
        "extract": get_useless_fact_text,
    },
]


def fetch_from_source(source):
    """
    Fetch and extract text from one source dictionary (name, url,
    extract). Returns the extracted text, or None if this specific
    source failed, printing a message that names which source failed
    without letting that failure stop the other sources from being
    tried.
    """
    try:
        response = requests.get(source["url"], timeout=5)
        response.raise_for_status()
        data = response.json()
        return source["extract"](data)
    except requests.exceptions.RequestException as error:
        print(f"[{source['name']}] request failed: {error}")
        return None
    except (KeyError, TypeError) as error:
        # A source that responded successfully but didn't have the
        # JSON shape we expected (a changed API, for example) raises
        # a KeyError or TypeError while extract() tries to dig into
        # it. That's a different failure than a network problem, so
        # it's worth its own message rather than folding it into the
        # same except block as RequestException.
        print(f"[{source['name']}] unexpected response shape: {error}")
        return None


def main():
    for source in SOURCES:
        text = fetch_from_source(source)
        if text is not None:
            print(f"[{source['name']}] {text}")


if __name__ == "__main__":
    main()
