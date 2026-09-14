"""
Solution: Exercise 10, variables (scaling a recipe)

See exercises/10_variables_recipe_scaling.py for the task description.
"""

original_servings = 4
flour_cups = 2
sugar_cups = 0.5
desired_servings = 10

# The scale factor is just "how many times bigger is the new batch,"
# expressed as a single number. Dividing the new serving count by the
# original one gives us that ratio directly.
scale_factor = desired_servings / original_servings

# Each ingredient scales by that same factor. This is the same idea as
# the temperature formula from exercise 2: take an existing value, run
# it through a fixed calculation, store the result in a new variable.
scaled_flour = flour_cups * scale_factor
scaled_sugar = sugar_cups * scale_factor

print(
    f"Scaling from {original_servings} servings to {desired_servings} "
    f"servings ({scale_factor}x): {scaled_flour} cups flour, "
    f"{scaled_sugar} cups sugar"
)

# scale_factor = 2.5, scaled_flour = 5.0, scaled_sugar = 1.25
