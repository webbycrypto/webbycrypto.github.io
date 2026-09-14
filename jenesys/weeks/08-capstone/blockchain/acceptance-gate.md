# Acceptance gate (flagship)

[← Back to Week 8: Capstone, no safety net](../README.md)

An asset existing on a network isn't the same as a counterparty agreeing to treat it as real. Before taking it onto their books, a bank, fund, or automated system needs to believe the holder is allowed to hold it, the size is within limits, the facts backing it are current, and if something goes wrong later, the decision can be explained.

Build a backend service that answers that question, in real time, for a pending asset movement, before your own transaction-sending logic (from Weeks 6-7) acts on it.

## Constraints

- **Applies rules.** At least three distinct checks: eligibility, holder status, and a size limit at minimum (a freeze check is a good fourth). The specific rules are the learner's call.
- **Checks evidence.** Reject on stale or missing evidence about the asset (value, backing, any known incident) rather than guessing. Define a staleness window and be able to justify it.
- **Replies at once.** A single structured yes/no with a reason, in a shape a program could act on without a human reading prose.
- **Records the decision.** What was asked, what evidence was used, what was decided, durably enough to reconstruct and defend any past decision without re-running anything.

The gate decides whether your own backend proceeds to sign and send a transaction, exactly like Week 6's managed-key service, just gated by a check first. Keep the permission logic in your service, off-chain; this spec does not require or expect changes to the Solidity contract itself.

Anything not specified here (data format, exact API shape, how to structure the code) is the learner's call to make and justify, not a gap to ask about.

## A note on difficulty

This is the flagship spec: it synthesizes skills from Foundations, the guided build, and the low-scaffolding build into one service, rather than exercising one skill at a time. Every individual piece was taught somewhere in Weeks 1-7. Putting them together is the actual test. Expect this to take longer than the token issuance alternate, and lean toward the 8-12 week end of the program's range rather than the 6-week floor.
