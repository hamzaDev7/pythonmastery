/* ============================================================
   learn.js — curriculum renderer: accordion, search, filters,
   completion tracking (localStorage), progress bar
   ============================================================ */
(function () {
  "use strict";

  const KEY = "pymastery.lessons";
  const listEl = document.getElementById("lesson-list");
  const searchEl = document.getElementById("lesson-search");
  const pills = document.getElementById("level-pills");
  const fillEl = document.getElementById("progress-fill");
  const labelEl = document.getElementById("progress-label");

  let level = "all";
  let query = "";
  let done = load();

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (_) { return {}; }
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(done)); }

  /* group lessons by their track, keeping original lesson order */
  function groupByTrack(items) {
    const map = new Map();
    items.forEach((l) => {
      if (!map.has(l.track)) map.set(l.track, []);
      map.get(l.track).push(l);
    });
    return map;
  }

  function matches(l) {
    if (level !== "all" && l.level !== level) return false;
    if (!query) return true;
    const hay = (l.title + " " + l.summary + " " + l.track + " " +
      l.level + " " + l.keypoints.join(" ") + " " + l.code).toLowerCase();
    return query.split(/\s+/).every((w) => hay.includes(w));
  }

  function codeBlock(title, src) {
    return `<div class="code-wrap">
      <div class="code-head">
        <span class="code-title">${title}</span>
        <span class="actions"><button class="copy-btn">Copy</button></span>
      </div>
      <pre><code data-py>${window.escapeHtml(src)}</code></pre>
    </div>`;
  }

  function lessonHTML(l, idx) {
    const isDone = !!done[l.id];
    return `<article class="lesson ${isDone ? "has-done" : ""}" id="${l.id}" data-level="${l.level}">
      <button class="lesson-head" aria-expanded="false">
        <span class="lesson-num">${String(idx).padStart(2, "0")}</span>
        <span class="lesson-meta">
          <h3>${l.title}</h3>
          <span class="sub">
            <span class="chip ${l.level}">${l.level}</span>
            <span class="sub-i" data-icon="clock">${l.duration}</span>
            <span class="sub-i" data-icon="folder">${l.track}</span>
          </span>
        </span>
        <span class="check-btn ${isDone ? "done" : ""}" data-check title="Mark as complete" data-icon="check"></span>
        <span class="lesson-toggle" data-icon="chevron-down"></span>
      </button>
      <div class="lesson-body">
        <div class="lesson-body-inner">
          <p>${l.summary}</p>
          ${l.body ? `<p>${l.body}</p>` : ""}
          <div class="h4">Key points</div>
          <ul class="keypoints">${l.keypoints.map((k) => `<li>${k}</li>`).join("")}</ul>
          <div class="h4">Example</div>
          ${codeBlock(l.title + ".py", l.code)}
          <div class="output"><span class="label">Output</span>${window.escapeHtml(l.output)}</div>
        </div>
      </div>
    </article>`;
  }

  function render() {
    const visible = LESSONS.filter(matches);
    if (!visible.length) {
      listEl.innerHTML = `<div class="card" style="text-align:center;padding:50px">
        <div class="icon" style="margin:0 auto 14px"><span data-icon="search"></span></div>
        <h3>No lessons match “${window.escapeHtml(query)}”</h3>
        <p>Try another keyword or switch the level filter back to <b>All levels</b>.</p>
      </div>`;
      window.renderIcons(listEl);
      return;
    }
    const groups = groupByTrack(visible);
    let counter = 0;
    let html = "";
    groups.forEach((items, track) => {
      const meta = TRACKS.find((t) => t.name === track);
      html += `<div class="section-head reveal" style="margin:44px 0 22px;text-align:left">
        <div class="kicker">Track · ${items.length} lesson${items.length > 1 ? "s" : ""}</div>
        <h2 style="font-size:1.45rem;margin-bottom:6px">${track}</h2>
        <p style="margin:0">${meta ? meta.desc : ""}</p>
      </div>`;
      items.forEach((l) => { counter++; html += lessonHTML(l, counter); });
    });
    listEl.innerHTML = html;
    window.renderIcons(listEl);
    listEl.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    updateProgress();
  }

  /* ---------- accordion ---------- */
  listEl.addEventListener("click", (e) => {
    const check = e.target.closest("[data-check]");
    const head = e.target.closest(".lesson-head");
    if (check) {
      e.stopPropagation();
      const lesson = check.closest(".lesson");
      const id = lesson.id;
      if (done[id]) delete done[id]; else done[id] = true;
      save();
      check.classList.toggle("done", !!done[id]);
      updateProgress();
      window.toast(done[id] ? "Lesson marked complete" : "Lesson unmarked");
      return;
    }
    if (!head) return;
    const lesson = head.parentElement;
    const body = lesson.querySelector(".lesson-body");
    const open = lesson.classList.toggle("open");
    head.setAttribute("aria-expanded", open);
    body.style.maxHeight = open ? body.scrollHeight + "px" : "0px";
  });

  /* keep open bodies sized correctly when fonts/images settle */
  window.addEventListener("resize", () => {
    listEl.querySelectorAll(".lesson.open .lesson-body").forEach((b) => {
      b.style.maxHeight = b.scrollHeight + "px";
    });
  });

  /* ---------- filters ---------- */
  pills.addEventListener("click", (e) => {
    const btn = e.target.closest(".pill");
    if (!btn) return;
    pills.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    level = btn.dataset.level;
    render();
  });

  let t;
  searchEl.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => { query = searchEl.value.trim().toLowerCase(); render(); }, 140);
  });

  /* ---------- progress ---------- */
  function updateProgress() {
    const total = LESSONS.length;
    const count = Object.keys(done).filter((k) => LESSONS.some((l) => l.id === k)).length;
    labelEl.textContent = `${count} / ${total} lessons`;
    fillEl.style.width = (total ? (count / total) * 100 : 0) + "%";
    if (count === total && total > 0) {
      window.toast("Curriculum complete — you have covered every lesson.");
    }
  }

  document.getElementById("reset-progress").addEventListener("click", () => {
    if (!Object.keys(done).length) return window.toast("Nothing to reset");
    done = {}; save(); render();
    window.toast("Progress cleared");
  });

  /* ---------- deep link from ?level= or #id ---------- */
  const params = new URLSearchParams(location.search);
  if (params.get("level")) {
    level = params.get("level");
    pills.querySelectorAll(".pill").forEach((p) =>
      p.classList.toggle("active", p.dataset.level === level));
  }
  render();

  /* open a lesson when linked with #id (e.g. from home page) */
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target && target.classList.contains("lesson")) {
      target.classList.add("open");
      const body = target.querySelector(".lesson-body");
      body.style.maxHeight = body.scrollHeight + "px";
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
    }
  }
})();
