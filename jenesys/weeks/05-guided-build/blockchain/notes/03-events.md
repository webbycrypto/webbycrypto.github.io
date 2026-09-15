# Events: a cheap announcement that something happened

[← Back to Week 5 (Blockchain track): Guided build](../README.md)

## TL;DR

This page explains what an event is, why it's cheaper than state, and when to use one.

- An `event` isn't a variable or a callable action. It's a note the network writes into a transaction's log when you `emit` it. It's cheap, and unlike state, no contract code can ever read it back later.
- Marking a parameter `indexed` lets outside code search efficiently for events with a specific value in that field, like "every event about this one address."
- The rule to follow: any function that changes state something outside the contract might care about should end with an `emit` for it, so outside code can react instead of constantly re-checking state on a timer.

```solidity
contract OrderBook {
    event OrderPlaced(address indexed buyer, uint256 amount, uint256 timestamp);  // indexed: searchable by buyer later

    mapping(address => uint256) public orders;

    function placeOrder(uint256 amount) external {
        orders[msg.sender] = amount;                            // updates state: expensive, permanent
        emit OrderPlaced(msg.sender, amount, block.timestamp);  // cheap announcement, not stored in state itself
    }
}
```

## The problem this solves

Suppose a backend service (this is exactly what you'll build in Week 6) wants to know the moment a new holder gets registered, so it can, say, update its own internal records or send a notification. It has one option that clearly works but is wasteful: repeatedly call `getHolder` for every address it cares about, on a timer, forever, comparing each result to what it saw last time, just to notice when something changed. That's a lot of wasted reads for the vast majority of checks where nothing changed at all, and it still might miss a change that happened and reverted back between two checks.

Contracts have a purpose-built tool for this instead: **events**.

## What an event actually is

An `event` declaration in Solidity looks like a function signature but describes a log entry, not a callable action:

```solidity
event HolderRegistered(address indexed holder, bool eligible, uint256 initialBalance, uint256 timestamp);
```

When a function calls `emit HolderRegistered(holder, eligible, initialBalance, block.timestamp);`, the network writes that data into the **logs** section of the transaction's receipt. This is deliberately not the same thing as state. An event is not stored in `holders` or any other state variable, and no Solidity code, in this contract or any other, can read past events back out of the blockchain. Once emitted, an event is a historical record for anything reading the chain from outside (a script, a backend service, a block explorer), not data your own contract can query later.

That asymmetry is the whole point. Logs are dramatically cheaper to write than state, precisely because nothing has to keep them updated or reachable from inside the contract forever. Think of the difference like a store's public announcement over a loudspeaker versus updating its permanent inventory ledger: shouting "a shipment just arrived!" is cheap and anyone in earshot at the time can act on it, but it's not itself the store's inventory count, and nobody can ask the loudspeaker two years later what it announced. The ledger (state) is what has to stay accurate and queryable indefinitely; the announcement (an event) is a cheap, one-time signal aimed at whoever happens to be listening right now, or whoever goes back and searches the historical recordings on purpose.

## `indexed`: labeling for fast lookup

Notice the `indexed` keyword on the `holder` parameter above. Indexed event parameters get stored in a way that makes them efficiently searchable ("give me every `HolderRegistered` event where `holder` equals this specific address"), similar to a labeled folder you can pull by name instead of reading every page in a filing cabinet. Non-indexed parameters (`eligible`, `initialBalance`, `timestamp` here) still get stored in the log and are still readable by anything watching, they just aren't independently searchable by value the way indexed ones are. A contract can index at most a handful of parameters per event (three, plus the event's own topic), so indexing is a deliberate choice about what you expect to filter by later, not something to sprinkle on everything.

`AssetRegistry` emits three events, one per state-changing function:

```solidity
event HolderRegistered(address indexed holder, bool eligible, uint256 initialBalance, uint256 timestamp);
event BalanceUpdated(address indexed holder, uint256 previousBalance, uint256 newBalance, uint256 timestamp);
event EligibilityChanged(address indexed holder, bool eligible, uint256 timestamp);
```

Each one indexes `holder`, since "everything that happened to this specific address" is the natural question anything watching the registry will want to ask.

## Why every state-changing function here emits one

Look at `registerHolder`, `updateBalance`, and `setEligibility` in the actual contract (`project/contracts/AssetRegistry.sol`): every single one that changes state ends with an `emit`. That's a deliberate pattern, not a coincidence, and it's worth adopting as a habit of your own: **if a function changes state that something outside the contract might care about, emit an event for it.** The cost is small (events are cheap relative to state writes) and the payoff, a reliable, chronological, externally readable record of everything that happened, is exactly what makes the next two weeks possible.

## Where this goes next

This week, your Python script (in `project/`) will mostly read state directly with `getHolder`, since the goal right now is just confirming a transaction actually changed something. But the receipt that transaction produces already contains the event log entry, whether you look at it or not. Week 6 is where events stop being a side detail: the backend service you build there listens for these events as they're emitted, in real time, instead of polling state on a timer the way this note's opening example described. Understanding events now, as "a cheap, timestamped announcement written into a transaction's receipt, readable by anything watching from outside," is what makes Week 6's "react to events instead of polling" instruction make sense the moment you get there, instead of feeling like new magic.
