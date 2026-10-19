# 🐍 PyMastery — Professional Python Learning Platform

A complete, animated, fully client-side website for learning Python **from basic to pro** —
with a library of module guides, practical applications for every module, coding challenges
with **solutions revealed on demand**, and a **real Python interpreter running in the browser**.

---

## ✨ What's inside

| Page | File | What it does |
|---|---|---|
| **Home** | `index.html` | Animated hero (typing effect, floating code symbols, counters), feature cards, Basic→Pro roadmap, module & challenge previews, FAQ accordion |
| **Learn** | `learn.html` | **38 lessons across 11 tracks** — Foundations → Control Flow → Data Structures → Functions → Files & Errors → OOP → Functional → Concurrency → Pro Python → Tooling → Practical. Live search, level filters, expandable lessons with key points + runnable code + expected output, completion tracking with progress bar |
| **Modules** | `modules.html` | **36 module guides** (math, os, pathlib, re, json, csv, collections, itertools, functools, threading, asyncio, sqlite3, pandas, numpy, matplotlib, flask, requests, argparse, typing, dataclasses…). Each with purpose, practical applications, runnable example, expected output. Detail modal, category filters, search, "Try it in the Playground" hand-off |
| **Practice** | `practice.html` | **20 challenges** (easy → hard) with in-browser editors, **live test verification** (5–7 hidden tests each), **hint on demand**, **full solution on demand**, solved-state tracking and progress bar |
| **Playground** | `playground.html` | A real CPython 3.12 interpreter (**Pyodide / WebAssembly**) in a two-pane editor + output view, 12 one-click example snippets, Ctrl+Enter to run, execution timing |

### Solutions on demand
Every challenge has two reveal buttons:
1. **💡 Show Hint** — points you at the concept and the approach (no code).
2. **🔓 Show Solution** — reveals the complete reference implementation, with a
   *Load solution into editor* button so you can run it against the tests yourself.

Both stay hidden until you click. Nothing is forced — you decide when you need help.

### Progress tracking
Completed lessons (`pymastery.lessons`) and solved challenges (`pymastery.solved`) are saved
in `localStorage`, so progress survives page reloads and browser restarts.

---

## 🚀 Run it

No build step. Any static server works:

```bash
cd python
python -m http.server 8099
# → open http://127.0.0.1:8099/index.html
```

Opening `index.html` directly with `file://` also works for everything except the
Pyodide runtime (the CDN script needs http(s)). Prefer the local server.

> **Note:** the Playground and the challenge test-runner download Pyodide
> (`~10 MB`, cached afterwards) from `cdn.jsdelivr.net`. Standard-library modules
> (`math`, `json`, `re`, `datetime`, `collections`, `itertools`, `functools`,
> `sqlite3`, `statistics`…) all run; pip packages (`requests`, `flask`, `pandas`)
> require a local Python install — see the *pip, Virtual Environments & pyproject* lesson.

---

## 📁 Project structure

```
python/
├── index.html            # landing page
├── learn.html            # curriculum
├── modules.html          # module library
├── practice.html         # challenges
├── playground.html       # live Python runner
├── css/
│   └── styles.css        # design system: dark theme, glass cards, animations, responsive
├── js/
│   ├── main.js           # nav, scroll progress, reveal-on-scroll, counters, typing effect,
│   │                     # floating symbols, card glow, Python syntax highlighter, toasts, FAQ
│   ├── learn.js          # lesson accordion, search/filter, completion tracking
│   ├── modules.js        # module grid, filters, detail modal, deep links
│   ├── practice.js       # challenge UI, Pyodide test runner, hint/solution reveal
│   ├── playground.js     # Pyodide runner, snippets, shortcuts
│   └── data/
│       ├── lessons.js    # 38 lessons (content, keypoints, code, expected output)
│       ├── modules.js    # 36 module guides (description, use-cases, code, output)
│       └── problems.js   # 20 challenges (desc, examples, starter, hint, solution, tests)
└── tools/                # development & QA harness (not needed to run the site)
    ├── extract.js        # dumps every Python snippet from the data files to JSON
    ├── validate.py       # ast-parses all 207 snippets + runs all 20 solution/test suites
    ├── e2e.js            # headless-Chrome E2E suite (24 assertions, drives the real site)
    ├── responsive.js     # mobile viewport metrics + emulated screenshots
    └── overflow-diag.js  # horizontal-overflow diagnostics at 390 px
```

---

## ✅ Quality assurance (how it was verified)

Run these from the project root (needs Node + Python 3 and Chrome):

```bash
node tools/extract.js && python tools/validate.py   # 207 snippets parse, 20/20 suites pass
node tools/e2e.js                                   # 24/24 browser assertions pass
```

Latest results:

- **207/207** Python snippets are syntactically valid (checked with real CPython `ast.parse`).
- **20/20** reference solutions pass their own hidden test suites.
- **24/24** E2E assertions pass in headless Chrome, including:
  live Pyodide execution, a correct solution passing all tests, a deliberately wrong
  solution failing, accordion/progress/localStorage behaviour, filters, modals, and the
  on-demand hint & solution reveals.
- **0** horizontal overflow at 390 px on every page; all internal links resolve;
  all 5 documents are tag-balanced; no console errors.

---

## 🎨 Design & animation highlights

- Dark aurora/glassmorphism theme with cyan→indigo→purple gradients
- Typing-effect headline, floating Python keywords, animated hero counters
- Scroll progress bar, sticky nav that solidifies on scroll, back-to-top button
- Scroll-reveal transitions with staggered delays (IntersectionObserver)
- Cursor-following glow on cards, hover lifts, animated accordions/modals
- Syntax-highlighted code blocks with copy buttons and mock terminal output
- Fully responsive: desktop → tablet → phone with a slide-down mobile menu
- `prefers-reduced-motion` respected; keyboard-accessible dialogs (Esc to close)

Built with **vanilla HTML/CSS/JS** — no frameworks, no build tooling.
