"""
Export the compiled Greeter contract's ABI to a plain JSON file, so the
separate web3.py script (interact.py, one level up) can load it. Ape already
knows the ABI internally; this just writes it out in a format a different
library can read.

Run it with (after `ape compile` has run at least once):
    ape run get_abi --network ethereum:sepolia:<your-rpc-url>
"""

import json

from ape import project


def main():
    abi_entries = []
    for entry in project.Greeter.contract_type.abi:
        # Ape's ABI entries are Pydantic model objects, not plain
        # dictionaries. Depending on the version of Ape (and the version of
        # the Pydantic library it depends on) installed on your machine,
        # either model_dump() or the older dict() converts one into a plain
        # dictionary that Python's json module can write out. If one raises
        # an AttributeError, the other is the fix; that's a normal, minor
        # version difference, not a bug in this script.
        try:
            abi_entries.append(entry.model_dump())
        except AttributeError:
            abi_entries.append(entry.dict())

    # Ape runs scripts with the project root (this folder, not scripts/) as
    # the working directory, so this plain relative path lands right next
    # to interact.py, exactly where it expects to find it.
    output_path = "greeter_abi.json"
    with open(output_path, "w") as f:
        json.dump(abi_entries, f, indent=2)

    print(f"Wrote {len(abi_entries)} ABI entries to {output_path}")
