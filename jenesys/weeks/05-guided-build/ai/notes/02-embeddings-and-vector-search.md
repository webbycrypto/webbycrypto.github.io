# Embeddings and vector search

[← Back to Week 5 (AI track): Guided build](../README.md)

The previous note ended on a question: how do you actually find the relevant piece of text, out of a whole folder of documents, given just a question? This note explains the real, production answer (embeddings and vector search), and then tells you plainly what this week's project will do instead, and why that's fine.

## What a vector is

Strip away every buzzword and a vector is just an ordered list of numbers. `[3, 7, 1]` is a vector with three numbers in it. That's the whole definition. What makes vectors useful is not the numbers themselves, but that you can measure how "close" two vectors are to each other, mathematically, the same way you can measure how close two points are on a map.

## What an embedding is

An embedding is a vector produced by a model, specifically built so that the DISTANCE between two vectors reflects how similar the MEANING of the two original pieces of text is, not how similar their spelling is.

That last part is the entire point, and it's worth sitting with. "My bread is too dense" and "my loaf isn't rising enough" share almost no words in common, but they're describing the same underlying problem. A system that only checks for shared words (like the one this week's project actually builds) would likely miss the connection. A system using real embeddings would very likely place those two sentences close together in "meaning space," because it was trained to recognize that they're about the same thing, regardless of the specific words used.

## The map analogy

Picture a huge, blank map. Every note, every sentence, every chunk of text you feed into an embedding model gets a dot placed somewhere on that map, based on what it MEANS, not what letters it contains. Notes about coffee brewing cluster together in one region. Notes about car repair cluster somewhere else entirely. Two notes that are both about "why my bread isn't rising," even if one says "dense" and the other says "rising," end up as neighboring dots, because they're about the same thing.

That map is the embedding space. The "address" of a piece of text on that map is its embedding vector. Two dots close together on the map means the two pieces of text are about similar things. Two dots far apart means they're not.

## What vector search actually does

Vector search is exactly what it sounds like once you have the map: given a question, you first find that question's own dot on the same map (you embed the question, using the same kind of model that embedded your documents), and then you look for the nearest existing dots to it. Those nearest neighbors are the pieces of text judged most relevant to your question. You hand those to the model, per the previous note, instead of the whole folder.

This is why it's called "search," even though no keywords are being matched anywhere: you're searching a map for the closest points, not searching text for matching substrings.

For a small handful of documents, checking the distance to every single dot is fast enough to just do directly. For a huge collection (imagine millions of documents), checking every single one for every single question gets slow, which is why specialized vector databases exist (you may see names like Pinecone, Chroma, Weaviate, or pgvector, an extension for regular Postgres). Their whole job is answering "what are the nearest dots to this one?" quickly, even across millions of dots. You do not need one of these for a small personal notes folder, and you won't be using one this week. It's worth knowing they exist, and knowing what problem they solve, so the name isn't a mystery the first time you see it.

## What this week's project actually does (and why that's fine)

Be clear-eyed about this: this week's project does NOT call an embedding model, and does NOT do real vector search. It uses a much simpler technique: counting how many important words a question shares with each chunk of a note, and treating the chunks with the most shared words as the most relevant ones. This is closer to old-fashioned keyword search than to the embedding-based system described above.

This is a deliberate, correct choice for this week, not a shortcut you need to feel bad about. Here's why it's the right call right now:

- It requires no new dependency, no separate paid API, and no new concept beyond "count shared words," which keeps the FIRST time you build retrieval focused on the pattern (search, then hand the result to the model), not on embedding math.
- For a small folder of your own short notes, written in your own words, keyword overlap actually works reasonably well most of the time. You wrote both the notes and the questions; they're more likely to share vocabulary than, say, a stranger's question against a corporate wiki.
- It has a real, honest limitation, and now you know exactly what it is: it will miss cases where the wording differs but the meaning matches (the "dense bread" versus "isn't rising" example above). That's not a bug for you to go fix this week. It's the actual, documented tradeoff of choosing simple keyword matching over real embeddings, and being able to name that tradeoff is more valuable right now than papering over it with a library you don't yet understand.

If you want to see what a real vector, and a real similarity calculation, look like in actual runnable code (still without calling any embedding model or API), there's an optional bonus script in this week's `project/` folder that builds a simple word-count vector and computes a textbook similarity score between two pieces of text. It's not required, and the main project does not depend on it, but it exists to make "vector" something you've actually seen in code, not just an abstract word from this note.

If you later want to build a REAL embedding-based version of this project (as a stretch goal, well beyond this week's scope), the two names worth knowing are Voyage AI (the embeddings provider Anthropic specifically recommends alongside Claude) and `sentence-transformers` (an open-source option you can run locally, for free, without any API key). Neither is required reading right now.
