"""
Week 1 project: call a public API

Goal: send a GET request to the Cat Facts API (https://catfact.ninja/fact),
parse the JSON response, and print the fact in a readable sentence.
Handle the case where the request fails, instead of letting the script
crash.

Read project/README.md for the full walkthrough if you get stuck. Compare
against solutions/project.py once you've made a real attempt.
"""

import requests

API_URL = "https://catfact.ninja/fact"


def get_cat_fact():
    """
    Request one random cat fact from the API and return just the fact
    text as a string.

    Should return None (and print a helpful message) if the request
    fails for any reason, instead of letting an exception crash the
    program.
    """
    # your code here
    pass


def main():
    # your code here:
    # call get_cat_fact(), and if it returned something (not None),
    # print it in a readable sentence. If it returned None, the failure
    # message was already printed inside get_cat_fact(), so there's
    # nothing more to do here.
    pass


if __name__ == "__main__":
    main()
