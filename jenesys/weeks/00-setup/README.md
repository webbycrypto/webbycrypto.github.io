# Week 0: Setup

[← Back to Weeks](../README.md)

Before Day 1 of Week 1, get the tools installed and the accounts created. None of this is programming yet. It's the equivalent of unpacking your toolbox before you build anything. Budget half a day for this, and don't feel behind if part of it takes longer: computers are inconsistent about installers, and getting unstuck here using only error messages and search is itself the first rep of the exact skill this whole program is training.

## 1. A code editor: VS Code

VS Code is a free program for writing and running code, with helpers built in (it points out typos, colors your code so it's easier to read, and lets you run programs without leaving it).

1. Go to [code.visualstudio.com](https://code.visualstudio.com) and download the installer for your operating system.
2. Run the installer, accepting the defaults.
3. Open VS Code once, just to confirm it launches.

## 2. Python 3

Python is the language used for the entire program. "Installing Python" means putting the program that reads and runs Python code onto your computer.

1. Go to [python.org/downloads](https://python.org/downloads) and download the latest Python 3 release (3.11 or newer).
2. Run the installer. On Windows, make sure the checkbox that says something like "Add python.exe to PATH" is checked before you click install. This matters: without it, your computer won't know what you mean when you type `python` later.
3. Confirm it worked. Open a terminal (in VS Code: View menu, then Terminal) and type:

   ```
   python --version
   ```

   You should see something like `Python 3.12.1`. If instead you see an error like "command not found," the PATH step above didn't take. Search the exact error message plus your operating system name; this is a common, well-documented fix, and looking it up is exactly the debugging habit the program is built around.

## 3. Git and GitHub

Git tracks changes to your code over time. GitHub is a website that stores a copy of your code online and is where you'll eventually share your capstone project.

1. Install git: [git-scm.com/downloads](https://git-scm.com/downloads). Accept the defaults during install.
2. Confirm it worked: in a terminal, type `git --version`. You should see a version number.
3. Create a free account at [github.com](https://github.com) if you don't already have one.
4. Tell git who you are (replace with your own name and the email you used for GitHub):

   ```
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
   ```

You'll learn what git actually does, beyond typing these setup commands, in Week 1, Day 3.

## 4. Hosted AI model API keys (needed by Week 4, then again by Week 5)

The AI track calls a hosted model over the internet rather than running one on your own computer. To do that, you need an API key: a private password-like string that identifies your account. This program uses two different providers, on purpose, at two different points:

- **Groq**, for Week 4's taste week. Groq's free tier needs no credit card and bills nothing, which keeps your very first hosted-API experience completely frictionless.
- **Anthropic**, for Week 5 onward, once you've committed to the AI track for real. This one does bill (usage in this program is small; a free tier or a few dollars of credit is enough for the whole rest of the bootcamp), and this program's Week 5+ examples use Anthropic's Python SDK, called `anthropic`.

Steps for each:

1. Create a free account at [console.groq.com](https://console.groq.com), find the API keys section, and generate a key. No payment details needed.
2. Separately, create an account with Anthropic at [console.anthropic.com](https://console.anthropic.com) for later, and generate a key there too, when you're ready (this one is tied to a payment method or prepaid credit, so there's no rush to do this before Week 4).
3. Copy each key somewhere safe. Treat both like passwords: anyone who has one can use it in your name (and, for the Anthropic key, spend your account's credits). Never put either directly in a code file that gets shared or uploaded anywhere (including GitHub); Week 1 covers a safe way to store secrets like these (an environment variable or a local, git-ignored config file).

You don't need the Groq key until Week 4, or the Anthropic key until Week 5, but account creation can occasionally take a little time to verify, so it's worth having at least the Groq account ready ahead of Week 4.

## 5. Blockchain track tools (needed by Week 4)

Only needed once you reach Week 4's blockchain taste, but the account creation step can also take time, so it's worth doing now.

1. Install the Python blockchain libraries. In a terminal:

   ```
   pip install web3 eth-ape
   ```

2. Create a free account with a node provider like [Infura](https://infura.io) or [Alchemy](https://alchemy.com). These companies run the actual blockchain servers so you don't have to; your account gives you a personal URL (an RPC endpoint) your Python code will use to talk to a public test network.
3. Note: this program never uses real cryptocurrency and never connects a personal wallet to a browser. Every transaction happens on a testnet, a practice version of a blockchain that uses fake, worthless test funds, and every transaction is sent from Python code, not a browser extension. Week 4 covers where to get free testnet funds from a "faucet" (a site that gives out small amounts of test currency for free).

## Before you start Week 1

You should be able to answer yes to all of these:

- [ ] VS Code opens and I can create and save a new file in it.
- [ ] Typing `python --version` in a terminal shows a Python 3.11+ version number.
- [ ] Typing `git --version` shows a version number, and I've set my name and email with `git config`.
- [ ] I have a GitHub account.
- [ ] I've created a free Groq account (the key itself can wait until Week 4 if you'd rather not hold onto it yet). An Anthropic account can wait until Week 5.
- [ ] I've installed `web3` and `eth-ape` and created an account with a node provider (this can also wait until Week 4).

If any of these took real troubleshooting to get working, that's not a bad sign. That's the program starting already.
