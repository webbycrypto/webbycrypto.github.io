"""
Connect to the same testnet the Greeter contract was deployed to, load it by
address and ABI, read its greeting, change it, and read it again.

Run it with:
    python interact.py

Before running, set two environment variables (see README.md for how):
  WEB3_PROVIDER_URI     the same RPC endpoint you deployed with
  TESTNET_PRIVATE_KEY   the private key of your funded testnet account

And replace CONTRACT_ADDRESS below with the address deploy.py printed.
"""

import json
import os

from web3 import Web3

# Replace this with the address printed by scripts/deploy.py.
CONTRACT_ADDRESS = "0xPUT_YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE"


def main():
    rpc_url = os.environ["WEB3_PROVIDER_URI"]
    private_key = os.environ["TESTNET_PRIVATE_KEY"]

    w3 = Web3(Web3.HTTPProvider(rpc_url))
    if not w3.is_connected():
        raise SystemExit("Could not connect to the RPC endpoint. Check WEB3_PROVIDER_URI.")

    with open("greeter_abi.json") as f:
        abi = json.load(f)

    # An ABI (Application Binary Interface) is a plain description of what
    # functions a contract has, what arguments each one takes, and what it
    # returns. The contract's compiled bytecode on-chain doesn't carry
    # readable function names or argument types with it, so without the
    # ABI, web3.py would have no way to know that calling this contract's
    # "getGreeting" function is even possible, let alone how to format that
    # call correctly.
    greeter = w3.eth.contract(address=CONTRACT_ADDRESS, abi=abi)

    print("Current greeting:", greeter.functions.getGreeting().call())

    # Loading the account from its raw private key. This is the same test
    # account you imported into Ape, but here you're handling the raw key
    # text yourself, which is exactly why it lives in an environment
    # variable and nowhere in this file.
    account = w3.eth.account.from_key(private_key)

    transaction = greeter.functions.setGreeting("Hello from web3.py!").build_transaction(
        {
            "from": account.address,
            "nonce": w3.eth.get_transaction_count(account.address),
            "gas": 100_000,
            "gasPrice": w3.eth.gas_price,
            # chainId ties this signed transaction to one specific network,
            # so it can't be replayed on a different one later.
            "chainId": w3.eth.chain_id,
        }
    )

    signed_transaction = account.sign_transaction(transaction)

    # Newer web3.py versions name this attribute raw_transaction; older
    # installs use rawTransaction. If this line raises an AttributeError,
    # try the other spelling; the library renamed it at a past version
    # boundary, and this isn't a bug in this script.
    transaction_hash = w3.eth.send_raw_transaction(signed_transaction.raw_transaction)

    print("Transaction sent, waiting for it to be mined...")
    receipt = w3.eth.wait_for_transaction_receipt(transaction_hash)
    print("Confirmed in block:", receipt.blockNumber)

    print("New greeting:", greeter.functions.getGreeting().call())


if __name__ == "__main__":
    main()
