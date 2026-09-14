# Week 5 (Blockchain track): Guided build

[← Back to Weeks](../../README.md)

Full context: [root README, Week 5](../../../README.md#week-5-chosen-track-guided-build).

## Goal

A real Solidity contract, common failure modes at a conceptual level, and a first, still-scaffolded transaction sent from Python. Instructions are still fairly step-by-step.

## Scope

- A Solidity contract beyond the trivial one from Week 4: state, access control, events.
- Common failure modes at a conceptual level (reentrancy, overflow, access control), before writing anything complex, so security is a habit, not an afterthought.
- With the contract deployed, send it a basic transaction and read its state back from a Python script, to confirm it actually works before automation enters the picture in Week 6.

## The project: AssetRegistry

Weeks 5, 6, and 7 build one project, not three. The contract you write and deploy this week, `AssetRegistry`, is the same contract the Week 6 backend service signs transactions against and the same contract the Week 7 service adds a second event handler and a test suite for. By the time you reach the Week 8 capstone, especially the acceptance gate, you will already have hands-on experience with exactly the shape of data that spec asks you to reason about: a holder's eligibility, a holder's balance (a size limit lives right next to it), and a timestamp of when that record last changed (a stand-in for "how fresh is the evidence backing this").

`AssetRegistry` is a deliberately small registry contract. It tracks, per address:

- whether that address is a **registered** holder at all,
- whether it is currently **eligible** to hold the asset,
- its current **balance**, and
- **when** that record was last touched.

Only the contract's owner (whoever deployed it, standing in for "our backend service") can register a holder or change any of those fields. Every change emits an event. That's the whole contract. It's small on purpose: the point of Weeks 5-7 is not "write a bigger contract," it's "build the off-chain muscle (transactions, managed keys, event handling, idempotency) that any real integration needs," and a small, well-understood contract is the right training weight for that.

## Do this in order

Steps 1-4 are required. Step 5 is optional; skipping it leaves no gap in what Week 6 assumes you know.

1. [ ] `notes/01-state-and-storage.md` through `05-organizing-a-walkthrough-script.md`, in order.
2. [ ] `exercises/00-guided-write-assetregistry.md`, a line-by-line guided build of the contract's genuinely new pieces (struct, mapping, access-control modifier), compiling after every step.
3. [ ] `exercises/01-read-and-predict.md`, six short Solidity snippets to read and predict, two per failure mode.
4. [ ] `project/README.md`'s full walkthrough: deploy with Ape, export the ABI, run `interact.py`.
5. Optional: `exercises/02-guided-write-creditledger.md`, a second, smaller guided build isolating just mapping-plus-access-check, useful if that combination didn't fully click the first time; and `project/README.md`'s two stretch goals (an aggregate read function, a fourth event) for more reps against this exact contract.
