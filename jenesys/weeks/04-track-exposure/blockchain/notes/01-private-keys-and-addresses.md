# Private keys and addresses

[← Back to Week 4: Track exposure](../../README.md)

## What a private key actually is

A private key is just a very large, randomly generated number. That's it at its core: a number, usually written out as a long string of hexadecimal characters (letters and digits) like `0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318`. There's no file format, no special hardware, no physical object required to have one. Software can generate one instantly by asking your computer for a large amount of randomness.

What makes that number valuable is math, specifically a one-way mathematical relationship: from a private key, you can always compute a matching public key (and from that, an address, covered below), but you cannot go backward from the public key to figure out the private key, not with all the computers on Earth working on it for longer than the universe has existed. That one-way relationship is the entire foundation of how blockchains decide who's allowed to do what.

A helpful analogy: think of a private key less like a house key, which only unlocks something, and more like a device that both proves your identity and signs documents on your behalf, where the "signature" it produces can be checked by anyone, instantly, but can only be produced by someone holding that exact key. Whoever holds the private key for an address has complete, unquestionable control over it. There's no password reset, no customer support line, no "forgot my key" recovery flow, because there's no company or server storing a copy anywhere to reset from. This is a deliberate design choice, not a missing feature: it's what makes the system work without a central authority. It's also exactly why losing a private key, or having someone else obtain it, is unrecoverable. This program only ever uses test accounts holding worthless test funds specifically so that mistake costs you nothing while you're still learning the mechanics.

## What an address is

Your address is derived mathematically from your public key (which itself is derived from your private key), and it's the identifier everyone else uses to refer to your account: the equivalent of a bank account number, except one nobody had to issue you, and one anyone can compute and verify math on without needing to trust a bank's internal records. An address looks like `0x` followed by 40 hexadecimal characters.

Addresses are safe to share publicly. People post them in forums, put them on business cards, request payments to them openly. There is nothing an attacker can do with just your address, since it's a one-way derivation; the danger is entirely on the private key side. The clean mental split to hold onto: address is public, like a mailbox address anyone can look up and drop something into. Private key is secret, like the only key that can open that mailbox and take things out or send things from it.

## Why this program keeps drilling "never share your private key"

Every later blockchain lesson in this program, including this week's project, is going to ask you to load a private key from an environment variable, never type it directly into a script, and never commit it to git. That's not boilerplate caution. Given what you now know, a leaked private key is not like a leaked password you can change. It is an irreversible transfer of total control over that account to whoever else now has it. This program only ever uses testnet accounts holding fake, worthless test funds (the next note explains exactly what a testnet is), specifically so you can make this mistake now, safely, learn from it if you do, and never make it again once real value is involved.
