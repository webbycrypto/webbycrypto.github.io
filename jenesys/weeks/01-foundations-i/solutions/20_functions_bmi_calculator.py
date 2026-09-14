"""
Solution: Exercise 20, functions (a two-function BMI calculator)

See exercises/20_functions_bmi_calculator.py for the task description.
"""

weight_kg = 68
height_m = 1.72


def calculate_bmi(weight_kg, height_m):
    """Return the body mass index, rounded to 1 decimal place."""
    bmi = weight_kg / (height_m * height_m)
    return round(bmi, 1)


def bmi_category(bmi):
    """Return a plain-language category for a given bmi value."""
    if bmi < 18.5:
        return "underweight"
    elif bmi < 25:
        return "normal"
    elif bmi < 30:
        return "overweight"
    else:
        return "obese"


# This is the "chaining" the task description asks for: the return
# value of calculate_bmi becomes the argument passed into
# bmi_category. Storing the intermediate result in `bmi` (rather than
# nesting the calls directly) also means we have it on hand to print
# alongside the category, without calculating it twice.
bmi = calculate_bmi(weight_kg, height_m)
category = bmi_category(bmi)

print(f"BMI: {bmi} ({category})")

# calculate_bmi(68, 1.72) = 68 / (1.72 * 1.72) = 68 / 2.9584 = 22.98...
# rounded to 23.0. bmi_category(23.0) falls into the 18.5-to-25 range,
# so it returns "normal".
