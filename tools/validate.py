"""Validate every extracted Python sample:
   1) ast.parse  — must be syntactically valid Python
   2) run reference solution + tests — every suite must pass
"""
import ast, json, sys, io, contextlib, traceback

DATA = json.load(open(r"C:\Users\Hamza Zahoor\Desktop\python\tools\_py_samples.json", encoding="utf-8"))

# ---------- 1) syntax check ----------
syntax_errors = []
for s in DATA["samples"]:
    try:
        ast.parse(s["code"])
    except SyntaxError as e:
        syntax_errors.append((s["id"], f"line {e.lineno}: {e.msg}"))

print(f"== syntax: {len(DATA['samples'])} samples, {len(syntax_errors)} errors")
for i, err in syntax_errors:
    print(f"   SYNTAX  {i}: {err}")

# ---------- 2) run each solution against its tests ----------
failures = []
for suite in DATA["suites"]:
    buf = io.StringIO()
    try:
        with contextlib.redirect_stdout(buf):
            exec(compile(suite["code"], f"<{suite['id']}>", "exec"), {})
    except Exception:
        failures.append((suite["id"], traceback.format_exc()))

print(f"== suites: {len(DATA['suites'])} run, {len(failures)} failed")
for i, tb in failures:
    print(f"   FAIL    {i}\n{tb}\n")

sys.exit(1 if (syntax_errors or failures) else 0)
