/**
 * highlighter.js -- Pure-JS Python syntax highlighter
 * No CDN, no external dependencies.
 * Tokenises Python source and wraps tokens in <span class="hl-*"> elements.
 */

const Highlighter = (function () {

  const KEYWORDS = new Set([
    'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
    'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
    'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
    'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
    'try', 'while', 'with', 'yield'
  ]);

  const BUILTINS = new Set([
    'abs', 'all', 'any', 'ascii', 'bin', 'bool', 'breakpoint', 'bytearray',
    'bytes', 'callable', 'chr', 'classmethod', 'compile', 'complex',
    'copyright', 'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval',
    'exec', 'filter', 'float', 'format', 'frozenset', 'getattr', 'globals',
    'hasattr', 'hash', 'help', 'hex', 'id', 'input', 'int', 'isinstance',
    'issubclass', 'iter', 'len', 'list', 'locals', 'map', 'max', 'memoryview',
    'min', 'next', 'object', 'oct', 'open', 'ord', 'pow', 'print', 'property',
    'range', 'repr', 'reversed', 'round', 'set', 'setattr', 'slice', 'sorted',
    'staticmethod', 'str', 'sum', 'super', 'tuple', 'type', 'vars', 'zip',
    'Exception', 'ValueError', 'TypeError', 'KeyError', 'IndexError',
    'AttributeError', 'RuntimeError', 'StopIteration', 'NotImplementedError',
    'FileNotFoundError', 'OSError', 'IOError', 'ZeroDivisionError',
    'BaseModel', 'FastAPI', 'Flask', 'Blueprint', 'dataclass', 'field',
    'Optional', 'Union', 'List', 'Dict', 'Tuple', 'Set', 'Any'
  ]);

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function span(cls, content) {
    return '<span class="hl-' + cls + '">' + escapeHtml(content) + '</span>';
  }

  /**
   * Tokenise a single line and return highlighted HTML.
   */
  function highlightLine(line) {
    let result = '';
    let i = 0;
    const len = line.length;

    while (i < len) {

      // Triple-quoted string (simplified -- only within a line)
      if ((line[i] === '"' && line[i + 1] === '"' && line[i + 2] === '"') ||
          (line[i] === "'" && line[i + 1] === "'" && line[i + 2] === "'")) {
        const q = line.slice(i, i + 3);
        let end = line.indexOf(q, i + 3);
        if (end === -1) end = len - 3;
        const token = line.slice(i, end + 3);
        result += span('string', token);
        i = end + 3;
        continue;
      }

      // Comment
      if (line[i] === '#') {
        result += span('comment', line.slice(i));
        break;
      }

      // Single/double quoted string
      if (line[i] === '"' || line[i] === "'") {
        const quote = line[i];
        let j = i + 1;
        while (j < len) {
          if (line[j] === '\\') { j += 2; continue; }
          if (line[j] === quote) { j++; break; }
          j++;
        }
        result += span('string', line.slice(i, j));
        i = j;
        continue;
      }

      // Number (int or float)
      if (/\d/.test(line[i]) && (i === 0 || /\W/.test(line[i - 1]))) {
        let j = i;
        while (j < len && /[\d._]/.test(line[j])) j++;
        result += span('number', line.slice(i, j));
        i = j;
        continue;
      }

      // Decorator
      if (line[i] === '@' && i === line.search(/\S/)) {
        let j = i + 1;
        while (j < len && /[\w.]/.test(line[j])) j++;
        result += span('decorator', line.slice(i, j));
        i = j;
        continue;
      }

      // Word (keyword, builtin, or identifier)
      if (/[a-zA-Z_]/.test(line[i])) {
        let j = i;
        while (j < len && /\w/.test(line[j])) j++;
        const word = line.slice(i, j);
        if (KEYWORDS.has(word)) {
          result += span('keyword', word);
        } else if (BUILTINS.has(word)) {
          result += span('builtin', word);
        } else if (j < len && line[j] === '(') {
          result += span('function', word);
        } else {
          result += escapeHtml(word);
        }
        i = j;
        continue;
      }

      // Operator characters
      if (/[+\-*/%=<>!&|^~]/.test(line[i])) {
        let j = i;
        while (j < len && /[+\-*/%=<>!&|^~]/.test(line[j])) j++;
        result += span('operator', line.slice(i, j));
        i = j;
        continue;
      }

      // Punctuation (brackets, colon, comma)
      if (/[()[\]{},.:;]/.test(line[i])) {
        result += span('punctuation', line[i]);
        i++;
        continue;
      }

      // Everything else
      result += escapeHtml(line[i]);
      i++;
    }

    return result;
  }

  /**
   * Highlight a full Python code string.
   * Returns an HTML string with syntax spans.
   */
  function highlight(code) {
    if (!code) return '';
    const lines = code.split('\n');
    return lines.map(function (line) {
      return highlightLine(line);
    }).join('\n');
  }

  return { highlight };

})();
