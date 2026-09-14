# Guided walkthrough: a password audit report, line by line

[← Back to Week 1 exercises](README.md)

Exercise 09 (`09_guided_grade_report.md`) was your first guided walkthrough: variables, a function, an accumulator, a loop, and a final calculation, combined into one small program, typed one small step at a time. This is a second one, in a different domain (checking password strength across a list, instead of scores), because reading through code someone else wrote and typing new code from a specific, careful set of instructions use different muscles, and this phase of the program wants you to have real practice at both, not just one.

Open `22_guided_password_audit.py` (it starts nearly empty) and type each step below into it yourself, in order. Don't paste; typing it is part of the point, the same as it was in exercise 09. Run the file after every step (`python 22_guided_password_audit.py`) so you watch it grow.

## Step 1: the data

```python
passwords = [
    "abc123",
    "Str0ngP@ssw0rd!",
    "hunter2",
    "correct-horse-battery-staple",
    "1234",
    "Tr0ub4dor&3",
]
```

Six passwords in a list, exactly the same shape as the `scores` list from exercise 09, just holding strings instead of numbers. Run the file; nothing prints yet, and that's expected.

## Step 2: a function that rates one password

```python
def classify(password):
    length = len(password)
    if length < 8:
        return "weak"
    elif length >= 12:
        return "strong"
    else:
        return "medium"
```

This is a simplified version of exercise 13's password strength logic, using only length (exercise 13's version also checked for digits, uppercase letters, and symbols; this guided version deliberately leaves those out, to keep this walkthrough's steps small and focused). `len(password)` counts how many characters are in the string, the exact same `len()` you've already used on lists in `notes/03-loops.md`; it works the same way on a string, counting characters instead of list items. Run the file again. Still no output: defining a function doesn't run it.

## Step 3: three accumulators, one per rating

```python
weak_count = 0
medium_count = 0
strong_count = 0
```

Three separate running counts, all starting at 0, all created *before* the loop below, the same accumulator pattern from `notes/03-loops.md`, just three of them side by side instead of one. Creating any of these inside the loop instead of here would reset it to 0 on every single pass.

## Step 4: the loop that rates every password

```python
for password in passwords:
    rating = classify(password)
    print(f"{password}: {rating}")

    if rating == "weak":
        weak_count = weak_count + 1
    elif rating == "medium":
        medium_count = medium_count + 1
    else:
        strong_count = strong_count + 1
```

For each password: call the function from Step 2 to get its rating, print it, then add 1 to whichever of the three counters matches that rating. This if/elif/else inside a for loop is the same combination exercise 18's inventory check used: a decision made fresh on every single pass through the loop, not once for the whole list. Run the file now. You should see six lines print, one per password, each with its rating.

## Step 5: the summary, after the loop ends

```python
total = len(passwords)
print(f"\n{weak_count} weak, {medium_count} medium, {strong_count} strong (out of {total})")
```

Not indented under the `for`, so these two lines run once, after all six passes finish, using whatever the three counters ended up holding.

## Step 6: one more calculation, a percentage

```python
percent_weak = (weak_count / total) * 100
print(f"{percent_weak:.0f}% of these passwords are weak.")
```

`weak_count / total` gives a fraction (a number between 0 and 1); multiplying by 100 turns that fraction into a percentage. `:.0f` inside the f-string means "show this as a whole number, no decimal places" (compare to `:.1f` from exercise 09, which kept one decimal place; `f` always means "format as a fixed-point number," and the digit before it controls how many decimal places show).

## What your output should look like

```
abc123: weak
Str0ngP@ssw0rd!: strong
hunter2: weak
correct-horse-battery-staple: strong
1234: weak
Tr0ub4dor&3: medium

3 weak, 1 medium, 2 strong (out of 6)
50% of these passwords are weak.
```

If yours matches, compare against `solutions/22_guided_password_audit.py` anyway, for the same reason exercise 09 told you to: not to check correctness, but to see these six steps written as one continuous file.

## What you just did

Same four ingredients as exercise 09 (a function, accumulators, a loop, a final calculation), but this time the loop body itself made a three-way decision on every pass, using an if/elif/else you wrote yourself rather than one lone if. That's a deliberately different shape from exercise 09's single running total, and it's much closer to what Week 2's notes API will actually ask of you: a loop or a lookup that has to decide between more than one outcome, not just accumulate a single number.
