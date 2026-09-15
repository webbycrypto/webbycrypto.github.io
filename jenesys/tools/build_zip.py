"""Build a single downloadable zip of the whole Jenesys curriculum (notes,
exercises, projects, solutions -- everything under weeks/, plus the root
README and table of contents), for someone who wants to work through it
entirely offline in their own editor.

Not frozen like build_site.py: this doesn't touch any hand-edited HTML, it
only bundles weeks/*.md and weeks/*.py/.sol/etc into a zip, so it's safe to
rerun any time the curriculum content changes.

Run from the JENESYS directory:

    python tools/build_zip.py
"""
import zipfile
from pathlib import Path

JENESYS_ROOT = Path(__file__).resolve().parent.parent
WEEKS_DIR = JENESYS_ROOT / "weeks"
OUT_DIR = JENESYS_ROOT / "site" / "downloads"
OUT_PATH = OUT_DIR / "jenesys-curriculum.zip"
ARCHIVE_ROOT = "jenesys"

EXCLUDE_DIR_NAMES = {"__pycache__"}
EXCLUDE_FILE_NAMES = {".DS_Store", "Thumbs.db", "desktop.ini"}


def iter_files():
    for path in sorted(WEEKS_DIR.rglob("*")):
        if path.is_dir():
            continue
        if any(part in EXCLUDE_DIR_NAMES for part in path.parts):
            continue
        if path.name in EXCLUDE_FILE_NAMES or path.suffix == ".pyc":
            continue
        yield path
    for name in ("README.md", "table-of-contents.md"):
        yield JENESYS_ROOT / name


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    files = list(iter_files())
    with zipfile.ZipFile(OUT_PATH, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in files:
            rel = path.relative_to(JENESYS_ROOT)
            arcname = f"{ARCHIVE_ROOT}/{rel.as_posix()}"
            zf.write(path, arcname)

    size_kb = OUT_PATH.stat().st_size / 1024
    print(f"{len(files)} files zipped -> {OUT_PATH} ({size_kb:.0f} KB)")


if __name__ == "__main__":
    main()
