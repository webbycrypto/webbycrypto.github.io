# Debugging drill: symptoms

[← Back to Week 2 project: a notes/task API](README.md)

Run `debugging_drill.py` (`python project/debugging_drill.py`) and read its output. Below are the symptoms you should notice, described as observations only, deliberately not as explanations. Diagnosing *why* each one happens is the actual exercise. Work through `notes/05-debugging-methodology.md`'s process for each: read the relevant function, form a specific hypothesis about what's going wrong and why, check that hypothesis (print-statement debugging is fair game and encouraged), and only then attempt a fix.

There are four separate issues below. They are independent of each other; fixing one won't fix another.

## Symptom 1: two task lists that shouldn't be connected seem to share tasks

The demo creates two separate task lists, `work_tasks` and `personal_tasks`, using `create_task_list()`, and only ever adds "Buy groceries" to `personal_tasks`. Look at the printed output for both lists. Is `personal_tasks` really only holding what you'd expect, given what was actually added to it? Try extending the demo (or writing a tiny standalone test) that creates a third, brand-new list with `create_task_list()` and prints it immediately, before adding anything to it at all. What does it contain?

## Symptom 2: a completed-task count that isn't a number

After marking "Write report" complete, the demo prints "Completed tasks in work_tasks: " followed by a value. Look closely at what actually gets printed there. Is it a number? If you tried to use that value in further math (for example, checking `if completed > 0:`), what do you think would happen?

## Symptom 3: asking for 3 recent tasks doesn't give you 3

The demo asks `get_recent_tasks(tasks, 3)` for the 3 most recently added tasks, out of 5 total tasks added in order (A, B, C, D, E). Look at how many tasks actually came back, and which ones specifically. Is the count right? If not, is it consistently off, or unpredictable? Try calling the same function with a few different values of `n` (both smaller and larger than 3) against the same 5-task list, and see if you can spot a pattern in exactly how far off the count is each time.

## Symptom 4: a task that should count as "urgent" doesn't show up

The demo builds a list with one task that's overdue but not high priority, one that's high priority but not overdue, one that's both, and one that's neither. `get_urgent_tasks` is meant to return anything that's high priority *or* overdue (its own docstring says so). Look at how many tasks actually came back, and which ones. Does it match "high priority or overdue," or does it look more like some other rule?

## A hint on process, not on causes

For each symptom, before changing any code: write down, in your own words, what you think the function is currently doing (not what it's supposed to do, what you think it's actually doing, based on the symptom). Then look at the function's actual code and see whether that matches. If it does, you've likely found it. If it doesn't, that's useful too: it means your hypothesis was wrong, and you've learned something that narrows down where to look next.
