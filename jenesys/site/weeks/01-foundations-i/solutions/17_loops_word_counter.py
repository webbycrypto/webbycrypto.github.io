"""
Solution: Exercise 17, loops (finding long words in a sentence)

See exercises/17_loops_word_counter.py for the task description.
"""

words = ["the", "fox", "jumped", "quickly", "over", "the", "fence"]

# long_words starts as an empty list, the accumulator pattern applied
# to building up a collection instead of a number (the notes mention
# this variant directly: "an empty list [] for a collected list").
# short_word_count is a second, ordinary numeric accumulator, tracked
# alongside it in the same loop.
long_words = []
short_word_count = 0

for word in words:
    if len(word) > 4:
        long_words.append(word)
    else:
        short_word_count = short_word_count + 1

print(f"Long words: {long_words}  |  Short words: {short_word_count}")

# Word lengths: "the"=3, "fox"=3, "jumped"=6, "quickly"=7, "over"=4,
# "the"=3, "fence"=5. Only lengths strictly greater than 4 qualify as
# long, which is "jumped" (6), "quickly" (7), and "fence" (5); "over"
# at exactly 4 does NOT qualify, since the rule is "more than 4," not
# "4 or more." long_words = ["jumped", "quickly", "fence"].
# short_word_count = 4 ("the", "fox", "over", "the").
