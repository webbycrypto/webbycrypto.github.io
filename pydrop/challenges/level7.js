// Level 7
// Generated Solidity challenges - graded by static text checks only (no EVM in-browser).
window.LEVEL7 = [
  {
    "id": 300,
    "title": "Welcome to Level 7: Writing Smart Contracts",
    "kind": "intro",
    "topic": "Introduction",
    "level": 7,
    "instructions": "<p>Levels 5 and 6 built a blockchain from the inside in Python (blocks, hashes, a mempool, signatures, a network of nodes) to understand how one actually works. Level 7 crosses to the other side: writing the programs that run <em>on</em> a chain. These are <strong>smart contracts</strong>, and the language is <strong>Solidity</strong>. This level is the language itself. By the end you will be able to lay out a contract, choose the right types, hold state on-chain, guard functions, emit events, pull in code through inheritance and interfaces, and call other contracts. Tokens, ether, and on-chain cryptography come in Level 8; attacks and defences in Level 9. Solidity is a real, statically typed, compiled language with its own rules, not Python with new keywords, and a few habits that were harmless in Python (an unchecked copy, updating state in the wrong order) are exactly how funds get drained later.</p>\n<p>This sandbox cannot check any of that for you. It has no Solidity compiler and no EVM, so every challenge is graded by matching the <em>text</em> of your answer against a set of patterns, which is enough to drill syntax and vocabulary and nothing more. The real workflow has two steps: write and read the code here until it makes sense, then paste it into <code>remix.ethereum.org</code>, a complete Solidity IDE that runs in the browser with nothing to install, compile it, deploy it to the in-browser VM, and click the functions to watch what they really do. Later you will move to <strong>Foundry</strong> for command-line testing. Treat every challenge in this level as step one of two; step two, in Remix, is where the behaviour is actually verified.</p>",
    "starterCode": ""
  },
  {
    "id": 301,
    "title": "The Shape of a Contract",
    "difficulty": "easy",
    "topic": "Contract Basics",
    "level": 7,
    "xp": 10,
    "instructions": "<p>Every Solidity source file starts the same way: a license comment the compiler expects, then a <code>pragma</code> line that pins which compiler versions may build it. After that you open a <code>contract</code> block, which behaves a lot like a <code>class</code>, it wraps up some data and the functions that work on it. A variable declared straight inside the contract is a <strong>state variable</strong>: it lives on-chain and keeps its value between calls. Level 5's <code>Block</code> dataclass held its fields only for the length of one Python run; a state variable is that same slot, except it sits on a live network for as long as the contract exists, which is why writing to one costs gas.</p>\n<ul>\n  <li><strong>SPDX line:</strong> the <code>// SPDX-License-Identifier: MIT</code> comment at the top. It is metadata for tooling, not code, but the compiler warns without it.</li>\n  <li><strong>pragma:</strong> a version constraint, not an import. <code>^0.8.20</code> means &ldquo;any 0.8.x at or above 0.8.20, but not 0.9&rdquo;. It ships no code of its own.</li>\n  <li><strong>state variable:</strong> a variable declared directly in the contract body, stored permanently on-chain. Marking it <code>public</code> tells the compiler to also generate a getter function with the same name, so outside callers can read it for free.</li>\n</ul>\n<p class=\"blueprint-line\"><code>// SPDX-License-Identifier: MIT</code><br><code>pragma solidity ^0.8.20;</code><br><code>contract Name {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;uint256 public varName;</code><br><code>}</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Greeter {\n    string public greeting;   // readable for free via greeting()\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Nothing here is compiled, the editor is doing a text match, not a build. Once the skeleton looks right, drop it into <code>remix.ethereum.org</code>, press Compile, deploy to the in-browser JavaScript VM, and click the auto-generated <code>value()</code> button. That round trip is the part that teaches.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Box</code>. Give it one state variable, <code>value</code>, of type <code>uint256</code>, marked <code>public</code> so the compiler generates the <code>value()</code> getter for you. Do not write a getter yourself.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">value()</span><code class=\"io-val\">0</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Box {",
      "    uint256 public value;",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare a contract named Box with one public uint256 state variable\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Box {\n    uint256 public value;\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start the file with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Box\\s*\\{",
          "message": "Define a contract named Box: contract Box { ... }"
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+value\\s*;",
          "message": "Declare a public state variable: uint256 public value;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Box\\s*\\{[\\s\\S]*uint256\\s+public\\s+value\\s*;[\\s\\S]*\\}",
          "message": "Put the value declaration inside the Box contract body."
        }
      ]
    },
    "explanation": "<p>You never wrote a <code>value()</code> function, yet callers can read <code>value</code> the moment the contract is deployed, the <code>public</code> keyword told the compiler to emit that getter. This is the smallest contract that still does something observable, and every contract in this level is a variation on it: state at the top, functions that read and write that state below.</p>"
  },
  {
    "id": 302,
    "title": "Your First Contract: State and a Constructor",
    "difficulty": "easy",
    "topic": "Contract Basics",
    "level": 7,
    "xp": 10,
    "instructions": "<p>A Solidity file opens with two lines of bookkeeping: an <code>SPDX-License-Identifier</code> comment, and a <code>pragma</code> that pins which compiler versions may build the file. After that comes a <code>contract</code> block, which works much like a <code>class</code>: it groups state and the functions that act on it. Variables declared at the top of the contract are <strong>state variables</strong>, they live on-chain and keep their values between calls, so they are the contract's permanent storage. Level 5's <code>Block</code> dataclass held its fields in memory for the length of one script run; a state variable is the same idea, except it is stored on a live network indefinitely, which is why writing to one costs gas every time.</p>\n<ul>\n  <li><strong>pragma:</strong> a version constraint, not an import. <code>^0.8.20</code> means \"any 0.8.x from 0.8.20 up, but not 0.9\". It controls how the file is compiled and ships no code itself.</li>\n  <li><strong>state variable:</strong> a variable declared directly inside the contract. Marking it <code>public</code> makes the compiler generate a free getter function with the same name, on top of storing the value.</li>\n  <li><strong>constructor:</strong> a function that runs exactly once, at deployment, and never again. It is where you set values that depend on who deployed the contract or on deploy-time arguments.</li>\n</ul>\n<p class=\"blueprint-line\"><code>// SPDX-License-Identifier: MIT</code><br><code>pragma solidity ^0.8.20;</code><br><code>contract Name {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;type public varName;</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;constructor() { ... }</code><br><code>}</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Counter {\n    uint256 public count;      // starts at 0, readable for free via count()\n    address public deployer;\n\n    constructor() {\n        deployer = msg.sender; // the account that sent the deploy transaction\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The PyDrop editor checks this as text, it cannot compile Solidity or run the EVM. Paste every contract you write here into <code>remix.ethereum.org</code> (nothing to install), compile it, deploy it to the in-browser VM, and click the functions. That step is where the real learning happens; treat the checks here as a syntax spotter, not a test suite.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Treasury</code>. Give it a <code>public</code> state variable <code>owner</code> of type <code>address</code>, and a <code>public</code> state variable <code>totalDeposits</code> of type <code>uint256</code>. Add a <code>constructor</code> that sets <code>owner</code> to <code>msg.sender</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">owner()</span><code class=\"io-val\">the address that deployed the contract</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">totalDeposits()</span><code class=\"io-val\">0</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Treasury {",
      "    address public owner;",
      "    uint256 public totalDeposits;",
      "",
      "    constructor() {",
      "        owner = msg.sender;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare the Treasury contract below\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Treasury {\n    address public owner;\n    uint256 public totalDeposits;\n\n    constructor() {\n        owner = msg.sender;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Treasury\\s*\\{",
          "message": "Define a contract named Treasury."
        },
        {
          "type": "matchesRegex",
          "pattern": "address\\s+public\\s+owner\\s*;",
          "message": "Declare: address public owner;"
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+totalDeposits\\s*;",
          "message": "Declare: uint256 public totalDeposits;"
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*\\)\\s*\\{",
          "message": "Add a constructor() { ... }."
        },
        {
          "type": "matchesRegex",
          "pattern": "owner\\s*=\\s*msg\\.sender\\s*;",
          "message": "Set owner = msg.sender; inside the constructor."
        }
      ]
    },
    "explanation": "<p>Because the <code>constructor</code> only runs at deployment, <code>owner</code> is fixed the moment the contract goes live and cannot be reset by calling it again, there is no function to call. The <code>public</code> keyword on each variable saved you writing <code>owner()</code> and <code>totalDeposits()</code> getters by hand; the compiler emitted them. Every access-control check you write later in this level leans on this pattern: capture <code>msg.sender</code> at deploy, compare against it afterward.</p>"
  },
  {
    "id": 303,
    "title": "A Constructor That Takes Arguments",
    "difficulty": "easy",
    "topic": "Contract Basics",
    "level": 7,
    "xp": 10,
    "instructions": "<p>The <code>constructor</code> runs exactly once, at deployment, and then never again, it is the contract's setup routine. In the previous challenge the contract had no constructor at all, so its state started at each type's zero value. More often you want to hand the contract some settings at deploy time: a name, a starting supply, an owner. A constructor with parameters lets the deploy transaction carry those values in, the same way filling out a form when you open a bank account seeds the account before anyone touches it. Level 6's mempool challenge showed a transaction carrying a payload; the deploy transaction's payload is where these constructor arguments ride along.</p>\n<ul>\n  <li><strong>constructor parameters:</strong> inputs listed in <code>constructor(...)</code>, supplied once when the contract is deployed and not kept unless you assign them to state.</li>\n  <li><strong>string memory:</strong> a <code>string</code> parameter has to say where it lives; <code>memory</code> means a temporary copy for the length of the call. Data locations get their own challenges later in this level.</li>\n  <li><strong>leading underscore:</strong> a common style for a parameter name (<code>_name</code>) so it does not collide with the state variable (<code>name</code>) it will be assigned into.</li>\n</ul>\n<p class=\"blueprint-line\"><code>constructor(string memory _name, uint256 _initialSupply) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;name = _name;</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;initialSupply = _initialSupply;</code><br><code>}</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>contract Account {\n    address public holder;\n    uint256 public openingBalance;\n\n    constructor(uint256 _openingBalance) {\n        holder = msg.sender;\n        openingBalance = _openingBalance;\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This box grades the characters you type; it has no Solidity compiler and no EVM behind it. Paste your contract into <code>remix.ethereum.org</code>, deploy it with a name and a supply typed into the constructor fields, and confirm the getters return exactly what you passed. Do that every time, it is how you find out what really happens.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>MiniToken</code> with a <code>public</code> state variable <code>name</code> of type <code>string</code> and a <code>public</code> state variable <code>initialSupply</code> of type <code>uint256</code>. Add a <code>constructor</code> that takes <code>string memory _name</code> and <code>uint256 _initialSupply</code> and assigns them to <code>name</code> and <code>initialSupply</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">deploy(\"Acme\", 1000000)</span><code class=\"io-val\">name() &rarr; \"Acme\", initialSupply() &rarr; 1000000</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract MiniToken {",
      "    string public name;",
      "    uint256 public initialSupply;",
      "",
      "    constructor(string memory _name, uint256 _initialSupply) {",
      "        name = _name;",
      "        initialSupply = _initialSupply;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare MiniToken with a constructor that takes _name and _initialSupply\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MiniToken {\n    string public name;\n    uint256 public initialSupply;\n\n    constructor(string memory _name, uint256 _initialSupply) {\n        name = _name;\n        initialSupply = _initialSupply;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+MiniToken\\s*\\{",
          "message": "Define a contract named MiniToken."
        },
        {
          "type": "matchesRegex",
          "pattern": "string\\s+public\\s+name\\s*;",
          "message": "Declare: string public name;"
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+initialSupply\\s*;",
          "message": "Declare: uint256 public initialSupply;"
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*string\\s+memory\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s*\\{",
          "message": "constructor must take (string memory _name, uint256 _initialSupply)."
        },
        {
          "type": "matchesRegex",
          "pattern": "name\\s*=\\s*\\w+\\s*;",
          "message": "Assign the string parameter: name = _name;"
        },
        {
          "type": "matchesRegex",
          "pattern": "initialSupply\\s*=\\s*\\w+\\s*;",
          "message": "Assign the uint256 parameter: initialSupply = _initialSupply;"
        }
      ]
    },
    "explanation": "<p>Because the constructor only fires at deployment, <code>name</code> and <code>initialSupply</code> are fixed from the first block the contract exists in, there is no setter, so nothing changes them later unless you write one. Every ERC-20 token you meet later in this level is deployed exactly like this: a name, a symbol, and a supply handed straight into the constructor.</p>"
  },
  {
    "id": 304,
    "title": "Function Visibility: Four Doors",
    "difficulty": "medium",
    "topic": "Contract Basics",
    "level": 7,
    "xp": 15,
    "instructions": "<p>Every function in a contract carries a <strong>visibility</strong> keyword that decides who is allowed to call it. Picture a building: the lobby is open to anyone off the street, some corridors are staff-only, and one back office is for you alone. Getting this wrong is not a style nit, a function that should have been <code>internal</code> but was left <code>public</code> is an open door into your contract's state. Level 6's node challenges leaned on the idea that anything reachable over the network will eventually be poked by someone hostile; visibility is where you draw that line in code.</p>\n<ul>\n  <li><strong>public:</strong> callable from anywhere, other contracts, transactions, and from inside this contract.</li>\n  <li><strong>external:</strong> callable only from outside. Another function in the same contract can reach it only via <code>this.f()</code>, which is a real external call.</li>\n  <li><strong>internal:</strong> callable from inside this contract and any contract that inherits it. Not reachable from outside. This is the default for state variables.</li>\n  <li><strong>private:</strong> callable only from inside the exact contract that defines it, not even inheriting contracts. It is still visible on-chain, just not callable.</li>\n</ul>\n<p class=\"blueprint-line\"><code>function f() public { ... }</code><br><code>function g() external { ... }</code><br><code>function h() internal { ... }</code><br><code>function k() private { ... }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>contract Bank {\n    uint256 total;\n\n    function deposit() external payable { _record(msg.value); }\n    function _record(uint256 amount) internal { total += amount; }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Remember the editor only inspects text, it cannot enforce visibility or call anything. In <code>remix.ethereum.org</code> you will see it for real: <code>public</code> and <code>external</code> functions get buttons in the deployed panel, <code>internal</code> and <code>private</code> ones do not. Compile, deploy, and poke at it there.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Visibility</code> with four functions, each <code>pure</code> and returning a <code>uint256</code>: <code>publicValue()</code> marked <code>public</code>, <code>externalValue()</code> marked <code>external</code>, <code>internalValue()</code> marked <code>internal</code>, and <code>privateValue()</code> marked <code>private</code>. Have <code>publicValue()</code> return <code>internalValue() + privateValue()</code> to show those two are reachable from inside the contract.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">publicValue()</span><code class=\"io-val\">internalValue() + privateValue()</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">externalValue() from inside</span><code class=\"io-val\">only via this.externalValue()</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Visibility {",
      "    function publicValue() public pure returns (uint256) {",
      "        return internalValue() + privateValue();",
      "    }",
      "",
      "    function externalValue() external pure returns (uint256) {",
      "        return 2;",
      "    }",
      "",
      "    function internalValue() internal pure returns (uint256) {",
      "        return 3;",
      "    }",
      "",
      "    function privateValue() private pure returns (uint256) {",
      "        return 4;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare Visibility with one function of each visibility level\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Visibility {\n    function publicValue() public pure returns (uint256) {\n        return internalValue() + privateValue();\n    }\n\n    function externalValue() external pure returns (uint256) {\n        return 2;\n    }\n\n    function internalValue() internal pure returns (uint256) {\n        return 3;\n    }\n\n    function privateValue() private pure returns (uint256) {\n        return 4;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Visibility\\s*\\{",
          "message": "Define a contract named Visibility."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+publicValue\\s*\\(\\s*\\)\\s+public\\s+pure\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "publicValue() must be public pure returns (uint256)."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+externalValue\\s*\\(\\s*\\)\\s+external\\s+pure\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "externalValue() must be external pure returns (uint256)."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+internalValue\\s*\\(\\s*\\)\\s+internal\\s+pure\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "internalValue() must be internal pure returns (uint256)."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+privateValue\\s*\\(\\s*\\)\\s+private\\s+pure\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "privateValue() must be private pure returns (uint256)."
        },
        {
          "type": "matchesRegex",
          "pattern": "internalValue\\s*\\(\\s*\\)\\s*\\+\\s*privateValue\\s*\\(\\s*\\)",
          "message": "publicValue() should return internalValue() + privateValue()."
        }
      ]
    },
    "explanation": "<p><code>public</code> and <code>external</code> both expose a function to the outside world; the difference is that <code>external</code> refuses a plain internal call, which makes intent explicit and is marginally cheaper for large arguments. <code>internal</code> and <code>private</code> are your implementation details, the split between them matters the moment you use inheritance, coming up next in this level. Rule of thumb: start every function <code>private</code> or <code>internal</code> and widen only when something outside genuinely needs it.</p>"
  },
  {
    "id": 305,
    "title": "view, pure, and Functions That Change State",
    "difficulty": "easy",
    "topic": "Contract Basics",
    "level": 7,
    "xp": 10,
    "instructions": "<p>A function's <strong>state mutability</strong> keyword is a promise about how far it reaches into the contract's storage. <code>view</code> promises to read state but never write it. <code>pure</code> promises not to touch state at all (not even read it) working only from its arguments. A function with neither keyword is free to change state. The payoff: <code>view</code> and <code>pure</code> calls made from off-chain cost no gas and need no transaction, because nothing has to be recorded. It is the difference between reading a page of a ledger, doing sums on a scrap of paper, and writing a new line into the ledger. Level 6's mempool only ever held the third kind, the calls that change something.</p>\n<ul>\n  <li><strong>view:</strong> may read state variables and globals, may not assign to state. Free to call off-chain.</li>\n  <li><strong>pure:</strong> may not read or write state; only parameters and local variables. Also free off-chain.</li>\n  <li><strong>state-changing:</strong> no mutability keyword. Writing to a state variable requires a transaction and costs gas.</li>\n  <li><strong>returns:</strong> the clause that names a function's output type(s), written after the visibility and mutability keywords.</li>\n</ul>\n<p class=\"blueprint-line\"><code>function r() external view returns (uint256) { ... }</code><br><code>function p(uint256 x) external pure returns (uint256) { ... }</code><br><code>function w(uint256 x) external { ... }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>uint256 public score;\n\nfunction bump() external { score += 1; }                           // writes state\nfunction read() external view returns (uint256) { return score; }  // reads state\nfunction triple(uint256 n) external pure returns (uint256) { return n * 3; }  // neither</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The check here is a regex over your source, not a test run. To feel the difference between <code>view</code>, <code>pure</code>, and a writing function, compile this in <code>remix.ethereum.org</code>, deploy it, and watch which calls pop a transaction confirmation (state changes) and which return instantly (view and pure).</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Calculator</code> with a <code>public</code> <code>uint256</code> state variable <code>total</code>. Add <code>add(uint256 x)</code> marked <code>external</code> with no mutability keyword, which does <code>total += x;</code>. Add <code>getTotal()</code> marked <code>external view returns (uint256)</code> that returns <code>total</code>. Add <code>double(uint256 x)</code> marked <code>external pure returns (uint256)</code> that returns <code>x * 2</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">add(5) then getTotal()</span><code class=\"io-val\">5</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">double(21)</span><code class=\"io-val\">42</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Calculator {",
      "    uint256 public total;",
      "",
      "    function add(uint256 x) external {",
      "        total += x;",
      "    }",
      "",
      "    function getTotal() external view returns (uint256) {",
      "        return total;",
      "    }",
      "",
      "    function double(uint256 x) external pure returns (uint256) {",
      "        return x * 2;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare Calculator: a writing add(), a view getTotal(), a pure double()\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Calculator {\n    uint256 public total;\n\n    function add(uint256 x) external {\n        total += x;\n    }\n\n    function getTotal() external view returns (uint256) {\n        return total;\n    }\n\n    function double(uint256 x) external pure returns (uint256) {\n        return x * 2;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Calculator\\s*\\{",
          "message": "Define a contract named Calculator."
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+total\\s*;",
          "message": "Declare: uint256 public total;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+add\\s*\\(\\s*uint256\\s+\\w+\\s*\\)\\s+external\\s*\\{",
          "message": "add(uint256 x) must be external with NO view/pure keyword."
        },
        {
          "type": "matchesRegex",
          "pattern": "total\\s*\\+=\\s*\\w+\\s*;",
          "message": "add() should do total += x;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+getTotal\\s*\\(\\s*\\)\\s+external\\s+view\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "getTotal() must be external view returns (uint256)."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+double\\s*\\(\\s*uint256\\s+\\w+\\s*\\)\\s+external\\s+pure\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "double(uint256 x) must be external pure returns (uint256)."
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+\\w+\\s*\\*\\s*2\\s*;",
          "message": "double() should return x * 2;"
        }
      ]
    },
    "explanation": "<p>The compiler enforces these promises: put <code>score += 1</code> inside a <code>view</code> function and it will not build. That guarantee is what lets a front-end call <code>getTotal()</code> thousands of times for free while <code>add()</code> costs gas every time. When you design a contract, sort its functions into these three buckets early, it tells you exactly which calls users will pay for.</p>"
  },
  {
    "id": 306,
    "title": "The Value Types",
    "difficulty": "easy",
    "topic": "State & Types",
    "level": 7,
    "xp": 10,
    "instructions": "<p>Solidity's <strong>value types</strong> are the small, fixed-size building blocks that get copied whenever you assign or pass them. Unlike Python, where a number is an object that grows without limit, each of these occupies a set number of bytes and wraps a fixed range. They all start life at a zero value, <code>0</code>, <code>false</code>, the zero address, all-zero bytes, so a freshly declared variable is never undefined. Level 5's hashing work produced 32-byte digests; that is exactly what <code>bytes32</code> holds, which is why hashes and storage slots are passed around as <code>bytes32</code> all over Solidity.</p>\n<ul>\n  <li><strong>uint256:</strong> an unsigned integer, <code>0</code> to <code>2**256 - 1</code>. <code>uint</code> is an alias for it.</li>\n  <li><strong>int256:</strong> a signed integer. Use it only when values can genuinely go negative.</li>\n  <li><strong>address:</strong> a 20-byte account identifier, a wallet or a contract. <code>address payable</code> is the variant you can send ether to.</li>\n  <li><strong>bool:</strong> <code>true</code> or <code>false</code>.</li>\n  <li><strong>bytes32:</strong> exactly 32 raw bytes, fixed length. Ideal for hashes and short fixed tags; a short string literal like <code>\"v1\"</code> fits straight into one.</li>\n</ul>\n<p class=\"blueprint-line\"><code>uint256 public a = 1;</code><br><code>int256 public b = -1;</code><br><code>address public c = msg.sender;</code><br><code>bool public d = true;</code><br><code>bytes32 public e = \"tag\";</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>uint256 public maxSupply = 21000000;\nint256 public temperature = -40;\naddress public owner = msg.sender;\nbool public paused = false;\nbytes32 public version = \"1.0.0\";</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>As always, this pane only reads your text. Load the contract into <code>remix.ethereum.org</code>, deploy it, and click each generated getter to see the zero values and your initializers sitting on-chain. That is the only place the types are actually enforced.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Types</code> with five <code>public</code> state variables, each declared and initialised on one line: <code>uint256 count</code> set to <code>42</code>, <code>int256 balance</code> set to <code>-5</code>, <code>address owner</code> set to <code>msg.sender</code>, <code>bool active</code> set to <code>true</code>, and <code>bytes32 tag</code> set to <code>\"v1\"</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">count()</span><code class=\"io-val\">42</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">balance()</span><code class=\"io-val\">-5</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">tag()</span><code class=\"io-val\">0x7631...0000 (\"v1\", left-aligned)</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Types {",
      "    uint256 public count = 42;",
      "    int256 public balance = -5;",
      "    address public owner = msg.sender;",
      "    bool public active = true;",
      "    bytes32 public tag = \"v1\";",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare Types with one public state variable of each value type\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Types {\n    uint256 public count = 42;\n    int256 public balance = -5;\n    address public owner = msg.sender;\n    bool public active = true;\n    bytes32 public tag = \"v1\";\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Types\\s*\\{",
          "message": "Define a contract named Types."
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+count\\s*=\\s*42\\s*;",
          "message": "Declare: uint256 public count = 42;"
        },
        {
          "type": "matchesRegex",
          "pattern": "int256\\s+public\\s+balance\\s*=\\s*-\\s*5\\s*;",
          "message": "Declare: int256 public balance = -5;"
        },
        {
          "type": "matchesRegex",
          "pattern": "address\\s+public\\s+owner\\s*=\\s*msg\\.sender\\s*;",
          "message": "Declare: address public owner = msg.sender;"
        },
        {
          "type": "matchesRegex",
          "pattern": "bool\\s+public\\s+active\\s*=\\s*true\\s*;",
          "message": "Declare: bool public active = true;"
        },
        {
          "type": "matchesRegex",
          "pattern": "bytes32\\s+public\\s+tag\\s*=\\s*\"v1\"\\s*;",
          "message": "Declare: bytes32 public tag = \"v1\";"
        }
      ]
    },
    "explanation": "<p>Fixed sizes are why Solidity arithmetic can overflow in principle, though since 0.8.0 the compiler inserts a check and reverts instead of silently wrapping. Choosing the tightest type that fits is a storage-cost decision as much as a correctness one. Reach for <code>uint256</code> by default, <code>int256</code> only when negatives are real, and <code>bytes32</code> whenever you are carrying a hash from Level 5's world onto the chain.</p>"
  },
  {
    "id": 307,
    "title": "Mappings and Nested Mappings",
    "difficulty": "medium",
    "topic": "State & Types",
    "level": 7,
    "xp": 15,
    "instructions": "<p>A <strong>mapping</strong> is Solidity's key-value store, the on-chain cousin of a Python <code>dict</code>, with three catches: every possible key already &ldquo;exists&rdquo; and returns the value type's zero until you write to it, you cannot iterate it, and it has no length. It is the backbone of every token: a <code>mapping(address =&gt; uint256)</code> is a ledger of who holds how much. A <strong>nested mapping</strong> goes one level deeper, its value is itself a mapping. The ERC-20 <em>allowance</em> pattern is exactly this: <code>owner =&gt; spender =&gt; amount</code> records how much each spender may move on each owner's behalf. Under the hood a key is hashed to find its slot, the same keccak256 you used in Level 5.</p>\n<ul>\n  <li><strong>mapping(K =&gt; V):</strong> a hash table from key type <code>K</code> to value type <code>V</code>. Declared at contract level; it cannot be a local variable in memory.</li>\n  <li><strong>zero default:</strong> an unset key reads as <code>0</code> / <code>false</code> / the zero address, there is no &ldquo;key not found&rdquo;.</li>\n  <li><strong>nested mapping:</strong> <code>mapping(address =&gt; mapping(address =&gt; uint256))</code>, index it twice, <code>m[a][b]</code>, to reach the value.</li>\n  <li><strong>allowance:</strong> an amount one account has approved another account to spend out of its balance.</li>\n</ul>\n<p class=\"blueprint-line\"><code>mapping(address =&gt; uint256) public balanceOf;</code><br><code>mapping(address =&gt; mapping(address =&gt; uint256)) public allowance;</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>mapping(address => uint256) public balanceOf;\n\nfunction transfer(address to, uint256 amount) external {\n    balanceOf[msg.sender] -= amount;\n    balanceOf[to] += amount;\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>No compiler runs here, the grader is matching text. Take this to <code>remix.ethereum.org</code>, deploy, call <code>approve</code> from one account, then read <code>allowance</code> with both addresses and watch the nested lookup resolve. Seeing it beats reading about it.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Ledger</code> with a <code>mapping(address =&gt; uint256) public balanceOf</code> and a <code>mapping(address =&gt; mapping(address =&gt; uint256)) public allowance</code>. Add <code>credit(uint256 amount)</code> marked <code>external</code> that does <code>balanceOf[msg.sender] += amount;</code>. Add <code>approve(address spender, uint256 amount)</code> marked <code>external</code> that sets <code>allowance[msg.sender][spender] = amount;</code>. Add <code>allowanceOf(address owner, address spender)</code> marked <code>external view returns (uint256)</code> that returns <code>allowance[owner][spender]</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">credit(100) from A</span><code class=\"io-val\">balanceOf(A) &rarr; 100</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">approve(B, 30) from A</span><code class=\"io-val\">allowanceOf(A, B) &rarr; 30</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Ledger {",
      "    mapping(address => uint256) public balanceOf;",
      "    mapping(address => mapping(address => uint256)) public allowance;",
      "",
      "    function credit(uint256 amount) external {",
      "        balanceOf[msg.sender] += amount;",
      "    }",
      "",
      "    function approve(address spender, uint256 amount) external {",
      "        allowance[msg.sender][spender] = amount;",
      "    }",
      "",
      "    function allowanceOf(address owner, address spender) external view returns (uint256) {",
      "        return allowance[owner][spender];",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare Ledger with a balance mapping and a nested allowance mapping\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Ledger {\n    mapping(address => uint256) public balanceOf;\n    mapping(address => mapping(address => uint256)) public allowance;\n\n    function credit(uint256 amount) external {\n        balanceOf[msg.sender] += amount;\n    }\n\n    function approve(address spender, uint256 amount) external {\n        allowance[msg.sender][spender] = amount;\n    }\n\n    function allowanceOf(address owner, address spender) external view returns (uint256) {\n        return allowance[owner][spender];\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Ledger\\s*\\{",
          "message": "Define a contract named Ledger."
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*public\\s+balanceOf\\s*;",
          "message": "Declare: mapping(address => uint256) public balanceOf;"
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*address\\s*=>\\s*mapping\\s*\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*\\)\\s*public\\s+allowance\\s*;",
          "message": "Declare: mapping(address => mapping(address => uint256)) public allowance;"
        },
        {
          "type": "matchesRegex",
          "pattern": "balanceOf\\[\\s*msg\\.sender\\s*\\]\\s*\\+=\\s*\\w+\\s*;",
          "message": "credit() should do balanceOf[msg.sender] += amount;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+approve\\s*\\(\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external",
          "message": "Define approve(address spender, uint256 amount) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "allowance\\[\\s*msg\\.sender\\s*\\]\\s*\\[\\s*\\w+\\s*\\]\\s*=\\s*\\w+\\s*;",
          "message": "approve() should set allowance[msg.sender][spender] = amount;"
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+allowance\\s*\\[\\s*\\w+\\s*\\]\\s*\\[\\s*\\w+\\s*\\]\\s*;",
          "message": "allowanceOf() should return allowance[owner][spender];"
        }
      ]
    },
    "explanation": "<p>Nesting mappings is how a contract expresses a relation with two subjects, here, a permission that depends on both the owner and the spender. You will rebuild this exact <code>allowance</code> structure when you write a full ERC-20 later in this level; <code>approve</code> plus <code>transferFrom</code> is what lets an exchange or a router move your tokens without ever touching your keys.</p>"
  },
  {
    "id": 308,
    "title": "Structs: Bundling Fields Together",
    "difficulty": "easy",
    "topic": "State & Types",
    "level": 7,
    "xp": 10,
    "instructions": "<p>A <strong>struct</strong> bundles several fields under one name, so related values travel together instead of as loose parallel variables. It is the direct descendant of Level 5's <code>Block</code> dataclass: define the shape once, then stamp out instances. A struct type has no behaviour of its own (no methods) it is purely a record. You store instances in a state variable, in an array, or as the value type of a mapping.</p>\n<ul>\n  <li><strong>struct:</strong> a user-defined type made of named member fields, declared with <code>struct Name { type field; ... }</code>.</li>\n  <li><strong>member:</strong> one field of the struct, reached with a dot: <code>person.age</code>.</li>\n  <li><strong>instantiation:</strong> <code>Person(\"Ada\", 36)</code> fills fields in declaration order; <code>Person({name: \"Ada\", age: 36})</code> names them. Both produce a value you then assign.</li>\n</ul>\n<p class=\"blueprint-line\"><code>struct Person {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;string name;</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;uint256 age;</code><br><code>}</code><br><code>Person public admin;</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>struct Token {\n    string symbol;\n    uint8 decimals;\n}\n\nToken public config;\n\nconstructor() {\n    config = Token(\"ETH\", 18);\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This editor cannot build or run Solidity; it scores your answer as a string. Open <code>remix.ethereum.org</code>, compile and deploy, then call <code>setAdmin</code> and read the <code>admin()</code> getter to see the whole struct come back as a tuple. Make that a habit.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>People</code>. Inside it, define a <code>struct</code> named <code>Person</code> with a <code>string</code> field <code>name</code> and a <code>uint256</code> field <code>age</code>. Add a <code>Person public admin;</code> state variable. Add a function <code>setAdmin(string memory _name, uint256 _age)</code> marked <code>external</code> that assigns <code>Person(_name, _age)</code> to <code>admin</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">setAdmin(\"Ada\", 36)</span><code class=\"io-val\">admin() &rarr; (\"Ada\", 36)</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract People {",
      "    struct Person {",
      "        string name;",
      "        uint256 age;",
      "    }",
      "",
      "    Person public admin;",
      "",
      "    function setAdmin(string memory _name, uint256 _age) external {",
      "        admin = Person(_name, _age);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare People with a Person struct and a stored admin instance\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract People {\n    struct Person {\n        string name;\n        uint256 age;\n    }\n\n    Person public admin;\n\n    function setAdmin(string memory _name, uint256 _age) external {\n        admin = Person(_name, _age);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+People\\s*\\{",
          "message": "Define a contract named People."
        },
        {
          "type": "matchesRegex",
          "pattern": "struct\\s+Person\\s*\\{",
          "message": "Define a struct named Person."
        },
        {
          "type": "matchesRegex",
          "pattern": "string\\s+name\\s*;",
          "message": "Give Person a string field: string name;"
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+age\\s*;",
          "message": "Give Person a uint256 field: uint256 age;"
        },
        {
          "type": "matchesRegex",
          "pattern": "Person\\s+public\\s+admin\\s*;",
          "message": "Declare: Person public admin;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+setAdmin\\s*\\(\\s*string\\s+memory\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external",
          "message": "Define setAdmin(string memory _name, uint256 _age) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "admin\\s*=\\s*Person\\s*\\(",
          "message": "Assign a new instance: admin = Person(_name, _age);"
        }
      ]
    },
    "explanation": "<p>Structs are how a contract models a domain object (a loan, an auction lot, a validator) without scattering its attributes across five mappings. Combine a struct with a <code>mapping</code> or an array and you have a small on-chain database: <code>mapping(uint256 =&gt; Person)</code> is a table of people keyed by id, one short step from what you built here.</p>"
  },
  {
    "id": 309,
    "title": "Enums as a Status Field",
    "difficulty": "easy",
    "topic": "State & Types",
    "level": 7,
    "xp": 10,
    "instructions": "<p>An <strong>enum</strong> is a type with a short, fixed list of named values, exactly the tool for a status field that must always be one of a known set. Stored on-chain it is just a small unsigned integer (<code>0</code> for the first member, <code>1</code> for the next, and so on), but the names keep your code readable. A parcel is <em>Created</em>, then <em>Shipped</em>, then <em>Delivered</em>; it is never &ldquo;banana&rdquo;. That constraint (only these states, changed only by code you control) is what makes an enum a simple state machine. Level 6's mempool challenge had transactions move through pending and confirmed; this is that lifecycle as a first-class type.</p>\n<ul>\n  <li><strong>enum:</strong> declared <code>enum Name { A, B, C }</code>. A member is referenced as <code>Name.A</code>.</li>\n  <li><strong>underlying value:</strong> members map to <code>0, 1, 2 ...</code> in listed order; the first member is the default for a fresh variable.</li>\n  <li><strong>state machine:</strong> a value that moves between a fixed set of states via specific transitions, here, functions that each set the status to the next stage.</li>\n</ul>\n<p class=\"blueprint-line\"><code>enum Status { Created, Shipped, Delivered, Cancelled }</code><br><code>Status public status;</code><br><code>status = Status.Shipped;</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>enum Phase { Open, Locked, Ended }\nPhase public phase;   // starts at Phase.Open (0)\n\nfunction lock() external { phase = Phase.Locked; }</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The sandbox is a text matcher, full stop, there is no EVM behind it. In <code>remix.ethereum.org</code>, deploy this and call <code>ship()</code> then <code>deliver()</code>, reading <code>status()</code> between calls to watch the enum move 0 &rarr; 1 &rarr; 2.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Shipment</code>. Define an <code>enum</code> named <code>Status</code> with members <code>Created</code>, <code>Shipped</code>, <code>Delivered</code>, <code>Cancelled</code> in that order. Add a <code>Status public status;</code> state variable. Add <code>ship()</code> marked <code>external</code> that sets <code>status = Status.Shipped;</code> and <code>deliver()</code> marked <code>external</code> that sets <code>status = Status.Delivered;</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">status() at deploy</span><code class=\"io-val\">0 (Created)</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">ship() then status()</span><code class=\"io-val\">1 (Shipped)</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Shipment {",
      "    enum Status { Created, Shipped, Delivered, Cancelled }",
      "",
      "    Status public status;",
      "",
      "    function ship() external {",
      "        status = Status.Shipped;",
      "    }",
      "",
      "    function deliver() external {",
      "        status = Status.Delivered;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare Shipment with a Status enum and transition functions\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Shipment {\n    enum Status { Created, Shipped, Delivered, Cancelled }\n\n    Status public status;\n\n    function ship() external {\n        status = Status.Shipped;\n    }\n\n    function deliver() external {\n        status = Status.Delivered;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Shipment\\s*\\{",
          "message": "Define a contract named Shipment."
        },
        {
          "type": "matchesRegex",
          "pattern": "enum\\s+Status\\s*\\{[^}]*Created[^}]*Shipped[^}]*Delivered[^}]*Cancelled[^}]*\\}",
          "message": "Define enum Status { Created, Shipped, Delivered, Cancelled }."
        },
        {
          "type": "matchesRegex",
          "pattern": "Status\\s+public\\s+status\\s*;",
          "message": "Declare: Status public status;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+ship\\s*\\(\\s*\\)\\s+external",
          "message": "Define ship() external."
        },
        {
          "type": "matchesRegex",
          "pattern": "status\\s*=\\s*Status\\.Shipped\\s*;",
          "message": "ship() should set status = Status.Shipped;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+deliver\\s*\\(\\s*\\)\\s+external",
          "message": "Define deliver() external."
        },
        {
          "type": "matchesRegex",
          "pattern": "status\\s*=\\s*Status\\.Delivered\\s*;",
          "message": "deliver() should set status = Status.Delivered;"
        }
      ]
    },
    "explanation": "<p>Enums make illegal states unrepresentable: there is no way to set <code>status</code> to a value outside the list, so the compiler does part of your validation for you. Add a <code>require</code> to each transition, <code>require(status == Status.Created)</code> before <code>ship()</code>, and you have enforced not just the set of states but the legal path between them, which is how escrow and auction contracts stay safe.</p>"
  },
  {
    "id": 310,
    "title": "Arrays: Storage, Fixed, and Memory",
    "difficulty": "medium",
    "topic": "State & Types",
    "level": 7,
    "xp": 15,
    "instructions": "<p>Solidity has three array shapes and they behave differently. A <strong>dynamic storage array</strong> lives in the contract's permanent state and can grow or shrink with <code>.push</code> and <code>.pop</code>; it knows its own <code>.length</code>. A <strong>fixed-size array</strong> bakes its length into the type, <code>uint256[3]</code> is always exactly three slots, no push. A <strong>memory array</strong> is scratch space allocated inside a function; you give its length when you create it with <code>new</code>, it cannot be resized, and it disappears when the function returns. Level 5's chain was a Python list you appended blocks to; a storage array is that list moved on-chain, where every <code>push</code> now costs gas.</p>\n<ul>\n  <li><strong>T[] :</strong> a dynamic array of <code>T</code>. As a state variable it supports <code>arr.push(x)</code>, <code>arr.pop()</code>, and <code>arr.length</code>.</li>\n  <li><strong>T[n] :</strong> a fixed-size array; <code>n</code> is part of the type and cannot change.</li>\n  <li><strong>new T[](k):</strong> allocates a memory array of length <code>k</code> inside a function. No <code>push</code>; you assign by index.</li>\n</ul>\n<p class=\"blueprint-line\"><code>uint256[] public values;</code><br><code>uint256[3] public triple;</code><br><code>uint256[] memory out = new uint256[](3);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>uint256[] public log;\n\nfunction append(uint256 x) external { log.push(x); }\nfunction size() external view returns (uint256) { return log.length; }</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Grading here is pure pattern-matching on your source. To actually exercise the arrays, compile in <code>remix.ethereum.org</code>, deploy, call <code>add</code> a few times, then <code>count()</code> and <code>removeLast()</code>, watching the length change. The memory array you can only observe through the return value.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Numbers</code> with a dynamic array <code>uint256[] public values</code> and a fixed-size array <code>uint256[3] public triple</code>. Add <code>add(uint256 x)</code> marked <code>external</code> that calls <code>values.push(x)</code>. Add <code>removeLast()</code> marked <code>external</code> that calls <code>values.pop()</code>. Add <code>count()</code> marked <code>external view returns (uint256)</code> that returns <code>values.length</code>. Add <code>buildMemory()</code> marked <code>external pure returns (uint256[] memory)</code> that creates <code>new uint256[](3)</code>, fills indexes 0, 1, and 2, and returns it.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">add(7) twice then count()</span><code class=\"io-val\">2</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">buildMemory()</span><code class=\"io-val\">[1, 2, 3]</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Numbers {",
      "    uint256[] public values;",
      "    uint256[3] public triple;",
      "",
      "    function add(uint256 x) external {",
      "        values.push(x);",
      "    }",
      "",
      "    function removeLast() external {",
      "        values.pop();",
      "    }",
      "",
      "    function count() external view returns (uint256) {",
      "        return values.length;",
      "    }",
      "",
      "    function buildMemory() external pure returns (uint256[] memory) {",
      "        uint256[] memory out = new uint256[](3);",
      "        out[0] = 1;",
      "        out[1] = 2;",
      "        out[2] = 3;",
      "        return out;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare Numbers with a dynamic array, a fixed array, and a memory-array builder\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Numbers {\n    uint256[] public values;\n    uint256[3] public triple;\n\n    function add(uint256 x) external {\n        values.push(x);\n    }\n\n    function removeLast() external {\n        values.pop();\n    }\n\n    function count() external view returns (uint256) {\n        return values.length;\n    }\n\n    function buildMemory() external pure returns (uint256[] memory) {\n        uint256[] memory out = new uint256[](3);\n        out[0] = 1;\n        out[1] = 2;\n        out[2] = 3;\n        return out;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Numbers\\s*\\{",
          "message": "Define a contract named Numbers."
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s*\\[\\s*\\]\\s+public\\s+values\\s*;",
          "message": "Declare a dynamic array: uint256[] public values;"
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s*\\[\\s*3\\s*\\]\\s+public\\s+triple\\s*;",
          "message": "Declare a fixed-size array: uint256[3] public triple;"
        },
        {
          "type": "matchesRegex",
          "pattern": "values\\.push\\s*\\(\\s*\\w+\\s*\\)\\s*;",
          "message": "add() should call values.push(x);"
        },
        {
          "type": "matchesRegex",
          "pattern": "values\\.pop\\s*\\(\\s*\\)\\s*;",
          "message": "removeLast() should call values.pop();"
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+values\\.length\\s*;",
          "message": "count() should return values.length;"
        },
        {
          "type": "matchesRegex",
          "pattern": "new\\s+uint256\\s*\\[\\s*\\]\\s*\\(\\s*3\\s*\\)",
          "message": "buildMemory() should allocate new uint256[](3)."
        },
        {
          "type": "matchesRegex",
          "pattern": "returns\\s*\\(\\s*uint256\\s*\\[\\s*\\]\\s+memory\\s*\\)",
          "message": "buildMemory() must return (uint256[] memory)."
        }
      ]
    },
    "explanation": "<p>The split matters for gas and for safety. Every <code>push</code> to a storage array writes a fresh slot, loop over an attacker-controlled length and you can price your own function out of ever running. Memory arrays are cheap but rigid: size them once, up front. When you return a list from a <code>view</code> function to a front-end, it is almost always a memory array built like <code>buildMemory()</code>.</p>"
  },
  {
    "id": 311,
    "title": "Block and Transaction Globals",
    "difficulty": "easy",
    "topic": "State & Types",
    "level": 7,
    "xp": 10,
    "instructions": "<p>Every call into a contract arrives with a set of <strong>globals</strong> the EVM fills in, facts about the current transaction and the block carrying it. You do not declare them; they are always in scope. <code>msg.sender</code> is the address that made this call, <code>msg.value</code> is how much ether (in wei) came with it, <code>block.timestamp</code> is the block's Unix time in seconds, and <code>block.number</code> is its height. Level 5's block header stored an index and a timestamp; <code>block.number</code> and <code>block.timestamp</code> are those same two fields, read from the live chain instead of a dataclass. Level 6's nodes each agreed on the current height, that shared number is <code>block.number</code>.</p>\n<ul>\n  <li><strong>msg.sender:</strong> the immediate caller. If a user calls your contract it is their wallet; if another contract calls you it is that contract's address.</li>\n  <li><strong>msg.value:</strong> wei sent with the call. Non-zero only if the function is <code>payable</code>.</li>\n  <li><strong>block.timestamp:</strong> seconds since the Unix epoch, set by the block proposer. Fine for coarse timing, nudgeable by a few seconds, never use it as randomness.</li>\n  <li><strong>block.number:</strong> the current block height, rising by one per block.</li>\n</ul>\n<p class=\"blueprint-line\"><code>msg.sender</code> &nbsp;/&nbsp; <code>msg.value</code> &nbsp;/&nbsp; <code>block.timestamp</code> &nbsp;/&nbsp; <code>block.number</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>address public lastCaller;\n\nfunction ping() external payable {\n    lastCaller = msg.sender;\n    require(msg.value > 0, \"send something\");\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This pane checks text and nothing else, it has no transaction context to give you. Deploy in <code>remix.ethereum.org</code>, send some wei along with the <code>record()</code> call, and read the four getters to see real <code>msg</code> and <code>block</code> values land on-chain.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Context</code> with four <code>public</code> state variables: <code>address lastCaller</code>, <code>uint256 lastValue</code>, <code>uint256 lastTime</code>, and <code>uint256 lastBlock</code>. Add one function <code>record()</code> marked <code>external payable</code> that sets <code>lastCaller = msg.sender</code>, <code>lastValue = msg.value</code>, <code>lastTime = block.timestamp</code>, and <code>lastBlock = block.number</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">record() with 1 ether from A</span><code class=\"io-val\">lastCaller &rarr; A, lastValue &rarr; 1e18</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">lastBlock()</span><code class=\"io-val\">the height of the record() call's block</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Context {",
      "    address public lastCaller;",
      "    uint256 public lastValue;",
      "    uint256 public lastTime;",
      "    uint256 public lastBlock;",
      "",
      "    function record() external payable {",
      "        lastCaller = msg.sender;",
      "        lastValue = msg.value;",
      "        lastTime = block.timestamp;",
      "        lastBlock = block.number;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare Context and record msg/block globals inside record()\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Context {\n    address public lastCaller;\n    uint256 public lastValue;\n    uint256 public lastTime;\n    uint256 public lastBlock;\n\n    function record() external payable {\n        lastCaller = msg.sender;\n        lastValue = msg.value;\n        lastTime = block.timestamp;\n        lastBlock = block.number;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Context\\s*\\{",
          "message": "Define a contract named Context."
        },
        {
          "type": "matchesRegex",
          "pattern": "address\\s+public\\s+lastCaller\\s*;",
          "message": "Declare: address public lastCaller;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+record\\s*\\(\\s*\\)\\s+external\\s+payable",
          "message": "record() must be external payable."
        },
        {
          "type": "matchesRegex",
          "pattern": "lastCaller\\s*=\\s*msg\\.sender\\s*;",
          "message": "Set lastCaller = msg.sender;"
        },
        {
          "type": "matchesRegex",
          "pattern": "lastValue\\s*=\\s*msg\\.value\\s*;",
          "message": "Set lastValue = msg.value;"
        },
        {
          "type": "matchesRegex",
          "pattern": "lastTime\\s*=\\s*block\\.timestamp\\s*;",
          "message": "Set lastTime = block.timestamp;"
        },
        {
          "type": "matchesRegex",
          "pattern": "lastBlock\\s*=\\s*block\\.number\\s*;",
          "message": "Set lastBlock = block.number;"
        }
      ]
    },
    "explanation": "<p><code>msg.sender</code> is the hinge of all access control, <code>require(msg.sender == owner)</code> is the single most common line in production contracts. Be wary of <code>block.timestamp</code>: a proposer has a little room to shift it, so it is fine for &ldquo;has a day passed&rdquo; and risky for anything an attacker profits from predicting. The security level returns to that distinction.</p>"
  },
  {
    "id": 312,
    "title": "constant and immutable",
    "difficulty": "easy",
    "topic": "State & Types",
    "level": 7,
    "xp": 10,
    "instructions": "<p>Two modifiers let you freeze a value and move it out of storage, where reading it is cheap. <code>constant</code> means the value is written in the source and known when the file is compiled, it cannot depend on anything that only exists at deployment, so no <code>msg.sender</code>, no <code>block.timestamp</code>. <code>immutable</code> is looser: you may set it once, either at its declaration or inside the <code>constructor</code>, and after that it is fixed forever. The <code>Treasury</code> contract you wrote earlier captured <code>owner</code> in its constructor and then compared against it; marking that <code>owner</code> <code>immutable</code> says out loud &ldquo;set at birth, never again&rdquo; and skips a storage read on every check.</p>\n<ul>\n  <li><strong>constant:</strong> value fixed in source, resolved at compile time. Conventionally named in <code>UPPER_CASE</code>.</li>\n  <li><strong>immutable:</strong> value set once at declaration or in the constructor, then read-only. Good for deploy-time configuration like an owner or a paired token address.</li>\n  <li><strong>why it is cheaper:</strong> both live in the contract's bytecode rather than a storage slot, so reading them costs no <code>SLOAD</code>.</li>\n</ul>\n<p class=\"blueprint-line\"><code>uint256 public constant DECIMALS = 18;</code><br><code>address public immutable owner;</code><br><code>constructor() { owner = msg.sender; }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>uint256 public constant FEE_BPS = 30;   // known now, at compile time\naddress public immutable factory;       // known only at deploy\n\nconstructor(address _factory) {\n    factory = _factory;\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor is matching characters, not compiling. Prove the rule in <code>remix.ethereum.org</code>: try to make <code>DECIMALS</code> depend on <code>block.timestamp</code> and the compiler rejects it; move that value into the constructor as an <code>immutable</code> and it builds. Deploy and read both.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Config</code>. Declare <code>uint256 public constant DECIMALS = 18;</code>. Declare <code>address public immutable owner;</code> and <code>uint256 public immutable deployedAt;</code>. Add a <code>constructor()</code> that sets <code>owner = msg.sender;</code> and <code>deployedAt = block.timestamp;</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">DECIMALS()</span><code class=\"io-val\">18</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">owner()</span><code class=\"io-val\">the deploying address, fixed forever</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Config {",
      "    uint256 public constant DECIMALS = 18;",
      "    address public immutable owner;",
      "    uint256 public immutable deployedAt;",
      "",
      "    constructor() {",
      "        owner = msg.sender;",
      "        deployedAt = block.timestamp;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare Config with one constant and two immutables\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Config {\n    uint256 public constant DECIMALS = 18;\n    address public immutable owner;\n    uint256 public immutable deployedAt;\n\n    constructor() {\n        owner = msg.sender;\n        deployedAt = block.timestamp;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Config\\s*\\{",
          "message": "Define a contract named Config."
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+constant\\s+DECIMALS\\s*=\\s*18\\s*;",
          "message": "Declare: uint256 public constant DECIMALS = 18;"
        },
        {
          "type": "matchesRegex",
          "pattern": "address\\s+public\\s+immutable\\s+owner\\s*;",
          "message": "Declare: address public immutable owner;"
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+immutable\\s+deployedAt\\s*;",
          "message": "Declare: uint256 public immutable deployedAt;"
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*\\)\\s*\\{",
          "message": "Add a constructor() { ... }."
        },
        {
          "type": "matchesRegex",
          "pattern": "owner\\s*=\\s*msg\\.sender\\s*;",
          "message": "Set owner = msg.sender; in the constructor."
        },
        {
          "type": "matchesRegex",
          "pattern": "deployedAt\\s*=\\s*block\\.timestamp\\s*;",
          "message": "Set deployedAt = block.timestamp; in the constructor."
        }
      ]
    },
    "explanation": "<p>Write <code>uint256 public constant START = block.timestamp;</code> and the compiler rejects it, <code>block.timestamp</code> is not known until deployment, which is precisely what <code>immutable</code> exists for. Using these two wherever a value never changes is close to free money: the reads are cheaper, and a value that <em>cannot</em> be reassigned is one less thing a bug or an attacker can corrupt.</p>"
  },
  {
    "id": 313,
    "title": "storage, memory, calldata",
    "difficulty": "medium",
    "topic": "Data Location",
    "level": 7,
    "xp": 15,
    "instructions": "<p>Value types like <code>uint256</code> are copied wherever they go, so they need no special handling. <strong>Reference types</strong>, arrays, structs, <code>string</code>, <code>bytes</code>, mappings, are big enough that Solidity makes you say <em>where</em> they live, because that choice decides whether you are working on the real thing or a copy. There are three data locations. <code>storage</code> is the contract's permanent state; a <code>storage</code> local is a pointer back into it. <code>memory</code> is a mutable scratch copy that is discarded when the function returns. <code>calldata</code> is the raw, read-only transaction input, not copied anywhere, which makes it the cheapest choice for parameters you only read. Level 6's mempool passed around transaction payloads; <code>calldata</code> is that payload, seen from inside the function it invoked.</p>\n<ul>\n  <li><strong>storage:</strong> permanent contract state. State variables are always storage; a <code>storage</code> local is a reference to one, and writing through it changes the chain.</li>\n  <li><strong>memory:</strong> a temporary, writable copy that exists for one function call. Required for reference-type locals you want to modify, and for most return values.</li>\n  <li><strong>calldata:</strong> read-only, non-copied input data. Only valid for function parameters. Assigning to a <code>calldata</code> variable is a compile error.</li>\n</ul>\n<p class=\"blueprint-line\"><code>function f(uint256[] calldata input) external { ... }</code><br><code>uint256[] memory tmp = new uint256[](n);</code><br><code>uint256[] storage ref = stateArray;</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>uint256[] private data;\n\nfunction total(uint256[] calldata xs) external pure returns (uint256 s) {\n    for (uint256 i = 0; i < xs.length; i++) s += xs[i];\n}\nfunction add(uint256 x) external {\n    uint256[] storage d = data;   // a pointer, not a copy\n    d.push(x);\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Only the text of your answer is inspected here. In <code>remix.ethereum.org</code>, compile and deploy, call <code>sum</code> with an array literal and <code>pushValue</code> a few times, then try changing <code>calldata</code> to a write and watch the compiler stop you.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Locations</code> with a <code>uint256[] public data</code>. Add <code>sum(uint256[] calldata input)</code> marked <code>external pure returns (uint256 total)</code> that loops over <code>input</code> adding each element to <code>total</code>. Add <code>firstDoubled(uint256[] memory input)</code> marked <code>public pure returns (uint256)</code> that does <code>input[0] = input[0] * 2;</code> and returns <code>input[0]</code>. Add <code>pushValue(uint256 x)</code> marked <code>external</code> that assigns <code>data</code> to a <code>uint256[] storage</code> local and calls <code>.push(x)</code> on it.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">sum([1, 2, 3])</span><code class=\"io-val\">6</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">firstDoubled([5, 9])</span><code class=\"io-val\">10</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Locations {",
      "    uint256[] public data;",
      "",
      "    function sum(uint256[] calldata input) external pure returns (uint256 total) {",
      "        for (uint256 i = 0; i < input.length; i++) {",
      "            total += input[i];",
      "        }",
      "    }",
      "",
      "    function firstDoubled(uint256[] memory input) public pure returns (uint256) {",
      "        input[0] = input[0] * 2;",
      "        return input[0];",
      "    }",
      "",
      "    function pushValue(uint256 x) external {",
      "        uint256[] storage d = data;",
      "        d.push(x);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare Locations using calldata, memory, and storage in the right places\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Locations {\n    uint256[] public data;\n\n    function sum(uint256[] calldata input) external pure returns (uint256 total) {\n        for (uint256 i = 0; i < input.length; i++) {\n            total += input[i];\n        }\n    }\n\n    function firstDoubled(uint256[] memory input) public pure returns (uint256) {\n        input[0] = input[0] * 2;\n        return input[0];\n    }\n\n    function pushValue(uint256 x) external {\n        uint256[] storage d = data;\n        d.push(x);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Locations\\s*\\{",
          "message": "Define a contract named Locations."
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s*\\[\\s*\\]\\s+public\\s+data\\s*;",
          "message": "Declare: uint256[] public data;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+sum\\s*\\(\\s*uint256\\s*\\[\\s*\\]\\s+calldata\\s+\\w+\\s*\\)\\s+external\\s+pure",
          "message": "sum must take (uint256[] calldata input) and be external pure."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+firstDoubled\\s*\\(\\s*uint256\\s*\\[\\s*\\]\\s+memory\\s+\\w+\\s*\\)\\s+public\\s+pure",
          "message": "firstDoubled must take (uint256[] memory input) and be public pure."
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s*\\[\\s*\\]\\s+storage\\s+\\w+\\s*=\\s*data\\s*;",
          "message": "pushValue should take a storage reference: uint256[] storage d = data;"
        },
        {
          "type": "matchesRegex",
          "pattern": "\\w+\\.push\\s*\\(\\s*\\w+\\s*\\)\\s*;",
          "message": "pushValue should call .push(x) on the storage reference."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\w+\\s*\\[\\s*0\\s*\\]\\s*=\\s*\\w+\\s*\\[\\s*0\\s*\\]\\s*\\*\\s*2\\s*;",
          "message": "firstDoubled should do input[0] = input[0] * 2;"
        }
      ]
    },
    "explanation": "<p>The rules are mostly the compiler stopping you from doing something wasteful or meaningless: <code>calldata</code> for read-only external inputs saves a copy, <code>memory</code> is forced when you need a mutable local, and <code>storage</code> locals are pointers so you can name a deep piece of state once. Reach for <code>calldata</code> first on external parameters and widen to <code>memory</code> only when you actually need to write to the argument.</p>"
  },
  {
    "id": 314,
    "title": "The Aliasing Gotcha: storage Pointer vs memory Copy",
    "difficulty": "hard",
    "topic": "Data Location",
    "level": 7,
    "xp": 25,
    "instructions": "<p>When you pull a struct out of a storage array, the data location you pick is not a formality, it decides whether you are holding the real thing or a throwaway duplicate. <code>Item storage it = items[i];</code> makes <code>it</code> a <strong>pointer</strong> straight back into the array's storage: every write through <code>it</code> lands on-chain. <code>Item memory it = items[i];</code> instead makes a full <strong>copy</strong> in memory; you can change it all you like, but the moment the function returns that copy is gone and <code>items[i]</code> is exactly as it was.</p>\n<p>This is the aliasing gotcha, and it is quiet (the copy version compiles, runs, reverts nothing, and simply has no effect. People hit it, re-read the line, and swear the assignment ran. Level 5's dataclasses never posed this question: Python handed you the same object by reference every time, so an in-place edit always stuck. Solidity makes you choose, and the innocent-looking choice) <code>memory</code>, is the one that silently drops your change. The fix is to name the location on purpose: <code>storage</code> when you mean to mutate the stored value, <code>memory</code> only when you genuinely want a scratch copy.</p>\n<ul>\n  <li><strong>storage reference:</strong> an alias into existing contract state. Writes through it persist. Declared by putting <code>storage</code> on a local variable.</li>\n  <li><strong>memory copy:</strong> an independent duplicate. Writes hit only the copy and vanish when the function returns.</li>\n  <li><strong>silent no-op:</strong> the failure mode of editing a <code>memory</code> copy of storage, valid code, zero effect, no warning.</li>\n</ul>\n<p class=\"blueprint-line\"><code>Item storage it = items[i];</code> &nbsp;&rarr;&nbsp; <code>it.value += 1;</code> &nbsp;<em>persists</em><br><code>Item memory it = items[i];</code> &nbsp;&rarr;&nbsp; <code>it.value += 1;</code> &nbsp;<em>lost</em></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>struct Item { uint256 value; }\nItem[] items;\n\nfunction persistBump(uint256 i) external {\n    Item storage it = items[i];\n    it.value += 1;          // items[i] really changes\n}\nfunction noOpBump(uint256 i) external {\n    Item memory it = items[i];\n    it.value += 1;          // items[i] unchanged; the copy is discarded\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This grader never runs your code, it reads it. The whole point of this challenge only lands when you compile in <code>remix.ethereum.org</code>, deploy, call <code>seed()</code>, then call <code>bumpStorage(0)</code> and <code>bumpMemory(0)</code> and read <code>items(0)</code> after each. One moves the number; one does not.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Aliasing</code>. Define a <code>struct</code> named <code>Item</code> with a single <code>uint256</code> field <code>value</code>. Add an <code>Item[] public items</code> array. Add <code>seed()</code> marked <code>external</code> that does <code>items.push(Item(1));</code>. Add <code>bumpStorage(uint256 i)</code> marked <code>external</code> that assigns <code>items[i]</code> to an <code>Item storage</code> local and does <code>.value += 1</code> through it. Add <code>bumpMemory(uint256 i)</code> marked <code>external</code> that assigns <code>items[i]</code> to an <code>Item memory</code> local and does <code>.value += 1</code> on that copy.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">seed(), bumpStorage(0), items(0)</span><code class=\"io-val\">value = 2</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">seed(), bumpMemory(0), items(0)</span><code class=\"io-val\">value = 1 (unchanged)</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Aliasing {",
      "    struct Item {",
      "        uint256 value;",
      "    }",
      "",
      "    Item[] public items;",
      "",
      "    function seed() external {",
      "        items.push(Item(1));",
      "    }",
      "",
      "    function bumpStorage(uint256 i) external {",
      "        Item storage it = items[i];",
      "        it.value += 1;",
      "    }",
      "",
      "    function bumpMemory(uint256 i) external {",
      "        Item memory it = items[i];",
      "        it.value += 1;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare Aliasing and show storage-pointer vs memory-copy mutation\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Aliasing {\n    struct Item {\n        uint256 value;\n    }\n\n    Item[] public items;\n\n    function seed() external {\n        items.push(Item(1));\n    }\n\n    function bumpStorage(uint256 i) external {\n        Item storage it = items[i];\n        it.value += 1;\n    }\n\n    function bumpMemory(uint256 i) external {\n        Item memory it = items[i];\n        it.value += 1;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Aliasing\\s*\\{",
          "message": "Define a contract named Aliasing."
        },
        {
          "type": "matchesRegex",
          "pattern": "struct\\s+Item\\s*\\{[^}]*uint256\\s+value\\s*;[^}]*\\}",
          "message": "Define struct Item { uint256 value; }."
        },
        {
          "type": "matchesRegex",
          "pattern": "Item\\s*\\[\\s*\\]\\s+public\\s+items\\s*;",
          "message": "Declare: Item[] public items;"
        },
        {
          "type": "matchesRegex",
          "pattern": "items\\.push\\s*\\(\\s*Item\\s*\\(\\s*1\\s*\\)\\s*\\)\\s*;",
          "message": "seed() should do items.push(Item(1));"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+bumpStorage\\s*\\(\\s*uint256\\s+\\w+\\s*\\)\\s+external",
          "message": "Define bumpStorage(uint256 i) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "Item\\s+storage\\s+\\w+\\s*=\\s*items\\s*\\[\\s*\\w+\\s*\\]\\s*;",
          "message": "bumpStorage should take: Item storage it = items[i];"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+bumpMemory\\s*\\(\\s*uint256\\s+\\w+\\s*\\)\\s+external",
          "message": "Define bumpMemory(uint256 i) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "Item\\s+memory\\s+\\w+\\s*=\\s*items\\s*\\[\\s*\\w+\\s*\\]\\s*;",
          "message": "bumpMemory should take: Item memory it = items[i];"
        },
        {
          "type": "matchesRegex",
          "pattern": "\\w+\\.value\\s*\\+=\\s*1\\s*;",
          "message": "Each bump function should do it.value += 1;"
        }
      ]
    },
    "explanation": "<p>The rule to keep: assigning a storage reference type to a <code>memory</code> local always copies, and assigning to a <code>storage</code> local always aliases. If a function is meant to change stored data, its local must be <code>storage</code>, or you must write the modified <code>memory</code> value back explicitly with <code>items[i] = it;</code>. This exact bug has shipped to mainnet more than once; the security level treats &ldquo;code that looks like it mutates state but does not&rdquo; as its own category.</p>"
  },
  {
    "id": 315,
    "title": "require: Validate Inputs, or Revert",
    "difficulty": "easy",
    "topic": "Control Flow & Guards",
    "level": 7,
    "xp": 10,
    "instructions": "<p>Level 6's mempool held transactions that had not run yet; the moment a validator picks one up, the contract code executes, and it either finishes or it does not. <code>require</code> is how a function says \"stop here if this condition is false\". When the condition fails, the transaction <strong>reverts</strong>: every storage change it made so far is rolled back as if the call never happened, an optional message is returned to the caller, and the gas that has not been spent yet is refunded (the gas already burned getting to the check is not). Think of a bouncer checking IDs at the door, if yours does not pass, you do not get in, and nothing inside the club changes on your account.</p>\n<ul>\n  <li><strong>require(condition, \"message\"):</strong> if <code>condition</code> is false, abort the call, undo its state changes, and return <code>\"message\"</code> as the reason.</li>\n  <li><strong>revert:</strong> the abort itself, an all-or-nothing unwind of the current transaction. There is no \"half-executed\" state left behind.</li>\n  <li><strong>gas refund:</strong> the sender pays only for the work done up to the failing check; the rest of their gas budget is returned.</li>\n</ul>\n<p class=\"blueprint-line\"><code>require(</code><code>condition</code><code>,</code> <code>\"error message\"</code><code>);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function setPrice(uint256 newPrice) external {\n    require(newPrice &gt; 0, \"price must be positive\");\n    price = newPrice;   // only runs if the check passed\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Nothing here is executed, the editor is only reading your text, and it has no compiler. Drop this contract into <code>remix.ethereum.org</code> (nothing to install), compile it, deploy to the JavaScript VM, and call <code>withdraw</code> with a huge number to watch the <code>require</code> revert the whole transaction.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Ledger</code> with a <code>uint256 public</code> state variable <code>balance</code>. Add an <code>external</code> function <code>withdraw(uint256 amount)</code> that first calls <code>require(amount &gt; 0, \"amount must be positive\")</code>, then <code>require(amount &lt;= balance, \"insufficient balance\")</code>, and only then runs <code>balance -= amount;</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">withdraw(0)</span><code class=\"io-val\">reverts: \"amount must be positive\"</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">withdraw(9999) when balance is 100</span><code class=\"io-val\">reverts: \"insufficient balance\"</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">withdraw(40) when balance is 100</span><code class=\"io-val\">balance becomes 60</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Ledger {",
      "    uint256 public balance;",
      "",
      "    constructor() {",
      "        balance = 100;",
      "    }",
      "",
      "    function withdraw(uint256 amount) external {",
      "        require(amount > 0, \"amount must be positive\");",
      "        require(amount <= balance, \"insufficient balance\");",
      "        balance -= amount;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare contract Ledger with a guarded withdraw function\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Ledger {\n    uint256 public balance;\n\n    constructor() {\n        balance = 100;\n    }\n\n    function withdraw(uint256 amount) external {\n        require(amount > 0, \"amount must be positive\");\n        require(amount <= balance, \"insufficient balance\");\n        balance -= amount;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Ledger\\s*\\{",
          "message": "Define a contract named Ledger."
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+balance\\s*;",
          "message": "Declare: uint256 public balance;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+withdraw\\s*\\(\\s*uint256\\s+amount\\s*\\)\\s+external",
          "message": "Define an external function withdraw(uint256 amount)."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*amount\\s*>\\s*0\\s*,\\s*\"[^\"]+\"\\s*\\)",
          "message": "Add require(amount > 0, \"amount must be positive\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*amount\\s*<=\\s*balance\\s*,\\s*\"[^\"]+\"\\s*\\)",
          "message": "Add require(amount <= balance, \"insufficient balance\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "balance\\s*-=\\s*amount\\s*;",
          "message": "After the checks, run balance -= amount;"
        }
      ]
    },
    "explanation": "<p>A failed <code>require</code> does not just stop the function, it unwinds every storage change the transaction made and hands back the gas that had not been burned yet, so a rejected call costs the sender only the work done up to the check. That all-or-nothing property is what lets you validate inputs at the top of a function and trust them for the rest of it. The next challenges turn these one-off checks into reusable <code>modifier</code>s and into cheaper custom errors.</p>"
  },
  {
    "id": 316,
    "title": "Write an onlyOwner Modifier",
    "difficulty": "medium",
    "topic": "Control Flow & Guards",
    "level": 7,
    "xp": 15,
    "instructions": "<p>Level 6's signatures proved <em>who</em> sent a message; a <strong>modifier</strong> is how a contract acts on that fact, over and over, without repeating itself. A modifier is a named block of code you attach to a function; it runs around that function, and the special token <code>_;</code> marks the spot where the function's own body gets spliced in. So a modifier that does a <code>require</code> and then <code>_;</code> effectively says \"run this check first, and only continue into the function if it passed\". The convention name <code>onlyOwner</code> is a keycard reader bolted to a door: the reader logic lives in one place, and any door can be wired to it.</p>\n<ul>\n  <li><strong>modifier:</strong> reusable code wrapped around a function body, declared with <code>modifier name() { ... _; ... }</code> and applied by writing its name in the function's signature.</li>\n  <li><strong>_; (placeholder):</strong> the point where the guarded function's body executes. Code before it runs first; code after it runs when the function returns.</li>\n  <li><strong>owner:</strong> an <code>address</code> captured at deployment (usually <code>msg.sender</code> in the constructor) that later checks compare against.</li>\n</ul>\n<p class=\"blueprint-line\"><code>modifier onlyOwner() {</code><br><code>&nbsp;&nbsp;require(msg.sender == owner, \"not owner\");</code><br><code>&nbsp;&nbsp;_;</code><br><code>}</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>modifier onlyOwner() {\n    require(msg.sender == owner, \"not owner\");\n    _;                       // the guarded function's body runs here\n}\n\nfunction pause() external onlyOwner {\n    paused = true;           // only reached if the require passed\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The checker only pattern-matches the source you type; it never runs the EVM. To see the guard actually bite, paste this into <code>remix.ethereum.org</code>, deploy it from one account, then call <code>setSecret</code> from a <em>different</em> account and read the revert reason.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Vault</code>. Give it an <code>address public owner</code> and a <code>uint256 public secret</code>. In the <code>constructor</code>, set <code>owner = msg.sender</code>. Declare a <code>modifier onlyOwner()</code> that calls <code>require(msg.sender == owner, \"not owner\")</code> and then has <code>_;</code>. Add a function <code>setSecret(uint256 value) external onlyOwner</code> that sets <code>secret = value;</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">setSecret(42) from owner</span><code class=\"io-val\">secret becomes 42</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">setSecret(42) from another account</span><code class=\"io-val\">reverts: \"not owner\"</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Vault {",
      "    address public owner;",
      "    uint256 public secret;",
      "",
      "    constructor() {",
      "        owner = msg.sender;",
      "    }",
      "",
      "    modifier onlyOwner() {",
      "        require(msg.sender == owner, \"not owner\");",
      "        _;",
      "    }",
      "",
      "    function setSecret(uint256 value) external onlyOwner {",
      "        secret = value;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare contract Vault with an onlyOwner modifier\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Vault {\n    address public owner;\n    uint256 public secret;\n\n    constructor() {\n        owner = msg.sender;\n    }\n\n    modifier onlyOwner() {\n        require(msg.sender == owner, \"not owner\");\n        _;\n    }\n\n    function setSecret(uint256 value) external onlyOwner {\n        secret = value;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Vault\\s*\\{",
          "message": "Define a contract named Vault."
        },
        {
          "type": "matchesRegex",
          "pattern": "address\\s+public\\s+owner\\s*;",
          "message": "Declare: address public owner;"
        },
        {
          "type": "matchesRegex",
          "pattern": "owner\\s*=\\s*msg\\.sender\\s*;",
          "message": "Set owner = msg.sender; in the constructor."
        },
        {
          "type": "matchesRegex",
          "pattern": "modifier\\s+onlyOwner\\s*\\(\\s*\\)",
          "message": "Declare a modifier onlyOwner()."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*msg\\.sender\\s*==\\s*owner",
          "message": "Inside onlyOwner, require(msg.sender == owner ...)."
        },
        {
          "type": "codeContains",
          "value": "_;",
          "message": "Put the _; placeholder in the modifier so the function body runs."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+setSecret\\s*\\(\\s*uint256\\s+value\\s*\\)\\s+external\\s+onlyOwner",
          "message": "setSecret(uint256 value) must be external and marked onlyOwner."
        },
        {
          "type": "matchesRegex",
          "pattern": "secret\\s*=\\s*value\\s*;",
          "message": "In setSecret, assign secret = value;"
        }
      ]
    },
    "explanation": "<p>Wherever you write <code>_;</code>, the compiler splices in the body of whatever function wears the modifier, so the <code>onlyOwner</code> check runs first and the function only executes if the <code>require</code> passed. Writing the check once and tagging ten functions with <code>onlyOwner</code> beats copying the same <code>require</code> into all ten and keeping them in sync. Custom errors, next, make the failure path itself cheaper.</p>"
  },
  {
    "id": 317,
    "title": "Custom Errors Instead of require Strings",
    "difficulty": "medium",
    "topic": "Control Flow & Guards",
    "level": 7,
    "xp": 15,
    "instructions": "<p>The <code>require(cond, \"not owner\")</code> style from the previous challenge works, but that string is stored in the contract's bytecode and ABI-encoded into the revert data every time it fires. Since Solidity 0.8.4 you can instead declare a named <strong>custom error</strong> and <code>revert</code> with it. On-chain, a custom error is just a four-byte selector (the first bytes of its Level 5-style hash) plus its ABI-encoded arguments, smaller to deploy and cheaper to revert with, while still carrying structured detail like <em>which</em> address was rejected. It is the difference between stamping a form with a numbered error code plus the offending value, versus writing out a sentence by hand each time.</p>\n<ul>\n  <li><strong>custom error:</strong> a top-level declaration <code>error Name(type arg ...);</code> that names a failure condition and the data that describes it.</li>\n  <li><strong>revert Name(args):</strong> aborts the call (same rollback as <code>require</code>) and returns the error's selector and arguments to the caller.</li>\n  <li><strong>selector:</strong> the four-byte identifier a caller uses to recognize which error was raised, analogous to a function selector.</li>\n</ul>\n<p class=\"blueprint-line\"><code>error Unauthorized(address caller);</code><br><code>if (!allowed) revert Unauthorized(msg.sender);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>error Unauthorized(address caller);\n\nfunction adminOnly() external {\n    if (msg.sender != owner) revert Unauthorized(msg.sender);\n    // ... privileged work ...\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This box grades text, not behavior, it cannot compile Solidity. Compile and deploy in <code>remix.ethereum.org</code> instead, trigger the failing branch, and expand the failed transaction to see <code>NotAdmin</code> and its decoded <code>caller</code> argument in the output.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Registry</code> with an <code>address public admin</code> set to <code>msg.sender</code> in the <code>constructor</code>, and a <code>mapping(address =&gt; bool) public registered</code>. Declare <code>error NotAdmin(address caller);</code> at contract level. Add an <code>external</code> function <code>register(address user)</code> that does <code>if (msg.sender != admin) revert NotAdmin(msg.sender);</code> and then <code>registered[user] = true;</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">register(user) from admin</span><code class=\"io-val\">registered[user] becomes true</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">register(user) from anyone else</span><code class=\"io-val\">reverts with NotAdmin(caller)</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Registry {",
      "    address public admin;",
      "    mapping(address => bool) public registered;",
      "",
      "    error NotAdmin(address caller);",
      "",
      "    constructor() {",
      "        admin = msg.sender;",
      "    }",
      "",
      "    function register(address user) external {",
      "        if (msg.sender != admin) revert NotAdmin(msg.sender);",
      "        registered[user] = true;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare contract Registry using a custom error for the guard\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Registry {\n    address public admin;\n    mapping(address => bool) public registered;\n\n    error NotAdmin(address caller);\n\n    constructor() {\n        admin = msg.sender;\n    }\n\n    function register(address user) external {\n        if (msg.sender != admin) revert NotAdmin(msg.sender);\n        registered[user] = true;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Registry\\s*\\{",
          "message": "Define a contract named Registry."
        },
        {
          "type": "matchesRegex",
          "pattern": "error\\s+NotAdmin\\s*\\(\\s*address\\s+caller\\s*\\)\\s*;",
          "message": "Declare: error NotAdmin(address caller);"
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\(\\s*address\\s*=>\\s*bool\\s*\\)\\s*public\\s+registered",
          "message": "Declare: mapping(address => bool) public registered;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+register\\s*\\(\\s*address\\s+user\\s*\\)\\s+external",
          "message": "Define an external function register(address user)."
        },
        {
          "type": "matchesRegex",
          "pattern": "if\\s*\\(\\s*msg\\.sender\\s*!=\\s*admin\\s*\\)",
          "message": "Guard with if (msg.sender != admin) ..."
        },
        {
          "type": "matchesRegex",
          "pattern": "revert\\s+NotAdmin\\s*\\(\\s*msg\\.sender\\s*\\)\\s*;",
          "message": "On the failing branch, revert NotAdmin(msg.sender);"
        },
        {
          "type": "matchesRegex",
          "pattern": "registered\\[\\s*user\\s*\\]\\s*=\\s*true\\s*;",
          "message": "After the guard, set registered[user] = true;"
        }
      ]
    },
    "explanation": "<p>A <code>require</code> string is stored as data in the contract and ABI-encoded into the revert output; a custom error compiles to a four-byte selector plus its arguments, which is smaller to deploy and cheaper to revert with, while still telling the caller exactly what went wrong and with which values. Since 0.8.4 this is the idiomatic failure path for new code, you will see it again in the read-and-complete challenges at the end of this level.</p>"
  },
  {
    "id": 318,
    "title": "Loops, Branches, and the Unbounded-Loop Trap",
    "difficulty": "medium",
    "topic": "Control Flow & Guards",
    "level": 7,
    "xp": 15,
    "instructions": "<p>Solidity's <code>if</code>/<code>else</code> and <code>for</code> loops read like any C-family language. The catch is gas. Every block has a gas limit (Level 5's blocks had a size, and Level 6's mempool showed transactions competing for that space) so a loop's cost has to fit inside one block. If you loop over an array that <em>any caller can grow</em> (say, by pushing their address into a list), the loop's gas cost grows with it, and past some length the function can no longer be included in a block at all. If that function is the only way to pay people or release funds, the funds are now stuck. This is a denial-of-service bug, and it is a mail carrier being told to visit every house on a street that strangers keep extending.</p>\n<p>The fix is to never iterate the whole unbounded array in one call. Let the caller pass a <code>[start, end)</code> window, clamp <code>end</code> to the array length, and process only that slice. Each call does bounded work; the full job takes several calls.</p>\n<ul>\n  <li><strong>unbounded loop:</strong> a loop whose iteration count is controlled by data an attacker can enlarge, so its gas cost has no ceiling.</li>\n  <li><strong>denial of service (DoS):</strong> making a function impossible to execute, here, by pushing its gas cost past the block limit.</li>\n  <li><strong>bounded batch:</strong> processing a fixed-size window per call (<code>start</code>..<code>end</code>) so gas per call stays predictable regardless of total size.</li>\n</ul>\n<p class=\"blueprint-line\"><code>if (end &gt; arr.length) end = arr.length;</code><br><code>for (uint256 i = start; i &lt; end; i++) { ... }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// risky: users.length is caller-controlled and unbounded\nfor (uint256 i = 0; i &lt; users.length; i++) { pay(users[i]); }\n\n// safer: caller passes a bounded window\nfunction payBatch(uint256 start, uint256 end) external {\n    if (end &gt; users.length) end = users.length;\n    for (uint256 i = start; i &lt; end; i++) { pay(users[i]); }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor checks the words, not the gas. Take this to <code>remix.ethereum.org</code>, call <code>add</code> a few hundred times, and compare the gas a single full sweep would need against calling <code>distribute</code> in small ranges.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Airdrop</code> with <code>address[] public recipients</code> and <code>mapping(address =&gt; uint256) public credited</code>. Add an <code>external</code> function <code>add(address r)</code> that does <code>recipients.push(r);</code>. Add an <code>external</code> function <code>distribute(uint256 start, uint256 end)</code> that: calls <code>require(start &lt; end, \"bad range\")</code>; then <code>if (end &gt; recipients.length) { end = recipients.length; }</code>; then a <code>for (uint256 i = start; i &lt; end; i++)</code> loop that reads <code>address r = recipients[i];</code> and, using <code>if</code>/<code>else</code>, sets <code>credited[r] = 100;</code> when <code>credited[r] == 0</code> and otherwise does <code>credited[r] += 10;</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">distribute(0, 50)</span><code class=\"io-val\">credits recipients[0..49], bounded gas</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">distribute(50, 100)</span><code class=\"io-val\">credits the next slice in a separate transaction</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">distribute(0, 999999)</span><code class=\"io-val\">end is clamped down to recipients.length</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Airdrop {",
      "    address[] public recipients;",
      "    mapping(address => uint256) public credited;",
      "",
      "    function add(address r) external {",
      "        recipients.push(r);",
      "    }",
      "",
      "    function distribute(uint256 start, uint256 end) external {",
      "        require(start < end, \"bad range\");",
      "        if (end > recipients.length) {",
      "            end = recipients.length;",
      "        }",
      "        for (uint256 i = start; i < end; i++) {",
      "            address r = recipients[i];",
      "            if (credited[r] == 0) {",
      "                credited[r] = 100;",
      "            } else {",
      "                credited[r] += 10;",
      "            }",
      "        }",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare contract Airdrop with a bounded-batch distribute function\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Airdrop {\n    address[] public recipients;\n    mapping(address => uint256) public credited;\n\n    function add(address r) external {\n        recipients.push(r);\n    }\n\n    function distribute(uint256 start, uint256 end) external {\n        require(start < end, \"bad range\");\n        if (end > recipients.length) {\n            end = recipients.length;\n        }\n        for (uint256 i = start; i < end; i++) {\n            address r = recipients[i];\n            if (credited[r] == 0) {\n                credited[r] = 100;\n            } else {\n                credited[r] += 10;\n            }\n        }\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Airdrop\\s*\\{",
          "message": "Define a contract named Airdrop."
        },
        {
          "type": "matchesRegex",
          "pattern": "address\\[\\]\\s+public\\s+recipients\\s*;",
          "message": "Declare: address[] public recipients;"
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*public\\s+credited",
          "message": "Declare: mapping(address => uint256) public credited;"
        },
        {
          "type": "matchesRegex",
          "pattern": "recipients\\.push\\(\\s*r\\s*\\)",
          "message": "add(address r) should call recipients.push(r);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+distribute\\s*\\(\\s*uint256\\s+start\\s*,\\s*uint256\\s+end\\s*\\)",
          "message": "Define distribute(uint256 start, uint256 end)."
        },
        {
          "type": "matchesRegex",
          "pattern": "if\\s*\\(\\s*end\\s*>\\s*recipients\\.length\\s*\\)",
          "message": "Clamp with if (end > recipients.length) ..."
        },
        {
          "type": "matchesRegex",
          "pattern": "end\\s*=\\s*recipients\\.length\\s*;",
          "message": "Inside that if, set end = recipients.length;"
        },
        {
          "type": "matchesRegex",
          "pattern": "for\\s*\\(\\s*uint256\\s+i\\s*=\\s*start\\s*;\\s*i\\s*<\\s*end\\s*;",
          "message": "Loop with for (uint256 i = start; i < end; i++)."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\belse\\b",
          "message": "Use an if/else: one branch for credited[r] == 0, else the other."
        },
        {
          "type": "matchesRegex",
          "pattern": "credited\\[[^\\]]*\\]\\s*\\+=\\s*10",
          "message": "In the else branch, do credited[r] += 10;"
        }
      ]
    },
    "explanation": "<p>The block gas limit is a hard ceiling, so a loop whose length any caller can grow (by pushing to the array) is a function waiting to become uncallable, and if that function is the only path to withdraw, the funds are trapped. Bounding each call to a caller-supplied window keeps gas predictable no matter how large the array gets. The security level revisits this as a named denial-of-service pattern.</p>"
  },
  {
    "id": 319,
    "title": "Declare an Event and Emit It",
    "difficulty": "easy",
    "topic": "Events",
    "level": 7,
    "xp": 10,
    "instructions": "<p>A contract cannot call out to a website when something happens. What it can do is write a line to the transaction's log, and that is what an <strong>event</strong> is. You declare the event's shape once, then <code>emit</code> it inside a function; the log entry lands in the transaction receipt, where Level 6's nodes, block explorers, wallets, and indexers can all read it. It is a shop's receipt printer: the shop does not act on the receipts, but your accountant reads every one. Logs are far cheaper than storage, but other contracts cannot read them, so an event records what happened, it does not replace storing a value you need on-chain.</p>\n<ul>\n  <li><strong>event:</strong> a declared log type, <code>event Name(type arg ...);</code>, written at contract level.</li>\n  <li><strong>emit:</strong> the statement <code>emit Name(values);</code> that actually writes one log entry during a call.</li>\n  <li><strong>log:</strong> data attached to the transaction receipt, visible off-chain but invisible to other contracts.</li>\n</ul>\n<p class=\"blueprint-line\"><code>event Name(type arg);</code><br><code>emit Name(value);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>event Withdrawn(address account, uint256 amount);\n\nfunction withdraw(uint256 amount) external {\n    balance -= amount;\n    emit Withdrawn(msg.sender, amount);   // tell the outside world\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>As always, this pane only inspects your text, no compiler, no chain. Paste the contract into <code>remix.ethereum.org</code>, call <code>setGreeting</code>, and open the transaction receipt to see the <code>GreetingChanged</code> entry sitting in its logs.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Greeter</code> with a <code>string public greeting</code>. Declare <code>event GreetingChanged(string newGreeting);</code>. Add an <code>external</code> function <code>setGreeting(string calldata newGreeting)</code> that sets <code>greeting = newGreeting;</code> and then <code>emit GreetingChanged(newGreeting);</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">setGreeting(\"gm\")</span><code class=\"io-val\">greeting is \"gm\"; a GreetingChanged(\"gm\") log is emitted</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Greeter {",
      "    string public greeting;",
      "",
      "    event GreetingChanged(string newGreeting);",
      "",
      "    function setGreeting(string calldata newGreeting) external {",
      "        greeting = newGreeting;",
      "        emit GreetingChanged(newGreeting);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare contract Greeter that emits an event on change\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Greeter {\n    string public greeting;\n\n    event GreetingChanged(string newGreeting);\n\n    function setGreeting(string calldata newGreeting) external {\n        greeting = newGreeting;\n        emit GreetingChanged(newGreeting);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Greeter\\s*\\{",
          "message": "Define a contract named Greeter."
        },
        {
          "type": "matchesRegex",
          "pattern": "string\\s+public\\s+greeting\\s*;",
          "message": "Declare: string public greeting;"
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+GreetingChanged\\s*\\(\\s*string\\s+newGreeting\\s*\\)\\s*;",
          "message": "Declare: event GreetingChanged(string newGreeting);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+setGreeting\\s*\\(\\s*string\\s+calldata\\s+newGreeting\\s*\\)\\s+external",
          "message": "Define setGreeting(string calldata newGreeting) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "greeting\\s*=\\s*newGreeting\\s*;",
          "message": "Assign greeting = newGreeting;"
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+GreetingChanged\\s*\\(\\s*newGreeting\\s*\\)\\s*;",
          "message": "Then emit GreetingChanged(newGreeting);"
        }
      ]
    },
    "explanation": "<p>Events cost far less than storage and are the supported channel for telling the outside world what happened: explorers, wallets, and indexers all work by reading logs. Other contracts cannot read them, so an event is never a substitute for storing a value you need on-chain, it is a record for off-chain consumers. The next two challenges make logs searchable and fold them into the standard write pattern.</p>"
  },
  {
    "id": 320,
    "title": "Indexed Event Parameters",
    "difficulty": "medium",
    "topic": "Events",
    "level": 7,
    "xp": 15,
    "instructions": "<p>An app that wants \"every transfer sent to my address\" should not have to download and scan every transaction ever made. Marking an event parameter <code>indexed</code> solves this: that value becomes a searchable <strong>topic</strong> on the log, and Level 6's nodes can return just the matching entries. You get up to three <code>indexed</code> parameters per event, because a log has four topic slots and the first is already taken by the hash of the event's signature (Level 5's hashing, showing up again). Non-indexed arguments still travel with the log, in its cheaper data section, but you cannot filter by them. Indexed fields are the columns a library catalog lets you search by; the data section is the rest of the book.</p>\n<ul>\n  <li><strong>indexed:</strong> a keyword on an event parameter that stores it as a filterable topic rather than in the data blob.</li>\n  <li><strong>topic:</strong> a 32-byte slot on a log that nodes build a searchable index over. Max four; max three are yours.</li>\n  <li><strong>event signature:</strong> <code>keccak256(\"Transfer(address,address,uint256)\")</code>, occupies the first topic, identifying which event fired.</li>\n</ul>\n<p class=\"blueprint-line\"><code>event Transfer(address indexed from, address indexed to, uint256 value);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>event Approval(address indexed owner, address indexed spender, uint256 amount);\n// an off-chain client can now ask a node for every Approval where owner == me,\n// without replaying a single transaction</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Text is all that is graded here; the EVM is not in the loop. In <code>remix.ethereum.org</code> you can deploy this, fire a few <code>transfer</code> calls, and filter the log panel by the <code>to</code> topic to watch indexing do its job.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Token</code> with <code>mapping(address =&gt; uint256) public balanceOf</code>. Declare <code>event Transfer(address indexed from, address indexed to, uint256 value);</code>, <code>from</code> and <code>to</code> indexed, <code>value</code> not. Add an <code>external</code> function <code>transfer(address to, uint256 value)</code> that does <code>balanceOf[msg.sender] -= value;</code>, then <code>balanceOf[to] += value;</code>, then <code>emit Transfer(msg.sender, to, value);</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">transfer(bob, 10)</span><code class=\"io-val\">emits Transfer(msg.sender, bob, 10) with from and to as searchable topics</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Token {",
      "    mapping(address => uint256) public balanceOf;",
      "",
      "    event Transfer(address indexed from, address indexed to, uint256 value);",
      "",
      "    function transfer(address to, uint256 value) external {",
      "        balanceOf[msg.sender] -= value;",
      "        balanceOf[to] += value;",
      "        emit Transfer(msg.sender, to, value);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare contract Token with an indexed Transfer event\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Token {\n    mapping(address => uint256) public balanceOf;\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n\n    function transfer(address to, uint256 value) external {\n        balanceOf[msg.sender] -= value;\n        balanceOf[to] += value;\n        emit Transfer(msg.sender, to, value);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Token\\s*\\{",
          "message": "Define a contract named Token."
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*public\\s+balanceOf",
          "message": "Declare: mapping(address => uint256) public balanceOf;"
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+Transfer\\s*\\(\\s*address\\s+indexed\\s+from\\s*,\\s*address\\s+indexed\\s+to\\s*,\\s*uint256\\s+value\\s*\\)\\s*;",
          "message": "Declare event Transfer(address indexed from, address indexed to, uint256 value);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+transfer\\s*\\(\\s*address\\s+to\\s*,\\s*uint256\\s+value\\s*\\)\\s+external",
          "message": "Define transfer(address to, uint256 value) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "balanceOf\\[\\s*msg\\.sender\\s*\\]\\s*-=\\s*value",
          "message": "Do balanceOf[msg.sender] -= value;"
        },
        {
          "type": "matchesRegex",
          "pattern": "balanceOf\\[\\s*to\\s*\\]\\s*\\+=\\s*value",
          "message": "Do balanceOf[to] += value;"
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+Transfer\\s*\\(\\s*msg\\.sender\\s*,\\s*to\\s*,\\s*value\\s*\\)\\s*;",
          "message": "Then emit Transfer(msg.sender, to, value);"
        }
      ]
    },
    "explanation": "<p>Marking a parameter <code>indexed</code> promotes it to a log topic, and a node can return every matching log without replaying transactions, which is how a wallet finds \"my\" transfers in seconds. You get three indexed slots because the fourth topic holds the hash of the event signature. Non-indexed arguments stay in the cheaper data section, readable only once you already have the log.</p>"
  },
  {
    "id": 321,
    "title": "Deposit: Update State and Emit in One Call",
    "difficulty": "medium",
    "topic": "Events",
    "level": 7,
    "xp": 15,
    "instructions": "<p>Here is the shape almost every state-changing function takes: validate the inputs, update storage, then emit an event describing exactly what changed, all in one atomic call. The storage write is the truth on-chain; the log is the truth for everything off-chain, and Level 6's indexers rely on the two never disagreeing. A bank transaction is the analogy: the money moves and the ledger line is written in the same motion, not one now and one later. This challenge combines the <code>require</code> guard, a <code>payable</code> function that receives ether, and the indexed event from the previous two challenges.</p>\n<ul>\n  <li><strong>payable:</strong> a function modifier allowing the call to carry ether; the amount arrives as <code>msg.value</code> (in wei).</li>\n  <li><strong>effect:</strong> the storage change, here, crediting <code>balances[msg.sender]</code>.</li>\n  <li><strong>emit-after-effect:</strong> the ordering convention, change state first, then log the change you just made, so the log can never describe something that did not happen.</li>\n</ul>\n<p class=\"blueprint-line\"><code>function deposit() external payable {</code><br><code>&nbsp;&nbsp;balances[msg.sender] += msg.value;</code><br><code>&nbsp;&nbsp;emit Deposited(msg.sender, msg.value);</code><br><code>}</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>event Funded(address indexed account, uint256 amount);\n\nfunction fund() external payable {\n    require(msg.value &gt; 0, \"no value\");\n    pool[msg.sender] += msg.value;      // effect\n    emit Funded(msg.sender, msg.value); // log the effect\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This checker reads source and nothing else, it will not deploy or execute anything. Use <code>remix.ethereum.org</code> to deploy, send <code>deposit</code> with some ether attached in the value field, and confirm the balance and the <code>Deposited</code> log both update in the one transaction.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>PiggyBank</code> with <code>mapping(address =&gt; uint256) public balances</code>. Declare <code>event Deposited(address indexed account, uint256 amount);</code>. Add a function <code>deposit() external payable</code> that calls <code>require(msg.value &gt; 0, \"no value\")</code>, then does <code>balances[msg.sender] += msg.value;</code>, then <code>emit Deposited(msg.sender, msg.value);</code>, the effect before the emit.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">deposit() with 1 ether</span><code class=\"io-val\">balances[msg.sender] += 1e18; emits Deposited(msg.sender, 1e18)</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">deposit() with 0</span><code class=\"io-val\">reverts: \"no value\"</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract PiggyBank {",
      "    mapping(address => uint256) public balances;",
      "",
      "    event Deposited(address indexed account, uint256 amount);",
      "",
      "    function deposit() external payable {",
      "        require(msg.value > 0, \"no value\");",
      "        balances[msg.sender] += msg.value;",
      "        emit Deposited(msg.sender, msg.value);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare contract PiggyBank: guard, effect, then emit\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract PiggyBank {\n    mapping(address => uint256) public balances;\n\n    event Deposited(address indexed account, uint256 amount);\n\n    function deposit() external payable {\n        require(msg.value > 0, \"no value\");\n        balances[msg.sender] += msg.value;\n        emit Deposited(msg.sender, msg.value);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+PiggyBank\\s*\\{",
          "message": "Define a contract named PiggyBank."
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*public\\s+balances",
          "message": "Declare: mapping(address => uint256) public balances;"
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+Deposited\\s*\\(\\s*address\\s+indexed\\s+account\\s*,\\s*uint256\\s+amount\\s*\\)\\s*;",
          "message": "Declare event Deposited(address indexed account, uint256 amount);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+deposit\\s*\\(\\s*\\)\\s+external\\s+payable",
          "message": "deposit() must be external payable."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*msg\\.value\\s*>\\s*0",
          "message": "Guard with require(msg.value > 0, \"no value\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "balances\\[\\s*msg\\.sender\\s*\\]\\s*\\+=\\s*msg\\.value",
          "message": "Do balances[msg.sender] += msg.value;"
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+Deposited\\s*\\(\\s*msg\\.sender\\s*,\\s*msg\\.value\\s*\\)\\s*;",
          "message": "Emit Deposited(msg.sender, msg.value);"
        },
        {
          "type": "matchesRegex",
          "pattern": "balances\\[\\s*msg\\.sender\\s*\\]\\s*\\+=\\s*msg\\.value[\\s\\S]*emit\\s+Deposited",
          "message": "Emit AFTER updating balances, not before."
        }
      ]
    },
    "explanation": "<p>Update state, then emit an event describing that update, in the same transaction: the storage change is the truth on-chain and the log is the truth for everything off-chain, and they must not disagree. Emitting before the effect, or omitting the event, is a common cause of indexers drifting out of sync with the chain. Every token and vault later in the course follows this shape.</p>"
  },
  {
    "id": 322,
    "title": "Cache Storage in a Loop",
    "difficulty": "medium",
    "topic": "Gas-Aware Writing",
    "level": 7,
    "xp": 15,
    "instructions": "<p>Reading a state variable and writing one are among the most expensive things the EVM does, every write is data that Level 5's nodes must all store, forever. So a loop that reads and writes the <em>same</em> storage slot on every iteration is paying that cost over and over for no reason. The habit: copy the storage value into a plain local variable once, do all the arithmetic on the local, and write the result back to storage a single time after the loop. It is not a trick, it is desk discipline, do not walk to the filing cabinet for every number you add; bring the folder to your desk, total it there, file it once.</p>\n<ul>\n  <li><strong>storage read/write:</strong> accessing a contract-level variable. Costly, because it touches the chain's persistent state that every node keeps.</li>\n  <li><strong>local variable:</strong> a variable declared inside a function. It lives on the stack or in memory for the call only and is cheap to touch.</li>\n  <li><strong>cache:</strong> load storage into a local, work on the local, store back once, collapsing N storage writes into one.</li>\n</ul>\n<p class=\"blueprint-line\"><code>uint256 local = stateVar;</code><br><code>for (...) { local += ...; }</code><br><code>stateVar = local;</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>uint256 sum = total;                    // one storage read\nfor (uint256 i = 0; i &lt; xs.length; i++) {\n    sum += xs[i];                       // arithmetic on a local\n}\ntotal = sum;                            // one storage write, after the loop</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The grader only scans your text; it has no way to measure gas. Compile both shapes in <code>remix.ethereum.org</code> (one that writes storage every iteration, one that writes once) and read the \"transaction cost\" numbers side by side.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Accumulator</code> with a <code>uint256 public total</code>. Add an <code>external</code> function <code>addMany(uint256[] calldata values)</code> that first caches storage into a local with <code>uint256 sum = total;</code>, then loops <code>for (uint256 i = 0; i &lt; values.length; i++)</code> doing <code>sum += values[i];</code>, and only after the loop writes back with <code>total = sum;</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">addMany([1, 2, 3]) when total is 10</span><code class=\"io-val\">total becomes 16, written to storage exactly once</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Accumulator {",
      "    uint256 public total;",
      "",
      "    function addMany(uint256[] calldata values) external {",
      "        uint256 sum = total;",
      "        for (uint256 i = 0; i < values.length; i++) {",
      "            sum += values[i];",
      "        }",
      "        total = sum;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare contract Accumulator: cache total, loop on a local, write back once\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Accumulator {\n    uint256 public total;\n\n    function addMany(uint256[] calldata values) external {\n        uint256 sum = total;\n        for (uint256 i = 0; i < values.length; i++) {\n            sum += values[i];\n        }\n        total = sum;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Accumulator\\s*\\{",
          "message": "Define a contract named Accumulator."
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+total\\s*;",
          "message": "Declare: uint256 public total;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+addMany\\s*\\(\\s*uint256\\[\\]\\s+calldata\\s+values\\s*\\)\\s+external",
          "message": "Define addMany(uint256[] calldata values) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+sum\\s*=\\s*total\\s*;",
          "message": "Cache storage first: uint256 sum = total;"
        },
        {
          "type": "matchesRegex",
          "pattern": "for\\s*\\(\\s*uint256\\s+i\\s*=\\s*0\\s*;\\s*i\\s*<\\s*values\\.length\\s*;",
          "message": "Loop with for (uint256 i = 0; i < values.length; i++)."
        },
        {
          "type": "matchesRegex",
          "pattern": "sum\\s*\\+=\\s*values\\[\\s*i\\s*\\]",
          "message": "Accumulate into the local: sum += values[i];"
        },
        {
          "type": "matchesRegex",
          "pattern": "for\\s*\\([\\s\\S]*total\\s*=\\s*sum\\s*;",
          "message": "Write back once, AFTER the loop: total = sum;"
        }
      ]
    },
    "explanation": "<p>Storage reads and writes dominate the gas cost of most loops, so collapsing N storage writes into one (by accumulating in a local and writing back after the loop) is often the single biggest saving available without changing behavior. It is a habit, not a micro-optimization: reach for a local whenever the same slot is touched repeatedly. The next challenge adds two more habits in the same spirit.</p>"
  },
  {
    "id": 323,
    "title": "calldata Arrays and unchecked Counters",
    "difficulty": "medium",
    "topic": "Gas-Aware Writing",
    "level": 7,
    "xp": 15,
    "instructions": "<p>Two more gas habits, both free of behavior changes. First: an <code>external</code> function's array argument already sits in <strong>calldata</strong>, the read-only region holding the transaction's input. Declare the parameter <code>calldata</code> and you read it in place; declare it <code>memory</code> and the compiler copies the whole thing first. Second: since 0.8.0 every <code>+</code> carries an overflow check (Level 5's arithmetic became safe by default). A loop counter that provably stops at <code>xs.length</code> (a number nowhere near 2^256) will never overflow, so wrapping just its increment in an <code>unchecked { }</code> block skips a check you do not need. Calldata is reading the letter in your hand instead of photocopying it first; <code>unchecked</code> is not re-counting to a million when you know you stopped at ten.</p>\n<ul>\n  <li><strong>calldata:</strong> the immutable area where call arguments live. Reading an array from it avoids the copy that <code>memory</code> forces.</li>\n  <li><strong>memory:</strong> a writable scratch region; assigning an external array to it copies every element.</li>\n  <li><strong>unchecked { }:</strong> a block where arithmetic skips 0.8.x overflow/underflow checks. Use only where overflow is provably impossible.</li>\n</ul>\n<p class=\"blueprint-line\"><code>function f(uint256[] calldata xs) external {</code><br><code>&nbsp;&nbsp;for (uint256 i = 0; i &lt; xs.length;) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;/* ... */ unchecked { ++i; }</code><br><code>&nbsp;&nbsp;}</code><br><code>}</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function total(uint256[] calldata xs) external pure returns (uint256 t) {\n    for (uint256 i = 0; i &lt; xs.length;) {\n        t += xs[i];\n        unchecked { ++i; }   // i stops at xs.length; it cannot overflow\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Remember this pane cannot compile or run a single line. Paste the contract into <code>remix.ethereum.org</code>, then try swapping <code>calldata</code> for <code>memory</code>, or removing the <code>unchecked</code> block, and watch the reported gas move.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>Summer</code> with a function <code>sumArray(uint256[] calldata xs) external pure returns (uint256)</code>. Inside, set <code>uint256 s = 0;</code>, then loop <code>for (uint256 i = 0; i &lt; xs.length;)</code> with an empty update clause, doing <code>s += xs[i];</code> then <code>unchecked { ++i; }</code> as the last statement in the body. Finally <code>return s;</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">sumArray([4, 5, 6])</span><code class=\"io-val\">15</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">xs parameter location</span><code class=\"io-val\">calldata, read in place, not copied to memory</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Summer {",
      "    function sumArray(uint256[] calldata xs) external pure returns (uint256) {",
      "        uint256 s = 0;",
      "        for (uint256 i = 0; i < xs.length;) {",
      "            s += xs[i];",
      "            unchecked { ++i; }",
      "        }",
      "        return s;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare contract Summer using calldata and an unchecked counter\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Summer {\n    function sumArray(uint256[] calldata xs) external pure returns (uint256) {\n        uint256 s = 0;\n        for (uint256 i = 0; i < xs.length;) {\n            s += xs[i];\n            unchecked { ++i; }\n        }\n        return s;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Summer\\s*\\{",
          "message": "Define a contract named Summer."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+sumArray\\s*\\(\\s*uint256\\[\\]\\s+calldata\\s+xs\\s*\\)\\s+external\\s+pure\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "Signature: sumArray(uint256[] calldata xs) external pure returns (uint256)."
        },
        {
          "type": "codeContains",
          "value": "calldata",
          "message": "The xs parameter must use the calldata data location."
        },
        {
          "type": "matchesRegex",
          "pattern": "for\\s*\\(\\s*uint256\\s+i\\s*=\\s*0\\s*;\\s*i\\s*<\\s*xs\\.length\\s*;\\s*\\)",
          "message": "Loop header must leave the update clause empty: for (uint256 i = 0; i < xs.length;)."
        },
        {
          "type": "matchesRegex",
          "pattern": "s\\s*\\+=\\s*xs\\[\\s*i\\s*\\]",
          "message": "Accumulate with s += xs[i];"
        },
        {
          "type": "matchesRegex",
          "pattern": "unchecked\\s*\\{\\s*\\+\\+i\\s*;?\\s*\\}",
          "message": "Increment inside an unchecked block: unchecked { ++i; }"
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+s\\s*;",
          "message": "Return the running total: return s;"
        }
      ]
    },
    "explanation": "<p><code>calldata</code> skips the copy that <code>memory</code> forces for an external function's arguments, and an <code>unchecked</code> block drops the overflow assertion 0.8.x adds to every <code>+</code>, safe only where you can prove it cannot overflow, like a loop index bounded by an array length. Neither changes what the function does; both trim gas. Save assembly-level tuning for when a profiler says you need it.</p>"
  },
  {
    "id": 324,
    "title": "Document a Function with NatSpec",
    "difficulty": "easy",
    "topic": "Documentation",
    "level": 7,
    "xp": 10,
    "instructions": "<p>Solidity has a structured comment format that tooling actually parses, called <strong>NatSpec</strong>. You write it with triple-slash <code>///</code> lines (or a <code>/** ... */</code> block) directly above a function, using tagged fields. The compiler emits it as <code>userdoc</code> and <code>devdoc</code> JSON; documentation generators build reference pages from it; a wallet can show the <code>@notice</code> line to someone about to sign a transaction (Level 6's signatures, the human-readable prompt has to come from somewhere); and an auditor treats a missing NatSpec block on an external function as a finding. It is the label on a medicine box: dosage, ingredients, warnings, in a fixed format, not free-form prose.</p>\n<ul>\n  <li><strong>@notice:</strong> what the function does, in plain language, for end users.</li>\n  <li><strong>@param name:</strong> what one named argument means. One tag per parameter.</li>\n  <li><strong>@return:</strong> what the function gives back.</li>\n  <li><strong>@dev:</strong> implementation notes aimed at other developers and auditors.</li>\n</ul>\n<p class=\"blueprint-line\"><code>/// @notice ...</code><br><code>/// @dev ...</code><br><code>/// @param name ...</code><br><code>/// @return ...</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>/// @notice Sends `amount` tokens from the caller to `to`.\n/// @dev Reverts if the caller's balance is below `amount`.\n/// @param to The recipient address.\n/// @param amount The number of tokens to send.\n/// @return success True when the transfer completed.\nfunction transfer(address to, uint256 amount) external returns (bool success) {\n    // ...\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor matches plain text and cannot parse NatSpec or compile the file, and note it strips comments before checking, so it can only verify the functions you are documenting, not the tags themselves. Load the contract in <code>remix.ethereum.org</code>, compile, and open the compiler's <em>devdoc</em> / <em>userdoc</em> output to see your tags turned into structured documentation.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>MathLib</code> with two functions. <code>add(uint256 a, uint256 b) external pure returns (uint256)</code> returns <code>a + b</code>; <code>sub(uint256 a, uint256 b) external pure returns (uint256)</code> returns <code>a - b</code>. Above <em>each</em> function, write a NatSpec block with <code>/// @notice</code>, a <code>/// @param a</code>, a <code>/// @param b</code>, a <code>/// @return</code>, and a <code>/// @dev</code> line.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">add(2, 3)</span><code class=\"io-val\">5</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">solc metadata</span><code class=\"io-val\">@notice text appears under userdoc; @dev / @param / @return under devdoc</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract MathLib {",
      "    /// @notice Adds two unsigned integers and returns the sum.",
      "    /// @dev Reverts on overflow under the default 0.8.x checked arithmetic.",
      "    /// @param a The first addend.",
      "    /// @param b The second addend.",
      "    /// @return The sum a + b.",
      "    function add(uint256 a, uint256 b) external pure returns (uint256) {",
      "        return a + b;",
      "    }",
      "",
      "    /// @notice Subtracts b from a and returns the difference.",
      "    /// @dev Reverts if b is greater than a.",
      "    /// @param a The value to subtract from.",
      "    /// @param b The value to subtract.",
      "    /// @return The difference a - b.",
      "    function sub(uint256 a, uint256 b) external pure returns (uint256) {",
      "        return a - b;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare contract MathLib and document both functions with NatSpec\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MathLib {\n    /// @notice Adds two unsigned integers and returns the sum.\n    /// @dev Reverts on overflow under the default 0.8.x checked arithmetic.\n    /// @param a The first addend.\n    /// @param b The second addend.\n    /// @return The sum a + b.\n    function add(uint256 a, uint256 b) external pure returns (uint256) {\n        return a + b;\n    }\n\n    /// @notice Subtracts b from a and returns the difference.\n    /// @dev Reverts if b is greater than a.\n    /// @param a The value to subtract from.\n    /// @param b The value to subtract.\n    /// @return The difference a - b.\n    function sub(uint256 a, uint256 b) external pure returns (uint256) {\n        return a - b;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+MathLib\\s*\\{",
          "message": "Define a contract named MathLib."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+add\\s*\\(\\s*uint256\\s+a\\s*,\\s*uint256\\s+b\\s*\\)\\s+external\\s+pure\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "Define add(uint256 a, uint256 b) external pure returns (uint256)."
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+a\\s*\\+\\s*b\\s*;",
          "message": "add should return a + b;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+sub\\s*\\(\\s*uint256\\s+a\\s*,\\s*uint256\\s+b\\s*\\)\\s+external\\s+pure\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "Define sub(uint256 a, uint256 b) external pure returns (uint256)."
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+a\\s*-\\s*b\\s*;",
          "message": "sub should return a - b;"
        }
      ]
    },
    "explanation": "<p>NatSpec is the contract's public documentation in a format tools understand: compilers emit it as <code>userdoc</code>/<code>devdoc</code> JSON, wallets can show <code>@notice</code> to someone about to sign, and auditors treat missing NatSpec on external functions as a finding. Writing it as you go is far cheaper than reconstructing intent months later from the bytecode.</p>"
  },
  {
    "id": 325,
    "title": "Read and Complete: Guarded grant()",
    "difficulty": "medium",
    "topic": "Control Flow & Guards",
    "level": 7,
    "xp": 15,
    "instructions": "<p>Reading a contract and filling in a missing function is the everyday work of a reviewer: you infer the intended rules from the names and the surrounding code, then make the body enforce them. Below is a small <code>AccessLog</code> contract. Its <code>owner</code> is set at deployment, it keeps an <code>allowed</code> allowlist, and it declares an <code>AccessGranted</code> event that Level 6's nodes and indexers can follow off-chain. The <code>grant()</code> function is stubbed, your job is to write its body so the stated guards hold and the event fires, in the order this level has drilled: checks, then the effect, then the log.</p>\n<ul>\n  <li><strong>allowlist:</strong> a <code>mapping(address =&gt; bool)</code> recording which addresses are permitted; <code>grant()</code> flips an entry to <code>true</code>.</li>\n  <li><strong>zero-address check:</strong> <code>require(x != address(0) ...)</code>, rejects the all-zero address, a common sign of an uninitialized or mistaken argument.</li>\n  <li><strong>order:</strong> both <code>require</code>s first, then <code>allowed[who] = true;</code>, then <code>emit AccessGranted(who);</code>.</li>\n</ul>\n<p class=\"blueprint-line\"><code>require(msg.sender == owner, \"not owner\");</code><br><code>require(who != address(0), \"zero address\");</code><br><code>allowed[who] = true;</code><br><code>emit AccessGranted(who);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// the same check -&gt; effect -&gt; log shape, on a different function\nfunction setConfig(uint256 v) external {\n    require(msg.sender == owner, \"not owner\");\n    config = v;\n    emit ConfigSet(v);\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Only the text of your answer is checked, there is no compiler in this pane. Once it passes, rebuild it in <code>remix.ethereum.org</code> and call <code>grant</code> from the wrong account, and with the zero address, to prove both guards fire.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">In the provided <code>AccessLog</code> contract, complete <code>grant(address who)</code> so it: calls <code>require(msg.sender == owner, \"not owner\")</code>; then <code>require(who != address(0), \"zero address\")</code>; then sets <code>allowed[who] = true;</code>; then does <code>emit AccessGranted(who);</code>. Keep the rest of the contract as given.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">grant(addr) from owner</span><code class=\"io-val\">allowed[addr] becomes true; AccessGranted(addr) emitted</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">grant(addr) from a non-owner</span><code class=\"io-val\">reverts: \"not owner\"</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">grant(address(0)) from owner</span><code class=\"io-val\">reverts: \"zero address\"</code></div>\n</div>",
    "hints": [
      "function grant(address who) external {",
      "    require(msg.sender == owner, \"not owner\");",
      "    require(who != address(0), \"zero address\");",
      "    allowed[who] = true;",
      "    emit AccessGranted(who);",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract AccessLog {\n    address public owner;\n    mapping(address => bool) public allowed;\n\n    event AccessGranted(address indexed who);\n\n    constructor() {\n        owner = msg.sender;\n    }\n\n    // Complete grant() so that it:\n    //   1. reverts with \"not owner\" unless msg.sender == owner\n    //   2. reverts with \"zero address\" if who == address(0)\n    //   3. sets allowed[who] = true\n    //   4. emits AccessGranted(who)\n    function grant(address who) external {\n        // your code here\n    }\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract AccessLog {\n    address public owner;\n    mapping(address => bool) public allowed;\n\n    event AccessGranted(address indexed who);\n\n    constructor() {\n        owner = msg.sender;\n    }\n\n    function grant(address who) external {\n        require(msg.sender == owner, \"not owner\");\n        require(who != address(0), \"zero address\");\n        allowed[who] = true;\n        emit AccessGranted(who);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+AccessLog\\s*\\{",
          "message": "Keep the contract named AccessLog."
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+AccessGranted\\s*\\(",
          "message": "Keep the AccessGranted event declaration."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*msg\\.sender\\s*==\\s*owner\\s*,\\s*\"[^\"]*\"\\s*\\)",
          "message": "First guard: require(msg.sender == owner, \"not owner\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*who\\s*!=\\s*address\\(\\s*0\\s*\\)\\s*,\\s*\"[^\"]*\"\\s*\\)",
          "message": "Second guard: require(who != address(0), \"zero address\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "allowed\\[\\s*who\\s*\\]\\s*=\\s*true\\s*;",
          "message": "Effect: allowed[who] = true;"
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+AccessGranted\\s*\\(\\s*who\\s*\\)\\s*;",
          "message": "Log: emit AccessGranted(who);"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\([\\s\\S]*allowed\\[\\s*who\\s*\\]\\s*=\\s*true[\\s\\S]*emit\\s+AccessGranted",
          "message": "Order must be: require checks, then allowed[who] = true;, then emit."
        }
      ]
    },
    "explanation": "<p>Reading a contract and completing it is the day-to-day work of an auditor or a maintainer: infer the intended guards from names and context, then make the code enforce them. Here the order matters (checks first, then the state change, then the event) the same shape you will harden against reentrancy in the security level.</p>"
  },
  {
    "id": 326,
    "title": "Read and Complete: Modifier, Custom Error, Event",
    "difficulty": "medium",
    "topic": "Control Flow & Guards",
    "level": 7,
    "xp": 15,
    "instructions": "<p>This one puts the whole guard vocabulary of the level into a single small contract: a <code>modifier</code> to factor out an access check, a custom <code>error</code> for the cheap revert path, and an <code>event</code> so off-chain systems (Level 6's nodes and indexers) see the state change. The <code>Pausable</code> contract below sets its <code>owner</code> at deployment and declares both <code>NotOwner</code> and <code>PausedSet</code>. Two bodies are stubbed: the <code>onlyOwner</code> modifier and the <code>setPaused</code> function. Fill them in so a non-owner call reverts with the custom error, and an owner call flips <code>paused</code> and emits the event.</p>\n<ul>\n  <li><strong>onlyOwner (here):</strong> must do <code>if (msg.sender != owner) revert NotOwner(msg.sender);</code> and then <code>_;</code> so the wrapped function runs only for the owner.</li>\n  <li><strong>custom error path:</strong> <code>revert NotOwner(msg.sender)</code> aborts and returns the error's selector plus the caller address, cheaper than a <code>require</code> string.</li>\n  <li><strong>setPaused:</strong> after the modifier admits the call, do <code>paused = state;</code> then <code>emit PausedSet(state);</code>.</li>\n</ul>\n<p class=\"blueprint-line\"><code>modifier onlyOwner() { if (msg.sender != owner) revert NotOwner(msg.sender); _; }</code><br><code>function setPaused(bool state) external onlyOwner { paused = state; emit PausedSet(state); }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>error NotOwner(address caller);\nevent OwnerAction(address indexed by);\n\nmodifier onlyOwner() {\n    if (msg.sender != owner) revert NotOwner(msg.sender);\n    _;\n}\n\nfunction act() external onlyOwner {\n    emit OwnerAction(msg.sender);\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This pane grades characters, not execution. Finish it, then paste into <code>remix.ethereum.org</code>, deploy, and call <code>setPaused</code> from a non-owner account to watch <code>NotOwner</code> revert before <code>PausedSet</code> could ever emit.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">In the provided <code>Pausable</code> contract, complete the <code>onlyOwner()</code> modifier with <code>if (msg.sender != owner) revert NotOwner(msg.sender);</code> followed by <code>_;</code>. Then complete <code>setPaused(bool state)</code> (already marked <code>external onlyOwner</code>) so it runs <code>paused = state;</code> then <code>emit PausedSet(state);</code>. Leave the declarations as given.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">setPaused(true) from owner</span><code class=\"io-val\">paused becomes true; PausedSet(true) emitted</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">setPaused(true) from a non-owner</span><code class=\"io-val\">reverts with NotOwner(caller)</code></div>\n</div>",
    "hints": [
      "modifier onlyOwner() {",
      "    if (msg.sender != owner) revert NotOwner(msg.sender);",
      "    _;",
      "}",
      "",
      "function setPaused(bool state) external onlyOwner {",
      "    paused = state;",
      "    emit PausedSet(state);",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Pausable {\n    address public owner;\n    bool public paused;\n\n    error NotOwner(address caller);\n    event PausedSet(bool isPaused);\n\n    constructor() {\n        owner = msg.sender;\n    }\n\n    // Complete onlyOwner: revert NotOwner(msg.sender) if the caller\n    // is not owner, otherwise run the function body.\n    modifier onlyOwner() {\n        // your code here\n    }\n\n    // Complete setPaused: store state in paused, then emit PausedSet(state).\n    function setPaused(bool state) external onlyOwner {\n        // your code here\n    }\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Pausable {\n    address public owner;\n    bool public paused;\n\n    error NotOwner(address caller);\n    event PausedSet(bool isPaused);\n\n    constructor() {\n        owner = msg.sender;\n    }\n\n    modifier onlyOwner() {\n        if (msg.sender != owner) revert NotOwner(msg.sender);\n        _;\n    }\n\n    function setPaused(bool state) external onlyOwner {\n        paused = state;\n        emit PausedSet(state);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Pausable\\s*\\{",
          "message": "Keep the contract named Pausable."
        },
        {
          "type": "matchesRegex",
          "pattern": "error\\s+NotOwner\\s*\\(\\s*address\\s+caller\\s*\\)\\s*;",
          "message": "Keep the declaration error NotOwner(address caller);"
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+PausedSet\\s*\\(",
          "message": "Keep the PausedSet event declaration."
        },
        {
          "type": "matchesRegex",
          "pattern": "modifier\\s+onlyOwner\\s*\\(\\s*\\)",
          "message": "Keep the modifier onlyOwner()."
        },
        {
          "type": "matchesRegex",
          "pattern": "if\\s*\\(\\s*msg\\.sender\\s*!=\\s*owner\\s*\\)\\s*\\{?\\s*revert\\s+NotOwner\\s*\\(\\s*msg\\.sender\\s*\\)\\s*;",
          "message": "In onlyOwner: if (msg.sender != owner) revert NotOwner(msg.sender);"
        },
        {
          "type": "codeContains",
          "value": "_;",
          "message": "End the modifier with the _; placeholder."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+setPaused\\s*\\(\\s*bool\\s+state\\s*\\)\\s+external\\s+onlyOwner",
          "message": "Keep setPaused(bool state) external onlyOwner."
        },
        {
          "type": "matchesRegex",
          "pattern": "paused\\s*=\\s*state\\s*;",
          "message": "In setPaused: paused = state;"
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+PausedSet\\s*\\(\\s*state\\s*\\)\\s*;",
          "message": "Then emit PausedSet(state);"
        }
      ]
    },
    "explanation": "<p>This is the whole guard vocabulary of the level in one function: a <code>modifier</code> to factor out the check, a custom <code>error</code> for the cheap revert, and an <code>event</code> so off-chain systems see the state change. Recognizing this trio on sight is most of what reading production access-control code requires.</p>"
  },
  {
    "id": 327,
    "title": "Declaring an Interface",
    "difficulty": "easy",
    "topic": "Inheritance & Interfaces",
    "level": 7,
    "xp": 10,
    "instructions": "<p>An <strong>interface</strong> is a contract's job description with none of the work filled in: a list of function signatures and nothing else, no bodies, no state variables, no constructor. It is how one contract describes the shape of another it wants to talk to, without needing that other contract's source. Level 6's Vyper detour marked every externally-reachable function with <code>@external</code>; a Solidity interface is built entirely from that idea, every function in it is callable from outside, so the <code>external</code> keyword is mandatory on each line. Think of a restaurant menu: it names each dish and what it costs, but says nothing about how the kitchen makes it. You order from the menu; the kitchen's recipe is its own business.</p>\n<ul>\n  <li><strong>interface:</strong> a type declared with <code>interface Name { ... }</code> holding only function signatures. It cannot be deployed and holds no logic.</li>\n  <li><strong>function signature:</strong> the name, parameter types, visibility, mutability and return types, everything except the <code>{ }</code> body. It ends with a semicolon instead.</li>\n  <li><strong>external:</strong> visibility meaning \"called via a message from outside this contract\". Interface functions are implicitly external, but Solidity still requires you to write the word.</li>\n</ul>\n<p class=\"blueprint-line\"><code>interface IName {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;function fname(type) external returns (type);</code><br><code>}</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>interface ICounter {\n    function current() external view returns (uint256);\n    function increment() external;\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>PyDrop grades this as plain text and never compiles it. Drop your interface into <code>remix.ethereum.org</code>, add a contract that says <code>is IThing</code> but skips the function, and watch the compiler refuse it with a \"missing implementation\" error, that is the interface doing its job.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Declare an <code>interface</code> named <code>IThing</code> containing exactly one function: <code>foo</code>, taking a single <code>uint256</code> parameter, marked <code>external</code>, returning <code>bool</code>. Write the signature only, end it with a semicolon, no <code>{ }</code> body.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">IThing</span><code class=\"io-val\">a type with one signature: foo(uint256) external returns (bool);</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">deploy IThing</span><code class=\"io-val\">impossible, interfaces are not deployable</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "interface IThing {",
      "    function foo(uint256 value) external returns (bool);",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare the IThing interface below\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ninterface IThing {\n    function foo(uint256 value) external returns (bool);\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "interface\\s+IThing\\s*\\{",
          "message": "Declare: interface IThing { ... }"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+foo\\s*\\(\\s*uint256",
          "message": "The function is foo(uint256 ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\bexternal\\b",
          "message": "Interface functions must be marked external."
        },
        {
          "type": "matchesRegex",
          "pattern": "returns\\s*\\(\\s*bool\\s*\\)\\s*;",
          "message": "It must end 'returns (bool);' with a semicolon and no body."
        }
      ]
    },
    "explanation": "<p>An interface is pure shape: it compiles to no bytecode of its own and costs nothing to include. Its whole purpose is the next few challenges, you will take a plain <code>address</code>, wrap it as <code>IThing(addr)</code>, and call <code>foo</code> on a contract you never compiled alongside your own.</p>"
  },
  {
    "id": 328,
    "title": "Inheriting From a Parent Contract",
    "difficulty": "medium",
    "topic": "Inheritance & Interfaces",
    "level": 7,
    "xp": 15,
    "instructions": "<p>One contract can build on another with the <code>is</code> keyword: <code>contract Child is Parent</code> means <code>Child</code> starts with every state variable and every non-<code>private</code> function that <code>Parent</code> declared, already present, as if you had typed them again. You then add whatever is specific to <code>Child</code>. Level 5's blockchain gave every <code>Block</code> the same required fields by defining them once in a dataclass; inheritance is that same \"define the common part once\" move, except the common part includes behaviour, not just data. A useful picture is a specialist who did the generalist's training first: they know everything the generalist knows, plus their own extra skills, without re-learning the basics.</p>\n<ul>\n  <li><strong>inheritance:</strong> <code>contract Child is Parent</code>, <code>Child</code> gains <code>Parent</code>'s storage layout and its <code>public</code>/<code>internal</code> functions.</li>\n  <li><strong>private vs internal:</strong> <code>private</code> members are hidden from children; <code>internal</code> and <code>public</code> members are inherited and callable from inside the child.</li>\n  <li><strong>inherited call:</strong> from inside <code>Child</code> you invoke a parent function by its bare name, exactly as if it were defined locally.</li>\n</ul>\n<p class=\"blueprint-line\"><code>contract Parent { /* state + functions */ }</code><br><code>contract Child is Parent {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;// parent members already in scope here</code><br><code>}</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>contract Owned {\n    address public owner;\n    function _claim() internal { owner = msg.sender; }\n}\n\ncontract Token is Owned {\n    constructor() { _claim(); }   // _claim came from Owned\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor only matches text here. In <code>remix.ethereum.org</code>, deploy <code>Child</code> alone and call <code>count()</code>, the getter you never wrote in <code>Child</code> is there because it was inherited from <code>Parent</code>.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract Parent</code> with a <code>public</code> state variable <code>count</code> of type <code>uint256</code> and a <code>public</code> function <code>increment()</code> whose body is <code>count += 1;</code>. Then write <code>contract Child is Parent</code> with a <code>public</code> function <code>incrementTwice()</code> that calls <code>increment()</code> twice.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">Child.incrementTwice()</span><code class=\"io-val\">count rises by 2</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">Child.count()</span><code class=\"io-val\">readable, getter inherited from Parent</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Parent {",
      "    uint256 public count;",
      "",
      "    function increment() public {",
      "        count += 1;",
      "    }",
      "}",
      "",
      "contract Child is Parent {",
      "    function incrementTwice() public {",
      "        increment();",
      "        increment();",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Parent first, then Child is Parent\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Parent {\n    uint256 public count;\n\n    function increment() public {\n        count += 1;\n    }\n}\n\ncontract Child is Parent {\n    function incrementTwice() public {\n        increment();\n        increment();\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Parent\\s*\\{",
          "message": "Define contract Parent."
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+count\\s*;",
          "message": "Parent needs: uint256 public count;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+increment\\s*\\(\\s*\\)\\s+public",
          "message": "Parent needs a public function increment()."
        },
        {
          "type": "matchesRegex",
          "pattern": "count\\s*\\+=\\s*1",
          "message": "increment() should do count += 1;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Child\\s+is\\s+Parent\\s*\\{",
          "message": "Define: contract Child is Parent { ... }"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+incrementTwice\\s*\\(\\s*\\)\\s+public",
          "message": "Child needs a public function incrementTwice()."
        },
        {
          "type": "matchesRegex",
          "pattern": "incrementTwice\\s*\\([\\s\\S]*?increment\\s*\\(\\s*\\)\\s*;[\\s\\S]*?increment\\s*\\(\\s*\\)\\s*;",
          "message": "incrementTwice() must call increment(); twice."
        }
      ]
    },
    "explanation": "<p><code>Child</code> never re-declares <code>count</code> or <code>increment</code>, yet both belong to it, that is the entire economy of inheritance. It is how you will use OpenZeppelin's <code>Ownable</code> and <code>ERC20</code> later this level: inherit the audited base, add only your differences. Next: replacing what a parent does, not just reusing it.</p>"
  },
  {
    "id": 329,
    "title": "virtual and override",
    "difficulty": "medium",
    "topic": "Inheritance & Interfaces",
    "level": 7,
    "xp": 15,
    "instructions": "<p>By default a child cannot change an inherited function, it is locked. To allow a child to replace it, mark the base version <code>virtual</code>; the child then marks its replacement <code>override</code>. The signature must stay identical (same name, parameters, visibility, return types); only the body changes. Level 5's hashing work leaned on this without naming it: swap SHA-256 for Keccak and every caller keeps working, because the shape (bytes in, digest out) never moved. <code>virtual</code>/<code>override</code> is that guarantee made explicit: the callers keep calling <code>fee()</code>, and which body runs depends only on which contract they hold.</p>\n<ul>\n  <li><strong>virtual:</strong> written on a base function to declare \"a child is permitted to override this\".</li>\n  <li><strong>override:</strong> written on a child function to declare \"this replaces a base <code>virtual</code> function of the same signature\". The compiler checks the match.</li>\n  <li><strong>signature:</strong> name, parameter list, visibility and return types. If any of these differ, it is a new function, not an override, and the compiler complains.</li>\n</ul>\n<p class=\"blueprint-line\"><code>function f() public pure virtual returns (uint256) { ... }</code><br><code>// in the child:</code><br><code>function f() public pure override returns (uint256) { ... }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>contract Base {\n    function rate() public pure virtual returns (uint256) { return 100; }\n}\n\ncontract Promo is Base {\n    function rate() public pure override returns (uint256) { return 50; }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Only the text of your answer is checked here. Paste both contracts into <code>remix.ethereum.org</code>, deploy <code>Discounted</code>, and call <code>fee()</code>, you get the child's number, and the base body is shadowed for that instance.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract Base</code> with a function <code>fee()</code> marked <code>public pure virtual</code> returning <code>uint256</code>, whose body is <code>return 10;</code>. Then write <code>contract Discounted is Base</code> that overrides <code>fee()</code> as <code>public pure override</code> returning <code>uint256</code>, with body <code>return 5;</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">Base.fee()</span><code class=\"io-val\">10</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">Discounted.fee()</span><code class=\"io-val\">5</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Base {",
      "    function fee() public pure virtual returns (uint256) {",
      "        return 10;",
      "    }",
      "}",
      "",
      "contract Discounted is Base {",
      "    function fee() public pure override returns (uint256) {",
      "        return 5;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Base with a virtual fee(), then Discounted overriding it\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Base {\n    function fee() public pure virtual returns (uint256) {\n        return 10;\n    }\n}\n\ncontract Discounted is Base {\n    function fee() public pure override returns (uint256) {\n        return 5;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Base\\s*\\{",
          "message": "Define contract Base."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+fee\\s*\\(\\s*\\)[^{]*\\bvirtual\\b[^{]*returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "Base.fee() must be marked virtual and return uint256."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\bpure\\b",
          "message": "Both fee() functions should be pure."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\breturn\\s+10\\s*;",
          "message": "Base.fee() returns 10."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Discounted\\s+is\\s+Base",
          "message": "Define: contract Discounted is Base."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+fee\\s*\\(\\s*\\)[^{]*\\boverride\\b[^{]*returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "Discounted.fee() must be marked override and return uint256."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\breturn\\s+5\\s*;",
          "message": "Discounted.fee() returns 5."
        }
      ]
    },
    "explanation": "<p>Leave off <code>virtual</code> and the child cannot override; leave off <code>override</code> and the compiler rejects the child, the pairing is deliberate, so an override is always a conscious choice on both sides. Every OpenZeppelin hook you will customise (<code>_beforeTokenTransfer</code> and friends) is a <code>virtual</code> function waiting for your <code>override</code>. Next: a base that supplies no body at all.</p>"
  },
  {
    "id": 330,
    "title": "Abstract Contracts",
    "difficulty": "medium",
    "topic": "Inheritance & Interfaces",
    "level": 7,
    "xp": 15,
    "instructions": "<p>An <strong>abstract contract</strong> sits between an interface and a full contract: it can hold real state and real functions, but it also declares at least one function with no body, a signature, a semicolon, and the word <code>virtual</code>. Because a piece is missing, it cannot be deployed. Any child that inherits it must supply that body; if the child forgets even one, the child is abstract too and will not compile. Level 5's blockchain fixed which fields every <code>Block</code> had to carry; an abstract contract fixes which <em>functions</em> every implementation must provide, while leaving the how to each one. It is a fill-in-the-blanks template: useless until every blank is completed, but it locks the structure everyone has to follow.</p>\n<ul>\n  <li><strong>abstract contract:</strong> prefixed with <code>abstract</code>; has one or more functions without bodies. Not deployable on its own.</li>\n  <li><strong>unimplemented function:</strong> <code>function f() ... virtual returns (T);</code>, signature then semicolon, no braces. It must be <code>virtual</code>.</li>\n  <li><strong>concrete contract:</strong> one in which every inherited function has a body. Only concrete contracts can be deployed.</li>\n</ul>\n<p class=\"blueprint-line\"><code>abstract contract Name {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;function f() public view virtual returns (T);</code><br><code>}</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>abstract contract Animal {\n    function sound() public pure virtual returns (string memory);\n}\n\ncontract Dog is Animal {\n    function sound() public pure override returns (string memory) {\n        return \"woof\";\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This sandbox checks text only. In <code>remix.ethereum.org</code>, notice the deploy panel will not offer <code>Shape</code> at all, then comment out <code>Square</code>'s <code>area</code> body and watch compilation fail with \"missing implementation\".</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>abstract contract Shape</code> with an unimplemented function <code>area()</code> marked <code>public view virtual</code> returning <code>uint256</code> (signature then semicolon, no body). Then write <code>contract Square is Shape</code> with a <code>public</code> state variable <code>side</code> of type <code>uint256</code>, a <code>constructor(uint256 _side)</code> that sets <code>side = _side;</code>, and <code>area()</code> marked <code>public view override</code> returning <code>uint256</code> with body <code>return side * side;</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">deploy Shape</span><code class=\"io-val\">not possible, area() has no body</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">Square(4).area()</span><code class=\"io-val\">16</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "abstract contract Shape {",
      "    function area() public view virtual returns (uint256);",
      "}",
      "",
      "contract Square is Shape {",
      "    uint256 public side;",
      "",
      "    constructor(uint256 _side) {",
      "        side = _side;",
      "    }",
      "",
      "    function area() public view override returns (uint256) {",
      "        return side * side;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// abstract Shape with an unimplemented area(), then a concrete Square\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nabstract contract Shape {\n    function area() public view virtual returns (uint256);\n}\n\ncontract Square is Shape {\n    uint256 public side;\n\n    constructor(uint256 _side) {\n        side = _side;\n    }\n\n    function area() public view override returns (uint256) {\n        return side * side;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "abstract\\s+contract\\s+Shape\\s*\\{",
          "message": "Declare: abstract contract Shape { ... }"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+area\\s*\\(\\s*\\)[^{;]*\\bvirtual\\b[^{;]*returns\\s*\\(\\s*uint256\\s*\\)\\s*;",
          "message": "area() in Shape is a virtual signature ending in ';' with no body."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Square\\s+is\\s+Shape",
          "message": "Define: contract Square is Shape."
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+side\\s*;",
          "message": "Square needs: uint256 public side;"
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*uint256\\s+_side\\s*\\)",
          "message": "Add constructor(uint256 _side)."
        },
        {
          "type": "matchesRegex",
          "pattern": "side\\s*=\\s*_side\\s*;",
          "message": "The constructor should set side = _side;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+area\\s*\\(\\s*\\)[^{]*\\boverride\\b[^{]*returns\\s*\\(\\s*uint256\\s*\\)\\s*\\{",
          "message": "Square.area() must be marked override with a body."
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+side\\s*\\*\\s*side\\s*;",
          "message": "area() should return side * side;"
        }
      ]
    },
    "explanation": "<p>The missing body is the point: <code>Shape</code> guarantees that anything calling itself a shape answers <code>area()</code>, while staying silent on the formula. This is the pattern behind OpenZeppelin's <code>ERC20</code>, which implements transfers and balances but leaves decisions like minting policy to you. Next: reaching back into a parent's version instead of discarding it.</p>"
  },
  {
    "id": 331,
    "title": "super and Constructor Chaining",
    "difficulty": "medium",
    "topic": "Inheritance & Interfaces",
    "level": 7,
    "xp": 15,
    "instructions": "<p>An override does not have to throw the parent's version away. Inside the child's function, <code>super.f()</code> runs the parent's <code>f</code> first, and then you add to its result, extending behaviour rather than replacing it. Separately, when a parent's <code>constructor</code> takes arguments, the child must hand them up: you write the parent's name with the argument between the child constructor's parameter list and its opening brace, as <code>constructor(...) Parent(arg) { }</code>. Level 5's chain of linked blocks had each block reference the previous block's hash to stay anchored to what came before; <code>super</code> is that same \"call back to the thing behind me\" gesture, one inheritance level up instead of one block back. The picture: a manager who signs your report only after their own supervisor has already signed it.</p>\n<ul>\n  <li><strong>super:</strong> inside an override, <code>super.f()</code> invokes the parent's implementation of <code>f</code>, whichever contract that resolves to.</li>\n  <li><strong>constructor chaining:</strong> <code>constructor(args) Parent(parentArgs) { ... }</code>, the parent constructor runs before the child constructor body.</li>\n  <li><strong>initializer position:</strong> the <code>Parent(...)</code> call goes after the parameter list and before the <code>{</code>. The child body may be empty (<code>{}</code>) if there is nothing extra to do.</li>\n</ul>\n<p class=\"blueprint-line\"><code>constructor(string memory x) Parent(x) { ... }</code><br><code>function f() public view override returns (T) { return super.f(); }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>contract A {\n    uint256 public n;\n    constructor(uint256 _n) { n = _n; }\n    function tag() public view virtual returns (uint256) { return n; }\n}\n\ncontract B is A {\n    constructor(uint256 _n) A(_n) {}\n    function tag() public view override returns (uint256) {\n        return super.tag() + 1;   // parent's value, then add\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Text is all the editor inspects. In <code>remix.ethereum.org</code>, deploy <code>Tagged</code> with a constructor string and call <code>describe()</code>, you should see the parent's string with the child's <code>\"!\"</code> appended, proving both bodies ran.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract Base</code> with a <code>public</code> state variable <code>label</code> of type <code>string</code>, a <code>constructor(string memory _label)</code> that sets <code>label = _label;</code>, and a function <code>describe()</code> marked <code>public view virtual</code> returning <code>string memory</code> with body <code>return label;</code>. Then write <code>contract Tagged is Base</code> whose <code>constructor(string memory _label)</code> chains <code>Base(_label)</code> with an empty body, and whose <code>describe()</code> is <code>public view override</code> returning <code>string memory</code> with body <code>return string.concat(super.describe(), \"!\");</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">Tagged(\"hi\").describe()</span><code class=\"io-val\">\"hi!\"</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Base {",
      "    string public label;",
      "",
      "    constructor(string memory _label) {",
      "        label = _label;",
      "    }",
      "",
      "    function describe() public view virtual returns (string memory) {",
      "        return label;",
      "    }",
      "}",
      "",
      "contract Tagged is Base {",
      "    constructor(string memory _label) Base(_label) {}",
      "",
      "    function describe() public view override returns (string memory) {",
      "        return string.concat(super.describe(), \"!\");",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Base with a constructor arg and a virtual describe(); Tagged chains and extends it\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Base {\n    string public label;\n\n    constructor(string memory _label) {\n        label = _label;\n    }\n\n    function describe() public view virtual returns (string memory) {\n        return label;\n    }\n}\n\ncontract Tagged is Base {\n    constructor(string memory _label) Base(_label) {}\n\n    function describe() public view override returns (string memory) {\n        return string.concat(super.describe(), \"!\");\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "function\\s+describe\\s*\\(\\s*\\)[^{]*\\bvirtual\\b",
          "message": "Base.describe() must be virtual."
        },
        {
          "type": "matchesRegex",
          "pattern": "label\\s*=\\s*_label\\s*;",
          "message": "Base's constructor should set label = _label;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Tagged\\s+is\\s+Base",
          "message": "Define: contract Tagged is Base."
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*string\\s+memory\\s+_label\\s*\\)\\s*Base\\s*\\(\\s*_label\\s*\\)",
          "message": "Chain the parent constructor: constructor(string memory _label) Base(_label)."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+describe\\s*\\(\\s*\\)[^{]*\\boverride\\b",
          "message": "Tagged.describe() must be marked override."
        },
        {
          "type": "matchesRegex",
          "pattern": "string\\.concat\\s*\\(\\s*super\\.describe\\s*\\(\\s*\\)\\s*,\\s*\"!\"\\s*\\)",
          "message": "Return string.concat(super.describe(), \"!\");"
        }
      ]
    },
    "explanation": "<p><code>super.describe()</code> is what lets a child layer onto a parent instead of restating it, every OpenZeppelin hook override ends with <code>super._hook(...)</code> for exactly this reason. And once a parent constructor takes an argument, chaining is not optional: skip <code>Base(_label)</code> and the contract will not compile. Next: what <code>super</code> means when there is more than one parent.</p>"
  },
  {
    "id": 332,
    "title": "Multiple Inheritance and Linearization",
    "difficulty": "hard",
    "topic": "Inheritance & Interfaces",
    "level": 7,
    "xp": 25,
    "instructions": "<p>A contract can inherit from several parents at once: <code>contract C is A, B</code>. The moment more than one branch defines a function with the same name, Solidity needs a rule for which body wins and what <code>super</code> points at. That rule is <strong>C3 linearization</strong>: the compiler flattens the whole inheritance graph into one ordered list, running from the most base-like contract to the most derived. You list your parents from most-base to most-derived; listing a contract before one of its own base contracts is a compile error.</p>\n<p>Inside <code>C</code>, <code>super.who()</code> does not mean \"A's <code>who</code>\" or \"B's <code>who</code>\" specifically, it means \"the next <code>who</code> in <code>C</code>'s linearized list\". That list walks the <code>is A, B</code> parents right-to-left, so <code>B</code> comes before <code>A</code>, and the shared <code>Base</code> comes last. The consequence trips people up: when <code>B.who()</code> calls <code>super.who()</code>, in <code>C</code>'s context that resolves to <code>A.who()</code>, not to <code>B</code>'s own parent <code>Base</code>. The externally reachable version is always the <strong>most derived</strong> one, <code>C</code>'s own body. When a function is defined in more than one direct parent, <code>C</code> must override it and name each of them: <code>override(A, B)</code>. Level 6's node challenges needed a deterministic way to settle peers that disagree; linearization is the compiler's deterministic tie-break when inheritance branches collide.</p>\n<ul>\n  <li><strong>C3 linearization:</strong> the algorithm that turns a multi-parent graph into a single ordered chain. Python uses the same algorithm for its method resolution order.</li>\n  <li><strong>parent order:</strong> in <code>is A, B</code>, both are more base than <code>C</code>; listing a contract ahead of its own base is rejected.</li>\n  <li><strong>override(A, B):</strong> required when the overridden function is declared in multiple direct parents; it names each one.</li>\n  <li><strong>super order:</strong> right-to-left across the <code>is</code> list, the last-named parent's body runs first, and each <code>super</code> steps one place further along <em>C</em>'s list, not the parent's own.</li>\n</ul>\n<p class=\"blueprint-line\"><code>contract Base { function who() public pure virtual ... }</code><br><code>contract A is Base { ... override ... super.who() ... }</code><br><code>contract B is Base { ... override ... super.who() ... }</code><br><code>contract C is A, B { ... override(A, B) ... super.who() ... }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>contract Base {\n    function who() public pure virtual returns (string memory) { return \"Base\"; }\n}\n\ncontract A is Base {\n    function who() public pure virtual override returns (string memory) {\n        return string.concat(\"A&lt;-\", super.who());\n    }\n}\n\ncontract B is Base {\n    function who() public pure virtual override returns (string memory) {\n        return string.concat(\"B&lt;-\", super.who());\n    }\n}\n\ncontract C is A, B {\n    function who() public pure override(A, B) returns (string memory) {\n        return string.concat(\"C&lt;-\", super.who());\n    }\n}\n// C's list: [C, B, A, Base]  =&gt;  C().who() == \"C&lt;-B&lt;-A&lt;-Base\"</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The grader only reads text. To watch linearization happen, paste this into <code>remix.ethereum.org</code>, deploy <code>C</code>, call <code>who()</code>, and read the chain <code>\"C&lt;-B&lt;-A&lt;-Base\"</code>. Swap <code>is A, B</code> to <code>is B, A</code> and it still compiles, but the chain flips to <code>\"C&lt;-A&lt;-B&lt;-Base\"</code>, proof that order is a real choice, not decoration.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Build the diamond. <code>contract Base</code> with <code>who()</code> marked <code>public pure virtual</code> returning <code>string memory</code>, body <code>return \"Base\";</code>. <code>contract A is Base</code> overriding <code>who()</code> as <code>public pure virtual override</code>, body <code>return string.concat(\"A&lt;-\", super.who());</code>. <code>contract B is Base</code> overriding <code>who()</code> as <code>public pure virtual override</code>, body <code>return string.concat(\"B&lt;-\", super.who());</code>. <code>contract C is A, B</code> overriding <code>who()</code> as <code>public pure override(A, B)</code>, body <code>return string.concat(\"C&lt;-\", super.who());</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">C().who()</span><code class=\"io-val\">\"C&lt;-B&lt;-A&lt;-Base\"</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">B.who()'s super inside C</span><code class=\"io-val\">resolves to A.who(), not Base.who()</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Base {",
      "    function who() public pure virtual returns (string memory) {",
      "        return \"Base\";",
      "    }",
      "}",
      "",
      "contract A is Base {",
      "    function who() public pure virtual override returns (string memory) {",
      "        return string.concat(\"A<-\", super.who());",
      "    }",
      "}",
      "",
      "contract B is Base {",
      "    function who() public pure virtual override returns (string memory) {",
      "        return string.concat(\"B<-\", super.who());",
      "    }",
      "}",
      "",
      "contract C is A, B {",
      "    function who() public pure override(A, B) returns (string memory) {",
      "        return string.concat(\"C<-\", super.who());",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Base, then A is Base and B is Base, then C is A, B, each who() chains through super\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Base {\n    function who() public pure virtual returns (string memory) {\n        return \"Base\";\n    }\n}\n\ncontract A is Base {\n    function who() public pure virtual override returns (string memory) {\n        return string.concat(\"A<-\", super.who());\n    }\n}\n\ncontract B is Base {\n    function who() public pure virtual override returns (string memory) {\n        return string.concat(\"B<-\", super.who());\n    }\n}\n\ncontract C is A, B {\n    function who() public pure override(A, B) returns (string memory) {\n        return string.concat(\"C<-\", super.who());\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+A\\s+is\\s+Base\\s*\\{",
          "message": "Define: contract A is Base."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+B\\s+is\\s+Base\\s*\\{",
          "message": "Define: contract B is Base."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+C\\s+is\\s+A\\s*,\\s*B\\s*\\{",
          "message": "Define: contract C is A, B."
        },
        {
          "type": "matchesRegex",
          "pattern": "override\\s*\\(\\s*A\\s*,\\s*B\\s*\\)",
          "message": "C.who() must be marked override(A, B)."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\bvirtual\\b",
          "message": "Base.who(), A.who() and B.who() must be virtual so they can be overridden further down."
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+\"Base\"\\s*;",
          "message": "Base.who() returns \"Base\"."
        },
        {
          "type": "matchesRegex",
          "pattern": "string\\.concat\\s*\\(\\s*\"A<-\"\\s*,\\s*super\\.who\\s*\\(\\s*\\)\\s*\\)",
          "message": "A.who() returns string.concat(\"A<-\", super.who())."
        },
        {
          "type": "matchesRegex",
          "pattern": "string\\.concat\\s*\\(\\s*\"B<-\"\\s*,\\s*super\\.who\\s*\\(\\s*\\)\\s*\\)",
          "message": "B.who() returns string.concat(\"B<-\", super.who())."
        },
        {
          "type": "matchesRegex",
          "pattern": "string\\.concat\\s*\\(\\s*\"C<-\"\\s*,\\s*super\\.who\\s*\\(\\s*\\)\\s*\\)",
          "message": "C.who() returns string.concat(\"C<-\", super.who())."
        }
      ]
    },
    "explanation": "<p>The output <code>\"C&lt;-B&lt;-A&lt;-Base\"</code> is <code>C</code>'s linearized list made visible: <code>C</code> &rarr; <code>B</code> (rightmost parent) &rarr; <code>A</code> &rarr; <code>Base</code>. The surprise is the middle step, <code>B</code>'s <code>super</code> lands on <code>A</code>, a contract <code>B</code> knows nothing about, because <code>super</code> follows the <em>final</em> contract's list. Real stacks like <code>ERC20Burnable, ERC20Pausable, ERC20</code> depend on this so each mixin's logic runs exactly once, in a predictable order. You rarely hand-write these chains, but you must be able to read them, the security level leans on knowing which body actually executes.</p>"
  },
  {
    "id": 333,
    "title": "Casting an Address to an Interface",
    "difficulty": "medium",
    "topic": "Calling Other Contracts",
    "level": 7,
    "xp": 15,
    "instructions": "<p>You often hold nothing but an <code>address</code> that you know points at a contract implementing some interface. Wrap that address in the interface type, <code>IERC20(token)</code> (and you can call its functions with ordinary dot syntax; the compiler encodes the call and sends it as a message. The interface definition has to be in scope: declared in your file, or imported. Level 6's Merkle-proof checks confirmed a leaf belonged to a tree you never held in full; this is the same posture toward code) you call a contract you never compiled, trusting only that it matches the shape you declared. The analogy: knowing a phone number belongs to a pizzeria lets you order from their menu without ever seeing the kitchen.</p>\n<ul>\n  <li><strong>interface cast:</strong> <code>IName(addr)</code>, a compile-time wrapper that costs no gas. It does <em>not</em> verify that <code>addr</code> actually implements <code>IName</code>.</li>\n  <li><strong>external call:</strong> calling a function through the cast sends a real message to that address. It costs gas and can revert.</li>\n  <li><strong>in scope:</strong> the <code>interface</code> must be present in the file (or imported) for the cast to compile.</li>\n</ul>\n<p class=\"blueprint-line\"><code>interface IERC20 { function balanceOf(address) external view returns (uint256); }</code><br><code>IERC20(token).balanceOf(user)</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>interface IToken {\n    function totalSupply() external view returns (uint256);\n}\n\ncontract Reader {\n    function supplyOf(address token) external view returns (uint256) {\n        return IToken(token).totalSupply();\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Only the text is graded. In <code>remix.ethereum.org</code>, deploy one of the built-in ERC-20 templates, copy its address, deploy <code>BalanceChecker</code>, and pass that address to <code>tokenBalance</code> to see a real cross-contract read.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Declare <code>interface IERC20</code> containing <code>function balanceOf(address account) external view returns (uint256);</code>. Then write <code>contract BalanceChecker</code> with <code>function tokenBalance(address token, address account) external view returns (uint256)</code> whose body is <code>return IERC20(token).balanceOf(account);</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">tokenBalance(usdc, alice)</span><code class=\"io-val\">Alice's USDC balance, read straight from the token contract</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "interface IERC20 {",
      "    function balanceOf(address account) external view returns (uint256);",
      "}",
      "",
      "contract BalanceChecker {",
      "    function tokenBalance(address token, address account) external view returns (uint256) {",
      "        return IERC20(token).balanceOf(account);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare IERC20 with balanceOf, then call it through an address cast\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ninterface IERC20 {\n    function balanceOf(address account) external view returns (uint256);\n}\n\ncontract BalanceChecker {\n    function tokenBalance(address token, address account) external view returns (uint256) {\n        return IERC20(token).balanceOf(account);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "interface\\s+IERC20\\s*\\{",
          "message": "Declare: interface IERC20 { ... }"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+balanceOf\\s*\\(\\s*address[^)]*\\)\\s+external\\s+view\\s+returns\\s*\\(\\s*uint256\\s*\\)\\s*;",
          "message": "IERC20 needs: function balanceOf(address account) external view returns (uint256);"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+BalanceChecker",
          "message": "Define contract BalanceChecker."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+tokenBalance\\s*\\(\\s*address\\s+token\\s*,\\s*address\\s+account\\s*\\)\\s+external\\s+view\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "tokenBalance(address token, address account) must be external view returns (uint256)."
        },
        {
          "type": "matchesRegex",
          "pattern": "IERC20\\s*\\(\\s*token\\s*\\)\\.balanceOf\\s*\\(\\s*account\\s*\\)",
          "message": "Call IERC20(token).balanceOf(account)."
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+IERC20\\s*\\(\\s*token\\s*\\)",
          "message": "Return the result of the interface call."
        }
      ]
    },
    "explanation": "<p>The cast is free and unchecked, if <code>token</code> is not really an ERC-20, the call reverts or returns garbage at runtime, not at compile time. That is why production code pairs these calls with checks, which the next challenges cover: pulling tokens with prior approval, then handling calls that fail.</p>"
  },
  {
    "id": 334,
    "title": "The Pull Pattern: transferFrom",
    "difficulty": "medium",
    "topic": "Calling Other Contracts",
    "level": 7,
    "xp": 15,
    "instructions": "<p>A contract cannot simply reach into someone's token balance and help itself. The token standard splits the move in two: first the holder calls <code>approve(yourContract, amount)</code> on the token, then your contract calls <code>transferFrom(holder, address(this), amount)</code> to pull in up to the approved amount. This is the <strong>pull pattern</strong>, the receiver initiates the transfer, bounded by a limit the sender pre-authorised. Level 6's signature challenges were about pre-authorising an action that someone else submits on-chain later; <code>approve</code> is that same idea, recorded as an allowance the token contract enforces. The everyday version is a gym membership: you sign one direct-debit mandate (approve), then the gym pulls each month's fee (transferFrom), never more than agreed.</p>\n<ul>\n  <li><strong>allowance:</strong> how much of the holder's balance your contract is permitted to move. It lives on the token contract, not yours.</li>\n  <li><strong>transferFrom(from, to, amount):</strong> moves tokens the caller has been allowed to move; reverts if the allowance or balance is too small.</li>\n  <li><strong>address(this):</strong> your own contract's address, the destination when pulling tokens in.</li>\n  <li><strong>prior approval assumed:</strong> the holder's <code>approve</code> happens outside your contract; your <code>transferFrom</code> fails without it.</li>\n</ul>\n<p class=\"blueprint-line\"><code>bool ok = IERC20(token).transferFrom(msg.sender, address(this), amount);</code><br><code>require(ok, \"transfer failed\");</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>interface IERC20 {\n    function transferFrom(address from, address to, uint256 amount) external returns (bool);\n}\n\ncontract Depositor {\n    function deposit(address token, uint256 amount) external {\n        bool ok = IERC20(token).transferFrom(msg.sender, address(this), amount);\n        require(ok, \"pull failed\");\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor checks text only. In <code>remix.ethereum.org</code>, deploy a token and this contract, call the token's <code>approve(vaultAddress, 100)</code> from your account first, then <code>pullIn(100)</code>, and try it once without approving to watch the revert.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Declare <code>interface IERC20</code> containing <code>function transferFrom(address from, address to, uint256 amount) external returns (bool);</code>. Then write <code>contract Vault</code> with a <code>public</code> state variable <code>token</code> of type <code>IERC20</code>, a <code>constructor(address _token)</code> that sets <code>token = IERC20(_token);</code>, and <code>function pullIn(uint256 amount) external</code> that stores <code>token.transferFrom(msg.sender, address(this), amount)</code> in a <code>bool ok</code> and then calls <code>require(ok, \"transfer failed\");</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">pullIn(100) after caller approved</span><code class=\"io-val\">100 tokens move from the caller into the Vault</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">pullIn(100) with no approval</span><code class=\"io-val\">reverts: transfer failed</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "interface IERC20 {",
      "    function transferFrom(address from, address to, uint256 amount) external returns (bool);",
      "}",
      "",
      "contract Vault {",
      "    IERC20 public token;",
      "",
      "    constructor(address _token) {",
      "        token = IERC20(_token);",
      "    }",
      "",
      "    function pullIn(uint256 amount) external {",
      "        bool ok = token.transferFrom(msg.sender, address(this), amount);",
      "        require(ok, \"transfer failed\");",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// IERC20 with transferFrom, then a Vault that pulls tokens in\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ninterface IERC20 {\n    function transferFrom(address from, address to, uint256 amount) external returns (bool);\n}\n\ncontract Vault {\n    IERC20 public token;\n\n    constructor(address _token) {\n        token = IERC20(_token);\n    }\n\n    function pullIn(uint256 amount) external {\n        bool ok = token.transferFrom(msg.sender, address(this), amount);\n        require(ok, \"transfer failed\");\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "interface\\s+IERC20",
          "message": "Declare interface IERC20."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+transferFrom\\s*\\(\\s*address[^)]*\\)\\s+external\\s+returns\\s*\\(\\s*bool\\s*\\)\\s*;",
          "message": "IERC20 needs: function transferFrom(address from, address to, uint256 amount) external returns (bool);"
        },
        {
          "type": "matchesRegex",
          "pattern": "IERC20\\s+public\\s+token\\s*;",
          "message": "Declare: IERC20 public token;"
        },
        {
          "type": "matchesRegex",
          "pattern": "token\\s*=\\s*IERC20\\s*\\(\\s*_token\\s*\\)",
          "message": "In the constructor: token = IERC20(_token);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+pullIn\\s*\\(\\s*uint256\\s+amount\\s*\\)\\s+external",
          "message": "Define: function pullIn(uint256 amount) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "token\\.transferFrom\\s*\\(\\s*msg\\.sender\\s*,\\s*address\\s*\\(\\s*this\\s*\\)\\s*,\\s*amount\\s*\\)",
          "message": "Call token.transferFrom(msg.sender, address(this), amount)."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*ok\\s*,",
          "message": "Check the result with require(ok, \"transfer failed\");"
        }
      ]
    },
    "explanation": "<p>Pulling with <code>transferFrom</code> plus a prior <code>approve</code> is how every DEX, lending pool and staking contract takes custody of your tokens, the contract never has unilateral access, only the allowance you granted. Real code also guards against tokens that return <code>false</code> instead of reverting (that is what OpenZeppelin's <code>SafeERC20</code> is for). Next: what to do when the other contract's call blows up.</p>"
  },
  {
    "id": 335,
    "title": "try / catch on External Calls",
    "difficulty": "medium",
    "topic": "Calling Other Contracts",
    "level": 7,
    "xp": 15,
    "instructions": "<p>When you call another contract, it might revert, bad input, a failed <code>require</code>, or simply buggy code. A plain call would drag your whole transaction down with it. <code>try IExternal(x).risky() returns (uint256 v) { ... } catch { ... }</code> lets you attempt the call and keep going if it fails, handling each outcome yourself. It works only on external calls (and on <code>new</code> contract creation), never on ordinary internal function calls. Level 6's node challenges assumed the peer you contact could be offline or dishonest; <code>try/catch</code> is how a contract copes with a counterpart that fails partway through. The picture: phoning a supplier who may not pick up (if they answer, place the order; if not, fall back to the backup) rather than shutting the shop.</p>\n<ul>\n  <li><strong>try/catch:</strong> wraps a single external call. The <code>try</code> block runs on success with the return values bound; a <code>catch</code> block runs on revert.</li>\n  <li><strong>returns (T v):</strong> names the values a successful call produced. They are usable only inside the <code>try</code> block.</li>\n  <li><strong>catch { }:</strong> the catch-all. Typed variants like <code>catch Error(string memory reason)</code> exist, but a bare <code>catch</code> handles every failure.</li>\n  <li><strong>scope limit:</strong> <code>try</code> must sit directly on an external call expression; you cannot wrap arbitrary statements in it.</li>\n</ul>\n<p class=\"blueprint-line\"><code>try IExternal(x).risky() returns (uint256 v) { /* success */ } catch { /* failure */ }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>interface IFeed { function latest() external view returns (uint256); }\n\ncontract Consumer {\n    uint256 public value;\n    function refresh(address feed) external {\n        try IFeed(feed).latest() returns (uint256 v) {\n            value = v;\n        } catch {\n            value = 0;\n        }\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Text is the only thing verified here. In <code>remix.ethereum.org</code>, point <code>attempt</code> at an address with no such function and confirm the <code>catch</code> branch runs while the transaction itself still succeeds.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Declare <code>interface IExternal</code> containing <code>function risky() external returns (uint256);</code>. Then write <code>contract Caller</code> with <code>public</code> state variables <code>lastValue</code> of type <code>uint256</code> and <code>lastFailed</code> of type <code>bool</code>, and <code>function attempt(address target) external</code> whose body is <code>try IExternal(target).risky() returns (uint256 v) { lastValue = v; lastFailed = false; } catch { lastFailed = true; }</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">attempt(goodContract)</span><code class=\"io-val\">lastValue set, lastFailed = false</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">attempt(revertingContract)</span><code class=\"io-val\">lastFailed = true, transaction still succeeds</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "interface IExternal {",
      "    function risky() external returns (uint256);",
      "}",
      "",
      "contract Caller {",
      "    uint256 public lastValue;",
      "    bool public lastFailed;",
      "",
      "    function attempt(address target) external {",
      "        try IExternal(target).risky() returns (uint256 v) {",
      "            lastValue = v;",
      "            lastFailed = false;",
      "        } catch {",
      "            lastFailed = true;",
      "        }",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// IExternal with risky(), then a Caller that wraps the call in try/catch\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ninterface IExternal {\n    function risky() external returns (uint256);\n}\n\ncontract Caller {\n    uint256 public lastValue;\n    bool public lastFailed;\n\n    function attempt(address target) external {\n        try IExternal(target).risky() returns (uint256 v) {\n            lastValue = v;\n            lastFailed = false;\n        } catch {\n            lastFailed = true;\n        }\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "interface\\s+IExternal",
          "message": "Declare interface IExternal."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+risky\\s*\\(\\s*\\)\\s+external\\s+returns\\s*\\(\\s*uint256\\s*\\)\\s*;",
          "message": "IExternal needs: function risky() external returns (uint256);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+attempt\\s*\\(\\s*address\\s+target\\s*\\)\\s+external",
          "message": "Define: function attempt(address target) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "try\\s+IExternal\\s*\\(\\s*target\\s*\\)\\.risky\\s*\\(\\s*\\)\\s+returns\\s*\\(\\s*uint256\\s+v\\s*\\)",
          "message": "Wrap the call: try IExternal(target).risky() returns (uint256 v) { ... }"
        },
        {
          "type": "matchesRegex",
          "pattern": "catch\\s*\\{",
          "message": "Add a catch { ... } block."
        },
        {
          "type": "matchesRegex",
          "pattern": "lastValue\\s*=\\s*v\\s*;",
          "message": "In the try block, set lastValue = v;"
        },
        {
          "type": "matchesRegex",
          "pattern": "lastFailed\\s*=\\s*true\\s*;",
          "message": "In the catch block, set lastFailed = true;"
        }
      ]
    },
    "explanation": "<p><code>try/catch</code> is the difference between one flaky dependency halting your protocol and your protocol noting the failure and moving on, keeper networks, oracle consumers and liquidation bots all rely on it. It only reaches external calls, though; for a call where you do not even have an interface, you drop to the low-level layer, which is next.</p>"
  },
  {
    "id": 336,
    "title": "Low-Level call and staticcall",
    "difficulty": "medium",
    "topic": "Calling Other Contracts",
    "level": 7,
    "xp": 15,
    "instructions": "<p>Under the typed interface layer is the raw machinery. <code>target.call(bytes)</code> sends an arbitrary payload to an address and hands back <code>(bool ok, bytes memory data)</code>, <code>ok</code> is <code>false</code> on failure instead of reverting, and <code>data</code> is the raw return you must decode yourself. You build the payload with <code>abi.encodeWithSignature(\"foo(uint256)\", 1)</code> (a 4-byte selector plus encoded arguments) and unpack the answer with <code>abi.decode(data, (uint256))</code>. <code>staticcall</code> is the same, except the EVM forbids any state change during it, so it is the read-only form and is allowed inside a <code>view</code> function. You lose all compiler type-checking here, so this is a last resort, unknown ABIs, or generic call forwarding. Level 6's mempool challenge showed transactions as raw encoded blobs before a node interprets them; low-level <code>call</code> is you doing that encode-and-decode by hand.</p>\n<ul>\n  <li><strong>call:</strong> <code>(bool ok, bytes memory data) = addr.call(payload)</code>, returns a success flag and raw bytes; the callee's revert becomes <code>ok == false</code>, not a revert of your function.</li>\n  <li><strong>staticcall:</strong> like <code>call</code> but reverts if the callee writes state. Safe for reads; usable in a <code>view</code> function.</li>\n  <li><strong>abi.encodeWithSignature(\"name(types)\", args...):</strong> builds the call data, selector plus ABI-encoded arguments.</li>\n  <li><strong>abi.decode(data, (types)):</strong> parses raw return bytes into typed values. The types must match what the callee actually returned.</li>\n</ul>\n<p class=\"blueprint-line\"><code>(bool ok, bytes memory data) = target.call(abi.encodeWithSignature(\"foo(uint256)\", 1));</code><br><code>require(ok);</code><br><code>uint256 v = abi.decode(data, (uint256));</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>contract Forwarder {\n    function poke(address target) external returns (uint256) {\n        (bool ok, bytes memory data) = target.call(abi.encodeWithSignature(\"value()\"));\n        require(ok, \"call failed\");\n        return abi.decode(data, (uint256));\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The grader only reads text. In <code>remix.ethereum.org</code>, deploy a contract with <code>foo(uint256)</code> and a <code>foo()</code>-style getter, then drive it entirely through this low-level contract, no interface imported anywhere.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract LowLevel</code>. Add <code>function callFoo(address target) external returns (uint256)</code> that runs <code>(bool ok, bytes memory data) = target.call(abi.encodeWithSignature(\"foo(uint256)\", 1));</code>, then <code>require(ok, \"call failed\");</code>, then <code>return abi.decode(data, (uint256));</code>. Add <code>function readFoo(address target) external view returns (uint256)</code> that does the same through <code>target.staticcall(abi.encodeWithSignature(\"foo()\"))</code>, checks <code>ok</code>, and returns <code>abi.decode(data, (uint256))</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">callFoo(t)</span><code class=\"io-val\">sends foo(1) to t, returns its uint256 result</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">readFoo(t)</span><code class=\"io-val\">same via staticcall, reverts if the callee writes state</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract LowLevel {",
      "    function callFoo(address target) external returns (uint256) {",
      "        (bool ok, bytes memory data) = target.call(abi.encodeWithSignature(\"foo(uint256)\", 1));",
      "        require(ok, \"call failed\");",
      "        return abi.decode(data, (uint256));",
      "    }",
      "",
      "    function readFoo(address target) external view returns (uint256) {",
      "        (bool ok, bytes memory data) = target.staticcall(abi.encodeWithSignature(\"foo()\"));",
      "        require(ok, \"staticcall failed\");",
      "        return abi.decode(data, (uint256));",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// LowLevel: one call() that writes-capable, one staticcall() for reading\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract LowLevel {\n    function callFoo(address target) external returns (uint256) {\n        (bool ok, bytes memory data) = target.call(abi.encodeWithSignature(\"foo(uint256)\", 1));\n        require(ok, \"call failed\");\n        return abi.decode(data, (uint256));\n    }\n\n    function readFoo(address target) external view returns (uint256) {\n        (bool ok, bytes memory data) = target.staticcall(abi.encodeWithSignature(\"foo()\"));\n        require(ok, \"staticcall failed\");\n        return abi.decode(data, (uint256));\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "function\\s+callFoo\\s*\\(\\s*address\\s+target\\s*\\)\\s+external\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "Define: function callFoo(address target) external returns (uint256)."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\(\\s*bool\\s+ok\\s*,\\s*bytes\\s+memory\\s+data\\s*\\)\\s*=\\s*target\\.call\\s*\\(",
          "message": "Use (bool ok, bytes memory data) = target.call(...);"
        },
        {
          "type": "matchesRegex",
          "pattern": "abi\\.encodeWithSignature\\s*\\(\\s*\"foo\\(uint256\\)\"\\s*,\\s*1\\s*\\)",
          "message": "Encode with abi.encodeWithSignature(\"foo(uint256)\", 1)."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*ok\\s*,",
          "message": "Check the call with require(ok ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "abi\\.decode\\s*\\(\\s*data\\s*,\\s*\\(\\s*uint256\\s*\\)\\s*\\)",
          "message": "Decode with abi.decode(data, (uint256))."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+readFoo\\s*\\(\\s*address\\s+target\\s*\\)\\s+external\\s+view",
          "message": "Define: function readFoo(address target) external view returns (uint256)."
        },
        {
          "type": "matchesRegex",
          "pattern": "target\\.staticcall\\s*\\(",
          "message": "readFoo must use target.staticcall(...)."
        }
      ]
    },
    "explanation": "<p>Low-level <code>call</code> is the escape hatch: full control, zero type-safety, and it is on you to check <code>ok</code> and decode correctly. Proxies, multicall aggregators and generic relayers all live down here. Now put the whole toolkit together, the next challenge is a guided build that stores an interface, calls it, and handles the failure path.</p>"
  },
  {
    "id": 337,
    "title": "Guided Project: An Oracle-Backed Escrow",
    "difficulty": "hard",
    "topic": "Calling Other Contracts",
    "level": 7,
    "xp": 25,
    "instructions": "<p>Time to assemble the pieces. You will build <code>Escrow</code>: a contract that holds a deal between a buyer and a seller and looks up a price from a separate <strong>price oracle</strong> contract, one it is told about once, at deployment, and reaches only through an interface. Storing that reference in the constructor (instead of accepting an oracle address on every call) means the dependency is fixed and auditable for the whole life of the escrow.</p>\n<p>The oracle is external code that can fail: an unlisted item, a reverting bug, a bad answer. If the escrow called it raw, one bad lookup would brick every settlement. So the settle path wraps the oracle call in <code>try/catch</code> and turns any failure into a named custom error the caller can react to. Level 6's node challenges kept warning that the party on the other end might not cooperate, this is the finished, defensive version of talking to a contract you do not control. You have built every ingredient across this level: an interface (the oracle), an interface reference stored at deploy, an external call, and a <code>try/catch</code> failure path.</p>\n<ul>\n  <li><strong>oracle:</strong> a contract that reports data (prices, outcomes) on-chain. From your side it is just an interface with a <code>view</code> function.</li>\n  <li><strong>stored interface reference:</strong> <code>IPriceOracle public oracle;</code> set once in the constructor, the same dependency for every call afterward.</li>\n  <li><strong>custom error:</strong> <code>error Name();</code> declared at contract level, raised with <code>revert Name();</code>. Cheaper than a string and easy for a caller to catch by name.</li>\n  <li><strong>settlement guard:</strong> a <code>bool public settled</code> plus <code>require(!settled)</code> so a deal cannot be closed twice.</li>\n</ul>\n<p class=\"blueprint-line\"><code>IPriceOracle public oracle;</code><br><code>constructor(address _oracle, address _seller) { oracle = IPriceOracle(_oracle); ... }</code><br><code>try oracle.priceOf(item) returns (uint256 p) { ... } catch { revert OracleUnavailable(); }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>interface IRegistry { function isMember(address a) external view returns (bool); }\n\ncontract Club {\n    IRegistry public registry;\n    constructor(address r) { registry = IRegistry(r); }\n\n    function check(address a) external view {\n        try registry.isMember(a) returns (bool ok) {\n            require(ok, \"not a member\");\n        } catch {\n            revert(\"registry down\");\n        }\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Only the text of your answer is graded. In <code>remix.ethereum.org</code>, deploy a small oracle exposing <code>priceOf(address)</code>, then <code>Escrow</code> pointed at it; call <code>settle</code> once for the happy path, then point a fresh <code>Escrow</code> at a deliberately reverting oracle to see <code>OracleUnavailable()</code>.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Declare <code>interface IPriceOracle</code> containing <code>function priceOf(address item) external view returns (uint256);</code>. Then write <code>contract Escrow</code> with: state variables <code>IPriceOracle public oracle</code>, <code>address public buyer</code>, <code>address public seller</code>, <code>bool public settled</code>; a custom <code>error OracleUnavailable();</code>; a <code>constructor(address _oracle, address _seller)</code> that sets <code>oracle = IPriceOracle(_oracle);</code>, <code>seller = _seller;</code>, and <code>buyer = msg.sender;</code>; and <code>function settle(address item) external returns (uint256 price)</code> that first calls <code>require(!settled, \"already settled\");</code>, then runs <code>try oracle.priceOf(item) returns (uint256 p) { price = p; settled = true; } catch { revert OracleUnavailable(); }</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">settle(item) with a working oracle</span><code class=\"io-val\">price recorded, settled = true</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">settle(item) with a reverting oracle</span><code class=\"io-val\">reverts with OracleUnavailable()</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">settle(item) after already settled</span><code class=\"io-val\">reverts: already settled</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "interface IPriceOracle {",
      "    function priceOf(address item) external view returns (uint256);",
      "}",
      "",
      "contract Escrow {",
      "    IPriceOracle public oracle;",
      "    address public buyer;",
      "    address public seller;",
      "    bool public settled;",
      "",
      "    error OracleUnavailable();",
      "",
      "    constructor(address _oracle, address _seller) {",
      "        oracle = IPriceOracle(_oracle);",
      "        seller = _seller;",
      "        buyer = msg.sender;",
      "    }",
      "",
      "    function settle(address item) external returns (uint256 price) {",
      "        require(!settled, \"already settled\");",
      "        try oracle.priceOf(item) returns (uint256 p) {",
      "            price = p;",
      "            settled = true;",
      "        } catch {",
      "            revert OracleUnavailable();",
      "        }",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// IPriceOracle, then Escrow: store the oracle at deploy, call it in settle(), handle failure\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ninterface IPriceOracle {\n    function priceOf(address item) external view returns (uint256);\n}\n\ncontract Escrow {\n    IPriceOracle public oracle;\n    address public buyer;\n    address public seller;\n    bool public settled;\n\n    error OracleUnavailable();\n\n    constructor(address _oracle, address _seller) {\n        oracle = IPriceOracle(_oracle);\n        seller = _seller;\n        buyer = msg.sender;\n    }\n\n    function settle(address item) external returns (uint256 price) {\n        require(!settled, \"already settled\");\n        try oracle.priceOf(item) returns (uint256 p) {\n            price = p;\n            settled = true;\n        } catch {\n            revert OracleUnavailable();\n        }\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "interface\\s+IPriceOracle\\s*\\{",
          "message": "Declare interface IPriceOracle."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+priceOf\\s*\\(\\s*address[^)]*\\)\\s+external\\s+view\\s+returns\\s*\\(\\s*uint256\\s*\\)\\s*;",
          "message": "IPriceOracle needs: function priceOf(address item) external view returns (uint256);"
        },
        {
          "type": "matchesRegex",
          "pattern": "IPriceOracle\\s+public\\s+oracle\\s*;",
          "message": "Declare: IPriceOracle public oracle;"
        },
        {
          "type": "matchesRegex",
          "pattern": "error\\s+OracleUnavailable\\s*\\(\\s*\\)\\s*;",
          "message": "Declare a custom error: error OracleUnavailable();"
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*address\\s+_oracle\\s*,\\s*address\\s+_seller\\s*\\)",
          "message": "Add constructor(address _oracle, address _seller)."
        },
        {
          "type": "matchesRegex",
          "pattern": "oracle\\s*=\\s*IPriceOracle\\s*\\(\\s*_oracle\\s*\\)",
          "message": "In the constructor: oracle = IPriceOracle(_oracle);"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*!settled",
          "message": "Guard settle() with require(!settled, \"already settled\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "try\\s+oracle\\.priceOf\\s*\\(\\s*item\\s*\\)\\s+returns\\s*\\(\\s*uint256\\s+p\\s*\\)",
          "message": "Call the oracle: try oracle.priceOf(item) returns (uint256 p) { ... }"
        },
        {
          "type": "matchesRegex",
          "pattern": "catch\\s*\\{[\\s\\S]*revert\\s+OracleUnavailable\\s*\\(\\s*\\)",
          "message": "In catch, revert OracleUnavailable();"
        },
        {
          "type": "matchesRegex",
          "pattern": "settled\\s*=\\s*true\\s*;",
          "message": "On success, set settled = true;"
        }
      ]
    },
    "explanation": "<p>This is the shape of a real integration: a dependency pinned at construction, reached only through an interface, and every external call assumed capable of failing. The <code>try/catch</code> turning a raw revert into <code>OracleUnavailable()</code> is what lets a front-end or a parent contract tell \"the oracle is down\" apart from \"the deal is already closed\". The security level pushes on exactly this surface, what a malicious oracle could do inside that <code>try</code>.</p>"
  },
  {
    "id": 338,
    "title": "Read and Complete: Inherit and Implement",
    "difficulty": "medium",
    "topic": "Inheritance & Interfaces",
    "level": 7,
    "xp": 15,
    "instructions": "<p>The editor already holds two things: an <code>interface IGreeter</code> and a <code>contract Named</code> that stores a name and sets it in its constructor. Your job is the child that pulls both together, it inherits <code>Named</code>'s storage and constructor, satisfies <code>IGreeter</code>'s function, and forwards its own constructor argument up with a chained <code>Named(_name)</code> call. Reading an existing base and writing the piece that completes it is most of real contract work; you extend audited bases far more often than you author one. Reading real Vyper in Level 6 was pure comprehension, this is that same skill one notch up: read the given code, then write what slots into it.</p>\n<ul>\n  <li><strong>given code:</strong> <code>IGreeter</code> and <code>Named</code> are already in the file. Do not redefine them, inherit and use them.</li>\n  <li><strong>multiple bases:</strong> <code>contract Greeter is Named, IGreeter</code>, a normal contract first, the interface second.</li>\n  <li><strong>implementing an interface function:</strong> it needs <code>override</code>, because the signature also lives in <code>IGreeter</code>.</li>\n  <li><strong>constructor forwarding:</strong> <code>constructor(string memory _name) Named(_name) {}</code>, an empty body is fine; it just passes the argument up.</li>\n</ul>\n<p class=\"blueprint-line\"><code>contract Greeter is Named, IGreeter {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;constructor(string memory _name) Named(_name) {}</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;function greet() external view override returns (string memory) { ... }</code><br><code>}</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>interface ICount { function count() external view returns (uint256); }\ncontract Stored { uint256 internal n; constructor(uint256 _n) { n = _n; } }\n\ncontract Counter is Stored, ICount {\n    constructor(uint256 _n) Stored(_n) {}\n    function count() external view override returns (uint256) { return n; }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor matches text only. Paste the whole file, the given parts plus your <code>Greeter</code>, into <code>remix.ethereum.org</code>, deploy <code>Greeter(\"Ada\")</code>, and call <code>greet()</code> to get <code>\"Hello, Ada\"</code>.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Keeping the given <code>interface IGreeter</code> and <code>contract Named</code>, write <code>contract Greeter is Named, IGreeter</code> with a <code>constructor(string memory _name)</code> that chains <code>Named(_name)</code> and has an empty body, and a <code>function greet() external view override returns (string memory)</code> whose body is <code>return string.concat(\"Hello, \", name);</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">Greeter(\"Ada\").greet()</span><code class=\"io-val\">\"Hello, Ada\"</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">Greeter(\"Ada\").name()</span><code class=\"io-val\">\"Ada\", getter inherited from Named</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "interface IGreeter {",
      "    function greet() external view returns (string memory);",
      "}",
      "",
      "contract Named {",
      "    string public name;",
      "",
      "    constructor(string memory _name) {",
      "        name = _name;",
      "    }",
      "}",
      "",
      "contract Greeter is Named, IGreeter {",
      "    constructor(string memory _name) Named(_name) {}",
      "",
      "    function greet() external view override returns (string memory) {",
      "        return string.concat(\"Hello, \", name);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ninterface IGreeter {\n    function greet() external view returns (string memory);\n}\n\ncontract Named {\n    string public name;\n\n    constructor(string memory _name) {\n        name = _name;\n    }\n}\n\n// Write contract Greeter is Named, IGreeter below\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ninterface IGreeter {\n    function greet() external view returns (string memory);\n}\n\ncontract Named {\n    string public name;\n\n    constructor(string memory _name) {\n        name = _name;\n    }\n}\n\ncontract Greeter is Named, IGreeter {\n    constructor(string memory _name) Named(_name) {}\n\n    function greet() external view override returns (string memory) {\n        return string.concat(\"Hello, \", name);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "interface\\s+IGreeter",
          "message": "Keep the given interface IGreeter."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Named\\s*\\{",
          "message": "Keep the given contract Named."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Greeter\\s+is\\s+Named\\s*,\\s*IGreeter",
          "message": "Define: contract Greeter is Named, IGreeter."
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*string\\s+memory\\s+_name\\s*\\)\\s*Named\\s*\\(\\s*_name\\s*\\)",
          "message": "Chain the base constructor: constructor(string memory _name) Named(_name)."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+greet\\s*\\(\\s*\\)\\s+external\\s+view\\s+override\\s+returns\\s*\\(\\s*string\\s+memory\\s*\\)",
          "message": "greet() must be external view override returns (string memory)."
        },
        {
          "type": "matchesRegex",
          "pattern": "string\\.concat\\s*\\(\\s*\"Hello, \"\\s*,\\s*name\\s*\\)",
          "message": "Return string.concat(\"Hello, \", name);"
        }
      ]
    },
    "explanation": "<p>You wrote only the differences: <code>Greeter</code> got <code>name</code> and its storage from <code>Named</code>, its obligation from <code>IGreeter</code>, and needed just a constructor forward and one function body. That is the day-to-day rhythm of building on OpenZeppelin. The last challenge does the same for the calling side.</p>"
  },
  {
    "id": 339,
    "title": "Read and Complete: Call Through an Interface and Check",
    "difficulty": "medium",
    "topic": "Calling Other Contracts",
    "level": 7,
    "xp": 15,
    "instructions": "<p>The editor already holds an <code>interface IVoteCounter</code> that reports vote tallies. Write the contract that uses it: store the counter's address as an interface reference at deploy time, and add a function that calls through it and returns a boolean verdict, did the proposal clear a threshold? The pattern (store an interface, call it, compare the result) is the backbone of every contract that reads another contract's state to make a decision. Level 6's Merkle-proof checks returned a yes/no about data held elsewhere; this returns a yes/no computed from a value fetched live from another contract.</p>\n<ul>\n  <li><strong>given interface:</strong> <code>IVoteCounter</code> is already in the file. Use it; do not redefine it.</li>\n  <li><strong>stored reference:</strong> <code>IVoteCounter public counter;</code> set in the constructor from an address argument.</li>\n  <li><strong>read-and-decide:</strong> fetch a value with an external <code>view</code> call, then return a comparison. Nothing is written, so the function is <code>view</code>.</li>\n  <li><strong>threshold check:</strong> <code>return tally &gt;= threshold;</code></li>\n</ul>\n<p class=\"blueprint-line\"><code>counter = IVoteCounter(_counter);</code><br><code>uint256 tally = counter.votesFor(proposalId);</code><br><code>return tally &gt;= threshold;</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>interface IBalance { function balanceOf(address a) external view returns (uint256); }\n\ncontract Whitelist {\n    IBalance public token;\n    uint256 public minHold;\n    constructor(address t, uint256 m) { token = IBalance(t); minHold = m; }\n\n    function allowed(address a) external view returns (bool) {\n        return token.balanceOf(a) >= minHold;\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Text is all that is checked here. In <code>remix.ethereum.org</code>, deploy a stub counter that returns a fixed number, deploy <code>Gate</code> pointed at it with a threshold, and watch <code>hasPassed</code> flip from <code>false</code> to <code>true</code> as the stub's number crosses the line.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Keeping the given <code>interface IVoteCounter</code>, write <code>contract Gate</code> with state variables <code>IVoteCounter public counter</code> and <code>uint256 public threshold</code>, a <code>constructor(address _counter, uint256 _threshold)</code> that sets <code>counter = IVoteCounter(_counter);</code> and <code>threshold = _threshold;</code>, and <code>function hasPassed(uint256 proposalId) external view returns (bool)</code> that reads <code>uint256 tally = counter.votesFor(proposalId);</code> and returns <code>tally &gt;= threshold;</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">hasPassed(1), votesFor(1) = 120, threshold 100</span><code class=\"io-val\">true</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">hasPassed(1), votesFor(1) = 80, threshold 100</span><code class=\"io-val\">false</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "interface IVoteCounter {",
      "    function votesFor(uint256 proposalId) external view returns (uint256);",
      "}",
      "",
      "contract Gate {",
      "    IVoteCounter public counter;",
      "    uint256 public threshold;",
      "",
      "    constructor(address _counter, uint256 _threshold) {",
      "        counter = IVoteCounter(_counter);",
      "        threshold = _threshold;",
      "    }",
      "",
      "    function hasPassed(uint256 proposalId) external view returns (bool) {",
      "        uint256 tally = counter.votesFor(proposalId);",
      "        return tally >= threshold;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ninterface IVoteCounter {\n    function votesFor(uint256 proposalId) external view returns (uint256);\n}\n\n// Write contract Gate below\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ninterface IVoteCounter {\n    function votesFor(uint256 proposalId) external view returns (uint256);\n}\n\ncontract Gate {\n    IVoteCounter public counter;\n    uint256 public threshold;\n\n    constructor(address _counter, uint256 _threshold) {\n        counter = IVoteCounter(_counter);\n        threshold = _threshold;\n    }\n\n    function hasPassed(uint256 proposalId) external view returns (bool) {\n        uint256 tally = counter.votesFor(proposalId);\n        return tally >= threshold;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "interface\\s+IVoteCounter",
          "message": "Keep the given interface IVoteCounter."
        },
        {
          "type": "matchesRegex",
          "pattern": "IVoteCounter\\s+public\\s+counter\\s*;",
          "message": "Declare: IVoteCounter public counter;"
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+threshold\\s*;",
          "message": "Declare: uint256 public threshold;"
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*address\\s+_counter\\s*,\\s*uint256\\s+_threshold\\s*\\)",
          "message": "Add constructor(address _counter, uint256 _threshold)."
        },
        {
          "type": "matchesRegex",
          "pattern": "counter\\s*=\\s*IVoteCounter\\s*\\(\\s*_counter\\s*\\)",
          "message": "In the constructor: counter = IVoteCounter(_counter);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+hasPassed\\s*\\(\\s*uint256\\s+proposalId\\s*\\)\\s+external\\s+view\\s+returns\\s*\\(\\s*bool\\s*\\)",
          "message": "hasPassed(uint256 proposalId) must be external view returns (bool)."
        },
        {
          "type": "matchesRegex",
          "pattern": "counter\\.votesFor\\s*\\(\\s*proposalId\\s*\\)",
          "message": "Read the tally with counter.votesFor(proposalId)."
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+tally\\s*>=\\s*threshold\\s*;",
          "message": "Return tally >= threshold;"
        }
      ]
    },
    "explanation": "<p>Store a reference, call through it, act on the answer: that loop is a governance timelock checking quorum, a lending market checking a price, a bridge checking a light-client root. You now have the whole Level 7 toolkit (inherit, implement, and call other contracts safely) and the security level is where you learn what goes wrong when the contract on the other end is hostile.</p>"
  }
];
