"""Bake the Jenesys markdown curriculum into a static HTML site styled like
pydata-sphinx-theme.

FROZEN as of 2026-09-13: this script produced the last generation of
JENESYS/site/. From this point on, the .html files under site/ are hand
maintained directly and are the real source for the published site; the .md
files under weeks/ remain the source for Obsidian/GitHub but are no longer
resynced into site/. DO NOT RUN this script again -- doing so wipes out any
hand edits made to site/ since this freeze and regenerates plain, unstyled
markup in their place. Kept only as a historical reference for how the
initial bake was produced.

(Original usage, before the freeze:)

    python tools/build_site.py

Regenerated JENESYS/site/ from scratch (except site/assets/, which already
holds the hand-harvested theme files plus nav-descendants.js written below,
and progress.js/custom.css which a parallel task owns).
"""
import html
import json
import os
import posixpath
import re
import shutil
import sys
from pathlib import Path

import mistune
from bs4 import BeautifulSoup
from pydata_sphinx_theme.toctree import add_collapse_checkboxes
from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import TextLexer, get_lexer_by_name
from pygments.util import ClassNotFound

TOOLS_DIR = Path(__file__).resolve().parent
JENESYS_ROOT = TOOLS_DIR.parent
REPO_ROOT = JENESYS_ROOT.parent
WEEKS_DIR = JENESYS_ROOT / "weeks"
SITE_DIR = JENESYS_ROOT / "site"

sys.path.insert(0, str(TOOLS_DIR))
from nav_tree import NAV_TREE  # noqa: E402

SITE_TITLE = "Jenesys"


# ---------------------------------------------------------------------------
# Path helpers. Every path that crosses into HTML/JS output is a posix-style
# (forward-slash) string, relative to JENESYS_ROOT for sources and relative
# to SITE_DIR for baked output ("." denotes the site root directory).
# ---------------------------------------------------------------------------

def to_posix(path):
    return str(path).replace(os.sep, "/")


def md_output_relpath(src_rel):
    """weeks/x/README.md -> weeks/x/index.html ; weeks/x/foo.md -> weeks/x/foo.html"""
    d, base = posixpath.split(src_rel)
    if base == "README.md":
        out_base = "index.html"
    elif base.endswith(".md"):
        out_base = base[:-3] + ".html"
    else:
        raise ValueError(f"Not a markdown source: {src_rel}")
    return posixpath.join(d, out_base) if d else out_base


def out_dir_of(out_relpath):
    d = posixpath.dirname(out_relpath)
    return d if d else "."


def rel_href(from_dir, to_relpath):
    """Relative href from a page's own output directory to a target path,
    both given relative to the site root ('.' for the root directory)."""
    return posixpath.relpath(to_relpath, from_dir)


# ---------------------------------------------------------------------------
# Markdown rendering: GitHub-style heading slugs + headerlinks, .md -> .html
# link rewriting, Pygments-highlighted code blocks.
# ---------------------------------------------------------------------------

_TAG_RE = re.compile(r"<[^>]+>")


def strip_tags_unescape(s):
    return html.unescape(_TAG_RE.sub("", s))


def github_slug(text):
    s = text.lower()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"\s+", "-", s.strip())
    return s


def rewrite_md_link(url):
    if url.startswith(("http://", "https://", "mailto:", "#")):
        return url
    if "#" in url:
        file_part, anchor = url.split("#", 1)
        anchor = "#" + anchor
    else:
        file_part, anchor = url, ""
    if not file_part:
        return url
    base = posixpath.basename(file_part)
    if base == "README.md":
        new_file = file_part[: -len(base)] + "index.html"
    elif file_part.endswith(".md"):
        new_file = file_part[:-3] + ".html"
    else:
        new_file = file_part
    return new_file + anchor


