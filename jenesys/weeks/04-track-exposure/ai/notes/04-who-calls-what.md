# You calling the model, versus the model calling a function

[← Back to Week 4: Track exposure](../../README.md)

Everything you build this week follows one simple shape: your code sends text, the model sends text back. That's it. No exceptions this week. But it's worth understanding, even briefly, the shape of what comes next in Week 6, because the vocabulary ("tool use," "function calling," "agents") gets thrown around constantly in AI marketing, usually without anyone explaining what it actually means underneath.

## This week: you call the model

In everything you build in Days 1-2, the flow only ever goes one direction per turn:

1. Your Python code decides it wants a reply and sends a request.
2. The model generates text and sends it back.
3. Your code prints it, or does whatever it wants with that text.

The model itself never does anything except read text and produce text. It can't browse the internet, run code, check a database, or take any action in the world on its own. It is, at this stage, a very sophisticated text-in, text-out function that you call, and the calling always starts with you.

## Later (Week 6): the model can ask your code to do something

Starting in Week 6, you'll give the model descriptions of specific functions your own Python code knows how to run, things like "look up the weather for a city" or "check an order status in a database." You describe these to the model in plain terms: what the function is called, what it does, what input it needs.

Here's the part that trips people up: the model still never runs any code itself. What actually happens is:

1. You send a request, along with the list of functions it's allowed to ask for.
2. Instead of (or in addition to) replying with regular text, the model can reply with something like "I want you to call the `get_weather` function with the city set to `Boston`."
3. Your code sees that request, actually runs your real `get_weather` Python function, and gets a real result.
4. Your code sends that result back to the model as part of the next request.
5. The model reads the result and continues the conversation, now able to talk about real, current weather in Boston instead of just guessing based on whatever it was trained on.

So "the model calls a function" is really shorthand for "the model asks your code to call a function, and your code decides whether to actually do it." The model proposes; your code disposes. This distinction matters a lot once you start building things that take real actions (sending an email, changing a database, sending a blockchain transaction), because it means every action a model-powered program takes is still, ultimately, a line of your own code that you wrote and are responsible for. The model can suggest a bad or malicious-looking function call; your code is what decides whether that call actually runs.

You don't need to write any of this yet. Nothing in this week's chatbot project uses tool calling. This note exists so that when Week 6 introduces it, you're building on a concept you've already seen described once, in plain language, instead of meeting it for the first time in the middle of new code.
