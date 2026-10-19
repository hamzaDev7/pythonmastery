/* ============================================================
   modules.js — module library grid, filters, detail modal,
   deep-linking (?mod=name / ?cat=Category)
   ============================================================ */
(function () {
  "use strict";

  const grid = document.getElementById("mod-grid");
  const search = document.getElementById("mod-search");
  const catPills = document.getElementById("cat-pills");
  const modal = document.getElementById("mod-modal");
  const modalBody = document.getElementById("modal-body");

  let cat = "all";
  let query = "";

  /* ---------- category pills (only categories that exist) ---------- */
  const present = MODULE_CATEGORIES.filter((c) => MODULES.some((m) => m.category === c));
  present.forEach((c) => {
    const b = document.createElement("button");
    b.className = "pill";
    b.dataset.cat = c;
    b.textContent = c;
    catPills.appendChild(b);
  });

  function matches(m) {
    if (cat !== "all" && m.category !== cat) return false;
    if (!query) return true;
    const hay = (m.name + " " + m.tagline + " " + m.description + " " +
      m.category + " " + m.useCases.join(" ") + " " + m.code).toLowerCase();
    return query.split(/\s+/).every((w) => hay.includes(w));
  }

  function render() {
    const items = MODULES.filter(matches);
    if (!items.length) {
      grid.innerHTML = `<div class="card" style="grid-column:1/-1;text-align:center;padding:50px">
        <div class="icon" style="margin:0 auto 14px"><span data-icon="search"></span></div>
        <h3>No modules match that search</h3>
        <p>Try “json”, “async”, “file”, “database”… or reset the category filter.</p>
      </div>`;
      window.renderIcons(grid);
      return;
    }
    grid.innerHTML = items.map((m) => `
      <div class="module-card" data-name="${m.name}" data-icon="${window.iconForCategory(m.category)}" tabindex="0" role="button">
        <h3>${m.name}</h3>
        <div class="m-cat">${m.category}</div>
        <p>${m.tagline}</p>
      </div>`).join("");
    window.renderIcons(grid);
  }

  /* ---------- open modal ---------- */
  function openModule(name) {
    const m = MODULES.find((x) => x.name === name);
    if (!m) return;
    modalBody.innerHTML = `
      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
        <span class="m-icon lg" data-icon="${window.iconForCategory(m.category)}"></span>
        <div>
          <h2>${m.name}</h2>
          <span class="chip topic">${m.category}</span>
        </div>
      </div>
      <p class="m-desc" style="margin-top:14px">${m.tagline}</p>
      <p style="color:var(--ink-2)">${m.description}</p>

      <div class="h4" style="margin-top:22px">Practical applications</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:6px">
        ${m.useCases.map((u) => `<span class="chip topic" style="font-size:.78rem">${u}</span>`).join("")}
      </div>

      <div class="h4" style="margin-top:20px">Runnable example</div>
      <div class="code-wrap">
        <div class="code-head">
          <span class="code-title">demo_${m.name}.py</span>
          <span class="actions"><button class="copy-btn">Copy</button></span>
        </div>
        <pre><code data-py>${window.escapeHtml(m.code)}</code></pre>
      </div>
      <div class="output"><span class="label">Expected output</span>${window.escapeHtml(m.output)}</div>
      ${m.body ? `<p style="margin-top:16px;color:var(--muted)">${m.body}</p>` : ""}
      <div class="sol-actions">
        <button class="sol-btn" id="try-it" data-icon="play">Try it in the playground</button>
        <a class="sol-btn" href="learn.html" data-icon="book">Related lessons</a>
      </div>`;

    window.renderIcons(modalBody);

    // highlight fresh content
    modalBody.querySelectorAll("code[data-py]").forEach((el) => {
      el.innerHTML = window.highlightPython(el.textContent);
    });

    const tryBtn = document.getElementById("try-it");
    tryBtn.addEventListener("click", () => {
      sessionStorage.setItem("playground.code", m.code);
      location.href = "playground.html";
    });

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
    history.replaceState(null, "", "?mod=" + encodeURIComponent(m.name));
  }

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
    history.replaceState(null, "", location.pathname);
  }

  /* ---------- events ---------- */
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".module-card");
    if (card) openModule(card.dataset.name);
  });
  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".module-card");
    if (card) { e.preventDefault(); openModule(card.dataset.name); }
  });

  document.getElementById("modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("show")) closeModal(); });

  catPills.addEventListener("click", (e) => {
    const btn = e.target.closest(".pill");
    if (!btn) return;
    catPills.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    cat = btn.dataset.cat;
    render();
    if (cat !== "all") history.replaceState(null, "", "?cat=" + encodeURIComponent(cat));
    else history.replaceState(null, "", location.pathname);
  });

  let t;
  search.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => { query = search.value.trim().toLowerCase(); render(); }, 130);
  });

  /* ---------- deep links ---------- */
  const params = new URLSearchParams(location.search);
  const catParam = params.get("cat");
  if (catParam && present.includes(catParam)) {
    cat = catParam;
    catPills.querySelectorAll(".pill").forEach((p) =>
      p.classList.toggle("active", p.dataset.cat === cat));
  }
  render();

  const modParam = params.get("mod");
  if (modParam) setTimeout(() => openModule(modParam), 250);
})();
