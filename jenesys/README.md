# Jenesys

A full-time bootcamp for someone who is comfortable with computers and apps, has never written a line of code, and is curious about blockchain and AI because that's where the industry noise is. Jenesys does not assume any prior programming background. It does assume the learner can install software, use a terminal-adjacent app, and read instructions carefully.

This document is the curriculum and the reasoning behind it. The [weeks/](weeks/README.md) folder is the working skeleton, one subfolder per week, matching this document. See [table-of-contents.md](table-of-contents.md) for a full, flat index of every note and brief in the program, useful for browsing this folder as an Obsidian vault.

## The outcome

Not "AI developer" or "blockchain developer." The target outcome is a **self-sufficient developer**: someone who can open unfamiliar documentation, form a hypothesis about a bug from an error message, and ship a working project without a tutorial holding their hand. Blockchain and AI are the tracks that keep the learner motivated through the hard middle weeks, not the finish line itself. A learner who finishes Jenesys should be equally capable of picking up a framework, a library, or a whole domain that isn't in this document at all.

## Format

- Full-time, 8 hours/day, 5 days/week. Duration is a range, not a promise: **6 weeks (240 hours) is the floor**, achievable only by a learner who clears every checkpoint on the first attempt. **8 weeks (320 hours) is the realistic average** for this program's stated audience (technically comfortable, never coded), and the week-by-week below is written at that pace. **10-12 weeks is a normal outcome**, not a failure, for a learner who needs to repeat a phase, which the program's own checkpoints actively encourage when the evidence says a skill isn't solid yet.
- Self-paced and solo for now. Every phase ends with a self-check against a checkpoint, so the structure works unsupervised. It's written so a future cohort version only needs to add mentor review at each checkpoint, not a redesign.
- One language for the entire program, start to finish: **Python**.

## Why Python, and not JavaScript

Python was chosen deliberately over JavaScript for two reasons:

