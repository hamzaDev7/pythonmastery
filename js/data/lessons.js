/* ============================================================
   LESSONS — Full Python curriculum: Basic → Pro
   Each lesson: id, level, track, title, duration, summary,
               keypoints[], code, output, body(optional html)
   ============================================================ */

const LESSONS = [
/* ============ 1. BEGINNER ============ */
{
  id:"l01", level:"beginner", track:"Foundations", title:"Installing Python & Your First Program",
  duration:"20 min",
  summary:"Set up your environment, understand the interpreter, and write/run your very first Python script.",
  keypoints:[
    "Download Python from python.org and always check “Add to PATH” on install.",
    "Verify installation with `python --version` in your terminal.",
    "A file ending in .py is a Python script — run it with `python filename.py`.",
    "The REPL (interactive shell) is great for quick experiments: just type `python`."
  ],
  code:`# hello.py — the classic first program
print("Hello, Python! 🐍")
print("Welcome to PyMastery.")

# You can do math directly too
print(2 + 3)        # addition
print(10 / 4)       # division always returns float
print(10 // 4)      # floor (integer) division
print(2 ** 10)      # exponent (power)

# Multiple values in one print
name = "Developer"
print("Status:", name, "is ready.")`,
  output:`Hello, Python! 🐍
Welcome to PyMastery.
5
2.5
2
1024
Status: Developer is ready.`
},
{
  id:"l02", level:"beginner", track:"Foundations", title:"Variables & Data Types",
  duration:"25 min",
  summary:"Store data in variables and master Python's core data types: int, float, str, bool, None.",
  keypoints:[
    "Variables are created by assignment — no declaration keyword needed.",
    "Python is dynamically typed: the type follows the value, not the name.",
    "Use `type(x)` to inspect the type of any object.",
    "Naming rules: letters, digits, _ ; cannot start with a digit ; snake_case by convention."
  ],
  code:`# Variable assignment
age = 25                 # int
height = 5.9             # float
is_python_fun = True     # bool
message = "I love code"  # str
nothing = None           # NoneType (absence of a value)

print(type(age), type(height), type(is_python_fun))
print(type(message), type(nothing))

# Multiple assignment & swapping
a, b = 10, 20
a, b = b, a
print("Swapped:", a, b)

# Type conversion
n = int("42")        # str -> int
f = float("3.14")    # str -> float
s = str(100)         # int -> str
print(n + 1, f * 2, s + "!")`,
  output:`<class 'int'> <class 'float'>
<class 'bool'>
<class 'str'> <class 'NoneType'>
Swapped: 20 10
43 6.28 100!`
},
{
  id:"l03", level:"beginner", track:"Foundations", title:"Operators & Expressions",
  duration:"20 min",
  summary:"Arithmetic, comparison, logical, assignment and membership operators — the building blocks of logic.",
  keypoints:[
    "Arithmetic: + - * / // % **  (note: / always makes a float).",
    "Comparison returns bool: == != > < >= <=.",
    "Logical: and, or, not — Python short-circuits.",
    "Membership: `in` / `not in` work on strings, lists, tuples, dicts."
  ],
  code:`x, y = 17, 5

print("Add:", x + y, "| Sub:", x - y, "| Mul:", x * y)
print("Div:", x / y, "| Floor:", x // y, "| Mod:", x % y)
print("Pow:", x ** 2)

# Comparison
print("x > y ?", x > y, "| x == y ?", x == y)

# Logical
print((x > 10) and (y > 3))
print((x > 10) or (y > 10))
print(not (x == y))

# Membership
print(17 in [1, 5, 17])
print("th" in "python")   # substring check

# Walrus operator := (Python 3.8+) — assign inside an expression
data = [1, 2, 3, 4]
if (n := len(data)) > 3:
    print("Length", n, "is more than 3")`,
  output:`Add: 22 | Sub: 12 | Mul: 85
Div: 3.4 | Floor: 3 | Mod: 2
Pow: 289
x > y ? True | x == y ? False
True
False
False
True
True
Length 4 is more than 3`
},
{
  id:"l04", level:"beginner", track:"Foundations", title:"Strings & String Formatting",
  duration:"30 min",
  summary:"Slice, search, transform and format text — strings are everywhere in real Python work.",
  keypoints:[
    "Strings are immutable sequences — every method returns a NEW string.",
    "Slicing: s[start:stop:step] — negative indexes count from the end.",
    "f-strings (Python 3.6+) are the modern formatting choice: f'{value:.2f}'.",
    "Useful methods: split, join, strip, replace, find, startswith, upper/lower."
  ],
  code:`s = "  Python is Awesome  "

# Core methods
print(s.strip())            # remove whitespace
print(s.strip().lower())
print(s.replace("Python", "JavaScript"))
print("a,b,c".split(","))
print("-".join(["2026", "10", "19"]))

# Slicing
word = "PyMastery"
print(word[0:2], word[-3:], word[::-1])   # Py try yratsaMyP

# f-string formatting
price, qty = 19.997, 3
print(f"Total: \${price * qty:.2f}")      # 2 decimals
print(f"{'left':<12}|{'center':^12}|{'right':>12}")
name = "Ada"; print(f"Hello {name.upper()}, you are {25 // 5} steps from pro.")

# Escapes & raw strings
print("Tab:\\tNewline:\\nDone")
print(r"C:\\users\\new_folder")           # raw: backslashes kept`,
  output:`Python is Awesome
python is awesome
  JavaScript is Awesome
['a', 'b', 'c']
2026-10-19
Py try yratsaMyP
Total: $60.00
left        |   center    |        right
Hello ADA, you are 5 steps from pro.
Tab:	Newline:
Done
C:\\users\\new_folder`
},
{
  id:"l05", level:"beginner", track:"Foundations", title:"Input, Type Conversion & User Interaction",
  duration:"18 min",
  summary:"Read from the console, validate data, and convert between types safely.",
  keypoints:[
    "`input(prompt)` always returns a str — wrap it in int()/float() for math.",
    "Combine input() with f-strings for clean prompts.",
    "Guard conversions with try/except once you reach the error-handling chapter.",
    "bool('') is False but bool('anything') is True — careful with string truthiness."
  ],
  code:`# --- Example (type into console) ---
# name  = input("Your name: ")
# age   = int(input("Your age: "))
# price = float(input("Price: "))

# Simulated for demonstration:
name, age, price = "Sara", 24, 49.5

bill = price * 1.1
print(f"{name}, you are {age} years old.")
print(f"Price + 10% tax = {bill:.2f}")

# Truthiness quick reference
print(bool(""), bool("hi"), bool(0), bool([]), bool([1]))`,
  output:`Sara, you are 24 years old.
Price + 10% tax = 54.45
False True False False True`
},

/* ============ 2. CONTROL FLOW ============ */
{
  id:"l06", level:"beginner", track:"Control Flow", title:"Conditional Statements",
  duration:"25 min",
  summary:"Branch logic with if / elif / else, plus the modern structural pattern matching (match/case).",
  keypoints:[
    "Indentation defines blocks in Python — use 4 spaces consistently.",
    "elif = else if ; you can chain many branches.",
    "Ternary: value_if_true if condition else value_if_false.",
    "`match/case` (Python 3.10+) is powerful pattern matching for structured data."
  ],
  code:`score = 87

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
print("Grade:", grade)

# Ternary one-liner
status = "pass" if score >= 60 else "fail"
print("Status:", status)

# Nested conditions with combined logic
age, has_id = 20, True
if age >= 18 and has_id:
    print("Entry allowed")

# match / case (Python 3.10+)
cmd = "print"
match cmd:
    case "print":  action = "show output"
    case "save":   action = "write to disk"
    case "quit":   action = "exit"
    case _:        action = "unknown"   # _ = default
print("Action:", action)`,
  output:`Grade: B
Status: pass
Entry allowed
Action: show output`
},
{
  id:"l07", level:"beginner", track:"Control Flow", title:"Loops: for & while",
  duration:"30 min",
  summary:"Repeat work efficiently with for-loops over iterables and while-loops with conditions.",
  keypoints:[
    "for loops iterate over any iterable (list, string, range, dict…).",
    "range(start, stop, step) generates number sequences.",
    "while runs until its condition becomes False.",
    "Use enumerate() for indexes and zip() to walk two lists together."
  ],
  code:`# for + range
for i in range(1, 6):
    print(i, end=" ")
print()

# Loop with index
fruits = ["apple", "banana", "cherry"]
for i, f in enumerate(fruits, start=1):
    print(f"{i}. {f}")

# while with a counter
n, total = 1, 0
while n <= 10:
    total += n
    n += 1
print("Sum 1..10 =", total)

# zip two lists
names = ["Ali", "Noor"]
scores = [88, 95]
for name, sc in zip(names, scores):
    print(name, "->", sc)

# Nested loop: multiplication table
for r in range(1, 4):
    print(" ".join(str(r * c) for c in range(1, 4)))`,
  output:`1 2 3 4 5
1. apple
2. banana
3. cherry
Sum 1..10 = 55
Ali -> 88
Noor -> 95
1 2 3
2 4 6
3 6 9`
},
{
  id:"l08", level:"beginner", track:"Control Flow", title:"break, continue, pass & for-else",
  duration:"18 min",
  summary:"Control loop flow precisely: exit early, skip iterations, and detect completed loops.",
  keypoints:[
    "break exits the innermost loop immediately.",
    "continue skips to the next iteration.",
    "pass is a placeholder that does nothing (useful in empty blocks).",
    "for...else: the else runs only if the loop finished WITHOUT break."
  ],
  code:`# break — stop when found
for n in [3, 7, 2, 9, 4]:
    if n % 2 == 0:
        print("First even:", n)
        break

# continue — skip negatives
total = 0
for n in [-5, 3, -2, 8, -1, 6]:
    if n < 0:
        continue
    total += n
print("Positive sum:", total)

# for...else — search pattern
primes = [2, 3, 5, 7, 11]
target = 9
for p in primes:
    if p == target:
        print("Found")
        break
else:
    print(f"{target} is not in the list")   # runs: no break happened`,
  output:`First even: 2
Positive sum: 17
9 is not in the list`
},

/* ============ 3. DATA STRUCTURES ============ */
{
  id:"l09", level:"beginner", track:"Data Structures", title:"Lists — Ordered & Mutable",
  duration:"30 min",
  summary:"Create, add, remove, sort and search elements in Python's most used container.",
  keypoints:[
    "Lists are ordered, changeable, and allow duplicates.",
    "Key methods: append, extend, insert, remove, pop, sort, reverse, count.",
    "Slicing works: lst[1:4], lst[::-1] reverses a copy.",
    "list.sort() modifies in place; sorted(list) returns a new list."
  ],
  code:`nums = [45, 12, 89, 3, 67]

# Adding
nums.append(100)            # add to end
nums.insert(0, 7)           # add at index
nums.extend([55, 66])       # add many

# Removing
nums.remove(12)             # by value
last = nums.pop()           # remove & return last
print("List:", nums, "| popped:", last)

# Searching & sorting
print("Index of 89:", nums.index(89))
print("Count of 66:", nums.count(66))
nums.sort(reverse=True)
print("Sorted desc:", nums)

# Useful built-ins
print("Max:", max(nums), "Min:", min(nums), "Sum:", sum(nums))

# Copying matters!
original = [1, 2, 3]
clone = original.copy()     # or list(original) / original[:]
clone.append(4)
print("original:", original, "| clone:", clone)`,
  output:`List: [7, 45, 89, 3, 67, 100, 55] | popped: 66
Index of 89: 2
Count of 66: 1
Sorted desc: [100, 89, 67, 55, 45, 7, 3]
Max: 100 Min: 3 Sum: 366
original: [1, 2, 3] | clone: [1, 2, 3, 4]`
},
{
  id:"l10", level:"beginner", track:"Data Structures", title:"Tuples, Sets & frozenset",
  duration:"25 min",
  summary:"Immutable sequences (tuples) and unique collections (sets) — and when to pick each.",
  keypoints:[
    "Tuples are immutable & faster — perfect for fixed records and dict keys.",
    "Sets store UNIQUE values — ideal for dedup and membership tests (O(1)).",
    "Set math: | union, & intersection, - difference, ^ symmetric difference.",
    "Unpacking works: first, *rest, last = my_tuple."
  ],
  code:`# Tuple — immutable
point = (3, 7)
x, y = point
print("x:", x, "y:", y)

coords = (1, 2, 3, 4, 5)
first, *middle, last = coords
print(first, middle, last)

# Tuple as dict key
locations = {(40.7, -74.0): "NYC", (51.5, -0.1): "London"}
print(locations[(51.5, -0.1)])

# Sets
a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7}
print("Union:", a | b)
print("Intersection:", a & b)
print("Difference:", a - b)
print("Sym diff:", a ^ b)

# Deduplicate instantly
data = [1, 1, 2, 3, 3, 3, 4]
print("Unique:", sorted(set(data)))`,
  output:`x: 3 y: 7
1 [2, 3, 4] 5
London
Union: {1, 2, 3, 4, 5, 6, 7}
Intersection: {4, 5}
Difference: {1, 2, 3}
Sym diff: {1, 2, 3, 6, 7}
Unique: [1, 2, 3, 4]`
},
{
  id:"l11", level:"beginner", track:"Data Structures", title:"Dictionaries — Key/Value Power",
  duration:"30 min",
  summary:"Store and look up data by key with dict — Python's hashmap and backbone of JSON handling.",
  keypoints:[
    "dict = {key: value} — keys must be hashable (str, int, tuple).",
    "Access safely with .get(key, default) to avoid KeyError.",
    "Loop .items() for pairs, .keys() and .values() separately.",
    "Merging: d1 | d2 (3.9+), d1.update(d2), or {**d1, **d2}."
  ],
  code:`student = {"name": "Hina", "age": 21, "gpa": 3.8}

# Access
print(student["name"])                     # direct (KeyError if missing)
print(student.get("city", "N/A"))          # safe with default

# Add / update
student["city"] = "Lahore"
student.update({"age": 22, "major": "CS"})
print(student)

# Iterate
for k, v in student.items():
    print(f"  {k}: {v}")

# Comprehension → dict of squares
squares = {n: n ** 2 for n in range(1, 6)}
print(squares)

# Grouping with defaultdict-like pattern
words = ["ant", "bee", "ace", "bat"]
groups = {}
for w in words:
    groups.setdefault(w[0], []).append(w)
print(groups)

# Merge two dicts (3.9+)
print({"a": 1} | {"b": 2})`,
  output:`Hina
N/A
{'name': 'Hina', 'age': 22, 'gpa': 3.8, 'city': 'Lahore', 'major': 'CS'}
  name: Hina
  age: 22
  gpa: 3.8
  city: Lahore
  major: CS
{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
{'a': ['ant', 'ace'], 'b': ['bee', 'bat']}
{'a': 1, 'b': 2}`
},
{
  id:"l12", level:"beginner", track:"Data Structures", title:"Comprehensions — Concise Collections",
  duration:"25 min",
  summary:"Build lists, dicts and sets in a single expressive line with for/if logic inside.",
  keypoints:[
    "Pattern: [expr for x in iter if condition].",
    "Dict comprehension: {k: v for ...} ; set comprehension: {expr for ...}.",
    "Nested comprehension works but keep it readable — over 2 levels, use loops.",
    "Comprehensions are faster than append-loops (optimized internally)."
  ],
  code:`# List comprehension
nums = [1, 2, 3, 4, 5, 6, 7, 8]
evens = [n for n in nums if n % 2 == 0]
squares = [n ** 2 for n in nums]
print("Evens:", evens)
print("Squares:", squares)

# With index and condition
words = ["hi", "there", "ok", "python"]
long = [w.upper() for w in words if len(w) > 2]
print(long)

# Dict comprehension
prices = {"apple": 3, "banana": 1, "cherry": 5}
half = {k: v / 2 for k, v in prices.items()}
print(half)

# Set comprehension — unique lengths
unique_lens = {len(w) for w in words}
print("Unique lengths:", unique_lens)

# Nested: flatten a matrix
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [x for row in matrix for x in row]
print("Flattened:", flat)`,
  output:`Evens: [2, 4, 6, 8]
Squares: [1, 4, 9, 16, 25, 36, 49, 64]
['HI', 'THERE', 'PYTHON']
{'apple': 1.5, 'banana': 0.5, 'cherry': 2.5}
Unique lengths: {2, 5, 4, 6}
Flattened: [1, 2, 3, 4, 5, 6]`
},

/* ============ 4. FUNCTIONS & OOP ============ */
{
  id:"l13", level:"intermediate", track:"Functions", title:"Functions — def, Parameters & Return",
  duration:"30 min",
  summary:"Package logic into reusable functions with default values, multiple returns and docstrings.",
  keypoints:[
    "def name(params): ... ; call with name(args).",
    "Return with `return` — no return means the function returns None.",
    "Default args must come AFTER non-default args.",
    "Return multiple values as a tuple: return a, b → unpack with x, y = f()."
  ],
  code:`def greet(name, greeting="Hello"):
    """Return a greeting message for someone."""
    return f"{greeting}, {name}!"

print(greet("Ada"))
print(greet("Bob", "Hi"))

# Multiple return values
def stats(nums):
    return min(nums), max(nums), sum(nums) / len(nums)

lo, hi, avg = stats([4, 8, 15, 16, 23, 42])
print(f"min={lo} max={hi} avg={avg:.2f}")

# Early return pattern
def is_valid_age(age):
    if not isinstance(age, int):
        return False
    if age < 0 or age > 130:
        return False
    return True

print(is_valid_age(30), is_valid_age(-4))

# None check
result = is_valid_age(200)
print("Valid?" , "yes" if result else "no")`,
  output:`Hello, Ada!
Hi, Bob!
min=4 max=42 avg=18.00
True False
Valid? no`
},
{
  id:"l14", level:"intermediate", track:"Functions", title:"*args, **kwargs, Scope & Lambda",
  duration:"30 min",
  summary:"Write flexible functions accepting any number of arguments, understand scoping, and use tiny anonymous functions.",
  keypoints:[
    "*args gathers extra positional args into a tuple.",
    "**kwargs gathers extra keyword args into a dict.",
    "LEGB rule: Local → Enclosing → Global → Built-in resolution order.",
    "lambda is best for short one-liners (sorted key=, map, filter)."
  ],
  code:`# *args and **kwargs
def build_profile(first, last, **details):
    profile = {"first": first, "last": last}
    profile.update(details)
    return profile

p = build_profile("Linus", "T", language="Python", level="pro")
print(p)

def total(*numbers, tax=0.0):
    s = sum(numbers)
    return s * (1 + tax)

print(total(10, 20, 30), total(10, 20, tax=0.1))

# Unpacking a dict into kwargs
opts = {"tax": 0.2}
print(total(100, **opts))

# lambda + sorted
students = [("Ali", 88), ("Noor", 95), ("Sara", 82)]
print(sorted(students, key=lambda s: s[1], reverse=True))

# map & filter
nums = [1, 2, 3, 4, 5, 6]
print(list(map(lambda n: n * n, nums)))
print(list(filter(lambda n: n % 2 != 0, nums)))

# Scope demo
count = 10                     # global
def demo():
    count = 5                  # local shadows global
    return count
print(demo(), count)`,
  output:`{'first': 'Linus', 'last': 'T', 'language': 'Python', 'level': 'pro'}
60 66.0
120.00000000000001
[('Noor', 95), ('Ali', 88), ('Sara', 82)]
[1, 4, 9, 16, 25, 36]
[1, 3, 5]
5 10`
},
{
  id:"l15", level:"intermediate", track:"Functions", title:"Modules, Packages & the Import System",
  duration:"25 min",
  summary:"Split code across files, create your own packages, and understand how import really works.",
  keypoints:[
    "A module = a .py file. A package = a folder with __init__.py.",
    "import math / from math import sqrt / import math as m.",
    "sys.path controls where Python searches for modules.",
    'Use `if __name__ == "__main__":` to guard runnable code.',
    "Third-party libs install with: pip install package-name."
  ],
  code:`# ---------- utils.py ----------
# def add(a, b):
#     return a + b

# ---------- main.py ----------
import math
from math import pi, sqrt
import random as rnd

print(round(pi, 4), sqrt(144))
print(rnd.randint(1, 6))          # dice roll

# Importing your own module
# from utils import add
# print(add(2, 3))

# The __main__ guard — code below only runs when file is executed directly
if __name__ == "__main__":
    print("Running as a script, not imported")

# Inspecting a module
import sys
print("Python version:", sys.version.split()[0])
print("Module found:", "math" in sys.modules)`,
  output:`3.1416 12.0
6
Running as a script, not imported
Python version: 3.12.0
Module found: True`
},
{
  id:"l16", level:"intermediate", track:"Files & Errors", title:"File Handling — Read, Write, Append",
  duration:"30 min",
  summary:"Work with text/CSV/JSON files safely using the with-statement (auto-close resources).",
  keypoints:[
    "Modes: 'r' read, 'w' overwrite, 'a' append, 'r+' read+write.",
    "`with open(...) as f:` guarantees the file closes even if an error occurs.",
    "f.read() / f.readlines() / iterate the file object for memory efficiency.",
    "For JSON use json.load() and json.dump() from the json module."
  ],
  code:`import json, os

path = "notes.txt"

# Write
with open(path, "w", encoding="utf-8") as f:
    f.write("First line\\n")
    f.writelines(["Second line\\n", "Third line\\n"])

# Read whole file
with open(path, "r", encoding="utf-8") as f:
    content = f.read()
print("--- file content ---")
print(content, end="")

# Append
with open(path, "a", encoding="utf-8") as f:
    f.write("Appended line\\n")

# Count words line by line (memory friendly)
with open(path) as f:
    lines = f.readlines()
    words = sum(len(l.split()) for l in lines)
print("Lines:", len(lines), "| Words:", words)

# JSON round-trip
data = {"course": "Python Pro", "lessons": 30, "tags": ["web", "ai"]}
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)
with open("data.json") as f:
    loaded = json.load(f)
print("Loaded back:", loaded["course"])`,
  output:`--- file content ---
First line
Second line
Third line
Lines: 4 | Words: 7
Loaded back: Python Pro`
},
{
  id:"l17", level:"intermediate", track:"Files & Errors", title:"Exception Handling — try / except / finally",
  duration:"30 min",
  summary:"Write resilient programs: catch specific errors, raise your own, and clean up with finally.",
  keypoints:[
    "Catch SPECIFIC exceptions (ValueError, KeyError, FileNotFoundError) — never bare except.",
    "else runs when NO exception happened; finally always runs (cleanup).",
    "raise ValueError('msg') creates your own errors.",
    "Custom errors: class AppError(Exception): pass."
  ],
  code:`def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: cannot divide by zero")
        return None
    except TypeError as e:
        print("Bad type:", e)
        return None
    else:
        print("Success — no exception occurred")
        return result
    finally:
        print("finally: always executed")

print(divide(10, 4))
print(divide(5, 0))

# Safe file read
try:
    with open("missing.txt") as f:
        data = f.read()
except FileNotFoundError:
    print("File not found, creating it instead")
    with open("missing.txt", "w") as f:
        f.write("fresh file")
finally:
    print("cleanup done")

# Raise & custom exception
class InsufficientFunds(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"Need {amount}, have {balance}")

try:
    raise InsufficientFunds(100, 250)
except InsufficientFunds as e:
    print("Custom error caught:", e)`,
  output:`Success — no exception occurred
2.5
finally: always executed
Success — no exception occurred
None
finally: always executed
Error: cannot divide by zero
None
finally: always executed
File not found, creating it instead
cleanup done
Custom error caught: Need 250, have 100`
},
{
  id:"l18", level:"intermediate", track:"OOP", title:"Classes & Objects — OOP Basics",
  duration:"35 min",
  summary:"Model real-world things with classes: attributes, methods, constructors and instances.",
  keypoints:[
    "class defines a blueprint; an object is a concrete instance of it.",
    "__init__ is the constructor — runs when an object is created.",
    "self refers to the current instance and must be the first parameter.",
    "Use __str__ for a human-readable print() representation."
  ],
  code:`class BankAccount:
    bank = "PyBank"                       # class attribute (shared)

    def __init__(self, owner, balance=0):
        self.owner = owner                # instance attributes
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
        return self.balance

    def __str__(self):
        return f"[{self.bank}] {self.owner}: \${self.balance:.2f}"

acc = BankAccount("Ayesha", 500)
acc.deposit(250)
acc.withdraw(100)
print(acc)
print("Type:", type(acc).__name__)

# Objects are independent
acc2 = BankAccount("Omar")
print(acc2)`,
  output:`[PyBank] Ayesha: $650.00
Type: BankAccount
[PyBank] Omar: $0.00`
},
{
  id:"l19", level:"intermediate", track:"OOP", title:"Inheritance, Polymorphism & Encapsulation",
  duration:"35 min",
  summary:"Build class hierarchies, override behavior, and protect internal state with private members.",
  keypoints:[
    "class Child(Parent): inherits attributes and methods.",
    "super().__init__(...) reuses the parent constructor.",
    "Polymorphism: same method name, different behavior per class.",
    "Encapsulation: _protected (convention) and __private (name-mangled)."
  ],
  code:`class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return f"{self.name}: Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name}: Meow!"

# Polymorphism through a common interface
for a in [Dog("Rex"), Cat("Misu"), Animal("?")]:
    print(a.speak())

# Encapsulation
class Employee:
    def __init__(self, salary):
        self.__salary = salary            # private (name mangled)

    def get_salary(self):
        return self.__salary

e = Employee(5000)
print("Salary:", e.get_salary())
# print(e.__salary)  -> AttributeError: _Employee__salary`,
  output:`Rex: Woof!
Misu: Meow?
...: ...
Salary: 5000`
},
{
  id:"l20", level:"advanced", track:"OOP", title:"Properties, Classmethods & Staticmethods",
  duration:"25 min",
  summary:"Control attribute access with @property and design flexible class-level APIs.",
  keypoints:[
    "@property turns a method into attribute-like access (getter), @x.setter validates writes.",
    "@classmethod receives cls — useful for alternative constructors (from_dict).",
    "@staticmethod receives neither — it's just namespaced logic.",
    "Prefer @property over get_x()/set_x() in Python."
  ],
  code:`class Circle:
    def __init__(self, radius):
        self.radius = radius              # goes through the setter

    @property
    def radius(self):
        return self._r

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("radius cannot be negative")
        self._r = value

    @property
    def area(self):                       # read-only computed attr
        return 3.14159 * self._r ** 2

    @classmethod
    def from_diameter(cls, d):
        return cls(d / 2)

    @staticmethod
    def is_square(w, h):
        return w == h

c = Circle(5)
print("Area:", round(c.area, 2))
# c.radius = -1        # would raise ValueError
c2 = Circle.from_diameter(10)
print("Radius from diameter:", c2.radius)
print("Is 4x4 square?", Circle.is_square(4, 4))`,
  output:`Area: 78.54
Radius from diameter: 5.0
Is 4x4 square? True`
},
{
  id:"l21", level:"advanced", track:"Functional", title:"Decorators — Extend Functions Cleanly",
  duration:"35 min",
  summary:"Wrap functions with cross-cutting logic like logging, timing, caching and access control.",
  keypoints:[
    "A decorator is a function that takes a function and returns a new one.",
    "@syntax is sugar for: my_func = decorator(my_func).",
    "Always use functools.wraps to preserve the original name/docstring.",
    "Real uses: logging, auth checks, retries, caching (functools.lru_cache)."
  ],
  code:`import time
from functools import wraps

def timer(func):
    """Measure execution time of a function."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"[timer] {func.__name__} took {elapsed*1000:.1f} ms")
        return result
    return wrapper

def require_positive(func):
    @wraps(func)
    def wrapper(n):
        if n <= 0:
            raise ValueError("needs a positive number")
        return func(n)
    return wrapper

@timer
@require_positive            # decorators stack bottom-up
def square(n):
    """Square a number."""
    time.sleep(0.05)
    return n * n

print(square(7))
print("Name preserved:", square.__name__)

# Decorator with arguments (factory)
def repeat(n):
    def deco(func):
        @wraps(func)
        def wrapper(*a, **k):
            return [func(*a, **k) for _ in range(n)]
        return wrapper
    return deco

@repeat(3)
def hello():
    return "hey"
print(hello())`,
  output:`[timer] square took 50.2 ms
49
Name preserved: square
['hey', 'hey', 'hey']`
},
{
  id:"l22", level:"advanced", track:"Functional", title:"Generators & Iterators — Lazy Data",
  duration:"30 min",
  summary:"Process huge or infinite data streams with constant memory using yield.",
  keypoints:[
    "A generator yields values one at a time — nothing is stored in memory.",
    "yield pauses the function; next() resumes it exactly where it stopped.",
    "Generator expressions: (expr for x in iter) — like list comps but lazy.",
    "Use itertools for fast composable generator tools."
  ],
  code:`# Generator function
def countdown(n):
    while n > 0:
        yield n
        n -= 1

print(list(countdown(5)))

# Memory-efficient: processes one item at a time
def read_large(path):
    with open(path) as f:
        for line in f:
            yield line.strip()

# Infinite generator
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Take only what you need — no cost for the rest
fib = fibonacci()
first10 = [next(fib) for _ in range(10)]
print("Fibonacci:", first10)

# Generator expression (lazy)
total = sum(n * n for n in range(1_000_000))   # O(1) memory
print("Sum of squares 0..999999 =", total)

# Consumer pipeline
def even(nums):
    return (n for n in nums if n % 2 == 0)
def squared(nums):
    return (n ** 2 for n in nums)

print(list(squared(even(range(10)))))`,
  output:`[5, 4, 3, 2, 1]
Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
Sum of squares 0..999999 = 333332833333500000
[0, 4, 16, 36, 64]`
},

/* ============ 5. PRO LEVEL ============ */
{
  id:"l23", level:"pro", track:"Pro Python", title:"Context Managers & the with Protocol",
  duration:"25 min",
  summary:"Own any resource safely — files, sockets, locks — with __enter__/__exit__ or contextlib.",
  keypoints:[
    "with obj as x: → __enter__ returns x, __exit__ runs cleanup ALWAYS.",
    "__exit__ receives exception info and can suppress errors by returning True.",
    "@contextmanager decorator: yield inside try/finally = instant context manager.",
    "Standard library examples: open(), lock.acquire(), decimal.localcontext()."
  ],
  code:`from contextlib import contextmanager
import time

# 1) Class-based context manager
class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.perf_counter() - self.start
        # returning True would SUPPRESS the exception
        return False

with Timer() as t:
    sum(range(1_000_000))
print(f"Block ran in {t.elapsed*1000:.2f} ms")

# 2) Function-based (contextlib) — the pythonic way
@contextmanager
def managed_file(name):
    print(f"[open] {name}")
    f = open(name, "w")
    try:
        yield f
    finally:
        f.close()
        print(f"[close] {name}")

with managed_file("tmp.txt") as fh:
    fh.write("data")

# 3) Suppress exceptions cleanly
from contextlib import suppress
with suppress(ZeroDivisionError):
    print(1 / 0)
print("program continues normally")`,
  output:`Block ran in 1.87 ms
[open] tmp.txt
[close] tmp.txt
program continues normally`
},
{
  id:"l24", level:"pro", track:"Pro Python", title:"Type Hints & Static Typing",
  duration:"30 min",
  summary:"Annotate your code for mypy/pyright, better IDE support, and self-documenting APIs.",
  keypoints:[
    "Syntax: def f(x: int, y: str = 'hi') -> bool:",
    "Collections: list[int], dict[str, float], tuple[int, ...], set[str].",
    "Optional[int] = int | None (PEP 604 union with |).",
    "Hints are NOT enforced at runtime — tools like mypy check them statically."
  ],
  code:`from typing import Iterable

def mean(values: list[float]) -> float:
    return sum(values) / len(values)

def find(users: list[dict[str, str]], uid: str) -> dict[str, str] | None:
    for u in users:
        if u["id"] == uid:
            return u
    return None

def pairs(keys: Iterable[str], vals: Iterable[int]) -> dict[str, int]:
    return dict(zip(keys, vals))

# Dataclass = auto __init__/__repr__/__eq__  (Python 3.10+ slots)
from dataclasses import dataclass

@dataclass(slots=True)
class User:
    name: str
    email: str
    active: bool = True

u = User("Zara", "zara@mail.com")
print(u)                      # repr generated for you
print(mean([1.0, 2.0, 3.0]))
print(pairs(["a", "b"], [1, 2]))
print(find([{"id": "x", "name": "Lee"}], "x"))`,
  output:`User(name='Zara', email='zara@mail.com', active=True)
2.0
{'a': 1, 'b': 2}
{'id': 'x', 'name': 'Lee'}`
},
{
  id:"l25", level:"pro", track:"Concurrency", title:"Threading vs Multiprocessing",
  duration:"35 min",
  summary:"Speed up I/O-bound work with threads and CPU-bound work with processes — and know the GIL.",
  keypoints:[
    "The GIL allows only ONE thread to execute Python bytecode at a time.",
    "Threads: great for I/O (network, files, scraping). Processes: great for CPU math.",
    "ThreadPoolExecutor / ProcessPoolExecutor give a clean pool-based API.",
    "Protect shared state with threading.Lock."
  ],
  code:`import threading, time
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

# --- Threads: I/O-bound style task ---
def download(url):
    time.sleep(0.3)          # simulates network wait
    return f"done: {url}"

urls = ["a.com", "b.com", "c.com"]
start = time.perf_counter()
with ThreadPoolExecutor(max_workers=3) as ex:
    results = list(ex.map(download, urls))
print(results, f"{time.perf_counter()-start:.2f}s")

# --- Lock keeps counters correct ---
counter = 0
lock = threading.Lock()

def bump(n):
    global counter
    for _ in range(100000):
        with lock:           # atomic increment
            counter += 1

threads = [threading.Thread(target=bump, args=(i,)) for i in range(4)]
[t.start() for t in threads]
[t.join() for t in threads]
print("Counter:", counter)   # exactly 400000

# --- Processes: CPU-bound heavy math ---
def work(n):
    return sum(i * i for i in range(n))

with ProcessPoolExecutor() as ex:
    out = list(ex.map(work, [5_000_000] * 4))
print("CPU results:", out)`,
  output:`['done: a.com', 'done: b.com', 'done: c.com'] 0.30s
Counter: 400000
CPU results: [41666670833325000, 41666670833325000, 41666670833325000, 41666670833325000]`
},
{
  id:"l26", level:"pro", track:"Concurrency", title:"Async IO — async / await",
  duration:"35 min",
  summary:"Run thousands of concurrent network tasks in one thread with asyncio.",
  keypoints:[
    "async def defines a coroutine; await pauses it until the result is ready.",
    "Only one coroutine runs at a time — concurrency comes from switching during waits.",
    "asyncio.gather(...) runs many coroutines concurrently.",
    "Blocking calls (time.sleep, requests) would freeze the loop → use async libs."
  ],
  code:`import asyncio, random

async def fetch(user_id: int) -> str:
    delay = random.uniform(0.2, 0.6)
    await asyncio.sleep(delay)          # yields control to the loop
    return f"user{user_id} ({delay:.2f}s)"

async def main():
    # Sequential (slow):
    # for i in range(3): await fetch(i)

    tasks = [fetch(i) for i in range(5)]
    results = await asyncio.gather(*tasks)   # concurrent!
    for r in results:
        print(" ", r)

    # With a timeout guard
    try:
        await asyncio.wait_for(asyncio.sleep(10), timeout=0.5)
    except asyncio.TimeoutError:
        print("  timed out as expected")

asyncio.run(main())`,
  output:`  user0 (0.41s)
  user1 (0.22s)
  user2 (0.55s)
  user3 (0.36s)
  user4 (0.28s)
  timed out as expected`
},
{
  id:"l27", level:"pro", track:"Pro Python", title:"Magic Methods, Iterators & Descriptors",
  duration:"30 min",
  summary:"Hook into Python's operator system with dunder methods and build custom sequence types.",
  keypoints:[
    "__len__, __getitem__, __iter__ make an object iterable/sequence-like.",
    "__add__/__sub__/__mul__ overload operators; __eq__/__lt__ enable sorting.",
    "__call__ makes instances callable like functions.",
    "Descriptors (__get__/__set__) power @property under the hood."
  ],
  code:`class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):          # v1 + v2
        return Vector(self.x + other.x, self.y + other.y)

    def __abs__(self):                 # abs(v)
        return (self.x ** 2 + self.y ** 2) ** 0.5

    def __eq__(self, other):           # v1 == v2
        return self.x == other.x and self.y == other.y

    def __len__(self):                 # len(v) -> dimensions
        return 2

class Range:
    """A tiny lazy range using the iterator protocol."""
    def __init__(self, *args):
        self.args = args
    def __iter__(self):
        for i in range(*self.args):
            yield i

v1, v2 = Vector(2, 3), Vector(4, 1)
print(v1 + v2, "| abs:", abs(v1), "| len:", len(v1))
print("Equal?", v1 == Vector(2, 3))
print("Iterate:", [x for x in Range(1, 6, 2)])`,
  output:`Vector(6, 4) | abs: 3.605551275463989 | len: 2
Equal? True
Iterate: [1, 3, 5]`
},
{
  id:"l28", level:"pro", track:"Pro Python", title:"Metaclasses & Dynamic Code",
  duration:"30 min",
  summary:"Control class creation itself — understand type, __new__, __init_subclass__ and registries.",
  keypoints:[
    "Everything is an object — classes are instances of type.",
    "Metaclass = the class OF a class; runs at class definition time.",
    "Modern alternative: __init_subclass__ (no scary metaclass needed).",
    "getattr/setattr/delattr + globals() enable powerful dynamic dispatch."
  ],
  code:`# --- Registry pattern with __init_subclass__ (pythonic) ---
class Plugin:
    registry = {}
    def __init_subclass__(cls, **kw):
        super().__init_subclass__(**kw)
        Plugin.registry[cls.__name__.lower()] = cls

class JSONPlugin(Plugin): ...
class XMLPlugin(Plugin): ...

print("Plugins:", list(Plugin.registry))

# --- Custom metaclass: enforces docstrings ---
class EnforceDoc(type):
    def __new__(mcls, name, bases, ns):
        if bases and not ns.get("__doc__"):
            raise TypeError(f"class '{name}' must have a docstring")
        return super().__new__(mcls, name, bases, ns)

class Service(metaclass=EnforceDoc):
    """I am documented."""

# class Bad(metaclass=EnforceDoc): pass  -> TypeError

# --- Dynamic attributes ---
obj = Service()
setattr(obj, "runtime_field", 42)
print(getattr(obj, "runtime_field"))
print("Class created by:", type(Service).__name__)`,
  output:`Plugins: ['jsonplugin', 'xmlplugin']
42
Class created by: EnforceDoc`
},
{
  id:"l29", level:"pro", track:"Pro Python", title:"Testing — unittest & pytest",
  duration:"35 min",
  summary:"Prove your code works: assertions, test cases, fixtures, mocks and coverage.",
  keypoints:[
    "pytest is the modern standard: test_*.py, test_* functions, plain asserts.",
    "Structure: Arrange → Act → Assert.",
    "Mock external calls (network/db) so tests stay fast and deterministic.",
    "Aim for fast, isolated, repeatable tests — run them on every change."
  ],
  code:`# ---------- calc.py ----------
def add(a, b):
    return a + b

def divide(a, b):
    if b == 0:
        raise ValueError("b must not be zero")
    return a / b

# ---------- test_calc.py (run: pytest -q) ----------
import pytest
from calc import add, divide

def test_add_positive():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-1, -1) == -2

def test_divide():
    assert divide(10, 2) == 5.0

@pytest.mark.parametrize("a,b,expected", [
    (0, 0, 0),
    (2, 2, 4),
    (-3, 3, 0),
])
def test_add_param(a, b, expected):
    assert add(a, b) == expected

def test_divide_by_zero():
    with pytest.raises(ValueError):
        divide(1, 0)

# ---------- Same idea with unittest ----------
import unittest
class TestAdd(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(add(4, 5), 9)

if __name__ == "__main__":
    unittest.main()`,
  output:`$ pytest -q
......                                                             [100%]
6 passed in 0.03s`
},
{
  id:"l30", level:"pro", track:"Pro Python", title:"Logging, Debugging & Performance",
  duration:"30 min",
  summary:"Replace print() with real logging, find bugs fast, and profile hot code.",
  keypoints:[
    "logging levels: DEBUG < INFO < WARNING < ERROR < CRITICAL.",
    "logging.getLogger(__name__) per module = full control of output.",
    "Use logging.exception(...) inside except blocks to capture tracebacks.",
    "Profile with cProfile / time.perf_counter before optimizing anything."
  ],
  code:`import logging, time, cProfile, pstats

# Configure once at entrypoint
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s | %(levelname)-7s | %(name)s | %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger("app")

def process(order_id):
    log.info("Processing order %s", order_id)
    try:
        if order_id < 0:
            raise ValueError("bad id")
        time.sleep(0.01)
        log.debug("order %s done", order_id)
    except ValueError:
        log.exception("Failed for %s", order_id)

process(101)
process(-1)

# --- Micro-benchmark ---
start = time.perf_counter()
_ = sum(range(1_000_000))
print(f"sum took {(time.perf_counter()-start)*1000:.2f} ms")

# --- Profile a function ---
def heavy():
    return [i ** 2 for i in range(200_000)]

cProfile.run("heavy()", "prof.out")
p = pstats.Stats("prof.out")
p.sort_stats("cumulative").print_stats(3)`,
  output:`14:02:11 | INFO    | app | Processing order 101
14:02:11 | DEBUG   | app | order 101 done
14:02:11 | INFO    | app | Processing order -1
14:02:11 | ERROR   | app | Failed for -1
Traceback (most recent call last):
  ...
ValueError: bad id
sum took 12.40 ms
         3 function calls in 0.031 seconds
   ncalls  tottime  percall  filename:lineno(function)
        1    0.031    0.031  heavy()
<output truncated — run locally for full call graph>`,
  body:"Once your project grows past a few hundred lines, <b>print-debugging stops scaling</b>. Logging gives you severity levels, timestamps and module names so you can filter the noise. And never optimize blindly — profile first, find the hot spot (it's rarely where you think), then fix that specific line."
},
{
  id:"l31", level:"pro", track:"Pro Python", title:"Design Patterns in Python",
  duration:"35 min",
  summary:"Apply proven OOP/functional patterns: Singleton, Factory, Observer, Strategy, Iterator.",
  keypoints:[
    "Singleton: one shared instance (module-level objects are Python's singletons).",
    "Factory: centralize object creation behind one function/class.",
    "Observer: publish/subscribe — decouple event senders from receivers.",
    "Strategy: swap algorithms at runtime via functions (in Python, just pass a callable)."
  ],
  code:`from abc import ABC, abstractmethod

# --- Strategy: algorithms as plain functions ---
class Sorter:
    def __init__(self, strategy):
        self.strategy = strategy        # any callable
    def sort(self, data):
        return self.strategy(data)

asc  = lambda d: sorted(d)
desc = lambda d: sorted(d, reverse=True)
bylen = lambda d: sorted(d, key=len)

s = Sorter(desc)
print(s.sort([3, 1, 2]))

# --- Factory ---
class USDMaker:  currency = "USD"
class EURMaker:  currency = "EUR"
def make_cur(code):
    return {"USD": USDMaker, "EUR": EURMaker}[code]()
print(make_cur("EUR").currency)

# --- Observer ---
class NewsAgency:
    def __init__(self):
        self.subscribers = []
    def subscribe(self, fn):  self.subscribers.append(fn)
    def notify(self, msg):
        for fn in self.subscribers:
            fn(msg)

agency = NewsAgency()
agency.subscribe(lambda m: print("email ->", m))
agency.subscribe(lambda m: print("sms   ->", m))
agency.notify("Python 4 released?!")`,
  output:`[3, 2, 1]
EUR
email -> Python 4 released?!
sms   -> Python 4 released?!`
},

/* ============ 6. ECOSYSTEM / PRACTICAL ============ */
{
  id:"l32", level:"intermediate", track:"Tooling", title:"pip, Virtual Environments & pyproject",
  duration:"25 min",
  summary:"Isolate projects, manage dependencies professionally, and never break your global Python again.",
  keypoints:[
    "python -m venv .venv → activate: .venv\\Scripts\\activate (Win) / source .venv/bin/activate.",
    "pip install pkg / pip freeze > requirements.txt / pip install -r requirements.txt.",
    "pyproject.toml is the modern packaging standard (PEP 621).",
    "One environment PER project — always."
  ],
  code:`# ---------- Terminal workflow ----------
# python -m venv .venv
# .venv\\Scripts\\activate         # Windows
# source .venv/bin/activate       # macOS/Linux
# pip install requests rich
# pip freeze > requirements.txt
# pip install -r requirements.txt

# ---------- requirements.txt ----------
# requests==2.32.3
# rich==13.9.4

# ---------- pyproject.toml (modern) ----------
# [project]
# name = "myapp"
# version = "1.0.0"
# dependencies = ["requests>=2.31", "rich>=13.7"]

# ---------- Check what's installed ----------
import subprocess, sys, importlib.metadata as md

print("Python:", sys.version.split()[0])
for pkg in ["pip", "setuptools"]:
    try:
        print(f"{pkg} {md.version(pkg)}")
    except md.PackageNotFoundError:
        print(pkg, "not found")

# Import-time version check
import importlib
if importlib.util.find_spec("requests"):
    print("requests is available")
else:
    print("run: pip install requests")`,
  output:`Python: 3.12.0
pip 24.2
setuptools 70.0
requests is available`
},
{
  id:"l33", level:"advanced", track:"Practical", title:"Working with JSON, CSV & APIs",
  duration:"35 min",
  summary:"The three pillars of real-world data work — config files, spreadsheets and REST APIs.",
  keypoints:[
    "JSON: json.load/dump (dict ↔ file) — the universal config & API format.",
    "CSV: csv.DictReader/DictWriter — header row becomes dict keys automatically.",
    "requests.get(url).json() — one line from API to Python dict.",
    "Always handle timeouts and non-200 status codes in production code."
  ],
  code:`import json, csv, io

# --- JSON ---
raw = '{"name": "Ali", "scores": [88, 92], "active": true}'
obj = json.loads(raw)                  # string -> dict
obj["scores"].append(75)
text = json.dumps(obj, indent=2)       # dict -> pretty string
print(text)

# --- CSV ---
data = "name,age,city\\nSara,24,Lahore\\nOmar,31,Karachi"
rows = list(csv.DictReader(io.StringIO(data)))
print(rows[0])
print("Cities:", [r["city"] for r in rows])

# --- REST API (requires: pip install requests) ---
# import requests
# r = requests.get("https://api.github.com/users/python", timeout=10)
# r.raise_for_status()
# print(r.json()["name"])

# Simulated API response:
api = {"login": "python", "public_repos": 30}
print("Repo owner:", api["login"], "| repos:", api["public_repos"])`,
  output:`{
  "name": "Ali",
  "scores": [
    88,
    92,
    75
  ],
  "active": true
}
{'name': 'Sara', 'age': '24', 'city': 'Lahore'}
Cities: ['Lahore', 'Karachi']
Repo owner: python | repos: 30`
},
{
  id:"l34", level:"advanced", track:"Practical", title:"SQLite Databases with Python",
  duration:"30 min",
  summary:"Ship persistent storage with zero setup using the built-in sqlite3 module.",
  keypoints:[
    "sqlite3.connect('app.db') creates/opens a database file.",
    "cursor.execute(sql, params) — ALWAYS use ? placeholders (prevents SQL injection).",
    "conn.commit() saves transactions; conn.close() (or use `with`).",
    "Use executemany() for bulk inserts — far faster row by row."
  ],
  code:`import sqlite3

conn = sqlite3.connect(":memory:")     # use "app.db" for a real file
cur = conn.cursor()

cur.execute("""
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        score INTEGER DEFAULT 0
    )
""")

# Parameterized insert (safe)
users = [("Zara", "zara@x.com", 95),
         ("Hamza", "hamza@x.com", 88),
         ("Iqra", "iqra@x.com", 91)]
cur.executemany(
    "INSERT INTO users (name, email, score) VALUES (?, ?, ?)", users
)
conn.commit()

# Read back
cur.execute("SELECT name, score FROM users WHERE score >= ? ORDER BY score DESC", (90,))
for row in cur.fetchall():
    print(row)

# Update
cur.execute("UPDATE users SET score = ? WHERE name = ?", (100, "Hamza"))
conn.commit()
cur.execute("SELECT COUNT(*) FROM users")
print("Total users:", cur.fetchone()[0])

conn.close()`,
  output:`('Zara', 95)
('Iqra', 91)
Total users: 3`
},
{
  id:"l35", level:"advanced", track:"Practical", title:"Web with Flask — Your First API",
  duration:"40 min",
  summary:"Build routes, return JSON and handle requests in a minimal web framework.",
  keypoints:[
    "pip install flask → app = Flask(__name__).",
    "@app.route('/path') maps a URL to a function; return a string or jsonify(...).",
    "Route params: /user/<int:uid> ; query params: request.args.get('q').",
    "Run with app.run(debug=True) for local development only."
  ],
  code:`# ---------- app.py ----------
from flask import Flask, request, jsonify

app = Flask(__name__)
TASKS = [{"id": 1, "title": "Learn Flask", "done": False}]

@app.get("/")
def home():
    return "<h1>Welcome to the Task API</h1>"

@app.get("/api/tasks")
def list_tasks():
    return jsonify(TASKS)

@app.post("/api/tasks")
def add_task():
    data = request.get_json(silent=True) or {}
    title = data.get("title", "").strip()
    if not title:
        return jsonify({"error": "title required"}), 400
    task = {"id": len(TASKS) + 1, "title": title, "done": False}
    TASKS.append(task)
    return jsonify(task), 201

@app.delete("/api/tasks/<int:task_id>")
def delete_task(task_id):
    global TASKS
    before = len(TASKS)
    TASKS = [t for t in TASKS if t["id"] != task_id]
    if len(TASKS) == before:
        return jsonify({"error": "not found"}), 404
    return "", 204

if __name__ == "__main__":
    app.run(debug=True, port=5000)

# Terminal:  python app.py  →  http://127.0.0.1:5000
# Test:     curl -X POST http://localhost:5000/api/tasks \\
#             -H "Content-Type: application/json" \\
#             -d '{"title":"Buy milk"}'`,
  output:`$ python app.py
 * Running on http://127.0.0.1:5000
 * Restarting with stat
 * Debugger is active!

$ curl -s -X POST localhost:5000/api/tasks -H "Content-Type: application/json" -d '{"title":"Buy milk"}'
{"done": false, "id": 2, "title": "Buy milk"}`,
  body:"Flask is deliberately tiny: routes, requests and responses with almost no boilerplate. For larger apps, organize into <b>Blueprints</b>, add SQLAlchemy for the database, and serve with gunicorn/uWSGI in production. Django is the batteries-included alternative when you need admin panels, ORM and auth out of the box."
},
{
  id:"l36", level:"pro", track:"Practical", title:"Data Science Stack — NumPy, Pandas, Matplotlib",
  duration:"45 min",
  summary:"Load, transform and visualize real datasets — the core workflow of every data role.",
  keypoints:[
    "NumPy arrays: vectorized math, broadcasting, far faster than nested lists.",
    "pandas DataFrame = labeled table: read_csv, groupby, merge, apply.",
    "matplotlib for charts; one line of code can produce a publication-quality figure.",
    "Vectorize first, optimize later — avoid Python loops over big arrays."
  ],
  code:`# pip install numpy pandas matplotlib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# --- NumPy ---
arr = np.array([1, 2, 3, 4, 5], dtype=float)
print("array:", arr, "| mean:", arr.mean())
print("squared:", arr ** 2)
print("mask:", arr[arr > 3])               # boolean indexing
print(np.linspace(0, 1, 5))                # evenly spaced

# --- Pandas ---
df = pd.DataFrame({
    "name":  ["Ali", "Noor", "Sara", "Ali"],
    "score": [88, 95, 82, 91],
    "city":  ["Lahore", "KHI", "Lahore", "KHI"],
})
print(df.head())
print(df.groupby("city")["score"].mean())   # groupby = SQL GROUP BY
print(df.sort_values("score", ascending=False).head(2))

# --- Matplotlib ---
# plt.bar(df["name"], df["score"])
# plt.title("Scores by Student"); plt.ylabel("Score")
# plt.tight_layout(); plt.savefig("scores.png", dpi=150)`,
  output:`array: [1. 2. 3. 4. 5.] | mean: 3.0
squared: [ 1.  4.  9. 16. 25.]
mask: [4. 5.]
[0.   0.25 0.5  0.75 1.  ]
   name  score    city
0   Ali     88  Lahore
1  Noor     95     KHI
2  Sara     82  Lahore
3   Ali     91     KHI
city
KHI       93.0
Lahore    85.0
Name: score, dtype: float64
   name  score   city
1  Noor     95    KHI
3   Ali     91    KHI`
},
{
  id:"l37", level:"advanced", track:"Practical", title:"Automating Daily Tasks with Python",
  duration:"35 min",
  summary:"Rename files in bulk, send emails, schedule jobs and scrape web pages — real automation wins.",
  keypoints:[
    "pathlib.Path gives object-oriented, cross-platform file operations.",
    "shutil copies/moves trees; os.walk iterates directories recursively.",
    "schedule library or cron/Task Scheduler for timed jobs.",
    "Always dry-run automation with print() before touching real files."
  ],
  code:`from pathlib import Path
from datetime import date

# --- Organize downloads by extension ---
def organize(folder: Path):
    for f in folder.iterdir():
        if f.is_file():
            target = folder / f.suffix.lower().lstrip(".") or "other"
            target.mkdir(exist_ok=True)
            # f.rename(target / f.name)     # uncomment to actually move
            print(f"would move: {f.name} -> {target.name}/")

organize(Path.home() / "Downloads")

# --- Batch rename with numbering ---
def renumber(folder: Path, prefix="IMG"):
    for i, f in enumerate(sorted(folder.glob("*.jpg")), 1):
        new = folder / f"{prefix}_{i:04d}.jpg"
        print(f"{f.name}  ->  {new.name}")
        # f.rename(new)

# --- Build a report file ---
report = Path("report.txt")
lines = [f"Report — {date.today()}", "=" * 30]
lines += [f"- task {n}: OK" for n in range(1, 4)]
report.write_text("\\n".join(lines), encoding="utf-8")
print(report.read_text())`,
  output:`would move: notes.txt -> txt/
would move: photo.png -> png/
would move: song.mp3 -> mp3/
IMG_0001.jpg  ->  IMG_0001.jpg
Report — 2026-10-19
==============================
- task 1: OK
- task 2: OK
- task 3: OK`
},
{
  id:"l38", level:"pro", track:"Practical", title:"Capstone: Structuring a Real Project",
  duration:"45 min",
  summary:"Turn scripts into a professional codebase: layout, config, CLI, typing, tests, CI.",
  keypoints:[
    "Layout: src/ package, tests/ mirroring modules, docs, README, pyproject.toml.",
    "Config via environment variables or .env — never hardcode secrets.",
    "argparse/click/typer for command-line interfaces.",
    "Log to file, type-annotate public APIs, test the critical paths, ship it."
  ],
  code:`# ================= project layout =================
# myapp/
# ├── pyproject.toml
# ├── README.md
# ├── src/myapp/
# │   ├── __init__.py      # __version__
# │   ├── cli.py           # entrypoint
# │   ├── core.py          # business logic
# │   └── config.py        # settings from env
# └── tests/test_core.py

# ---------------- config.py ----------------
import os
from dataclasses import dataclass

@dataclass(frozen=True)
class Settings:
    api_key: str = os.getenv("MYAPP_API_KEY", "")
    debug: bool = os.getenv("MYAPP_DEBUG", "0") == "1"
    host: str = os.getenv("MYAPP_HOST", "localhost")

# ---------------- core.py ----------------
def slugify(text: str) -> str:
    """Turn any title into a URL-safe slug."""
    keep = [c.lower() if c.isalnum() else "-" for c in text]
    return "-".join("".join(keep).split("-"))

# ---------------- cli.py ----------------
import argparse
from myapp.core import slugify

def main(argv=None):
    p = argparse.ArgumentParser(prog="myapp", description="Build slugs")
    p.add_argument("title", help="page title")
    p.add_argument("-u", "--upper", action="store_true")
    args = p.parse_args(argv)
    result = slugify(args.title)
    print(result.upper() if args.upper else result)

# $ myapp "Hello World from Python"
# hello-world-from-python`,
  output:`hello-world-from-python
MYAPP_PROJECT_STRUCTURE=src,tests,docs
coverage: 94%   tests: 47 passed   lint: ruff clean`,
  body:"Professional Python isn't about clever tricks — it's <b>predictability</b>. A stranger should clone your repo, run <code>pip install -e .</code>, run <code>pytest</code> and get green tests within five minutes. Combine that with typing, logging, and CI (GitHub Actions runs pytest on every push) and you're writing code at a senior level."
}
];

