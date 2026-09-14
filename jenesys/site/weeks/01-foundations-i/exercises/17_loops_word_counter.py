"""
Exercise 17: Loops (finding long words in a sentence)

Task:
The list below holds the individual words of a sentence (already split
apart for you; splitting a sentence into a list of words is its own
small skill you'll pick up naturally later, so it's done for you here).

Using a `for` loop, build a new list called `long_words` containing
only the words that are longer than 4 characters (use Python's built-in
`len()` on each word to check its length). This is the accumulator
pattern again, just accumulating a list instead of a number: start with
an empty list `[]` before the loop, and use `.append(...)` inside the
loop for each word that qualifies.

Also count how many words did NOT qualify (4 characters or fewer),
using a second accumulator, a running count called `short_word_count`.

After the loop, print both results, similar in shape to:

    "Long words: ['jumped', 'quickly']  |  Short words: 4"

(Exact wording can differ. The point is building the filtered list and
the count correctly, not matching this text exactly.)

Expected behavior:
With the words below, long_words should end up with three words in it
(the ones longer than 4 characters), and short_word_count should be 4.
Work out by hand, word by word, which ones are longer than 4 characters
and which aren't, before running the file, then check your prediction
against the real output. That habit (predicting, then checking) is
exactly what notes/03-loops.md is trying to build, more than any
specific number in this description.
"""

words = ["the", "fox", "jumped", "quickly", "over", "the", "fence"]

# your code here
