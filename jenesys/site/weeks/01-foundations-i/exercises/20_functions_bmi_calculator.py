"""
Exercise 20: Functions (a two-function BMI calculator)

Task:
Write two separate functions that work together, a good small example
of why splitting work across more than one function is useful (see the
"why not just write the steps inline" reasoning in notes/04-functions.md).

1. `calculate_bmi(weight_kg, height_m)`: RETURNS the body mass index,
   calculated as weight_kg divided by height_m squared (height_m *
   height_m), rounded to 1 decimal place.

2. `bmi_category(bmi)`: takes a bmi value and RETURNS a category string,
   using if/elif/else:
       below 18.5       -> "underweight"
       18.5 up to 25     -> "normal"
       25 up to 30       -> "overweight"
       30 and above      -> "obese"

Then, below both function definitions: call `calculate_bmi` with the
values given, store the result, pass THAT result into `bmi_category`,
and print both the bmi value and its category in one f-string, similar
in shape to:

    "BMI: 23.0 (normal)"

(Exact wording can differ. The point is chaining the two functions
together, using the first one's return value as the second one's
argument, not matching this text exactly.)

Expected behavior:
With weight_kg = 68 and height_m = 1.72: calculate_bmi should return
23.0, and bmi_category(23.0) should return "normal". Try weight_kg = 95
with the same height and confirm the category correctly changes to
"overweight" or "obese".
"""

weight_kg = 68
height_m = 1.72

# your code here (define calculate_bmi)


# your code here (define bmi_category)


# your code here (call calculate_bmi, then bmi_category on its result, then print)
