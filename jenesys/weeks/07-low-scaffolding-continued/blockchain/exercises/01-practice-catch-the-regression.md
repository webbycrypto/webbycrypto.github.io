# Practice: write the test that catches the regression

[← Back to Week 7 (Blockchain track): Low-scaffolding build, continued](../README.md)

`00-practice-seen-it-before.md` had you write the deduplication logic itself. This exercise assumes that logic already exists and asks you to do the other half of `notes/02-why-tests-matter-here.md`'s point: write a small, fast test that would catch it if someone (a future you, most likely) broke that logic later without noticing. Still no network, still fake data, still nothing to do with `AssetRegistry`.

## The starting point

Here's a small signup-tracking system, already written, with the same seen-it-before pattern from the previous exercise applied to a slightly different shape of data:

```python
processed_signup_ids = set()
active_signups = []

def handle_signup(signup):
    signup_id = signup["id"]
    if signup_id in processed_signup_ids:
        return

    active_signups.append(signup)
    processed_signup_ids.add(signup_id)
```

## What to do

1. Using `pytest` or `unittest` (either is fine; `notes/02-why-tests-matter-here.md` has no preference, and neither does this exercise), write a test, `test_duplicate_signup_is_not_double_processed`, that:
   - Resets `active_signups` and `processed_signup_ids` to empty at the start of the test (a fresh, known starting state matters here, since both are plain module-level variables that would otherwise carry state over from a previous test).
   - Calls `handle_signup` twice with the exact same signup dictionary (same `id`, same everything).
   - Asserts `len(active_signups) == 1`, not `2`.
2. Run it, and confirm it passes.
3. Now break the production code on purpose: delete the `if signup_id in processed_signup_ids: return` line (or comment it out) from `handle_signup`, leaving everything else the same.
4. Rerun your test. It should fail, specifically on the assertion about `len(active_signups)`, not with some unrelated error. Read the failure message pytest or unittest gives you; it should tell you plainly that it expected `1` and got `2`.
5. Put the deleted line back, and confirm the test passes again.

## What this is actually checking

Step 3 through 5 are the part of this exercise that's easy to skip and shouldn't be. A test that passes when the code is correct tells you very little on its own; a test suite where every test would still pass even if you deleted half the logic it claims to protect is a false sense of security, not a real one. `notes/02-why-tests-matter-here.md` makes exactly this point about the real project's test suite later this week: you should be able to break the idempotency check on purpose and watch the specific test that's supposed to catch it actually fail, clearly, for the reason you expect. This exercise is that same discipline, rehearsed once on code simple enough that there's nowhere for a mistake in the test itself to hide.

## One more thing to try, if you want a second rep

Write a second test, `test_two_different_signups_are_both_processed`, that calls `handle_signup` with two signups that have *different* ids and asserts `len(active_signups) == 2`. This one isn't about duplicates at all; it's a guard against the opposite mistake, a deduplication check so aggressive or so buggy that it accidentally throws away legitimate, distinct signups too. A test suite that only ever checks "duplicates get caught" and never checks "non-duplicates still get through" can pass completely while hiding a version of `handle_signup` that, say, always returns after the first signup no matter what. Both properties matter, and they need separate tests to actually prove both of them.
