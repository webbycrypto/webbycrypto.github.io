"""
wallet.py -- from PyDrop Level 6: "Wallet: Deriving an Address" and
"Wallet: Signing a Transaction" (challenges id245, id246).

A Wallet holds a real asymmetric key pair (PyNaCl) and derives a
public address from it. It can sign a transaction on your behalf,
handing back everything a stranger needs to verify it without ever
contacting you: the transaction data, the signature, and your public
key.
"""

import hashlib

from nacl.signing import SigningKey


class Wallet:
    def __init__(self):
        self.signing_key = SigningKey.generate()
        self.verify_key = self.signing_key.verify_key
        # The address is nothing but a hash of the public key -- generate
        # the same key pair twice and you'd get the same address both
        # times. Real chains do the same thing with a different exact
        # hash/encoding (Ethereum: last 20 bytes of keccak256(pubkey);
        # Algorand: base32 of the pubkey plus a checksum).
        self.address = hashlib.sha256(bytes(self.verify_key)).hexdigest()[:16]

    def sign_transaction(self, recipient, amount):
        """Build and sign a transaction, returning everything a stranger
        needs to verify it independently: the data, the signature, and
        the public key to check it against."""
        message = f"{self.address}{recipient}{amount}".encode()
        signature = self.signing_key.sign(message).signature
        return {
            "sender": self.address,
            "recipient": recipient,
            "amount": amount,
            "signature": signature,
            "verify_key": bytes(self.verify_key),
        }
