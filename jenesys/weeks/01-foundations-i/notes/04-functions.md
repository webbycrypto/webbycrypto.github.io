# Functions

[← Back to Week 1: Foundations I](../README.md)

## What a function actually is

A function is a named, reusable block of instructions. Instead of writing the same steps over and over throughout your program, you write them once inside a function, give that block a name, and then just refer to it by name every time you need it done.

Think of a vending machine. You don't need to know how it grinds coffee beans and heats water internally; you press a button (give it an input), and it hands you a specific drink (gives you an output). A function works the same way in code: you give it some input (its parameters), it does some work internally that you don't have to think about every time you use it, and it can hand back a result.

Why not just write the steps inline every time you need them? Two reasons. First, repetition: if the same five lines of logic show up in ten places in your program and you find a bug in them, you now have to fix it in ten places instead of one. Second, clarity: a well-named function (`calculate_total_price(...)` instead of eight unlabeled lines of arithmetic) tells the reader what's happening without them needing to trace through the details.

## Defining and calling a function

```python
def greet(name):
    message = f"Hello, {name}!"
    print(message)

greet("Ada")
```

`def` starts a function definition. `greet` is the function's name. `name` inside the parentheses is a **parameter**, a placeholder for whatever value will be passed in when the function is actually used. The indented block underneath is the function's body, the instructions that run every time the function is called.

`greet("Ada")` is where the function actually runs. This is called **calling** the function. `"Ada"` here is called an **argument**, the actual value being passed in for the `name` parameter. The distinction is subtle but worth knowing: `name` in the definition is a parameter (a placeholder name), `"Ada"` in the call is the argument (the real value). Defining a function does not run it; nothing happens until you call it.

## `return`: the difference between printing and giving back a value

This is probably the single biggest trip-up for anyone new to functions. Compare these two:

```python
def add_v1(a, b):
    print(a + b)

def add_v2(a, b):
    return a + b
```

Both of these, called on their own (`add_v1(2, 3)` or `add_v2(2, 3)`), might look the same if you're just watching output in a terminal: nothing obviously prints for `add_v2` unless you print it yourself. But they behave completely differently the moment you try to use the result:

```python
result = add_v1(2, 3)   # prints "5" to the screen, but result is None
print(result)            # None

result = add_v2(2, 3)   # prints nothing on its own
print(result)             # 5
```

`print()` displays something on the screen for a human to look at, and that's all it does. It does not hand a value back to whatever called the function. `return` is what actually sends a value back out of the function so the rest of your program can use it, store it in a variable, pass it to another function, or do further calculations with it.

If a function doesn't have a `return` statement (or the code never reaches one), calling it produces `None`, Python's built-in "nothing here" value, even if the function printed something that looked like an answer on screen. This is an extremely common source of confusion: your function seems to work, because you can see the right number printed out, but then some other code that tries to use the function's result breaks with a confusing error or silently gets `None`, because printing and returning are not the same thing, and only one of them makes the value available to the rest of the program.

A practical rule: if you want a function's result to be usable elsewhere in your code (stored, compared, passed along), it needs a `return`. Only use `print()` inside a function if the function's whole job is to display something directly to a human right there and then, with nothing else needing that value afterward.

## Default arguments

You can give a parameter a default value, making it optional when the function is called:

```python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Ada")                  # "Hello, Ada!"
greet("Ada", "Good morning")   # "Good morning, Ada!"
```

If the caller doesn't provide a value for `greeting`, Python uses `"Hello"`. If they do provide one, that overrides the default. This is useful for parameters that have a sensible common case but occasionally need to be different.

## The mutable default argument trap

Here's a specific, well-known gotcha that catches beginners and experienced developers alike, so it's worth naming explicitly and understanding why it happens. Never do this:

```python
def add_item(item, cart=[]):
    cart.append(item)
    return cart
```

This looks reasonable: if no `cart` is provided, start with an empty list. But here's what actually happens: Python creates the default value (`[]`) exactly *once*, when the function is defined, not fresh every time the function is called. That same list object gets reused as the default on every single call that doesn't explicitly provide its own `cart`.

```python
first_cart = add_item("apple")
print(first_cart)   # ["apple"]

second_cart = add_item("banana")
print(second_cart)  # ["apple", "banana"]  <- not what you probably wanted!
```

`second_cart` was supposed to start fresh, but it's actually the exact same list as `first_cart` under the hood, because that one default list has been sitting there since the function was defined, silently accumulating everything ever appended to it across every call. This happens specifically with **mutable** default values, meaning values that can be changed in place after they're created, like lists (`[]`) and dictionaries (`{}`). Immutable values like numbers, strings, and `True`/`False` don't have this problem, because they can't be modified in place at all; a fresh assignment is the only way to change them, which sidesteps the trap.

The standard fix is to use `None` as the default, and create a genuinely new list inside the function body if none was provided:

```python
def add_item(item, cart=None):
    if cart is None:
        cart = []
    cart.append(item)
    return cart
```

Now every call that doesn't provide its own `cart` gets a brand new, empty list, created fresh inside the function body each time it runs, rather than one shared list reused forever. You don't need to fully master why this happens at a technical level yet (it has to do with how Python creates objects only once for default values, evaluated at definition time rather than call time), but recognize the pattern: a mutable default argument (`[]` or `{}`) is a bug waiting to happen, and `None`-then-create-inside is the standard defense.

## A brief word on scope

A variable created inside a function only exists inside that function; it disappears once the function finishes, and code outside the function can't see it:

```python
def calculate():
    result = 42
    return result

calculate()
print(result)   # NameError: name 'result' is not defined
```

`result` is **local** to `calculate`. If you need a value to be usable after the function runs, you have to `return` it and store the returned value in a variable in the outer code, exactly like the `return` discussion above. Don't rely on a function's internal variables being visible outside it; they aren't.

## What to watch for

- Confusing `print()` (shows something to a human, gives nothing back to the program) with `return` (hands a value back so the rest of the program can use it). A function with no `return` gives back `None`.
- Forgetting `return` entirely and then being confused when a variable that stored the function's result is `None`.
- Using a mutable default argument (`def f(items=[])`) and being surprised that the same list seems to carry over between separate calls. Use `None` and create the mutable value inside the function body instead.
- Expecting a variable defined inside a function to still exist outside of it. It doesn't; return it if you need it later.
