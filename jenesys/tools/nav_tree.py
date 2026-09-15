"""The Jenesys sidebar nav tree.

This is the single hand-specified list of which source .md files appear in
the sidebar, and how they're grouped. Titles are never hand-typed here for
the common case: build_site.py derives a node's real title (used for its own
page heading and breadcrumb) from the file's own H1, and separately derives a
cleaned-up sidebar label from that same title (dropping "Week N" numbering).
This file only says which files exist, how they nest, and, for the handful
of nodes where the automatic cleanup would be ambiguous or redundant,
provides an explicit sidebar_title override (sidebar label only; the page's
own heading/breadcrumb are unaffected).

"group" nodes (AI track / Blockchain track / Project / specs) have no
backing file of their own; they're pure organizational labels in the
sidebar.

"synthetic" nodes are exercises overviews for the 5 track folders that have
no exercises/README.md on disk. Their body markdown is generated here,
reusing the same curation already written into table-of-contents.md, so the
sidebar has one consistent "Exercises" entry everywhere.
"""

WEEKS = "weeks"


def page(src, children=None, sidebar_title=None):
    return {"kind": "page", "src": src, "children": children or [], "sidebar_title": sidebar_title}


def synthetic(src, title, body_md, children=None, sidebar_title=None):
    """A page with no real .md source on disk; content is generated here."""
    return {
        "kind": "synthetic",
        "src": src,
        "title": title,
        "body_md": body_md,
        "children": children or [],
        "sidebar_title": sidebar_title,
    }


def group(title, children):
    return {"kind": "group", "title": title, "children": children}


def notes(*paths):
    """Individual note pages, spliced directly into the parent's children
    list with '*notes(...)' -- no "Notes" grouping wrapper, so their titles
    show right away at the same level as Exercises/Project."""
    return [page(p) for p in paths]


def _week4_ai_exercises():
    body = """
Standalone, any order:

- [Guided build: the chatbot, line by line](00-guided-build-the-chatbot.md)
- [Personality/cost/memory-cap](01-tweak-the-bot.md)
- [Add a stats command](02-add-a-stats-command.md)
- [Add a clear command](03-add-a-clear-command.md)
- [Cap message length](04-cap-message-length.md)
- [Log the conversation to a file](05-log-the-conversation-to-a-file.md)
- [Classify a message](06-classify-a-message.md)
- [Retry with backoff](07-retry-with-backoff.md)
- [Switch models mid-conversation](08-switch-models-mid-conversation.md)

The guided build is required before the project; 01-08 are optional practice reps, each a self-contained tweak to the same chatbot.
"""
    return synthetic(
        f"{WEEKS}/04-track-exposure/ai/exercises/index.md",
        "Week 4 (AI track): Exercises",
        body,
        sidebar_title="Exercises",
    )


def _week4_bc_exercises():
    body = """
Standalone, any order, each a full edit/recompile/redeploy/call cycle:

- [Guided build: Greeter, line by line](00-guided-write-greeter.md)
- [A change counter and reset](01-extend-the-contract.md)
- [An owner-only emergency reset](02-restrict-an-emergency-reset-to-the-owner.md)
- [A second event](03-add-a-second-event.md)
- [A length cap and revert handling](04-cap-the-length-and-handle-the-revert.md)
- [Tracking the longest greeting](05-track-the-longest-greeting.md)

The guided build is required before the project; 01-05 are optional practice reps, each a full cycle on the same contract.
"""
    return synthetic(
        f"{WEEKS}/04-track-exposure/blockchain/exercises/index.md",
        "Week 4 (Blockchain track): Exercises",
        body,
        sidebar_title="Exercises",
    )


def _week5_bc_exercises():
    body = """
- [Guided build: AssetRegistry, line by line](00-guided-write-assetregistry.md) (required, before the project)
- [Exercises: read and predict](01-read-and-predict.md) (required, six snippets, two per failure mode)
- [Guided build: CreditLedger, line by line](02-guided-write-creditledger.md) (optional, a second, smaller rep of mapping plus access control)
"""
    return synthetic(
        f"{WEEKS}/05-guided-build/blockchain/exercises/index.md",
        "Week 5 (Blockchain track): Exercises",
        body,
        sidebar_title="Exercises",
    )


def _week6_bc_exercises():
    body = """
Optional, throwaway reps on the Week 4 Greeter contract:

- [Practice: get_logs](00-practice-get-logs.md)
- [Practice: filters and get_new_entries](01-practice-filters-and-new-entries.md)
"""
    return synthetic(
        f"{WEEKS}/06-low-scaffolding/blockchain/exercises/index.md",
        "Week 6 (Blockchain track): Exercises",
        body,
        sidebar_title="Exercises",
    )


def _week7_bc_exercises():
    body = """
Optional, no live network needed:

- [Practice: seen-it-before, with fake data](00-practice-seen-it-before.md)
- [Practice: catch the regression](01-practice-catch-the-regression.md)
"""
    return synthetic(
        f"{WEEKS}/07-low-scaffolding-continued/blockchain/exercises/index.md",
        "Week 7 (Blockchain track): Exercises",
        body,
        sidebar_title="Exercises",
    )


