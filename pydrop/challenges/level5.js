window.LEVEL5 = [
  {
    id: 200,
    title: "Hashing Basics",
    difficulty: "easy",
    topic: "Hashing",
    level: 5,
    xp: 15,
    instructions: `<p>Everything in a blockchain rests on one building block: the cryptographic hash function. A hash function takes data of any size and squeezes it down to a fixed-length "fingerprint." Python's <code>hashlib</code> module gives you several; <code>sha256</code> is the one Bitcoin itself uses.</p>
<p>Two things make a hash function useful here. First, it's <strong>one-way</strong>: given the fingerprint, there's no way to work backwards to the original data (short of guessing every possible input, which for anything non-trivial would take longer than the age of the universe). Second, it's <strong>deterministic</strong>: the exact same input always produces the exact same fingerprint, every time, on every computer. Change even one character of the input, though, and the fingerprint comes out completely different -- there's no "close" hash for "close" data.</p>
<p>Before you can hash a string, you have to turn it into bytes with <code>.encode()</code> (hash functions work on raw bytes, not on Python's text type). <code>hashlib.sha256(...)</code> then gives you a hash object, and <code>.hexdigest()</code> renders it as a 64-character string of hexadecimal digits -- that string is what you'll see and store as "the hash" everywhere from here on.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Given the string <code>data</code>, create <code>data_hash</code> as its SHA-256 hash, rendered as a hex string.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">data = "hello blockchain"</code></div>
  <div class="io-row"><span class="io-key">data_hash</span><code class="io-val">"cf55026ba78c889dbdaf0c32701cdb4d662f3d3ea4460110d3ed2edd0d753e72"</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Don't try to predict a hash by eye -- that unreadable-looking string is the entire point. If you can look at two hashes and immediately tell how their inputs relate, the hash function has failed at its job.</span>
</div>`,
    hints: [
      "First encode the string to bytes: data.encode()",
      "hashlib.sha256(data.encode()) gives you a hash object",
      "Call .hexdigest() on that object to get the hex string"
    ],
    starterCode: "import hashlib\n\ndata = \"hello blockchain\"\n# Create data_hash as the SHA-256 hex digest of data\n",
    solution: "import hashlib\n\ndata = \"hello blockchain\"\ndata_hash = hashlib.sha256(data.encode()).hexdigest()",
    validation: {
      checks: [
        { type: "hasImport", module: "hashlib", message: "Import the hashlib module." },
        { type: "matchesRegex", pattern: "hashlib\\.sha256\\(", message: "Use hashlib.sha256() to hash the data." },
        { type: "matchesRegex", pattern: "\\.hexdigest\\(\\)", message: "Call .hexdigest() to get the hash as a hex string." },
        { type: "matchesRegex", pattern: "data\\.encode\\(\\)", message: "Encode data to bytes before hashing it." }
      ],
      pyTests: [
        { code: "assert data_hash == 'cf55026ba78c889dbdaf0c32701cdb4d662f3d3ea4460110d3ed2edd0d753e72'", message: "'data_hash' should be the SHA-256 hex digest of \"hello blockchain\"." },
        { code: "assert len(data_hash) == 64", message: "A SHA-256 hex digest is always 64 characters long." }
      ]
    },
    explanation: `<p>You'll call this exact pattern -- encode, hash, hexdigest -- constantly for the rest of this level. Every block's identity, every proof-of-work attempt, and every Merkle tree node comes down to hashing some string and looking at the result.</p>`
  },
  {
    id: 201,
    title: "Detecting Tampering",
    difficulty: "easy",
    topic: "Hashing",
    level: 5,
    xp: 15,
    instructions: `<p>The property that makes hashing useful for security is called the <strong>avalanche effect</strong>: a tiny change to the input -- even a single character, even just one digit in a number -- produces a completely different, unpredictable hash. There's no partial credit; "Pay Alice 10 coins" and "Pay Alice 100 coins" hash to two strings that share nothing in common, even though the messages themselves look almost identical.</p>
<p>This is exactly how a blockchain catches tampering. If you know what a piece of data <em>should</em> hash to, and someone quietly edits that data, recomputing the hash and comparing it to the original immediately exposes the change -- no matter how small the edit was or how carefully it was made.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Given <code>original</code> and <code>tampered</code> (two similar but different strings), compute <code>original_hash</code> and <code>tampered_hash</code>, then create <code>hashes_match</code> as whether the two hashes are equal.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">original = "Pay Alice 10 coins"<br>tampered = "Pay Alice 100 coins"</code></div>
  <div class="io-row"><span class="io-key">hashes_match</span><code class="io-val">False</code></div>
</div>`,
    hints: [
      "original_hash = hashlib.sha256(original.encode()).hexdigest()",
      "tampered_hash = hashlib.sha256(tampered.encode()).hexdigest()",
      "hashes_match = original_hash == tampered_hash"
    ],
    starterCode: "import hashlib\n\noriginal = \"Pay Alice 10 coins\"\ntampered = \"Pay Alice 100 coins\"\n# Hash both, then compare them\n",
    solution: "import hashlib\n\noriginal = \"Pay Alice 10 coins\"\ntampered = \"Pay Alice 100 coins\"\n\noriginal_hash = hashlib.sha256(original.encode()).hexdigest()\ntampered_hash = hashlib.sha256(tampered.encode()).hexdigest()\nhashes_match = original_hash == tampered_hash",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "original_hash\\s*=.*hexdigest\\(\\)", message: "Compute original_hash as a hex digest." },
        { type: "matchesRegex", pattern: "tampered_hash\\s*=.*hexdigest\\(\\)", message: "Compute tampered_hash as a hex digest." },
        { type: "matchesRegex", pattern: "hashes_match\\s*=\\s*original_hash\\s*==\\s*tampered_hash", message: "Set hashes_match by comparing the two hashes with ==." }
      ],
      pyTests: [
        { code: "assert hashes_match == False", message: "The two hashes should not match -- even a small change to the text should produce a completely different hash." }
      ]
    },
    explanation: `<p>Notice that "10" became "100" -- a change a human skimming the text might not even catch. The hash didn't skim it. This is the entire mechanism a blockchain relies on to detect that something in its history was altered: no edit is too small to change the hash.</p>`
  },
  {
    id: 202,
    title: "The Block Dataclass",
    difficulty: "medium",
    topic: "Block Structure",
    level: 5,
    xp: 20,
    instructions: `<p>A blockchain is, at its core, a list of <strong>blocks</strong>, where each block bundles up some data and a few pieces of bookkeeping. You already have the tool for this from Level 4: a <code>@dataclass</code>. A block needs: an <code>index</code> (its position in the chain), a <code>timestamp</code>, the <code>data</code> it's carrying, the <code>previous_hash</code> (the hash of the block before it -- this is what actually links blocks into a chain, as you'll see in the next challenge), and its own <code>hash</code>.</p>
<p>That last field is special: it shouldn't be something you pass in yourself, since a block's hash has to be computed <em>from</em> its other fields (index, timestamp, data, and previous_hash, all joined together and hashed) -- otherwise nothing would stop you from attaching any hash you like to any data you like. Recall <code>__post_init__</code> from Level 4: it runs automatically right after a dataclass's normal <code>__init__</code>, which makes it the right place to compute a field from the others instead of accepting it as a constructor argument. Marking a field <code>field(init=False)</code> tells the dataclass "don't expect this in the constructor call -- something else will set it."</p>
<span class="task-label">Your Task</span>
<p class="task-line">Define a <code>Block</code> dataclass with fields <code>index: int</code>, <code>timestamp: str</code>, <code>data: str</code>, <code>previous_hash: str</code>, and <code>hash: str = field(init=False)</code>. Give it a method <code>compute_hash(self)</code> that joins <code>index</code>, <code>timestamp</code>, <code>data</code>, and <code>previous_hash</code> into one string and returns its SHA-256 hex digest. In <code>__post_init__</code>, set <code>self.hash</code> by calling <code>self.compute_hash()</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">Block(index=0, timestamp="2026-01-01T00:00:00", data="Genesis Block", previous_hash="0")</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">a Block whose .hash equals .compute_hash()</code></div>
</div>`,
    hints: [
      "hash: str = field(init=False) -- goes after the other fields since it has no default value passed in",
      "def compute_hash(self): return hashlib.sha256(f\"{self.index}{self.timestamp}{self.data}{self.previous_hash}\".encode()).hexdigest()",
      "def __post_init__(self): self.hash = self.compute_hash()"
    ],
    starterCode: "from dataclasses import dataclass, field\nimport hashlib\n\n@dataclass\nclass Block:\n    index: int\n    timestamp: str\n    data: str\n    previous_hash: str\n    # Add a 'hash' field that's computed, not passed in\n\n    # Add compute_hash() and __post_init__()\n",
    solution: "from dataclasses import dataclass, field\nimport hashlib\n\n@dataclass\nclass Block:\n    index: int\n    timestamp: str\n    data: str\n    previous_hash: str\n    hash: str = field(init=False)\n\n    def __post_init__(self):\n        self.hash = self.compute_hash()\n\n    def compute_hash(self):\n        contents = f\"{self.index}{self.timestamp}{self.data}{self.previous_hash}\"\n        return hashlib.sha256(contents.encode()).hexdigest()",
    validation: {
      checks: [
        { type: "hasDataclass", message: "Apply the @dataclass decorator to Block." },
        { type: "matchesRegex", pattern: "hash\\s*:\\s*str\\s*=\\s*field\\s*\\(\\s*init\\s*=\\s*False\\s*\\)", message: "Declare 'hash: str = field(init=False)'." },
        { type: "matchesRegex", pattern: "def\\s+compute_hash\\s*\\(\\s*self\\s*\\)", message: "Define a compute_hash(self) method." },
        { type: "matchesRegex", pattern: "def\\s+__post_init__\\s*\\(\\s*self\\s*\\)", message: "Define __post_init__(self)." }
      ],
      pyTests: [
        { code: "b = Block(index=0, timestamp='2026-01-01T00:00:00', data='Genesis Block', previous_hash='0')\nassert b.hash == b.compute_hash()", message: "A Block's .hash should equal what .compute_hash() returns." },
        { code: "b = Block(index=0, timestamp='2026-01-01T00:00:00', data='Genesis Block', previous_hash='0')\nassert len(b.hash) == 64", message: "The computed hash should be a 64-character SHA-256 hex digest." },
        { code: "b1 = Block(index=0, timestamp='2026-01-01T00:00:00', data='Genesis Block', previous_hash='0')\nb2 = Block(index=0, timestamp='2026-01-01T00:00:00', data='Genesis Block', previous_hash='0')\nassert b1.hash == b2.hash", message: "Two blocks built from identical fields should produce identical hashes." }
      ]
    },
    explanation: `<p>Because the hash is always recomputed from the block's own fields rather than trusted at face value, a Block can never lie about its own hash -- anyone holding the block can verify it themselves in one line. That self-checking property is what the next few challenges build into an entire chain.</p>`
  },
  {
    id: 203,
    title: "Building the Chain",
    difficulty: "medium",
    topic: "Block Structure",
    level: 5,
    xp: 20,
    instructions: `<p>A single self-verifying block is useful, but the "chain" part of blockchain comes from what <code>previous_hash</code> actually does: each new block stores the previous block's hash inside itself. That single link is what turns a list of independent blocks into a chain -- to change any block, you'd also have to change every block's <code>previous_hash</code> that comes after it, which (as you'll see soon with proof of work) is deliberately made expensive.</p>
<p>Every chain starts with a <strong>genesis block</strong>: block 0, which has no real predecessor, so its <code>previous_hash</code> is conventionally set to <code>"0"</code>. Every block after that points back to the one before it.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>build_chain(entries)</code>, which takes a list of data strings and returns a list of <code>Block</code>s: a genesis block first (<code>index=0</code>, <code>data="Genesis Block"</code>, <code>previous_hash="0"</code>), then one block per entry in <code>entries</code>, each linked to the block before it via <code>previous_hash</code>. Use <code>timestamp=f"2026-01-01T00:0{i}:00"</code> for each block's timestamp, where <code>i</code> is that block's index.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">entries = ["Pay Alice 10 coins", "Pay Bob 5 coins"]</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">a 3-block chain: genesis, then the two entries, each linked by previous_hash</code></div>
</div>`,
    hints: [
      "Start the list with the genesis block: chain = [Block(index=0, timestamp=\"2026-01-01T00:00:00\", data=\"Genesis Block\", previous_hash=\"0\")]",
      "Loop with enumerate(entries, start=1) to get both the index and the data",
      "Each new block's previous_hash is chain[-1].hash -- the hash of the block you just appended"
    ],
    starterCode: "from dataclasses import dataclass, field\nimport hashlib\n\n@dataclass\nclass Block:\n    index: int\n    timestamp: str\n    data: str\n    previous_hash: str\n    hash: str = field(init=False)\n\n    def __post_init__(self):\n        self.hash = self.compute_hash()\n\n    def compute_hash(self):\n        contents = f\"{self.index}{self.timestamp}{self.data}{self.previous_hash}\"\n        return hashlib.sha256(contents.encode()).hexdigest()\n\n\ndef build_chain(entries):\n    # Start with the genesis block, then append one linked block per entry\n    pass\n",
    solution: "from dataclasses import dataclass, field\nimport hashlib\n\n@dataclass\nclass Block:\n    index: int\n    timestamp: str\n    data: str\n    previous_hash: str\n    hash: str = field(init=False)\n\n    def __post_init__(self):\n        self.hash = self.compute_hash()\n\n    def compute_hash(self):\n        contents = f\"{self.index}{self.timestamp}{self.data}{self.previous_hash}\"\n        return hashlib.sha256(contents.encode()).hexdigest()\n\n\ndef build_chain(entries):\n    chain = [Block(index=0, timestamp=\"2026-01-01T00:00:00\", data=\"Genesis Block\", previous_hash=\"0\")]\n    for i, entry in enumerate(entries, start=1):\n        prev = chain[-1]\n        chain.append(Block(index=i, timestamp=f\"2026-01-01T00:0{i}:00\", data=entry, previous_hash=prev.hash))\n    return chain",
    validation: {
      checks: [
        { type: "hasValidDef", name: "build_chain", message: "Define build_chain(entries)." },
        { type: "matchesRegex", pattern: "previous_hash\\s*=\\s*\"0\"", message: "The genesis block's previous_hash should be \"0\"." },
        { type: "matchesRegex", pattern: "previous_hash\\s*=\\s*prev\\.hash|previous_hash\\s*=\\s*chain\\[\\s*-1\\s*\\]\\.hash", message: "Link each new block to the hash of the block before it." }
      ],
      pyTests: [
        { code: "chain = build_chain(['Pay Alice 10 coins', 'Pay Bob 5 coins'])\nassert len(chain) == 3", message: "A chain built from 2 entries should have 3 blocks (genesis + 2)." },
        { code: "chain = build_chain(['Pay Alice 10 coins', 'Pay Bob 5 coins'])\nassert chain[0].previous_hash == '0' and chain[0].data == 'Genesis Block'", message: "The genesis block should have previous_hash '0' and data 'Genesis Block'." },
        { code: "chain = build_chain(['Pay Alice 10 coins', 'Pay Bob 5 coins'])\nassert chain[1].previous_hash == chain[0].hash\nassert chain[2].previous_hash == chain[1].hash", message: "Each block's previous_hash should equal the previous block's hash." }
      ]
    },
    explanation: `<p>You now have an actual chain -- a sequence of blocks where each one cryptographically references the one before it. The next challenge puts this to work: writing the function that walks the chain and confirms none of those links have been broken.</p>`
  },
  {
    id: 204,
    title: "Validating a Chain",
    difficulty: "medium",
    topic: "Block Structure",
    level: 5,
    xp: 20,
    instructions: `<p>Building a chain is only half the story -- the whole reason a chain resists tampering is that anyone can independently check whether it's still intact, without trusting whoever handed it to them. Validating a chain means checking two things for every block: (1) does its stored <code>hash</code> still match what <code>compute_hash()</code> gives you right now, and (2) does its <code>previous_hash</code> still match the actual hash of the block before it?</p>
<p>If someone edits a block's <code>data</code> directly (without going through proper channels), check (1) catches it immediately for that block -- the stored hash no longer matches the freshly computed one. And even in the rare case someone patches the stored hash too, check (2) still catches it, because now the next block's <code>previous_hash</code> points to a hash that no longer exists in the chain.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>is_chain_valid(chain)</code>, which returns <code>True</code> if every block's hash matches its own recomputed hash <em>and</em> every block's <code>previous_hash</code> matches the previous block's hash (skip the previous-hash check for the genesis block, which has none), and <code>False</code> the moment either check fails anywhere in the chain.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">a chain built by build_chain(), untouched</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">True</code></div>
</div>`,
    hints: [
      "Loop with an index: for i in range(len(chain)):",
      "if chain[i].hash != chain[i].compute_hash(): return False",
      "if i > 0 and chain[i].previous_hash != chain[i - 1].hash: return False",
      "If the loop finishes without returning False, return True"
    ],
    starterCode: "from dataclasses import dataclass, field\nimport hashlib\n\n@dataclass\nclass Block:\n    index: int\n    timestamp: str\n    data: str\n    previous_hash: str\n    hash: str = field(init=False)\n\n    def __post_init__(self):\n        self.hash = self.compute_hash()\n\n    def compute_hash(self):\n        contents = f\"{self.index}{self.timestamp}{self.data}{self.previous_hash}\"\n        return hashlib.sha256(contents.encode()).hexdigest()\n\n\ndef build_chain(entries):\n    chain = [Block(index=0, timestamp=\"2026-01-01T00:00:00\", data=\"Genesis Block\", previous_hash=\"0\")]\n    for i, entry in enumerate(entries, start=1):\n        prev = chain[-1]\n        chain.append(Block(index=i, timestamp=f\"2026-01-01T00:0{i}:00\", data=entry, previous_hash=prev.hash))\n    return chain\n\n\ndef is_chain_valid(chain):\n    # Check every block's own hash, and every link to the previous block\n    pass\n",
    solution: "from dataclasses import dataclass, field\nimport hashlib\n\n@dataclass\nclass Block:\n    index: int\n    timestamp: str\n    data: str\n    previous_hash: str\n    hash: str = field(init=False)\n\n    def __post_init__(self):\n        self.hash = self.compute_hash()\n\n    def compute_hash(self):\n        contents = f\"{self.index}{self.timestamp}{self.data}{self.previous_hash}\"\n        return hashlib.sha256(contents.encode()).hexdigest()\n\n\ndef build_chain(entries):\n    chain = [Block(index=0, timestamp=\"2026-01-01T00:00:00\", data=\"Genesis Block\", previous_hash=\"0\")]\n    for i, entry in enumerate(entries, start=1):\n        prev = chain[-1]\n        chain.append(Block(index=i, timestamp=f\"2026-01-01T00:0{i}:00\", data=entry, previous_hash=prev.hash))\n    return chain\n\n\ndef is_chain_valid(chain):\n    for i in range(len(chain)):\n        block = chain[i]\n        if block.hash != block.compute_hash():\n            return False\n        if i > 0 and block.previous_hash != chain[i - 1].hash:\n            return False\n    return True",
    validation: {
      checks: [
        { type: "hasValidDef", name: "is_chain_valid", message: "Define is_chain_valid(chain)." },
        { type: "matchesRegex", pattern: "\\.compute_hash\\(\\)", message: "Recompute each block's hash with .compute_hash() to check it." },
        { type: "matchesRegex", pattern: "previous_hash", message: "Check each block's previous_hash against the prior block's hash." }
      ],
      pyTests: [
        { code: "chain = build_chain(['Pay Alice 10 coins', 'Pay Bob 5 coins'])\nassert is_chain_valid(chain) == True", message: "An untouched chain should be valid." },
        { code: "chain = build_chain(['Pay Alice 10 coins', 'Pay Bob 5 coins'])\nchain[1].data = 'Pay Alice 999 coins'\nassert is_chain_valid(chain) == False", message: "Editing a block's data without recomputing its hash should make the chain invalid." },
        { code: "chain = build_chain(['Pay Alice 10 coins'])\nassert is_chain_valid(chain) == True", message: "A chain with just a genesis block plus one entry should still validate." }
      ]
    },
    explanation: `<p>This is the function every node in a real network runs to decide whether to trust a chain it received from someone else. It's also deliberately cheap to run -- checking a chain takes a few hash computations per block, which is why the next challenge's proof of work makes <em>creating</em> a valid block expensive instead, so that verifying stays fast while forging stays slow.</p>`
  },
  {
    id: 205,
    title: "Guided Project: Tamper Detection",
    kind: "project",
    difficulty: "medium",
    topic: "Block Structure",
    level: 5,
    xp: 30,
    instructions: `<p>You now have every piece needed to catch tampering pinpointed to an exact block, not just a yes/no answer for the whole chain. Instead of stopping at the first broken link like <code>is_chain_valid</code> does, this project walks the <em>entire</em> chain and reports every block index where something doesn't check out.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>find_tampered_blocks(chain)</code>, which returns a list of the <code>index</code> values of every block that fails either check from before (its own hash doesn't match its recomputed hash, or its <code>previous_hash</code> doesn't match the prior block's hash) -- checking every block rather than stopping at the first failure. Then, given <code>chain</code> (already built for you, with block 2's data silently edited after the fact), use your function to set <code>tampered_indexes</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">a 4-block chain where only block 2's data was edited after creation</code></div>
  <div class="io-row"><span class="io-key">tampered_indexes</span><code class="io-val">[2]</code></div>
</div>`,
    hints: [
      "Loop over every block, don't return early -- collect every failing index instead",
      "A block fails if block.hash != block.compute_hash()",
      "A block also fails if (for non-genesis blocks) previous_hash != chain[i-1].hash",
      "Use a list and .append(block.index) for each failure, avoiding duplicate entries for the same block"
    ],
    starterCode: "from dataclasses import dataclass, field\nimport hashlib\n\n@dataclass\nclass Block:\n    index: int\n    timestamp: str\n    data: str\n    previous_hash: str\n    hash: str = field(init=False)\n\n    def __post_init__(self):\n        self.hash = self.compute_hash()\n\n    def compute_hash(self):\n        contents = f\"{self.index}{self.timestamp}{self.data}{self.previous_hash}\"\n        return hashlib.sha256(contents.encode()).hexdigest()\n\n\ndef build_chain(entries):\n    chain = [Block(index=0, timestamp=\"2026-01-01T00:00:00\", data=\"Genesis Block\", previous_hash=\"0\")]\n    for i, entry in enumerate(entries, start=1):\n        prev = chain[-1]\n        chain.append(Block(index=i, timestamp=f\"2026-01-01T00:0{i}:00\", data=entry, previous_hash=prev.hash))\n    return chain\n\n\ndef find_tampered_blocks(chain):\n    # Return a list of every block's index that fails a check\n    pass\n\n\nchain = build_chain([\"Pay Alice 10 coins\", \"Pay Bob 5 coins\", \"Pay Carol 2 coins\"])\nchain[2].data = \"Pay Bob 500 coins\"\n# Use find_tampered_blocks to set tampered_indexes\n",
    solution: "from dataclasses import dataclass, field\nimport hashlib\n\n@dataclass\nclass Block:\n    index: int\n    timestamp: str\n    data: str\n    previous_hash: str\n    hash: str = field(init=False)\n\n    def __post_init__(self):\n        self.hash = self.compute_hash()\n\n    def compute_hash(self):\n        contents = f\"{self.index}{self.timestamp}{self.data}{self.previous_hash}\"\n        return hashlib.sha256(contents.encode()).hexdigest()\n\n\ndef build_chain(entries):\n    chain = [Block(index=0, timestamp=\"2026-01-01T00:00:00\", data=\"Genesis Block\", previous_hash=\"0\")]\n    for i, entry in enumerate(entries, start=1):\n        prev = chain[-1]\n        chain.append(Block(index=i, timestamp=f\"2026-01-01T00:0{i}:00\", data=entry, previous_hash=prev.hash))\n    return chain\n\n\ndef find_tampered_blocks(chain):\n    bad_indexes = []\n    for i in range(len(chain)):\n        block = chain[i]\n        failed = block.hash != block.compute_hash()\n        if not failed and i > 0:\n            failed = block.previous_hash != chain[i - 1].hash\n        if failed:\n            bad_indexes.append(block.index)\n    return bad_indexes\n\n\nchain = build_chain([\"Pay Alice 10 coins\", \"Pay Bob 5 coins\", \"Pay Carol 2 coins\"])\nchain[2].data = \"Pay Bob 500 coins\"\ntampered_indexes = find_tampered_blocks(chain)",
    validation: {
      checks: [
        { type: "hasValidDef", name: "find_tampered_blocks", message: "Define find_tampered_blocks(chain)." },
        { type: "matchesRegex", pattern: "tampered_indexes\\s*=\\s*find_tampered_blocks\\s*\\(\\s*chain\\s*\\)", message: "Set tampered_indexes using find_tampered_blocks(chain)." }
      ],
      pyTests: [
        { code: "assert tampered_indexes == [2]", message: "Only block 2 (the one whose data was edited) should be reported." },
        { code: "clean_chain = build_chain(['Pay Alice 10 coins', 'Pay Bob 5 coins'])\nassert find_tampered_blocks(clean_chain) == []", message: "An untouched chain should report no tampered blocks." }
      ]
    },
    explanation: `<p>Editing <code>chain[2].data</code> directly, the way this project does, is exactly what an attacker would try -- reach into the data structure and change a value in place. It doesn't work, not because Python stops you (it doesn't), but because the block's own stored hash instantly stops matching what its fields now hash to. The block is now visibly lying about itself, and <code>find_tampered_blocks</code> catches the lie precisely.</p>`
  },
  {
    id: 206,
    title: "Merkle Trees",
    difficulty: "hard",
    topic: "Merkle Trees",
    level: 5,
    xp: 25,
    instructions: `<p>A real block doesn't hold just one piece of data -- it holds a whole batch of transactions. So far, every hash you've computed has covered a single string. A <strong>Merkle tree</strong> is how a block gets a single fingerprint that still represents <em>every</em> transaction inside it, without hashing the entire batch as one giant blob.</p>
<p>The construction is simple, and it happens in rounds. First, hash every transaction individually -- these become the "leaves" of the tree. Then, pair up the leaf hashes (hash 0 with hash 1, hash 2 with hash 3, and so on), concatenate each pair as a string, and hash <em>that</em> -- producing half as many hashes as you started with. Repeat: pair up this new, smaller row, hash the pairs, and keep going. Each round halves the count, until exactly one hash is left. That final hash is the <strong>Merkle root</strong>.</p>
<p>Since every round only combines existing hashes, changing even one transaction anywhere in the batch changes its leaf hash, which changes the hash of the pair it belongs to, which changes the hash of <em>that</em> pair's parent, all the way up to the root -- so the Merkle root alone is enough to detect that something in the batch changed, exactly like <code>previous_hash</code> did for the chain, just one level deeper.</p>
<p>One detail to handle: pairing only works cleanly when the count at a round is even. If a round has an odd number of hashes, the standard fix (used by Bitcoin) is to duplicate the last hash so it can pair with itself.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>compute_merkle_root(transactions)</code>, which takes a list of transaction strings and returns the Merkle root: hash each transaction, then repeatedly hash pairs together (duplicating the last hash of a round if the count is odd) until only one hash remains.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">["Pay Alice 10 coins", "Pay Bob 5 coins", "Pay Carol 2 coins"]</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">a single 64-character hex string, the same every time these exact 3 transactions are hashed this way</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>3 transactions is an odd count, so the last round will need the duplicate-the-last-hash rule to pair everything up.</span>
</div>`,
    hints: [
      "Start by hashing every transaction: hashes = [hashlib.sha256(t.encode()).hexdigest() for t in transactions]",
      "Loop while len(hashes) > 1",
      "Inside the loop, if len(hashes) is odd, append a copy of the last hash: hashes.append(hashes[-1])",
      "Build the next round by combining pairs: hashlib.sha256((hashes[i] + hashes[i+1]).encode()).hexdigest(), stepping i by 2",
      "When the loop ends, hashes[0] is the root"
    ],
    starterCode: "import hashlib\n\ndef compute_merkle_root(transactions):\n    # Hash every transaction, then repeatedly hash pairs until one hash remains\n    pass\n\n\ntransactions = [\"Pay Alice 10 coins\", \"Pay Bob 5 coins\", \"Pay Carol 2 coins\"]\nmerkle_root = compute_merkle_root(transactions)\n",
    solution: "import hashlib\n\ndef compute_merkle_root(transactions):\n    hashes = [hashlib.sha256(t.encode()).hexdigest() for t in transactions]\n    if not hashes:\n        return None\n    while len(hashes) > 1:\n        if len(hashes) % 2 == 1:\n            hashes.append(hashes[-1])\n        next_level = []\n        for i in range(0, len(hashes), 2):\n            combined = hashes[i] + hashes[i + 1]\n            next_level.append(hashlib.sha256(combined.encode()).hexdigest())\n        hashes = next_level\n    return hashes[0]\n\n\ntransactions = [\"Pay Alice 10 coins\", \"Pay Bob 5 coins\", \"Pay Carol 2 coins\"]\nmerkle_root = compute_merkle_root(transactions)",
    validation: {
      checks: [
        { type: "hasValidDef", name: "compute_merkle_root", message: "Define compute_merkle_root(transactions)." },
        { type: "matchesRegex", pattern: "len\\s*\\(\\s*hashes\\s*\\)\\s*%\\s*2", message: "Check for an odd count so you can duplicate the last hash." },
        { type: "matchesRegex", pattern: "hashlib\\.sha256\\(", message: "Hash both the individual transactions and the combined pairs." }
      ],
      pyTests: [
        { code: "assert len(merkle_root) == 64", message: "The Merkle root should be a 64-character SHA-256 hex digest." },
        { code: "assert merkle_root == compute_merkle_root(transactions)", message: "Calling compute_merkle_root again on the same transactions should give the same root." },
        { code: "changed = compute_merkle_root(['Pay Alice 10 coins', 'Pay Bob 5 coins', 'Pay Carol 999 coins'])\nassert changed != merkle_root", message: "Changing any one transaction should change the Merkle root." }
      ]
    },
    explanation: `<p>Notice the shape: this is the exact same "hash things, then hash the hashes" idea as <code>Block.compute_hash</code>, just applied repeatedly in rounds instead of once. That's what makes it efficient -- verifying a batch of a thousand transactions is still just a handful of hash operations at the top of the tree, not a thousand-item comparison. The next project puts that efficiency to use: proving one specific transaction is in the batch without needing the other 999.</p>`
  },
  {
    id: 207,
    title: "Guided Project: Merkle Proof",
    kind: "project",
    difficulty: "hard",
    topic: "Merkle Trees",
    level: 5,
    xp: 35,
    instructions: `<p>Here's the real payoff of building the tree in rounds rather than hashing everything in one pass: you can prove that one specific transaction belongs to a batch, using only the Merkle root and a short list of sibling hashes -- called a <strong>Merkle proof</strong> -- instead of the entire batch.</p>
<p>Think about what it takes to recompute the root starting from just one transaction. At the leaf level, you need that transaction's sibling (the hash it was paired with) to recompute their shared parent hash. At the next level up, you need <em>that</em> parent's sibling to recompute the next hash. Keep climbing, one sibling per level, and you eventually reconstruct the root -- with a proof that's only as long as the tree is tall, not as long as the whole transaction list.</p>
<p>Each step of the proof needs two things: the sibling's hash, and which <strong>side</strong> it sits on (<code>"left"</code> or <code>"right"</code>), since <code>hash(A + B)</code> and <code>hash(B + A)</code> are completely different hashes -- order matters when concatenating.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write two functions. <code>build_merkle_proof(transactions, index)</code> returns the proof for the transaction at <code>index</code>: a list of <code>(sibling_hash, side)</code> tuples, one per level, walking from the leaves up to the root (assume <code>len(transactions)</code> is a power of 2, so no duplicate-hash rule is needed here). <code>verify_merkle_proof(transaction, proof, root)</code> hashes <code>transaction</code>, then replays the proof step by step (combining with each sibling on the correct side and re-hashing) to see whether the result matches <code>root</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">4 transactions, root = compute_merkle_root(transactions), proof = build_merkle_proof(transactions, 2)</code></div>
  <div class="io-row"><span class="io-key">verify_merkle_proof(transactions[2], proof, root)</span><code class="io-val">True</code></div>
  <div class="io-row"><span class="io-key">verify_merkle_proof("a forged transaction", proof, root)</span><code class="io-val">False</code></div>
</div>`,
    hints: [
      "In build_merkle_proof, track the current index alongside the current round's hash list",
      "If the current index is even, its sibling is at index + 1 and goes on the 'right'; if odd, the sibling is at index - 1 and goes on the 'left'",
      "After recording the sibling for this level, build the next round the same way compute_merkle_root does, and set index = index // 2 to track your position one level up",
      "In verify_merkle_proof, start with hashlib.sha256(transaction.encode()).hexdigest(), then for each (sibling, side) either hash(current + sibling) or hash(sibling + current) depending on side"
    ],
    starterCode: "import hashlib\n\ndef compute_merkle_root(transactions):\n    hashes = [hashlib.sha256(t.encode()).hexdigest() for t in transactions]\n    if not hashes:\n        return None\n    while len(hashes) > 1:\n        if len(hashes) % 2 == 1:\n            hashes.append(hashes[-1])\n        next_level = []\n        for i in range(0, len(hashes), 2):\n            combined = hashes[i] + hashes[i + 1]\n            next_level.append(hashlib.sha256(combined.encode()).hexdigest())\n        hashes = next_level\n    return hashes[0]\n\n\ndef build_merkle_proof(transactions, index):\n    # Return a list of (sibling_hash, side) tuples from the leaves up to the root\n    pass\n\n\ndef verify_merkle_proof(transaction, proof, root):\n    # Replay the proof starting from transaction's own hash; return whether it reaches root\n    pass\n\n\ntransactions = [\"Pay Alice 10 coins\", \"Pay Bob 5 coins\", \"Pay Carol 2 coins\", \"Pay Dave 1 coin\"]\nroot = compute_merkle_root(transactions)\n\nproof = build_merkle_proof(transactions, 2)\nproof_valid = verify_merkle_proof(transactions[2], proof, root)\nforged_valid = verify_merkle_proof(\"Pay Carol 999 coins\", proof, root)\n",
    solution: "import hashlib\n\ndef compute_merkle_root(transactions):\n    hashes = [hashlib.sha256(t.encode()).hexdigest() for t in transactions]\n    if not hashes:\n        return None\n    while len(hashes) > 1:\n        if len(hashes) % 2 == 1:\n            hashes.append(hashes[-1])\n        next_level = []\n        for i in range(0, len(hashes), 2):\n            combined = hashes[i] + hashes[i + 1]\n            next_level.append(hashlib.sha256(combined.encode()).hexdigest())\n        hashes = next_level\n    return hashes[0]\n\n\ndef build_merkle_proof(transactions, index):\n    hashes = [hashlib.sha256(t.encode()).hexdigest() for t in transactions]\n    proof = []\n    idx = index\n    while len(hashes) > 1:\n        if idx % 2 == 0:\n            proof.append((hashes[idx + 1], \"right\"))\n        else:\n            proof.append((hashes[idx - 1], \"left\"))\n        next_level = []\n        for i in range(0, len(hashes), 2):\n            combined = hashes[i] + hashes[i + 1]\n            next_level.append(hashlib.sha256(combined.encode()).hexdigest())\n        hashes = next_level\n        idx = idx // 2\n    return proof\n\n\ndef verify_merkle_proof(transaction, proof, root):\n    current = hashlib.sha256(transaction.encode()).hexdigest()\n    for sibling, side in proof:\n        if side == \"right\":\n            current = hashlib.sha256((current + sibling).encode()).hexdigest()\n        else:\n            current = hashlib.sha256((sibling + current).encode()).hexdigest()\n    return current == root\n\n\ntransactions = [\"Pay Alice 10 coins\", \"Pay Bob 5 coins\", \"Pay Carol 2 coins\", \"Pay Dave 1 coin\"]\nroot = compute_merkle_root(transactions)\n\nproof = build_merkle_proof(transactions, 2)\nproof_valid = verify_merkle_proof(transactions[2], proof, root)\nforged_valid = verify_merkle_proof(\"Pay Carol 999 coins\", proof, root)",
    validation: {
      checks: [
        { type: "hasValidDef", name: "build_merkle_proof", message: "Define build_merkle_proof(transactions, index)." },
        { type: "hasValidDef", name: "verify_merkle_proof", message: "Define verify_merkle_proof(transaction, proof, root)." },
        { type: "matchesRegex", pattern: "idx\\s*=\\s*idx\\s*//\\s*2|idx\\s*//=\\s*2", message: "Move up one level by halving the index (integer division)." }
      ],
      pyTests: [
        { code: "assert proof_valid == True", message: "Verifying the real transaction against its own proof should succeed." },
        { code: "assert forged_valid == False", message: "Verifying a forged transaction string against someone else's proof should fail." },
        { code: "assert len(proof) == 2", message: "With 4 transactions, the tree is 2 levels tall, so the proof should have 2 entries." },
        { code: "for i in range(4):\n    p = build_merkle_proof(transactions, i)\n    assert verify_merkle_proof(transactions[i], p, root) == True", message: "Every transaction's own proof should verify successfully against the root." }
      ]
    },
    explanation: `<p>This is exactly the mechanism that lets a lightweight wallet (one that doesn't store the entire blockchain) confirm a payment happened, by asking a full node for a Merkle proof instead of the whole block. The wallet only needs a few sibling hashes and the block's root -- not gigabytes of transaction history -- to be cryptographically confident the transaction is really there.</p>`
  },
  {
    id: 208,
    title: "Proof of Work",
    difficulty: "hard",
    topic: "Proof of Work",
    level: 5,
    xp: 30,
    instructions: `<p>Go back to <code>is_chain_valid</code> from a few challenges ago: it's cheap to check whether a chain is intact, but nothing so far makes it <em>expensive to create</em> a block in the first place. Right now, anyone could rewrite history -- edit a block, recompute its hash (one line), fix up every <code>previous_hash</code> after it (also cheap), and hand you a chain that passes validation perfectly. <strong>Proof of work</strong> is the fix: it makes producing a valid block take real, unavoidable computational effort, so rewriting a chain means redoing that effort for every block after the edit.</p>
<p>The mechanism: a block is only considered valid once its hash meets a <strong>difficulty target</strong> -- conventionally, the hash must start with some number of leading zeros. But a block's contents (index, timestamp, data, previous_hash) don't naturally hash to something with leading zeros; there's no way to predict which inputs will. So you add one more field purely to search with: a <strong>nonce</strong>, just a number, that contributes nothing meaningful to the block's content but changes the hash completely every time you change it (recall the avalanche effect). "Mining" a block means trying <code>nonce = 0, 1, 2, 3, ...</code>, recomputing the hash each time, until one happens to start with enough zeros.</p>
<p>There's no shortcut for this search -- hashing is one-way, so there's no way to work backwards from "I want a hash starting with 0000" to the nonce that produces it. You just have to try nonces until you get lucky, and higher difficulty (more required zeros) means exponentially more tries on average: each extra leading zero required multiplies the expected search by 16, since hex digits range over 16 values. That asymmetry -- hard to find, trivial to check once found -- is the entire security model.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>compute_hash(index, timestamp, data, previous_hash, nonce)</code>, which joins all five values into one string and returns its SHA-256 hex digest. Then write <code>mine_block(index, timestamp, data, previous_hash, difficulty)</code>, which tries <code>nonce</code> values starting from <code>0</code> and increasing by <code>1</code> until it finds one whose hash starts with <code>difficulty</code> zeros, then returns <code>(nonce, hash)</code> as a tuple.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">mine_block(1, "2026-01-01T00:01:00", "Pay Alice 10 coins", "0"*64, 4)</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">(110395, "0000f279afb369ee5775cafac6a1f79e007e5ef63a02cfd9579354d9d07c21c2")</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>110,395 attempts sounds like a lot, but a computer runs through it in a fraction of a second. Real networks like Bitcoin use difficulty levels so high that the whole network, with enormous specialized hardware, still takes about 10 minutes per block -- that gap between "instant here" and "10 minutes at industrial scale" is exactly what makes real proof of work expensive to attack.</span>
</div>`,
    hints: [
      "compute_hash joins the five values into one f-string and hashes it, same pattern as Block.compute_hash but with nonce added",
      "In mine_block, start nonce = 0 and target = \"0\" * difficulty",
      "Loop: compute the hash for the current nonce; if hash_attempt.startswith(target), you're done",
      "Otherwise nonce += 1 and try again"
    ],
    starterCode: "import hashlib\n\ndef compute_hash(index, timestamp, data, previous_hash, nonce):\n    # Join all five values and return the SHA-256 hex digest\n    pass\n\n\ndef mine_block(index, timestamp, data, previous_hash, difficulty):\n    # Search nonces starting at 0 until the hash starts with 'difficulty' zeros\n    pass\n\n\nmined_nonce, mined_hash = mine_block(1, \"2026-01-01T00:01:00\", \"Pay Alice 10 coins\", \"0\" * 64, 4)\n",
    solution: "import hashlib\n\ndef compute_hash(index, timestamp, data, previous_hash, nonce):\n    contents = f\"{index}{timestamp}{data}{previous_hash}{nonce}\"\n    return hashlib.sha256(contents.encode()).hexdigest()\n\n\ndef mine_block(index, timestamp, data, previous_hash, difficulty):\n    nonce = 0\n    target = \"0\" * difficulty\n    while True:\n        hash_attempt = compute_hash(index, timestamp, data, previous_hash, nonce)\n        if hash_attempt.startswith(target):\n            return nonce, hash_attempt\n        nonce += 1\n\n\nmined_nonce, mined_hash = mine_block(1, \"2026-01-01T00:01:00\", \"Pay Alice 10 coins\", \"0\" * 64, 4)",
    validation: {
      checks: [
        { type: "hasValidDef", name: "compute_hash", message: "Define compute_hash(index, timestamp, data, previous_hash, nonce)." },
        { type: "hasValidDef", name: "mine_block", message: "Define mine_block(index, timestamp, data, previous_hash, difficulty)." },
        { type: "matchesRegex", pattern: "\\.startswith\\(\\s*target\\s*\\)", message: "Check whether the hash starts with the target string of zeros." },
        { type: "matchesRegex", pattern: "nonce\\s*\\+=\\s*1", message: "Increment the nonce by 1 on each attempt." }
      ],
      pyTests: [
        { code: "assert mined_hash.startswith('0000')", message: "The mined hash should start with 4 zeros (difficulty 4)." },
        { code: "assert compute_hash(1, '2026-01-01T00:01:00', 'Pay Alice 10 coins', '0' * 64, mined_nonce) == mined_hash", message: "Recomputing the hash with the found nonce should give the same hash back." },
        { code: "assert mined_nonce == 110395", message: "Searching nonces from 0 upward for these exact inputs at difficulty 4 should land on nonce 110395." }
      ]
    },
    explanation: `<p>Notice that <code>mine_block</code> is pure brute force -- try, check, increment, repeat -- with no cleverness possible because of the same one-way property that made hashing useful for tamper detection in the first place. That's not a limitation of this implementation; it's true of every proof-of-work system, including real ones. The next project wires this straight into the <code>Block</code> class, so building a chain now means actually mining every block, not just linking them.</p>`
  },
  {
    id: 209,
    title: "Guided Project: Mine a Chain",
    kind: "project",
    difficulty: "hard",
    topic: "Proof of Work",
    level: 5,
    xp: 40,
    instructions: `<p>Time to combine the last few challenges into something closer to a real chain. The <code>Block</code> from before computed its hash once, immediately, from its fields. A proof-of-work <code>Block</code> does something slightly different: it takes a <code>difficulty</code> field too, and instead of computing its hash once, it <em>mines</em> for a nonce that makes the hash satisfy that difficulty -- the mining work you just wrote in the last challenge, now happening automatically inside <code>__post_init__</code> every time a block is created.</p>
<p>Validating this chain also needs one more check beyond what <code>is_chain_valid</code> did before: it's not enough for a block's stored hash to match its own recomputed hash (that only proves the block wasn't edited after being mined) -- the hash also has to actually satisfy the difficulty target, or the block was never properly mined in the first place.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Define a <code>Block</code> dataclass with fields <code>index</code>, <code>timestamp</code>, <code>data</code>, <code>previous_hash</code>, <code>difficulty</code>, plus computed fields <code>nonce</code> and <code>hash</code> (both <code>field(init=False)</code>). Give it <code>compute_hash(self, nonce)</code> and <code>mine(self)</code> methods (same logic as the last challenge, now as methods), with <code>__post_init__</code> calling <code>self.mine()</code> to set both <code>self.nonce</code> and <code>self.hash</code>. Then write <code>build_pow_chain(entries, difficulty)</code> (like <code>build_chain</code>, but mining every block at the given difficulty) and <code>is_pow_chain_valid(chain)</code> (like <code>is_chain_valid</code>, plus the difficulty check). Build a 3-entry chain at <code>difficulty=4</code> and confirm it's valid.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">build_pow_chain(["Pay Alice 10 coins", "Pay Bob 5 coins", "Pay Carol 2 coins"], 4)</code></div>
  <div class="io-row"><span class="io-key">chain_valid</span><code class="io-val">True</code></div>
</div>`,
    hints: [
      "nonce: int = field(init=False) and hash: str = field(init=False), same pattern as before",
      "def __post_init__(self): self.nonce, self.hash = self.mine()",
      "def compute_hash(self, nonce): contents = f\"{self.index}{self.timestamp}{self.data}{self.previous_hash}{nonce}\"; return hashlib.sha256(contents.encode()).hexdigest()",
      "def mine(self): loop nonce upward, calling self.compute_hash(nonce), until it starts with \"0\" * self.difficulty",
      "In is_pow_chain_valid, add: if not block.hash.startswith(\"0\" * block.difficulty): return False"
    ],
    starterCode: "from dataclasses import dataclass, field\nimport hashlib\n\n@dataclass\nclass Block:\n    index: int\n    timestamp: str\n    data: str\n    previous_hash: str\n    difficulty: int\n    # Add computed nonce and hash fields\n\n    # Add __post_init__, compute_hash(self, nonce), and mine(self)\n\n\ndef build_pow_chain(entries, difficulty):\n    # Like build_chain, but every block is mined at the given difficulty\n    pass\n\n\ndef is_pow_chain_valid(chain):\n    # Like is_chain_valid, plus checking each block's hash meets its difficulty\n    pass\n\n\nchain = build_pow_chain([\"Pay Alice 10 coins\", \"Pay Bob 5 coins\", \"Pay Carol 2 coins\"], 4)\nchain_valid = is_pow_chain_valid(chain)\n",
    solution: "from dataclasses import dataclass, field\nimport hashlib\n\n@dataclass\nclass Block:\n    index: int\n    timestamp: str\n    data: str\n    previous_hash: str\n    difficulty: int\n    nonce: int = field(init=False)\n    hash: str = field(init=False)\n\n    def __post_init__(self):\n        self.nonce, self.hash = self.mine()\n\n    def compute_hash(self, nonce):\n        contents = f\"{self.index}{self.timestamp}{self.data}{self.previous_hash}{nonce}\"\n        return hashlib.sha256(contents.encode()).hexdigest()\n\n    def mine(self):\n        nonce = 0\n        target = \"0\" * self.difficulty\n        while True:\n            h = self.compute_hash(nonce)\n            if h.startswith(target):\n                return nonce, h\n            nonce += 1\n\n\ndef build_pow_chain(entries, difficulty):\n    chain = [Block(index=0, timestamp=\"2026-01-01T00:00:00\", data=\"Genesis Block\", previous_hash=\"0\", difficulty=difficulty)]\n    for i, entry in enumerate(entries, start=1):\n        prev = chain[-1]\n        chain.append(Block(index=i, timestamp=f\"2026-01-01T00:0{i}:00\", data=entry, previous_hash=prev.hash, difficulty=difficulty))\n    return chain\n\n\ndef is_pow_chain_valid(chain):\n    for i in range(len(chain)):\n        block = chain[i]\n        if block.hash != block.compute_hash(block.nonce):\n            return False\n        if not block.hash.startswith(\"0\" * block.difficulty):\n            return False\n        if i > 0 and block.previous_hash != chain[i - 1].hash:\n            return False\n    return True\n\n\nchain = build_pow_chain([\"Pay Alice 10 coins\", \"Pay Bob 5 coins\", \"Pay Carol 2 coins\"], 4)\nchain_valid = is_pow_chain_valid(chain)",
    validation: {
      checks: [
        { type: "hasDataclass", message: "Apply the @dataclass decorator to Block." },
        { type: "matchesRegex", pattern: "def\\s+mine\\s*\\(\\s*self\\s*\\)", message: "Define a mine(self) method." },
        { type: "hasValidDef", name: "build_pow_chain", message: "Define build_pow_chain(entries, difficulty)." },
        { type: "hasValidDef", name: "is_pow_chain_valid", message: "Define is_pow_chain_valid(chain)." }
      ],
      pyTests: [
        { code: "assert len(chain) == 4", message: "A chain built from 3 entries should have 4 blocks (genesis + 3)." },
        { code: "assert chain_valid == True", message: "A freshly mined chain should validate as True." },
        { code: "assert all(b.hash.startswith('0000') for b in chain)", message: "Every block's hash should satisfy difficulty 4 (start with 4 zeros)." },
        { code: "chain[2].data = 'Pay Bob 500 coins'\nassert is_pow_chain_valid(chain) == False", message: "Editing a block's data after mining (without re-mining) should invalidate the chain." }
      ]
    },
    explanation: `<p>This is a real, working (if tiny) proof-of-work blockchain -- every block on it was actually mined, not just linked. Notice what tampering now costs: changing <code>chain[2].data</code> doesn't just break one hash comparison anymore, it means block 2 would need to be re-mined from scratch (a real, unavoidable amount of computation) <em>and</em> every block after it re-mined too, since each one's <code>previous_hash</code> depends on the one before. That compounding cost, multiplied across an entire real network's history, is what makes rewriting an established blockchain practically infeasible.</p>`
  },
  {
    id: 210,
    title: "Account Balances & Transactions",
    difficulty: "medium",
    topic: "Account State",
    level: 5,
    xp: 25,
    instructions: `<p>Everything so far has treated a block's <code>data</code> as an opaque string -- "Pay Alice 10 coins" was just text to hash, never actually interpreted or acted on. Real blockchains do something more: they track <strong>state</strong>, meaning who owns what, and every transaction actually changes that state. There are two common ways to model this; from here on, this level uses the simpler one, called the <strong>account-based model</strong> (this is how Ethereum works): a single dictionary mapping each address to its current balance, like <code>{"Alice": 100, "Bob": 50}</code>.</p>
<p>Applying a transaction to this model means: check that the sender actually has enough balance to cover the amount (you can't send money you don't have), and that the amount itself makes sense (sending a negative amount would mean stealing from the recipient). If both checks pass, subtract the amount from the sender and add it to the recipient. If either check fails, the transaction is simply rejected -- the balances dictionary stays untouched.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>apply_transaction(balances, sender, recipient, amount)</code>. If <code>amount</code> is not positive, or the sender's balance (use <code>balances.get(sender, 0)</code> so a never-seen address reads as 0, not an error) is less than <code>amount</code>, leave <code>balances</code> unchanged and return <code>False</code>. Otherwise, subtract <code>amount</code> from the sender, add it to the recipient (again using <code>.get(recipient, 0)</code> in case the recipient is new), and return <code>True</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">balances = {"Alice": 100, "Bob": 50}<br>apply_transaction(balances, "Alice", "Bob", 30)</code></div>
  <div class="io-row"><span class="io-key">Returns</span><code class="io-val">True</code></div>
  <div class="io-row"><span class="io-key">balances</span><code class="io-val">{"Alice": 70, "Bob": 80}</code></div>
</div>`,
    hints: [
      "if amount <= 0: return False",
      "if balances.get(sender, 0) < amount: return False",
      "balances[sender] -= amount",
      "balances[recipient] = balances.get(recipient, 0) + amount"
    ],
    starterCode: "def apply_transaction(balances, sender, recipient, amount):\n    # Reject non-positive amounts and insufficient balances; otherwise transfer\n    pass\n\n\nbalances = {\"Alice\": 100, \"Bob\": 50}\nresult1 = apply_transaction(balances, \"Alice\", \"Bob\", 30)\nresult2 = apply_transaction(balances, \"Bob\", \"Alice\", 200)\nresult3 = apply_transaction(balances, \"Alice\", \"Carol\", -5)\n",
    solution: "def apply_transaction(balances, sender, recipient, amount):\n    if amount <= 0:\n        return False\n    if balances.get(sender, 0) < amount:\n        return False\n    balances[sender] -= amount\n    balances[recipient] = balances.get(recipient, 0) + amount\n    return True\n\n\nbalances = {\"Alice\": 100, \"Bob\": 50}\nresult1 = apply_transaction(balances, \"Alice\", \"Bob\", 30)\nresult2 = apply_transaction(balances, \"Bob\", \"Alice\", 200)\nresult3 = apply_transaction(balances, \"Alice\", \"Carol\", -5)",
    validation: {
      checks: [
        { type: "hasValidDef", name: "apply_transaction", message: "Define apply_transaction(balances, sender, recipient, amount)." },
        { type: "matchesRegex", pattern: "balances\\.get\\(\\s*sender", message: "Read the sender's balance with balances.get(sender, 0)." },
        { type: "matchesRegex", pattern: "amount\\s*<=\\s*0", message: "Reject non-positive amounts." }
      ],
      pyTests: [
        { code: "assert result1 == True", message: "A valid transfer (Alice has enough) should return True." },
        { code: "assert result2 == False", message: "Bob trying to send more than he has should return False." },
        { code: "assert result3 == False", message: "A negative amount should return False." },
        { code: "assert balances == {'Alice': 70, 'Bob': 80}", message: "Only the one valid transaction should have changed the balances." }
      ]
    },
    explanation: `<p>Notice that the two rejected transactions left <code>balances</code> completely untouched -- there's no partial transfer, no negative balance ever created. That all-or-nothing behavior is what makes a ledger trustworthy: every balance in it is always the honest result of only the transactions that were actually valid.</p>`
  },
  {
    id: 211,
    title: "Signing Transactions",
    difficulty: "medium",
    topic: "Account State",
    level: 5,
    xp: 25,
    instructions: `<p><code>apply_transaction</code> has a glaring hole: nothing stops anyone from calling <code>apply_transaction(balances, "Alice", "Mallory", 100)</code> and draining Alice's account, since nothing checks that Alice actually authorized it. Real blockchains close this hole with <strong>digital signatures</strong>: each account holds a secret key, and a transaction is only valid if it comes with a signature that could only have been produced using that account's secret.</p>
<p>Real systems use <em>asymmetric</em> cryptography for this -- a private key that signs and a separate public key that anyone can use to verify, without the public key ever revealing the private one. That's genuinely more machinery than this level needs. Instead, this challenge simulates the same core idea -- "only the secret's holder can produce a valid signature" -- with <code>hmac</code>, a standard-library tool that produces a keyed hash: the same secret key used to create the signature is also needed to verify it. It's not how real wallets work, but it teaches the exact same lesson: a signature ties a transaction to a specific secret, and forging one without that secret is just as infeasible as reversing a hash.</p>
<p>Use <code>hmac.compare_digest(a, b)</code> rather than <code>a == b</code> when comparing signatures -- it takes the same amount of time no matter where the strings first differ, so it doesn't leak information through timing the way a normal comparison technically can.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>sign_transaction(sender, recipient, amount, private_key)</code>, which builds a message from the three transaction fields and returns <code>hmac.new(private_key.encode(), message.encode(), hashlib.sha256).hexdigest()</code>. Write <code>verify_signature(sender, recipient, amount, signature, private_key)</code>, which recomputes the expected signature the same way and returns whether it matches <code>signature</code> via <code>hmac.compare_digest</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">signature = sign_transaction("Alice", "Bob", 30, "alice-secret-key")<br>verify_signature("Alice", "Bob", 30, signature, "alice-secret-key")</code></div>
  <div class="io-row"><span class="io-key">Returns</span><code class="io-val">True</code></div>
</div>`,
    hints: [
      "message = f\"{sender}{recipient}{amount}\"",
      "hmac.new(private_key.encode(), message.encode(), hashlib.sha256).hexdigest()",
      "In verify_signature, call sign_transaction again with the same inputs to get the expected signature",
      "Return hmac.compare_digest(expected, signature), not expected == signature"
    ],
    starterCode: "import hmac\nimport hashlib\n\ndef sign_transaction(sender, recipient, amount, private_key):\n    # Build a message from the fields and HMAC-sign it with private_key\n    pass\n\n\ndef verify_signature(sender, recipient, amount, signature, private_key):\n    # Recompute the expected signature and compare with hmac.compare_digest\n    pass\n\n\nalice_key = \"alice-secret-key\"\nsignature = sign_transaction(\"Alice\", \"Bob\", 30, alice_key)\n\nvalid = verify_signature(\"Alice\", \"Bob\", 30, signature, alice_key)\nwrong_key = verify_signature(\"Alice\", \"Bob\", 30, signature, \"not-alices-key\")\ntampered_amount = verify_signature(\"Alice\", \"Bob\", 999, signature, alice_key)\n",
    solution: "import hmac\nimport hashlib\n\ndef sign_transaction(sender, recipient, amount, private_key):\n    message = f\"{sender}{recipient}{amount}\"\n    return hmac.new(private_key.encode(), message.encode(), hashlib.sha256).hexdigest()\n\n\ndef verify_signature(sender, recipient, amount, signature, private_key):\n    expected = sign_transaction(sender, recipient, amount, private_key)\n    return hmac.compare_digest(expected, signature)\n\n\nalice_key = \"alice-secret-key\"\nsignature = sign_transaction(\"Alice\", \"Bob\", 30, alice_key)\n\nvalid = verify_signature(\"Alice\", \"Bob\", 30, signature, alice_key)\nwrong_key = verify_signature(\"Alice\", \"Bob\", 30, signature, \"not-alices-key\")\ntampered_amount = verify_signature(\"Alice\", \"Bob\", 999, signature, alice_key)",
    validation: {
      checks: [
        { type: "hasImport", module: "hmac", message: "Import the hmac module." },
        { type: "hasValidDef", name: "sign_transaction", message: "Define sign_transaction(sender, recipient, amount, private_key)." },
        { type: "hasValidDef", name: "verify_signature", message: "Define verify_signature(sender, recipient, amount, signature, private_key)." },
        { type: "matchesRegex", pattern: "hmac\\.compare_digest\\(", message: "Compare signatures with hmac.compare_digest(), not ==." }
      ],
      pyTests: [
        { code: "assert valid == True", message: "Verifying with the correct key and unchanged fields should succeed." },
        { code: "assert wrong_key == False", message: "Verifying with the wrong key should fail." },
        { code: "assert tampered_amount == False", message: "Verifying with a different amount than what was signed should fail." },
        { code: "assert len(signature) == 64", message: "An HMAC-SHA256 signature, like a plain SHA-256 hash, is a 64-character hex string." }
      ]
    },
    explanation: `<p><code>wrong_key</code> and <code>tampered_amount</code> failing for two different reasons is the whole point: a signature is tied to <em>both</em> the exact secret that made it <em>and</em> the exact data it was made over. Change either one -- steal someone's transaction and try to replay it with your own key, or take a legitimately signed transaction and quietly bump the amount -- and the signature no longer matches. Next up: wiring this into <code>apply_transaction</code> so unsigned or forged transactions never touch the ledger at all.</p>`
  },
  {
    id: 212,
    title: "Guided Project: Wallet Ledger",
    kind: "project",
    difficulty: "hard",
    topic: "Account State",
    level: 5,
    xp: 40,
    instructions: `<p>Time to put <code>apply_transaction</code> and signature verification to work together, processing a whole batch of transactions the way a real node would: for each one, check the signature first, and only if that passes, attempt the balance transfer. A transaction can fail for either reason, and a real ledger needs to say which.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>process_ledger(balances, account_keys, transactions)</code>. <code>account_keys</code> maps each address to its secret key; each transaction in <code>transactions</code> is a dict with <code>"sender"</code>, <code>"recipient"</code>, <code>"amount"</code>, and <code>"signature"</code>. For every transaction, in order: look up the sender's key from <code>account_keys</code> (use <code>.get(sender, "")</code> in case the sender is unknown), and verify the signature. If it fails, append <code>"rejected: bad signature"</code> to a results list and move to the next transaction -- don't touch <code>balances</code>. If it passes, call <code>apply_transaction</code>; if that returns <code>False</code>, append <code>"rejected: insufficient funds"</code>. If both checks pass, append <code>"accepted"</code>. Return the results list. (<code>balances</code> is a dict, so your changes to it apply directly -- no need to return it too.)</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">4 transactions: a valid transfer, one signed with the wrong key, one that overspends, and another valid transfer</code></div>
  <div class="io-row"><span class="io-key">results</span><code class="io-val">["accepted", "rejected: bad signature", "rejected: insufficient funds", "accepted"]</code></div>
</div>`,
    hints: [
      "Loop over transactions, pulling out sender, recipient, amount, signature from each dict",
      "key = account_keys.get(sender, \"\")",
      "if not verify_signature(sender, recipient, amount, signature, key): results.append(\"rejected: bad signature\"); continue",
      "if not apply_transaction(balances, sender, recipient, amount): results.append(\"rejected: insufficient funds\"); continue",
      "Otherwise: results.append(\"accepted\")"
    ],
    starterCode: "import hmac\nimport hashlib\n\ndef sign_transaction(sender, recipient, amount, private_key):\n    message = f\"{sender}{recipient}{amount}\"\n    return hmac.new(private_key.encode(), message.encode(), hashlib.sha256).hexdigest()\n\n\ndef verify_signature(sender, recipient, amount, signature, private_key):\n    expected = sign_transaction(sender, recipient, amount, private_key)\n    return hmac.compare_digest(expected, signature)\n\n\ndef apply_transaction(balances, sender, recipient, amount):\n    if amount <= 0:\n        return False\n    if balances.get(sender, 0) < amount:\n        return False\n    balances[sender] -= amount\n    balances[recipient] = balances.get(recipient, 0) + amount\n    return True\n\n\ndef process_ledger(balances, account_keys, transactions):\n    # Verify each transaction's signature, then attempt the transfer\n    pass\n\n\naccount_keys = {\"Alice\": \"alice-secret\", \"Bob\": \"bob-secret\", \"Carol\": \"carol-secret\"}\nbalances = {\"Alice\": 100, \"Bob\": 50, \"Carol\": 0}\n\ntransactions = [\n    {\"sender\": \"Alice\", \"recipient\": \"Bob\", \"amount\": 30,\n     \"signature\": sign_transaction(\"Alice\", \"Bob\", 30, \"alice-secret\")},\n    {\"sender\": \"Bob\", \"recipient\": \"Carol\", \"amount\": 20,\n     \"signature\": sign_transaction(\"Bob\", \"Carol\", 20, \"wrong-secret\")},\n    {\"sender\": \"Carol\", \"recipient\": \"Alice\", \"amount\": 10,\n     \"signature\": sign_transaction(\"Carol\", \"Alice\", 10, \"carol-secret\")},\n    {\"sender\": \"Alice\", \"recipient\": \"Carol\", \"amount\": 25,\n     \"signature\": sign_transaction(\"Alice\", \"Carol\", 25, \"alice-secret\")},\n]\n\nresults = process_ledger(balances, account_keys, transactions)\n",
    solution: "import hmac\nimport hashlib\n\ndef sign_transaction(sender, recipient, amount, private_key):\n    message = f\"{sender}{recipient}{amount}\"\n    return hmac.new(private_key.encode(), message.encode(), hashlib.sha256).hexdigest()\n\n\ndef verify_signature(sender, recipient, amount, signature, private_key):\n    expected = sign_transaction(sender, recipient, amount, private_key)\n    return hmac.compare_digest(expected, signature)\n\n\ndef apply_transaction(balances, sender, recipient, amount):\n    if amount <= 0:\n        return False\n    if balances.get(sender, 0) < amount:\n        return False\n    balances[sender] -= amount\n    balances[recipient] = balances.get(recipient, 0) + amount\n    return True\n\n\ndef process_ledger(balances, account_keys, transactions):\n    results = []\n    for tx in transactions:\n        sender = tx[\"sender\"]\n        recipient = tx[\"recipient\"]\n        amount = tx[\"amount\"]\n        signature = tx[\"signature\"]\n        key = account_keys.get(sender, \"\")\n        if not verify_signature(sender, recipient, amount, signature, key):\n            results.append(\"rejected: bad signature\")\n            continue\n        if not apply_transaction(balances, sender, recipient, amount):\n            results.append(\"rejected: insufficient funds\")\n            continue\n        results.append(\"accepted\")\n    return results\n\n\naccount_keys = {\"Alice\": \"alice-secret\", \"Bob\": \"bob-secret\", \"Carol\": \"carol-secret\"}\nbalances = {\"Alice\": 100, \"Bob\": 50, \"Carol\": 0}\n\ntransactions = [\n    {\"sender\": \"Alice\", \"recipient\": \"Bob\", \"amount\": 30,\n     \"signature\": sign_transaction(\"Alice\", \"Bob\", 30, \"alice-secret\")},\n    {\"sender\": \"Bob\", \"recipient\": \"Carol\", \"amount\": 20,\n     \"signature\": sign_transaction(\"Bob\", \"Carol\", 20, \"wrong-secret\")},\n    {\"sender\": \"Carol\", \"recipient\": \"Alice\", \"amount\": 10,\n     \"signature\": sign_transaction(\"Carol\", \"Alice\", 10, \"carol-secret\")},\n    {\"sender\": \"Alice\", \"recipient\": \"Carol\", \"amount\": 25,\n     \"signature\": sign_transaction(\"Alice\", \"Carol\", 25, \"alice-secret\")},\n]\n\nresults = process_ledger(balances, account_keys, transactions)",
    validation: {
      checks: [
        { type: "hasValidDef", name: "process_ledger", message: "Define process_ledger(balances, account_keys, transactions)." },
        { type: "matchesRegex", pattern: "rejected:\\s*bad signature", message: "Use the exact string 'rejected: bad signature' for signature failures." },
        { type: "matchesRegex", pattern: "rejected:\\s*insufficient funds", message: "Use the exact string 'rejected: insufficient funds' for balance failures." },
        { type: "matchesRegex", pattern: "verify_signature\\(", message: "Verify the signature before attempting the transfer." }
      ],
      pyTests: [
        { code: "assert results == ['accepted', 'rejected: bad signature', 'rejected: insufficient funds', 'accepted']", message: "The four transactions should resolve in exactly this order: accepted, bad signature, insufficient funds, accepted." },
        { code: "assert balances == {'Alice': 45, 'Bob': 80, 'Carol': 25}", message: "Only the two accepted transactions should have moved any balance." }
      ]
    },
    explanation: `<p>Bob's transaction to Carol failed for a security reason (wrong key), and Carol's transaction to Alice failed for an economic reason (no funds) -- two completely different kinds of invalid, and your ledger caught both without letting either one touch the balances. This two-layer check -- "is it authorized?" then "is it affordable?" -- is exactly what every real account-based blockchain does before it lets a transaction into a block at all.</p>`
  },
  {
    id: 213,
    title: "Proof of Stake",
    difficulty: "medium",
    topic: "Proof of Stake",
    level: 5,
    xp: 25,
    instructions: `<p>Proof of work earns the right to propose the next block by burning computation -- real electricity, real hardware, real time spent mining. <strong>Proof of stake</strong> asks a completely different question: instead of "who can compute the fastest," it asks "who has the most locked up in this system, and therefore the most to lose by cheating?" Validators put up a <strong>stake</strong> -- coins they commit to the network -- and the next block's proposer is chosen randomly, but weighted so that a bigger stake means a proportionally better chance of being picked. No mining, no wasted computation, no difficulty target.</p>
<p>"Weighted randomly" is exactly what it sounds like: think of it as everyone's stake buying them tickets in a raffle -- a validator with 50 coins staked holds 5 times as many tickets as one with 10 coins staked, so they're 5 times as likely to win any given round, but a small validator can still occasionally get picked. Python's <code>random.choices(population, weights=...)</code> does precisely this: given a list of items and a matching list of weights, it picks one item, favoring higher weights, without you writing the raffle logic by hand.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>select_validator(stakes)</code>, where <code>stakes</code> is a dict mapping each validator's name to their staked amount. Return one validator name, chosen with probability proportional to their stake, using <code>random.choices()</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">stakes = {"Alice": 50, "Bob": 30, "Carol": 20}</code></div>
  <div class="io-row"><span class="io-key">select_validator(stakes)</span><code class="io-val">one of "Alice", "Bob", or "Carol" -- Alice is picked roughly half the time over many calls, since her stake is half the total</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>random.choices() always returns a list (so it can pick several items at once with the k argument) -- with k=1 you still get a one-item list back, so grab [0] to get the name itself.</span>
</div>`,
    hints: [
      "validators = list(stakes.keys())",
      "weights = list(stakes.values())",
      "random.choices(validators, weights=weights, k=1) returns a one-item list",
      "Index [0] to get the validator name out of that list"
    ],
    starterCode: "import random\n\ndef select_validator(stakes):\n    # Pick one validator, weighted by their stake\n    pass\n\n\nstakes = {\"Alice\": 50, \"Bob\": 30, \"Carol\": 20}\nselected = select_validator(stakes)\n",
    solution: "import random\n\ndef select_validator(stakes):\n    validators = list(stakes.keys())\n    weights = list(stakes.values())\n    return random.choices(validators, weights=weights, k=1)[0]\n\n\nstakes = {\"Alice\": 50, \"Bob\": 30, \"Carol\": 20}\nselected = select_validator(stakes)",
    validation: {
      checks: [
        { type: "hasImport", module: "random", message: "Import the random module." },
        { type: "hasValidDef", name: "select_validator", message: "Define select_validator(stakes)." },
        { type: "matchesRegex", pattern: "random\\.choices\\(", message: "Use random.choices() for weighted selection." },
        { type: "matchesRegex", pattern: "weights\\s*=", message: "Pass the stakes in as the weights argument." }
      ],
      pyTests: [
        { code: "assert selected in stakes", message: "'selected' should be one of the validator names from stakes." },
        { code: "assert selected == 'Bob'", message: "With this challenge's fixed random seed, selecting from these exact stakes should land on 'Bob'." }
      ]
    },
    explanation: `<p>A single call like this doesn't prove much on its own -- Bob winning once doesn't mean the weighting is working, since even a fair coin comes up heads sometimes. The next project runs this hundreds of times and checks the pattern that emerges, which is really where "weighted by stake" becomes visible.</p>`
  },
  {
    id: 214,
    title: "Guided Project: Validator Selection",
    kind: "project",
    difficulty: "medium",
    topic: "Proof of Stake",
    level: 5,
    xp: 30,
    instructions: `<p>One weighted pick doesn't tell you much -- to actually see proof of stake favoring bigger stakes, you need to run the selection many times and look at the overall pattern, the same way you'd flip a weighted coin a thousand times to notice it isn't fair rather than trusting a single flip. This project simulates an entire sequence of block proposals and tallies who got picked each round.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>simulate_rounds(stakes, rounds)</code>, which calls <code>select_validator(stakes)</code> once per round for <code>rounds</code> rounds, and returns a dict mapping each validator who won at least one round to how many rounds they won (a <code>collections.Counter</code> works well here, and can be converted to a plain dict with <code>dict(...)</code> at the end). Then, given <code>stakes</code> and a tally from 1000 rounds, find <code>most_selected</code>: the validator with the highest count in the tally.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">stakes = {"Alice": 500, "Bob": 300, "Carol": 200}<br>tally = simulate_rounds(stakes, 1000)</code></div>
  <div class="io-row"><span class="io-key">most_selected</span><code class="io-val">"Alice" -- Alice holds half the total stake, so across 1000 rounds she should win noticeably more often than Bob or Carol</code></div>
</div>`,
    hints: [
      "from collections import Counter",
      "tally = Counter(); for _ in range(rounds): tally[select_validator(stakes)] += 1",
      "return dict(tally)",
      "For most_selected, use max(tally, key=tally.get) to find the dict key with the highest value"
    ],
    starterCode: "import random\nfrom collections import Counter\n\ndef select_validator(stakes):\n    validators = list(stakes.keys())\n    weights = list(stakes.values())\n    return random.choices(validators, weights=weights, k=1)[0]\n\n\ndef simulate_rounds(stakes, rounds):\n    # Run select_validator 'rounds' times and tally the winners\n    pass\n\n\nstakes = {\"Alice\": 500, \"Bob\": 300, \"Carol\": 200}\ntally = simulate_rounds(stakes, 1000)\n# Find most_selected: the validator with the highest count in tally\n",
    solution: "import random\nfrom collections import Counter\n\ndef select_validator(stakes):\n    validators = list(stakes.keys())\n    weights = list(stakes.values())\n    return random.choices(validators, weights=weights, k=1)[0]\n\n\ndef simulate_rounds(stakes, rounds):\n    tally = Counter()\n    for _ in range(rounds):\n        winner = select_validator(stakes)\n        tally[winner] += 1\n    return dict(tally)\n\n\nstakes = {\"Alice\": 500, \"Bob\": 300, \"Carol\": 200}\ntally = simulate_rounds(stakes, 1000)\nmost_selected = max(tally, key=tally.get)",
    validation: {
      checks: [
        { type: "hasValidDef", name: "simulate_rounds", message: "Define simulate_rounds(stakes, rounds)." },
        { type: "matchesRegex", pattern: "most_selected\\s*=\\s*max\\s*\\(\\s*tally", message: "Find most_selected with max() over tally." },
        { type: "matchesRegex", pattern: "range\\s*\\(\\s*rounds\\s*\\)", message: "Loop 'rounds' times inside simulate_rounds." }
      ],
      pyTests: [
        { code: "assert sum(tally.values()) == 1000", message: "1000 rounds should produce exactly 1000 total wins across all validators." },
        { code: "assert most_selected == 'Alice'", message: "Alice holds the largest stake (500 of 1000 total), so she should win the most rounds." },
        { code: "assert set(tally.keys()) <= {'Alice', 'Bob', 'Carol'}", message: "Every winner in the tally should be one of the three staked validators." }
      ]
    },
    explanation: `<p>Run this simulation again with Carol's stake bumped up to something huge, and you'd watch <code>most_selected</code> flip to her -- the mechanism doesn't care about identity, only stake. That's both the appeal of proof of stake (no wasted energy, proportional to real economic commitment) and its most-discussed criticism: validators who already hold the most tend to get selected the most, which compounds their advantage over time in a way proof of work's brute-force competition doesn't.</p>`
  },
  {
    id: 215,
    title: "Byzantine Fault Tolerance Basics",
    difficulty: "medium",
    topic: "Byzantine Fault Tolerance",
    level: 5,
    xp: 30,
    instructions: `<p>Proof of work and proof of stake both answer the same question -- "who gets to propose the next block?" -- with a single winner chosen by competition or chance. There's a third family of consensus, used by systems like practical Byzantine Fault Tolerance (PBFT), that works completely differently: a known, fixed committee of nodes all <strong>vote</strong> on whether to accept a proposed block, and the block only commits if enough of them agree.</p>
<p>"Enough" here has a specific, deliberately chosen meaning: more than <strong>two-thirds</strong> of the committee, not just a plain majority. The reason for that particular threshold is what gives this family of consensus its name: some nodes might be faulty or actively malicious -- lying about what they saw, voting against a perfectly valid block, or voting inconsistently to different peers. The historical name for this scenario is the "Byzantine Generals Problem" (several generals surrounding a city need to agree on attack or retreat, but a messenger might be a traitor lying about the plan), and "Byzantine fault tolerant" just means a system that still reaches correct agreement even with some lying or faulty nodes mixed in. A two-thirds threshold, rather than a plain majority, is what makes that possible -- you'll see exactly why in the next project.</p>
<p>One implementation detail worth flagging now: never test a fraction like "more than two-thirds" using floating-point division (<code>accept_count / total_nodes > 2/3</code>) -- rounding errors can put a vote count right on the boundary on the wrong side. Cross-multiplying instead (<code>accept_count * 3 > total_nodes * 2</code>) gives the exact same comparison using only whole numbers, with no rounding risk at all.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>count_accepts(votes)</code>, which takes a list of vote strings (each either <code>"accept"</code> or <code>"reject"</code>) and returns how many are <code>"accept"</code>. Write <code>has_quorum(accept_count, total_nodes)</code>, which returns whether <code>accept_count</code> is strictly more than two-thirds of <code>total_nodes</code>, computed with whole-number cross-multiplication rather than division.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">votes = ["accept", "accept", "accept", "accept", "accept", "reject", "reject"]</code></div>
  <div class="io-row"><span class="io-key">accept_count</span><code class="io-val">5</code></div>
  <div class="io-row"><span class="io-key">block_accepted</span><code class="io-val">True -- 5 out of 7 clears the two-thirds bar</code></div>
</div>`,
    hints: [
      "votes.count(\"accept\") counts matching items in a list directly",
      "has_quorum should return accept_count * 3 > total_nodes * 2",
      "Don't write accept_count / total_nodes > 2/3 -- that's the floating-point version this challenge is asking you to avoid"
    ],
    starterCode: "def count_accepts(votes):\n    # Count how many entries in votes are \"accept\"\n    pass\n\n\ndef has_quorum(accept_count, total_nodes):\n    # Return whether accept_count is strictly more than two-thirds of total_nodes\n    pass\n\n\nvotes = [\"accept\", \"accept\", \"accept\", \"accept\", \"accept\", \"reject\", \"reject\"]\naccept_count = count_accepts(votes)\nblock_accepted = has_quorum(accept_count, len(votes))\n",
    solution: "def count_accepts(votes):\n    return votes.count(\"accept\")\n\n\ndef has_quorum(accept_count, total_nodes):\n    return accept_count * 3 > total_nodes * 2\n\n\nvotes = [\"accept\", \"accept\", \"accept\", \"accept\", \"accept\", \"reject\", \"reject\"]\naccept_count = count_accepts(votes)\nblock_accepted = has_quorum(accept_count, len(votes))",
    validation: {
      checks: [
        { type: "hasValidDef", name: "count_accepts", message: "Define count_accepts(votes)." },
        { type: "hasValidDef", name: "has_quorum", message: "Define has_quorum(accept_count, total_nodes)." },
        { type: "matchesRegex", pattern: "accept_count\\s*\\*\\s*3\\s*>\\s*total_nodes\\s*\\*\\s*2", message: "Use whole-number cross-multiplication: accept_count * 3 > total_nodes * 2." }
      ],
      pyTests: [
        { code: "assert accept_count == 5", message: "5 of the 7 votes in the example are 'accept'." },
        { code: "assert block_accepted == True", message: "5 out of 7 is more than two-thirds, so the block should be accepted." },
        { code: "assert has_quorum(4, 7) == False", message: "4 out of 7 is not more than two-thirds." },
        { code: "assert has_quorum(3, 4) == True", message: "3 out of 4 is more than two-thirds." },
        { code: "assert has_quorum(2, 4) == False", message: "2 out of 4 (exactly half) is not more than two-thirds." }
      ]
    },
    explanation: `<p><code>has_quorum(4, 7)</code> being <code>False</code> right next to <code>has_quorum(5, 7)</code> being <code>True</code> is the whole threshold living right on that boundary -- there's no partial credit at two-thirds, either a proposal clears it or it doesn't. The next project shows exactly why that specific line, and not a plain 50%-plus-one majority, is what protects the system from a minority of dishonest nodes.</p>`
  },
  {
    id: 216,
    title: "Guided Project: BFT Consensus",
    kind: "project",
    difficulty: "hard",
    topic: "Byzantine Fault Tolerance",
    level: 5,
    xp: 40,
    instructions: `<p>Here's the question the two-thirds threshold actually answers: how many dishonest nodes can a committee contain before it can no longer reliably agree on a genuinely valid block? Assume every honest node correctly votes <code>"accept"</code> for a valid block, while every Byzantine (faulty or malicious) node votes <code>"reject"</code> -- the worst-case sabotage, trying to block a block that should go through.</p>
<p>With <code>total_nodes</code> in the committee and <code>byzantine_count</code> of them faulty, exactly <code>total_nodes - byzantine_count</code> honest nodes will vote accept, and that's the entire accept count, since every Byzantine node is voting reject. Plug that into <code>has_quorum</code> from the last challenge, and you can find the exact tipping point: the largest number of Byzantine nodes a committee of a given size can tolerate before honest votes alone can no longer clear two-thirds.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>simulate_consensus(total_nodes, byzantine_count)</code>, which computes the honest count, treats it as the accept count (since only honest nodes vote accept in this worst case), and returns whether <code>has_quorum</code> is reached. Using a <code>committee_size</code> of <code>7</code>, run it once with <code>byzantine_count = 2</code> and once with <code>byzantine_count = 3</code>, storing the two results as <code>consensus_at_2</code> and <code>consensus_at_3</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">committee_size = 7</code></div>
  <div class="io-row"><span class="io-key">consensus_at_2</span><code class="io-val">True -- 5 honest votes out of 7 clears two-thirds</code></div>
  <div class="io-row"><span class="io-key">consensus_at_3</span><code class="io-val">False -- only 4 honest votes out of 7, just short</code></div>
</div>`,
    hints: [
      "honest_count = total_nodes - byzantine_count",
      "accept_count = honest_count",
      "return has_quorum(accept_count, total_nodes)",
      "committee_size = 7; consensus_at_2 = simulate_consensus(committee_size, 2); consensus_at_3 = simulate_consensus(committee_size, 3)"
    ],
    starterCode: "def has_quorum(accept_count, total_nodes):\n    return accept_count * 3 > total_nodes * 2\n\n\ndef simulate_consensus(total_nodes, byzantine_count):\n    # Honest nodes vote accept, Byzantine nodes vote reject -- does the block still reach quorum?\n    pass\n\n\ncommittee_size = 7\nconsensus_at_2 = simulate_consensus(committee_size, 2)\nconsensus_at_3 = simulate_consensus(committee_size, 3)\n",
    solution: "def has_quorum(accept_count, total_nodes):\n    return accept_count * 3 > total_nodes * 2\n\n\ndef simulate_consensus(total_nodes, byzantine_count):\n    honest_count = total_nodes - byzantine_count\n    accept_count = honest_count\n    return has_quorum(accept_count, total_nodes)\n\n\ncommittee_size = 7\nconsensus_at_2 = simulate_consensus(committee_size, 2)\nconsensus_at_3 = simulate_consensus(committee_size, 3)",
    validation: {
      checks: [
        { type: "hasValidDef", name: "simulate_consensus", message: "Define simulate_consensus(total_nodes, byzantine_count)." },
        { type: "matchesRegex", pattern: "honest_count\\s*=\\s*total_nodes\\s*-\\s*byzantine_count", message: "Compute honest_count as total_nodes minus byzantine_count." },
        { type: "matchesRegex", pattern: "has_quorum\\(", message: "Use has_quorum to decide the result." }
      ],
      pyTests: [
        { code: "assert consensus_at_2 == True", message: "With 2 Byzantine nodes out of 7, the 5 honest votes should still reach quorum." },
        { code: "assert consensus_at_3 == False", message: "With 3 Byzantine nodes out of 7, only 4 honest votes remain -- not enough to reach quorum." },
        { code: "assert simulate_consensus(4, 1) == True", message: "A smaller committee of 4 should tolerate 1 Byzantine node (3 honest votes clears quorum)." },
        { code: "assert simulate_consensus(4, 2) == False", message: "The same committee of 4 should not tolerate 2 Byzantine nodes (only 2 honest votes, exactly half)." }
      ]
    },
    explanation: `<p>Notice how narrowly <code>consensus_at_2</code> passes: 5 votes against a threshold of "more than 4.67." One more Byzantine node and it flips to <code>False</code>. That's not a coincidence -- it's the classical Byzantine fault tolerance result that a committee of size <code>3f + 1</code> can tolerate exactly <code>f</code> faulty nodes and no more, which is why real BFT systems are so specific about committee sizing: 7 nodes doesn't just happen to tolerate 2 faults, it's built to tolerate exactly 2 and not 3. Compare this to proof of work and proof of stake, which you've already built -- those defend against dishonesty by making cheating expensive (wasted computation) or costly (staked coins at risk); this family defends by requiring an honest supermajority to physically outvote any dishonest minority, which only works as long as that minority stays under a third.</p>`
  },
  {
    id: 217,
    title: "UTXO Model",
    difficulty: "medium",
    topic: "UTXO Model",
    level: 5,
    xp: 25,
    instructions: `<p>Every balance you've worked with so far has lived in one place -- <code>balances["Alice"]</code>, a single number that goes up or down. That's the account-based model, and it's how Ethereum works. Bitcoin works completely differently, using something called the <strong>UTXO model</strong> (Unspent Transaction Output), and the difference is worth understanding on its own before you build with it: there is no <code>balances</code> dictionary anywhere. Nobody's balance is stored as a single number at all.</p>
<p>Instead, the ledger tracks a big pile of individual "coins" called <strong>UTXOs</strong> -- unspent outputs, each one owned by exactly one address and worth some fixed amount, sitting there until someone spends it. Think of it like a wallet full of physical bills and coins rather than a bank balance: you might be holding a $50 bill and a $30 bill, and asking "how much do I have?" means adding up everything in your wallet, not reading a single stored number. Alice having two UTXOs worth 50 and 30 means her "balance" -- which isn't stored anywhere, only computed on demand -- is 80, found by summing every UTXO that lists her as the owner.</p>
<span class="task-label">Your Task</span>
<p class="task-line">A UTXO set is a dict mapping a unique ID to a UTXO -- each UTXO itself a dict with <code>"owner"</code> and <code>"amount"</code>. Write <code>get_balance(utxo_set, owner)</code>, which returns the sum of <code>"amount"</code> across every UTXO in <code>utxo_set</code> owned by <code>owner</code> (0 if they own none).</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">utxo_set = {"tx0-0": {"owner": "Alice", "amount": 50}, "tx0-1": {"owner": "Alice", "amount": 30}, "tx0-2": {"owner": "Bob", "amount": 20}}</code></div>
  <div class="io-row"><span class="io-key">get_balance(utxo_set, "Alice")</span><code class="io-val">80</code></div>
  <div class="io-row"><span class="io-key">get_balance(utxo_set, "Carol")</span><code class="io-val">0</code></div>
</div>`,
    hints: [
      "utxo_set.values() gives you the individual UTXO dicts, without their IDs",
      "A generator expression works well here: utxo[\"amount\"] for utxo in utxo_set.values() if utxo[\"owner\"] == owner",
      "sum(...) over that generator gives the total, or 0 for an empty result"
    ],
    starterCode: "def get_balance(utxo_set, owner):\n    # Sum the amount of every UTXO owned by 'owner'\n    pass\n\n\nutxo_set = {\n    \"tx0-0\": {\"owner\": \"Alice\", \"amount\": 50},\n    \"tx0-1\": {\"owner\": \"Alice\", \"amount\": 30},\n    \"tx0-2\": {\"owner\": \"Bob\", \"amount\": 20},\n}\n\nalice_balance = get_balance(utxo_set, \"Alice\")\nbob_balance = get_balance(utxo_set, \"Bob\")\ncarol_balance = get_balance(utxo_set, \"Carol\")\n",
    solution: "def get_balance(utxo_set, owner):\n    return sum(utxo[\"amount\"] for utxo in utxo_set.values() if utxo[\"owner\"] == owner)\n\n\nutxo_set = {\n    \"tx0-0\": {\"owner\": \"Alice\", \"amount\": 50},\n    \"tx0-1\": {\"owner\": \"Alice\", \"amount\": 30},\n    \"tx0-2\": {\"owner\": \"Bob\", \"amount\": 20},\n}\n\nalice_balance = get_balance(utxo_set, \"Alice\")\nbob_balance = get_balance(utxo_set, \"Bob\")\ncarol_balance = get_balance(utxo_set, \"Carol\")",
    validation: {
      checks: [
        { type: "hasValidDef", name: "get_balance", message: "Define get_balance(utxo_set, owner)." },
        { type: "matchesRegex", pattern: "utxo_set\\.values\\(\\)", message: "Iterate over utxo_set.values() to reach the individual UTXOs." },
        { type: "matchesRegex", pattern: "\\[\\s*[\"']owner[\"']\\s*\\]\\s*==\\s*owner", message: "Filter UTXOs by comparing [\"owner\"] to the owner parameter." }
      ],
      pyTests: [
        { code: "assert alice_balance == 80", message: "Alice's two UTXOs (50 + 30) should sum to 80." },
        { code: "assert bob_balance == 20", message: "Bob's single UTXO should give a balance of 20." },
        { code: "assert carol_balance == 0", message: "Carol owns no UTXOs, so her balance should be 0." }
      ]
    },
    explanation: `<p>This "sum up everything I own" pattern is the entire reason the model is called UTXO -- there's genuinely nothing to update when you check a balance, only something to add up. The real complexity shows up on the spending side: unlike an account balance, which you can decrement by any amount, a UTXO has to be spent as a whole unit. The next project shows what that actually requires.</p>`
  },
  {
    id: 218,
    title: "Guided Project: UTXO Transaction",
    kind: "project",
    difficulty: "hard",
    topic: "UTXO Model",
    level: 5,
    xp: 40,
    instructions: `<p>Here's the catch the account model never had to deal with: you can't spend "part of" a UTXO. If Alice's only UTXO is worth 50 and she wants to send Bob 40, she can't hand over just a slice of it -- she has to consume the <em>entire</em> 50-coin UTXO as an input, send 40 of it to Bob as a new output, and get the leftover 10 back as a new UTXO of her own, called <strong>change</strong> (the same way paying for a $6 coffee with a $10 bill gets you $4 back, rather than the bill somehow becoming worth exactly $6). If one UTXO isn't enough to cover the amount, multiple UTXOs get consumed together as inputs until their combined total covers it.</p>
<p>So a UTXO transaction always follows the same shape: pick existing UTXOs belonging to the sender that add up to at least the amount needed, delete all of them from the UTXO set (they're now spent, gone for good), then create one new UTXO for the recipient and -- if the inputs added up to more than the amount -- one more new UTXO back to the sender for the change.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>select_utxos(utxo_set, owner, amount)</code>, which walks <code>owner</code>'s UTXOs and keeps collecting them (tracking a running total) until that total meets or exceeds <code>amount</code>, returning <code>(selected_ids, total)</code> -- the list of UTXO IDs collected, and their combined value (which may be less than <code>amount</code> if the owner didn't have enough). Then write <code>spend_utxos(utxo_set, owner, recipient, amount, next_id)</code>: use <code>select_utxos</code> to gather inputs; if the total is less than <code>amount</code>, leave <code>utxo_set</code> untouched and return <code>False</code>; otherwise delete every selected input from <code>utxo_set</code>, add a new UTXO for <code>recipient</code> worth <code>amount</code> at key <code>f"{next_id}-0"</code>, add a change UTXO back to <code>owner</code> at key <code>f"{next_id}-1"</code> if there's any leftover, and return <code>True</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">Alice owns UTXOs worth 50 and 30; spend_utxos(utxo_set, "Alice", "Bob", 40, "tx1")</code></div>
  <div class="io-row"><span class="io-key">Returns</span><code class="io-val">True</code></div>
  <div class="io-row"><span class="io-key">Effect</span><code class="io-val">the 50-coin UTXO is consumed; Bob gets a new 40-coin UTXO; Alice gets a new 10-coin change UTXO (her other 30-coin UTXO is untouched)</code></div>
</div>`,
    hints: [
      "In select_utxos, loop with utxo_set.items() so you have both the id and the UTXO dict; check utxo[\"owner\"] == owner",
      "Append matching ids to selected, add to total, and break as soon as total >= amount",
      "In spend_utxos, call selected, total = select_utxos(utxo_set, owner, amount) first",
      "If total < amount: return False before changing anything",
      "del utxo_set[utxo_id] for each id in selected, then add the two new entries; change = total - amount, only add the change UTXO if change > 0"
    ],
    starterCode: "def select_utxos(utxo_set, owner, amount):\n    # Collect owner's UTXOs until their total covers amount\n    pass\n\n\ndef spend_utxos(utxo_set, owner, recipient, amount, next_id):\n    # Select inputs, remove them, create recipient + change outputs\n    pass\n\n\nutxo_set = {\n    \"tx0-0\": {\"owner\": \"Alice\", \"amount\": 50},\n    \"tx0-1\": {\"owner\": \"Alice\", \"amount\": 30},\n    \"tx0-2\": {\"owner\": \"Bob\", \"amount\": 20},\n}\n\nresult1 = spend_utxos(utxo_set, \"Alice\", \"Bob\", 40, \"tx1\")\nresult2 = spend_utxos(utxo_set, \"Bob\", \"Alice\", 1000, \"tx2\")\n",
    solution: "def select_utxos(utxo_set, owner, amount):\n    selected = []\n    total = 0\n    for utxo_id, utxo in utxo_set.items():\n        if utxo[\"owner\"] == owner:\n            selected.append(utxo_id)\n            total += utxo[\"amount\"]\n            if total >= amount:\n                break\n    return selected, total\n\n\ndef spend_utxos(utxo_set, owner, recipient, amount, next_id):\n    selected, total = select_utxos(utxo_set, owner, amount)\n    if total < amount:\n        return False\n    for utxo_id in selected:\n        del utxo_set[utxo_id]\n    utxo_set[f\"{next_id}-0\"] = {\"owner\": recipient, \"amount\": amount}\n    change = total - amount\n    if change > 0:\n        utxo_set[f\"{next_id}-1\"] = {\"owner\": owner, \"amount\": change}\n    return True\n\n\nutxo_set = {\n    \"tx0-0\": {\"owner\": \"Alice\", \"amount\": 50},\n    \"tx0-1\": {\"owner\": \"Alice\", \"amount\": 30},\n    \"tx0-2\": {\"owner\": \"Bob\", \"amount\": 20},\n}\n\nresult1 = spend_utxos(utxo_set, \"Alice\", \"Bob\", 40, \"tx1\")\nresult2 = spend_utxos(utxo_set, \"Bob\", \"Alice\", 1000, \"tx2\")",
    validation: {
      checks: [
        { type: "hasValidDef", name: "select_utxos", message: "Define select_utxos(utxo_set, owner, amount)." },
        { type: "hasValidDef", name: "spend_utxos", message: "Define spend_utxos(utxo_set, owner, recipient, amount, next_id)." },
        { type: "matchesRegex", pattern: "del\\s+utxo_set\\[", message: "Delete each spent input from utxo_set." },
        { type: "matchesRegex", pattern: "change\\s*=\\s*total\\s*-\\s*amount", message: "Compute change as total minus amount." }
      ],
      pyTests: [
        { code: "assert result1 == True", message: "Alice has enough (50+30) to cover 40, so this should succeed." },
        { code: "assert result2 == False", message: "Bob doesn't have 1000, so this should fail and leave the ledger untouched." },
        { code: "assert 'tx0-0' not in utxo_set", message: "Alice's 50-coin UTXO should have been fully consumed as an input." },
        { code: "def get_balance(utxo_set, owner):\n    return sum(u['amount'] for u in utxo_set.values() if u['owner'] == owner)\nassert get_balance(utxo_set, 'Alice') == 40", message: "Alice should end up with 40 total: her untouched 30-coin UTXO plus 10 in change." },
        { code: "def get_balance(utxo_set, owner):\n    return sum(u['amount'] for u in utxo_set.values() if u['owner'] == owner)\nassert get_balance(utxo_set, 'Bob') == 60", message: "Bob should end up with 60 total: his original 20 plus the new 40-coin UTXO from Alice." },
        { code: "assert len(utxo_set) == 4", message: "After one successful spend, the set should have 4 UTXOs: Alice's untouched 30, Bob's untouched 20, Bob's new 40, and Alice's 10 change." }
      ]
    },
    explanation: `<p>Compare this to <code>apply_transaction</code> from the account-state challenges: that was a single subtraction and a single addition on one dict. This took an entire input-selection step, a delete-everything-selected step, and up to two brand-new entries -- meaningfully more bookkeeping for the same basic "send money" operation. That's the real tradeoff between the two models: UTXO transactions are self-contained and easy to verify in isolation (everything a transaction needs is right there in its inputs), while account-based transactions are simpler to reason about but depend on a shared, constantly-mutating balance table. Neither model is strictly better; they're different answers to the same problem, and real systems have picked both.</p>`
  },
  {
    id: 219,
    title: "Guided Project: Mini Blockchain",
    kind: "project",
    difficulty: "hard",
    topic: "Capstone",
    level: 5,
    xp: 50,
    instructions: `<p>Every piece of a real block, built separately across this level, is given to you below exactly as you already wrote it: <code>sign_transaction</code> / <code>verify_signature</code>, <code>apply_transaction</code>, <code>process_ledger</code>, and <code>compute_merkle_root</code>, plus <code>compute_hash</code> / <code>mine_block_hash</code> (the same proof-of-work search from before, just renamed slightly since this block hashes a Merkle root instead of a single data string). Nothing new to learn here -- the only new work is wiring them together in the right order, which is exactly what building a real block requires.</p>
<p>The order matters: a block can only be mined once you know exactly which transactions belong in it, and you only know that once you've checked which ones are actually valid. So: verify and apply transactions first (only the valid ones actually happened), summarize the accepted ones into a Merkle root (so the block has one fingerprint for its whole batch), then mine -- searching for a nonce that makes the block's hash meet the difficulty target, the same way you mined a block back in the proof-of-work challenges, just hashing the Merkle root instead of a plain data string this time.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>build_block(index, timestamp, transactions, previous_hash, difficulty, balances, account_keys)</code>. First, run <code>transactions</code> through <code>process_ledger</code> (which verifies signatures and applies valid transfers to <code>balances</code> in place) and keep only the ones marked <code>"accepted"</code>. Turn each accepted transaction into a string with the given <code>transaction_to_string</code> helper, and pass that list to <code>compute_merkle_root</code>. Mine the block with <code>mine_block_hash(index, timestamp, merkle_root, previous_hash, difficulty)</code> to get a <code>(nonce, hash)</code> pair. Return a dict with keys <code>"index"</code>, <code>"timestamp"</code>, <code>"transactions"</code> (the accepted list), <code>"merkle_root"</code>, <code>"previous_hash"</code>, <code>"nonce"</code>, and <code>"hash"</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">2 transactions: Alice sends Bob 30 (valid), Bob tries to send Alice 1000 (insufficient funds)</code></div>
  <div class="io-row"><span class="io-key">block["transactions"]</span><code class="io-val">only the Alice → Bob transaction</code></div>
  <div class="io-row"><span class="io-key">block["hash"]</span><code class="io-val">starts with "000" at difficulty 3</code></div>
</div>`,
    hints: [
      "results = process_ledger(balances, account_keys, transactions)",
      "accepted = [tx for tx, result in zip(transactions, results) if result == \"accepted\"]",
      "tx_strings = [transaction_to_string(tx) for tx in accepted]",
      "merkle_root = compute_merkle_root(tx_strings)",
      "nonce, block_hash = mine_block_hash(index, timestamp, merkle_root, previous_hash, difficulty)",
      "Return a dict literal with all 7 keys listed in the task"
    ],
    starterCode: "import hashlib\nimport hmac\n\n\ndef sign_transaction(sender, recipient, amount, private_key):\n    message = f\"{sender}{recipient}{amount}\"\n    return hmac.new(private_key.encode(), message.encode(), hashlib.sha256).hexdigest()\n\n\ndef verify_signature(sender, recipient, amount, signature, private_key):\n    expected = sign_transaction(sender, recipient, amount, private_key)\n    return hmac.compare_digest(expected, signature)\n\n\ndef apply_transaction(balances, sender, recipient, amount):\n    if amount <= 0:\n        return False\n    if balances.get(sender, 0) < amount:\n        return False\n    balances[sender] -= amount\n    balances[recipient] = balances.get(recipient, 0) + amount\n    return True\n\n\ndef process_ledger(balances, account_keys, transactions):\n    results = []\n    for tx in transactions:\n        sender = tx[\"sender\"]\n        recipient = tx[\"recipient\"]\n        amount = tx[\"amount\"]\n        signature = tx[\"signature\"]\n        key = account_keys.get(sender, \"\")\n        if not verify_signature(sender, recipient, amount, signature, key):\n            results.append(\"rejected: bad signature\")\n            continue\n        if not apply_transaction(balances, sender, recipient, amount):\n            results.append(\"rejected: insufficient funds\")\n            continue\n        results.append(\"accepted\")\n    return results\n\n\ndef compute_merkle_root(transactions):\n    hashes = [hashlib.sha256(t.encode()).hexdigest() for t in transactions]\n    if not hashes:\n        return \"0\" * 64\n    while len(hashes) > 1:\n        if len(hashes) % 2 == 1:\n            hashes.append(hashes[-1])\n        next_level = []\n        for i in range(0, len(hashes), 2):\n            combined = hashes[i] + hashes[i + 1]\n            next_level.append(hashlib.sha256(combined.encode()).hexdigest())\n        hashes = next_level\n    return hashes[0]\n\n\ndef compute_hash(index, timestamp, merkle_root, previous_hash, nonce):\n    contents = f\"{index}{timestamp}{merkle_root}{previous_hash}{nonce}\"\n    return hashlib.sha256(contents.encode()).hexdigest()\n\n\ndef mine_block_hash(index, timestamp, merkle_root, previous_hash, difficulty):\n    nonce = 0\n    target = \"0\" * difficulty\n    while True:\n        hash_attempt = compute_hash(index, timestamp, merkle_root, previous_hash, nonce)\n        if hash_attempt.startswith(target):\n            return nonce, hash_attempt\n        nonce += 1\n\n\ndef transaction_to_string(tx):\n    return f\"{tx['sender']}{tx['recipient']}{tx['amount']}\"\n\n\ndef build_block(index, timestamp, transactions, previous_hash, difficulty, balances, account_keys):\n    # Filter to accepted transactions, compute the Merkle root, mine the block, return the result\n    pass\n\n\naccount_keys = {\"Alice\": \"alice-secret\", \"Bob\": \"bob-secret\"}\nbalances = {\"Alice\": 100, \"Bob\": 50}\n\ntransactions = [\n    {\"sender\": \"Alice\", \"recipient\": \"Bob\", \"amount\": 30,\n     \"signature\": sign_transaction(\"Alice\", \"Bob\", 30, \"alice-secret\")},\n    {\"sender\": \"Bob\", \"recipient\": \"Alice\", \"amount\": 1000,\n     \"signature\": sign_transaction(\"Bob\", \"Alice\", 1000, \"bob-secret\")},\n]\n\nblock = build_block(0, \"2026-01-01T00:00:00\", transactions, \"0\" * 64, 3, balances, account_keys)\n",
    solution: "import hashlib\nimport hmac\n\n\ndef sign_transaction(sender, recipient, amount, private_key):\n    message = f\"{sender}{recipient}{amount}\"\n    return hmac.new(private_key.encode(), message.encode(), hashlib.sha256).hexdigest()\n\n\ndef verify_signature(sender, recipient, amount, signature, private_key):\n    expected = sign_transaction(sender, recipient, amount, private_key)\n    return hmac.compare_digest(expected, signature)\n\n\ndef apply_transaction(balances, sender, recipient, amount):\n    if amount <= 0:\n        return False\n    if balances.get(sender, 0) < amount:\n        return False\n    balances[sender] -= amount\n    balances[recipient] = balances.get(recipient, 0) + amount\n    return True\n\n\ndef process_ledger(balances, account_keys, transactions):\n    results = []\n    for tx in transactions:\n        sender = tx[\"sender\"]\n        recipient = tx[\"recipient\"]\n        amount = tx[\"amount\"]\n        signature = tx[\"signature\"]\n        key = account_keys.get(sender, \"\")\n        if not verify_signature(sender, recipient, amount, signature, key):\n            results.append(\"rejected: bad signature\")\n            continue\n        if not apply_transaction(balances, sender, recipient, amount):\n            results.append(\"rejected: insufficient funds\")\n            continue\n        results.append(\"accepted\")\n    return results\n\n\ndef compute_merkle_root(transactions):\n    hashes = [hashlib.sha256(t.encode()).hexdigest() for t in transactions]\n    if not hashes:\n        return \"0\" * 64\n    while len(hashes) > 1:\n        if len(hashes) % 2 == 1:\n            hashes.append(hashes[-1])\n        next_level = []\n        for i in range(0, len(hashes), 2):\n            combined = hashes[i] + hashes[i + 1]\n            next_level.append(hashlib.sha256(combined.encode()).hexdigest())\n        hashes = next_level\n    return hashes[0]\n\n\ndef compute_hash(index, timestamp, merkle_root, previous_hash, nonce):\n    contents = f\"{index}{timestamp}{merkle_root}{previous_hash}{nonce}\"\n    return hashlib.sha256(contents.encode()).hexdigest()\n\n\ndef mine_block_hash(index, timestamp, merkle_root, previous_hash, difficulty):\n    nonce = 0\n    target = \"0\" * difficulty\n    while True:\n        hash_attempt = compute_hash(index, timestamp, merkle_root, previous_hash, nonce)\n        if hash_attempt.startswith(target):\n            return nonce, hash_attempt\n        nonce += 1\n\n\ndef transaction_to_string(tx):\n    return f\"{tx['sender']}{tx['recipient']}{tx['amount']}\"\n\n\ndef build_block(index, timestamp, transactions, previous_hash, difficulty, balances, account_keys):\n    results = process_ledger(balances, account_keys, transactions)\n    accepted = [tx for tx, result in zip(transactions, results) if result == \"accepted\"]\n\n    tx_strings = [transaction_to_string(tx) for tx in accepted]\n    merkle_root = compute_merkle_root(tx_strings)\n\n    nonce, block_hash = mine_block_hash(index, timestamp, merkle_root, previous_hash, difficulty)\n\n    return {\n        \"index\": index,\n        \"timestamp\": timestamp,\n        \"transactions\": accepted,\n        \"merkle_root\": merkle_root,\n        \"previous_hash\": previous_hash,\n        \"nonce\": nonce,\n        \"hash\": block_hash,\n    }\n\n\naccount_keys = {\"Alice\": \"alice-secret\", \"Bob\": \"bob-secret\"}\nbalances = {\"Alice\": 100, \"Bob\": 50}\n\ntransactions = [\n    {\"sender\": \"Alice\", \"recipient\": \"Bob\", \"amount\": 30,\n     \"signature\": sign_transaction(\"Alice\", \"Bob\", 30, \"alice-secret\")},\n    {\"sender\": \"Bob\", \"recipient\": \"Alice\", \"amount\": 1000,\n     \"signature\": sign_transaction(\"Bob\", \"Alice\", 1000, \"bob-secret\")},\n]\n\nblock = build_block(0, \"2026-01-01T00:00:00\", transactions, \"0\" * 64, 3, balances, account_keys)",
    validation: {
      checks: [
        { type: "hasValidDef", name: "build_block", message: "Define build_block(index, timestamp, transactions, previous_hash, difficulty, balances, account_keys)." },
        { type: "matchesRegex", pattern: "process_ledger\\(", message: "Filter transactions using process_ledger before mining." },
        { type: "matchesRegex", pattern: "compute_merkle_root\\(", message: "Summarize the accepted transactions with compute_merkle_root." },
        { type: "matchesRegex", pattern: "mine_block_hash\\(", message: "Mine the block with mine_block_hash." }
      ],
      pyTests: [
        { code: "assert len(block['transactions']) == 1", message: "Only the valid Alice-to-Bob transaction should end up in the block." },
        { code: "assert block['transactions'][0]['sender'] == 'Alice'", message: "The one accepted transaction should be Alice's." },
        { code: "assert block['hash'].startswith('000')", message: "The block's hash should satisfy difficulty 3 (start with 3 zeros)." },
        { code: "assert balances == {'Alice': 70, 'Bob': 80}", message: "Only the accepted transaction should have changed the balances." },
        { code: "assert block['merkle_root'] == compute_merkle_root([transaction_to_string(block['transactions'][0])])", message: "The stored merkle_root should match recomputing it from the block's own accepted transactions." }
      ]
    },
    explanation: `<p>Trace what just happened: an unsigned or forged transaction never had a chance (that's the signature layer), an overdraft never had a chance either (that's the balance layer), and the transaction that survived both checks got folded into a Merkle root and sealed behind real proof-of-work effort -- three completely different lines of defense, each one you built and understood separately, now working together the way they do in every real chain. That's the whole point of a blockchain's design: no single mechanism does everything: hashing gives tamper-evidence, Merkle trees give efficient batch verification, proof of work (or stake, or BFT voting) gives sequencing that's expensive to fake, and signed account state gives authorized transfers. You've now built a working, if tiny, version of every one of those pieces.</p>`
  }
];
