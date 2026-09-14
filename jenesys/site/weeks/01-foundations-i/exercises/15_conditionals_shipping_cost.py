"""
Exercise 15: Conditionals (shipping cost rules)

Task:
An online store calculates shipping cost using these rules, checked in
this order:

    1. If is_member is True: shipping is always free ($0), regardless of
       order total or weight. Membership overrides everything else.
    2. Otherwise, if order_total is at least $50: shipping is free ($0),
       a standard "free shipping over $50" promotion.
    3. Otherwise, if package_weight_kg is greater than 5: shipping costs
       $15 (heavy, non-member, under the free threshold).
    4. Otherwise: shipping costs $5 (the standard base rate).

Calculate `shipping_cost` and print it with an f-string, similar in
shape to:

    "Order total: $32.00, weight: 3.0kg, member: False -> shipping: $5"

(Exact wording can differ. The point is applying all four rules in the
right order, not matching this text exactly.)

Expected behavior:
Test all of these (change the three variables and rerun each time):
    is_member=True,  order_total=10, package_weight_kg=8   -> $0 (membership wins even though it's heavy and under $50)
    is_member=False, order_total=60, package_weight_kg=8   -> $0 (over $50, free shipping, even though it's heavy)
    is_member=False, order_total=20, package_weight_kg=6   -> $15 (not a member, under $50, heavy)
    is_member=False, order_total=20, package_weight_kg=2   -> $5 (the base rate; none of the other conditions apply)

Pay close attention to the ORDER of your if/elif chain. If you checked
package_weight_kg before order_total, or order_total before is_member,
you could get a case like the second one wrong even though each
individual rule looks correct on its own; the order they're checked in
is part of the logic, not just a stylistic choice.
"""

is_member = False
order_total = 20
package_weight_kg = 6

# your code here
