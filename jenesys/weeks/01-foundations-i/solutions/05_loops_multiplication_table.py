"""
Solution: Exercise 5, loops (for)

See exercises/05_loops_multiplication_table.py for the task description.
"""

number = 3

# We want the multiplier to run through 1, 2, 3, ..., 12 inclusive.
# range(1, 13) starts at 1 and stops BEFORE 13, which means it
# produces exactly 1 through 12. Writing range(1, 12) would be a
# classic off-by-one mistake here: it would stop one short, at 11,
# and you'd never see the "x 12" line at all.
for multiplier in range(1, 13):
    result = number * multiplier
    print(f"{number} x {multiplier} = {result}")
