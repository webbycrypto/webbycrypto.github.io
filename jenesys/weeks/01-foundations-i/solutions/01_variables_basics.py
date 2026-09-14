"""
Solution: Exercise 1, variables and data types

See exercises/01_variables_basics.py for the task description.
"""

# Four variables, one per required type.
name = "Ada"
age = 28
height_m = 1.75
is_learning_to_code = True

# An f-string lets us drop each variable straight into the text using
# {} without manually converting numbers to strings first. Notice
# is_learning_to_code (a bool) gets inserted directly too; Python
# converts True/False to the text "True"/"False" automatically inside
# an f-string.
print(
    f"{name} is {age} years old, {height_m}m tall, "
    f"and learning to code: {is_learning_to_code}"
)
