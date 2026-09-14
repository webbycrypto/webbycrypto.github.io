"""
Exercise 21: Functions (a GPA calculator, functions plus a loop)

Task:
This one combines functions with a loop inside a function, a preview of
the kind of combining exercise 09's guided walkthrough introduced, but
here you're building it yourself instead of being told each line.

1. Write a function `letter_to_points(letter)` that takes a single
   letter grade ("A", "B", "C", "D", or "F") and RETURNS its standard
   grade point value: A=4.0, B=3.0, C=2.0, D=1.0, F=0.0. Use
   if/elif/else.

2. Write a second function `calculate_gpa(letters)` that takes a list of
   letter grades, and RETURNS the average grade point value across all
   of them. Inside this function, use a for loop and the accumulator
   pattern to add up the points for every letter in the list (calling
   your letter_to_points function on each one), then divide by how many
   grades there are (len(letters)) to get the average. Round the result
   to 2 decimal places before returning it.

Then call calculate_gpa on the list below and print the result.

Expected behavior:
With grades = ["A", "A", "B", "C", "B"], the point values are
4.0, 4.0, 3.0, 2.0, 3.0, which sum to 16.0. Divided by 5 grades, that's
a GPA of 3.2. calculate_gpa(grades) should return 3.2.
"""

grades = ["A", "A", "B", "C", "B"]

# your code here (define letter_to_points)


# your code here (define calculate_gpa, using a loop and letter_to_points)


# your code here (call calculate_gpa on `grades` and print the result)
