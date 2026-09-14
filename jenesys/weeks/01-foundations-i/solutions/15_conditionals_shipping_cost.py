"""
Solution: Exercise 15, conditionals (shipping cost rules)

See exercises/15_conditionals_shipping_cost.py for the task
description.
"""

is_member = False
order_total = 20
package_weight_kg = 6

# The order of this chain is the whole exercise. is_member is checked
# first because it overrides everything else, no matter what order
# total or weight say. order_total is checked next because "free
# shipping over $50" is meant to apply regardless of weight. Only once
# both of those have said "no" do we even look at weight.
if is_member:
    shipping_cost = 0
elif order_total >= 50:
    shipping_cost = 0
elif package_weight_kg > 5:
    shipping_cost = 15
else:
    shipping_cost = 5

print(
    f"Order total: ${order_total:.2f}, weight: {package_weight_kg}kg, "
    f"member: {is_member} -> shipping: ${shipping_cost}"
)

# is_member=False, order_total=20, package_weight_kg=6: not a member,
# under $50, but over 5kg, so shipping_cost = 15.
