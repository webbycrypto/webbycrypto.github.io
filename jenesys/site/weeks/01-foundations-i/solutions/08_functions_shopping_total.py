"""
Solution: Exercise 8, functions (default arguments)

See exercises/08_functions_shopping_total.py for the task description.
"""


def calculate_total(price, tax_rate=0.08):
    """
    Return the total price including tax, rounded to 2 decimal
    places. tax_rate defaults to 0.08 (8%) if the caller doesn't
    provide one.

    This default is a plain float, not a list or dictionary, so it
    does NOT run into the mutable default argument trap from the
    notes. A number can't be modified in place the way a list can;
    every use of tax_rate here just reads its value, it's never
    mutated, so reusing the same default value across calls is
    completely safe.
    """
    total = price * (1 + tax_rate)
    return round(total, 2)


# First call relies on the default tax rate (0.08).
default_total = calculate_total(100)

# Second call overrides it explicitly with 0.05 (5%).
custom_total = calculate_total(100, 0.05)

print(default_total)   # 108.0
print(custom_total)    # 105.0
