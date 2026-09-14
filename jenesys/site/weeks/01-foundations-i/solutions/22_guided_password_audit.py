"""
Solution: Exercise 22, guided walkthrough, a password audit report

See exercises/22_guided_password_audit.md for the full walkthrough.
"""

passwords = [
    "abc123",
    "Str0ngP@ssw0rd!",
    "hunter2",
    "correct-horse-battery-staple",
    "1234",
    "Tr0ub4dor&3",
]


def classify(password):
    length = len(password)
    if length < 8:
        return "weak"
    elif length >= 12:
        return "strong"
    else:
        return "medium"


weak_count = 0
medium_count = 0
strong_count = 0

for password in passwords:
    rating = classify(password)
    print(f"{password}: {rating}")

    if rating == "weak":
        weak_count = weak_count + 1
    elif rating == "medium":
        medium_count = medium_count + 1
    else:
        strong_count = strong_count + 1

total = len(passwords)
print(f"\n{weak_count} weak, {medium_count} medium, {strong_count} strong (out of {total})")

percent_weak = (weak_count / total) * 100
print(f"{percent_weak:.0f}% of these passwords are weak.")
