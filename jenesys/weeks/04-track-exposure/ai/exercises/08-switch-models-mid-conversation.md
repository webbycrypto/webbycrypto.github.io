# Exercise: switch models without restarting

[← Back to Week 4: Track exposure](../../README.md)

A short, optional tweak on `../project/chatbot.py`. `MODEL` has been sitting at the top of the file as a plain constant this whole time, `"llama-3.3-70b-versatile"`, and every request has quietly used exactly that string. This exercise makes that value changeable while the bot is running, which sounds small but runs directly into a real, common piece of Python that nothing else in this folder has touched yet: variable scope.

## The task

Add a `model <name>` command (for example, typing `model llama-3.1-8b-instant`) that changes which model the *next* request uses, without restarting the program. Groq's free tier hosts a handful of different models of different sizes; check `https://console.groq.com/docs/models` for the current list, but a smaller, faster model alongside the default `llama-3.3-70b-versatile` is exactly the kind of thing worth having on hand to compare.

Add the new branch in the same place the other command branches from this folder's other exercises live, after the blank-input check and before `user_text` gets appended to history:

```python
if user_text.lower().startswith("model "):
    # your code here
    continue
```

Inside that branch, pull the part of the string after `"model "` out as the new model name (`user_text[6:].strip()` is one way, since `"model "` is 6 characters including the space; slicing off a fixed prefix like this is a small, real, reusable string-handling trick), and assign it to `MODEL`.

## Here's the part that will genuinely trip you up

`MODEL` is defined at the top of the file, outside of any function, which makes it a *global* variable, one that every function in the file can *read* freely, exactly like `SYSTEM_PROMPT` already gets read inside the loop without any special handling. But `main()` is a function, and by default, Python assumes that any variable a function *assigns to* anywhere inside its body is a brand-new local variable belonging only to that function, even if a global variable with the exact same name already exists. Try writing just `MODEL = new_model_name` inside `main()` without anything else, and Python will raise an `UnboundLocalError` the moment that line runs (or sometimes on an earlier read of `MODEL`, depending on exactly where the assignment sits in the function), because it decided, at the moment it saw an assignment to `MODEL` anywhere in `main()`, that `MODEL` is now a local name throughout the entire function, and a local variable has to be assigned before it's read.

The fix is to add one line at the very top of `main()`, before `client = build_client()`:

```python
global MODEL
```

That single line tells Python, explicitly, "when this function assigns to `MODEL`, mean the module-level one, not a new local one." With that line in place, your `model <name>` branch's assignment updates the exact same `MODEL` the API call already reads from, and every request from that point forward uses whatever you just typed.

## Try it

Have a short exchange with the default model, then switch:

```
You: model llama-3.1-8b-instant
You: What's 17 times 23, and explain your reasoning in one sentence.
Bot: ...
You: model llama-3.3-70b-versatile
You: quit
```

Notice a smaller model is typically faster to respond and confirm the switch actually took effect (print the current `MODEL` value right after changing it, as part of this same command, so you're not just trusting it happened silently). If you want to see the `UnboundLocalError` this exercise is actually about, temporarily delete the `global MODEL` line after you've got everything else working, trigger the command once, read the traceback, and then put the line back. Seeing an error you deliberately caused, and understanding exactly why Python raised it, is a more durable way to learn what `global` is for than only ever seeing the working version.