class PageRenderer(mistune.HTMLRenderer):
    """A fresh instance is created per page so heading-slug dedup state never
    leaks between pages."""

    def __init__(self):
        super().__init__()
        self.headings = []  # list of (level, slug, plain_text)
        self._slug_seen = {}

    def _unique_slug(self, base):
        base = base or "section"
        if base not in self._slug_seen:
            self._slug_seen[base] = 0
            return base
        self._slug_seen[base] += 1
        return f"{base}-{self._slug_seen[base]}"

    def heading(self, text, level, **attrs):
        plain = strip_tags_unescape(text)
        slug = self._unique_slug(github_slug(plain))
        self.headings.append((level, slug, plain))
        return (
            f'<h{level} id="{slug}">{text}'
            f'<a class="headerlink" href="#{slug}" title="Link to this heading">#</a>'
            f"</h{level}>\n"
        )

    def link(self, text, url, title=None):
        return super().link(text, rewrite_md_link(url), title)

    def block_code(self, code, info=None):
        lang = (info or "").split()[0] if info else ""
        try:
            lexer = get_lexer_by_name(lang) if lang else TextLexer()
        except ClassNotFound:
            lexer = TextLexer()
        return highlight(code, lexer, HtmlFormatter(cssclass="highlight"))


def render_markdown(text):
    renderer = PageRenderer()
    md = mistune.create_markdown(renderer=renderer, plugins=["table", "task_lists"])
    body_html = md(text)
    title = renderer.headings[0][2] if renderer.headings else None
    return body_html, title, renderer.headings


# ---------------------------------------------------------------------------
# Step 1: scope discovery + rendering every real page.
# ---------------------------------------------------------------------------

def collect_scope():
    md_files = []
    copy_files = []
    for root, dirs, files in os.walk(WEEKS_DIR):
        dirs[:] = [d for d in dirs if d != "__pycache__"]
        for f in files:
            abs_p = Path(root) / f
            rel = to_posix(abs_p.relative_to(JENESYS_ROOT))
            if f.endswith(".md"):
                md_files.append(rel)
            else:
                copy_files.append(rel)
    md_files.append("README.md")
    md_files.append("table-of-contents.md")
    return sorted(md_files), sorted(copy_files)


def render_all_pages(md_files):
    page_data = {}
    for rel in md_files:
        text = (JENESYS_ROOT / rel).read_text(encoding="utf-8")
        body_html, title, headings = render_markdown(text)
        out_rel = md_output_relpath(rel)
        page_data[rel] = {
            "out_relpath": out_rel,
            "title": title or rel,
            "html": body_html,
            "headings": headings,
        }
    return page_data


def collect_synthetic(nodes, page_data):
    for node in nodes:
        if node["kind"] == "synthetic":
            body_html, _title, headings = render_markdown(node["body_md"])
            out_rel = md_output_relpath(node["src"])
            page_data[node["src"]] = {
                "out_relpath": out_rel,
                "title": node["title"],
                "html": body_html,
                "headings": headings,
            }
        collect_synthetic(node.get("children", []), page_data)


# ---------------------------------------------------------------------------
# Step 2: NAV_TREE metadata pass (node ids, titles, ancestors) + descendants
# map, computed once and reused for every page's sidebar/breadcrumb render.
# ---------------------------------------------------------------------------

def slugify_simple(title):
    s = re.sub(r"[^a-z0-9]+", "-", title.strip().lower()).strip("-")
    return s or "section"


# Sidebar labels only: strip a leading "Week N" (optionally with a track
# parenthetical) so the sidebar reads "Foundations I" / "Exercises" / "Guided
# build (AI track)" instead of "Week 1: Foundations I" / "Week 1 exercises".
# This never touches a page's own heading, <title>, or breadcrumb -- those
# keep using the real, unmodified title via node["_title"].
_WEEK_PREFIX_RE = re.compile(r"^Week\s+\d+\s*(?:\(([^)]+)\))?\s*[,:]?\s*(.*)$", re.IGNORECASE)


def clean_sidebar_title(title):
    m = _WEEK_PREFIX_RE.match(title)
    if not m:
        return title
    track, rest = m.group(1), m.group(2).strip()
    if not rest:
        return title
    rest = rest[0].upper() + rest[1:]
    return f"{rest} ({track})" if track else rest


