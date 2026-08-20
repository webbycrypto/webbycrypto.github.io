# pyoffline Course Style Guide

This document defines the rules every course file must follow — visual structure, writing style, code comment style, and how to register a new course in `index.html`. Follow it exactly when creating or editing any guide.

---

## 1. File Structure

Every course is a single self-contained HTML file. No external CSS or JS dependencies. Copy the skeleton below and fill in the blanks.

```
TITLE       → the browser tab title, e.g. "Docker - FastAPI Guide - pyoffline"
ACCENT      → the course accent colour (hex). Controls step numbers, tab underlines, sidebar links, header border.
GUIDE_TITLE → the h1 shown in the page header, e.g. "Docker for FastAPI Developers"
GUIDE_DESC  → one or two sentences shown under the h1. Same style as the index card description.
INSTALL_*   → commands shown in the sidebar install box.
NAV_ITEMS   → one <li> per step, href="#stepN", text is the step title.
STEPS       → the step divs (see Section 3).
```

---

## 2. The HTML Skeleton

Paste this exactly. Replace every ALL_CAPS placeholder.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>TITLE</title>
<style>
:root {
  --bg:          #121212;
  --surface:     #1e1e1e;
  --surface2:    #2a2a2a;
  --sidebar-bg:  #1a1a1a;
  --text:        #e0e0e0;
  --text-muted:  #aaa;
  --text-dim:    #666;
  --border:      #333;
  --code-bg:     #1e1e1e;
  --code-text:   #d4d4d4;
  --shadow:      rgba(0,0,0,.4);
  --accent:      ACCENT;
  --hl-keyword:  #569cd6;
  --hl-string:   #ce9178;
  --hl-comment:  #6a9955;
  --hl-number:   #b5cea8;
  --hl-decorator:#dcdcaa;
  --hl-builtin:  #4ec9b0;
  --hl-tag:      #4ec9b0;
  --hl-attr:     #9cdcfe;
  --hl-template: #c586c0;
}
html.light {
  --bg:          #f5f7fa;
  --surface:     #ffffff;
  --surface2:    #eef0f3;
  --sidebar-bg:  #ffffff;
  --text:        #1a1a1a;
  --text-muted:  #555;
  --text-dim:    #888;
  --border:      #dde1e7;
  --code-bg:     #f8f8f8;
  --code-text:   #24292e;
  --shadow:      rgba(0,0,0,.1);
  --hl-keyword:  #0000ff;
  --hl-string:   #a31515;
  --hl-comment:  #008000;
  --hl-number:   #098658;
  --hl-decorator:#795e26;
  --hl-builtin:  #267f99;
  --hl-tag:      #800000;
  --hl-attr:     #e50000;
  --hl-template: #af00db;
}
.hl-keyword  { color: var(--hl-keyword);  }
.hl-string   { color: var(--hl-string);   }
.hl-comment  { color: #adb4a7; font-size: 12px; font-style: italic; }
.hl-number   { color: var(--hl-number);   }
.hl-decorator{ color: var(--hl-decorator);}
.hl-builtin  { color: var(--hl-builtin);  }
.hl-tag      { color: var(--hl-tag);      }
.hl-attr     { color: var(--hl-attr);     }
.hl-template { color: var(--hl-template); }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; transition: background .2s, color .2s; }
a { color: var(--accent); }
.layout { display: flex; min-height: 100vh; }
.sidebar { width: 260px; min-width: 260px; background: var(--sidebar-bg); border-right: 1px solid var(--border); padding: 24px 16px; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
.sidebar h2 { font-size: 1.1rem; margin: 16px 0 8px; color: var(--text); }
.sidebar nav ol { padding-left: 18px; }
.sidebar nav li { margin: 6px 0; }
.sidebar nav a { color: var(--text-muted); text-decoration: none; font-size: 0.85rem; }
.sidebar nav a:hover { color: var(--accent); }
.back-link { color: var(--text-dim); text-decoration: none; font-size: 0.85rem; display: block; margin-bottom: 8px; }
.install-box { margin-top: 24px; background: var(--bg); border: 1px solid var(--border); padding: 12px; border-radius: 6px; font-size: 0.8rem; }
.install-box code { display: block; word-break: break-all; color: var(--hl-comment); font-family: monospace; margin-top: 4px; }
main { flex: 1; padding: 40px; max-width: 860px; }
.guide-header { padding: 20px 20px 20px 24px; background: var(--surface); border-radius: 8px; margin-bottom: 32px; box-shadow: 0 1px 3px var(--shadow); }
.guide-header h1 { font-size: 1.8rem; margin-bottom: 8px; }
.guide-header p { color: var(--text-muted); }
.step { display: flex; gap: 16px; margin-bottom: 40px; }
.step-number { width: 32px; min-width: 32px; height: 32px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9rem; margin-top: 4px; color: #fff; }
.step-content { flex: 1; min-width: 0; }
.step-content h3 { font-size: 1.1rem; margin-bottom: 8px; color: var(--text); }
.explanation { color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 14px; }
.info-box { background: var(--surface); border-left: 3px solid var(--accent); border-radius: 0 6px 6px 0; padding: 12px 16px; margin-bottom: 14px; font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; }
.info-box strong { color: var(--text); }
.crud-table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 0.85rem; }
.crud-table th { background: var(--surface2); color: var(--text-muted); text-align: left; padding: 8px 12px; border: 1px solid var(--border); font-weight: 600; }
.crud-table td { padding: 8px 12px; border: 1px solid var(--border); color: var(--text); }
.crud-table tr:nth-child(even) td { background: var(--surface); }
.tabs { background: var(--surface); border-radius: 6px; overflow: hidden; border: 1px solid var(--border); }
.tab-bar { display: flex; background: var(--surface2); overflow-x: auto; border-bottom: 1px solid var(--border); }
.tab-btn { padding: 8px 16px; background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.8rem; white-space: nowrap; border-bottom: 2px solid transparent; margin-bottom: -1px; }
.tab-btn.active { color: var(--text); border-bottom-color: var(--accent); }
.tab-panel { display: none; }
.tab-panel.active { display: block; }
.code-header { display: flex; justify-content: space-between; align-items: center; padding: 5px 12px; background: var(--surface2); border-bottom: 1px solid var(--border); }
.lang-label { font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: .04em; }
.copy-btn { background: none; border: 1px solid var(--border); color: var(--text-muted); padding: 2px 8px; cursor: pointer; border-radius: 3px; font-size: 0.72rem; }
.copy-btn:hover { color: var(--text); border-color: var(--text-muted); }
pre { overflow-x: auto; padding: 16px; background: var(--code-bg); }
code { font-family: "Fira Code", "Cascadia Code", "Consolas", monospace; font-size: 0.82rem; line-height: 1.65; color: var(--code-text); }
.theme-row { display: flex; align-items: center; gap: 8px; margin-top: 20px; }
.theme-label { font-size: 0.78rem; color: var(--text-muted); }
.toggle-switch { position: relative; display: inline-block; width: 40px; height: 22px; }
.toggle-switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; inset: 0; background: var(--surface2); border: 1px solid var(--border); border-radius: 22px; transition: background .2s; }
.slider:before { content: ""; position: absolute; width: 16px; height: 16px; left: 2px; top: 2px; background: var(--text-muted); border-radius: 50%; transition: transform .2s, background .2s; }
.toggle-switch input:checked + .slider { background: var(--accent); border-color: var(--accent); }
.toggle-switch input:checked + .slider:before { transform: translateX(18px); background: #fff; }
.sidebar-toggle { display: none; position: fixed; top: 12px; left: 12px; z-index: 300; background: var(--accent); color: #fff; border: none; padding: 7px 14px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: 600; box-shadow: 0 2px 8px var(--shadow); align-items: center; gap: 6px; }
.sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 190; }
.sidebar-overlay.open { display: block; }
@media (max-width: 900px) {
  .sidebar-toggle { display: flex; }
  .layout { display: block; }
  .sidebar { position: fixed; left: -280px; top: 0; height: 100vh; z-index: 200; transition: left .25s ease; box-shadow: 2px 0 16px var(--shadow); min-width: 260px; }
  .sidebar.open { left: 0; }
  main { padding: 60px 20px 40px; max-width: 100%; }
  pre { overflow-x: auto; max-width: 100%; white-space: pre-wrap; word-break: break-word; }
  .tabs { max-width: 100%; }
}
.sidebar { transition: width .2s ease, min-width .2s ease, padding .2s ease; }
.sb-pin { display: flex; justify-content: flex-end; margin-bottom: 8px; }
.sb-pin button { background: none; border: 1px solid var(--border); color: var(--text-dim); cursor: pointer; border-radius: 4px; padding: 2px 7px; font-size: 11px; line-height: 1.6; }
.sb-pin button:hover { color: var(--accent); border-color: var(--accent); }
.sb-reopen { display: none; position: fixed; left: 0; top: 50%; transform: translateY(-50%); background: var(--accent); color: #fff; border: none; border-radius: 0 4px 4px 0; padding: 10px 5px; cursor: pointer; z-index: 300; font-size: 11px; font-weight: 600; writing-mode: vertical-rl; letter-spacing: .05em; }
@media (min-width: 901px) { body.sb-collapsed .sidebar { width: 0; min-width: 0; padding: 0; overflow: hidden; border-right: none; } body.sb-collapsed .sb-reopen { display: block; } }
@media (max-width: 900px) { .sb-pin { display: none; } .sb-reopen { display: none !important; } }
</style>
</head>
<body>
<button class="sidebar-toggle" id="sidebarToggle" onclick="toggleSidebar()">&#9776; Steps</button>
<div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>
<button class="sb-reopen" onclick="toggleSbDesktop()">Steps</button>
<div class="layout">
  <aside class="sidebar" id="guideSidebar">
    <div class="sb-pin"><button onclick="toggleSbDesktop()">&#9664; Hide</button></div>
    <a href="index.html" class="back-link">← All Guides</a>
    <h2>SIDEBAR_TITLE</h2>
    <nav><ol>
      NAV_ITEMS
    </ol></nav>
    <div class="install-box">
      INSTALL_CONTENT
    </div>
    <div class="theme-row">
      <span class="theme-label">Dark</span>
      <label class="toggle-switch">
        <input type="checkbox" id="themeToggle">
        <span class="slider"></span>
      </label>
      <span class="theme-label">Light</span>
    </div>
  </aside>
  <main>
    <header class="guide-header" style="border-left: 5px solid ACCENT">
      <h1>GUIDE_TITLE</h1>
      <p>GUIDE_DESC</p>
    </header>
    <div class="steps">
      STEPS
    </div>
  </main>
</div>
<script>
(function() {
  var saved = localStorage.getItem("pyoffline-theme");
  if (saved === "light") { document.documentElement.classList.add("light"); }
  document.addEventListener("DOMContentLoaded", function() {
    var toggle = document.getElementById("themeToggle");
    if (!toggle) return;
    toggle.checked = (localStorage.getItem("pyoffline-theme") === "light");
    toggle.addEventListener("change", function() {
      if (this.checked) {
        document.documentElement.classList.add("light");
        localStorage.setItem("pyoffline-theme", "light");
      } else {
        document.documentElement.classList.remove("light");
        localStorage.setItem("pyoffline-theme", "dark");
      }
    });
  });
})();
function switchTab(stepId, idx) {
  var step   = document.getElementById(stepId);
  var btns   = step.querySelectorAll(".tab-btn");
  var panels = step.querySelectorAll(".tab-panel");
  btns.forEach(function(b) { b.classList.remove("active"); });
  panels.forEach(function(p) { p.classList.remove("active"); });
  btns[idx].classList.add("active");
  panels[idx].classList.add("active");
}
function copyCode(btn) {
  var code = btn.closest(".tab-panel").querySelector("code").innerText;
  navigator.clipboard.writeText(code).then(function() {
    var orig = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(function() { btn.textContent = orig; }, 1500);
  });
}
function toggleSidebar() {
  var sidebar = document.getElementById("guideSidebar");
  var overlay = document.getElementById("sidebarOverlay");
  if (!sidebar) return;
  sidebar.classList.toggle("open");
  overlay.classList.toggle("open");
}
document.addEventListener("DOMContentLoaded", function() {
  var sidebar = document.getElementById("guideSidebar");
  if (!sidebar) return;
  sidebar.querySelectorAll("nav a").forEach(function(a) {
    a.addEventListener("click", function() {
      sidebar.classList.remove("open");
      var overlay = document.getElementById("sidebarOverlay");
      if (overlay) overlay.classList.remove("open");
    });
  });
});
function toggleSbDesktop() {
  var c = document.body.classList.toggle('sb-collapsed');
  localStorage.setItem('sb-collapsed', c ? '1' : '0');
}
(function() { if (localStorage.getItem('sb-collapsed') === '1') document.body.classList.add('sb-collapsed'); })();
</script>
</body>
</html>
```

---

## 3. Step Structure

Every step follows this exact HTML pattern:

```html
<div class="step" id="stepN">
  <div class="step-number">N</div>
  <div class="step-content">
    <h3>Step Title Here</h3>
    <p class="explanation">Explanation text here.</p>
    <div class="tabs" data-step="stepN">
      <div class="tab-bar">
        <button class="tab-btn active" onclick="switchTab('stepN',0)">tab one</button>
        <button class="tab-btn" onclick="switchTab('stepN',1)">tab two</button>
      </div>
      <div class="tab-panel active" id="stepN_panel0">
        <div class="code-header">
          <span class="lang-label">python</span>
          <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        </div>
        <pre><code>YOUR CODE HERE</code></pre>
      </div>
      <div class="tab-panel" id="stepN_panel1">
        <div class="code-header">
          <span class="lang-label">bash</span>
          <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        </div>
        <pre><code>YOUR CODE HERE</code></pre>
      </div>
    </div>
  </div>
</div>
```

Rules:
- `id="stepN"` on the outer div matches the sidebar nav href `#stepN`
- `data-step="stepN"` on `.tabs` is required for tab switching to work
- Tab panel ids follow `stepN_panel0`, `stepN_panel1`, etc.
- First tab is always `active` by default
- `lang-label` text: `python`, `bash`, `html`, `text`, `css`, `yaml`, `json`

---

## 4. Writing Style — Explanation Paragraphs

The `<p class="explanation">` is the only place body text appears. It introduces the step before the reader looks at the code.

**Rules:**
- 2 to 4 sentences maximum per paragraph.
- One idea per sentence. Do not combine two concepts with a semicolon or a comma clause.
- No em dashes (—). Replace with a period, a comma, or the word "and".
- Write for a beginner who knows basic Python but has never used a web framework.
- Keep the same information — just make it readable.
- Prose only. No bullet points, no bold text, no headers inside the explanation.

**Bad (do not write like this):**
> POST is the HTTP method for sending new data to the server to be saved. The parameters in the function signature — name and description — are read from the URL query string automatically by FastAPI. The global keyword tells Python that next_id refers to the variable defined outside the function, not a new local one — without it, Python would create a new local next_id and the counter would never increment.

**Good (write like this):**
> POST sends new data to the server and FastAPI automatically extracts the values from the URL. To keep track of each new item, the code uses a counter that lives outside the function so the ID numbers keep increasing instead of resetting. The item is saved into a dictionary under its new ID and sent back to confirm it was created.

---

## 5. Writing Style — Inline Code Comments

Code comments explain the WHY and WHAT of each non-obvious line. They appear on the same line as the code, right-aligned with spacing, or on their own line above a block.

**Rules:**
- Comment every decorator, every non-obvious parameter, every return value.
- Short and specific. One idea per comment.
- Use `→` (arrow) in comments to mean "maps to" or "becomes", e.g. `# "3" → 3` or `# path → /items/3`.
- Use `:` after a keyword to introduce a short definition, e.g. `# global: use the variable from outside`.
- Do NOT comment obvious lines like `return items` or `import os`.
- Align trailing comments with spaces so they line up vertically when multiple lines share the same block.

**Example — good inline comment style:**
```python
@app.post("/items")          # responds to: POST /items
def create_item(name: str, description: str = None):
    # name: str        → required, FastAPI rejects the request if missing
    # description: str → optional, defaults to None if not provided

    global next_id  # use the counter defined at module level, not a new local one

    db[next_id] = {
        "id":          next_id,      # store the ID inside the item so it's easy to return
        "name":        name,         # value read from the URL query string
        "description": description   # None if the caller did not provide it
    }

    next_id += 1            # advance the counter for the next call
    return db[next_id - 1]  # return the item we just saved
```

**Example — block comment above a group:**
```python
# ── Only update the fields that were actually provided ──────────
if name is not None:
    db[item_id]["name"] = name
if description is not None:
    db[item_id]["description"] = description
```

---

## 6. Syntax Highlighting Spans

All code inside `<pre><code>` must use these span classes. Do not use any other inline styles.

| Span class | Used for |
|---|---|
| `hl-keyword` | Python keywords: `from`, `import`, `def`, `class`, `if`, `return`, `global`, `not`, `in`, `and`, `or`, `None`, `True`, `False` |
| `hl-string` | String literals: `"hello"`, `'world'`, f-strings |
| `hl-comment` | Comments: `# anything after a hash` |
| `hl-number` | Numeric literals: `1`, `3.14`, `404` |
| `hl-decorator` | Decorators and function names: `@app.post`, `create_item` |
| `hl-builtin` | Built-in types and functions: `str`, `int`, `bool`, `list`, `dict`, `print` |
| `hl-tag` | HTML tags: `<div>`, `<form>` |
| `hl-attr` | HTML attributes: `name="..."`, `class="..."` |
| `hl-template` | Jinja2 template syntax: {% raw %}`{{ }}`, `{% %}`{% endraw %} |

HTML special characters inside `<pre><code>` must be escaped: `<` → `&lt;`, `>` → `&gt;`, `&` → `&amp;`.

---

## 7. Info Boxes

Use an `.info-box` for tips, warnings, comparisons, and "what to do next" signposts. Not for code.

```html
<div class="info-box">
  <strong>Label here:</strong> One or two sentences of plain-English explanation.
  Code snippets inline: <code>pip install something</code>.
</div>
```

---

## 8. Tables

Use `.crud-table` for comparison tables, mapping tables, and reference data.

```html
<table class="crud-table">
  <tr><th>Column A</th><th>Column B</th></tr>
  <tr><td>row value</td><td>row value</td></tr>
</table>
```

---

## 9. Accent Colours — Existing Guides

Use a distinct accent for each course. Do not reuse an existing colour without a good reason.

| Guide | Accent |
|---|---|
| FastAPI / CRUD / todo-fastapi | `#009688` teal |
| Auth series | `#f44336` red |
| Deployment series | `#607d8b` blue-grey |
| CRM Integration | `#9c27b0` purple |
| Public API | `#2196f3` blue |
| SQLite + PostgreSQL | `#ff9800` orange |
| HTMX | `#e44d26` orange-red |
| Background Tasks | `#ff5722` deep orange |
| WebSockets | `#7c4dff` violet |
| File Uploads | `#00bcd4` cyan |
| Testing | `#7cb342` light green |
| DRF | `#00897b` teal-green |
| Lead Enrichment | `#0277BD` light blue dark |
| RAG Knowledge Base | `#5E35B1` deep purple |
| **New guides — use these:** | |
| Docker | `#2496ed` Docker blue |
| Pydantic | `#e92063` Pydantic pink |
| Caching / Redis | `#dc382d` Redis red |
| Logging | `#ff6f00` amber |
| API Docs | `#00acc1` cyan-dark |
| Git Workflow | `#f05032` Git orange-red |

---

## 10. Registering a Course in index.html

Add a card inside the correct section `<div class="grid">`. Each section has a full-width divider with a title and description above its cards.

**Card format:**
```html
<a href="FILENAME.html" class="card" style="border-top: 4px solid ACCENT">
  <h2 style="color:ACCENT">Card Title</h2>
  <p>One or two sentences describing what the reader will build or learn. Be specific — name the tools and patterns covered.</p>
  <span class="badge">N steps</span>
</a>
```

**Section placement for new guides:**

| Guide | Section | Position |
|---|---|---|
| `pydantic-fastapi.html` | FastAPI Learning Series | After CRUD, before task-ai |
| `api-docs-fastapi.html` | FastAPI Learning Series | After pydantic, before task-ai |
| `caching-fastapi.html` | Real-World Patterns | After background-tasks |
| `logging-fastapi.html` | Real-World Patterns | After testing |
| `docker-fastapi.html` | Deployment + DevOps | First in section, before deploy-vps |
| `git-workflow.html` | Deployment + DevOps | Second in section, before docker |

---

## 11. Prerequisite Courses

Some courses assume learners have completed a prior series. Always state this clearly in the `GUIDE_DESC` paragraph in the header.

**JavaScript + FastAPI series** requires completing the **FastAPI Learning Series first** (courses 1–8: FastAPI, CRUD, Pydantic, API Docs, Task AI, Auth, Background Tasks, Testing). These courses teach the server-side concepts that client-side JavaScript patterns depend on.

**Format for prerequisites in GUIDE_DESC:**
> Learn X and Y. Requires completing [link]FastAPI Learning Series[/link] first.

Or use this template in HTML:
```html
<p>Learn X and Y. <strong>Requires completing the <a href="fastapi.html">FastAPI Learning Series</a> first.</strong></p>
```

---

## 12. Course Dependency Map

When creating a new course, reference this map to understand:
- **What prerequisites exist** (what learners must know first)
- **Where the course fits** in the learning path
- **What it enables** (which later courses depend on it)

### Learning Path (Tier → Tier)

**Tier 1: FastAPI Essentials** (START HERE)
- CRUD + HTML Frontend ⭐ (required for everything)
- Pydantic Models (required for error handling, validation)
- API Documentation (recommended early)
- SQLite + PostgreSQL (required for most projects)
- Jinja2 Templates (optional if using JSON-only APIs)

**Tier 2: Authentication & Security** (after Tier 1)
- Hashing Passwords (required for any auth)
- JWT Access Tokens (required for JavaScript courses, SaaS projects)
- Refresh Token Rotation (strongly recommended)
- Email Verification (recommended for production apps)

**Tier 3: Advanced Backend Features** (after Tier 1, optional before Tier 2)
- Async Patterns (enables efficient APIs, required before async capstone projects)
- Error Handling (makes all endpoints more robust)
- File Uploads (enables real-world projects)
- Testing → Logging → Background Tasks → Caching → WebSockets (pick what you need)

**Tier 4: Real-World Integration** (after Tier 2 & 3)
- API Security (required before production deployment)
- Public API Integration (learn patterns for external APIs)
- CRM Integration (learn enterprise patterns)
- Role-Based Access (required for multi-tenant/SaaS projects)

**Choose your path:**
- **JavaScript frontend**: Tier 1→2→3→ JavaScript courses
- **Backend-only**: Tier 1→2→3→4, skip JavaScript
- **Server-side UI**: Tier 1→2→3→ HTMX course, skip JavaScript
- **SaaS/multi-tenant**: Tier 1→2→3→4→ SaaS capstone project

**Capstone projects** (all require Tier 1-2):
- E-commerce (uses Tier 1-2 only)
- Lead Enrichment (adds Tier 3: background tasks, async)
- Portfolio Tracker (adds Tier 3: async, external APIs)
- SaaS Backend (adds Tier 4: RBAC, multi-tenancy)
- RAG Knowledge Base (adds LLM integration)

---

## 13. Checklist Before Publishing a New Guide

- [ ] `--accent` CSS variable set to the correct colour
- [ ] `border-left: 5px solid ACCENT` on `.guide-header`
- [ ] All `<p class="explanation">` paragraphs follow the writing rules (2–4 sentences, no em dashes)
- [ ] Every non-obvious code line has an inline comment
- [ ] All `<`, `>`, `&` inside `<pre><code>` are HTML-escaped
- [ ] Tab `data-step` and panel `id` attributes match the step `id`
- [ ] Sidebar nav links match all step ids
- [ ] Card added to `index.html` in the correct section with correct step count
- [ ] Style guide colour table updated if a new accent was introduced
- [ ] If course has prerequisites, prerequisites are clearly stated in the header description
- [ ] Course fits into the Tier structure (Tier 1-4) and dependency map is referenced
