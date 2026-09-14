# Project: deploy AssetRegistry, then send it a transaction from Python

[← Back to Week 5 (Blockchain track): Guided build](../README.md)

Read `notes/01-state-and-storage.md` through `notes/04-failure-modes.md`, and do the exercises in `exercises/`, before starting this. In particular, work through `exercises/00-guided-write-assetregistry.md` first: it has you type the contract's genuinely new pieces yourself, compiling after each one, before you read the explanation below of the finished version. Everything below assumes you already understand what state, access control, events, and the three failure modes are. This project is where you use that understanding, not where you first encounter it.

## What you're building

Two things, in order:

1. Deploy `contracts/AssetRegistry.sol` to a testnet, using Ape, the same way you deployed Week 4's trivial contract.
2. Run `interact.py`, a web3.py script that sends a real transaction (registering your own account as a holder), waits for it to actually be confirmed, and then reads the result back to prove the write took effect.

## Step 1: deploy with Ape

This builds directly on Week 4, so it's brief. If any of this feels unfamiliar, that's a sign to go back to Week 4's material before continuing here, not to push through.

1. Put `contracts/AssetRegistry.sol` in your Ape project's `contracts/` folder.
2. From the project root, compile it: `ape compile`. Fix any errors before moving on; a contract that doesn't compile can't be deployed.
3. Import a testnet account if you haven't already: `ape accounts import testnet-deployer`, pasting in the private key of a testnet-only account you've funded from a faucet. This encrypts the key into a local keyfile, protected by a passphrase you choose. Never use an account that holds, or will ever hold, real funds.
4. Run the deploy script: `ape run deploy --network <your-testnet-network-choice>`, substituting whatever provider and testnet you configured in Week 4 (for example, `ethereum:sepolia:alchemy`). Ape will prompt you for the passphrase you set in step 3; that's `accounts.load` unlocking the keyfile, not a new secret to invent.
5. Copy the deployed contract address the script prints. You'll need it for `interact.py` below, and again in Weeks 6 and 7.

## Step 2: export the ABI

`interact.py` talks to the contract with web3.py directly, not through Ape, so it needs the contract's ABI (what functions it has, what arguments each one takes, what it returns) sitting in a plain JSON file it can load itself; Ape's own internal knowledge of the ABI, from compiling in Step 1, isn't something a different library can reach into. `scripts/get_abi.py` writes that file out.

Run it, from the project root, right after deploying:

```
ape run get_abi --network <your-testnet-network-choice>
```

This writes `contracts/AssetRegistry.abi.json`, right next to `AssetRegistry.sol`. That's a different location than Week 4's `greeter_abi.json`, which landed in the project root; this week's `interact.py` builds its path as `contracts/AssetRegistry.abi.json` specifically (look for `ABI_PATH` near the top of the file), so this is where it has to land. Skip this step and `interact.py` fails immediately with a `FileNotFoundError`, before it ever tries to reach the network, which is a useful, cheap error to recognize on sight: it means the ABI was never exported, not that anything about your deployment or your network connection is wrong.

If you ever change the contract and redeploy (the stretch goals at the end of this README do exactly that), rerun this step too. The ABI file doesn't update itself, and an old, mismatched ABI won't necessarily fail loudly; it might just be missing the new function you added, which looks like a bug in your Python script when the actual mismatch is a stale JSON file.

## Step 3: run interact.py

`interact.py` needs three environment variables. Set them in your shell (or a local `.env` file that stays out of git) before running the script:

```
WEB3_PROVIDER_URI   the same RPC endpoint you used to deploy
PRIVATE_KEY         the private key for your testnet-only account
CONTRACT_ADDRESS    the address deploy.py printed
```

Then run it: `python interact.py`.

Read the comments in `interact.py` as you go; they walk through every stage of what's about to happen. The short version, worth internalizing before you run anything:

### The transaction lifecycle: submitted, pending, mined, confirmed

Calling a state-changing function from Python is not one atomic step, even though it might look like one. It happens in stages:

