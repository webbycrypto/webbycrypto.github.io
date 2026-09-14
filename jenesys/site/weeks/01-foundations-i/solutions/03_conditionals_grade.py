"""
Solution: Exercise 3, conditionals

See exercises/03_conditionals_grade.py for the task description.
"""

score = 84

# Order matters here. We check from the highest cutoff down to the
# lowest. Because Python stops at the first true condition in an
# if/elif chain, a score of 95 correctly matches only the first branch
# (>= 90) even though it's also technically >= 80; it never even
# reaches that second check, since the chain already stopped.
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(grade)

# Boundary check: score = 90 should print "A" (not "B"), because we
# used >= rather than >. score = 89 should print "B". If you'd
# accidentally used > instead of >=, a score of exactly 90 would fall
# through to the "B" branch, which would be a real, easy-to-miss bug.
