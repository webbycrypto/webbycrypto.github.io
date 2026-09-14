"""
Solution: Exercise 21, functions (a GPA calculator, functions plus a loop)

See exercises/21_functions_gpa_calculator.py for the task description.
"""

grades = ["A", "A", "B", "C", "B"]


def letter_to_points(letter):
    """Return the standard grade point value for a single letter grade."""
    if letter == "A":
        return 4.0
    elif letter == "B":
        return 3.0
    elif letter == "C":
        return 2.0
    elif letter == "D":
        return 1.0
    else:
        return 0.0


def calculate_gpa(letters):
    """
    Return the average grade point value across a list of letter
    grades, rounded to 2 decimal places.

    This is the same shape as exercise 09's guided grade report: an
    accumulator (total_points) created before the loop, a for loop
    that calls another function (letter_to_points) on each item and
    adds the result to the accumulator, then a final calculation
    (the average) once the loop has finished.
    """
    total_points = 0
    for letter in letters:
        total_points = total_points + letter_to_points(letter)

    average = total_points / len(letters)
    return round(average, 2)


gpa = calculate_gpa(grades)
print(gpa)

# Points: 4.0, 4.0, 3.0, 2.0, 3.0 -> total_points = 16.0.
# 16.0 / 5 grades = 3.2.