1. **Build.** You assemble a plain Python dictionary describing what you want to happen: which function, with what arguments, from which account, with what nonce, gas limit, and gas price. Nothing has reached the network yet.
2. **Sign.** Your private key, on your own machine, produces a signature over that transaction. The network will later use this signature to verify who really sent it, without you ever having to reveal the key itself.
3. **Send.** The signed transaction is broadcast to the network. What you get back immediately is a transaction *hash*, which is an identifier, not a receipt. At this point the transaction is **submitted**.
4. **Pending.** The transaction sits in the network's mempool, waiting for a validator to pick it up and include it in a block. This can take anywhere from a couple of seconds to well over a minute, depending on network conditions. Nothing about the contract's state has changed yet, even though you've already "sent" it.
5. **Mined.** A validator includes the transaction in a block. This is the moment `wait_for_transaction_receipt` stops blocking and hands you back a receipt.
6. **Confirmed / checked.** Mined is not the same as succeeded. The receipt's `status` field tells you which: `1` means the function ran to completion and any state changes stuck; `0` means it reverted (a `require` failed, for example), and none of its state changes took effect, even though the transaction still exists on-chain and you still paid gas for the attempt.

**Why you can't just assume success the moment you call `send_raw_transaction`.** If your code moved on immediately, treating the transaction hash itself as proof of success, you'd have no way to tell "this succeeded" apart from "this is still sitting in the mempool" apart from "this reverted." A script (or worse, an unattended backend service, which is exactly what you'll build in Week 6) that doesn't wait for a receipt might report success on something that hasn't happened yet, or, reacting to what looks like a stall, resubmit the same action a second time, thinking the first attempt failed when it was actually just pending. That second scenario is the seed of the idempotency problem Week 7 makes you solve on purpose.

**Why the script waits, then checks `status`, then reads state back with a separate call.** Each of those three things checks something different: waiting confirms the transaction was actually processed at all (not lost, not still pending forever); checking `status` confirms it didn't revert; reading state back with `getHolder(...).call()` confirms that what actually landed in the contract's storage matches what you expected, rather than trusting your own assumption about what a successful call should have done.

## What to check when you're done

- The script should print a transaction hash, then a confirmed block number, then the holder record it just wrote: `balance: 100`, `eligible: True`, `registered: True`, and a `last_updated` timestamp close to when you ran it.
- Run `interact.py` a second time without changing anything. It should fail, on purpose: `registerHolder` explicitly reverts if the address is already registered (`require(!holders[holder].registered, ...)`). Read the error web3.py raises, and confirm you can explain, in your own words, exactly which line in `AssetRegistry.sol` caused it and why. That's the same "read the error, form a hypothesis, confirm it" habit the Foundations checkpoint was built around, just applied to a contract instead of a web API.
- Notice `interact.py` never extracts a single function beyond `main()`. See `notes/05-organizing-a-walkthrough-script.md` for why that's the right call here, and what changes about that once Week 6 turns this into a service.

## Optional stretch (not required)

Everything above is the required path. If you want more practice with this exact contract before moving on to Week 6, here are two independent extensions; pick either, both, or neither. Each is stated as a goal and a constraint, not a walkthrough, the way Weeks 6 and 7 will state things from here on.

**Aggregate read function.** Add a way to ask the contract "how many holders are currently registered, in total" with a single call, without a Python script having to fetch every address individually and count them itself. Constraint: this has to be genuinely new state, tracked incrementally (incremented inside `registerHolder`, not computed by looping over anything at read time; Solidity has no cheap way to iterate "every key ever used in a mapping," which is worth discovering by trying and failing before being told), and the new read function has to be `view` (no gas cost to call it).

**A fourth event.** `AssetRegistry` currently emits one event per state-changing function it has. Add a new capability, transferring ownership to a new address, guarded so only the current owner can call it, and emit a new event (`OwnershipTransferred(address indexed previousOwner, address indexed newOwner, uint256 timestamp)` is a reasonable shape) when it happens. Constraint: think through what should happen if someone tries to transfer ownership to the zero address, and guard against it explicitly, the same instinct `registerHolder` already models for you.

Either extension means the same loop: change the contract, recompile, redeploy (a fresh address; the old one still exists on-chain but won't have the new function), regenerate the ABI (Step 2 above, rerun), and write or adapt a small Python check that calls the new function and confirms it did what you expected. That full loop, change, recompile, redeploy, re-export the ABI, re-check from Python, is exactly what you'll be running yourself, unprompted and without this README, for the rest of this program.
