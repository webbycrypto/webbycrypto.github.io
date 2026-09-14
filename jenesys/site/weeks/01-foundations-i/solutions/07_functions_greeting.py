"""
Solution: Exercise 7, functions (parameters and return)

See exercises/07_functions_greeting.py for the task description.
"""


def build_greeting(name, time_of_day):
    """
    Build and RETURN a greeting string. Notice this function has no
    print() call inside it at all. Its only job is to compute a
    string and hand it back to whoever called it, via return. That's
    what makes it reusable: some other part of the program can decide
    what to actually do with the greeting (print it, store it, send
    it somewhere else) without build_greeting making that decision
    for them.
    """
    return f"Good {time_of_day}, {name}!"


# The printing happens out here, using the value build_greeting handed
# back, not inside the function itself.
morning_message = build_greeting("Ada", "morning")
evening_message = build_greeting("Grace", "evening")

print(morning_message)
print(evening_message)

# If build_greeting had used print(...) instead of return f"...",
# calling morning_message = build_greeting("Ada", "morning") would
# have printed the greeting once immediately, but morning_message
# itself would be None, and print(morning_message) below it would
# print "None" instead of the greeting. Try changing `return` to
# `print` inside the function to see this happen, then change it
# back.
