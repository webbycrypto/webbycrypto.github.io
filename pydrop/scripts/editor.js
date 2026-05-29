/**
 * editor.js -- Textarea-based code editor with line numbers and syntax highlighting
 */

const Editor = (function () {

  let _textarea = null;
  let _lineNumbers = null;
  let _highlight = null;
  let _currentChallengeId = null;
  let _saveTimer = null;

  function init(textareaEl, lineNumbersEl, highlightEl) {
    _textarea = textareaEl;
    _lineNumbers = lineNumbersEl;
    _highlight = highlightEl;

    _textarea.addEventListener('keydown', _handleKeydown);
    _textarea.addEventListener('input', _handleInput);
    _textarea.addEventListener('scroll', _syncScroll);

    _renderLineNumbers();
    _renderHighlight();
  }

  function _handleKeydown(e) {
    // Tab key -- insert 4 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = _textarea.selectionStart;
      const end = _textarea.selectionEnd;
      const val = _textarea.value;
      _textarea.value = val.slice(0, start) + '    ' + val.slice(end);
      _textarea.selectionStart = _textarea.selectionEnd = start + 4;
      _handleInput();
      return;
    }

    // Enter key -- auto-indent
    if (e.key === 'Enter') {
      e.preventDefault();
      const start = _textarea.selectionStart;
      const val = _textarea.value;
      const lineStart = val.lastIndexOf('\n', start - 1) + 1;
      const currentLine = val.slice(lineStart, start);
      const indent = currentLine.match(/^(\s*)/)[1];

      // Increase indent after lines ending with ':'
      const extraIndent = currentLine.trimEnd().endsWith(':') ? '    ' : '';

      const insert = '\n' + indent + extraIndent;
      _textarea.value = val.slice(0, start) + insert + val.slice(start);
      _textarea.selectionStart = _textarea.selectionEnd = start + insert.length;
      _handleInput();
      return;
    }
  }

  function _handleInput() {
    _renderLineNumbers();
    _renderHighlight();
    _scheduleSave();
  }

  function _renderLineNumbers() {
    if (!_lineNumbers) return;
    const lines = _textarea.value.split('\n');
    _lineNumbers.innerHTML = lines.map(function (_, i) {
      return '<div>' + (i + 1) + '</div>';
    }).join('');
    _syncScroll();
  }

  function _renderHighlight() {
    if (!_highlight) return;
    _highlight.innerHTML = Highlighter.highlight(_textarea.value) + '\n';
    _syncScroll();
  }

  function _syncScroll() {
    if (_lineNumbers) {
      _lineNumbers.scrollTop = _textarea.scrollTop;
    }
    if (_highlight) {
      _highlight.scrollTop = _textarea.scrollTop;
      _highlight.scrollLeft = _textarea.scrollLeft;
    }
  }

  function _scheduleSave() {
    if (!_currentChallengeId) return;
    clearTimeout(_saveTimer);
    _saveTimer = setTimeout(function () {
      Progress.saveEditorCode(_currentChallengeId, _textarea.value);
    }, 500);
  }

  function loadChallenge(challenge) {
    _currentChallengeId = challenge.id;
    const saved = Progress.loadEditorCode(challenge.id);
    _textarea.value = saved !== null ? saved : challenge.starterCode;
    _handleInput();
  }

  function reset(challenge) {
    _textarea.value = challenge.starterCode;
    Progress.saveEditorCode(challenge.id, challenge.starterCode);
    _handleInput();
  }

  function getValue() {
    return _textarea.value;
  }

  function setValue(code) {
    _textarea.value = code;
    _handleInput();
  }

  function focus() {
    _textarea.focus();
  }

  return { init, loadChallenge, reset, getValue, setValue, focus };

})();
