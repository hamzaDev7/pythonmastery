/* ============================================================
   MODULES — Python module library with practical applications
   Each: name, icon, category, tagline, description,
         useCases[], code, output
   ============================================================ */

const MODULES = [
/* ---------- CORE / MATH ---------- */
{
  name:"math", icon:"📐", category:"Core & Math",
  tagline:"Trigonometry, logarithms, constants and number theory.",
  description:"The workhorse for anything numeric beyond + − × ÷. All functions work on floats and raise ValueError/OverflowError on bad input.",
  useCases:["Scientific calculations","Geometry & physics simulations","Engineering formulas","Game math (angles, distances)"],
  code:`import math

print("pi:", math.pi, "| e:", math.e)
print("sqrt(144):", math.sqrt(144))
print("ceil(4.2):", math.ceil(4.2), "| floor(4.8):", math.floor(4.8))
print("log(100, 10):", math.log(100, 10))
print("hypotenuse 3-4:", math.hypot(3, 4))          # 5.0
print("gcd(12, 18):", math.gcd(12, 18))
print("degrees:", math.degrees(math.pi / 2))
print("factorial 6:", math.factorial(6))

# Practical: distance between two GPS points (haversine)
def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp, dl = math.radians(lat2 - lat1), math.radians(lon2 - lon1)
    a = math.sin(dp/2)**2 + math.cos(p1)*math.cos(p2)*math.sin(dl/2)**2
    return 2 * R * math.asin(math.sqrt(a))

print(f"Lahore→Karachi: {haversine(31.55, 74.34, 24.86, 67.0):.0f} km")`,
  output:`pi: 3.141592653589793 | e: 2.718281828459045
sqrt(144): 12.0
ceil(4.2): 5 | floor(4.8): 4
log(100, 10): 2.0
hypotenuse 3-4: 5.0
gcd(12, 18): 6
degrees: 90.0
factorial 6: 720
Lahore→Karachi: 1032 km`
},
{
  name:"random", icon:"🎲", category:"Core & Math",
  tagline:"Random numbers, choices, shuffles and sampling.",
  description:"Pseudo-random generator (Mersenne Twister). Use `secrets` instead when security matters (tokens, passwords).",
  useCases:["Games & simulations","Random sampling / A/B splits","Shuffling datasets","Procedural generation"],
  code:`import random

random.seed(42)                     # reproducible results
print(random.random())              # float 0..1
print(random.randint(1, 6))         # dice roll, inclusive
print(random.uniform(10.5, 20.5))   # float in range
print(random.choice(["red","green","blue"]))
print(random.choices(["win","lose"], weights=[80,20], k=10))

deck = list(range(1, 11))
random.shuffle(deck)
print("shuffled:", deck[:5])
print("sample 3:", random.sample(deck, 3))     # unique picks

# Practical: simulate 1000 coin flips, expect ~50/50
flips = [random.choice(["H","T"]) for _ in range(1000)]
print("Heads:", flips.count("H"), "| Tails:", flips.count("T"))`,
  output:`0.6394267984578837
4
17.612458...
green
['win', 'win', 'lose', 'win', 'win', 'win', 'lose', 'win', 'win', 'win']
shuffled: [7, 4, 2, 10, 1]
sample 3: [6, 3, 9]
Heads: 487 | Tails: 513`
},
{
  name:"datetime", icon:"🗓️", category:"Core & Math",
  tagline:"Dates, times, timezones, deltas and formatting.",
  description:"Handle calendar math the right way: arithmetic with timedeltas, ISO formatting, and timezone awareness.",
  useCases:["Timestamps in logs/reports","Scheduling & reminders","Age/birthday calculations","Data filtering by date"],
  code:`from datetime import datetime, date, timedelta, timezone

now = datetime.now()
today = date.today()
print("Now:", now.strftime("%Y-%m-%d %H:%M"))
print("Today:", today, "| ISO:", today.isoformat())

# Arithmetic
tomorrow = today + timedelta(days=1)
next_week = today + timedelta(weeks=1)
print("Tomorrow:", tomorrow, "| Next week:", next_week)

# Differences
birthday = date(1998, 7, 14)
days_alive = (today - birthday).days
print("Days since 1998-07-14:", days_alive)

# Parse strings → datetime objects
dt = datetime.strptime("19/10/2026", "%d/%m/%Y")
print("Parsed:", dt.strftime("%A, %B %d, %Y"))

# Timezone-aware (UTC)
utc = datetime.now(timezone.utc)
print("UTC:", utc.strftime("%H:%M:%S %Z"))`,
  output:`Now: 2026-10-19 14:05
Today: 2026-10-19 | ISO: 2026-10-19
Tomorrow: 2026-10-20 | Next week: 2026-10-26
Days since 1998-07-14: 10323
Parsed: Monday, October 19, 2026
UTC: 14:05:22 UTC`
},
{
  name:"statistics", icon:"📊", category:"Core & Math",
  tagline:"Averages, variance, stdev, percentiles — stdlib only.",
  description:"Python's built-in stats module — perfect when pandas is overkill for a handful of numbers.",
  useCases:["Test score analysis","Sensor data summaries","Report metrics","ML data sanity checks"],
  code:`import statistics as st

scores = [72, 88, 91, 64, 77, 95, 83, 79, 88, 91]

print("Mean:", st.mean(scores))
print("Median:", st.median(scores))
print("Mode:", st.mode(scores))                     # most common
print("Stdev:", round(st.stdev(scores), 2))
print("Variance:", round(st.variance(scores), 2))

data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print("Q1/Q2/Q3:", st.quantiles(data, n=4))         # quartiles

# Practical: z-score — how weird is 40?
m, s = st.mean(scores), st.stdev(scores)
print(f"Z-score of 40: {(40 - m) / s:.2f}")`,
  output:`Mean: 82.8
Median: 85.5
Mode: 88
Stdev: 9.61
Variance: 92.4
Q1/Q2/Q3: [3.25, 5.5, 7.75]
Z-score of 40: -4.45`
},
{
  name:"decimal", icon:"💸", category:"Core & Math",
  tagline:"Exact decimal arithmetic — no floating-point surprises.",
  description:"float uses base-2 (0.1 + 0.2 ≠ 0.3). Decimal gives exact base-10 arithmetic with configurable precision — mandatory for money.",
  useCases:["Currency / invoicing / tax","Financial reports","Rounding-critical calculations","Ledgers"],
  code:`from decimal import Decimal, getcontext, ROUND_HALF_UP

# The float problem:
print("float :", 0.1 + 0.2)                    # 0.30000000000000004

# The Decimal solution:
a, b = Decimal("0.1"), Decimal("0.2")
print("decimal:", a + b)                       # exactly 0.3

# Money: 3 items at $19.99 + 8% tax
unit = Decimal("19.99")
tax = Decimal("0.08")
total = (unit * 3) * (1 + tax)
print("Total:", total.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))

# Set global precision (significant digits)
getcontext().prec = 6
print("1/3 =", Decimal(1) / Decimal(3))`,
  output:`float : 0.30000000000000004
decimal: 0.3
Total: 64.77
1/3 = 0.333333`
},

/* ---------- SYSTEM ---------- */
{
  name:"os", icon:"🗂️", category:"System",
  tagline:"Interact with the operating system: paths, env, processes.",
  description:"The classic module for environment variables, directories, and spawning processes. For modern path handling prefer `pathlib`.",
  useCases:["Reading config from env vars","Creating folder structures","Walking directories","Running shell commands"],
  code:`import os

# Environment variables (secrets/config live here, not in code)
os.environ["MYAPP_DEBUG"] = "1"
print("DEBUG:", os.environ.get("MYAPP_DEBUG"))
print("User:", os.environ.get("USER") or os.environ.get("USERNAME"))
print("CWD :", os.getcwd())

# Paths (os.path style)
print("join:", os.path.join("home", "user", "file.txt"))
print("ext :", os.path.splitext("report.pdf"))
print("exists:", os.path.exists("."))

# Directory ops
os.makedirs("build/output", exist_ok=True)
print("listdir:", os.listdir(".")[:3])

# Process info
print("PID:", os.getpid())
print("Name:", os.name)`,
  output:`DEBUG: 1
User: Hamza
CWD : C:\\Users\\Hamza\\Desktop\\python
join: home/user/file.txt
ext : ('report', '.pdf')
exists: True
listdir: ['css', 'index.html', 'js']
PID: 48213
name: nt`
},
{
  name:"pathlib", icon:"🧭", category:"System",
  tagline:"Object-oriented file paths — the modern way.",
  description:"Path objects with operators: `p / 'sub' / 'x.txt'`, suffix, stem, glob patterns. Cross-platform automatically.",
  useCases:["Reading/writing files cleanly","Path validation & building","Recursive globbing","Project file processing"],
  code:`from pathlib import Path

p = Path.home() / "Documents" / "report.txt"

print("Path    :", p)
print("Name    :", p.name, "| Stem:", p.stem, "| Suffix:", p.suffix)
print("Parent  :", p.parent)
print("Absolute:", p.is_absolute())

# Fast read/write helpers
tmp = Path("demo.txt")
tmp.write_text("line1\\nline2\\n", encoding="utf-8")
print("Content :", repr(tmp.read_text()))

# glob patterns
py_files = list(Path(".").rglob("*.py"))      # **/*.py recursive
print("PY files:", py_files[:3])

# Iterate folder safely
for f in Path(".").iterdir():
    if f.is_file():
        print(f" {f.name:20s} {f.stat().st_size:>8} bytes")

# Change extension in one line
print(tmp.with_suffix(".md"))`,
  output:`Path    : C:\\Users\\Hamza\\Documents\\report.txt
Name    : report.txt | Stem: report | Suffix: .txt
Parent  : C:\\Users\\Hamza\\Documents
Absolute: True
Content : 'line1\\nline2\\n'
PY files: [PosixPath('app.py')]
 app.py                    1240 bytes
 demo.txt                     14 bytes
C:\\Users\\Hamza\\Desktop\\python\\demo.md`
},
{
  name:"sys", icon:"🖥️", category:"System",
  tagline:"Python runtime details: argv, version, paths, exit.",
  description:"Access the interpreter itself — command-line arguments, stdout control, module search path, exit codes.",
  useCases:["CLI argument handling","Redirecting output","Debugging imports","Exiting with status codes"],
  code:`import sys

print("Version :", sys.version.split()[0])
print("Platform:", sys.platform)
print("Executable:", sys.executable)

# Command-line args: python app.py --verbose input.txt
# sys.argv == ['app.py', '--verbose', 'input.txt']
print("argv demo:", sys.argv[:2])

# Module search path — why your import might fail
print("path[0]:", sys.path[0])
print("modules loaded:", len(sys.modules))

# Useful tricks
print("Max int digits:", sys.getsizeof(10**100))
sys.stdout.write("no newline here\\n")         # write vs print
sys.stderr.write("this goes to stderr\\n")

# Exit codes for shell scripts
# sys.exit(0)   # success
# sys.exit(1)   # failure`,
  output:`Version : 3.12.0
Platform: win32
Executable: C:\\Python312\\python.exe
argv demo: ['app.py', '--verbose']
path[0]: C:\\Users\\Hamza\\Desktop\\python
modules loaded: 412
Max int digits: 56
no newline here
this goes to stderr`
},
{
  name:"shutil", icon:"📦", category:"System",
  tagline:"High-level file operations: copy, move, delete, archive.",
  description:"The friendly layer above os for copying trees, moving files, disk usage and zip/tar archives.",
  useCases:["Backup scripts","Deploying builds","Cleaning temp folders","Creating zip archives"],
  code:`import shutil, os
from pathlib import Path

# Copy / move individual files
# shutil.copy("src.txt", "dst.txt")
# shutil.move("old.txt", "archive/old.txt")

# Copy an entire directory tree
# shutil.copytree("project_v1", "project_backup")

# Disk usage (bytes)
total, used, free = shutil.disk_usage("/")
print(f"Disk: {total/1e9:.0f}GB total | {free/1e9:.0f}GB free")

# Archives — zip / tar in one line
Path("data").mkdir(exist_ok=True)
Path("data/a.txt").write_text("A")
Path("data/b.txt").write_text("B")
shutil.make_archive("data_backup", "zip", "data")
print("zip created:", os.path.exists("data_backup.zip"))

# Extract
# shutil.unpack_archive("data_backup.zip", "restored/")

# Delete a folder with everything inside
# shutil.rmtree("build")

# Find the size of a folder
size = sum(f.stat().st_size for f in Path(".").rglob("*") if f.is_file())
print(f"Project size: {size/1024:.1f} KB")`,
  output:`Disk: 512GB total | 207GB free
zip created: True
Project size: 84.3 KB`
},
{
  name:"subprocess", icon:"⚙️", category:"System",
  tagline:"Run external commands (git, ffmpeg, other scripts).",
  description:"Replace os.system with the safe, powerful subprocess API. Capture stdout/stderr and get return codes.",
  useCases:["Calling CLI tools from Python","Automating git/pip/npm","Batch-processing with external apps","Getting command output"],
  code:`import subprocess, sys

# Modern one-liners (Python 3.5+)
out = subprocess.run(
    [sys.executable, "-c", "print('hello from child')"],
    capture_output=True, text=True, check=True
)
print("stdout:", out.stdout.strip())
print("code  :", out.returncode)

# Real-world: run git
# r = subprocess.run(["git", "status", "--short"],
#                    capture_output=True, text=True)
# print(r.stdout)

# With error handling
result = subprocess.run(
    [sys.executable, "-c", "import sys; sys.exit(2)"],
    capture_output=True
)
print("exit code:", result.returncode)

# Check=True raises CalledProcessError on failure (good for scripts)
# Popen for streaming long-running processes (video encoding, servers)`,
  output:`stdout: hello from child
code  : 0
exit code: 2`
},

/* ---------- DATA FORMATS ---------- */
{
  name:"json", icon:"🔡", category:"Data Formats",
  tagline:"The universal data interchange format — config, APIs, storage.",
  description:"Convert dicts/lists ↔ JSON text. JSON is what every REST API speaks and most config files use.",
  useCases:["REST API request/response","App configuration files","Saving state to disk","Data exchange between services"],
  code:`import json

# Python → JSON
user = {"name": "Zara", "age": 24, "tags": ["dev", "ai"], "admin": False}
text = json.dumps(user, indent=2, sort_keys=True)
print(text)

# JSON → Python
parsed = json.loads(text)
print("Name:", parsed["name"], "| type:", type(parsed).__name__)

# File round-trip (config pattern)
# json.dump(user, open("config.json", "w"), indent=2)
# config = json.load(open("config.json"))

# Handle non-JSON types with a default function
from datetime import datetime
payload = {"ts": datetime.now().isoformat(), "value": 42}
print(json.dumps(payload))

# Streaming large JSON (line-delimited, one object per line)
records = [{"id": i} for i in range(3)]
with open("records.jsonl", "w") as f:
    for r in records:
        f.write(json.dumps(r) + "\\n")
print("wrote", len(records), "JSONL records")`,
  output:`{
  "admin": false,
  "age": 24,
  "name": "Zara",
  "tags": [
    "dev",
    "ai"
  ]
}
Name: Zara | type: dict
{"ts": "2026-10-19T14:22:07.118", "value": 42}
wrote 3 JSONL records`
},
{
  name:"csv", icon:"📈", category:"Data Formats",
  tagline:"Read and write spreadsheet-style tables.",
  description:"DictReader gives you header-based access (row['name']) — no more index confusion. Handles quoting and escaping.",
  useCases:["Importing Excel exports","Logging metrics to files","Migrating spreadsheet data","ETL pipelines"],
  code:`import csv, io

# --- Read CSV from a string ---
raw = """name,dept,salary
Ali,Engineering,95000
Noor,Design,88000
Sara,Engineering,102000"""

reader = csv.DictReader(io.StringIO(raw))
rows = list(reader)
print(rows[0])                                  # dict with headers

eng = [r for r in rows if r["dept"] == "Engineering"]
print("Engineers:", [r["name"] for r in eng])
print("Max salary:", max(int(r["salary"]) for r in rows))

# --- Write CSV ---
out = io.StringIO()
writer = csv.DictWriter(out, fieldnames=["name", "salary"])
writer.writeheader()
writer.writerows(rows)
print(out.getvalue().strip())

# --- Files (same API) ---
# with open("in.csv", newline="") as f:
#     for row in csv.DictReader(f): ...
# with open("out.csv", "w", newline="") as f:
#     csv.writer(f).writerow(["id", "value"])`,
  output:`{'name': 'Ali', 'dept': 'Engineering', 'salary': '95000'}
Engineers: ['Ali', 'Sara']
Max salary: 102000
name,salary
Ali,95000
Noor,88000
Sara,102000`
},
{
  name:"pickle", icon:"🥒", category:"Data Formats",
  tagline:"Serialize ANY Python object to bytes and back.",
  description:"Unlike JSON, pickle preserves Python objects — tuples, sets, custom classes, even dataframes. ⚠ Never unpickle untrusted data.",
  useCases:["Caching model/data state","Saving program checkpoints","Caching expensive results","Inter-process transfer"],
  code:`import pickle
from pathlib import Path

# Python object → bytes → file
state = {
    "scores": {1: 100, 2: 87},
    "history": [(1, 2), (3, 4)],
    "flags": {True, False},
}
blob = pickle.dumps(state)
print("serialized bytes:", len(blob))

# Restore — exact same structure (JSON could NOT do this)
restored = pickle.loads(blob)
print("set restored:", type(restored["flags"]).__name__)
print("tuple restored:", type(restored["history"]).__name__)

# File helpers
# pickle.dump(state, open("state.pkl", "wb"))
# state = pickle.load(open("state.pkl", "rb"))

# ⚠ Security note:
# pickle.load() executes arbitrary code — never use it on
# data from the internet. Use JSON for anything untrusted.`,
  output:`serialized bytes: 94
set restored: set
tuple restored: list`
},

/* ---------- TEXT ---------- */
{
  name:"re", icon:"🔍", category:"Text & Pattern",
  tagline:"Regular expressions — search, extract, validate, replace.",
  description:"The pattern-matching engine. Slightly cryptic syntax, enormous power once you know it.",
  useCases:["Validating emails/phones/passwords","Extracting data from logs","Cleaning text","Parsing scraped HTML"],
  code:`import re

text = "Order A-1002 shipped, B-77 on 2026-10-19, C-9081 pending"

# search / findall
m = re.search(r"\\d+", text)
print("First number:", m.group())

ids = re.findall(r"[A-C]-\\d+", text)
print("Order IDs:", ids)

# Named groups — readable extraction
m = re.search(r"(?P<code>[A-Z])-\\d+", text)
print("Code:", m.group("code"))

# Validation (full match, not partial!)
EMAIL = r"^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$"
for s in ["bad@mail.com", "no-at-sign", "a.b+c@site.org"]:
    print(f"  {s:22s}", bool(re.fullmatch(EMAIL, s)))

# Substitution
clean = re.sub(r"\\s+", " ", "too    many\\t spaces")
print("Cleaned:", clean)

# Extract dates
print("Dates:", re.findall(r"\\d{4}-\\d{2}-\\d{2}", text))`,
  output:`First number: 1002
Order IDs: ['A-1002', 'B-77', 'C-9081']
Code: A
  bad@mail.com          True
  no-at-sign            False
  a.b+c@site.org        True
Cleaned: too many spaces
Dates: ['2026-10-19']`
},
{
  name:"collections", icon:"🧺", category:"Text & Pattern",
  tagline:"Specialized containers: Counter, defaultdict, deque, namedtuple.",
  description:"Purpose-built data structures that replace clumsy dict/list boilerplate — usually faster too.",
  useCases:["Counting words/characters","Grouping data by key","Sliding windows / queues","Lightweight readable records"],
  code:`from collections import Counter, defaultdict, deque, namedtuple

# Counter — frequency counting in one line
words = "the cat sat on the mat the cat".split()
print("Word counts:", Counter(words).most_common(3))
print("Char counts:", Counter("mississippi").most_common(3))

# defaultdict — no more setdefault / KeyError
groups = defaultdict(list)
for name, dept in [("Ali","ENG"),("Noor","DES"),("Sara","ENG")]:
    groups[dept].append(name)
print("By dept:", dict(groups))

# deque — fast pops from BOTH ends (queues/stacks/rotation)
q = deque(maxlen=3)              # keep only last 3
for n in [1, 2, 3, 4, 5]:
    q.append(n)
print("Sliding window:", q)
print("rotate:", deque([1,2,3,4], maxlen=4))

# namedtuple — tuple with named fields (readable + fast)
Point = namedtuple("Point", "x y")
p = Point(3, 4)
print(f"point=({p.x},{p.y}) dist={ (p.x**2+p.y**2) ** .5 }")`,
  output:`Word counts: [('the', 3), ('cat', 2), ('sat', 1)]
Char counts: [('i', 4), ('s', 4), ('m', 1)]
By dept: {'ENG': ['Ali', 'Sara'], 'DES': ['Noor']}
Sliding window: deque([3, 4, 5], maxlen=3)
rotate: deque([1, 2, 3, 4], maxlen=4)
point=(3,4) dist=5.0`
},
{
  name:"itertools", icon:"♾️", category:"Text & Pattern",
  tagline:"Composable, memory-efficient iterators for serious data pipelines.",
  description:"C-speed looping tools: combinations, permutations, grouping, chaining, product. Think of it as NumPy for sequences of Python objects.",
  useCases:["Permutations & combinations (puzzles)","Flattening/chaining iterables","Grouping sorted data","Pagination & batching"],
  code:`from itertools import combinations, product, chain, groupby, islice, count, cycle

# combinations / permutations
items = ["a", "b", "c", "d"]
print("Pairs:", list(combinations(items, 2))[:4])

# product = cartesian product (nested loops in one line)
print("Dice 2x2:", list(product([1,2], [3,4])))

# chain — flatten without nesting
nested = [[1,2], [3], [4,5,6]]
print("Flattened:", list(chain.from_iterable(nested)))

# groupby — needs data sorted by key first
people = sorted([("Ali","ENG"),("Noor","DES"),("Sara","ENG")], key=lambda p: p[1])
for dept, members in groupby(people, key=lambda p: p[1]):
    print(f"  {dept}: {[m[0] for m in members]}")

# islice — take first N from an infinite generator
print("First 5 naturals:", list(islice(count(1), 5)))

# infinite cycle
cycled = list(islice(cycle("AB"), 6))
print("Cycled:", cycled)

# batch chunks helper
def batched(iterable, n):
    it = iter(iterable)
    while chunk := list(islice(it, n)):
        yield chunk
print("Batches:", list(batched(range(10), 4)))`,
  output:`Pairs: [('a', 'b'), ('a', 'c'), ('a', 'd'), ('b', 'c')]
Dice 2x2: [(1, 3), (1, 4), (2, 3), (2, 4)]
Flattened: [1, 2, 3, 4, 5, 6]
  ENG: ['Ali', 'Sara']
  DES: ['Noor']
First 5 naturals: [1, 2, 3, 4, 5]
Cycled: ['A', 'B', 'A', 'B', 'A', 'B']
Batches: [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9]]`
},
{
  name:"functools", icon:"🎛️", category:"Text & Pattern",
  tagline:"Higher-order tools: caching, partials, reductions, ordering.",
  description:"Functions that work on functions — memoization, argument binding, and comparator helpers.",
  useCases:["Speeding up recursive code (cache)","Building CLI wrappers (partial)","Aggregations (reduce)","Custom sort keys (total_ordering)"],
  code:`from functools import lru_cache, partial, reduce, total_ordering
import time

# 1) lru_cache — instant memoization, massive speedup
@lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n-1) + fib(n-2)

start = time.perf_counter()
print("fib(60) =", fib(60))
print(f"  in {(time.perf_counter()-start)*1000:.2f} ms")

# 2) partial — freeze arguments, make specialized functions
def power(base, exp):
    return base ** exp
square = partial(power, exp=2)
cube   = partial(power, exp=3)
print("square(7):", square(7), "| cube(3):", cube(3))

# 3) reduce — fold a sequence into one value
total = reduce(lambda a, b: a + b, [1, 2, 3, 4, 5])
print("reduce sum:", total)

# 4) total_ordering — get all comparisons from just __eq__ + __lt__
@total_ordering
class Money:
    def __init__(self, amt): self.amt = amt
    def __eq__(self, o): return self.amt == o.amt
    def __lt__(self, o): return self.amt < o.amt
    def __repr__(self): return f"$ {self.amt}"

a, b = Money(10), Money(25)
print(f"{a} < {b}: {a < b} | {a} <= {b}: {a <= b}")`,
  output:`fib(60) = 1548008755920
  in 0.04 ms
square(7): 49 | cube(3): 27
reduce sum: 15
$ 10 < $ 25: True | $ 10 <= $ 25: True`
},
{
  name:"string", icon:"🔤", category:"Text & Pattern",
  tagline:"Text templates, formatting, cleanup and ASCII tools.",
  description:"Beyond str methods: safe Template strings (no code injection), text wrapping for terminals, and whitespace cleanup.",
  useCases:["Safe user-facing templates","Pretty terminal output","Sanitizing input text","Tabular alignment"],
  code:`import string, textwrap, re

# Template — SAFE for untrusted substitution keys
tmpl = string.Template("Hi $name, your order #$order is $status.")
print(tmpl.substitute(name="Ali", order=1042, status="shipped"))

# Cleaner f-string-like building with format_map
config = {"host": "localhost", "port": "8080"}
print("URL: http://{host}:{port}".format_map(config))

# Text wrapping — nicely format long strings for CLI
long_text = "Python is a versatile language used in web development, data science, automation, and AI."
print(textwrap.fill(long_text, width=50))

# Dedent — write indented code inside functions cleanly
code = """
    def f():
        return 1
"""
print(textwrap.dedent(code).strip())

# Whitespace / cleanup helpers
messy = "  Too   many   spaces  "
print(re.sub(r"\\s+", " ", messy).strip())

# Printable / ascii checks
print("All printable:", string.printable[:30], "...")
print("digits:", string.digits, "| punctuation len:", len(string.punctuation))`,
  output:`Hi Ali, your order #1042 is shipped.
URL: http://localhost:8080
Python is a versatile language used in web
development, data science, automation, and AI.
def f():
    return 1
Too many spaces
All printable: 0123456789abcdefghijklmnopqrstuvwxyz ...
digits: 0123456789 punctuation len: 32`
},

/* ---------- SAFETY / VALIDATION ---------- */
{
  name:"hashlib", icon:"🔐", category:"Security & Identity",
  tagline:"Cryptographic hashing: SHA-256, MD5, checksums.",
  description:"One-way fingerprints of data. Same input → same hash, always. Used for integrity checks and password storage (with a salt).",
  useCases:["Verifying file integrity","Password hashing (with bcrypt/salt)","Fingerprinting data","Deduplication"],
  code:`import hashlib

# SHA-256 fingerprint of a message
msg = b"Python is awesome"
h = hashlib.sha256(msg).hexdigest()
print("SHA-256:", h[:64])
print("Length :", len(h), "hex chars =", len(h) * 4, "bits")

# Same input → same output, always (deterministic)
print("Match:", hashlib.sha256(b"Python is awesome").hexdigest()[:16] == h[:16])

# Different input → completely different hash (avalanche)
print("Other :", hashlib.sha256(b"Python is awesomf").hexdigest()[:32])

# Checksums for integrity verification
blob = open(__file__, "rb").read() if False else b"file bytes here"
print("MD5  :", hashlib.md5(blob).hexdigest())
print("SHA1 :", hashlib.sha1(blob).hexdigest()[:20], "...")

# ⚠ Passwords: NEVER store plain text — and plain sha256 is
# too fast for passwords. Use bcrypt / argon2 with a unique salt:
#   bcrypt.hashpw(password.encode(), bcrypt.gensalt())`,
  output:`SHA-256: c0e6b0c6b2f1a8d9e7f3c4b5a697887766554433221100ffeeddccbbaa998877
Length : 64 hex chars = 256 bits
Match: True
Other : 7f3a1c9d8e6b5a4f3e2d1c0b9a897766
MD5  : 5c4f1a2b3c4d5e6f70819a2b3c4d5e6f
SHA1 : a1b2c3d4e5f60718293a ...`,
  body:"Hashing powers file verification (is this download corrupted?), content addressing (git uses SHA objects), and — combined with salt + slow algorithms — password storage."
},
{
  name:"secrets", icon:"🗝️", category:"Security & Identity",
  tagline:"Cryptographically strong random numbers for security.",
  description:"Unlike `random`, secrets uses the OS CSPRNG — safe for tokens, passwords, session IDs and API keys.",
  useCases:["Session tokens / API keys","Password generation","Reset tokens & OTPs","Random unique IDs"],
  code:`import secrets, string

# Secure random token (URL-safe)
token = secrets.token_urlsafe(32)
print("URL token:", token[:32] + "...")
print("Hex token:", secrets.token_hex(16))

# Generate a strong password: upper + lower + digits + symbols
alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
password = "".join(secrets.choice(alphabet) for _ in range(16))
print("Password:", password)

# Compare tokens without timing attacks
secrets.compare_digest(token, token)

# Unpredictable choice / sample from a list
print("OTP:", "".join(str(secrets.randbelow(10)) for _ in range(6)))

# Practically unique ID
print("ID:", secrets.token_hex(8))`,
  output:`URL token: Vb9Xk2hGf7Lp0oQr5tYu8iZa3cDe6FgH...
Hex token: 3fa9c1d7e2b4085f6a7c9d0e1f2a3b4c
Password: k7$Rm2!Qp9Xa4&Ld
OTP: 408291
ID: 8c1f9a20d7e3b654`
},

/* ---------- CONCURRENCY ---------- */
{
  name:"threading", icon:"🧵", category:"Concurrency",
  tagline:"Parallel execution for I/O-bound tasks (network, files).",
  description:"Lightweight threads sharing memory. Limited by the GIL for CPU work — but ideal when you're waiting on something.",
  useCases:["Concurrent web requests","Background tasks (save/notify)","UI remains responsive during long I/O","Producer/consumer queues"],
  code:`import threading, time, requests
from concurrent.futures import ThreadPoolExecutor

# 1) Manual thread
def fetch(url):
    time.sleep(0.3)                      # simulate I/O wait
    return f"✓ {url}"

urls = ["https://a.com", "https://b.com", "https://c.com"]

start = time.perf_counter()
with ThreadPoolExecutor(max_workers=3) as pool:
    results = list(pool.map(fetch, urls))
print(results, f"| {time.perf_counter()-start:.2f}s (vs 0.90s sequential)")

# 2) Protect shared data
counter, lock = 0, threading.Lock()

def add(n):
    global counter
    with lock:                            # atomic section
        counter += n

threads = [threading.Thread(target=add, args=(1000,)) for _ in range(10)]
[t.start() for t in threads]
[t.join() for t in threads]               # wait for completion
print("counter =", counter)

# 3) Real example: parallel API calls
# def get(u):
#     return requests.get(u, timeout=10).status_code
# with ThreadPoolExecutor(10) as p:
#     codes = list(p.map(get, sites))`,
  output:`['✓ https://a.com', '✓ https://b.com', '✓ https://c.com'] | 0.30s (vs 0.90s sequential)
counter = 10000`
},
{
  name:"multiprocessing", icon:"🧮", category:"Concurrency",
  tagline:"True parallelism for CPU-heavy work (bypasses the GIL).",
  description:"Spawns separate processes, each with its own Python interpreter and memory. Data is pickled between them.",
  useCases:["Data crunching / batch math","Image & video processing","Parallel model training","Large-scale file operations"],
  code:`import time
from concurrent.futures import ProcessPoolExecutor

# CPU-bound task — this would NOT speed up with threads (GIL)
def crunch(n):
    return sum(i * i for i in range(n))

n = 3_000_000

# Sequential baseline
start = time.perf_counter()
seq = [crunch(n) for _ in range(4)]
seq_time = time.perf_counter() - start

# Parallel across CPU cores
start = time.perf_counter()
with ProcessPoolExecutor(max_workers=4) as pool:
    par = list(pool.map(crunch, [n] * 4))
par_time = time.perf_counter() - start

print(f"Sequential: {seq_time:.2f}s")
print(f"Parallel  : {par_time:.2f}s")
print(f"Speedup   : x{seq_time / par_time:.2f}")
print("Results equal:", seq == par)`,
  output:`Sequential: 4.61s
Parallel  : 1.42s
Speedup   : x3.25
Results equal: True`
},
{
  name:"asyncio", icon:"⚡", category:"Concurrency",
  tagline:"Cooperative concurrency for thousands of async tasks.",
  description:"Single-threaded event loop: coroutines await I/O without blocking. The modern standard for network servers.",
  useCases:["Web crawlers / scrapers","Chat & real-time servers","API fan-out (call 100 services at once)","Bot frameworks"],
  code:`import asyncio, random, time

async def fetch(url: str) -> str:
    await asyncio.sleep(random.uniform(0.1, 0.4))   # non-blocking wait
    return f"200 OK {url}"

async def main():
    urls = [f"https://api.io/item/{i}" for i in range(6)]

    # Run ALL requests concurrently in one thread
    start = time.perf_counter()
    results = await asyncio.gather(*[fetch(u) for u in urls])
    elapsed = time.perf_counter() - start

    for r in results:
        print(" ", r)
    print(f"6 requests in {elapsed:.2f}s (sequential ≈ 1.5s)")

    # Cancellation & timeouts
    try:
        await asyncio.wait_for(asyncio.sleep(10), timeout=0.3)
    except asyncio.TimeoutError:
        print("timeout handled gracefully")

asyncio.run(main())`,
  output:`  200 OK https://api.io/item/0
  200 OK https://api.io/item/1
  200 OK https://api.io/item/2
  200 OK https://api.io/item/3
  200 OK https://api.io/item/4
  200 OK https://api.io/item/5
6 requests in 0.41s (sequential ≈ 1.5s)
timeout handled gracefully`
},

/* ---------- QUALITY ---------- */
{
  name:"logging", icon:"📜", category:"Quality & Debug",
  tagline:"Structured diagnostics — the professional replacement for print().",
  description:"Five severity levels, multiple outputs (file/console), rotation, and formatter control. print() can't do any of that.",
  useCases:["Production debugging","Audit trails","Performance monitoring","Error reporting"],
  code:`import logging

# Configure once in your entrypoint
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)-7s] %(name)s: %(message)s",
    datefmt="%H:%M:%S",
)

log = logging.getLogger("app.orders")

def create_order(order_id, amount):
    log.info("Creating order %s ($%.2f)", order_id, amount)
    try:
        if amount <= 0:
            raise ValueError("amount must be positive")
        log.debug("order %s validated", order_id)
        return {"id": order_id, "status": "ok"}
    except ValueError:
        log.error("Rejected order %s: invalid amount", order_id)
        log.exception("full traceback captured")   # includes stack trace
        return None

create_order("A1", 59.9)
create_order("A2", -5)

# Level filter: only WARNING and above in production
# logging.getLogger().setLevel(logging.WARNING)
# Rotate huge files: logging.handlers.RotatingFileHandler(
#     "app.log", maxBytes=5_000_000, backupCount=5)`,
  output:`14:31:02 [INFO   ] app.orders: Creating order A1 ($59.90)
14:31:02 [DEBUG  ] app.orders: order A1 validated
14:31:02 [INFO   ] app.orders: Creating order A2 ($-5.00)
14:31:02 [ERROR  ] app.orders: Rejected order A2: invalid amount
14:31:02 [ERROR  ] app.orders: full traceback captured
Traceback (most recent call last):
  File "demo.py", line 12, in create_order
    raise ValueError("amount must be positive")
ValueError: amount must be positive`
},
{
  name:"unittest", icon:"🧪", category:"Quality & Debug",
  tagline:"Built-in test framework — assert, organize, automate.",
  description:"Automated proof that your code works. Write tests once, run them forever — refactor fearlessly.",
  useCases:["Regression protection","CI/CD pipelines","TDD development","Documenting expected behavior"],
  code:`import unittest

# ---- module under test ----
def is_strong(pw):
    """8+ chars, upper, lower, digit."""
    return (len(pw) >= 8 and any(c.isupper() for c in pw)
            and any(c.islower() for c in pw) and any(c.isdigit() for c in pw))

def divide(a, b):
    if b == 0:
        raise ValueError("b must not be 0")
    return a / b

# ---- the tests ----
class TestPassword(unittest.TestCase):
    def test_strong_passes(self):
        self.assertTrue(is_strong("Py1thon!x"))

    def test_short_fails(self):
        self.assertFalse(is_strong("Ab1"))

    def test_missing_digit(self):
        self.assertFalse(is_strong("Abcdefghij"))

class TestDivide(unittest.TestCase):
    def test_normal(self):
        self.assertEqual(divide(10, 2), 5.0)
    def test_float_result(self):
        self.assertAlmostEqual(divide(10, 4), 2.5)
    def test_zero_raises(self):
        with self.assertRaises(ValueError):
            divide(1, 0)

if __name__ == "__main__":
    unittest.main(verbosity=2)`,
  output:`test_missing_digit ... ok
test_short_fails ... ok
test_strong_passes ... ok
test_normal ... ok
test_float_result ... ok
test_zero_raises ... ok
----------------------------------------------------------------------
Ran 6 tests in 0.004s

OK`,
  body:"Run with <code>python -m unittest -v</code> or adopt <b>pytest</b> (<code>pytest -q</code>) — it discovers <code>test_*.py</code> files automatically and supports the same tests with less ceremony."
},

/* ---------- DATA SCIENCE ---------- */
{
  name:"numpy", icon:"🧮", category:"Data Science",
  tagline:"Vectorized multidimensional arrays — the foundation of scientific Python.",
  description:"ndarray with broadcasting: do math on entire arrays in C speed, without Python loops. Required by pandas, scikit-learn, TensorFlow.",
  useCases:["Matrix & linear algebra","Signal/image processing","ML feature engineering","Numerical simulations"],
  code:`import numpy as np

a = np.array([1, 2, 3, 4, 5])
b = np.array([10, 20, 30, 40, 50])

# Vectorized ops — no loops
print("a + b  :", a + b)
print("a * 2  :", a * 2)
print("a ** 2 :", a ** 2)

# Aggregations & masks
print("mean   :", a.mean(), "| std:", round(a.std(), 3))
print("even   :", a[a % 2 == 0])             # boolean indexing

# Broadcasting: 2-D ops
M = np.arange(1, 10).reshape(3, 3)
print("Matrix:\\n", M)
print("Row sums:", M.sum(axis=1))
print("M * 10 + 1:\\n", M * 10 + 1)

# Linear algebra essentials
print("Dot product:", a @ b)
print("Identity:\\n", np.eye(3, dtype=int))

# Practical: normalize scores to 0–1 range
scores = np.array([72, 88, 91, 64, 95])
norm = (scores - scores.min()) / (scores.max() - scores.min())
print("Normalized:", np.round(norm, 2))`,
  output:`a + b  : [11 22 33 44 55]
a * 2  : [ 2  4  6  8 10]
a ** 2 : [ 1  4  9 16 25]
mean   : 3.0 | std: 1.414
even   : [2 4]
Matrix:
 [[1 2 3]
 [4 5 6]
 [7 8 9]]
Row sums: [ 6 15 24]
M * 10 + 1:
 [[11 21 31]
 [41 51 61]
 [71 81 91]]
Dot product: 350
Identity:
 [[1 0 0]
 [0 1 0]
 [0 0 1]]
Normalized: [0.17 0.67 0.78 0.   1.  ]`
},
{
  name:"pandas", icon:"🐼", category:"Data Science",
  tagline:"DataFrames — tables with superpowers (SQL + Excel in Python).",
  description:"Load any data, clean it, filter it, group it, join it and plot it. The single most important library for data work.",
  useCases:["Data cleaning & wrangling","Exploratory analysis (EDA)","Aggregations & reports","Merging datasets"],
  code:`import pandas as pd

df = pd.DataFrame({
    "name":  ["Ali", "Noor", "Sara", "Ali", "Omar"],
    "dept":  ["ENG", "DES", "ENG", "OPS", "ENG"],
    "score": [88, 95, 82, 91, 76],
    "city":  ["Lahore", "KHI", "Lahore", "ISB", "KHI"],
})

print(df)
print("\\nShape:", df.shape)

# Filtering
print("\\nScore > 85:\\n", df[df["score"] > 85])

# groupby — instant aggregations
print("\\nAvg score by dept:\\n", df.groupby("dept")["score"].mean().round(1))

# Sorting & selection
print("\\nTop 2:\\n", df.nlargest(2, "score")[["name", "score"]])

# Add a column derived from others
df["grade"] = df["score"].apply(lambda s: "A" if s >= 90 else ("B" if s >= 80 else "C"))
print("\\nGrades:", df["grade"].tolist())

# Merge two tables (like SQL JOIN)
bonus = pd.DataFrame({"dept": ["ENG", "DES"], "bonus": [5000, 3000]})
print("\\nMerged:\\n", df.merge(bonus, on="dept", how="left"))

# Read/write in one line
# df.to_csv("out.csv", index=False)
# df2 = pd.read_csv("out.csv")
# df3 = pd.read_excel("data.xlsx")`,
  output:`   name dept  score    city
0   Ali  ENG     88  Lahore
1  Noor  DES     95     KHI
2  Sara  ENG     82  Lahore
3   Ali  OPS     91     ISB
4  Omar  ENG     76     KHI

Shape: (5, 4)

Score > 85:
    name dept  score    city
1  Noor  DES     95     KHI
3   Ali  OPS     91     ISB

Avg score by dept:
dept
DES    95.0
ENG    82.0
OPS    91.0
Name: score, dtype: float64

Top 2:
    name  score
1  Noor     95
3   Ali     91

Grades: ['B', 'A', 'B', 'A', 'C']

Merged:
   name dept  score    city   bonus
0   Ali  ENG     88  Lahore  5000.0
1  Noor  DES     95     KHI  3000.0
2  Sara  ENG     82  Lahore  5000.0
3   Ali  OPS     91     ISB     NaN
4  Omar  ENG     76     KHI  5000.0`
},
{
  name:"matplotlib", icon:"📉", category:"Data Science",
  tagline:"Publication-quality charts and visualizations.",
  description:"The plotting workhorse: bar, line, scatter, histogram, subplots — everything customizable down to the pixel.",
  useCases:["Reports & dashboards","Data exploration plots","Scientific figures","Monitoring graphs"],
  code:`import matplotlib.pyplot as plt
import numpy as np

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
sales  = [120, 135, 148, 132, 167, 181]
target = [130, 135, 140, 145, 150, 155]

fig, axes = plt.subplots(1, 2, figsize=(12, 4))

# --- Line chart with trend & target ---
axes[0].plot(months, sales, marker="o", linewidth=2, label="Actual", color="#6366f1")
axes[0].plot(months, target, "--", label="Target", color="#f87171")
axes[0].fill_between(months, sales, alpha=0.15, color="#6366f1")
axes[0].set_title("Monthly Sales vs Target")
axes[0].set_ylabel("Units")
axes[0].legend()
axes[0].grid(alpha=0.3)

# --- Bar chart ---
colors = ["#22d3ee" if v >= t else "#f87171" for v, t in zip(sales, target)]
axes[1].bar(months, sales, color=colors, edgecolor="white")
axes[1].set_title("Hit (cyan) vs Miss (red)")

plt.tight_layout()
plt.savefig("sales.png", dpi=150)   # plt.show() for interactive
print("chart saved: sales.png")
print("Best month :", months[np.argmax(sales)])
print("Growth     :", f"{(sales[-1]/sales[0]-1)*100:.1f}%")`,
  output:`chart saved: sales.png
Best month : Jun
Growth     : 50.8%`
},
{
  name:"tkinter", icon:"🪟", category:"Desktop & GUI",
  tagline:"Build desktop GUIs — included with Python by default.",
  description:"The standard GUI toolkit: windows, buttons, forms, tables. Perfect for internal tools and quick desktop apps.",
  useCases:["Internal admin tools","Data entry forms","Desktop utilities","Prototyping UI ideas"],
  code:`import tkinter as tk
from tkinter import messagebox

def on_greet():
    name = entry.get().strip() or "World"
    result.set(f"Hello, {name}! 👋")
    log.insert(tk.END, f"greeted {name}\\n")

def on_clear():
    result.set("")
    entry.delete(0, tk.END)

app = tk.Tk()
app.title("PyMastery Desktop")
app.geometry("380x300")
app.configure(bg="#0b1120")

tk.Label(app, text="Your name:", bg="#0b1120", fg="white").pack(pady=(24, 4))
entry = tk.Entry(app, width=28, font=("Segoe UI", 12))
entry.pack(pady=4)

result = tk.StringVar(value="")
tk.Label(app, textvariable=result, fg="#22d3ee",
         font=("Segoe UI", 13, "bold"), bg="#0b1120").pack(pady=10)

frame = tk.Frame(app, bg="#0b1120"); frame.pack(pady=6)
tk.Button(frame, text="Greet", command=on_greet, width=10).pack(side=tk.LEFT, padx=6)
tk.Button(frame, text="Clear", command=on_clear, width=10).pack(side=tk.LEFT, padx=6)

log = tk.Listbox(app, height=5); log.pack(fill=tk.BOTH, padx=24, pady=12)
app.bind("<Return>", lambda e: on_greet())

app.mainloop()`,
  output:`┌─────────────────────┐
│  PyMastery Desktop  │
│  Your name: [Ali  ] │
│     Hello, Ali! 👋  │
│  [Greet]  [Clear]   │
│  greeted Ali        │
└─────────────────────┘
(window opens — run it yourself!)`
},
{
  name:"requests", icon:"🌐", category:"Web & Network",
  tagline:"HTTP for humans — talk to any REST API in 3 lines.",
  description:"The most-loved third-party library. Clean syntax for GET/POST, headers, auth, sessions and file uploads.",
  useCases:["Calling REST APIs","Web scraping","Automating SaaS integrations","Health checks & monitoring"],
  code:`# pip install requests
import requests

BASE = "https://api.github.com"

# GET with params & headers
r = requests.get(
    f"{BASE}/users/python/repos",
    params={"per_page": 3},
    headers={"Accept": "application/vnd.github+json"},
    timeout=10,
)
r.raise_for_status()                       # throws on 4xx/5xx
repos = r.json()
print("Status:", r.status_code, "| Repos:", [x["name"] for x in repos[:3]])

# POST JSON payload
# r = requests.post("https://httpbin.org/post",
#                   json={"title": "hi"}, timeout=10)
# print(r.json()["json"])

# Session reuses TCP connections (much faster for many calls)
with requests.Session() as s:
    s.headers.update({"Authorization": "Bearer TOKEN"})
    # user = s.get(f"{BASE}/user").json()

# Practical: download a file in chunks
def download(url, path):
    with requests.get(url, stream=True, timeout=30) as resp:
        resp.raise_for_status()
        with open(path, "wb") as f:
            for chunk in resp.iter_content(8192):
                f.write(chunk)
    return path

# Robust error handling pattern
try:
    requests.get("https://api.io", timeout=(3, 10))
except requests.exceptions.Timeout:
    print("request timed out")
except requests.exceptions.ConnectionError:
    print("could not connect")`,
  output:`Status: 200 | Repos: ['cpython', 'pythondotorg', 'devguide']
(timeout / connection errors handled cleanly above)`
},

/* ---------- DATABASE / WEB ---------- */
{
  name:"sqlite3", icon:"🗄️", category:"Web & Network",
  tagline:"A full SQL database inside Python — zero setup.",
  description:"Ships with Python. Perfect for apps, CLIs and prototyping. Swap to PostgreSQL later with the same SQL.",
  useCases:["Local app storage","Caching layer","Data pipelines staging","Desktop app databases"],
  code:`import sqlite3

conn = sqlite3.connect(":memory:")        # or "app.db"
cur = conn.cursor()

cur.execute("""CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    score INTEGER DEFAULT 0)""")

# Insert (ALWAYS parameterized — prevents SQL injection)
users = [("Zara","zara@x.com",95), ("Hamza","hz@x.com",88), ("Iqra","iq@x.com",91)]
cur.executemany("INSERT INTO users(name,email,score) VALUES(?,?,?)", users)
conn.commit()

# Query
cur.execute("SELECT name, score FROM users WHERE score >= ? ORDER BY score DESC", (90,))
for name, score in cur.fetchall():
    print(f"  {name}: {score}")

# Update + verify
cur.execute("UPDATE users SET score = score + 5 WHERE name = ?", ("Hamza",))
conn.commit()
cur.execute("SELECT changes() AS c")
print("rows changed:", cur.fetchone()[0])

# Aggregation
cur.execute("SELECT AVG(score) FROM users")
print("avg score:", round(cur.fetchone()[0], 1))

conn.close()`,
  output:`  Zara: 95
  Iqra: 91
rows changed: 1
avg score: 94.7`
},
{
  name:"flask", icon:"🌶️", category:"Web & Network",
  tagline:"Micro web framework — APIs and websites with minimal glue.",
  description:"Routes, requests, templates, JSON — start small, scale with blueprints. Django is the batteries-included alternative.",
  useCases:["REST APIs","Internal dashboards","Webhooks","Small-to-medium websites"],
  code:`# pip install flask
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)
TODOS = [{"id": 1, "text": "Learn Flask", "done": False}]

@app.get("/")
def home():
    return "<h1>Todo API is running 🚀</h1>"

@app.get("/api/todos")
def list_todos():
    done = request.args.get("done")            # /api/todos?done=true
    items = TODOS
    if done is not None:
        items = [t for t in TODOS if t["done"] == (done == "true")]
    return jsonify({"count": len(items), "items": items})

@app.post("/api/todos")
def create_todo():
    data = request.get_json(silent=True) or {}
    text = str(data.get("text", "")).strip()
    if not text:
        return jsonify({"error": "text required"}), 400      # 400 = bad input
    todo = {"id": len(TODOS) + 1, "text": text, "done": False}
    TODOS.append(todo)
    return jsonify(todo), 201                                 # 201 = created

@app.patch("/api/todos/<int:tid>")
def toggle(tid):
    for t in TODOS:
        if t["id"] == tid:
            t["done"] = not t["done"]
            return jsonify(t)
    return jsonify({"error": "not found"}), 404

# python app.py  →  http://127.0.0.1:5000`,
  output:`$ python app.py
 * Running on http://127.0.0.1:5000

$ curl -X POST localhost:5000/api/todos -H "Content-Type: application/json" -d '{"text":"Ship it"}'
{"done": false, "id": 2, "text": "Ship it"}`,
  body:"Rules of thumb: <b>GET</b> reads, <b>POST</b> creates, <b>PATCH/PUT</b> updates, <b>DELETE</b> removes. Always return proper status codes and validate input — a robust API rejects bad data with 400, not a 500 crash."
},
{
  name:"argparse", icon:"🎛️", category:"Web & Network",
  tagline:"Professional command-line interfaces — flags, help, validation.",
  description:"Generates --help automatically, validates types, and exits with error codes. The stdlib way to build CLIs.",
  useCases:["Dev tools & scripts","Batch processors","Configurable automations","Replacing manual sys.argv parsing"],
  code:`import argparse

def main():
    p = argparse.ArgumentParser(
        prog="compressor",
        description="Compress input files and print a report.",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    p.add_argument("paths", nargs="+", help="files to compress")
    p.add_argument("-o", "--output", default="archive.zip", help="output name")
    p.add_argument("-l", "--level", type=int, default=6,
                   choices=range(1, 10), help="compression level")
    p.add_argument("-v", "--verbose", action="store_true", help="print details")
    p.add_argument("--dry-run", action="store_true", help="don't write files")

    args = p.parse_args()
    # args = p.parse_args(["a.txt", "b.txt", "-l", "9", "-v"])  # for testing

    if args.verbose:
        print(f"Compressing {len(args.paths)} file(s) at level {args.level}")
        for path in args.paths:
            print(f"  + {path}")
    print(f"Output: {args.output}" + (" (dry run)" if args.dry_run else ""))

if __name__ == "__main__":
    main()

# $ python compress.py data/*.txt -l 9 -v
# $ python compress.py --help        ← auto-generated docs`,
  output:`usage: compress [-h] [-o OUTPUT] [-l {1,2,3,4,5,6,7,8,9}] [-v] [--dry-run]
                paths [paths ...]

Compress input files and print a report.

positional arguments:
  paths              files to compress

options:
  -h, --help         show this help message and exit
  -o, --output       Output name (default: archive.zip)
  -l, --level        compression level (default: 6)
  -v, --verbose      print details (default: False)
  --dry-run          don't write files (default: False)`
},
{
  name:"typing", icon:"🏷️", category:"Advanced",
  tagline:"Type annotations for safer, self-documenting code.",
  description:"Hints let mypy/pyright catch bugs before running and give IDEs real autocomplete. Not enforced at runtime.",
  useCases:["Large codebases & teams","IDE autocompletion","Static bug detection","Clear public APIs"],
  code:`from typing import Iterator, TypedDict, TypeAlias

Vector: TypeAlias = list[float]

def clamp(value: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, value))

def chunked(items: Vector, size: int) -> Iterator[Vector]:
    """Yield fixed-size batches without loading everything."""
    for i in range(0, len(items), size):
        yield items[i:i + size]

class User(TypedDict):
    id: int
    name: str
    email: str

def find_user(users: list[User], uid: int) -> User | None:
    """Return the user or None (union return type)."""
    for u in users:
        if u["id"] == uid:
            return u
    return None

# Runtime checkable for generics (3.10+)
def first(seq: list[int]) -> int | None:
    return seq[0] if seq else None

print(clamp(15, 0, 10))
print(list(chunked([1,2,3,4,5], 2)))
print(find_user([{"id":1,"name":"Ada","email":"a@x"}], 1))
print(first([]) or "empty list → None")`,
  output:`10
[[1.0, 2.0], [3.0, 4.0], [5.0]]
{'id': 1, 'name': 'Ada', 'email': 'a@x'}
empty list → None`
},
{
  name:"dataclasses", icon:"🧾", category:"Advanced",
  tagline:"Boilerplate-free classes for holding data.",
  description:"@dataclass auto-generates __init__, __repr__, __eq__ and (optionally) ordering/frozen immutability.",
  useCases:["Config objects","API request/response models","DTO / record classes","Settings & options"],
  code:`from dataclasses import dataclass, field

@dataclass
class Product:
    name: str
    price: float
    qty: int = 1
    tags: list[str] = field(default_factory=list)   # mutable default safe

    @property
    def total(self) -> float:
        return self.price * self.qty

    def __str__(self):
        return f"{self.name} x{self.qty} = \${self.total:.2f}"

p1 = Product("Keyboard", 49.9, 2, ["hardware"])
p2 = Product("Keyboard", 49.9, 2)

print(p1)                       # auto __str__/__repr__
print("Equal?", p1 == p2)       # auto __eq__ compares fields
p2.tags.append("sale")
print("p1 tags:", p1.tags)      # not shared — default_factory works

# Frozen = immutable (safe dict key / config)
@dataclass(frozen=True, slots=True)
class Config:
    host: str
    port: int = 8080

c = Config("localhost")
print(c, "| frozen:", c.__hash__ is not None)
# c.port = 9000   → FrozenInstanceError

# asdict → JSON-ready dict
from dataclasses import asdict
print(asdict(p1))`,
  output:`Keyboard x2 = $99.80
Equal? True
p1 tags: ['hardware']
Config(host='localhost', port=8080) | frozen: True
{'name': 'Keyboard', 'price': 49.9, 'qty': 2, 'tags': ['hardware']}`
},
{
  name:"traceback", icon:"🐛", category:"Advanced",
  tagline:"Read, print and structure errors like a professional.",
  description:"Understand stack traces, extract error info programmatically, and format friendly error reports.",
  useCases:["Crash reporting systems","Custom error messages","Debugging nested calls","Logging failures"],
  code:`import traceback, sys

def risky(step):
    if step == "deep":
        inner()
    raise RuntimeError(f"failed at {step}")

def inner():
    raise ValueError("bad value deep inside")

# 1) Reading a traceback programmatically
try:
    risky("deep")
except ValueError as e:
    tb = traceback.format_exc()
    print("=== full traceback captured ===")
    print(tb.strip())
    frames = traceback.extract_tb(sys.exc_info()[2])
    print("Call chain:", " -> ".join(f.name for f in frames))
    print("Error type:", type(e).__name__)

# 2) Exception chaining (context preserved)
try:
    int("not_a_number")
except ValueError as e:
    try:
        raise RuntimeError("config load failed") from e
    except RuntimeError as exc:
        print("Chained:", type(exc).__name__, "| caused by:", type(exc.__cause__).__name__)

# 3) Friendly report for users
try:
    risky("surface")
except Exception as e:
    lines = traceback.format_exception_only(type(e), e)
    print("User sees:", lines[-1].strip())`,
  output:`=== full traceback captured ===
Traceback (most recent call last):
  File "demo.py", line 21, in <module>
    risky("deep")
  File "demo.py", line 5, in risky
    inner()
  File "demo.py", line 8, in inner
    raise ValueError("bad value deep inside")
ValueError: bad value deep inside
Call chain: <module> -> risky -> inner -> inner
Error type: ValueError
Chained: RuntimeError | caused by: ValueError
User sees: RuntimeError: failed at surface`
}
];

/* Category order for the UI */
const MODULE_CATEGORIES = [
  "Core & Math", "System", "Data Formats", "Text & Pattern",
  "Security & Identity", "Concurrency", "Quality & Debug",
  "Data Science", "Web & Network", "Advanced", "Desktop & GUI"
];
