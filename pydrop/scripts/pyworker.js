/**
 * pyworker.js: Runs inside a dedicated module Worker. Loads the vendored
 * Pyodide runtime once, then executes student code + pyTests in a fresh
 * namespace on every 'run' message. Never touches the DOM or main thread state.
 */

import { loadPyodide } from '../vendor/pyodide/pyodide.mjs';

let pyodideReadyPromise = null;

function getPyodide() {
  if (!pyodideReadyPromise) {
    pyodideReadyPromise = loadPyodide({ indexURL: '../vendor/pyodide/' });
  }
  return pyodideReadyPromise;
}

// Opt-in packages for challenges that need more than the standard library.
// Not part of the core Pyodide distribution, so wheels are vendored locally
// (same no-CDN rule as the runtime itself) and loaded only when a challenge
// actually asks for them via validation.packages.
const PACKAGE_WHEELS = {
  openpyxl: [
    '../vendor/pyodide/packages/et_xmlfile-2.0.0-py3-none-any.whl',
    '../vendor/pyodide/packages/openpyxl-3.1.5-py2.py3-none-any.whl'
  ]
};

const _loadedPackages = new Set();

async function ensurePackages(pyodide, packages) {
  if (!packages || !packages.length) return;
  const toLoad = [];
  for (const pkg of packages) {
    if (_loadedPackages.has(pkg)) continue;
    const wheels = PACKAGE_WHEELS[pkg];
    if (!wheels) continue;
    toLoad.push.apply(toLoad, wheels);
    _loadedPackages.add(pkg);
  }
  if (toLoad.length) {
    await pyodide.loadPackage(toLoad);
  }
}

// Runs inside Python: executes student code in a fresh namespace, then
// runs each test snippet against that namespace, catching failures per-test
// so partial progress can be reported (mirrors Validator's partialCredit).
// random.seed() is reset before every run so challenges that use random.*
// still produce a fixed, gradable result instead of a different one each time.
// argv/stdin_data let CLI-style challenges preset sys.argv and feed input();
// stdout is always captured into ns['stdout_output'] so pyTests can assert
// on printed output without the student needing to return it explicitly.
const RUNNER_SRC = `
import traceback
import random
import sys
import io

def __pydrop_run(student_code, test_snippets, argv, stdin_data):
    random.seed(1337)
    ns = {}
    old_argv = sys.argv
    old_stdin = sys.stdin
    old_stdout = sys.stdout
    sys.argv = ["script.py"] + list(argv)
    sys.stdin = io.StringIO(stdin_data)
    captured = io.StringIO()
    sys.stdout = captured
    try:
        exec(student_code, ns)
    except Exception:
        tb = traceback.format_exc()
        return {"ok": False, "stage": "student", "traceback": tb, "results": []}
    finally:
        sys.argv = old_argv
        sys.stdin = old_stdin
        sys.stdout = old_stdout

    ns["stdout_output"] = captured.getvalue()

    results = []
    for snippet in test_snippets:
        try:
            exec(snippet, ns)
            results.append({"passed": True})
        except AssertionError as e:
            results.append({"passed": False, "error": str(e)})
        except Exception as e:
            results.append({"passed": False, "error": type(e).__name__ + ": " + str(e)})

    return {"ok": True, "stage": "tests", "traceback": None, "results": results}
`;

async function handleRun(id, code, pyTests, argv, stdinData, packages) {
  const pyodide = await getPyodide();
  await ensurePackages(pyodide, packages);

  if (!pyodide.globals.get('__pydrop_run')) {
    pyodide.runPython(RUNNER_SRC);
  }

  const runFn = pyodide.globals.get('__pydrop_run');
  const testSnippets = pyTests.map(function (t) { return t.code; });
  const testSnippetsPy = pyodide.toPy(testSnippets);
  const argvPy = pyodide.toPy(argv || []);

  let raw;
  try {
    raw = runFn(code, testSnippetsPy, argvPy, stdinData || '');
  } finally {
    runFn.destroy();
    testSnippetsPy.destroy();
    argvPy.destroy();
  }

  const outcome = raw.toJs({ dict_converter: Object.fromEntries });
  raw.destroy();

  if (!outcome.ok) {
    postMessage({
      id: id,
      type: 'runtime-error',
      traceback: outcome.traceback
    });
    return;
  }

  const results = outcome.results.map(function (r, i) {
    return {
      passed: !!r.passed,
      message: r.passed ? null : (pyTests[i].message || r.error)
    };
  });

  postMessage({ id: id, type: 'result', results: results });
}

self.onmessage = function (e) {
  const msg = e.data;
  if (msg.type !== 'run') return;

  handleRun(msg.id, msg.code, msg.pyTests, msg.argv, msg.stdin, msg.packages).catch(function (err) {
    postMessage({
      id: msg.id,
      type: 'worker-error',
      message: err && err.message ? err.message : String(err)
    });
  });
};
