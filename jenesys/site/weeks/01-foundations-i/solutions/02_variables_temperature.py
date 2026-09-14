"""
Solution: Exercise 2, variables and data types (arithmetic)

See exercises/02_variables_temperature.py for the task description.
"""

celsius_temp = 25.0

# Standard Celsius-to-Fahrenheit formula. Python follows normal math
# order of operations here: multiplication and division happen before
# addition, so this is (celsius_temp * 9 / 5) + 32, not
# celsius_temp * 9 / (5 + 32).
fahrenheit = celsius_temp * 9 / 5 + 32

print(f"{celsius_temp}C is {fahrenheit}F")

# Quick sanity checks you could try by changing celsius_temp above:
#   0.0   should give 32.0
#   100.0 should give 212.0
