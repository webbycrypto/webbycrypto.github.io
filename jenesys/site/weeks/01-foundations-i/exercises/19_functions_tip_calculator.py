"""
Exercise 19: Functions (splitting a restaurant bill)

Task:
Write a function called `calculate_split` that takes three parameters:
`bill_total` (required), `tip_percent` (optional, defaulting to 15, for
a 15% tip), and `split_between` (optional, defaulting to 1, meaning no
splitting). It should RETURN the amount each person owes, including
their share of the tip, rounded to 2 decimal places.

The calculation: add the tip to the bill total, then divide by the
number of people splitting it.

    total_with_tip = bill_total + (bill_total * tip_percent / 100)
    amount_per_person = total_with_tip / split_between

Then call your function three times and print each result:
    1. calculate_split(80) - just a bill total, using both defaults.
    2. calculate_split(80, 20) - a custom tip percent, default split.
    3. calculate_split(80, 20, 4) - a custom tip percent, split 4 ways.

Expected behavior:
calculate_split(80) should return 92.0 (80 plus a 15% tip of 12,
split between 1 person, i.e. not split at all).
calculate_split(80, 20) should return 96.0 (80 plus a 20% tip of 16).
calculate_split(80, 20, 4) should return 24.0 (96 total, split 4 ways).
"""

# your code here (define calculate_split)


# your code here (call it three times as described, and print each result)
