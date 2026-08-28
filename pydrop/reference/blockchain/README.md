# PyDrop Reference Blockchain

Everything from PyDrop Level 6's capstone, assembled into one real project you
can run for real, instead of typed into separate challenge boxes. Same logic
you already wrote in PyDrop, just organized the way an actual project would
be: one file per concept instead of one script per lesson.

| File | What it is | PyDrop challenges |
|---|---|---|
| `wallet.py` | Key generation, address derivation, transaction signing | Wallet: Deriving an Address, Wallet: Signing a Transaction |
| `blockchain.py` | `Block`/`Blockchain`, signature verification, `resolve_chains` | Build a Blockchain From Scratch, Resolving Competing Chains |
| `node.py` | The FastAPI service: chain, stablecoin ledger, node/peer routes | Wrap It in a REST API, A Stablecoin Ledger API, Turn Your API into a Node |
| `demo.py` | A plain script exercising all of the above, no server needed | -- |

## 1. Set up

```bash
cd reference/blockchain
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
```

## 2. See it work with no server at all

```bash
python demo.py
```

This creates two wallets, signs a real transaction, builds a chain with it,
attempts to forge a signature (and watches it get caught), and resolves two
competing chains. Read the output top to bottom -- it's the whole pipeline
in one pass.

## 3. Run it as a real API

```bash
uvicorn node:app --reload --port 8000
```

Open `http://localhost:8000/docs` for FastAPI's interactive API explorer, or
use `curl`:

```bash
curl -X POST "http://localhost:8000/mint?account=alice&amount=100"
curl "http://localhost:8000/balance/alice"
curl "http://localhost:8000/chain"
```

## 4. Run a small network: two or three nodes syncing for real

This is the part that can't happen inside PyDrop's browser sandbox -- it
needs real processes and real ports.

Open three terminals, each with the venv activated, and start one node per
terminal on a different port:

```bash
uvicorn node:app --port 8000   # terminal 1
uvicorn node:app --port 8001   # terminal 2
uvicorn node:app --port 8002   # terminal 3
```

Register each node with the other two (six calls total, one direction
each):

```bash
curl -X POST "http://localhost:8000/network/register?peer_url=http://localhost:8001"
curl -X POST "http://localhost:8000/network/register?peer_url=http://localhost:8002"
curl -X POST "http://localhost:8001/network/register?peer_url=http://localhost:8000"
curl -X POST "http://localhost:8001/network/register?peer_url=http://localhost:8002"
curl -X POST "http://localhost:8002/network/register?peer_url=http://localhost:8000"
curl -X POST "http://localhost:8002/network/register?peer_url=http://localhost:8001"
```

Now mint on node 1, and check the others:

```bash
curl -X POST "http://localhost:8000/mint?account=alice&amount=100"

curl "http://localhost:8000/chain"   # length grew
curl "http://localhost:8001/chain"   # grew too, via broadcast_block
curl "http://localhost:8002/chain"   # same
```

If all three lengths match, you have a real, working, tiny blockchain
network, running entirely on your own machine.

## What this deliberately leaves out

This mirrors exactly what PyDrop taught, nothing more:

- **No proof-of-work.** The capstone chain never had mining wired in (that
  lives separately in Level 5). Adding a block here is instant.
- **No fork handling on receipt.** `/receive_block` just appends; a real
  node would run `resolve_chains` when it disagrees with a peer instead of
  blindly accepting. `resolve_chains` exists in `blockchain.py` and is
  ready to use, it's just not wired into `/receive_block` here.
- **Nothing persists.** Restart a node and its chain resets to genesis.
  Real chains write to disk; PyDrop's SQLAlchemy lesson showed the shape of
  that (a `Block` table), but never wired persistence into the capstone
  chain itself.

None of that is a bug: it's the same honest boundary PyDrop drew everywhere
else, between "you understand and can write the code for this" and "this
exact project does it live."
