# Table of contents

[← Back to Jenesys](README.md)

Every page in Jenesys, one consistent structure per week: an overview link, then **Required** (in order) and **Optional** (extra reps and stretch goals, skippable with no gap in later weeks). This mirrors each week's own "Do this in order" checklist exactly; open the week's `README.md` for the full step-by-step, come back here to jump straight to a specific page.

Built for browsing this folder as an Obsidian vault (open `jenesys/` itself as the vault root) and for GitHub: every link is a plain relative path, and every heading below (`##` for weeks, `###` for tracks) is a real Markdown heading, not bold text, so Obsidian's own Outline pane can navigate this whole file.

Start here: [Jenesys](README.md), the curriculum and the reasoning behind it.

## Week 0: Setup

[Overview](weeks/00-setup/README.md)

**Required, in order:** a code editor (VS Code), Python 3, git and a GitHub account, a free Groq account (key can wait until Week 4), a blockchain-track RPC provider account (can wait until Week 4). Full steps and the "before you start Week 1" checklist are in the overview page above; this page doesn't split them out further since it's a single short setup document, not a multi-file folder.

## Week 1: Foundations I

[Overview](weeks/01-foundations-i/README.md)

**Required, in order:**
1. Notes: [Variables and data types](weeks/01-foundations-i/notes/01-variables-and-data-types.md) · [Conditionals](weeks/01-foundations-i/notes/02-conditionals.md) · [Loops](weeks/01-foundations-i/notes/03-loops.md) · [Functions](weeks/01-foundations-i/notes/04-functions.md), each read alongside its matching exercises (see [exercises overview](weeks/01-foundations-i/exercises/README.md) for the full list: 01-08 core, 10-21 more reps in new domains).
2. Guided walkthroughs: [09: grade report](weeks/01-foundations-i/exercises/09_guided_grade_report.md) · [22: password audit](weeks/01-foundations-i/exercises/22_guided_password_audit.md).
3. Notes: [The command line](weeks/01-foundations-i/notes/05-command-line.md) · [Git basics](weeks/01-foundations-i/notes/06-git-basics.md) · [How the internet and APIs work](weeks/01-foundations-i/notes/07-how-the-internet-and-apis-work.md).
4. [Project: call a public API](weeks/01-foundations-i/project/README.md).

**Optional:**
- [Project stretch goals](weeks/01-foundations-i/project/README.md) (in the same file): a unique-facts filter, a second API, an interactive loop.

## Week 2: Foundations II and first project

[Overview](weeks/02-foundations-ii/README.md)

**Required, in order:**
1. Notes: [Web frameworks](weeks/02-foundations-ii/notes/01-web-frameworks.md) · [Endpoints and routes](weeks/02-foundations-ii/notes/02-endpoints-and-routes.md) · [Persistence](weeks/02-foundations-ii/notes/03-persistence.md) · [Error handling](weeks/02-foundations-ii/notes/04-error-handling.md), each read alongside `exercises/01`-`04`.
2. [Exercises overview](weeks/02-foundations-ii/exercises/README.md): 05-07 a second rep in new domains, [08: guided validation endpoint](weeks/02-foundations-ii/exercises/08_guided_validation_endpoint.md).
3. Notes: [Debugging methodology](weeks/02-foundations-ii/notes/05-debugging-methodology.md) · [Organizing your code](weeks/02-foundations-ii/notes/06-organizing-your-code.md).
4. [Guided first endpoint walkthrough](weeks/02-foundations-ii/project/guided-first-endpoint.md), then [the project walkthrough](weeks/02-foundations-ii/project/README.md) for the rest.
5. [Debugging drill: symptoms](weeks/02-foundations-ii/project/debugging_drill_symptoms.md), diagnose before reading [the explanation](weeks/02-foundations-ii/solutions/debugging_drill_explained.md).

**Optional:**
- [Project stretch goals](weeks/02-foundations-ii/project/README.md) (in the same file): completed flag, tags, search, sort, pagination, bulk-create, a stats endpoint.

## Week 3: Foundations consolidation

[Overview](weeks/03-foundations-consolidation/README.md)

