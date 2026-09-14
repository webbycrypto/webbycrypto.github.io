# Loops

[← Back to Week 1: Foundations I](../README.md)

## What a loop actually is

A loop repeats a block of code, either a fixed number of times or until some condition stops being true. Think of a washing machine: it doesn't run the rinse cycle once and hope the clothes are clean, it repeats the rinse cycle a set number of times, or until a sensor says the water is clear enough. A loop in code is the same idea: repeat this step, without you having to write it out five, ten, or ten thousand times.

If you've ever caught yourself copy-pasting a line of code and changing one small thing each time, that's usually a sign you want a loop instead. Loops exist so you can describe a repeated action once and let the computer handle the repeating.

Python has two loop constructs: `for`, which repeats a fixed, known number of times (or once per item in a collection), and `while`, which repeats for as long as a condition stays true, with no fixed count decided in advance.

## The `for` loop

```python
for number in range(5):
    print(number)
```

This prints `0`, `1`, `2`, `3`, `4`, each on its own line. Two things to unpack here.

First, `range(5)` produces a sequence of numbers starting at `0` and stopping *before* `5`. It does not include `5`. This trips up nearly every beginner at least once: `range(5)` gives you five numbers (`0` through `4`), not the number `5` itself. Python counts starting from `0` almost everywhere (this is called zero-indexing), and `range()` follows that convention. If you specifically want the numbers `1` through `5`, you'd write `range(1, 6)`: start at `1`, stop before `6`. Whenever a loop seems to be running "one time too few" or "one time too many," check whether you've correctly accounted for the fact that `range()`'s stopping point is excluded, not included. This class of mistake even has a name: an off-by-one error.

Second, `number` is the **loop variable**. On each pass through the loop, it's automatically updated to the next value from `range(5)`: first `0`, then `1`, and so on. A common early mistake is treating the loop variable as if it stays fixed for the whole loop, when its entire purpose is to change every time through. If you're getting confused about what a loop is doing, add a `print(number)` inside the loop body to see exactly what value it holds on each pass.

You can also loop directly over a collection, like a list of strings, without `range()` at all:

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(f"I like {fruit}")
```

Here, `fruit` takes on each value in `fruits` in turn: first `"apple"`, then `"banana"`, then `"cherry"`. No indexing, no counting, just "for each thing in this collection, do this."

## The `while` loop

```python
count = 5

while count > 0:
    print(count)
    count = count - 1

print("Liftoff!")
```

A `while` loop checks its condition (`count > 0`) before every pass. As long as that condition is true, it runs the indented block again. The moment the condition becomes false, it stops, and execution continues after the loop.

Use a `while` loop when you don't know in advance how many times you need to repeat, you only know the condition that should stop you. A `for` loop is the right tool when you already know the number of repetitions (or you're working through a known collection); a `while` loop is the right tool when the stopping point depends on something that happens while the loop is running.

Here's the single biggest risk with `while` loops: if you forget to update the variable the condition depends on, the condition never becomes false, and the loop runs forever. This is called an **infinite loop**, and it's an extremely common beginner mistake. In the example above, if you forgot the line `count = count - 1`, `count` would stay at `5` forever, `count > 0` would always be true, and the loop would print `5` endlessly until you force-stopped the program (in a terminal, `Ctrl+C` usually does this). If you ever run a script and it seems to hang with no output stopping, an infinite `while` loop is one of the first things to suspect. Check that every path through the loop body actually moves you closer to the condition becoming false.

## `break` and `continue`

Sometimes you want to exit a loop early, or skip just one pass without exiting entirely.

`break` exits the loop immediately, no matter what the loop's condition says:

```python
for number in range(10):
    if number == 5:
        break
    print(number)
```

This prints `0` through `4`, then stops the moment `number` becomes `5`.

`continue` skips the rest of the current pass and jumps straight to the next one, without exiting the loop:

```python
for number in range(5):
    if number == 2:
        continue
    print(number)
```

This prints `0`, `1`, `3`, `4`. It never prints `2`, because `continue` skipped the `print(number)` line for that one pass, but the loop kept going afterward.

## The accumulator pattern

A very common thing to do with a loop is build up a running total (or a running list, or a running count) across every pass. This is called the accumulator pattern, and you'll use it constantly:

```python
numbers = [4, 8, 15, 16, 23, 42]
total = 0

for number in numbers:
    total = total + number

print(total)
```

`total` starts at `0` before the loop begins. On each pass, it's reassigned to itself plus the current number. By the time the loop finishes, `total` holds the sum of everything. The variable that accumulates the result (`total` here) has to be created *before* the loop starts, with a sensible starting value (`0` for a sum, an empty list `[]` for a collected list). A common mistake is creating the accumulator variable inside the loop, which resets it to the starting value on every single pass, destroying whatever was accumulated so far.

## What to watch for

- `range(n)` stops before `n`, it does not include `n`. This is the classic off-by-one trap.
- The loop variable changes automatically every pass; don't treat it as a fixed value.
- Forgetting to update the condition variable inside a `while` loop causes an infinite loop. If your program hangs, check this first.
- Creating an accumulator variable inside the loop body instead of before the loop starts, which silently resets it every pass instead of building it up.
