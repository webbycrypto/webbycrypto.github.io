"""
Solution: Exercise 4, conditionals (combining conditions)

See exercises/04_conditionals_leap_year.py for the task description.
"""

year = 2024

# Break the real leap year rule into three separate yes/no checks
# first, then combine them, rather than trying to write one giant
# condition in one shot.
divisible_by_4 = year % 4 == 0
divisible_by_100 = year % 100 == 0
divisible_by_400 = year % 400 == 0

# The rule in plain English: divisible by 4, AND NOT divisible by 100,
# UNLESS it's also divisible by 400.
#
# divisible_by_4 and not divisible_by_100   handles the general case
#   and the "except every 100 years" exception.
# or divisible_by_400                        adds back the "unless
#   every 400 years" exception on top of that.
is_leap_year = (divisible_by_4 and not divisible_by_100) or divisible_by_400

if is_leap_year:
    print("leap year")
else:
    print("not a leap year")

# Trace through the three test cases from the exercise by hand, to
# confirm the logic actually matches the rule:
#   2000: divisible_by_4=True, divisible_by_100=True, divisible_by_400=True
#         (True and not True) or True  ->  (True and False) or True
#         -> False or True -> True (leap year, correct)
#   1900: divisible_by_4=True, divisible_by_100=True, divisible_by_400=False
#         (True and not True) or False -> False or False -> False
#         (not a leap year, correct)
#   2024: divisible_by_4=True, divisible_by_100=False, divisible_by_400=False
#         (True and not False) or False -> (True and True) or False
#         -> True or False -> True (leap year, correct)