def assign_nav_metadata(nodes, parent_id, ancestors, page_data):
    for node in nodes:
        kind = node["kind"]
        if kind == "group":
            node["_node_id"] = (
                f"{parent_id}/{slugify_simple(node['title'])}" if parent_id else slugify_simple(node["title"])
            )
            node["_title"] = node["title"]
            node["_sidebar_title"] = node["title"]
            node["_out_relpath"] = None
        else:  # page or synthetic
            data = page_data.get(node["src"])
            if data is None:
                raise KeyError(f"NAV_TREE references a page that was never rendered: {node['src']}")
            node["_out_relpath"] = data["out_relpath"]
            node["_node_id"] = data["out_relpath"]
            title = node["title"] if kind == "synthetic" else data["title"]
            node["_title"] = title
            node["_sidebar_title"] = node.get("sidebar_title") or clean_sidebar_title(title)
        node["_ancestors"] = ancestors
        assign_nav_metadata(node.get("children", []), node["_node_id"], ancestors + [node], page_data)


def index_by_out_relpath(nodes, index):
    for node in nodes:
        if node["kind"] in ("page", "synthetic"):
            index[node["_out_relpath"]] = node
        index_by_out_relpath(node.get("children", []), index)


def collect_descendants(node, out_map):
    own = [node["_out_relpath"]] if node["kind"] in ("page", "synthetic") else []
    for child in node.get("children", []):
        own = own + collect_descendants(child, out_map)
    out_map[node["_node_id"]] = own
    return own


def build_nav_descendants(nodes):
    out_map = {}
    for node in nodes:
        collect_descendants(node, out_map)
    return out_map


# ---------------------------------------------------------------------------
# Sidebar: raw toctree-shaped <ul>, then handed to the theme's own
# add_collapse_checkboxes() for pixel/behavior parity.
#
# POST-FREEZE NOTE: after the freeze (see module docstring), the live site/
# had this collapse wrapping stripped back out again, matching real Sphinx's
# own html_theme_options = {"collapse_navigation": True} output (verified
# against a real build of the harvest dummy project with that option set).
# This function's add_collapse_checkboxes() call below no longer reflects
# what's actually in site/ -- kept as-is since the script is historical only.
# ---------------------------------------------------------------------------

def node_contains_current(node, current_out):
    if current_out is None:
        return False
    if node["_out_relpath"] == current_out:
        return True
    return any(node_contains_current(c, current_out) for c in node.get("children", []))


def build_sidebar_ul(nodes, depth, current_out, page_dir):
    parts = ["<ul>"]
    for node in nodes:
        on_current_branch = node_contains_current(node, current_out)
        cls = f"toctree-l{depth}"
        if on_current_branch:
            cls += " current active"
        node_id = html.escape(node["_node_id"], quote=True)
        attrs = f'class="{cls}" data-node-id="{node_id}"'
        if node["kind"] in ("page", "synthetic"):
            attrs += f' data-page-id="{node_id}"'
        parts.append(f"<li {attrs}>")
        if node["kind"] == "group":
            parts.append(f'<p class="caption" role="heading">{html.escape(node["_sidebar_title"])}</p>')
        else:
            is_self = node["_out_relpath"] == current_out
            href = "#" if is_self else rel_href(page_dir, node["_out_relpath"])
            link_cls = "current reference internal" if is_self else "reference internal"
            parts.append(f'<a class="{link_cls}" href="{href}">{html.escape(node["_sidebar_title"])}</a>')
        children = node.get("children", [])
        if children:
            parts.append(build_sidebar_ul(children, depth + 1, current_out, page_dir))
        parts.append("</li>")
    parts.append("</ul>")
    return "".join(parts)


def render_sidebar(current_out, page_dir):
    raw = build_sidebar_ul(NAV_TREE, 1, current_out, page_dir)
    soup = BeautifulSoup(raw, "html.parser")
    for ul in soup.find_all("ul", recursive=False):
        ul["class"] = [*ul.get("class", []), "nav", "bd-sidenav"]
    add_collapse_checkboxes(soup)
    return str(soup)


# ---------------------------------------------------------------------------
# Breadcrumbs + on-this-page mini TOC.
# ---------------------------------------------------------------------------

