/* Extract all Python code samples from the data files to JSON
   for validation with a real Python interpreter. */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const base = path.join(__dirname, "..", "js", "data");
const out = { samples: [], suites: [] };

const files = {
  "lessons.js": "LESSONS",
  "modules.js": "MODULES",
  "problems.js": "PROBLEMS",
};

for (const [file, mainName] of Object.entries(files)) {
  const src = fs.readFileSync(path.join(base, file), "utf8");
  const ctx = { console };
  vm.createContext(ctx);
  vm.runInContext(src + `\nglobalThis.__X = typeof ${mainName} !== "undefined" ? ${mainName} : null;`, ctx);
  const data = ctx.__X;
  if (!data) throw new Error("failed to load " + file);

  if (mainName === "LESSONS") {
    data.forEach((l) => out.samples.push({ id: `lesson:${l.id}`, code: l.code }));
  } else if (mainName === "MODULES") {
    data.forEach((m) => out.samples.push({ id: `module:${m.name}`, code: m.code }));
  } else if (mainName === "PROBLEMS") {
    data.forEach((p) => {
      out.samples.push({ id: `starter:${p.id}`, code: p.starter });
      out.samples.push({ id: `solution:${p.id}`, code: p.solution });
      p.tests.forEach((t, i) => out.samples.push({ id: `test:${p.id}#${i}`, code: t }));
      // runnable suite: solution + its tests (must all pass)
      out.suites.push({ id: p.id, title: p.title, code: p.solution + "\n\n" + p.tests.join("\n") + "\n" });
    });
  }
}

fs.writeFileSync(path.join(__dirname, "_py_samples.json"), JSON.stringify(out, null, 1));
console.log(`extracted ${out.samples.length} code samples, ${out.suites.length} test suites`);
