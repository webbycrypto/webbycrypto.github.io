"""
blockchain.py -- from PyDrop Level 6's capstone: "Guided Project: Build
a Blockchain From Scratch" (id241, revised to use real wallet-signed
transactions) and "Resolving Competing Chains" (id249).

Block.data can be either a plain string, or a signed transaction dict
produced by wallet.sign_transaction(). Blockchain.is_valid() checks
every block's hash and link the same way Level 5 did, and additionally
verifies any block's signed transaction for real using PyNaCl.
"""

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
    """The longest-valid-chain rule: an invalid chain never wins, no
    matter how long it is. Between two valid chains, the longer one
    wins; chain_a wins a tie."""
    valid_a = is_valid_fn(chain_a)
    valid_b = is_valid_fn(chain_b)
    if valid_a and not valid_b:
        return chain_a
    if valid_b and not valid_a:
        return chain_b
    return chain_a if len(chain_a) >= len(chain_b) else chain_b
