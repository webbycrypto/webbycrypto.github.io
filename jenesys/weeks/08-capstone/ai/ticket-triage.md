# Ticket triage service

[← Back to Week 8: Capstone, no safety net](../README.md)

Build a service that takes an incoming support message and produces an urgency classification, a topic, and a drafted reply.

## Constraints

- It must log its own reasoning for the classification.
- It must never claim to have taken an action (like "assigned to billing") that the code didn't actually perform.
- Ambiguous or contradictory input must be handled without crashing.

Anything not specified here (data format, exact API shape, how to structure the code) is the learner's call to make and justify, not a gap to ask about.