def build_breadcrumbs(node, out_relpath, title, page_dir):
    is_home = out_relpath == "index.html"
    parts = ['<nav aria-label="Breadcrumb" class="d-print-none"><ul class="bd-breadcrumbs">']
    if is_home:
        parts.append(
            '<li class="breadcrumb-item breadcrumb-home active" aria-current="page">'
            '<i class="fa-solid fa-home"></i></li>'
        )
    else:
        home_href = rel_href(page_dir, "index.html")
        parts.append(
            f'<li class="breadcrumb-item breadcrumb-home"><a href="{home_href}" class="nav-link" '
            f'aria-label="Home"><i class="fa-solid fa-home"></i></a></li>'
        )
        if node is not None:
            for anc in node["_ancestors"]:
                if anc["kind"] in ("page", "synthetic"):
                    href = rel_href(page_dir, anc["_out_relpath"])
                    parts.append(
                        f'<li class="breadcrumb-item"><a href="{href}" class="nav-link">'
                        f'{html.escape(anc["_title"])}</a></li>'
                    )
        parts.append(
            f'<li class="breadcrumb-item active" aria-current="page">'
            f'<span class="ellipsis">{html.escape(title)}</span></li>'
        )
    parts.append("</ul></nav>")
    return "".join(parts)


def build_toc_html(headings):
    h2plus = [h for h in headings if h[0] >= 2]
    if len(h2plus) < 2:
        return None
    root = []
    stack = [(1, root)]
    for level, slug, text in h2plus:
        while len(stack) > 1 and stack[-1][0] >= level:
            stack.pop()
        node = {"slug": slug, "text": text, "children": []}
        stack[-1][1].append(node)
        stack.append((level, node["children"]))

    def render(items):
        if not items:
            return ""
        out = ["<ul>"]
        for it in items:
            out.append(f'<li><a class="reference internal" href="#{it["slug"]}">{html.escape(it["text"])}</a>')
            out.append(render(it["children"]))
            out.append("</li>")
        out.append("</ul>")
        return "".join(out)

    return render(root)


# ---------------------------------------------------------------------------
# Page template.
# ---------------------------------------------------------------------------

ASSET_PATHS = {
    "theme_css": "assets/styles/theme.css",
    "pst_css": "assets/styles/pydata-sphinx-theme.css",
    "pygments_css": "assets/pygments.css",
    "custom_css": "assets/custom.css",
    "bootstrap_js": "assets/scripts/bootstrap.js",
    "pst_js": "assets/scripts/pydata-sphinx-theme.js",
    "fontawesome_js": "assets/scripts/fontawesome.js",
    "nav_descendants_js": "assets/nav-descendants.js",
    "progress_js": "assets/progress.js",
}


