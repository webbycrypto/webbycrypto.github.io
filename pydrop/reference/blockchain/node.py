"""
node.py. From PyDrop Level 6's capstone: "Guided Project: Wrap It in
a REST API" (id242), "Guided Project: A Stablecoin Ledger API" (id243),
and "Guided Project: Turn Your API into a Node" (id250). Also uses
broadcast_block from "Broadcasting a Block to Peers" (id248).

Run one copy of this and you have a working chain behind a REST API.
Run two or three copies on different ports and register them with each
other, and you have an actual small network: minting on one propagates
to the others in real time. See the README in this folder for the
exact steps.
"""

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


# --- Chain -------------------------------------------------------------

@app.get("/chain")
async def get_chain():
    return {"length": len(chain.chain), "valid": chain.is_valid()}


@app.post("/blocks")
async def add_block(block: NewBlock):
    chain.add_block(block.data)
    broadcast_block({"data": block.data}, peers)
    return {"added": block.data}


# --- Stablecoin ledger ---------------------------------------------------

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


# --- Networking ----------------------------------------------------------

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
