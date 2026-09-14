"""
Solution: Exercise 16, loops (a shopping cart tally)

See exercises/16_loops_shopping_cart_total.py for the task description.
"""

cart_prices = [4.99, 12.50, 24.99, 15.99]

# Two accumulators, both created before the loop starts, both at their
# own sensible starting value: 0 for a running sum, 0 for a running
# count. Creating either of these inside the loop instead of before it
# would reset it to 0 on every single pass, exactly the mistake
# notes/03-loops.md warns about.
total = 0
expensive_count = 0

for price in cart_prices:
    total = total + price
    if price > 20:
        expensive_count = expensive_count + 1

print(f"Cart total: ${total:.2f}, items over $20: {expensive_count}")

# total = 58.47, expensive_count = 1 (only 24.99 is over $20)