**Required, in order:**
1. Notes: [What carries over from Week 2](weeks/03-foundations-consolidation/notes/01-what-carries-over.md) · [Redirects and short codes](weeks/03-foundations-consolidation/notes/02-redirects-and-short-codes.md).
2. [Guided walkthrough: `redirect()`](weeks/03-foundations-consolidation/exercises/01_guided_redirect_mini_app.md).
3. [Project: a URL shortener](weeks/03-foundations-consolidation/project/README.md).
4. [Note: organizing a growing file](weeks/03-foundations-consolidation/notes/03-organizing-a-growing-file.md).
5. [Second project: a key-value config store API](weeks/03-foundations-consolidation/project/second-project-config-store.md).
6. [Foundations checkpoint: self-check](weeks/03-foundations-consolidation/checkpoint.md).

**Optional:**
- Stretch goals in [the URL shortener brief](weeks/03-foundations-consolidation/project/README.md) (click tracking) and [the config store brief](weeks/03-foundations-consolidation/project/second-project-config-store.md) (full value-history).

## Week 4: Track exposure

[Overview](weeks/04-track-exposure/README.md)

### AI track

**Required, in order:**
1. Notes: [What a hosted AI model API actually is](weeks/04-track-exposure/ai/notes/01-hosted-model-apis.md) · [Prompts and tokens](weeks/04-track-exposure/ai/notes/02-prompts-and-tokens.md) · [What billing actually looks like](weeks/04-track-exposure/ai/notes/03-cost-and-billing.md) · [You calling the model, versus the model calling a function](weeks/04-track-exposure/ai/notes/04-who-calls-what.md).
2. [Guided build: the chatbot, line by line](weeks/04-track-exposure/ai/exercises/00-guided-build-the-chatbot.md).
3. [Project: a tiny chatbot with memory](weeks/04-track-exposure/ai/project/README.md).

**Optional**, standalone, any order: [personality/cost/memory-cap](weeks/04-track-exposure/ai/exercises/01-tweak-the-bot.md) · [a stats command](weeks/04-track-exposure/ai/exercises/02-add-a-stats-command.md) · [a clear command](weeks/04-track-exposure/ai/exercises/03-add-a-clear-command.md) · [cap message length](weeks/04-track-exposure/ai/exercises/04-cap-message-length.md) · [log to a file](weeks/04-track-exposure/ai/exercises/05-log-the-conversation-to-a-file.md) · [classify a message](weeks/04-track-exposure/ai/exercises/06-classify-a-message.md) · [retry with backoff](weeks/04-track-exposure/ai/exercises/07-retry-with-backoff.md) · [switch models mid-conversation](weeks/04-track-exposure/ai/exercises/08-switch-models-mid-conversation.md).

### Blockchain track

**Required, in order:**
1. Notes: [Private keys and addresses](weeks/04-track-exposure/blockchain/notes/01-private-keys-and-addresses.md) · [Transactions and gas](weeks/04-track-exposure/blockchain/notes/02-transactions-and-gas.md) · [Testnets and faucets](weeks/04-track-exposure/blockchain/notes/03-testnets-and-faucets.md) · [What a smart contract actually is](weeks/04-track-exposure/blockchain/notes/04-smart-contracts.md).
2. [Guided build: Greeter, line by line](weeks/04-track-exposure/blockchain/exercises/00-guided-write-greeter.md).
3. [Project: deploy and call a trivial smart contract](weeks/04-track-exposure/blockchain/project/README.md).

**Optional**, standalone, any order, each a full edit/recompile/redeploy/call cycle: [a change counter and reset](weeks/04-track-exposure/blockchain/exercises/01-extend-the-contract.md) · [an owner-only emergency reset](weeks/04-track-exposure/blockchain/exercises/02-restrict-an-emergency-reset-to-the-owner.md) · [a second event](weeks/04-track-exposure/blockchain/exercises/03-add-a-second-event.md) · [a length cap and revert handling](weeks/04-track-exposure/blockchain/exercises/04-cap-the-length-and-handle-the-revert.md) · [tracking the longest greeting](weeks/04-track-exposure/blockchain/exercises/05-track-the-longest-greeting.md).

