/* ============================================================
   practice.js — challenges: live test runner (Pyodide),
   on-demand hints & solutions, solved-progress, filters
   ============================================================ */
(function () {
  "use strict";

  const PYODIDE_VERSION = "0.26.4";
  const KEY = "pymastery.solved";
  const listEl = document.getElementById("problem-list");
  const searchEl = document.getElementById("prob-search");
  const pills = document.getElementById("prob-pills");
  const fillEl = document.getElementById("solved-fill");
  const labelEl = document.getElementById("solved-label");
  const runtimeChip = document.getElementById("runtime-chip");

  let level = "all", query = "", solved = loadSolved();
  let pyodide = null, ready = false;

  function loadSolved() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (_) { return {}; } }
  function saveSolved() { localStorage.setItem(KEY, JSON.stringify(solved)); }

  /* ================= runtime ================= */
  async function ensureRuntime() {
    if (ready) return pyodide;
    if (typeof loadPyodide !== "function") throw new Error("runtime script not available (offline?)");
    pyodide = await loadPyodide({
      indexURL: `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`,
    });
    pyodide.setStdout({ batched: () => {} });   // swallow prints during tests
    pyodide.setStderr({ batched: () => {} });
    ready = true;
    const v = pyodide.runPython("import sys; sys.version.split()[0]");
    runtimeChip.className = "chip beginner";
    runtimeChip.textContent = `Python ${v} · ready`;
    return pyodide;
  }
  ensureRuntime().then(() => toast("Python runtime ready — good luck!"))
    .catch(() => {
      runtimeChip.className = "chip hard";
      runtimeChip.textContent = "Runtime failed (check connection)";
    });

  /* ================= rendering ================= */
  function matches(p) {
    if (level !== "all" && p.level !== level) return false;
    if (!query) return true;
    const hay = (p.title + " " + p.desc + " " + p.level + " " + p.topics.join(" ")).toLowerCase();
    return query.split(/\s+/).every((w) => hay.includes(w));
  }

  function problemHTML(p, idx) {
    const isSolved = !!solved[p.id];
    const examples = p.examples.map((ex) => `
      <div class="ex in"><span class="tag">Input</span><span class="val">${window.escapeHtml(ex.in)}</span></div>
      <div class="ex out"><span class="tag">Expected output</span><span class="val">${window.escapeHtml(ex.out)}</span></div>`).join("");

    return `<article class="problem ${isSolved ? "solved" : ""}" id="${p.id}" data-level="${p.level}">
      <div class="problem-head">
        <span class="p-num">${String(idx).padStart(2, "0")}</span>
        <div class="p-title">
          <h3>${p.title}${isSolved ? ' <span style="color:var(--good)">✓</span>' : ""}</h3>
          <div class="p-tags">
            <span class="chip ${p.level}">${LEVEL_INFO[p.level].label}</span>
            ${p.topics.map((t) => `<span class="chip topic">${t}</span>`).join("")}
            <span class="chip pro" style="font-size:.66rem">${p.tests.length} tests</span>
          </div>
        </div>
        <span class="verify-badge" data-badge></span>
      </div>

      <div class="problem-body">
        <p class="desc">${p.desc}</p>
        <div class="ex-rows"><div class="ex-row">${examples}</div></div>

        <div class="editor-grid">
          <div>
            <textarea class="editor" data-editor spellcheck="false">${window.escapeHtml(p.starter)}</textarea>
          </div>
          <div class="code-wrap" style="margin:0;display:flex;flex-direction:column">
            <div class="code-head">
              <span class="code-title">test results</span>
            </div>
            <div class="output" data-output style="flex:1;min-height:190px;max-height:300px;overflow:auto"><span class="label">Console</span>Run your code to verify against ${p.tests.length} hidden test${p.tests.length > 1 ? "s" : ""}.</div>
          </div>
        </div>

        <div class="run-bar">
          <button class="run-btn" data-run data-icon="play"><span>Run tests</span></button>
          <button class="sol-btn" data-hint data-icon="lightbulb"><span>Show hint</span></button>
          <button class="sol-btn" data-solution data-icon="unlock"><span data-label>Show solution</span></button>
        </div>

        <div class="hint-box" data-hintbox>
          <div class="hint-inner">
            <div class="h-title"><span data-icon="lightbulb"></span> Hint</div>
            ${p.hint}
          </div>
        </div>

        <div class="solution-box" data-solutionbox>
          <div class="h4" style="margin-top:18px">Reference solution</div>
          <div class="code-wrap" style="margin-top:8px">
            <div class="code-head">
              <span class="code-title">solution_${p.id}.py</span>
              <span class="actions"><button class="copy-btn">Copy</button></span>
            </div>
            <pre><code data-py>${window.escapeHtml(p.solution)}</code></pre>
          </div>
          <div class="run-bar">
            <button class="sol-btn" data-fill data-icon="download"><span>Load solution into editor</span></button>
            <button class="sol-btn hide-sol" data-hidesol data-icon="x"><span>Hide solution</span></button>
          </div>
        </div>
      </div>
    </article>`;
  }

  function render() {
    const items = PROBLEMS.filter(matches);
    if (!items.length) {
      listEl.innerHTML = `<div class="card" style="text-align:center;padding:50px">
        <div class="icon" style="margin:0 auto 14px"><span data-icon="search"></span></div>
        <h3>No challenges match</h3>
        <p>Clear the search box or switch back to <b>All levels</b>.</p>
      </div>`;
      window.renderIcons(listEl);
      return;
    }
    listEl.innerHTML = items.map((p, i) => problemHTML(p, i + 1)).join("");
    window.renderIcons(listEl);
    listEl.querySelectorAll("code[data-py]").forEach((el) => {
      el.innerHTML = window.highlightPython(el.textContent);
    });
    updateProgress();
  }

  /* ================= run / verify ================= */
  async function runProblem(card) {
    const p = PROBLEMS.find((x) => x.id === card.id);
    const editor = card.querySelector("[data-editor]");
    const out = card.querySelector("[data-output]");
    const btn = card.querySelector("[data-run]");
    const badge = card.querySelector("[data-badge]");

    const setResult = (ok, msg) => {
      badge.className = "verify-badge " + (ok ? "pass" : "fail");
      badge.innerHTML = (ok ? "✓ All tests passed" : "✗ Tests failed") +
        (msg ? ` <span style="opacity:.75">— ${msg}</span>` : "");
      out.classList.toggle("error", !ok);
    };

    out.classList.remove("error");
    out.innerHTML = '<span class="label">Console</span>';
    badge.className = "verify-badge";
    btn.disabled = true;
    const old = btn.innerHTML;
    btn.innerHTML = '<span class="loading-ring"></span> Running…';

    try {
      const py = await ensureRuntime();
      // stdout: capture prints for display (tests print nothing themselves)
      let captured = "";
      py.setStdout({ batched: (s) => { captured += s + "\n"; } });
      py.setStderr({ batched: () => {} });

      const script =
        editor.value + "\n\n# ---- PyMastery hidden tests ----\n" +
        p.tests.join("\n") +
        "\nprint('__ALL_TESTS_PASSED__')";

      const t0 = performance.now();
      let output = "";
      try {
        output = await py.runPythonAsync(script);
      } finally {
        py.setStdout({ batched: () => {} });   // back to silent
      }
      const ms = (performance.now() - t0).toFixed(0);

      if (captured.includes("__ALL_TESTS_PASSED__")) {
        setResult(true, `${p.tests.length}/${p.tests.length} · ${ms} ms`);
        out.innerHTML = '<span class="label">Console</span>' +
          window.escapeHtml(captured.replace("__ALL_TESTS_PASSED__", "").trim() || "no print() output") +
          (captured.trim() ? "\n" : "") +
          `<span style="color:var(--good);font-weight:700">✓ All ${p.tests.length} tests passed (${ms} ms)</span>`;
        if (!solved[p.id]) {
          solved[p.id] = true;
          saveSolved();
          card.classList.add("solved");
          updateProgress();
          toast("Challenge solved!");
        }
      } else {
        setResult(false, "no result marker");
        out.innerHTML = '<span class="label">Console</span>Unexpected execution result.';
      }
    } catch (err) {
      let msg = String(err && err.message ? err.message : err);
      setResult(false, (msg.split("\n").find((l) => l.includes("Error")) || "error").trim().slice(0, 70));
      out.classList.add("error");
      out.innerHTML = '<span class="label">Console — error</span>' + window.escapeHtml(msg);
    } finally {
      btn.disabled = false;
      btn.innerHTML = old;
    }
  }

  /* ================= delegated events ================= */
  listEl.addEventListener("click", (e) => {
    const card = e.target.closest(".problem");
    if (!card) return;

    if (e.target.closest("[data-run]")) return void runProblem(card);

    if (e.target.closest("[data-hint]")) {
      const box = card.querySelector("[data-hintbox]");
      const open = box.classList.toggle("open");
      box.style.maxHeight = open ? box.scrollHeight + "px" : "0px";
      if (open) toast("Hint revealed — try again before the solution");
      return;
    }

    if (e.target.closest("[data-solution]")) {
      const box = card.querySelector("[data-solutionbox]");
      const open = box.classList.toggle("open");
      box.style.maxHeight = open ? box.scrollHeight + "px" : "0px";
      const label = card.querySelector("[data-solution] [data-label]");
      if (label) label.textContent = open ? "Hide solution" : "Show solution";
      window.renderIcons(card);
      if (open) toast("Solution revealed — study it, then try a similar problem");
      return;
    }

    if (e.target.closest("[data-hidesol]")) {
      const box = card.querySelector("[data-solutionbox]");
      box.classList.remove("open");
      box.style.maxHeight = "0px";
      const label = card.querySelector("[data-solution] [data-label]");
      if (label) label.textContent = "Show solution";
      return;
    }

    if (e.target.closest("[data-fill]")) {
      const p = PROBLEMS.find((x) => x.id === card.id);
      const editor = card.querySelector("[data-editor]");
      editor.value = p.solution;
      editor.focus();
      toast("Solution loaded into the editor — press Run tests");
      card.querySelector("[data-badge]").className = "verify-badge";
      card.querySelector("[data-output]").classList.remove("error");
      card.querySelector("[data-output]").innerHTML =
        '<span class="label">Console</span>Solution loaded. Press <b>Run tests</b> to verify it.';
      return;
    }
  });

  /* ================= filters ================= */
  pills.addEventListener("click", (e) => {
    const btn = e.target.closest(".pill");
    if (!btn) return;
    pills.querySelectorAll(".pill").forEach((x) => x.classList.remove("active"));
    btn.classList.add("active");
    level = btn.dataset.level;
    render();
  });

  let t;
  searchEl.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => { query = searchEl.value.trim().toLowerCase(); render(); }, 130);
  });

  /* ================= progress ================= */
  function updateProgress() {
    const total = PROBLEMS.length;
    const count = Object.keys(solved).filter((k) => PROBLEMS.some((p) => p.id === k)).length;
    labelEl.textContent = `${count} / ${total} solved`;
    fillEl.style.width = (count / total) * 100 + "%";
  }

  /* ================= deep link ================= */
  render();
  if (location.hash) {
    const el = document.getElementById(location.hash.slice(1));
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 250);
  }
})();
