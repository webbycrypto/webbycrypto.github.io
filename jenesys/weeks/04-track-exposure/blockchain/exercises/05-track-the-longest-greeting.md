# Exercise: track the longest greeting ever set

[← Back to Week 4: Track exposure](../../README.md)

Same rules as `01-extend-the-contract.md`: short, optional, no answer key, done on a copy of `../project/contracts/Greeter.sol` or directly on it. Exercise 1 in that file has you add a counter that increments on every single call, no matter what. This one adds a state variable that only updates sometimes, depending on a comparison against the current stored value, a genuinely different (and genuinely more common, in real contracts) pattern than "always add one."

## The task

Add a state variable that remembers the length of the longest greeting ever set, and only updates it, and only emits an event about it, when a new greeting actually beats the current record.

```solidity
uint256 public longestLength;

event NewLongestGreeting(uint256 length, string newGreeting);
```

Add both near the top of the contract, alongside the existing state variable and event. Then, inside `setGreeting`, after the existing `emit GreetingChanged(...)` line, add:

```solidity
uint256 newLength = bytes(newGreeting).length;
if (newLength > longestLength) {
    longestLength = newLength;
    emit NewLongestGreeting(newLength, newGreeting);
}
```

Read that `if` for what it's actually doing: most calls to `setGreeting` should *not* change `longestLength` or emit the new event at all, only the calls that set something longer than anything seen before. That guard matters for a real reason beyond just correctness: writing to contract storage costs gas every single time, whether or not the new value is actually different or interesting. A contract that unconditionally overwrote `longestLength` on every call, even with a smaller value, would be spending gas to record information nobody asked for. Checking first, and only writing when the check passes, is a small, real habit worth having from here on, not just busywork specific to this one exercise.

## Recompile and redeploy

```
ape compile
ape run deploy --network ethereum:sepolia:<your-rpc-url>
ape run get_abi --network ethereum:sepolia:<your-rpc-url>
```

Update `CONTRACT_ADDRESS` in your Python script.

## Prove the guard actually guards

This is the part that matters. Call `setGreeting` several times in a row, in this specific order, checking `greeter.functions.longestLength().call()` after each one:

1. A short greeting, like `"Hi"` (2 characters). `longestLength` should become `2`.
2. A longer one, like `"Hello there, friend!"` (21 characters). `longestLength` should become `21`.
3. A short one again, like `"Hey"` (3 characters). `longestLength` should **stay at `21`**, not drop to `3`.
4. Something longer than step 2, to confirm the record can still go up again when it's actually beaten.

Step 3 is the one worth not skipping: it's the entire point of the exercise, and it's exactly the kind of case that's easy to get backwards by accident (a `<` where you meant `>`, or updating `longestLength` unconditionally and only guarding the event) and still look right if you only ever test with increasing lengths. If you added the second-event exercise's `process_receipt` technique already, use it here too, watching for `NewLongestGreeting` to confirm it only actually fires on steps 2 and 4, never on step 3.
