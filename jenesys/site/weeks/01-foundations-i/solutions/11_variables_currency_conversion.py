"""
Solution: Exercise 11, variables (currency conversion)

See exercises/11_variables_currency_conversion.py for the task
description.
"""

usd_amount = 100
usd_to_eur_rate = 0.925
usd_to_gbp_rate = 0.793

# Same shape as the Celsius-to-Fahrenheit conversion from exercise 2:
# take one value, multiply it by a fixed rate, store the result. Here
# we just do it twice, once per target currency, using round() to keep
# the output to a sensible number of decimal places for money.
euros = round(usd_amount * usd_to_eur_rate, 2)
pounds = round(usd_amount * usd_to_gbp_rate, 2)

print(f"${usd_amount:.2f} is equal to {euros} euros or {pounds} pounds")

# euros = 92.5, pounds = 79.3