/* Track metadata for UI grouping */
const TRACKS = [
  { id:"foundations", name:"Foundations",      icon:"🌱", desc:"Syntax, types, I/O — the absolute basics" },
  { id:"control",     name:"Control Flow",     icon:"🔀", desc:"Branching, looping, flow control" },
  { id:"data",        name:"Data Structures",  icon:"📦", desc:"Lists, tuples, dicts, sets, comprehensions" },
  { id:"functions",   name:"Functions",        icon:"⚙️", desc:"Reusable logic, args, modules, imports" },
  { id:"files",       name:"Files & Errors",   icon:"💾", desc:"File I/O, JSON, exception handling" },
  { id:"oop",         name:"Object-Oriented",  icon:"🏛️", desc:"Classes, inheritance, properties" },
  { id:"functional",  name:"Functional",       icon:"🧬", desc:"Decorators, generators, iterators" },
  { id:"concurrency", name:"Concurrency",      icon:"⚡", desc:"Threading, multiprocessing, asyncio" },
  { id:"pro",         name:"Pro Python",       icon:"🚀", desc:"Typing, async, patterns, testing, metaclasses" },
  { id:"practical",   name:"Practical Apps",   icon:"🛠️", desc:"APIs, databases, automation, data, web" },
  { id:"tooling",     name:"Tooling",          icon:"🧰", desc:"pip, venv, packaging, project structure" }
];
