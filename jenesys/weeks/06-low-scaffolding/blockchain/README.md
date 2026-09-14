# Week 6 (Blockchain track): Low-scaffolding build

[← Back to Weeks](../../README.md)

Full context: [root README, Week 6](../../../README.md#week-6-chosen-track-low-scaffolding-build).

## Goal

A Python backend service that manages its own key and reacts to on-chain events, the enterprise-integration pattern. Instructions give the goal and point to documentation, not step-by-step directions. This is deliberate.

## Scope

- The service holds and uses a managed key on its own (testnet only) to sign and send transactions.
- It reacts to on-chain events as they happen, rather than checking state on demand.
- Reading state and exposing results through an API are already-practiced skills from Week 5 and Foundations, reapplied here, not new material.

## Same project, one step further

This is not a new contract and not a new project. You're extending the exact `AssetRegistry` contract you wrote, deployed, and sent a transaction to in Week 5 (`weeks/05-guided-build/blockchain/project/contracts/AssetRegistry.sol`). Redeploy it if you need a fresh instance, but don't rewrite it: the whole point of this week is that the contract is now a known, trusted quantity, and the new work is entirely on the Python side.

Week 5's `interact.py` was a script you ran by hand, once, to confirm the contract worked. This week's service is a program that runs on its own, holds its own key, and keeps working after you stop watching it. That's the actual shift in difficulty this week, not new Solidity.

## Instructions from here on

Starting this week, `project/` gives you a goal and a set of constraints, not a numbered walkthrough. That's deliberate (see "Program philosophy" in the root README): the implementation steps are yours to figure out from documentation, the way a real engineer would. `notes/` is not lighter on concepts because of that; read it in full before you start.

## Do this in order

Steps 1-2 are required. Steps 3-4 are optional; skipping them leaves no gap in what Week 7 assumes you know.

1. [ ] `notes/01-managed-keys.md` through `04-organizing-a-service.md`, in order.
2. [ ] `project/README.md`'s goal: a managed-key backend service for `AssetRegistry` that reacts to events. No numbered steps, on purpose.
3. Optional, before step 2, if the mechanics feel shaky: `exercises/00-practice-get-logs.md` and `01-practice-filters-and-new-entries.md`, cheap throwaway reps of the two event-watching approaches, on the `Greeter` contract you already have from Week 4.
4. Optional, after step 2: `project/README.md`'s stretch goal, a manual "force re-check" trigger.
