/* ============================================================
   E2E test — drives the real site in headless Chrome via CDP:
   opens lessons, toggles progress, filters, opens the module
   modal, reveals hint/solution, runs a challenge against the
   live Pyodide runtime, and runs the playground.
   ============================================================ */
const { spawn } = require("child_process");
const http = require("http");
const path = require("path");

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;
const BASE = "http://127.0.0.1:8099";
const PROFILE = path.join(process.env.TEMP || ".", "pymastery-cdp-profile-" + Date.now());

let ws, msgId = 0;
const pending = new Map();
const results = [];
let failed = 0;

function log(name, ok, extra = "") {
  results.push(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? "  — " + extra : ""}`);
  if (!ok) failed++;
}

function httpReq(url, method = "GET") {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = http.request(
      { hostname: u.hostname, port: u.port, path: u.pathname + u.search, method },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try { resolve(JSON.parse(data)); } catch (_) { resolve(data); }
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

function send(method, params = {}) {
  const id = ++msgId;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    setTimeout(() => {
      if (pending.has(id)) { pending.delete(id); reject(new Error("timeout: " + method)); }
    }, 120000);
  });
}

async function evalJs(expression, awaitPromise = false) {
  const res = await send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
  });
  if (res.exceptionDetails) {
    throw new Error("page error: " + JSON.stringify(res.exceptionDetails.exception || res.exceptionDetails.text));
  }
  return res.result && res.result.value;
}

/* poll an expression until truthy */
async function waitFor(expression, timeoutMs = 30000, poll = 300) {
  const t0 = Date.now();
  for (;;) {
    let v;
    try { v = await evalJs(expression, true); } catch (_) { v = null; }
    if (v) return v;
    if (Date.now() - t0 > timeoutMs) return null;
    await new Promise((r) => setTimeout(r, poll));
  }
}

async function openPage(url) {
  const target = await httpReq(`${BASE_JSON()}/json/new?${encodeURIComponent(url)}`, "PUT");
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = rej;
  });
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id).resolve(msg.result || {});
      pending.delete(msg.id);
    }
  };
  await send("Page.enable");
  await send("Runtime.enable");
}
function BASE_JSON() { return `http://127.0.0.1:${PORT}`; }

async function main() {
  const chrome = spawn(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    `--user-data-dir=${PROFILE}`,
    `--remote-debugging-port=${PORT}`,
    "--no-first-run",
    "--hide-scrollbars",
  ], { stdio: "ignore" });

  try {
    // wait for devtools
    for (let i = 0; i < 40; i++) {
      try { await httpReq(`${BASE_JSON()}/json/version`); break; }
      catch (_) { await new Promise((r) => setTimeout(r, 400)); }
    }

    /* ---------- 1. LEARN page ---------- */
    await openPage(`${BASE}/learn.html`);
    const lessonCount = await waitFor("document.querySelectorAll('.lesson-head').length", 20000);
    log("learn: 38 lessons render", lessonCount === 38, "got " + lessonCount);

    await evalJs("document.querySelector('.lesson-head').click()");
    const opened = await waitFor("!!document.querySelector('.lesson.open')", 5000);
    log("learn: accordion opens", !!opened);

    const bodyH = await evalJs("document.querySelector('.lesson.open .lesson-body').style.maxHeight");
    log("learn: opened body has height", !!bodyH && bodyH !== "0px", bodyH);

    await evalJs("document.querySelector('.lesson [data-check]').click()");
    const prog = await evalJs("document.getElementById('progress-label').textContent");
    log("learn: marking complete updates progress", /1 \/ 38/.test(prog), prog);

    const stored = await evalJs("Object.keys(JSON.parse(localStorage.getItem('pymastery.lessons')||'{}')).length");
    log("learn: progress persisted to localStorage", stored === 1, "entries=" + stored);

    await evalJs(`(()=>{const i=document.getElementById('lesson-search');i.value='decorator';i.dispatchEvent(new Event('input'))})()`);
    await new Promise((r) => setTimeout(r, 500));
    const filtered = await evalJs("document.querySelectorAll('.lesson').length");
    log("learn: search filters lessons", filtered > 0 && filtered < 38, "matches=" + filtered);

    await evalJs(`(()=>{const i=document.getElementById('lesson-search');i.value='';i.dispatchEvent(new Event('input'))})()`);
    await new Promise((r) => setTimeout(r, 450));
    await evalJs("[...document.querySelectorAll('#level-pills .pill')].find(p=>p.dataset.level==='pro').click()");
    const proCount = await evalJs("document.querySelectorAll('.lesson').length");
    const proOk = proCount > 0 && [...Array(proCount)].length === proCount;
    const allPro = await evalJs("[...document.querySelectorAll('.lesson')].every(l=>l.dataset.level==='pro')");
    log("learn: level filter works", proOk && allPro, "pro lessons=" + proCount);

    /* ---------- 2. MODULES page ---------- */
    await openPage(`${BASE}/modules.html`);
    const modCount = await waitFor("document.querySelectorAll('.module-card').length", 20000);
    log("modules: 36 cards render", modCount === 36, "got " + modCount);

    await evalJs("document.querySelector('.module-card').click()");
    const modalOpen = await waitFor("document.getElementById('mod-modal').classList.contains('show')", 6000);
    log("modules: modal opens on click", !!modalOpen);

    const modalHasCode = await evalJs("!!document.querySelector('#modal-body code[data-py] .k, #modal-body code[data-py]')");
    const modalTitle = await evalJs("document.querySelector('#modal-body h2')?.textContent");
    log("modules: modal shows highlighted code", !!modalHasCode, "module=" + modalTitle);

    await evalJs("document.getElementById('modal-close').click()");
    const modalClosed = await evalJs("!document.getElementById('mod-modal').classList.contains('show')");
    log("modules: modal closes", modalClosed);

    /* ---------- 3. INDEX page ---------- */
    await openPage(`${BASE}/index.html`);
    const prev = await waitFor("document.querySelectorAll('#module-preview .module-card').length", 20000);
    log("index: module preview renders", prev === 9, "got " + prev);
    const pprev = await evalJs("document.querySelectorAll('#problem-preview .card').length");
    log("index: problem preview renders", pprev === 3, "got " + pprev);
    await new Promise((r) => setTimeout(r, 2500));
    const typed = await evalJs("document.querySelector('[data-typing]').textContent.length");
    log("index: typing animation is running", typed > 0, "chars=" + typed);

    /* ---------- 4. PRACTICE page (live Pyodide test run) ---------- */
    await openPage(`${BASE}/practice.html`);
    const probCount = await waitFor("document.querySelectorAll('.problem').length", 20000);
    log("practice: 20 challenges render", probCount === 20, "got " + probCount);

    const hintBtn = await waitFor("!!document.querySelector('[data-hint]')", 8000);
    await evalJs("document.querySelector('[data-hint]').click()");
    const hintOpen = await evalJs("!!document.querySelector('[data-hintbox].open')");
    log("practice: hint reveals on demand", hintOpen);

    await evalJs("document.querySelector('[data-solution]').click()");
    const solOpen = await evalJs("!!document.querySelector('[data-solutionbox].open')");
    log("practice: solution reveals on demand", solOpen);

    // wait for the runtime (downloads Pyodide from CDN)
    const chip = await waitFor(
      "document.getElementById('runtime-chip').textContent.includes('ready')", 90000, 1000);
    log("practice: Pyodide runtime ready", !!chip,
      await evalJs("document.getElementById('runtime-chip').textContent"));

    // load the reference solution into the editor and run the real tests
    await evalJs("document.querySelector('[data-fill]').click()");
    await evalJs("document.querySelector('[data-run]').click()");
    const badge = await waitFor(
      "document.querySelector('.verify-badge.pass') ? document.querySelector('.verify-badge.pass').textContent : null",
      90000, 800);
    log("practice: run tests → all pass (live Python)", !!badge, (badge || "no badge").trim().slice(0, 60));

    const solved = await evalJs("document.querySelector('.problem.solved') !== null");
    log("practice: solved state + progress recorded", solved);

    // a wrong answer must FAIL, not pass
    await evalJs(`(()=>{const p=document.getElementById('p02');
      p.querySelector('[data-editor]').value='def reverse_string(s):\\n    return s';})()`);
    await evalJs("document.getElementById('p02').querySelector('[data-run]').click()");
    const failBadge = await waitFor(
      "document.querySelector('#p02 .verify-badge.fail') ? 1 : null", 60000, 800);
    log("practice: wrong solution correctly fails tests", !!failBadge);

    /* ---------- 5. PLAYGROUND page ---------- */
    await openPage(`${BASE}/playground.html`);
    const ready = await waitFor(
      "document.getElementById('runtime-status').textContent.includes('ready')", 120000, 1000);
    log("playground: runtime reports ready", !!ready,
      await evalJs("document.getElementById('runtime-status').textContent"));

    await evalJs("document.getElementById('btn-run').click()");
    const out = await waitFor(
      "document.getElementById('play-output').textContent.includes('Hello, Developer') ? document.getElementById('play-output').textContent : null",
      90000, 700);
    log("playground: running code prints output", !!out,
      (out || "").replace(/\s+/g, " ").slice(0, 70));

    const meta = await evalJs("document.getElementById('exec-time').textContent");
    log("playground: execution time reported", /ms/.test(meta), meta);
  } catch (e) {
    log("harness error", false, e.message);
  } finally {
    try { ws && ws.close(); } catch (_) {}
    chrome.kill();
  }

  console.log("\n===== E2E RESULTS =====");
  results.forEach((r) => console.log(r));
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
}

main();