def render_page(out_relpath, title, body_html, headings, nav_node):
    page_dir = out_dir_of(out_relpath)
    is_home = out_relpath == "index.html"
    is_toc_page = out_relpath == "table-of-contents.html"

    assets = {k: rel_href(page_dir, v) for k, v in ASSET_PATHS.items()}
    home_href = rel_href(page_dir, "index.html")

    root_rel = rel_href(page_dir, ".")
    content_root = "./" if root_rel == "." else root_rel + "/"

    current_out = out_relpath if nav_node is not None else None
    sidebar_html = render_sidebar(current_out, page_dir)
    breadcrumbs_html = build_breadcrumbs(nav_node, out_relpath, title, page_dir)
    toc_html = build_toc_html(headings)

    mark_complete = ""
    if not is_home and not is_toc_page:
        mark_complete = (
            f'<button type="button" class="mark-complete-btn" data-page-id="{html.escape(out_relpath, quote=True)}">'
            f"Mark complete</button>"
        )

    page_title_tag = title if is_home else f"{title} | {SITE_TITLE}"

    secondary_toggle = ""
    secondary_sidebar_block = ""
    if toc_html:
        secondary_toggle = (
            '<button class="pst-navbar-icon sidebar-toggle secondary-toggle" aria-label="On this page">'
            '<span class="fa-solid fa-outdent"></span></button>'
        )
        secondary_sidebar_block = f"""
                <dialog id="pst-secondary-sidebar-modal"></dialog>
                <div id="pst-secondary-sidebar" class="bd-sidebar-secondary bd-toc">
                  <div class="sidebar-secondary-items sidebar-secondary__inner">
                    <div class="sidebar-secondary-item">
                      <nav class="bd-toc-nav page-toc">
                        {toc_html}
                      </nav>
                    </div>
                  </div>
                </div>"""

    theme_switch_html = """
            <div class="navbar-item">
              <div class="theme-switch-container dropdown pst-js-only" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Color mode">
                <button class="btn btn-sm nav-link pst-navbar-icon theme-switch-button dropdown-toggle" aria-label="Color mode" data-bs-toggle="dropdown">
                  <i class="theme-switch fa-solid fa-sun fa-lg fa-fw" data-mode="light" title="Light"></i>
                  <i class="theme-switch fa-solid fa-moon fa-lg fa-fw" data-mode="dark" title="Dark"></i>
                  <i class="theme-switch fa-solid fa-circle-half-stroke fa-lg fa-fw" data-mode="auto" title="System Settings"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><button class="dropdown-item d-flex align-items-center theme-change-button" data-mode="auto"><i class="fa-solid fa-circle-half-stroke fa-lg fa-fw me-1"></i>System Settings</button></li>
                  <li><button class="dropdown-item d-flex align-items-center theme-change-button" data-mode="light"><i class="fa-solid fa-sun fa-lg fa-fw me-1"></i>Light</button></li>
                  <li><button class="dropdown-item d-flex align-items-center theme-change-button" data-mode="dark"><i class="fa-solid fa-moon fa-lg fa-fw me-1"></i>Dark</button></li>
                </ul>
              </div>
            </div>"""

    header_html = f"""
    <header id="pst-header" class="bd-header navbar navbar-expand-lg bd-navbar d-print-none">
      <div class="bd-header__inner bd-page-width">
        <button class="pst-navbar-icon sidebar-toggle primary-toggle" aria-label="Site navigation">
          <span class="fa-solid fa-bars"></span>
        </button>
        <div class="col-lg-3 navbar-header-items__start">
          <div class="navbar-item">
            <a class="navbar-brand logo" href="{home_href}">
              <p class="title logo__title">{SITE_TITLE}</p>
            </a>
          </div>
        </div>
        <div class="col-lg-9 navbar-header-items">
          <div class="me-auto navbar-header-items__center"></div>
          <div class="navbar-header-items__end">
            {theme_switch_html}
          </div>
        </div>
        {secondary_toggle}
      </div>
    </header>"""

    return f"""<!DOCTYPE html>
<html lang="en" data-content_root="{content_root}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{html.escape(page_title_tag)}</title>
    <script data-cfasync="false">
      document.documentElement.dataset.mode = localStorage.getItem("mode") || "";
      document.documentElement.dataset.theme = localStorage.getItem("theme") || "";
    </script>
    <script>
      /* Minimal stand-in for Sphinx's own documentation_options.js, which we
         don't emit since there's no search index to go with it. The theme's
         own JS (pydata-sphinx-theme.js) reads this object unconditionally
         during its init, before it gets to unrelated features like the
         sidebar-collapse button, so it has to exist even without search. */
      var DOCUMENTATION_OPTIONS = {{
        VERSION: "",
        LANGUAGE: "en",
        COLLAPSE_INDEX: false,
        BUILDER: "html",
        FILE_SUFFIX: ".html",
        LINK_SUFFIX: ".html",
        HAS_SOURCE: false,
        SOURCELINK_SUFFIX: "",
        NAVIGATION_WITH_KEYS: false,
        SHOW_SEARCH_SUMMARY: true,
        ENABLE_SEARCH_SHORTCUTS: false
      }};
    </script>
    <noscript>
      <style>.pst-js-only {{ display: none !important; }}</style>
    </noscript>
    <link href="{assets['theme_css']}" rel="stylesheet" />
    <link href="{assets['pst_css']}" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="{assets['pygments_css']}" />
    <link rel="stylesheet" type="text/css" href="{assets['custom_css']}" />
    <script src="{assets['fontawesome_js']}"></script>
    <link rel="preload" as="script" href="{assets['bootstrap_js']}" />
    <link rel="preload" as="script" href="{assets['pst_js']}" />
  </head>
  <body data-default-mode="">
    <div id="pst-skip-link" class="skip-link d-print-none"><a href="#main-content">Skip to main content</a></div>
    <div id="pst-scroll-pixel-helper"></div>
    <button type="button" class="btn rounded-pill" id="pst-back-to-top">
      <i class="fa-solid fa-arrow-up"></i>Back to top</button>
    <dialog id="pst-search-dialog">
      <form class="bd-search d-flex align-items-center" action="{content_root}search.html" method="get">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="search" class="form-control" name="q" placeholder="Search" aria-label="Search"
               autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
      </form>
    </dialog>
    {header_html}
    <div class="bd-container">
      <div class="bd-container__inner bd-page-width">
        <dialog id="pst-primary-sidebar-modal"></dialog>
        <div id="pst-primary-sidebar" class="bd-sidebar-primary bd-sidebar">
          <div class="sidebar-primary-items__start sidebar-primary__section">
            <div class="sidebar-primary-item pst-sidebar-collapse">
              <button id="pst-collapse-sidebar-button" aria-expanded="true" aria-controls="pst-primary-sidebar">
                <svg class="pst-icon" role="img" aria-hidden="true" focusable="false" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M3 15.5C2.36232 15.5 1.74874 15.2564 1.28478 14.8189C0.820828 14.3815 0.541576 13.7832 0.504167 13.1467L0.5 13L0.5 3C0.499965 2.36232 0.743605 1.74874 1.18107 1.28478C1.61854 0.820828 2.21676 0.541576 2.85333 0.504167L3 0.5L13 0.5C13.6377 0.499965 14.2513 0.743605 14.7152 1.18107C15.1792 1.61854 15.4584 2.21676 15.4958 2.85333L15.5 3L15.5 13C15.5 13.6377 15.2564 14.2513 14.8189 14.7152C14.3815 15.1792 13.7832 15.4584 13.1467 15.4958L13 15.5L3 15.5ZM3 13.8333L10.5 13.8333L10.5 2.16667L3 2.16667C2.79589 2.16669 2.59889 2.24163 2.44636 2.37726C2.29383 2.5129 2.19638 2.69979 2.1725 2.9025L2.16667 3L2.16667 13C2.16669 13.2041 2.24163 13.4011 2.37726 13.5536C2.5129 13.7062 2.69979 13.8036 2.9025 13.8275L3 13.8333ZM6.65583 10.325L6.5775 10.2558L4.91083 8.58917C4.76735 8.44567 4.68116 8.25476 4.66843 8.05223C4.65569 7.84971 4.71729 7.6495 4.84167 7.48917L4.91083 7.41083L6.5775 5.74417C6.72747 5.59471 6.9287 5.50794 7.14032 5.50148C7.35194 5.49502 7.55809 5.56935 7.7169 5.70937C7.8757 5.8494 7.97525 6.04463 7.99533 6.25539C8.01541 6.46616 7.95451 6.67667 7.825 6.84417L7.75583 6.9225L6.67917 8L7.75583 9.0775C7.89931 9.22099 7.98551 9.41191 7.99824 9.61443C8.01097 9.81695 7.94938 10.0172 7.825 10.1775L7.75583 10.2558C7.61234 10.3993 7.42142 10.4855 7.2189 10.4982C7.01638 10.511 6.81617 10.4494 6.65583 10.325Z"></path>
                </svg>
                <span class="pst-collapse-sidebar-label">Collapse Sidebar</span>
                <span class="pst-expand-sidebar-label">Expand Sidebar</span>
              </button>
            </div>
            <div class="sidebar-primary-item">
              <nav class="bd-docs-nav bd-links" aria-label="Section Navigation">
                <p class="bd-links__title" role="heading" aria-level="1">Section Navigation</p>
                <div class="bd-toc-item navbar-nav">{sidebar_html}</div>
              </nav>
            </div>
          </div>
        </div>
        <main id="main-content" class="bd-main" role="main">
          <div class="bd-content">
            <div class="bd-article-container">
              <div class="bd-header-article d-print-none">
                <div class="header-article-items header-article__inner">
                  <div class="header-article-items__start">
                    <div class="header-article-item">
                      {breadcrumbs_html}
                    </div>
                  </div>
                </div>
              </div>
              <article class="bd-article">
                {mark_complete}
                {body_html}
              </article>
            </div>
            {secondary_sidebar_block}
          </div>
        </main>
      </div>
    </div>
    <script defer src="{assets['bootstrap_js']}"></script>
    <script defer src="{assets['pst_js']}"></script>
    <script defer src="{assets['nav_descendants_js']}"></script>
    <script defer src="{assets['progress_js']}"></script>
    <footer class="bd-footer">
      <div class="bd-footer__inner bd-page-width">
        <div class="footer-items__start">
          <div class="footer-item"><p class="sphinx-version">{SITE_TITLE}</p></div>
        </div>
      </div>
    </footer>
  </body>
</html>
"""


