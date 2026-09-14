# Exercise: cap the greeting's length, then handle a real revert

[← Back to Week 4: Track exposure](../../README.md)

Same rules as `01-extend-the-contract.md`: short, optional, no answer key, done on a copy of `../project/contracts/Greeter.sol` or directly on it. Every exercise so far has only ever called functions that succeed. This one is the first time you'll deliberately make a call fail, on purpose, and handle that failure in Python instead of just crashing or letting it print a wall of a stack trace.

## The task: add the limit in Solidity

Add a length limit to `setGreeting`, so it refuses to accept a greeting longer than some maximum you choose (100 characters is a reasonable default). Add this as the very first line inside the function, before anything else runs:

```solidity
function setGreeting(string memory newGreeting) public {
    require(bytes(newGreeting).length <= 100, "Greeting is too long.");
    string memory oldGreeting = greeting;
    greeting = newGreeting;
    emit GreetingChanged(oldGreeting, newGreeting, msg.sender);
}
```

Putting the `require` check first matters: if the condition fails, the function stops immediately and none of the lines after it ever run, including the state change and the event. `bytes(newGreeting).length` is the same length technique the second-event exercise uses, if you've done that one already; here it's guarding an action instead of just reporting on it.

## Recompile and redeploy

```
ape compile
ape run deploy --network ethereum:sepolia:<your-rpc-url>
ape run get_abi --network ethereum:sepolia:<your-rpc-url>
```

Update `CONTRACT_ADDRESS` in your Python script to the new deployment.

## Simulate before you spend real gas

You could just send a too-long `setGreeting` transaction directly and watch it fail, but that's not actually how you'd want to work in practice: sending a transaction that's going to revert still means building it, signing it, broadcasting it, and waiting for a node to confirm it failed, which costs time and, on a real network, real gas, just to learn what a free, instant simulation would have told you first. The fix is to call the exact same function with `.call()` before you ever build a real transaction. `.call()` never gets broadcast or mined; it asks a node to run the function against current state and tell you what would happen, for free, and if the function would revert, `.call()` raises that same revert immediately instead of returning a value.

```python
from web3.exceptions import ContractLogicError

def try_set_greeting(new_greeting):
    try:
        greeter.functions.setGreeting(new_greeting).call({"from": account.address})
    except ContractLogicError as error:
        print(f"Would revert, not sending: {error}")
        return False
    return True
```

Use this as a guard in front of the real send: only build, sign, and broadcast the actual transaction (the same sequence `interact.py` already uses) if `try_set_greeting` returns `True`. Test it with a short string first (should pass the simulation, then actually succeed once sent for real), then test it with a string well over your limit, generated however you like, even just repeating one character a few hundred times (`"x" * 200`, for instance), and confirm the simulation catches it, prints your revert message, and the code never attempts to actually send a doomed transaction at all.

## What this is actually teaching

Notice you never had to fund a second account or do anything special to test the failure case; `.call()` works the exact same way whether the call would succeed or fail, which is exactly why simulating first, before spending real gas on a transaction that might revert, is a genuinely common pattern in real backend code that sends transactions on its own, the kind of thing Week 6's managed-key service will be doing constantly, just against far less trivial checks than a length limit. (As with the previous exercise's `ContractLogicError` import: if that exact name doesn't exist in your installed web3.py version, check `web3.exceptions` for whatever it's currently called there.)
