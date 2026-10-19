/* ============================================================
   playground.js — Pyodide (CPython → WASM) runner
   loads runtime, runs user code, streams stdout/stderr,
   snippet library, keyboard shortcuts, session hand-off
   ============================================================ */
(function () {
  "use strict";

  const PYODIDE_VERSION = "0.26.4";
  const editor = document.getElementById("play-editor");
  const out = document.getElementById("play-output");
  const status = document.getElementById("runtime-status");
  const runBtn = document.getElementById("btn-run");
  const execTime = document.getElementById("exec-time");
  const DEFAULT_CODE = editor.value;

  let pyodide = null;
  let ready = false;
  let running = false;

  /* ---------- snippet library ---------- */
  const SNIPPETS = [
    { label: "basics", code: `# Variables, f-strings and types\nname = "Ada"\nage = 36\nprint(f"{name} is {age} years old")\nprint(type(3.14).__name__, type(True).__name__)\nprint("sum:", sum(range(1, 101)))\n` },
    { label: "loops", code: `# Loops, comprehensions, zip & enumerate\nfor i in range(1, 6):\n    print(i, end=" ")\nprint()\n\nevens = [n for n in range(20) if n % 2 == 0]\nprint("evens:", evens)\n\ntable = {f"{n}x{m}": n * m for n in range(1, 4) for m in range(1, 4)}\nprint(table)\n` },
    { label: "functions", code: `# Args, kwargs, lambda, closures\ndef calc(*nums, op="+"):\n    ops = {"+": sum, "-": lambda xs: -sum(-x for x in xs)}\n    return ops.get(op, sum)(nums)\n\nprint(calc(1, 2, 3, 4))\nprint(calc(10, 4, 2, op="-"))\n\ndef counter():\n    n = 0\n    def inc():\n        nonlocal n\n        n += 1\n        return n\n    return inc\n\nc = counter()\nprint([c() for _ in range(5)])\n` },
    { label: "classes", code: `# OOP: classes, properties, dunder methods\nclass Bank:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self._balance = balance\n\n    @property\n    def balance(self):\n        return self._balance\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("amount must be positive")\n        self._balance += amount\n        return self._balance\n\n    def __repr__(self):\n        return f"Bank({self.owner!r}, {self._balance})"\n\nb = Bank("Zara", 100)\nb.deposit(50)\nprint(b, "| balance:", b.balance)\n` },
    { label: "decorators", code: `# A real decorator: timing + retry\nimport time, random\nfrom functools import wraps\n\ndef retry(times=3):\n    def deco(fn):\n        @wraps(fn)\n        def wrapper(*a, **k):\n            for attempt in range(1, times + 1):\n                try:\n                    return fn(*a, **k)\n                except Exception as e:\n                    print(f"  attempt {attempt} failed: {e}")\n            raise RuntimeError("all attempts failed")\n        return wrapper\n    return deco\n\n@retry(3)\ndef flaky():\n    if random.random() < 0.7:\n        raise IOError("network glitch")\n    return "success"\n\nprint(flaky())\n` },
    { label: "generators", code: `# Generators: lazy pipelines over big ranges\ndef fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\ndef take(it, n):\n    return [next(it) for _ in range(n)]\n\ndef evens(it):\n    while True:\n        v = next(it)\n        if v % 2 == 0:\n            yield v\n\nfib = fibonacci()\nprint("first 10 :", take(fib, 10))\nprint("memory   : O(1) — never materialises the sequence")\n\nprint("sum of squares 0..999999 =", sum(n * n for n in range(1_000_000)))\n` },
    { label: "json & re", code: `# JSON parsing + regex extraction\nimport json, re\n\nraw = '''{\n  "users": [\n    {"name": "Ali",  "email": "ali@mail.com",  "age": 30},\n    {"name": "Noor", "email": "noor@mail.com", "age": 25}\n  ]\n}'''\n\ndata = json.loads(raw)\nfor u in data["users"]:\n    print(f'{u["name"]:<6} {u["age"]}  {u["email"]}')\n\ntext = "Order A-1002 on 2026-10-19, order B-77 on 2026-10-20"\nprint("Orders :", re.findall(r"[A-Z]-\\d+", text))\nprint("Dates  :", re.findall(r"\\d{4}-\\d{2}-\\d{2}", text))\n` },
    { label: "collections", code: `# Counter, defaultdict, deque, namedtuple\nfrom collections import Counter, defaultdict, deque, namedtuple\n\ntext = "the cat sat on the mat the cat and the bat"\nprint("top words:", Counter(text.split()).most_common(3))\n\nby_len = defaultdict(list)\nfor w in text.split():\n    by_len[len(w)].append(w)\nprint("by length:", {k: len(v) for k, v in sorted(by_len.items())})\n\nwindow = deque(maxlen=4)\nfor n in range(10):\n    window.append(n)\nprint("sliding window:", list(window))\n\nPoint = namedtuple("Point", "x y")\np = Point(3, 4)\nprint(f"distance = {(p.x**2 + p.y**2) ** 0.5}")\n` },
    { label: "datetime", code: `# Dates, deltas and formatting\nfrom datetime import datetime, timedelta, date\n\nnow = datetime.now()\nprint("now        :", now.strftime("%Y-%m-%d %H:%M:%S"))\nprint("weekday    :", now.strftime("%A"))\nprint("+7 days    :", (now + timedelta(days=7)).date())\nprint("ISO format :", now.isoformat(timespec="seconds"))\n\nbirthday = date(2000, 1, 1)\nage_days = (date.today() - birthday).days\nprint("days alive :", age_days, "≈", round(age_days / 365.25, 1), "years")\n` },
    { label: "sorting", code: `# Sorting, key functions, groupby tricks\nstudents = [\n    {"name": "Sara",  "score": 82, "city": "Lahore"},\n    {"name": "Noor",  "score": 95, "city": "KHI"},\n    {"name": "Ali",   "score": 88, "city": "Lahore"},\n    {"name": "Omar",  "score": 76, "city": "KHI"},\n]\n\nbest = sorted(students, key=lambda s: s["score"], reverse=True)\nfor i, s in enumerate(best, 1):\n    print(f'{i}. {s["name"]:<6} {s["score"]}')\n\nby_city = {}\nfor s in students:\n    by_city.setdefault(s["city"], []).append(s["name"])\nprint("grouped:", by_city)\n\nwords = ["python", "is", "awesome", "code"]\nprint("shortest:", min(words, key=len), "| longest:", max(words, key=len))\n` },
    { label: "exceptions", code: `# try / except / else / finally + custom errors\nclass InsufficientFunds(Exception):\n    def __init__(self, balance, amount):\n        self.balance, self.amount = balance, amount\n        super().__init__(f"need {amount}, have {balance}")\n\ndef withdraw(balance, amount):\n    try:\n        if amount > balance:\n            raise InsufficientFunds(balance, amount)\n        result = balance - amount\n    except InsufficientFunds as e:\n        print("caught:", e)\n        return balance\n    else:\n        print("no exception — transaction ok")\n        return result\n    finally:\n        print("finally: audit log written")\n\nprint(withdraw(100, 30))\nprint(withdraw(100, 500))\n` },
    { label: "stats", code: `# statistics module mini-analysis\nimport statistics as st, random\nfrom collections import Counter\n\nrandom.seed(7)\nscores = [random.randint(55, 100) for _ in range(40)]\n\nprint("n      :", len(scores))\nprint("mean   :", round(st.mean(scores), 2))\nprint("median :", st.median(scores))\nprint("stdev  :", round(st.stdev(scores), 2))\nprint("Q1/Q3  :", st.quantiles(scores, n=4)[0], "/", st.quantiles(scores, n=4)[2])\n\nworst = min(scores)\nz = (worst - st.mean(scores)) / st.stdev(scores)\nprint("min    :", worst, f"(z = {z:.2f})")\n\nhist = Counter(scores)\nprint("passed >= 60 :", sum(1 for s in scores if s >= 60), "/", len(scores))\n` }
  ];

  const snippetsBar = document.getElementById("snippets");
  SNIPPETS.forEach((s) => {
    const b = document.createElement("button");
    b.className = "snippet";
    b.textContent = s.label;
    b.addEventListener("click", () => {
      editor.value = s.code;
      editor.focus();
      toast(`Loaded “${s.label}” snippet — press Run`);
    });
    snippetsBar.appendChild(b);
  });

  /* ---------- output helpers ---------- */
  function write(text, cls) {
    if (out.querySelector(".sys")) out.innerHTML = "";
    const span = document.createElement("span");
    if (cls) span.className = cls;
    span.textContent = text;
    out.appendChild(span);
    out.scrollTop = out.scrollHeight;
  }
  function clearOut() {
    out.innerHTML = '<span class="sys">Output cleared — press Run when ready.</span>';
    execTime.textContent = "";
  }

  /* ---------- load runtime ---------- */
  async function ensureRuntime() {
    if (ready) return pyodide;
    status.innerHTML = '<span class="loading-ring" style="border-color:rgba(181,71,8,.35);border-top-color:var(--warm)"></span> loading Python…';
    if (typeof loadPyodide !== "function") {
      status.textContent = "Runtime unavailable (offline?)";
      throw new Error("Pyodide failed to load — check your internet connection.");
    }
    pyodide = await loadPyodide({
      indexURL: `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`,
    });
    pyodide.setStdout({ batched: (s) => write(s + "\n") });
    pyodide.setStderr({ batched: (s) => write(s + "\n", "err") });
    ready = true;
    const v = pyodide.runPython("import sys; sys.version.split()[0]");
    status.className = "chip beginner";
    status.textContent = `Python ${v} · ready`;
    return pyodide;
  }

  /* ---------- run ---------- */
  async function run() {
    if (running) return;
    running = true;
    const oldBtn = runBtn.innerHTML;
    runBtn.disabled = true;
    runBtn.innerHTML = '<span class="loading-ring"></span> Running…';
    execTime.textContent = "";
    if (out.querySelector(".sys")) out.innerHTML = "";
    const code = editor.value;
    const t0 = performance.now();
    try {
      const py = await ensureRuntime();
      await py.runPythonAsync(code);
      const ms = performance.now() - t0;
      execTime.innerHTML = `<span style="color:var(--good)">✓ ok</span> · ${ms.toFixed(0)} ms`;
    } catch (err) {
      const msg = String(err && err.message ? err.message : err);
      write(msg + "\n", "err");
      execTime.innerHTML = `<span style="color:var(--bad)">✗ error</span>`;
    } finally {
      running = false;
      runBtn.disabled = false;
      runBtn.innerHTML = oldBtn;
    }
  }

  runBtn.addEventListener("click", run);
  document.getElementById("btn-clear").addEventListener("click", clearOut);
  document.getElementById("btn-reset").addEventListener("click", () => {
    editor.value = DEFAULT_CODE;
    clearOut();
    toast("Editor reset to the starter code");
  });

  /* Ctrl/Cmd + Enter runs; Tab inserts 4 spaces */
  editor.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); run(); }
    if (e.key === "Tab") {
      e.preventDefault();
      const s = editor.selectionStart, en = editor.selectionEnd;
      editor.value = editor.value.slice(0, s) + "    " + editor.value.slice(en);
      editor.selectionStart = editor.selectionEnd = s + 4;
    }
  });

  /* code handed over from a module page */
  const handed = sessionStorage.getItem("playground.code");
  if (handed) {
    editor.value = handed;
    sessionStorage.removeItem("playground.code");
    toast("Module example loaded — press Run");
  }

  /* kick off runtime load in the background */
  ensureRuntime().catch((e) => {
    status.className = "chip hard";
    status.textContent = "Runtime failed to load";
    write("Could not load the Python runtime.\n" + e.message +
      "\n\n→ Check your internet connection and refresh the page.", "err");
  });
})();