## Week 5: Guided build

No shared overview file; each track's own README is the entry point.

### AI track

[Overview](weeks/05-guided-build/ai/README.md)

**Required, in order:**
1. Notes: [Why retrieval matters](weeks/05-guided-build/ai/notes/01-why-retrieval-matters.md) · [Embeddings and vector search](weeks/05-guided-build/ai/notes/02-embeddings-and-vector-search.md) · [Organizing Notes Assistant](weeks/05-guided-build/ai/notes/03-organizing-notes-assistant.md).
2. [Guided build: retrieval core, line by line](weeks/05-guided-build/ai/exercises/00-guided-build-retrieval.md) (no API key needed).
3. Exercises: [01 single prompt](weeks/05-guided-build/ai/exercises/01_single_prompt.py) · [02 multi-turn chat](weeks/05-guided-build/ai/exercises/02_multi_turn_chat.py) · [03 structured extraction](weeks/05-guided-build/ai/exercises/03_structured_extraction.py).
4. [Project: Notes Assistant v1](weeks/05-guided-build/ai/project/README.md).

**Optional:**
- [Guided build: citation logic, line by line](weeks/05-guided-build/ai/exercises/04-guided-build-citations.md) (no API key needed).
- [Exercises overview](weeks/05-guided-build/ai/exercises/README.md): 05-11, further standalone reps (substring vs. keyword matching, a second chunking strategy, your own sample note, chunk overlap, stopword tuning, `top_k` tuning, system-prompt grounding).
- [`bonus_vector_similarity.py`](weeks/05-guided-build/ai/project/bonus_vector_similarity.py): a real vector and similarity formula in plain Python.

### Blockchain track

[Overview](weeks/05-guided-build/blockchain/README.md)

**Required, in order:**
1. Notes: [State and storage](weeks/05-guided-build/blockchain/notes/01-state-and-storage.md) · [Access control](weeks/05-guided-build/blockchain/notes/02-access-control.md) · [Events](weeks/05-guided-build/blockchain/notes/03-events.md) · [Common failure modes](weeks/05-guided-build/blockchain/notes/04-failure-modes.md) · [Organizing (or not) a walkthrough script](weeks/05-guided-build/blockchain/notes/05-organizing-a-walkthrough-script.md).
2. [Guided build: AssetRegistry, line by line](weeks/05-guided-build/blockchain/exercises/00-guided-write-assetregistry.md).
3. [Exercises: read and predict](weeks/05-guided-build/blockchain/exercises/01-read-and-predict.md) (six snippets, two per failure mode).
4. [Project: deploy AssetRegistry, then send it a transaction from Python](weeks/05-guided-build/blockchain/project/README.md) (includes the ABI export step).

**Optional:**
- [Guided build: CreditLedger, line by line](weeks/05-guided-build/blockchain/exercises/02-guided-write-creditledger.md), a second, smaller rep of mapping plus access control.
- Two stretch goals in [the project brief](weeks/05-guided-build/blockchain/project/README.md) (an aggregate read function, a fourth event).

## Week 6: Low-scaffolding build

### AI track

[Overview](weeks/06-low-scaffolding/ai/README.md)

**Required, in order:**
1. Notes: [Tool use (function calling), for real](weeks/06-low-scaffolding/ai/notes/01-tool-use-mechanics.md) · [Failure handling, and why fabricated tool results are a real problem](weeks/06-low-scaffolding/ai/notes/02-failure-handling-and-hallucinated-results.md) · [Organizing Notes Assistant as it grows](weeks/06-low-scaffolding/ai/notes/03-organizing-as-it-grows.md).
2. [Project: give Notes Assistant real tools](weeks/06-low-scaffolding/ai/project/README.md).

**Optional:**
- [Exercises overview](weeks/06-low-scaffolding/ai/exercises/README.md): cheap throwaway reps, tool schema syntax, a tiny tool round-trip, parallel tool calls.
- The stretch goal in [the project brief](weeks/06-low-scaffolding/ai/project/README.md) (a third, differently-triggered tool).

