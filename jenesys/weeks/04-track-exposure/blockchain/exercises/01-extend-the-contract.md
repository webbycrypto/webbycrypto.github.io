# Exercises: small extensions to Greeter

[← Back to Week 4: Track exposure](../../README.md)

Short and optional beyond the first one, same spirit as the AI track's exercises. There's no answer key to compare against; if it does what the task describes, you're done. Do these on a copy of `../project/contracts/Greeter.sol`, or directly on it if you don't mind redeploying (redeploying costs nothing but a little testnet gas and a couple of minutes).

## 1. Count how many times the greeting has changed

Add a state variable, `uint256 public changeCount;`, and increment it inside `setGreeting` every time it's called. Recompile (`ape compile`), redeploy (you'll get a brand-new address, since this is different bytecode than before), and confirm from a Python script that `greeter.functions.changeCount().call()` returns `0` right after deploy, then `1` after your first `setGreeting` call.

## 2. Add a way to reset to the original greeting

Store the constructor's initial value in a second state variable when the contract is deployed, and add a `resetGreeting()` function that sets `greeting` back to that stored original value. Call `setGreeting` a couple of times to change it, then call `resetGreeting` and confirm, from Python, that it's back to the original.

## 3. Notice what changed, and what didn't, in your Python script

After doing either exercise above, look at how little of `interact.py` you actually had to touch to call your new function: the connection setup, the account loading, the transaction-building shape, all of it stayed the same. Only the function name being called changed. That's the ABI doing its job: once web3.py has an accurate ABI for whatever the contract currently looks like, calling any of its functions follows the exact same pattern, no matter what the function actually does underneath.
