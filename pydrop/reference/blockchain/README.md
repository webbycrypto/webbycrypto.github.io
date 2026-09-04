# PyDrop Reference Blockchain

## What this is

The Level 6 capstone, built for real as one small project instead of typed into
separate challenge boxes. Same logic you already wrote in PyDrop, organized the
way an actual project would be: one file per concept, run from your own terminal.

This README is a build-along. It walks the four files in the order you would
write them, explains each blockchain idea at the point the code first uses it,
and has you run what you have so far at the end of every stage. Read it start to
finish once. After that it doubles as a reference for when a PyDrop challenge is
not clicking: find the piece here, sitting inside a working whole.

| File | What it holds | Stage |
|---|---|---|
| `wallet.py` | A key pair, an address, transaction signing | 1 |
| `blockchain.py` | `Block`, `Blockchain`, validation, `resolve_chains` | 2 |
| `demo.py` | A plain script exercising stages 1 and 2, no server | 3 |
| `node.py` | The FastAPI service: ledger routes and peer routes | 4 |

The files already exist in this folder. You are not typing them out; the point
is to read each one with its explanation beside it, and run it.

## Stage 0. Set up (once)

**What you need:** Python 3.9 or newer (check with `python --version`; on some
systems the command is `python3`) and a terminal. Nothing else needs to be
installed globally; the packages this project uses go into this folder in the
steps below.

**Move into this folder.** From wherever you cloned or downloaded PyDrop:

```bash
cd reference/blockchain
```

**Create a virtual environment.** This is a private copy of Python that lives in
this folder, so the packages it needs do not clash with anything else on your
machine:

```bash
python -m venv venv
```

**Activate it.** This points your terminal at that private copy. Use the line
that matches your terminal:

```bash
source venv/Scripts/activate     # Windows: Git Bash
venv\Scripts\activate            # Windows: PowerShell or cmd
source venv/bin/activate         # macOS / Linux
```

You will know it worked because your prompt now starts with `(venv)`.

**Install the four packages** the project depends on (`fastapi`, `uvicorn`,
`pynacl`, `requests`):

```bash
pip install -r requirements.txt
```

**Confirm the install took:**

```bash
python -c "import fastapi, uvicorn, nacl, requests; print('all four imported OK')"
```

You run this stage once. Coming back in a new terminal later, just re-run the
matching `activate` line first, since a new terminal always starts outside the
venv.

## Stage 1. `wallet.py`: who signed this?

### The idea

A blockchain has no usernames or passwords. Every account is a **key pair**:

- a **private key** (the signing key) that only you hold, and
- a **public key** (the verify key) that anyone can have.

You **sign** a message with the private key. Anyone holding the public key can
then **verify** the signature was made by the matching private key, without ever
seeing that private key. Think of a wax seal: you own the stamp, everyone else
can recognise its imprint, nobody else can press a convincing fake.

This is **asymmetric** cryptography, the real thing PyNaCl gives you, not the
HMAC stand-in from Level 5 (which used one shared secret for both sides).

### The address

You do not hand people your public key directly. You hand them an **address**: a
hash of the public key, shortened. Two properties fall straight out of that:

- It is **deterministic.** The same key pair always derives the same address.
- It **reveals nothing.** A hash does not run backwards into the public key, let
  alone the private one.

Real chains do exactly this with a different hash: Ethereum takes the last 20
bytes of `keccak256(pubkey)`, Algorand uses base32 of the pubkey plus a
checksum. The shape is identical.

### The code

`wallet.py` in full:

```python
import hashlib

from nacl.signing import SigningKey


class Wallet:
    def __init__(self):
        self.signing_key = SigningKey.generate()
        self.verify_key = self.signing_key.verify_key
        self.address = hashlib.sha256(bytes(self.verify_key)).hexdigest()[:16]

    def sign_transaction(self, recipient, amount):
        message = f"{self.address}{recipient}{amount}".encode()
        signature = self.signing_key.sign(message).signature
        return {
            "sender": self.address,
            "recipient": recipient,
            "amount": amount,
            "signature": signature,
            "verify_key": bytes(self.verify_key),
        }
```

`__init__` generates a fresh key pair on every call (so every run gets new
addresses), keeps the verify key, and derives the address from it.

