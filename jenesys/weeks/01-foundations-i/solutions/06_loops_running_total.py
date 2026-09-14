"""
Solution: Exercise 6, loops (while, and the accumulator pattern)

See exercises/06_loops_running_total.py for the task description.
"""

start = 5

# --- Part 1: countdown using a while loop ---

# `count` is the variable our while condition depends on. The most
# important line in this whole loop is `count = count - 1` at the
# bottom: without it, `count > 0` would never become False, and this
# would loop forever (an infinite loop).
count = start
while count > 0:
    print(count)
    count = count - 1

print("Liftoff!")

# --- Part 2: running total using the accumulator pattern ---

# `total` is created BEFORE the loop starts, at a sensible starting
# value (0, since we're summing). If this line were accidentally
# placed inside the loop body instead, total would get reset to 0 on
# every single pass, and the "running" part of "running total" would
# be broken, we'd just print the last number added, not a real sum.
total = 0
number = 1
while number <= start:
    total = total + number
    number = number + 1

print(total)
