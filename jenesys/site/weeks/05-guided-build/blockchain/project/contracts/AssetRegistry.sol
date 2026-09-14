// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title AssetRegistry
/// @notice Tracks which addresses are registered holders of an off-chain-issued asset,
/// each holder's current balance, whether they are currently eligible to hold it, and
/// when their record last changed. Only the contract's owner (standing in for "our own
/// backend service," the account that deployed this contract) can register a holder or
/// change any of those fields. Every change emits an event so off-chain code can react
/// to it without polling.
///
/// This contract is intentionally small. It exists to give Weeks 5 through 7 one
/// consistent, real target to send transactions to, listen for events from, and build
/// a small backend service around, not to demonstrate every feature Solidity has.
contract AssetRegistry {
    /// @notice The account allowed to call every state-changing function below.
    /// Set once, at deployment, to whoever sent the deployment transaction.
    address public owner;

    /// @notice One holder's record. `registered` exists specifically so a mapping's
    /// default (all-zero) entry can be told apart from a holder who was deliberately
    /// registered with a zero balance; see notes/01-state-and-storage.md.
    struct Holder {
        uint256 balance;
        bool eligible;
        bool registered;
        uint256 lastUpdated;
    }

    /// @notice Every holder's record, keyed by address. `public` gives us a free,
    /// compiler-generated read function: holders(address) -> (balance, eligible, registered, lastUpdated).
    mapping(address => Holder) public holders;

    /// @notice Emitted once, the first time an address is registered.
    event HolderRegistered(address indexed holder, bool eligible, uint256 initialBalance, uint256 timestamp);

    /// @notice Emitted every time a registered holder's balance changes.
    event BalanceUpdated(address indexed holder, uint256 previousBalance, uint256 newBalance, uint256 timestamp);

    /// @notice Emitted every time a registered holder's eligibility flag changes.
    event EligibilityChanged(address indexed holder, bool eligible, uint256 timestamp);

    /// @dev Reverts unless the caller is the contract's owner. See notes/02-access-control.md.
    modifier onlyOwner() {
        require(msg.sender == owner, "AssetRegistry: caller is not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice Registers a brand-new holder. Can only be called once per address;
    /// call updateBalance or setEligibility afterward to change an existing holder.
    /// @param holder The address being registered.
    /// @param eligible Whether this holder starts out eligible to hold the asset.
    /// @param initialBalance The holder's starting balance.
    function registerHolder(address holder, bool eligible, uint256 initialBalance) external onlyOwner {
        require(holder != address(0), "AssetRegistry: holder is the zero address");
        require(!holders[holder].registered, "AssetRegistry: holder already registered");

        holders[holder] = Holder({
            balance: initialBalance,
            eligible: eligible,
            registered: true,
            lastUpdated: block.timestamp
        });

        emit HolderRegistered(holder, eligible, initialBalance, block.timestamp);
    }

    /// @notice Sets an already-registered holder's balance to a new value outright
    /// (this takes the new total, not an amount to add or subtract).
    function updateBalance(address holder, uint256 newBalance) external onlyOwner {
        require(holders[holder].registered, "AssetRegistry: holder not registered");

        uint256 previousBalance = holders[holder].balance;
        holders[holder].balance = newBalance;
        holders[holder].lastUpdated = block.timestamp;

        emit BalanceUpdated(holder, previousBalance, newBalance, block.timestamp);
    }

    /// @notice Flips an already-registered holder's eligibility flag.
    function setEligibility(address holder, bool eligible) external onlyOwner {
        require(holders[holder].registered, "AssetRegistry: holder not registered");

        holders[holder].eligible = eligible;
        holders[holder].lastUpdated = block.timestamp;

        emit EligibilityChanged(holder, eligible, block.timestamp);
    }

    /// @notice Convenience read function returning a holder's full record as a tuple.
    /// Functionally redundant with the free `holders(address)` getter; kept as a named,
    /// explicit read so the Python side of this project has one clear function to call.
    function getHolder(address holder)
        external
        view
        returns (uint256 balance, bool eligible, bool registered, uint256 lastUpdated)
    {
        Holder memory h = holders[holder];
        return (h.balance, h.eligible, h.registered, h.lastUpdated);
    }
}
