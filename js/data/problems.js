/* ============================================================
   PROBLEMS — Practice set with tests, hints & on-demand solutions
   Each: id, level, title, topics[], desc, examples[],
         starter, solution, hint, tests[]
   tests: python lines executed after user code, ending in
          assertion so we can verify the submission live.
   ============================================================ */

const PROBLEMS = [
/* ---------------- EASY ---------------- */
{
  id:"p01", level:"easy", title:"Even or Odd Checker", topics:["Basics","Operators"],
  desc:"Write a function `is_even(n)` that returns True if n is even, False otherwise. Handle negative numbers too.",
  examples:[{in:"is_even(4)", out:"True"},{in:"is_even(7)", out:"False"},{in:"is_even(-2)", out:"True"}],
  starter:`def is_even(n):
    # your code here
    pass`,
  solution:`def is_even(n):
    """Even numbers are divisible by 2 with no remainder."""
    return n % 2 == 0`,
  hint:"The modulo operator % gives the remainder of division. If n % 2 equals 0, the number divides evenly by 2.",
  tests:[
    "assert is_even(4) == True",
    "assert is_even(7) == False",
    "assert is_even(0) == True",
    "assert is_even(-2) == True",
    "assert is_even(-3) == False"
  ]
},
{
  id:"p02", level:"easy", title:"Reverse a String", topics:["Strings","Slicing"],
  desc:"Write `reverse_string(s)` returning the reversed string. Try to solve it with slicing in one line.",
  examples:[{in:'reverse_string("hello")', out:'"olleh"'},{in:'reverse_string("Python")', out:'"nohtyP"'}],
  starter:`def reverse_string(s):
    # your code here
    pass`,
  solution:`def reverse_string(s):
    # Slice with step -1 = read backwards
    return s[::-1]
    # Alternatives:
    # return "".join(reversed(s))
    # return "".join(s[i] for i in range(len(s)-1, -1, -1))`,
  hint:"Python slicing accepts a step: s[start:stop:step]. What happens when step is -1?",
  tests:[
    'assert reverse_string("hello") == "olleh"',
    'assert reverse_string("Python") == "nohtyP"',
    'assert reverse_string("") == ""',
    'assert reverse_string("a") == "a"',
    'assert reverse_string("12345") == "54321"'
  ]
},
{
  id:"p03", level:"easy", title:"Maximum in a List", topics:["Lists","Functions"],
  desc:"Write `find_max(nums)` that returns the largest number WITHOUT using the built-in max(). Return None for an empty list.",
  examples:[{in:"find_max([3, 7, 2, 9])", out:"9"},{in:"find_max([-5, -1, -9])", out:"-1"},{in:"find_max([])", out:"None"}],
  starter:`def find_max(nums):
    # your code here
    pass`,
  solution:`def find_max(nums):
    if not nums:              # empty list guard
        return None
    best = nums[0]            # assume first is largest
    for n in nums[1:]:        # check the rest
        if n > best:
            best = n
    return best`,
  hint:"Start by assuming the first element is the biggest, then walk through the remaining items — whenever you find something bigger, update your record.",
  tests:[
    "assert find_max([3, 7, 2, 9]) == 9",
    "assert find_max([-5, -1, -9]) == -1",
    "assert find_max([]) is None",
    "assert find_max([42]) == 42",
    "assert find_max([1, 1, 1]) == 1"
  ]
},
{
  id:"p04", level:"easy", title:"Count Vowels", topics:["Strings","Loops"],
  desc:"Write `count_vowels(s)` returning the number of vowels (a, e, i, o, u) — case-insensitive.",
  examples:[{in:'count_vowels("Hello World")', out:"3"},{in:'count_vowels("PYTHOn")', out:"1"},{in:'count_vowels("xyz")', out:"0"}],
  starter:`def count_vowels(s):
    # your code here
    pass`,
  solution:`def count_vowels(s):
    vowels = "aeiou"
    return sum(1 for ch in s.lower() if ch in vowels)

    # One-liner version:
    # return sum(ch in "aeiou" for ch in s.lower())`,
  hint:"Convert the string to lowercase first, then loop over each character and count how many times it appears inside the set \"aeiou\".",
  tests:[
    'assert count_vowels("Hello World") == 3',
    'assert count_vowels("PYTHOn") == 1',
    'assert count_vowels("xyz") == 0',
    'assert count_vowels("AEIOU") == 5',
    'assert count_vowels("") == 0'
  ]
},
{
  id:"p05", level:"easy", title:"Fibonacci Sequence", topics:["Loops","Recursion"],
  desc:"Write `fib(n)` returning the n-th Fibonacci number (fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2 …). n will be ≥ 0.",
  examples:[{in:"fib(0)", out:"0"},{in:"fib(6)", out:"8"},{in:"fib(10)", out:"55"}],
  starter:`def fib(n):
    # your code here
    # iterative (preferred) or recursive
    pass`,
  solution:`def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b       # slide the window forward
    return a`,
  hint:"Keep two variables: the current pair (a, b). On every step the new a becomes b, and the new b becomes a+b. Loop n times.",
  tests:[
    "assert fib(0) == 0",
    "assert fib(1) == 1",
    "assert fib(2) == 1",
    "assert fib(6) == 8",
    "assert fib(10) == 55",
    "assert fib(20) == 6765"
  ]
},
{
  id:"p06", level:"easy", title:"Temperature Converter", topics:["Functions","Conditionals"],
  desc:"Write `c_to_f(c)` and `f_to_c(f)` converting between Celsius and Fahrenheit. Round to 1 decimal place.",
  examples:[{in:"c_to_f(100)", out:"212.0"},{in:"c_to_f(0)", out:"32.0"},{in:"f_to_c(98.6)", out:"37.0"}],
  starter:`def c_to_f(c):
    # your code here
    pass

def f_to_c(f):
    # your code here
    pass`,
  solution:`def c_to_f(c):
    return round(c * 9 / 5 + 32, 1)

def f_to_c(f):
    return round((f - 32) * 5 / 9, 1)`,
  hint:"Celsius → Fahrenheit: multiply by 9/5 then add 32. Fahrenheit → Celsius: subtract 32 then multiply by 5/9. Wrap the result in round(x, 1).",
  tests:[
    "assert c_to_f(100) == 212.0",
    "assert c_to_f(0) == 32.0",
    "assert c_to_f(-40) == -40.0",
    "assert f_to_c(32) == 0.0",
    "assert f_to_c(98.6) == 37.0"
  ]
},

/* ---------------- MEDIUM ---------------- */
{
  id:"p07", level:"medium", title:"Remove Duplicates, Keep Order", topics:["Lists","Sets"],
  desc:"Write `unique_keep_order(nums)` returning a new list with duplicates removed while preserving first-seen order. Don't just use dict.fromkeys unless you explain why it works.",
  examples:[{in:"unique_keep_order([3,1,3,2,1,4])", out:"[3, 1, 2, 4]"},{in:"unique_keep_order([1,1,1])", out:"[1]"}],
  starter:`def unique_keep_order(nums):
    # your code here
    pass`,
  solution:`def unique_keep_order(nums):
    seen = set()          # O(1) membership tests
    result = []
    for n in nums:
        if n not in seen:
            seen.add(n)
            result.append(n)
    return result

    # Pythonic one-liner (dict preserves insertion order since 3.7):
    # return list(dict.fromkeys(nums))`,
  hint:"A set gives O(1) 'have I seen this?' checks. Walk the list once — keep items you haven't seen yet, and record each kept item in the set.",
  tests:[
    "assert unique_keep_order([3,1,3,2,1,4]) == [3, 1, 2, 4]",
    "assert unique_keep_order([1,1,1]) == [1]",
    "assert unique_keep_order([]) == []",
    "assert unique_keep_order([5,4,3,2,1]) == [5, 4, 3, 2, 1]",
    "assert unique_keep_order([-1,-1,0,0,1]) == [-1, 0, 1]"
  ]
},
{
  id:"p08", level:"medium", title:"Character Frequency Report", topics:["Strings","dict","collections"],
  desc:"Write `char_freq(s)` returning a dict of character counts, and `top_chars(s, n)` returning the n most common characters as a list of (char, count) tuples sorted by count desc.",
  examples:[{in:'char_freq("banana")', out:"{'b': 1, 'a': 3, 'n': 2}"},{in:'top_chars("banana", 2)', out:"[('a', 3), ('n', 2)]"}],
  starter:`def char_freq(s):
    # your code here
    pass

def top_chars(s, n):
    # your code here
    pass`,
  solution:`def char_freq(s):
    freq = {}
    for ch in s:
        freq[ch] = freq.get(ch, 0) + 1   # default 0 on first sight
    return freq

def top_chars(s, n):
    from collections import Counter
    return Counter(s).most_common(n)
    # Manual version:
    # return sorted(char_freq(s).items(), key=lambda kv: kv[1], reverse=True)[:n]`,
  hint:"dict.get(key, 0) returns 0 when the key doesn't exist yet — perfect for counting. For top-n, sort the dict items by their count and slice.",
  tests:[
    'assert char_freq("banana") == {"b": 1, "a": 3, "n": 2}',
    'assert char_freq("") == {}',
    'assert top_chars("banana", 2) == [("a", 3), ("n", 2)]',
    'assert top_chars("aabbc", 1) == [("a", 2)]'
  ]
},
{
  id:"p09", level:"medium", title:"Flatten Nested Lists", topics:["Lists","Recursion"],
  desc:"Write `flatten(items)` that turns a arbitrarily nested list like [1,[2,[3,4],5],6] into a flat list [1,2,3,4,5,6].",
  examples:[{in:"flatten([1,[2,[3,4],5],6])", out:"[1, 2, 3, 4, 5, 6]"},{in:"flatten([[1,2],[3,[4,[5]]])", out:"[1, 2, 3, 4, 5]"}],
  starter:`def flatten(items):
    # your code here (recursive or iterative)
    pass`,
  solution:`def flatten(items):
    result = []
    stack = list(reversed(items))      # use a stack (no recursion limit)
    while stack:
        item = stack.pop()
        if isinstance(item, list):
            stack.extend(reversed(item))   # push children back on top
        else:
            result.append(item)
    return result

    # Recursive version:
    # def flatten(items):
    #     out = []
    #     for i in items:
    #         if isinstance(i, list): out.extend(flatten(i))
    #         else: out.append(i)
    #     return out`,
  hint:"Recurse: if an element is a list, flatten it first and extend your result; otherwise append it directly. Or use an explicit stack to avoid recursion depth limits.",
  tests:[
    "assert flatten([1,[2,[3,4],5],6]) == [1, 2, 3, 4, 5, 6]",
    "assert flatten([[1,2],[3,[4,[5]]]]) == [1, 2, 3, 4, 5]",
    "assert flatten([]) == []",
    "assert flatten([1,2,3]) == [1, 2, 3]",
    "assert flatten([[[[]]]]) == []"
  ]
},
{
  id:"p10", level:"medium", title:"Caesar Cipher", topics:["Strings","Modules"],
  desc:"Write `caesar(text, shift)` that shifts letters by `shift` (positive = encrypt, negative = decrypt). Keep case and non-letters unchanged. Also support 'z' → 'a' wrapping.",
  examples:[{in:'caesar("abc", 1)', out:'"bcd"'},{in:'caesar("xyz", 3)', out:'"abc"'},{in:'caesar("Hello, World!", 2)', out:'"Jgnnq, Yqtnf!"'}],
  starter:`def caesar(text, shift):
    # your code here
    pass`,
  solution:`def caesar(text, shift):
    out = []
    for ch in text:
        if ch.isalpha():
            base = ord('A') if ch.isupper() else ord('a')
            # shift inside the 26-letter alphabet (handles wrap & negatives)
            shifted = (ord(ch) - base + shift) % 26 + base
            out.append(chr(shifted))
        else:
            out.append(ch)
    return "".join(out)`,
  hint:"ord()/chr() convert characters to numbers and back. Subtract the letter's base ('a' or 'A'), add the shift, take % 26 to wrap around, then add the base back.",
  tests:[
    'assert caesar("abc", 1) == "bcd"',
    'assert caesar("xyz", 3) == "abc"',
    'assert caesar("Hello, World!", 2) == "Jgnnq, Yqtnf!"',
    'assert caesar("bcd", -1) == "abc"',
    'assert caesar("abc", 26) == "abc"'
  ]
},
{
  id:"p11", level:"medium", title:"Parse & Validate Email Addresses", topics:["re","Validation"],
  desc:"Write `is_valid_email(s)` returning True for a reasonable email like user@domain.com (letters/digits/dots before @, domain with at least one dot). Use the `re` module.",
  examples:[{in:'is_valid_email("a@b.com")', out:"True"},{in:'is_valid_email("no-at-sign")', out:"False"},{in:'is_valid_email("x@y")', out:"False"}],
  starter:`import re

def is_valid_email(s):
    # your code here
    pass`,
  solution:`import re

def is_valid_email(s):
    pattern = r"^[\\w.+-]+@(?:[\\w-]+\\.)+[a-zA-Z]{2,}$"
    return bool(re.fullmatch(pattern, s))

    # Why fullmatch? search() would accept "junk user@x.com junk"
    # The (?:[\\w-]+\\.)+ part allows many domain levels: a.b.co.uk`,
  hint:"Build a pattern: local part ([\\w.+-]+), then @, then ONE OR MORE domain labels each ending in a dot ((?:[\\w-]+\\.)+), then 2+ letters for the final TLD. Use re.fullmatch so the WHOLE string must match.",
  tests:[
    'assert is_valid_email("a@b.com") == True',
    'assert is_valid_email("first.last+tag@sub.domain.co") == True',
    'assert is_valid_email("no-at-sign") == False',
    'assert is_valid_email("x@y") == False',
    'assert is_valid_email("@missing-local.com") == False',
    'assert is_valid_email("bad space@x.com") == False'
  ]
},
{
  id:"p12", level:"medium", title:"Group Anagrams Together", topics:["dict","Sorting"],
  desc:"Write `group_anagrams(words)` that groups words that are anagrams of each other. Return a list of groups (order of words inside a group may vary).",
  examples:[{in:'group_anagrams(["eat","tea","tan","ate","nat","bat"])', out:'Groups: [["eat","tea","ate"], ["tan","nat"], ["bat"]] (any order)'}],
  starter:`def group_anagrams(words):
    # your code here
    pass`,
  solution:`def group_anagrams(words):
    groups = {}
    for w in words:
        key = "".join(sorted(w))     # sorted letters = anagram signature
        groups.setdefault(key, []).append(w)
    return list(groups.values())`,
  hint:"Two words are anagrams exactly when their sorted letters are identical. Use that sorted string as a dict key and bucket the words under it.",
  tests:[
    `r = group_anagrams(["eat","tea","tan","ate","nat","bat"])
assert sorted([sorted(g) for g in r]) == [["ate","eat","tea"], ["bat"], ["nat","tan"]]`,
    `assert group_anagrams([]) == []`,
    `r = group_anagrams(["abc", "cba", "xyz"])
assert sorted(len(g) for g in r) == [1, 2]`
  ]
},
{
  id:"p13", level:"medium", title:"Roman Numerals Converter", topics:["dict","Math"],
  desc:"Write `to_roman(n)` (1..3999) and `from_roman(s)` converting between integers and Roman numerals. Test with 1994 → MCMXCIV.",
  examples:[{in:"to_roman(1994)", out:'"MCMXCIV"'},{in:'from_roman("MCMXCIV")', out:"1994"},{in:"to_roman(4)", out:'"IV"'}],
  starter:`def to_roman(n):
    # your code here
    pass

def from_roman(s):
    # your code here
    pass`,
  solution:`def to_roman(n):
    table = [(1000,"M"),(900,"CM"),(500,"D"),(400,"CD"),(100,"C"),
             (90,"XC"),(50,"L"),(40,"XL"),(10,"X"),(9,"IX"),
             (5,"V"),(4,"IV"),(1,"I")]
    out = []
    for value, sym in table:
        while n >= value:            # greedily take the biggest first
            out.append(sym)
            n -= value
    return "".join(out)

def from_roman(s):
    values = {"I":1,"V":5,"X":10,"L":50,"C":100,"D":500,"M":1000}
    total = 0
    for i, ch in enumerate(s):
        # subtract when a smaller value precedes a larger one (IV, IX, CM...)
        if i + 1 < len(s) and values[ch] < values[s[i+1]]:
            total -= values[ch]
        else:
            total += values[ch]
    return total`,
  hint:"To Roman: greedily subtract the largest denomination that fits. From Roman: walk left→right — if the current value is smaller than the next one, it's a subtraction case.",
  tests:[
    'assert to_roman(1994) == "MCMXCIV"',
    'assert to_roman(4) == "IV"',
    'assert to_roman(58) == "LVIII"',
    'assert to_roman(3999) == "MMMCMXCIX"',
    'assert from_roman("MCMXCIV") == 1994',
    'assert from_roman("LVIII") == 58',
    'assert from_roman("IX") == 9'
  ]
},

/* ---------------- HARD ---------------- */
{
  id:"p14", level:"hard", title:"Custom LRU Cache Decorator", topics:["Decorators","collections"],
  desc:"Implement `lru(n)` — a decorator that caches the last n results of a function. Expose `.cache_info()` with hits and misses. (Reproduce functools.lru_cache behavior yourself.)",
  examples:[{in:"@lru(2)\\ndef add(a,b): return a+b\\nadd(1,2) # 3, misses=1\\nadd(1,2) # 3, hits=1", out:"3"}],
  starter:`from functools import wraps

def lru(n):
    def deco(func):
        # store cache & counters somewhere
        @wraps(func)
        def wrapper(*args):
            pass
        return wrapper
    return deco`,
  solution:`from functools import wraps
from collections import OrderedDict

def lru(n):
    def deco(func):
        cache, hits, misses = OrderedDict(), [0], [0]

        @wraps(func)
        def wrapper(*args):
            if args in cache:
                hits[0] += 1
                cache.move_to_end(args)       # mark as recently used
                return cache[args]
            misses[0] += 1
            result = func(*args)
            cache[args] = result
            if len(cache) > n:
                cache.popitem(last=False)    # evict OLDEST (L)
            return result

        def cache_info():
            return {"hits": hits[0], "misses": misses[0], "maxsize": n}

        wrapper.cache_info = cache_info
        return wrapper
    return deco`,
  hint:"Use an OrderedDict: move_to_end on hit, popitem(last=False) when over capacity. Counters must live in the closure (lists or a mutable object) so they survive across calls.",
  tests:[
    `@lru(2)
def add(a, b): return a + b
assert add(1, 2) == 3
assert add(1, 2) == 3
info = add.cache_info()
assert info["hits"] == 1 and info["misses"] == 1`,
    `@lru(2)
def f(x): return x * 10
f(1); f(2); f(1); f(1)
info = f.cache_info()
assert info["misses"] == 2 and info["hits"] == 2`,
    `@lru(1)
def g(x): return -x
assert g(5) == -5
assert g(6) == -6
assert g.cache_info()["misses"] == 2`
  ]
},
{
  id:"p15", level:"hard", title:"Streaming File Processor (Generator)", topics:["Generators","Files"],
  desc:"Write `tally(path)` — a generator that reads a file line by line (memory-safe for huge files) and yields (line_number, word_count, char_count) per line. Use a fake in-memory file for testing.",
  examples:[{in:"lines: 'hello world', 'python rocks'  →  (1, 2, 11), (2, 2, 12)", out:"generator yields tuples"}],
  starter:`def tally(lines):
    """lines: iterable of strings (file-like). Yields (no, words, chars)."""
    # your code here — must use yield, one line at a time
    pass`,
  solution:`def tally(lines):
    for no, line in enumerate(lines, start=1):
        text = line.rstrip("\\n")
        yield no, len(text.split()), len(text)

# Why generators? A 10 GB log file costs the SAME memory as
# one line — nothing is stored until the consumer asks.`,
  hint:"Loop with enumerate(lines, start=1) so you get the line number for free. split() with no args handles multiple spaces, then len() gives the counts.",
  tests:[
    `gen = tally(["hello world\\n", "python rocks\\n"])
assert list(gen) == [(1, 2, 11), (2, 2, 12)]`,
    `assert list(tally([])) == []`,
    `gen = tally(["a b c", "one"])
assert next(gen) == (1, 3, 5)          # lazy: nothing else computed yet`
  ]
},
{
  id:"p16", level:"hard", title:"Tiny JSON Serializer", topics:["recursion","Strings"],
  desc:"Write `my_dumps(obj)` that converts Python dicts/lists/strings/numbers/bool/None into a JSON string — without using the json module. Strings need \\\" and \\\\ escapes.",
  examples:[{in:'my_dumps({"a": 1, "b": [True, None]})', out:'\'{"a": 1, "b": [true, null]}\''},{in:'my_dumps("hi")', out:'\'"hi"\''}],
  starter:`def my_dumps(obj):
    # handle: dict, list, str, int/float, bool, None
    pass`,
  solution:`def my_dumps(obj):
    if obj is None:  return "null"
    if obj is True:  return "true"
    if obj is False: return "false"
    if isinstance(obj, str):
        escaped = obj.replace("\\\\", "\\\\\\\\").replace('"', '\\\\"')
        return f'"{escaped}"'
    if isinstance(obj, (int, float)):
        return str(obj)
    if isinstance(obj, list):
        return "[" + ", ".join(my_dumps(v) for v in obj) + "]"
    if isinstance(obj, dict):
        items = ", ".join(f'{my_dumps(k)}: {my_dumps(v)}' for k, v in obj.items())
        return "{" + items + "}"
    raise TypeError(f"not JSON serializable: {type(obj)}")`,
  hint:"This is pure recursion: each container type formats its children by calling my_dumps on them. Handle scalars first (base cases), containers second. booleans are singletons — check `is True` before the int branch!",
  tests:[
    'assert my_dumps(None) == "null"',
    'assert my_dumps(True) == "true"',
    'assert my_dumps(42) == "42"',
    'assert my_dumps([1, 2]) == "[1, 2]"',
    'assert my_dumps({"a": 1, "b": [True, None]}) == \'{"a": 1, "b": [true, null]}\'',
    'assert my_dumps("hi") == \'"hi"\'',
    'assert my_dumps({}) == "{}"'
  ]
},
{
  id:"p17", level:"hard", title:"Directory Tree Reporter (pathlib)", topics:["pathlib","Files"],
  desc:"Write `tree(path, depth=2)` returning a list of strings like '  └── src/' showing a directory's structure up to `depth` levels, files before folders, sorted alphabetically.",
  examples:[{in:"tree(project, 1)", out:"['project/', '  ├── README.md', '  └── src/']"}],
  starter:`from pathlib import Path

def tree(path, depth=2):
    """Return lines describing the folder structure."""
    pass`,
  solution:`from pathlib import Path

def tree(path, depth=2):
    root = Path(path)
    lines = [root.name + "/"]

    def walk(folder, prefix, level):
        if level > depth:
            return
        entries = sorted(folder.iterdir(), key=lambda p: (not p.is_file(), p.name.lower()))
        for i, child in enumerate(entries):
            last = i == len(entries) - 1
            branch = "└── " if last else "├── "
            is_dir = child.is_dir()
            lines.append(prefix + branch + child.name + ("/" if is_dir else ""))
            if is_dir:
                walk(child, prefix + ("    " if last else "│   "), level + 1)

    walk(root, "", 1)
    return lines`,
  hint:"Sort entries so files come first, then directories. Track the prefix string ('│   ' vs '    ') as you recurse — that's what makes the tree characters line up.",
  tests:[
    `import tempfile, os
from pathlib import Path
tmp = Path(tempfile.mkdtemp())
(tmp / "README.md").write_text("hi")
(tmp / "src").mkdir()
(tmp / "src" / "main.py").write_text("print(1)")
(tmp / "src" / "util.py").write_text("#")
out = tree(tmp, 1)
assert out[0].endswith("/") and "README.md" in out[1]
assert any("src/" in l for l in out)`,
    `assert tree(tmp, 0) == [Path(tmp).name + "/"]`,
    `out2 = tree(tmp, 2)
assert sum("main.py" in l for l in out2) == 1`
  ]
},
{
  id:"p18", level:"hard", title:"Concurrent URL Pinger (ThreadPool)", topics:["threading","concurrent.futures"],
  desc:"Write `ping_all(urls, worker_fn)` that runs `worker_fn(url)` on ALL urls concurrently using ThreadPoolExecutor and returns results in the ORIGINAL order. Simulate the worker with sleep.",
  examples:[{in:"ping_all([a,b,c], fake_fetch)", out:"['a!', 'b!', 'c!'] in order, taking ~max(t) not sum(t)"}],
  starter:`from concurrent.futures import ThreadPoolExecutor

def ping_all(urls, worker_fn):
    """Run worker_fn on every url concurrently, results in input order."""
    pass`,
  solution:`from concurrent.futures import ThreadPoolExecutor

def ping_all(urls, worker_fn):
    # max_workers=10 keeps us polite to servers
    with ThreadPoolExecutor(max_workers=10) as pool:
        # pool.map preserves ORDER (unlike submitting manually)
        return list(pool.map(worker_fn, urls))`,
  hint:"ThreadPoolExecutor.map() returns an iterator that yields results in the same order as the input iterable — even though they finish out of order. Just wrap it in list().",
  tests:[
    `import time
def fake(url):
    time.sleep(0.05)
    return url + "!"
assert ping_all(["a.com", "b.com", "c.com"], fake) == ["a.com!", "b.com!", "c.com!"]`,
    `# results must preserve input order even if later urls are faster
def fast_last(url):
    time.sleep(0.02 if url == "first" else 0.0)
    return url
assert ping_all(["first", "second"], fast_last) == ["first", "second"]`,
    `assert ping_all([], fake) == []`
  ]
},
{
  id:"p19", level:"hard", title:"Class: Gradebook with Reports", topics:["OOP","dataclasses"],
  desc:"Build class `Gradebook` with add(name, score), average(name), top(n), and pass_rate(threshold). Handle unknown students by raising KeyError.",
  examples:[{in:'gb = Gradebook()\\ngb.add("Ali", 88)\\ngb.add("Ali", 92)\\ngb.average("Ali")', out:"90.0"}],
  starter:`class Gradebook:
    def __init__(self):
        pass

    def add(self, name, score):
        pass

    def average(self, name):
        pass

    def top(self, n):
        pass

    def pass_rate(self, threshold):
        pass`,
  solution:`class Gradebook:
    def __init__(self):
        self._scores = {}               # name -> list of scores

    def add(self, name, score):
        if not 0 <= score <= 100:
            raise ValueError("score must be 0..100")
        self._scores.setdefault(name, []).append(score)

    def average(self, name):
        if name not in self._scores:    # explicit KeyError with message
            raise KeyError(f"no student named {name!r}")
        vals = self._scores[name]
        return sum(vals) / len(vals)

    def top(self, n):
        ranked = sorted(
            ((name, sum(v)/len(v)) for name, v in self._scores.items()),
            key=lambda kv: kv[1], reverse=True)
        return ranked[:n]

    def pass_rate(self, threshold):
        if not self._scores:
            return 0.0
        scores = [s for v in self._scores.values() for s in v]
        return round(100 * sum(s >= threshold for s in scores) / len(scores), 1)`,
  hint:"Store scores in a dict of lists: name → [scores]. Every report is then a short generator over that structure. Validate inputs at the boundary (add) and raise KeyError early for unknown names.",
  tests:[
    `gb = Gradebook()
gb.add("Ali", 88); gb.add("Ali", 92)
assert gb.average("Ali") == 90.0`,
    `gb.add("Noor", 70); gb.add("Sara", 95)
assert gb.top(1) == [("Sara", 95.0)]`,
    `gb2 = Gradebook()
gb2.add("A", 60); gb2.add("A", 40); gb2.add("B", 90)
assert gb2.pass_rate(50) == 66.7`,
    `try:
    gb2.average("Ghost")
    raise AssertionError("should have raised")
except KeyError:
    pass`
  ]
},
{
  id:"p20", level:"hard", title:"Mini SQL SELECT Engine", topics:["dict","lambda"],
  desc:"Implement `select(rows, where=None, order_by=None, limit=None)` where rows is a list of dicts. where = dict of column:value equality filters, order_by = (column, reverse_flag).",
  examples:[{in:'select(rows, where={"dept":"ENG"}, order_by=("score", True))', out:'[{...}] filtered & sorted'}],
  starter:`def select(rows, where=None, order_by=None, limit=None):
    """
    rows: [{"name":"Ali","dept":"ENG","score":88}, ...]
    where: {"dept": "ENG"}      -> equality filters (AND)
    order_by: ("score", True)   -> column, reverse?
    limit: int
    """
    pass`,
  solution:`def select(rows, where=None, order_by=None, limit=None):
    result = list(rows)

    # 1) filter — ALL conditions must match (AND)
    if where:
        result = [r for r in result
                  if all(r.get(k) == v for k, v in where.items())]

    # 2) sort — stable, by the requested column
    if order_by:
        column, reverse = order_by
        result.sort(key=lambda r: r[column], reverse=reverse)

    # 3) limit
    if limit is not None:
        result = result[:limit]

    return result`,
  hint:"Think of it as three independent pipeline stages: filter → sort → slice. Each stage is one line with a comprehension/slice, applied only if its argument was provided.",
  tests:[
    `rows = [
      {"name":"Ali","dept":"ENG","score":88},
      {"name":"Noor","dept":"DES","score":95},
      {"name":"Sara","dept":"ENG","score":82},
      {"name":"Omar","dept":"ENG","score":91},
    ]
r = select(rows, where={"dept":"ENG"})
assert [x["name"] for x in r] == ["Ali", "Sara", "Omar"]`,
    `r = select(rows, order_by=("score", True), limit=2)
assert r[0]["name"] == "Noor" and len(r) == 2`,
    `assert select(rows, where={"dept":"ENG","score":88})[0]["name"] == "Ali"`,
    `assert select(rows) == rows          # no args = untouched copy`
  ]
}
];

/* Level descriptions used in UI */
const LEVEL_INFO = {
  easy:   { label:"Easy",   blurb:"Fundamentals — finish in 10–20 min each" },
  medium: { label:"Medium", blurb:"Real patterns — combine 2–3 concepts" },
  hard:   { label:"Hard",   blurb:"Interview-grade — data structures & design" }
};
