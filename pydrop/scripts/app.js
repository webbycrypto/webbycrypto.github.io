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

    // Navigate to saved challenge or first
    const state = Progress.getState();
    const startId = state.currentChallenge || 1;
    navigateTo(startId);
  }

  function navigateTo(id) {
    const challenge = (window.ALL_CHALLENGES || []).find(function (c) { return c.id === id; });
    if (!challenge) return;
    if (!Progress.isLevelUnlocked(challenge.level)) {
      UI.showToast('Complete ' + (10 - _completedInLevel(challenge.level - 1)) + ' more Level ' + (challenge.level - 1) + ' challenges to unlock this level.', 'info');
      return;
    }

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

  function _completedInLevel(level) {
    const challenges = (window.ALL_CHALLENGES || []).filter(function (c) { return c.level === level; });
    return challenges.filter(function (c) { return Progress.isChallengeCompleted(c.id); }).length;
  }

  function _run() {
    if (!_currentChallenge) return;
    const code = Editor.getValue();
    const result = Validator.validate(code, _currentChallenge.validation.checks);

    UI.showFeedback(result, _currentChallenge);

    if (result.passed) {
      const usedHint = Progress.wasHintUsed(_currentChallenge.id);
      const outcome = Progress.completeChallenge(
        _currentChallenge.id,
        _currentChallenge.difficulty,
        usedHint
      );
      UI.renderSidebar(_currentChallenge.id);
      UI.showXPGain(outcome.xpGained, outcome.newBadges, outcome.levelUnlocked);
    }
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