NAV_TREE = [
    group("Setup", [
        page(f"{WEEKS}/00-setup/README.md", sidebar_title="Week 0"),
    ]),
    group("Foundations I", [
        page(f"{WEEKS}/01-foundations-i/README.md", sidebar_title="Week 1"),
        *notes(
            f"{WEEKS}/01-foundations-i/notes/01-variables-and-data-types.md",
            f"{WEEKS}/01-foundations-i/notes/02-conditionals.md",
            f"{WEEKS}/01-foundations-i/notes/03-loops.md",
            f"{WEEKS}/01-foundations-i/notes/04-functions.md",
            f"{WEEKS}/01-foundations-i/notes/05-command-line.md",
            f"{WEEKS}/01-foundations-i/notes/06-git-basics.md",
            f"{WEEKS}/01-foundations-i/notes/07-how-the-internet-and-apis-work.md",
        ),
        page(f"{WEEKS}/01-foundations-i/exercises/README.md"),
        page(f"{WEEKS}/01-foundations-i/project/README.md"),
    ]),
    group("Foundations II and first project", [
        page(f"{WEEKS}/02-foundations-ii/README.md", sidebar_title="Week 2"),
        *notes(
            f"{WEEKS}/02-foundations-ii/notes/01-web-frameworks.md",
            f"{WEEKS}/02-foundations-ii/notes/02-endpoints-and-routes.md",
            f"{WEEKS}/02-foundations-ii/notes/03-persistence.md",
            f"{WEEKS}/02-foundations-ii/notes/04-error-handling.md",
            f"{WEEKS}/02-foundations-ii/notes/05-debugging-methodology.md",
            f"{WEEKS}/02-foundations-ii/notes/06-organizing-your-code.md",
        ),
        page(f"{WEEKS}/02-foundations-ii/exercises/README.md"),
        page(f"{WEEKS}/02-foundations-ii/project/README.md"),
    ]),
    group("Foundations consolidation", [
        page(f"{WEEKS}/03-foundations-consolidation/README.md", sidebar_title="Week 3"),
        *notes(
            f"{WEEKS}/03-foundations-consolidation/notes/01-what-carries-over.md",
            f"{WEEKS}/03-foundations-consolidation/notes/02-redirects-and-short-codes.md",
            f"{WEEKS}/03-foundations-consolidation/notes/03-organizing-a-growing-file.md",
        ),
        page(f"{WEEKS}/03-foundations-consolidation/exercises/README.md"),
        group("Project", [
            page(f"{WEEKS}/03-foundations-consolidation/project/README.md", sidebar_title="URL shortener"),
            page(f"{WEEKS}/03-foundations-consolidation/project/second-project-config-store.md", sidebar_title="Config store"),
        ]),
        page(f"{WEEKS}/03-foundations-consolidation/checkpoint.md"),
    ]),
    group("AI", [
        page(f"{WEEKS}/04-track-exposure/README.md", [
            *notes(
                f"{WEEKS}/04-track-exposure/ai/notes/01-hosted-model-apis.md",
                f"{WEEKS}/04-track-exposure/ai/notes/02-prompts-and-tokens.md",
                f"{WEEKS}/04-track-exposure/ai/notes/03-cost-and-billing.md",
                f"{WEEKS}/04-track-exposure/ai/notes/04-who-calls-what.md",
            ),
            _week4_ai_exercises(),
            page(f"{WEEKS}/04-track-exposure/ai/project/README.md"),
        ], sidebar_title="Introduction"),
        page(f"{WEEKS}/05-guided-build/ai/README.md", [
            *notes(
                f"{WEEKS}/05-guided-build/ai/notes/01-why-retrieval-matters.md",
                f"{WEEKS}/05-guided-build/ai/notes/02-embeddings-and-vector-search.md",
                f"{WEEKS}/05-guided-build/ai/notes/03-organizing-notes-assistant.md",
            ),
            page(f"{WEEKS}/05-guided-build/ai/exercises/README.md"),
            page(f"{WEEKS}/05-guided-build/ai/project/README.md"),
        ], sidebar_title="Notes Assistant v1"),
        page(f"{WEEKS}/06-low-scaffolding/ai/README.md", [
            *notes(
                f"{WEEKS}/06-low-scaffolding/ai/notes/01-tool-use-mechanics.md",
                f"{WEEKS}/06-low-scaffolding/ai/notes/02-failure-handling-and-hallucinated-results.md",
                f"{WEEKS}/06-low-scaffolding/ai/notes/03-organizing-as-it-grows.md",
            ),
            page(f"{WEEKS}/06-low-scaffolding/ai/exercises/README.md"),
            page(f"{WEEKS}/06-low-scaffolding/ai/project/README.md"),
        ], sidebar_title="Notes Assistant: giving it tools"),
        page(f"{WEEKS}/07-low-scaffolding-continued/ai/README.md", [
            *notes(
                f"{WEEKS}/07-low-scaffolding-continued/ai/notes/01-persistence.md",
                f"{WEEKS}/07-low-scaffolding-continued/ai/notes/02-robust-to-bad-input.md",
                f"{WEEKS}/07-low-scaffolding-continued/ai/notes/03-organizing-the-second-addition.md",
            ),
            page(f"{WEEKS}/07-low-scaffolding-continued/ai/exercises/README.md"),
            page(f"{WEEKS}/07-low-scaffolding-continued/ai/project/README.md"),
        ], sidebar_title="Notes Assistant: persistence & robustness"),
    ]),
    group("Blockchain", [
        page(f"{WEEKS}/04-track-exposure/README.md", [
            *notes(
                f"{WEEKS}/04-track-exposure/blockchain/notes/01-private-keys-and-addresses.md",
                f"{WEEKS}/04-track-exposure/blockchain/notes/02-transactions-and-gas.md",
                f"{WEEKS}/04-track-exposure/blockchain/notes/03-testnets-and-faucets.md",
                f"{WEEKS}/04-track-exposure/blockchain/notes/04-smart-contracts.md",
            ),
            _week4_bc_exercises(),
            page(f"{WEEKS}/04-track-exposure/blockchain/project/README.md"),
        ], sidebar_title="Introduction"),
        page(f"{WEEKS}/05-guided-build/blockchain/README.md", [
            *notes(
                f"{WEEKS}/05-guided-build/blockchain/notes/01-state-and-storage.md",
                f"{WEEKS}/05-guided-build/blockchain/notes/02-access-control.md",
                f"{WEEKS}/05-guided-build/blockchain/notes/03-events.md",
                f"{WEEKS}/05-guided-build/blockchain/notes/04-failure-modes.md",
                f"{WEEKS}/05-guided-build/blockchain/notes/05-organizing-a-walkthrough-script.md",
            ),
            _week5_bc_exercises(),
            page(f"{WEEKS}/05-guided-build/blockchain/project/README.md"),
        ], sidebar_title="AssetRegistry: deploy & interact"),
        page(f"{WEEKS}/06-low-scaffolding/blockchain/README.md", [
            *notes(
                f"{WEEKS}/06-low-scaffolding/blockchain/notes/01-managed-keys.md",
                f"{WEEKS}/06-low-scaffolding/blockchain/notes/02-transaction-lifecycle-for-services.md",
                f"{WEEKS}/06-low-scaffolding/blockchain/notes/03-event-driven-reactivity.md",
                f"{WEEKS}/06-low-scaffolding/blockchain/notes/04-organizing-a-service.md",
            ),
            _week6_bc_exercises(),
            page(f"{WEEKS}/06-low-scaffolding/blockchain/project/README.md"),
        ], sidebar_title="AssetRegistry: a managed-key service"),
        page(f"{WEEKS}/07-low-scaffolding-continued/blockchain/README.md", [
            *notes(
                f"{WEEKS}/07-low-scaffolding-continued/blockchain/notes/01-idempotency-and-retries.md",
                f"{WEEKS}/07-low-scaffolding-continued/blockchain/notes/02-why-tests-matter-here.md",
                f"{WEEKS}/07-low-scaffolding-continued/blockchain/notes/03-organizing-under-more-weight.md",
            ),
            _week7_bc_exercises(),
            page(f"{WEEKS}/07-low-scaffolding-continued/blockchain/project/README.md"),
        ], sidebar_title="AssetRegistry: hardening it"),
    ]),
    group("Capstone, no safety net", [
        page(f"{WEEKS}/08-capstone/README.md", sidebar_title="Week 8"),
        group("AI track specs", [
            page(f"{WEEKS}/08-capstone/ai/docs-assistant.md"),
            page(f"{WEEKS}/08-capstone/ai/ticket-triage.md"),
            page(f"{WEEKS}/08-capstone/ai/research-agent.md"),
        ]),
        group("Blockchain track specs", [
            page(f"{WEEKS}/08-capstone/blockchain/acceptance-gate.md"),
            page(f"{WEEKS}/08-capstone/blockchain/token-issuance.md"),
        ]),
        page(f"{WEEKS}/08-capstone/rubric.md"),
    ]),
    group("Going further", [
        page(f"{WEEKS}/09-going-further/README.md", sidebar_title="Overview"),
        *notes(
            f"{WEEKS}/09-going-further/notes/01-classes.md",
            f"{WEEKS}/09-going-further/notes/02-type-hints.md",
            f"{WEEKS}/09-going-further/notes/03-dataclasses.md",
        ),
        page(f"{WEEKS}/09-going-further/exercises/README.md", sidebar_title="Exercises"),
        page(f"{WEEKS}/09-going-further/project/README.md", sidebar_title="Project: validate with pydantic"),
    ]),
]
