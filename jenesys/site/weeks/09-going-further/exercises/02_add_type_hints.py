"""
Exercise 2: add type hints

Task:
Below are three working functions with no type hints. Add them:
parameter types and a return type for each, matching what the
function actually does.

    def total_price(prices):
        return sum(prices)

    def find_book(title, catalog):
        for book in catalog:
            if book["title"] == title:
                return book
        return None

    def describe(title, subtitle=None):
        if subtitle is None:
            return title
        return f"{title}: {subtitle}"

find_book's return type needs to allow for the "not found" case; look
back at notes/02-type-hints.md for the syntax that covers "this or
None."

Expected behavior:
The three functions should work exactly as before (copy them in and
call each one at least once to prove it); only their signatures
change, not their logic.
"""

# your code here
