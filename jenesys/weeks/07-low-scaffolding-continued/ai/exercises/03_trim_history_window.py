"""
Exercise 3: capping how much history you keep, without breaking the
conversation shape.

notes/01-persistence.md is explicit that there's no single right
answer for how much history to persist forever: everything, a capped
amount, one file per session, or something else. This exercise builds
the simplest version of "a capped amount" (keep only the most recent
N messages) and then deliberately breaks it, to surface a real gotcha
a naive cap runs straight into: cutting history at the wrong point can
leave a conversation that starts with an "assistant" turn instead of a
"user" turn, which the real API will reject outright, not silently
tolerate.

No API key or network call is needed; this is pure Python, working on
plain dictionaries that stand in for a real message history.

Run it with:
    python 03_trim_history_window.py
"""


def trim_history_naive(history: list, max_messages: int) -> list:
    """Keep only the last max_messages entries. Simple, and broken in a
    way that isn't obvious until you look at WHICH messages survive.
    """
    if max_messages is None or len(history) <= max_messages:
        return history
    return history[-max_messages:]


def trim_history_by_pairs(history: list, max_pairs: int) -> list:
    """Keep only the last max_pairs (user, assistant) turns, always
    cutting on a pair boundary, never in the middle of one. Assumes
    history already alternates user/assistant starting with user,
    which is the shape a correctly-built conversation should already
    have.
    """
    max_messages = max_pairs * 2
    if max_messages is None or len(history) <= max_messages:
        return history
    trimmed = history[-max_messages:]
    # Defensive: if trimmed still doesn't start with "user" (an odd
    # history length before trimming can cause this), drop one more
    # message from the front rather than send a broken shape.
    if trimmed and trimmed[0]["role"] != "user":
        trimmed = trimmed[1:]
    return trimmed


def build_fake_history(num_turns: int) -> list:
    """num_turns pairs of (user, assistant) messages, alternating,
    starting with user, exactly like a real conversation would.
    """
    history = []
    for i in range(num_turns):
        history.append({"role": "user", "content": f"user turn {i}"})
        history.append({"role": "assistant", "content": f"assistant turn {i}"})
    return history


if __name__ == "__main__":
    history = build_fake_history(5)  # 10 messages total: 5 user, 5 assistant
    print(f"Full history: {len(history)} messages")
    for m in history:
        print(f"  {m['role']}: {m['content']}")

    print()
    print("Naive trim to 3 messages:")
    naive_trimmed = trim_history_naive(history, 3)
    for m in naive_trimmed:
        print(f"  {m['role']}: {m['content']}")
    print(f"  First message's role: {naive_trimmed[0]['role']!r}")

    print()
    print("Pair-aware trim to 2 pairs (4 messages):")
    pair_trimmed = trim_history_by_pairs(history, max_pairs=2)
    for m in pair_trimmed:
        print(f"  {m['role']}: {m['content']}")
    print(f"  First message's role: {pair_trimmed[0]['role']!r}")

    # --- What to notice ---
    #
    # trim_history_naive(history, 3) keeps the LAST 3 messages out of
    # 10, which lands in the middle of a pair: the printed "First
    # message's role" comes back as "assistant", not "user". If you
    # resent a history shaped like that to the real Claude API as the
    # `messages` list, you would get a real 400-level error, because
    # the API requires the conversation to start with a "user" turn
    # (and to alternate roles from there). A trimming strategy that
    # looks perfectly reasonable in isolation (I just want the last N
    # messages) can silently produce a shape the API will flatly
    # refuse, and the failure would show up as a confusing API error
    # at request time, not as an obvious bug where the trimming
    # actually happened.
    #
    # trim_history_by_pairs avoids this by always cutting on a
    # (user, assistant) boundary, and defensively checking the result
    # anyway. That defensive check matters even here: try calling
    # trim_history_by_pairs on a history with an ODD number of total
    # messages (append one more lone "user" message to `history`
    # before trimming, simulating a conversation mid-turn when it was
    # saved) and see whether the check catches it.
    #
    # Try this: change build_fake_history to occasionally insert a
    # tool_use/tool_result pair (a THIRD message between one user turn
    # and the next assistant reply, changing the alternation pattern
    # entirely) and see whether trim_history_by_pairs's assumption,
    # "history alternates strictly user/assistant," still holds. If it
    # doesn't, that's worth sitting with: this is the exact reason
    # Week 7's persistence work has to decide, concretely and for your
    # OWN project's real shape, not a generic rule copied from here,
    # what a "safe" place to cut history actually is.
