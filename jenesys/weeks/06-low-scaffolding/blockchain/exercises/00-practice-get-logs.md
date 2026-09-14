# Practice: fetching logs with get_logs, on a contract you already have

[← Back to Week 6 (Blockchain track): Low-scaffolding build](../README.md)

This is a throwaway exercise, not part of the AssetRegistry service. Its only job is to give you one cheap, low-stakes rep of the `get_logs` API shape before you have to reach for it for real, against a service that actually matters, later this week. Nothing you write here gets reused; delete the script when you're done if you want.

You already have everything this needs from Week 4: a deployed `Greeter` contract, its address, its ABI (`greeter_abi.json`), and a funded testnet account. No new deployment, no new faucet request, nothing new to set up.

## What to do

Write a small, standalone script (`scratch_get_logs.py`, or any name you like, anywhere outside this repo's tracked project folders is fine, since it's throwaway) that:

1. Connects to the same RPC endpoint you used in Week 4, and loads `Greeter` by its address and ABI, exactly the way `weeks/04-track-exposure/blockchain/project/interact.py` already showed you.
2. Calls `setGreeting` two or three times in a row, with a different string each time, waiting for each transaction's receipt before sending the next one. This is the same call you already know how to make; the only thing new here is doing it more than once so there's more than one event to go find afterward.
3. Records the block number your script started at (`w3.eth.block_number`, read once, before step 2) and the block number once step 2 finishes.
4. Uses `contract.events.GreetingChanged.get_logs(from_block=<the number from step 3>, to_block="latest")` to fetch every `GreetingChanged` event emitted since your script started, and prints each event's `args` (specifically `oldGreeting`, `newGreeting`, and `changedBy`).

## What to check

- The number of events `get_logs` returns should match the number of times you called `setGreeting`, exactly. If it doesn't, that's worth actually chasing down (a common cause: recording the "start" block number after your first `setGreeting` call instead of before it, which misses that first event entirely) rather than shrugging and moving on; this exact off-by-one-block mistake is the kind of thing that's cheap to catch here and expensive to debug inside a real service later.
- Each event's `changedBy` should equal your own account's address, since you're the only one who's ever called `setGreeting` on this particular contract.
- Try narrowing `from_block` to something after your first `setGreeting` call (using a block number you noted or estimated partway through step 2) and confirm you now get back fewer events than before, missing exactly the ones before that block. This is the whole point of `get_logs` taking an explicit range: you decide what's "already handled" and what isn't, nothing is remembered for you.

## Why this, and why now

`notes/03-event-driven-reactivity.md` describes `get_logs` as the more dependable of web3.py's two event-watching approaches, precisely because it has no server-side memory and instead relies on your own tracked cursor (a block number). Reading that description is one thing; noticing with your own eyes that changing `from_block` changes exactly which events come back, on a contract you already understand completely, is what makes that description feel like a fact about a tool you've used, not a claim you're taking on faith when you build the real service's event loop next.
