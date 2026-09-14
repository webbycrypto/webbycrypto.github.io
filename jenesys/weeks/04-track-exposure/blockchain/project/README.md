# Project: deploy and call a trivial smart contract

[← Back to Week 4: Track exposure](../../README.md)

This is the Days 3-4 deliverable: write a trivial Solidity contract, deploy it to a public testnet with the Ape framework, then read and change its state from a plain Python script using web3.py. There's no separate solutions file. This walkthrough is the full path from nothing to a working, deployed contract, and every file it describes is already sitting in this folder, complete and ready to run once you fill in your own address, RPC URL, and key.

Read the notes in `../notes/` first if you haven't (private keys, transactions and gas, testnets, and smart contracts). This walkthrough assumes that vocabulary and only re-explains things in the context of the actual commands you're running.

If you haven't already, work through `../exercises/00-guided-write-greeter.md` before Step 2 below. It has you type the contract yourself, one piece at a time, compiling after each one, before you've read any explanation of the finished version. Step 2 below is then a second pass over the same contract, useful for extra depth, not your first exposure to it.

Everything here targets Sepolia, the standard public Ethereum testnet, using the RPC endpoint and node provider account (Infura, Alchemy, or similar) you set up in Week 0. If your provider gives you a different testnet, the same steps apply; just swap the network name.

## Step 0: generate a testnet keypair

You need an address and a private key to work with before anything else. Rather than pulling one out of thin air, generate a real one, so you see exactly where these numbers come from. In a Python shell:

```python
from eth_account import Account
acct = Account.create()
print("Address:", acct.address)
print("Private key:", acct.key.hex())
```

