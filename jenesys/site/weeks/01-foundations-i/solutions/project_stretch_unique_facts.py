"""
Stretch goal 1: fetch until you have 5 unique cat facts

See project/README.md's "Stretch goals" section for the brief this
fills in. One reasonable design, not the only correct one.
"""

import requests

API_URL = "https://catfact.ninja/fact"
TARGET_COUNT = 5
MAX_ATTEMPTS = 15


def fetch_one_fact():
    """
    Request one fact from the API. Returns the fact text, or None if
    the request failed for any reason. Same shape as the main
    project's get_cat_fact(), reused here as the building block for
    the loop below instead of being duplicated.
    """
    try:
        response = requests.get(API_URL, timeout=5)
        response.raise_for_status()
        data = response.json()
        return data["fact"]
    except requests.exceptions.RequestException as error:
        print(f"A request failed, skipping this attempt: {error}")
        return None


def collect_unique_facts(target_count, max_attempts):
    """
    Keep fetching facts until `target_count` distinct ones have been
    collected, or `max_attempts` fetches have happened, whichever
    comes first.

    This while loop's condition depends on two separate things at
    once: do we have enough facts yet, AND have we tried too many
    times. Either one becoming true stops the loop; without the
    attempts cap, a long unlucky streak of the API returning the same
    fact repeatedly (or repeated failed requests) could in principle
    keep this loop running for a very long time.
    """
    unique_facts = []
    attempts = 0

    while len(unique_facts) < target_count and attempts < max_attempts:
        attempts += 1
        fact = fetch_one_fact()

        # A failed request (fact is None) or a fact we've already
        # collected both just mean "this attempt didn't add anything
        # new," so we skip straight to the next loop iteration without
        # treating either as a reason to stop entirely.
        if fact is None:
            continue
        if fact in unique_facts:
            continue

        unique_facts.append(fact)

    return unique_facts


def main():
    facts = collect_unique_facts(TARGET_COUNT, MAX_ATTEMPTS)

    if len(facts) < TARGET_COUNT:
        print(
            f"Only found {len(facts)} unique fact(s) after {MAX_ATTEMPTS} "
            f"attempts; that's fewer than the {TARGET_COUNT} requested."
        )

    for index, fact in enumerate(facts, start=1):
        print(f"{index}. {fact}")


if __name__ == "__main__":
    main()
