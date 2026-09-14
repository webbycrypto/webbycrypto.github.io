"""
Solution: Exercise 9, guided grade report walkthrough

See exercises/09_guided_grade_report.md for the step-by-step version
this builds up from, one line at a time. This file is the same program,
assembled, so you can compare your own typed-out version against it.
"""

scores = [92, 78, 65, 88, 54, 73]


def grade_for(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"


total = 0

for score in scores:
    letter = grade_for(score)
    total = total + score
    print(f"{score} -> {letter}")

average = total / len(scores)
print(f"\nClass average: {average:.1f}")
