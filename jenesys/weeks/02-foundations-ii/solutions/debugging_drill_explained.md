# Debugging drill, explained

[← Back to Week 2: Foundations II and first project](../README.md)

Read this only after you've genuinely tried to diagnose `project/debugging_drill.py` yourself, using only `project/debugging_drill_symptoms.md`. Use this to check your own diagnosis, not as a shortcut past doing it. For each bug: the symptom recap, how you'd form a hypothesis about it, the actual line, the fix, and why the fix addresses the real cause rather than just papering over the symptom.

## Bug 1: two "separate" task lists secretly share state

**Symptom:** `personal_tasks` printed tasks that were only ever added to `work_tasks`.

**Forming the hypothesis:** The two lists were both created with `create_task_list()`, and nothing else touches `personal_tasks` before the print. If they're printing the same contents, the most direct hypothesis is that they're not actually two different lists at all, they're the same list object, being referred to by two different names. The way to check this directly: print `work_tasks is personal_tasks` (Python's `is` checks whether two names refer to the exact same object in memory, not just equal-looking values). If that prints `True`, the hypothesis is confirmed.

**The actual bug:**

```python
def create_task_list(initial_tasks=[]):
    return initial_tasks
```

This is the mutable default argument trap from `notes/04-functions.md` in Week 1. Python creates that empty list `[]` exactly once, when the function is defined, not fresh on every call. Every call to `create_task_list()` that doesn't pass its own `initial_tasks` gets back that exact same list object. `add_task()` then calls `.append(...)` on whichever list it's given, which modifies that shared list in place, and since every "separate" list is actually the same object, every append shows up everywhere.

**The fix:**

```python
def create_task_list(initial_tasks=None):
    if initial_tasks is None:
        initial_tasks = []
    return initial_tasks
```

Now every call that doesn't explicitly pass its own list gets a brand new, genuinely empty list, created fresh inside the function body each time it runs, instead of one list shared across every call forever.

## Bug 2: a completed-task count that's `None`

**Symptom:** `count_completed(work_tasks)` printed `None` instead of a number.

**Forming the hypothesis:** In Week 1's notes on functions, a function that never hits a `return` statement gives back `None`, even if it looks like it computed something correctly. Since the printed value is exactly `None` (not a wrong number, but the specific "nothing was returned" value), the strongest hypothesis is that the function is missing its `return` entirely, not that its counting logic is wrong.

**The actual bug:**

```python
def count_completed(tasks):
    count = 0
    for task in tasks:
        if task["done"]:
            count += 1
    # (nothing here; the function ends without a return)
```

The counting logic itself is completely correct. `count` genuinely ends up holding the right number after the loop. The function just never hands that value back to whoever called it, so the caller receives `None` regardless of what `count` was internally.

**The fix:**

```python
def count_completed(tasks):
    count = 0
    for task in tasks:
        if task["done"]:
            count += 1
    return count
```

One line, added at the end. This is exactly why "the fix addressed the real cause" matters as a question to ask yourself: it would be entirely possible to "fix the symptom" by, say, wrapping the print in a check for `None` and printing `0` instead, but that would hide a real bug (the count truly wasn't being returned) behind output that merely looks less broken.

## Bug 3: asking for 3 recent tasks returns 2

**Symptom:** `get_recent_tasks(tasks, 3)` on a 5-task list returned only 2 tasks, and specifically the *last* 2 (D and E), not including C.

**Forming the hypothesis:** This smells like an off-by-one error from `notes/03-loops.md` (well, here it's slicing rather than a loop, but the same counting mistake applies), especially since the result was short by exactly one, and it was the earliest of the requested three that got dropped rather than something random. The direct way to check: work out by hand what indices `tasks[len(tasks) - n + 1:]` actually produces for `len(tasks) = 5` and `n = 3`, rather than guessing.

**The actual bug:**

```python
def get_recent_tasks(tasks, n):
    return tasks[len(tasks) - n + 1:]
```

With 5 tasks and `n = 3`: `len(tasks) - n + 1` is `5 - 3 + 1 = 3`. `tasks[3:]` returns everything from index 3 onward, which is indices 3 and 4, exactly 2 items, not 3. The correct starting index for "the last 3 of 5 items" (indices 2, 3, 4) is `len(tasks) - n = 2`, not `len(tasks) - n + 1 = 3`. The stray `+ 1` pushes the starting point one index too far forward, permanently dropping exactly one task off the front of the intended result, no matter what `n` is.

**The fix:**

```python
def get_recent_tasks(tasks, n):
    return tasks[len(tasks) - n:]
```

Removing the extra `+ 1` gives the correct starting index. Trace it again: `5 - 3 = 2`, `tasks[2:]` is indices 2, 3, 4, which is Task C, D, and E, three tasks, the actual three most recent ones.

## Bug 4: an "or" that's actually an "and"

**Symptom:** `get_urgent_tasks` was documented (in its own docstring) as returning tasks that are high priority *or* overdue, but only the task that was both showed up; tasks that were only one or the other were left out.

**Forming the hypothesis:** The docstring says "or," the described behavior looks like "and." From `notes/02-conditionals.md`: `and` requires both sides true, `or` requires only one. If only the "both true" task passed the filter, the most direct hypothesis is that the code is using `and` where the intended rule is `or`.

**The actual bug:**

```python
def get_urgent_tasks(tasks):
    urgent = []
    for task in tasks:
        if task["high_priority"] and task["overdue"]:
            urgent.append(task)
    return urgent
```

Exactly that: `and` where the intended logic was `or`. This is precisely the mix-up flagged in `notes/02-conditionals.md`, worth reading the plain-English rule out loud before trusting the code: "urgent means high priority or overdue," not "high priority and overdue."

**The fix:**

```python
def get_urgent_tasks(tasks):
    urgent = []
    for task in tasks:
        if task["high_priority"] or task["overdue"]:
            urgent.append(task)
    return urgent
```

One changed word. With `or`, a task needs only one of the two conditions to be true to be included, matching both the docstring and the intended behavior described in the demo's own task names ("Overdue but low priority," "High priority but not overdue," both of which should now correctly show up alongside "Both").

## The pattern across all four

None of these four bugs were syntax errors; Python happily ran every one of them without complaint. Each one produced output that was subtly, specifically wrong, in a way you could only catch by actually looking closely at what came out and comparing it to what you expected, then tracing that specific mismatch back to one line. That's the whole point of this drill, and it's exactly the skill the Foundations checkpoint at the end of Week 3 is checking for: not "can you avoid ever writing a bug" (everyone writes bugs), but "can you notice something's wrong, form a real hypothesis about why, and confirm it before declaring victory."
