"""Send a transaction to AssetRegistry.registerHolder, wait for it to be mined, then
read the resulting state back.

See project/README.md for the full walkthrough of what happens between "I called a
function" and "the state actually changed," and notes/01-state-and-storage.md through
notes/04-failure-modes.md for the concepts this script assumes you already have.

Required environment variables (never hardcode these values in the script itself):

    WEB3_PROVIDER_URI   e.g. https://eth-sepolia.g.alchemy.com/v2/<your-api-key>
    PRIVATE_KEY         the private key for a TESTNET-ONLY account holding test funds
    CONTRACT_ADDRESS    the address printed by scripts/deploy.py

Set them in your shell, or in a local .env file that is listed in .gitignore and is
never committed. This script deliberately does not fall back to a hardcoded value for
any of these: a script that "works anyway" without the environment variable set is a
script that will eventually get run against the wrong network, or committed with a
real key baked in by accident. Week 6's notes go much deeper on why this matters once
a script like this turns into a long-running service instead of a one-off run.
"""

import json
import os
import time
from pathlib import Path

from eth_account import Account
from web3 import Web3

PROVIDER_URI = os.environ["WEB3_PROVIDER_URI"]
PRIVATE_KEY = os.environ["PRIVATE_KEY"]
CONTRACT_ADDRESS = os.environ["CONTRACT_ADDRESS"]

ABI_PATH = Path(__file__).parent / "contracts" / "AssetRegistry.abi.json"


def main():
    w3 = Web3(Web3.HTTPProvider(PROVIDER_URI))
    assert w3.is_connected(), "Could not reach the RPC endpoint. Check WEB3_PROVIDER_URI."

    account = Account.from_key(PRIVATE_KEY)
    print(f"Sending from: {account.address}")

    abi = json.loads(ABI_PATH.read_text())
    contract = w3.eth.contract(address=Web3.to_checksum_address(CONTRACT_ADDRESS), abi=abi)

    # --- Step 1: build the transaction ---
    #
    # Nothing has been sent to the network yet. This is just a plain Python dict
    # describing what we want to happen. `nonce` matters: it's a per-account counter
    # that must increase by exactly one with each transaction that account sends, so
    # the network can tell transactions apart and process them in the right order. If
    # you send two transactions with the same nonce, only one of them can ever be
    # accepted; the other is rejected as a duplicate or a replacement.
    nonce = w3.eth.get_transaction_count(account.address)

    register_tx = contract.functions.registerHolder(
        account.address,  # registering our own sending account as the holder, for this demo
        True,  # eligible
        100,  # initialBalance
    ).build_transaction(
        {
            "from": account.address,
            "nonce": nonce,
            # "gas" is a LIMIT: the most gas this transaction is allowed to consume
            # before execution is stopped. Set it too low and the transaction can run
            # out of gas partway through and revert, still charging you for the gas
            # already used up to that point. 150,000 is a comfortable ceiling for a
            # function this small; a real service would estimate this per call instead
            # of hardcoding a guess (see contract.functions.<fn>(...).estimate_gas()).
            "gas": 150_000,
            # "gasPrice" is what you're willing to pay PER unit of gas, fetched here
            # from the network's own current recommendation. Together, gas limit and
            # gas price determine the maximum this transaction could cost you. Gas
            # exists because someone has to pay the validators actually running your
            # code and storing the result, forever; without a cost attached, the
            # network would have no defense against spam or infinite loops.
            "gasPrice": w3.eth.gas_price,
            "chainId": w3.eth.chain_id,
        }
    )

    # --- Step 2: sign it ---
    #
    # Signing happens entirely on your own machine, using your private key. The
    # network never sees your private key, only the signature it produces, which is
    # what lets the network verify msg.sender later without you ever revealing the
    # key itself.
    signed_tx = account.sign_transaction(register_tx)

    # --- Step 3: send it ---
    #
    # This is the moment the transaction actually leaves your machine. What comes
    # back immediately is a transaction hash, NOT a confirmation that anything
    # succeeded. At this instant the transaction is "submitted": the network has
    # received it and will attempt to include it in a future block, but nothing
    # on-chain has changed yet.
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    print(f"Transaction submitted: {tx_hash.hex()}")
    print("Waiting for it to be mined (this can take anywhere from a few seconds to a minute or more)...")

    # --- Step 4: wait for a receipt ---
    #
    # Between "submitted" and "mined," the transaction is "pending": sitting in the
    # network's mempool, waiting for a validator to include it in a block. A script
    # that assumed success the moment send_raw_transaction returned, and reacted to a
    # slow pending transaction by immediately sending a SECOND one thinking the first
    # one "must have failed," could end up registering the same holder twice, or
    # worse, depending on the action. wait_for_transaction_receipt blocks (polling
    # under the hood) until the transaction is actually included in a block, and only
    # then returns a receipt.
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    # A transaction can be MINED and still have FAILED: "mined" only means "included
    # in a block," not "succeeded." receipt.status is 1 for success, 0 for a revert
    # (for example, if registerHolder reverted because this address was already
    # registered). Gas already spent up to the point of failure is not refunded
    # either way, which is exactly why the gas note above matters.
    if receipt.status != 1:
        raise RuntimeError(f"Transaction was mined but reverted. Receipt: {receipt}")

    print(f"Confirmed in block {receipt.blockNumber}. Status: success.")

    # --- Step 5: read the state back ---
    #
    # This is a `call`, not a transaction: it costs no gas, creates no new
    # transaction, and executes the view function against the latest known state,
    # returning the result directly instead of a receipt. This is how we confirm the
    # write actually took effect, rather than just trusting that a status-1 receipt
    # means what we assume it means.
    balance, eligible, registered, last_updated = contract.functions.getHolder(account.address).call()

    print("Read back from the contract:")
    print(f"  balance:      {balance}")
    print(f"  eligible:     {eligible}")
    print(f"  registered:   {registered}")
    print(f"  last_updated: {last_updated} (unix timestamp, {time.ctime(last_updated)})")


if __name__ == "__main__":
    main()
