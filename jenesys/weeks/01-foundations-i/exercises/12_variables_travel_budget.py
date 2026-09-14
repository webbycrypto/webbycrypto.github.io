"""
Exercise 12: Variables and data types (a travel budget)

Task:
You're planning a trip. The variables below describe the trip's length
in days, your estimated cost per day (food, local transport, incidentals
combined), and the fixed cost of the flight (a one-time cost, not a
per-day one).

Calculate:
    - total_daily_cost: cost_per_day multiplied by trip_days
    - total_trip_cost: total_daily_cost plus flight_cost
    - average_daily_spend: total_trip_cost divided by trip_days (this
      will be a little higher than cost_per_day alone, since it spreads
      the one-time flight cost across every day too)

Print a short summary with an f-string showing all three calculated
values, similar in shape to:

    "7 days, $840.00 total ($120.00/day average, including the flight)"

(Exact wording can differ. The point is calculating and printing all
three values, not matching this text exactly.)

Expected behavior:
With trip_days = 7, cost_per_day = 100, and flight_cost = 140:
total_daily_cost should be 700, total_trip_cost should be 840, and
average_daily_spend should be exactly 120.0.
"""

trip_days = 7
cost_per_day = 100
flight_cost = 140

# your code here
