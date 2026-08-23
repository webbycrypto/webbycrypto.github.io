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
    5: 'Blockchain Fundamentals'
  };

  // Common Python builtins that are genuinely useful but never come up in
  // any lesson -- hand-written since there's no challenge to extract them
  // from. Kept short: only the ones worth knowing, not the full builtin list.
  const GLOSSARY_EXTRAS = [
    {
      term: 'eval()', definition: 'Runs a string as a Python expression and returns the result. Handy in quick scripts, risky on untrusted input.',
      example: 'eval("2 + 3 * 4")\n# Output: 14'
    },
    {
      term: 'getattr()', definition: "Reads an attribute off an object by name (as a string), with an optional fallback instead of crashing if it's missing.",
      example: 'getattr(price, "currency", "USD")\n# Output: "USD" (if price has no .currency)'
    },
    {
      term: 'hasattr()', definition: 'Checks whether an object has a given attribute, returning True/False instead of raising an error.',
      example: 'hasattr("hello", "upper")\n# Output: True'
    },
    {
      term: 'divmod()', definition: 'Returns (quotient, remainder) as a tuple in one call, instead of writing // and % separately.',
      example: 'divmod(17, 5)\n# Output: (3, 2)'
    },
    {
      term: 'pow()', definition: 'Same as ** for two arguments; a third argument does efficient modular exponentiation (pow(a, b, m) == (a ** b) % m, but fast).',
      example: 'pow(2, 10)\n# Output: 1024'
    },
    {
      term: 'abs()', definition: 'Absolute value of a number -- drops the sign.',
      example: 'abs(-7)\n# Output: 7'
    },
    {
      term: 'callable()', definition: 'True if the object can be called like a function (with parentheses), False otherwise.',
      example: 'callable(len)\n# Output: True'
    },
    {
      term: 'iter()', definition: 'Turns an iterable into an iterator you can manually advance with next() -- what a for loop does internally.',
      example: 'it = iter([10, 20, 30])\nnext(it)\n# Output: 10'
    }
  ];

  function init() {
    _sidebar = document.getElementById('sidebar');
    _mainPanel = document.getElementById('main-panel');
    _toastContainer = document.getElementById('toast-container');
    _applyTheme(Progress.getState().theme || 'light');
    const storedSidebarOpen = Progress.getState().sidebarOpen;
    _applySidebar(storedSidebarOpen === undefined ? window.innerWidth > 900 : storedSidebarOpen);
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
      '<div class="xp-row"><span class="streak-badge" title="Day streak">🔥 ' + (state.streak || 0) + '</span></div>' +
      '<div class="xp-bar-track"><div class="xp-bar-fill" style="width:' + tp.percent + '%"></div></div>' +
      '<div class="xp-meta">' + tp.completed + ' / ' + tp.total + ' challenges</div>' +
      '</div>';

    // Level trees
    for (let lvl = 1; lvl <= 5; lvl++) {
      const levelChallenges = challenges.filter(function (c) { return c.level === lvl; });
      const gradableInLevel = levelChallenges.filter(function (c) { return c.kind !== 'intro'; });
      const completedCount = gradableInLevel.filter(function (c) {
        return Progress.isChallengeCompleted(c.id);
      }).length;

      html += '<div class="level-group">' +
        '<div class="level-header" data-level="' + lvl + '">' +
        '<span class="level-name">Level ' + lvl + ' -- ' + LEVEL_NAMES[lvl] + '</span>' +
        '<span class="level-count">' + completedCount + '/' + gradableInLevel.length + '</span>' +
        '</div>';

      html += '<div class="challenge-list">';
      levelChallenges.forEach(function (c) {
        const isIntro = c.kind === 'intro';
        const done = !isIntro && Progress.isChallengeCompleted(c.id);
        const active = c.id === currentId;
        const diffClass = 'diff-' + c.difficulty;
        html += '<div class="challenge-item' +
          (active ? ' active' : '') +
          (done ? ' done' : '') +
          '" data-id="' + c.id + '">' +
          '<span class="ch-status">' + (done ? '✓' : '●') + '</span>' +
          '<span class="ch-title">' + escHtml(c.title) +
          (c.kind === 'project' ? ' <span class="ch-project-badge" title="Guided project">📘</span>' : '') +
          '</span>' +
          (isIntro
            ? '<span class="ch-intro-badge" title="Level intro">📖</span>'
            : '<span class="ch-diff-dot ' + diffClass + '" data-difficulty="' + c.difficulty + '" title="' + c.difficulty + '" aria-label="' + c.difficulty + ' difficulty"></span>') +
          '</div>';
      });
      html += '</div>';

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

  // Post-processes rendered instructions HTML: adds line numbers + real
  // syntax highlighting to Quick Example code blocks, and splits a trailing
  // "# Output: ..." comment out into its own callout instead of leaving it
  // inline in the code. Also flags the task-level Example's "Output" io-row
  // so it can get the matching callout styling via CSS.
  function _enhanceExampleBlocks(root) {
    root.querySelectorAll('.example-block pre code').forEach(function (codeEl) {
      const lines = codeEl.textContent.split('\n');
      let outputText = null;

      for (let i = lines.length - 1; i >= 0; i--) {
        const m = lines[i].match(/^(.*?)#\s*Output:\s*(.+)$/);
        if (m) {
          outputText = m[2].trim();
          if (m[1].trim() === '') {
            lines.splice(i, 1);
          } else {
            lines[i] = m[1].replace(/\s+$/, '');
          }
          break;
        }
      }
      while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();

      codeEl.innerHTML = lines.map(function (line, idx) {
        const highlighted = Highlighter.highlight(line);
        return '<span class="code-line"><span class="line-no">' + (idx + 1) + '</span><span class="line-code">' + (highlighted || '&nbsp;') + '</span></span>';
      }).join('');

      const pre = codeEl.closest('pre');
      pre.classList.add('code-block');

      if (outputText !== null) {
        const exampleBlock = pre.closest('.example-block');
        const out = document.createElement('div');
        out.className = 'example-output';
        out.appendChild(document.createTextNode('# Output: '));
        const val = document.createElement('span');
        val.className = 'example-output-val';
        val.textContent = outputText;
        out.appendChild(val);
        exampleBlock.insertAdjacentElement('afterend', out);
      }
    });

    root.querySelectorAll('.io-row').forEach(function (row) {
      const key = row.querySelector('.io-key');
      if (key && key.textContent.trim().toLowerCase() === 'output') {
        row.classList.add('io-row--output');
      }
    });

    // Give the task's own Input/Output values the same real syntax
    // highlighting as the Quick Example code, instead of flat single-color
    // text. Handles multi-line values (joined with <br> in the content).
    root.querySelectorAll('.io-val').forEach(function (el) {
      const rawLines = el.innerHTML.split(/<br\s*\/?>/i);
      el.innerHTML = rawLines.map(function (line) {
        const tmp = document.createElement('div');
        tmp.innerHTML = line;
        return Highlighter.highlight(tmp.textContent);
      }).join('<br>');
    });
  }

  function renderChallenge(challenge) {
    const isIntro = challenge.kind === 'intro';
    const done = !isIntro && Progress.isChallengeCompleted(challenge.id);

    let html = '<div class="challenge-header">' +
      '<div class="challenge-meta">' +
      '<span class="topic-chip">' + escHtml(challenge.topic) + '</span>' +
      (challenge.kind === 'project' ? '<span class="project-chip">📘 Guided Project</span>' : '') +
      (done ? '<span class="done-chip">✓ Completed</span>' : '') +
      '</div>' +
      '<h1 class="challenge-title">' + escHtml(challenge.title) + '</h1>' +
      (challenge.source ? '<p class="project-source">Adapted from ' + escHtml(challenge.source) + '</p>' : '') +
      '</div>' +
      '<div class="instructions">' + challenge.instructions + '</div>';

    if (isIntro) {
      const nextId = getAdjacentChallengeId(challenge.id, 1);
      html += '<button class="btn btn-primary intro-start-btn" id="btn-intro-start"' +
        (nextId === null ? ' disabled' : '') + '>Start Level &#8594;</button>';
    }

    document.getElementById('challenge-info').innerHTML = html;
    _enhanceExampleBlocks(document.getElementById('challenge-info'));

    if (isIntro) {
      const startBtn = document.getElementById('btn-intro-start');
      if (startBtn) {
        startBtn.addEventListener('click', function () {
          const nextId = getAdjacentChallengeId(challenge.id, 1);
          if (nextId !== null) App.navigateTo(nextId);
        });
      }
    }

    document.getElementById('app').classList.toggle('intro-mode', isIntro);

    // Action bar
    document.getElementById('btn-run').classList.toggle('done', done);
    document.getElementById('feedback-panel').innerHTML = '';
    document.getElementById('explanation-panel').innerHTML = '';
    document.getElementById('explanation-panel').style.display = 'none';
    document.getElementById('hint-text').innerHTML = '';
    document.getElementById('hint-area').style.display = 'none';
  }

  // Updates just the header's "Completed" chip and the Run button's done
  // state in place, without wiping the feedback/explanation panels that
  // were just shown -- renderChallenge() would clear those.
  function markChallengeDone(challenge) {
    const meta = document.querySelector('.challenge-meta');
    if (meta && !meta.querySelector('.done-chip')) {
      meta.insertAdjacentHTML('beforeend', '<span class="done-chip">✓ Completed</span>');
    }
    document.getElementById('btn-run').classList.add('done');
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

  // -----------------------------------------------------------------------
  // Python execution feedback (pyTests)
  // -----------------------------------------------------------------------

  function showPyTestFeedback(results, challenge) {
    const allPassed = results.every(function (r) { return r.passed; });
    if (allPassed) {
      showFeedback({ passed: true }, challenge);
      return;
    }

    const failed = results.filter(function (r) { return !r.passed; });
    const intro = failed.length === results.length
      ? "Your code ran, but the result isn't quite right yet:"
      : 'Good progress! ' + (results.length - failed.length) + ' of ' + results.length + ' checks passed. Still off:';
    const lines = failed.map(function (r) { return '  - ' + r.message; }).join('\n');

    const panel = document.getElementById('feedback-panel');
    panel.className = 'feedback-panel error';
    panel.innerHTML = '<div class="fb-icon">✗</div><div class="fb-text">' +
      escHtml(intro + '\n' + lines).replace(/\n/g, '<br>') + '</div>';
  }

  function showRuntimeError(traceback) {
    const panel = document.getElementById('feedback-panel');
    panel.className = 'feedback-panel error';
    panel.innerHTML = '<div class="fb-icon">⚠</div><div class="fb-text">' +
      'Your code raised an error when it ran:<br><pre class="fb-traceback">' +
      escHtml(traceback) + '</pre></div>';
  }

  function showTimeout() {
    const panel = document.getElementById('feedback-panel');
    panel.className = 'feedback-panel error';
    panel.innerHTML = '<div class="fb-icon">⏱</div><div class="fb-text">' +
      'Your code took too long to run (possible infinite loop). It was stopped after 5 seconds.</div>';
  }

  let _runtimeLoadingShown = false;

  function setLoadingRuntime(isLoading) {
    if (isLoading && !_runtimeLoadingShown) {
      _runtimeLoadingShown = true;
      showToast('Loading the Python runtime (first run only)…', 'info');
    }
  }

  function setRunning(isRunning) {
    const btn = document.getElementById('btn-run');
    if (!btn) return;
    btn.disabled = isRunning;
    btn.classList.toggle('running', isRunning);
  }

  function showBadges(newBadges) {
    if (!newBadges || !newBadges.length) return;
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
      const dotEl = el.querySelector('.ch-diff-dot');
      const diff = dotEl ? dotEl.getAttribute('data-difficulty') || '' : '';
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
    const all = window.ALL_CHALLENGES || [];
    const idx = all.findIndex(function (c) { return c.id === currentId; });
    if (idx === -1) return null;
    const next = all[idx + direction];
    return next ? next.id : null;
  }

  function getRandomChallengeId() {
    const all = (window.ALL_CHALLENGES || []).filter(function (c) { return c.kind !== 'intro'; });
    return all[Math.floor(Math.random() * all.length)].id;
  }

  function getDailyChallenge() {
    const all = (window.ALL_CHALLENGES || []).filter(function (c) { return c.kind !== 'intro'; });
    const dayIndex = Math.floor(Date.now() / 86400000) % all.length;
    return all[dayIndex].id;
  }

  // -----------------------------------------------------------------------
  // Theme
  // -----------------------------------------------------------------------

  function toggleTheme() {
    const current = Progress.getState().theme || 'light';
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
  // Sidebar drawer
  // -----------------------------------------------------------------------

  function toggleSidebar() {
    const isOpen = !document.getElementById('app').classList.contains('sidebar-collapsed');
    _applySidebar(!isOpen);
    Progress.setSidebarOpen(!isOpen);
  }

  function _applySidebar(open) {
    const app = document.getElementById('app');
    if (app) app.classList.toggle('sidebar-collapsed', !open);
    const btn = document.getElementById('btn-sidebar-toggle');
    if (btn) btn.setAttribute('aria-expanded', String(open));
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
  // Glossary
  // -----------------------------------------------------------------------

  let _glossaryData = null;

  // Walks every challenge's already-written instructions HTML and pulls out
  // its Jargon Breakdown bullets (<li><strong>Term:</strong> ...</li>) plus
  // that challenge's Quick Example code, if it has one. No new content is
  // written here -- this only reads what's already taught. Deduped by term
  // name (case-insensitive), first occurrence in curriculum order wins.
  function _buildGlossaryData() {
    if (_glossaryData) return _glossaryData;

    const seen = new Set();
    const entries = [];
    const scratch = document.createElement('div');

    (window.ALL_CHALLENGES || []).forEach(function (c) {
      if (c.kind === 'intro' || !c.instructions) return;

      scratch.innerHTML = c.instructions;

      const exampleCode = scratch.querySelector('.example-block pre code');
      const example = exampleCode ? exampleCode.textContent.trim() : null;

      scratch.querySelectorAll('li').forEach(function (li) {
        const strong = li.querySelector('strong');
        if (!strong || li.firstElementChild !== strong) return;
        const term = strong.textContent.replace(/:$/, '').trim();
        const key = term.toLowerCase();
        if (!term || seen.has(key)) return;
        seen.add(key);

        const definition = li.textContent.slice(strong.textContent.length).replace(/^:\s*/, '').trim();
        entries.push({
          term: term,
          definition: definition,
          example: example,
          topic: c.topic,
          level: c.level,
          challengeId: c.id,
          challengeTitle: c.title
        });
      });
    });

    GLOSSARY_EXTRAS.forEach(function (extra) {
      if (seen.has(extra.term.toLowerCase().replace(/\(\)$/, ''))) return;
      entries.push({
        term: extra.term,
        definition: extra.definition,
        example: extra.example,
        topic: 'Python Reference',
        level: null,
        challengeId: null,
        challengeTitle: null
      });
    });

    entries.sort(function (a, b) { return a.term.localeCompare(b.term); });
    _glossaryData = entries;
    return entries;
  }

  function _renderGlossaryList(entries) {
    if (!entries.length) return '<p class="glossary-empty">No terms match that search.</p>';
    return entries.map(function (e) {
      const exampleHtml = e.example
        ? '<pre class="glossary-example"><code>' + Highlighter.highlight(e.example) + '</code></pre>'
        : '';
      const sourceHtml = e.challengeId !== null
        ? '<button class="glossary-source" data-id="' + e.challengeId + '">' +
          escHtml('Level ' + e.level + ' -- ' + e.challengeTitle) + '</button>'
        : '<span class="glossary-source glossary-source--extra">Not covered in a lesson</span>';
      return '<div class="glossary-entry" data-term="' + escHtml(e.term.toLowerCase()) + '" data-topic="' + escHtml(e.topic) + '">' +
        '<div class="glossary-term-row"><code class="glossary-term">' + escHtml(e.term) + '</code>' +
        '<span class="glossary-topic-tag">' + escHtml(e.topic) + '</span></div>' +
        '<p class="glossary-def">' + escHtml(e.definition) + '</p>' +
        exampleHtml +
        sourceHtml +
        '</div>';
    }).join('');
  }

  function openGlossary() {
    const entries = _buildGlossaryData();
    const content = '<div class="glossary">' +
      '<input type="text" id="glossary-search" class="glossary-search" placeholder="Search functions, methods, terms…" autocomplete="off">' +
      '<div class="glossary-list" id="glossary-list">' + _renderGlossaryList(entries) + '</div>' +
      '</div>';

    showModal('Glossary', content);

    setTimeout(function () {
      const searchInput = document.getElementById('glossary-search');
      const list = document.getElementById('glossary-list');
      if (searchInput) {
        searchInput.addEventListener('input', function () {
          const q = searchInput.value.trim().toLowerCase();
          const filtered = !q ? entries : entries.filter(function (e) {
            return e.term.toLowerCase().includes(q) ||
              e.definition.toLowerCase().includes(q) ||
              e.topic.toLowerCase().includes(q);
          });
          list.innerHTML = _renderGlossaryList(filtered);
        });
        searchInput.focus();
      }
      if (list) {
        list.addEventListener('click', function (e) {
          const btn = e.target.closest('.glossary-source');
          if (!btn || !btn.dataset.id) return;
          closeModal();
          App.navigateTo(parseInt(btn.dataset.id, 10));
        });
      }
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
    init, renderSidebar, renderChallenge, markChallengeDone, showFeedback, showBadges,
    showHint, filterSidebar,
    getAdjacentChallengeId, getRandomChallengeId, getDailyChallenge,
    toggleTheme, toggleSidebar, openDashboard, openGlossary, showModal, closeModal, showToast,
    showPyTestFeedback, showRuntimeError, showTimeout,
    setLoadingRuntime, setRunning
  };

})();
