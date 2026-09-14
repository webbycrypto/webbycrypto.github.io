"""
Stretch goal 3: an interactive fetch loop

See project/README.md's "Stretch goals" section for the brief this
fills in. One reasonable design, not the only correct one.
"""

import requests

API_URL = "https://catfact.ninja/fact"


def get_cat_fact():
    try:
        response = requests.get(API_URL, timeout=5)
        response.raise_for_status()
        data = response.json()
        return data["fact"]
    except requests.exceptions.RequestException as error:
        print(f"Couldn't fetch a cat fact right now: {error}")
        return None


def main():
    fetch_count = 0

    while True:
        fact = get_cat_fact()
        if fact is not None:
            fetch_count += 1
            print(f"Cat fact: {fact}")

        # input() pauses the script here and waits for the person
        # running it to type something and press Enter. Whatever they
        # typed comes back as a string, which is why we lowercase it
        # before comparing, so "Y", "y", and " y " (with stray spaces,
        # handled by .strip()) all count as the same answer.
        answer = input("Fetch another fact? (y to continue, anything else to stop): ")
        if answer.strip().lower() != "y":
            break

    print(f"Session ended. Fetched {fetch_count} fact(s) total.")


if __name__ == "__main__":
    main()
