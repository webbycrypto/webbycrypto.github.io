"""
Solution: Exercise 13, conditionals (a password strength checker)

See exercises/13_conditionals_password_strength.py for the task
description.
"""

password_length = 10
has_digit = True
has_uppercase = False
has_symbol = False

# Order matters, exactly like exercise 3's grade cutoffs: check the
# most specific override first (too short is always weak, full stop),
# then the hardest tier to qualify for (strong), and let anything left
# over fall through to medium.
if password_length < 8:
    rating = "weak"
elif password_length >= 12 and has_digit and has_uppercase and has_symbol:
    rating = "strong"
else:
    rating = "medium"

print(rating)

# With the values above (length 10, has_digit True, the rest False),
# it's too long for "weak" but doesn't meet the "strong" bar (length
# isn't even 12 yet, let alone all three checks passing), so it lands
# on "medium".