`sign_transaction` builds one exact string out of the sender, recipient, and
amount, signs the bytes of that string, and returns a dict holding **everything a
stranger needs to check it**: the three fields, the signature, and the public
key. Nothing in that dict is secret. This is a **detached signature**: the
signature sits next to the message rather than wrapped around it, so a verifier
rebuilds the same message from the fields and checks the signature against it
explicitly.

### Try it

```bash
python -c "from wallet import Wallet; w = Wallet(); print(w.address); print(w.sign_transaction('bob', 10))"
```

You get a 16-character address and the transaction dict. Run it again: a
different address, because the key pair is new.

## Stage 2. `blockchain.py`: why can't I just edit a block?

### A block

A block is four fields:

| Field | What it is |
|---|---|
| `index` | Its position in the chain, `0` for the first |
| `data` | A plain string, or a signed transaction dict from stage 1 |
| `previous_hash` | The hash of the block before it |
| `hash` | SHA-256 over the three fields above |

The `hash` is computed from the other three. Change the data, the index, or the
previous_hash, and the stored `hash` no longer matches a fresh recompute. That is
**tamper-evidence**: you cannot quietly alter a block, because the block carries
proof of its own contents.

### The chain

Each block stores the **previous** block's hash. So the blocks are not just a
list, they are a linked sequence where every entry commits to the one before it.
Tamper with block 3 and its hash changes; but block 4 stored the *old* hash of
block 3 as its `previous_hash`, so block 4's link is broken now too, and so is
every block after it. One edit anywhere breaks the chain from that point on. That
is the "chain" in blockchain.

### Validating

`is_valid()` walks every block and checks three things:

1. **Does the block's stored hash still match a recompute?** Catches a changed
   field inside the block.
2. **Does `previous_hash` match the actual previous block's hash?** Catches a
   block inserted, removed, or reordered.
3. **If the data is a signed transaction, does the signature verify?** Catches a
   forged or altered transaction, using the public key carried in the transaction
   itself.

### Picking a winner

When two nodes disagree about the chain, `resolve_chains` applies the
**longest-valid-chain rule**:

- An invalid chain never wins, no matter how long it is.
- Between two valid chains, the longer one wins.
- A tie goes to the first chain.

"Longer" stands in for "more work went into it". In a real proof-of-work chain
that is literal; this project skips mining, so length is the only signal left.

### The code

`blockchain.py` in full:

```python
import hashlib

from nacl.exceptions import BadSignatureError
from nacl.signing import VerifyKey


class Block:
    def __init__(self, index, data, previous_hash):
        self.index = index
        self.data = data
        self.previous_hash = previous_hash
        self.hash = self.compute_hash()

    def compute_hash(self):
        contents = f"{self.index}{self.data}{self.previous_hash}"
        return hashlib.sha256(contents.encode()).hexdigest()


class Blockchain:
    def __init__(self):
        self.chain = [Block(0, "Genesis", "0")]

    def add_block(self, data):
        prev = self.chain[-1]
        self.chain.append(Block(prev.index + 1, data, prev.hash))

    def is_valid(self):
        for i in range(len(self.chain)):
            block = self.chain[i]
            if block.hash != block.compute_hash():
                return False
            if i > 0 and block.previous_hash != self.chain[i - 1].hash:
                return False
            if isinstance(block.data, dict) and "signature" in block.data:
                if not _verify_transaction(block.data):
                    return False
        return True


def _verify_transaction(transaction):
    message = f"{transaction['sender']}{transaction['recipient']}{transaction['amount']}".encode()
    verify_key = VerifyKey(transaction["verify_key"])
    try:
        verify_key.verify(message, transaction["signature"])
        return True
    except BadSignatureError:
        return False


def resolve_chains(chain_a, chain_b, is_valid_fn):
    valid_a = is_valid_fn(chain_a)
    valid_b = is_valid_fn(chain_b)
    if valid_a and not valid_b:
        return chain_a
    if valid_b and not valid_a:
        return chain_b
    return chain_a if len(chain_a) >= len(chain_b) else chain_b
```

