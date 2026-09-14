"""
Exercise 2: loading a history file that might not exist, or might be
broken, without crashing either way.

notes/01-persistence.md's "Loading back in: expect the file to
sometimes be wrong" section names three real situations a history
loader has to survive: no file yet (first-ever run), an empty file, and
a file containing something that isn't valid JSON (a previous run that
crashed mid-write). This exercise builds and tests a small
load_history() function against all three, on a throwaway file in a
temporary folder, so you've deliberately caused and handled each case
once before it happens for real, unannounced, in your Week 7 project.

No API key or network call is needed; this is pure Python file I/O
and the standard `json` module.

Run it with:
    python 02_load_corrupted_history.py
"""

import json
import os
import tempfile


def load_history(path: str) -> list:
    """Return the saved message history at `path`, or a fresh, empty
    history, with a printed explanation of which case happened. Never
    raises for any of the three cases this exercise tests.
    """
    if not os.path.exists(path):
        print(f"  No history file at {path} yet. Starting a fresh conversation.")
        return []

    with open(path, "r", encoding="utf-8") as f:
        raw_text = f.read()

    if not raw_text.strip():
        print(f"  History file at {path} exists but is empty. Starting fresh.")
        return []

    try:
        history = json.loads(raw_text)
    except json.JSONDecodeError as e:
        print(f"  History file at {path} is not valid JSON ({e}). Starting fresh, old file left alone.")
        return []

    if not isinstance(history, list):
        print(f"  History file at {path} parsed, but wasn't a list ({type(history).__name__}). Starting fresh.")
        return []

    print(f"  Loaded {len(history)} saved message(s) from {path}.")
    return history


def run_case(label: str, setup, tmp_dir: str):
    path = os.path.join(tmp_dir, "history.json")
    setup(path)
    print(f"{label}:")
    result = load_history(path)
    print(f"  -> returned: {result}\n")


if __name__ == "__main__":
    with tempfile.TemporaryDirectory() as tmp_dir:

        def case_missing(path):
            if os.path.exists(path):
                os.remove(path)

        def case_empty(path):
            with open(path, "w", encoding="utf-8") as f:
                f.write("")

        def case_corrupted(path):
            with open(path, "w", encoding="utf-8") as f:
                f.write('{"role": "user", "content": "oops, cut off mid-wri')  # deliberately broken JSON

        def case_valid(path):
            with open(path, "w", encoding="utf-8") as f:
                json.dump(
                    [
                        {"role": "user", "content": "What's my wifi password?"},
                        {"role": "assistant", "content": "It's on the sticker under the router."},
                    ],
                    f,
                )

        run_case("Case 1: file doesn't exist (first-ever run)", case_missing, tmp_dir)
        run_case("Case 2: file exists but is empty", case_empty, tmp_dir)
        run_case("Case 3: file exists but contains broken JSON", case_corrupted, tmp_dir)
        run_case("Case 4: file exists and is genuinely valid", case_valid, tmp_dir)

    # --- What to notice ---
    #
    # All four cases print a return value and none of them raise an
    # exception up to this script's top level. That's the floor, not
    # the whole bar: notice that each case ALSO prints a specific,
    # honest, different sentence explaining exactly what happened and
    # what load_history() decided to do about it. A version of this
    # function that caught every error with a bare `except: return []`
    # would also avoid crashing, but it would print nothing, and Case 2
    # (an empty file) would look identical to Case 3 (a genuinely
    # corrupted one) to anyone reading the program's output, even
    # though they're different situations worth telling apart.
    #
    # Try this: add a Case 5, a file containing valid JSON that parses
    # fine, but is a JSON OBJECT instead of a JSON list (something like
    # writing `{"oops": "wrong shape"}` to the file). Does the
    # `isinstance(history, list)` check above catch it, or does it slip
    # through and cause a confusing error later, the first time
    # something tries to call `.append()` or iterate over what it
    # assumed was a list of messages?
