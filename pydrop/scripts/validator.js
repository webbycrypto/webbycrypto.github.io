/**
 * validator.js -- Python code pattern validator
 * Analyses code strings using regex and structural checks.
 * No Python runtime required.
 */

const Validator = (function () {

  // Run a single check against code
  function runCheck(code, check) {
    const trimmed = code.trim();
    let passed = false;

    switch (check.type) {

      case 'hasDef':
        if (check.name) {
          passed = new RegExp('def\\s+' + escRe(check.name) + '\\s*\\(').test(trimmed);
        } else {
          passed = /def\s+\w+\s*\(/.test(trimmed);
        }
        break;

      case 'hasValidDef':
        // Like hasDef but requires the colon, rejecting `def foo()` without `:`
        if (check.name) {
          passed = new RegExp('def\\s+' + escRe(check.name) + '\\s*\\([^)]*\\)\\s*:').test(trimmed);
        } else {
          passed = /def\s+\w+\s*\([^)]*\)\s*:/.test(trimmed);
        }
        break;

      case 'hasReturn':
        passed = /\breturn\b/.test(trimmed);
        break;

      case 'hasClass':
        if (check.name) {
          passed = new RegExp('class\\s+' + escRe(check.name) + '\\s*[:(\\[]').test(trimmed);
        } else {
          passed = /class\s+\w+/.test(trimmed);
        }
        break;

      case 'hasImport':
        if (check.module) {
          passed = new RegExp(
            '(?:import\\s+' + escRe(check.module) + '|from\\s+' + escRe(check.module) + '\\s+import)'
          ).test(trimmed);
        } else {
          passed = /(?:import\s+\w+|from\s+\w+\s+import)/.test(trimmed);
        }
        break;

      case 'hasDecorator':
        if (check.name) {
          passed = new RegExp('@' + escRe(check.name) + '\\b').test(trimmed);
        } else {
          passed = /@\w+/.test(trimmed);
        }
        break;

      case 'hasTypeHint':
        passed = /:\s*(str|int|float|bool|list|dict|set|tuple|Any|Optional|Union|List|Dict|Tuple|Set)\b|->/.test(trimmed);
        break;

      case 'hasAsync':
        passed = /async\s+def\s+/.test(trimmed);
        break;

      case 'hasAwait':
        passed = /\bawait\b/.test(trimmed);
        break;

      case 'hasListComp':
        passed = /\[.+\bfor\b.+\bin\b.+\]/.test(trimmed);
        break;

      case 'hasDictComp':
        passed = /\{.+:.+\bfor\b.+\bin\b.+\}/.test(trimmed);
        break;

      case 'hasException':
        passed = /\btry\s*:/.test(trimmed) && /\bexcept\b/.test(trimmed);
        break;

      case 'hasContextManager':
        passed = /\bwith\b/.test(trimmed);
        break;

      case 'hasDataclass':
        passed = /@dataclass/.test(trimmed);
        break;

      case 'hasPydanticModel':
        passed = /class\s+\w+\s*\(\s*BaseModel\s*\)/.test(trimmed);
        break;

      case 'hasFlaskApp':
        passed = /Flask\s*\(\s*__name__\s*\)/.test(trimmed);
        break;

      case 'hasFlaskRoute':
        passed = /@(?:app|bp|\w+_bp)\.route\s*\(/.test(trimmed);
        break;

      case 'hasFastAPIApp':
        passed = /FastAPI\s*\(\s*\)/.test(trimmed);
        break;

      case 'hasFastAPIRoute':
        passed = /@app\.(?:get|post|put|delete|patch)\s*\(/.test(trimmed);
        break;

      case 'hasDjangoModel':
        passed = /class\s+\w+\s*\(\s*models\.Model\s*\)/.test(trimmed);
        break;

      case 'codeContains':
        passed = trimmed.includes(check.value);
        break;

      case 'matchesRegex':
        try {
          passed = new RegExp(check.pattern, 's').test(trimmed);
        } catch (e) {
          passed = false;
        }
        break;

      default:
        passed = false;
    }

    return { passed, message: check.message || 'Check failed.' };
  }

  // Escape a string for use in a RegExp
  function escRe(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Run all checks for a challenge.
   * Returns { passed, feedback[], partialCredit, total }
   */
  function validate(code, checks) {
    if (!code || !code.trim()) {
      return {
        passed: false,
        feedback: ['Write some code first!'],
        partialCredit: 0,
        total: checks.length
      };
    }

    const results = checks.map(function (check) {
      return runCheck(code, check);
    });

    const passed = results.every(function (r) { return r.passed; });
    const feedback = results
      .filter(function (r) { return !r.passed; })
      .map(function (r) { return r.message; });
    const partialCredit = results.filter(function (r) { return r.passed; }).length;

    return { passed, feedback, partialCredit, total: checks.length };
  }

  /**
   * Build a friendly feedback message from a validation result.
   */
  function buildFeedbackMessage(result) {
    if (result.passed) {
      return null;
    }

    const { partialCredit, total, feedback } = result;

    let intro = '';
    if (partialCredit === 0) {
      const intros = [
        "Not quite yet -- let's work through it.",
        "Keep going! Here is what is missing:",
        "Almost -- just a few things to fix:"
      ];
      intro = intros[Math.floor(Math.random() * intros.length)];
    } else {
      intro = 'Good progress! You have ' + partialCredit + ' of ' + total + ' checks passing. Still missing:';
    }

    return intro + '\n' + feedback.map(function (f) { return '  - ' + f; }).join('\n');
  }

  return { validate, buildFeedbackMessage };

})();
