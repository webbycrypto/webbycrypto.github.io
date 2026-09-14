# Exercise: restrict an emergency reset to the contract's owner

[← Back to Week 4: Track exposure](../../README.md)

Same rules as `01-extend-the-contract.md`: short, optional, no answer key, done on a copy of `../project/contracts/Greeter.sol` or directly on it if you don't mind redeploying. This one is genuinely different from either item in that file: it's the first time you'll write a check on *who* is allowed to call a function, instead of just *what* the function does once called. That check, access control, is one of the three failure modes Week 5 names explicitly (alongside reentrancy and overflow) as worth building the habit of thinking about early. This is that habit's first, tiny, real dose.

## The task

Add a new state variable that records who deployed the contract, and a new function that only that specific address is allowed to call, which resets the greeting to a fixed, hardcoded value, regardless of what the constructor's original greeting was.

Concretely:

1. Add `address public owner;` as a state variable, alongside `greeting`.
2. In the constructor, add `owner = msg.sender;`, right after the existing line that sets `greeting`. Remember from `notes/02-transactions-and-gas.md`: `msg.sender` is filled in automatically by the network as whoever actually sent the deployment transaction, which is your own testnet account here. Recording it at construction time means the contract permanently remembers who deployed it, without you having to hardcode a specific address anywhere.
3. Add a new function:

```solidity
function emergencyReset() public {
    require(msg.sender == owner, "Only the owner can call emergencyReset.");
    string memory oldGreeting = greeting;
    greeting = "Hello, World!";
    emit GreetingChanged(oldGreeting, greeting, msg.sender);
}
```

Notice this resets to a literal, hardcoded string written directly into the contract's code, not to whatever the constructor's `initialGreeting` argument happened to be. That's a deliberate difference from `01-extend-the-contract.md`'s exercise 2, which stored and restored the constructor's actual original value. Here, "reset" means "back to one specific, fixed state the contract's author chose," the same idea as a factory reset on a device going back to a value the manufacturer picked, not back to whatever you personally configured when you first set it up.

`require` works the same way here as it does inside `setGreeting` already, in `Greeter.sol`'s comments: if the condition is false, the entire call reverts (nothing it did gets kept, including not spending real work on the state change), and the string becomes the error message anyone inspecting the failed transaction sees.

## Recompile and redeploy

```
ape compile
ape run deploy --network ethereum:sepolia:<your-rpc-url>
```

This produces a brand-new contract address, since the bytecode changed. Write it down. Also re-run `ape run get_abi --network ethereum:sepolia:<your-rpc-url>` to regenerate `greeter_abi.json` with the new `emergencyReset` function and `owner` getter included; the old ABI file has no idea either one exists.

## Call it from Python, twice: once as the owner, once as if you weren't

Update `CONTRACT_ADDRESS` in a copy of `interact.py` (or write a small new script following the exact same shape) to point at the new address. Confirm the happy path first: call `setGreeting` with some new text, confirm it changed, then call `emergencyReset()` the normal way (`build_transaction`, `sign_transaction`, `send_raw_transaction`, `wait_for_transaction_receipt`, the same sequence `interact.py` already uses for `setGreeting`), and confirm `getGreeting()` now returns exactly `"Hello, World!"`, no matter what Step 5's deploy script originally set or what you'd just changed it to.

Then prove the restriction is real, without needing a second funded testnet account at all. Generate a throwaway address the same way Step 0 of the project walkthrough did:

```python
from eth_account import Account
stranger = Account.create()
```

You don't need to fund `stranger` with any testnet ETH for this, because you're not going to send a real transaction from it. Instead, simulate the call as if it came from that address, using web3.py's `.call()` with an override:

```python
from web3.exceptions import ContractLogicError

try:
    greeter.functions.emergencyReset().call({"from": stranger.address})
    print("That should not have succeeded.")
except ContractLogicError as error:
    print(f"Reverted as expected: {error}")
```

`.call()` never actually sends anything to the network or spends any gas; it asks a node to simulate the function's execution and report what would happen, which is exactly why you can use it to test a permission check for free, from an address that holds no funds and doesn't even have a real transaction history. You should see the revert message you wrote in `require` come back, proving the check works, without ever needing to fund a second account or risk breaking anything on-chain. (If `ContractLogicError` isn't the exact name in your installed version of web3.py, check `web3.exceptions` for whatever it's currently called; this is the same kind of minor version drift `interact.py`'s comment about `raw_transaction` already warned you about, not a sign your contract logic is wrong.)
