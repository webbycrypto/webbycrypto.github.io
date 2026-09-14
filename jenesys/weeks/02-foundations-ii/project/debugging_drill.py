"""
Debugging drill: a small task manager

This is a working, runnable program: it will not crash with a syntax
error, and most of it looks and behaves like a normal piece of code.
Somewhere in here, though, are a small number of deliberate LOGIC
bugs, the kind that don't announce themselves with a traceback, they
just quietly produce the wrong answer.

Do not read this file looking for comments marked "bug" or similar;
there aren't any. That's the point: in real code, nobody labels their
own mistakes. Instead, read project/debugging_drill_symptoms.md, which
describes what you'd actually OBSERVE if you ran this program and used
it the way it's meant to be used, without telling you why. Your job is
to go from "here's what's happening" to "here's the specific line
causing it, and here's why," the same process notes/05 walked through.

Run this file directly to see the demo at the bottom in action:
    python project/debugging_drill.py

Once you've formed a real hypothesis about each symptom (and ideally
tried a fix), you can check your diagnosis against
solutions/debugging_drill_explained.md. Try not to open that file
before then; you'd be skipping the actual exercise.
"""


def create_task_list(initial_tasks=[]):
    """
    Create a new task list, optionally starting with some tasks
    already in it.
    """
    return initial_tasks


def add_task(tasks, name, high_priority=False, overdue=False):
    """Add a new task (as a dict) to the given task list."""
    tasks.append({
        "name": name,
        "high_priority": high_priority,
        "overdue": overdue,
        "done": False,
    })


def mark_complete(tasks, name):
    """Mark the task with the given name as done."""
    for task in tasks:
        if task["name"] == name:
            task["done"] = True


def count_completed(tasks):
    """Count how many tasks in the list are marked done."""
    count = 0
    for task in tasks:
        if task["done"]:
            count += 1


def get_recent_tasks(tasks, n):
    """Return the n most recently added tasks, oldest of the n first."""
    return tasks[len(tasks) - n + 1:]


def get_urgent_tasks(tasks):
    """Return tasks that are high priority or overdue (or both)."""
    urgent = []
    for task in tasks:
        if task["high_priority"] and task["overdue"]:
            urgent.append(task)
    return urgent


def run_demo():
    print("--- Setting up two separate task lists ---")
    work_tasks = create_task_list()
    add_task(work_tasks, "Write report")
    add_task(work_tasks, "Reply to emails")

    personal_tasks = create_task_list()
    add_task(personal_tasks, "Buy groceries")

    print("work_tasks:", [t["name"] for t in work_tasks])
    print("personal_tasks:", [t["name"] for t in personal_tasks])

    print()
    print("--- Marking a task complete and counting completed tasks ---")
    mark_complete(work_tasks, "Write report")
    completed = count_completed(work_tasks)
    print(f"Completed tasks in work_tasks: {completed}")

    print()
    print("--- Getting the 3 most recent tasks ---")
    tasks = create_task_list()
    add_task(tasks, "Task A")
    add_task(tasks, "Task B")
    add_task(tasks, "Task C")
    add_task(tasks, "Task D")
    add_task(tasks, "Task E")
    recent = get_recent_tasks(tasks, 3)
    print(f"Requested 3 most recent, got {len(recent)}:",
          [t["name"] for t in recent])

    print()
    print("--- Finding urgent tasks (high priority OR overdue) ---")
    urgent_tasks = create_task_list()
    add_task(urgent_tasks, "Overdue but low priority", high_priority=False, overdue=True)
    add_task(urgent_tasks, "High priority but not overdue", high_priority=True, overdue=False)
    add_task(urgent_tasks, "Both", high_priority=True, overdue=True)
    add_task(urgent_tasks, "Neither", high_priority=False, overdue=False)
    urgent = get_urgent_tasks(urgent_tasks)
    print(f"Found {len(urgent)} urgent task(s):", [t["name"] for t in urgent])


if __name__ == "__main__":
    run_demo()
