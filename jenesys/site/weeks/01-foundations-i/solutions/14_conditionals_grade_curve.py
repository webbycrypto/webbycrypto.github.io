"""
Solution: Exercise 14, conditionals (a grade curve adjustment)

See exercises/14_conditionals_grade_curve.py for the task description.
"""

original_score = 55

if original_score < 60:
    curve_points = 12
elif original_score < 80:
    curve_points = 6
else:
    curve_points = 3

# Calculate the curved score first, then apply the cap as a completely
# separate step afterward. Trying to fold the cap into the if/elif
# chain above would make the tier logic harder to read for no benefit;
# min(x, 100) is a clean, separate way to say "but never more than
# 100," applied once, after the tier decision is already made.
curved_score = min(original_score + curve_points, 100)

print(f"Original: {original_score}, Curved: {curved_score}")

# original_score = 55 -> curve_points = 12 -> curved_score = 67.
#
# min(a, b) is a built-in function that returns whichever of the two
# values is smaller. original_score + curve_points is 67 here, and
# min(67, 100) is 67, since 67 is smaller. But for original_score = 99
# with curve_points = 3, original_score + curve_points is 102, and
# min(102, 100) is 100, since 100 is smaller: that's the cap actually
# doing something. Try changing original_score to 99 or 100 above and
# rerun to see the cap kick in.
