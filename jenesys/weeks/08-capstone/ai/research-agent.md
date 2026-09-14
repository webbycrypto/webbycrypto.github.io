# Research agent

[← Back to Week 8: Capstone, no safety net](../README.md)

Given a topic, the tool autonomously uses at least one function/tool it calls itself (a lookup, a calculator, a stub search, the learner's choice) and produces a structured summary.

## Constraints

- It must show its own tool-calling steps in the output.
- It must degrade gracefully (say what it couldn't determine) if a tool call fails.

Anything not specified here (data format, exact API shape, how to structure the code) is the learner's call to make and justify, not a gap to ask about.
