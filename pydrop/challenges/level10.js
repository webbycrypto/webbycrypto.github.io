// Level 10
// Generated Solidity challenges - graded by static text checks only (no EVM in-browser).
window.LEVEL10 = [
  {
    "id": 385,
    "title": "Welcome to Level 10: Smart Contract Engineering",
    "kind": "intro",
    "topic": "Introduction",
    "level": 10,
    "instructions": "<p>Level 9 showed you how contracts break. Level 10 is how professionals keep them from breaking: the tools and patterns you reach for on a real project instead of hand-rolling everything. You will inherit <strong>OpenZeppelin</strong>'s audited base contracts (<code>Ownable</code>, <code>ERC20</code>, <code>ReentrancyGuard</code>, <code>AccessControl</code>) rather than rewriting the primitives you built in Levels 8 and 9. You will write a <strong>factory</strong> that deploys many child contracts, use <code>CREATE2</code> to know a contract's address before it exists, and take apart an <strong>upgradeable proxy</strong>: how <code>delegatecall</code> splits code from storage, why the two storage layouts must line up, and why a proxy uses an <code>initialize</code> function instead of a constructor.</p>\n<p>The second half of the level is testing with <strong>Foundry</strong>, the standard toolchain: a test file, <code>setUp</code>, assertions, cheatcodes like <code>vm.prank</code> and <code>vm.expectRevert</code>, and fuzz tests. The sandbox still only matches text, so these test files are read here and run with <code>forge test</code> in a real project. The capstone is a hardened vault built on the OpenZeppelin bases plus its full Foundry test suite, with a test for each Level 9 attack that proves the exploit now fails. After this, Cyfrin Updraft and the Foundry Book are where you keep going.</p>",
    "starterCode": ""
  },
  {
    "id": 386,
    "title": "Inheriting Ownable Instead of Hand-Rolling It",
    "difficulty": "easy",
    "topic": "Standing on OpenZeppelin",
    "level": 10,
    "xp": 10,
    "instructions": "<p>Earlier in this level you hand-wrote access control: capture the deployer in an <code>owner</code> variable in the constructor, then gate sensitive functions with a modifier that runs <code>require(msg.sender == owner)</code>. That pattern is so universal that OpenZeppelin ships it as a base contract called <code>Ownable</code>. Instead of forging your own lock and cutting your own key, you bolt on a mass-produced deadbolt that thousands of audited deployments already trust. You pull it in with <code>is Ownable</code>, hand it a starting owner in your constructor, and tag privileged functions with its <code>onlyOwner</code> modifier, the storage slot, the <code>owner()</code> getter, the ownership-transfer plumbing, and the revert error all come for free.</p>\n<ul>\n  <li><strong>OpenZeppelin:</strong> a widely audited library of reusable Solidity building blocks. You import from it; you never copy-paste it into your file.</li>\n  <li><strong>Ownable:</strong> an OZ base contract that stores one <code>owner</code>, exposes an <code>owner()</code> getter, and provides the <code>onlyOwner</code> modifier plus <code>transferOwnership</code> and <code>renounceOwnership</code>.</li>\n  <li><strong>initialOwner:</strong> since OZ v5 the <code>Ownable</code> constructor takes the first owner explicitly rather than assuming <code>msg.sender</code>. You forward it with <code>Ownable(initialOwner)</code> on your own constructor.</li>\n  <li><strong>onlyOwner:</strong> the modifier that reverts any call whose <code>msg.sender</code> is not the current owner, with the custom error <code>OwnableUnauthorizedAccount</code>.</li>\n</ul>\n<p class=\"blueprint-line\"><code>import {Ownable} from \"@openzeppelin/contracts/access/Ownable.sol\";</code><br><code>contract X is Ownable {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;constructor(address initialOwner) Ownable(initialOwner) {}</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;function admin() external onlyOwner { ... }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {Ownable} from \"@openzeppelin/contracts/access/Ownable.sol\";\n\ncontract Config is Ownable {\n    uint256 public fee;\n\n    constructor(address initialOwner) Ownable(initialOwner) {}\n\n    function setFee(uint256 newFee) external onlyOwner {\n        fee = newFee;   // reverts for anyone but the owner\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Remix resolves the <code>@openzeppelin/&hellip;</code> path automatically from npm, so paste this straight into <code>remix.ethereum.org</code>, compile, and deploy with your own address as <code>initialOwner</code>. The PyDrop editor only reads your text and cannot run the <code>onlyOwner</code> check, in Remix, call the guarded function from a second account and watch it revert.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract <code>Vault</code> that <code>is Ownable</code>, importing <code>Ownable</code> from <code>@openzeppelin/contracts/access/Ownable.sol</code>. Give <code>Vault</code> a <code>constructor(address initialOwner)</code> that forwards to <code>Ownable(initialOwner)</code>. Add a <code>uint256 public rate</code> and a function <code>setRate(uint256 newRate) external onlyOwner</code> that sets <code>rate = newRate</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">setRate(5) from the owner</span><code class=\"io-val\">rate becomes 5</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">setRate(5) from any other account</span><code class=\"io-val\">reverts, OwnableUnauthorizedAccount</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "import {Ownable} from \"@openzeppelin/contracts/access/Ownable.sol\";",
      "",
      "contract Vault is Ownable {",
      "    uint256 public rate;",
      "",
      "    constructor(address initialOwner) Ownable(initialOwner) {}",
      "",
      "    function setRate(uint256 newRate) external onlyOwner {",
      "        rate = newRate;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {Ownable} from \"@openzeppelin/contracts/access/Ownable.sol\";\n\n// Make Vault inherit Ownable and gate setRate with onlyOwner\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {Ownable} from \"@openzeppelin/contracts/access/Ownable.sol\";\n\ncontract Vault is Ownable {\n    uint256 public rate;\n\n    constructor(address initialOwner) Ownable(initialOwner) {}\n\n    function setRate(uint256 newRate) external onlyOwner {\n        rate = newRate;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Pin the compiler with pragma solidity ^0.8.20;"
        },
        {
          "type": "codeContains",
          "value": "import {Ownable} from \"@openzeppelin/contracts/access/Ownable.sol\";",
          "message": "Import Ownable: import {Ownable} from \"@openzeppelin/contracts/access/Ownable.sol\";"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Vault\\s+is\\s+Ownable\\s*\\{",
          "message": "Declare: contract Vault is Ownable {"
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*address\\s+initialOwner\\s*\\)\\s*Ownable\\s*\\(\\s*initialOwner\\s*\\)",
          "message": "Forward the owner: constructor(address initialOwner) Ownable(initialOwner) {}"
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+rate\\s*;",
          "message": "Declare: uint256 public rate;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+setRate\\s*\\(\\s*uint256\\s+newRate\\s*\\)\\s+external\\s+onlyOwner",
          "message": "Define setRate(uint256 newRate) external onlyOwner."
        },
        {
          "type": "matchesRegex",
          "pattern": "rate\\s*=\\s*newRate\\s*;",
          "message": "Inside setRate, set rate = newRate;"
        }
      ]
    },
    "explanation": "<p>This is the same <code>onlyOwner</code> you built by hand, minus the bugs you might have introduced. Inheriting <code>Ownable</code> also hands you <code>transferOwnership</code> for key rotation and <code>renounceOwnership</code> to make a contract permanently owner-less. The next challenges trade this single-owner model for multi-role access control and role-gated minting.</p>"
  },
  {
    "id": 387,
    "title": "A Fifteen-Line ERC-20 on Top of OpenZeppelin",
    "difficulty": "medium",
    "topic": "Standing on OpenZeppelin",
    "level": 10,
    "xp": 15,
    "instructions": "<p>Back in the token challenges you hand-wrote a <code>transfer</code> over a <code>mapping(address =&gt; uint256) balances</code>. The <strong>ERC-20</strong> standard is that pattern plus <code>approve</code>, <code>transferFrom</code>, <code>allowance</code>, and the <code>Transfer</code> / <code>Approval</code> events, a fixed shape every wallet, exchange, and price feed already knows how to talk to. OpenZeppelin's <code>ERC20</code> base contract implements every line of it. You inherit it, call its constructor with a name and symbol, and mint an opening supply; the transfer accounting, the allowance bookkeeping, and the events are all inherited. A production token is often barely longer than this.</p>\n<ul>\n  <li><strong>ERC-20:</strong> the fungible-token interface: <code>totalSupply</code>, <code>balanceOf</code>, <code>transfer</code>, <code>approve</code>, <code>allowance</code>, <code>transferFrom</code>, plus the <code>Transfer</code> and <code>Approval</code> events.</li>\n  <li><strong>_mint(to, amount):</strong> an internal OZ function that creates new tokens, credits <code>to</code>, and raises <code>totalSupply</code>. It is not part of the external interface, you decide when it can be called.</li>\n  <li><strong>constructor chaining:</strong> writing <code>ERC20(\"Name\", \"SYM\")</code> after your constructor's parameter list runs the parent constructor first, setting the token's name and symbol.</li>\n  <li><strong>decimals():</strong> a display-only divisor, <code>18</code> by default. Override it only if your token needs a different precision; the override must be marked <code>override</code>.</li>\n</ul>\n<p class=\"blueprint-line\"><code>contract Token is ERC20 {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;constructor() ERC20(\"Name\", \"SYM\") {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_mint(msg.sender, 1000000 * 10 ** 18);</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;}</code><br><code>}</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {ERC20} from \"@openzeppelin/contracts/token/ERC20/ERC20.sol\";\n\ncontract PointToken is ERC20 {\n    constructor() ERC20(\"Point Token\", \"PT\") {\n        _mint(msg.sender, 500000 * 10 ** 18);   // deployer holds the whole supply\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor is a text matcher, not a compiler. To watch this behave like a real token, drop it into <code>remix.ethereum.org</code> (imports resolve on their own), deploy it, then call <code>balanceOf</code> on the deployer and fire a <code>transfer</code> between two of the in-browser accounts.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Import <code>ERC20</code> from <code>@openzeppelin/contracts/token/ERC20/ERC20.sol</code>. Write <code>contract GoldCoin is ERC20</code> with a <code>constructor()</code> that chains <code>ERC20(\"Gold Coin\", \"GLD\")</code> and calls <code>_mint(msg.sender, 1000000 * 10 ** 18)</code>. Also override <code>decimals</code> with <code>function decimals() public pure override returns (uint8)</code> that returns <code>18</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">name() / symbol()</span><code class=\"io-val\">\"Gold Coin\" / \"GLD\"</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">balanceOf(deployer)</span><code class=\"io-val\">1000000000000000000000000</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "import {ERC20} from \"@openzeppelin/contracts/token/ERC20/ERC20.sol\";",
      "",
      "contract GoldCoin is ERC20 {",
      "    constructor() ERC20(\"Gold Coin\", \"GLD\") {",
      "        _mint(msg.sender, 1000000 * 10 ** 18);",
      "    }",
      "",
      "    function decimals() public pure override returns (uint8) {",
      "        return 18;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {ERC20} from \"@openzeppelin/contracts/token/ERC20/ERC20.sol\";\n\n// Inherit ERC20, chain its constructor, and mint an opening supply\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {ERC20} from \"@openzeppelin/contracts/token/ERC20/ERC20.sol\";\n\ncontract GoldCoin is ERC20 {\n    constructor() ERC20(\"Gold Coin\", \"GLD\") {\n        _mint(msg.sender, 1000000 * 10 ** 18);\n    }\n\n    function decimals() public pure override returns (uint8) {\n        return 18;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Pin the compiler with pragma solidity ^0.8.20;"
        },
        {
          "type": "codeContains",
          "value": "import {ERC20} from \"@openzeppelin/contracts/token/ERC20/ERC20.sol\";",
          "message": "Import ERC20 from @openzeppelin/contracts/token/ERC20/ERC20.sol."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+GoldCoin\\s+is\\s+ERC20\\s*\\{",
          "message": "Declare: contract GoldCoin is ERC20 {"
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*\\)\\s*ERC20\\s*\\(\\s*\"Gold Coin\"\\s*,\\s*\"GLD\"\\s*\\)",
          "message": "Chain the parent constructor: constructor() ERC20(\"Gold Coin\", \"GLD\")"
        },
        {
          "type": "matchesRegex",
          "pattern": "_mint\\s*\\(\\s*msg\\.sender\\s*,",
          "message": "Mint the opening supply with _mint(msg.sender ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+decimals\\s*\\(\\s*\\)\\s+public\\s+pure\\s+override\\s+returns\\s*\\(\\s*uint8\\s*\\)",
          "message": "Override with function decimals() public pure override returns (uint8)."
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+18\\s*;",
          "message": "decimals() should return 18;"
        }
      ]
    },
    "explanation": "<p>Every wallet that lists your token, every DEX pair that quotes it, and every explorer that tracks it is relying on the fact that <code>ERC20</code> gives all of them the exact function selectors and events they expect. Because <code>_mint</code> is internal, the challenge deliberately fixed the supply at deploy; the next challenge wires minting to a role so new tokens can be created later under control.</p>"
  },
  {
    "id": 388,
    "title": "ReentrancyGuard: the Library Version of Your Lock",
    "difficulty": "medium",
    "topic": "Standing on OpenZeppelin",
    "level": 10,
    "xp": 15,
    "instructions": "<p>The hand-rolled reentrancy guard you wrote back in Level 9 was a <code>bool private locked</code>, flipped <code>true</code> at the top of a modifier, checked with <code>require(!locked)</code>, and flipped back <code>false</code> after the function body. OpenZeppelin's <code>ReentrancyGuard</code> is that idea, packaged and audited: inherit it and tag any function that makes an external call with <code>nonReentrant</code>. One line difference worth knowing, OZ stores its status in a single dedicated slot it resets to a fixed &ldquo;not entered&rdquo; constant (on chains with EIP-1153 it uses transient storage, which wipes itself at the end of the transaction so there is no paired write to pay for), and a re-entry reverts with the custom error <code>ReentrancyGuardReentrantCall()</code> rather than a <code>require</code> string.</p>\n<ul>\n  <li><strong>ReentrancyGuard:</strong> an OZ base contract that exposes the <code>nonReentrant</code> modifier and nothing else.</li>\n  <li><strong>nonReentrant:</strong> reverts if the contract is already executing inside another <code>nonReentrant</code> function, the same nested-call block your hand-rolled flag produced.</li>\n  <li><strong>transient storage:</strong> EIP-1153 storage that is cleared automatically when the transaction ends, so a guard using it skips the &ldquo;set then clear&rdquo; storage cost of a plain <code>bool</code>.</li>\n  <li><strong>custom error:</strong> <code>error Name();</code> declared once and raised with <code>revert Name();</code>, cheaper than a string and machine-readable by tools and tests.</li>\n</ul>\n<p class=\"blueprint-line\"><code>import {ReentrancyGuard} from \"@openzeppelin/contracts/utils/ReentrancyGuard.sol\";</code><br><code>contract X is ReentrancyGuard {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;function withdraw() external nonReentrant { ... }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {ReentrancyGuard} from \"@openzeppelin/contracts/utils/ReentrancyGuard.sol\";\n\ncontract Tip is ReentrancyGuard {\n    function claim(uint256 amount) external nonReentrant {\n        (bool ok) = msg.sender.call{value: amount}(\"\");\n        require(ok, \"send failed\");\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>PyDrop checks the letters you typed, not the behaviour. Prove the guard by pasting the contract plus a tiny attacker whose <code>receive()</code> calls back into <code>withdraw</code> into <code>remix.ethereum.org</code>, then watch the nested call revert with <code>ReentrancyGuardReentrantCall</code>.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Import <code>ReentrancyGuard</code> from <code>@openzeppelin/contracts/utils/ReentrancyGuard.sol</code>. Write <code>contract Escrow is ReentrancyGuard</code> with a <code>mapping(address =&gt; uint256) public deposits</code>. Add <code>function deposit() external payable</code> that does <code>deposits[msg.sender] += msg.value</code>. Add <code>function withdraw() external nonReentrant</code> that reads <code>uint256 amount = deposits[msg.sender]</code>, sets <code>deposits[msg.sender] = 0</code>, then does <code>(bool ok) = msg.sender.call{value: amount}(\"\")</code> and <code>require(ok)</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">order inside withdraw</span><code class=\"io-val\">read amount &rarr; deposits[msg.sender] = 0 &rarr; call{value: amount}</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">re-entering withdraw</span><code class=\"io-val\">reverts, ReentrancyGuardReentrantCall</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "import {ReentrancyGuard} from \"@openzeppelin/contracts/utils/ReentrancyGuard.sol\";",
      "",
      "contract Escrow is ReentrancyGuard {",
      "    mapping(address => uint256) public deposits;",
      "",
      "    function deposit() external payable {",
      "        deposits[msg.sender] += msg.value;",
      "    }",
      "",
      "    function withdraw() external nonReentrant {",
      "        uint256 amount = deposits[msg.sender];",
      "        deposits[msg.sender] = 0;",
      "        (bool ok, ) = msg.sender.call{value: amount}(\"\");",
      "        require(ok, \"transfer failed\");",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {ReentrancyGuard} from \"@openzeppelin/contracts/utils/ReentrancyGuard.sol\";\n\n// Inherit ReentrancyGuard and mark withdraw() nonReentrant\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {ReentrancyGuard} from \"@openzeppelin/contracts/utils/ReentrancyGuard.sol\";\n\ncontract Escrow is ReentrancyGuard {\n    mapping(address => uint256) public deposits;\n\n    function deposit() external payable {\n        deposits[msg.sender] += msg.value;\n    }\n\n    function withdraw() external nonReentrant {\n        uint256 amount = deposits[msg.sender];\n        deposits[msg.sender] = 0;\n        (bool ok, ) = msg.sender.call{value: amount}(\"\");\n        require(ok, \"transfer failed\");\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Pin the compiler with pragma solidity ^0.8.20;"
        },
        {
          "type": "codeContains",
          "value": "@openzeppelin/contracts/utils/ReentrancyGuard.sol",
          "message": "Import from @openzeppelin/contracts/utils/ReentrancyGuard.sol."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Escrow\\s+is\\s+ReentrancyGuard\\s*\\{",
          "message": "Declare: contract Escrow is ReentrancyGuard {"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+deposit\\s*\\(\\s*\\)\\s+external\\s+payable",
          "message": "deposit() must be external payable."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+withdraw\\s*\\(\\s*\\)\\s+external\\s+nonReentrant",
          "message": "withdraw() must be marked external nonReentrant."
        },
        {
          "type": "matchesRegex",
          "pattern": "deposits\\[msg\\.sender\\]\\s*=\\s*0\\s*;[\\s\\S]*msg\\.sender\\.call\\{\\s*value\\s*:\\s*amount",
          "message": "Zero deposits[msg.sender] BEFORE the external call (checks-effects-interactions)."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\(\\s*bool\\s+ok\\s*,\\s*\\)\\s*=\\s*msg\\.sender\\.call\\{\\s*value\\s*:\\s*amount\\s*\\}\\(\\s*\"\"\\s*\\)",
          "message": "Send with (bool ok) = msg.sender.call{value: amount}(\"\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*ok",
          "message": "Check the send with require(ok ...)."
        }
      ]
    },
    "explanation": "<p><code>nonReentrant</code> is defence in depth on top of the checks-effects-interactions ordering you already applied by zeroing the balance first. In production you reach for the library version because it is audited, it covers cross-function re-entry, and the transient-storage path makes it nearly free. You have now written the hand-rolled flag and used the packaged guard, the capstone contract at the end of this level uses this exact import.</p>"
  },
  {
    "id": 389,
    "title": "Roles and SafeERC20: Beyond a Single Owner",
    "difficulty": "medium",
    "topic": "Standing on OpenZeppelin",
    "level": 10,
    "xp": 15,
    "instructions": "<p><code>Ownable</code> gives a contract exactly one privileged address. Real systems need several: a minter, a pauser, a treasurer, each possibly held by more than one account, all managed by an admin who can hand out and revoke the others. OpenZeppelin's <code>AccessControl</code> is a role registry, a mapping from a <code>bytes32</code> role id to the set of accounts that hold it, with <code>hasRole</code>, <code>grantRole</code>, <code>revokeRole</code>, and an <code>onlyRole</code> modifier. Roles are just namespaced ids: <code>bytes32 public constant MINTER_ROLE = keccak256(\"MINTER_ROLE\")</code> is a label, not a secret.</p>\n<p>The second half of this challenge is moving ERC-20 tokens out safely. The standard says <code>transfer</code> returns a <code>bool</code>, but a few widely held tokens (USDT is the famous one) return nothing, so a normal <code>token.transfer(...)</code> call either reverts on the decode or silently misreads the stack. OpenZeppelin's <code>SafeERC20</code> library wraps the call at a low level and treats &ldquo;no return data&rdquo; as success, so <code>token.safeTransfer(to, amount)</code> works for both the compliant and the non-compliant tokens.</p>\n<ul>\n  <li><strong>AccessControl:</strong> an OZ base contract mapping <code>bytes32</code> role =&gt; member set, with <code>hasRole</code>, <code>grantRole</code>, <code>revokeRole</code>, and <code>onlyRole</code>.</li>\n  <li><strong>DEFAULT_ADMIN_ROLE:</strong> the <code>bytes32(0)</code> role that is allowed to grant and revoke every other role. Give it to your admin in the constructor with <code>_grantRole</code>.</li>\n  <li><strong>role constant:</strong> <code>bytes32 public constant MINTER_ROLE = keccak256(\"MINTER_ROLE\")</code>, a fixed id derived from a string so different deployments agree on it.</li>\n  <li><strong>onlyRole(role):</strong> a modifier that reverts unless <code>msg.sender</code> currently holds <code>role</code>.</li>\n  <li><strong>SafeERC20 / safeTransfer:</strong> a library, applied with <code>using SafeERC20 for IERC20</code>, that performs <code>transfer</code> through a low-level call and accepts an empty return as success, needed for non-standard tokens that do not return a bool.</li>\n</ul>\n<p class=\"blueprint-line\"><code>bytes32 public constant MINTER_ROLE = keccak256(\"MINTER_ROLE\");</code><br><code>using SafeERC20 for IERC20;</code><br><code>_grantRole(DEFAULT_ADMIN_ROLE, admin);</code><br><code>function f() external onlyRole(MINTER_ROLE) { token.safeTransfer(to, amount); }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {AccessControl} from \"@openzeppelin/contracts/access/AccessControl.sol\";\n\ncontract Gated is AccessControl {\n    bytes32 public constant PAUSER_ROLE = keccak256(\"PAUSER_ROLE\");\n\n    constructor(address admin) {\n        _grantRole(DEFAULT_ADMIN_ROLE, admin);   // admin can grant/revoke everything\n        _grantRole(PAUSER_ROLE, admin);\n    }\n\n    function pause() external onlyRole(PAUSER_ROLE) { /* ... */ }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This grader only compares text. In <code>remix.ethereum.org</code> the OZ imports resolve by themselves, deploy the contract, call <code>grantRole</code> from the admin account, then try the role-gated function from an account that does not hold the role and confirm it reverts.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Import <code>AccessControl</code> from <code>@openzeppelin/contracts/access/AccessControl.sol</code>, <code>IERC20</code> from <code>@openzeppelin/contracts/token/ERC20/IERC20.sol</code>, and <code>SafeERC20</code> from <code>@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol</code>. Write <code>contract Distributor is AccessControl</code>. Add <code>using SafeERC20 for IERC20;</code> and <code>bytes32 public constant MINTER_ROLE = keccak256(\"MINTER_ROLE\");</code>. In <code>constructor(address admin)</code> call <code>_grantRole(DEFAULT_ADMIN_ROLE, admin)</code> and <code>_grantRole(MINTER_ROLE, admin)</code>. Add <code>function payout(IERC20 token, address to, uint256 amount) external onlyRole(MINTER_ROLE)</code> that calls <code>token.safeTransfer(to, amount)</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">payout(...) from a MINTER_ROLE holder</span><code class=\"io-val\">token.safeTransfer runs</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">payout(...) from a non-holder</span><code class=\"io-val\">reverts, AccessControlUnauthorizedAccount</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "import {AccessControl} from \"@openzeppelin/contracts/access/AccessControl.sol\";",
      "import {IERC20} from \"@openzeppelin/contracts/token/ERC20/IERC20.sol\";",
      "import {SafeERC20} from \"@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol\";",
      "",
      "contract Distributor is AccessControl {",
      "    using SafeERC20 for IERC20;",
      "",
      "    bytes32 public constant MINTER_ROLE = keccak256(\"MINTER_ROLE\");",
      "",
      "    constructor(address admin) {",
      "        _grantRole(DEFAULT_ADMIN_ROLE, admin);",
      "        _grantRole(MINTER_ROLE, admin);",
      "    }",
      "",
      "    function payout(IERC20 token, address to, uint256 amount) external onlyRole(MINTER_ROLE) {",
      "        token.safeTransfer(to, amount);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {AccessControl} from \"@openzeppelin/contracts/access/AccessControl.sol\";\nimport {IERC20} from \"@openzeppelin/contracts/token/ERC20/IERC20.sol\";\nimport {SafeERC20} from \"@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol\";\n\n// Define MINTER_ROLE, grant roles in the constructor, gate payout with onlyRole\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {AccessControl} from \"@openzeppelin/contracts/access/AccessControl.sol\";\nimport {IERC20} from \"@openzeppelin/contracts/token/ERC20/IERC20.sol\";\nimport {SafeERC20} from \"@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol\";\n\ncontract Distributor is AccessControl {\n    using SafeERC20 for IERC20;\n\n    bytes32 public constant MINTER_ROLE = keccak256(\"MINTER_ROLE\");\n\n    constructor(address admin) {\n        _grantRole(DEFAULT_ADMIN_ROLE, admin);\n        _grantRole(MINTER_ROLE, admin);\n    }\n\n    function payout(IERC20 token, address to, uint256 amount) external onlyRole(MINTER_ROLE) {\n        token.safeTransfer(to, amount);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "import {AccessControl} from \"@openzeppelin/contracts/access/AccessControl.sol\";",
          "message": "Import AccessControl from @openzeppelin/contracts/access/AccessControl.sol."
        },
        {
          "type": "codeContains",
          "value": "import {SafeERC20} from \"@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol\";",
          "message": "Import SafeERC20 from @openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Distributor\\s+is\\s+AccessControl\\s*\\{",
          "message": "Declare: contract Distributor is AccessControl {"
        },
        {
          "type": "codeContains",
          "value": "using SafeERC20 for IERC20;",
          "message": "Attach the library: using SafeERC20 for IERC20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "bytes32\\s+public\\s+constant\\s+MINTER_ROLE\\s*=\\s*keccak256\\(\\s*\"MINTER_ROLE\"\\s*\\)\\s*;",
          "message": "Declare: bytes32 public constant MINTER_ROLE = keccak256(\"MINTER_ROLE\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "_grantRole\\(\\s*DEFAULT_ADMIN_ROLE\\s*,\\s*admin\\s*\\)",
          "message": "Grant the admin role: _grantRole(DEFAULT_ADMIN_ROLE, admin);"
        },
        {
          "type": "matchesRegex",
          "pattern": "_grantRole\\(\\s*MINTER_ROLE\\s*,\\s*admin\\s*\\)",
          "message": "Grant the minter role: _grantRole(MINTER_ROLE, admin);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+payout\\s*\\([^)]*\\)\\s+external\\s+onlyRole\\(\\s*MINTER_ROLE\\s*\\)",
          "message": "Define payout(...) external onlyRole(MINTER_ROLE)."
        },
        {
          "type": "matchesRegex",
          "pattern": "token\\.safeTransfer\\(\\s*to\\s*,\\s*amount\\s*\\)",
          "message": "Move tokens with token.safeTransfer(to, amount);"
        }
      ]
    },
    "explanation": "<p><code>AccessControl</code> scales past the point where one owner key is a bottleneck and a single point of failure: you can give minting to an automated system, pausing to a security multisig, and keep the admin role in cold storage. <code>SafeERC20</code> is the quiet lesson, &ldquo;the standard says it returns a bool&rdquo; is not the same as &ldquo;every token returns a bool,&rdquo; and the wrapper costs you nothing to be safe.</p>"
  },
  {
    "id": 390,
    "title": "A Contract Factory",
    "difficulty": "medium",
    "topic": "Deployment & Factories",
    "level": 10,
    "xp": 15,
    "instructions": "<p>The <code>new</code> keyword deploys a fresh contract from inside another contract. A <strong>factory</strong> is a contract whose job is to do exactly that on request and keep a registry of everything it made, a print shop that runs off a new copy of a template each time you ask and files the address of every copy. Level 5's blockchain kept an append-only list of blocks; a factory keeps an append-only list of child contracts, and usually emits an event for each one so off-chain indexers can follow along without scanning storage.</p>\n<ul>\n  <li><strong>factory:</strong> a contract that deploys other contracts with <code>new</code> and records their addresses.</li>\n  <li><strong>new Contract(args):</strong> deploys a new instance, runs its constructor, and returns a typed handle; <code>address(handle)</code> is its on-chain address.</li>\n  <li><strong>registry array:</strong> <code>address[] public deployed</code>, every child in creation order, readable by index, with <code>.length</code> as the count.</li>\n  <li><strong>indexing event:</strong> <code>event WidgetCreated(address indexed creator, address widget)</code>, emitted on each deploy so tools can react to it.</li>\n</ul>\n<p class=\"blueprint-line\"><code>Widget w = new Widget(x);</code><br><code>deployed.push(address(w));</code><br><code>emit WidgetCreated(msg.sender, address(w));</code><br><code>return address(w);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>contract Box {\n    uint256 public size;\n    constructor(uint256 s) { size = s; }\n}\n\ncontract BoxFactory {\n    address[] public boxes;\n\n    function make(uint256 s) external returns (address) {\n        Box b = new Box(s);\n        boxes.push(address(b));\n        return address(b);\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>PyDrop only matches the source text. Paste both contracts into <code>remix.ethereum.org</code>, deploy the factory, call <code>createWidget(7)</code> a few times, and read the <code>deployed</code> array and the emitted events in the Remix logs.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract Widget</code> with <code>uint256 public value</code> set in <code>constructor(uint256 x)</code> to <code>x</code>. Then write <code>contract WidgetFactory</code> with <code>address[] public deployed;</code> and <code>event WidgetCreated(address indexed creator, address widget);</code>. Add <code>function createWidget(uint256 x) external returns (address)</code> that runs <code>Widget w = new Widget(x);</code>, then <code>deployed.push(address(w));</code>, then <code>emit WidgetCreated(msg.sender, address(w));</code>, then <code>return address(w);</code>. Add <code>function count() external view returns (uint256)</code> returning <code>deployed.length</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">createWidget(7)</span><code class=\"io-val\">returns the new Widget address; deployed.length grows by 1</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">Widget(addr).value()</span><code class=\"io-val\">7</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Widget {",
      "    uint256 public value;",
      "",
      "    constructor(uint256 x) {",
      "        value = x;",
      "    }",
      "}",
      "",
      "contract WidgetFactory {",
      "    address[] public deployed;",
      "",
      "    event WidgetCreated(address indexed creator, address widget);",
      "",
      "    function createWidget(uint256 x) external returns (address) {",
      "        Widget w = new Widget(x);",
      "        deployed.push(address(w));",
      "        emit WidgetCreated(msg.sender, address(w));",
      "        return address(w);",
      "    }",
      "",
      "    function count() external view returns (uint256) {",
      "        return deployed.length;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Widget with a constructor arg, then a factory that new's it and tracks addresses\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Widget {\n    uint256 public value;\n\n    constructor(uint256 x) {\n        value = x;\n    }\n}\n\ncontract WidgetFactory {\n    address[] public deployed;\n\n    event WidgetCreated(address indexed creator, address widget);\n\n    function createWidget(uint256 x) external returns (address) {\n        Widget w = new Widget(x);\n        deployed.push(address(w));\n        emit WidgetCreated(msg.sender, address(w));\n        return address(w);\n    }\n\n    function count() external view returns (uint256) {\n        return deployed.length;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Pin the compiler with pragma solidity ^0.8.20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Widget\\s*\\{",
          "message": "Define contract Widget { ... }."
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*uint256\\s+x\\s*\\)",
          "message": "Widget needs constructor(uint256 x)."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+WidgetFactory\\s*\\{",
          "message": "Define contract WidgetFactory { ... }."
        },
        {
          "type": "matchesRegex",
          "pattern": "address\\[\\]\\s+public\\s+deployed\\s*;",
          "message": "Declare: address[] public deployed;"
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+WidgetCreated\\s*\\(\\s*address\\s+indexed\\s+creator\\s*,\\s*address\\s+widget\\s*\\)",
          "message": "Declare: event WidgetCreated(address indexed creator, address widget);"
        },
        {
          "type": "matchesRegex",
          "pattern": "Widget\\s+w\\s*=\\s*new\\s+Widget\\s*\\(\\s*x\\s*\\)",
          "message": "Deploy a child with Widget w = new Widget(x);"
        },
        {
          "type": "matchesRegex",
          "pattern": "deployed\\.push\\(\\s*address\\(\\s*w\\s*\\)\\s*\\)",
          "message": "Record it: deployed.push(address(w));"
        },
        {
          "type": "matchesRegex",
          "pattern": "emit\\s+WidgetCreated\\(\\s*msg\\.sender\\s*,\\s*address\\(\\s*w\\s*\\)\\s*\\)",
          "message": "Emit: emit WidgetCreated(msg.sender, address(w));"
        },
        {
          "type": "matchesRegex",
          "pattern": "return\\s+deployed\\.length\\s*;",
          "message": "count() should return deployed.length;"
        }
      ]
    },
    "explanation": "<p>Factories are how one transaction can stand up a per-user vault, a new trading pair, or a fresh escrow, all sharing one codebase and one deploy path. The registry plus event is the part people skip and regret: without it you have contracts live on-chain with no on-chain list of where they are. The next challenge makes those addresses predictable before deployment.</p>"
  },
  {
    "id": 391,
    "title": "CREATE2: Knowing an Address Before You Deploy",
    "difficulty": "hard",
    "topic": "Deployment & Factories",
    "level": 10,
    "xp": 25,
    "instructions": "<p>Ordinary deployment (the <code>CREATE</code> opcode, which plain <code>new Widget(x)</code> uses) derives the new contract's address from the deployer's address and its <strong>nonce</strong>, a counter that goes up with every contract that account creates. You cannot know the address until the transaction lands, and it changes if you deploy anything else first. <code>CREATE2</code> derives the address from the deployer, a <strong>salt</strong> you choose, and the hash of the contract's init bytecode (no nonce) so the address is fixed and computable in advance, even on a chain where the contract does not exist yet.</p>\n<p>That is what lets a wallet product show you your smart-account address before you have funded it, and what lets a project claim the same address on every chain it deploys to. The formula is <code>address = keccak256(0xff ++ deployer ++ salt ++ keccak256(bytecode))[12:]</code>, take the last 20 bytes of that hash. In Solidity you reproduce it with <code>abi.encodePacked</code> and <code>type(Widget).creationCode</code>, and you trigger the real thing with <code>new Widget{salt: salt}(...)</code>.</p>\n<ul>\n  <li><strong>CREATE:</strong> default deployment; address depends on <code>(deployer, nonce)</code>, so it is not knowable ahead of time.</li>\n  <li><strong>CREATE2:</strong> address depends on <code>(0xff, deployer, salt, keccak256(initCode))</code>, deterministic and pre-computable.</li>\n  <li><strong>salt:</strong> a <code>bytes32</code> value you pick; a different salt from the same deployer yields a different address.</li>\n  <li><strong>counterfactual deployment:</strong> treating an address as real (funding it, referencing it) before the contract is actually deployed there.</li>\n  <li><strong>type(C).creationCode:</strong> the contract's init bytecode, hashed as part of the address formula; constructor arguments are <code>abi.encode</code>d and appended.</li>\n</ul>\n<p class=\"blueprint-line\"><code>keccak256(abi.encodePacked(bytes1(0xff), address(this), salt, keccak256(abi.encodePacked(type(Widget).creationCode, abi.encode(x)))))</code><br><code>address(uint160(uint256(hash)))</code><br><code>new Widget{salt: salt}(x)</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// last 20 bytes of the CREATE2 hash, as an address\nbytes32 h = keccak256(abi.encodePacked(bytes1(0xff), address(this), salt, keccak256(initCode)));\naddress predicted = address(uint160(uint256(h)));</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The sandbox cannot hash anything, it only checks your text. In <code>remix.ethereum.org</code>, call <code>computeAddress(salt, x)</code>, then call <code>deploy(salt, x)</code> and confirm the deployed contract's address equals what <code>computeAddress</code> returned.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract Widget</code> with <code>uint256 public value</code> set from <code>constructor(uint256 x)</code>. Then write <code>contract Deployer2</code> with two functions. <code>computeAddress(bytes32 salt, uint256 x) public view returns (address)</code> builds <code>bytes32 hash = keccak256(abi.encodePacked(bytes1(0xff), address(this), salt, keccak256(abi.encodePacked(type(Widget).creationCode, abi.encode(x)))));</code> and returns <code>address(uint160(uint256(hash)))</code>. <code>deploy(bytes32 salt, uint256 x) external returns (address)</code> runs <code>Widget w = new Widget{salt: salt}(x);</code> and returns <code>address(w)</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">computeAddress(salt, 5)</span><code class=\"io-val\">0xABC... (the address deploy will use)</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">deploy(salt, 5)</span><code class=\"io-val\">deploys Widget to exactly that address</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Widget {",
      "    uint256 public value;",
      "",
      "    constructor(uint256 x) {",
      "        value = x;",
      "    }",
      "}",
      "",
      "contract Deployer2 {",
      "    function computeAddress(bytes32 salt, uint256 x) public view returns (address) {",
      "        bytes32 hash = keccak256(",
      "            abi.encodePacked(",
      "                bytes1(0xff),",
      "                address(this),",
      "                salt,",
      "                keccak256(abi.encodePacked(type(Widget).creationCode, abi.encode(x)))",
      "            )",
      "        );",
      "        return address(uint160(uint256(hash)));",
      "    }",
      "",
      "    function deploy(bytes32 salt, uint256 x) external returns (address) {",
      "        Widget w = new Widget{salt: salt}(x);",
      "        return address(w);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Widget with a constructor arg, then Deployer2 with computeAddress + CREATE2 deploy\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Widget {\n    uint256 public value;\n\n    constructor(uint256 x) {\n        value = x;\n    }\n}\n\ncontract Deployer2 {\n    function computeAddress(bytes32 salt, uint256 x) public view returns (address) {\n        bytes32 hash = keccak256(\n            abi.encodePacked(\n                bytes1(0xff),\n                address(this),\n                salt,\n                keccak256(abi.encodePacked(type(Widget).creationCode, abi.encode(x)))\n            )\n        );\n        return address(uint160(uint256(hash)));\n    }\n\n    function deploy(bytes32 salt, uint256 x) external returns (address) {\n        Widget w = new Widget{salt: salt}(x);\n        return address(w);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Pin the compiler with pragma solidity ^0.8.20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+computeAddress\\s*\\(\\s*bytes32\\s+salt\\s*,\\s*uint256\\s+x\\s*\\)\\s+public\\s+view\\s+returns\\s*\\(\\s*address\\s*\\)",
          "message": "Define computeAddress(bytes32 salt, uint256 x) public view returns (address)."
        },
        {
          "type": "codeContains",
          "value": "bytes1(0xff)",
          "message": "The CREATE2 preimage starts with bytes1(0xff)."
        },
        {
          "type": "codeContains",
          "value": "address(this)",
          "message": "The preimage includes the deployer: address(this)."
        },
        {
          "type": "codeContains",
          "value": "type(Widget).creationCode",
          "message": "Hash the init bytecode with type(Widget).creationCode."
        },
        {
          "type": "matchesRegex",
          "pattern": "keccak256\\(\\s*abi\\.encodePacked\\(",
          "message": "Build the preimage with keccak256(abi.encodePacked(...))."
        },
        {
          "type": "matchesRegex",
          "pattern": "address\\(\\s*uint160\\(\\s*uint256\\(\\s*hash\\s*\\)\\s*\\)\\s*\\)",
          "message": "Convert the hash: address(uint160(uint256(hash)))."
        },
        {
          "type": "matchesRegex",
          "pattern": "new\\s+Widget\\{\\s*salt\\s*:\\s*salt\\s*\\}\\(\\s*x\\s*\\)",
          "message": "Deploy with new Widget{salt: salt}(x);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+deploy\\s*\\(\\s*bytes32\\s+salt\\s*,\\s*uint256\\s+x\\s*\\)\\s+external\\s+returns\\s*\\(\\s*address\\s*\\)",
          "message": "Define deploy(bytes32 salt, uint256 x) external returns (address)."
        }
      ]
    },
    "explanation": "<p><code>CREATE2</code> turns a contract address into something you can commit to in advance: publish it, let people send to it, and deploy the code later only if it is needed. It is the backbone of counterfactual smart-contract wallets and of deterministic deployment tools that put the same address on twenty chains. The catch, which the next topic explores, is that the code living at a fixed address can still change if that address is a proxy.</p>"
  },
  {
    "id": 392,
    "title": "delegatecall: Borrowed Code, Your Storage",
    "difficulty": "hard",
    "topic": "Proxies & Upgradeability",
    "level": 10,
    "xp": 25,
    "instructions": "<p>A normal <code>call</code> runs the target contract's code in the target's context: its storage, its balance. <code>delegatecall</code> runs the target's <em>code</em> but keeps <em>your</em> context, the storage it reads and writes is the caller's, and <code>msg.sender</code> and <code>msg.value</code> are the ones the caller received, not the caller's own address. It is the difference between phoning a specialist for advice and having that specialist sit at your desk using your filing cabinet.</p>\n<p>A <strong>proxy</strong> is built entirely on that trick. It holds the data and one <code>implementation</code> address, and its <code>fallback()</code> forwards every call it does not recognise by <code>delegatecall</code> to that address. Users always talk to the proxy, at one address that never changes; you change behaviour by pointing <code>implementation</code> at new logic. The logic contract supplies the function bodies but never holds the real data, that stays in the proxy. Level 6's node challenges warned that the thing on the other end of a call may not behave; here you are deliberately running someone else's code against your own storage, so the discipline moves to keeping the two storage layouts identical (the next challenge).</p>\n<ul>\n  <li><strong>delegatecall:</strong> a low-level call that executes the target's code against the caller's storage, <code>msg.sender</code>, and <code>msg.value</code>.</li>\n  <li><strong>proxy:</strong> a thin contract holding state plus an <code>implementation</code> pointer, delegating all logic calls to it.</li>\n  <li><strong>implementation / logic contract:</strong> the contract with the actual function bodies; users never call it directly.</li>\n  <li><strong>fallback():</strong> the function that runs when the incoming calldata matches no other function signature.</li>\n  <li><strong>assembly forwarding:</strong> the standard proxy <code>fallback</code> copies the calldata, <code>delegatecall</code>s it, copies the return data back, and then <code>return</code>s or <code>revert</code>s with it verbatim.</li>\n</ul>\n<p class=\"blueprint-line\"><code>address impl = implementation;</code><br><code>assembly { calldatacopy(ptr, 0, calldatasize()) }</code><br><code>let result := delegatecall(gas(), impl, ptr, calldatasize(), 0, 0)</code><br><code>returndatacopy(ptr, 0, size)</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>fallback() external payable {\n    address impl = implementation;\n    assembly {\n        let ptr := mload(0x40)\n        calldatacopy(ptr, 0, calldatasize())\n        let result := delegatecall(gas(), impl, ptr, calldatasize(), 0, 0)\n        let size := returndatasize()\n        returndatacopy(ptr, 0, size)\n        switch result\n        case 0 { revert(ptr, size) }\n        default { return(ptr, size) }\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>PyDrop cannot run assembly or the EVM, it is matching your text against the standard forwarder. To see it work, deploy a small <code>LogicV1</code> and this <code>Proxy</code> in <code>remix.ethereum.org</code>, then use &ldquo;At Address&rdquo; to talk to the proxy through the logic contract's ABI and watch the proxy's storage change.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract Proxy</code> with <code>address public implementation;</code> and <code>constructor(address impl) { implementation = impl; }</code>. Add <code>fallback() external payable</code> that first does <code>address impl = implementation;</code>, then an <code>assembly</code> block containing exactly: <code>let ptr := mload(0x40)</code>, <code>calldatacopy(ptr, 0, calldatasize())</code>, <code>let result := delegatecall(gas(), impl, ptr, calldatasize(), 0, 0)</code>, <code>let size := returndatasize()</code>, <code>returndatacopy(ptr, 0, size)</code>, then <code>switch result</code> with <code>case 0 { revert(ptr, size) }</code> and <code>default { return(ptr, size) }</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">call setValue(9) on the proxy</span><code class=\"io-val\">runs LogicV1.setValue, writes slot in the PROXY</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">msg.sender inside the logic</span><code class=\"io-val\">the original caller, not the proxy</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Proxy {",
      "    address public implementation;",
      "",
      "    constructor(address impl) {",
      "        implementation = impl;",
      "    }",
      "",
      "    fallback() external payable {",
      "        address impl = implementation;",
      "        assembly {",
      "            let ptr := mload(0x40)",
      "            calldatacopy(ptr, 0, calldatasize())",
      "            let result := delegatecall(gas(), impl, ptr, calldatasize(), 0, 0)",
      "            let size := returndatasize()",
      "            returndatacopy(ptr, 0, size)",
      "            switch result",
      "            case 0 { revert(ptr, size) }",
      "            default { return(ptr, size) }",
      "        }",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// A minimal proxy: store implementation, delegatecall everything in fallback()\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Proxy {\n    address public implementation;\n\n    constructor(address impl) {\n        implementation = impl;\n    }\n\n    fallback() external payable {\n        address impl = implementation;\n        assembly {\n            let ptr := mload(0x40)\n            calldatacopy(ptr, 0, calldatasize())\n            let result := delegatecall(gas(), impl, ptr, calldatasize(), 0, 0)\n            let size := returndatasize()\n            returndatacopy(ptr, 0, size)\n            switch result\n            case 0 { revert(ptr, size) }\n            default { return(ptr, size) }\n        }\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "address\\s+public\\s+implementation\\s*;",
          "message": "Declare: address public implementation;"
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*address\\s+impl\\s*\\)",
          "message": "Add constructor(address impl) that sets implementation = impl;"
        },
        {
          "type": "matchesRegex",
          "pattern": "fallback\\s*\\(\\s*\\)\\s+external\\s+payable",
          "message": "Add fallback() external payable."
        },
        {
          "type": "matchesRegex",
          "pattern": "address\\s+impl\\s*=\\s*implementation\\s*;",
          "message": "Load the target: address impl = implementation;"
        },
        {
          "type": "codeContains",
          "value": "calldatacopy(ptr, 0, calldatasize())",
          "message": "Copy the calldata: calldatacopy(ptr, 0, calldatasize())"
        },
        {
          "type": "codeContains",
          "value": "delegatecall(gas(), impl, ptr, calldatasize(), 0, 0)",
          "message": "Forward with delegatecall(gas(), impl, ptr, calldatasize(), 0, 0)"
        },
        {
          "type": "codeContains",
          "value": "returndatacopy(ptr, 0, size)",
          "message": "Copy the return data: returndatacopy(ptr, 0, size)"
        },
        {
          "type": "codeContains",
          "value": "revert(ptr, size)",
          "message": "On failure: case 0 { revert(ptr, size) }"
        },
        {
          "type": "codeContains",
          "value": "return(ptr, size)",
          "message": "On success: default { return(ptr, size) }"
        }
      ]
    },
    "explanation": "<p>This ~15-line contract is the whole basis of upgradeable contracts: the address the world knows never moves, but the code behind it can be replaced. Everything hard about proxies (storage layout rules, initializer functions instead of constructors, admin gating on the upgrade) exists to make this <code>delegatecall</code> safe. The next two challenges cover the two ways it most often goes wrong.</p>"
  },
  {
    "id": 393,
    "title": "Storage Layout Collisions in a Proxy",
    "difficulty": "hard",
    "topic": "Proxies & Upgradeability",
    "level": 10,
    "xp": 25,
    "instructions": "<p>Because the proxy from the previous challenge <code>delegatecall</code>s into the implementation, the implementation's code reads and writes the <em>proxy's</em> storage. Storage is a numbered grid of 32-byte slots, and the compiler assigns them by declaration order: the first state variable is slot 0, the next is slot 1, and so on. So the proxy and every version of the implementation must agree, variable for variable, on that order.</p>\n<p>Break the agreement and you get a <strong>layout collision</strong>. If version 2 of the implementation inserts a new variable in the middle, every variable declared after it shifts down one slot, and now reads and writes in the live proxy land on the wrong data. Picture two people filling in the same numbered form from different printed templates: insert one line near the top of one template and every answer below it goes in the wrong box. The rules that prevent this are simple: never insert or reorder existing state variables, only append new ones at the end; and keep the <code>implementation</code> pointer itself in a fixed, hashed slot (EIP-1967 uses <code>keccak256(\"eip1967.proxy.implementation\") - 1</code>) so it can never sit where an implementation variable expects to be.</p>\n<ul>\n  <li><strong>storage slot:</strong> a numbered 32-byte cell; slot <code>n</code> holds the <code>n</code>th declared state variable (ignoring packing).</li>\n  <li><strong>layout collision:</strong> proxy and implementation disagreeing on slot assignments, so a write meant for one variable overwrites another.</li>\n  <li><strong>append-only rule:</strong> in an upgrade, never insert or reorder existing variables; add new ones only at the end.</li>\n  <li><strong>EIP-1967 slot:</strong> a fixed slot, <code>bytes32(uint256(keccak256(\"eip1967.proxy.implementation\")) - 1)</code>, reserved for the implementation address so it cannot collide with logic variables.</li>\n</ul>\n<p class=\"blueprint-line\"><code>// V1: owner (slot 0), value (slot 1)</code><br><code>// V2 wrong: owner, paused (slot 1), value (slot 2)  &larr; value moved</code><br><code>// V2 right: owner, value, paused (appended)</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// BROKEN upgrade: paused is inserted before value\ncontract LogicV1 { address owner; uint256 value; }             // value @ slot 1\ncontract LogicV2Bad { address owner; bool paused; uint256 value; } // value @ slot 2 !!\n// A proxy storing value at slot 1 now reads/writes the wrong slot.</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Nothing here is executed, PyDrop is checking the order of your declarations as text. In <code>remix.ethereum.org</code> you can prove the collision: deploy a proxy on <code>StorageV1</code>, set <code>value</code>, upgrade to <code>StorageV2Bad</code>, and read <code>value</code> back as garbage; repeat with <code>StorageV2Good</code> and it survives.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write three contracts. <code>contract StorageV1</code> declares, in order, <code>address public owner;</code> then <code>uint256 public value;</code>. <code>contract StorageV2Bad</code> declares <code>address public owner;</code>, then <code>bool public paused;</code>, then <code>uint256 public value;</code> (the bug: <code>paused</code> is inserted before <code>value</code>). <code>contract StorageV2Good</code> declares <code>address public owner;</code>, then <code>uint256 public value;</code>, then <code>bool public paused;</code> (appended last), plus <code>bytes32 private constant _IMPL_SLOT = bytes32(uint256(keccak256(\"eip1967.proxy.implementation\")) - 1);</code> and a function <code>_impl() internal view returns (address a)</code> whose body is <code>bytes32 s = _IMPL_SLOT;</code> then <code>assembly { a := sload(s) }</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">StorageV2Bad</span><code class=\"io-val\">value slips from slot 1 to slot 2, collision</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">StorageV2Good</span><code class=\"io-val\">owner, value keep their slots; paused is new at the end</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract StorageV1 {",
      "    address public owner;",
      "    uint256 public value;",
      "}",
      "",
      "contract StorageV2Bad {",
      "    address public owner;",
      "    bool public paused;",
      "    uint256 public value;",
      "}",
      "",
      "contract StorageV2Good {",
      "    address public owner;",
      "    uint256 public value;",
      "    bool public paused;",
      "",
      "    bytes32 private constant _IMPL_SLOT =",
      "        bytes32(uint256(keccak256(\"eip1967.proxy.implementation\")) - 1);",
      "",
      "    function _impl() internal view returns (address a) {",
      "        bytes32 s = _IMPL_SLOT;",
      "        assembly {",
      "            a := sload(s)",
      "        }",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Three contracts: V1, a broken V2 (inserts a variable), a correct append-only V2\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract StorageV1 {\n    address public owner;\n    uint256 public value;\n}\n\ncontract StorageV2Bad {\n    address public owner;\n    bool public paused;\n    uint256 public value;\n}\n\ncontract StorageV2Good {\n    address public owner;\n    uint256 public value;\n    bool public paused;\n\n    bytes32 private constant _IMPL_SLOT =\n        bytes32(uint256(keccak256(\"eip1967.proxy.implementation\")) - 1);\n\n    function _impl() internal view returns (address a) {\n        bytes32 s = _IMPL_SLOT;\n        assembly {\n            a := sload(s)\n        }\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+StorageV1\\s*\\{[\\s\\S]*address\\s+public\\s+owner\\s*;[\\s\\S]*uint256\\s+public\\s+value\\s*;",
          "message": "StorageV1: address public owner; then uint256 public value;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+StorageV2Bad\\s*\\{[\\s\\S]*bool\\s+public\\s+paused\\s*;[\\s\\S]*uint256\\s+public\\s+value\\s*;",
          "message": "StorageV2Bad must declare paused BEFORE value (that is the collision)."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+StorageV2Good\\s*\\{[\\s\\S]*uint256\\s+public\\s+value\\s*;[\\s\\S]*bool\\s+public\\s+paused\\s*;",
          "message": "StorageV2Good must keep value before paused, appending paused last."
        },
        {
          "type": "codeContains",
          "value": "eip1967.proxy.implementation",
          "message": "Use the string \"eip1967.proxy.implementation\" for the fixed slot."
        },
        {
          "type": "matchesRegex",
          "pattern": "bytes32\\s+private\\s+constant\\s+_IMPL_SLOT",
          "message": "Declare bytes32 private constant _IMPL_SLOT = ..."
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\(\\s*keccak256\\(\\s*\"eip1967\\.proxy\\.implementation\"\\s*\\)\\s*\\)\\s*-\\s*1",
          "message": "The EIP-1967 slot is keccak256(\"eip1967.proxy.implementation\") - 1."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+_impl\\s*\\(\\s*\\)\\s+internal\\s+view\\s+returns\\s*\\(\\s*address\\s+a\\s*\\)",
          "message": "Define _impl() internal view returns (address a)."
        },
        {
          "type": "matchesRegex",
          "pattern": "assembly\\s*\\{[\\s\\S]*sload\\(\\s*s\\s*\\)",
          "message": "Read the fixed slot with assembly { a := sload(s) }."
        }
      ]
    },
    "explanation": "<p>The append-only rule is why upgradeable contracts written with OpenZeppelin reserve a <code>uint256[50] __gap</code> at the end of every base contract: room to add fields later without shoving child variables into new slots. Putting the implementation pointer in a hashed slot rather than slot 0 is the other half, it guarantees the one variable the proxy itself must own can never be stepped on by the logic it delegates to.</p>"
  },
  {
    "id": 394,
    "title": "Why Proxies Use initialize() Instead of a Constructor",
    "difficulty": "medium",
    "topic": "Proxies & Upgradeability",
    "level": 10,
    "xp": 15,
    "instructions": "<p>A <code>constructor</code> runs exactly once, at the moment a contract is deployed, and it runs against <em>that</em> contract's storage. For a logic contract sitting behind the proxy from the last two challenges, that is the wrong storage: it is the implementation's own, which no user ever touches, because everyone interacts through the proxy. So any state a constructor sets (the owner, a fee, a token address) is written into a contract nobody calls, and the proxy's storage stays blank.</p>\n<p>The fix is to drop the constructor and use an ordinary function, <code>initialize()</code>, that the proxy calls once right after it is wired up. Because that call goes through <code>delegatecall</code>, it runs against the proxy's storage, which is what you want. A guard, a <code>bool</code> flag, or OpenZeppelin's <code>Initializable</code> with its <code>initializer</code> modifier, makes sure it can only ever run once. It is the difference between a factory painting the sign on a building nobody enters versus painting it on the storefront after the doors open.</p>\n<ul>\n  <li><strong>initialize():</strong> a normal function that does a constructor's job, invoked through the proxy so it writes the proxy's storage.</li>\n  <li><strong>initialized guard:</strong> a <code>bool</code> (or a version number) set on the first run, with a <code>require</code> that reverts if it is already set.</li>\n  <li><strong>Initializable / initializer:</strong> OZ's packaged version of that guard; the real implementation constructor calls <code>_disableInitializers()</code> so the logic contract itself can never be initialised directly.</li>\n  <li><strong>why not a constructor:</strong> it executes at the implementation's own deployment, in the implementation's storage, so the proxy's storage is never set.</li>\n</ul>\n<p class=\"blueprint-line\"><code>bool private _initialized;</code><br><code>function initialize(address _owner, uint256 _fee) external {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;require(!_initialized, \"already initialized\");</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;_initialized = true;</code><br><code>}</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>contract Logic {\n    address public admin;\n    bool private _init;\n\n    function initialize(address a) external {\n        require(!_init, \"init done\");\n        _init = true;\n        admin = a;   // written into the PROXY's storage when called via delegatecall\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor only inspects your text. To feel the difference in <code>remix.ethereum.org</code>, give a logic contract a constructor that sets <code>owner</code>, deploy it behind the <code>Proxy</code> from earlier, and see <code>owner</code> read back as the zero address through the proxy, then switch to <code>initialize()</code> and call it once.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract LogicV1</code> with <strong>no constructor</strong>. Declare <code>address public owner;</code>, <code>uint256 public fee;</code>, and <code>bool private _initialized;</code>. Add <code>function initialize(address _owner, uint256 _fee) external</code> that runs, in order: <code>require(!_initialized, \"already initialized\");</code>, then <code>_initialized = true;</code>, then <code>owner = _owner;</code>, then <code>fee = _fee;</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">first initialize(a, 10)</span><code class=\"io-val\">owner = a, fee = 10</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">second initialize(...)</span><code class=\"io-val\">reverts, already initialized</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract LogicV1 {",
      "    address public owner;",
      "    uint256 public fee;",
      "    bool private _initialized;",
      "",
      "    function initialize(address _owner, uint256 _fee) external {",
      "        require(!_initialized, \"already initialized\");",
      "        _initialized = true;",
      "        owner = _owner;",
      "        fee = _fee;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// No constructor: use initialize() with a one-shot guard\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract LogicV1 {\n    address public owner;\n    uint256 public fee;\n    bool private _initialized;\n\n    function initialize(address _owner, uint256 _fee) external {\n        require(!_initialized, \"already initialized\");\n        _initialized = true;\n        owner = _owner;\n        fee = _fee;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Pin the compiler with pragma solidity ^0.8.20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "bool\\s+private\\s+_initialized\\s*;",
          "message": "Declare the guard: bool private _initialized;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+initialize\\s*\\(\\s*address\\s+_owner\\s*,\\s*uint256\\s+_fee\\s*\\)\\s+external",
          "message": "Define initialize(address _owner, uint256 _fee) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*!_initialized",
          "message": "Guard with require(!_initialized, \"already initialized\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*!_initialized[\\s\\S]*_initialized\\s*=\\s*true\\s*;",
          "message": "Set _initialized = true; AFTER the require, before setting other state."
        },
        {
          "type": "matchesRegex",
          "pattern": "owner\\s*=\\s*_owner\\s*;",
          "message": "Set owner = _owner;"
        },
        {
          "type": "matchesRegex",
          "pattern": "fee\\s*=\\s*_fee\\s*;",
          "message": "Set fee = _fee;"
        }
      ]
    },
    "explanation": "<p>Missing or unguarded initializers are a real class of exploit: leave <code>initialize()</code> callable by anyone and an attacker calls it first, becoming owner of your proxy. That is why OZ pairs <code>Initializable</code> with <code>_disableInitializers()</code> in the implementation's constructor and why upgrade tooling checks for it. The capstone at the end of this level uses a plain constructor because it is deployed directly, not behind a proxy, the choice depends entirely on how the contract is deployed.</p>"
  },
  {
    "id": 395,
    "title": "A Foundry Test File Skeleton",
    "difficulty": "easy",
    "topic": "Testing with Foundry",
    "level": 10,
    "xp": 10,
    "instructions": "<p>Foundry's <code>forge test</code> command compiles your contracts and runs a test suite that is itself written in Solidity, no JavaScript, no second language. A test contract inherits <code>Test</code> from the <code>forge-std</code> library, which brings the assertion helpers and the <code>vm</code> cheatcode handle. A special function <code>setUp()</code> runs fresh before every test function, so each test starts from an identical deployed state. It is the same shape as a <code>beforeEach</code> fixture in the Python test frameworks from earlier levels, except the fixture is a real contract deployed to a local EVM.</p>\n<ul>\n  <li><strong>Foundry / forge test:</strong> a toolchain that compiles and runs Solidity test contracts against a local EVM, reporting pass/fail and gas.</li>\n  <li><strong>forge-std / Test:</strong> the standard test library; <code>import {Test} from \"forge-std/Test.sol\";</code> then <code>contract XTest is Test</code>.</li>\n  <li><strong>setUp():</strong> re-run before each <code>test_</code> function to rebuild state; deploy the contract under test here.</li>\n  <li><strong>contract-under-test state variable:</strong> a storage field on the test contract holding the freshly deployed instance the tests call into.</li>\n</ul>\n<p class=\"blueprint-line\"><code>import {Test} from \"forge-std/Test.sol\";</code><br><code>contract CounterTest is Test {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;Counter counter;</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;function setUp() public { counter = new Counter(); }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// test/Counter.t.sol\nimport {Test} from \"forge-std/Test.sol\";\nimport {Counter} from \"../src/Counter.sol\";\n\ncontract CounterTest is Test {\n    Counter counter;\n\n    function setUp() public {\n        counter = new Counter();\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The PyDrop editor cannot run <code>forge</code>. To execute this for real, run <code>forge init</code> to make a project, drop the file under <code>test/</code>, and run <code>forge test</code> locally, <code>remix.ethereum.org</code> cannot resolve the <code>forge-std</code> import. For this text exercise, define the small <code>Counter</code> in the same file instead of importing it.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a test file: <code>// SPDX-License-Identifier: MIT</code>, <code>pragma solidity ^0.8.20;</code>, <code>import {Test} from \"forge-std/Test.sol\";</code>. Define a minimal <code>contract Counter</code> with <code>uint256 public number;</code> and <code>function increment() external { number++; }</code>. Then <code>contract CounterTest is Test</code> with a state variable <code>Counter counter;</code> and <code>function setUp() public</code> that does <code>counter = new Counter();</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">forge test</span><code class=\"io-val\">compiles CounterTest, runs setUp(), reports 0 tests</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "import {Test} from \"forge-std/Test.sol\";",
      "",
      "contract Counter {",
      "    uint256 public number;",
      "",
      "    function increment() external {",
      "        number++;",
      "    }",
      "}",
      "",
      "contract CounterTest is Test {",
      "    Counter counter;",
      "",
      "    function setUp() public {",
      "        counter = new Counter();",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {Test} from \"forge-std/Test.sol\";\n\n// Define Counter, then CounterTest is Test with a setUp() that deploys it\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {Test} from \"forge-std/Test.sol\";\n\ncontract Counter {\n    uint256 public number;\n\n    function increment() external {\n        number++;\n    }\n}\n\ncontract CounterTest is Test {\n    Counter counter;\n\n    function setUp() public {\n        counter = new Counter();\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity ^0.8.20;",
          "message": "Pin the compiler with pragma solidity ^0.8.20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Counter\\s*\\{",
          "message": "Define a minimal contract Counter { ... } as the contract under test."
        },
        {
          "type": "codeContains",
          "value": "import {Test} from \"forge-std/Test.sol\";",
          "message": "Import the base: import {Test} from \"forge-std/Test.sol\";"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+CounterTest\\s+is\\s+Test\\s*\\{",
          "message": "Declare: contract CounterTest is Test {"
        },
        {
          "type": "matchesRegex",
          "pattern": "Counter\\s+counter\\s*;",
          "message": "Add a state variable: Counter counter;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+setUp\\s*\\(\\s*\\)\\s+public\\s*\\{",
          "message": "Add function setUp() public { ... }."
        },
        {
          "type": "matchesRegex",
          "pattern": "counter\\s*=\\s*new\\s+Counter\\s*\\(\\s*\\)\\s*;",
          "message": "Deploy in setUp: counter = new Counter();"
        }
      ]
    },
    "explanation": "<p>Writing tests in the same language as the contract removes the impedance mismatch that trips people up in JavaScript test suites, no ABI encoding by hand, no BigNumber wrappers, and the test can call <code>internal</code>-adjacent helpers or deploy helper contracts inline. <code>setUp()</code> re-running per test is what keeps tests independent; the next challenge fills it with real assertions and impersonation.</p>"
  },
  {
    "id": 396,
    "title": "Assertions, vm.prank, and makeAddr",
    "difficulty": "medium",
    "topic": "Testing with Foundry",
    "level": 10,
    "xp": 15,
    "instructions": "<p>With the skeleton from the previous challenge in place, a test is any <code>public</code> function whose name starts with <code>test</code>; <code>forge test</code> runs every one and reports it. Inside, <code>assertEq(a, b)</code> and <code>assertTrue(cond)</code> fail the test with a printed diff if they do not hold. The <code>vm</code> handle exposes <strong>cheatcodes</strong> that bend the EVM for testing: <code>vm.prank(addr)</code> makes the very next external call arrive with <code>msg.sender == addr</code>, so one test can act as many different users, and <code>makeAddr(\"alice\")</code> turns a label into a deterministic, human-readable address that shows up named in traces.</p>\n<ul>\n  <li><strong>test_ function:</strong> <code>function test_Something() public</code>, auto-discovered and run by <code>forge test</code>.</li>\n  <li><strong>assertEq / assertTrue:</strong> forge-std assertions; on failure they log expected vs actual and mark the test failed.</li>\n  <li><strong>vm.prank(addr):</strong> a cheatcode that sets <code>msg.sender</code> for exactly the next external call. Use <code>vm.startPrank</code> / <code>vm.stopPrank</code> to cover a range of calls.</li>\n  <li><strong>makeAddr(name):</strong> a helper returning an <code>address</code> derived from the string, automatically labelled in call traces.</li>\n</ul>\n<p class=\"blueprint-line\"><code>address alice = makeAddr(\"alice\");</code><br><code>vm.prank(alice);</code><br><code>counter.increment();</code><br><code>assertEq(counter.lastCaller(), alice);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function test_StartsAtZero() public {\n    assertEq(counter.number(), 0);\n}\n\nfunction test_PrankChangesSender() public {\n    address bob = makeAddr(\"bob\");\n    vm.prank(bob);\n    counter.poke();\n    assertEq(counter.lastCaller(), bob);\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>PyDrop only reads the text you type. Put this in a Foundry project (<code>forge init</code>) under <code>test/</code> and run <code>forge test -vvv</code> locally to watch the assertions pass and the prank take effect; the sandbox cannot execute cheatcodes.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Define <code>contract Counter</code> with <code>uint256 public number;</code>, <code>address public lastCaller;</code>, and <code>function increment() external { number++; lastCaller = msg.sender; }</code>. In <code>contract CounterTest is Test</code>, deploy <code>counter</code> in <code>setUp()</code>. Add <code>function test_IncrementRaisesNumber() public</code> that calls <code>counter.increment()</code> then <code>assertEq(counter.number(), 1)</code>. Add <code>function test_PrankSetsCaller() public</code> that does <code>address alice = makeAddr(\"alice\");</code>, then <code>vm.prank(alice);</code>, then <code>counter.increment();</code>, then <code>assertEq(counter.lastCaller(), alice);</code> and <code>assertTrue(counter.number() &gt; 0);</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">test_IncrementRaisesNumber</span><code class=\"io-val\">passes: number == 1</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">test_PrankSetsCaller</span><code class=\"io-val\">passes: lastCaller == alice</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "import {Test} from \"forge-std/Test.sol\";",
      "",
      "contract Counter {",
      "    uint256 public number;",
      "    address public lastCaller;",
      "",
      "    function increment() external {",
      "        number++;",
      "        lastCaller = msg.sender;",
      "    }",
      "}",
      "",
      "contract CounterTest is Test {",
      "    Counter counter;",
      "",
      "    function setUp() public {",
      "        counter = new Counter();",
      "    }",
      "",
      "    function test_IncrementRaisesNumber() public {",
      "        counter.increment();",
      "        assertEq(counter.number(), 1);",
      "    }",
      "",
      "    function test_PrankSetsCaller() public {",
      "        address alice = makeAddr(\"alice\");",
      "        vm.prank(alice);",
      "        counter.increment();",
      "        assertEq(counter.lastCaller(), alice);",
      "        assertTrue(counter.number() > 0);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {Test} from \"forge-std/Test.sol\";\n\n// Counter tracks lastCaller; write two test_ functions using assertions, vm.prank, makeAddr\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {Test} from \"forge-std/Test.sol\";\n\ncontract Counter {\n    uint256 public number;\n    address public lastCaller;\n\n    function increment() external {\n        number++;\n        lastCaller = msg.sender;\n    }\n}\n\ncontract CounterTest is Test {\n    Counter counter;\n\n    function setUp() public {\n        counter = new Counter();\n    }\n\n    function test_IncrementRaisesNumber() public {\n        counter.increment();\n        assertEq(counter.number(), 1);\n    }\n\n    function test_PrankSetsCaller() public {\n        address alice = makeAddr(\"alice\");\n        vm.prank(alice);\n        counter.increment();\n        assertEq(counter.lastCaller(), alice);\n        assertTrue(counter.number() > 0);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "import {Test} from \"forge-std/Test.sol\";",
          "message": "Import {Test} from \"forge-std/Test.sol\";"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+test_\\w+\\s*\\(\\s*\\)\\s+public",
          "message": "Add at least one function test_...() public."
        },
        {
          "type": "matchesRegex",
          "pattern": "assertEq\\(\\s*counter\\.number\\(\\)\\s*,\\s*1\\s*\\)",
          "message": "Assert the count: assertEq(counter.number(), 1);"
        },
        {
          "type": "codeContains",
          "value": "makeAddr(\"alice\")",
          "message": "Make a labelled address: makeAddr(\"alice\")."
        },
        {
          "type": "matchesRegex",
          "pattern": "vm\\.prank\\(\\s*alice\\s*\\)\\s*;\\s*counter\\.increment\\(\\)",
          "message": "vm.prank(alice); must immediately precede the call it applies to."
        },
        {
          "type": "matchesRegex",
          "pattern": "assertEq\\(\\s*counter\\.lastCaller\\(\\)\\s*,\\s*alice\\s*\\)",
          "message": "Assert the impersonation worked: assertEq(counter.lastCaller(), alice);"
        },
        {
          "type": "matchesRegex",
          "pattern": "assertTrue\\(",
          "message": "Use assertTrue(...) at least once."
        }
      ]
    },
    "explanation": "<p><code>vm.prank</code> is the workhorse of access-control testing: it is how you prove that the owner can call an admin function and that a random address cannot, without deploying from a dozen different keys. <code>makeAddr</code> keeps the failures readable, a trace that says <code>alice</code> beats one full of raw hex. The next challenge adds the cheatcodes for reverts, balances, and time.</p>"
  },
  {
    "id": 397,
    "title": "expectRevert, deal, warp, and Fuzzing",
    "difficulty": "medium",
    "topic": "Testing with Foundry",
    "level": 10,
    "xp": 15,
    "instructions": "<p>Four more cheatcodes cover most of what a real suite needs. <code>vm.expectRevert(Err.selector)</code> asserts that the <em>next</em> call reverts, and with a custom error's <code>.selector</code> it asserts it reverts with that specific error. <code>vm.deal(addr, 1 ether)</code> sets an account's ether balance outright. <code>vm.warp(ts)</code> sets <code>block.timestamp</code> (its sibling <code>vm.roll(n)</code> sets the block number). And a function named <code>testFuzz_</code> takes parameters that <code>forge</code> fills with many random values per run; <code>bound(x, lo, hi)</code> squeezes a raw <code>uint256</code> into a sensible range so the random input is still meaningful.</p>\n<ul>\n  <li><strong>vm.expectRevert(selector):</strong> the next call must revert; with <code>CustomError.selector</code> it must revert with exactly that error.</li>\n  <li><strong>vm.deal(addr, amount):</strong> set <code>addr</code>'s balance to <code>amount</code>, no transfer, it just writes the balance.</li>\n  <li><strong>vm.warp(timestamp):</strong> set <code>block.timestamp</code>; useful for testing time locks and deadlines.</li>\n  <li><strong>testFuzz_ / fuzzing:</strong> <code>forge</code> calls the function repeatedly with random arguments, trying to break an invariant.</li>\n  <li><strong>bound(x, min, max):</strong> map any <code>uint256</code> into <code>[min, max]</code>, preferred over <code>vm.assume</code> for ranges because it never discards runs.</li>\n</ul>\n<p class=\"blueprint-line\"><code>vm.expectRevert(Bank.TooMuch.selector);</code><br><code>bank.withdraw(1);</code><br><code>vm.deal(bob, 1 ether);</code><br><code>vm.warp(block.timestamp + 1 days);</code><br><code>amt = bound(amt, 1, 1e24);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function test_RevertWhen_Empty() public {\n    vm.expectRevert(Bank.TooMuch.selector);\n    bank.withdraw(1);\n}\n\nfunction testFuzz_Deposit(uint256 amt) public {\n    amt = bound(amt, 1, 1e24);\n    vm.deal(address(this), amt);\n    bank.deposit{value: amt}();\n    assertEq(bank.balances(address(this)), amt);\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>None of this executes in PyDrop, it is a text check. Run <code>forge test</code> in a real Foundry project to see the fuzzer report how many runs it did and to watch <code>expectRevert</code> catch the exact selector; a mismatched error makes the test fail loudly.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Define <code>contract Bank</code> with <code>mapping(address =&gt; uint256) public balances;</code>, <code>error TooMuch();</code>, <code>function deposit() external payable { balances[msg.sender] += msg.value; }</code>, and <code>function withdraw(uint256 amt) external { if (amt &gt; balances[msg.sender]) revert TooMuch(); balances[msg.sender] -= amt; }</code>. In <code>contract BankTest is Test</code>, deploy <code>bank</code> in <code>setUp()</code>. Add <code>function test_RevertWhen_WithdrawTooMuch() public</code> that does <code>vm.expectRevert(Bank.TooMuch.selector);</code> then <code>bank.withdraw(1);</code>. Add <code>function test_DealAndWarp() public</code> that makes <code>address bob = makeAddr(\"bob\");</code>, does <code>vm.deal(bob, 1 ether);</code>, <code>vm.warp(block.timestamp + 1 days);</code>, then <code>assertEq(bob.balance, 1 ether);</code>. Add <code>function testFuzz_DepositCredits(uint256 amt) public</code> that does <code>amt = bound(amt, 1, 1e24);</code>, funds and pranks a user, calls <code>bank.deposit{value: amt}()</code>, and asserts the balance equals <code>amt</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">test_RevertWhen_WithdrawTooMuch</span><code class=\"io-val\">passes: withdraw(1) reverts with TooMuch()</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">testFuzz_DepositCredits</span><code class=\"io-val\">passes across ~256 random amounts in [1, 1e24]</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "import {Test} from \"forge-std/Test.sol\";",
      "",
      "contract Bank {",
      "    mapping(address => uint256) public balances;",
      "",
      "    error TooMuch();",
      "",
      "    function deposit() external payable {",
      "        balances[msg.sender] += msg.value;",
      "    }",
      "",
      "    function withdraw(uint256 amt) external {",
      "        if (amt > balances[msg.sender]) revert TooMuch();",
      "        balances[msg.sender] -= amt;",
      "    }",
      "}",
      "",
      "contract BankTest is Test {",
      "    Bank bank;",
      "",
      "    function setUp() public {",
      "        bank = new Bank();",
      "    }",
      "",
      "    function test_RevertWhen_WithdrawTooMuch() public {",
      "        vm.expectRevert(Bank.TooMuch.selector);",
      "        bank.withdraw(1);",
      "    }",
      "",
      "    function test_DealAndWarp() public {",
      "        address bob = makeAddr(\"bob\");",
      "        vm.deal(bob, 1 ether);",
      "        vm.warp(block.timestamp + 1 days);",
      "        assertEq(bob.balance, 1 ether);",
      "    }",
      "",
      "    function testFuzz_DepositCredits(uint256 amt) public {",
      "        amt = bound(amt, 1, 1e24);",
      "        address user = makeAddr(\"user\");",
      "        vm.deal(user, amt);",
      "        vm.prank(user);",
      "        bank.deposit{value: amt}();",
      "        assertEq(bank.balances(user), amt);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {Test} from \"forge-std/Test.sol\";\n\n// Bank with a custom error; test expectRevert, deal, warp, and a bounded fuzz test\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {Test} from \"forge-std/Test.sol\";\n\ncontract Bank {\n    mapping(address => uint256) public balances;\n\n    error TooMuch();\n\n    function deposit() external payable {\n        balances[msg.sender] += msg.value;\n    }\n\n    function withdraw(uint256 amt) external {\n        if (amt > balances[msg.sender]) revert TooMuch();\n        balances[msg.sender] -= amt;\n    }\n}\n\ncontract BankTest is Test {\n    Bank bank;\n\n    function setUp() public {\n        bank = new Bank();\n    }\n\n    function test_RevertWhen_WithdrawTooMuch() public {\n        vm.expectRevert(Bank.TooMuch.selector);\n        bank.withdraw(1);\n    }\n\n    function test_DealAndWarp() public {\n        address bob = makeAddr(\"bob\");\n        vm.deal(bob, 1 ether);\n        vm.warp(block.timestamp + 1 days);\n        assertEq(bob.balance, 1 ether);\n    }\n\n    function testFuzz_DepositCredits(uint256 amt) public {\n        amt = bound(amt, 1, 1e24);\n        address user = makeAddr(\"user\");\n        vm.deal(user, amt);\n        vm.prank(user);\n        bank.deposit{value: amt}();\n        assertEq(bank.balances(user), amt);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "import {Test} from \"forge-std/Test.sol\";",
          "message": "Import {Test} from \"forge-std/Test.sol\";"
        },
        {
          "type": "matchesRegex",
          "pattern": "vm\\.expectRevert\\(\\s*Bank\\.TooMuch\\.selector\\s*\\)",
          "message": "Assert the exact error: vm.expectRevert(Bank.TooMuch.selector);"
        },
        {
          "type": "matchesRegex",
          "pattern": "vm\\.expectRevert\\([\\s\\S]*bank\\.withdraw\\(",
          "message": "expectRevert must come immediately before the reverting call bank.withdraw(...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "vm\\.deal\\(\\s*bob\\s*,\\s*1 ether\\s*\\)",
          "message": "Set a balance: vm.deal(bob, 1 ether);"
        },
        {
          "type": "matchesRegex",
          "pattern": "vm\\.warp\\(\\s*block\\.timestamp\\s*\\+\\s*1 days\\s*\\)",
          "message": "Move time: vm.warp(block.timestamp + 1 days);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+testFuzz_\\w+\\s*\\(\\s*uint256\\s+\\w+\\s*\\)\\s+public",
          "message": "Add function testFuzz_...(uint256 amt) public."
        },
        {
          "type": "matchesRegex",
          "pattern": "bound\\(\\s*amt\\s*,\\s*1\\s*,\\s*1e24\\s*\\)",
          "message": "Bound the fuzz input: amt = bound(amt, 1, 1e24);"
        }
      ]
    },
    "explanation": "<p>Fuzzing is where Solidity testing pulls ahead of hand-written cases: you state the property (&ldquo;a deposit of any amount credits exactly that amount&rdquo;) and the fuzzer hunts for the input that breaks it, including the edge values you would not have thought to type. <code>expectRevert</code> with a selector keeps negative tests honest, a test that just checks &ldquo;something reverted&rdquo; passes even when it reverts for the wrong reason. The capstone suite uses all of these.</p>"
  },
  {
    "id": 398,
    "title": "Guided Project: The Hardened Vault",
    "difficulty": "hard",
    "topic": "Level 10 Capstone",
    "level": 10,
    "xp": 25,
    "instructions": "<p>This is the contract the whole level has been building toward: a vault that takes ether and pays it back, written the way a real one would be. It pulls together every piece from the OpenZeppelin topic and the security work, you inherit <code>Ownable</code> and <code>ReentrancyGuard</code> instead of hand-rolling them, you keep <strong>per-user share accounting</strong> rather than raw balances so the vault could later distribute yield in proportion to holdings, and you add an <code>emergencyPause</code> switch that only the owner can flip. Custom errors replace <code>require</code> strings, every state change emits an event, and the external functions carry NatSpec.</p>\n<p>The mental model is a co-op: each member holds shares proportional to what they put in (here, one share per wei for simplicity), the manager can freeze the doors in an emergency but can never touch member funds, and the teller-and-passbook ordering from the reentrancy challenge still governs <code>withdraw</code>, update the share ledger first, send the ether last, and wrap it in <code>nonReentrant</code> as a second layer. This is a longer task than usual; work through the checklist in order.</p>\n<ul>\n  <li><strong>shares:</strong> an internal unit of account; <code>shares[user] / totalShares</code> is the user's fraction of the vault. One wei deposited mints one share.</li>\n  <li><strong>emergencyPause:</strong> a <code>bool</code> the owner toggles through <code>setPause</code>; <code>deposit</code> and <code>withdraw</code> revert while it is <code>true</code>.</li>\n  <li><strong>custom error:</strong> <code>error Paused();</code> and friends, declared once, raised with <code>revert Paused();</code>, cheaper and clearer than strings.</li>\n  <li><strong>NatSpec:</strong> <code>///</code> documentation comments (<code>@notice</code>, <code>@param</code>) that the compiler, explorers, and wallets surface to users.</li>\n  <li><strong>checks-effects-interactions:</strong> validate, then update <code>shares</code> and <code>totalShares</code>, and only then send ether, the ordering from the reentrancy challenge.</li>\n</ul>\n<p class=\"blueprint-line\"><code>contract Vault is Ownable, ReentrancyGuard {</code><br><code>&nbsp;&nbsp;mapping(address =&gt; uint256) public shares;</code><br><code>&nbsp;&nbsp;bool public emergencyPause;</code><br><code>&nbsp;&nbsp;function deposit() external payable nonReentrant { ... }</code><br><code>&nbsp;&nbsp;function withdraw(uint256 amount) external nonReentrant { ... }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>error Paused();\nerror InsufficientShares();\n\nfunction withdraw(uint256 amount) external nonReentrant {\n    if (emergencyPause) revert Paused();\n    if (shares[msg.sender] < amount) revert InsufficientShares();\n    shares[msg.sender] -= amount;          // effect first\n    totalShares -= amount;\n    (bool ok) = msg.sender.call{value: amount}(\"\");   // interaction last\n    if (!ok) revert TransferFailed();\n    emit Withdrawn(msg.sender, amount, amount);\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>PyDrop checks the source text only. This one deserves a real run: paste it into <code>remix.ethereum.org</code> (the OZ imports resolve automatically), deposit from two accounts, toggle <code>setPause</code> from a non-owner and watch it revert, then withdraw. The matching Foundry suite in the next challenge is where the attack cases get proven.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Import <code>Ownable</code> from <code>@openzeppelin/contracts/access/Ownable.sol</code> and <code>ReentrancyGuard</code> from <code>@openzeppelin/contracts/utils/ReentrancyGuard.sol</code>. Write <code>contract Vault is Ownable, ReentrancyGuard</code> with: <code>mapping(address =&gt; uint256) public shares;</code>, <code>uint256 public totalShares;</code>, <code>bool public emergencyPause;</code>; errors <code>Paused()</code>, <code>ZeroAmount()</code>, <code>InsufficientShares()</code>, <code>TransferFailed()</code>; events <code>Deposited(address indexed user, uint256 amount, uint256 sharesMinted)</code>, <code>Withdrawn(address indexed user, uint256 sharesBurned, uint256 amount)</code>, <code>PauseSet(bool paused)</code>; <code>constructor(address initialOwner) Ownable(initialOwner) {}</code>; <code>function setPause(bool p) external onlyOwner</code> that sets <code>emergencyPause = p</code> and emits <code>PauseSet(p)</code>; a NatSpec-documented <code>function deposit() external payable nonReentrant</code> that reverts <code>Paused()</code> if paused, reverts <code>ZeroAmount()</code> if <code>msg.value == 0</code>, then adds <code>msg.value</code> to <code>shares[msg.sender]</code> and <code>totalShares</code> and emits <code>Deposited</code>; a NatSpec-documented <code>function withdraw(uint256 amount) external nonReentrant</code> that reverts <code>Paused()</code> if paused, <code>ZeroAmount()</code> if <code>amount == 0</code>, <code>InsufficientShares()</code> if <code>shares[msg.sender] &lt; amount</code>, then subtracts <code>amount</code> from <code>shares[msg.sender]</code> and <code>totalShares</code> <em>before</em> doing <code>(bool ok) = msg.sender.call{value: amount}(\"\")</code>, reverts <code>TransferFailed()</code> if <code>!ok</code>, and emits <code>Withdrawn</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">deposit() with 1e18 wei</span><code class=\"io-val\">shares[caller] += 1e18; emit Deposited</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">withdraw(2e18) with 1e18 shares</span><code class=\"io-val\">reverts, InsufficientShares()</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">setPause(true) from non-owner</span><code class=\"io-val\">reverts, OwnableUnauthorizedAccount</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "import {Ownable} from \"@openzeppelin/contracts/access/Ownable.sol\";",
      "import {ReentrancyGuard} from \"@openzeppelin/contracts/utils/ReentrancyGuard.sol\";",
      "",
      "/// @title A hardened ether vault with per-user share accounting.",
      "contract Vault is Ownable, ReentrancyGuard {",
      "    mapping(address => uint256) public shares;",
      "    uint256 public totalShares;",
      "    bool public emergencyPause;",
      "",
      "    error Paused();",
      "    error ZeroAmount();",
      "    error InsufficientShares();",
      "    error TransferFailed();",
      "",
      "    event Deposited(address indexed user, uint256 amount, uint256 sharesMinted);",
      "    event Withdrawn(address indexed user, uint256 sharesBurned, uint256 amount);",
      "    event PauseSet(bool paused);",
      "",
      "    constructor(address initialOwner) Ownable(initialOwner) {}",
      "",
      "    /// @notice Owner-only emergency switch that freezes deposits and withdrawals.",
      "    /// @param p true to pause, false to resume.",
      "    function setPause(bool p) external onlyOwner {",
      "        emergencyPause = p;",
      "        emit PauseSet(p);",
      "    }",
      "",
      "    /// @notice Deposit ether and receive one share per wei.",
      "    function deposit() external payable nonReentrant {",
      "        if (emergencyPause) revert Paused();",
      "        if (msg.value == 0) revert ZeroAmount();",
      "        shares[msg.sender] += msg.value;",
      "        totalShares += msg.value;",
      "        emit Deposited(msg.sender, msg.value, msg.value);",
      "    }",
      "",
      "    /// @notice Burn `amount` shares and withdraw the matching ether.",
      "    /// @param amount number of shares to redeem.",
      "    function withdraw(uint256 amount) external nonReentrant {",
      "        if (emergencyPause) revert Paused();",
      "        if (amount == 0) revert ZeroAmount();",
      "        if (shares[msg.sender] < amount) revert InsufficientShares();",
      "        shares[msg.sender] -= amount;",
      "        totalShares -= amount;",
      "        (bool ok, ) = msg.sender.call{value: amount}(\"\");",
      "        if (!ok) revert TransferFailed();",
      "        emit Withdrawn(msg.sender, amount, amount);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {Ownable} from \"@openzeppelin/contracts/access/Ownable.sol\";\nimport {ReentrancyGuard} from \"@openzeppelin/contracts/utils/ReentrancyGuard.sol\";\n\n// Vault is Ownable, ReentrancyGuard: shares, pause switch, custom errors, events, NatSpec\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {Ownable} from \"@openzeppelin/contracts/access/Ownable.sol\";\nimport {ReentrancyGuard} from \"@openzeppelin/contracts/utils/ReentrancyGuard.sol\";\n\n/// @title A hardened ether vault with per-user share accounting.\ncontract Vault is Ownable, ReentrancyGuard {\n    mapping(address => uint256) public shares;\n    uint256 public totalShares;\n    bool public emergencyPause;\n\n    error Paused();\n    error ZeroAmount();\n    error InsufficientShares();\n    error TransferFailed();\n\n    event Deposited(address indexed user, uint256 amount, uint256 sharesMinted);\n    event Withdrawn(address indexed user, uint256 sharesBurned, uint256 amount);\n    event PauseSet(bool paused);\n\n    constructor(address initialOwner) Ownable(initialOwner) {}\n\n    /// @notice Owner-only emergency switch that freezes deposits and withdrawals.\n    /// @param p true to pause, false to resume.\n    function setPause(bool p) external onlyOwner {\n        emergencyPause = p;\n        emit PauseSet(p);\n    }\n\n    /// @notice Deposit ether and receive one share per wei.\n    function deposit() external payable nonReentrant {\n        if (emergencyPause) revert Paused();\n        if (msg.value == 0) revert ZeroAmount();\n        shares[msg.sender] += msg.value;\n        totalShares += msg.value;\n        emit Deposited(msg.sender, msg.value, msg.value);\n    }\n\n    /// @notice Burn `amount` shares and withdraw the matching ether.\n    /// @param amount number of shares to redeem.\n    function withdraw(uint256 amount) external nonReentrant {\n        if (emergencyPause) revert Paused();\n        if (amount == 0) revert ZeroAmount();\n        if (shares[msg.sender] < amount) revert InsufficientShares();\n        shares[msg.sender] -= amount;\n        totalShares -= amount;\n        (bool ok, ) = msg.sender.call{value: amount}(\"\");\n        if (!ok) revert TransferFailed();\n        emit Withdrawn(msg.sender, amount, amount);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "import {Ownable} from \"@openzeppelin/contracts/access/Ownable.sol\";",
          "message": "Import Ownable from @openzeppelin/contracts/access/Ownable.sol."
        },
        {
          "type": "codeContains",
          "value": "import {ReentrancyGuard} from \"@openzeppelin/contracts/utils/ReentrancyGuard.sol\";",
          "message": "Import ReentrancyGuard from @openzeppelin/contracts/utils/ReentrancyGuard.sol."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Vault\\s+is\\s+Ownable\\s*,\\s*ReentrancyGuard\\s*\\{",
          "message": "Declare: contract Vault is Ownable, ReentrancyGuard {"
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*public\\s+shares\\s*;",
          "message": "Declare: mapping(address => uint256) public shares;"
        },
        {
          "type": "matchesRegex",
          "pattern": "constructor\\s*\\(\\s*address\\s+initialOwner\\s*\\)\\s*Ownable\\s*\\(\\s*initialOwner\\s*\\)",
          "message": "constructor(address initialOwner) Ownable(initialOwner)."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+setPause\\s*\\(\\s*bool\\s+p\\s*\\)\\s+external\\s+onlyOwner",
          "message": "function setPause(bool p) external onlyOwner."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+deposit\\s*\\(\\s*\\)\\s+external\\s+payable\\s+nonReentrant",
          "message": "function deposit() external payable nonReentrant."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+withdraw\\s*\\(\\s*uint256\\s+amount\\s*\\)\\s+external\\s+nonReentrant",
          "message": "function withdraw(uint256 amount) external nonReentrant."
        },
        {
          "type": "matchesRegex",
          "pattern": "shares\\[msg\\.sender\\]\\s*-=\\s*amount\\s*;[\\s\\S]*msg\\.sender\\.call\\{\\s*value\\s*:\\s*amount",
          "message": "Burn shares BEFORE the external call (checks-effects-interactions)."
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+Withdrawn\\s*\\(\\s*address\\s+indexed\\s+user\\s*,\\s*uint256\\s+sharesBurned\\s*,\\s*uint256\\s+amount\\s*\\)",
          "message": "Declare: event Withdrawn(address indexed user, uint256 sharesBurned, uint256 amount);"
        }
      ]
    },
    "explanation": "<p>Notice how little of this contract is new logic: the deposit and withdraw arithmetic is a few lines, and the rest is discipline, inherited guards, custom errors, events on every mutation, a pause lever, docs. That ratio is what production Solidity looks like. The next challenge writes the test suite that proves each of these defences actually holds, including one test per attack.</p>"
  },
  {
    "id": 399,
    "title": "Guided Project: The Vault Test Suite",
    "difficulty": "hard",
    "topic": "Level 10 Capstone",
    "level": 10,
    "xp": 25,
    "instructions": "<p>A contract is only as trustworthy as the suite that proves its guarantees. This is the Foundry suite for the <code>Vault</code> from the previous challenge: it deploys the vault in <code>setUp()</code>, funds two users, checks the happy path, then runs one test per defence that proves the attack fails. Each negative test is named <code>test_RevertWhen_&hellip;</code> so the report reads as a list of things that cannot happen.</p>\n<ul>\n  <li><strong>happy path:</strong> <code>test_depositThenWithdraw</code>, deposit, see shares credited, withdraw, see shares back to zero.</li>\n  <li><strong>test_RevertWhen_NotOwnerPauses:</strong> a pranked non-owner calls <code>setPause</code>; <code>vm.expectRevert()</code> catches the <code>Ownable</code> rejection.</li>\n  <li><strong>test_RevertWhen_WithdrawMoreThanShares:</strong> deposit one ether of shares, then <code>vm.expectRevert(Vault.InsufficientShares.selector)</code> before withdrawing two.</li>\n  <li><strong>test_RevertWhen_Reentrant:</strong> deploy an <code>Attacker</code> whose <code>receive()</code> calls <code>withdraw</code> again; the outer call reverts, because the share ledger is already zeroed and <code>nonReentrant</code> is set.</li>\n  <li><strong>Attacker contract:</strong> a helper the test deploys, funded with <code>vm.deal</code>, that deposits then withdraws to trigger its own <code>receive()</code>.</li>\n</ul>\n<p class=\"blueprint-line\"><code>vault = new Vault(address(this));</code><br><code>vm.deal(alice, 10 ether);</code><br><code>vm.prank(alice); vm.expectRevert(); vault.setPause(true);</code><br><code>vm.expectRevert(Vault.InsufficientShares.selector); vault.withdraw(2 ether);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function test_RevertWhen_Reentrant() public {\n    Attacker a = new Attacker(vault);\n    vm.deal(address(a), 1 ether);\n    vm.expectRevert();       // the re-entrant withdraw makes attack() revert\n    a.attack();\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>PyDrop matches text and cannot run <code>forge</code>. This suite expects challenge 399's <code>Vault.sol</code> in <code>src/</code>: run <code>forge test -vvv</code> in that project to watch the happy path pass and all three attack tests revert exactly where they should.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write the suite: <code>import {Test} from \"forge-std/Test.sol\";</code> and <code>import {Vault} from \"../src/Vault.sol\";</code>. Add a <code>contract Attacker</code> holding a <code>Vault</code> set in <code>constructor(Vault v)</code>, with <code>function attack() external</code> that does <code>vault.deposit{value: address(this).balance}();</code> then <code>vault.withdraw(1 ether);</code>, and <code>receive() external payable</code> that calls <code>vault.withdraw(1 ether);</code>. Then <code>contract VaultTest is Test</code> with state <code>Vault vault; address alice; address bob;</code> and <code>function setUp() public</code> that runs <code>vault = new Vault(address(this));</code>, <code>alice = makeAddr(\"alice\");</code>, <code>bob = makeAddr(\"bob\");</code>, <code>vm.deal(alice, 10 ether);</code>, <code>vm.deal(bob, 10 ether);</code>. Add <code>function test_depositThenWithdraw() public</code> that pranks <code>alice</code> to <code>vault.deposit{value: 1 ether}()</code>, asserts <code>vault.shares(alice) == 1 ether</code>, pranks <code>alice</code> to <code>vault.withdraw(1 ether)</code>, asserts <code>vault.shares(alice) == 0</code>. Add <code>function test_RevertWhen_NotOwnerPauses() public</code> that pranks <code>alice</code>, does <code>vm.expectRevert();</code>, then <code>vault.setPause(true);</code>. Add <code>function test_RevertWhen_WithdrawMoreThanShares() public</code> that pranks <code>alice</code> to deposit <code>1 ether</code>, pranks <code>alice</code> again, does <code>vm.expectRevert(Vault.InsufficientShares.selector);</code>, then <code>vault.withdraw(2 ether);</code>. Add <code>function test_RevertWhen_Reentrant() public</code> that deploys <code>Attacker a = new Attacker(vault);</code>, does <code>vm.deal(address(a), 1 ether);</code>, <code>vm.expectRevert();</code>, then <code>a.attack();</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">test_depositThenWithdraw</span><code class=\"io-val\">passes: shares go 0 &rarr; 1e18 &rarr; 0</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">test_RevertWhen_Reentrant</span><code class=\"io-val\">passes: the nested withdraw reverts, so attack() reverts</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "import {Test} from \"forge-std/Test.sol\";",
      "import {Vault} from \"../src/Vault.sol\";",
      "",
      "contract Attacker {",
      "    Vault public vault;",
      "",
      "    constructor(Vault v) {",
      "        vault = v;",
      "    }",
      "",
      "    function attack() external {",
      "        vault.deposit{value: address(this).balance}();",
      "        vault.withdraw(1 ether);",
      "    }",
      "",
      "    receive() external payable {",
      "        vault.withdraw(1 ether);",
      "    }",
      "}",
      "",
      "contract VaultTest is Test {",
      "    Vault vault;",
      "    address alice;",
      "    address bob;",
      "",
      "    function setUp() public {",
      "        vault = new Vault(address(this));",
      "        alice = makeAddr(\"alice\");",
      "        bob = makeAddr(\"bob\");",
      "        vm.deal(alice, 10 ether);",
      "        vm.deal(bob, 10 ether);",
      "    }",
      "",
      "    function test_depositThenWithdraw() public {",
      "        vm.prank(alice);",
      "        vault.deposit{value: 1 ether}();",
      "        assertEq(vault.shares(alice), 1 ether);",
      "",
      "        vm.prank(alice);",
      "        vault.withdraw(1 ether);",
      "        assertEq(vault.shares(alice), 0);",
      "    }",
      "",
      "    function test_RevertWhen_NotOwnerPauses() public {",
      "        vm.prank(alice);",
      "        vm.expectRevert();",
      "        vault.setPause(true);",
      "    }",
      "",
      "    function test_RevertWhen_WithdrawMoreThanShares() public {",
      "        vm.prank(alice);",
      "        vault.deposit{value: 1 ether}();",
      "        vm.prank(alice);",
      "        vm.expectRevert(Vault.InsufficientShares.selector);",
      "        vault.withdraw(2 ether);",
      "    }",
      "",
      "    function test_RevertWhen_Reentrant() public {",
      "        Attacker a = new Attacker(vault);",
      "        vm.deal(address(a), 1 ether);",
      "        vm.expectRevert();",
      "        a.attack();",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {Test} from \"forge-std/Test.sol\";\nimport {Vault} from \"../src/Vault.sol\";\n\n// Attacker helper + VaultTest: happy path plus one revert test per defence\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport {Test} from \"forge-std/Test.sol\";\nimport {Vault} from \"../src/Vault.sol\";\n\ncontract Attacker {\n    Vault public vault;\n\n    constructor(Vault v) {\n        vault = v;\n    }\n\n    function attack() external {\n        vault.deposit{value: address(this).balance}();\n        vault.withdraw(1 ether);\n    }\n\n    receive() external payable {\n        vault.withdraw(1 ether);\n    }\n}\n\ncontract VaultTest is Test {\n    Vault vault;\n    address alice;\n    address bob;\n\n    function setUp() public {\n        vault = new Vault(address(this));\n        alice = makeAddr(\"alice\");\n        bob = makeAddr(\"bob\");\n        vm.deal(alice, 10 ether);\n        vm.deal(bob, 10 ether);\n    }\n\n    function test_depositThenWithdraw() public {\n        vm.prank(alice);\n        vault.deposit{value: 1 ether}();\n        assertEq(vault.shares(alice), 1 ether);\n\n        vm.prank(alice);\n        vault.withdraw(1 ether);\n        assertEq(vault.shares(alice), 0);\n    }\n\n    function test_RevertWhen_NotOwnerPauses() public {\n        vm.prank(alice);\n        vm.expectRevert();\n        vault.setPause(true);\n    }\n\n    function test_RevertWhen_WithdrawMoreThanShares() public {\n        vm.prank(alice);\n        vault.deposit{value: 1 ether}();\n        vm.prank(alice);\n        vm.expectRevert(Vault.InsufficientShares.selector);\n        vault.withdraw(2 ether);\n    }\n\n    function test_RevertWhen_Reentrant() public {\n        Attacker a = new Attacker(vault);\n        vm.deal(address(a), 1 ether);\n        vm.expectRevert();\n        a.attack();\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "import {Test} from \"forge-std/Test.sol\";",
          "message": "Import {Test} from \"forge-std/Test.sol\";"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+VaultTest\\s+is\\s+Test\\s*\\{",
          "message": "Declare: contract VaultTest is Test {"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+setUp\\s*\\(\\s*\\)\\s+public",
          "message": "Add function setUp() public that deploys the vault and funds users."
        },
        {
          "type": "matchesRegex",
          "pattern": "vm\\.deal\\(\\s*alice\\s*,",
          "message": "Fund a user: vm.deal(alice, 10 ether);"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+test_depositThenWithdraw\\s*\\(\\s*\\)\\s+public",
          "message": "Add the happy path: function test_depositThenWithdraw() public."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+test_RevertWhen_NotOwnerPauses\\s*\\(\\s*\\)\\s+public",
          "message": "Add function test_RevertWhen_NotOwnerPauses() public."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+test_RevertWhen_WithdrawMoreThanShares\\s*\\(\\s*\\)\\s+public",
          "message": "Add function test_RevertWhen_WithdrawMoreThanShares() public."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+test_RevertWhen_Reentrant\\s*\\(\\s*\\)\\s+public",
          "message": "Add function test_RevertWhen_Reentrant() public."
        },
        {
          "type": "matchesRegex",
          "pattern": "vm\\.expectRevert\\(\\s*Vault\\.InsufficientShares\\.selector\\s*\\)",
          "message": "Assert the exact error: vm.expectRevert(Vault.InsufficientShares.selector);"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Attacker\\b",
          "message": "Add the contract Attacker helper with a re-entrant receive()."
        }
      ]
    },
    "explanation": "<p>The pattern to carry out of this level: for every security property a contract claims, there is a test that would fail if the property were removed. Delete the <code>nonReentrant</code> modifier and <code>test_RevertWhen_Reentrant</code> should start failing; loosen the <code>Ownable</code> check and <code>test_RevertWhen_NotOwnerPauses</code> should. A suite that keeps passing when you break the contract was never testing the thing you cared about.</p>"
  }
];
