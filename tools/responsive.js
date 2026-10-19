/* Check responsive layout metrics at a given window size */
const { spawn } = require("child_process");
const http = require("http");

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9333;
const URL_ = process.argv[2] || "http://127.0.0.1:8099/index.html";
const W = process.argv[3] || "390,844";
let ws, msgId = 0;
const pending = new Map();

function httpReq(url, method = "GET") {
  return new Promise((res, rej) => {
    const u = new URL(url);
    const r = http.request({ hostname: u.hostname, port: u.port, path: u.pathname + u.search, method }, (s) => {
      let d = ""; s.on("data", (c) => (d += c)); s.on("end", () => { try { res(JSON.parse(d)); } catch (_) { res(d); } });
    });
    r.on("error", rej); r.end();
  });
}
const send = (method, params = {}) => {
  const id = ++msgId;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); reject(new Error("timeout " + method)); } }, 30000);
  });
};
const evalJs = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
  return r.result.value;
};

(async () => {
  const profile = require("path").join(process.env.TEMP, "resp-prof-" + Date.now());
  const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--no-sandbox",
    `--user-data-dir=${profile}`, `--remote-debugging-port=${PORT}`, `--window-size=${W}`], { stdio: "ignore" });
  try {
    for (let i = 0; i < 40; i++) { try { await httpReq(`http://127.0.0.1:${PORT}/json/version`); break; } catch (_) { await new Promise(r => setTimeout(r, 300)); } }
    const t = await httpReq(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(URL_)}`, "PUT");
    ws = new WebSocket(t.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id).resolve(m.result || {}); pending.delete(m.id); } };
    await send("Page.enable"); await send("Runtime.enable");
    if (process.env.EMULATE) {
      const [w, h] = process.env.EMULATE.split(",").map(Number);
      await send("Emulation.setDeviceMetricsOverride", {
        width: w, height: h, deviceScaleFactor: 2, mobile: true,
      });
    }
    await new Promise(r => setTimeout(r, 3500));
    const info = await evalJs(`JSON.stringify({
      innerWidth: window.innerWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      mobile820: matchMedia('(max-width:820px)').matches,
      hamburgerDisplay: getComputedStyle(document.querySelector('.hamburger')).display,
      navLinksTransform: getComputedStyle(document.querySelector('.nav-links')).transform,
      widest: (() => {
        let worst = null;
        document.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.right > window.innerWidth + 4) {
            if (!worst || r.right > worst.right) worst = { right: Math.round(r.right), tag: el.tagName, cls: (el.className && el.className.toString ? el.className.toString() : '').slice(0, 40) };
          }
        });
        return worst;
      })()
    })`);
    console.log(JSON.parse(info));
    if (process.env.EMULATE) {
      const shot = await send("Page.captureScreenshot", { format: "png" });
      require("fs").writeFileSync(process.env.SHOT || "mobile.png", Buffer.from(shot.data, "base64"));
      console.log("screenshot saved:", process.env.SHOT || "mobile.png");
    }
  } catch (e) { console.error("ERR", e.message); }
  finally { try { ws && ws.close(); } catch (_) {} chrome.kill(); }
})();