# ---------------------------------------------------------------------------
# Link validator.
# ---------------------------------------------------------------------------

def validate_links(site_dir):
    total = 0
    broken = []
    for html_file in sorted(site_dir.rglob("*.html")):
        text = html_file.read_text(encoding="utf-8")
        soup = BeautifulSoup(text, "html.parser")
        for a in soup.find_all("a", href=True):
            href = a["href"]
            if href == "" or href.startswith(("http://", "https://", "mailto:", "#")):
                continue
            total += 1
            file_part = href.split("#", 1)[0]
            if not file_part:
                continue
            target = (html_file.parent / file_part).resolve()
            if not target.exists():
                broken.append((str(html_file.relative_to(site_dir)), href))
    return total, broken


# ---------------------------------------------------------------------------
# Main build.
# ---------------------------------------------------------------------------

def clean_site_dir():
    if SITE_DIR.exists():
        for entry in SITE_DIR.iterdir():
            if entry.name == "assets":
                continue
            if entry.is_dir():
                shutil.rmtree(entry)
            else:
                entry.unlink()
    else:
        SITE_DIR.mkdir(parents=True)


def copy_non_md_files(copy_files):
    for rel in copy_files:
        src = JENESYS_ROOT / rel
        dest = SITE_DIR / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest)


def write_nav_descendants_js(nav_descendants):
    assets_dir = SITE_DIR / "assets"
    assets_dir.mkdir(parents=True, exist_ok=True)
    js = "window.JENESYS_NAV_DESCENDANTS = " + json.dumps(nav_descendants, indent=2) + ";\n"
    (assets_dir / "nav-descendants.js").write_text(js, encoding="utf-8")


