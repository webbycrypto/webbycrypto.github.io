"""
Exercise 10: Variables and data types (scaling a recipe)

Task:
The variables below describe one recipe: how many servings it normally
makes, and the amount (in cups) of two ingredients it calls for at that
serving size. You want to cook a different number of servings, stored in
`desired_servings`.

Calculate a `scale_factor` (how many times bigger or smaller the new
batch is compared to the original), then use it to calculate the scaled
amount of each ingredient. The formula for the scale factor:

    scale_factor = desired_servings / original_servings

Then each ingredient's new amount is just its original amount multiplied
by scale_factor.

Print a short summary using an f-string, similar in shape to:

    "Scaling from 4 servings to 10 servings (2.5x): 5.0 cups flour, 1.25 cups sugar"

(Exact wording can differ. The point is the calculation and printing all
four numbers, not matching this text exactly.)

Expected behavior:
With the values below (4 servings, 2 cups flour, 0.5 cups sugar, scaling
to 10 servings), scale_factor should be 2.5, scaled flour should be 5.0,
and scaled sugar should be 1.25. Try changing desired_servings to 2 and
confirm the scaled amounts shrink instead of grow.
"""

original_servings = 4
flour_cups = 2
sugar_cups = 0.5
desired_servings = 10

# your code here
