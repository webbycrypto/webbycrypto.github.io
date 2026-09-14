# Week 3 exercises

[← Back to Week 3: Foundations consolidation](../README.md)

There are no *isolated* exercises this week, on purpose, and that reasoning hasn't changed.

Weeks 1 and 2 used isolated exercises to teach individual atomic skills (a single conditional, a single new endpoint) before asking you to combine them. By this point, you've already practiced routes, persistence, and error handling directly, both in Week 2's exercises and in its finished project. This week isn't about learning a new atomic skill in isolation; it's about applying skills you already have to a project you haven't seen the exact shape of before, with less structure around you than Week 2 gave you. That's the whole test.

If you want extra practice before diving into `project/README.md`, the honest move is to reread [`notes/01-what-carries-over.md`](../notes/01-what-carries-over.md) and, if anything there feels unfamiliar rather than just slightly rusty, go revisit the matching Week 2 note and exercise directly, rather than looking for a new Week 3 exercise that doesn't exist.

## The one exception: a guided walkthrough for the one genuinely new idea

Everything above is still true for every skill that carries over from Week 2. It is NOT true for the one piece of this week that's actually new: the redirect itself, from `../notes/02-redirects-and-short-codes.md`. That's a real, new atomic skill, the same category "isolated exercises" existed for in Weeks 1 and 2, just not one this folder gave you any dedicated practice with before now.

`01_guided_redirect_mini_app.md` fills exactly that gap, and only that gap: a fully-guided, line-by-line walkthrough (the same close treatment Week 1's and Week 2's own guided walkthroughs gave their own genuinely new mechanics) that builds the smallest possible app using `redirect()`, with everything else about it (the data, the route, the error handling) deliberately kept trivial so the one new idea stands out clearly. This isn't a contradiction of "no isolated exercises this week"; a guided walkthrough and an isolated exercise are different tools for different situations. An isolated exercise (a task description, then you're on your own) makes sense for a skill you're meant to already be applying with real independence, which is this week's whole point for everything that carries over. A guided walkthrough makes sense for a skill you're touching for the very first time, which is true of `redirect()` and nothing else this week.

Do this before starting either `project/README.md` or `project/second-project-config-store.md`; both projects assume you already understand what a redirect actually does, and neither one walks you through it again.
