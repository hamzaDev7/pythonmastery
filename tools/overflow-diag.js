/* Diagnose horizontal overflow at mobile width */
const { spawn } = require("child_process");
const http = require("http");
const path = require("path");
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9444;
let ws, id = 0;
const pend = new Map();
const req = (u, m = "GET") =>
  new Promise((res, rej) => {
    const x = new URL(u);
    const r = http.request({ hostname: x.hostname, port: x.port, path: x.pathname + x.search, method: m }, (s) => {
      let d = ""; s.on("data", (c) => (d += c)); s.on("end", () => { try { res(JSON.parse(d)); } catch (_) { res(d); } });
    });
    r.on("error", rej); r.end();
  });
const send = (method, params = {}) => {
  const i = ++id;
  ws.send(JSON.stringify({ id: i, method, params }));
  return new Promise((res, rej) => { pend.set(i, { res, rej }); setTimeout(() => { if (pend.has(i)) { pend.delete(i); rej(new Error("to " + method)); } }, 30000); });
};
const ev = async (e) => {
  const r = await send("Runtime.evaluate", { expression: e, returnByValue: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
  return r.result.value;
};

(async () => {
  const prof = path.join(process.env.TEMP, "diag-" + Date.now());
  const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--no-sandbox",
    "--user-data-dir=" + prof, "--remote-debugging-port=" + PORT, "--window-size=500,900"], { stdio: "ignore" });
  try {
    for (let i = 0; i < 40; i++) { try { await req("http://127.0.0.1:" + PORT + "/json/version"); break; } catch (_) { await new Promise((r) => setTimeout(r, 300)); } }
    const t = await req("http://127.0.0.1:" + PORT + "/json/new?" + encodeURIComponent(process.argv[2] || "http://127.0.0.1:8099/index.html"), "PUT");
    ws = new WebSocket(t.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id).res(m.result || {}); pend.delete(m.id); } };
    await send("Page.enable"); await send("Runtime.enable");
    await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await new Promise((r) => setTimeout(r, 3000));

    const out = {};
    out.base = await ev("document.documentElement.scrollWidth");
    await ev("var t=document.getElementById('toast'); if(t) t.style.display='none'");
    out.noToast = await ev("document.documentElement.scrollWidth");
    await ev("var f=document.querySelector('.floating-symbols'); if(f) f.style.display='none'");
    out.noSymbols = await ev("document.documentElement.scrollWidth");
    await ev("document.head.insertAdjacentHTML('beforeend','<style>body::after,body::before{display:none!important}</style>')");
    out.noAurora = await ev("document.documentElement.scrollWidth");
    await ev("['to-top','scroll-progress'].forEach(function(i){var e=document.getElementById(i); if(e) e.style.display='none'})");
    out.noFixedBits = await ev("document.documentElement.scrollWidth");
    const list = await ev(`JSON.stringify([...document.querySelectorAll('*')].filter(function(el){
        var r=el.getBoundingClientRect(); return r.right>390.5 && r.width>0 && r.height>0;
      }).slice(0,10).map(function(el){var r=el.getBoundingClientRect();
        return {tag:el.tagName, cls:String(el.className).slice(0,32), right:Math.round(r.right), w:Math.round(r.width)};}))`);
    out.overflowing = JSON.parse(list);
    console.log(out);
  } catch (e) { console.error("ERR", e.message); }
  finally { try { ws && ws.close(); } catch (_) {} chrome.kill(); }
})();
