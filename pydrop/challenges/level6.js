window.LEVEL6 = [
  {
    id: 226,
    title: "Welcome to Level 6: Applied Python for Blockchain",
    kind: "intro",
    topic: "Introduction",
    level: 6,
    instructions: `<p>Level 4 taught you to build a web service. Level 5 taught you how a blockchain works underneath. This level puts the two together: you take the from-scratch chain from Level 5 and make it real. Signatures backed by real asymmetric cryptography instead of the HMAC stand-in, wallets that derive an address and sign transactions, an event-sourced ledger, a database behind it, and nodes that broadcast blocks and resolve competing chains over HTTP. There's also enough Web3 vocabulary, the EVM, Vyper, and web3.py, to read an existing project instead of starting from zero.</p>
<p>Some of this can't run inside this browser sandbox the way earlier challenges do: PyNaCl, a real database, a real running node, none of those exist in here. Those challenges are checked on the shape of the code you write, not by running it, and the instructions say so where it applies. The plan is: write it here, understand exactly what it does, then run it for real in your own VS Code. By the end, you'll have built a small blockchain from scratch, given it real wallets and signed transactions, wrapped a REST API around it, and run a couple of nodes locally to watch them stay in sync.</p>`,
    starterCode: ""
  },
  {
    id: 233,
    title: "Salting and Pseudonymizing Data",
    difficulty: "medium",
    topic: "Applied Cryptography",
    level: 6,
    xp: 15,
    instructions: `<p>Level 5 covered hashing's core property: same input, same output, always. That's a problem when you're hashing something guessable, like an email address. Anyone can hash every common email and check for a match. A <strong>salt</strong>, a random value mixed in before hashing, breaks that: the same email hashes to something completely different for every user.</p>
<ul>
  <li><strong>Pseudonymization:</strong> replacing an identifying value (like an email) with a token that isn't reversible, so the data is still usable for matching without exposing what it originally was.</li>
</ul>
<p class="blueprint-line"><code>hashlib.sha256((salt + value).encode()).hexdigest()</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>import hashlib, secrets

salt = secrets.token_hex(8)
token = hashlib.sha256((salt + "alice@example.com").encode()).hexdigest()
print(token)  # a different token every time, even for the same email</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>pseudonymize(value, salt)</code>, which returns the SHA-256 hex digest of <code>salt + value</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">pseudonymize("alice@example.com", "abc123")</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">a 64-character hex string</code></div>
</div>`,
    hints: [
      "import hashlib",
      "def pseudonymize(value, salt):",
      "    return hashlib.sha256((salt + value).encode()).hexdigest()"
    ],
    starterCode: "import hashlib\n\ndef pseudonymize(value, salt):\n    # Return the SHA-256 hex digest of salt + value\n    pass\n",
    solution: 'import hashlib\n\ndef pseudonymize(value, salt):\n    return hashlib.sha256((salt + value).encode()).hexdigest()',
    validation: {
      checks: [
        { type: "hasValidDef", name: "pseudonymize", message: "Define pseudonymize(value, salt)." },
        { type: "matchesRegex", pattern: "hashlib\\.sha256\\(", message: "Use hashlib.sha256() to hash the salted value." }
      ],
      pyTests: [
        { code: "assert pseudonymize('alice@example.com', 'abc123') == hashlib.sha256('abc123alice@example.com'.encode()).hexdigest()", message: "pseudonymize should hash salt + value with SHA-256." },
        { code: "assert pseudonymize('x', 'a') != pseudonymize('x', 'b')", message: "Different salts should produce different tokens for the same value." }
      ]
    },
    explanation: `<p>This is pure standard-library Python (<code>hashlib</code>), so unlike most of this level, it runs and is graded for real. The salt has to be stored somewhere alongside the token. Without it, you couldn't recompute the same token to check a match later.</p>`
  },
  {
    id: 234,
    title: "Real Digital Signatures",
    difficulty: "hard",
    topic: "Applied Cryptography",
    level: 6,
    xp: 25,
    instructions: `<p>Level 5's "Signing Transactions" challenge used <code>hmac</code> as a stand-in for real signatures, and said outright that real systems use <strong>asymmetric cryptography</strong> instead: a private key that only you hold, and a matching public key anyone can use to verify what you signed, without ever needing your private key. It's the same idea as a wax seal on a letter, only you own the stamp that presses it, but anyone who has seen your seal before can check a new letter against it without being able to press a convincing fake themselves. This challenge is the real thing, using <code>PyNaCl</code>, a well-established Python cryptography library.</p>
<ul>
  <li><strong>Asymmetric:</strong> signing and verifying use two different keys (private to sign, public to verify), unlike HMAC's stand-in, which used the same shared secret for both.</li>
</ul>
<p class="blueprint-line"><code>SigningKey.generate()</code> &nbsp;/&nbsp; <code>signing_key.sign(message)</code> &nbsp;/&nbsp; <code>verify_key.verify(signed)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>from nacl.signing import SigningKey

signing_key = SigningKey.generate()
verify_key = signing_key.verify_key

signed = signing_key.sign(b"transfer 10 coins")
verify_key.verify(signed)  # returns the message if valid, raises BadSignatureError if not</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Run this for real locally (<code>pip install pynacl</code>) to see a tampered signature actually raise <code>BadSignatureError</code>.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Generate a signing key named <code>signing_key</code> and its verify key named <code>verify_key</code>. Sign the bytes <code>b"transfer 10 coins"</code> into a variable named <code>signed</code>. Then verify it, storing the result in <code>verified</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">signed</span><code class="io-val">a SignedMessage (signature + original bytes)</code></div>
  <div class="io-row"><span class="io-key">verified</span><code class="io-val">b"transfer 10 coins"</code></div>
</div>`,
    hints: [
      "from nacl.signing import SigningKey",
      "signing_key = SigningKey.generate()",
      "verify_key = signing_key.verify_key",
      "signed = signing_key.sign(b\"transfer 10 coins\")",
      "verified = verify_key.verify(signed)"
    ],
    starterCode: "# Generate keys, sign a message, and verify it\n",
    solution: 'from nacl.signing import SigningKey\n\nsigning_key = SigningKey.generate()\nverify_key = signing_key.verify_key\nsigned = signing_key.sign(b"transfer 10 coins")\nverified = verify_key.verify(signed)',
    validation: {
      checks: [
        { type: "hasImport", module: "nacl.signing", message: "Import SigningKey from nacl.signing." },
        { type: "codeContains", value: "SigningKey.generate()", message: "Generate a signing key with SigningKey.generate()." },
        { type: "matchesRegex", pattern: "\\.verify_key\\b", message: "Derive verify_key from the signing key." },
        { type: "matchesRegex", pattern: "signing_key\\.sign\\(", message: "Sign the message with signing_key.sign()." },
        { type: "matchesRegex", pattern: "verify_key\\.verify\\(", message: "Verify the signed message with verify_key.verify()." }
      ]
    },
    explanation: `<p>Every real blockchain wallet works this way: your private key never leaves your machine, and anyone can confirm a transaction is genuinely yours using only your public key. If <code>signed</code> gets altered by even one byte, <code>verify()</code> raises an exception instead of silently accepting it.</p>`
  },
  {
    id: 245,
    title: "Wallet: Deriving an Address",
    difficulty: "medium",
    topic: "Wallets",
    level: 6,
    xp: 20,
    instructions: `<p>The last challenge generated a key pair on its own. A real <strong>wallet</strong> wraps that key pair into something usable: it holds the keys, and it exposes an <strong>address</strong>, a short public identifier derived from the public key that other people can send value to, safe to share since it never reveals the private key.</p>
<ul>
  <li><strong>Address:</strong> a hash of the public key, not something separately chosen or stored. Generate the same key pair twice and you'd get the same address both times.</li>
</ul>
<p class="blueprint-line"><code>class Wallet:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;signing_key, verify_key, address</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>class Wallet:
    def __init__(self):
        self.signing_key = SigningKey.generate()
        self.verify_key = self.signing_key.verify_key
        self.address = hashlib.sha256(bytes(self.verify_key)).hexdigest()[:16]</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Real wallets derive an address this way too: Ethereum's is the last 20 bytes of a hash of the public key, Algorand's is a base32 encoding of it plus a checksum. The exact hash differs by chain; the "address is a deterministic function of the public key" idea doesn't.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Write a <code>Wallet</code> class. <code>__init__</code> should generate <code>self.signing_key</code> and <code>self.verify_key</code> (same as the last challenge), then set <code>self.address</code> to the first 16 characters of the SHA-256 hex digest of <code>bytes(self.verify_key)</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">wallet = Wallet()</span><code class="io-val">wallet.address is a 16-character hex string</code></div>
</div>`,
    hints: [
      "from nacl.signing import SigningKey",
      "import hashlib",
      "class Wallet:",
      "    def __init__(self):",
      "        self.signing_key = SigningKey.generate()",
      "        self.verify_key = self.signing_key.verify_key",
      "        self.address = hashlib.sha256(bytes(self.verify_key)).hexdigest()[:16]"
    ],
    starterCode: "# Define the Wallet class\n",
    solution: "from nacl.signing import SigningKey\nimport hashlib\n\nclass Wallet:\n    def __init__(self):\n        self.signing_key = SigningKey.generate()\n        self.verify_key = self.signing_key.verify_key\n        self.address = hashlib.sha256(bytes(self.verify_key)).hexdigest()[:16]",
    validation: {
      checks: [
        { type: "hasImport", module: "nacl.signing", message: "Import SigningKey from nacl.signing." },
        { type: "hasClass", name: "Wallet", message: "Define a class named Wallet." },
        { type: "codeContains", value: "SigningKey.generate()", message: "Generate a signing key inside __init__." },
        { type: "matchesRegex", pattern: "self\\.address\\s*=.*hashlib\\.sha256\\(\\s*bytes\\(\\s*self\\.verify_key\\s*\\)", message: "Set self.address from hashlib.sha256(bytes(self.verify_key))." }
      ]
    },
    explanation: `<p>Truncating the hash to 16 characters is a simplification for this challenge; real chains use the full hash or a fixed-length encoding of it. The important part is that the address comes entirely from the public key. Anyone who knows your address can send to it, but nobody can derive your private key from it.</p>`
  },
  {
    id: 246,
    title: "Wallet: Signing a Transaction",
    difficulty: "hard",
    topic: "Wallets",
    level: 6,
    xp: 25,
    instructions: `<p>A wallet's whole job is signing transactions on your behalf. Instead of signing an arbitrary message like the last two challenges did, a real transaction bundles the sender, recipient, and amount into one message, signs that, and hands back everything a stranger would need to verify it: the transaction itself, the signature, and the public key to check it against.</p>
<ul>
  <li><strong>Detached signature:</strong> storing the signature separately from the transaction, instead of one combined blob, so a verifier can rebuild the exact same message and check the signature against it explicitly.</li>
</ul>
<p class="blueprint-line"><code>wallet.sign_transaction(recipient, amount) -> {"sender", "recipient", "amount", "signature", "verify_key"}</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>message = f"{sender}{recipient}{amount}".encode()
signature = signing_key.sign(message).signature
# stored separately from the message, so a verifier rebuilds
# the message itself and checks the signature against it</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Add a <code>sign_transaction(self, recipient, amount)</code> method to <code>Wallet</code>. Build <code>message = f"{self.address}{recipient}{amount}".encode()</code>, sign it with <code>self.signing_key.sign(message).signature</code>, and return a dict with keys <code>"sender"</code> (<code>self.address</code>), <code>"recipient"</code>, <code>"amount"</code>, <code>"signature"</code>, and <code>"verify_key"</code> (<code>bytes(self.verify_key)</code>).</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">wallet.sign_transaction("bob-address", 10)</span><code class="io-val">{"sender": "...", "recipient": "bob-address", "amount": 10, "signature": b"...", "verify_key": b"..."}</code></div>
</div>`,
    hints: [
      "def sign_transaction(self, recipient, amount):",
      "    message = f\"{self.address}{recipient}{amount}\".encode()",
      "    signature = self.signing_key.sign(message).signature",
      "    return {\"sender\": self.address, \"recipient\": recipient, \"amount\": amount, \"signature\": signature, \"verify_key\": bytes(self.verify_key)}"
    ],
    starterCode: "# Add sign_transaction(self, recipient, amount) to your Wallet class\n",
    solution: "from nacl.signing import SigningKey\nimport hashlib\n\nclass Wallet:\n    def __init__(self):\n        self.signing_key = SigningKey.generate()\n        self.verify_key = self.signing_key.verify_key\n        self.address = hashlib.sha256(bytes(self.verify_key)).hexdigest()[:16]\n\n    def sign_transaction(self, recipient, amount):\n        message = f\"{self.address}{recipient}{amount}\".encode()\n        signature = self.signing_key.sign(message).signature\n        return {\"sender\": self.address, \"recipient\": recipient, \"amount\": amount, \"signature\": signature, \"verify_key\": bytes(self.verify_key)}",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "def\\s+sign_transaction\\s*\\(\\s*self\\s*,\\s*recipient\\s*,\\s*amount\\s*\\)", message: "Define sign_transaction(self, recipient, amount)." },
        { type: "matchesRegex", pattern: "self\\.signing_key\\.sign\\(", message: "Sign the message with self.signing_key.sign()." },
        { type: "codeContains", value: "\"signature\"", message: "Include a signature key in the returned dict." },
        { type: "codeContains", value: "\"verify_key\"", message: "Include a verify_key key in the returned dict, so a stranger can verify without asking you." }
      ]
    },
    explanation: `<p>Handing back <code>verify_key</code> alongside the signature is what makes this self-contained: anyone holding this dict, a chain, a node, another wallet, can verify it themselves without ever contacting you. That's the same shape a real transaction has on Algorand or Ethereum: the data, a signature, and enough information to check it independently.</p>`
  },
  {
    id: 247,
    title: "Attack: Forging a Signature",
    difficulty: "medium",
    topic: "Security",
    level: 6,
    xp: 20,
    instructions: `<p>Level 5's Detecting Tampering challenge showed hashing catching a changed value. This is the same idea one layer up: instead of just asking "does this data match its hash," a real attacker tries to alter a signed transaction, e.g. bumping the amount, and hopes the original signature still checks out. It doesn't, and this challenge has you watch it fail for real instead of taking that on faith.</p>
<p class="blueprint-line"><code>VerifyKey(verify_key).verify(message, signature)</code> raises <code>BadSignatureError</code> on a mismatch</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>from nacl.exceptions import BadSignatureError

try:
    verify_key.verify(tampered_message, original_signature)
    forged_successfully = True
except BadSignatureError:
    forged_successfully = False</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>attempt_forge(transaction)</code>, which takes a signed transaction dict (from the last challenge's shape), changes its <code>"amount"</code> to <code>999999</code>, rebuilds the message from the tampered fields, and tries to verify it against the transaction's original <code>"signature"</code> using its <code>"verify_key"</code>. Return <code>True</code> if the forgery was caught (a <code>BadSignatureError</code> was raised), <code>False</code> if it wasn't.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">attempt_forge(signed_transaction)</span><code class="io-val">True (the forgery was caught)</code></div>
</div>`,
    hints: [
      "from nacl.signing import VerifyKey",
      "from nacl.exceptions import BadSignatureError",
      "def attempt_forge(transaction):",
      "    tampered = dict(transaction)",
      "    tampered[\"amount\"] = 999999",
      "    message = f\"{tampered['sender']}{tampered['recipient']}{tampered['amount']}\".encode()",
      "    verify_key = VerifyKey(transaction[\"verify_key\"])",
      "    try:",
      "        verify_key.verify(message, transaction[\"signature\"])",
      "        return False",
      "    except BadSignatureError:",
      "        return True"
    ],
    starterCode: "def attempt_forge(transaction):\n    # Tamper with the amount, then try to verify the original signature against it\n    pass\n",
    solution: "from nacl.signing import VerifyKey\nfrom nacl.exceptions import BadSignatureError\n\ndef attempt_forge(transaction):\n    tampered = dict(transaction)\n    tampered[\"amount\"] = 999999\n    message = f\"{tampered['sender']}{tampered['recipient']}{tampered['amount']}\".encode()\n    verify_key = VerifyKey(transaction[\"verify_key\"])\n    try:\n        verify_key.verify(message, transaction[\"signature\"])\n        return False\n    except BadSignatureError:\n        return True",
    validation: {
      checks: [
        { type: "hasValidDef", name: "attempt_forge", message: "Define attempt_forge(transaction)." },
        { type: "codeContains", value: "999999", message: "Tamper with the amount before re-verifying." },
        { type: "hasException", message: "Catch BadSignatureError around the verify() call." },
        { type: "matchesRegex", pattern: "except\\s+BadSignatureError", message: "Catch BadSignatureError specifically, not a bare except." }
      ]
    },
    explanation: `<p>The signature was made over the original message (with the real amount baked in). The moment you change the amount, the message you're verifying against no longer matches what was actually signed, so PyNaCl rejects it outright. This is exactly what stops someone from intercepting a real transaction and quietly inflating the amount before it reaches a node.</p>`
  },
  {
    id: 256,
    title: "The Mempool: Pending Transactions",
    difficulty: "medium",
    topic: "Mempool",
    level: 6,
    xp: 20,
    instructions: `<p>A node doesn't drop a transaction into a block the instant it arrives. Validly signed but not-yet-confirmed transactions wait in the <strong>mempool</strong> (memory pool): a holding area the node keeps in memory. When the node builds a block it pulls a batch out of the mempool, and once those transactions land in a block they leave the pool. The mempool is also the one gate a transaction passes before it is allowed to wait anywhere: a bad signature is rejected on arrival, so a forged transaction never even reaches a block.</p>
<ul>
  <li><strong>Unconfirmed:</strong> a transaction that is validly signed and accepted by nodes, but not yet included in any block, so it could still be dropped or reordered.</li>
</ul>
<p class="blueprint-line"><code>Mempool: pending, add(transaction) -> bool, collect(limit) -> list</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>message = f"{tx['sender']}{tx['recipient']}{tx['amount']}".encode()
try:
    VerifyKey(tx["verify_key"]).verify(message, tx["signature"])
    self.pending.append(tx)   # signature holds up, let it wait
except BadSignatureError:
    return False              # forged, never queue it</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Checked on code shape, like the rest of this level's crypto: PyNaCl is not in the browser sandbox. Run it locally to watch a forged transaction get turned away at add().</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Write a <code>Mempool</code> class. <code>__init__</code> sets <code>self.pending = []</code>. <code>add(self, transaction)</code> rebuilds <code>message = f"{transaction['sender']}{transaction['recipient']}{transaction['amount']}".encode()</code> and verifies it with <code>VerifyKey(transaction["verify_key"]).verify(message, transaction["signature"])</code>: on success it appends the transaction to <code>self.pending</code> and returns <code>True</code>, and on <code>BadSignatureError</code> it returns <code>False</code> without queuing anything. <code>collect(self, limit)</code> removes up to <code>limit</code> transactions from the front of <code>self.pending</code> and returns them as a list, ready to go into a block.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">mp.add(alice.sign_transaction("bob", 10))</span><code class="io-val">True</code></div>
  <div class="io-row"><span class="io-key">mp.add(forged_tx)</span><code class="io-val">False  (nothing added to pending)</code></div>
  <div class="io-row"><span class="io-key">mp.collect(5)</span><code class="io-val">[tx, ...]  and those are gone from mp.pending</code></div>
</div>`,
    hints: [
      "from nacl.signing import VerifyKey",
      "from nacl.exceptions import BadSignatureError",
      "class Mempool:\n    def __init__(self):\n        self.pending = []",
      "    def add(self, transaction):\n        message = f\"{transaction['sender']}{transaction['recipient']}{transaction['amount']}\".encode()\n        try:\n            VerifyKey(transaction[\"verify_key\"]).verify(message, transaction[\"signature\"])\n        except BadSignatureError:\n            return False\n        self.pending.append(transaction)\n        return True",
      "    def collect(self, limit):\n        batch = self.pending[:limit]\n        self.pending = self.pending[limit:]\n        return batch"
    ],
    starterCode: "from nacl.signing import VerifyKey\nfrom nacl.exceptions import BadSignatureError\n\nclass Mempool:\n    # pending list; add(transaction) -> bool (verify signature first); collect(limit) -> list\n    pass\n",
    solution: "from nacl.signing import VerifyKey\nfrom nacl.exceptions import BadSignatureError\n\nclass Mempool:\n    def __init__(self):\n        self.pending = []\n\n    def add(self, transaction):\n        message = f\"{transaction['sender']}{transaction['recipient']}{transaction['amount']}\".encode()\n        try:\n            VerifyKey(transaction[\"verify_key\"]).verify(message, transaction[\"signature\"])\n        except BadSignatureError:\n            return False\n        self.pending.append(transaction)\n        return True\n\n    def collect(self, limit):\n        batch = self.pending[:limit]\n        self.pending = self.pending[limit:]\n        return batch",
    validation: {
      checks: [
        { type: "hasClass", name: "Mempool", message: "Define a Mempool class." },
        { type: "hasImport", module: "nacl.signing", message: "Import VerifyKey from nacl.signing." },
        { type: "matchesRegex", pattern: "self\\.pending\\s*=\\s*\\[\\s*\\]", message: "Start with an empty self.pending list in __init__." },
        { type: "matchesRegex", pattern: "def\\s+add\\s*\\(\\s*self\\s*,\\s*transaction\\s*\\)", message: "Define add(self, transaction)." },
        { type: "matchesRegex", pattern: "\\.verify\\s*\\(", message: "Verify the transaction's signature inside add() before queuing it." },
        { type: "matchesRegex", pattern: "except\\s+BadSignatureError", message: "Return False on BadSignatureError instead of queuing a forged transaction." },
        { type: "matchesRegex", pattern: "self\\.pending\\.append\\(", message: "Append accepted transactions to self.pending." },
        { type: "matchesRegex", pattern: "def\\s+collect\\s*\\(\\s*self\\s*,\\s*limit\\s*\\)", message: "Define collect(self, limit)." }
      ]
    },
    explanation: `<p>Two things make this a mempool and not just a list. First, <code>add()</code> is a gate: verification happens here, once, so everything sitting in <code>pending</code> is already known-good and a block builder never has to re-check it. Second, <code>collect()</code> both reads and removes, because a transaction should only ever be mined once; leaving it in the pool would let a second block include it again. Real nodes add two things on top of this: they gossip their pending transactions to peers so the whole network converges on the same set, and <code>collect()</code> takes the highest-fee transactions first rather than the oldest. The shape is exactly what you just wrote.</p>`
  },
  {
    id: 235,
    title: "Modeling Data with an ORM",
    difficulty: "medium",
    topic: "Data Persistence",
    level: 6,
    xp: 15,
    instructions: `<p>An <strong>ORM</strong> (object-relational mapper) lets you define a database table as a Python class instead of writing raw SQL. <code>SQLAlchemy</code> is the standard one: each class attribute becomes a column, each instance becomes a row, and queries read like Python instead of SQL strings. Every model inherits from a shared <code>Base</code> class, created once with <code>declarative_base()</code>, which is how SQLAlchemy keeps track of which classes map to which tables.</p>
<ul>
  <li><strong>Column:</strong> a typed field on the table, declared with <code>Column(Integer)</code>, <code>Column(String)</code>, etc., the same way a dataclass field declares a type.</li>
</ul>
<p class="blueprint-line"><code>class Model(Base):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;__tablename__ = "name"</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;col = Column(Type)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a SQLAlchemy model <code>Block</code>, table name <code>"blocks"</code>, with columns <code>id</code> (<code>Integer</code>, primary key), <code>hash</code> (<code>String</code>), and <code>previous_hash</code> (<code>String</code>).</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Block(id=1, hash="ab..", previous_hash="00..")</span><code class="io-val">a row in the blocks table</code></div>
</div>`,
    hints: [
      "from sqlalchemy import Column, Integer, String",
      "from sqlalchemy.orm import declarative_base",
      "Base = declarative_base()",
      "class Block(Base):",
      "    __tablename__ = \"blocks\"",
      "    id = Column(Integer, primary_key=True)",
      "    hash = Column(String)",
      "    previous_hash = Column(String)"
    ],
    starterCode: "# Define the Block model\n",
    solution: 'from sqlalchemy import Column, Integer, String\nfrom sqlalchemy.orm import declarative_base\n\nBase = declarative_base()\n\nclass Block(Base):\n    __tablename__ = "blocks"\n    id = Column(Integer, primary_key=True)\n    hash = Column(String)\n    previous_hash = Column(String)',
    validation: {
      checks: [
        { type: "hasImport", module: "sqlalchemy", message: "Import Column, Integer, String from sqlalchemy." },
        { type: "hasClass", name: "Block", message: "Define a class named Block." },
        { type: "codeContains", value: "__tablename__", message: "Set __tablename__ to \"blocks\"." },
        { type: "matchesRegex", pattern: "id\\s*=\\s*Column\\(\\s*Integer\\s*,\\s*primary_key\\s*=\\s*True\\s*\\)", message: "id should be an Integer primary key." },
        { type: "matchesRegex", pattern: "hash\\s*=\\s*Column\\(\\s*String\\s*\\)", message: "hash should be a String column." },
        { type: "matchesRegex", pattern: "previous_hash\\s*=\\s*Column\\(\\s*String\\s*\\)", message: "previous_hash should be a String column." }
      ]
    },
    explanation: `<p>Reading every block from a real blockchain to answer a simple question ("what's this account's balance?") is far too slow to do live. Real projects index the chain into a database like this one instead, and query the database, not the chain, for anything that needs to be fast.</p>`
  },
  {
    id: 236,
    title: "Event Sourcing: State as a Timeline",
    difficulty: "medium",
    topic: "Data Persistence",
    level: 6,
    xp: 15,
    instructions: `<p>Most apps store state directly: a balance is a number in a row, and updating it overwrites that number. <strong>Event sourcing</strong> does something different: instead of storing the current state, you store every event that ever changed it, in order, and the current state is just whatever you get from replaying them. A bank statement works the same way; it never edits a past line, it just lists every deposit and withdrawal, and your balance is whatever you get from adding up that list. This is exactly the shape of the blockchain you already built in Level 5. It never overwrites a block, it only ever appends a new one.</p>
<ul>
  <li><strong>Replay:</strong> slower than reading a stored number, but nothing is ever lost. A bug in how you compute the balance can be fixed and replayed against the same history to get the right answer, instead of the wrong number already being baked in.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>events = [
    {"type": "deposit", "amount": 100},
    {"type": "withdraw", "amount": 30},
]
balance = sum(e["amount"] if e["type"] == "deposit" else -e["amount"] for e in events)
print(balance)  # 70 (computed from the timeline, not stored directly)</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>replay_balance(events)</code>, which takes a list of dicts like <code>{"type": "deposit", "amount": N}</code> or <code>{"type": "withdraw", "amount": N}</code> and returns the resulting balance, starting from <code>0</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">[{"type": "deposit", "amount": 100}, {"type": "withdraw", "amount": 30}]</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">70</code></div>
</div>`,
    hints: [
      "def replay_balance(events):",
      "    balance = 0",
      "    for e in events:",
      "        balance += e[\"amount\"] if e[\"type\"] == \"deposit\" else -e[\"amount\"]",
      "    return balance"
    ],
    starterCode: "def replay_balance(events):\n    # Replay the events into a final balance\n    pass\n",
    solution: 'def replay_balance(events):\n    balance = 0\n    for e in events:\n        balance += e["amount"] if e["type"] == "deposit" else -e["amount"]\n    return balance',
    validation: {
      checks: [
        { type: "hasValidDef", name: "replay_balance", message: "Define replay_balance(events)." },
        { type: "codeContains", value: "for", message: "Loop through the events." }
      ],
      pyTests: [
        { code: "assert replay_balance([{'type': 'deposit', 'amount': 100}, {'type': 'withdraw', 'amount': 30}]) == 70", message: "A deposit of 100 then a withdrawal of 30 should leave a balance of 70." },
        { code: "assert replay_balance([]) == 0", message: "No events should leave a balance of 0." }
      ]
    },
    explanation: `<p>This is pure Python, so it runs and is graded for real, unlike most of this level. The insight worth keeping: a blockchain, a bank's transaction log, and this <code>events</code> list are all the same underlying pattern, an immutable timeline that state gets derived from.</p>`
  },
  {
    id: 238,
    title: "How the Ethereum Virtual Machine Works",
    difficulty: "easy",
    topic: "Web3 Ecosystem",
    level: 6,
    xp: 10,
    instructions: `<p>Ethereum and every EVM-compatible chain (Polygon, Base, Arbitrum, and most others in active use) run a shared virtual machine, the <strong>EVM</strong>, that executes smart contract code identically no matter which computer runs it. Every computer participating in the network is a <strong>node</strong>; each one re-runs every transaction itself to independently agree on the result: the same "everyone re-checks everything" idea Level 5's <code>is_chain_valid</code> was built around, just running live across thousands of machines instead of one script.</p>
<ul>
  <li><strong>Gas:</strong> a fee, paid in the chain's own currency, that scales with how much computation a transaction actually does, the same way an electric bill scales with how much power you actually use instead of charging a flat rate. It's what stops someone from writing an infinite loop and grinding the network to a halt for free.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>tx_cost = gas_used * gas_price
# a transaction doing more computation (a bigger loop, more storage writes)
# costs more gas, and therefore more real money, to execute</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>tx_cost(gas_used, gas_price)</code>, which returns the total cost of a transaction as <code>gas_used * gas_price</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">tx_cost(21000, 2)</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">42000</code></div>
</div>`,
    hints: [
      "def tx_cost(gas_used, gas_price):",
      "    return gas_used * gas_price"
    ],
    starterCode: "def tx_cost(gas_used, gas_price):\n    # Return the total cost of the transaction\n    pass\n",
    solution: 'def tx_cost(gas_used, gas_price):\n    return gas_used * gas_price',
    validation: {
      checks: [
        { type: "hasValidDef", name: "tx_cost", message: "Define tx_cost(gas_used, gas_price)." },
        { type: "matchesRegex", pattern: "gas_used\\s*\\*\\s*gas_price", message: "Multiply gas_used by gas_price." }
      ],
      pyTests: [
        { code: "assert tx_cost(21000, 2) == 42000", message: "tx_cost(21000, 2) should be 42000." }
      ]
    },
    explanation: `<p>21000 is the real, fixed base cost of the simplest possible Ethereum transaction (a plain transfer). Anything a smart contract actually computes adds gas on top of that floor.</p>`
  },
  {
    id: 239,
    title: "Reading Vyper: A Python-Flavored Contract Language",
    difficulty: "medium",
    topic: "Web3 Ecosystem",
    level: 6,
    xp: 15,
    instructions: `<p><strong>Vyper</strong> is a smart contract language with deliberately Python-like syntax, designed for the EVM. It is not Python (it doesn't run in a Python interpreter, it compiles to EVM bytecode), but if you can already read Python, Vyper reads as familiar rather than foreign. This is the realistic path from "knows Python" to "can read a real smart contract," not writing contracts in literal Python, which isn't a thing any major chain supports.</p>
<ul>
  <li><strong>State variable:</strong> a contract-level variable, declared once at the top with a type, that persists on-chain between calls, the contract's permanent storage. Wrapping the type in <code>public()</code>, like <code>public(address)</code>, also auto-generates a free getter function for it, on top of any function you write yourself.</li>
</ul>
<p class="blueprint-line"><code>@external</code><br><code>def name(param: type) -> type:</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code># Vyper, not Python, but readable like it
balances: public(HashMap[address, uint256])

@external
def deposit():
    self.balances[msg.sender] += msg.value</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>This is Vyper source, not Python; it can't be run or graded by this sandbox at all. You're typing it to build reading familiarity, matched purely on the text. <code>@external</code> marks a function as callable from outside the contract, not just internally.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Type the following Vyper function exactly, into a variable named <code>contract_code</code>: a state variable <code>owner: public(address)</code>, and an <code>@external</code> function <code>get_owner() -> address:</code> that returns <code>self.owner</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">contract_code</span><code class="io-val">"owner: public(address)\\n\\n@external\\ndef get_owner() -> address:\\n    return self.owner"</code></div>
</div>`,
    hints: [
      'contract_code = """owner: public(address)',
      '',
      '@external',
      'def get_owner() -> address:',
      '    return self.owner',
      '"""'
    ],
    starterCode: "# Assign the Vyper contract snippet to contract_code\n",
    solution: 'contract_code = """owner: public(address)\n\n@external\ndef get_owner() -> address:\n    return self.owner\n"""',
    validation: {
      checks: [
        { type: "codeContains", value: "owner: public(address)", message: "Declare owner as a public(address) state variable." },
        { type: "codeContains", value: "@external", message: "Mark the function @external." },
        { type: "matchesRegex", pattern: "def\\s+get_owner\\s*\\(\\s*\\)\\s*->\\s*address\\s*:", message: "Define get_owner() -> address:." },
        { type: "codeContains", value: "return self.owner", message: "Return self.owner." }
      ]
    },
    explanation: `<p><code>public(address)</code> does double duty: it stores the value on-chain <em>and</em> auto-generates a free getter function for it, which is why a real Vyper contract often looks shorter than the equivalent Solidity for the same behavior.</p>`
  },
  {
    id: 240,
    title: "Talking to a Chain with web3.py",
    difficulty: "medium",
    topic: "Web3 Ecosystem",
    level: 6,
    xp: 15,
    instructions: `<p><code>web3.py</code> is the standard Python library for talking to Ethereum and any EVM-compatible chain (Polygon, Base, Arbitrum, and most others in active use). It does not work with Bitcoin or other non-EVM chains, which use entirely different libraries. It connects to a <strong>node</strong> over <code>JSON-RPC</code> (the protocol nodes speak) and lets you read chain data or send transactions from Python.</p>
<ul>
  <li><strong>Provider:</strong> the connection to a specific node. <code>Web3.HTTPProvider(url)</code> points web3.py at whichever node you want to talk to.</li>
</ul>
<p class="blueprint-line"><code>w3 = Web3(Web3.HTTPProvider(url))</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>from web3 import Web3

w3 = Web3(Web3.HTTPProvider("https://your-node-url"))
balance = w3.eth.get_balance("0xSomeAddress")
print(w3.from_wei(balance, "ether"))</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>In your own project, connect to a public testnet rather than mainnet while you're experimenting, so you're not risking real funds.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create a <code>Web3</code> instance named <code>w3</code> connected to <code>"https://mainnet.example-node.io"</code> via <code>HTTPProvider</code>. Then read the balance of <code>"0xAbC1234567890000000000000000000000dEaD"</code> into a variable named <code>balance</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">balance</span><code class="io-val">the account's balance, in wei</code></div>
</div>`,
    hints: [
      "from web3 import Web3",
      'w3 = Web3(Web3.HTTPProvider("https://mainnet.example-node.io"))',
      'balance = w3.eth.get_balance("0xAbC1234567890000000000000000000000dEaD")'
    ],
    starterCode: "# Connect to a node and read an account's balance\n",
    solution: 'from web3 import Web3\n\nw3 = Web3(Web3.HTTPProvider("https://mainnet.example-node.io"))\nbalance = w3.eth.get_balance("0xAbC1234567890000000000000000000000dEaD")',
    validation: {
      checks: [
        { type: "hasImport", module: "web3", message: "Import Web3 from web3." },
        { type: "matchesRegex", pattern: "Web3\\(\\s*Web3\\.HTTPProvider\\(", message: "Create a Web3 instance with Web3.HTTPProvider()." },
        { type: "matchesRegex", pattern: "w3\\.eth\\.get_balance\\(", message: "Read the balance with w3.eth.get_balance()." }
      ]
    },
    explanation: `<p><code>w3.eth.get_balance()</code> returns wei, the smallest unit (like cents to a dollar, but 18 decimal places instead of 2). <code>w3.from_wei(balance, "ether")</code> converts it to the human-readable number you'd actually want to display.</p>`
  },
  {
    id: 248,
    title: "Broadcasting a Block to Peers",
    difficulty: "medium",
    topic: "Nodes & Networking",
    level: 6,
    xp: 20,
    instructions: `<p>Everything so far has been one Python program with one chain. A real blockchain is a network of independent programs, called <strong>nodes</strong>, each running the same software and holding its own copy of the chain. When a node adds a block, it doesn't just keep that to itself: it <strong>broadcasts</strong> the block to every other node it knows about, so their copies stay in sync too. It's the same idea as sending a message to a group chat: one message goes out to everyone in it, and one person's phone being off doesn't stop it from reaching everyone else.</p>
<ul>
  <li><strong>Peer:</strong> another node's address (a URL, when nodes talk over HTTP) that this node knows about and can send data to.</li>
</ul>
<p class="blueprint-line"><code>requests.post(peer_url + "/receive_block", params=block_data)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>import requests

def broadcast_block(block_data, peer_urls):
    for url in peer_urls:
        try:
            requests.post(url + "/receive_block", params=block_data, timeout=2)
        except requests.exceptions.RequestException:
            pass  # a peer being unreachable shouldn't stop the others</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Checked on code shape, like the rest of this level: a real node server is something you'd run for real across multiple terminals, not inside a browser sandbox. The next few challenges build toward exactly that.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>broadcast_block(block_data, peer_urls)</code>, which sends a <code>POST</code> request to <code>peer_url + "/receive_block"</code> for every URL in <code>peer_urls</code>, with <code>block_data</code> passed as <code>params</code> (not <code>json</code>: every route in this level's capstone reads its POST fields as query parameters, like <code>/mint</code>'s <code>account</code> and <code>amount</code>, so the receiving end has to be sent the same way). Wrap each request in a try/except so one unreachable peer doesn't stop the rest from being notified.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">broadcast_block({"data": "mint alice 100"}, ["http://node-b:8000", "http://node-c:8000"])</span><code class="io-val">both peers get notified, even if one is offline</code></div>
</div>`,
    hints: [
      "import requests",
      "def broadcast_block(block_data, peer_urls):",
      "    for url in peer_urls:",
      "        try:",
      "            requests.post(url + \"/receive_block\", params=block_data, timeout=2)",
      "        except requests.exceptions.RequestException:",
      "            pass"
    ],
    starterCode: "# Broadcast a block to every peer, skipping any that are unreachable\n",
    solution: "import requests\n\ndef broadcast_block(block_data, peer_urls):\n    for url in peer_urls:\n        try:\n            requests.post(url + \"/receive_block\", params=block_data, timeout=2)\n        except requests.exceptions.RequestException:\n            pass",
    validation: {
      checks: [
        { type: "hasImport", module: "requests", message: "Import the requests module." },
        { type: "hasValidDef", name: "broadcast_block", message: "Define broadcast_block(block_data, peer_urls)." },
        { type: "matchesRegex", pattern: "requests\\.post\\(", message: "Send each peer a POST request with requests.post()." },
        { type: "hasException", message: "Wrap each request in a try/except so one unreachable peer doesn't stop the others." }
      ]
    },
    explanation: `<p>This is the client side of node-to-node communication: your node telling everyone else's node "here's a new block." Run this for real across a few terminals on your own machine and each one becomes an actual node, sending and receiving blocks like a small real network.</p>`
  },
  {
    id: 249,
    title: "Resolving Competing Chains",
    difficulty: "hard",
    topic: "Nodes & Networking",
    level: 6,
    xp: 25,
    instructions: `<p>Two nodes can end up with different, both individually valid, versions of the chain, for instance if they each accepted a different block at the same position before hearing about the other one. A node needs a consistent rule for picking which version to trust, and the standard one is simple: whichever valid chain is longer wins. An invalid chain never wins, no matter how long it is. It's the same instinct as weighing two conflicting accounts of the same event: check that each one actually holds up before ever comparing how detailed they are.</p>
<ul>
  <li><strong>Longest-valid-chain rule:</strong> not just "longest chain", the chain also has to actually validate. A longer chain built on fabricated blocks loses to a shorter, honest one.</li>
</ul>
<p class="blueprint-line"><code>resolve_chains(chain_a, chain_b, is_valid_fn) -> the winning chain</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def resolve_chains(chain_a, chain_b, is_valid_fn):
    valid_a = is_valid_fn(chain_a)
    valid_b = is_valid_fn(chain_b)
    if valid_a and not valid_b:
        return chain_a
    if valid_b and not valid_a:
        return chain_b
    return chain_a if len(chain_a) >= len(chain_b) else chain_b</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Write <code>resolve_chains(chain_a, chain_b, is_valid_fn)</code>. Check both chains with <code>is_valid_fn(chain)</code>. If only one is valid, return that one, regardless of length. If both are valid, return whichever is longer, or <code>chain_a</code> on a tie. (Assume at least one of the two chains is always valid.)</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">chain_a has 5 blocks and is valid; chain_b has 8 blocks but fails is_valid_fn</code></div>
  <div class="io-row"><span class="io-key">resolve_chains(chain_a, chain_b, is_valid_fn)</span><code class="io-val">chain_a (the shorter, honest one)</code></div>
</div>`,
    hints: [
      "def resolve_chains(chain_a, chain_b, is_valid_fn):",
      "    valid_a = is_valid_fn(chain_a)",
      "    valid_b = is_valid_fn(chain_b)",
      "    if valid_a and not valid_b: return chain_a",
      "    if valid_b and not valid_a: return chain_b",
      "    return chain_a if len(chain_a) >= len(chain_b) else chain_b"
    ],
    starterCode: "def resolve_chains(chain_a, chain_b, is_valid_fn):\n    # Prefer the valid chain; if both are valid, prefer the longer one\n    pass\n",
    solution: "def resolve_chains(chain_a, chain_b, is_valid_fn):\n    valid_a = is_valid_fn(chain_a)\n    valid_b = is_valid_fn(chain_b)\n    if valid_a and not valid_b:\n        return chain_a\n    if valid_b and not valid_a:\n        return chain_b\n    return chain_a if len(chain_a) >= len(chain_b) else chain_b",
    validation: {
      checks: [
        { type: "hasValidDef", name: "resolve_chains", message: "Define resolve_chains(chain_a, chain_b, is_valid_fn)." },
        { type: "codeContains", value: "is_valid_fn(", message: "Call is_valid_fn() to check each chain." },
        { type: "matchesRegex", pattern: "len\\(\\s*chain_a\\s*\\)|len\\(\\s*chain_b\\s*\\)", message: "Compare chain lengths to decide between two valid chains." }
      ],
      pyTests: [
        { code: "assert resolve_chains([1,2,3], [1,2,3,4,5], lambda c: True) == [1,2,3,4,5]", message: "Between two valid chains, the longer one should win." },
        { code: "assert resolve_chains([1,2,3], [1,2,3,4,5], lambda c: c == [1,2,3]) == [1,2,3]", message: "A shorter valid chain should beat a longer chain that fails validation." },
        { code: "assert resolve_chains([1,2,3], [1,2,3], lambda c: True) == [1,2,3]", message: "On a tie in length, chain_a should win." }
      ]
    },
    explanation: `<p>This is why rewriting an established blockchain's history is so hard in practice: an attacker's forged chain has to be both valid (every hash and signature checks out) and longer than the honest chain the rest of the network already has, and building a longer valid chain takes real, unavoidable work.</p>`
  },
  {
    id: 241,
    title: "Guided Project: Build a Blockchain From Scratch",
    kind: "project",
    difficulty: "hard",
    topic: "Capstone",
    level: 6,
    xp: 40,
    instructions: `<p>This is a synthesis, not a new lesson: hashing, chaining blocks together, and validating the chain are exactly what you already built piece by piece across Level 5. The one new piece is wiring in the <code>Wallet</code> from a few challenges ago: a block's <code>data</code> can now be a real signed transaction, and <code>is_valid()</code> checks its signature along with the usual hash and link checks. This is the version you'll actually build on top of in the next two projects.</p>
<p class="blueprint-line"><code>class Block: hash, previous_hash</code><br><code>class Blockchain: chain, add_block(), is_valid()</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>chain = Blockchain()
chain.add_block(alice_wallet.sign_transaction("bob-address", 10))
chain.add_block("Genesis note: system online")
print(chain.is_valid())  # Output: True</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>This project used to run for real, pure Python only. Verifying a real signature needs PyNaCl, so like the rest of this level's crypto and API content, it's checked on code shape here: run it for real locally to see a forged block actually get rejected by is_valid().</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Write a <code>Block</code> class (<code>index</code>, <code>data</code>, <code>previous_hash</code>, and a computed <code>hash</code> using SHA-256 over those three fields) and a <code>Blockchain</code> class with <code>add_block(data)</code> (appends a new block linked to the last one) and <code>is_valid()</code>. <code>data</code> can be a plain string, or a signed transaction dict from a <code>Wallet</code>'s <code>sign_transaction()</code>. <code>is_valid()</code> returns <code>True</code> only if every block's hash is correct, every <code>previous_hash</code> matches, <em>and</em>, for any block whose <code>data</code> is a dict containing a <code>"signature"</code>, that signature actually verifies (rebuild the message from <code>sender</code>/<code>recipient</code>/<code>amount</code> and check it with <code>VerifyKey(data["verify_key"]).verify(message, data["signature"])</code>). Start the chain with a genesis block (<code>index=0</code>, <code>data="Genesis"</code>, <code>previous_hash="0"</code>).</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">chain.add_block(alice_wallet.sign_transaction("bob-address", 10))</code></div>
  <div class="io-row"><span class="io-key">chain.is_valid()</span><code class="io-val">True (or False, if that transaction's signature or any block's hash/link is broken)</code></div>
</div>`,
    hints: [
      "class Block:\n    def __init__(self, index, data, previous_hash):\n        self.index = index\n        self.data = data\n        self.previous_hash = previous_hash\n        self.hash = self.compute_hash()",
      "    def compute_hash(self):\n        import hashlib\n        return hashlib.sha256(f\"{self.index}{self.data}{self.previous_hash}\".encode()).hexdigest()",
      "class Blockchain:\n    def __init__(self):\n        self.chain = [Block(0, \"Genesis\", \"0\")]",
      "    def add_block(self, data):\n        prev = self.chain[-1]\n        self.chain.append(Block(prev.index + 1, data, prev.hash))",
      "In is_valid(), after the usual hash/previous_hash checks: if isinstance(block.data, dict) and \"signature\" in block.data, rebuild the message and call VerifyKey(block.data[\"verify_key\"]).verify(message, block.data[\"signature\"]) inside a try/except BadSignatureError, returning False on failure"
    ],
    starterCode: "import hashlib\nfrom nacl.signing import VerifyKey\nfrom nacl.exceptions import BadSignatureError\n\nclass Block:\n    # index, data, previous_hash, computed hash\n    pass\n\nclass Blockchain:\n    # chain (starting with a genesis block), add_block(), is_valid()\n    # is_valid() should also verify any block whose data is a signed transaction\n    pass\n",
    solution: 'import hashlib\nfrom nacl.signing import VerifyKey\nfrom nacl.exceptions import BadSignatureError\n\nclass Block:\n    def __init__(self, index, data, previous_hash):\n        self.index = index\n        self.data = data\n        self.previous_hash = previous_hash\n        self.hash = self.compute_hash()\n\n    def compute_hash(self):\n        contents = f"{self.index}{self.data}{self.previous_hash}"\n        return hashlib.sha256(contents.encode()).hexdigest()\n\nclass Blockchain:\n    def __init__(self):\n        self.chain = [Block(0, "Genesis", "0")]\n\n    def add_block(self, data):\n        prev = self.chain[-1]\n        self.chain.append(Block(prev.index + 1, data, prev.hash))\n\n    def is_valid(self):\n        for i in range(len(self.chain)):\n            block = self.chain[i]\n            if block.hash != block.compute_hash():\n                return False\n            if i > 0 and block.previous_hash != self.chain[i - 1].hash:\n                return False\n            if isinstance(block.data, dict) and "signature" in block.data:\n                message = f"{block.data[\'sender\']}{block.data[\'recipient\']}{block.data[\'amount\']}".encode()\n                verify_key = VerifyKey(block.data["verify_key"])\n                try:\n                    verify_key.verify(message, block.data["signature"])\n                except BadSignatureError:\n                    return False\n        return True',
    validation: {
      checks: [
        { type: "hasClass", name: "Block", message: "Define a Block class." },
        { type: "hasClass", name: "Blockchain", message: "Define a Blockchain class." },
        { type: "matchesRegex", pattern: "hashlib\\.sha256\\(", message: "Compute each block's hash with hashlib.sha256()." },
        { type: "matchesRegex", pattern: "def\\s+add_block", message: "Define add_block()." },
        { type: "matchesRegex", pattern: "def\\s+is_valid", message: "Define is_valid()." },
        { type: "hasImport", module: "nacl.signing", message: "Import VerifyKey from nacl.signing." },
        { type: "matchesRegex", pattern: "verify_key\\.verify\\(", message: "Verify a signed transaction's signature inside is_valid()." },
        { type: "matchesRegex", pattern: "except\\s+BadSignatureError", message: "Catch BadSignatureError around the verify() call, and return False when it's raised." }
      ]
    },
    explanation: `<p>This is the same shape as everything Level 5 built, plus one more check per block: if the data is a signed transaction, its signature has to hold up too. Real projects almost always structure it this way, one class per concept, and this is the version you'll extend with a REST API and a stablecoin ledger next.</p>`
  },
  {
    id: 242,
    title: "Guided Project: Wrap It in a REST API",
    kind: "project",
    difficulty: "hard",
    topic: "Capstone",
    level: 6,
    xp: 40,
    instructions: `<p>This combines two things you just built separately: the <code>Blockchain</code> class from the last project, and the FastAPI CRUD patterns from Level 4. Nothing new is being taught here. This is wiring the two together, which is exactly what a real project's API layer does: expose an internal system's data and actions over HTTP.</p>
<p class="blueprint-line"><code>@app.get/post("/chain")</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>chain = Blockchain()

@app.get("/chain")
async def get_chain():
    return {"length": len(chain.chain), "valid": chain.is_valid()}</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Using the <code>Block</code>/<code>Blockchain</code> classes from the last project and a module-level <code>chain = Blockchain()</code>, add a <code>GET /chain</code> route returning <code>{"length": ..., "valid": ...}</code>, and a <code>POST /blocks</code> route that takes a body field <code>data: str</code>, calls <code>chain.add_block(data)</code>, and returns <code>{"added": data}</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">POST /blocks body</span><code class="io-val">{"data": "Pay Alice 10 coins"}</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">{"added": "Pay Alice 10 coins"}</code></div>
</div>`,
    hints: [
      "from pydantic import BaseModel",
      "class NewBlock(BaseModel):\n    data: str",
      "chain = Blockchain()",
      "@app.get(\"/chain\")\nasync def get_chain():\n    return {\"length\": len(chain.chain), \"valid\": chain.is_valid()}",
      "@app.post(\"/blocks\")\nasync def add_block(block: NewBlock):\n    chain.add_block(block.data)\n    return {\"added\": block.data}"
    ],
    starterCode: "from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n# Reuse Block/Blockchain from the last project, then add /chain and /blocks routes\n",
    solution: 'from fastapi import FastAPI\nfrom pydantic import BaseModel\nimport hashlib\n\napp = FastAPI()\n\nclass Block:\n    def __init__(self, index, data, previous_hash):\n        self.index = index\n        self.data = data\n        self.previous_hash = previous_hash\n        self.hash = self.compute_hash()\n\n    def compute_hash(self):\n        contents = f"{self.index}{self.data}{self.previous_hash}"\n        return hashlib.sha256(contents.encode()).hexdigest()\n\nclass Blockchain:\n    def __init__(self):\n        self.chain = [Block(0, "Genesis", "0")]\n\n    def add_block(self, data):\n        prev = self.chain[-1]\n        self.chain.append(Block(prev.index + 1, data, prev.hash))\n\n    def is_valid(self):\n        for i in range(len(self.chain)):\n            block = self.chain[i]\n            if block.hash != block.compute_hash():\n                return False\n            if i > 0 and block.previous_hash != self.chain[i - 1].hash:\n                return False\n        return True\n\nclass NewBlock(BaseModel):\n    data: str\n\nchain = Blockchain()\n\n@app.get("/chain")\nasync def get_chain():\n    return {"length": len(chain.chain), "valid": chain.is_valid()}\n\n@app.post("/blocks")\nasync def add_block(block: NewBlock):\n    chain.add_block(block.data)\n    return {"added": block.data}',
    validation: {
      checks: [
        { type: "hasClass", name: "Blockchain", message: "Reuse the Blockchain class." },
        { type: "codeContains", value: "chain = Blockchain()", message: "Create a module-level chain instance." },
        { type: "matchesRegex", pattern: "@app\\.get\\(\\s*[\"']\\/chain[\"']\\s*\\)", message: "Add a GET route at /chain." },
        { type: "matchesRegex", pattern: "@app\\.post\\(\\s*[\"']\\/blocks[\"']\\s*\\)", message: "Add a POST route at /blocks." },
        { type: "codeContains", value: "chain.add_block(", message: "Call chain.add_block() inside the POST route." }
      ]
    },
    explanation: `<p>This is the actual shape of most real blockchain-adjacent Python work: not writing consensus code, but building the API layer that lets a frontend, a wallet, or another service read and write to a chain-like system without needing to know its internals.</p>`
  },
  {
    id: 243,
    title: "Guided Project: A Stablecoin Ledger API",
    kind: "project",
    difficulty: "hard",
    topic: "Capstone",
    level: 6,
    xp: 40,
    instructions: `<p>One more step: extending the chain-backed API from the last project into something with a real purpose, a simplified stablecoin ledger. Every balance change gets recorded as a block (the event-sourcing idea from earlier in this level), so the full transaction history is always auditable from the chain itself, not just a single current-balance number.</p>
<p class="blueprint-line"><code>@app.post("/mint")</code> / <code>@app.post("/transfer")</code> / <code>@app.get("/balance/{account}")</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>balances = {}

@app.post("/mint")
async def mint(account: str, amount: float):
    balances[account] = balances.get(account, 0) + amount
    chain.add_block(f"mint {account} {amount}")
    return {"balance": balances[account]}</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Using the <code>chain</code> from the last project and a module-level <code>balances = {}</code>, add: <code>POST /mint</code> (params <code>account: str, amount: float</code>) that credits the account and logs <code>f"mint {account} {amount}"</code> as a new block; <code>POST /transfer</code> (params <code>sender: str, recipient: str, amount: float</code>) that moves the amount between accounts and logs <code>f"transfer {sender} {recipient} {amount}"</code>; and <code>GET /balance/{account}</code> returning <code>{"account": account, "balance": balances.get(account, 0)}</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">POST /mint?account=alice&amount=100</span><code class="io-val">{"balance": 100}</code></div>
</div>`,
    hints: [
      "balances = {}",
      "@app.post(\"/mint\")\nasync def mint(account: str, amount: float):\n    balances[account] = balances.get(account, 0) + amount\n    chain.add_block(f\"mint {account} {amount}\")\n    return {\"balance\": balances[account]}",
      "@app.post(\"/transfer\")\nasync def transfer(sender: str, recipient: str, amount: float):\n    balances[sender] -= amount\n    balances[recipient] = balances.get(recipient, 0) + amount\n    chain.add_block(f\"transfer {sender} {recipient} {amount}\")\n    return {\"sender_balance\": balances[sender]}",
      "@app.get(\"/balance/{account}\")\nasync def get_balance(account: str):\n    return {\"account\": account, \"balance\": balances.get(account, 0)}"
    ],
    starterCode: "balances = {}\n# Add POST /mint, POST /transfer, and GET /balance/{account}\n",
    solution: 'balances = {}\n\n@app.post("/mint")\nasync def mint(account: str, amount: float):\n    balances[account] = balances.get(account, 0) + amount\n    chain.add_block(f"mint {account} {amount}")\n    return {"balance": balances[account]}\n\n@app.post("/transfer")\nasync def transfer(sender: str, recipient: str, amount: float):\n    balances[sender] -= amount\n    balances[recipient] = balances.get(recipient, 0) + amount\n    chain.add_block(f"transfer {sender} {recipient} {amount}")\n    return {"sender_balance": balances[sender]}\n\n@app.get("/balance/{account}")\nasync def get_balance(account: str):\n    return {"account": account, "balance": balances.get(account, 0)}',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "@app\\.post\\(\\s*[\"']\\/mint[\"']\\s*\\)", message: "Add a POST route at /mint." },
        { type: "matchesRegex", pattern: "@app\\.post\\(\\s*[\"']\\/transfer[\"']\\s*\\)", message: "Add a POST route at /transfer." },
        { type: "matchesRegex", pattern: "@app\\.get\\(\\s*[\"']\\/balance\\/\\{account\\}[\"']\\s*\\)", message: "Add a GET route at /balance/{account}." },
        { type: "matchesRegex", pattern: "chain\\.add_block\\(", message: "Log each mint/transfer as a new block on the chain." }
      ]
    },
    explanation: `<p>This is a real, if simplified, shape of a stablecoin's off-chain accounting layer: balances live in a fast lookup (the dict), while every change is also permanently logged to the chain, so the balance can always be independently reconstructed and audited from the chain alone if the dict is ever wrong.</p>`
  },
  {
    id: 250,
    title: "Guided Project: Turn Your API into a Node",
    kind: "project",
    difficulty: "hard",
    topic: "Capstone",
    level: 6,
    xp: 50,
    instructions: `<p>One last step: turning the API from the last two projects into an actual node, not just a service that manages a chain by itself. Two pieces were still missing: something to receive a block that another node broadcasts, and the broadcasting itself actually getting called when a block is added, instead of just sitting in <code>broadcast_block</code> unused. Add a list of known peers on top of that, and this stops being an isolated chain and starts being a node on a small network.</p>
<p class="blueprint-line"><code>@app.post("/receive_block")</code> / <code>@app.post("/network/register")</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>peers = []

@app.post("/receive_block")
async def receive_block(data: str):
    chain.add_block(data)
    return {"chain_length": len(chain.chain)}</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Checked on code shape, same as every FastAPI challenge in this level. This is the one worth actually running for real: start this same file three times on three different ports, register each one with the other two via /network/register, mint on one, and watch the other two's /chain length update after broadcast_block fires.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Using <code>chain</code>, <code>balances</code>, and <code>broadcast_block</code> from earlier, add a module-level <code>peers = []</code>. Add <code>POST /network/register</code> (param <code>peer_url: str</code>) that appends <code>peer_url</code> to <code>peers</code> if it isn't already there, and returns <code>{"peers": peers}</code>. Add <code>POST /receive_block</code> (param <code>data: str</code>) that calls <code>chain.add_block(data)</code> and returns <code>{"chain_length": len(chain.chain)}</code>; this is what a peer's <code>/receive_block</code> is actually listening for. Finally, update <code>mint</code> from the last project so that after <code>chain.add_block(...)</code>, it also calls <code>broadcast_block({"data": f"mint {account} {amount}"}, peers)</code>, so every registered peer actually hears about the new block.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">POST /network/register?peer_url=http://localhost:8001</span><code class="io-val">{"peers": ["http://localhost:8001"]}</code></div>
  <div class="io-row"><span class="io-key">POST /mint?account=alice&amount=100 (on the node that peer is registered with)</span><code class="io-val">localhost:8001's /chain length grows by one too</code></div>
</div>`,
    hints: [
      "peers = []",
      "@app.post(\"/network/register\")\nasync def register_peer(peer_url: str):\n    if peer_url not in peers:\n        peers.append(peer_url)\n    return {\"peers\": peers}",
      "@app.post(\"/receive_block\")\nasync def receive_block(data: str):\n    chain.add_block(data)\n    return {\"chain_length\": len(chain.chain)}",
      "In mint, right after chain.add_block(f\"mint {account} {amount}\"): broadcast_block({\"data\": f\"mint {account} {amount}\"}, peers)"
    ],
    starterCode: "peers = []\n# Add POST /network/register and POST /receive_block, then update mint to broadcast\n",
    solution: 'peers = []\n\n@app.post("/network/register")\nasync def register_peer(peer_url: str):\n    if peer_url not in peers:\n        peers.append(peer_url)\n    return {"peers": peers}\n\n@app.post("/receive_block")\nasync def receive_block(data: str):\n    chain.add_block(data)\n    return {"chain_length": len(chain.chain)}\n\n@app.post("/mint")\nasync def mint(account: str, amount: float):\n    balances[account] = balances.get(account, 0) + amount\n    chain.add_block(f"mint {account} {amount}")\n    broadcast_block({"data": f"mint {account} {amount}"}, peers)\n    return {"balance": balances[account]}',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "@app\\.post\\(\\s*[\"']\\/network\\/register[\"']\\s*\\)", message: "Add a POST route at /network/register." },
        { type: "matchesRegex", pattern: "@app\\.post\\(\\s*[\"']\\/receive_block[\"']\\s*\\)", message: "Add a POST route at /receive_block." },
        { type: "codeContains", value: "peers.append(", message: "Append a newly registered peer to the peers list." },
        { type: "codeContains", value: "chain.add_block(", message: "Have /receive_block actually append the incoming block with chain.add_block()." },
        { type: "matchesRegex", pattern: "broadcast_block\\(", message: "Call broadcast_block() from inside mint, after adding the block locally." }
      ]
    },
    explanation: `<p>This is what actually closes the loop: without <code>/receive_block</code>, <code>broadcast_block</code> would just be POSTing into the void, since no peer has anything listening on that path. Without wiring the call into <code>mint</code>, nothing ever gets broadcast in the first place. Between this, <code>broadcast_block</code>, and <code>resolve_chains</code> from earlier, you now have every piece a real node needs: a way to tell others about a new block, a way to receive one, and a way to decide whose version of the chain to trust when two disagree. Wiring three copies of this together on your own machine, registered with each other, is the closest this course gets to what a real blockchain network actually looks like underneath.</p>`
  }
];
