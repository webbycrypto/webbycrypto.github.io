# Guided walkthrough: a grade report, line by line

[← Back to Week 1 exercises](README.md)

Exercises 01-08 practiced variables, conditionals, loops, and functions one at a time, separately. This one combines all four into a single small program, and unlike the others, it tells you exactly what to type, one line (or one tiny group of lines) at a time. Open `09_guided_grade_report.py` (it starts nearly empty) and type each step below into it yourself as you go, in order. Don't paste; typing it is part of the point. Run the file after every single step (`python 09_guided_grade_report.py`) so you watch it grow instead of seeing it all at once at the end.

Each step is short on purpose. If a step doesn't make sense, stop and reread the note it points to before typing the next line, rather than pushing forward confused.

## Step 1: the data

```python
scores = [92, 78, 65, 88, 54, 73]
```

One variable, a list of six numbers. See `notes/01-variables-and-data-types.md` if lists feel unfamiliar. Run the file now; nothing prints yet, and that's expected, this line alone doesn't produce output.

## Step 2: a function that turns one score into a letter

```python
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
```

Same `if`/`elif`/`else` chain from exercise 03, just wrapped in a function this time (`notes/04-functions.md`) so you can reuse it for every score instead of writing it once per number. Run the file again. Still no output: defining a function doesn't run it, it just makes it available to call later.

## Step 3: a variable to accumulate a running total

```python
total = 0
```

This has to exist *before* the loop below, starting at `0`. `notes/03-loops.md` calls this the accumulator pattern, and specifically warns about creating this variable inside the loop by mistake, which would reset it to `0` on every pass instead of building it up. This is why it's its own step, on its own line, before anything else.

## Step 4: the loop that ties steps 1-3 together

```python
for score in scores:
    letter = grade_for(score)
    total = total + score
    print(f"{score} -> {letter}")
```

Four things happening here, one per line: loop over every score in the list (`notes/03-loops.md`), call the function from Step 2 on it, add it to the running total from Step 3, then print it. `f"{score} -> {letter}"` is an f-string: writing a variable name inside `{}` inside a string drops that variable's value directly into the text. You'll use this constantly from here on. Run the file now. You should see six lines print, one per score, each with its letter grade.

## Step 5: the average, after the loop ends

```python
average = total / len(scores)
print(f"\nClass average: {average:.1f}")
```

Indentation is what makes this "after the loop": these two lines are NOT indented under `for`, so they run once, after all six passes finish, using whatever `total` ended up holding. `len(scores)` counts how many scores there are (6). `:.1f` inside the f-string means "show this number with exactly one decimal place." Run the file one last time.

## What your output should look like

```
92 -> A
78 -> C
65 -> D
88 -> B
54 -> F
73 -> C

Class average: 75.0
```

If yours matches, compare your typed file against `solutions/09_guided_grade_report.py` anyway, not to check correctness (you already know it's correct, it ran), but to see the exact same five steps written as one continuous file, the shape every later project in this program will look like: variables, then functions, then an accumulator, then a loop that uses both, then a final calculation after the loop.

## What you just did

Every piece above already existed separately in exercises 01-08. Nothing here was new syntax except the f-string. What's new is putting four separate skills into one program that actually depends on all of them at once, which is a much closer preview of Week 2's project than any single isolated exercise was.
