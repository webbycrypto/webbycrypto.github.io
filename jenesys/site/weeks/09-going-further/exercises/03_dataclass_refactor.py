"""
Exercise 3: refactor into a dataclass

Task:
Below is a plain class, written the way notes/01-classes.md's
SupportTicket was, by hand.

    class Playlist:
        def __init__(self, name, songs=[]):
            self.name = name
            self.songs = songs

Rewrite Playlist as a @dataclass. Along the way, fix the bug already
sitting in the version above: songs=[] is the exact mutable-default
trap from notes/03-dataclasses.md, just not caught yet because this
version is still a plain class.

Then prove the fix works: create two Playlist instances with no songs
argument passed, add a song to the first one only, and print both
playlists' songs to show they're independent lists, not the same one.

Expected behavior:
Running this file should print the first playlist's songs (containing
the one you added) and the second playlist's songs (still empty),
proving they don't share state.
"""

# your code here
