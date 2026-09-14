# Week 7 exercises

[← Back to Week 7 (AI track): Low-scaffolding build, continued](../README.md)

Three small, standalone scripts, all pure Python with no API key or network call needed. Persistence introduces its own real gotchas (notes/01-persistence.md walks through them), and all three of these exist to let you hit each one, once, cheaply, on a throwaway scenario, before it costs you a confusing debugging session inside the real project's actual history file.

## 01_serialize_sdk_response.py

The specific trap notes/01-persistence.md calls out by name: a real SDK response's content isn't plain dictionaries, and handing it directly to `json.dump()` raises a real `TypeError`. Reproduces the exact failure with small stand-in classes shaped like the real SDK's objects, then shows the fix (`.to_dict()`, called before anything touches `json.dumps()`, not after).

## 02_load_corrupted_history.py

Builds a `load_history()` function and tests it against all three real situations a persisted file can be in: missing (first-ever run), empty, and corrupted (invalid JSON from a crash mid-write). Each case gets its own honest, specific handling, not one catch-all that silently returns the same empty result for every kind of "something's wrong" without saying which kind.

## 03_trim_history_window.py

Builds a naive "keep the last N messages" history cap, then deliberately breaks it: cutting at the wrong point can leave a conversation that starts with an "assistant" turn instead of "user," a shape the real API will reject outright. Shows a pair-aware version that cuts on turn boundaries instead, and the defensive check worth keeping even so.
