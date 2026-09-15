# What billing actually looks like

[← Back to Week 4: Track exposure](../../README.md)

## TL;DR

This page explains what billing actually looks like once you're on a paid provider starting Week 5, since this week's free tier is the exception, not the norm.

- This week's chatbot is free because of Groq's free tier. Starting Week 5, using a paid provider like Anthropic means every request is metered and billed.
- Paid usage is pay-per-token, not a flat subscription. You prepay some credit, and each request quietly subtracts a small amount from it, priced per million tokens since a single request only uses a tiny fraction of that.
- Bigger, more capable models cost more per token, and generating text (output) costs more than reading text you send in (input).
- A single typical exchange costs well under a cent, even on the most expensive model, which is why a small amount of credit is enough to get through this program.
- Treat your API key like a password, and set a spending limit in the provider's dashboard, so a bug like an infinite loop can't run up a surprise bill.

## This week is free. That's the exception, not the rule.

Groq's free tier is why this week's chatbot doesn't cost you anything to run. That's deliberate: it lets you learn the mechanics of a hosted API with zero setup friction and zero risk of an unexpected bill. It is not how most of this program, or most of the industry, actually works. Starting Week 5, once you're using Anthropic's API for real, every request is metered and billed. This note explains that normal case now, so it isn't a surprise later.

## Pay-per-token, not a flat subscription

Using a *paid* hosted model API (Week 5 onward, in this program) is not like a Netflix subscription where you pay one flat monthly fee and use it as much as you want. It's closer to a utility bill: you get charged for exactly what you used, measured in tokens (see the previous note), after the fact. Most providers, including Anthropic, let you prepay a small amount of credit, and every request quietly subtracts a tiny amount from that balance.

Prices are quoted per million tokens, because a single request only uses a few hundred or a few thousand tokens, a number so small that pricing per single token would be an awkward-looking fraction of a cent. A million tokens is a lot of text, roughly the length of several long novels, so don't let the "per million" framing make individual prices look bigger than they are.

As of when this was written, Anthropic's current models are priced roughly like this (input price is what you pay for the text you send, output price is for what the model generates back):

| Model | Price per million input tokens | Price per million output tokens |
| --- | --- | --- |
| Claude Opus 5 | $5.00 | $25.00 |
| Claude Sonnet 5 | $2.00 | $10.00 |
| Claude Haiku 4.5 | $1.00 | $5.00 |

Exact model names and prices change over time as new versions ship; always check the current pricing page for the up-to-date numbers rather than trusting a number you read somewhere once. The shape of the pricing (bigger, more capable models cost more per token; output costs more than input) tends to stay consistent even as the exact numbers move.

## What that means in practice for a learner

Do the arithmetic once, so the abstraction becomes concrete, even though this week's own requests are free. A single exchange in a chatbot like this week's (you type a sentence, the model replies with a paragraph) might use roughly 200 input tokens and 300 output tokens. If that exchange were running on Claude Opus 5, the priciest current model, using the pricing above:

- Input: 200 tokens is 0.0002% of a million, so 200/1,000,000 x $5.00 = $0.001
- Output: 300/1,000,000 x $25.00 = $0.0075
- Total for that one exchange: well under a cent, around $0.0085

Run that exchange a thousand times and you're still only at roughly $8.50, on the single most expensive model Anthropic sells. This is what the root README means by "usage in this program is small"; a free tier or a few dollars of credit genuinely is enough to get through this entire bootcamp, including plenty of mistakes and re-runs, once you're on a paid provider from Week 5 onward.

## Treat your API key and your spending like real money, because they are (starting Week 5)

Two habits worth building before Week 5 arrives, rather than after something goes wrong:

- An API key on a paid provider is the thing that lets requests get billed to your account. Week 0 already told you to treat every API key like a password, this week's Groq key included, even though nothing gets billed to it. Once you generate an Anthropic key in Week 5, that same habit stops being precautionary and starts being load-bearing: anyone who has it can run up real charges against your account, with no way for you to undo it after the fact.
- Most paid providers let you set a spending limit or a billing alert in their console/dashboard. Setting a small one (a few dollars) costs you nothing and protects you from a runaway bug, like an infinite loop that calls the API thousands of times in a row. Groq's free tier protects you from this differently: instead of a bill, a runaway loop just hits a rate limit and starts failing, which is part of why this week uses it. Set the spending limit anyway, as a five-minute habit, when you set up your Anthropic key in Week 5.
