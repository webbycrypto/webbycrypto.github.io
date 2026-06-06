# pyoffline

A single-file CLI tool that downloads Python packages to a local store while you're online, then installs from that store without an internet connection. Includes a built-in HTML knowledge base with step-by-step guides for FastAPI, Django, Flask, and XRPL.

---

## Requirements

- Python 3.10+
- pip
- Internet connection for downloading (not for installing)

---

## Setup

### 1. Add the `pyoffline` shortcut to PowerShell

Open your PowerShell profile:

```powershell
notepad $PROFILE
```

Add this line (already done if you set this up with Claude):

```powershell
function pyoffline { python "C:\Users\danie\Documents\Web Projects\pyoffline\pyoffline.py" @args }
```

Save, then restart your terminal. You can now run `pyoffline` from anywhere.

### 2. Folder locations

| Path | Purpose |
|---|---|
| `C:\Users\danie\Documents\Web Projects\pyoffline\pyoffline.py` | The tool itself |
| `D:\pyoffline\` | Where downloaded packages are stored |
| `D:\pyoffline-guides\` | Where generated HTML guides are saved |

---

## Commands

### `download` — fetch packages while online

Downloads `.whl` files to `D:\pyoffline`. Run this once per machine before going offline. Packages accumulate — running it multiple times is safe, duplicates are skipped.

```bash
# Download a framework bundle
pyoffline download --bundle fastapi
pyoffline download --bundle django
pyoffline download --bundle flask
pyoffline download --bundle xrpl

# Download multiple bundles at once
pyoffline download --bundle fastapi xrpl

# Download everything (all 4 bundles)
pyoffline download --bundle all

# Also include common utilities (pytest, rich, requests, black, etc.)
pyoffline download --bundle all --common

# Download from a requirements.txt file
pyoffline download -r requirements.txt

# Download specific packages by name
pyoffline download --packages httpx rich pydantic
```

---

### `install` — install packages offline

Installs from `D:\pyoffline` without touching PyPI. Run this inside an activated virtual environment.

```bash
# Install a bundle
pyoffline install --bundle fastapi

# Install from a requirements.txt
pyoffline install -r requirements.txt

# Install specific packages
pyoffline install --packages httpx rich
```

> If a package is missing from the store you'll see `No matching distribution found`. Go online and run `pyoffline download --packages <name>`, then retry.

---

### `guide` — HTML knowledge base

Generates offline HTML guides for each framework, or opens them in your browser.

```bash
# Generate all 5 HTML files (index + one per framework)
pyoffline guide --generate

# Generate only one framework's guide
pyoffline guide --generate --bundle fastapi

# Open the index page in your browser
pyoffline guide --open

# Open a specific guide
pyoffline guide --open --bundle django
pyoffline guide --open --bundle flask
pyoffline guide --open --bundle xrpl
```

Guides are saved to `D:\pyoffline-guides\`. They work fully offline — no CDN, no internet required. Each guide includes:

- Step-by-step working code examples
- Python backend + matching HTML/template files side by side
- All JavaScript lines explained in plain English
- Dark / Light theme toggle (preference saved across pages)
- Syntax highlighting for Python, HTML, and Bash
- Copy button on every code block

**What each guide covers:**

| Guide | Topics |
|---|---|
| FastAPI | Project setup, SQLAlchemy DB, JWT auth, data table, delete button, file upload, background tasks, dependency injection |
| Django | Project setup, models, forms + CSRF, templates + template tags, pagination, search, class-based views, signals, custom middleware |
| Flask | App factory, blueprints, models, Jinja2 templates, WTForms, file upload, redirect after POST, error pages |
| XRPL | Wallet creation, balance check, send payment, transaction history, trust lines, escrow, NFT minting |

---

### `bundles` — list all packages

Shows every package in each bundle.

```bash
pyoffline bundles
```

---

### `list` — see what's cached

Shows all `.whl` and `.tar.gz` files currently in `D:\pyoffline`.

```bash
# List everything in the store
pyoffline list

# Show expected packages for a bundle
pyoffline list --bundle fastapi
```

---

### `config` — toggle pip online/offline mode

Writes or removes a `pip.ini` file so plain `pip install` also uses the local store — no flags needed.

```bash
# Lock pip to the local store (all pip installs go offline)
pyoffline config --offline

# Restore pip to normal online mode
pyoffline config --online

# Check current setting
pyoffline config --show
```

> When `--offline` is active, running `pip install <anything>` will only look in `D:\pyoffline`. Remember to switch back with `--online` when you want to install from PyPI normally.

---

## Typical Workflow

### First time (online)

```bash
# Download everything you need
pyoffline download --bundle all --common

# Generate the knowledge base
pyoffline guide --generate
pyoffline guide --open
```

### Starting a new project (offline)

```bash
# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate

# Install what you need
pyoffline install --bundle fastapi
# or
pyoffline install -r requirements.txt
```

### Adding a package you forgot to download

```bash
# Go online, download it
pyoffline download --packages celery redis

# Then install offline as normal
pyoffline install --packages celery redis
```

---

## Available Bundles

| Bundle | Key packages |
|---|---|
| `fastapi` | fastapi, uvicorn, pydantic, sqlalchemy, alembic, python-jose, passlib, httpx, celery, redis, pytest |
| `django` | django, djangorestframework, simplejwt, celery, redis, boto3, channels, gunicorn, pytest-django |
| `flask` | flask, flask-sqlalchemy, flask-login, flask-jwt-extended, flask-wtf, gunicorn, marshmallow, pytest-flask |
| `xrpl` | xrpl-py, websockets, mnemonic, pycryptodome, hdwallet, aiohttp, pytest-asyncio |
| `common` | requests, httpx, pydantic, sqlalchemy, redis, loguru, black, mypy, pytest, faker, rich, click, typer |

Run `pyoffline bundles` to see the full list of every package in each bundle.

---

## Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `No matching distribution found` | Package not in store | `pyoffline download --packages <name>` while online |
| `[skip] package — not compatible` | Package requires a different Python version | Normal — tool skips it and continues |
| `Store not found` | Haven't downloaded anything yet | Run `pyoffline download` first |
| `pyoffline: command not found` | Profile not loaded | Restart terminal or run `. $PROFILE` |
