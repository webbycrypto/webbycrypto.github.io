/**
 * app.js -- Bootstrap, global state, routing, keyboard shortcuts
 * Load order: all level*.js files, then validator.js, highlighter.js,
 * progress.js, editor.js, ui.js, then this file.
 */

const App = (function () {

  let _currentChallenge = null;
  let _hintIndex = 0;

  function init() {
    // Aggregate all challenges
    window.ALL_CHALLENGES = [].concat(
      window.LEVEL1 || [],
      window.LEVEL2 || [],
      window.LEVEL3 || [],
      window.LEVEL4 || [],
      window.LEVEL5 || []
    );

    // Load progress from localStorage
    Progress.load();

    // Init UI
    UI.init();

    // Init editor
    Editor.init(
      document.getElementById('code-editor'),
      document.getElementById('line-numbers'),
      document.getElementById('highlight-layer')
    );

    // Wire up controls
    _wireControls();
    _wireKeyboardShortcuts();
    _wireSearchFilter();

    // Warm up the Python runtime in the background so the first Run isn't
    // slower than it has to be; only matters for challenges with pyTests.
    PyRunner.onLoadingStateChange(UI.setLoadingRuntime);
    PyRunner.warm();

    // Navigate to saved challenge or first
    const state = Progress.getState();
    const startId = state.currentChallenge || 1;
    navigateTo(startId);
  }

  function navigateTo(id) {
    const challenge = (window.ALL_CHALLENGES || []).find(function (c) { return c.id === id; });
    if (!challenge) return;

    _currentChallenge = challenge;
    _hintIndex = 0;

    Progress.setCurrentChallenge(id);
    UI.renderSidebar(id);
    UI.renderChallenge(challenge);
    Editor.loadChallenge(challenge);
    Editor.focus();

    // Scroll sidebar item into view
    setTimeout(function () {
      const active = document.querySelector('.challenge-item.active');
      if (active) active.scrollIntoView({ block: 'nearest' });
    }, 50);
  }

  let _running = false;

  function _run() {
    if (!_currentChallenge || _running) return;
    const challenge = _currentChallenge;
    const code = Editor.getValue();
    const result = Validator.validate(code, challenge.validation.checks);

    if (!result.passed) {
      UI.showFeedback(result, challenge);
      return;
    }

    const pyTests = challenge.validation.pyTests;
    if (!pyTests || !pyTests.length) {
      // No execution-based tests defined for this challenge (e.g. Level 5) --
      // the structural checks are the whole gate, same as before Pyodide.
      UI.showFeedback(result, challenge);
      _completeChallenge(challenge);
      return;
    }

    _running = true;
    UI.setRunning(true);

    PyRunner.execute(code, pyTests, {
      argv: challenge.validation.argv,
      stdin: challenge.validation.stdin,
      packages: challenge.validation.packages
    }).then(function (outcome) {
      _running = false;
      UI.setRunning(false);

      if (outcome.type === 'result') {
        UI.showPyTestFeedback(outcome.results, challenge);
        const allPassed = outcome.results.every(function (r) { return r.passed; });
        if (allPassed) _completeChallenge(challenge);
      } else if (outcome.type === 'runtime-error') {
        UI.showRuntimeError(outcome.traceback);
      } else if (outcome.type === 'timed-out') {
        UI.showTimeout();
      } else {
        UI.showRuntimeError(outcome.message || 'The Python runtime failed to load.');
      }
    });
  }

  function _completeChallenge(challenge) {
    const usedHint = Progress.wasHintUsed(challenge.id);
    const outcome = Progress.completeChallenge(
      challenge.id,
      challenge.difficulty,
      usedHint
    );
    UI.renderSidebar(challenge.id);
    UI.markChallengeDone(challenge);
    UI.showBadges(outcome.newBadges);
  }

  function _reset() {
    if (!_currentChallenge) return;
    Editor.reset(_currentChallenge);
    document.getElementById('feedback-panel').innerHTML = '';
    document.getElementById('explanation-panel').innerHTML = '';
    document.getElementById('explanation-panel').style.display = 'none';
    document.getElementById('hint-area').style.display = 'none';
    _hintIndex = 0;
  }

  function _showHint() {
    if (!_currentChallenge) return;
    Progress.markHintUsed(_currentChallenge.id);
    const next = UI.showHint(_currentChallenge, _hintIndex);
    _hintIndex = next !== null ? next : _hintIndex;
  }

  function _showSolution() {
    if (!_currentChallenge) return;
    const confirmed = confirm('Show solution? You will not earn the hint bonus for this challenge.');
    if (!confirmed) return;
    Progress.markSolutionRevealed(_currentChallenge.id);
    Progress.markHintUsed(_currentChallenge.id);
    Editor.setValue(_currentChallenge.solution);
    document.getElementById('hint-area').style.display = 'none';
  }

  function _wireControls() {
    document.getElementById('btn-run').addEventListener('click', _run);
    document.getElementById('btn-reset').addEventListener('click', _reset);
    document.getElementById('btn-hint').addEventListener('click', _showHint);
    document.getElementById('btn-solution').addEventListener('click', _showSolution);

    document.getElementById('btn-next').addEventListener('click', function () {
      if (!_currentChallenge) return;
      const next = UI.getAdjacentChallengeId(_currentChallenge.id, 1);
      if (next) navigateTo(next);
    });

    document.getElementById('btn-prev').addEventListener('click', function () {
      if (!_currentChallenge) return;
      const prev = UI.getAdjacentChallengeId(_currentChallenge.id, -1);
      if (prev) navigateTo(prev);
    });

    document.getElementById('btn-random').addEventListener('click', function () {
      navigateTo(UI.getRandomChallengeId());
    });

    document.getElementById('btn-daily').addEventListener('click', function () {
      navigateTo(UI.getDailyChallenge());
    });

    document.getElementById('btn-dashboard').addEventListener('click', UI.openDashboard);
    document.getElementById('btn-theme').addEventListener('click', UI.toggleTheme);
    document.getElementById('btn-sidebar-toggle').addEventListener('click', UI.toggleSidebar);

    document.getElementById('modal-close').addEventListener('click', UI.closeModal);
    document.getElementById('modal-overlay').addEventListener('click', function (e) {
      if (e.target === this) UI.closeModal();
    });
  }

  function _wireKeyboardShortcuts() {
    document.addEventListener('keydown', function (e) {
      // Only global shortcuts (not while typing in editor if cmd modifier present)
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'Enter':
            e.preventDefault();
            _run();
            break;
          case 'r':
          case 'R':
            e.preventDefault();
            _reset();
            break;
          case 'h':
          case 'H':
            e.preventDefault();
            _showHint();
            break;
          case ']':
            e.preventDefault();
            if (_currentChallenge) {
              const n = UI.getAdjacentChallengeId(_currentChallenge.id, 1);
              if (n) navigateTo(n);
            }
            break;
          case '[':
            e.preventDefault();
            if (_currentChallenge) {
              const p = UI.getAdjacentChallengeId(_currentChallenge.id, -1);
              if (p) navigateTo(p);
            }
            break;
        }
      }
      // Escape closes modal
      if (e.key === 'Escape') UI.closeModal();
    });
  }

  function _wireSearchFilter() {
    const searchInput = document.getElementById('search-input');
    const diffFilter = document.getElementById('filter-diff');
    const topicFilter = document.getElementById('filter-topic');

    function applyFilters() {
      UI.filterSidebar(searchInput.value, diffFilter.value, topicFilter.value);
    }

    searchInput.addEventListener('input', applyFilters);
    diffFilter.addEventListener('change', applyFilters);
    topicFilter.addEventListener('change', applyFilters);

    // Populate topic dropdown
    const topics = Array.from(new Set((window.ALL_CHALLENGES || []).map(function (c) { return c.topic; }))).sort();
    topics.forEach(function (t) {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t;
      topicFilter.appendChild(opt);
    });
  }

  return { init, navigateTo };

})();

document.addEventListener('DOMContentLoaded', App.init);
