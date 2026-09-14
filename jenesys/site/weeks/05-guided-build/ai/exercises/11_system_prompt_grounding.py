"""
Exercise 11: does the system prompt actually matter, or would Claude
have refused anyway?

Every retrieval exercise so far in this folder has been about finding
the RIGHT chunks. This one is about prompting: notes_assistant.py's
answer_question() spends real, deliberate effort on its system prompt,
telling Claude to answer ONLY from the given excerpts and to say
plainly when they don't cover the question. It would be reasonable to
wonder whether that instruction is doing real work, or whether a
capable model would behave that way anyway, system prompt or not.

This exercise answers that empirically instead of by argument: it asks
the SAME out-of-scope question, with the SAME (irrelevant) note
excerpts attached, twice, once with the real grounding system prompt,
once with no system prompt at all, and prints both answers side by
side.

This DOES need a real API call. Make sure ANTHROPIC_API_KEY is set in
your environment (same setup as Week 5's other exercises) before
running it.

Run it with:
    python 11_system_prompt_grounding.py
"""

import anthropic

client = anthropic.Anthropic()
MODEL = "claude-haiku-4-5"

# Deliberately irrelevant to the question below: this is budgeting
# advice, and the question asks about fixing a flat bike tire. Any
# honest system prompt should cause Claude to say these excerpts don't
# cover the question, rather than answer from outside knowledge.
IRRELEVANT_EXCERPTS = (
    "[Source: budgeting-basics.txt, section 1]\n"
    "Track every expense for one full month before making any changes. "
    "You cannot fix a budget you don't actually understand yet.\n\n"
    "---\n\n"
    "[Source: budgeting-basics.txt, section 2]\n"
    "Cancel subscriptions you haven't used in the last 60 days. "
    "Recurring charges are the easiest budget leak to miss."
)

QUESTION = "How do I fix a flat tire on my bike?"

GROUNDED_SYSTEM_PROMPT = (
    "You answer questions using ONLY the note excerpts provided below. "
    "If the excerpts do not contain the answer, say clearly that the "
    "notes don't cover it. Do not use any outside knowledge, and do not "
    "guess. When you do answer, mention which source(s) you used."
)


def ask_with_system_prompt(question: str, excerpts: str, system_prompt: str) -> str:
    """system_prompt may be None, in which case no `system` argument is
    sent at all, matching what a beginner who skipped that parameter
    entirely would actually get.
    """
    user_prompt = f"Note excerpts:\n\n{excerpts}\n\nQuestion: {question}"

    kwargs = {
        "model": MODEL,
        "max_tokens": 512,
        "messages": [{"role": "user", "content": user_prompt}],
    }
    if system_prompt is not None:
        kwargs["system"] = system_prompt

    response = client.messages.create(**kwargs)
    return next((block.text for block in response.content if block.type == "text"), "")


if __name__ == "__main__":
    print("=== WITH the real grounding system prompt ===")
    grounded_answer = ask_with_system_prompt(QUESTION, IRRELEVANT_EXCERPTS, GROUNDED_SYSTEM_PROMPT)
    print(grounded_answer)

    print("\n=== WITH NO system prompt at all ===")
    ungrounded_answer = ask_with_system_prompt(QUESTION, IRRELEVANT_EXCERPTS, None)
    print(ungrounded_answer)

    # --- What to notice ---
    #
    # The grounded version should say, plainly, that the notes don't
    # cover fixing a bike tire (the excerpts are about budgeting, not
    # bikes at all). The ungrounded version, with the exact same
    # irrelevant excerpts sitting in the exact same prompt, will very
    # often go ahead and answer the bike tire question anyway, using
    # Claude's own training knowledge, sometimes even without
    # mentioning that the provided excerpts had nothing to do with it.
    # If both versions happened to refuse this time, that doesn't mean
    # the system prompt is pointless: rerun this a few times, and try
    # a question that's a little LESS obviously unrelated to the
    # excerpts (something budgeting-adjacent but still not actually
    # answered by them), where the pull toward "just answer anyway" is
    # stronger.
    #
    # This is the real, empirical version of the point
    # notes/01-why-retrieval-matters.md made in words: retrieval alone
    # (finding the right, or even the wrong, chunks) doesn't guarantee
    # an honest answer. The system prompt is a separate, necessary
    # piece of the design, not a redundant safety net on top of good
    # retrieval.
    #
    # Try this: keep the missing system prompt, but add one sentence to
    # the end of the user_prompt itself instead, something like "Only
    # use the excerpts above; say so if they don't help." Does putting
    # the same instruction in the user turn instead of the system
    # parameter produce the same behavior? The API treats the two
    # differently (system sets standing behavior for the whole
    # request; a sentence in the user turn is just more content to
    # weigh against everything else in that turn), and it's worth
    # seeing whether that theoretical difference shows up in practice,
    # on this exact example.
