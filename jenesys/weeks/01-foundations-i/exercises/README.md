# Week 1 exercises

[← Back to Week 1: Foundations I](../README.md)

Twenty isolated exercises, five each for variables, conditionals, loops, and functions. "Isolated" means each one stands completely on its own; none of them depend on a previous exercise being finished. Do them in order if you're following the notes in order, but nothing breaks if you jump around. The first two in each group of five are the original pair for that concept; the next three are later additions covering the same concept in different, unrelated scenarios (a shopping cart, a password checker, an inventory count, and so on), so you get real repetition without seeing the same problem palette-swapped with new variable names.

Each file has a description of the task at the top (in a comment or docstring) and a `# your code here` marker showing where your code goes. Run a file with `python exercises/01_variables_basics.py` (adjust the filename) from the `weeks/01-foundations-i` folder, or from inside `exercises/` with just the filename.

Read the matching note in `notes/` before attempting each exercise if you haven't already. Once you've made a real attempt (not just glanced at the task and given up), compare against the matching file in `solutions/`.

**Variables and data types:**
1. `01_variables_basics.py`
2. `02_variables_temperature.py`
10. `10_variables_recipe_scaling.py`, scaling a recipe up or down
11. `11_variables_currency_conversion.py`, converting an amount into two other currencies
12. `12_variables_travel_budget.py`, totaling a multi-day trip's cost

**Conditionals:**
3. `03_conditionals_grade.py`
4. `04_conditionals_leap_year.py`
13. `13_conditionals_password_strength.py`, classifying a password as weak/medium/strong
14. `14_conditionals_grade_curve.py`, applying a tiered curve with a maximum cap
15. `15_conditionals_shipping_cost.py`, applying shipping rules in a specific priority order

**Loops:**
5. `05_loops_multiplication_table.py`
6. `06_loops_running_total.py`
16. `16_loops_shopping_cart_total.py`, summing prices and counting expensive items in one pass
17. `17_loops_word_counter.py`, filtering a list of words by length
18. `18_loops_inventory_restock.py`, flagging inventory below its reorder level

**Functions:**
7. `07_functions_greeting.py`
8. `08_functions_shopping_total.py`
19. `19_functions_tip_calculator.py`, splitting a bill with a default tip rate
20. `20_functions_bmi_calculator.py`, two functions chained together (one function's result feeding the next)
21. `21_functions_gpa_calculator.py`, a function that uses a loop internally

## After all twenty: two guided walkthroughs, not more isolated tasks

`09_guided_grade_report.md` and `22_guided_password_audit.md` are a different kind of exercise. Instead of a task description and a blank spot to fill in, each one tells you what to type, one line (or a couple of lines) at a time, explaining each step as small and specific as possible, and pointing back at the exact note each piece came from. Each combines variables, conditionals, loops, and functions into one small program, which none of the twenty isolated exercises above do on their own.

Do `09_guided_grade_report.md` after exercises 01-08 (it only uses concepts from those eight), and `22_guided_password_audit.md` after the rest, including exercise 13, whose fuller password-strength logic this guided version deliberately simplifies. They're not interchangeable busywork repeated twice: a guided walkthrough exercises the muscle of building something carefully and incrementally from precise instructions, which is a different skill from the independent problem-solving the isolated exercises above ask for, and both are worth real practice on their own terms.
