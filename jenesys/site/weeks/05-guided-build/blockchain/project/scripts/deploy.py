"""Deploy AssetRegistry with Ape.

This assumes the same Ape project setup you already used in Week 4: `AssetRegistry.sol`
sits in this project's `contracts/` folder, and you've already run `ape compile` (or let
`ape run` do it for you automatically, which it does before running any script).

Usage, from the root of this Ape project:

    ape run deploy --network <your-testnet-network-choice>

For example, using Alchemy on Sepolia (adjust to whatever provider and testnet you set
up in Week 4):

    ape run deploy --network ethereum:sepolia:alchemy

`accounts.load("<alias>")` unlocks an encrypted local keyfile account by prompting you,
interactively, for the passphrase you set when you imported it (`ape accounts import
<alias>`). Nothing about your private key is ever typed into this script or committed
to git; the passphrase only unlocks a file that already exists on your own machine.
That's deliberately different from Week 6, where a backend service has no human
present to type a passphrase, and has to load a raw key from an environment variable
instead. Notes on exactly why that's a meaningfully different (and more sensitive)
situation are in weeks/06-low-scaffolding/blockchain/notes/01-managed-keys.md.
"""

from ape import accounts, project


def main():
    deployer = accounts.load("testnet-deployer")

    print(f"Deploying AssetRegistry from {deployer.address} ...")
    registry = deployer.deploy(project.AssetRegistry)

    print(f"AssetRegistry deployed at: {registry.address}")
    print(f"Owner recorded on-chain:   {registry.owner()}")
    print("Save this address. You'll need it for interact.py and for Weeks 6 and 7.")