`Block.compute_hash` joins the three fields into one string and hashes it.
`Blockchain.__init__` starts every chain with a fixed **genesis block** (index
`0`, data `"Genesis"`, previous_hash `"0"`) so block 1 has something to link to.
`add_block` reads the last block and appends a new one carrying `last.index + 1`
and `last.hash`.

`is_valid` is the three checks above, in a loop. `_verify_transaction` rebuilds
the signed message from `sender`/`recipient`/`amount` and asks PyNaCl to verify
it against the signature and public key in the dict; a `BadSignatureError` means
the transaction was altered after signing, so the chain is invalid.

`resolve_chains` takes two chains and an `is_valid_fn` (a function that reports
whether a chain is valid) and returns the winner by the rule above.

### Try it

```bash
python -c "
from blockchain import Blockchain
from wallet import Wallet
c = Blockchain()
c.add_block(Wallet().sign_transaction('bob', 10))
print('valid:', c.is_valid())
c.chain[1].data['amount'] = 999
print('after tampering:', c.is_valid())
"
```

`valid: True`, then `after tampering: False`. Changing a field that the block
hash was computed over is enough to fail check 1 on its own; the
signed-transaction check (check 3) is the one `demo.py` isolates for you next.

## Stage 3. `demo.py`: the whole core, no server

`demo.py` is stages 1 and 2 wired together end to end, with nothing running in
the background. Run it, and read the script itself alongside the output: it is
short, and every line maps to something you already wrote in PyDrop.

```bash
python demo.py
```

What you should see, in order:

1. Two wallets get created, each printing its address. Run it again and the
   addresses are different every time, since a wallet's key pair is generated
   fresh each run.
2. A chain gets built with one real, PyNaCl-signed transaction and one plain
   string block, and `is_valid()` comes back `True`: every block's hash lines up,
   every link is correct, and the signed transaction's signature checks out.
3. An attack. The script takes that signed transaction, changes its amount, and
   puts the tampered version into a fresh chain. `is_valid()` comes back `False`.
   Same "watch a forgery get caught for real" moment as the Attack challenge,
   outside the sandbox.
4. Two competing chains get built, one shorter and honest, one longer but
   tampered after the fact. `resolve_chains` picks the shorter one, because an
   invalid chain never wins no matter how long.

If any of those four do not match what you see, it is the setup rather than the
logic (this exact code was verified working before it was committed). See "If
something's not working" near the end.

## Stage 4. `node.py`: a REST API around the chain

### REST, briefly

A **REST API** exposes a system over HTTP as a set of **routes**, each a URL plus
a **method**:

- **GET** reads something and changes nothing.
- **POST** creates something or triggers an action.

FastAPI turns a plain function into a route with a decorator. `@app.get("/chain")`
above `async def get_chain(): ...` means "when a GET request hits `/chain`, run
this function, and send its return value back as JSON."

### The stablecoin ledger

`node.py` keeps a `balances` dict, and **every balance change is also written to
the chain as a block**. `/mint` credits an account and logs `"mint alice 100.0"`;
`/transfer` moves an amount and logs `"transfer alice bob 10.0"`. Reading a
balance is the fast path (just look in the dict), but the full history is always
reconstructable from the chain. That is **event sourcing**: store what happened,
not only where you ended up.

### Nodes and broadcast

Run `node.py` twice on two ports and you have **two independent blockchains**,
each with its own `chain`, `balances`, and `peers` list. They stay in sync only
because they tell each other about changes:

- `/network/register` adds a peer URL to this node's list. It is **one
  directional**: registering B with A does not register A with B.
- `broadcast_block` POSTs a new block to every peer's `/receive_block` route.
- `/receive_block` appends whatever block it is handed.

So minting on node A appends a block locally, then broadcasts it; nodes B and C
receive it and append the same block. No central chain, just copies kept in
agreement.

### The routes

| Method | Path | What it does |
|---|---|---|
| GET | `/chain` | Chain length, and whether it still validates |
| POST | `/blocks` | Add a plain-string block, then broadcast it |
| POST | `/mint` | Credit `account` by `amount`, log it as a block, broadcast |
| POST | `/transfer` | Move `amount` from `sender` to `recipient`, log, broadcast |
| GET | `/balance/{account}` | That account's current balance |
| POST | `/network/register` | Add `peer_url` to this node's peer list |
| GET | `/network/peers` | This node's current peer list |
| POST | `/receive_block` | Append a block a peer broadcast to us |

