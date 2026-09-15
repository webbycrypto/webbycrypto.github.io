# Classes, the minimum you need

[← Back to Going further](../README.md)

## TL;DR

A class is a blueprint for bundling data and behavior together under one name, the same "define once, use everywhere" idea as a function, just holding a group of related values instead of a single block of steps.

- You already represent structured data as a dict, like `{"topic": "billing", "urgency": "high"}`. A class does something similar, but the values become named attributes on an object, and the object can carry methods (functions that act on its own data) along with them.
- `__init__` is the method that runs when you create a new instance. Its job is to set the instance's starting attributes.
- `self` is how a method refers to "this particular instance." It's the first parameter of every method, and Python passes it in automatically; you never type it yourself when calling the method.
- A method is just a function defined inside a class. You call it on an instance with dot notation, the same way you've already been calling `.append()` on a list or `.get()` on a dict.

```python
class SupportTicket:
    def __init__(self, topic, urgency):
        self.topic = topic
        self.urgency = urgency

    def is_urgent(self):
        return self.urgency == "high"


ticket = SupportTicket("billing", "high")
print(ticket.topic)         # "billing"
print(ticket.is_urgent())   # True
```

## Why bother, if a dict already works

A dict works fine for this exact example. The difference shows up once a piece of data has behavior attached to it, not just values. `is_urgent()` above is a method that knows how to answer a question about a ticket's own data. With a plain dict, that same logic would have to live somewhere else, as a separate function you remember to call and pass the dict into every time:

```python
def is_urgent(ticket_dict):
    return ticket_dict["urgency"] == "high"
```

Both work. The class version keeps the data and the logic that operates on it in one place, findable by looking at the class itself instead of hunting for whatever function happens to use that dict's keys. That's the same "keep related things together" idea from Week 2's [notes on organizing your code](../../02-foundations-ii/notes/06-organizing-your-code.md), just applied at a smaller scale than splitting files.

## Defining and creating instances

```python
class SupportTicket:
    def __init__(self, topic, urgency):
        self.topic = topic
        self.urgency = urgency
```

`class SupportTicket:` starts the definition. `__init__` runs automatically the moment you create a new ticket. `self.topic = topic` and `self.urgency = urgency` are the actual work: they take the values passed in and store them as attributes on this specific instance.

`SupportTicket("billing", "high")` is where a real ticket gets created. This is called **instantiating** the class. Each call makes an entirely separate instance with its own `topic` and `urgency`; creating a second ticket doesn't touch the first one's attributes at all.

```python
first = SupportTicket("billing", "high")
second = SupportTicket("dark mode request", "low")

print(first.topic)   # "billing"
print(second.topic)  # "dark mode request"
```

## What this note is not covering

On purpose, so the scope stays small: inheritance (one class building on another), abstract base classes, multiple inheritance, class methods and static methods, properties, or any dunder method other than `__init__`. Those are real, useful parts of Python's class system, but none of them are the thing blocking you from reading pydantic's docs. This note covers exactly enough to recognize `class X:`, `__init__`, `self`, and a method call, because that's the actual prerequisite.

## What to watch for

- Forgetting `self` as the first parameter of a method. Every method defined inside a class takes `self` first, even if the method doesn't otherwise use any of the instance's attributes.
- Forgetting the parentheses when creating an instance (`ticket = SupportTicket` instead of `ticket = SupportTicket("billing", "high")`). Without the call, `ticket` is the class itself, not an actual ticket, and using it like one fails in confusing ways later, not immediately.
- Confusing an attribute (`ticket.topic`, a value) with a method (`ticket.is_urgent()`, something you call). Forgetting the parentheses on a method call doesn't error immediately either; it just hands you the method itself instead of its result.