(`eth_account` is already installed; it's a dependency of `web3`, which you installed in Week 0.)

Write both values down somewhere temporarily safe, like a password manager or a local, git-ignored text file; you'll need the private key twice in this walkthrough, once for Ape and once directly in a Python script. This is also the moment to actually feel what the private keys note was describing: that private key is now the one and only thing standing between "you control this address" and "you don't." Nothing you did just now registered this address with anyone. It's pure math, and it exists whether or not you ever use it.

## Step 1: fund the address from a faucet

Go to a Sepolia faucet (your node provider's dashboard usually links to one; searching "Sepolia faucet" also works) and paste in the **address** from Step 0, never the private key, to receive some free test ETH. This test ETH is what pays for gas when you deploy and interact with the contract below. Give it a minute or two to arrive; testnets aren't always instant.

## Step 2: set up the Ape project

Ape expects a `contracts/` folder for Solidity source and a `scripts/` folder for runnable Python scripts. This folder already has both, along with a minimal `ape-config.yaml`. (Ape also has an `ape init` command that scaffolds this structure interactively if you're ever starting from a blank folder.)

Look at `contracts/Greeter.sol`. It's short. Line by line:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
```

The first line is a license marker Solidity tooling expects to see; MIT is a common permissive open-source license and a safe default for learning code. The second line pins which version of the Solidity compiler this file is written for; `^0.8.19` means "0.8.19 or any later 0.8.x version," which protects the file from silently breaking if the compiler changes behavior in a future major version.

```solidity
contract Greeter {
    string private greeting;
```

`contract` is Solidity's version of a class. `string private greeting;` declares a state variable: a piece of data that lives permanently in this contract's own storage on the blockchain once deployed, not just for the duration of one function call. `private` means only this contract's own code can access it directly (nothing to do with blockchain privacy in general; anyone can still ultimately read on-chain storage with the right tools, but only through the functions this contract chooses to expose, like `getGreeting` below).

```solidity
    event GreetingChanged(string oldGreeting, string newGreeting, address changedBy);
```

An event is a log entry a transaction can emit. It costs a little gas to emit one, but far less than storage, and it's specifically designed to be efficiently watchable from the outside. Off-chain code (a Python script using web3.py) can watch for `GreetingChanged` events instead of having to constantly poll "has the greeting changed?" This week's project doesn't listen for it yet; Week 6 builds directly on this exact pattern (reacting to on-chain events as they happen), so the contract emits one now to set that up.

```solidity
    constructor(string memory initialGreeting) {
        greeting = initialGreeting;
    }
```

The constructor runs exactly once, at the moment of deployment, and never again. `memory` here means this parameter is temporary data that only exists while this function call is running, as opposed to `greeting` itself, which lives in permanent contract storage. That memory/storage distinction is Solidity-specific and doesn't map cleanly onto anything in Python; for now, the rule of thumb is that function parameters and local variables holding strings or arrays typically need to say `memory`, and Week 5 covers this in more depth once you're writing more complex contracts.

```solidity
    function getGreeting() public view returns (string memory) {
        return greeting;
    }
```

`view` marks this function as read-only: it looks at stored data but never changes it. That has a real, practical consequence: calling a `view` function costs no gas and needs no signed transaction, because no node has to permanently update anything. It's answered directly by whichever node you ask.

```solidity
    function setGreeting(string memory newGreeting) public {
        string memory oldGreeting = greeting;
        greeting = newGreeting;
        emit GreetingChanged(oldGreeting, newGreeting, msg.sender);
    }
}
```

This function has no `view`, because it changes stored data (`greeting = newGreeting;`), so calling it requires a real, signed, gas-paying transaction. `msg.sender` is filled in automatically by the network as whichever address actually signed and sent that transaction; there's no way for a caller to lie about who they are here, because the network itself checked the signature before running this code at all.

## Step 3: compile

From inside this `project/` folder, in a terminal:

```
ape compile
```

This runs the Solidity compiler against everything in `contracts/`, turning `Greeter.sol` into bytecode the network can actually run, plus an ABI describing its functions (more on the ABI in Step 6). Ape caches the result; you only need to re-run this after changing the contract's source.

## Step 4: import your test account into Ape

```
ape accounts import testnet-key
```

Ape will prompt you to paste the private key from Step 0, then to set a local passphrase. This encrypts the key and stores it on your own machine (inside Ape's own config folder), not inside this project, and never inside anything git tracks. From now on, whenever a script asks Ape to use the account named `testnet-key`, Ape will prompt you for that passphrase before it signs anything, so a private key never needs to sit in plain text in any file you write.

## Step 5: deploy

Open `scripts/deploy.py`. It loads the account you just imported, then calls `account.deploy(project.Greeter, "Hello from Jenesys!")`, which builds the deployment transaction, signs it with your test account, sends it, waits for it to be confirmed, and hands back an object you can immediately call read functions on.

Run it:

```
ape run deploy --network ethereum:sepolia:<your-rpc-url>
```

Substitute `<your-rpc-url>` with the actual HTTPS endpoint from your node provider account (Week 0). Ape's `--network` flag accepts a raw URL directly in the provider slot like this, which avoids needing to install and configure a separate provider plugin just for this trivial example. (If your installed version of Ape doesn't accept a URL this way, install a node provider plugin instead, for example `ape plugins install infura` or `ape plugins install alchemy`, and follow that plugin's own setup instructions for where it expects your provider credentials.)

Ape will ask for the passphrase you set in Step 4, then print the deployed contract's address. Write that address down; you'll need it in Step 7.

## Step 6: export the ABI

An ABI (Application Binary Interface) is a plain description of what functions a contract has, what arguments each one expects, and what it returns. This matters because a contract's compiled bytecode, sitting on the blockchain, doesn't carry readable function names or type information with it. Without an ABI, a tool like web3.py would have no way to know that this contract even has a function called `getGreeting`, let alone how to correctly format a call to it. Ape already knows the ABI internally, from compiling in Step 3; `scripts/get_abi.py` just writes it out to a plain JSON file so a different library, web3.py, can read it too.

```
ape run get_abi --network ethereum:sepolia:<your-rpc-url>
```

This writes `greeter_abi.json` into this `project/` folder, right next to `interact.py`.

## Step 7: fill in and run the web3.py script

Open `interact.py`. Replace `CONTRACT_ADDRESS` with the address Step 5 printed. Set the two environment variables it needs (same idea as Week 0's API key setup):

**macOS/Linux:**
```
export WEB3_PROVIDER_URI="your-rpc-url"
export TESTNET_PRIVATE_KEY="your-private-key-from-step-0"
```

**Windows (PowerShell):**
```
$env:WEB3_PROVIDER_URI = "your-rpc-url"
$env:TESTNET_PRIVATE_KEY = "your-private-key-from-step-0"
```

Then run it:

```
python interact.py
```

Walk through what it's doing:

- Connects directly to the same RPC endpoint you used to deploy, via `Web3.HTTPProvider`, and checks that the connection actually worked.
- Loads the contract using `w3.eth.contract(address=..., abi=...)`. From this point on, `greeter.functions.getGreeting()` and `greeter.functions.setGreeting(...)` exist as real, callable Python methods, entirely because the ABI told web3.py they exist and what shape to expect.
- Calls `getGreeting()` with `.call()`, a free, read-only request, and prints the current greeting.
- Loads your account from the raw private key (`w3.eth.account.from_key`). This is the same account Ape has been using, but here you're handling the raw key text directly yourself, at a lower level than Ape's encrypted account management, which is exactly why it only ever comes from an environment variable and never appears written in this file.
- Builds a `setGreeting` transaction, including `chainId`, which ties a signed transaction to one specific network so it can't be replayed somewhere else, signs it locally with your key, and broadcasts the raw signed bytes with `send_raw_transaction`.
- Waits for the transaction to be mined with `wait_for_transaction_receipt`, then calls `getGreeting()` again to prove the change actually happened.

You should see the greeting print once as `"Hello from Jenesys!"` (whatever Step 5's deploy script set), then, after the transaction confirms, print again as `"Hello from web3.py!"`.

## What to notice

- You just used two different tools to control the exact same account: Ape, which kept the private key encrypted on disk and asked for a passphrase, and web3.py, which required you to hand it the raw key text yourself. Both are legitimate; Ape's approach is safer for real use, and web3.py's lower-level approach is exactly what a backend service needs when it's the one holding and using a key on its own, with no human around to type a passphrase, which is precisely what Week 6's managed-key service builds on.
- The deploy transaction and the `setGreeting` transaction both cost testnet gas, paid from the balance the faucet gave you in Step 1. Run `getGreeting()` a few more times on its own and notice it costs nothing to call repeatedly; only the state-changing call did.
- If `interact.py` fails on the `raw_transaction` line with an `AttributeError`, that's the exact version-mismatch case flagged in a comment in that file: try `signed_transaction.rawTransaction` instead. This is real API drift between versions of web3.py, not a mistake in your setup, and reasoning through a mismatch like this, docs versus what's actually installed, is the debugging skill Foundations was training you for.
