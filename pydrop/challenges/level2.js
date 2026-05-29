window.LEVEL2 = [
  {
    id: 21,
    title: "Define a Simple Function",
    difficulty: "easy",
    topic: "Functions",
    level: 2,
    xp: 10,
    instructions: `<p>Functions group reusable code. Define them with the <code>def</code> keyword, a name, parentheses, and a colon. The body is indented.</p>
<p>Define a function named <code>say_hello</code> that takes no parameters and returns the string <code>"Hello!"</code>.</p>`,
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
    instructions: `<p>Parameters are inputs to your function, listed inside the parentheses.</p>
<p>Define a function <code>add</code> that takes two parameters <code>a</code> and <code>b</code> and returns their sum.</p>`,
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
    instructions: `<p>Functions compute and return results. The caller receives the return value and can use it.</p>
<p>Define a function <code>square</code> that takes one parameter <code>n</code> and returns <code>n</code> multiplied by itself.</p>`,
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
    instructions: `<p>You can give parameters default values, making them optional when calling the function.</p>
<p>Define a function <code>greet</code> that takes a parameter <code>name</code> with a default value of <code>"World"</code> and returns the string <code>f"Hello, {name}!"</code>.</p>`,
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
    instructions: `<p>Python functions can return multiple values by returning a tuple. The caller can unpack them.</p>
<p>Define a function <code>min_max</code> that takes a list <code>nums</code> and returns both the minimum and maximum values (in that order).</p>`,
    hints: [
      "Use min(nums) and max(nums) to get the values.",
      "return min(nums), max(nums)  returns a tuple"
    ],
    starterCode: "# Define min_max to return (minimum, maximum)\n",
    solution: "def min_max(nums):\n    return min(nums), max(nums)",
    validation: {
      checks: [
        { type: "hasValidDef", name: "min_max", message: "Define a function named 'min_max' with a colon: def min_max(nums):" },
        { type: "matchesRegex", pattern: "return\\s+min\\s*\\(", message: "Use the built-in min() function -- lists have no .min() method." },
        { type: "matchesRegex", pattern: "return\\s+min.*max\\s*\\(|return\\s+min.*,.*max", message: "Return both min and max values separated by a comma." }
      ]
    },
    explanation: `<p>When you write <code>return a, b</code>, Python packs the values into a tuple. The caller can unpack them: <code>lo, hi = min_max([3, 1, 4, 1, 5])</code>. This is cleaner than returning a list or dictionary for small fixed-size results.</p>`
  },
  {
    id: 26,
    title: "*args: Variable Positional Arguments",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>The <code>*args</code> syntax lets a function accept any number of positional arguments, collected into a tuple.</p>
<p>Define a function <code>total</code> that accepts any number of numbers using <code>*args</code> and returns their sum.</p>`,
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
      ]
    },
    explanation: `<p>Inside the function, <code>args</code> is a tuple of all positional arguments passed. You can iterate over it or pass it to functions like <code>sum()</code>. The name <code>args</code> is a convention -- the <code>*</code> is what matters.</p>`
  },
  {
    id: 27,
    title: "**kwargs: Variable Keyword Arguments",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>The <code>**kwargs</code> syntax collects any number of keyword arguments into a dictionary.</p>
<p>Define a function <code>describe</code> that accepts any keyword arguments and returns a string listing them in the format <code>"key=value"</code> joined by commas. Use <code>", ".join(...)</code> and an f-string or comprehension.</p>`,
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
    instructions: `<p>A recursive function calls itself with a smaller problem until it hits a base case.</p>
<p>Define a function <code>factorial</code> that takes an integer <code>n</code> and returns <code>n!</code> (factorial). The base case is: if <code>n == 0</code>, return <code>1</code>. Otherwise return <code>n * factorial(n - 1)</code>.</p>`,
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
    instructions: `<p>List comprehensions create a new list by applying an expression to each item in an iterable -- in one concise line.</p>
<p>Given <code>numbers = [1, 2, 3, 4, 5]</code>, create <code>squares</code> as a list comprehension that contains the square of each number.</p>`,
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
    instructions: `<p>Dictionary comprehensions build a dictionary using <code>{key: value for item in iterable}</code>.</p>
<p>Given <code>words = ["hello", "world", "python"]</code>, create a dictionary <code>word_lengths</code> where each key is a word and each value is the length of that word.</p>`,
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
      ]
    },
    explanation: `<p>Dictionary comprehensions are the dict equivalent of list comprehensions. The colon separates the key expression from the value expression. They are great for transforming or filtering existing mappings.</p>`
  },
  {
    id: 31,
    title: "Lambda Function",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>A lambda is a small anonymous function defined in a single expression using the <code>lambda</code> keyword.</p>
<p>Create a lambda assigned to <code>double</code> that takes a single argument <code>x</code> and returns <code>x * 2</code>.</p>`,
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
    instructions: `<p><code>map(func, iterable)</code> applies a function to every item. <code>filter(func, iterable)</code> keeps only items where the function returns true.</p>
<p>Given <code>numbers = [1, 2, 3, 4, 5, 6]</code>:</p>
<ul>
  <li>Create <code>doubled</code> using <code>map()</code> and a lambda to double each number (convert result to list).</li>
  <li>Create <code>evens</code> using <code>filter()</code> and a lambda to keep only even numbers (convert result to list).</li>
</ul>`,
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
      ]
    },
    explanation: `<p><code>map()</code> and <code>filter()</code> return lazy iterators -- wrap them in <code>list()</code> to materialise the results. In modern Python, list comprehensions are often preferred: <code>[x * 2 for x in numbers]</code> is equivalent to the map above.</p>`
  },
  {
    id: 33,
    title: "Nested Functions and Scope",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>Functions can be defined inside other functions. The inner function has access to variables from the outer function's scope (closure).</p>
<p>Define an outer function <code>make_multiplier</code> that takes a parameter <code>factor</code>. Inside it, define an inner function <code>multiply</code> that takes <code>n</code> and returns <code>n * factor</code>. Return the inner function.</p>`,
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
        { type: "matchesRegex", pattern: "return\\s+multiply\\b(?!\\s*\\()", message: "Return the inner function by name only -- no parentheses after multiply." }
      ]
    },
    explanation: `<p>This pattern is called a closure. The inner function "closes over" the <code>factor</code> variable from the outer scope. Even after <code>make_multiplier</code> returns, the returned function still remembers <code>factor</code>.</p>`
  },
  {
    id: 34,
    title: "Global vs Local Variables",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>Variables created inside a function are local by default -- they cannot be seen outside. To modify a global variable inside a function, declare it with the <code>global</code> keyword.</p>
<p>Define a global variable <code>counter = 0</code>. Define a function <code>increment</code> that uses <code>global counter</code> to add 1 to it.</p>`,
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
    instructions: `<p>A docstring is a string literal at the start of a function body that documents what it does. It is wrapped in triple quotes.</p>
<p>Define a function <code>divide</code> that takes <code>a</code> and <code>b</code>. Add a docstring that says <code>"Divide a by b and return the result."</code> Then return <code>a / b</code>.</p>`,
    hints: [
      "\"\"\"Divide a by b and return the result.\"\"\"  -- place this as the first line of the body",
      "Docstrings use triple quotes."
    ],
    starterCode: "# Define divide with a docstring\n",
    solution: 'def divide(a, b):\n    """Divide a by b and return the result."""\n    return a / b',
    validation: {
      checks: [
        { type: "hasValidDef", name: "divide", message: "Define a function named 'divide' with a colon: def divide(a, b):" },
        { type: "matchesRegex", pattern: '""".*"""|\'{3}.*\'{3}', message: "Add a docstring using triple quotes." },
        { type: "hasReturn", message: "Return a / b." }
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
    instructions: `<p>A pure function always returns the same output for the same input and has no side effects. An impure function modifies external state.</p>
<p>Write a pure function <code>add_item</code> that takes a list <code>items</code> and a string <code>item</code>, and returns a <strong>new</strong> list with the item added -- without modifying the original list.</p>`,
    hints: [
      "Return items + [item]  (creates a new list)",
      "Do NOT use items.append(item) -- that modifies in place."
    ],
    starterCode: "# Write a pure add_item function\n",
    solution: "def add_item(items, item):\n    return items + [item]",
    validation: {
      checks: [
        { type: "hasValidDef", name: "add_item", message: "Define a function named 'add_item' with a colon: def add_item(items, item):" },
        { type: "matchesRegex", pattern: "return.*items.*\\+|return.*\\+.*items", message: "Return a new list using + (not append)." }
      ]
    },
    explanation: `<p>Pure functions are easier to test and reason about. <code>items + [item]</code> creates a brand new list; the original <code>items</code> is unchanged. <code>items.append(item)</code> would modify the original, making the function impure.</p>`
  },
  {
    id: 37,
    title: "Higher-Order Functions",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>A higher-order function takes another function as a parameter or returns one. <code>sorted()</code> is a common example -- it accepts a <code>key</code> function.</p>
<p>Given <code>words = ["banana", "apple", "cherry", "date"]</code>, create a variable <code>sorted_words</code> by sorting them by their length (shortest first) using <code>sorted()</code> with a <code>key=</code> argument.</p>`,
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
    instructions: `<p>Functions are first-class objects in Python -- you can pass them as arguments to other functions.</p>
<p>Define a function <code>apply_twice</code> that takes a function <code>func</code> and a value <code>x</code>, and returns <code>func(func(x))</code> -- the result of applying <code>func</code> twice.</p>`,
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
      ]
    },
    explanation: `<p>Since functions are objects, they can be passed around like any other value. This enables functional patterns and is the basis for decorators and callbacks in web frameworks.</p>`
  },
  {
    id: 39,
    title: "Unpacking with *",
    difficulty: "medium",
    topic: "Functions",
    level: 2,
    xp: 20,
    instructions: `<p>The <code>*</code> operator unpacks a list (or tuple) into individual positional arguments when calling a function.</p>
<p>Define a function <code>add3</code> that takes three parameters <code>a</code>, <code>b</code>, <code>c</code> and returns their sum. Then create a list <code>nums = [1, 2, 3]</code> and call <code>add3(*nums)</code>, storing the result in <code>result</code>.</p>`,
    hints: [
      "def add3(a, b, c): return a + b + c",
      "result = add3(*nums)  -- unpacks the list into three arguments"
    ],
    starterCode: "# Define add3 and call it with *nums\n",
    solution: "def add3(a, b, c):\n    return a + b + c\n\nnums = [1, 2, 3]\nresult = add3(*nums)",
    validation: {
      checks: [
        { type: "hasValidDef", name: "add3", message: "Define a function named 'add3' with a colon: def add3(a, b, c):" },
        { type: "matchesRegex", pattern: "\\*nums", message: "Call add3(*nums) to unpack the list." },
        { type: "codeContains", value: "result", message: "Store the result in 'result'." }
      ]
    },
    explanation: `<p><code>*list</code> unpacks a list into positional arguments. <code>**dict</code> unpacks a dictionary into keyword arguments. These are powerful when you have dynamic argument lists.</p>`
  },
  {
    id: 40,
    title: "Chained Comparisons and Logic",
    difficulty: "easy",
    topic: "Conditionals",
    level: 2,
    xp: 10,
    instructions: `<p>Python supports chained comparisons like <code>0 < x < 10</code>, which reads naturally. Combine conditions with <code>and</code>, <code>or</code>, <code>not</code>.</p>
<p>Define a function <code>is_valid_age</code> that takes <code>age</code> and returns <code>True</code> if age is between 0 and 120 (inclusive) using a chained comparison.</p>`,
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
      ]
    },
    explanation: `<p>Python's chained comparisons are a readability win: <code>0 <= age <= 120</code> is exactly how you would write it mathematically. Internally, Python evaluates it as <code>(0 <= age) and (age <= 120)</code>.</p>`
  }
];
