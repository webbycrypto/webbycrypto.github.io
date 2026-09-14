"""
Exercise 4: Conditionals (combining conditions)

Task:
The variable `year` holds a four-digit year. Determine whether it's a leap
year, and print either "leap year" or "not a leap year".

The actual rule for leap years (this is the tricky, real rule, not a
simplified version):
    - A year is a leap year if it's divisible by 4...
    - ...EXCEPT if it's divisible by 100, in which case it's NOT a leap
      year...
    - ...UNLESS it's also divisible by 400, in which case it IS a leap
      year after all.

So: 2000 was a leap year (divisible by 400). 1900 was NOT a leap year
(divisible by 100, but not by 400). 2024 was a leap year (divisible by 4,
not by 100 at all).

Hint: to check whether one number divides evenly into another, use the
modulo operator `%`, which gives you the remainder of a division.
`year % 4 == 0` means "year divides evenly by 4, with no remainder."
You'll need to combine a few of these checks with `and`/`or`.

Expected behavior:
Test your code against at least these three years by changing the `year`
variable and rerunning: 2000 (leap year), 1900 (not a leap year), 2024
(leap year).
"""

year = 2024

# your code here
