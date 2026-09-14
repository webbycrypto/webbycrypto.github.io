"""
Exercise 16: Loops (a shopping cart tally)

Task:
The list below holds the prices of every item currently in a shopping
cart. Using a `for` loop and the accumulator pattern from the notes,
calculate:

    1. `total`: the sum of every price in the cart.
    2. `expensive_count`: how many items cost more than $20 (use an if
       check inside the loop; this is a second accumulator, a running
       count instead of a running sum, started at 0 before the loop
       exactly like `total` is).

After the loop, print both results with an f-string, similar in shape
to:

    "Cart total: $58.47, items over $20: 1"

(Exact wording can differ. The point is producing both numbers
correctly, not matching this text exactly.)

Expected behavior:
With the prices below, total should be 58.47 (rounding may show slightly
differently depending on how you print it; that's fine) and
expensive_count should be 1 (only the $24.99 item is over $20). Try
adding a second expensive item to the list and confirm expensive_count
goes up to 2.
"""

cart_prices = [4.99, 12.50, 24.99, 15.99]

# your code here
