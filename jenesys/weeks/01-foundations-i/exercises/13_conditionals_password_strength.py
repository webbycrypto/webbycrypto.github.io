"""
Exercise 13: Conditionals (a password strength checker)

Task:
A real password strength checker would inspect the actual characters in
a password. This exercise gives you that inspection already done, as
three variables, and asks you to focus purely on the conditional logic
that turns those facts into a strength rating. That inspection step
(actually checking a string character by character) is exactly what
you'll be able to do yourself once you've covered loops in the next
note; for now, treat has_digit, has_uppercase, and has_symbol as if some
other part of a bigger program already figured them out for you.

Using if/elif/else, classify the password into exactly one of three
strength levels, using this rule set, checked in this order:

    1. If password_length is less than 8: "weak", no matter what else
       is true. A short password is weak even if it happens to contain
       a digit, an uppercase letter, and a symbol.
    2. Otherwise, if password_length is at least 12 AND all three of
       has_digit, has_uppercase, and has_symbol are True: "strong".
    3. Otherwise (length is at least 8, but it didn't qualify as
       strong): "medium".

Print just the rating, e.g. print("medium").

Expected behavior:
Try all of these combinations (change the variables below and rerun
each time) to check every branch:
    password_length=5,  has_digit=True,  has_uppercase=True,  has_symbol=True   -> "weak"  (too short, everything else irrelevant)
    password_length=10, has_digit=True,  has_uppercase=False, has_symbol=False  -> "medium" (long enough, but doesn't have all three)
    password_length=14, has_digit=True,  has_uppercase=True,  has_symbol=True   -> "strong"
    password_length=9,  has_digit=False, has_uppercase=False, has_symbol=False  -> "medium" (long enough for medium, but not 12+ so it can't be strong regardless of the other three)
"""

password_length = 10
has_digit = True
has_uppercase = False
has_symbol = False

# your code here
