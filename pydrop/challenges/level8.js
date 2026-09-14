// Level 8
// Generated Solidity challenges - graded by static text checks only (no EVM in-browser).
window.LEVEL8 = [
  {
    "id": 340,
    "title": "Welcome to Level 8: Tokens and Applied Solidity",
    "kind": "intro",
    "topic": "Introduction",
    "level": 8,
    "instructions": "<p>Level 7 gave you the Solidity language: contracts, types, guards, events, inheritance, and calls between contracts. Level 8 puts it to work on the things contracts are actually written for. You will build the two token standards from scratch, <strong>ERC-20</strong> for fungible balances and <strong>ERC-721</strong> for non-fungible ones, so that when you later inherit them from a library you know exactly what every function is doing. Then you will handle <strong>ether</strong> directly (payable functions, <code>receive</code> and <code>fallback</code>, the safe way to send value) and do real <strong>cryptography on-chain</strong>: hashing with <code>keccak256</code>, recovering a signer with <code>ecrecover</code>, and verifying a Merkle proof, which is the Level 5 Merkle work again, now inside a contract.</p>\n<p>Grading is still text matching only, with no compiler and no EVM in the sandbox. Every challenge names Remix in its notes for a reason: a token that looks right in the editor can still misbehave once you deploy it and move balances between accounts, and a signature check that compiles can still accept a forged signature if you wire <code>ecrecover</code> up wrong. Build each contract here, then open <code>remix.ethereum.org</code>, deploy it, and exercise it before moving on. The capstones at the end of this level combine tokens, ether, and signatures into contracts close to what a real project ships.</p>",
    "starterCode": ""
  },
  {
    "id": 341,
    "title": "Reading the IERC20 Interface",
    "difficulty": "easy",
    "topic": "ERC-20",
    "level": 8,
    "xp": 10,
    "instructions": "<p>Level 5's account-balance model gave every address a single number and let anyone move their own number down and someone else's up. A <strong>token</strong> is that exact idea, packaged as a contract: one <code>mapping</code> from address to balance, plus a small set of functions that everyone agrees to name the same way. That shared naming is the <strong>ERC-20</strong> standard. If your token exposes these six functions and two events with these exact signatures, every wallet, exchange, and price feed already knows how to talk to it, no custom integration per token.</p>\n<p>An <code>interface</code> is how Solidity writes that contract-of-shapes down: function signatures with no bodies. It compiles to nothing on its own; it is a promise that some other contract will fill in. Think of it as the menu without the kitchen, it tells callers what they can order and what comes back, and a separate contract does the cooking.</p>\n<ul>\n  <li><strong>interface:</strong> a block of function and event declarations with no implementations. Every function is implicitly <code>external</code>, and you cannot give it a body, a constructor, or state variables.</li>\n  <li><strong>ERC-20:</strong> the fungible-token standard, <code>totalSupply</code>, <code>balanceOf</code>, <code>transfer</code>, <code>approve</code>, <code>allowance</code>, <code>transferFrom</code>, and the <code>Transfer</code> / <code>Approval</code> events.</li>\n  <li><strong>allowance:</strong> an amount one address permits another to spend on its behalf, the mechanism behind <code>approve</code> plus <code>transferFrom</code>.</li>\n</ul>\n<p class=\"blueprint-line\"><code>interface IERC20 {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;event Transfer(address indexed from, address indexed to, uint256 value);</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;function balanceOf(address account) external view returns (uint256);</code><br><code>}</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ninterface IExample {\n    event Ping(address indexed who, uint256 n);\n\n    function ping(uint256 n) external returns (bool);\n    function pings(address who) external view returns (uint256);\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This editor only reads your text; it has no Solidity compiler and no EVM. Drop this file into <code>remix.ethereum.org</code> (nothing to install) to compile it, then write a contract that says <code>is IERC20</code> and watch the compiler force you to implement every line. That round trip is the real lesson.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write an <code>interface</code> named <code>IERC20</code>. Declare two events: <code>Transfer(address indexed from, address indexed to, uint256 value)</code> and <code>Approval(address indexed owner, address indexed spender, uint256 value)</code>. Declare six external functions: <code>totalSupply()</code> <code>view</code> returning <code>uint256</code>; <code>balanceOf(address account)</code> <code>view</code> returning <code>uint256</code>; <code>transfer(address to, uint256 amount)</code> returning <code>bool</code>; <code>allowance(address owner, address spender)</code> <code>view</code> returning <code>uint256</code>; <code>approve(address spender, uint256 amount)</code> returning <code>bool</code>; and <code>transferFrom(address from, address to, uint256 amount)</code> returning <code>bool</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">interface compiles to</span><code class=\"io-val\">no bytecode, it is a shape other contracts implement</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">transfer(...)</span><code class=\"io-val\">external returns (bool)</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "interface IERC20 {",
      "    event Transfer(address indexed from, address indexed to, uint256 value);",
      "    event Approval(address indexed owner, address indexed spender, uint256 value);",
      "",
      "    function totalSupply() external view returns (uint256);",
      "    function balanceOf(address account) external view returns (uint256);",
      "    function transfer(address to, uint256 amount) external returns (bool);",
      "    function allowance(address owner, address spender) external view returns (uint256);",
      "    function approve(address spender, uint256 amount) external returns (bool);",
      "    function transferFrom(address from, address to, uint256 amount) external returns (bool);",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare the IERC20 interface below\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ninterface IERC20 {\n    event Transfer(address indexed from, address indexed to, uint256 value);\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n\n    function totalSupply() external view returns (uint256);\n    function balanceOf(address account) external view returns (uint256);\n    function transfer(address to, uint256 amount) external returns (bool);\n    function allowance(address owner, address spender) external view returns (uint256);\n    function approve(address spender, uint256 amount) external returns (bool);\n    function transferFrom(address from, address to, uint256 amount) external returns (bool);\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "interface\\s+IERC20\\s*\\{",
          "message": "Declare: interface IERC20 { ... }"
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+Transfer\\s*\\(\\s*address\\s+indexed\\s+from\\s*,\\s*address\\s+indexed\\s+to\\s*,\\s*uint256\\s+value\\s*\\)",
          "message": "Declare event Transfer(address indexed from, address indexed to, uint256 value);"
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+Approval\\s*\\(\\s*address\\s+indexed\\s+owner\\s*,\\s*address\\s+indexed\\s+spender\\s*,\\s*uint256\\s+value\\s*\\)",
          "message": "Declare event Approval(address indexed owner, address indexed spender, uint256 value);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+totalSupply\\s*\\(\\s*\\)\\s+external\\s+view\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "Declare function totalSupply() external view returns (uint256);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+balanceOf\\s*\\(\\s*address\\s+\\w+\\s*\\)\\s+external\\s+view\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "Declare function balanceOf(address account) external view returns (uint256);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+transfer\\s*\\(\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external\\s+returns\\s*\\(\\s*bool\\s*\\)",
          "message": "Declare function transfer(address to, uint256 amount) external returns (bool);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+allowance\\s*\\(\\s*address\\s+\\w+\\s*,\\s*address\\s+\\w+\\s*\\)\\s+external\\s+view\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "Declare function allowance(address owner, address spender) external view returns (uint256);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+approve\\s*\\(\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external\\s+returns\\s*\\(\\s*bool\\s*\\)",
          "message": "Declare function approve(address spender, uint256 amount) external returns (bool);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+transferFrom\\s*\\(\\s*address\\s+\\w+\\s*,\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external\\s+returns\\s*\\(\\s*bool\\s*\\)",
          "message": "Declare function transferFrom(address from, address to, uint256 amount) external returns (bool);"
        }
      ]
    },
    "explanation": "<p>Because an <code>interface</code> ships no logic, importing <code>IERC20</code> and writing <code>IERC20(tokenAddress).transfer(...)</code> lets your contract call <em>any</em> token without knowing its source, the interface is the only thing the compiler needs to lay out the call. The next challenges fill this shape in one function at a time, then assemble the whole thing.</p>"
  },
  {
    "id": 342,
    "title": "Token Metadata and the Constructor Mint",
    "difficulty": "medium",
    "topic": "ERC-20",
    "level": 8,
    "xp": 15,
    "instructions": "<p>Now you implement the shape from the previous challenge, starting with the parts that never change and the one moment supply is created. A token carries three labels, <code>name</code>, <code>symbol</code>, <code>decimals</code>, that wallets read to display it, and a running <code>totalSupply</code>. The balances themselves live in a <code>mapping(address =&gt; uint256)</code>, the same address-to-number ledger from Level 5's account model, except it persists on-chain and is the token's whole state.</p>\n<p>Coins have to enter existence somewhere. <strong>Minting</strong> is that entry: increase <code>totalSupply</code> and credit an address, with no matching debit. The ERC-20 convention is to log it as a <code>Transfer</code> whose <code>from</code> is <code>address(0)</code>, the zero address, a sender that can never sign a transaction, so a transfer \"out of\" it reads unambiguously as \"created\". This challenge mints the entire supply once, in the <code>constructor</code>, to whoever deploys.</p>\n<ul>\n  <li><strong>decimals:</strong> how many digits of the balance are treated as fractional for display. <code>18</code> is standard; a raw balance of <code>1500000000000000000</code> shows as <code>1.5</code>. The contract math still uses the raw integer.</li>\n  <li><strong>mint:</strong> create new units, bump <code>totalSupply</code> and a balance together, logged as <code>Transfer(address(0), to, amount)</code>.</li>\n  <li><strong>address(0):</strong> the zero address, <code>0x000...0</code>. Used as a sentinel for \"no owner\" or, here, \"minted from nowhere\".</li>\n</ul>\n<p class=\"blueprint-line\"><code>string public name = \"...\";</code><br><code>mapping(address =&gt; uint256) public balanceOf;</code><br><code>constructor(uint256 initialSupply) { ... emit Transfer(address(0), msg.sender, initialSupply); }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Points {\n    string public name = \"Points\";\n    uint256 public totalSupply;\n    mapping(address => uint256) public balanceOf;\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n\n    constructor(uint256 supply) {\n        totalSupply = supply;\n        balanceOf[msg.sender] = supply;\n        emit Transfer(address(0), msg.sender, supply);\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The sandbox matches text and nothing more, it cannot deploy this or read an emitted event. In <code>remix.ethereum.org</code>, deploy with an <code>initialSupply</code> argument, then call <code>balanceOf</code> with your deployer address and confirm it holds the lot. The Remix log panel will show the <code>Transfer</code> from the zero address.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract <code>MiniToken</code>. Add <code>public</code> state: <code>string name</code> set to <code>\"Mini Token\"</code>, <code>string symbol</code> set to <code>\"MINI\"</code>, <code>uint8 decimals</code> set to <code>18</code>, <code>uint256 totalSupply</code>, and <code>mapping(address =&gt; uint256) balanceOf</code>. Declare <code>event Transfer(address indexed from, address indexed to, uint256 value)</code>. Add a <code>constructor(uint256 initialSupply)</code> that sets <code>totalSupply</code> to <code>initialSupply</code>, sets <code>balanceOf[msg.sender]</code> to <code>initialSupply</code>, and emits <code>Transfer(address(0), msg.sender, initialSupply)</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">deploy with initialSupply = 1000000</span><code class=\"io-val\">balanceOf(deployer) == 1000000</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">event logged</span><code class=\"io-val\">Transfer(0x000...0, deployer, 1000000)</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract MiniToken {",
      "    string public name = \"Mini Token\";",
      "    string public symbol = \"MINI\";",
      "    uint8 public decimals = 18;",
      "    uint256 public totalSupply;",
      "    mapping(address => uint256) public balanceOf;",
      "",
      "    event Transfer(address indexed from, address indexed to, uint256 value);",
      "",
      "    constructor(uint256 initialSupply) {",
      "        totalSupply = initialSupply;",
      "        balanceOf[msg.sender] = initialSupply;",
      "        emit Transfer(address(0), msg.sender, initialSupply);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MiniToken {\n    // metadata, totalSupply, balanceOf, Transfer event, constructor mint\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MiniToken {\n    string public name = \"Mini Token\";\n    string public symbol = \"MINI\";\n    uint8 public decimals = 18;\n    uint256 public totalSupply;\n    mapping(address => uint256) public balanceOf;\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n\n    constructor(uint256 initialSupply) {\n        totalSupply = initialSupply;\n        balanceOf[msg.sender] = initialSupply;\n        emit Transfer(address(0), msg.sender, initialSupply);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+MiniToken\\s*\\{",
          "message": "Define a contract named MiniToken."
        },
        {
          "type": "matchesRegex",
          "pattern": "string\\s+public\\s+name\\s*=\\s*\"Mini Token\"",
          "message": "Add: string public name = \"Mini Token\";"
        },
        {
          "type": "matchesRegex",
          "pattern": "string\\s+public\\s+symbol\\s*=\\s*\"MINI\"",
          "message": "Add: string public symbol = \"MINI\";"
        },
        {
          "type": "matchesRegex",
          "pattern": "uint8\\s+public\\s+decimals\\s*=\\s*18",
          "message": "Add: uint8 public decimals = 18;"
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+totalSupply\\s*;",
          "message": "Add: uint256 public totalSupply;"
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*public\\s+balanceOf",
          "message": "Add: mapping(address => uint256) public balanceOf;"
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+Transfer\\s*\\(\\s*address\\s+indexed\\s+from\\s*,\\s*address\\s+indexed\\s+to\\s*,\\s*uint256\\s+value\\s*\\)",
          "message": "Declare event Transfer(address indexed from, address indexed to, uint256 value);"
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*uint256\\s+\\w+\\s*\\)",
          "message": "Add a constructor(uint256 initialSupply)."
        },
        {
          "type": "matchesRegex",
          "pattern": "balanceOf\\[\\s*msg\\.sender\\s*\\]\\s*=\\s*\\w+\\s*;",
          "message": "Credit the deployer: balanceOf[msg.sender] = initialSupply;"
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+Transfer\\s*\\(\\s*address\\(0\\)\\s*,\\s*msg\\.sender\\s*,\\s*\\w+\\s*\\)",
          "message": "Emit Transfer(address(0), msg.sender, initialSupply);"
        }
      ]
    },
    "explanation": "<p>Minting to <code>address(0)</code> as the <code>from</code> is not a rule the EVM enforces, it is a convention every indexer relies on to compute circulating supply by watching <code>Transfer</code> logs alone. Right now the tokens exist but are frozen: there is no function to move them. The next challenge adds <code>transfer</code>.</p>"
  },
  {
    "id": 343,
    "title": "Implementing transfer",
    "difficulty": "medium",
    "topic": "ERC-20",
    "level": 8,
    "xp": 15,
    "instructions": "<p>Level 5's account model let a sender push their balance down and a recipient's up in one step, and warned that skipping the \"do they have enough?\" check is how you print money by accident. The ERC-20 <code>transfer</code> function is that step written to the standard: check the caller's balance, subtract from the caller, add to the recipient, log it, and return <code>true</code>. Because the caller is always <code>msg.sender</code>, <code>transfer</code> can only move the caller's own tokens, spending someone else's is a different function you will build in challenge 344.</p>\n<p>Solidity 0.8 checks arithmetic by default, so an underflow on the subtraction would revert on its own, but you still write the explicit <code>require</code> first, because a named error message is far more useful to a caller than a bare panic, and because the check-then-change order is the habit that keeps more complex functions safe.</p>\n<ul>\n  <li><strong>msg.sender:</strong> the address that called this function. In <code>transfer</code> it is both the balance being checked and the debit, you can only send what is yours.</li>\n  <li><strong>return (bool):</strong> ERC-20 functions return <code>true</code> on success. Many callers ignore it, but the standard requires it and some integrations check it.</li>\n  <li><strong>emit:</strong> writes an event to the transaction log. Off-chain tools watch <code>Transfer</code> to update balances without re-reading the whole mapping.</li>\n</ul>\n<p class=\"blueprint-line\"><code>require(balanceOf[msg.sender] &gt;= amount, \"...\");</code><br><code>balanceOf[msg.sender] -= amount;</code><br><code>balanceOf[to] += amount;</code><br><code>emit Transfer(msg.sender, to, amount);</code><br><code>return true;</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function send(address to, uint256 amount) external returns (bool) {\n    require(balanceOf[msg.sender] >= amount, \"insufficient\");\n    balanceOf[msg.sender] -= amount;   // debit first\n    balanceOf[to] += amount;           // then credit\n    emit Transfer(msg.sender, to, amount);\n    return true;\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Remember the editor is only pattern-matching your source; it never executes it. Paste your contract into <code>remix.ethereum.org</code>, deploy it, call <code>transfer</code> to a second address, then read both balances and confirm the numbers moved. Try sending more than you hold and watch it revert with your message.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">In a contract <code>MiniToken</code> with <code>mapping(address =&gt; uint256) public balanceOf</code> and <code>event Transfer(address indexed from, address indexed to, uint256 value)</code>, write <code>function transfer(address to, uint256 amount) external returns (bool)</code>. It must <code>require</code> that <code>balanceOf[msg.sender] &gt;= amount</code>, then do <code>balanceOf[msg.sender] -= amount</code>, then <code>balanceOf[to] += amount</code>, then <code>emit Transfer(msg.sender, to, amount)</code>, then <code>return true</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">balanceOf[caller] = 100, transfer(bob, 30)</span><code class=\"io-val\">caller 70, bob 30, returns true</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">transfer(bob, 999) when caller holds 100</span><code class=\"io-val\">reverts, \"insufficient\"</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract MiniToken {",
      "    mapping(address => uint256) public balanceOf;",
      "",
      "    event Transfer(address indexed from, address indexed to, uint256 value);",
      "",
      "    function transfer(address to, uint256 amount) external returns (bool) {",
      "        require(balanceOf[msg.sender] >= amount, \"insufficient\");",
      "        balanceOf[msg.sender] -= amount;",
      "        balanceOf[to] += amount;",
      "        emit Transfer(msg.sender, to, amount);",
      "        return true;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MiniToken {\n    mapping(address => uint256) public balanceOf;\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n\n    // Implement transfer(to, amount) below\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MiniToken {\n    mapping(address => uint256) public balanceOf;\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n\n    function transfer(address to, uint256 amount) external returns (bool) {\n        require(balanceOf[msg.sender] >= amount, \"insufficient\");\n        balanceOf[msg.sender] -= amount;\n        balanceOf[to] += amount;\n        emit Transfer(msg.sender, to, amount);\n        return true;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "function\\s+transfer\\s*\\(\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external\\s+returns\\s*\\(\\s*bool\\s*\\)",
          "message": "Signature: function transfer(address to, uint256 amount) external returns (bool)"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\s*\\(\\s*balanceOf\\[\\s*msg\\.sender\\s*\\]\\s*>=\\s*\\w+",
          "message": "require(balanceOf[msg.sender] >= amount ...);"
        },
        {
          "type": "matchesRegex",
          "pattern": "balanceOf\\[\\s*msg\\.sender\\s*\\]\\s*-=\\s*\\w+\\s*;",
          "message": "Debit the sender: balanceOf[msg.sender] -= amount;"
        },
        {
          "type": "matchesRegex",
          "pattern": "balanceOf\\[\\s*to\\s*\\]\\s*\\+=\\s*\\w+\\s*;",
          "message": "Credit the recipient: balanceOf[to] += amount;"
        },
        {
          "type": "matchesRegex",
          "pattern": "balanceOf\\[\\s*msg\\.sender\\s*\\]\\s*-=[\\s\\S]*balanceOf\\[\\s*to\\s*\\]\\s*\\+=",
          "message": "Debit the sender before crediting the recipient."
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+Transfer\\s*\\(\\s*msg\\.sender\\s*,\\s*to\\s*,\\s*\\w+\\s*\\)",
          "message": "emit Transfer(msg.sender, to, amount);"
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+true\\s*;",
          "message": "return true; at the end."
        }
      ]
    },
    "explanation": "<p>The debit-before-credit order matters even here: if <code>to</code> equalled <code>msg.sender</code>, crediting first then debiting from a stale local copy could corrupt the balance, doing the write straight to storage in this order makes a self-transfer a harmless no-op. You have now covered direct sends; <code>approve</code> and <code>transferFrom</code> add delegated spending, which is what lets a contract pull tokens from you.</p>"
  },
  {
    "id": 344,
    "title": "approve and the allowance Mapping",
    "difficulty": "medium",
    "topic": "ERC-20",
    "level": 8,
    "xp": 15,
    "instructions": "<p>The <code>transfer</code> from the previous challenge only moves <code>msg.sender</code>'s own tokens. But most real flows need a contract to move tokens <em>for</em> you: a marketplace takes payment when your item sells, a swap pool pulls the token you are trading. You cannot hand a contract your private key, so ERC-20 uses a two-step permission instead. First you <strong>approve</strong> a spender for some amount; that amount is recorded in an <code>allowance</code> mapping. Later the spender calls <code>transferFrom</code> (next challenge) and the contract checks that recorded number.</p>\n<p>The analogy is a signed spending limit on a company card: you authorise \"up to $500 at this vendor\", the vendor charges against it, and the limit ticks down. The authorisation is nested by two keys (whose tokens, and who may spend them) so the type is <code>mapping(address =&gt; mapping(address =&gt; uint256))</code>: owner, then spender, to amount.</p>\n<ul>\n  <li><strong>allowance:</strong> <code>allowance[owner][spender]</code> is how many of <code>owner</code>'s tokens <code>spender</code> is currently permitted to move.</li>\n  <li><strong>nested mapping:</strong> a mapping whose values are themselves mappings. <code>allowance[a][b]</code> reads the inner mapping stored at key <code>a</code>, then key <code>b</code>.</li>\n  <li><strong>Approval event:</strong> logged on every <code>approve</code> so off-chain tools can show current allowances without scanning storage.</li>\n</ul>\n<p class=\"blueprint-line\"><code>mapping(address =&gt; mapping(address =&gt; uint256)) public allowance;</code><br><code>allowance[msg.sender][spender] = amount;</code><br><code>emit Approval(msg.sender, spender, amount);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>mapping(address => mapping(address => uint256)) public allowance;\n\nevent Approval(address indexed owner, address indexed spender, uint256 value);\n\nfunction approve(address spender, uint256 amount) external returns (bool) {\n    allowance[msg.sender][spender] = amount;\n    emit Approval(msg.sender, spender, amount);\n    return true;\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>As always, this box just scans the characters you typed. In <code>remix.ethereum.org</code>, deploy the token, call <code>approve</code> with a second address and an amount, then read <code>allowance</code> back with (yourAddress, thatAddress) and see the number you set. That stored number is what <code>transferFrom</code> will spend against.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">In a contract <code>MiniToken</code>, declare <code>mapping(address =&gt; mapping(address =&gt; uint256)) public allowance</code> and <code>event Approval(address indexed owner, address indexed spender, uint256 value)</code>. Write <code>function approve(address spender, uint256 amount) external returns (bool)</code> that sets <code>allowance[msg.sender][spender] = amount</code>, emits <code>Approval(msg.sender, spender, amount)</code>, and returns <code>true</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">approve(market, 500)</span><code class=\"io-val\">allowance[caller][market] == 500, returns true</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">event logged</span><code class=\"io-val\">Approval(caller, market, 500)</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract MiniToken {",
      "    mapping(address => mapping(address => uint256)) public allowance;",
      "",
      "    event Approval(address indexed owner, address indexed spender, uint256 value);",
      "",
      "    function approve(address spender, uint256 amount) external returns (bool) {",
      "        allowance[msg.sender][spender] = amount;",
      "        emit Approval(msg.sender, spender, amount);",
      "        return true;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MiniToken {\n    mapping(address => mapping(address => uint256)) public allowance;\n\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n\n    // Implement approve(spender, amount) below\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MiniToken {\n    mapping(address => mapping(address => uint256)) public allowance;\n\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n\n    function approve(address spender, uint256 amount) external returns (bool) {\n        allowance[msg.sender][spender] = amount;\n        emit Approval(msg.sender, spender, amount);\n        return true;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*address\\s*=>\\s*mapping\\s*\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*\\)\\s*public\\s+allowance",
          "message": "Declare: mapping(address => mapping(address => uint256)) public allowance;"
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+Approval\\s*\\(\\s*address\\s+indexed\\s+owner\\s*,\\s*address\\s+indexed\\s+spender\\s*,\\s*uint256\\s+value\\s*\\)",
          "message": "Declare event Approval(address indexed owner, address indexed spender, uint256 value);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+approve\\s*\\(\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external\\s+returns\\s*\\(\\s*bool\\s*\\)",
          "message": "Signature: function approve(address spender, uint256 amount) external returns (bool)"
        },
        {
          "type": "matchesRegex",
          "pattern": "allowance\\[\\s*msg\\.sender\\s*\\]\\[\\s*spender\\s*\\]\\s*=\\s*\\w+\\s*;",
          "message": "Set allowance[msg.sender][spender] = amount;"
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+Approval\\s*\\(\\s*msg\\.sender\\s*,\\s*spender\\s*,\\s*\\w+\\s*\\)",
          "message": "emit Approval(msg.sender, spender, amount);"
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+true\\s*;",
          "message": "return true; at the end."
        }
      ]
    },
    "explanation": "<p>Setting the allowance to an absolute value (not adding to it) is deliberate: <code>approve(spender, 0)</code> is how you revoke. This plain version has a well-known race (a spender watching the mempool can spend the old allowance and the new one) which is why production tokens add <code>increaseAllowance</code> / <code>decreaseAllowance</code>. You will revisit mempool front-running in the security level; for now, <code>transferFrom</code> in the next challenge is what actually consumes this number.</p>"
  },
  {
    "id": 345,
    "title": "Implementing transferFrom",
    "difficulty": "hard",
    "topic": "ERC-20",
    "level": 8,
    "xp": 25,
    "instructions": "<p><code>approve</code> from the previous challenge only recorded a number. <code>transferFrom</code> is where that number is spent. The caller here is not the token owner, it is the spender, moving tokens out of some <code>from</code> address into some <code>to</code> address. So this function has to pass <em>two</em> gates, not one: <code>from</code> must actually hold the amount, and the caller must have enough allowance from <code>from</code> to cover it. Both get decremented, and the event is logged as <code>Transfer(from, to, amount)</code>, the spender's own address never appears in the log, only in the allowance bookkeeping.</p>\n<p>This is the function a marketplace or a swap pool calls after you approved it. It is also the one where a missing check is expensive: forget the allowance line and anyone can drain anyone who ever held a balance; forget to decrement it and a one-time approval becomes infinite. Order the writes checks-first, then state, the same discipline from Level 6's node work where you could not trust the counterparty to behave.</p>\n<ul>\n  <li><strong>from:</strong> the address whose tokens move. It is a parameter, not <code>msg.sender</code>, the caller is acting on its behalf under an allowance.</li>\n  <li><strong>two requires:</strong> one on <code>balanceOf[from]</code>, one on <code>allowance[from][msg.sender]</code>. Both must hold or the call reverts and nothing changes.</li>\n  <li><strong>decrement the allowance:</strong> <code>allowance[from][msg.sender] -= amount</code> so the same approval cannot be reused beyond its limit.</li>\n</ul>\n<p class=\"blueprint-line\"><code>require(balanceOf[from] &gt;= amount, \"...\");</code><br><code>require(allowance[from][msg.sender] &gt;= amount, \"...\");</code><br><code>allowance[from][msg.sender] -= amount;</code><br><code>balanceOf[from] -= amount;</code><br><code>balanceOf[to] += amount;</code><br><code>emit Transfer(from, to, amount);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function transferFrom(address from, address to, uint256 amount) external returns (bool) {\n    require(balanceOf[from] >= amount, \"balance\");\n    require(allowance[from][msg.sender] >= amount, \"allowance\");\n    allowance[from][msg.sender] -= amount;\n    balanceOf[from] -= amount;\n    balanceOf[to] += amount;\n    emit Transfer(from, to, amount);\n    return true;\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This editor cannot run any of this, it compares text. To watch the two-gate logic actually fire, use <code>remix.ethereum.org</code>: from account A, <code>approve</code> account B for 100; switch to account B and call <code>transferFrom(A, C, 60)</code>; then read <code>allowance(A, B)</code> and see 40 left. Try <code>transferFrom(A, C, 50)</code> again from B and watch it revert.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">In a contract <code>MiniToken</code> with <code>mapping(address =&gt; uint256) public balanceOf</code>, <code>mapping(address =&gt; mapping(address =&gt; uint256)) public allowance</code>, and <code>event Transfer(address indexed from, address indexed to, uint256 value)</code>, write <code>function transferFrom(address from, address to, uint256 amount) external returns (bool)</code>. It must <code>require</code> <code>balanceOf[from] &gt;= amount</code>, <code>require</code> <code>allowance[from][msg.sender] &gt;= amount</code>, then do <code>allowance[from][msg.sender] -= amount</code>, <code>balanceOf[from] -= amount</code>, <code>balanceOf[to] += amount</code>, <code>emit Transfer(from, to, amount)</code>, and <code>return true</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">A approves B for 100, B calls transferFrom(A, C, 60)</span><code class=\"io-val\">A -60, C +60, allowance[A][B] == 40, returns true</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">B calls transferFrom(A, C, 50) again</span><code class=\"io-val\">reverts, \"allowance\"</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract MiniToken {",
      "    mapping(address => uint256) public balanceOf;",
      "    mapping(address => mapping(address => uint256)) public allowance;",
      "",
      "    event Transfer(address indexed from, address indexed to, uint256 value);",
      "",
      "    function transferFrom(address from, address to, uint256 amount) external returns (bool) {",
      "        require(balanceOf[from] >= amount, \"balance\");",
      "        require(allowance[from][msg.sender] >= amount, \"allowance\");",
      "        allowance[from][msg.sender] -= amount;",
      "        balanceOf[from] -= amount;",
      "        balanceOf[to] += amount;",
      "        emit Transfer(from, to, amount);",
      "        return true;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MiniToken {\n    mapping(address => uint256) public balanceOf;\n    mapping(address => mapping(address => uint256)) public allowance;\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n\n    // Implement transferFrom(from, to, amount) below\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MiniToken {\n    mapping(address => uint256) public balanceOf;\n    mapping(address => mapping(address => uint256)) public allowance;\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n\n    function transferFrom(address from, address to, uint256 amount) external returns (bool) {\n        require(balanceOf[from] >= amount, \"balance\");\n        require(allowance[from][msg.sender] >= amount, \"allowance\");\n        allowance[from][msg.sender] -= amount;\n        balanceOf[from] -= amount;\n        balanceOf[to] += amount;\n        emit Transfer(from, to, amount);\n        return true;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "function\\s+transferFrom\\s*\\(\\s*address\\s+\\w+\\s*,\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external\\s+returns\\s*\\(\\s*bool\\s*\\)",
          "message": "Signature: function transferFrom(address from, address to, uint256 amount) external returns (bool)"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\s*\\(\\s*balanceOf\\[\\s*from\\s*\\]\\s*>=\\s*\\w+",
          "message": "require(balanceOf[from] >= amount ...);"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\s*\\(\\s*allowance\\[\\s*from\\s*\\]\\[\\s*msg\\.sender\\s*\\]\\s*>=\\s*\\w+",
          "message": "require(allowance[from][msg.sender] >= amount ...);"
        },
        {
          "type": "matchesRegex",
          "pattern": "allowance\\[\\s*from\\s*\\]\\[\\s*msg\\.sender\\s*\\]\\s*-=\\s*\\w+\\s*;",
          "message": "Decrement: allowance[from][msg.sender] -= amount;"
        },
        {
          "type": "matchesRegex",
          "pattern": "balanceOf\\[\\s*from\\s*\\]\\s*-=\\s*\\w+\\s*;",
          "message": "Debit: balanceOf[from] -= amount;"
        },
        {
          "type": "matchesRegex",
          "pattern": "balanceOf\\[\\s*to\\s*\\]\\s*\\+=\\s*\\w+\\s*;",
          "message": "Credit: balanceOf[to] += amount;"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\([\\s\\S]*require\\([\\s\\S]*balanceOf\\[\\s*from\\s*\\]\\s*-=",
          "message": "Both requires must come before the balance writes."
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+Transfer\\s*\\(\\s*from\\s*,\\s*to\\s*,\\s*\\w+\\s*\\)",
          "message": "emit Transfer(from, to, amount);"
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+true\\s*;",
          "message": "return true; at the end."
        }
      ]
    },
    "explanation": "<p>A real subtlety: OpenZeppelin skips the allowance decrement when it is set to <code>type(uint256).max</code>, treating that as \"infinite approval\" to save gas on repeated pulls. Your version always decrements, which is stricter and perfectly valid. With <code>transfer</code>, <code>approve</code>, and <code>transferFrom</code> written, you have every moving part of ERC-20, the next challenge assembles them into one compliant contract.</p>"
  },
  {
    "id": 346,
    "title": "Guided Project: A Complete ERC-20",
    "difficulty": "hard",
    "topic": "ERC-20",
    "level": 8,
    "xp": 25,
    "instructions": "<p>You have written every ERC-20 part in isolation: the metadata and constructor mint, <code>transfer</code>, <code>approve</code> with its <code>allowance</code> mapping, and <code>transferFrom</code> with its two gates. This challenge puts them in one file so you can see how they share state, <code>transfer</code> and <code>transferFrom</code> both touch <code>balanceOf</code>; <code>approve</code> and <code>transferFrom</code> both touch <code>allowance</code>. Nothing here is new logic; it is the integration step, the same move as Level 6's synthesis challenges where separate pieces finally ran together.</p>\n<p>The result is a contract a real wallet would accept: deploy it, add the token address in MetaMask, and your balance shows up because the function names match what the wallet expects. That is the entire point of a standard, you wrote the kitchen, and every client already knows the menu from challenge 340.</p>\n<ul>\n  <li><strong>shared state:</strong> <code>balanceOf</code> and <code>allowance</code> are declared once at contract level and read/written by several functions, this is why they are state variables, not locals.</li>\n  <li><strong>spec-compliant:</strong> all six functions present with the exact signatures from <code>IERC20</code>, both events emitted at the right moments, and <code>bool</code> returns on the three mutating calls.</li>\n  <li><strong>constructor mint:</strong> the only place supply is created, credited to <code>msg.sender</code>, logged as <code>Transfer(address(0), msg.sender, initialSupply)</code>.</li>\n</ul>\n<p class=\"blueprint-line\"><code>contract ERC20 {</code><br><code>&nbsp;&nbsp;string public name; ... mapping balanceOf; mapping allowance;</code><br><code>&nbsp;&nbsp;constructor(uint256) { mint }</code><br><code>&nbsp;&nbsp;transfer / approve / transferFrom</code><br><code>}</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// the shape you are assembling\ncontract ERC20 {\n    uint256 public totalSupply;\n    mapping(address => uint256) public balanceOf;\n    mapping(address => mapping(address => uint256)) public allowance;\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n    // constructor + transfer + approve + transferFrom\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The checker only confirms the pieces are textually present. The real test is behavioural: compile and deploy in <code>remix.ethereum.org</code>, then run a full cycle, mint on deploy, <code>transfer</code> to a friend account, <code>approve</code> a third account, <code>transferFrom</code> from the friend, and read <code>totalSupply</code> / <code>balanceOf</code> / <code>allowance</code> after each. If every number reconciles, your token is compliant.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write one contract <code>ERC20</code>. State: <code>string public name = \"Guided Token\"</code>, <code>string public symbol = \"GUID\"</code>, <code>uint8 public decimals = 18</code>, <code>uint256 public totalSupply</code>, <code>mapping(address =&gt; uint256) public balanceOf</code>, <code>mapping(address =&gt; mapping(address =&gt; uint256)) public allowance</code>. Events: <code>Transfer(address indexed from, address indexed to, uint256 value)</code> and <code>Approval(address indexed owner, address indexed spender, uint256 value)</code>. <code>constructor(uint256 initialSupply)</code>: set <code>totalSupply</code>, set <code>balanceOf[msg.sender]</code>, emit <code>Transfer(address(0), msg.sender, initialSupply)</code>. Then <code>transfer(address to, uint256 amount)</code>, <code>approve(address spender, uint256 amount)</code>, and <code>transferFrom(address from, address to, uint256 amount)</code>, each <code>external returns (bool)</code>, each emitting its event, exactly as in challenges 342&ndash;344.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">deploy(1000), transfer(bob, 100), bob approves carol 40, carol transferFrom(bob, dave, 30)</span><code class=\"io-val\">deployer 900, bob 70, dave 30, allowance[bob][carol] 10, totalSupply 1000</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract ERC20 {",
      "    string public name = \"Guided Token\";",
      "    string public symbol = \"GUID\";",
      "    uint8 public decimals = 18;",
      "    uint256 public totalSupply;",
      "",
      "    mapping(address => uint256) public balanceOf;",
      "    mapping(address => mapping(address => uint256)) public allowance;",
      "",
      "    event Transfer(address indexed from, address indexed to, uint256 value);",
      "    event Approval(address indexed owner, address indexed spender, uint256 value);",
      "",
      "    constructor(uint256 initialSupply) {",
      "        totalSupply = initialSupply;",
      "        balanceOf[msg.sender] = initialSupply;",
      "        emit Transfer(address(0), msg.sender, initialSupply);",
      "    }",
      "",
      "    function transfer(address to, uint256 amount) external returns (bool) {",
      "        require(balanceOf[msg.sender] >= amount, \"insufficient\");",
      "        balanceOf[msg.sender] -= amount;",
      "        balanceOf[to] += amount;",
      "        emit Transfer(msg.sender, to, amount);",
      "        return true;",
      "    }",
      "",
      "    function approve(address spender, uint256 amount) external returns (bool) {",
      "        allowance[msg.sender][spender] = amount;",
      "        emit Approval(msg.sender, spender, amount);",
      "        return true;",
      "    }",
      "",
      "    function transferFrom(address from, address to, uint256 amount) external returns (bool) {",
      "        require(balanceOf[from] >= amount, \"balance\");",
      "        require(allowance[from][msg.sender] >= amount, \"allowance\");",
      "        allowance[from][msg.sender] -= amount;",
      "        balanceOf[from] -= amount;",
      "        balanceOf[to] += amount;",
      "        emit Transfer(from, to, amount);",
      "        return true;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract ERC20 {\n    // metadata + totalSupply + balanceOf + allowance\n    // Transfer + Approval events\n    // constructor mint\n    // transfer + approve + transferFrom\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract ERC20 {\n    string public name = \"Guided Token\";\n    string public symbol = \"GUID\";\n    uint8 public decimals = 18;\n    uint256 public totalSupply;\n\n    mapping(address => uint256) public balanceOf;\n    mapping(address => mapping(address => uint256)) public allowance;\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n\n    constructor(uint256 initialSupply) {\n        totalSupply = initialSupply;\n        balanceOf[msg.sender] = initialSupply;\n        emit Transfer(address(0), msg.sender, initialSupply);\n    }\n\n    function transfer(address to, uint256 amount) external returns (bool) {\n        require(balanceOf[msg.sender] >= amount, \"insufficient\");\n        balanceOf[msg.sender] -= amount;\n        balanceOf[to] += amount;\n        emit Transfer(msg.sender, to, amount);\n        return true;\n    }\n\n    function approve(address spender, uint256 amount) external returns (bool) {\n        allowance[msg.sender][spender] = amount;\n        emit Approval(msg.sender, spender, amount);\n        return true;\n    }\n\n    function transferFrom(address from, address to, uint256 amount) external returns (bool) {\n        require(balanceOf[from] >= amount, \"balance\");\n        require(allowance[from][msg.sender] >= amount, \"allowance\");\n        allowance[from][msg.sender] -= amount;\n        balanceOf[from] -= amount;\n        balanceOf[to] += amount;\n        emit Transfer(from, to, amount);\n        return true;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+ERC20\\s*\\{",
          "message": "Define a contract named ERC20."
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+totalSupply\\s*;",
          "message": "Add: uint256 public totalSupply;"
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*public\\s+balanceOf",
          "message": "Add: mapping(address => uint256) public balanceOf;"
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*address\\s*=>\\s*mapping\\s*\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*\\)\\s*public\\s+allowance",
          "message": "Add: mapping(address => mapping(address => uint256)) public allowance;"
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*uint256\\s+\\w+\\s*\\)[\\s\\S]*emit\\s+Transfer\\s*\\(\\s*address\\(0\\)\\s*,\\s*msg\\.sender",
          "message": "Constructor must mint and emit Transfer(address(0), msg.sender, initialSupply)."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+transfer\\s*\\(\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external\\s+returns\\s*\\(\\s*bool\\s*\\)",
          "message": "Include transfer(address to, uint256 amount) external returns (bool)."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+approve\\s*\\(\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external\\s+returns\\s*\\(\\s*bool\\s*\\)",
          "message": "Include approve(address spender, uint256 amount) external returns (bool)."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+transferFrom\\s*\\(\\s*address\\s+\\w+\\s*,\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external\\s+returns\\s*\\(\\s*bool\\s*\\)",
          "message": "Include transferFrom(address from, address to, uint256 amount) external returns (bool)."
        },
        {
          "type": "matchesRegex",
          "pattern": "allowance\\[\\s*from\\s*\\]\\[\\s*msg\\.sender\\s*\\]\\s*-=\\s*\\w+",
          "message": "transferFrom must decrement allowance[from][msg.sender]."
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+Approval\\s*\\(\\s*msg\\.sender\\s*,\\s*spender\\s*,\\s*\\w+\\s*\\)",
          "message": "approve must emit Approval(msg.sender, spender, amount)."
        }
      ]
    },
    "explanation": "<p>This is genuinely a working token, the OpenZeppelin ERC20 you would use in production adds internal <code>_transfer</code> / <code>_mint</code> / <code>_burn</code> helpers, zero-address guards, and hooks, but the state layout and the six functions are exactly what you just wrote. From here the same pattern generalises: ERC-721 keeps a ledger of unique ids instead of divisible balances, which is the next cluster.</p>"
  },
  {
    "id": 347,
    "title": "Reading the ERC-721 Interface",
    "difficulty": "easy",
    "topic": "ERC-721",
    "level": 8,
    "xp": 10,
    "instructions": "<p>An ERC-20 balance is one number that can be split any way, 3.5 tokens is meaningful. <strong>ERC-721</strong> is the standard for the opposite: every unit is a distinct item with its own <code>tokenId</code>, and you either own id #42 or you do not. That is what \"NFT\", non-fungible token, means. The bookkeeping changes shape accordingly: instead of <code>balanceOf[addr] =&gt; amount</code>, the core state is <code>ownerOf[tokenId] =&gt; address</code>, and <code>balanceOf</code> becomes just a count of how many ids you hold.</p>\n<p>The approval model also gains a second layer. ERC-20 had one: <code>allowance[owner][spender]</code>. ERC-721 has per-token approval (<code>approve</code> lets one address move one specific id) <em>and</em> operator approval (<code>setApprovalForAll</code> lets an address move every token you own, how a marketplace lists your whole collection with one signature). Same \"reading the menu\" exercise as the <code>IERC20</code> challenge: declarations only, no bodies.</p>\n<ul>\n  <li><strong>tokenId:</strong> a <code>uint256</code> that uniquely identifies one NFT within a contract. Ownership is tracked per id.</li>\n  <li><strong>operator:</strong> an address approved via <code>setApprovalForAll</code> to transfer <em>any</em> of an owner's tokens until revoked. <code>isApprovedForAll(owner, operator)</code> reads that flag.</li>\n  <li><strong>indexed tokenId:</strong> in ERC-721 the <code>tokenId</code> parameter of <code>Transfer</code> and <code>Approval</code> is <code>indexed</code>, so tools can filter logs by a single token.</li>\n</ul>\n<p class=\"blueprint-line\"><code>interface IERC721 {</code><br><code>&nbsp;&nbsp;event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);</code><br><code>&nbsp;&nbsp;function ownerOf(uint256 tokenId) external view returns (address);</code><br><code>}</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ninterface ITickets {\n    event Transfer(address indexed from, address indexed to, uint256 indexed id);\n\n    function ownerOf(uint256 id) external view returns (address);\n    function transferFrom(address from, address to, uint256 id) external;\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>No compiler runs in this tab, it is a text check only. Load the interface into <code>remix.ethereum.org</code>, then start a contract with <code>is IERC721</code> and let the compiler enumerate every function you still owe it. Comparing that list to OpenZeppelin's <code>IERC721</code> is a good way to see what this subset leaves out (<code>safeTransferFrom</code>, <code>getApproved</code>).</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write an <code>interface</code> named <code>IERC721</code>. Declare three events: <code>Transfer(address indexed from, address indexed to, uint256 indexed tokenId)</code>, <code>Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)</code>, and <code>ApprovalForAll(address indexed owner, address indexed operator, bool approved)</code>. Declare six external functions: <code>balanceOf(address owner)</code> <code>view</code> returning <code>uint256</code>; <code>ownerOf(uint256 tokenId)</code> <code>view</code> returning <code>address</code>; <code>transferFrom(address from, address to, uint256 tokenId)</code>; <code>approve(address to, uint256 tokenId)</code>; <code>setApprovalForAll(address operator, bool approved)</code>; and <code>isApprovedForAll(address owner, address operator)</code> <code>view</code> returning <code>bool</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">ownerOf(42)</span><code class=\"io-val\">the address holding token #42</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">isApprovedForAll(alice, market)</span><code class=\"io-val\">true if alice ran setApprovalForAll(market, true)</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "interface IERC721 {",
      "    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);",
      "    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);",
      "    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);",
      "",
      "    function balanceOf(address owner) external view returns (uint256);",
      "    function ownerOf(uint256 tokenId) external view returns (address);",
      "    function transferFrom(address from, address to, uint256 tokenId) external;",
      "    function approve(address to, uint256 tokenId) external;",
      "    function setApprovalForAll(address operator, bool approved) external;",
      "    function isApprovedForAll(address owner, address operator) external view returns (bool);",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare the IERC721 interface below\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ninterface IERC721 {\n    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);\n    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);\n    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);\n\n    function balanceOf(address owner) external view returns (uint256);\n    function ownerOf(uint256 tokenId) external view returns (address);\n    function transferFrom(address from, address to, uint256 tokenId) external;\n    function approve(address to, uint256 tokenId) external;\n    function setApprovalForAll(address operator, bool approved) external;\n    function isApprovedForAll(address owner, address operator) external view returns (bool);\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "interface\\s+IERC721\\s*\\{",
          "message": "Declare: interface IERC721 { ... }"
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+Transfer\\s*\\(\\s*address\\s+indexed\\s+from\\s*,\\s*address\\s+indexed\\s+to\\s*,\\s*uint256\\s+indexed\\s+tokenId\\s*\\)",
          "message": "Declare event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);"
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+Approval\\s*\\(\\s*address\\s+indexed\\s+owner\\s*,\\s*address\\s+indexed\\s+approved\\s*,\\s*uint256\\s+indexed\\s+tokenId\\s*\\)",
          "message": "Declare event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);"
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+ApprovalForAll\\s*\\(\\s*address\\s+indexed\\s+owner\\s*,\\s*address\\s+indexed\\s+operator\\s*,\\s*bool\\s+approved\\s*\\)",
          "message": "Declare event ApprovalForAll(address indexed owner, address indexed operator, bool approved);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+ownerOf\\s*\\(\\s*uint256\\s+\\w+\\s*\\)\\s+external\\s+view\\s+returns\\s*\\(\\s*address\\s*\\)",
          "message": "Declare function ownerOf(uint256 tokenId) external view returns (address);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+balanceOf\\s*\\(\\s*address\\s+\\w+\\s*\\)\\s+external\\s+view\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "Declare function balanceOf(address owner) external view returns (uint256);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+transferFrom\\s*\\(\\s*address\\s+\\w+\\s*,\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external",
          "message": "Declare function transferFrom(address from, address to, uint256 tokenId) external;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+setApprovalForAll\\s*\\(\\s*address\\s+\\w+\\s*,\\s*bool\\s+\\w+\\s*\\)\\s+external",
          "message": "Declare function setApprovalForAll(address operator, bool approved) external;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+isApprovedForAll\\s*\\(\\s*address\\s+\\w+\\s*,\\s*address\\s+\\w+\\s*\\)\\s+external\\s+view\\s+returns\\s*\\(\\s*bool\\s*\\)",
          "message": "Declare function isApprovedForAll(address owner, address operator) external view returns (bool);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+approve\\s*\\(\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external",
          "message": "Declare function approve(address to, uint256 tokenId) external;"
        }
      ]
    },
    "explanation": "<p>The two-tier approval model is the practical difference from ERC-20: <code>setApprovalForAll</code> is what lets an NFT marketplace move any token in your wallet the moment it sells, without a fresh signature per listing, and also what makes a malicious \"approve all\" prompt so dangerous. The next challenges implement this shape: minting first, then the transfer path that checks both approval tiers.</p>"
  },
  {
    "id": 348,
    "title": "The Internal _mint Function",
    "difficulty": "medium",
    "topic": "ERC-721",
    "level": 8,
    "xp": 15,
    "instructions": "<p>An NFT starts existing when it is minted, the same idea as the ERC-20 constructor mint, but per token instead of one lump of supply. <code>_mint</code> is written as an <code>internal</code> helper (callable only from inside the contract or a child) because minting is usually gated by other logic: a public <code>mint()</code> that takes payment, an airdrop loop, a whitelist check. Those public functions do their checks and then call <code>_mint</code> to do the ledger write. Keeping the state change in one internal place means there is exactly one code path that can create a token.</p>\n<p>The write itself is three lines: refuse if the id already has an owner, record the owner, bump that owner's count. Then log it as <code>Transfer(address(0), to, tokenId)</code>, identical convention to ERC-20, a transfer out of the zero address reads as creation.</p>\n<ul>\n  <li><strong>internal:</strong> visible to this contract and contracts that inherit it, but not callable from a transaction directly. The opposite of <code>external</code>.</li>\n  <li><strong>_owners:</strong> <code>mapping(uint256 =&gt; address)</code>, the core ownership ledger. An id with owner <code>address(0)</code> has never been minted.</li>\n  <li><strong>_balances:</strong> <code>mapping(address =&gt; uint256)</code>, a plain count of tokens held, incremented on mint and on transfer-in.</li>\n</ul>\n<p class=\"blueprint-line\"><code>require(_owners[tokenId] == address(0), \"...\");</code><br><code>_owners[tokenId] = to;</code><br><code>_balances[to] += 1;</code><br><code>emit Transfer(address(0), to, tokenId);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function _mint(address to, uint256 id) internal {\n    require(to != address(0), \"zero to\");\n    require(_owners[id] == address(0), \"exists\");\n    _owners[id] = to;\n    _balances[to] += 1;\n    emit Transfer(address(0), to, id);\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This sandbox only inspects your text; an <code>internal</code> function cannot even be called from Remix's UI directly. To exercise it, add a temporary <code>function mintTo(address to, uint256 id) external { _mint(to, id); }</code> in <code>remix.ethereum.org</code>, deploy, mint id 1 to yourself, read <code>ownerOf(1)</code> and <code>balanceOf(you)</code>, then try minting id 1 again and watch the <code>require</code> stop it.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">In a contract <code>MiniNFT</code> with <code>mapping(uint256 =&gt; address) internal _owners</code>, <code>mapping(address =&gt; uint256) internal _balances</code>, and <code>event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)</code>, write <code>function _mint(address to, uint256 tokenId) internal</code>. It must <code>require</code> that <code>_owners[tokenId] == address(0)</code>, then set <code>_owners[tokenId] = to</code>, then do <code>_balances[to] += 1</code>, then <code>emit Transfer(address(0), to, tokenId)</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">_mint(alice, 1)</span><code class=\"io-val\">_owners[1] == alice, _balances[alice] == 1, logs Transfer(0x0, alice, 1)</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">_mint(bob, 1) afterwards</span><code class=\"io-val\">reverts, id 1 already owned</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract MiniNFT {",
      "    mapping(uint256 => address) internal _owners;",
      "    mapping(address => uint256) internal _balances;",
      "",
      "    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);",
      "",
      "    function _mint(address to, uint256 tokenId) internal {",
      "        require(_owners[tokenId] == address(0), \"already minted\");",
      "        _owners[tokenId] = to;",
      "        _balances[to] += 1;",
      "        emit Transfer(address(0), to, tokenId);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MiniNFT {\n    mapping(uint256 => address) internal _owners;\n    mapping(address => uint256) internal _balances;\n\n    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);\n\n    // Implement _mint(to, tokenId) below\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MiniNFT {\n    mapping(uint256 => address) internal _owners;\n    mapping(address => uint256) internal _balances;\n\n    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);\n\n    function _mint(address to, uint256 tokenId) internal {\n        require(_owners[tokenId] == address(0), \"already minted\");\n        _owners[tokenId] = to;\n        _balances[to] += 1;\n        emit Transfer(address(0), to, tokenId);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*uint256\\s*=>\\s*address\\s*\\)\\s*internal\\s+_owners",
          "message": "Declare: mapping(uint256 => address) internal _owners;"
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*internal\\s+_balances",
          "message": "Declare: mapping(address => uint256) internal _balances;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+_mint\\s*\\(\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+internal",
          "message": "Signature: function _mint(address to, uint256 tokenId) internal"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\s*\\(\\s*_owners\\[\\s*tokenId\\s*\\]\\s*==\\s*address\\(0\\)",
          "message": "require(_owners[tokenId] == address(0) ...);"
        },
        {
          "type": "matchesRegex",
          "pattern": "_owners\\[\\s*tokenId\\s*\\]\\s*=\\s*to\\s*;",
          "message": "Set _owners[tokenId] = to;"
        },
        {
          "type": "matchesRegex",
          "pattern": "_balances\\[\\s*to\\s*\\]\\s*\\+=\\s*1\\s*;",
          "message": "Increment _balances[to] += 1;"
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+Transfer\\s*\\(\\s*address\\(0\\)\\s*,\\s*to\\s*,\\s*tokenId\\s*\\)",
          "message": "emit Transfer(address(0), to, tokenId);"
        }
      ]
    },
    "explanation": "<p>The <code>_owners[tokenId] == address(0)</code> guard is what makes token ids permanent: once minted, an id can never be re-minted to someone else, only transferred. OpenZeppelin's <code>_mint</code> adds a <code>_safeMint</code> variant that also checks the recipient is a contract able to receive NFTs; you will see why that matters when a transfer to a contract with no handler would otherwise lock the token forever. Next: moving a minted token with the right authorisation.</p>"
  },
  {
    "id": 349,
    "title": "ERC-721 transferFrom with Approval Checks",
    "difficulty": "medium",
    "topic": "ERC-721",
    "level": 8,
    "xp": 15,
    "instructions": "<p>The ERC-20 <code>transferFrom</code> you wrote checked one allowance number. The ERC-721 version checks three ways the caller might be authorised for one specific token: they are the <strong>owner</strong>; they were approved for exactly this id via <code>approve</code>; or they are an <strong>operator</strong> the owner approved for everything via <code>setApprovalForAll</code>. If any one holds, the transfer proceeds. This is the check a marketplace passes when it moves your NFT to a buyer, usually via the operator route.</p>\n<p>After the checks, the state moves are: clear any single-token approval (it should not survive a change of owner), decrement the sender's count, increment the recipient's, reassign <code>_owners[tokenId]</code>, and emit <code>Transfer(from, to, tokenId)</code>. Clearing the per-token approval first is the easy line to forget, leave it and the previous approvee could yank the token straight back.</p>\n<ul>\n  <li><strong>_tokenApprovals:</strong> <code>mapping(uint256 =&gt; address)</code>, at most one address approved to move a given id. Set by <code>approve</code>, cleared on transfer.</li>\n  <li><strong>_operatorApprovals:</strong> <code>mapping(address =&gt; mapping(address =&gt; bool))</code>, <code>_operatorApprovals[owner][operator]</code> is true when the operator may move all of the owner's tokens.</li>\n  <li><strong>authorised:</strong> <code>msg.sender == owner || msg.sender == _tokenApprovals[tokenId] || _operatorApprovals[owner][msg.sender]</code>.</li>\n</ul>\n<p class=\"blueprint-line\"><code>address owner = _owners[tokenId];</code><br><code>require(owner == from, \"...\");</code><br><code>require(msg.sender == owner || msg.sender == _tokenApprovals[tokenId] || _operatorApprovals[owner][msg.sender], \"...\");</code><br><code>_tokenApprovals[tokenId] = address(0);</code><br><code>_balances[from] -= 1; _balances[to] += 1; _owners[tokenId] = to;</code><br><code>emit Transfer(from, to, tokenId);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function transferFrom(address from, address to, uint256 id) external {\n    address owner = _owners[id];\n    require(owner == from, \"wrong from\");\n    require(to != address(0), \"zero to\");\n    require(msg.sender == owner ||\n        msg.sender == _tokenApprovals[id] ||\n        _operatorApprovals[owner][msg.sender],\n        \"not authorized\");\n    _tokenApprovals[id] = address(0);\n    _balances[from] -= 1;\n    _balances[to] += 1;\n    _owners[id] = to;\n    emit Transfer(from, to, id);\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The grader only matches text; it will not catch a logic slip. Prove it in <code>remix.ethereum.org</code>: mint id 1 to account A, then from A call <code>approve(B, 1)</code>, switch to B and call <code>transferFrom(A, C, 1)</code>. Read <code>ownerOf(1)</code> (now C) and try the transfer again from B, it should revert, because the approval was cleared.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">In a contract <code>MiniNFT</code> with <code>_owners</code>, <code>_balances</code>, <code>mapping(uint256 =&gt; address) internal _tokenApprovals</code>, <code>mapping(address =&gt; mapping(address =&gt; bool)) internal _operatorApprovals</code>, and the <code>Transfer</code> event, write <code>function transferFrom(address from, address to, uint256 tokenId) external</code>. Load <code>address owner = _owners[tokenId]</code>. <code>require</code> <code>owner == from</code>. <code>require</code> <code>to != address(0)</code>. <code>require</code> that <code>msg.sender == owner || msg.sender == _tokenApprovals[tokenId] || _operatorApprovals[owner][msg.sender]</code>. Then set <code>_tokenApprovals[tokenId] = address(0)</code>, do <code>_balances[from] -= 1</code> and <code>_balances[to] += 1</code>, set <code>_owners[tokenId] = to</code>, and <code>emit Transfer(from, to, tokenId)</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">A owns 1, A approves B for 1, B calls transferFrom(A, C, 1)</span><code class=\"io-val\">ownerOf(1) == C, _tokenApprovals[1] cleared</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">stranger calls transferFrom(A, C, 1)</span><code class=\"io-val\">reverts, \"not authorized\"</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract MiniNFT {",
      "    mapping(uint256 => address) internal _owners;",
      "    mapping(address => uint256) internal _balances;",
      "    mapping(uint256 => address) internal _tokenApprovals;",
      "    mapping(address => mapping(address => bool)) internal _operatorApprovals;",
      "",
      "    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);",
      "",
      "    function transferFrom(address from, address to, uint256 tokenId) external {",
      "        address owner = _owners[tokenId];",
      "        require(owner == from, \"wrong from\");",
      "        require(to != address(0), \"zero to\");",
      "        require(",
      "            msg.sender == owner ||",
      "            msg.sender == _tokenApprovals[tokenId] ||",
      "            _operatorApprovals[owner][msg.sender],",
      "            \"not authorized\"",
      "        );",
      "        _tokenApprovals[tokenId] = address(0);",
      "        _balances[from] -= 1;",
      "        _balances[to] += 1;",
      "        _owners[tokenId] = to;",
      "        emit Transfer(from, to, tokenId);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MiniNFT {\n    mapping(uint256 => address) internal _owners;\n    mapping(address => uint256) internal _balances;\n    mapping(uint256 => address) internal _tokenApprovals;\n    mapping(address => mapping(address => bool)) internal _operatorApprovals;\n\n    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);\n\n    // Implement transferFrom(from, to, tokenId) with owner / approved / operator checks\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MiniNFT {\n    mapping(uint256 => address) internal _owners;\n    mapping(address => uint256) internal _balances;\n    mapping(uint256 => address) internal _tokenApprovals;\n    mapping(address => mapping(address => bool)) internal _operatorApprovals;\n\n    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);\n\n    function transferFrom(address from, address to, uint256 tokenId) external {\n        address owner = _owners[tokenId];\n        require(owner == from, \"wrong from\");\n        require(to != address(0), \"zero to\");\n        require(\n            msg.sender == owner ||\n            msg.sender == _tokenApprovals[tokenId] ||\n            _operatorApprovals[owner][msg.sender],\n            \"not authorized\"\n        );\n        _tokenApprovals[tokenId] = address(0);\n        _balances[from] -= 1;\n        _balances[to] += 1;\n        _owners[tokenId] = to;\n        emit Transfer(from, to, tokenId);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "function\\s+transferFrom\\s*\\(\\s*address\\s+\\w+\\s*,\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external",
          "message": "Signature: function transferFrom(address from, address to, uint256 tokenId) external"
        },
        {
          "type": "matchesRegex",
          "pattern": "_owners\\[\\s*tokenId\\s*\\]",
          "message": "Read the current owner from _owners[tokenId]."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\s*\\(\\s*\\w+\\s*==\\s*from",
          "message": "require that the recorded owner == from."
        },
        {
          "type": "matchesRegex",
          "pattern": "msg\\.sender\\s*==\\s*_tokenApprovals\\[\\s*tokenId\\s*\\]",
          "message": "Allow the per-token approved address: msg.sender == _tokenApprovals[tokenId]."
        },
        {
          "type": "matchesRegex",
          "pattern": "_operatorApprovals\\[\\s*\\w+\\s*\\]\\[\\s*msg\\.sender\\s*\\]",
          "message": "Allow an operator: _operatorApprovals[owner][msg.sender]."
        },
        {
          "type": "matchesRegex",
          "pattern": "_tokenApprovals\\[\\s*tokenId\\s*\\]\\s*=\\s*address\\(0\\)\\s*;",
          "message": "Clear the per-token approval: _tokenApprovals[tokenId] = address(0);"
        },
        {
          "type": "matchesRegex",
          "pattern": "_balances\\[\\s*from\\s*\\]\\s*-=\\s*1[\\s\\S]*_balances\\[\\s*to\\s*\\]\\s*\\+=\\s*1",
          "message": "Decrement _balances[from] and increment _balances[to]."
        },
        {
          "type": "matchesRegex",
          "pattern": "_owners\\[\\s*tokenId\\s*\\]\\s*=\\s*to\\s*;",
          "message": "Reassign ownership: _owners[tokenId] = to;"
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+Transfer\\s*\\(\\s*from\\s*,\\s*to\\s*,\\s*tokenId\\s*\\)",
          "message": "emit Transfer(from, to, tokenId);"
        }
      ]
    },
    "explanation": "<p>The three-way authorisation check is the whole security model of an NFT collection, every marketplace, staking contract, and lending protocol relies on the operator branch. Clearing <code>_tokenApprovals[tokenId]</code> on transfer is required by the spec precisely so a stale approval cannot follow the token to its new owner. A production implementation factors this check into an internal <code>_isApprovedOrOwner</code> and adds <code>safeTransferFrom</code> on top.</p>"
  },
  {
    "id": 350,
    "title": "tokenURI: Pointing at Metadata",
    "difficulty": "medium",
    "topic": "ERC-721",
    "level": 8,
    "xp": 15,
    "instructions": "<p>An NFT contract stores ownership on-chain, but the picture and its traits are almost always off-chain, too large and too expensive to keep in storage. <code>tokenURI(tokenId)</code> is the bridge: it returns a URL (usually <code>ipfs://...</code> or <code>https://...</code>) where a wallet fetches a JSON file describing that token. The near-universal pattern is a shared <code>baseURI</code> plus the decimal <code>tokenId</code> stuck on the end, so token 42 resolves to <code>baseURI + \"42\"</code>.</p>\n<p>Solidity has no built-in \"number to string\", so you write a tiny helper. The loop is: count the decimal digits, allocate a <code>bytes</code> buffer that size, then fill it back-to-front by taking <code>value % 10</code>, adding 48 (the ASCII code for <code>'0'</code>), and dividing by 10. Concatenation is <code>string(abi.encodePacked(a, b))</code>, <code>abi.encodePacked</code> glues the raw bytes together and <code>string(...)</code> retags the result. This is exactly what OpenZeppelin's <code>Strings.toString</code> does under the hood.</p>\n<ul>\n  <li><strong>baseURI:</strong> a <code>string</code> prefix common to every token in the collection, e.g. <code>\"ipfs://bafy.../\"</code>.</li>\n  <li><strong>abi.encodePacked:</strong> concatenates its arguments into one <code>bytes</code> value with no padding or length prefixes, ideal for building a string, unsafe for hashing distinct fields.</li>\n  <li><strong>ASCII digit:</strong> character <code>'0'</code> is byte <code>48</code>, so <code>bytes1(uint8(48 + d))</code> turns a digit <code>0&ndash;9</code> into its character.</li>\n</ul>\n<p class=\"blueprint-line\"><code>return string(abi.encodePacked(baseURI, _toString(tokenId)));</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function _toString(uint256 value) internal pure returns (string memory) {\n    if (value == 0) return \"0\";\n    uint256 temp = value;\n    uint256 digits;\n    while (temp != 0) { digits++; temp /= 10; }\n    bytes memory buffer = new bytes(digits);\n    while (value != 0) {\n        digits -= 1;\n        buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));\n        value /= 10;\n    }\n    return string(buffer);\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Text matching is all this editor does, it will not actually run the digit loop. In <code>remix.ethereum.org</code>, set <code>baseURI</code> to something like <code>\"ipfs://demo/\"</code>, deploy, and call <code>tokenURI(42)</code>; you should get back <code>\"ipfs://demo/42\"</code>. Try <code>0</code> and a big number to check the helper's edges.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">In a contract <code>MiniNFT</code>, declare <code>string public baseURI = \"ipfs://example/\"</code>. Write <code>function _toString(uint256 value) internal pure returns (string memory)</code> that converts a <code>uint256</code> to its decimal string (return <code>\"0\"</code> when <code>value == 0</code>; otherwise count digits, fill a <code>bytes</code> buffer back-to-front using <code>48 + value % 10</code>, and <code>return string(buffer)</code>). Then write <code>function tokenURI(uint256 tokenId) public view returns (string memory)</code> that returns <code>string(abi.encodePacked(baseURI, _toString(tokenId)))</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">tokenURI(42)</span><code class=\"io-val\">\"ipfs://example/42\"</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">_toString(0)</span><code class=\"io-val\">\"0\"</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract MiniNFT {",
      "    string public baseURI = \"ipfs://example/\";",
      "",
      "    function tokenURI(uint256 tokenId) public view returns (string memory) {",
      "        return string(abi.encodePacked(baseURI, _toString(tokenId)));",
      "    }",
      "",
      "    function _toString(uint256 value) internal pure returns (string memory) {",
      "        if (value == 0) {",
      "            return \"0\";",
      "        }",
      "        uint256 temp = value;",
      "        uint256 digits;",
      "        while (temp != 0) {",
      "            digits++;",
      "            temp /= 10;",
      "        }",
      "        bytes memory buffer = new bytes(digits);",
      "        while (value != 0) {",
      "            digits -= 1;",
      "            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));",
      "            value /= 10;",
      "        }",
      "        return string(buffer);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MiniNFT {\n    string public baseURI = \"ipfs://example/\";\n\n    // Write _toString(uint256) and tokenURI(uint256)\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MiniNFT {\n    string public baseURI = \"ipfs://example/\";\n\n    function tokenURI(uint256 tokenId) public view returns (string memory) {\n        return string(abi.encodePacked(baseURI, _toString(tokenId)));\n    }\n\n    function _toString(uint256 value) internal pure returns (string memory) {\n        if (value == 0) {\n            return \"0\";\n        }\n        uint256 temp = value;\n        uint256 digits;\n        while (temp != 0) {\n            digits++;\n            temp /= 10;\n        }\n        bytes memory buffer = new bytes(digits);\n        while (value != 0) {\n            digits -= 1;\n            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));\n            value /= 10;\n        }\n        return string(buffer);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "string\\s+public\\s+baseURI\\s*=\\s*\"ipfs://example/\"",
          "message": "Declare: string public baseURI = \"ipfs://example/\";"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+tokenURI\\s*\\(\\s*uint256\\s+\\w+\\s*\\)\\s+public\\s+view\\s+returns\\s*\\(\\s*string\\s+memory\\s*\\)",
          "message": "Signature: function tokenURI(uint256 tokenId) public view returns (string memory)"
        },
        {
          "type": "matchesRegex",
          "pattern": "string\\s*\\(\\s*abi\\.encodePacked\\s*\\(\\s*baseURI\\s*,\\s*_toString\\s*\\(\\s*tokenId\\s*\\)\\s*\\)\\s*\\)",
          "message": "Return string(abi.encodePacked(baseURI, _toString(tokenId)));"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+_toString\\s*\\(\\s*uint256\\s+\\w+\\s*\\)\\s+internal\\s+pure\\s+returns\\s*\\(\\s*string\\s+memory\\s*\\)",
          "message": "Signature: function _toString(uint256 value) internal pure returns (string memory)"
        },
        {
          "type": "matchesRegex",
          "pattern": "new\\s+bytes\\s*\\(\\s*\\w+\\s*\\)",
          "message": "Allocate the buffer with new bytes(digits);"
        },
        {
          "type": "matchesRegex",
          "pattern": "48\\s*\\+\\s*(?:uint\\d*\\s*\\(\\s*)?\\w+\\s*%\\s*10",
          "message": "Convert a digit to ASCII with 48 + value % 10."
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+string\\s*\\(\\s*buffer\\s*\\)\\s*;",
          "message": "Return string(buffer); from _toString."
        },
        {
          "type": "matchesRegex",
          "pattern": "value\\s*/=\\s*10",
          "message": "Divide value by 10 each iteration: value /= 10;"
        }
      ]
    },
    "explanation": "<p>Almost every NFT you have seen resolves its art through this two-line concatenation. Because <code>tokenURI</code> is just a function, a contract can also return fully on-chain data, a base64 <code>data:</code> URI with the JSON and an SVG inlined, which is how \"100% on-chain\" collections work. The digit-to-string helper you wrote is one of the most-copied snippets in Solidity; now you know exactly what it does.</p>"
  },
  {
    "id": 351,
    "title": "Guided Project: A Mintable NFT Collection",
    "difficulty": "hard",
    "topic": "ERC-721",
    "level": 8,
    "xp": 25,
    "instructions": "<p>Time to combine the ERC-721 pieces into the contract shape people actually deploy for a \"mint is live\" drop. It keeps the <code>ownerOf</code> / <code>balanceOf</code> ledgers from the mint challenge, but wraps token creation in a <em>public</em> <code>mint()</code> that anyone can call, takes a fixed <code>PRICE</code> in ether, hands out ids from an incrementing counter, and refuses once <code>MAX_SUPPLY</code> is reached. Same synthesis move as the ERC-20 project: no new primitive, just the assembly.</p>\n<p>Two new keywords carry the caps. <code>constant</code> marks a value fixed at compile time (<code>MAX_SUPPLY</code>, <code>PRICE</code>), it costs no storage and cannot ever change. The counter <code>nextId</code> is ordinary storage: read it for the id to assign, then increment. Checking <code>nextId &lt; MAX_SUPPLY</code> before minting is the supply cap; checking <code>msg.value &gt;= PRICE</code> is the paywall. Level 6's mempool challenge showed transactions racing to be included, a popular mint is that race at full volume, which is why the cap check has to be exact.</p>\n<ul>\n  <li><strong>constant:</strong> a state variable whose value is set in code and burned into the bytecode. No storage slot, no setter, cheapest possible read.</li>\n  <li><strong>payable:</strong> a function that may receive ether. <code>msg.value</code> is the amount sent, in wei; <code>0.01 ether</code> is <code>10**16</code> wei.</li>\n  <li><strong>nextId:</strong> a storage <code>uint256</code> starting at 0. Each mint assigns <code>nextId</code> then does <code>nextId += 1</code>, so ids run 0, 1, 2, &hellip;</li>\n</ul>\n<p class=\"blueprint-line\"><code>uint256 public constant MAX_SUPPLY = 1000;</code><br><code>uint256 public constant PRICE = 0.01 ether;</code><br><code>uint256 public nextId;</code><br><code>function mint() external payable { require(nextId &lt; MAX_SUPPLY); require(msg.value &gt;= PRICE); ... }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function mint() external payable {\n    require(nextId < MAX_SUPPLY, \"sold out\");\n    require(msg.value >= PRICE, \"underpaid\");\n    uint256 tokenId = nextId;\n    nextId += 1;\n    ownerOf[tokenId] = msg.sender;\n    balanceOf[msg.sender] += 1;\n    emit Transfer(address(0), msg.sender, tokenId);\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor is a text scanner, it cannot send value or enforce a cap. In <code>remix.ethereum.org</code>, deploy the collection, put <code>0.01</code> in the Value field (units: ether), and call <code>mint()</code> a few times from different accounts; watch <code>nextId</code> climb and <code>ownerOf</code> fill in. Set <code>MAX_SUPPLY</code> low, like 3, to see the \"sold out\" revert without minting a thousand.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract <code>MintableNFT</code>. State: <code>mapping(uint256 =&gt; address) public ownerOf</code>, <code>mapping(address =&gt; uint256) public balanceOf</code>, <code>uint256 public nextId</code>, <code>uint256 public constant MAX_SUPPLY = 1000</code>, <code>uint256 public constant PRICE = 0.01 ether</code>. Declare <code>event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)</code>. Write <code>function mint() external payable</code> that <code>require</code>s <code>nextId &lt; MAX_SUPPLY</code>, <code>require</code>s <code>msg.value &gt;= PRICE</code>, reads <code>uint256 tokenId = nextId</code>, does <code>nextId += 1</code>, sets <code>ownerOf[tokenId] = msg.sender</code>, does <code>balanceOf[msg.sender] += 1</code>, and emits <code>Transfer(address(0), msg.sender, tokenId)</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">mint() with 0.01 ether, three times</span><code class=\"io-val\">nextId == 3, ownerOf[0..2] set, each caller balanceOf += 1</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">mint() with 0.001 ether</span><code class=\"io-val\">reverts, \"underpaid\"</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract MintableNFT {",
      "    mapping(uint256 => address) public ownerOf;",
      "    mapping(address => uint256) public balanceOf;",
      "",
      "    uint256 public nextId;",
      "    uint256 public constant MAX_SUPPLY = 1000;",
      "    uint256 public constant PRICE = 0.01 ether;",
      "",
      "    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);",
      "",
      "    function mint() external payable {",
      "        require(nextId < MAX_SUPPLY, \"sold out\");",
      "        require(msg.value >= PRICE, \"underpaid\");",
      "        uint256 tokenId = nextId;",
      "        nextId += 1;",
      "        ownerOf[tokenId] = msg.sender;",
      "        balanceOf[msg.sender] += 1;",
      "        emit Transfer(address(0), msg.sender, tokenId);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MintableNFT {\n    // ownerOf + balanceOf ledgers\n    // nextId counter, MAX_SUPPLY + PRICE constants\n    // Transfer event\n    // payable mint()\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MintableNFT {\n    mapping(uint256 => address) public ownerOf;\n    mapping(address => uint256) public balanceOf;\n\n    uint256 public nextId;\n    uint256 public constant MAX_SUPPLY = 1000;\n    uint256 public constant PRICE = 0.01 ether;\n\n    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);\n\n    function mint() external payable {\n        require(nextId < MAX_SUPPLY, \"sold out\");\n        require(msg.value >= PRICE, \"underpaid\");\n        uint256 tokenId = nextId;\n        nextId += 1;\n        ownerOf[tokenId] = msg.sender;\n        balanceOf[msg.sender] += 1;\n        emit Transfer(address(0), msg.sender, tokenId);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+MintableNFT\\s*\\{",
          "message": "Define a contract named MintableNFT."
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*uint256\\s*=>\\s*address\\s*\\)\\s*public\\s+ownerOf",
          "message": "Add: mapping(uint256 => address) public ownerOf;"
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*public\\s+balanceOf",
          "message": "Add: mapping(address => uint256) public balanceOf;"
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+nextId\\s*;",
          "message": "Add: uint256 public nextId;"
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+constant\\s+MAX_SUPPLY\\s*=\\s*1000\\s*;",
          "message": "Add: uint256 public constant MAX_SUPPLY = 1000;"
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+constant\\s+PRICE\\s*=\\s*0\\.01\\s+ether\\s*;",
          "message": "Add: uint256 public constant PRICE = 0.01 ether;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+mint\\s*\\(\\s*\\)\\s+external\\s+payable",
          "message": "mint() must be external payable."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\s*\\(\\s*nextId\\s*<\\s*MAX_SUPPLY",
          "message": "require(nextId < MAX_SUPPLY ...);"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\s*\\(\\s*msg\\.value\\s*>=\\s*PRICE",
          "message": "require(msg.value >= PRICE ...);"
        },
        {
          "type": "matchesRegex",
          "pattern": "nextId\\s*\\+=\\s*1[\\s\\S]*ownerOf\\[\\s*tokenId\\s*\\]\\s*=\\s*msg\\.sender[\\s\\S]*emit\\s+Transfer\\s*\\(\\s*address\\(0\\)\\s*,\\s*msg\\.sender\\s*,\\s*tokenId\\s*\\)",
          "message": "Increment nextId, set ownerOf[tokenId] = msg.sender, then emit Transfer(address(0), msg.sender, tokenId)."
        }
      ]
    },
    "explanation": "<p>This is the skeleton behind most PFP drops, real ones add <code>tokenURI</code>, an <code>onlyOwner</code> withdraw for the mint proceeds, and often a per-wallet cap, but the counter-plus-cap-plus-paywall core is exactly this. Note the reentrancy discipline from Level 6's untrusted-counterparty work already applies: state (<code>nextId</code>, <code>ownerOf</code>) is written before any external interaction, so there is nothing for a malicious minter to re-enter.</p>"
  },
  {
    "id": 352,
    "title": "Read and Complete: A Staking Token's transferFrom",
    "difficulty": "medium",
    "topic": "Consolidation",
    "level": 8,
    "xp": 15,
    "instructions": "<p>Reading unfamiliar token code and spotting the one missing piece is most of the job in an audit or an integration. Below is <code>StakeToken</code>, a normal ERC-20: it has the metadata, a constructor mint, a working <code>transfer</code>, and a working <code>approve</code> with its <code>allowance</code> mapping. The only gap is <code>transferFrom</code>, the delegated-spend path a staking contract needs to pull your tokens when you stake. Your job is to read what is already there, match its style, and fill in that one function using the same two-gate logic from challenge 344.</p>\n<p>The gates, in order: <code>from</code> must hold the amount, the caller must have enough allowance from <code>from</code>, then decrement the allowance, move the balances, emit <code>Transfer(from, to, amount)</code>, and return <code>true</code>. Everything else in the contract stays exactly as written, you are completing it, not rewriting it.</p>\n<ul>\n  <li><strong>read first:</strong> the state (<code>balanceOf</code>, <code>allowance</code>) and the <code>Transfer</code> event are already declared, your function reuses them, it does not redeclare them.</li>\n  <li><strong>two-gate check:</strong> one <code>require</code> on <code>balanceOf[from]</code>, one on <code>allowance[from][msg.sender]</code>.</li>\n  <li><strong>consume the allowance:</strong> <code>allowance[from][msg.sender] -= amount</code> so a single approval cannot be spent past its limit.</li>\n</ul>\n<p class=\"blueprint-line\"><code>require(balanceOf[from] &gt;= amount, \"...\");</code><br><code>require(allowance[from][msg.sender] &gt;= amount, \"...\");</code><br><code>allowance[from][msg.sender] -= amount;</code><br><code>balanceOf[from] -= amount; balanceOf[to] += amount;</code><br><code>emit Transfer(from, to, amount); return true;</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// the transfer already in the contract - match this style\nfunction transfer(address to, uint256 amount) public returns (bool) {\n    require(balanceOf[msg.sender] >= amount, \"insufficient\");\n    balanceOf[msg.sender] -= amount;\n    balanceOf[to] += amount;\n    emit Transfer(msg.sender, to, amount);\n    return true;\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This tab only checks the text you submit. To confirm the completed contract behaves, paste the whole thing into <code>remix.ethereum.org</code>: deploy, <code>approve</code> a second account, then from that account call <code>transferFrom</code> and check that <code>allowance</code> dropped by the amount moved. Submit the full contract here, including the parts that were already written.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Keep the given <code>StakeToken</code> contract intact and add the body of <code>function transferFrom(address from, address to, uint256 amount) public returns (bool)</code>. It must <code>require</code> <code>balanceOf[from] &gt;= amount</code>, <code>require</code> <code>allowance[from][msg.sender] &gt;= amount</code>, then <code>allowance[from][msg.sender] -= amount</code>, <code>balanceOf[from] -= amount</code>, <code>balanceOf[to] += amount</code>, <code>emit Transfer(from, to, amount)</code>, and <code>return true</code>. Submit the complete contract.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">A approves pool 100, pool calls transferFrom(A, pool, 40)</span><code class=\"io-val\">A -40, pool +40, allowance[A][pool] == 60, returns true</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract StakeToken {",
      "    string public name = \"Stake Token\";",
      "    string public symbol = \"STK\";",
      "    uint8 public decimals = 18;",
      "    uint256 public totalSupply;",
      "",
      "    mapping(address => uint256) public balanceOf;",
      "    mapping(address => mapping(address => uint256)) public allowance;",
      "",
      "    event Transfer(address indexed from, address indexed to, uint256 value);",
      "    event Approval(address indexed owner, address indexed spender, uint256 value);",
      "",
      "    constructor(uint256 initialSupply) {",
      "        totalSupply = initialSupply;",
      "        balanceOf[msg.sender] = initialSupply;",
      "        emit Transfer(address(0), msg.sender, initialSupply);",
      "    }",
      "",
      "    function transfer(address to, uint256 amount) public returns (bool) {",
      "        require(balanceOf[msg.sender] >= amount, \"insufficient\");",
      "        balanceOf[msg.sender] -= amount;",
      "        balanceOf[to] += amount;",
      "        emit Transfer(msg.sender, to, amount);",
      "        return true;",
      "    }",
      "",
      "    function approve(address spender, uint256 amount) public returns (bool) {",
      "        allowance[msg.sender][spender] = amount;",
      "        emit Approval(msg.sender, spender, amount);",
      "        return true;",
      "    }",
      "",
      "    function transferFrom(address from, address to, uint256 amount) public returns (bool) {",
      "        require(balanceOf[from] >= amount, \"balance\");",
      "        require(allowance[from][msg.sender] >= amount, \"allowance\");",
      "        allowance[from][msg.sender] -= amount;",
      "        balanceOf[from] -= amount;",
      "        balanceOf[to] += amount;",
      "        emit Transfer(from, to, amount);",
      "        return true;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract StakeToken {\n    string public name = \"Stake Token\";\n    string public symbol = \"STK\";\n    uint8 public decimals = 18;\n    uint256 public totalSupply;\n\n    mapping(address => uint256) public balanceOf;\n    mapping(address => mapping(address => uint256)) public allowance;\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n\n    constructor(uint256 initialSupply) {\n        totalSupply = initialSupply;\n        balanceOf[msg.sender] = initialSupply;\n        emit Transfer(address(0), msg.sender, initialSupply);\n    }\n\n    function transfer(address to, uint256 amount) public returns (bool) {\n        require(balanceOf[msg.sender] >= amount, \"insufficient\");\n        balanceOf[msg.sender] -= amount;\n        balanceOf[to] += amount;\n        emit Transfer(msg.sender, to, amount);\n        return true;\n    }\n\n    function approve(address spender, uint256 amount) public returns (bool) {\n        allowance[msg.sender][spender] = amount;\n        emit Approval(msg.sender, spender, amount);\n        return true;\n    }\n\n    function transferFrom(address from, address to, uint256 amount) public returns (bool) {\n        // TODO: two-gate check, then move balances, emit Transfer, return true\n    }\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract StakeToken {\n    string public name = \"Stake Token\";\n    string public symbol = \"STK\";\n    uint8 public decimals = 18;\n    uint256 public totalSupply;\n\n    mapping(address => uint256) public balanceOf;\n    mapping(address => mapping(address => uint256)) public allowance;\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n\n    constructor(uint256 initialSupply) {\n        totalSupply = initialSupply;\n        balanceOf[msg.sender] = initialSupply;\n        emit Transfer(address(0), msg.sender, initialSupply);\n    }\n\n    function transfer(address to, uint256 amount) public returns (bool) {\n        require(balanceOf[msg.sender] >= amount, \"insufficient\");\n        balanceOf[msg.sender] -= amount;\n        balanceOf[to] += amount;\n        emit Transfer(msg.sender, to, amount);\n        return true;\n    }\n\n    function approve(address spender, uint256 amount) public returns (bool) {\n        allowance[msg.sender][spender] = amount;\n        emit Approval(msg.sender, spender, amount);\n        return true;\n    }\n\n    function transferFrom(address from, address to, uint256 amount) public returns (bool) {\n        require(balanceOf[from] >= amount, \"balance\");\n        require(allowance[from][msg.sender] >= amount, \"allowance\");\n        allowance[from][msg.sender] -= amount;\n        balanceOf[from] -= amount;\n        balanceOf[to] += amount;\n        emit Transfer(from, to, amount);\n        return true;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+StakeToken\\s*\\{",
          "message": "Keep the contract named StakeToken."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+transfer\\s*\\(\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+public\\s+returns\\s*\\(\\s*bool\\s*\\)",
          "message": "Keep the existing transfer function."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+transferFrom\\s*\\(\\s*address\\s+\\w+\\s*,\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+public\\s+returns\\s*\\(\\s*bool\\s*\\)",
          "message": "Complete function transferFrom(address from, address to, uint256 amount) public returns (bool)."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\s*\\(\\s*balanceOf\\[\\s*from\\s*\\]\\s*>=\\s*\\w+",
          "message": "require(balanceOf[from] >= amount ...);"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\s*\\(\\s*allowance\\[\\s*from\\s*\\]\\[\\s*msg\\.sender\\s*\\]\\s*>=\\s*\\w+",
          "message": "require(allowance[from][msg.sender] >= amount ...);"
        },
        {
          "type": "matchesRegex",
          "pattern": "allowance\\[\\s*from\\s*\\]\\[\\s*msg\\.sender\\s*\\]\\s*-=\\s*\\w+\\s*;",
          "message": "Decrement allowance[from][msg.sender] -= amount;"
        },
        {
          "type": "matchesRegex",
          "pattern": "balanceOf\\[\\s*from\\s*\\]\\s*-=\\s*\\w+[\\s\\S]*balanceOf\\[\\s*to\\s*\\]\\s*\\+=\\s*\\w+",
          "message": "Move the balances: balanceOf[from] -= amount; balanceOf[to] += amount;"
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+Transfer\\s*\\(\\s*from\\s*,\\s*to\\s*,\\s*\\w+\\s*\\)",
          "message": "emit Transfer(from, to, amount);"
        }
      ]
    },
    "explanation": "<p>Notice the completed <code>transferFrom</code> did not need any new state, it reused <code>balanceOf</code> and <code>allowance</code> that <code>approve</code> and the constructor already set up. That is the tell of a well-factored token: the functions share one ledger. Reading a contract to find the single unfinished path is exactly what you will do to a real codebase before extending it.</p>"
  },
  {
    "id": 353,
    "title": "Read and Complete: An NFT's Mint Guard",
    "difficulty": "medium",
    "topic": "Consolidation",
    "level": 8,
    "xp": 15,
    "instructions": "<p>Same exercise, ERC-721 side. <code>BadgeNFT</code> below is a small soulbound-style collection: <code>ownerOf</code> and <code>balanceOf</code> ledgers, a <code>totalMinted</code> counter, a <code>Transfer</code> event, and a public <code>claim(tokenId)</code> that calls an internal <code>_mint</code>. The <code>_mint</code> body is stubbed. Read the surrounding code, then fill it in with the guard-and-write pattern from challenge 347, plus one extra check, that <code>to</code> is not the zero address, since <code>claim</code> passes <code>msg.sender</code> and you want the helper safe for any caller.</p>\n<p>The body: reject <code>to == address(0)</code>, reject an id that already has an owner, set <code>ownerOf[tokenId] = to</code>, bump <code>balanceOf[to]</code>, bump <code>totalMinted</code>, and emit <code>Transfer(address(0), to, tokenId)</code>. Leave <code>claim</code> and the state declarations untouched.</p>\n<ul>\n  <li><strong>stub:</strong> a function with the right signature but no working body, left for you to complete. Do not change its signature or visibility (<code>internal</code>).</li>\n  <li><strong>already-minted guard:</strong> <code>require(ownerOf[tokenId] == address(0), \"...\")</code>, the line that makes ids unique and permanent.</li>\n  <li><strong>totalMinted:</strong> a running count the contract already declares; increment it on every successful mint.</li>\n</ul>\n<p class=\"blueprint-line\"><code>require(to != address(0), \"...\");</code><br><code>require(ownerOf[tokenId] == address(0), \"...\");</code><br><code>ownerOf[tokenId] = to; balanceOf[to] += 1; totalMinted += 1;</code><br><code>emit Transfer(address(0), to, tokenId);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// the claim wrapper already in the contract\nfunction claim(uint256 tokenId) external {\n    _mint(msg.sender, tokenId);   // your completed _mint runs here\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Only the text of your answer is checked here, no compile, no execution. In <code>remix.ethereum.org</code>, deploy the finished contract, call <code>claim(1)</code>, read <code>ownerOf(1)</code> and <code>totalMinted</code>, then call <code>claim(1)</code> again from another account and watch the already-minted <code>require</code> revert it. Submit the whole contract, stub filled in.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Keep the given <code>BadgeNFT</code> contract intact and complete the body of <code>function _mint(address to, uint256 tokenId) internal</code>. It must <code>require</code> <code>to != address(0)</code>, <code>require</code> <code>ownerOf[tokenId] == address(0)</code>, then set <code>ownerOf[tokenId] = to</code>, do <code>balanceOf[to] += 1</code>, do <code>totalMinted += 1</code>, and <code>emit Transfer(address(0), to, tokenId)</code>. Submit the complete contract.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">claim(7) from alice</span><code class=\"io-val\">ownerOf[7] == alice, balanceOf[alice] == 1, totalMinted == 1</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">claim(7) from bob afterwards</span><code class=\"io-val\">reverts, id 7 already owned</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract BadgeNFT {",
      "    mapping(uint256 => address) public ownerOf;",
      "    mapping(address => uint256) public balanceOf;",
      "    uint256 public totalMinted;",
      "",
      "    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);",
      "",
      "    function _mint(address to, uint256 tokenId) internal {",
      "        require(to != address(0), \"zero address\");",
      "        require(ownerOf[tokenId] == address(0), \"already minted\");",
      "        ownerOf[tokenId] = to;",
      "        balanceOf[to] += 1;",
      "        totalMinted += 1;",
      "        emit Transfer(address(0), to, tokenId);",
      "    }",
      "",
      "    function claim(uint256 tokenId) external {",
      "        _mint(msg.sender, tokenId);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract BadgeNFT {\n    mapping(uint256 => address) public ownerOf;\n    mapping(address => uint256) public balanceOf;\n    uint256 public totalMinted;\n\n    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);\n\n    function _mint(address to, uint256 tokenId) internal {\n        // TODO: zero-address guard, already-minted guard, then write ownerOf / balanceOf / totalMinted and emit Transfer\n    }\n\n    function claim(uint256 tokenId) external {\n        _mint(msg.sender, tokenId);\n    }\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract BadgeNFT {\n    mapping(uint256 => address) public ownerOf;\n    mapping(address => uint256) public balanceOf;\n    uint256 public totalMinted;\n\n    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);\n\n    function _mint(address to, uint256 tokenId) internal {\n        require(to != address(0), \"zero address\");\n        require(ownerOf[tokenId] == address(0), \"already minted\");\n        ownerOf[tokenId] = to;\n        balanceOf[to] += 1;\n        totalMinted += 1;\n        emit Transfer(address(0), to, tokenId);\n    }\n\n    function claim(uint256 tokenId) external {\n        _mint(msg.sender, tokenId);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+BadgeNFT\\s*\\{",
          "message": "Keep the contract named BadgeNFT."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+_mint\\s*\\(\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+internal",
          "message": "Keep the signature: function _mint(address to, uint256 tokenId) internal"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\s*\\(\\s*to\\s*!=\\s*address\\(0\\)",
          "message": "require(to != address(0) ...);"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\s*\\(\\s*ownerOf\\[\\s*tokenId\\s*\\]\\s*==\\s*address\\(0\\)",
          "message": "require(ownerOf[tokenId] == address(0) ...);"
        },
        {
          "type": "matchesRegex",
          "pattern": "ownerOf\\[\\s*tokenId\\s*\\]\\s*=\\s*to\\s*;",
          "message": "Set ownerOf[tokenId] = to;"
        },
        {
          "type": "matchesRegex",
          "pattern": "balanceOf\\[\\s*to\\s*\\]\\s*\\+=\\s*1\\s*;",
          "message": "Increment balanceOf[to] += 1;"
        },
        {
          "type": "matchesRegex",
          "pattern": "totalMinted\\s*\\+=\\s*1\\s*;",
          "message": "Increment totalMinted += 1;"
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+Transfer\\s*\\(\\s*address\\(0\\)\\s*,\\s*to\\s*,\\s*tokenId\\s*\\)",
          "message": "emit Transfer(address(0), to, tokenId);"
        },
        {
          "type": "codeContains",
          "value": "_mint(msg.sender, tokenId);",
          "message": "Leave claim() calling _mint(msg.sender, tokenId);"
        }
      ]
    },
    "explanation": "<p>The stubbed function is the pattern you will hit constantly reading OpenZeppelin-based code: a thin public wrapper (<code>claim</code>) that does access or payment logic, delegating the actual state change to a guarded internal (<code>_mint</code>). Getting the guard right in the one place means every wrapper that calls it inherits the protection. Next you extend a token with mint and burn as first-class owner operations.</p>"
  },
  {
    "id": 354,
    "title": "A Token with Owner-Gated mint and burn",
    "difficulty": "medium",
    "topic": "Consolidation",
    "level": 8,
    "xp": 15,
    "instructions": "<p>The ERC-20 in challenge 345 minted its whole supply once, in the constructor, and could never change it. Many real tokens need supply to move over time, a game mints rewards, a stablecoin mints against deposits and burns on redemption. This challenge adds both operations as named functions: <code>mint(to, amount)</code>, restricted to the contract owner, and <code>burn(amount)</code>, which any holder may call on their own balance.</p>\n<p>Both are just the constructor-mint idea run again, in the opposite directions. <code>mint</code> raises <code>totalSupply</code> and a balance, logged as <code>Transfer(address(0), to, amount)</code>, created from nowhere. <code>burn</code> lowers the caller's balance and <code>totalSupply</code>, logged as <code>Transfer(msg.sender, address(0), amount)</code>, sent to nowhere. The owner gate reuses the <code>msg.sender</code>-captured-at-deploy pattern from Level 5's account model and a <code>modifier</code> to avoid repeating the check.</p>\n<ul>\n  <li><strong>modifier:</strong> reusable code wrapped around a function body. <code>onlyOwner</code> does the <code>require</code>, then <code>_;</code> marks where the function's own body runs.</li>\n  <li><strong>mint direction:</strong> <code>totalSupply += amount; balanceOf[to] += amount;</code> then <code>emit Transfer(address(0), to, amount);</code></li>\n  <li><strong>burn direction:</strong> <code>require</code> the caller holds it, then <code>balanceOf[msg.sender] -= amount; totalSupply -= amount;</code> then <code>emit Transfer(msg.sender, address(0), amount);</code></li>\n</ul>\n<p class=\"blueprint-line\"><code>modifier onlyOwner() { require(msg.sender == owner, \"...\"); _; }</code><br><code>function mint(address to, uint256 amount) external onlyOwner { ... }</code><br><code>function burn(uint256 amount) external { ... }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>modifier onlyOwner() {\n    require(msg.sender == owner, \"not owner\");\n    _;\n}\n\nfunction burn(uint256 amount) external {\n    require(balanceOf[msg.sender] >= amount, \"insufficient\");\n    balanceOf[msg.sender] -= amount;\n    totalSupply -= amount;\n    emit Transfer(msg.sender, address(0), amount);\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The grader reads text only; it cannot check that a non-owner call actually reverts. Confirm in <code>remix.ethereum.org</code>: deploy, call <code>mint</code> from the deployer (works) and from a second account (reverts), then <code>burn</code> some of your own balance and watch <code>totalSupply</code> fall by the same amount.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract <code>ManagedToken</code>. State: <code>string public name = \"Managed Token\"</code>, <code>string public symbol = \"MGT\"</code>, <code>uint8 public decimals = 18</code>, <code>uint256 public totalSupply</code>, <code>address public owner</code>, <code>mapping(address =&gt; uint256) public balanceOf</code>. Declare <code>event Transfer(address indexed from, address indexed to, uint256 value)</code>. Add a <code>constructor()</code> that sets <code>owner = msg.sender</code>. Add <code>modifier onlyOwner()</code> that <code>require</code>s <code>msg.sender == owner</code> then runs <code>_;</code>. Add <code>function mint(address to, uint256 amount) external onlyOwner</code> that does <code>totalSupply += amount</code>, <code>balanceOf[to] += amount</code>, and <code>emit Transfer(address(0), to, amount)</code>. Add <code>function burn(uint256 amount) external</code> that <code>require</code>s <code>balanceOf[msg.sender] &gt;= amount</code>, then <code>balanceOf[msg.sender] -= amount</code>, <code>totalSupply -= amount</code>, and <code>emit Transfer(msg.sender, address(0), amount)</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">owner calls mint(alice, 500)</span><code class=\"io-val\">balanceOf[alice] 500, totalSupply 500, logs Transfer(0x0, alice, 500)</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">alice calls burn(200)</span><code class=\"io-val\">balanceOf[alice] 300, totalSupply 300, logs Transfer(alice, 0x0, 200)</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">alice calls mint(alice, 1)</span><code class=\"io-val\">reverts, \"not owner\"</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract ManagedToken {",
      "    string public name = \"Managed Token\";",
      "    string public symbol = \"MGT\";",
      "    uint8 public decimals = 18;",
      "    uint256 public totalSupply;",
      "    address public owner;",
      "",
      "    mapping(address => uint256) public balanceOf;",
      "",
      "    event Transfer(address indexed from, address indexed to, uint256 value);",
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
      "    function mint(address to, uint256 amount) external onlyOwner {",
      "        totalSupply += amount;",
      "        balanceOf[to] += amount;",
      "        emit Transfer(address(0), to, amount);",
      "    }",
      "",
      "    function burn(uint256 amount) external {",
      "        require(balanceOf[msg.sender] >= amount, \"insufficient\");",
      "        balanceOf[msg.sender] -= amount;",
      "        totalSupply -= amount;",
      "        emit Transfer(msg.sender, address(0), amount);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract ManagedToken {\n    // metadata + totalSupply + owner + balanceOf + Transfer event\n    // constructor sets owner\n    // onlyOwner modifier\n    // mint(to, amount) onlyOwner ; burn(amount)\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract ManagedToken {\n    string public name = \"Managed Token\";\n    string public symbol = \"MGT\";\n    uint8 public decimals = 18;\n    uint256 public totalSupply;\n    address public owner;\n\n    mapping(address => uint256) public balanceOf;\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n\n    constructor() {\n        owner = msg.sender;\n    }\n\n    modifier onlyOwner() {\n        require(msg.sender == owner, \"not owner\");\n        _;\n    }\n\n    function mint(address to, uint256 amount) external onlyOwner {\n        totalSupply += amount;\n        balanceOf[to] += amount;\n        emit Transfer(address(0), to, amount);\n    }\n\n    function burn(uint256 amount) external {\n        require(balanceOf[msg.sender] >= amount, \"insufficient\");\n        balanceOf[msg.sender] -= amount;\n        totalSupply -= amount;\n        emit Transfer(msg.sender, address(0), amount);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+ManagedToken\\s*\\{",
          "message": "Define a contract named ManagedToken."
        },
        {
          "type": "matchesRegex",
          "pattern": "address\\s+public\\s+owner\\s*;",
          "message": "Add: address public owner;"
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*owner\\s*=\\s*msg\\.sender",
          "message": "Constructor must set owner = msg.sender;"
        },
        {
          "type": "matchesRegex",
          "pattern": "modifier\\s+onlyOwner\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*require\\s*\\(\\s*msg\\.sender\\s*==\\s*owner[\\s\\S]*_;",
          "message": "modifier onlyOwner() { require(msg.sender == owner ...); _; }"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+mint\\s*\\(\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external\\s+onlyOwner",
          "message": "Signature: function mint(address to, uint256 amount) external onlyOwner"
        },
        {
          "type": "matchesRegex",
          "pattern": "totalSupply\\s*\\+=\\s*\\w+[\\s\\S]*balanceOf\\[\\s*to\\s*\\]\\s*\\+=\\s*\\w+",
          "message": "mint must raise totalSupply and balanceOf[to]."
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+Transfer\\s*\\(\\s*address\\(0\\)\\s*,\\s*to\\s*,\\s*\\w+\\s*\\)",
          "message": "mint must emit Transfer(address(0), to, amount);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+burn\\s*\\(\\s*uint256\\s+\\w+\\s*\\)\\s+external",
          "message": "Signature: function burn(uint256 amount) external"
        },
        {
          "type": "matchesRegex",
          "pattern": "balanceOf\\[\\s*msg\\.sender\\s*\\]\\s*-=\\s*\\w+[\\s\\S]*totalSupply\\s*-=\\s*\\w+",
          "message": "burn must lower balanceOf[msg.sender] and totalSupply."
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+Transfer\\s*\\(\\s*msg\\.sender\\s*,\\s*address\\(0\\)\\s*,\\s*\\w+\\s*\\)",
          "message": "burn must emit Transfer(msg.sender, address(0), amount);"
        }
      ]
    },
    "explanation": "<p>Minting and burning are symmetric: one is <code>Transfer</code> out of <code>address(0)</code>, the other is <code>Transfer</code> into it, and <code>totalSupply</code> is kept honest on both sides so an off-chain indexer watching only the logs still gets the right circulating number. The <code>onlyOwner</code> gate is the entire access-control story here, a single point of privilege, which is also a single point of failure. Hardening that (multisig owners, timelocks, renouncing ownership) is the subject of the security level.</p>"
  },
  {
    "id": 355,
    "title": "Payable Functions and the Contract Balance",
    "difficulty": "easy",
    "topic": "Ether Handling",
    "level": 8,
    "xp": 10,
    "instructions": "<p>Level 5's blockchain kept every account balance in a plain Python dictionary that your own code updated by hand. On a real chain a contract is itself an account, and the network (not a variable you maintain) tracks the ether it holds. A function can only accept ether if you mark it <code>payable</code>; the difference is a shop till with a coin slot versus a sealed display case. Two special values give you visibility: <code>msg.value</code> is how much ether (in wei) arrived with the current call, and <code>address(this).balance</code> is the contract's running total.</p>\n<ul>\n  <li><strong>payable (function):</strong> a function allowed to receive ether. Send ether to a non-<code>payable</code> function and the whole transaction reverts.</li>\n  <li><strong>address payable:</strong> an address you are permitted to send ether to. A plain <code>address</code> must be wrapped with <code>payable(...)</code> first.</li>\n  <li><strong>msg.value:</strong> the wei sent with the current call. Zero unless the caller attached ether and the function is <code>payable</code>.</li>\n  <li><strong>address(this):</strong> the contract's own address. <code>.balance</code> on it reads the wei the contract currently holds.</li>\n  <li><strong>wei:</strong> the smallest unit of ether. 1 ether = 10<sup>18</sup> wei, and every on-chain amount is counted in wei.</li>\n</ul>\n<p class=\"blueprint-line\"><code>function name() external payable { ... }</code><br><code>address payable owner = payable(msg.sender);</code><br><code>uint256 held = address(this).balance;</code><br><code>uint256 sent = msg.value;</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>contract Jar {\n    function fill() external payable {}          // must be payable to accept ether\n    function total() external view returns (uint256) {\n        return address(this).balance;            // wei the contract holds\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The PyDrop editor only reads your code as text, it has no EVM and cannot actually move ether or show a balance change. Paste this into <code>remix.ethereum.org</code>, deploy to the JavaScript VM, put a number in the \"Value\" field before calling <code>deposit</code>, and watch the deployed contract's balance climb.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>PiggyBank</code>. Give it an <code>address payable public owner</code>, set in the <code>constructor</code> to <code>payable(msg.sender)</code>. Add an <code>external payable</code> function <code>deposit()</code> with an empty body. Add an <code>external view</code> function <code>getBalance()</code> that returns <code>address(this).balance</code>. Add an <code>external payable</code> function <code>echoValue()</code> that returns <code>msg.value</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">deposit() with 1 ether</span><code class=\"io-val\">contract balance becomes 1000000000000000000 wei</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">getBalance()</span><code class=\"io-val\">1000000000000000000</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">echoValue() with 5 wei</span><code class=\"io-val\">5</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract PiggyBank {",
      "    address payable public owner;",
      "",
      "    constructor() {",
      "        owner = payable(msg.sender);",
      "    }",
      "",
      "    function deposit() external payable {}",
      "",
      "    function getBalance() external view returns (uint256) {",
      "        return address(this).balance;",
      "    }",
      "",
      "    function echoValue() external payable returns (uint256) {",
      "        return msg.value;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Declare PiggyBank: payable owner, deposit(), getBalance(), echoValue()\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract PiggyBank {\n    address payable public owner;\n\n    constructor() {\n        owner = payable(msg.sender);\n    }\n\n    function deposit() external payable {}\n\n    function getBalance() external view returns (uint256) {\n        return address(this).balance;\n    }\n\n    function echoValue() external payable returns (uint256) {\n        return msg.value;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Start with pragma solidity ^0.8.20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+PiggyBank\\s*\\{",
          "message": "Define a contract named PiggyBank."
        },
        {
          "type": "matchesRegex",
          "pattern": "address\\s+payable\\s+public\\s+owner\\s*;",
          "message": "Declare: address payable public owner;"
        },
        {
          "type": "matchesRegex",
          "pattern": "owner\\s*=\\s*payable\\(\\s*msg\\.sender\\s*\\)\\s*;",
          "message": "In the constructor set owner = payable(msg.sender);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+deposit\\s*\\(\\s*\\)\\s+external\\s+payable",
          "message": "deposit() must be external payable."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+getBalance\\s*\\(\\s*\\)\\s+external\\s+view\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "getBalance() must be external view returns (uint256)."
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+address\\(\\s*this\\s*\\)\\.balance\\s*;",
          "message": "getBalance() should return address(this).balance;"
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+msg\\.value\\s*;",
          "message": "echoValue() should return msg.value;"
        }
      ]
    },
    "explanation": "<p><code>address(this).balance</code> always reflects reality because the network increments it the instant ether lands, you never write <code>balance += msg.value</code> yourself. Forgetting <code>payable</code> on a function meant to take deposits just makes the call revert, one of the most common early mistakes. Sending ether back out is trickier, and it is next.</p>"
  },
  {
    "id": 356,
    "title": "receive() versus fallback()",
    "difficulty": "medium",
    "topic": "Ether Handling",
    "level": 8,
    "xp": 15,
    "instructions": "<p>When a plain ether transfer reaches a contract there is no function name in the call (the calldata is empty) so the EVM looks for a special unnamed handler. Level 6's node challenges had messages arriving that matched no known handler; a contract faces the same question on every incoming call. Solidity gives two catch-alls. <code>receive()</code> runs when the calldata is empty (a bare send). <code>fallback()</code> runs when the calldata names a function the contract does not have, or for a bare send when there is no <code>receive()</code> defined at all. Think of a hotel: <code>receive()</code> is the bellhop for guests who just walk in, <code>fallback()</code> is the clerk who deals with everyone asking for a department that does not exist.</p>\n<ul>\n  <li><strong>calldata:</strong> the encoded bytes sent with a call. A normal call starts with a 4-byte selector; a bare ether transfer sends zero bytes.</li>\n  <li><strong>selector:</strong> the first 4 bytes of calldata, derived from the function signature, telling the EVM which function to run.</li>\n  <li><strong>receive() external payable:</strong> invoked on empty calldata. At most one per contract; no <code>function</code> keyword, no arguments, no return.</li>\n  <li><strong>fallback() external payable:</strong> invoked when no other function matches the selector, or on empty calldata when there is no <code>receive()</code>. May be <code>payable</code> or not.</li>\n</ul>\n<p class=\"blueprint-line\"><code>receive() external payable { ... }</code><br><code>fallback() external payable { ... }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>contract Doorbell {\n    event Rang(string which);\n    receive() external payable { emit Rang(\"receive\"); }   // bare send, empty calldata\n    fallback() external payable { emit Rang(\"fallback\"); }  // unknown selector\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This editor matches text only; it has no way to route a call to either function. In <code>remix.ethereum.org</code>, deploy the contract and use the \"Low level interactions\" box to send with empty calldata (hits <code>receive</code>) versus some junk bytes (hits <code>fallback</code>), reading <code>lastCalled</code> after each.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract <code>Inbox</code> with a <code>string public lastCalled</code>. Add <code>receive() external payable</code> that sets <code>lastCalled = \"receive\"</code>. Add <code>fallback() external payable</code> that sets <code>lastCalled = \"fallback\"</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">send 1 wei, empty calldata</span><code class=\"io-val\">lastCalled == \"receive\"</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">call an unknown selector</span><code class=\"io-val\">lastCalled == \"fallback\"</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">remove receive(), send empty calldata</span><code class=\"io-val\">fallback() runs instead</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Inbox {",
      "    string public lastCalled;",
      "",
      "    receive() external payable {",
      "        lastCalled = \"receive\";",
      "    }",
      "",
      "    fallback() external payable {",
      "        lastCalled = \"fallback\";",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Inbox: a string plus receive() and fallback()\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Inbox {\n    string public lastCalled;\n\n    receive() external payable {\n        lastCalled = \"receive\";\n    }\n\n    fallback() external payable {\n        lastCalled = \"fallback\";\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Start with pragma solidity ^0.8.20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Inbox\\s*\\{",
          "message": "Define a contract named Inbox."
        },
        {
          "type": "matchesRegex",
          "pattern": "string\\s+public\\s+lastCalled\\s*;",
          "message": "Declare: string public lastCalled;"
        },
        {
          "type": "matchesRegex",
          "pattern": "receive\\s*\\(\\s*\\)\\s+external\\s+payable",
          "message": "Add receive() external payable."
        },
        {
          "type": "matchesRegex",
          "pattern": "fallback\\s*\\(\\s*\\)\\s+external\\s+payable",
          "message": "Add fallback() external payable."
        },
        {
          "type": "codeContains",
          "value": "lastCalled = \"receive\"",
          "message": "receive() should set lastCalled = \"receive\";"
        },
        {
          "type": "codeContains",
          "value": "lastCalled = \"fallback\"",
          "message": "fallback() should set lastCalled = \"fallback\";"
        }
      ]
    },
    "explanation": "<p>The split matters because a contract with neither function rejects every plain transfer, exchanges have locked themselves out of funds this way. Keeping <code>receive()</code> tiny is deliberate: when it is triggered by <code>.transfer</code> or <code>.send</code> it runs on a 2300-gas budget, which is exactly what the next challenge is about.</p>"
  },
  {
    "id": 357,
    "title": "Sending Ether: transfer, send, and call",
    "difficulty": "medium",
    "topic": "Ether Handling",
    "level": 8,
    "xp": 15,
    "instructions": "<p>Level 6's node challenges kept pointing out that the party on the other end of a message may not cooperate; sending ether is the sharpest version of that, and the mechanism you pick matters. <code>.transfer</code> and <code>.send</code> both forward only 2300 gas (barely enough for the recipient to record an event) and were designed as a reentrancy safeguard. <code>.transfer</code> reverts your whole call if the send fails; <code>.send</code> just returns <code>false</code> and lets execution continue, which is easy to forget to check. The current recommendation is <code>addr.call{value: n}(\"\")</code>: it forwards all remaining gas and returns <code>(bool success, bytes memory data)</code>. Because it forwards gas you must add your own reentrancy protection (the security level covers that) but the fixed 2300-gas approach broke every time gas costs changed, so <code>call</code> + <code>require(ok)</code> won.</p>\n<ul>\n  <li><strong>.transfer(amount):</strong> sends wei, forwards 2300 gas, reverts on any failure. Recipient must be <code>address payable</code>.</li>\n  <li><strong>.send(amount):</strong> sends wei, forwards 2300 gas, returns a <code>bool</code> instead of reverting. You must check the result yourself.</li>\n  <li><strong>.call{value: n}(\"\"):</strong> a low-level call with ether attached and empty calldata. Forwards all gas, returns <code>(bool ok, bytes memory)</code>. The <code>(\"\")</code> is the empty calldata argument.</li>\n  <li><strong>gas stipend:</strong> the fixed 2300 gas <code>.transfer</code> and <code>.send</code> hand the recipient, enough to accept ether, not enough to do real work.</li>\n</ul>\n<p class=\"blueprint-line\"><code>to.transfer(amount);</code><br><code>bool ok = to.send(amount);</code><br><code>(bool ok) = to.call{value: amount}(\"\");</code><br><code>require(ok, \"failed\");</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function pay(address payable to) external payable {\n    // preferred today:\n    (bool ok) = to.call{value: msg.value}(\"\");\n    require(ok, \"send failed\");\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The grader here just scans your text. To see the real behaviour, open <code>remix.ethereum.org</code>, deploy <code>Payouts</code> plus a second contract whose only function is a non-payable <code>fallback</code>, and watch <code>payWithTransfer</code> revert while <code>payWithSend</code> returns <code>false</code> against that target.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract <code>Payouts</code> with three <code>external payable</code> functions, each taking <code>address payable to</code>. <code>payWithTransfer</code> calls <code>to.transfer(msg.value)</code>. <code>payWithSend</code> puts <code>to.send(msg.value)</code> into a <code>bool ok</code> and returns it (declare <code>returns (bool)</code>). <code>payWithCall</code> does <code>(bool ok) = to.call{value: msg.value}(\"\")</code> then <code>require(ok, \"call failed\")</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">payWithCall to a plain wallet</span><code class=\"io-val\">succeeds, ether forwarded</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">payWithTransfer to a reverting contract</span><code class=\"io-val\">whole call reverts</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">payWithSend to the same contract</span><code class=\"io-val\">returns false, no revert</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Payouts {",
      "    function payWithTransfer(address payable to) external payable {",
      "        to.transfer(msg.value);",
      "    }",
      "",
      "    function payWithSend(address payable to) external payable returns (bool) {",
      "        bool ok = to.send(msg.value);",
      "        return ok;",
      "    }",
      "",
      "    function payWithCall(address payable to) external payable {",
      "        (bool ok, ) = to.call{value: msg.value}(\"\");",
      "        require(ok, \"call failed\");",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Payouts: contrast transfer, send, and call\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Payouts {\n    function payWithTransfer(address payable to) external payable {\n        to.transfer(msg.value);\n    }\n\n    function payWithSend(address payable to) external payable returns (bool) {\n        bool ok = to.send(msg.value);\n        return ok;\n    }\n\n    function payWithCall(address payable to) external payable {\n        (bool ok, ) = to.call{value: msg.value}(\"\");\n        require(ok, \"call failed\");\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Start with pragma solidity ^0.8.20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Payouts\\s*\\{",
          "message": "Define a contract named Payouts."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+payWithTransfer\\s*\\(\\s*address\\s+payable\\s+to\\s*\\)\\s+external\\s+payable",
          "message": "payWithTransfer(address payable to) must be external payable."
        },
        {
          "type": "matchesRegex",
          "pattern": "to\\.transfer\\(\\s*msg\\.value\\s*\\)",
          "message": "Call to.transfer(msg.value);"
        },
        {
          "type": "matchesRegex",
          "pattern": "to\\.send\\(\\s*msg\\.value\\s*\\)",
          "message": "Call to.send(msg.value) and keep the returned bool."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+payWithSend\\s*\\(\\s*address\\s+payable\\s+to\\s*\\)\\s+external\\s+payable\\s+returns\\s*\\(\\s*bool\\s*\\)",
          "message": "payWithSend must be external payable returns (bool)."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\(\\s*bool\\s+ok\\s*,\\s*\\)\\s*=\\s*to\\.call\\{\\s*value\\s*:\\s*msg\\.value\\s*\\}\\(\\s*\"\"\\s*\\)",
          "message": "Use (bool ok) = to.call{value: msg.value}(\"\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*ok",
          "message": "After call, require(ok, \"call failed\");"
        }
      ]
    },
    "explanation": "<p>Use <code>call</code> + <code>require(ok)</code> for new code, and assume the recipient can run arbitrary logic during the send. <code>.transfer</code> still shows up in older contracts and tutorials so you need to recognise it, but a gas-price change already broke it once and can again.</p>"
  },
  {
    "id": 358,
    "title": "A Deposit / Withdraw Ledger",
    "difficulty": "medium",
    "topic": "Ether Handling",
    "level": 8,
    "xp": 15,
    "instructions": "<p>Level 5's ledger stored balances in a dictionary and let any code change any entry. A contract that custodies ether needs the same map, but with a rule: you can only move your own balance. The standard shape is a <code>mapping(address =&gt; uint256)</code> credited inside a <code>payable</code> <code>deposit</code>, plus a <code>withdraw</code> that checks the caller's recorded balance, lowers it, and only then sends. That is a <strong>pull payment</strong>: the contract never pushes ether down a list of people, it waits for each of them to come and take their own. It is the backbone of escrows, auctions, and payment splitters. This version is deliberately naive, you will harden this deposit/withdraw pattern against reentrancy in the security level.</p>\n<ul>\n  <li><strong>pull payment:</strong> recipients withdraw what they are owed themselves, instead of the contract looping over payees and sending. A failed send is isolated to one account.</li>\n  <li><strong>mapping(address =&gt; uint256):</strong> a key-value store from address to number, every key defaulting to 0. The contract's internal ledger.</li>\n  <li><strong>checks-effects-interactions:</strong> run your <code>require</code> checks, then update your own state, then make external calls, in that order.</li>\n</ul>\n<p class=\"blueprint-line\"><code>mapping(address =&gt; uint256) public balances;</code><br><code>balances[msg.sender] += msg.value;</code><br><code>balances[msg.sender] -= amount;</code><br><code>(bool ok) = msg.sender.call{value: amount}(\"\");</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function withdraw(uint256 amount) external {\n    require(balances[msg.sender] >= amount, \"insufficient\");\n    balances[msg.sender] -= amount;                 // effect before interaction\n    (bool ok) = msg.sender.call{value: amount}(\"\");\n    require(ok, \"send failed\");\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Only the text of your answer is checked here. In <code>remix.ethereum.org</code>, deposit from two different accounts, then confirm account A cannot withdraw more than it put in and cannot touch account B's balance.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract <code>Bank</code> with <code>mapping(address =&gt; uint256) public balances</code>. Add an <code>external payable</code> <code>deposit()</code> that does <code>balances[msg.sender] += msg.value</code>. Add <code>withdraw(uint256 amount) external</code> that <code>require</code>s <code>balances[msg.sender] &gt;= amount</code>, then does <code>balances[msg.sender] -= amount</code>, then <code>(bool ok) = msg.sender.call{value: amount}(\"\")</code>, then <code>require(ok, \"send failed\")</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">deposit 3 ether</span><code class=\"io-val\">balances[you] == 3 ether</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">withdraw(1 ether)</span><code class=\"io-val\">balances[you] == 2 ether, 1 ether sent</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">withdraw(10 ether)</span><code class=\"io-val\">reverts \"insufficient\"</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Bank {",
      "    mapping(address => uint256) public balances;",
      "",
      "    function deposit() external payable {",
      "        balances[msg.sender] += msg.value;",
      "    }",
      "",
      "    function withdraw(uint256 amount) external {",
      "        require(balances[msg.sender] >= amount, \"insufficient\");",
      "        balances[msg.sender] -= amount;",
      "        (bool ok, ) = msg.sender.call{value: amount}(\"\");",
      "        require(ok, \"send failed\");",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Bank: balances mapping, payable deposit(), withdraw(uint256)\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Bank {\n    mapping(address => uint256) public balances;\n\n    function deposit() external payable {\n        balances[msg.sender] += msg.value;\n    }\n\n    function withdraw(uint256 amount) external {\n        require(balances[msg.sender] >= amount, \"insufficient\");\n        balances[msg.sender] -= amount;\n        (bool ok, ) = msg.sender.call{value: amount}(\"\");\n        require(ok, \"send failed\");\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Start with pragma solidity ^0.8.20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Bank\\s*\\{",
          "message": "Define a contract named Bank."
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*public\\s+balances",
          "message": "Declare: mapping(address => uint256) public balances;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+deposit\\s*\\(\\s*\\)\\s+external\\s+payable",
          "message": "deposit() must be external payable."
        },
        {
          "type": "matchesRegex",
          "pattern": "balances\\[msg\\.sender\\]\\s*\\+=\\s*msg\\.value",
          "message": "deposit() should do balances[msg.sender] += msg.value;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+withdraw\\s*\\(\\s*uint256\\s+amount\\s*\\)\\s+external",
          "message": "Add withdraw(uint256 amount) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*balances\\[msg\\.sender\\]\\s*>=\\s*amount",
          "message": "withdraw() must require(balances[msg.sender] >= amount ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "balances\\[msg\\.sender\\]\\s*-=\\s*amount[\\s\\S]*msg\\.sender\\.call\\{\\s*value\\s*:\\s*amount",
          "message": "Deduct the balance BEFORE the call (checks-effects-interactions)."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*ok",
          "message": "Check the send with require(ok, \"send failed\");"
        }
      ]
    },
    "explanation": "<p>Updating <code>balances[msg.sender]</code> before the call is checks-effects-interactions in miniature, and it is most of what keeps this safe. It is still called naive because a purpose-built attacker contract can abuse the external call in ways a lock would stop, the exact fix you will add in the security level.</p>"
  },
  {
    "id": 359,
    "title": "keccak256 and abi.encode versus abi.encodePacked",
    "difficulty": "medium",
    "topic": "On-Chain Cryptography",
    "level": 8,
    "xp": 15,
    "instructions": "<p>Level 5 leaned on hash functions to fingerprint data; Solidity's built-in is <code>keccak256</code>, which takes a <code>bytes</code> blob and returns a <code>bytes32</code>. The interesting part is building that blob. <code>abi.encode</code> pads every argument to a 32-byte slot and is never ambiguous. <code>abi.encodePacked</code> concatenates arguments with no padding, giving a shorter blob, but if you pack two variable-length values (two <code>string</code>s, two <code>bytes</code>, arrays), different inputs can produce identical bytes: <code>encodePacked(\"a\", \"bc\")</code> and <code>encodePacked(\"ab\", \"c\")</code> come out the same. That is a <strong>hash collision</strong> vector. Rule of thumb: <code>encodePacked</code> is fine with a fixed layout or at most one dynamic argument; otherwise reach for <code>encode</code>.</p>\n<ul>\n  <li><strong>keccak256(bytes):</strong> the EVM's hash function, returning <code>bytes32</code>. Same family as SHA-3, not byte-identical to it.</li>\n  <li><strong>abi.encode(...):</strong> ABI-encodes the arguments, each padded to 32 bytes. Longer output, unambiguous.</li>\n  <li><strong>abi.encodePacked(...):</strong> concatenates the arguments with no padding. Compact, but ambiguous across multiple dynamic-length arguments.</li>\n  <li><strong>dynamic type:</strong> a value whose byte length is not fixed, <code>string</code>, <code>bytes</code>, <code>T[]</code>. <code>address</code> and <code>uint256</code> are fixed (20 and 32 bytes).</li>\n</ul>\n<p class=\"blueprint-line\"><code>keccak256(abi.encodePacked(a, b))</code><br><code>keccak256(abi.encode(a, b))</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// fixed-width args -> packing is safe:\nkeccak256(abi.encodePacked(userAddress, amount));\n// two strings -> use encode, or a collision is possible:\nkeccak256(abi.encode(first, second));</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>PyDrop matches your answer as text and has no compiler behind it. In <code>remix.ethereum.org</code>, call <code>unsafeHash(\"a\", \"bc\")</code> and <code>unsafeHash(\"ab\", \"c\")</code> and watch them return the same <code>bytes32</code>; then try <code>safeHash</code> with the same pairs and watch the two digests diverge.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract <code>Hasher</code> with three <code>external pure</code> functions that return <code>bytes32</code>. <code>packedHash(address user, uint256 amount)</code> returns <code>keccak256(abi.encodePacked(user, amount))</code> (fixed-width args, safe to pack). <code>safeHash(string memory a, string memory b)</code> returns <code>keccak256(abi.encode(a, b))</code>. <code>unsafeHash(string memory a, string memory b)</code> returns <code>keccak256(abi.encodePacked(a, b))</code>, the collision-prone form.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">safeHash(\"a\",\"bc\") vs safeHash(\"ab\",\"c\")</span><code class=\"io-val\">two different digests</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">unsafeHash(\"a\",\"bc\") vs unsafeHash(\"ab\",\"c\")</span><code class=\"io-val\">the same digest (collision)</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Hasher {",
      "    function packedHash(address user, uint256 amount) external pure returns (bytes32) {",
      "        return keccak256(abi.encodePacked(user, amount));",
      "    }",
      "",
      "    function safeHash(string memory a, string memory b) external pure returns (bytes32) {",
      "        return keccak256(abi.encode(a, b));",
      "    }",
      "",
      "    function unsafeHash(string memory a, string memory b) external pure returns (bytes32) {",
      "        return keccak256(abi.encodePacked(a, b));",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Hasher: packedHash, safeHash, unsafeHash\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Hasher {\n    function packedHash(address user, uint256 amount) external pure returns (bytes32) {\n        return keccak256(abi.encodePacked(user, amount));\n    }\n\n    function safeHash(string memory a, string memory b) external pure returns (bytes32) {\n        return keccak256(abi.encode(a, b));\n    }\n\n    function unsafeHash(string memory a, string memory b) external pure returns (bytes32) {\n        return keccak256(abi.encodePacked(a, b));\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Start with pragma solidity ^0.8.20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Hasher\\s*\\{",
          "message": "Define a contract named Hasher."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+packedHash\\s*\\(\\s*address\\s+user\\s*,\\s*uint256\\s+amount\\s*\\)\\s+external\\s+pure\\s+returns\\s*\\(\\s*bytes32\\s*\\)",
          "message": "packedHash(address user, uint256 amount) external pure returns (bytes32)."
        },
        {
          "type": "matchesRegex",
          "pattern": "keccak256\\(\\s*abi\\.encodePacked\\(\\s*user\\s*,\\s*amount\\s*\\)\\s*\\)",
          "message": "packedHash returns keccak256(abi.encodePacked(user, amount))."
        },
        {
          "type": "matchesRegex",
          "pattern": "keccak256\\(\\s*abi\\.encode\\(\\s*a\\s*,\\s*b\\s*\\)\\s*\\)",
          "message": "safeHash returns keccak256(abi.encode(a, b))."
        },
        {
          "type": "matchesRegex",
          "pattern": "keccak256\\(\\s*abi\\.encodePacked\\(\\s*a\\s*,\\s*b\\s*\\)\\s*\\)",
          "message": "unsafeHash returns keccak256(abi.encodePacked(a, b))."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+unsafeHash\\s*\\(",
          "message": "Add the unsafeHash function."
        }
      ]
    },
    "explanation": "<p><code>encode</code> versus <code>encodePacked</code> looks like a micro-optimization until a signature scheme built on <code>encodePacked(userInput, userInput)</code> lets an attacker slide the boundary and forge a preimage. The next challenges build signed messages with exactly these tools, and a sloppy encoding there is a real exploit class.</p>"
  },
  {
    "id": 360,
    "title": "ecrecover: Recovering a Signer",
    "difficulty": "hard",
    "topic": "On-Chain Cryptography",
    "level": 8,
    "xp": 25,
    "instructions": "<p>Level 6's \"Real Digital Signatures\" challenge had <code>verify_key.verify()</code> raise an exception when a signature did not match. The EVM's version, <code>ecrecover</code>, works the other way round: give it the signed hash and the three signature components <code>v</code>, <code>r</code>, <code>s</code>, and it returns the address whose private key produced that signature. You then compare that address against whoever you expected. It is a wax-seal check where, instead of pressing the seal against a known stamp, you reconstruct whose stamp it must have been.</p>\n<p>The failure mode you must handle: on a malformed signature <code>ecrecover</code> does not revert, it returns <code>address(0)</code>. If your expected signer were ever <code>address(0)</code>, every broken signature would pass the equality check, so reject <code>address(0)</code> explicitly before comparing.</p>\n<ul>\n  <li><strong>ecrecover(hash, v, r, s):</strong> an EVM precompile. Returns the address that signed <code>hash</code>, or <code>address(0)</code> when the inputs do not recover a valid key.</li>\n  <li><strong>v, r, s:</strong> the three pieces of an Ethereum signature. <code>r</code> and <code>s</code> are <code>bytes32</code>; <code>v</code> is a <code>uint8</code> recovery id, usually 27 or 28.</li>\n  <li><strong>signer:</strong> the address you require the signature to come from, normally stored at deployment.</li>\n  <li><strong>address(0):</strong> the zero address, <code>ecrecover</code>'s \"invalid\" sentinel, and never an account anyone controls.</li>\n</ul>\n<p class=\"blueprint-line\"><code>address rec = ecrecover(hash, v, r, s);</code><br><code>require(rec != address(0), \"invalid\");</code><br><code>return rec == signer;</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function check(bytes32 h, uint8 v, bytes32 r, bytes32 s) external view returns (bool) {\n    address rec = ecrecover(h, v, r, s);\n    require(rec != address(0), \"invalid signature\");\n    return rec == signer;\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor cannot recover anything, it only reads your text. In <code>remix.ethereum.org</code>, sign a hash in the browser console with a test key (ethers <code>wallet.signMessage</code> or <code>web3.eth.sign</code>), split the signature into <code>v</code>/<code>r</code>/<code>s</code>, and confirm <code>isValid</code> returns <code>true</code> for the real signer and <code>false</code> once you flip a byte of <code>r</code>.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract <code>SigCheck</code> with an <code>address public signer</code>, set from a <code>constructor(address _signer)</code>. Add <code>isValid(bytes32 hash, uint8 v, bytes32 r, bytes32 s) external view returns (bool)</code>: put <code>ecrecover(hash, v, r, s)</code> into <code>address recovered</code>, then <code>require(recovered != address(0), \"invalid signature\")</code>, then <code>return recovered == signer</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">isValid(hash, v, r, s) from signer</span><code class=\"io-val\">true</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">isValid with one byte of r changed</span><code class=\"io-val\">false, or reverts on address(0)</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract SigCheck {",
      "    address public signer;",
      "",
      "    constructor(address _signer) {",
      "        signer = _signer;",
      "    }",
      "",
      "    function isValid(bytes32 hash, uint8 v, bytes32 r, bytes32 s) external view returns (bool) {",
      "        address recovered = ecrecover(hash, v, r, s);",
      "        require(recovered != address(0), \"invalid signature\");",
      "        return recovered == signer;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// SigCheck: store a signer, verify with ecrecover, reject address(0)\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract SigCheck {\n    address public signer;\n\n    constructor(address _signer) {\n        signer = _signer;\n    }\n\n    function isValid(bytes32 hash, uint8 v, bytes32 r, bytes32 s) external view returns (bool) {\n        address recovered = ecrecover(hash, v, r, s);\n        require(recovered != address(0), \"invalid signature\");\n        return recovered == signer;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Start with pragma solidity ^0.8.20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+SigCheck\\s*\\{",
          "message": "Define a contract named SigCheck."
        },
        {
          "type": "matchesRegex",
          "pattern": "address\\s+public\\s+signer\\s*;",
          "message": "Declare: address public signer;"
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*address\\s+_signer\\s*\\)",
          "message": "Add constructor(address _signer) that sets signer."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+isValid\\s*\\(\\s*bytes32\\s+hash\\s*,\\s*uint8\\s+v\\s*,\\s*bytes32\\s+r\\s*,\\s*bytes32\\s+s\\s*\\)\\s+external\\s+view\\s+returns\\s*\\(\\s*bool\\s*\\)",
          "message": "isValid(bytes32 hash, uint8 v, bytes32 r, bytes32 s) external view returns (bool)."
        },
        {
          "type": "matchesRegex",
          "pattern": "ecrecover\\(\\s*hash\\s*,\\s*v\\s*,\\s*r\\s*,\\s*s\\s*\\)",
          "message": "Recover with ecrecover(hash, v, r, s)."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*recovered\\s*!=\\s*address\\(\\s*0\\s*\\)",
          "message": "require(recovered != address(0) ...) before comparing."
        },
        {
          "type": "matchesRegex",
          "pattern": "recovered\\s*==\\s*signer",
          "message": "Return recovered == signer."
        }
      ]
    },
    "explanation": "<p><code>ecrecover</code> is how nearly every \"sign off-chain, act on-chain\" system begins: gasless approvals, meta-transactions, allowlists. The <code>address(0)</code> guard is not optional, it is the difference between a check and a check that can be bypassed. Next you attach this to an action and stop the signature being replayed.</p>"
  },
  {
    "id": 361,
    "title": "A Signature-Gated Claim",
    "difficulty": "hard",
    "topic": "On-Chain Cryptography",
    "level": 8,
    "xp": 25,
    "instructions": "<p>A signature proves who authorized something; on its own it does nothing to stop that authorization being used twice. Level 5's transaction work raised replay directly, a valid signed message, resubmitted, is still valid. Here an off-chain <code>signer</code> signs <code>keccak256(abi.encodePacked(user, amount))</code>, the contract recovers it, checks it matches, and only then proceeds. To make each authorization single-use, hash the message into a key and record it in a <code>used</code> mapping; a repeat submission trips <code>require(!used[...])</code> and reverts. It is a coat-check ticket: the stub gets you your coat once, and the attendant keeps it.</p>\n<ul>\n  <li><strong>digest:</strong> the <code>bytes32</code> hash of the authorized data (<code>user</code>, <code>amount</code>), both the thing that was signed and a natural key for tracking use.</li>\n  <li><strong>used mapping:</strong> <code>mapping(bytes32 =&gt; bool)</code> recording which digests have already been consumed. Defaults to <code>false</code>.</li>\n  <li><strong>replay attack:</strong> re-submitting a previously valid signed message to trigger its effect again.</li>\n  <li><strong>nonce (alternative):</strong> a per-user counter folded into the digest so each signature is unique even for identical <code>user</code>/<code>amount</code>.</li>\n</ul>\n<p class=\"blueprint-line\"><code>bytes32 digest = keccak256(abi.encodePacked(user, amount));</code><br><code>require(!used[digest], \"used\");</code><br><code>require(ecrecover(digest, v, r, s) == signer, \"bad sig\");</code><br><code>used[digest] = true;</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function claim(address user, uint256 amount, uint8 v, bytes32 r, bytes32 s) external {\n    bytes32 digest = keccak256(abi.encodePacked(user, amount));\n    require(!used[digest], \"already claimed\");\n    require(ecrecover(digest, v, r, s) == signer, \"bad signature\");\n    used[digest] = true;\n    // payout logic would follow\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Text is all the grader sees. In <code>remix.ethereum.org</code>, sign <code>(user, amount)</code> off-chain, call <code>claim</code> once and watch it pass, then call it again with the identical arguments and signature and watch it revert on <code>already claimed</code>.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract <code>Claimable</code> with an <code>address public signer</code> (from <code>constructor(address _signer)</code>) and <code>mapping(bytes32 =&gt; bool) public used</code>. Add <code>claim(address user, uint256 amount, uint8 v, bytes32 r, bytes32 s) external</code>: build <code>bytes32 digest = keccak256(abi.encodePacked(user, amount))</code>, <code>require(!used[digest], \"already claimed\")</code>, <code>require(ecrecover(digest, v, r, s) == signer, \"bad signature\")</code>, then set <code>used[digest] = true</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">claim(user, amount, v, r, s) once</span><code class=\"io-val\">passes, used[digest] = true</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">same call again</span><code class=\"io-val\">reverts \"already claimed\"</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">signature from a different key</span><code class=\"io-val\">reverts \"bad signature\"</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Claimable {",
      "    address public signer;",
      "    mapping(bytes32 => bool) public used;",
      "",
      "    constructor(address _signer) {",
      "        signer = _signer;",
      "    }",
      "",
      "    function claim(address user, uint256 amount, uint8 v, bytes32 r, bytes32 s) external {",
      "        bytes32 digest = keccak256(abi.encodePacked(user, amount));",
      "        require(!used[digest], \"already claimed\");",
      "        require(ecrecover(digest, v, r, s) == signer, \"bad signature\");",
      "        used[digest] = true;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Claimable: signer, used mapping, claim() guarded by signature + reuse check\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Claimable {\n    address public signer;\n    mapping(bytes32 => bool) public used;\n\n    constructor(address _signer) {\n        signer = _signer;\n    }\n\n    function claim(address user, uint256 amount, uint8 v, bytes32 r, bytes32 s) external {\n        bytes32 digest = keccak256(abi.encodePacked(user, amount));\n        require(!used[digest], \"already claimed\");\n        require(ecrecover(digest, v, r, s) == signer, \"bad signature\");\n        used[digest] = true;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Start with pragma solidity ^0.8.20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Claimable\\s*\\{",
          "message": "Define a contract named Claimable."
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*bytes32\\s*=>\\s*bool\\s*\\)\\s*public\\s+used",
          "message": "Declare: mapping(bytes32 => bool) public used;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+claim\\s*\\(\\s*address\\s+user\\s*,\\s*uint256\\s+amount\\s*,\\s*uint8\\s+v\\s*,\\s*bytes32\\s+r\\s*,\\s*bytes32\\s+s\\s*\\)\\s+external",
          "message": "claim(address user, uint256 amount, uint8 v, bytes32 r, bytes32 s) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "bytes32\\s+digest\\s*=\\s*keccak256\\(\\s*abi\\.encodePacked\\(\\s*user\\s*,\\s*amount\\s*\\)\\s*\\)",
          "message": "Build bytes32 digest = keccak256(abi.encodePacked(user, amount));"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*!\\s*used\\[\\s*digest\\s*\\]",
          "message": "require(!used[digest], \"already claimed\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "ecrecover\\(\\s*digest\\s*,\\s*v\\s*,\\s*r\\s*,\\s*s\\s*\\)\\s*==\\s*signer",
          "message": "require(ecrecover(digest, v, r, s) == signer ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*!\\s*used\\[\\s*digest\\s*\\][\\s\\S]*used\\[\\s*digest\\s*\\]\\s*=\\s*true",
          "message": "Set used[digest] = true; after the reuse check."
        }
      ]
    },
    "explanation": "<p>The <code>used</code> write must land before any external interaction and before the function can be re-entered, the same discipline as the withdraw ordering earlier. Production systems also sign a nonce and a chain id, so a signature for a testnet cannot be replayed on mainnet; the last challenge in this level builds that structured digest by hand.</p>"
  },
  {
    "id": 362,
    "title": "Verifying a Merkle Proof On-Chain",
    "difficulty": "hard",
    "topic": "On-Chain Cryptography",
    "level": 8,
    "xp": 25,
    "instructions": "<p>Level 5's Merkle-proof challenge checked membership in Python: fold the leaf together with each sibling hash on the way up to the root. The identical proof verifies on-chain, and it is the cheapest way to gate thousands of addresses without storing any of them, the contract keeps one <code>bytes32 root</code>, and each user supplies their own <code>leaf</code> and a short <code>proof</code> array. You recompute the root by hashing pairs, and to avoid caring which sibling is on the left, you sort each pair before hashing (<code>keccak256</code> of the smaller then the larger). If the recomputed value equals the stored <code>root</code>, the leaf was in the tree.</p>\n<ul>\n  <li><strong>Merkle root:</strong> one <code>bytes32</code> committing to a whole set. Change any leaf and the root changes.</li>\n  <li><strong>proof:</strong> the array of sibling hashes along the path from a leaf to the root. Its length grows with the logarithm of the set size.</li>\n  <li><strong>sorted pair hashing:</strong> <code>a &lt;= b ? keccak256(a, b) : keccak256(b, a)</code>, removes the need to send left/right flags alongside the proof.</li>\n  <li><strong>leaf:</strong> the hash of one set member, for instance <code>keccak256(abi.encodePacked(userAddress))</code>.</li>\n</ul>\n<p class=\"blueprint-line\"><code>bytes32 computed = leaf;</code><br><code>for (uint256 i = 0; i &lt; proof.length; i++) { ... }</code><br><code>computed = computed &lt;= proof[i] ? keccak256(abi.encodePacked(computed, proof[i])) : keccak256(abi.encodePacked(proof[i], computed));</code><br><code>return computed == root;</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// one fold step, pair sorted so left/right does not matter\nbytes32 h = a <= b\n    ? keccak256(abi.encodePacked(a, b))\n    : keccak256(abi.encodePacked(b, a));</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The sandbox checks text only and cannot hash anything. Build a small tree in JavaScript with <code>merkletreejs</code>, deploy this contract in <code>remix.ethereum.org</code> with that root, and pass a real <code>leaf</code> plus its <code>proof</code> to <code>verify</code>, then change one byte of the leaf and watch it return <code>false</code>.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract <code>Allowlist</code> with a <code>bytes32 public root</code>, set from <code>constructor(bytes32 _root)</code>. Add <code>verify(bytes32 leaf, bytes32[] calldata proof) public view returns (bool)</code>. Set <code>bytes32 computed = leaf</code>. Loop <code>uint256 i</code> from <code>0</code> while <code>i &lt; proof.length</code>: if <code>computed &lt;= proof[i]</code>, set <code>computed = keccak256(abi.encodePacked(computed, proof[i]))</code>; otherwise set <code>computed = keccak256(abi.encodePacked(proof[i], computed))</code>. Finally <code>return computed == root</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">verify(leaf, proof) for a member</span><code class=\"io-val\">true</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">verify(tamperedLeaf, proof)</span><code class=\"io-val\">false</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Allowlist {",
      "    bytes32 public root;",
      "",
      "    constructor(bytes32 _root) {",
      "        root = _root;",
      "    }",
      "",
      "    function verify(bytes32 leaf, bytes32[] calldata proof) public view returns (bool) {",
      "        bytes32 computed = leaf;",
      "        for (uint256 i = 0; i < proof.length; i++) {",
      "            if (computed <= proof[i]) {",
      "                computed = keccak256(abi.encodePacked(computed, proof[i]));",
      "            } else {",
      "                computed = keccak256(abi.encodePacked(proof[i], computed));",
      "            }",
      "        }",
      "        return computed == root;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Allowlist: store a root, fold leaf with proof using sorted keccak pairs\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Allowlist {\n    bytes32 public root;\n\n    constructor(bytes32 _root) {\n        root = _root;\n    }\n\n    function verify(bytes32 leaf, bytes32[] calldata proof) public view returns (bool) {\n        bytes32 computed = leaf;\n        for (uint256 i = 0; i < proof.length; i++) {\n            if (computed <= proof[i]) {\n                computed = keccak256(abi.encodePacked(computed, proof[i]));\n            } else {\n                computed = keccak256(abi.encodePacked(proof[i], computed));\n            }\n        }\n        return computed == root;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Start with pragma solidity ^0.8.20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Allowlist\\s*\\{",
          "message": "Define a contract named Allowlist."
        },
        {
          "type": "matchesRegex",
          "pattern": "bytes32\\s+public\\s+root\\s*;",
          "message": "Declare: bytes32 public root;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+verify\\s*\\(\\s*bytes32\\s+leaf\\s*,\\s*bytes32\\[\\]\\s+calldata\\s+proof\\s*\\)\\s+public\\s+view\\s+returns\\s*\\(\\s*bool\\s*\\)",
          "message": "verify(bytes32 leaf, bytes32[] calldata proof) public view returns (bool)."
        },
        {
          "type": "matchesRegex",
          "pattern": "bytes32\\s+computed\\s*=\\s*leaf\\s*;",
          "message": "Start with bytes32 computed = leaf;"
        },
        {
          "type": "matchesRegex",
          "pattern": "for\\s*\\(\\s*uint256\\s+i\\s*=\\s*0\\s*;\\s*i\\s*<\\s*proof\\.length\\s*;",
          "message": "Loop for (uint256 i = 0; i < proof.length; i++)."
        },
        {
          "type": "matchesRegex",
          "pattern": "computed\\s*<=\\s*proof\\[\\s*i\\s*\\]",
          "message": "Compare computed <= proof[i] to sort the pair."
        },
        {
          "type": "matchesRegex",
          "pattern": "keccak256\\(\\s*abi\\.encodePacked\\(\\s*computed\\s*,\\s*proof\\[\\s*i\\s*\\]\\s*\\)\\s*\\)",
          "message": "One branch: keccak256(abi.encodePacked(computed, proof[i]))."
        },
        {
          "type": "matchesRegex",
          "pattern": "keccak256\\(\\s*abi\\.encodePacked\\(\\s*proof\\[\\s*i\\s*\\]\\s*,\\s*computed\\s*\\)\\s*\\)",
          "message": "Other branch: keccak256(abi.encodePacked(proof[i], computed))."
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+computed\\s*==\\s*root\\s*;",
          "message": "Finish with return computed == root;"
        }
      ]
    },
    "explanation": "<p>On-chain this costs one hash per proof element and a single storage slot in total, versus storing every address, that economy is why almost every allowlist mint uses it. You ran this exact algorithm in Python in Level 5; here it is again with <code>keccak256</code> and Solidity's type system. A signature allowlist and a Merkle allowlist solve the same problem two different ways.</p>"
  },
  {
    "id": 363,
    "title": "Guided Build: A Configurable Token",
    "difficulty": "hard",
    "topic": "Capstone",
    "level": 8,
    "xp": 25,
    "instructions": "<p>This is a guided build, not a single idea, you will assemble a small token that a deployer configures at launch. Everything you have used piecemeal comes together: state variables, a <code>constructor</code> with arguments, access control on a privileged function, events, custom errors, and documentation comments. It is a stripped-down cousin of the ERC-20 standard, the same <code>balances</code> map and token behaviour you read in Level 6's Vyper challenge, now written in Solidity. Real ERC-20 also has <code>approve</code>/<code>transferFrom</code> and decimal bookkeeping, left out here to keep the focus on structure.</p>\n<p>Two deployers should get two different tokens from the same bytecode, one passes <code>(\"Gold\", \"GLD\", 1000)</code>, another <code>(\"Silver\", \"SLV\", 500)</code>, so <code>name</code>, <code>symbol</code>, and the initial supply are constructor parameters, never hard-coded. <code>mint</code> creates new units, but only for the <code>owner</code> captured at deployment. Every balance change emits <code>Transfer</code>, the log indexers read. Failures use named <code>error</code>s instead of string messages, and each external function carries NatSpec (<code>///</code>) so wallets can show a caller what they are invoking.</p>\n<ul>\n  <li><strong>constructor parameters:</strong> values supplied once, in the deploy transaction, then fixed. Here they personalize the token.</li>\n  <li><strong>owner-gated:</strong> guarded by <code>if (msg.sender != owner) revert NotOwner();</code> so only the deployer can call it.</li>\n  <li><strong>event Transfer(address indexed from, address indexed to, uint256 value):</strong> the standard token-movement log. <code>indexed</code> fields are filterable; a mint logs <code>from</code> as <code>address(0)</code>.</li>\n  <li><strong>custom error:</strong> <code>error Name();</code> declared at contract level, raised with <code>revert Name();</code>. Cheaper than a <code>require</code> string and machine-readable.</li>\n  <li><strong>NatSpec:</strong> <code>///</code> doc comments (<code>@notice</code>, <code>@param</code>, <code>@return</code>) that explorers and wallets surface to users.</li>\n</ul>\n<p class=\"blueprint-line\"><code>error NotOwner();</code><br><code>event Transfer(address indexed from, address indexed to, uint256 value);</code><br><code>constructor(string memory _name, string memory _symbol, uint256 initialSupply) { ... }</code><br><code>function mint(address to, uint256 value) external { if (msg.sender != owner) revert NotOwner(); ... }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>error NotOwner();\nevent Transfer(address indexed from, address indexed to, uint256 value);\n\n/// @notice Mint new tokens to the recipient address\nfunction mint(address to, uint256 value) external {\n    if (msg.sender != owner) revert NotOwner();\n    totalSupply += value;\n    balanceOf[to] += value;\n    emit Transfer(address(0), to, value);\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This is a full contract, and the editor still only reads the text. In <code>remix.ethereum.org</code>, deploy it twice with different constructor arguments, confirm the two <code>name()</code> values differ, then call <code>mint</code> from a non-owner account and watch <code>NotOwner</code> revert it.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Build a contract <code>ConfigToken</code>. State: <code>string public name</code>, <code>string public symbol</code>, <code>uint256 public totalSupply</code>, <code>address public owner</code>, and <code>mapping(address =&gt; uint256) public balanceOf</code>. Declare <code>error NotOwner();</code> and <code>error ZeroAddress();</code>. Declare <code>event Transfer(address indexed from, address indexed to, uint256 value);</code>. Write <code>constructor(string memory _name, string memory _symbol, uint256 initialSupply)</code> that sets <code>name</code>, <code>symbol</code>, <code>owner = msg.sender</code>, <code>totalSupply = initialSupply</code>, <code>balanceOf[msg.sender] = initialSupply</code>, and emits <code>Transfer(address(0), msg.sender, initialSupply)</code>. Write <code>transfer(address to, uint256 value) external returns (bool)</code> that reverts <code>ZeroAddress</code> when <code>to</code> is <code>address(0)</code>, moves the balance, and emits <code>Transfer</code>. Write <code>mint(address to, uint256 value) external</code> that reverts <code>NotOwner</code> unless <code>msg.sender == owner</code>, then raises <code>totalSupply</code> and <code>balanceOf[to]</code> and emits <code>Transfer(address(0), to, value)</code>. Put a <code>///</code> <code>@notice</code> line on <code>transfer</code> and on <code>mint</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">deploy(\"Gold\",\"GLD\",1000)</span><code class=\"io-val\">name() == \"Gold\", balanceOf[deployer] == 1000</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">mint(x, 50) from owner</span><code class=\"io-val\">totalSupply += 50, Transfer(address(0), x, 50)</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">mint from a non-owner</span><code class=\"io-val\">reverts NotOwner()</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "/// @title ConfigToken - a deploy-time configurable token",
      "contract ConfigToken {",
      "    string public name;",
      "    string public symbol;",
      "    uint256 public totalSupply;",
      "    address public owner;",
      "",
      "    mapping(address => uint256) public balanceOf;",
      "",
      "    error NotOwner();",
      "    error ZeroAddress();",
      "",
      "    event Transfer(address indexed from, address indexed to, uint256 value);",
      "",
      "    constructor(string memory _name, string memory _symbol, uint256 initialSupply) {",
      "        name = _name;",
      "        symbol = _symbol;",
      "        owner = msg.sender;",
      "        totalSupply = initialSupply;",
      "        balanceOf[msg.sender] = initialSupply;",
      "        emit Transfer(address(0), msg.sender, initialSupply);",
      "    }",
      "",
      "    /// @notice Move `value` tokens from the caller to `to`",
      "    /// @param to recipient address",
      "    /// @param value amount of tokens to transfer",
      "    /// @return ok true when the transfer succeeds",
      "    function transfer(address to, uint256 value) external returns (bool ok) {",
      "        if (to == address(0)) revert ZeroAddress();",
      "        balanceOf[msg.sender] -= value;",
      "        balanceOf[to] += value;",
      "        emit Transfer(msg.sender, to, value);",
      "        return true;",
      "    }",
      "",
      "    /// @notice Create `value` new tokens and assign them to `to`",
      "    /// @param to recipient of the newly minted tokens",
      "    /// @param value amount of tokens to mint",
      "    function mint(address to, uint256 value) external {",
      "        if (msg.sender != owner) revert NotOwner();",
      "        if (to == address(0)) revert ZeroAddress();",
      "        totalSupply += value;",
      "        balanceOf[to] += value;",
      "        emit Transfer(address(0), to, value);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// ConfigToken: configurable name/symbol/supply, owner-gated mint, Transfer events, custom errors\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n/// @title ConfigToken - a deploy-time configurable token\ncontract ConfigToken {\n    string public name;\n    string public symbol;\n    uint256 public totalSupply;\n    address public owner;\n\n    mapping(address => uint256) public balanceOf;\n\n    error NotOwner();\n    error ZeroAddress();\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n\n    constructor(string memory _name, string memory _symbol, uint256 initialSupply) {\n        name = _name;\n        symbol = _symbol;\n        owner = msg.sender;\n        totalSupply = initialSupply;\n        balanceOf[msg.sender] = initialSupply;\n        emit Transfer(address(0), msg.sender, initialSupply);\n    }\n\n    /// @notice Move `value` tokens from the caller to `to`\n    /// @param to recipient address\n    /// @param value amount of tokens to transfer\n    /// @return ok true when the transfer succeeds\n    function transfer(address to, uint256 value) external returns (bool ok) {\n        if (to == address(0)) revert ZeroAddress();\n        balanceOf[msg.sender] -= value;\n        balanceOf[to] += value;\n        emit Transfer(msg.sender, to, value);\n        return true;\n    }\n\n    /// @notice Create `value` new tokens and assign them to `to`\n    /// @param to recipient of the newly minted tokens\n    /// @param value amount of tokens to mint\n    function mint(address to, uint256 value) external {\n        if (msg.sender != owner) revert NotOwner();\n        if (to == address(0)) revert ZeroAddress();\n        totalSupply += value;\n        balanceOf[to] += value;\n        emit Transfer(address(0), to, value);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Start with pragma solidity ^0.8.20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+ConfigToken\\s*\\{",
          "message": "Define a contract named ConfigToken."
        },
        {
          "type": "matchesRegex",
          "pattern": "error\\s+NotOwner\\s*\\(\\s*\\)\\s*;",
          "message": "Declare: error NotOwner();"
        },
        {
          "type": "matchesRegex",
          "pattern": "error\\s+ZeroAddress\\s*\\(\\s*\\)\\s*;",
          "message": "Declare: error ZeroAddress();"
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+Transfer\\s*\\(\\s*address\\s+indexed\\s+from\\s*,\\s*address\\s+indexed\\s+to\\s*,\\s*uint256\\s+value\\s*\\)",
          "message": "Declare event Transfer(address indexed from, address indexed to, uint256 value);"
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*string\\s+memory\\s+_name\\s*,\\s*string\\s+memory\\s+_symbol\\s*,\\s*uint256\\s+initialSupply\\s*\\)",
          "message": "constructor(string memory _name, string memory _symbol, uint256 initialSupply)."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+mint\\s*\\(\\s*address\\s+to\\s*,\\s*uint256\\s+value\\s*\\)\\s+external",
          "message": "mint(address to, uint256 value) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "if\\s*\\(\\s*msg\\.sender\\s*!=\\s*owner\\s*\\)\\s*revert\\s+NotOwner\\s*\\(\\s*\\)",
          "message": "Gate mint with if (msg.sender != owner) revert NotOwner();"
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+Transfer\\s*\\(\\s*address\\(\\s*0\\s*\\)\\s*,\\s*to\\s*,\\s*value\\s*\\)",
          "message": "mint should emit Transfer(address(0), to, value);"
        }
      ]
    },
    "explanation": "<p>This is the shape almost every token, vault, or registry starts from: configured at deploy, one privileged role, an event on every state change, typed errors. Swapping the hand-rolled <code>owner</code> check for OpenZeppelin's <code>Ownable</code> and the balance logic for their <code>ERC20</code> is a later refactor, you have now written by hand what those base contracts give you. The text checks here cannot see the <code>///</code> NatSpec (comments are stripped before matching), so verify that part yourself in Remix's compiler output.</p>"
  },
  {
    "id": 364,
    "title": "Guided Build: A Signature-Gated NFT Mint",
    "difficulty": "hard",
    "topic": "Capstone",
    "level": 8,
    "xp": 25,
    "instructions": "<p>Another guided build, combining three things you now know into one mint function: a minimal ERC-721-style ownership core, an <code>ecrecover</code> allowlist check, and supply limits. An off-chain <code>signer</code> (the project) signs each allowed minter's address; the contract recovers the signature and refuses anyone whose address was not signed. Level 6's real-signature work and this level's <code>ecrecover</code> challenge are doing the verifying here.</p>\n<p>Two guards sit on top. A <code>minted</code> mapping gives each address exactly one mint, a second attempt from the same account reverts. A <code>MAX_SUPPLY</code> constant caps the collection; once <code>totalSupply</code> reaches it, minting is closed. The ERC-721 core is trimmed to essentials: <code>ownerOf</code>, <code>balanceOf</code>, and a <code>Transfer</code> event with an indexed <code>tokenId</code>, minted by assigning the next id and logging a transfer from <code>address(0)</code>.</p>\n<ul>\n  <li><strong>ERC-721 core:</strong> <code>ownerOf[tokenId]</code> and <code>balanceOf[owner]</code> maps plus <code>Transfer(from, to, tokenId)</code>, the minimum an explorer needs to show an NFT.</li>\n  <li><strong>allowlist signature:</strong> <code>signer</code> signs <code>keccak256(abi.encodePacked(msg.sender))</code> off-chain; on-chain <code>ecrecover</code> must return <code>signer</code> or the mint reverts.</li>\n  <li><strong>minted guard:</strong> <code>mapping(address =&gt; bool)</code> giving one mint per address.</li>\n  <li><strong>MAX_SUPPLY:</strong> a <code>uint256 public constant</code> ceiling checked against <code>totalSupply</code> before each mint.</li>\n</ul>\n<p class=\"blueprint-line\"><code>uint256 public constant MAX_SUPPLY = 1000;</code><br><code>if (minted[msg.sender]) revert AlreadyMinted();</code><br><code>if (totalSupply &gt;= MAX_SUPPLY) revert SoldOut();</code><br><code>if (ecrecover(digest, v, r, s) != signer) revert BadSignature();</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function mint(uint8 v, bytes32 r, bytes32 s) external {\n    if (minted[msg.sender]) revert AlreadyMinted();\n    if (totalSupply >= MAX_SUPPLY) revert SoldOut();\n    bytes32 digest = keccak256(abi.encodePacked(msg.sender));\n    if (ecrecover(digest, v, r, s) != signer) revert BadSignature();\n    minted[msg.sender] = true;\n    uint256 tokenId = totalSupply;\n    totalSupply += 1;\n    ownerOf[tokenId] = msg.sender;\n    balanceOf[msg.sender] += 1;\n    emit Transfer(address(0), msg.sender, tokenId);\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Only your text is graded. In <code>remix.ethereum.org</code>, deploy with your test account as <code>signer</code>, sign <code>keccak256(abi.encodePacked(minter))</code> off-chain, and check that the signed account mints once, its second call reverts <code>AlreadyMinted</code>, and an unsigned account reverts <code>BadSignature</code>.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Build a contract <code>GatedNFT</code>. Constants and state: <code>uint256 public constant MAX_SUPPLY = 1000;</code>, <code>uint256 public totalSupply</code>, <code>address public signer</code> (from <code>constructor(address _signer)</code>), <code>mapping(uint256 =&gt; address) public ownerOf</code>, <code>mapping(address =&gt; uint256) public balanceOf</code>, <code>mapping(address =&gt; bool) public minted</code>. Errors <code>AlreadyMinted()</code>, <code>SoldOut()</code>, <code>BadSignature()</code>. Event <code>Transfer(address indexed from, address indexed to, uint256 indexed tokenId)</code>. Function <code>mint(uint8 v, bytes32 r, bytes32 s) external</code>: revert <code>AlreadyMinted</code> if <code>minted[msg.sender]</code>; revert <code>SoldOut</code> if <code>totalSupply &gt;= MAX_SUPPLY</code>; build <code>bytes32 digest = keccak256(abi.encodePacked(msg.sender))</code>; revert <code>BadSignature</code> if <code>ecrecover(digest, v, r, s) != signer</code>; set <code>minted[msg.sender] = true</code>; set <code>uint256 tokenId = totalSupply</code>; do <code>totalSupply += 1</code>; set <code>ownerOf[tokenId] = msg.sender</code>; do <code>balanceOf[msg.sender] += 1</code>; <code>emit Transfer(address(0), msg.sender, tokenId)</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">signed account calls mint()</span><code class=\"io-val\">tokenId 0 minted, Transfer(address(0), caller, 0)</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">same account calls mint() again</span><code class=\"io-val\">reverts AlreadyMinted()</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">unsigned account calls mint()</span><code class=\"io-val\">reverts BadSignature()</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract GatedNFT {",
      "    string public name = \"GatedNFT\";",
      "    string public symbol = \"GNFT\";",
      "",
      "    uint256 public constant MAX_SUPPLY = 1000;",
      "    uint256 public totalSupply;",
      "    address public signer;",
      "",
      "    mapping(uint256 => address) public ownerOf;",
      "    mapping(address => uint256) public balanceOf;",
      "    mapping(address => bool) public minted;",
      "",
      "    error AlreadyMinted();",
      "    error SoldOut();",
      "    error BadSignature();",
      "",
      "    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);",
      "",
      "    constructor(address _signer) {",
      "        signer = _signer;",
      "    }",
      "",
      "    function mint(uint8 v, bytes32 r, bytes32 s) external {",
      "        if (minted[msg.sender]) revert AlreadyMinted();",
      "        if (totalSupply >= MAX_SUPPLY) revert SoldOut();",
      "",
      "        bytes32 digest = keccak256(abi.encodePacked(msg.sender));",
      "        if (ecrecover(digest, v, r, s) != signer) revert BadSignature();",
      "",
      "        minted[msg.sender] = true;",
      "        uint256 tokenId = totalSupply;",
      "        totalSupply += 1;",
      "        ownerOf[tokenId] = msg.sender;",
      "        balanceOf[msg.sender] += 1;",
      "        emit Transfer(address(0), msg.sender, tokenId);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// GatedNFT: minimal ERC-721 core + ecrecover allowlist + minted guard + MAX_SUPPLY cap\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract GatedNFT {\n    string public name = \"GatedNFT\";\n    string public symbol = \"GNFT\";\n\n    uint256 public constant MAX_SUPPLY = 1000;\n    uint256 public totalSupply;\n    address public signer;\n\n    mapping(uint256 => address) public ownerOf;\n    mapping(address => uint256) public balanceOf;\n    mapping(address => bool) public minted;\n\n    error AlreadyMinted();\n    error SoldOut();\n    error BadSignature();\n\n    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);\n\n    constructor(address _signer) {\n        signer = _signer;\n    }\n\n    function mint(uint8 v, bytes32 r, bytes32 s) external {\n        if (minted[msg.sender]) revert AlreadyMinted();\n        if (totalSupply >= MAX_SUPPLY) revert SoldOut();\n\n        bytes32 digest = keccak256(abi.encodePacked(msg.sender));\n        if (ecrecover(digest, v, r, s) != signer) revert BadSignature();\n\n        minted[msg.sender] = true;\n        uint256 tokenId = totalSupply;\n        totalSupply += 1;\n        ownerOf[tokenId] = msg.sender;\n        balanceOf[msg.sender] += 1;\n        emit Transfer(address(0), msg.sender, tokenId);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Start with pragma solidity ^0.8.20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+GatedNFT\\s*\\{",
          "message": "Define a contract named GatedNFT."
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+constant\\s+MAX_SUPPLY\\s*=\\s*1000\\s*;",
          "message": "Declare: uint256 public constant MAX_SUPPLY = 1000;"
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*address\\s*=>\\s*bool\\s*\\)\\s*public\\s+minted",
          "message": "Declare: mapping(address => bool) public minted;"
        },
        {
          "type": "matchesRegex",
          "pattern": "error\\s+SoldOut\\s*\\(\\s*\\)\\s*;",
          "message": "Declare: error SoldOut();"
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+Transfer\\s*\\(\\s*address\\s+indexed\\s+from\\s*,\\s*address\\s+indexed\\s+to\\s*,\\s*uint256\\s+indexed\\s+tokenId\\s*\\)",
          "message": "Declare event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);"
        },
        {
          "type": "matchesRegex",
          "pattern": "if\\s*\\(\\s*minted\\[\\s*msg\\.sender\\s*\\]\\s*\\)\\s*revert\\s+AlreadyMinted",
          "message": "Guard: if (minted[msg.sender]) revert AlreadyMinted();"
        },
        {
          "type": "matchesRegex",
          "pattern": "if\\s*\\(\\s*totalSupply\\s*>=\\s*MAX_SUPPLY\\s*\\)\\s*revert\\s+SoldOut",
          "message": "Cap: if (totalSupply >= MAX_SUPPLY) revert SoldOut();"
        },
        {
          "type": "matchesRegex",
          "pattern": "ecrecover\\(\\s*digest\\s*,\\s*v\\s*,\\s*r\\s*,\\s*s\\s*\\)\\s*!=\\s*signer",
          "message": "Check: if (ecrecover(digest, v, r, s) != signer) revert BadSignature();"
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+Transfer\\s*\\(\\s*address\\(\\s*0\\s*\\)\\s*,\\s*msg\\.sender\\s*,\\s*tokenId\\s*\\)",
          "message": "emit Transfer(address(0), msg.sender, tokenId);"
        }
      ]
    },
    "explanation": "<p>A signature allowlist keeps the gas cost of \"am I allowed\" near-constant no matter how many addresses are on the list, and moves the list itself off-chain. Swap the <code>ecrecover</code> line for the Merkle <code>verify</code> from earlier in this level and you have the other common allowlist design, production NFT mints use one or the other, sometimes both for different phases.</p>"
  },
  {
    "id": 365,
    "title": "Read and Complete: An Ether Vault",
    "difficulty": "medium",
    "topic": "Consolidation",
    "level": 8,
    "xp": 15,
    "instructions": "<p>You have written this pattern from scratch; now practise the more common task, reading an existing contract and filling the gaps, the way you meet Solidity in a code review, an audit, or a fork. The <code>Vault</code> in your editor is complete except for two function bodies. <code>receive()</code> should credit an incoming bare transfer the same way <code>deposit()</code> already does. <code>withdraw</code> should follow checks-effects-interactions: require the balance, subtract it, then send with <code>call</code>, then require the send worked. Level 5's ledger logic, now with real ether on the line.</p>\n<ul>\n  <li><strong>reading Solidity:</strong> most contract work is understanding code that already exists, not greenfield writing. The stub tells you the intent; you supply the mechanism.</li>\n  <li><strong>receive() crediting:</strong> a plain transfer carries no arguments, so <code>msg.sender</code> and <code>msg.value</code> are all you have, enough to update <code>balances</code>.</li>\n  <li><strong>effect before interaction:</strong> <code>balances[msg.sender] -= amount;</code> must appear before the <code>call</code>.</li>\n</ul>\n<p class=\"blueprint-line\"><code>balances[msg.sender] += msg.value;</code><br><code>require(balances[msg.sender] &gt;= amount, \"insufficient\");</code><br><code>balances[msg.sender] -= amount;</code><br><code>(bool ok) = msg.sender.call{value: amount}(\"\");</code><br><code>require(ok, \"transfer failed\");</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// filling a stubbed send, correct order:\nbalances[msg.sender] -= amount;\n(bool ok) = msg.sender.call{value: amount}(\"\");\nrequire(ok, \"transfer failed\");</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Keep the lines that are already there; the grader is still only reading text. After filling the bodies, in <code>remix.ethereum.org</code> deposit once with the <code>deposit</code> button and once by sending ether with no calldata, and confirm both raise your <code>balances</code> entry.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Complete the <code>Vault</code> contract. In <code>receive()</code>, do <code>balances[msg.sender] += msg.value</code>. In <code>withdraw(uint256 amount)</code>: <code>require(balances[msg.sender] &gt;= amount, \"insufficient\")</code>, then <code>balances[msg.sender] -= amount</code>, then <code>(bool ok) = msg.sender.call{value: amount}(\"\")</code>, then <code>require(ok, \"transfer failed\")</code>. Leave <code>deposit()</code> and the <code>balances</code> mapping as they are.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">send 2 ether with empty calldata</span><code class=\"io-val\">balances[you] == 2 ether</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">withdraw(2 ether)</span><code class=\"io-val\">balances[you] == 0, 2 ether sent</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Vault {",
      "    mapping(address => uint256) public balances;",
      "",
      "    function deposit() external payable {",
      "        balances[msg.sender] += msg.value;",
      "    }",
      "",
      "    receive() external payable {",
      "        balances[msg.sender] += msg.value;",
      "    }",
      "",
      "    function withdraw(uint256 amount) external {",
      "        require(balances[msg.sender] >= amount, \"insufficient\");",
      "        balances[msg.sender] -= amount;",
      "        (bool ok, ) = msg.sender.call{value: amount}(\"\");",
      "        require(ok, \"transfer failed\");",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Vault {\n    mapping(address => uint256) public balances;\n\n    function deposit() external payable {\n        balances[msg.sender] += msg.value;\n    }\n\n    // TODO: credit the sender, the same way deposit() does\n    receive() external payable {\n    }\n\n    // TODO: require the balance, deduct BEFORE sending, send via call, require success\n    function withdraw(uint256 amount) external {\n    }\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Vault {\n    mapping(address => uint256) public balances;\n\n    function deposit() external payable {\n        balances[msg.sender] += msg.value;\n    }\n\n    receive() external payable {\n        balances[msg.sender] += msg.value;\n    }\n\n    function withdraw(uint256 amount) external {\n        require(balances[msg.sender] >= amount, \"insufficient\");\n        balances[msg.sender] -= amount;\n        (bool ok, ) = msg.sender.call{value: amount}(\"\");\n        require(ok, \"transfer failed\");\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Keep the pragma solidity ^0.8.20; line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Vault\\s*\\{",
          "message": "Keep the contract named Vault."
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*public\\s+balances",
          "message": "Keep mapping(address => uint256) public balances;"
        },
        {
          "type": "matchesRegex",
          "pattern": "receive\\s*\\(\\s*\\)\\s+external\\s+payable",
          "message": "Keep receive() external payable and fill its body."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*balances\\[msg\\.sender\\]\\s*>=\\s*amount",
          "message": "withdraw() must require(balances[msg.sender] >= amount ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "balances\\[msg\\.sender\\]\\s*-=\\s*amount[\\s\\S]*msg\\.sender\\.call\\{\\s*value\\s*:\\s*amount",
          "message": "Deduct the balance BEFORE the call."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\(\\s*bool\\s+ok\\s*,\\s*\\)\\s*=\\s*msg\\.sender\\.call\\{\\s*value\\s*:\\s*amount\\s*\\}\\(\\s*\"\"\\s*\\)",
          "message": "Send with (bool ok) = msg.sender.call{value: amount}(\"\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*ok",
          "message": "Finish with require(ok, \"transfer failed\");"
        }
      ]
    },
    "explanation": "<p>Reading and completing is the daily reality of contract work, you inherit a codebase and change two lines. The instinct to build here is ordering: the stub handed you the function shape, and the one way to fill it wrong-but-still-compiling is to send before you deduct.</p>"
  },
  {
    "id": 366,
    "title": "Read and Complete: A Signature Check",
    "difficulty": "medium",
    "topic": "Consolidation",
    "level": 8,
    "xp": 15,
    "instructions": "<p>The digest is already built for you in the editor, <code>keccak256(abi.encodePacked(account, nonce))</code>, with a nonce folded in so the same <code>account</code> can be authorized more than once with distinct signatures. Your job is the three lines that turn a signature into a yes/no: recover, reject the <code>address(0)</code> failure sentinel, compare to <code>trustedSigner</code>. This is the <code>ecrecover</code> check from earlier in this level (and the on-chain echo of Level 6's \"Real Digital Signatures\" verification) dropped into a contract you are reading rather than writing.</p>\n<ul>\n  <li><strong>nonce in the digest:</strong> a counter mixed into the signed data so each authorization is unique; without it, one signature is reusable forever.</li>\n  <li><strong>ecrecover returning address(0):</strong> the \"could not recover\" result. Treat it as failure, never compare it as if it were a real signer.</li>\n  <li><strong>view:</strong> <code>check</code> reads state (<code>trustedSigner</code>) but writes none, so it is <code>view</code> and free to call off-chain.</li>\n</ul>\n<p class=\"blueprint-line\"><code>address recovered = ecrecover(digest, v, r, s);</code><br><code>require(recovered != address(0), \"zero address\");</code><br><code>return recovered == trustedSigner;</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>address recovered = ecrecover(digest, v, r, s);\nrequire(recovered != address(0), \"zero address\");\nreturn recovered == trustedSigner;</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Leave the <code>digest</code> line and the constructor alone; the checker only sees text either way. In <code>remix.ethereum.org</code>, sign <code>keccak256(abi.encodePacked(account, nonce))</code> with the <code>trustedSigner</code> key, call <code>check</code>, confirm it returns <code>true</code>, then bump <code>nonce</code> by one and watch it return <code>false</code>.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Complete <code>check</code>. After the existing <code>digest</code> line, add <code>address recovered = ecrecover(digest, v, r, s)</code>, then <code>require(recovered != address(0), \"zero address\")</code>, then <code>return recovered == trustedSigner</code>. Do not change the <code>digest</code> line or the constructor.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">check(account, nonce, v, r, s) from trustedSigner</span><code class=\"io-val\">true</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">check with a wrong nonce</span><code class=\"io-val\">false</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">check with a garbage signature</span><code class=\"io-val\">reverts \"zero address\"</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Verifier {",
      "    address public trustedSigner;",
      "",
      "    constructor(address _trustedSigner) {",
      "        trustedSigner = _trustedSigner;",
      "    }",
      "",
      "    function check(address account, uint256 nonce, uint8 v, bytes32 r, bytes32 s)",
      "        external",
      "        view",
      "        returns (bool)",
      "    {",
      "        bytes32 digest = keccak256(abi.encodePacked(account, nonce));",
      "        address recovered = ecrecover(digest, v, r, s);",
      "        require(recovered != address(0), \"zero address\");",
      "        return recovered == trustedSigner;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Verifier {\n    address public trustedSigner;\n\n    constructor(address _trustedSigner) {\n        trustedSigner = _trustedSigner;\n    }\n\n    function check(address account, uint256 nonce, uint8 v, bytes32 r, bytes32 s)\n        external\n        view\n        returns (bool)\n    {\n        bytes32 digest = keccak256(abi.encodePacked(account, nonce));\n        // TODO: recover the signer, reject address(0), return whether it is trustedSigner\n    }\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Verifier {\n    address public trustedSigner;\n\n    constructor(address _trustedSigner) {\n        trustedSigner = _trustedSigner;\n    }\n\n    function check(address account, uint256 nonce, uint8 v, bytes32 r, bytes32 s)\n        external\n        view\n        returns (bool)\n    {\n        bytes32 digest = keccak256(abi.encodePacked(account, nonce));\n        address recovered = ecrecover(digest, v, r, s);\n        require(recovered != address(0), \"zero address\");\n        return recovered == trustedSigner;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Keep the pragma solidity ^0.8.20; line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Verifier\\s*\\{",
          "message": "Keep the contract named Verifier."
        },
        {
          "type": "matchesRegex",
          "pattern": "keccak256\\(\\s*abi\\.encodePacked\\(\\s*account\\s*,\\s*nonce\\s*\\)\\s*\\)",
          "message": "Keep the digest line keccak256(abi.encodePacked(account, nonce))."
        },
        {
          "type": "matchesRegex",
          "pattern": "address\\s+recovered\\s*=\\s*ecrecover\\(\\s*digest\\s*,\\s*v\\s*,\\s*r\\s*,\\s*s\\s*\\)",
          "message": "Add address recovered = ecrecover(digest, v, r, s);"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*recovered\\s*!=\\s*address\\(\\s*0\\s*\\)",
          "message": "Add require(recovered != address(0), \"zero address\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+recovered\\s*==\\s*trustedSigner\\s*;",
          "message": "Return recovered == trustedSigner;"
        }
      ]
    },
    "explanation": "<p>These three lines are the entire trust boundary of a signature-gated system, miss the <code>address(0)</code> check and a garbage signature slips through; compare against the wrong variable and anyone can sign. Spotting that in code you are reviewing matters as much as writing it yourself.</p>"
  },
  {
    "id": 367,
    "title": "Building an EIP-712 Typed-Data Hash",
    "difficulty": "medium",
    "topic": "Consolidation",
    "level": 8,
    "xp": 15,
    "instructions": "<p>The naive digests earlier in this level, <code>keccak256(abi.encodePacked(user, amount))</code>, have two weaknesses: a wallet showing the user a blob of hex cannot tell them what they are signing, and the same signature works on any contract on any chain. <strong>EIP-712</strong> fixes both by hashing structured data together with a domain. Level 5's hashing and signing work is the foundation; this is the layout the ecosystem standardized on.</p>\n<p>You build two hashes and glue them. The <strong>domain separator</strong> commits to a name, the chain id, and the contract address, binding a signature to one deployment. The <strong>struct hash</strong> commits to a type string plus the actual field values. The final digest is <code>keccak256(0x1901 ++ domainSeparator ++ structHash)</code>, the <code>\\x19\\x01</code> prefix is a fixed marker that keeps the result from colliding with a normal transaction hash. Keep it lightweight: no libraries, just <code>keccak256</code>, <code>abi.encode</code>, and <code>block.chainid</code>.</p>\n<ul>\n  <li><strong>type hash:</strong> <code>keccak256(\"Mail(address to,uint256 amount)\")</code>, a hash of the struct's field layout as a canonical string, no spaces. Pins what the fields mean.</li>\n  <li><strong>domain separator:</strong> <code>keccak256(abi.encode(DOMAIN_TYPEHASH, keccak256(bytes(name)), block.chainid, address(this)))</code>. Ties the signature to this chain and this contract.</li>\n  <li><strong>block.chainid:</strong> the current chain's id (1 for mainnet, others for testnets). Including it stops cross-chain replay.</li>\n  <li><strong>\\x19\\x01:</strong> the EIP-191 / EIP-712 prefix bytes placed before the two hashes, so a signed struct can never be mistaken for a signed transaction.</li>\n  <li><strong>immutable:</strong> a variable set once in the constructor and then read-only; cheaper to read than ordinary storage.</li>\n</ul>\n<p class=\"blueprint-line\"><code>bytes32 public constant DOMAIN_TYPEHASH = keccak256(\"EIP712Domain(string name,uint256 chainId,address verifyingContract)\");</code><br><code>DOMAIN_SEPARATOR = keccak256(abi.encode(DOMAIN_TYPEHASH, keccak256(bytes(\"PyDrop\")), block.chainid, address(this)));</code><br><code>bytes32 structHash = keccak256(abi.encode(MAIL_TYPEHASH, to, amount));</code><br><code>return keccak256(abi.encodePacked(\"\\x19\\x01\", DOMAIN_SEPARATOR, structHash));</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>bytes32 structHash = keccak256(abi.encode(MAIL_TYPEHASH, to, amount));\nbytes32 digest = keccak256(abi.encodePacked(\"\\x19\\x01\", DOMAIN_SEPARATOR, structHash));</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor matches text and cannot hash. In <code>remix.ethereum.org</code>, deploy the contract, call <code>hashMail(someAddress, 100)</code>, and compare the result with what ethers.js <code>TypedDataEncoder.hash(domain, types, value)</code> produces for the same domain and values, they should match byte for byte.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract <code>TypedData</code>. Declare <code>bytes32 public constant DOMAIN_TYPEHASH = keccak256(\"EIP712Domain(string name,uint256 chainId,address verifyingContract)\");</code> and <code>bytes32 public constant MAIL_TYPEHASH = keccak256(\"Mail(address to,uint256 amount)\");</code>. Declare <code>bytes32 public immutable DOMAIN_SEPARATOR;</code>. In the <code>constructor</code>, set <code>DOMAIN_SEPARATOR = keccak256(abi.encode(DOMAIN_TYPEHASH, keccak256(bytes(\"PyDrop\")), block.chainid, address(this)));</code>. Add <code>hashMail(address to, uint256 amount) public view returns (bytes32)</code> that sets <code>bytes32 structHash = keccak256(abi.encode(MAIL_TYPEHASH, to, amount));</code> and returns <code>keccak256(abi.encodePacked(\"\\x19\\x01\", DOMAIN_SEPARATOR, structHash));</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">hashMail(to, amount)</span><code class=\"io-val\">a bytes32 bound to this chain and this contract</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">same call on another chain id</span><code class=\"io-val\">a different bytes32 (replay-resistant)</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract TypedData {",
      "    bytes32 public constant DOMAIN_TYPEHASH =",
      "        keccak256(\"EIP712Domain(string name,uint256 chainId,address verifyingContract)\");",
      "    bytes32 public constant MAIL_TYPEHASH =",
      "        keccak256(\"Mail(address to,uint256 amount)\");",
      "",
      "    bytes32 public immutable DOMAIN_SEPARATOR;",
      "",
      "    constructor() {",
      "        DOMAIN_SEPARATOR = keccak256(",
      "            abi.encode(",
      "                DOMAIN_TYPEHASH,",
      "                keccak256(bytes(\"PyDrop\")),",
      "                block.chainid,",
      "                address(this)",
      "            )",
      "        );",
      "    }",
      "",
      "    function hashMail(address to, uint256 amount) public view returns (bytes32) {",
      "        bytes32 structHash = keccak256(abi.encode(MAIL_TYPEHASH, to, amount));",
      "        return keccak256(abi.encodePacked(\"\\x19\\x01\", DOMAIN_SEPARATOR, structHash));",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// TypedData: DOMAIN_SEPARATOR + struct hash combined with the \\x19\\x01 prefix\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract TypedData {\n    bytes32 public constant DOMAIN_TYPEHASH =\n        keccak256(\"EIP712Domain(string name,uint256 chainId,address verifyingContract)\");\n    bytes32 public constant MAIL_TYPEHASH =\n        keccak256(\"Mail(address to,uint256 amount)\");\n\n    bytes32 public immutable DOMAIN_SEPARATOR;\n\n    constructor() {\n        DOMAIN_SEPARATOR = keccak256(\n            abi.encode(\n                DOMAIN_TYPEHASH,\n                keccak256(bytes(\"PyDrop\")),\n                block.chainid,\n                address(this)\n            )\n        );\n    }\n\n    function hashMail(address to, uint256 amount) public view returns (bytes32) {\n        bytes32 structHash = keccak256(abi.encode(MAIL_TYPEHASH, to, amount));\n        return keccak256(abi.encodePacked(\"\\x19\\x01\", DOMAIN_SEPARATOR, structHash));\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Start with pragma solidity ^0.8.20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+TypedData\\s*\\{",
          "message": "Define a contract named TypedData."
        },
        {
          "type": "codeContains",
          "value": "keccak256(\"EIP712Domain(string name,uint256 chainId,address verifyingContract)\")",
          "message": "Declare DOMAIN_TYPEHASH = keccak256(\"EIP712Domain(string name,uint256 chainId,address verifyingContract)\")."
        },
        {
          "type": "codeContains",
          "value": "keccak256(\"Mail(address to,uint256 amount)\")",
          "message": "Declare MAIL_TYPEHASH = keccak256(\"Mail(address to,uint256 amount)\")."
        },
        {
          "type": "matchesRegex",
          "pattern": "bytes32\\s+public\\s+immutable\\s+DOMAIN_SEPARATOR\\s*;",
          "message": "Declare: bytes32 public immutable DOMAIN_SEPARATOR;"
        },
        {
          "type": "matchesRegex",
          "pattern": "keccak256\\(\\s*abi\\.encode\\(\\s*DOMAIN_TYPEHASH\\s*,\\s*keccak256\\(\\s*bytes\\(\\s*\"PyDrop\"\\s*\\)\\s*\\)\\s*,\\s*block\\.chainid\\s*,\\s*address\\(\\s*this\\s*\\)\\s*\\)\\s*\\)",
          "message": "Build DOMAIN_SEPARATOR = keccak256(abi.encode(DOMAIN_TYPEHASH, keccak256(bytes(\"PyDrop\")), block.chainid, address(this)))."
        },
        {
          "type": "matchesRegex",
          "pattern": "bytes32\\s+structHash\\s*=\\s*keccak256\\(\\s*abi\\.encode\\(\\s*MAIL_TYPEHASH\\s*,\\s*to\\s*,\\s*amount\\s*\\)\\s*\\)",
          "message": "Build bytes32 structHash = keccak256(abi.encode(MAIL_TYPEHASH, to, amount));"
        },
        {
          "type": "matchesRegex",
          "pattern": "keccak256\\(\\s*abi\\.encodePacked\\(\\s*\"\\\\x19\\\\x01\"\\s*,\\s*DOMAIN_SEPARATOR\\s*,\\s*structHash\\s*\\)\\s*\\)",
          "message": "Return keccak256(abi.encodePacked(\"\\x19\\x01\", DOMAIN_SEPARATOR, structHash));"
        }
      ]
    },
    "explanation": "<p>Every \"Sign in with Ethereum\", every Permit approval, every DAO vote signature uses this structure; wallets parse the type string to show a readable prompt instead of raw hex. You have now built by hand what OpenZeppelin's <code>EIP712</code> base contract and <code>_hashTypedDataV4</code> generate, the same three-part digest, <code>0x1901</code> marker included.</p>"
  }
];
