# Variables and data types

[← Back to Week 1: Foundations I](../README.md)

## What a variable actually is

A variable is a name you give to a piece of information so you can use that information again later without retyping it. Think of it like a labeled box: you put something inside the box, you write a label on the outside so you know what's in it, and from then on you can refer to the box by its label instead of describing the contents every time.

In Python, you create a variable like this:

```python
age = 25
```

Read this as "create a box labeled `age`, and put the value `25` in it." From this point on in your program, whenever you write `age`, Python looks inside that box and uses whatever is there.

Why bother with this at all? Because almost nothing useful happens with just one value used once. Real programs take a value, use it in a calculation, print it, pass it to a function, check it against a condition, and often reuse it several times. Without a name to refer back to, you'd have to retype the actual value every time, and if that value ever needed to change, you'd have to hunt down every place you typed it. A variable lets you store a value once and reuse the name everywhere.

## The `=` sign is not what it looks like

This is one of the most common points of confusion for anyone coming from math class. In math, `x = 5` is a statement of fact: x equals 5, permanently, in that context. In Python, `=` is the **assignment operator**. It means "take the value on the right, and store it in the name on the left." It is an action, not a fact.

This matters because assignment can change what a name refers to over time:

```python
score = 10
score = score + 5
```

The second line is not a contradiction. Python evaluates the right side first (`score + 5`, which is `10 + 5`, which is `15`), and only then stores that new value into `score`. After this runs, `score` holds `15`. The box didn't stay at 10 forever; you took out what was in it, did some math, and put a new value back in the same box.

Later, in Week 1's notes on conditionals, you'll meet `==`, which checks whether two things are equal instead of assigning a value. Mixing these two up (writing `=` when you meant `==`, or vice versa) is one of the most common mistakes beginners make in almost every programming language. Python actually protects you from the worst version of this mistake: writing `if score = 10:` is a `SyntaxError` in Python, so it won't silently do the wrong thing, it will just refuse to run and tell you something is wrong. Still, get in the habit now of reading `=` as "store into" and `==` as "is equal to," two completely different operations that happen to look similar.

## Naming your variables

You can mostly name a variable whatever you want, with a few hard rules: names can contain letters, numbers, and underscores, but can't start with a number, and can't be one of Python's reserved words (like `if`, `for`, or `return`, which already mean something specific to Python).

Beyond the hard rules, there's a strong convention in Python called `snake_case`: lowercase words separated by underscores, like `total_price` or `is_logged_in`. Follow it. Code is read far more often than it's written, and a variable named `x` or `data2` tells the next reader (often you, in three weeks, having forgotten the details) nothing about what it's for. `total_price` tells you immediately.

## The basic data types

Every value in Python has a type, which tells Python (and you) what kind of thing it is and what you're allowed to do with it. The four you'll use constantly from day one:

**`str` (string):** text, always written inside quotes, either single `'like this'` or double `"like this"`. Python doesn't care which style you use as long as you're consistent about closing what you opened. `name = "Ada"` stores the text "Ada."

**`int` (integer):** a whole number, positive or negative, with no decimal point. `age = 25`.

**`float` (floating-point number):** a number with a decimal point. `price = 19.99`. Even `price = 20.0` is a float, not an int, because of that decimal point.

**`bool` (boolean):** exactly one of two values, `True` or `False` (capitalized, no quotes). Booleans represent yes/no, on/off, did-this-happen/did-this-not-happen. You'll use them constantly once you get to conditionals in the next note.

You can check what type a value is with the built-in `type()` function:

```python
type(25)      # <class 'int'>
type(25.0)    # <class 'float'>
type("25")    # <class 'str'>
type(True)    # <class 'bool'>
```

Notice that `25` and `"25"` are not the same thing. One is a number you can do math with; the other is text that happens to look like a number. This distinction causes real bugs, which brings us to the next point.

## Why mixing types blows up, and why that's actually helpful

Try to picture what "add" should mean between a number and a word. It doesn't have an obvious answer, and Python agrees: it refuses rather than guessing. This code will crash:

```python
age = 25
message = "I am " + age + " years old"
```

You'll get a `TypeError: can only concatenate str (not "int") to str`. Read that error slowly: it's telling you that you tried to glue (`concatenate`) a string and something that is not a string (an `int`) together with `+`, and Python doesn't know how to do that. This is not Python being difficult. A language that silently guessed what you meant here would hide real bugs from you. Instead, Python stops immediately and tells you exactly where the mismatch is, which is far easier to fix than a program that runs but silently produces nonsense.

The fix is to convert one type into another on purpose, using `str()`, `int()`, or `float()`:

```python
age = 25
message = "I am " + str(age) + " years old"
```

Now `str(age)` turns the number `25` into the text `"25"`, and gluing two strings together works fine.

## A cleaner way to combine text and variables: f-strings

Writing `"I am " + str(age) + " years old"` works, but it gets clunky fast once you're combining several variables. Python gives you a cleaner tool called an **f-string** (formatted string):

```python
age = 25
message = f"I am {age} years old"
```

Put an `f` right before the opening quote, and anything inside curly braces `{}` gets evaluated and inserted as text automatically, no manual `str()` conversion needed. This is the style you'll see used throughout this program whenever text and variables need to be combined.

## Comments: notes to humans, ignored by Python

Anything after a `#` on a line is a comment. Python skips over it entirely; it exists purely for you (or someone reading your code later) to understand what's going on.

```python
# Calculate the total price including 8% sales tax
total = price * 1.08
```

Use comments to explain *why* you did something, especially when the reason isn't obvious from the code itself. A comment that just restates the code (`# add 1 to x` above `x = x + 1`) doesn't earn its place. A comment explaining why you're adding 1 (because you're converting from a zero-indexed count to a human-facing count, say) is genuinely useful.

## What to watch for

- Confusing `=` (assignment) with `==` (equality comparison). You'll see `==` properly introduced in the next note.
- Forgetting that `"25"` (text) and `25` (a number) are different things that can't just be combined with `+`.
- Inconsistent naming, like switching between `total_price` and `totalPrice` in the same file. Pick `snake_case` and stay consistent.
