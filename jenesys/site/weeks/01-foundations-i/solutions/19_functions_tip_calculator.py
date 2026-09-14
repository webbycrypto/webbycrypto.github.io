"""
Solution: Exercise 19, functions (splitting a restaurant bill)

See exercises/19_functions_tip_calculator.py for the task description.
"""


def calculate_split(bill_total, tip_percent=15, split_between=1):
    """
    Return how much each person owes, including their share of the
    tip, rounded to 2 decimal places.

    Both tip_percent and split_between are plain numbers, not mutable
    values like a list or dict, so defaulting them directly here is
    completely safe; this doesn't run into the mutable default
    argument trap from the notes.
    """
    total_with_tip = bill_total + (bill_total * tip_percent / 100)
    amount_per_person = total_with_tip / split_between
    return round(amount_per_person, 2)


# Call 1: relies on both defaults (15% tip, no splitting).
result_1 = calculate_split(80)

# Call 2: custom tip percent, default split (still 1 person).
result_2 = calculate_split(80, 20)

# Call 3: custom tip percent AND custom split.
result_3 = calculate_split(80, 20, 4)

print(result_1)   # 92.0
print(result_2)   # 96.0
print(result_3)   # 24.0
