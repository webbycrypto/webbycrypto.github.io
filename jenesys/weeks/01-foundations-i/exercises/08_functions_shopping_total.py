"""
Exercise 8: Functions (default arguments)

Task:
Write a function called `calculate_total` that takes two parameters:
`price` (required), and `tax_rate` (optional, defaulting to 0.08, an 8%
default sales tax). It should RETURN the total price including tax,
rounded to 2 decimal places (look up Python's built-in `round()`
function if you haven't used it yet: round(value, 2)).

Then call your function twice: once with just a price (using the default
tax rate), and once passing a different tax rate explicitly. Print both
results.

Expected behavior:
calculate_total(100) should return 108.0 (100 plus 8% tax).
calculate_total(100, 0.05) should return 105.0 (100 plus 5% tax).

Note: this exercise uses a plain number as the default argument
(tax_rate=0.08), which is completely safe. The notes covered why a
*mutable* default argument, like a list or dictionary, is a trap; a
default number like this one doesn't have that problem, since numbers
can't be modified in place the way lists can.
"""

# your code here (define calculate_total)


# your code here (call it twice and print both results)
