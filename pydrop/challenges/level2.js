window.LEVEL2 = [
  {
    id: 222,
    title: "Welcome to Level 2: Functions & Logic",
    kind: "intro",
    topic: "Introduction",
    level: 2,
    instructions: `<p>Level 1 was about values and how to store them. This level is about turning code into reusable tools: <code>def</code>, parameters, return values, <code>*args</code>/<code>**kwargs</code>, closures, comprehensions, and regular expressions for pattern matching in text.</p>
<p>Along the way you'll build several small, real projects adapted from published Python books (a curse generator, a password checker, a Twelve Days of Christmas printer), each one a payoff for the concepts right before it, not a detour from them. By the end, you'll be able to write your own functions instead of copy-pasting the same logic everywhere.</p>`,
    starterCode: ""
  },
  {
    id: 109,
    title: "Regex Basics",
    difficulty: "easy",
    topic: "Regex",
    level: 2,
    xp: 10,
    instructions: `<p>A <strong>regular expression</strong> (regex) is a pattern for matching pieces of text, built into Python through the <code>re</code> module. <code>re.findall(pattern, text)</code> returns every non-overlapping match as a list of strings, which makes it perfect for pulling structured pieces out of a bigger block of text. <code>\\d</code> matches any single digit, and <code>\\d+</code> matches one or more digits in a row.</p>
<ul>
  <li><strong>Pattern:</strong> a mini language describing what to match: <code>\\d+</code> means "a run of one or more digit characters," not the literal text "\\d+".</li>
</ul>
<p class="blueprint-line"><code>re.findall(pattern, text)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>import re
line = "room 12b, seat 7"
codes = re.findall(r"\\d+", line)
print(codes)  # Output: ['12', '7']</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Every match re.findall() returns is a string, even when it looks like a number. "12" is not 12. Wrap it in int() if you need to do arithmetic with it.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Import <code>re</code>, then use <code>re.findall()</code> with the pattern <code>r"\\d+"</code> to extract every run of digits in <code>text</code> into a list called <code>numbers</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">"Order #4521 shipped on 2024-03-15"</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">["4521", "2024", "03", "15"]</code></div>
</div>`,
    hints: [
      "import re",
      "numbers = re.findall(r\"\\d+\", text)",
      "Each match comes back as a string, even though it looks like a number."
    ],
    starterCode: 'text = "Order #4521 shipped on 2024-03-15"\n# Extract every run of digits into numbers\n',
    solution: 'import re\ntext = "Order #4521 shipped on 2024-03-15"\nnumbers = re.findall(r"\\d+", text)',
    validation: {
      checks: [
        { type: "hasImport", module: "re", message: "Import the re module." },
        { type: "matchesRegex", pattern: "re\\.findall\\(", message: "Use re.findall() to extract the matches." },
        { type: "matchesRegex", pattern: "\\\\d\\+", message: "Use the pattern \\d+ to match runs of digits." }
      ],
      pyTests: [
        { code: "assert numbers == ['4521', '2024', '03', '15']", message: "'numbers' should be ['4521', '2024', '03', '15']." }
      ]
    },
    explanation: `<p><code>\\d</code> matches a single digit character, and the <code>+</code> means "one or more of the previous thing," so <code>\\d+</code> greedily grabs a whole run of digits at once. <code>re.findall()</code> scans the entire string and returns every match it finds, left to right.</p>`
  },
  {
    id: 110,
    title: "Input Validation with Regex",
    difficulty: "easy",
    topic: "Regex",
    level: 2,
    xp: 10,
    instructions: `<p>While <code>re.findall()</code> pulls matches out of a string, <code>re.fullmatch(pattern, text)</code> checks whether the <strong>entire</strong> string matches a pattern, which makes it the right tool for validating input rather than searching through it. A character class like <code>[A-Za-z0-9_]</code> matches any single letter, digit, or underscore, and <code>{3,16}</code> means "repeated 3 to 16 times."</p>
<ul>
  <li><strong>re.fullmatch():</strong> only succeeds if the pattern accounts for the whole string, start to end. One stray character anywhere fails it.</li>
</ul>
<p class="blueprint-line"><code>re.fullmatch(pattern, text)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>import re
code = "AB-42"
ok = re.fullmatch(r"[A-Z]{2}-\\d{2}", code) is not None
print(ok)  # Output: True</code></pre>
</div>
<p><strong>Shorthand</strong></p>
<ul>
  <li><code>[A-Za-z0-9_]</code> matches any single letter, digit, or underscore (one character wide).</li>
  <li><code>{3,16}</code> repeats whatever comes before it between 3 and 16 times.</li>
</ul>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>re.fullmatch() returns a match object (truthy) or None (falsy) rather than a plain boolean, so wrap it with "is not None" to get an actual True or False.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>is_valid</code> as a boolean that's <code>True</code> if <code>username</code> is 3 to 16 characters long and contains only letters, digits, or underscores, using <code>re.fullmatch()</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">username = "cool_coder_99"</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">is_valid = True</code></div>
</div>`,
    hints: [
      "import re",
      "is_valid = re.fullmatch(r\"[A-Za-z0-9_]{3,16}\", username) is not None"
    ],
    starterCode: 'username = "cool_coder_99"\n# Validate the username with re.fullmatch()\n',
    solution: 'import re\nusername = "cool_coder_99"\nis_valid = re.fullmatch(r"[A-Za-z0-9_]{3,16}", username) is not None',
    validation: {
      checks: [
        { type: "hasImport", module: "re", message: "Import the re module." },
        { type: "matchesRegex", pattern: "re\\.fullmatch\\(", message: "Use re.fullmatch() to validate the whole string." },
        { type: "matchesRegex", pattern: "\\{3,16\\}", message: "Require a length between 3 and 16 characters." }
      ],
      pyTests: [
        { code: "assert is_valid is True", message: "'is_valid' should be True for \"cool_coder_99\"." }
      ]
    },
    explanation: `<p><code>re.search()</code> or <code>re.findall()</code> would still match a valid chunk even if the string had invalid characters elsewhere, since they only look for matches somewhere in the text. <code>re.fullmatch()</code> is stricter: the whole string, start to end, has to fit the pattern.</p>`
  },
  {
    id: 111,
    title: "Guided Project: Password Strength",
    difficulty: "medium",
    topic: "Regex",
    level: 2,
    xp: 20,
    kind: "project",
    source: "Tiny Python Projects #20, \"Password Strength\"",
    instructions: `<p>The original Password Strength project generates a random password that satisfies a set of rules. Since randomness hasn't come up yet, this version flips the problem around: instead of generating a password, you'll check whether a given one is strong enough, which is arguably the more common real-world version of this problem anyway. It combines the character classes and quantifiers from Regex Basics and Input Validation with Regex with one new piece: <code>re.search()</code>, which checks whether a pattern occurs anywhere in a string, unlike <code>re.fullmatch()</code> which needs the whole string to fit.</p>
<p class="blueprint-line"><code>re.search(pattern, text) is not None</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>import re
text = "cat42"
has_digit = re.search(r"\\d", text) is not None
print(has_digit)  # Output: True</code></pre>
</div>
<p><strong>New pieces in this project</strong></p>
<ul>
  <li><code>re.search()</code>: returns a match if the pattern appears anywhere in the string. One hit is enough, unlike <code>re.fullmatch()</code> which needs the entire string to fit the pattern.</li>
</ul>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>is_strong</code> as <code>True</code> only if <code>password</code> is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, and one digit.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">password = "Tr0ub4dor"</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">is_strong = True</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>All four conditions have to hold at once. A 10-character password with no digits, for example, should still come out False.</span>
</div>`,
    hints: [
      "has_upper = re.search(r\"[A-Z]\", password) is not None",
      "has_lower = re.search(r\"[a-z]\", password) is not None",
      "has_digit = re.search(r\"\\d\", password) is not None",
      "is_strong = len(password) >= 8 and has_upper and has_lower and has_digit"
    ],
    starterCode: 'import re\npassword = "Tr0ub4dor"\n# Check length, uppercase, lowercase, and digit\n',
    solution: 'import re\npassword = "Tr0ub4dor"\nhas_upper = re.search(r"[A-Z]", password) is not None\nhas_lower = re.search(r"[a-z]", password) is not None\nhas_digit = re.search(r"\\d", password) is not None\nis_strong = len(password) >= 8 and has_upper and has_lower and has_digit',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "re\\.search\\(", message: "Use re.search() to check for each required character type." },
        { type: "matchesRegex", pattern: "\\bis_strong\\s*=", message: "Store the final result in a variable named 'is_strong'." },
        { type: "matchesRegex", pattern: "len\\(\\s*password\\s*\\)\\s*>=\\s*8", message: "Require at least 8 characters." }
      ],
      pyTests: [
        { code: "assert is_strong is True", message: "'is_strong' should be True for \"Tr0ub4dor\" (9 characters, mixed case, has a digit)." }
      ]
    },
    explanation: `<p>Combining several <code>re.search()</code> checks with <code>and</code> is a common pattern for "all of these rules must pass" validation. Each search only needs to find one match anywhere in the string, unlike <code>re.fullmatch()</code> which needs the whole string to fit one pattern.</p>`
  },
  {
    id: 21,
    title: "Define a Simple Function",
    difficulty: "easy",
    topic: "Functions",
    level: 2,
    xp: 10,
    instructions: `<p>Functions group reusable code so you can run the same steps again without retyping them. Define one with the <code>def</code> keyword, a name, parentheses, and a colon; the body is indented underneath. Once defined, you call it by name followed by parentheses, and <code>return</code> sends a value back to whoever called it.</p>
<ul>
  <li><strong>return:</strong> hands a value back to whoever called the function. Without it, calling the function gives you <code>None</code>.</li>
</ul>
<p class="blueprint-line"><code>def function_name():</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def shout():
    return "HEY!"

print(shout())  # Output: HEY!</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function named <code>say_hello</code> that takes no parameters and returns the string <code>"Hello!"</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">say_hello()</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">"Hello!"</code></div>
</div>`,
    hints: [
      "def say_hello():",
      "    return \"Hello!\""
    ],
    starterCode: "# Define a function named say_hello\n",
    solution: 'def say_hello():\n    return "Hello!"',
    validation: {
      checks: [
        { type: "hasValidDef", name: "say_hello", message: "Define a function named 'say_hello' with a colon: def say_hello():" },
        { type: "hasReturn", message: "The function must return a value." }
      ],
      pyTests: [
        { code: "assert say_hello() == 'Hello!'", message: "say_hello() should return \"Hello!\"." }
      ]
    },
    explanation: `<p>Every function starts with <code>def</code>. The body must be indented (4 spaces by convention). <code>return</code> sends a value back to the caller. Without <code>return</code>, Python returns <code>None</code>.</p>`
  },
  {
    id: 22,
    title: "Function with Parameters",
    difficulty: "easy",
    topic: "Functions",
    level: 2,
    xp: 10,
    instructions: `<p>Parameters are what let the same function work on any input, not just the specific value you originally wrote it for. They're inputs to your function, listed inside the parentheses. Whatever values you pass in when you call the function get matched up with those parameter names in order, so the function can use them in its calculations.</p>
<ul>
  <li><strong>Parameter:</strong> the placeholder name written in the function's own definition, like <code>a</code> in <code>def add(a, b):</code>.</li>
  <li><strong>Argument:</strong> the actual value handed over at the call site, like the <code>2</code> in <code>add(2, 3)</code>. It gets matched to <code>a</code> by position.</li>
</ul>
<p class="blueprint-line"><code>def function_name(param1, param2):</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def greet(name, times):
    return name * times

print(greet("hi ", 3))  # Output: hi hi hi </code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>add</code> that takes two parameters <code>a</code> and <code>b</code> and returns their sum.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">add(2, 3)</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">5</code></div>
</div>`,
    hints: [
      "def add(a, b):",
      "    return a + b"
    ],
    starterCode: "# Define an add function\n",
    solution: "def add(a, b):\n    return a + b",
    validation: {
      checks: [
        { type: "hasValidDef", name: "add", message: "Define a function named 'add' with a colon: def add(a, b):" },
        { type: "matchesRegex", pattern: "def\\s+add\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*\\)", message: "The function should accept two parameters." },
        { type: "hasReturn", message: "Return the sum of the two parameters." }
      ],
      pyTests: [
        { code: "assert add(2, 3) == 5", message: "add(2, 3) should return 5." },
        { code: "assert add(-1, 1) == 0", message: "add(-1, 1) should return 0." },
        { code: "assert add(0, 0) == 0", message: "add(0, 0) should return 0." }
      ]
    },
    explanation: `<p>Parameters are placeholders defined in the function signature. The actual values passed when calling the function are called arguments. Inside the function, you use parameters by name.</p>`
  },
  {
    id: 23,
    title: "Function with Return Value",
    difficulty: "easy",
    topic: "Functions",
    level: 2,
    xp: 10,
    instructions: `<p>Functions compute and return results, and the caller receives that return value to use however it needs. Once a function is defined, you can call it as many times as you like with different inputs, and it'll compute a fresh result each time.</p>
<ul>
  <li><strong>Return value:</strong> whatever follows <code>return</code>, sent back to the exact spot where the function was called, ready to be stored, printed, or used in another expression.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def cube(n):
    return n * n * n

result = cube(3)
print(result)  # Output: 27</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>square</code> that takes one parameter <code>n</code> and returns <code>n</code> multiplied by itself.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">square(4)</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">16</code></div>
</div>`,
    hints: [
      "def square(n):",
      "    return n * n  (or n ** 2)"
    ],
    starterCode: "# Define a square function\n",
    solution: "def square(n):\n    return n * n",
    validation: {
      checks: [
        { type: "hasValidDef", name: "square", message: "Define a function named 'square' with a colon: def square(n):" },
        { type: "matchesRegex", pattern: "def\\s+square\\s*\\(\\s*\\w+\\s*\\)", message: "Accept one parameter." },
        { type: "matchesRegex", pattern: "return\\s+n\\s*\\*\\s*n|return\\s+n\\s*\\*\\*\\s*2", message: "Return n squared: return n * n  or  return n ** 2." }
      ],
      pyTests: [
        { code: "assert square(4) == 16", message: "square(4) should return 16." },
        { code: "assert square(-3) == 9", message: "square(-3) should return 9." },
        { code: "assert square(0) == 0", message: "square(0) should return 0." }
      ]
    },
    explanation: `<p>You can compute the square two ways: <code>n * n</code> or <code>n ** 2</code>. The <code>**</code> operator is Python's exponentiation operator. Both are equally correct here.</p>`
  },
  {
    id: 24,
    title: "Default Parameter Values",
    difficulty: "easy",
    topic: "Functions",
    level: 2,
    xp: 10,
    instructions: `<p>Handy any time most callers want the same value and only a few need something different, so they don't have to type it out every single time. You can give a parameter a default value, which makes it optional when calling the function. Leave it out and Python uses the default; pass something and it overrides it.</p>
<ul>
  <li><strong>Default value:</strong> written as <code>name=value</code> in the function's own parentheses. It's used only when the caller doesn't supply that argument.</li>
</ul>
<p class="blueprint-line"><code>def function_name(param=default_value):</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def power(base, exponent=2):
    return base ** exponent

print(power(5))     # Output: 25
print(power(5, 3))  # Output: 125</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Parameters with a default have to come after any parameters without one. def greet(name="World", extra) would be a syntax error.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>greet</code> that takes a parameter <code>name</code> with a default value of <code>"World"</code> and returns the string <code>f"Hello, {name}!"</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">greet()</span><code class="io-val">"Hello, World!"</code></div>
  <div class="io-row"><span class="io-key">greet("Alice")</span><code class="io-val">"Hello, Alice!"</code></div>
</div>`,
    hints: [
      "def greet(name=\"World\"):",
      "    return f\"Hello, {name}!\""
    ],
    starterCode: "# Define greet with a default parameter\n",
    solution: 'def greet(name="World"):\n    return f"Hello, {name}!"',
    validation: {
      checks: [
        { type: "hasValidDef", name: "greet", message: "Define a function named 'greet' with a colon: def greet(name=...):" },
        { type: "matchesRegex", pattern: "=\\s*['\"]World['\"]", message: "Set the default value of name to \"World\"." },
        { type: "matchesRegex", pattern: "f['\"]", message: "Return an f-string." }
      ],
      pyTests: [
        { code: "assert greet() == 'Hello, World!'", message: "greet() with no argument should return \"Hello, World!\"." },
        { code: "assert greet('Alice') == 'Hello, Alice!'", message: "greet('Alice') should return \"Hello, Alice!\"." }
      ]
    },
    explanation: `<p>Default parameters let callers omit arguments: <code>greet()</code> uses "World", <code>greet("Alice")</code> uses "Alice". Parameters with defaults must come after parameters without defaults.</p>`
  },
  {
    id: 25,
    title: "Multiple Return Values",
    difficulty: "easy",
    topic: "Functions",
    level: 2,
    xp: 10,
    instructions: `<p>Useful any time a function's natural answer is more than one related value, like a coordinate pair or a minimum and a maximum, without needing a separate class or dict just to hold them. Python functions can return more than one value at once by returning a tuple, separating the values with a comma. The caller can then unpack them straight into separate variables in a single line.</p>
<ul>
  <li><strong>Tuple packing:</strong> <code>return a, b</code> bundles both values into a single tuple <code>(a, b)</code> behind the scenes. The commas are what create it, not the parentheses.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def divmod_pair(a, b):
    return a // b, a % b

quotient, remainder = divmod_pair(17, 5)
print(quotient, remainder)  # Output: 3 2</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>min_max</code> that takes a list <code>nums</code> and returns both the minimum and maximum values (in that order).</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">min_max([3, 1, 4, 1, 5])</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">(1, 5)</code></div>
</div>`,
    hints: [
      "Use min(nums) and max(nums) to get the values.",
      "return min(nums), max(nums)  returns a tuple"
    ],
    starterCode: "# Define min_max to return (minimum, maximum)\n",
    solution: "def min_max(nums):\n    return min(nums), max(nums)",
    validation: {
      checks: [
        { type: "hasValidDef", name: "min_max", message: "Define a function named 'min_max' with a colon: def min_max(nums):" },
        { type: "matchesRegex", pattern: "return\\s+min\\s*\\(", message: "Use the built-in min() function. Lists have no .min() method." },
        { type: "matchesRegex", pattern: "return\\s+min.*max\\s*\\(|return\\s+min.*,.*max", message: "Return both min and max values separated by a comma." }
      ],
      pyTests: [
        { code: "assert min_max([3, 1, 4, 1, 5]) == (1, 5)", message: "min_max([3, 1, 4, 1, 5]) should return (1, 5)." },
        { code: "assert min_max([7]) == (7, 7)", message: "min_max([7]) should return (7, 7)." }
      ]
    },
    explanation: `<p>When you write <code>return a, b</code>, Python packs the values into a tuple. The caller can unpack them: <code>lo, hi = min_max([3, 1, 4, 1, 5])</code>. This is cleaner than returning a list or dictionary for small fixed-size results.</p>`
  },
  {
    id: 112,
    title: "Guided Project: Bottles of Beer",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    kind: "project",
    source: "Tiny Python Projects #11, \"Bottles of Beer\"",
    instructions: `<p>The "99 Bottles of Beer" song repeats the same line with one number changing each verse, except the grammar shifts at the edges: "bottles" becomes "bottle" for exactly one, and "no more bottles" replaces the number entirely at zero. This project from <em>Tiny Python Projects</em> combines defining a function that returns a value with the <code>if</code> branching you already know: the real work is getting all three grammatical cases right, not just the common one.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>verse</code> that takes a bottle count <code>n</code> and returns the correct line for that count.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">verse(3)</span><code class="io-val">"3 bottles of beer on the wall, 3 bottles of beer."</code></div>
  <div class="io-row"><span class="io-key">verse(1)</span><code class="io-val">"1 bottle of beer on the wall, 1 bottle of beer."</code></div>
  <div class="io-row"><span class="io-key">verse(0)</span><code class="io-val">"No more bottles of beer on the wall, no more bottles of beer."</code></div>
</div>`,
    hints: [
      "if n == 0: return \"No more bottles of beer on the wall, no more bottles of beer.\"",
      "if n == 1: return \"1 bottle of beer on the wall, 1 bottle of beer.\"",
      "Otherwise: return f\"{n} bottles of beer on the wall, {n} bottles of beer.\""
    ],
    starterCode: "# Define verse(n) with the correct grammar for 0, 1, and everything else\n",
    solution: 'def verse(n):\n    if n == 0:\n        return "No more bottles of beer on the wall, no more bottles of beer."\n    if n == 1:\n        return "1 bottle of beer on the wall, 1 bottle of beer."\n    return f"{n} bottles of beer on the wall, {n} bottles of beer."',
    validation: {
      checks: [
        { type: "hasValidDef", name: "verse", message: "Define a function named 'verse' with a colon: def verse(n):" },
        { type: "codeContains", value: "bottle", message: "Return a line mentioning bottles." }
      ],
      pyTests: [
        { code: "assert verse(3) == '3 bottles of beer on the wall, 3 bottles of beer.'", message: "verse(3) should use the plural \"bottles\"." },
        { code: "assert verse(1) == '1 bottle of beer on the wall, 1 bottle of beer.'", message: "verse(1) should use the singular \"bottle\", not \"bottles\"." },
        { code: "assert verse(0) == 'No more bottles of beer on the wall, no more bottles of beer.'", message: "verse(0) should replace the number with \"No more\" / \"no more\"." }
      ]
    },
    explanation: `<p>This is exactly the kind of function that's easy to get "mostly" right and then quietly wrong at the edges. Testing all three cases, not just the common one, is what catches the singular/plural mistake before it ships.</p>`
  },
  {
    id: 26,
    title: "*args: Variable Positional Arguments",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>The <code>*args</code> syntax lets a function accept any number of positional arguments, whether you call it with one, five, or none at all. Inside the function, <code>args</code> is just a regular tuple holding whatever was passed in, ready to loop over or pass to another function.</p>
<p><code>print("a", "b", "c")</code> works no matter how many arguments you give it because <code>print()</code> is defined with something like <code>*args</code> under the hood, and so are <code>max()</code> and <code>min()</code>.</p>
<ul>
  <li><strong>*args:</strong> collects every extra positional argument into one tuple named <code>args</code>. The star is what triggers the collecting, "args" is just the conventional name.</li>
</ul>
<p class="blueprint-line"><code>def function_name(*args):</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def loudest(*args):
    return max(args)

print(loudest(3, 9, 4))  # Output: 9</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>total</code> that accepts any number of numbers using <code>*args</code> and returns their sum.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">total(1, 2, 3)</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">6</code></div>
</div>`,
    hints: [
      "def total(*args):",
      "    return sum(args)"
    ],
    starterCode: "# Define total using *args\n",
    solution: "def total(*args):\n    return sum(args)",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "def\\s+total\\s*\\(\\s*\\*args\\s*\\)\\s*:", message: "Define the function correctly with a colon: def total(*args):" },
        { type: "matchesRegex", pattern: "return\\s+sum\\s*\\(\\s*args\\s*\\)|return\\s+\\w*\\s*args", message: "Return the sum of args, e.g. return sum(args)." }
      ],
      pyTests: [
        { code: "assert total(1, 2, 3) == 6", message: "total(1, 2, 3) should return 6." },
        { code: "assert total() == 0", message: "total() with no arguments should return 0." },
        { code: "assert total(5) == 5", message: "total(5) should return 5." }
      ]
    },
    explanation: `<p>Inside the function, <code>args</code> is a tuple of all positional arguments passed. You can iterate over it or pass it to functions like <code>sum()</code>. The name <code>args</code> is a convention. The <code>*</code> is what matters.</p>`
  },
  {
    id: 27,
    title: "**kwargs: Variable Keyword Arguments",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>The <code>**kwargs</code> syntax collects any number of keyword arguments (name=value pairs) into a regular dictionary. It's the keyword counterpart to <code>*args</code>, useful whenever a function needs to accept an open-ended set of named options.</p>
<p class="blueprint-line"><code>def function_name(**kwargs):</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def show_config(**kwargs):
    return len(kwargs)

print(show_config(debug=True, retries=3))  # Output: 2</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>describe</code> that accepts any keyword arguments and returns a string listing them in the format <code>"key=value"</code> joined by commas.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">describe(a=1, b=2)</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">"a=1, b=2"</code></div>
</div>`,
    hints: [
      "def describe(**kwargs):",
      "    return \", \".join(f\"{k}={v}\" for k, v in kwargs.items())"
    ],
    starterCode: "# Define describe using **kwargs\n",
    solution: 'def describe(**kwargs):\n    return ", ".join(f"{k}={v}" for k, v in kwargs.items())',
    validation: {
      checks: [
        { type: "hasValidDef", name: "describe", message: "Define a function named 'describe' with a colon: def describe(**kwargs):" },
        { type: "matchesRegex", pattern: "\\*\\*kwargs", message: "Use **kwargs to accept variable keyword arguments." },
        { type: "matchesRegex", pattern: "\\.items\\(\\)", message: "Iterate over kwargs.items() to get key-value pairs." }
      ],
      pyTests: [
        { code: "assert describe(a=1, b=2) == 'a=1, b=2'", message: "describe(a=1, b=2) should return \"a=1, b=2\"." },
        { code: "assert describe(x=9) == 'x=9'", message: "describe(x=9) should return \"x=9\"." }
      ]
    },
    explanation: `<p>Inside the function, <code>kwargs</code> is a regular dictionary. <code>**kwargs</code> is used to accept optional named parameters, like configuration options or form fields.</p>`
  },
  {
    id: 28,
    title: "Recursive Function",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>Some problems are naturally defined in terms of smaller versions of themselves, like a factorial, or walking into a folder that contains more folders. A loop would need extra bookkeeping to track "where am I in this," while a <strong>recursive function</strong> calls itself with a smaller version of the same problem, over and over, until it reaches a case simple enough to answer directly, called the base case. Every recursive function needs one, or it calls itself forever.</p>
<p>Trace <code>factorial(3)</code> to see it happen: it needs <code>3 * factorial(2)</code>, which needs <code>2 * factorial(1)</code>, which needs <code>1 * factorial(0)</code>. <code>factorial(0)</code> is the base case, so it just returns <code>1</code> without calling itself again. Then the answers unwind back up: <code>1 * 1 = 1</code>, then <code>2 * 1 = 2</code>, then <code>3 * 2 = 6</code>. Each call waits on the one below it before it can finish.</p>
<ul>
  <li><strong>Recursive step:</strong> the part where the function calls itself again, but with a smaller or simpler version of the original problem, moving it closer to the base case.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def countdown_sum(n):
    if n == 0:
        return 0
    return n + countdown_sum(n - 1)

print(countdown_sum(4))  # Output: 10</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Forgetting the base case, or writing a recursive call that never actually gets closer to it, raises a RecursionError once Python's call stack runs too deep.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a recursive function <code>factorial</code> that takes an integer <code>n</code> and returns <code>n!</code> (n factorial).</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">factorial(5)</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">120</code></div>
</div>`,
    hints: [
      "if n == 0: return 1",
      "return n * factorial(n - 1)"
    ],
    starterCode: "# Define a recursive factorial function\n",
    solution: "def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)",
    validation: {
      checks: [
        { type: "hasValidDef", name: "factorial", message: "Define a function named 'factorial' with a colon: def factorial(n):" },
        { type: "matchesRegex", pattern: "factorial\\(n\\s*-\\s*1\\)", message: "Make a recursive call: factorial(n - 1)." },
        { type: "matchesRegex", pattern: "if.*n.*==.*0|if.*n.*<.*1", message: "Include a base case (when n == 0)." }
      ],
      pyTests: [
        { code: "assert factorial(0) == 1", message: "factorial(0) should return 1." },
        { code: "assert factorial(5) == 120", message: "factorial(5) should return 120." },
        { code: "assert factorial(1) == 1", message: "factorial(1) should return 1." }
      ]
    },
    explanation: `<p>Every recursive function needs a base case (to stop) and a recursive step (to reduce the problem). Without a base case, the function calls itself forever and raises a <code>RecursionError</code>.</p>`
  },
  {
    id: 29,
    title: "List Comprehension",
    difficulty: "medium",
    topic: "Comprehensions",
    level: 2,
    xp: 20,
    instructions: `<p>A list comprehension builds a new list by applying an expression to each item in an existing iterable, all in one concise line, instead of writing a full for-loop with an <code>append()</code> call. The pattern reads almost like plain English: <code>[expression for item in iterable]</code>.</p>
<ul>
  <li><strong>Expression:</strong> the part before <code>for</code>. It's evaluated once per item and becomes that item's slot in the new list.</li>
</ul>
<p class="blueprint-line"><code>[expression for item in iterable]</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>words = ["go", "python", "ai"]
lengths = [len(w) for w in words]
print(lengths)  # Output: [2, 6, 2]</code></pre>
</div>
<p><strong>Shorthand</strong></p>
<ul>
  <li><code>[n**2 for n in numbers]</code> squares every item.</li>
  <li><code>[n for n in numbers if n % 2 == 0]</code> adds a filter, keeping only items where the condition is true.</li>
</ul>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>squares</code> as a list comprehension that contains the square of each number in <code>numbers</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">numbers = [1, 2, 3, 4, 5]</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">[1, 4, 9, 16, 25]</code></div>
</div>`,
    hints: [
      "squares = [n ** 2 for n in numbers]",
      "The pattern is: [expression for item in iterable]"
    ],
    starterCode: "numbers = [1, 2, 3, 4, 5]\n# Create squares using a list comprehension\n",
    solution: "numbers = [1, 2, 3, 4, 5]\nsquares = [n ** 2 for n in numbers]",
    validation: {
      checks: [
        { type: "hasListComp", message: "Use a list comprehension [... for ... in ...]." },
        { type: "codeContains", value: "squares", message: "Store the result in 'squares'." },
        { type: "matchesRegex", pattern: "\\*\\*\\s*2|\\*\\s*n|n\\s*\\*", message: "Square each number in the comprehension." }
      ],
      pyTests: [
        { code: "assert squares == [1, 4, 9, 16, 25]", message: "'squares' should be [1, 4, 9, 16, 25]." }
      ]
    },
    explanation: `<p>List comprehensions replace a for-loop + append pattern with one expressive line. They are faster and more Pythonic. You can also add a filter: <code>[n**2 for n in numbers if n % 2 == 0]</code>.</p>`
  },
  {
    id: 30,
    title: "Dictionary Comprehension",
    difficulty: "medium",
    topic: "Comprehensions",
    level: 2,
    xp: 20,
    instructions: `<p>The same conciseness win as a list comprehension, now for building a dict instead of a list. Dictionary comprehensions are the dictionary equivalent of list comprehensions, building a dict in one line using <code>{key: value for item in iterable}</code>. The colon separates what becomes the key from what becomes the value.</p>
<p class="blueprint-line"><code>{key_expr: value_expr for item in iterable}</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>names = ["ana", "bo", "cy"]
first_letters = {name: name[0] for name in names}
print(first_letters)  # Output: {'ana': 'a', 'bo': 'b', 'cy': 'c'}</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create a dictionary <code>word_lengths</code> where each key is a word from <code>words</code> and each value is the length of that word.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">words = ["hello", "world", "python"]</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">{"hello": 5, "world": 5, "python": 6}</code></div>
</div>`,
    hints: [
      "word_lengths = {word: len(word) for word in words}",
      "The pattern is: {key_expr: value_expr for item in iterable}"
    ],
    starterCode: 'words = ["hello", "world", "python"]\n# Create word_lengths using a dict comprehension\n',
    solution: 'words = ["hello", "world", "python"]\nword_lengths = {word: len(word) for word in words}',
    validation: {
      checks: [
        { type: "hasDictComp", message: "Use a dictionary comprehension {key: value for ...}." },
        { type: "codeContains", value: "word_lengths", message: "Store the result in 'word_lengths'." },
        { type: "matchesRegex", pattern: "len\\(", message: "Use len() to get each word's length." }
      ],
      pyTests: [
        { code: "assert word_lengths == {'hello': 5, 'world': 5, 'python': 6}", message: "'word_lengths' should map each word to its length." }
      ]
    },
    explanation: `<p>Dictionary comprehensions are the dict equivalent of list comprehensions. The colon separates the key expression from the value expression. They are great for transforming or filtering existing mappings.</p>`
  },
  {
    id: 113,
    title: "The random Module",
    difficulty: "easy",
    topic: "Randomness",
    level: 2,
    xp: 10,
    instructions: `<p>Python's built-in <code>random</code> module generates unpredictable values for things like games, simulations, or picking a sample. <code>random.choice(sequence)</code> returns one randomly picked item from a list (or any sequence), and <code>random.randint(a, b)</code> returns a random whole number between <code>a</code> and <code>b</code>, with both ends included.</p>
<ul>
  <li><strong>random.choice():</strong> picks and returns exactly one element from whatever sequence you hand it, leaving the sequence itself untouched.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>import random
animals = ["cat", "dog", "fox"]
animal = random.choice(animals)
dice = random.randint(1, 6)
print(animal, dice)  # Output: one of cat/dog/fox, a number 1-6</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Import <code>random</code>, then create <code>pick</code> using <code>random.choice()</code> on <code>colors</code>, and <code>roll</code> using <code>random.randint(1, 10)</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">pick</span><code class="io-val">one of "red", "green", "blue"</code></div>
  <div class="io-row"><span class="io-key">roll</span><code class="io-val">a whole number from 1 to 10</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>PyDrop resets the random generator to the same starting point before every run, so clicking Run repeatedly here will always produce the exact same "random" pick, on purpose, so it can be graded.</span>
</div>`,
    hints: [
      "import random",
      "pick = random.choice(colors)",
      "roll = random.randint(1, 10)"
    ],
    starterCode: 'colors = ["red", "green", "blue"]\n# Use random.choice() and random.randint()\n',
    solution: 'import random\ncolors = ["red", "green", "blue"]\npick = random.choice(colors)\nroll = random.randint(1, 10)',
    validation: {
      checks: [
        { type: "hasImport", module: "random", message: "Import the random module." },
        { type: "matchesRegex", pattern: "random\\.choice\\(", message: "Use random.choice() to create 'pick'." },
        { type: "matchesRegex", pattern: "random\\.randint\\(\\s*1\\s*,\\s*10\\s*\\)", message: "Use random.randint(1, 10) to create 'roll'." }
      ],
      pyTests: [
        { code: "assert pick == 'blue'", message: "'pick' should be 'blue' (PyDrop resets the random seed before every run)." },
        { code: "assert roll == 9", message: "'roll' should be 9 (PyDrop resets the random seed before every run)." }
      ]
    },
    explanation: `<p>Outside of a graded exercise, <code>random.choice()</code> and <code>random.randint()</code> genuinely return something different every time you call them. The fixed result you see here only happens because this platform resets the random generator to the same starting point before grading, so your answer can be checked.</p>`
  },
  {
    id: 114,
    title: "Guided Project: Dial-a-Curse",
    difficulty: "easy",
    topic: "Randomness",
    level: 2,
    xp: 15,
    kind: "project",
    source: "Tiny Python Projects #9, \"Dial-a-Curse\"",
    instructions: `<p>Picking one random word from a list, and then another from a second list, is a simple way to generate a huge number of different combinations from a small amount of material. This project is adapted from <em>Tiny Python Projects</em>: a random insult generator built entirely from two word lists, combining <code>random.choice()</code> from The random Module with an f-string to stitch the picks into one sentence.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>insult</code> using <code>random.choice()</code> on both <code>adjectives</code> and <code>nouns</code>, combined into the sentence shown below.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">"You wretched weasel!"</code></div>
</div>`,
    hints: [
      "import random",
      "insult = f\"You {random.choice(adjectives)} {random.choice(nouns)}!\""
    ],
    starterCode: 'adjectives = ["squishy", "lumpy", "wretched"]\nnouns = ["toad", "grub", "weasel"]\n# Build insult using random.choice() on both lists\n',
    solution: 'import random\nadjectives = ["squishy", "lumpy", "wretched"]\nnouns = ["toad", "grub", "weasel"]\ninsult = f"You {random.choice(adjectives)} {random.choice(nouns)}!"',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "random\\.choice\\(\\s*adjectives\\s*\\)", message: "Use random.choice(adjectives)." },
        { type: "matchesRegex", pattern: "random\\.choice\\(\\s*nouns\\s*\\)", message: "Use random.choice(nouns)." },
        { type: "matchesRegex", pattern: "\\binsult\\s*=", message: "Store the result in a variable named 'insult'." }
      ],
      pyTests: [
        { code: "assert insult == 'You wretched weasel!'", message: "'insult' should be \"You wretched weasel!\"." }
      ]
    },
    explanation: `<p>Two word lists of length three each already give you nine possible combinations; add a third list and it multiplies again. This is the same trick behind those "insult generator" or "band name generator" pages, just a few lists and one random pick from each.</p>`
  },
  {
    id: 115,
    title: "Guided Project: Telephone",
    difficulty: "medium",
    topic: "Randomness",
    level: 2,
    xp: 20,
    kind: "project",
    source: "Tiny Python Projects #10, \"Telephone\"",
    instructions: `<p>Like the party game it's named after, this project from <em>Tiny Python Projects</em> is about a message getting slightly garbled. Strings can't be edited in place, so swapping even one character means rebuilding the whole string around it: keep everything before the spot, drop in the new character, keep everything after. This project combines <code>random.randint()</code> and <code>random.choice()</code> from The random Module with slicing (<code>message[:position]</code> and <code>message[position + 1:]</code> work on strings exactly the same way they do on lists) to do exactly that.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>word = "abcde"
position = 2
rebuilt = word[:position] + "X" + word[position + 1:]
print(rebuilt)  # Output: abXde</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>mutated</code> by replacing one random character of <code>message</code> with a random letter from <code>letters</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">message = "hello world"</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">"hello worrd"</code></div>
</div>`,
    hints: [
      "position = random.randint(0, len(message) - 1)",
      "new_letter = random.choice(letters)",
      "mutated = message[:position] + new_letter + message[position + 1:]"
    ],
    starterCode: 'message = "hello world"\nletters = "abcdefghijklmnopqrstuvwxyz"\n# Replace one random character of message\n',
    solution: 'import random\nmessage = "hello world"\nletters = "abcdefghijklmnopqrstuvwxyz"\nposition = random.randint(0, len(message) - 1)\nnew_letter = random.choice(letters)\nmutated = message[:position] + new_letter + message[position + 1:]',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "random\\.randint\\(", message: "Use random.randint() to pick a position." },
        { type: "matchesRegex", pattern: "random\\.choice\\(\\s*letters\\s*\\)", message: "Use random.choice(letters) to pick a replacement letter." },
        { type: "matchesRegex", pattern: "\\bmutated\\s*=.*\\[.*\\]\\s*\\+", message: "Rebuild the string using slicing around the chosen position." }
      ],
      pyTests: [
        { code: "assert mutated == 'hello worrd'", message: "'mutated' should be \"hello worrd\"." }
      ]
    },
    explanation: `<p><code>message[:position]</code> keeps everything before the chosen spot, <code>message[position + 1:]</code> keeps everything after it, and the new letter slots into the gap between them. The original string itself is never changed, since strings are immutable: <code>mutated</code> is a brand new string.</p>`
  },
  {
    id: 31,
    title: "Lambda Function",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>A <strong>lambda</strong> is a small, anonymous function squeezed into a single expression using the <code>lambda</code> keyword, with no <code>def</code> or name required. They're handy for short, throwaway logic you only need in one place, like a sort key or a quick transformation.</p>
<ul>
  <li><strong>Anonymous function:</strong> a function with no name of its own. <code>lambda x: x * 2</code> is a complete function value, and assigning it to <code>double</code> is what gives it a name to call later.</li>
</ul>
<p class="blueprint-line"><code>lambda parameters: expression</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>square = lambda x: x * x
print(square(6))  # Output: 36</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>A lambda body can only be a single expression, not statements: no if/else blocks, no loops, no assignments. Anything more complex needs a regular def function.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create a lambda assigned to <code>double</code> that takes a single argument <code>x</code> and returns <code>x * 2</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">double(5)</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">10</code></div>
</div>`,
    hints: [
      "double = lambda x: x * 2",
      "Lambdas can only contain a single expression, not statements."
    ],
    starterCode: "# Create a lambda called double\n",
    solution: "double = lambda x: x * 2",
    validation: {
      checks: [
        { type: "codeContains", value: "lambda", message: "Use the lambda keyword." },
        { type: "codeContains", value: "double", message: "Assign it to a variable named 'double'." },
        { type: "matchesRegex", pattern: "lambda\\s+\\w+\\s*:", message: "Lambda must have at least one parameter." },
        { type: "matchesRegex", pattern: "lambda\\s+\\w+\\s*:.*\\*\\s*2|lambda\\s+\\w+\\s*:.*2\\s*\\*", message: "The lambda body must multiply by 2 (e.g. lambda x: x * 2)." }
      ],
      pyTests: [
        { code: "assert double(5) == 10", message: "double(5) should return 10." },
        { code: "assert double(0) == 0", message: "double(0) should return 0." },
        { code: "assert double(-3) == -6", message: "double(-3) should return -6." }
      ]
    },
    explanation: `<p>Lambdas are best used as short-lived one-expression functions, often passed as arguments to <code>sorted()</code>, <code>map()</code>, or <code>filter()</code>. For anything complex, use a regular <code>def</code>.</p>`
  },
  {
    id: 32,
    title: "map() and filter()",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>You just saw a comprehension do this in one line. <code>map()</code> and <code>filter()</code> do the same two jobs, transform every item, or keep only some, as plain function calls instead. You'll still run into both in real code, and unlike a comprehension, either one can be handed directly to another function as an argument. <code>map(func, iterable)</code> applies a function to every item in a sequence, and <code>filter(func, iterable)</code> keeps only the items where that function returns something truthy. Both hand back a lazy iterator, so you'll usually wrap the result in <code>list()</code> to see or store the actual values.</p>
<ul>
  <li><strong>map():</strong> transforms every item. The output has exactly the same number of items as the input, just changed.</li>
  <li><strong>filter():</strong> selects a subset of items. The output can be shorter than the input, since items that fail the check get dropped.</li>
</ul>
<p class="blueprint-line"><code>list(map(func, iterable))</code>&nbsp;&nbsp;/&nbsp;&nbsp;<code>list(filter(func, iterable))</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>names = ["ana", "bo", "cy"]
upper = list(map(lambda s: s.upper(), names))
long_names = list(filter(lambda s: len(s) > 2, names))
print(upper)       # Output: ['ANA', 'BO', 'CY']
print(long_names)  # Output: ['ana']</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Given <code>numbers</code>, create <code>doubled</code> with <code>map()</code> and a lambda (each number doubled), and <code>evens</code> with <code>filter()</code> and a lambda (only the even numbers), converting both results to lists.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">numbers = [1, 2, 3, 4, 5, 6]</code></div>
  <div class="io-row"><span class="io-key">doubled</span><code class="io-val">[2, 4, 6, 8, 10, 12]</code></div>
  <div class="io-row"><span class="io-key">evens</span><code class="io-val">[2, 4, 6]</code></div>
</div>`,
    hints: [
      "doubled = list(map(lambda x: x * 2, numbers))",
      "evens = list(filter(lambda x: x % 2 == 0, numbers))"
    ],
    starterCode: "numbers = [1, 2, 3, 4, 5, 6]\n# Create doubled and evens\n",
    solution: "numbers = [1, 2, 3, 4, 5, 6]\ndoubled = list(map(lambda x: x * 2, numbers))\nevens = list(filter(lambda x: x % 2 == 0, numbers))",
    validation: {
      checks: [
        { type: "codeContains", value: "map(", message: "Use map() to create 'doubled'." },
        { type: "codeContains", value: "filter(", message: "Use filter() to create 'evens'." },
        { type: "codeContains", value: "lambda", message: "Use lambda functions inside map() and filter()." }
      ],
      pyTests: [
        { code: "assert doubled == [2, 4, 6, 8, 10, 12]", message: "'doubled' should be [2, 4, 6, 8, 10, 12]." },
        { code: "assert evens == [2, 4, 6]", message: "'evens' should be [2, 4, 6]." }
      ]
    },
    explanation: `<p><code>map()</code> and <code>filter()</code> return lazy iterators. Wrap them in <code>list()</code> to materialise the results. In modern Python, list comprehensions are often preferred: <code>[x * 2 for x in numbers]</code> is equivalent to the map above.</p>`
  },
  {
    id: 33,
    title: "Nested Functions and Scope",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>Useful any time you want to build a specialized version of a function on the fly, like a discount calculator that always applies its own rate, without writing a separate function for every rate you'd need. Functions can be defined inside other functions, and the inner one keeps access to variables from the outer function's scope even after the outer function has finished running. This pattern is called a <strong>closure</strong>: the inner function "remembers" the environment it was created in.</p>
<p>Call <code>make_multiplier(3)</code> and you get back a brand-new function that always multiplies by 3: the <code>3</code> is baked in, not re-passed every time. That's why the example below has two sets of parentheses: <code>make_multiplier(3)</code> runs first and hands back the <code>multiply</code> function, then <code>(4)</code> calls that returned function.</p>
<p>You could also save the first call in a variable, like <code>triple = make_multiplier(3)</code>, then call <code>triple(4)</code>, <code>triple(10)</code>, and so on: it'll still remember <code>factor = 3</code> every time.</p>
<ul>
  <li><strong>Nested function:</strong> a <code>def</code> written inside another function's body. It doesn't exist yet outside that outer function, only the value returned from it does.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def make_greeter(greeting):
    def greet(name):
        return f"{greeting}, {name}!"
    return greet

hi = make_greeter("Hi")
print(hi("Sam"))  # Output: Hi, Sam!</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define an outer function <code>make_multiplier</code> that takes a parameter <code>factor</code>. Inside it, define an inner function <code>multiply</code> that takes <code>n</code> and returns <code>n * factor</code>. Return the inner function.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">make_multiplier(3)(4)</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">12</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>make_multiplier(3) alone returns a function, not a number. You have to call that returned function with (4) to actually get 12.</span>
</div>`,
    hints: [
      "def make_multiplier(factor):",
      "    def multiply(n):",
      "        return n * factor",
      "    return multiply"
    ],
    starterCode: "# Define make_multiplier that returns a function\n",
    solution: "def make_multiplier(factor):\n    def multiply(n):\n        return n * factor\n    return multiply",
    validation: {
      checks: [
        { type: "hasValidDef", name: "make_multiplier", message: "Define the outer function 'make_multiplier' with a colon." },
        { type: "matchesRegex", pattern: "def\\s+multiply", message: "Define an inner function 'multiply'." },
        { type: "matchesRegex", pattern: "return\\s+multiply\\b(?!\\s*\\()", message: "Return the inner function by name only. No parentheses after multiply." }
      ],
      pyTests: [
        { code: "assert make_multiplier(3)(4) == 12", message: "make_multiplier(3)(4) should return 12." },
        { code: "assert make_multiplier(5)(2) == 10", message: "make_multiplier(5)(2) should return 10." }
      ]
    },
    explanation: `<p>This pattern is called a closure. The inner function "closes over" the <code>factor</code> variable from the outer scope. Even after <code>make_multiplier</code> returns, the returned function still remembers <code>factor</code>: that's what makes <code>make_multiplier(3)</code> and <code>make_multiplier(5)</code> behave like two independent functions instead of sharing one <code>factor</code> value. This is the same trick behind things like a discount calculator factory: <code>make_discount(0.2)</code> could hand you back a function that always takes 20% off, while <code>make_discount(0.5)</code> hands back one that always takes off half, each one remembering its own rate.</p>`
  },
  {
    id: 34,
    title: "Global vs Local Variables",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>Occasionally a function genuinely needs to update state that lives outside it and is shared with other functions, like a running total or a counter. Variables created inside a function are local by default, meaning they only exist while that function runs and can't be seen outside it. To reach out and modify a variable defined at the top level instead, you declare it with the <code>global</code> keyword inside the function first.</p>
<ul>
  <li><strong>global:</strong> a declaration telling Python "this name refers to the top-level variable, not a new local one," which lets the function reassign it.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>total = 0

def add_to_total(n):
    global total
    total += n

add_to_total(5)
print(total)  # Output: 5</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Without the global declaration, a line like counter += 1 inside a function creates a brand new local counter instead of changing the outer one, and raises an UnboundLocalError since it reads counter before ever assigning it locally.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a global variable <code>counter = 0</code>. Define a function <code>increment</code> that uses <code>global counter</code> to add 1 to it.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Before</span><code class="io-val">counter = 0</code></div>
  <div class="io-row"><span class="io-key">After increment()</span><code class="io-val">counter = 1</code></div>
</div>`,
    hints: [
      "global counter  inside the function",
      "counter += 1"
    ],
    starterCode: "counter = 0\n\n# Define increment to modify the global counter\n",
    solution: "counter = 0\n\ndef increment():\n    global counter\n    counter += 1",
    validation: {
      checks: [
        { type: "hasValidDef", name: "increment", message: "Define a function named 'increment' with a colon: def increment():" },
        { type: "codeContains", value: "global counter", message: "Declare 'global counter' inside the function." },
        { type: "matchesRegex", pattern: "counter\\s*\\+=\\s*1|counter\\s*=\\s*counter\\s*\\+\\s*1", message: "Increment the counter inside the function." }
      ],
      pyTests: [
        { code: "assert counter == 0", message: "'counter' should start at 0." },
        { code: "increment()\nassert counter == 1", message: "After calling increment() once, 'counter' should be 1." },
        { code: "increment()\nassert counter == 2", message: "After calling increment() again, 'counter' should be 2." }
      ]
    },
    explanation: `<p>Using globals is generally discouraged in large programs because it creates hidden dependencies. Prefer returning values and passing state explicitly. But the <code>global</code> keyword exists for situations where you genuinely need it.</p>`
  },
  {
    id: 35,
    title: "Docstrings",
    difficulty: "easy",
    topic: "Functions",
    level: 2,
    xp: 10,
    instructions: `<p>A <strong>docstring</strong> is a string literal placed as the very first line inside a function body, documenting what it does. It's wrapped in triple quotes, and tools like <code>help()</code> and IDE tooltips read it automatically to show other people what the function is for.</p>
<ul>
  <li><strong>Docstring:</strong> a triple-quoted string as the first line of a function's body. Python stores it on the function itself, accessible later as <code>function_name.__doc__</code>.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def square(n):
    """Return n multiplied by itself."""
    return n * n

print(square.__doc__)  # Output: Return n multiplied by itself.</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>A docstring only counts if it's the very first statement in the function body. Placed after any other line, it's just a regular unused string, not a real docstring.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>divide</code> that takes <code>a</code> and <code>b</code>. Add a docstring that says <code>"Divide a by b and return the result."</code> Then return <code>a / b</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">divide(10, 2)</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">5.0</code></div>
</div>`,
    hints: [
      "\"\"\"Divide a by b and return the result.\"\"\"  (place this as the first line of the body)",
      "Docstrings use triple quotes."
    ],
    starterCode: "# Define divide with a docstring\n",
    solution: 'def divide(a, b):\n    """Divide a by b and return the result."""\n    return a / b',
    validation: {
      checks: [
        { type: "hasValidDef", name: "divide", message: "Define a function named 'divide' with a colon: def divide(a, b):" },
        { type: "matchesRegex", pattern: '""".*"""|\'{3}.*\'{3}', message: "Add a docstring using triple quotes." },
        { type: "hasReturn", message: "Return a / b." }
      ],
      pyTests: [
        { code: "assert divide(10, 2) == 5.0", message: "divide(10, 2) should return 5.0." },
        { code: "assert divide.__doc__ and divide.__doc__.strip() == 'Divide a by b and return the result.'", message: "'divide' should have exactly the docstring \"Divide a by b and return the result.\"" }
      ]
    },
    explanation: `<p>Docstrings are accessible via <code>func.__doc__</code> and are used by IDEs, <code>help()</code>, and documentation generators like Sphinx. They are a best practice for any function others will call.</p>`
  },
  {
    id: 36,
    title: "Pure vs Impure Functions",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>A <strong>pure</strong> function always returns the same output for the same input and never changes anything outside itself. An <strong>impure</strong> function modifies external state, like mutating a list it was given. Pure functions are easier to test and reason about, since calling them twice with the same input never surprises you.</p>
<ul>
  <li><strong>Impure function:</strong> changes something outside its own local scope, like appending to a list argument in place, printing, or modifying a global variable.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def impure_add_tax(cart):
    cart.append("tax")   # mutates the caller's list
    return cart

def pure_add_tax(cart):
    return cart + ["tax"]  # builds a new list instead

original = ["book"]
print(pure_add_tax(original))  # Output: ['book', 'tax']
print(original)                # Output: ['book']</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Write a pure function <code>add_item</code> that takes a list <code>items</code> and a string <code>item</code>, and returns a <strong>new</strong> list with the item added, without modifying the original list.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">add_item(["a", "b"], "c")</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">["a", "b", "c"]</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>The original list you were given should be unchanged afterward. Using <code>items.append(item)</code> would fail this, since it modifies the list in place instead of creating a new one.</span>
</div>`,
    hints: [
      "Return items + [item]  (creates a new list)",
      "Do NOT use items.append(item). That modifies in place."
    ],
    starterCode: "# Write a pure add_item function\n",
    solution: "def add_item(items, item):\n    return items + [item]",
    validation: {
      checks: [
        { type: "hasValidDef", name: "add_item", message: "Define a function named 'add_item' with a colon: def add_item(items, item):" },
        { type: "matchesRegex", pattern: "return.*items.*\\+|return.*\\+.*items", message: "Return a new list using + (not append)." }
      ],
      pyTests: [
        { code: "original = [1, 2, 3]\nresult = add_item(original, 4)\nassert result == [1, 2, 3, 4]", message: "add_item([1, 2, 3], 4) should return [1, 2, 3, 4]." },
        { code: "original = [1, 2, 3]\nadd_item(original, 4)\nassert original == [1, 2, 3]", message: "The original list should be unchanged after calling add_item. Don't use .append()." }
      ]
    },
    explanation: `<p>This same pattern shows up anywhere you want predictable behavior: pure functions can be cached, run in parallel, or tested with plain input/output pairs, since they never depend on or change anything outside their own arguments. That's also why test suites lean on them so heavily: an impure function's result can depend on when or how many times it's called, which makes a test flaky in ways a pure function's never can.</p>`
  },
  {
    id: 37,
    title: "Higher-Order Functions",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>This lets you customize what a function does without rewriting it, by handing it a different function to call. A <strong>higher-order function</strong> takes another function as a parameter, or returns one. <code>sorted()</code> is a common example: pass it a <code>key</code> function and it calls that function on each item to decide the sort order, instead of comparing the items directly.</p>
<p class="blueprint-line"><code>sorted(iterable, key=function)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>people = [("Bo", 40), ("Ana", 25), ("Cy", 33)]
by_age = sorted(people, key=lambda p: p[1])
print(by_age)  # Output: [('Ana', 25), ('Cy', 33), ('Bo', 40)]</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create a variable <code>sorted_words</code> by sorting <code>words</code> by their length (shortest first) using <code>sorted()</code> with a <code>key=</code> argument.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">words = ["banana", "apple", "cherry", "date"]</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">["date", "apple", "banana", "cherry"]</code></div>
</div>`,
    hints: [
      "sorted_words = sorted(words, key=len)",
      "key=len passes the len function as the sorting criterion."
    ],
    starterCode: 'words = ["banana", "apple", "cherry", "date"]\n# Sort words by length\n',
    solution: 'words = ["banana", "apple", "cherry", "date"]\nsorted_words = sorted(words, key=len)',
    validation: {
      checks: [
        { type: "codeContains", value: "sorted(", message: "Use the sorted() function." },
        { type: "matchesRegex", pattern: "key\\s*=\\s*len", message: "Pass key=len to sort by length." },
        { type: "codeContains", value: "sorted_words", message: "Store the result in 'sorted_words'." }
      ],
      pyTests: [
        { code: "assert sorted_words == ['date', 'apple', 'banana', 'cherry']", message: "'sorted_words' should be ['date', 'apple', 'banana', 'cherry'], shortest first." }
      ]
    },
    explanation: `<p><code>sorted()</code> is a built-in higher-order function. The <code>key</code> argument receives a function that is called on each element to produce a comparison value. You can pass any function: <code>key=str.lower</code>, <code>key=lambda x: x[-1]</code>, etc.</p>`
  },
  {
    id: 38,
    title: "Function as Argument",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>This is what makes patterns like callbacks possible, and it's the foundation decorators (a feature you'll meet in a later level) are built on. Functions are first-class objects in Python, meaning you can pass them around just like a number or a string: store them in a variable, put them in a list, or hand them to another function as an argument.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def run_with(func, value):
    return func(value)

print(run_with(str.upper, "hi"))  # Output: HI</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>apply_twice</code> that takes a function <code>func</code> and a value <code>x</code>, and returns <code>func(func(x))</code>, the result of applying <code>func</code> twice.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">apply_twice(lambda x: x + 1, 5)</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">7</code></div>
</div>`,
    hints: [
      "def apply_twice(func, x):",
      "    return func(func(x))"
    ],
    starterCode: "# Define apply_twice\n",
    solution: "def apply_twice(func, x):\n    return func(func(x))",
    validation: {
      checks: [
        { type: "hasValidDef", name: "apply_twice", message: "Define a function named 'apply_twice' with a colon: def apply_twice(func, x):" },
        { type: "matchesRegex", pattern: "def\\s+apply_twice\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*\\)", message: "Accept two parameters (a function and a value)." },
        { type: "matchesRegex", pattern: "return\\s+func\\s*\\(\\s*func\\s*\\(", message: "Return the result: return func(func(x))." }
      ],
      pyTests: [
        { code: "assert apply_twice(lambda x: x + 1, 5) == 7", message: "apply_twice(lambda x: x + 1, 5) should return 7." },
        { code: "assert apply_twice(lambda x: x * 2, 3) == 12", message: "apply_twice(lambda x: x * 2, 3) should return 12." }
      ]
    },
    explanation: `<p>Since functions are objects, they can be passed around like any other value. This is what makes patterns like callbacks possible, and it's also the foundation for decorators, a feature you'll meet in a later level that wraps one function around another to add behavior to it.</p>`
  },
  {
    id: 116,
    title: "Guided Project: Ransom",
    difficulty: "medium",
    topic: "Randomness",
    level: 2,
    xp: 20,
    kind: "project",
    source: "Tiny Python Projects #12, \"Ransom\"",
    instructions: `<p>A classic ransom note look mixes upper and lower case letters at random, deciding independently for every single character. This project from <em>Tiny Python Projects</em> combines <code>random.choice()</code> with <code>.join()</code>, which you used in Joining a List into a String, with one new piece: feeding <code>.join()</code> a generator expression directly, instead of building a list first. Skipping that intermediate list matters more as the input grows, since nothing needs to sit fully in memory before joining.</p>
<p class="blueprint-line"><code>"".join(expression for item in iterable)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>letters = "abc"
doubled = "".join(c * 2 for c in letters)
print(doubled)  # Output: aabbcc</code></pre>
</div>
<p><strong>New pieces in this project</strong></p>
<ul>
  <li>Generator expression in <code>.join()</code>: <code>(expr for item in iterable)</code> with no square brackets. Values are produced one at a time instead of building a full list before joining them.</li>
</ul>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>ransom</code> by randomly uppercasing or lowercasing each character of <code>message</code>, then joining the results back into one string.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">message = "we have your cat"</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">"wE have yOur cat"</code></div>
</div>`,
    hints: [
      "random.choice([c.upper(), c.lower()]) picks one of the two cases for a character c",
      "ransom = \"\".join(random.choice([c.upper(), c.lower()]) for c in message)"
    ],
    starterCode: 'message = "we have your cat"\n# Randomly uppercase or lowercase each character\n',
    solution: 'import random\nmessage = "we have your cat"\nransom = "".join(random.choice([c.upper(), c.lower()]) for c in message)',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "random\\.choice\\(\\s*\\[", message: "Use random.choice([...]) to pick between the two cases." },
        { type: "matchesRegex", pattern: "for\\s+c\\s+in\\s+message", message: "Loop over each character of message." },
        { type: "matchesRegex", pattern: "\\.join\\(", message: "Join the results back into one string with .join()." }
      ],
      pyTests: [
        { code: "assert ransom == 'wE have yOur cat'", message: "'ransom' should be \"wE have yOur cat\"." }
      ]
    },
    explanation: `<p>A generator expression inside <code>.join()</code> works exactly like a comprehension: it produces one value per character without building an intermediate list first. <code>random.choice([c.upper(), c.lower()])</code> makes an independent coin flip for every single character.</p>`
  },
  {
    id: 117,
    title: "Guided Project: The Scrambler",
    difficulty: "medium",
    topic: "Randomness",
    level: 2,
    xp: 20,
    kind: "project",
    source: "Tiny Python Projects #16, \"The Scrambler\"",
    instructions: `<p>This project from <em>Tiny Python Projects</em> keeps a word's first and last letter fixed, the way readers can usually still parse a word even when its middle letters are jumbled, and shuffles everything in between. It combines the slicing you already know (<code>word[1:-1]</code> to grab the middle) with one new piece: <code>random.shuffle()</code>.</p>
<p class="blueprint-line"><code>random.shuffle(list)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>import random
letters = ["a", "b", "c", "d"]
random.shuffle(letters)
print(letters)  # Output: the same 4 letters, reordered</code></pre>
</div>
<p><strong>New pieces in this project</strong></p>
<ul>
  <li><code>random.shuffle()</code>: reorders a list randomly in place and returns <code>None</code>. It works on lists only, which is why the middle letters need to become a list first.</li>
</ul>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>scrambled</code> by shuffling the middle letters of <code>word</code> with <code>random.shuffle()</code>, keeping the first and last letters where they are.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">word = "python"</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">"ptyohn"</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>random.shuffle(middle) shuffles the list in place and returns None. Writing middle = random.shuffle(middle) would wipe out your list, since None would overwrite it.</span>
</div>`,
    hints: [
      "middle = list(word[1:-1])",
      "random.shuffle(middle)  (call it on its own line, don't assign its result)",
      "scrambled = word[0] + \"\".join(middle) + word[-1]"
    ],
    starterCode: 'word = "python"\n# Shuffle the middle letters, keep first and last fixed\n',
    solution: 'import random\nword = "python"\nmiddle = list(word[1:-1])\nrandom.shuffle(middle)\nscrambled = word[0] + "".join(middle) + word[-1]',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "random\\.shuffle\\(", message: "Use random.shuffle() to shuffle the middle letters." },
        { type: "matchesRegex", pattern: "word\\[1:-1\\]", message: "Slice out the middle letters with word[1:-1]." },
        { type: "matchesRegex", pattern: "\\bscrambled\\s*=", message: "Store the final result in a variable named 'scrambled'." }
      ],
      pyTests: [
        { code: "assert scrambled == 'ptyohn'", message: "'scrambled' should be \"ptyohn\"." }
      ]
    },
    explanation: `<p><code>word[1:-1]</code> slices out everything except the first and last character. Turning it into a <code>list()</code> first is necessary because <code>random.shuffle()</code> needs something mutable to reorder in place, and strings can't be changed after creation.</p>`
  },
  {
    id: 118,
    title: "Guided Project: Gematria",
    difficulty: "easy",
    topic: "Functions",
    level: 2,
    xp: 15,
    kind: "project",
    source: "Tiny Python Projects #18, \"Gematria\"",
    instructions: `<p>Gematria is an old practice of turning words into numbers by adding up a value for each letter. This project from <em>Tiny Python Projects</em> combines the generator-expression-in-a-function pattern from Ransom with one new piece: <code>ord(c)</code>, which gives you the numeric code point behind any character, so summing it across a whole word gives every word a score.</p>
<p class="blueprint-line"><code>ord(character)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>print(ord("A"))  # Output: 65
print(ord("a"))  # Output: 97</code></pre>
</div>
<p><strong>New pieces in this project</strong></p>
<ul>
  <li><code>ord()</code>: takes a single character and returns the integer that represents it internally. <code>chr()</code> does the reverse.</li>
</ul>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>score</code> as the sum of <code>ord(c)</code> for every character <code>c</code> in <code>word</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">word = "python"</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">674</code></div>
</div>`,
    hints: [
      "ord(c) converts a single character to its numeric code point",
      "score = sum(ord(c) for c in word)"
    ],
    starterCode: 'word = "python"\n# Sum the ord() of every character\n',
    solution: 'word = "python"\nscore = sum(ord(c) for c in word)',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "ord\\(", message: "Use ord() to get each character's numeric code." },
        { type: "matchesRegex", pattern: "\\bscore\\s*=\\s*sum\\(", message: "Sum the results into a variable named 'score'." }
      ],
      pyTests: [
        { code: "assert score == 674", message: "'score' should be 674 for the word \"python\"." }
      ]
    },
    explanation: `<p><code>ord()</code> is the inverse of <code>chr()</code>: given a single character, it returns the integer that represents it internally. A generator expression inside <code>sum()</code> adds up each one without ever building a separate list of the individual codes.</p>`
  },
  {
    id: 39,
    title: "Unpacking with *",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>The <code>*</code> operator unpacks a list or tuple into individual positional arguments when you call a function with it, so <code>func(*[1, 2, 3])</code> is exactly the same as calling <code>func(1, 2, 3)</code> directly. This is handy whenever the arguments you need already live inside a list.</p>
<ul>
  <li><strong>Unpacking (*):</strong> spreads a list or tuple's items out into separate positional arguments at the call site. The opposite direction from <code>*args</code>, which gathers loose arguments back into a tuple.</li>
</ul>
<p class="blueprint-line"><code>function_name(*iterable)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def volume(length, width, height):
    return length * width * height

dims = [2, 3, 4]
print(volume(*dims))  # Output: 24</code></pre>
</div>
<p><strong>Shorthand</strong></p>
<ul>
  <li><code>func(*nums)</code> unpacks a list into positional arguments (e.g. <code>func(1, 2, 3)</code> instead of <code>func([1, 2, 3])</code>).</li>
</ul>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>add3</code> that takes three parameters and returns their sum. Then create a list <code>nums = [1, 2, 3]</code> and call <code>add3(*nums)</code>, storing the result in <code>result</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">nums = [1, 2, 3]</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">result = 6</code></div>
</div>`,
    hints: [
      "def add3(a, b, c): return a + b + c",
      "result = add3(*nums)  (unpacks the list into three arguments)"
    ],
    starterCode: "# Define add3 and call it with *nums\n",
    solution: "def add3(a, b, c):\n    return a + b + c\n\nnums = [1, 2, 3]\nresult = add3(*nums)",
    validation: {
      checks: [
        { type: "hasValidDef", name: "add3", message: "Define a function named 'add3' with a colon: def add3(a, b, c):" },
        { type: "matchesRegex", pattern: "\\*nums", message: "Call add3(*nums) to unpack the list." },
        { type: "codeContains", value: "result", message: "Store the result in 'result'." }
      ],
      pyTests: [
        { code: "assert add3(1, 2, 3) == 6", message: "add3(1, 2, 3) should return 6." },
        { code: "assert result == 6", message: "'result' should be 6, from add3(*nums)." }
      ]
    },
    explanation: `<p><code>*list</code> unpacks a list into positional arguments. <code>**dict</code> unpacks a dictionary into keyword arguments, which the next challenge covers. These are powerful when you have dynamic argument lists.</p>`
  },
  {
    id: 135,
    title: "Unpacking with **",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>Just like <code>*</code> unpacks a list into positional arguments, <code>**</code> unpacks a dictionary into keyword arguments when you call a function with it. If <code>info = {"name": "Ana", "age": 30}</code>, then <code>func(**info)</code> is exactly the same as calling <code>func(name="Ana", age=30)</code> directly. Python matches each key in the dictionary to a parameter with the same name.</p>
<p>This comes up whenever you're loading data from a form, a JSON file, or a database row, since it usually arrives as a dictionary already: you can hand the whole dictionary to a function with <code>**</code> instead of pulling out each field by hand.</p>
<ul>
  <li><strong>Unpacking (**):</strong> spreads a dictionary's key-value pairs out into keyword arguments at the call site. Each key becomes a parameter name, each value becomes that argument's value.</li>
</ul>
<p class="blueprint-line"><code>function_name(**dictionary)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def announce(title, year):
    return f"{title} ({year})"

movie = {"title": "Arrival", "year": 2016}
print(announce(**movie))  # Output: Arrival (2016)</code></pre>
</div>
<p><strong>Shorthand</strong></p>
<ul>
  <li><code>func(**info)</code> unpacks a dict into keyword arguments. Opposite direction from <code>**kwargs</code>, which gathers keyword arguments back into a dict.</li>
</ul>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>The dictionary's keys have to match the function's parameter names exactly, or Python won't know which value goes where.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>build_profile</code> that takes <code>name</code>, <code>age</code>, and <code>city</code>, and returns <code>f"{name}, {age}, from {city}"</code>. Then call it as <code>build_profile(**info)</code>, storing the result in <code>result</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">info = {"name": "Ana", "age": 30, "city": "Lima"}</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">result = "Ana, 30, from Lima"</code></div>
</div>`,
    hints: [
      "def build_profile(name, age, city): return f\"{name}, {age}, from {city}\"",
      "result = build_profile(**info)  (unpacks the dict into name=, age=, city=)"
    ],
    starterCode: 'info = {"name": "Ana", "age": 30, "city": "Lima"}\n# Define build_profile and call it with **info\n',
    solution: 'def build_profile(name, age, city):\n    return f"{name}, {age}, from {city}"\n\ninfo = {"name": "Ana", "age": 30, "city": "Lima"}\nresult = build_profile(**info)',
    validation: {
      checks: [
        { type: "hasValidDef", name: "build_profile", message: "Define a function named 'build_profile' with a colon: def build_profile(name, age, city):" },
        { type: "matchesRegex", pattern: "\\*\\*info", message: "Call build_profile(**info) to unpack the dictionary." },
        { type: "codeContains", value: "result", message: "Store the result in 'result'." }
      ],
      pyTests: [
        { code: "assert build_profile(name='Ana', age=30, city='Lima') == 'Ana, 30, from Lima'", message: "build_profile(name='Ana', age=30, city='Lima') should return 'Ana, 30, from Lima'." },
        { code: "assert result == 'Ana, 30, from Lima'", message: "'result' should be 'Ana, 30, from Lima', from build_profile(**info)." }
      ]
    },
    explanation: `<p><code>**dict</code> unpacks a dictionary into keyword arguments the same way <code>*list</code> unpacks a list into positional ones. It's the same trick <code>**kwargs</code> uses, just running in the opposite direction: <code>**kwargs</code> gathers loose keyword arguments into a dict inside a function, while <code>**info</code> spreads a dict back out into keyword arguments at the call site.</p>`
  },
  {
    id: 119,
    title: "Guided Project: Twelve Days of Christmas",
    difficulty: "hard",
    topic: "Functions",
    level: 2,
    xp: 30,
    kind: "project",
    source: "Tiny Python Projects #13, \"Twelve Days of Christmas\"",
    instructions: `<p>The song adds one more gift each day while repeating every gift from the days before it, counting backward, with a small grammar twist: the very last gift listed gets an "and" in front of it, except on day one, where there's only one gift and no "and" needed at all. This capstone project from <em>Tiny Python Projects</em> pulls together a function, list indexing, and a conditional, with one new piece: <code>range()</code> with a negative step, which counts backward instead of forward, exactly what's needed here since each day's verse lists its gifts newest first, counting back down to day one.</p>
<p class="blueprint-line"><code>range(start, stop, -1)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>for i in range(3, -1, -1):
    print(i)  # Output: 3 2 1 0</code></pre>
</div>
<p><strong>New pieces in this project</strong></p>
<ul>
  <li><code>range(start, stop, -1)</code>: a negative step counts down instead of up. <code>stop</code> is still exclusive, so <code>range(day - 1, -1, -1)</code> walks all the way down to and including index <code>0</code>.</li>
</ul>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>verse(day)</code> that returns the full verse for that day, built from the <code>gifts</code> and <code>ordinals</code> lists below.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">verse(1)</span><code class="io-val">"On the first day of Christmas my true love gave to me: a partridge in a pear tree."</code></div>
  <div class="io-row"><span class="io-key">verse(3)</span><code class="io-val">"On the third day of Christmas my true love gave to me: three french hens, two turtle doves, and a partridge in a pear tree."</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Day 1 only has one gift, so it should never get an "and" in front of it. That's the one case worth testing separately from every other day.</span>
</div>`,
    hints: [
      "Build this day's gifts, counting backward: [gifts[i] for i in range(day - 1, -1, -1)]",
      "If day > 1, prefix the last item in that list with \"and \"",
      "Join with \", \" and wrap it in the sentence using ordinals[day - 1]"
    ],
    starterCode: 'ordinals = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"]\ngifts = [\n    "a partridge in a pear tree",\n    "two turtle doves",\n    "three french hens",\n    "four calling birds",\n    "five gold rings",\n    "six geese a-laying",\n    "seven swans a-swimming",\n    "eight maids a-milking",\n    "nine ladies dancing",\n    "ten lords a-leaping",\n    "eleven pipers piping",\n    "twelve drummers drumming"\n]\n# Define verse(day)\n',
    solution: 'ordinals = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"]\ngifts = [\n    "a partridge in a pear tree",\n    "two turtle doves",\n    "three french hens",\n    "four calling birds",\n    "five gold rings",\n    "six geese a-laying",\n    "seven swans a-swimming",\n    "eight maids a-milking",\n    "nine ladies dancing",\n    "ten lords a-leaping",\n    "eleven pipers piping",\n    "twelve drummers drumming"\n]\n\ndef verse(day):\n    lines = [gifts[i] for i in range(day - 1, -1, -1)]\n    if day > 1:\n        lines[-1] = "and " + lines[-1]\n    gift_list = ", ".join(lines)\n    return f"On the {ordinals[day - 1]} day of Christmas my true love gave to me: {gift_list}."',
    validation: {
      checks: [
        { type: "hasValidDef", name: "verse", message: "Define a function named 'verse' with a colon: def verse(day):" },
        { type: "matchesRegex", pattern: "range\\(\\s*day\\s*-\\s*1", message: "Build the gift list counting backward from day - 1." },
        { type: "matchesRegex", pattern: "ordinals\\[", message: "Look up the ordinal word from the ordinals list." }
      ],
      pyTests: [
        { code: "assert verse(1) == 'On the first day of Christmas my true love gave to me: a partridge in a pear tree.'", message: "verse(1) should have no \"and\", since there's only one gift." },
        { code: "assert verse(3) == 'On the third day of Christmas my true love gave to me: three french hens, two turtle doves, and a partridge in a pear tree.'", message: "verse(3) should list all three gifts, newest first, with \"and\" before the last one." }
      ]
    },
    explanation: `<p><code>range(day - 1, -1, -1)</code> counts backward from <code>day - 1</code> down to <code>0</code>, which is exactly the reverse order needed to list this day's gifts newest first. Swapping <code>lines[-1]</code> for a version with "and " in front, only when there's more than one item, is what keeps day one grammatically different from every other day.</p>`
  },
  {
    id: 40,
    title: "Chained Comparisons and Logic",
    difficulty: "easy",
    topic: "Conditionals",
    level: 2,
    xp: 10,
    instructions: `<p>Python supports chained comparisons like <code>0 < x < 10</code>, which reads naturally left to right and is equivalent to combining two separate comparisons with <code>and</code>. Combine conditions more generally with <code>and</code>, <code>or</code>, and <code>not</code>.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>temp = 72
print(60 <= temp <= 80)  # Output: True</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Comparisons (<code>&gt;</code>, <code>&lt;=</code>, etc.) are checked before <code>and</code>/<code>or</code> combine them, so <code>a > 0 and b > 0</code> reads exactly like it looks: two separate checks joined together, no extra parentheses needed. <code>and</code> also short-circuits: if the left side is already <code>False</code>, Python never bothers checking the right side.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>is_valid_age</code> that takes <code>age</code> and returns <code>True</code> if age is between 0 and 120 (inclusive) using a chained comparison.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">is_valid_age(45)</span><code class="io-val">True</code></div>
  <div class="io-row"><span class="io-key">is_valid_age(150)</span><code class="io-val">False</code></div>
</div>`,
    hints: [
      "return 0 <= age <= 120",
      "Chained comparisons are more readable than age >= 0 and age <= 120."
    ],
    starterCode: "# Define is_valid_age\n",
    solution: "def is_valid_age(age):\n    return 0 <= age <= 120",
    validation: {
      checks: [
        { type: "hasValidDef", name: "is_valid_age", message: "Define a function named 'is_valid_age' with a colon: def is_valid_age(age):" },
        { type: "matchesRegex", pattern: "0\\s*<=\\s*age\\s*<=\\s*120|age\\s*>=\\s*0.*age\\s*<=\\s*120", message: "Use a chained comparison or 'and' condition." },
        { type: "hasReturn", message: "Return the boolean result." }
      ],
      pyTests: [
        { code: "assert is_valid_age(50) is True", message: "is_valid_age(50) should be True." },
        { code: "assert is_valid_age(0) is True and is_valid_age(120) is True", message: "The boundaries 0 and 120 should both count as valid." },
        { code: "assert is_valid_age(-1) is False and is_valid_age(121) is False", message: "-1 and 121 should both be False, just outside the boundaries." }
      ]
    },
    explanation: `<p>Python's chained comparisons are a readability win: <code>0 <= age <= 120</code> is exactly how you would write it mathematically. Internally, Python evaluates it as <code>(0 <= age) and (age <= 120)</code>.</p>`
  }
];