def write_pages(page_data, by_out_relpath):
    for src_rel, data in page_data.items():
        out_rel = data["out_relpath"]
        nav_node = by_out_relpath.get(out_rel)
        html_out = render_page(out_rel, data["title"], data["html"], data["headings"], nav_node)
        dest = SITE_DIR / out_rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(html_out, encoding="utf-8")


def main():
    import sys

    if "--i-know-this-wipes-hand-edits" not in sys.argv:
        print(
            "Refusing to run: this script is frozen (see module docstring).\n"
            "site/ is now hand-maintained HTML, not regenerated from markdown.\n"
            "Running this would overwrite every hand edit made since the freeze.\n"
            "Pass --i-know-this-wipes-hand-edits to force it anyway."
        )
        sys.exit(1)

    print("Cleaning site/ (preserving assets/) ...")
    clean_site_dir()

    print("Scanning weeks/ for markdown and copyable files ...")
    md_files, copy_files = collect_scope()
    print(f"  {len(md_files)} markdown files, {len(copy_files)} files to copy byte-for-byte")

    print("Rendering markdown pages ...")
    page_data = render_all_pages(md_files)
    collect_synthetic(NAV_TREE, page_data)
    print(f"  {len(page_data)} pages rendered (incl. synthetic)")

    print("Assigning nav-tree metadata ...")
    assign_nav_metadata(NAV_TREE, "", [], page_data)
    by_out_relpath = {}
    index_by_out_relpath(NAV_TREE, by_out_relpath)
    nav_descendants = build_nav_descendants(NAV_TREE)

    print("Writing site/assets/nav-descendants.js ...")
    write_nav_descendants_js(nav_descendants)

    print("Writing HTML pages ...")
    write_pages(page_data, by_out_relpath)

    print("Copying non-markdown files byte-for-byte ...")
    copy_non_md_files(copy_files)

    nojekyll = REPO_ROOT / ".nojekyll"
    if not nojekyll.exists():
        nojekyll.write_text("", encoding="utf-8")
        print(f"Created {nojekyll}")

    print("Validating links ...")
    total, broken = validate_links(SITE_DIR)
    print(f"Checked {total} internal links.")
    if broken:
        print(f"BROKEN LINKS: {len(broken)}")
        for f, href in broken:
            print(f"  {f} -> {href}")
    else:
        print("No broken links found.")


if __name__ == "__main__":
    main()
