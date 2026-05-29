/**
 * ui.js -- Sidebar, challenge panel, modals, toasts, search/filter, theme
 */

const UI = (function () {

  // DOM refs (set in init)
  let _sidebar = null;
  let _mainPanel = null;
  let _toastContainer = null;

  const LEVEL_NAMES = {
    1: 'Python Basics',
    2: 'Functions & Logic',
    3: 'Intermediate Python',
    4: 'Modern Python for Web',
    5: 'Flask, FastAPI & Django'
  };

  function init() {
    _sidebar = document.getElementById('sidebar');
    _mainPanel = document.getElementById('main-panel');
    _toastContainer = document.getElementById('toast-container');
    _applyTheme(Progress.getState().theme || 'dark');
  }

  // -----------------------------------------------------------------------
  // Sidebar
  // -----------------------------------------------------------------------

  function renderSidebar(currentId) {
    const state = Progress.getState();
    const challenges = window.ALL_CHALLENGES || [];

    let html = '<div class="sidebar-header"><img src="assets/logo.png" alt="DropAcademy" class="sidebar-logo"></div>';

    // Progress widget
    const tp = Progress.getTotalProgress();
    html += '<div class="progress-widget">' +
      '<div class="xp-row"><span class="xp-label">XP</span><span class="xp-value">' + state.xp + '</span>' +
      '<span class="streak-badge" title="Day streak">🔥 ' + (state.streak || 0) + '</span></div>' +
      '<div class="xp-bar-track"><div class="xp-bar-fill" style="width:' + tp.percent + '%"></div></div>' +
      '<div class="xp-meta">' + tp.completed + ' / ' + tp.total + ' challenges</div>' +
      '</div>';

    // Level trees
    for (let lvl = 1; lvl <= 5; lvl++) {
      const unlocked = Progress.isLevelUnlocked(lvl);
      const levelChallenges = challenges.filter(function (c) { return c.level === lvl; });
      const completedCount = levelChallenges.filter(function (c) {
        return Progress.isChallengeCompleted(c.id);
      }).length;

      html += '<div class="level-group' + (unlocked ? '' : ' locked') + '">' +
        '<div class="level-header" data-level="' + lvl + '">' +
        '<span class="level-icon">' + (unlocked ? '' : '🔒') + '</span>' +
        '<span class="level-name">Level ' + lvl + ' -- ' + LEVEL_NAMES[lvl] + '</span>' +
        '<span class="level-count">' + completedCount + '/' + levelChallenges.length + '</span>' +
        '</div>';

      if (unlocked) {
        html += '<div class="challenge-list">';
        levelChallenges.forEach(function (c) {
          const done = Progress.isChallengeCompleted(c.id);
          const active = c.id === currentId;
          const diffClass = 'diff-' + c.difficulty;
          html += '<div class="challenge-item' +
            (active ? ' active' : '') +
            (done ? ' done' : '') +
            '" data-id="' + c.id + '">' +
            '<span class="ch-status">' + (done ? '✓' : '●') + '</span>' +
            '<span class="ch-title">' + escHtml(c.title) + '</span>' +
            '<span class="ch-diff ' + diffClass + '">' + c.difficulty + '</span>' +
            '</div>';
        });
        html += '</div>';
      }

      html += '</div>';
    }

    _sidebar.innerHTML = html;

    // Collapse/expand level headers
    _sidebar.querySelectorAll('.level-header').forEach(function (el) {
      el.addEventListener('click', function () {
        const group = el.closest('.level-group');
        group.classList.toggle('collapsed');
      });
    });

    // Click challenge items
    _sidebar.querySelectorAll('.challenge-item').forEach(function (el) {
      el.addEventListener('click', function () {
        const id = parseInt(el.getAttribute('data-id'), 10);
        App.navigateTo(id);
      });
    });
  }

  // -----------------------------------------------------------------------
  // Challenge Panel
  // -----------------------------------------------------------------------

  function renderChallenge(challenge) {
    const done = Progress.isChallengeCompleted(challenge.id);
    const diffLabel = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }[challenge.difficulty] || challenge.difficulty;

    const html = '<div class="challenge-header">' +
      '<div class="challenge-meta">' +
      '<span class="topic-chip">' + escHtml(challenge.topic) + '</span>' +
      '<span class="diff-chip diff-' + challenge.difficulty + '">' + diffLabel + '</span>' +
      '<span class="xp-chip">+' + challenge.xp + ' XP</span>' +
      (done ? '<span class="done-chip">✓ Completed</span>' : '') +
      '</div>' +
      '<h1 class="challenge-title">' + escHtml(challenge.title) + '</h1>' +
      '</div>' +
      '<div class="instructions">' + challenge.instructions + '</div>';

    document.getElementById('challenge-info').innerHTML = html;

    // Action bar
    document.getElementById('btn-run').classList.toggle('done', done);
    document.getElementById('feedback-panel').innerHTML = '';
    document.getElementById('explanation-panel').innerHTML = '';
    document.getElementById('explanation-panel').style.display = 'none';
    document.getElementById('hint-text').innerHTML = '';
    document.getElementById('hint-area').style.display = 'none';
  }

  function showFeedback(result, challenge) {
    const panel = document.getElementById('feedback-panel');

    if (result.passed) {
      panel.className = 'feedback-panel success';
      panel.innerHTML = '<div class="fb-icon">✓</div><div class="fb-text">Correct! Well done.</div>';
      // Show explanation
      const expPanel = document.getElementById('explanation-panel');
      expPanel.innerHTML = '<div class="explanation"><strong>Explanation</strong><div>' + challenge.explanation + '</div></div>';
      expPanel.style.display = 'block';
    } else {
      const msg = Validator.buildFeedbackMessage(result);
      panel.className = 'feedback-panel error';
      panel.innerHTML = '<div class="fb-icon">✗</div><div class="fb-text">' +
        escHtml(msg).replace(/\n/g, '<br>') + '</div>';
    }
  }

  function showXPGain(xpGained, newBadges, levelUnlocked) {
    if (xpGained > 0) {
      showToast('+' + xpGained + ' XP', 'xp');
    }
    if (newBadges && newBadges.length > 0) {
      newBadges.forEach(function (badge) {
        if (badge) {
          setTimeout(function () {
            showModal(
              badge.icon + ' Badge Unlocked!',
              '<div class="badge-unlock"><div class="badge-icon">' + badge.icon + '</div>' +
              '<div class="badge-label">' + badge.label + '</div>' +
              '<div class="badge-desc">' + badge.desc + '</div></div>'
            );
          }, 600);
        }
      });
    }
    if (levelUnlocked) {
      setTimeout(function () {
        showModal(
          '🔓 Level ' + levelUnlocked + ' Unlocked!',
          '<div class="level-unlock"><p>You have unlocked <strong>Level ' + levelUnlocked +
          ' -- ' + LEVEL_NAMES[levelUnlocked] + '</strong>!</p></div>'
        );
      }, 1200);
    }
  }

  // -----------------------------------------------------------------------
  // Hints
  // -----------------------------------------------------------------------

  function showHint(challenge, hintIndex) {
    const hints = challenge.hints || [];
    if (!hints.length) {
      showToast('No hints available for this challenge.', 'info');
      return;
    }
    const idx = Math.min(hintIndex, hints.length - 1);
    const hintArea = document.getElementById('hint-area');
    const hintText = document.getElementById('hint-text');
    hintText.innerHTML = '<strong>Hint ' + (idx + 1) + ' of ' + hints.length + ':</strong> ' + escHtml(hints[idx]);
    hintArea.style.display = 'block';
    return idx + 1 < hints.length ? idx + 1 : null; // return next hint index or null if exhausted
  }

  // -----------------------------------------------------------------------
  // Search and filter
  // -----------------------------------------------------------------------

  function filterSidebar(query, difficulty, topic) {
    const items = _sidebar.querySelectorAll('.challenge-item');
    const q = (query || '').toLowerCase();

    items.forEach(function (el) {
      const title = el.querySelector('.ch-title').textContent.toLowerCase();
      const diff = (el.querySelector('.ch-diff') || {}).textContent || '';
      const id = parseInt(el.getAttribute('data-id'), 10);
      const challenge = (window.ALL_CHALLENGES || []).find(function (c) { return c.id === id; });
      const topicMatch = !topic || (challenge && challenge.topic === topic);
      const diffMatch = !difficulty || diff === difficulty;
      const queryMatch = !q || title.includes(q);
      el.style.display = (topicMatch && diffMatch && queryMatch) ? '' : 'none';
    });
  }

  // -----------------------------------------------------------------------
  // Navigation
  // -----------------------------------------------------------------------

  function getAdjacentChallengeId(currentId, direction) {
    const all = (window.ALL_CHALLENGES || []).filter(function (c) {
      return Progress.isLevelUnlocked(c.level);
    });
    const idx = all.findIndex(function (c) { return c.id === currentId; });
    if (idx === -1) return null;
    const next = all[idx + direction];
    return next ? next.id : null;
  }

  function getRandomChallengeId() {
    const all = (window.ALL_CHALLENGES || []).filter(function (c) {
      return Progress.isLevelUnlocked(c.level);
    });
    return all[Math.floor(Math.random() * all.length)].id;
  }

  function getDailyChallenge() {
    const all = (window.ALL_CHALLENGES || []).filter(function (c) {
      return Progress.isLevelUnlocked(c.level);
    });
    const dayIndex = Math.floor(Date.now() / 86400000) % all.length;
    return all[dayIndex].id;
  }

  // -----------------------------------------------------------------------
  // Theme
  // -----------------------------------------------------------------------

  function toggleTheme() {
    const current = Progress.getState().theme || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    _applyTheme(next);
    Progress.setTheme(next);
  }

  function _applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('btn-theme');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // -----------------------------------------------------------------------
  // Dashboard modal
  // -----------------------------------------------------------------------

  function openDashboard() {
    const state = Progress.getState();
    const tp = Progress.getTotalProgress();
    const badges = Progress.getAllBadgeDefs();
    const lp = Progress.getLevelProgress();

    let content = '<div class="dashboard">' +
      '<div class="dash-stats">' +
      '<div class="stat-card"><div class="stat-val">' + state.xp + '</div><div class="stat-label">Total XP</div></div>' +
      '<div class="stat-card"><div class="stat-val">' + tp.completed + '</div><div class="stat-label">Completed</div></div>' +
      '<div class="stat-card"><div class="stat-val">' + tp.percent + '%</div><div class="stat-label">Progress</div></div>' +
      '<div class="stat-card"><div class="stat-val">🔥 ' + state.streak + '</div><div class="stat-label">Day Streak</div></div>' +
      '</div>' +
      '<h3>Level Progress</h3><div class="level-progress-grid">';

    lp.forEach(function (l) {
      const pct = l.total ? Math.round(l.completed / l.total * 100) : 0;
      content += '<div class="lp-row"><span class="lp-name">Level ' + l.level + '</span>' +
        '<div class="lp-bar-track"><div class="lp-bar-fill" style="width:' + pct + '%"></div></div>' +
        '<span class="lp-count">' + l.completed + '/' + l.total + '</span></div>';
    });

    content += '</div><h3>Badges</h3><div class="badges-grid">';

    badges.forEach(function (b) {
      const earned = state.badges.includes(b.slug);
      content += '<div class="badge-card' + (earned ? ' earned' : ' locked') + '" title="' + escHtml(b.desc) + '">' +
        '<div class="badge-icon-lg">' + (earned ? b.icon : '🔒') + '</div>' +
        '<div class="badge-name">' + b.label + '</div>' +
        '</div>';
    });

    content += '</div><div class="dash-actions">' +
      '<button class="btn btn-secondary" id="btn-export-progress">Export Progress</button>' +
      '<label class="btn btn-secondary">Import Progress<input type="file" accept=".json" id="import-file" style="display:none"></label>' +
      '<button class="btn btn-danger" id="btn-clear-all">Clear All Progress</button>' +
      '</div></div>';

    showModal('Dashboard', content);

    // Wire up dashboard buttons after modal renders
    setTimeout(function () {
      const expBtn = document.getElementById('btn-export-progress');
      if (expBtn) expBtn.addEventListener('click', Progress.exportProgress);

      const importFile = document.getElementById('import-file');
      if (importFile) {
        importFile.addEventListener('change', function (e) {
          if (e.target.files[0]) {
            Progress.importProgress(e.target.files[0], function (ok) {
              closeModal();
              if (ok) {
                showToast('Progress imported!', 'success');
                location.reload();
              } else {
                showToast('Invalid file.', 'error');
              }
            });
          }
        });
      }

      const clearBtn = document.getElementById('btn-clear-all');
      if (clearBtn) clearBtn.addEventListener('click', Progress.clearAll);
    }, 50);
  }

  // -----------------------------------------------------------------------
  // Modal
  // -----------------------------------------------------------------------

  function showModal(title, bodyHtml) {
    const overlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    modalTitle.textContent = title;
    modalBody.innerHTML = bodyHtml;
    overlay.classList.add('visible');
    document.getElementById('modal-close').focus();
  }

  function closeModal() {
    document.getElementById('modal-overlay').classList.remove('visible');
  }

  // -----------------------------------------------------------------------
  // Toast
  // -----------------------------------------------------------------------

  function showToast(message, type) {
    type = type || 'info';
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;
    _toastContainer.appendChild(toast);
    setTimeout(function () { toast.classList.add('visible'); }, 10);
    setTimeout(function () {
      toast.classList.remove('visible');
      setTimeout(function () { toast.remove(); }, 300);
    }, 2500);
  }

  // -----------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  return {
    init, renderSidebar, renderChallenge, showFeedback, showXPGain,
    showHint, filterSidebar,
    getAdjacentChallengeId, getRandomChallengeId, getDailyChallenge,
    toggleTheme, openDashboard, showModal, closeModal, showToast
  };

})();