- **Lower syntax friction for a true beginner.** JavaScript carries a lot of accidental complexity that has nothing to do with learning to program (var/let/const, `this` binding, callback style before async/await, loose equality footguns, a fragmented module ecosystem). Python strips most of that away, which is why it's become the dominant first language in CS education.
- **It matches both tracks without switching languages.** The AI ecosystem is Python-first everywhere (every major framework's docs lead with Python). For the blockchain track, **web3.py** (and the **Ape** framework for the full contract lifecycle: compile, test, deploy, interact) covers reading contract state, sending transactions, deploying contracts, and monitoring events, all without leaving Python. Solidity is still the only new *language* a blockchain learner picks up, exactly as it would be in any version of this program.

This works cleanly because the blockchain track here is framed around **enterprise and backend integration**, not consumer wallet apps. A real user clicking "Connect Wallet" in a browser needs JavaScript, because that's how browsers expose wallet access. But that's a narrow, specific UI problem, not what most blockchain engineering work actually is. Enterprise blockchain work looks like a backend service that holds its own managed key, signs and sends transactions programmatically, reads contract state, reacts to on-chain events, and integrates with a company's existing databases and APIs. That's squarely a Python problem, and it's what this program teaches.

## Program philosophy

1. **Foundations before tracks.** Blockchain development is backend development with extra constraints. AI application development is also mostly backend/software development plus API calls. Rushing into either without shared foundations produces someone who can copy tutorials but can't debug anything.
2. **Scaffolding decreases every phase, on purpose.** Week 1 is heavily guided. Week 8 has no tutorial at all. Self-sufficiency is trained, not assumed.
3. **Track choice is not a fork in the road, it's a sequencing decision.** Both tracks are completable, and doing both is the assumed default, not a bonus for fast finishers. One track's Weeks 5-7 alone, measured against real content rather than the nominal 40-hour-a-week schedule, comes to roughly 25-50 hours, not 120. That's by design (see "Program philosophy" point 4 below), and it means a single track does not fill this phase on its own. The program is written expecting most learners to move directly into the second track's Weeks 5-7 once the first is done, which is what actually fills the equivalent of a full multi-week phase; see "The second track" below for the real numbers.
4. **Weeks 5-7's projects stay deliberately small.** AssetRegistry and Notes Assistant are kept simple on purpose, so the off-chain and integration skills (transactions, managed keys, event handling, tool use, retrieval) stay the focus instead of contract or app complexity. The tradeoff is real and known: either track alone is lighter on hours than Weeks 1-3. Point 3 above is the intended way to spend that extra time, not a workaround.

## Week-by-week (8 hours/day, 8-week average pace)

### Week 1: Foundations I
- Days 1-2: dev environment setup; programming logic in Python (variables, conditionals, loops, functions), isolated exercises only.
- Day 3: the command line and git (navigating, running scripts, reading error output, commit/branch/push/pull and why version control exists).
- Days 4-5: how software actually runs (client vs. server, what an API is, request/response cycles, what hosting means). Ends with a small script that calls a public API and does something with the response.

### Week 2: Foundations II and first project
- Days 1-3: build a complete small service from scratch (a notes/task API with persistence, more than one endpoint, at least one error case handled on purpose) using a lightweight Python framework (FastAPI or Flask).
- Day 4: debugging drills, fixing deliberately broken code with no answer key.
- Day 5: retrospective and an honest first pass at the Foundations checkpoint (below).

### Week 3: Foundations consolidation
- Days 1-4: a second, different small service (an inventory tracker, a link shortener, the learner's choice), covering the same ground as Week 2 but with less explicit instruction, so the checkpoint below gets tested against new material rather than a repeat of something already memorized.
- Day 5: retrospective and the real self-check against the Foundations checkpoint.

**Foundations checkpoint:** can the learner read an error message, form a hypothesis about the cause, and fix it without being told the answer, on a project they haven't seen before? If not, repeat the shaky part of Weeks 1-3 before continuing. Nothing about this is timed to a deadline; this checkpoint is the highest-leverage one in the program, since every later week assumes it's solid.

### Week 4: Track exposure
- Days 1-2: AI track taste. Call a hosted model's API from code, understand tokens/prompts/cost, build a tiny chatbot with memory.
- Days 3-4: Blockchain track taste. What a private key and a transaction actually are, use a testnet only (never real funds at this stage), write and deploy a first, trivial Solidity contract, and call it from a Python script using web3.py.
- Day 5: choose the primary track for Weeks 5-7, based on this week's evidence rather than the hype from before Week 1.

### Week 5: Chosen track, guided build

A heads-up before this week starts: Weeks 5-7 are lighter than Weeks 1-3 in real content, roughly 25-50 hours total for one track rather than 120, because the projects stay deliberately small (see "Program philosophy" point 4). Don't read that as behind schedule; it's the intended shape. Plan on moving into the second track's Weeks 5-7 right after finishing this track's Week 7, rather than waiting until Week 8 to decide, unless you'd genuinely rather stop at one track's capstone. Either is a legitimate way to use the time; see "The second track" near the end of this document.

**AI track:** a small app around a model (summarizer, classifier, or chatbot with real memory), plus an intro to retrieval (why raw model calls aren't enough for anything that needs facts, what a vector search does conceptually).

**Blockchain track:** a real Solidity contract beyond the trivial one (state, access control, events), plus the common failure modes at a conceptual level (reentrancy, overflow, access control) before writing anything complex, so security is a habit, not an afterthought. With the contract deployed, send it a basic transaction and read its state back from a Python script, still with scaffolding, to confirm it actually works before automation enters the picture in Week 6.

Instructions are still fairly step-by-step this week.

### Week 6: Chosen track, low-scaffolding build
**AI track:** tool use and agents at a beginner level: the model calls at least two functions the learner wrote, chained (the output of one can decide whether the other gets called), and the learner handles a tool call that fails or returns something unexpected without crashing or fabricating a result.

**Blockchain track:** a Python backend service that holds and uses a managed key on its own (testnet only) to sign and send transactions, and reacts to on-chain events as they happen rather than checking state on demand. Reading state and exposing results through an API are already-practiced skills from Week 5 and Foundations, reapplied here, not new material. This is the enterprise-integration pattern: no browser, no wallet popup, just a backend talking to a chain the way it would talk to any other data source.

Instructions this week give the goal and point to documentation, not step-by-step directions. This is deliberate.

### Week 7: Chosen track, low-scaffolding build continued
Extend Week 6's project rather than starting a new one, still with only docs and a goal, no step-by-step directions:

**AI track:** add persistence to the agent (it remembers past runs), handle a second, different tool-chaining scenario, and make it robust to a bad or missing input it hasn't seen before.

**Blockchain track:** add retry logic and idempotency to the backend service, handle a second event type from the contract, and write a small test suite that would catch it if the service double-processed an event.

The point of this week is practice under low scaffolding *before* the safety net comes off entirely, not new material. A learner who finds Week 7 easy is ready for Week 8; a learner who's still fighting the tools here should stay another few days rather than move on.

### Week 8: Capstone, no safety net
- Days 1-4: pick one capstone spec from the learner's track (below) and build it. Only documentation and the learner's own judgment, no tutorial. This is the self-sufficiency test, not a bonus round.
- Day 5: retrospective, self-sufficiency rubric assessment (below), and a decision on whether to continue into the second track.

## Week 8 capstone specs

Each spec below is a real brief: a goal and a set of constraints, deliberately missing implementation steps. Anything not specified (data format, exact API shape, how to structure the code) is the learner's call to make and justify, not a gap to ask about. Pick one per track. All blockchain specs are testnet-only.

### AI track

**1. Docs assistant.** Build a tool that answers questions about a folder of text/markdown documents the learner provides. It must refuse to answer, rather than guess, when the documents don't contain the answer, and every answer must cite which document (and ideally which section) it came from. Interface can be a CLI or a small API; the learner's choice.

**2. Ticket triage service.** Build a service that takes an incoming support message and produces: an urgency classification, a topic, and a drafted reply. It must log its own reasoning for the classification, and it must never claim to have taken an action (like "assigned to billing") that the code didn't actually perform. Ambiguous or contradictory input must be handled without crashing.

**3. Research agent.** Given a topic, the tool autonomously uses at least one function/tool it calls itself (a lookup, a calculator, a stub search, the learner's choice of tool) and produces a structured summary. It must show its own tool-calling steps in the output, and it must degrade gracefully (say what it couldn't determine) if a tool call fails.

### Blockchain track

**1. Acceptance gate (flagship).** An asset existing on a network isn't the same as a counterparty agreeing to treat it as real: before taking it onto their books, a bank, fund, or automated system needs to believe the holder is allowed to hold it, the size is within limits, the facts backing it are current, and if something goes wrong later, the decision can be explained. Build a backend service that answers that question, in real time, for a pending asset movement, before your own transaction-sending logic (from Weeks 6-7) acts on it:

  - **Applies rules.** At least three distinct checks: eligibility, holder status, and a size limit at minimum (a freeze check is a good fourth). The specific rules are the learner's call.
  - **Checks evidence.** Reject on stale or missing evidence about the asset (value, backing, any known incident) rather than guessing. Define a staleness window and be able to justify it.
  - **Replies at once.** A single structured yes/no with a reason, in a shape a program could act on without a human reading prose.
  - **Records the decision.** What was asked, what evidence was used, what was decided, durably enough to reconstruct and defend any past decision without re-running anything.

  The gate decides whether *your own backend* proceeds to sign and send a transaction, exactly like Week 6's managed-key service, just gated by a check first. Keep the permission logic in your service, off-chain; this spec does not require or expect changes to the Solidity contract itself.

**2. Token issuance backend.** Build a backend service that issues and tracks a simple token on behalf of a business process (loyalty points, credits, the learner's framing), with an internal API to trigger issuance and check balances. It must be able to detect and report a mismatch between its internal ledger and actual on-chain state.

## Self-sufficiency rubric (Week 8 gate)

This is written to double as the rubric for the future cohort version, so it's deliberately concrete rather than a vibe check. It's also written for a solo learner with no mentor to score them, so each category comes with self-assessment questions to answer honestly about the actual week just finished, not about how the week was supposed to go, plus a scoring guide to turn those answers into a 1-4. A pass requires at least a 3 in every category.

### Independent problem solving
- When you got stuck, was your first move to search docs/error messages, or to ask someone or give up?
- Count roughly how many times this week you resolved something using only documentation or experimentation, versus needing an outside answer (a person, or a full example to copy).

**Score:** 4, every stuck point resolved independently. 3, mostly independent, at most one outside nudge that wasn't a handed answer. 2, needed a direct outside answer more than once. 1, regularly stuck for hours with no path forward without one.

### Debugging
- Pick your worst bug this week. Did you form a specific guess about the cause before changing anything, or did you just start changing things and see what happened?
- Right now, can you explain exactly why that bug happened and why your fix addressed the real cause, not just the symptom?

**Score:** 4, can explain root cause and fix for every real bug hit. 3, true for most, one or two fixes were "and then it worked" without full understanding. 2, several fixes were trial-and-error without understanding why they worked. 1, bugs got fixed by random changes, root causes mostly unknown.

### Code comprehension
- Open the capstone code now. Pick 5 random lines. Can you say what each one does and why it's there, without re-reading the surrounding code first?
- Is there any block you wrote by copying a docs example that you never fully worked through afterward?

**Score:** 4, any line, cold, explainable. 3, nearly all of it, except one narrow piece copied from docs and not fully unpacked. 2, multiple sections need re-reading before you can explain them. 1, large parts are "it works, I don't know why."

### Building from a spec
- Before writing code, did you plan or sketch what you were building, or start typing and figure out structure as you went with no plan at all?
- Did you finish the spec's actual core goal without looking for a tutorial or a full solution to copy from, even if you used docs for specific pieces along the way?

**Score:** 4, planned, then built the full core goal with no full-solution lookup. 3, built the core goal, leaned on a tutorial for one sub-piece only. 2, needed a tutorial or template for most of the structure. 1, couldn't start without finding something close to a full solution to copy.

### Judgment under ambiguity
- The spec left something undefined (a data format, an API shape, an edge case). Name one thing you decided on your own, and state why you chose it.
- When you hit an undefined edge case, did you make a call and move forward, or avoid/skip it?

**Score:** 4, made and can justify multiple independent calls on undefined parts of the spec. 3, made calls but second-guessed and revisited them more than needed. 2, avoided or skipped ambiguous parts rather than deciding. 1, got stuck specifically because the spec didn't spell out every detail.

A learner who scores below 3 in any category repeats the relevant part of Weeks 5-8 rather than moving on. There is no time pressure to pass on the first attempt; the rubric exists to make "done" mean something specific. If every answer above rounds up to a 4 without hesitation, that's worth treating with suspicion rather than as a clean pass; write down the actual evidence (the bug, the line, the decision) for each score, not just the number.

## The second track: the assumed path, not a bonus

One track's Weeks 5-7 comes to roughly 25-50 real hours, plus however long the capstone takes (open-ended by design; see the rubric above). That's not a shortfall to apologize for, it's the direct result of keeping the projects small on purpose (Program philosophy point 4). It also means one track alone does not fill a phase the size of Weeks 1-3.

This program is written expecting most learners to go straight into the second track's Weeks 5-7 after finishing the first track's capstone, not as a stretch goal for people with extra time. Doing both brings the combined Weeks 5-7 real-hour total to roughly 50-100 hours, which is what actually matches Weeks 1-3's weight; either track alone does not. Completing just one track's capstone is still a completely legitimate place to stop. But if the stated 6-12 week schedule is the frame someone has in mind, and Weeks 5-7 felt short against it, doing the second track is the intended answer, not an optional extra.

This is also the natural seam for the future cohort structure: a core cohort everyone takes through Weeks 1-4, then both tracks in sequence for most learners rather than a single branch.

## Tools and setup

Full step-by-step setup instructions are in [weeks/00-setup](weeks/00-setup/README.md). Summary:

- A code editor (VS Code), Python 3, and git installed locally.
- A GitHub account for version control and later, for sharing capstone projects.
- For the AI track: a free Groq API key for Week 4's taste week (no billing needed at all), then an Anthropic API key from Week 5 onward (a few dollars of credit is enough for the whole rest of the program).
- For the blockchain track: web3.py, the Ape framework, a testnet RPC endpoint (a free tier from a provider like Infura or Alchemy, or a local test chain via Ape), and a testnet faucet for free test funds. No real cryptocurrency and no browser wallet at any point in the core program.

## After Jenesys

- A track capstone is a legitimate portfolio piece: it was built from a spec, not copied from a tutorial, and the learner can explain every line of it.
- Because Weeks 1-3 are shared foundations, picking up the second track, or a domain not covered here at all, is weeks of work rather than months. The hard part, thinking like a programmer instead of following one, is already done.
- A learner who wants to go further into consumer-facing blockchain work later (browser wallet connections, user-facing dApp UI) will need to pick up JavaScript/TypeScript for that specific piece. That's a narrow, well-scoped addition at that point, not a redesign of what they already know.
