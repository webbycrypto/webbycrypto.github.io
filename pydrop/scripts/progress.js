/**
 * progress.js -- completion tracking, streaks, badges, and LocalStorage persistence
 */

const Progress = (function () {

  const STORAGE_KEY = 'pylearn_progress';

  const DEFAULT_STATE = {
    completedChallenges: [],
    hintsUsed: [],
    solutionsRevealed: [],
    badges: [],
    streak: 0,
    lastActiveDate: null,
    currentChallenge: null,
    theme: 'dark'
  };

  const BADGE_DEFS = [
    { slug: 'first-step',  label: 'First Step',   icon: '🎯', desc: 'Complete your first challenge.' },
    { slug: 'on-a-roll',   label: 'On a Roll',    icon: '🔥', desc: '5 challenges without using a hint.' },
    { slug: 'dedicated',   label: 'Dedicated',    icon: '📅', desc: 'Maintain a 7-day streak.' },
    { slug: 'pythonista',  label: 'Pythonista',   icon: '🐍', desc: 'Complete all Level 1 challenges.' },
    { slug: 'master',      label: 'Master',       icon: '🏆', desc: 'Complete every challenge.' }
  ];

  let state = null;

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        state = Object.assign({}, DEFAULT_STATE, JSON.parse(raw));
      } else {
        state = Object.assign({}, DEFAULT_STATE);
      }
    } catch (e) {
      state = Object.assign({}, DEFAULT_STATE);
    }
    _updateStreak();
    return state;
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function getState() {
    return state;
  }

  // Clear all progress and reload
  function clearAll() {
    if (!confirm('This will permanently erase all your completions, badges, and streak. Are you sure?')) return;
    localStorage.removeItem(STORAGE_KEY);
    state = Object.assign({}, DEFAULT_STATE);
    save();
    location.reload();
  }

  function _updateStreak() {
    const today = _todayStr();
    if (!state.lastActiveDate) return;
    const last = state.lastActiveDate;
    if (last === today) return;
    const diff = _dayDiff(last, today);
    if (diff > 1) {
      state.streak = 0;
    }
  }

  function _todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function _dayDiff(a, b) {
    const msA = new Date(a).getTime();
    const msB = new Date(b).getTime();
    return Math.round((msB - msA) / 86400000);
  }

  /**
   * Record a challenge completion.
   * Returns { newBadges[] }
   */
  function completeChallenge(challengeId, difficulty, usedHint) {
    const alreadyDone = state.completedChallenges.includes(challengeId);
    const newBadges = [];

    if (!alreadyDone) {
      state.completedChallenges.push(challengeId);
    }

    // Update streak
    const today = _todayStr();
    if (state.lastActiveDate !== today) {
      if (state.lastActiveDate) {
        const diff = _dayDiff(state.lastActiveDate, today);
        if (diff === 1) {
          state.streak += 1;
        } else if (diff > 1) {
          state.streak = 1;
        }
      } else {
        state.streak = 1;
      }
      state.lastActiveDate = today;
    }

    // Check badges
    const earned = _checkBadges(challengeId, difficulty, usedHint);
    earned.forEach(function (b) {
      if (!state.badges.includes(b)) {
        state.badges.push(b);
        newBadges.push(BADGE_DEFS.find(function (d) { return d.slug === b; }));
      }
    });

    save();
    return { newBadges };
  }

  function _checkBadges(challengeId, difficulty, usedHint) {
    const earned = [];
    const done = state.completedChallenges;
    const challenges = window.ALL_CHALLENGES || [];

    // First Step
    if (done.length === 1) earned.push('first-step');

    // Dedicated
    if (state.streak >= 7) earned.push('dedicated');

    // Pythonista -- all level 1 done
    const lvl1 = challenges.filter(function (c) { return c.level === 1; });
    if (lvl1.length > 0 && lvl1.every(function (c) { return done.includes(c.id); })) {
      earned.push('pythonista');
    }

    // On a Roll -- 5 consecutive without hints (approximate: 5 recent without any hint used)
    const recentFive = done.slice(-5);
    if (recentFive.length === 5) {
      const anyHint = recentFive.some(function (id) { return state.hintsUsed.includes(id); });
      if (!anyHint) earned.push('on-a-roll');
    }

    // Master
    if (challenges.length > 0 && done.length >= challenges.length) {
      earned.push('master');
    }

    return earned;
  }

  function markHintUsed(challengeId) {
    if (!state.hintsUsed.includes(challengeId)) {
      state.hintsUsed.push(challengeId);
      save();
    }
  }

  function markSolutionRevealed(challengeId) {
    if (!state.solutionsRevealed.includes(challengeId)) {
      state.solutionsRevealed.push(challengeId);
      save();
    }
  }

  function setCurrentChallenge(id) {
    state.currentChallenge = id;
    save();
  }

  function saveEditorCode(challengeId, code) {
    const key = STORAGE_KEY + '_code_' + challengeId;
    localStorage.setItem(key, code);
  }

  function loadEditorCode(challengeId) {
    return localStorage.getItem(STORAGE_KEY + '_code_' + challengeId) || null;
  }

  function setTheme(theme) {
    state.theme = theme;
    save();
  }

  function exportProgress() {
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dropacademy-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function importProgress(file, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const imported = JSON.parse(e.target.result);
        state = Object.assign({}, DEFAULT_STATE, imported);
        save();
        if (callback) callback(true);
      } catch (err) {
        if (callback) callback(false);
      }
    };
    reader.readAsText(file);
  }

  function getLevelProgress() {
    const challenges = window.ALL_CHALLENGES || [];
    const levels = [1, 2, 3, 4, 5];
    return levels.map(function (lvl) {
      const inLevel = challenges.filter(function (c) { return c.level === lvl; });
      const doneInLevel = inLevel.filter(function (c) {
        return state.completedChallenges.includes(c.id);
      });
      return {
        level: lvl,
        total: inLevel.length,
        completed: doneInLevel.length
      };
    });
  }

  function getTotalProgress() {
    const challenges = window.ALL_CHALLENGES || [];
    return {
      completed: state.completedChallenges.length,
      total: challenges.length,
      percent: challenges.length ? Math.round(state.completedChallenges.length / challenges.length * 100) : 0
    };
  }

  function getAllBadgeDefs() {
    return BADGE_DEFS;
  }

  function isChallengeCompleted(id) {
    return state.completedChallenges.includes(id);
  }

  function wasHintUsed(id) {
    return state.hintsUsed.includes(id);
  }

  return {
    load, save, getState, clearAll,
    completeChallenge, markHintUsed, markSolutionRevealed,
    setCurrentChallenge, saveEditorCode, loadEditorCode, setTheme,
    exportProgress, importProgress,
    getLevelProgress, getTotalProgress, getAllBadgeDefs,
    isChallengeCompleted, wasHintUsed
  };

})();