### Blockchain track

[Overview](weeks/06-low-scaffolding/blockchain/README.md)

**Required, in order:**
1. Notes: [Managed keys](weeks/06-low-scaffolding/blockchain/notes/01-managed-keys.md) · [The transaction lifecycle, from a backend's point of view](weeks/06-low-scaffolding/blockchain/notes/02-transaction-lifecycle-for-services.md) · [Event-driven reactivity](weeks/06-low-scaffolding/blockchain/notes/03-event-driven-reactivity.md) · [Organizing a service, not a script](weeks/06-low-scaffolding/blockchain/notes/04-organizing-a-service.md).
2. [Project: a managed-key backend service for AssetRegistry](weeks/06-low-scaffolding/blockchain/project/README.md).

**Optional:**
- [Practice: get_logs](weeks/06-low-scaffolding/blockchain/exercises/00-practice-get-logs.md) · [Practice: filters and get_new_entries](weeks/06-low-scaffolding/blockchain/exercises/01-practice-filters-and-new-entries.md), throwaway reps on the Week 4 Greeter contract.
- The stretch goal in [the project brief](weeks/06-low-scaffolding/blockchain/project/README.md) (a manual force re-check trigger).

## Week 7: Low-scaffolding build, continued

### AI track

[Overview](weeks/07-low-scaffolding-continued/ai/README.md)

**Required, in order:**
1. Notes: [Persistence, for an agent specifically](weeks/07-low-scaffolding-continued/ai/notes/01-persistence.md) · [Robust to a bad or missing input it hasn't seen before](weeks/07-low-scaffolding-continued/ai/notes/02-robust-to-bad-input.md) · [Organizing Notes Assistant, with a second new concern on top](weeks/07-low-scaffolding-continued/ai/notes/03-organizing-the-second-addition.md).
2. [Project: persistence, a second chaining scenario, robustness](weeks/07-low-scaffolding-continued/ai/project/README.md).

**Optional:**
- [Exercises overview](weeks/07-low-scaffolding-continued/ai/exercises/README.md): the SDK-response serialization gotcha, a corrupted history file, trimming a history window.
- The stretch goal in [the project brief](weeks/07-low-scaffolding-continued/ai/project/README.md) (a usage log or an undo-last-action).

### Blockchain track

[Overview](weeks/07-low-scaffolding-continued/blockchain/README.md)

**Required, in order:**
1. Notes: [Idempotency and retries](weeks/07-low-scaffolding-continued/blockchain/notes/01-idempotency-and-retries.md) · [Why a small test suite matters, even with no one grading it](weeks/07-low-scaffolding-continued/blockchain/notes/02-why-tests-matter-here.md) · [Organizing under more weight](weeks/07-low-scaffolding-continued/blockchain/notes/03-organizing-under-more-weight.md).
2. [Project: harden the AssetRegistry service](weeks/07-low-scaffolding-continued/blockchain/project/README.md).

**Optional:**
- [Practice: seen-it-before, with fake data](weeks/07-low-scaffolding-continued/blockchain/exercises/00-practice-seen-it-before.md) · [Practice: catch the regression](weeks/07-low-scaffolding-continued/blockchain/exercises/01-practice-catch-the-regression.md), no live network.
- The stretch goal in [the project brief](weeks/07-low-scaffolding-continued/blockchain/project/README.md) (a processed/skipped metrics counter, a third event type).

## Week 8: Capstone, no safety net

[Overview](weeks/08-capstone/README.md)

**Required:**
1. Pick one spec. AI track: [Docs assistant](weeks/08-capstone/ai/docs-assistant.md) · [Ticket triage service](weeks/08-capstone/ai/ticket-triage.md) · [Research agent](weeks/08-capstone/ai/research-agent.md). Blockchain track: [Acceptance gate](weeks/08-capstone/blockchain/acceptance-gate.md) (flagship) · [Token issuance backend](weeks/08-capstone/blockchain/token-issuance.md).
2. [Self-sufficiency rubric](weeks/08-capstone/rubric.md).
