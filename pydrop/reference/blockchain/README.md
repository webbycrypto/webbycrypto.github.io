# PyDrop Reference Blockchain

## What this is

Everything from PyDrop Level 6's capstone, assembled into one real project
you can actually run, instead of typed into separate challenge boxes one at
a time. It's the exact same logic you already wrote in PyDrop; nothing here
is new material. What's different is that it's organized the way an actual
project would be (one file per concept, not one script per lesson), and it
runs for real on your own machine instead of being checked on shape inside
a browser sandbox.

Use this two ways:
- **As a reference.** When a PyDrop challenge's instructions aren't clicking,
  come here and see that exact piece sitting inside a real, working whole.
- **As something to run and poke at.** Start it, break it on purpose, watch
  it recover, and see the pieces you built separately actually work
  together. This is what "you built a blockchain" looks like assembled.

| File | What it is | PyDrop challenges |
|---|---|---|
| `wallet.py` | Key generation, address derivation, transaction signing | Wallet: Deriving an Address, Wallet: Signing a Transaction |
| `blockchain.py` | `Block`/`Blockchain`, signature verification, `resolve_chains` | Build a Blockchain From Scratch, Resolving Competing Chains |
| `node.py` | The FastAPI service: chain, stablecoin ledger, node/peer routes | Wrap It in a REST API, A Stablecoin Ledger API, Turn Your API into a Node |
| `demo.py` | A plain script exercising all of the above, no server needed | -- |

The workflow below has four stages, in order: set up once, run the plain
script to see the core logic work, run it as a single API, then run three
copies at once to see an actual tiny network. Each stage builds on the one
before it, so go through them in order the first time.

## 1. Set up (one time only)

```bash
cd reference/blockchain
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
```

What this does: `python -m venv venv` creates a private folder holding a
separate copy of Python just for this project, so the packages it needs
don't clash with anything else on your machine. `venv\Scripts\activate`
switches your terminal into using that copy. You'll know it worked because
your prompt will show `(venv)` at the start of the line. `pip install -r
requirements.txt` reads the `requirements.txt` file in this folder and
installs the four packages it lists: `fastapi`, `uvicorn`, `pynacl`, and
`requests`.

You only need to do this once. Every time you come back to this project in
a new terminal, just run the `activate` line again before doing anything
else, since a new terminal starts outside the venv by default.

## 2. See the core logic work, no server involved

```bash
python demo.py
```

This is the fastest way to see the whole pipeline in one pass, with nothing
running in the background. Read `demo.py` itself alongside the output; it's
short and every line maps to something you already wrote in PyDrop.

What you should see, in order:
1. Two wallets get created, each printing its own address. Run it again and
   you'll get different addresses every time, since a wallet's key pair is
   randomly generated fresh each run.
2. A chain gets built with one real, PyNaCl-signed transaction and one plain
   string block, and `is_valid()` comes back `True`, since every block's
   hash lines up, every link to the previous block is correct, and the
   signed transaction's signature actually checks out.
3. An attack: the script takes that same signed transaction, changes its
   amount, and puts the tampered version into a fresh chain. `is_valid()`
   comes back `False`. This is the same "watch a forgery get caught for
   real" moment from the Attack challenge, just outside the sandbox.
4. Two competing chains get built, one shorter and honest, one longer but
   tampered after the fact. `resolve_chains` picks the shorter one, since an
   invalid chain never wins no matter how long it is.

If any of those four don't match what you see, something's wrong with the
setup (wrong Python version, packages not installed) rather than the logic
itself, since this exact code was verified working before being committed.

## 3. Run it as a single, real API

```bash
uvicorn node:app --reload --port 8000
```

This starts a real web server on your own machine, listening on port 8000.
`--reload` means it restarts itself automatically if you edit `node.py`
while it's running, handy for poking at it. Leave this terminal running;
open a second terminal for the next commands.

The easiest way to explore it: open `http://localhost:8000/docs` in a
browser. FastAPI builds that page automatically from your routes. You can
click into any route, hit "Try it out," and send a real request without
typing any `curl` commands at all.

Or drive it from the terminal:

