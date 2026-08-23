window.LEVEL6 = [
  {
    id: 226,
    title: "Welcome to Level 6: Applied Python for Blockchain",
    kind: "intro",
    topic: "Introduction",
    level: 6,
    instructions: `<p>Level 5 taught you how a blockchain works underneath. This level teaches the layer real projects build on top of that: web APIs (FastAPI, Pydantic), practical cryptography beyond the HMAC stand-in from Level 5, and the tools a real Python codebase depends on, like an ORM, dependency management, and enough Web3 vocabulary (the EVM, Vyper, web3.py) to read an existing project instead of starting from zero.</p>
<p>Some of this can't run inside this browser sandbox the way earlier challenges do: FastAPI, a real database, a real blockchain node, none of those exist in here. Those challenges are checked on the shape of the code you write, not by running it, and the instructions will tell you exactly that. The plan is: write it here, understand exactly what it does, then actually run it for real in your own VS Code. By the end, you'll have built a small blockchain from scratch and wrapped a real API around it.</p>`,
    starterCode: ""
  },
  {
    id: 227,
    title: "Building Your First Endpoint",
    difficulty: "easy",
    topic: "Web APIs",
    level: 6,
    xp: 10,
    instructions: `<p>An <strong>API</strong> (application programming interface) lets other programs talk to yours over the network: a request comes in, your code runs, a response goes out. <strong>FastAPI</strong> is a Python framework for building one: you write a normal Python function, decorate it with the HTTP method and URL path it should answer, and FastAPI handles the rest.</p>
<p class="blueprint-line"><code>@app.get("/path")</code><br><code>async def handler(): ...</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>from fastapi import FastAPI

app = FastAPI()

@app.get("/hello")
async def hello():
    return {"message": "hi"}</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create a FastAPI app named <code>app</code>. Add a <code>GET</code> route at <code>/status</code> that returns <code>{"status": "ok"}</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">GET /status</span><code class="io-val">{"status": "ok"}</code></div>
</div>`,
    hints: [
      "from fastapi import FastAPI",
      "app = FastAPI()",
      "@app.get(\"/status\")",
      "async def status(): return {\"status\": \"ok\"}"
    ],
    starterCode: "# Create a FastAPI app with a GET /status route\n",
    solution: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/status")\nasync def status():\n    return {"status": "ok"}',
    validation: {
      checks: [
        { type: "hasImport", module: "fastapi", message: "Import FastAPI from the fastapi module." },
        { type: "codeContains", value: "FastAPI()", message: "Create an app with FastAPI()." },
        { type: "matchesRegex", pattern: "@app\\.get\\(\\s*[\"']\\/status[\"']\\s*\\)", message: "Add a GET route at /status." },
        { type: "hasAsync", message: "Define the route handler as an async function." }
      ]
    },
    explanation: `<p>The decorator <code>@app.get("/status")</code> is what actually registers the route. Without it, <code>status()</code> is just a normal function FastAPI knows nothing about. The function's return value gets automatically converted to JSON for you.</p>`
  },
  {
    id: 228,
    title: "Path and Query Parameters",
    difficulty: "easy",
    topic: "Web APIs",
    level: 6,
    xp: 10,
    instructions: `<p>A route can capture part of the URL as a variable. <code>{item_id}</code> in the path becomes a real parameter in your function. FastAPI reads it straight out of the URL and converts it to whatever type you annotate.</p>
<ul>
  <li><strong>Query parameter:</strong> a function parameter not present in the URL path becomes an optional <code>?key=value</code> parameter instead, like <code>/search?q=apple</code>.</li>
</ul>
<p class="blueprint-line"><code>@app.get("/items/{item_id}")</code><br><code>async def handler(item_id: int, q: str = None): ...</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
# GET /items/5?q=blue -> {"item_id": 5, "q": "blue"}</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Add a <code>GET</code> route <code>/users/{user_id}</code> that takes <code>user_id</code> (an <code>int</code>) from the path and an optional query parameter <code>active</code> (a <code>bool</code>, default <code>True</code>), returning both as a dict.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">GET /users/7?active=false</span><code class="io-val">{"user_id": 7, "active": false}</code></div>
</div>`,
    hints: [
      "@app.get(\"/users/{user_id}\")",
      "async def get_user(user_id: int, active: bool = True):",
      "    return {\"user_id\": user_id, \"active\": active}"
    ],
    starterCode: 'from fastapi import FastAPI\n\napp = FastAPI()\n# Add the /users/{user_id} route\n',
    solution: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/users/{user_id}")\nasync def get_user(user_id: int, active: bool = True):\n    return {"user_id": user_id, "active": active}',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "@app\\.get\\(\\s*[\"']\\/users\\/\\{user_id\\}[\"']\\s*\\)", message: "Add a GET route at /users/{user_id}." },
        { type: "matchesRegex", pattern: "user_id\\s*:\\s*int", message: "Type-hint user_id as int." },
        { type: "matchesRegex", pattern: "active\\s*:\\s*bool\\s*=\\s*True", message: "Type-hint active as bool with a default of True." }
      ]
    },
    explanation: `<p>FastAPI decides path vs. query parameter purely from whether the name appears in <code>{}</code> in the path string. Everything else in the function signature that isn't in the path becomes a query parameter automatically.</p>`
  },
  {
    id: 229,
    title: "Request Bodies with Pydantic",
    difficulty: "medium",
    topic: "Web APIs",
    level: 6,
    xp: 15,
    instructions: `<p>GET requests read data from the URL; <code>POST</code> requests usually carry data in the request body, as JSON. A <strong>Pydantic model</strong> describes the exact shape that JSON should have. FastAPI parses the incoming body into it automatically, and rejects the request before your function even runs if the data doesn't match.</p>
<ul>
  <li><strong>BaseModel:</strong> the Pydantic class you inherit from to define a data shape. Each attribute becomes a required field with a type.</li>
</ul>
<p class="blueprint-line"><code>class Model(BaseModel):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;field: type</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float

@app.post("/items")
async def create_item(item: Item):
    return {"created": item.name}</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a Pydantic model <code>Transaction</code> with fields <code>sender: str</code>, <code>recipient: str</code>, and <code>amount: float</code>. Add a <code>POST</code> route <code>/transactions</code> that accepts a <code>Transaction</code> and returns <code>{"received": True}</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">POST /transactions body</span><code class="io-val">{"sender": "Alice", "recipient": "Bob", "amount": 10.0}</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">{"received": true}</code></div>
</div>`,
    hints: [
      "from pydantic import BaseModel",
      "class Transaction(BaseModel):",
      "    sender: str",
      "    recipient: str",
      "    amount: float",
      "@app.post(\"/transactions\")\nasync def create_transaction(tx: Transaction):\n    return {\"received\": True}"
    ],
    starterCode: 'from fastapi import FastAPI\n\napp = FastAPI()\n# Define Transaction and add the POST /transactions route\n',
    solution: 'from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Transaction(BaseModel):\n    sender: str\n    recipient: str\n    amount: float\n\n@app.post("/transactions")\nasync def create_transaction(tx: Transaction):\n    return {"received": True}',
    validation: {
      checks: [
        { type: "hasImport", module: "pydantic", message: "Import BaseModel from pydantic." },
        { type: "hasClass", name: "Transaction", message: "Define a class named Transaction." },
        { type: "matchesRegex", pattern: "class\\s+Transaction\\s*\\(\\s*BaseModel\\s*\\)", message: "Transaction should inherit from BaseModel." },
        { type: "matchesRegex", pattern: "@app\\.post\\(\\s*[\"']\\/transactions[\"']\\s*\\)", message: "Add a POST route at /transactions." }
      ]
    },
    explanation: `<p>The type annotation on the route parameter (<code>tx: Transaction</code>) is what tells FastAPI to parse the request body as JSON and validate it against that model, the same mechanism that makes path/query parameters work, applied to the body instead.</p>`
  },
  {
    id: 230,
    title: "Full CRUD with FastAPI",
    difficulty: "medium",
    topic: "Web APIs",
    level: 6,
    xp: 20,
    instructions: `<p><strong>CRUD</strong> (Create, Read, Update, Delete) is the standard shape of an API that manages a resource. Each operation maps to an HTTP method: <code>POST</code> creates, <code>GET</code> reads, <code>PUT</code> updates, <code>DELETE</code> removes. Same URL, different verb, different action.</p>
<p class="blueprint-line"><code>@app.get/post/put/delete("/resource/{id}")</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>notes = {}

@app.put("/notes/{note_id}")
async def update_note(note_id: int, text: str):
    notes[note_id] = text
    return {"updated": note_id}

@app.delete("/notes/{note_id}")
async def delete_note(note_id: int):
    del notes[note_id]
    return {"deleted": note_id}</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>A dict standing in for a real database is fine here; Level 6 covers a real one (SQLAlchemy) shortly.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Using a module-level dict <code>ledger = {}</code>, add four routes on <code>/balances/{account}</code>: <code>POST</code> sets the balance to a given <code>amount: float</code>, <code>GET</code> returns it, <code>PUT</code> updates it to a new <code>amount: float</code>, and <code>DELETE</code> removes the account, each returning <code>{"account": account}</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">POST /balances/alice?amount=100</span><code class="io-val">{"account": "alice"}</code></div>
</div>`,
    hints: [
      "ledger = {}",
      "@app.post(\"/balances/{account}\")\nasync def set_balance(account: str, amount: float):\n    ledger[account] = amount\n    return {\"account\": account}",
      "Repeat the same shape for @app.get, @app.put, and @app.delete on the same path.",
      "@app.delete(\"/balances/{account}\")\nasync def remove_balance(account: str):\n    del ledger[account]\n    return {\"account\": account}"
    ],
    starterCode: 'from fastapi import FastAPI\n\napp = FastAPI()\nledger = {}\n# Add POST, GET, PUT, DELETE routes on /balances/{account}\n',
    solution: 'from fastapi import FastAPI\n\napp = FastAPI()\nledger = {}\n\n@app.post("/balances/{account}")\nasync def set_balance(account: str, amount: float):\n    ledger[account] = amount\n    return {"account": account}\n\n@app.get("/balances/{account}")\nasync def get_balance(account: str):\n    return {"account": account, "amount": ledger.get(account)}\n\n@app.put("/balances/{account}")\nasync def update_balance(account: str, amount: float):\n    ledger[account] = amount\n    return {"account": account}\n\n@app.delete("/balances/{account}")\nasync def remove_balance(account: str):\n    del ledger[account]\n    return {"account": account}',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "@app\\.post\\(\\s*[\"']\\/balances\\/\\{account\\}[\"']\\s*\\)", message: "Add a POST route on /balances/{account}." },
        { type: "matchesRegex", pattern: "@app\\.get\\(\\s*[\"']\\/balances\\/\\{account\\}[\"']\\s*\\)", message: "Add a GET route on /balances/{account}." },
        { type: "matchesRegex", pattern: "@app\\.put\\(\\s*[\"']\\/balances\\/\\{account\\}[\"']\\s*\\)", message: "Add a PUT route on /balances/{account}." },
        { type: "matchesRegex", pattern: "@app\\.delete\\(\\s*[\"']\\/balances\\/\\{account\\}[\"']\\s*\\)", message: "Add a DELETE route on /balances/{account}." }
      ]
    },
    explanation: `<p>This exact pattern (one resource, four verbs) is the backbone of most real APIs, including the ones that sit in front of real blockchains: a wallet balance, an NFT record, a transaction log, all managed through the same GET/POST/PUT/DELETE shape.</p>`
  },
  {
    id: 231,
    title: "Automatic Validation with Pydantic",
    difficulty: "medium",
    topic: "Web APIs",
    level: 6,
    xp: 15,
    instructions: `<p>A plain type hint like <code>amount: float</code> only checks the type. <strong>Pydantic's <code>Field()</code></strong> adds real constraints (minimum values, string length, patterns) so malformed data gets rejected automatically before it ever reaches your ledger.</p>
<ul>
  <li><strong>Field constraint:</strong> a rule attached to a model field (like <code>gt=0</code>, "greater than zero") that Pydantic enforces on every request, not something you check by hand.</li>
</ul>
<p class="blueprint-line"><code>field: type = Field(gt=0)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>from pydantic import BaseModel, Field

class Order(BaseModel):
    quantity: int = Field(gt=0)
    symbol: str = Field(min_length=1, max_length=5)</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a Pydantic model <code>Transfer</code> with <code>amount: float</code> constrained to be greater than <code>0</code> (using <code>Field(gt=0)</code>), and <code>to_address: str</code> constrained to a minimum length of <code>1</code> and maximum length of <code>42</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">amount = -5</code></div>
  <div class="io-row"><span class="io-key">Result</span><code class="io-val">request rejected automatically: amount must be greater than 0</code></div>
</div>`,
    hints: [
      "from pydantic import BaseModel, Field",
      "class Transfer(BaseModel):",
      "    amount: float = Field(gt=0)",
      "    to_address: str = Field(min_length=1, max_length=42)"
    ],
    starterCode: "# Define Transfer with constrained fields\n",
    solution: 'from pydantic import BaseModel, Field\n\nclass Transfer(BaseModel):\n    amount: float = Field(gt=0)\n    to_address: str = Field(min_length=1, max_length=42)',
    validation: {
      checks: [
        { type: "hasImport", module: "pydantic", message: "Import BaseModel and Field from pydantic." },
        { type: "matchesRegex", pattern: "amount\\s*:\\s*float\\s*=\\s*Field\\(\\s*gt\\s*=\\s*0\\s*\\)", message: "Constrain amount with Field(gt=0)." },
        { type: "matchesRegex", pattern: "to_address\\s*:\\s*str\\s*=\\s*Field\\(\\s*min_length\\s*=\\s*1\\s*,\\s*max_length\\s*=\\s*42\\s*\\)", message: "Constrain to_address with Field(min_length=1, max_length=42)." }
      ]
    },
    explanation: `<p>42 isn't arbitrary here. It's the exact character length of a real Ethereum address (<code>0x</code> plus 40 hex characters). Constraints like this are how a real API catches "someone pasted a broken address" before it ever touches actual logic.</p>`
  },
  {
    id: 232,
    title: "Why Async Matters for APIs",
    difficulty: "easy",
    topic: "Web APIs",
    level: 6,
    xp: 10,
    instructions: `<p>You've already used <code>async</code>/<code>await</code> in Level 4. Here's why API frameworks are built around it: while one request is waiting on something slow (a database query, a call to another service), an async server can start handling a different request instead of just sitting idle. A <code>def</code> route blocks; an <code>async def</code> route can yield control while it waits.</p>
<ul>
  <li><strong>Blocking:</strong> code that makes the whole program wait, doing nothing else, until a slow operation finishes.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>@app.get("/slow")
async def slow_route():
    await some_slow_database_call()
    return {"done": True}
# other requests keep being handled while this one awaits</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>This is also why every FastAPI route in this level is written as async def, not plain def; it's the pattern real FastAPI code uses.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Convert this blocking route into a non-blocking one: change <code>def check_status()</code> to <code>async def check_status()</code>, and change the call to <code>slow_check()</code> into <code>await slow_check()</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Before</span><code class="io-val">def check_status(): result = slow_check()</code></div>
  <div class="io-row"><span class="io-key">After</span><code class="io-val">async def check_status(): result = await slow_check()</code></div>
</div>`,
    hints: [
      "async def check_status():",
      "    result = await slow_check()",
      "    return result"
    ],
    starterCode: "def check_status():\n    result = slow_check()\n    return result\n",
    solution: "async def check_status():\n    result = await slow_check()\n    return result",
    validation: {
      checks: [
        { type: "hasAsync", message: "Define check_status as an async function." },
        { type: "hasAwait", message: "Use await when calling slow_check()." }
      ]
    },
    explanation: `<p>Forgetting <code>await</code> in front of an async call is a common slip. Without it, you get the coroutine object itself, not its result, and it silently never actually runs.</p>`
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
    instructions: `<p>Level 5's "Signing Transactions" challenge used <code>hmac</code> as a stand-in for real signatures, and said outright that real systems use <strong>asymmetric cryptography</strong> instead: a private key that only you hold, and a matching public key anyone can use to verify what you signed, without ever needing your private key. This challenge is the real thing, using <code>PyNaCl</code>, a well-established Python cryptography library.</p>
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
    id: 235,
    title: "Modeling Data with an ORM",
    difficulty: "medium",
    topic: "Data Persistence",
    level: 6,
    xp: 15,
    instructions: `<p>An <strong>ORM</strong> (object-relational mapper) lets you define a database table as a Python class instead of writing raw SQL. <code>SQLAlchemy</code> is the standard one: each class attribute becomes a column, each instance becomes a row, and queries read like Python instead of SQL strings.</p>
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
    instructions: `<p>Most apps store state directly: a balance is a number in a row, and updating it overwrites that number. <strong>Event sourcing</strong> does something different: instead of storing the current state, you store every event that ever changed it, in order, and the current state is just whatever you get from replaying them. This is exactly the shape of the blockchain you already built in Level 5. It never overwrites a block, it only ever appends a new one.</p>
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
    id: 237,
    title: "Managing Dependencies with Poetry",
    difficulty: "easy",
    topic: "Tooling",
    level: 6,
    xp: 10,
    instructions: `<p><strong>Poetry</strong> manages a Python project's dependencies and virtual environment together, tracked in a <code>pyproject.toml</code> file instead of a loose <code>requirements.txt</code>. It records the exact versions everyone on a project uses, which matters a lot in open-source work where you can't just assume everyone's environment matches.</p>
<ul>
  <li><strong>Version constraint:</strong> <code>^0.100.0</code> means "this version or any later compatible one," not an exact pin. Poetry resolves the real version from that range.</li>
</ul>
<p class="blueprint-line"><code>[tool.poetry.dependencies]</code><br><code>package = "^X.Y.Z"</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>[tool.poetry.dependencies]
python = "^3.11"
fastapi = "^0.100.0"
sqlalchemy = "^2.0.0"</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>In your own project, <code>poetry init</code> creates this file, and <code>poetry add fastapi</code> adds a line like this one for you.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Write the <code>pyproject.toml</code> dependency block for a project using Python <code>^3.11</code>, <code>fastapi</code> <code>^0.100.0</code>, and <code>pynacl</code> <code>^1.5.0</code>, as a multi-line string assigned to a variable named <code>deps</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">deps</span><code class="io-val">"[tool.poetry.dependencies]\\npython = \\"^3.11\\"\\n..."</code></div>
</div>`,
    hints: [
      'deps = """[tool.poetry.dependencies]',
      'python = "^3.11"',
      'fastapi = "^0.100.0"',
      'pynacl = "^1.5.0"',
      '"""'
    ],
    starterCode: "# Assign the pyproject.toml dependency block to deps\n",
    solution: 'deps = """[tool.poetry.dependencies]\npython = "^3.11"\nfastapi = "^0.100.0"\npynacl = "^1.5.0"\n"""',
    validation: {
      checks: [
        { type: "codeContains", value: "[tool.poetry.dependencies]", message: "Include the [tool.poetry.dependencies] section header." },
        { type: "matchesRegex", pattern: "python\\s*=\\s*[\"']\\^3\\.11[\"']", message: "Pin python to ^3.11." },
        { type: "matchesRegex", pattern: "fastapi\\s*=\\s*[\"']\\^0\\.100\\.0[\"']", message: "Pin fastapi to ^0.100.0." },
        { type: "matchesRegex", pattern: "pynacl\\s*=\\s*[\"']\\^1\\.5\\.0[\"']", message: "Pin pynacl to ^1.5.0." }
      ]
    },
    explanation: `<p>Committing a <code>pyproject.toml</code> (and its lockfile) is what lets anyone clone an open-source repo and run <code>poetry install</code> to get the exact same working environment you have: no "works on my machine" surprises.</p>`
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
  <li><strong>Gas:</strong> a fee, paid in the chain's own currency, that scales with how much computation a transaction actually does. It's what stops someone from writing an infinite loop and grinding the network to a halt for free.</li>
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
  <li><strong>State variable:</strong> a contract-level variable, declared once at the top with a type, that persists on-chain between calls, the contract's permanent storage.</li>
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
  <span>This is Vyper source, not Python; it can't be run or graded by this sandbox at all. You're typing it to build reading familiarity, matched purely on the text.</span>
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
    id: 241,
    title: "Guided Project: Build a Blockchain From Scratch",
    kind: "project",
    difficulty: "hard",
    topic: "Capstone",
    level: 6,
    xp: 40,
    instructions: `<p>This is a synthesis, not a new lesson: everything here (hashing, chaining blocks together, validating the chain) is exactly what you already built piece by piece across Level 5. The point of this project is assembling it from memory into one compact, working system, since that's the version you'll actually build on top of in the next two projects.</p>
<p class="blueprint-line"><code>class Block: hash, previous_hash</code><br><code>class Blockchain: chain, add_block(), is_valid()</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>chain = Blockchain()
chain.add_block("Pay Alice 10 coins")
chain.add_block("Pay Bob 5 coins")
print(chain.is_valid())  # Output: True</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Write a <code>Block</code> class (<code>index</code>, <code>data</code>, <code>previous_hash</code>, and a computed <code>hash</code> using SHA-256 over those three fields) and a <code>Blockchain</code> class with <code>add_block(data)</code> (appends a new block linked to the last one) and <code>is_valid()</code> (returns <code>True</code> only if every block's hash is correct and every <code>previous_hash</code> matches). Start the chain with a genesis block (<code>index=0</code>, <code>data="Genesis"</code>, <code>previous_hash="0"</code>).</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">chain.add_block("Pay Alice 10 coins")</code></div>
  <div class="io-row"><span class="io-key">chain.is_valid()</span><code class="io-val">True</code></div>
</div>`,
    hints: [
      "class Block:\n    def __init__(self, index, data, previous_hash):\n        self.index = index\n        self.data = data\n        self.previous_hash = previous_hash\n        self.hash = self.compute_hash()",
      "    def compute_hash(self):\n        import hashlib\n        return hashlib.sha256(f\"{self.index}{self.data}{self.previous_hash}\".encode()).hexdigest()",
      "class Blockchain:\n    def __init__(self):\n        self.chain = [Block(0, \"Genesis\", \"0\")]",
      "    def add_block(self, data):\n        prev = self.chain[-1]\n        self.chain.append(Block(prev.index + 1, data, prev.hash))",
      "    def is_valid(self):\n        for i in range(len(self.chain)):\n            b = self.chain[i]\n            if b.hash != b.compute_hash():\n                return False\n            if i > 0 and b.previous_hash != self.chain[i-1].hash:\n                return False\n        return True"
    ],
    starterCode: "import hashlib\n\nclass Block:\n    # index, data, previous_hash, computed hash\n    pass\n\nclass Blockchain:\n    # chain (starting with a genesis block), add_block(), is_valid()\n    pass\n",
    solution: 'import hashlib\n\nclass Block:\n    def __init__(self, index, data, previous_hash):\n        self.index = index\n        self.data = data\n        self.previous_hash = previous_hash\n        self.hash = self.compute_hash()\n\n    def compute_hash(self):\n        contents = f"{self.index}{self.data}{self.previous_hash}"\n        return hashlib.sha256(contents.encode()).hexdigest()\n\nclass Blockchain:\n    def __init__(self):\n        self.chain = [Block(0, "Genesis", "0")]\n\n    def add_block(self, data):\n        prev = self.chain[-1]\n        self.chain.append(Block(prev.index + 1, data, prev.hash))\n\n    def is_valid(self):\n        for i in range(len(self.chain)):\n            block = self.chain[i]\n            if block.hash != block.compute_hash():\n                return False\n            if i > 0 and block.previous_hash != self.chain[i - 1].hash:\n                return False\n        return True',
    validation: {
      checks: [
        { type: "hasClass", name: "Block", message: "Define a Block class." },
        { type: "hasClass", name: "Blockchain", message: "Define a Blockchain class." },
        { type: "matchesRegex", pattern: "hashlib\\.sha256\\(", message: "Compute each block's hash with hashlib.sha256()." },
        { type: "matchesRegex", pattern: "def\\s+add_block", message: "Define add_block()." },
        { type: "matchesRegex", pattern: "def\\s+is_valid", message: "Define is_valid()." }
      ],
      pyTests: [
        { code: "chain = Blockchain()\nchain.add_block('Pay Alice 10 coins')\nchain.add_block('Pay Bob 5 coins')\nassert chain.is_valid() == True", message: "A freshly built chain should be valid." },
        { code: "chain = Blockchain()\nchain.add_block('Pay Alice 10 coins')\nchain.chain[1].data = 'Pay Alice 999 coins'\nassert chain.is_valid() == False", message: "Tampering with a block's data without recomputing its hash should invalidate the chain." },
        { code: "chain = Blockchain()\nassert chain.chain[0].data == 'Genesis' and chain.chain[0].previous_hash == '0'", message: "The chain should start with a genesis block." }
      ]
    },
    explanation: `<p>This is the same shape as everything Level 5 built, just assembled into two classes instead of spread across many challenges. Real projects almost always structure it this way: one class per concept, not one long script.</p>`
  },
  {
    id: 242,
    title: "Guided Project: Wrap It in a REST API",
    kind: "project",
    difficulty: "hard",
    topic: "Capstone",
    level: 6,
    xp: 40,
    instructions: `<p>This combines two things you just built separately: the <code>Blockchain</code> class from the last project, and the FastAPI CRUD patterns from earlier in this level. Nothing new is being taught here. This is wiring the two together, which is exactly what a real project's API layer does: expose an internal system's data and actions over HTTP.</p>
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
    instructions: `<p>The final piece: extending the chain-backed API from the last project into something with a real purpose, a simplified stablecoin ledger. Every balance change gets recorded as a block (the event-sourcing idea from earlier in this level), so the full transaction history is always auditable from the chain itself, not just a single current-balance number.</p>
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
  }
];
