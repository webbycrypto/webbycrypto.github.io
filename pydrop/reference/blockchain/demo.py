"""
demo.py -- a plain script walking through the whole pipeline with no
server involved: wallets, signing, building a chain, an attack that
gets caught, and resolving two competing chains. Run this first, with
`python demo.py`, before touching node.py -- it's the fastest way to
see everything from PyDrop's Level 6 capstone actually work together.
"""

from blockchain import Blockchain, resolve_chains
from wallet import Wallet

print("--- Wallets ---")
alice = Wallet()
bob = Wallet()
print(f"Alice's address: {alice.address}")
print(f"Bob's address:   {bob.address}")

print("\n--- Building a chain with a real signed transaction ---")
chain = Blockchain()
transaction = alice.sign_transaction(bob.address, 10)
chain.add_block(transaction)
chain.add_block("a plain string works too, not every block needs a signature")
print(f"Chain length: {len(chain.chain)}")
print(f"Chain valid:  {chain.is_valid()}")

print("\n--- Attack: forging a signature ---")
tampered = dict(transaction)
tampered["amount"] = 999999
forged_chain = Blockchain()
forged_chain.add_block(tampered)
print(f"Tampered chain valid: {forged_chain.is_valid()}  (should be False)")

print("\n--- Resolving two competing chains ---")
short_valid = Blockchain()
short_valid.add_block("real block")

long_invalid = Blockchain()
long_invalid.add_block("block one")
long_invalid.add_block("block two")
long_invalid.chain[1].data = "tampered after the fact"  # breaks its own hash

# resolve_chains expects an is_valid_fn that takes a chain (list of
# Block objects) and returns True/False -- Blockchain.is_valid() is a
# method on an instance, so wrap it to work on a bare list instead:
def is_chain_list_valid(block_list):
    temp = Blockchain()
    temp.chain = block_list
    return temp.is_valid()


winner = resolve_chains(short_valid.chain, long_invalid.chain, is_chain_list_valid)
print(f"Winner has {len(winner)} block(s) -- the shorter, honest chain should win")
