/*!
 * jenesys progress.js
 *
 * Manual, per-browser progress tracking for the jenesys curriculum site.
 * - Learner clicks a ".mark-complete-btn" on a content page to mark it done.
 * - Completion state is stored in localStorage under "jenesys-progress" as
 *   { [pageId]: true, ... } (only completed pages are present as keys).
 * - Every sidebar <li data-node-id="..."> gets a "jenesys-completed" class
 *   added/removed once every real page nested under it (per
 *   window.JENESYS_NAV_DESCENDANTS) is complete.
 *
 * No dependencies, no build step. Loaded as a plain <script> tag after
 * nav-descendants.js and after (or independent of) pydata-sphinx-theme.js.
 * Does not touch the theme's own color-mode / mobile-sidebar JS.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "jenesys-progress";
  var BUTTON_SELECTOR = ".mark-complete-btn";
  var NODE_SELECTOR = "li[data-node-id]";
  var COMPLETE_CLASS = "jenesys-completed";
  var BUTTON_COMPLETE_CLASS = "is-complete";

  /**
   * Read the progress map out of localStorage.
   * Any failure (private browsing, storage disabled, quota errors,
   * corrupt/unparseable JSON, or a parsed value that isn't a plain object)
   * degrades to "nothing marked complete" rather than throwing.
   */
  function loadProgress() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return {};
      }
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed;
      }
      return {};
    } catch (err) {
      return {};
    }
  }

  /**
   * Persist the progress map. Failures (private browsing, quota, storage
   * disabled) are swallowed on purpose -- progress tracking is a nice-to-have,
   * never allowed to break page interaction.
   */
  function saveProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (err) {
      /* ignore: no persistent storage available in this browser/context */
    }
  }

  /** Reflect a button's completed/not-completed state visually. */
  function setButtonState(button, isComplete) {
    if (isComplete) {
      button.classList.add(BUTTON_COMPLETE_CLASS);
      button.textContent = "Completed ✓";
    } else {
      button.classList.remove(BUTTON_COMPLETE_CLASS);
      button.textContent = "Mark complete";
    }
    button.setAttribute("aria-pressed", isComplete ? "true" : "false");
  }

  /**
   * Sidebar-graying pass: for every li[data-node-id], look up its flat list
   * of descendant real-page ids and add/remove COMPLETE_CLASS depending on
   * whether all of them are marked complete in `progress`.
   *
   * Guards against window.JENESYS_NAV_DESCENDANTS being missing entirely, or
   * missing a particular node id, so one stray/unknown sidebar entry never
   * breaks the pass for the rest of the tree.
   */
  function runGrayingPass(progress) {
    var descendantsMap = window.JENESYS_NAV_DESCENDANTS;
    var nodes = document.querySelectorAll(NODE_SELECTOR);

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var nodeId = node.getAttribute("data-node-id");
      var pageIds = descendantsMap ? descendantsMap[nodeId] : null;

      var isComplete = false;
      if (pageIds && pageIds.length > 0) {
        isComplete = true;
        for (var j = 0; j < pageIds.length; j++) {
          if (progress[pageIds[j]] !== true) {
            isComplete = false;
            break;
          }
        }
      }

      if (isComplete) {
        node.classList.add(COMPLETE_CLASS);
      } else {
        node.classList.remove(COMPLETE_CLASS);
      }
    }
  }

  function bindButton(button, progress) {
    var pageId = button.getAttribute("data-page-id");
    setButtonState(button, progress[pageId] === true);

    button.addEventListener("click", function () {
      var willBeComplete = progress[pageId] !== true;

      if (willBeComplete) {
        progress[pageId] = true;
      } else {
        delete progress[pageId];
      }

      saveProgress(progress);
      setButtonState(button, willBeComplete);
      runGrayingPass(progress);
    });
  }

  function init() {
    var progress = loadProgress();
    var buttons = document.querySelectorAll(BUTTON_SELECTOR);

    for (var i = 0; i < buttons.length; i++) {
      bindButton(buttons[i], progress);
    }

    runGrayingPass(progress);
  }

  // Run after the DOM is parsed. If this script happens to load after
  // DOMContentLoaded has already fired (e.g. a script tag placed at the end
  // of <body>), run immediately instead of waiting for an event that will
  // never come.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
