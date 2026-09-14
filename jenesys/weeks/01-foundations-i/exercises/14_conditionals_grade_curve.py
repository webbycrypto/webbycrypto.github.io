"""
Exercise 14: Conditionals (a grade curve adjustment)

Task:
A teacher wants to curve a test score, because the class average came
out lower than expected. The curve gives a bigger boost to lower
scores than to already-high ones. The rule, checked in this order:

    - If the original score is below 60: add 12 curve points.
    - Otherwise, if the original score is below 80: add 6 curve points.
    - Otherwise (80 or above): add 3 curve points.

After adding curve points, the score can never go above 100. Even if
the math would push it higher, cap it at 100 (a real score cannot
exceed the maximum possible). This matters most for already-high
scores: a 99 plus 3 curve points would be 102, which isn't a valid
score, so it gets capped down to 100 instead.

Calculate `curved_score` and print both the original and curved score in
one f-string, similar in shape to:

    "Original: 55, Curved: 67"

(Exact wording can differ. The point is applying the curve rule
correctly, including the 100-point cap, not matching this text exactly.)

Expected behavior:
Test all of these (change `original_score` and rerun each time):
    original_score = 55  -> curved_score = 67   (below 60, +12)
    original_score = 75  -> curved_score = 81   (60-79, +6)
    original_score = 90  -> curved_score = 93   (80+, +3)
    original_score = 99  -> curved_score = 100  (80+, +3 would be 102,
                             capped down to 100)
    original_score = 100 -> curved_score = 100  (already at the max;
                             +3 would be 103, capped down to 100. This
                             case checks that a perfect score doesn't
                             accidentally print as 103.)
"""

original_score = 55

# your code here
