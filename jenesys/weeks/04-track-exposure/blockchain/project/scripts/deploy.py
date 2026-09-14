"""
Deploy the Greeter contract to whichever network Ape is currently connected
to (see project/README.md for the exact command that picks the testnet).

Run it with:
    ape run deploy --network ethereum:sepolia:<your-rpc-url>
"""

from ape import accounts, project


def main():
    # "testnet-key" is the alias you gave this account when you ran
    # `ape accounts import testnet-key`. Ape stores the private key
    # encrypted on your own machine and will prompt you for the passphrase
    # you set at import time before it signs anything with it.
    account = accounts.load("testnet-key")
    print(f"Deploying from {account.address}")

    # account.deploy sends a real, signed transaction that creates the
    # contract on the network, using account as the sender. The string
    # passed after project.Greeter becomes the constructor's
    # initialGreeting argument.
    greeter = account.deploy(project.Greeter, "Hello from Jenesys!")

    print(f"Greeter deployed at: {greeter.address}")
    print(f"Current greeting: {greeter.getGreeting()}")
