/* ============================================================
   PyMastery — shared UI engine
   icon sprite, nav, scroll progress, reveal, counters, typing,
   copy buttons, toasts, FAQ accordion, Python highlighter
   ============================================================ */
(function () {
  "use strict";

  /* ---------- html escape helper (used everywhere) ---------- */
  window.escapeHtml = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  /* ---------- SVG icon sprite (injected once) ---------- */
  const SPRITE = `
<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
<symbol id="i-book" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></symbol>
<symbol id="i-layers" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></symbol>
<symbol id="i-lightbulb" viewBox="0 0 24 24"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1h6c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/></symbol>
<symbol id="i-terminal" viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></symbol>
<symbol id="i-settings" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></symbol>
<symbol id="i-trending" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></symbol>
<symbol id="i-arrow-right" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></symbol>
<symbol id="i-arrow-down" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="5 12 12 19 19 12"/></symbol>
<symbol id="i-play" viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3"/></symbol>
<symbol id="i-rocket" viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9s-2.1-.8-2.9-.1z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></symbol>
<symbol id="i-download" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></symbol>
<symbol id="i-check-circle" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></symbol>
<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></symbol>
<symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></symbol>
<symbol id="i-alert" viewBox="0 0 24 24"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></symbol>
<symbol id="i-x" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></symbol>
<symbol id="i-calculator" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></symbol>
<symbol id="i-folder" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></symbol>
<symbol id="i-file" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></symbol>
<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></symbol>
<symbol id="i-activity" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></symbol>
<symbol id="i-chart" viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></symbol>
<symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></symbol>
<symbol id="i-cpu" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></symbol>
<symbol id="i-monitor" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></symbol>
<symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></symbol>
<symbol id="i-command" viewBox="0 0 24 24"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 0 0 0-6z"/></symbol>
<symbol id="i-github" viewBox="0 0 24 24"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></symbol>
<symbol id="i-branch" viewBox="0 0 24 24"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></symbol>
<symbol id="i-cloud" viewBox="0 0 24 24"><path d="M12 13v8"/><polyline points="8 17 12 21 16 17"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/></symbol>
<symbol id="i-package" viewBox="0 0 24 24"><line x1="16.5" y1="9.4" x2="7.55" y2="4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></symbol>
<symbol id="i-refresh" viewBox="0 0 24 24"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></symbol>
<symbol id="i-unlock" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></symbol>
<symbol id="i-zap" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></symbol>
<symbol id="i-list" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></symbol>
<symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></symbol>
<symbol id="i-key" viewBox="0 0 24 24"><path d="M21 2l-2 2"/><path d="M11.39 11.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3"/></symbol>
<symbol id="i-edit" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></symbol>
<symbol id="i-copy" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></symbol>
<symbol id="i-chevron-down" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></symbol>
<symbol id="i-external" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></symbol>
<symbol id="i-code" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></symbol>
<symbol id="i-clipboard" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></symbol>
<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></symbol>
<symbol id="i-users" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
</svg>`;

  document.body.insertAdjacentHTML("afterbegin", SPRITE);

  function renderIcons(root) {
    (root || document).querySelectorAll("[data-icon]").forEach((el) => {
      if (el.dataset.iconDone) return;
      const size = el.dataset.iconSize ? " " + el.dataset.iconSize : "";
      el.insertAdjacentHTML(
        "afterbegin",
        `<svg class="ico${size}" aria-hidden="true" focusable="false"><use href="#i-${el.dataset.icon}"/></svg>`
      );
      el.dataset.iconDone = "1";
    });
  }
  window.renderIcons = renderIcons;
  renderIcons(document);

  /* ---------- category → icon map for module cards ---------- */
  const CAT_ICONS = {
    "Core & Math": "calculator",
    "System": "folder",
    "Data Formats": "file",
    "Text & Pattern": "search",
    "Security & Identity": "shield",
    "Concurrency": "zap",
    "Quality & Debug": "activity",
    "Data Science": "chart",
    "Web & Network": "globe",
    "Advanced": "cpu",
    "Desktop & GUI": "monitor",
  };
  window.iconForCategory = (cat) => CAT_ICONS[cat] || "package";

  /* ---------- scroll progress + navbar + to-top ---------- */
  const progress = document.getElementById("scroll-progress");
  const navbar = document.querySelector(".navbar");
  const toTop = document.getElementById("to-top");

  function onScroll() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (progress) progress.style.width = pct + "%";
    if (navbar) navbar.classList.toggle("scrolled", h.scrollTop > 24);
    if (toTop) toTop.classList.toggle("show", h.scrollTop > 500);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- mobile menu ---------- */
  const burger = document.querySelector(".hamburger");
  const links = document.querySelector(".nav-links");
  if (burger && links) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      links.classList.toggle("open");
    });
    links.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        burger.classList.remove("open");
        links.classList.remove("open");
      }
    });
  }

  /* ---------- active nav link ---------- */
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    if (a.getAttribute("href") === here) a.classList.add("active");
  });

  /* ---------- reveal on scroll ---------- */
  function bindReveal(scope) {
    const els = (scope || document).querySelectorAll(".reveal:not(.visible)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    els.forEach((el) => io.observe(el));
  }
  window.bindReveal = bindReveal;
  bindReveal(document);

  /* ---------- animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const t0 = performance.now();
        (function tick(now) {
          const p = Math.min((now - t0) / 1300, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent = (target % 1 ? val.toFixed(1) : Math.round(val)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
        cio.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => cio.observe(c));
  }

  /* ---------- hero typing effect ---------- */
  const typeEl = document.querySelector("[data-typing]");
  if (typeEl) {
    const words = (typeEl.dataset.typing || "").split("|").filter(Boolean);
    let w = 0, i = 0, deleting = false;
    (function type() {
      const word = words[w] || "";
      i = deleting ? i - 1 : i + 1;
      typeEl.innerHTML = window.escapeHtml(word.slice(0, i)) + '<span class="caret"></span>';
      let delay = deleting ? 42 : 88;
      if (!deleting && i === word.length) { delay = 2100; deleting = true; }
      else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 320; }
      setTimeout(type, delay);
    })();
  }

  /* ---------- copy code buttons ---------- */
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".copy-btn");
    if (!btn) return;
    const wrap = btn.closest(".code-wrap, .cmd");
    const code = wrap ? wrap.querySelector("code") : null;
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code.innerText);
      const old = btn.textContent;
      btn.textContent = "✓ Copied";
      setTimeout(() => (btn.textContent = old), 1500);
    } catch (_) {
      toast("Copy blocked — select the text manually", "!");
    }
  });

  /* ---------- toast ---------- */
  let toastTimer;
  window.toast = function (msg, icon) {
    let t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      document.body.appendChild(t);
    }
    t.innerHTML = (icon ? `<span>${icon}</span>` : "") + `<span>${msg}</span>`;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  };

  /* ---------- FAQ accordion ---------- */
  document.addEventListener("click", (e) => {
    const q = e.target.closest(".faq-q");
    if (!q) return;
    const item = q.parentElement;
    const ans = item.querySelector(".faq-a");
    const open = item.classList.toggle("open");
    ans.style.maxHeight = open ? ans.scrollHeight + "px" : "0px";
  });

  /* ---------- Python syntax highlighter (tokenizer) ---------- */
  window.highlightPython = function (src) {
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const KW = new Set(["def","class","return","if","elif","else","for","while","in","not","and","or",
      "import","from","as","with","try","except","finally","raise","lambda","yield","pass",
      "break","continue","global","nonlocal","assert","del","is","async","await","match","case"]);
    const BI = new Set(["print","len","range","type","int","float","str","bool","list","dict","set",
      "tuple","input","open","sum","min","max","abs","sorted","enumerate","zip","map","filter",
      "round","isinstance","super","property","staticmethod","classmethod","None","True","False",
      "self","any","all","repr","hash","bytes","object","vars","getattr","setattr","iter","next"]);
    const RE = /("""[\s\S]*?"""|'''[\s\S]*?'''|[fFrRbBuU]{0,2}"(?:\\.|[^"\\\n])*"|[fFrRbBuU]{0,2}'(?:\\.|[^'\\\n])*'|#[^\n]*|\b\d+\.?\d*\b|[A-Za-z_]\w*|\s+|.)/g;
    let out = "", m, prev = "";
    while ((m = RE.exec(src)) !== null) {
      const t = m[0];
      let cls = "";
      if (t.startsWith("#")) cls = "c";
      else if (/^(?:[fFrRbBuU]{0,2})(?:"|')/.test(t)) cls = "s";
      else if (/^\d/.test(t)) cls = "n";
      else if (/^[A-Za-z_]/.test(t)) {
        if (KW.has(t)) cls = "k";
        else if (BI.has(t)) cls = "b";
        else if (prev === "@") cls = "d";
      }
      if (!/^\s+$/.test(t) && t.length) prev = t[0];
      out += cls ? `<span class="${cls}">${esc(t)}</span>` : esc(t);
    }
    return out;
  };

  document.querySelectorAll("code[data-py]").forEach((el) => {
    el.innerHTML = window.highlightPython(el.textContent);
  });
})();