### The code

`node.py` in full:

```python
import requests
from fastapi import FastAPI
from pydantic import BaseModel

from blockchain import Blockchain

app = FastAPI(title="PyDrop Reference Blockchain Node")

chain = Blockchain()
balances = {}
peers = []


class NewBlock(BaseModel):
    data: str


def broadcast_block(block_data, peer_urls):
    """Tell every known peer about a new block. One unreachable peer
    doesn't stop the others from being notified."""
    for url in peer_urls:
        try:
            requests.post(f"{url}/receive_block", params=block_data, timeout=2)
        except requests.exceptions.RequestException:
            pass


@app.get("/chain")
async def get_chain():
    return {"length": len(chain.chain), "valid": chain.is_valid()}


@app.post("/blocks")
async def add_block(block: NewBlock):
    chain.add_block(block.data)
    broadcast_block({"data": block.data}, peers)
    return {"added": block.data}


@app.post("/mint")
async def mint(account: str, amount: float):
    balances[account] = balances.get(account, 0) + amount
    chain.add_block(f"mint {account} {amount}")
    broadcast_block({"data": f"mint {account} {amount}"}, peers)
    return {"balance": balances[account]}


@app.post("/transfer")
async def transfer(sender: str, recipient: str, amount: float):
    balances[sender] -= amount
    balances[recipient] = balances.get(recipient, 0) + amount
    chain.add_block(f"transfer {sender} {recipient} {amount}")
    broadcast_block({"data": f"transfer {sender} {recipient} {amount}"}, peers)
    return {"sender_balance": balances[sender]}


@app.get("/balance/{account}")
async def get_balance(account: str):
    return {"account": account, "balance": balances.get(account, 0)}


@app.post("/network/register")
async def register_peer(peer_url: str):
    if peer_url not in peers:
        peers.append(peer_url)
    return {"peers": peers}


@app.get("/network/peers")
async def get_peers():
    return {"peers": peers}


@app.post("/receive_block")
async def receive_block(data: str):
    chain.add_block(data)
    return {"chain_length": len(chain.chain)}
```

The three module-level values (`chain`, `balances`, `peers`) are this node's
entire state, held in memory. Every write route does the same three things: apply
the change, log it to the chain, and broadcast. `broadcast_block` swallows a
failed peer call on purpose, so one node being down does not block the rest.

### Run it as a single API

**Start the server** from a terminal with the venv active:

```bash
uvicorn node:app --reload --port 8000
```

This starts a real web server on your machine, listening on port 8000.
`--reload` restarts it automatically if you edit `node.py` while it runs. Leave
this terminal running, and open a second terminal (activate the venv there too)
for the commands below.

**Explore it in a browser.** Open `http://localhost:8000/docs`. FastAPI builds
that page from your routes: click into any route, hit "Try it out", and send a
real request without typing a single `curl` command.

**Or drive it from the terminal:**

```bash
curl -X POST "http://localhost:8000/mint?account=alice&amount=100"
curl "http://localhost:8000/balance/alice"
curl "http://localhost:8000/chain"
```

The first line mints 100 units to `alice`: it credits her balance in the
`balances` dict and logs `"mint alice 100.0"` as a new block. The second reads
her balance back. The third shows the chain's length and whether it still
validates.

`/transfer` works the same way, but the sender has to have been minted to first
(there is no overdraft check; transferring from an account that was never minted
to just errors).

**Stop the server** with `Ctrl+C` in its terminal when you are done.

## Stage 5. Run a small network: two or three nodes syncing

This is the part PyDrop's browser sandbox genuinely cannot do; it needs real
separate processes talking over real ports. It is also the payoff for everything
above: a change on one node showing up on another without you touching the second
one at all.

