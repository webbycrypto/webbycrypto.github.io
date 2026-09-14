"""
Exercise 11: Variables and data types (currency conversion)

Task:
You're converting an amount of US dollars into two other currencies
using the fixed exchange rates given below (pretend these are today's
rates; in reality they change constantly, but that's not the point of
this exercise).

Calculate the equivalent amount in euros and in British pounds, each
rounded to 2 decimal places using Python's built-in round() function
(round(value, 2)), and print all three amounts in one f-string, similar
in shape to:

    "$100.00 is equal to 92.50 euros or 79.30 pounds"

(Exact wording can differ. The point is doing the two conversions and
printing all three values together, not matching this text exactly.)

Expected behavior:
With usd_amount = 100 and the rates below, euros should come out to
92.5 and pounds to 79.3. Try changing usd_amount to 37.5 and confirm
both converted amounts change proportionally.
"""

usd_amount = 100
usd_to_eur_rate = 0.925
usd_to_gbp_rate = 0.793

# your code here
