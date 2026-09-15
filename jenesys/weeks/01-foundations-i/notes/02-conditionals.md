# Conditionals

[← Back to Week 1: Foundations I](../README.md)

## TL;DR

A conditional lets your code check something and run different code depending on whether it's true or false. This page covers the if/elif/else structure, how indentation and comparisons work, and how to combine or evaluate conditions.

- `if`, `elif` ("else if"), and `else` let you check a condition and branch into exactly one path; only the first true condition's block runs.
- Indentation, not curly braces, is what tells Python which lines belong inside each branch. Get it wrong, and Python either throws an error or runs the wrong block.
- Comparison operators like `==`, `>`, and `<` each produce `True` or `False`. `==` checks equality, `=` assigns a value, don't mix them up.
- `and` needs every condition to be true, `or` needs just one, and `not` flips a `True`/`False` value.
- Python also treats some values, like an empty string `""`, `0`, or `None`, as automatically false in a condition, even without an explicit comparison.

```python
books_checked_out = 2
is_member = True
username = ""

if books_checked_out > 5:                 # if/elif/else: check a condition, run one path
    print("Checkout limit reached.")
elif books_checked_out > 0:               # indentation (not braces) marks what's "inside" this branch
    print("Some books are checked out.")
else:
    print("No books checked out.")

if books_checked_out > 0 and is_member:   # ">" and "and" both produce True/False
    print("Enjoy your books.")

if not username:                          # "" is falsy, so "not username" is True here
    print("Please enter a username.")
```

## What a conditional actually is

Every program you've used makes decisions. A streaming app decides whether to show a "resume watching" button based on whether you've started a show. A banking app decides whether to let a withdrawal go through based on your balance. A conditional is how you write "if this is true, do this, otherwise do that" in code.

Think about ordering coffee at a counter. If you ask for it iced, they grab a cold cup. If you ask for it hot, they grab a different cup. There's no single fixed action; the action taken depends on a condition (what you asked for) being checked first. That's exactly what a conditional does in code: check something, then branch into one path or another based on the answer.

## The basic shape: `if`, `elif`, `else`

```python
temperature = 15

if temperature > 25:
    print("It's hot.")
elif temperature > 10:
    print("It's mild.")
else:
    print("It's cold.")
```

Read this top to bottom, the way Python actually executes it: check the first condition (`temperature > 25`). If that's true, run the indented code under it and skip everything else in this chain entirely, even if a later condition would also have been true. If it's false, move to the `elif` ("else if") and check that condition instead. If none of the `if`/`elif` conditions were true, fall through to `else`, which has no condition of its own; it just means "none of the above."

You can have as many `elif` blocks as you need, and both `elif` and `else` are optional. A plain `if` with nothing else is completely valid if you only care about one case.

## Indentation is not a style choice, it's the syntax

In many languages, curly braces `{}` mark which lines belong inside an `if` block. Python uses indentation (whitespace at the start of a line) for that instead. The lines indented under `if temperature > 25:` are the lines that run when that condition is true. This is not a formatting preference, it's how Python parses your code. Get the indentation wrong, and Python either throws an `IndentationError` or, worse, runs a different block than you intended without any error at all.

Two practical rules to avoid the most common pain here:
- Pick one indentation style, four spaces per level is the near-universal Python convention, and let your editor's Python settings enforce it consistently. VS Code, once it detects a `.py` file, will typically indent for you correctly when you press Enter after a `:`.
- Never mix tabs and spaces in the same file. Python will sometimes tolerate this and sometimes throw a confusing `TabError`, depending on exactly how they're mixed. Avoid the whole problem by never mixing them.

Also notice the colon `:` at the end of the `if`, `elif`, and `else` lines. Forgetting it is one of the single most common beginner typos, and it produces a `SyntaxError` pointing roughly at that line. If you see a `SyntaxError` right after writing a conditional, check for a missing colon before anything else.

## Comparison operators

These are the building blocks of a condition, and they produce a `bool` (`True` or `False`):

| Operator | Meaning |
|---|---|
| `==` | equal to |
| `!=` | not equal to |
| `<` | less than |
| `>` | greater than |
| `<=` | less than or equal to |
| `>=` | greater than or equal to |

The one to burn into memory: `==` checks equality, `=` assigns a value. They look almost identical and do completely different things. `if score = 10:` is a syntax error in Python (it will refuse to run), which is actually a kindness, some other languages let you write that and silently do the wrong thing. Even so, read every condition you write once, slowly, to confirm you meant `==` and not `=`.

## Combining conditions: `and`, `or`, `not`

Sometimes one comparison isn't enough. You can combine multiple conditions:

```python
age = 20
has_ticket = True

if age >= 18 and has_ticket:
    print("Allowed in.")
```

`and` requires both sides to be true. `or` requires at least one side to be true. `not` flips a boolean: `not True` is `False`.

A common beginner mix-up is reaching for `and` when the situation actually calls for `or`, or vice versa. If you want "let this person in if they're either a member or have a guest pass," that's `is_member or has_guest_pass`. Using `and` there would wrongly exclude non-members who have a valid guest pass. When a condition isn't behaving the way you expect, one of the first things to check is whether you actually want `and` where you wrote `or`, or the reverse. Say the rule out loud in plain English first, then translate it, rather than guessing.

## Truthy and falsy values

You'll sometimes see conditions that don't use a comparison operator at all:

```python
name = ""

if name:
    print(f"Hello, {name}")
else:
    print("No name given.")
```

Python treats certain values as automatically "falsy" when used directly in a condition, even though they aren't literally `False`: an empty string `""`, the number `0`, `None`, and empty collections like `[]` or `{}`. Everything else is "truthy." So `if name:` really means "if `name` is not empty." This is convenient once you're used to it, but it can be genuinely confusing the first time you see it, since nothing about `""` looks like it should behave like `False`. If a conditional is behaving strangely and you're not using an explicit comparison, check whether you're accidentally relying on truthiness when you meant to check something more specific, like `if name != "":`.

## What to watch for

- Missing colon at the end of `if`/`elif`/`else` lines.
- Inconsistent or mixed indentation (tabs and spaces together).
- Writing `=` where you meant `==` inside a condition (Python will stop you here with a `SyntaxError`, which is a hint something's wrong, not an obstacle).
- Reaching for `and` when the logic actually needs `or`, or the reverse. Say the rule in plain English before writing the code.
- Relying on truthiness (`if name:`) without realizing that `0`, `""`, and empty collections all count as falsy, which can produce surprising results if one of those is a legitimate value you meant to treat as "present."
