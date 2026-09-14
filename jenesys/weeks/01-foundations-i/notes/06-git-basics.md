# Git basics

[← Back to Week 1: Foundations I](../README.md)

## Why version control exists

Before you learn a single git command, it's worth understanding the actual problem git solves, because the commands make a lot more sense once you know why they exist.

Imagine you're writing an essay with no version control at all. You save it as `essay.docx`. Then you make some big changes you're not sure about, so you save a copy as `essay_v2.docx`, just in case. Then you try something else and end up with `essay_final.docx`, then `essay_final_ACTUALLY.docx`. A week later, you can't remember which file has the paragraph you liked, or what you even changed between versions, and you definitely can't easily combine "the introduction from v2" with "the ending from final_ACTUALLY."

Now imagine two people editing the same document by emailing files back and forth. Whoever saves last wins, and the other person's changes silently vanish, or you end up manually copy-pasting changes between four slightly different files to reconcile them.

Version control (git) exists to solve exactly this. It keeps a complete history of every change you've saved, lets you see exactly what changed and when, lets you go back to any earlier point without losing anything, lets you try something experimental without risking the version that already works, and lets multiple people work on the same code without overwriting each other. Think of it like a detailed lab notebook that also happens to let you time travel: every meaningful checkpoint of your work is saved, labeled, and recoverable, forever, not just the most recent save.

## The repository

A **repository** (repo, for short) is a folder that git is tracking the history of. Not every folder on your computer is a repo, only ones you've explicitly told git to watch, using:

```
git init
```

Run this once, inside the folder you want git to start tracking. From then on, git keeps a hidden record of everything that happens in that folder (in a hidden `.git` subfolder it creates), as long as you tell it what to save.

## Staging and committing: the save point

Git doesn't automatically save every change you make the instant you make it. You control exactly what gets saved and when, in two steps.

**Staging** (`git add`) marks specific changes as "ready to be included in the next save point." Think of it as putting items into a box before you seal it.

```
git add filename.py
```

You can also stage everything that's changed with `git add .`, though it's worth being deliberate about what you're staging rather than doing this reflexively every time, especially once a project has files you don't want tracked (temporary files, secrets, and so on).

**Committing** (`git commit`) seals that box: it takes everything currently staged and saves it as a permanent point in the project's history, along with a message describing what changed.

```
git commit -m "Add function to calculate total price"
```

Why the two-step process instead of just saving directly? Staging lets you build up exactly the set of changes that belong together in one commit, even if you've been editing several unrelated things in your working folder at once. It's a deliberate pause between "I changed something" and "this specific set of changes is now a permanent, named point in history."

Write commit messages that describe *what changed and why*, not just "update" or "fix stuff." A future reader (again, often you) benefits enormously from `git log` (which shows the commit history) actually telling a story.

## Checking in: `git status` and `git log`

`git status` tells you, right now, which files have changes that aren't staged yet, which are staged and ready to commit, and which aren't tracked by git at all. Run this often, it's the single most useful command for keeping your bearings, especially before running `git add` or `git commit`.

`git log` shows the history of commits: who committed what, when, and the message attached to each one.

## Branches: experimenting without risk

A **branch** is an independent line of work within the same repository. The default branch is usually called `main`. Creating a new branch lets you try something (a risky refactor, a new feature you're not sure about) without touching the working code on `main` at all. If the experiment works, you merge it back in. If it doesn't, you can just abandon that branch, and `main` was never affected.

```
git branch new-feature       # create a branch called new-feature
git checkout new-feature      # switch to it
```

(Newer git versions also support `git switch new-feature` for switching, and `git checkout -b new-feature` to create and switch in one step.)

You won't need branches heavily in Weeks 1-3, but the concept matters: git lets you isolate risky or exploratory work so it can't damage anything that's already working, which is exactly the kind of safety net that makes it worth learning early.

## Remotes: GitHub as your project's copy in the cloud

Everything so far happens only on your own computer. A **remote** is a copy of your repository hosted somewhere else, typically GitHub in this program. Having a remote means your work is backed up off your machine, and it's how you'll eventually share your capstone project with others.

```
git push    # send your local commits up to the remote
git pull    # bring down commits from the remote that you don't have locally
```

You'll connect a local repository to a GitHub remote for the first time when you start Week 1's exercises and project; if you haven't created a GitHub repository yet, do that now, following GitHub's own "create a new repository" flow, then follow the instructions GitHub shows you for connecting an existing local folder to it.

## What to watch for

- Forgetting to `git add` before `git commit`. If `git commit` says there's nothing to commit, or commits less than you expected, check `git status` first; you likely forgot to stage something.
- Vague commit messages ("update," "fix," "asdf") that tell a future reader nothing about what actually changed.
- Committing secrets (API keys, passwords) directly into a file that gets committed and pushed. Once something is pushed to a public GitHub repository, treat it as permanently exposed, even if you delete it in a later commit; assume it's been seen. Keep secrets out of your code entirely (more on this in later weeks) rather than trying to clean them up after the fact.
- Running git commands from outside the repository folder. Like any terminal command, git operates relative to your current location; if a git command complains that it's not a repository, check that you're inside the right folder first.
