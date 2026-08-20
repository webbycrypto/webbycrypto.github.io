/**
 * pyrunner.js -- Main-thread wrapper around the Pyodide worker.
 * Lazily creates the worker, races each run against a timeout, and
 * recovers from hangs by discarding and recreating the worker (the only
 * option available without SharedArrayBuffer/COOP+COEP for interruption).
 */

const PyRunner = (function () {

  const RUN_TIMEOUT_MS = 5000;
  const LOAD_TIMEOUT_MS = 25000; // first call also pays for parsing the wasm runtime

  let _worker = null;
  let _nextId = 1;
  let _pending = new Map();
  let _loading = false;
  let _loaded = false;
  let _onLoadingStateChange = null;

  function onLoadingStateChange(fn) {
    _onLoadingStateChange = fn;
  }

  function _notifyLoading(isLoading) {
    _loading = isLoading;
    if (_onLoadingStateChange) _onLoadingStateChange(isLoading);
  }

  function _createWorker() {
    const worker = new Worker('scripts/pyworker.js', { type: 'module' });
    worker.onmessage = function (e) {
      const msg = e.data;
      const entry = _pending.get(msg.id);
      if (!entry) return;
      _pending.delete(msg.id);
      clearTimeout(entry.timer);
      entry.resolve(msg);
    };
    worker.onerror = function (e) {
      // Fatal worker-level error (e.g. failed to load the runtime).
      _pending.forEach(function (entry) {
        clearTimeout(entry.timer);
        entry.resolve({ type: 'worker-error', message: e.message || 'Worker failed to load.' });
      });
      _pending.clear();
      _discardWorker();
    };
    return worker;
  }

  function _discardWorker() {
    if (_worker) {
      _worker.terminate();
      _worker = null;
    }
    _loaded = false;
  }

  function _ensureWorker() {
    if (!_worker) {
      _worker = _createWorker();
    }
    return _worker;
  }

  /**
   * Execute student code against a list of { code, message } pyTests.
   * options may include { argv: string[], stdin: string } to preset
   * sys.argv and feed input() for CLI-style challenges, and
   * { packages: string[] } to load opt-in packages (e.g. 'openpyxl')
   * beyond the standard library before running the code.
   * Resolves with one of:
   *   { type: 'result', results: [{ passed, message }] }
   *   { type: 'runtime-error', traceback }
   *   { type: 'timed-out' }
   *   { type: 'worker-error', message }
   */
  function execute(code, pyTests, options) {
    options = options || {};
    if (location.protocol === 'file:') {
      return Promise.resolve({
        type: 'worker-error',
        message: 'This page was opened directly from disk (file://). Browsers block the ' +
          'Python runtime from loading under file://. Serve the site over http:// or ' +
          'https:// instead -- e.g. run "python -m http.server" in this folder and open ' +
          'http://localhost:8000.'
      });
    }

    const hasPackages = options.packages && options.packages.length;
    const needsLoad = !_loaded || hasPackages;
    if (needsLoad) _notifyLoading(true);

    const worker = _ensureWorker();
    const id = _nextId++;
    const timeoutMs = needsLoad ? LOAD_TIMEOUT_MS : RUN_TIMEOUT_MS;

    return new Promise(function (resolve) {
      const timer = setTimeout(function () {
        _pending.delete(id);
        _discardWorker();
        _notifyLoading(false);
        resolve({ type: 'timed-out' });
      }, timeoutMs);

      _pending.set(id, {
        timer: timer,
        resolve: function (msg) {
          _loaded = true;
          _notifyLoading(false);
          resolve(msg);
        }
      });

      worker.postMessage({
        id: id,
        type: 'run',
        code: code,
        pyTests: pyTests,
        argv: options.argv || [],
        stdin: options.stdin || '',
        packages: options.packages || []
      });
    });
  }

  function warm() {
    if (_worker || _loading) return;
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(function () { execute('pass', []); });
    }
  }

  return { execute, warm, onLoadingStateChange };

})();
