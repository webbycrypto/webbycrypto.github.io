# Tailwind build

PyDrop uses Tailwind CSS for its layout shell (drawer sidebar, two-pane main content split) and a few other new/changed pieces. It's built with the **standalone Tailwind CLI** (no Node/npm required) rather than a bundler, consistent with the rest of the project (no build tooling, everything else is plain static HTML/CSS/JS).

The compiled output (`styles/tailwind.css`) is committed to the repo and loaded directly by `index.html` -- there's no build step at runtime, and nothing here needs to run for the site to work. Only re-run the build if you're adding or changing Tailwind utility classes in `index.html`, `scripts/ui.js`, or `scripts/app.js`.

## One-time setup

1. Download the standalone CLI binary (Windows) from Tailwind's GitHub releases:
   `https://github.com/tailwindlabs/tailwindcss/releases/download/v4.3.3/tailwindcss-windows-x64.exe`
2. Save it as `tools/tailwindcss.exe` (relative to the `pydrop/` repo root). This path is gitignored -- it's a devtool binary, not a runtime asset, so it isn't committed.

Version pinned: **v4.3.3**. Tailwind v4 uses CSS-first configuration (`@theme` blocks in `styles/tailwind/input.css`), not a `tailwind.config.js` file.

## Rebuilding

```
tools\tailwindcss.exe -i styles\tailwind\input.css -o styles\tailwind.css --minify
```

Run from the `pydrop/` directory. This scans `index.html`, `scripts/ui.js`, `scripts/app.js`, and `challenges/*.js` (per the `@source` directives in `input.css`) for utility classes and regenerates `styles/tailwind.css`.
