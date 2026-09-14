"""
Solution: Exercise 18, loops (checking inventory for restocking)

See exercises/18_loops_inventory_restock.py for the task description.
"""

inventory = [
    ["Widgets", 5, 10],
    ["Gadgets", 12, 8],
    ["Bolts", 3, 20],
]

restock_count = 0

for item in inventory:
    # item[0] is the name, item[1] is the current quantity, item[2] is
    # the reorder level. Pulling these into their own named variables
    # here isn't strictly required, but it makes the comparison below
    # far easier to read than item[1] < item[2] would be on its own.
    name = item[0]
    quantity = item[1]
    reorder_level = item[2]

    if quantity < reorder_level:
        print(f"{name} needs restocking ({quantity} left, reorder at {reorder_level})")
        restock_count = restock_count + 1

print(f"{restock_count} item(s) need restocking.")

# Widgets: 5 < 10, flagged. Gadgets: 12 < 8 is False, not flagged.
# Bolts: 3 < 20, flagged. restock_count ends at 2.
