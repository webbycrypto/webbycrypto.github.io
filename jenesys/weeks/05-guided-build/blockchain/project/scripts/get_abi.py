"""
Export the compiled AssetRegistry contract's ABI to a plain JSON file, so the
separate web3.py script (interact.py, one level up) can load it. Ape already
knows the ABI internally, from compiling; this just writes it out in a format
a different library can read. Same idea as Week 4's get_abi.py, just pointed
at a different contract and a different output location (see the comment on
output_path below for why the location is different this time).

Run it once, right after deploying with scripts/deploy.py, and again any time
you change AssetRegistry.sol and redeploy:

    ape run get_abi --network <your-testnet-network-choice>
"""

import json

from ape import project


def main():
    abi_entries = []
    for entry in project.AssetRegistry.contract_type.abi:
        # Ape's ABI entries are Pydantic model objects, not plain dictionaries.
        # Depending on the version of Ape (and the version of the Pydantic
        # library it depends on) installed on your machine, either
        # model_dump() or the older dict() converts one into a plain
        # dictionary that Python's json module can write out. If one raises
        # an AttributeError, the other is the fix; that's a normal, minor
        # version difference, not a bug in this script.
        try:
            abi_entries.append(entry.model_dump())
        except AttributeError:
            abi_entries.append(entry.dict())

    # Ape runs scripts with the project root (this folder, not scripts/) as
    # the working directory. interact.py builds its ABI path as
    # Path(__file__).parent / "contracts" / "AssetRegistry.abi.json", so this
    # has to land inside contracts/, not the project root the way Week 4's
    # greeter_abi.json did. If you skip this step, interact.py will fail with
    # a FileNotFoundError on that exact path, before it ever tries to talk to
    # the network.
    output_path = "contracts/AssetRegistry.abi.json"
    with open(output_path, "w") as f:
        json.dump(abi_entries, f, indent=2)

    print(f"Wrote {len(abi_entries)} ABI entries to {output_path}")