**Start three nodes.** Open three separate terminals, activate the venv in each
(stage 0's `activate` line), and start one node per terminal on a different port:

```bash
uvicorn node:app --port 8000   # terminal 1
uvicorn node:app --port 8001   # terminal 2
uvicorn node:app --port 8002   # terminal 3
```

Leave all three running. Open a fourth terminal for the commands below.

**Introduce them to each other.** Right now each node has an empty `peers` list;
none of them know the others exist. `/network/register` is one-directional, so
for three nodes to all hear about each other, that is six calls, one per
direction:

```bash
curl -X POST "http://localhost:8000/network/register?peer_url=http://localhost:8001"
curl -X POST "http://localhost:8000/network/register?peer_url=http://localhost:8002"
curl -X POST "http://localhost:8001/network/register?peer_url=http://localhost:8000"
curl -X POST "http://localhost:8001/network/register?peer_url=http://localhost:8002"
curl -X POST "http://localhost:8002/network/register?peer_url=http://localhost:8000"
curl -X POST "http://localhost:8002/network/register?peer_url=http://localhost:8001"
```

Each call returns that node's current peer list, so you can confirm as you go.
`http://localhost:8000/docs` (and `:8001`, `:8002`) works here too.

**Mint on one node only,** and do not touch the other two:

```bash
curl -X POST "http://localhost:8000/mint?account=alice&amount=100"
```

**Now check all three:**

```bash
curl "http://localhost:8000/chain"   # grew, you minted here directly
curl "http://localhost:8001/chain"   # grew too, and you never called it
curl "http://localhost:8002/chain"   # grew too, same
```

If all three lengths match, here is what just happened: minting on node 1 called
`chain.add_block(...)` locally, then `broadcast_block(...)`, which sent an HTTP
request to every peer's `/receive_block` route. Nodes 2 and 3 each received it,
appended the same block to their own chain, and now all three hold identical,
independently-verifiable copies. That is the core idea behind every real
blockchain network: not one shared chain, but many separate copies that stay in
sync by telling each other about changes.

When you are done, `Ctrl+C` in each of the three server terminals to stop them.

## If something's not working

Almost every problem at this stage is the environment, not the code. This exact
code was verified working before it was committed, so if the output does not
match, start here:

- **`uvicorn: command not found`, or `python` seems to run the wrong thing:** the
  venv is not active in that terminal. Re-run the `activate` line from stage 0.
  Your prompt should show `(venv)`.
- **`ModuleNotFoundError: No module named 'nacl'`** (or `fastapi`): the install
  did not run, or ran against a different Python. With the venv active, run
  `pip install -r requirements.txt` again, then the `python -c "import ..."`
  check from stage 0.
- **`address already in use`, or uvicorn exits immediately:** something is
  already on that port, usually a node you started earlier and did not stop.
  Close it with `Ctrl+C` in its terminal, or start this one on a different port
  (`--port 8003`).
- **`curl` not recognised (older Windows):** skip curl entirely and use the
  `/docs` page in a browser; it can send every request the curl commands do.
- **In stage 5, a node's `/chain` did not grow:** check that peers were
  registered in *both* directions (`curl http://localhost:8001/network/peers`
  shows what one node knows about), and that all three servers are still running.

## What this deliberately leaves out

This mirrors exactly what PyDrop taught, nothing more, on purpose:

- **No proof-of-work.** The capstone chain never had mining wired in (that lives
  separately in Level 5). Adding a block here is instant, with no computational
  cost.
- **No fork handling on receipt.** `/receive_block` just appends whatever it is
  told; a real node would run `resolve_chains` when it disagrees with a peer
  instead of blindly accepting. `resolve_chains` already exists in
  `blockchain.py` and is ready to use, it is just not wired into `/receive_block`
  here. Wiring it in is a reasonable next step to try on your own.
- **No mempool, and no signature check on the ledger routes.** `/mint` and
  `/transfer` add a block immediately, and `/receive_block` trusts its input. A
  real node would hold incoming transactions in a mempool, verify each signature
  before queuing it, and only then build a block. The Mempool challenge is where
  that check lives; this project just does not wire it into the ledger.
- **Nothing persists.** Stop a node and its chain resets to genesis next time it
  starts. Real chains write to disk; PyDrop's SQLAlchemy lesson showed the shape
  of that (a `Block` table), but never wired actual persistence into the capstone
  chain itself.

None of that is a bug: it is the same honest boundary PyDrop drew everywhere
else, between "you understand and can write the code for this" and "this exact
project does it live." If you want to push past any of these, you already have
everything you would need.
