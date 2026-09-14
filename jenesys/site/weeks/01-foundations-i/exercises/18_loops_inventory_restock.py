"""
Exercise 18: Loops (checking inventory for restocking)

Task:
The list below describes a small shop's inventory. Each item is itself
a small list of three things, in this fixed order: [name, quantity,
reorder_level]. You can pull a piece out of a small list like this
using square brackets and its position, counting from 0: if `item` is
["Widgets", 5, 10], then item[0] is "Widgets", item[1] is 5, and item[2]
is 10. This is the same square-bracket idea you've already seen used to
grab one character out of a string; it works the same way on a list.

Using a `for` loop over `inventory`, for each item, check whether its
quantity (item[1]) is less than its reorder_level (item[2]). If so, that
item needs restocking: print its name with a message, and add 1 to a
running counter called `restock_count` (started at 0 before the loop,
the same accumulator pattern as previous loop exercises).

After the loop, print the total count, similar in shape to:

    "Widgets needs restocking (5 left, reorder at 10)"
    "Bolts needs restocking (3 left, reorder at 20)"
    "2 item(s) need restocking."

(Exact wording can differ. The point is correctly identifying which
items are below their reorder level and counting them, not matching
this text exactly.)

Expected behavior:
With the inventory below, exactly 2 items should need restocking
(Widgets: 5 < 10, and Bolts: 3 < 20). Gadgets should NOT be flagged,
since 12 is not less than 8. Try changing Gadgets' quantity to 3 and
confirm restock_count goes up to 3.
"""

inventory = [
    ["Widgets", 5, 10],
    ["Gadgets", 12, 8],
    ["Bolts", 3, 20],
]

# your code here
