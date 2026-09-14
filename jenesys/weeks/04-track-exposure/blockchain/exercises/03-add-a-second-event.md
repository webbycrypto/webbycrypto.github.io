# Exercise: add a second event, and read both from one transaction

[← Back to Week 4: Track exposure](../../README.md)

Same rules as `01-extend-the-contract.md`: short, optional, no answer key, done on a copy of `../project/contracts/Greeter.sol` or directly on it. `Greeter.sol` already declares and emits one event, `GreetingChanged`, every time `setGreeting` runs. This exercise adds a second, different event, emitted under its own condition, and then has you read both of them back out of a single transaction's receipt from Python, something none of the code you've been given so far actually does.

## The task

Add a new event that flags whether a greeting is "long," using a length threshold you choose (20 characters is a reasonable default), and emit it every time `setGreeting` runs, right alongside the existing `GreetingChanged` event, not instead of it. A single transaction can emit more than one event; there's nothing unusual about that.

```solidity
event GreetingLengthFlag(uint256 length, bool isLong);
```

Add that line near the top of the contract, next to the existing `GreetingChanged` declaration. Then, inside `setGreeting`, after the existing `emit GreetingChanged(...)` line, add:

```solidity
bool isLong = bytes(newGreeting).length > 20;
emit GreetingLengthFlag(bytes(newGreeting).length, isLong);
```

`bytes(newGreeting).length` is how you get a string's length in Solidity; strings themselves don't expose `.length` directly, but converting one to `bytes` first does. (This measures length in bytes, not characters; for plain English text without accented letters or emoji, those are the same number, which is close enough for what this exercise is teaching. If you're curious why they can differ for other text, that's a real detail of how UTF-8 encoding works, not a Solidity quirk, and worth a search later, but not something to chase down right now.)

## Recompile and redeploy

```
ape compile
ape run deploy --network ethereum:sepolia:<your-rpc-url>
ape run get_abi --network ethereum:sepolia:<your-rpc-url>
```

New bytecode means a new address, and the ABI needs regenerating so web3.py knows `GreetingLengthFlag` exists at all; without an up-to-date ABI, web3.py has no way to decode a log it doesn't know the shape of. Update `CONTRACT_ADDRESS` in your Python script to the freshly deployed address.

## Read both events back out of one receipt

`interact.py`, as given, never actually looks at events at all, even though `Greeter.sol` has been emitting `GreetingChanged` this whole time; it only ever calls `getGreeting()` directly to check the result. This exercise is your first time actually reading one back.

Send a `setGreeting` transaction the same way `interact.py` already does (`build_transaction`, `sign_transaction`, `send_raw_transaction`), and keep the `receipt` object `wait_for_transaction_receipt` hands back, the same way the existing script already does to read `receipt.blockNumber`. A receipt carries every event any contract emitted during that one transaction, but in raw, encoded form; you need the contract's own event objects, built from its ABI, to decode them back into readable Python values:

```python
changed_events = greeter.events.GreetingChanged().process_receipt(receipt)
flag_events = greeter.events.GreetingLengthFlag().process_receipt(receipt)

for event in changed_events:
    print("GreetingChanged:", event.args.oldGreeting, "->", event.args.newGreeting)

for event in flag_events:
    print("GreetingLengthFlag:", event.args.length, "long?" , event.args.isLong)
```

Each call to `process_receipt` returns a list, because in general a single transaction could emit the same event type more than once (this one doesn't, but the API is written for the general case). Each entry's `.args` gives you the actual decoded values, named exactly like the parameters you declared in the event.

Send a short greeting (under your threshold) and a long one (over it) as two separate `setGreeting` calls, and confirm `isLong` comes back `false` for the first and `true` for the second. If `process_receipt` comes back empty for an event you know fired, double-check you're calling it on the freshly redeployed contract's ABI and address, not on an older `greeter_abi.json` left over from before you added the new event; a stale ABI simply doesn't know the event exists, so it silently decodes nothing, rather than raising an error that would point you at the actual problem.
