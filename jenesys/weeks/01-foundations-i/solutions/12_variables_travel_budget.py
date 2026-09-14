"""
Solution: Exercise 12, variables (a travel budget)

See exercises/12_variables_travel_budget.py for the task description.
"""

trip_days = 7
cost_per_day = 100
flight_cost = 140

total_daily_cost = cost_per_day * trip_days
total_trip_cost = total_daily_cost + flight_cost

# Dividing the grand total (which includes the one-time flight cost)
# back out over every day is what makes average_daily_spend come out
# higher than cost_per_day alone; the flight cost has to "live"
# somewhere once we're averaging, and spreading it across every day is
# the most natural way to do that.
average_daily_spend = total_trip_cost / trip_days

print(
    f"{trip_days} days, ${total_trip_cost:.2f} total "
    f"(${average_daily_spend:.2f}/day average, including the flight)"
)

# total_daily_cost = 700, total_trip_cost = 840, average_daily_spend = 120.0
