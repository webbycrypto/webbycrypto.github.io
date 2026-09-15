# The command line

[← Back to Week 1: Foundations I](../README.md)

## TL;DR

The command line lets you type instructions instead of clicking, and it's the fastest way to move around your files and run your code. This page covers the basic navigation commands, running a Python script, and reading an error when one shows up.

- `pwd` shows your current folder, `ls` lists what's inside it, and `cd folder_name` moves into it (`cd ..` moves back up one level).
- Once you're in the right folder, run a script with `python filename.py` (or `py filename.py` on some Windows setups).
- If the script crashes, Python prints a traceback. Read it from the bottom up: the last line says what went wrong, and the line number just above it says where.

```
pwd                    # shows your current folder
ls                     # lists what's inside it
cd week1               # moves into that folder

python main.py
Traceback (most recent call last):
  File "main.py", line 5, in <module>
    print(total)
NameError: name 'total' is not defined
```

## What the command line actually is

Up to now, you've probably interacted with computers mostly by clicking icons, buttons, and menus. That's called a graphical user interface, or GUI. The command line (also called a terminal, shell, or console) is a different, older way of interacting with a computer: you type instructions as text, and the computer responds with text.

This isn't outdated or purely for show. The command line gives you direct, precise control that clicking around a file browser doesn't: you can run a program with an exact set of options, chain multiple commands together, and do the same operation on a thousand files as easily as on one. Every developer uses it daily, not out of tradition, but because it's genuinely the fastest and most precise way to do most of what programming actually requires: running your code, moving around your project's files, and using tools like git.

VS Code has a terminal built in (View menu, then Terminal, or the shortcut shown there). That's the terminal you'll use throughout this program.

## Navigating: where am I, and what's here

Every terminal session has a "current location," a specific folder your commands operate relative to, similar to a folder currently open in a file browser window, except invisible until you ask.

On Mac or Linux (bash/zsh):
- `pwd` prints your current location ("print working directory").
- `ls` lists what's in the current folder.
- `cd folder_name` moves ("changes directory") into `folder_name`.
- `cd ..` moves up one level, to the parent folder.

On Windows (PowerShell, which is what VS Code's terminal uses by default on Windows):
- `pwd` also works in PowerShell and shows your current location.
- `ls` also works in PowerShell (it's aliased to the equivalent PowerShell command).
- `cd folder_name` and `cd ..` work the same way as above.

You'll be doing this constantly: making sure you're in the right folder before running a script, creating a new folder for a new exercise, moving into a project's folder before starting work on it. If a command fails with something like "no such file or directory," the very first thing to check is whether you're actually in the folder you think you're in. Run `pwd` (or `ls`) to confirm before assuming the error is anything more complicated.

## Running a Python script

Once you're in the right folder (the one containing your `.py` file), you run it with:

```
python filename.py
```

If that gives you an error saying `python` isn't recognized, and you're on Windows, try `py filename.py` instead; some Windows Python installs register the command as `py` rather than `python`. This was covered during setup in Week 0, so if it's still not working, revisit that section.

## Reading error output (tracebacks)

When a Python script hits a problem it can't recover from, it stops and prints something called a **traceback**. It looks intimidating at first, but it's built to be read in a specific way, and once you know the pattern, it's one of the most useful things Python gives you. Here's an example:

```
Traceback (most recent call last):
  File "script.py", line 5, in <module>
    print(total)
NameError: name 'total' is not defined
```

Read this from the bottom up. The very last line is the most important one: it tells you the *type* of error (`NameError`) and a specific message (`name 'total' is not defined`). Start there. It's telling you, in plain terms, what went wrong: you tried to use a variable called `total` that Python has no record of ever being created.

Once you know *what* went wrong, look at the line just above it to find *where*: `File "script.py", line 5` tells you the exact file and line number where the problem was detected. Go look at that line.

If the traceback is longer (which happens once your code calls functions that call other functions), you'll see multiple "File ... line ..." entries stacked up, one per level of function call, with the oldest call at the top and the most recent (the one where things actually broke) at the bottom, right above the final error message. You generally care most about the bottom of that stack, and specifically the first entry from *your own file* (as opposed to Python's internal library code), since that's almost always where the actual mistake lives, even if the error only became visible somewhere deeper.

Do not panic at the length of a traceback or the unfamiliar words in it. The habit to build is: read the last line first for what and why, then look at the line number to find where, then go look at your code at that exact spot. Week 2's notes go deeper on the full debugging process; this is the first building block of it.

## What to watch for

- Running a command from the wrong folder. If something can't be found, check `pwd`/`ls` before assuming anything else is broken.
- Reading a traceback top to bottom out of habit (the way you'd read a book) instead of bottom to top. The actual error type and message are at the very bottom, read that first.
- Getting overwhelmed by a long traceback. Focus on the last line, then the most recent entry from your own file, not every line in between.