```bash
curl -X POST "http://localhost:8000/mint?account=alice&amount=100"
curl "http://localhost:8000/balance/alice"
curl "http://localhost:8000/chain"
```

The first line mints 100 units to `alice`, which does two things at once:
credits her balance in the `balances` dict, and logs `"mint alice 100.0"` as
a new block on the chain, exactly like the Stablecoin Ledger challenge. The
second line reads her balance back. The third shows the chain's current
length and whether it still validates. When you're done, press `Ctrl+C` in
that terminal to stop the server.

## 4. Run a small network: two or three nodes actually syncing

This is the part PyDrop's browser sandbox genuinely cannot do; it needs
real separate processes talking to each other over real ports. This is also
the payoff for everything above: watching a change on one node show up on
another without you touching the second one at all.

**Start three nodes.** Open three separate terminals, activate the venv in
each one (step 1's `activate` line), and start one node per terminal on a
different port:

```bash
uvicorn node:app --port 8000   # terminal 1
uvicorn node:app --port 8001   # terminal 2
uvicorn node:app --port 8002   # terminal 3
```

Leave all three running. Open a fourth terminal for the commands below.

**Introduce them to each other.** Right now each node has an empty `peers`
list; none of them know the others exist. `/network/register` is how a node
learns about a peer, but it's one-directional: registering node 2 with node
1 doesn't automatically register node 1 with node 2. For three nodes to all
hear about each other, that's six calls, one per direction:

```bash
curl -X POST "http://localhost:8000/network/register?peer_url=http://localhost:8001"
curl -X POST "http://localhost:8000/network/register?peer_url=http://localhost:8002"
curl -X POST "http://localhost:8001/network/register?peer_url=http://localhost:8000"
curl -X POST "http://localhost:8001/network/register?peer_url=http://localhost:8002"
curl -X POST "http://localhost:8002/network/register?peer_url=http://localhost:8000"
curl -X POST "http://localhost:8002/network/register?peer_url=http://localhost:8001"
```

Each call returns that node's current peer list, so you can confirm as you
go. If you'd rather see it visually, `http://localhost:8000/docs` (and
`:8001`, `:8002`) works here too.

**Mint on one node only,** and don't touch the other two:

```bash
curl -X POST "http://localhost:8000/mint?account=alice&amount=100"
```

**Now check all three:**

```bash
curl "http://localhost:8000/chain"   # grew, you minted here directly
curl "http://localhost:8001/chain"   # grew too, and you never called it
curl "http://localhost:8002/chain"   # grew too, same
```

If all three lengths match, here's what actually just happened: minting on
node 1 called `chain.add_block(...)` locally, then `broadcast_block(...)`,
which sent an HTTP request to every peer's `/receive_block` route. Nodes 2
and 3 each received that request, appended the same block to their own
chain, and now all three have identical, independently-verifiable copies.
That's the core idea behind every real blockchain network: not one shared
chain, but many separate copies that stay in sync by telling each other
about changes.

When you're done, `Ctrl+C` in each of the three server terminals to stop
them.

## What this deliberately leaves out

This mirrors exactly what PyDrop taught, nothing more, on purpose:

- **No proof-of-work.** The capstone chain never had mining wired in (that
  lives separately in Level 5). Adding a block here is instant, with no
  computational cost.
- **No fork handling on receipt.** `/receive_block` just appends whatever
  it's told; a real node would run `resolve_chains` when it disagrees with
  a peer instead of blindly accepting. `resolve_chains` already exists in
  `blockchain.py` and is ready to use, it's just not wired into
  `/receive_block` here. Wiring it in is a reasonable next step to try on
  your own.
- **Nothing persists.** Stop a node and its chain resets to genesis the
  next time you start it. Real chains write to disk; PyDrop's SQLAlchemy
  lesson showed the shape of that (a `Block` table), but never wired actual
  persistence into the capstone chain itself.

None of that is a bug: it's the same honest boundary PyDrop drew everywhere
else, between "you understand and can write the code for this" and "this
exact project does it live." If you want to push past any of these, you
already have everything you'd need.
