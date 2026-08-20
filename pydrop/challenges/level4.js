window.LEVEL4 = [
  {
    id: 61,
    title: "Type Hints: Function Parameters",
    difficulty: "easy",
    topic: "Type Hints",
    level: 4,
    xp: 10,
    instructions: `<p>Type hints annotate what types a function expects, written as <code>name: type</code> after each parameter. They're optional and Python never enforces them at runtime, but they make a function's contract obvious at a glance and let tools like IDEs and mypy catch mistakes before you ever run the code.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>repeat</code> that takes a string <code>text</code> and an integer <code>times</code> with proper type hints, and returns the string repeated that many times.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">repeat("ab", 3)</span><code class="io-val">"ababab"</code></div>
</div>`,
    hints: [
      "def repeat(text: str, times: int):",
      "    return text * times"
    ],
    starterCode: "# Define repeat with type hints on parameters\n",
    solution: "def repeat(text: str, times: int) -> str:\n    return text * times",
    validation: {
      checks: [
        { type: "hasValidDef", name: "repeat", message: "Define a function named 'repeat' with a colon: def repeat(...):" },
        { type: "matchesRegex", pattern: "text\\s*:\\s*str", message: "Annotate 'text' as str." },
        { type: "matchesRegex", pattern: "times\\s*:\\s*int", message: "Annotate 'times' as int." }
      ],
      pyTests: [
        { code: "assert repeat('ab', 3) == 'ababab'", message: "repeat('ab', 3) should return 'ababab'." },
        { code: "assert repeat('x', 0) == ''", message: "repeat('x', 0) should return an empty string." }
      ]
    },
    explanation: `<p>Type hints use the colon syntax: <code>param: type</code>. They are read by tools like mypy and IDEs for autocompletion and error detection. Python itself ignores them at runtime.</p>`
  },
  {
    id: 62,
    title: "Type Hints: Return Types",
    difficulty: "easy",
    topic: "Type Hints",
    level: 4,
    xp: 10,
    instructions: `<p>The <code>-></code> arrow annotates what a function returns, written right before the final colon in the signature. Combined with parameter hints, it documents a function's full contract: what goes in, and what comes back out.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>is_even</code> that takes an integer <code>n</code> with a type hint and returns a <code>bool</code>. Annotate the return type with <code>-> bool</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">is_even(4)</span><code class="io-val">True</code></div>
</div>`,
    hints: [
      "def is_even(n: int) -> bool:",
      "    return n % 2 == 0"
    ],
    starterCode: "# Define is_even with a return type hint\n",
    solution: "def is_even(n: int) -> bool:\n    return n % 2 == 0",
    validation: {
      checks: [
        { type: "hasValidDef", name: "is_even", message: "Define a function named 'is_even' with a colon: def is_even(n: int) -> bool:" },
        { type: "matchesRegex", pattern: "->\\s*bool", message: "Add -> bool return type hint." },
        { type: "hasReturn", message: "Return the result of the even check." }
      ],
      pyTests: [
        { code: "assert is_even(4) is True", message: "is_even(4) should be True." },
        { code: "assert is_even(7) is False", message: "is_even(7) should be False." }
      ]
    },
    explanation: `<p>The <code>-></code> return annotation comes before the colon at the end of the function signature. A function that returns nothing should use <code>-> None</code>.</p>`
  },
  {
    id: 63,
    title: "Optional and Union Types",
    difficulty: "medium",
    topic: "Type Hints",
    level: 4,
    xp: 20,
    instructions: `<p><code>Optional[X]</code> means a value is either <code>X</code> or <code>None</code>, which is exactly the shape of a function that might not find what it's looking for. In Python 3.10+ you can write the shorter <code>X | None</code> instead, but <code>Optional</code> from <code>typing</code> still works everywhere.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Import <code>Optional</code> from <code>typing</code>. Define a function <code>find_first</code> that takes a list <code>items</code> and a value <code>target</code>, and returns <code>Optional[int]</code>, the index of the first occurrence, or <code>None</code> if not found.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">find_first([5, 3, 8, 3], 3)</span><code class="io-val">1</code></div>
  <div class="io-row"><span class="io-key">find_first([1, 2, 3], 9)</span><code class="io-val">None</code></div>
</div>`,
    hints: [
      "from typing import Optional",
      "def find_first(items: list, target: int) -> Optional[int]:",
      "    for i, v in enumerate(items):",
      "        if v == target: return i",
      "    return None"
    ],
    starterCode: "# Import Optional and define find_first\n",
    solution: "from typing import Optional\n\ndef find_first(items: list, target: int) -> Optional[int]:\n    for i, v in enumerate(items):\n        if v == target:\n            return i\n    return None",
    validation: {
      checks: [
        { type: "hasImport", module: "typing", message: "Import from the typing module." },
        { type: "codeContains", value: "Optional", message: "Use Optional in the type hint." },
        { type: "matchesRegex", pattern: "->\\s*Optional\\[", message: "Use Optional in the return type annotation: -> Optional[int]." },
        { type: "hasValidDef", name: "find_first", message: "Define a function named 'find_first' with a colon." },
        { type: "matchesRegex", pattern: "return\\s+None", message: "Return None when not found." }
      ],
      pyTests: [
        { code: "assert find_first([5, 3, 8, 3], 3) == 1", message: "find_first([5, 3, 8, 3], 3) should return 1, the first matching index." },
        { code: "assert find_first([1, 2, 3], 9) is None", message: "find_first([1, 2, 3], 9) should return None when not found." }
      ]
    },
    explanation: `<p><code>Optional[int]</code> is shorthand for <code>Union[int, None]</code>. It communicates clearly that the function might not find a result. In Python 3.10+, you can write <code>int | None</code> without any imports.</p>`
  },
  {
    id: 64,
    title: "List and Dict Type Hints",
    difficulty: "medium",
    topic: "Type Hints",
    level: 4,
    xp: 20,
    instructions: `<p>Type hints can describe what's inside a list or dictionary, not just the container itself. <code>List[type]</code> and <code>Dict[key_type, value_type]</code> come from <code>typing</code>; Python 3.9+ also lets you write the built-in <code>list[type]</code> and <code>dict[key, value]</code> directly, no import needed.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Import <code>List</code> and <code>Dict</code> from <code>typing</code>. Define a function <code>count_words</code> that takes a <code>List[str]</code> named <code>words</code> and returns a <code>Dict[str, int]</code> with each word as a key and its count as the value.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">count_words(["a", "b", "a"])</span><code class="io-val">{"a": 2, "b": 1}</code></div>
</div>`,
    hints: [
      "from typing import List, Dict",
      "def count_words(words: List[str]) -> Dict[str, int]:",
      "Use a dictionary to count occurrences."
    ],
    starterCode: "# Import List and Dict, define count_words\n",
    solution: "from typing import List, Dict\n\ndef count_words(words: List[str]) -> Dict[str, int]:\n    counts: Dict[str, int] = {}\n    for word in words:\n        counts[word] = counts.get(word, 0) + 1\n    return counts",
    validation: {
      checks: [
        { type: "hasImport", module: "typing", message: "Import from the typing module." },
        { type: "matchesRegex", pattern: "List\\[str\\]|list\\[str\\]", message: "Annotate the parameter as List[str]." },
        { type: "matchesRegex", pattern: "Dict\\[str,\\s*int\\]|dict\\[str,\\s*int\\]", message: "Annotate the return type as Dict[str, int]." },
        { type: "hasValidDef", name: "count_words", message: "Define a function named 'count_words' with a colon." }
      ],
      pyTests: [
        { code: "assert count_words(['a', 'b', 'a']) == {'a': 2, 'b': 1}", message: "count_words(['a', 'b', 'a']) should return {'a': 2, 'b': 1}." }
      ]
    },
    explanation: `<p>Typed collections communicate both the structure and the element types. This helps IDEs catch bugs like accidentally appending an integer to a list of strings.</p>`
  },
  {
    id: 65,
    title: "@dataclass Definition",
    difficulty: "medium",
    topic: "Dataclasses",
    level: 4,
    xp: 20,
    instructions: `<p>The <code>@dataclass</code> decorator looks at a class's annotated attributes and automatically generates <code>__init__</code>, <code>__repr__</code>, and <code>__eq__</code> for you, so a class that's mostly just a bundle of fields doesn't need any of that boilerplate written by hand.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Import <code>dataclass</code> from <code>dataclasses</code>. Define a <code>@dataclass</code> class <code>Product</code> with fields: <code>name: str</code>, <code>price: float</code>, and <code>in_stock: bool</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Product("Widget", 9.99, True)</span><code class="io-val">.name = "Widget", .price = 9.99</code></div>
</div>`,
    hints: [
      "from dataclasses import dataclass",
      "@dataclass",
      "class Product:",
      "    name: str",
      "    price: float",
      "    in_stock: bool"
    ],
    starterCode: "# Import dataclass and define the Product dataclass\n",
    solution: "from dataclasses import dataclass\n\n@dataclass\nclass Product:\n    name: str\n    price: float\n    in_stock: bool",
    validation: {
      checks: [
        { type: "hasImport", module: "dataclasses", message: "Import from the dataclasses module." },
        { type: "hasDataclass", message: "Apply the @dataclass decorator." },
        { type: "hasClass", name: "Product", message: "Define a class named 'Product'." },
        { type: "matchesRegex", pattern: "name\\s*:\\s*str", message: "Declare name: str field." }
      ],
      pyTests: [
        { code: "p = Product('Widget', 9.99, True)\nassert p.name == 'Widget' and p.price == 9.99 and p.in_stock is True", message: "Product('Widget', 9.99, True) should set all three fields correctly." }
      ]
    },
    explanation: `<p><code>@dataclass</code> eliminates boilerplate. Without it, you would manually write <code>__init__</code>, <code>__repr__</code>, and <code>__eq__</code>. With it, those are generated automatically from the type-annotated class attributes.</p>`
  },
  {
    id: 66,
    title: "Dataclass with Default Values",
    difficulty: "medium",
    topic: "Dataclasses",
    level: 4,
    xp: 20,
    instructions: `<p>Dataclass fields can have default values, exactly like function parameters, which makes them optional when you create an instance. Fields with a default have to come after any fields without one, in the order you declare them.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Define a <code>@dataclass</code> class <code>Config</code> with: <code>host: str = "localhost"</code>, <code>port: int = 8000</code>, and <code>debug: bool = False</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Config()</span><code class="io-val">.host = "localhost", .port = 8000, .debug = False</code></div>
</div>`,
    hints: [
      "@dataclass",
      "class Config:",
      "    host: str = \"localhost\"",
      "    port: int = 8000",
      "    debug: bool = False"
    ],
    starterCode: "from dataclasses import dataclass\n\n# Define Config dataclass with default values\n",
    solution: 'from dataclasses import dataclass\n\n@dataclass\nclass Config:\n    host: str = "localhost"\n    port: int = 8000\n    debug: bool = False',
    validation: {
      checks: [
        { type: "hasDataclass", message: "Apply the @dataclass decorator." },
        { type: "hasClass", name: "Config", message: "Define a class named 'Config'." },
        { type: "matchesRegex", pattern: "host\\s*:\\s*str\\s*=", message: "Set a default value for host." },
        { type: "matchesRegex", pattern: "port\\s*:\\s*int\\s*=", message: "Set a default value for port." }
      ],
      pyTests: [
        { code: "c = Config()\nassert c.host == 'localhost' and c.port == 8000 and c.debug is False", message: "Config() with no arguments should use all three defaults." }
      ]
    },
    explanation: `<p>Fields with defaults must come after fields without defaults (same rule as function parameters). Use <code>field(default_factory=list)</code> for mutable defaults like lists -- never use a mutable object directly as a default.</p>`
  },
  {
    id: 67,
    title: "Dataclass with __post_init__",
    difficulty: "hard",
    topic: "Dataclasses",
    level: 4,
    xp: 30,
    instructions: `<p>The <code>__post_init__</code> method runs automatically right after a dataclass's generated <code>__init__</code> finishes setting all the fields, which makes it the natural place for validation: by the time it runs, every field already has its value, ready to be checked.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Define a <code>@dataclass</code> class <code>Rectangle</code> with fields <code>width: float</code> and <code>height: float</code>. Add a <code>__post_init__</code> that raises a <code>ValueError</code> if either dimension is not positive.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Rectangle(3, 4)</span><code class="io-val">constructs normally</code></div>
  <div class="io-row"><span class="io-key">Rectangle(-1, 4)</span><code class="io-val">raises ValueError</code></div>
</div>`,
    hints: [
      "def __post_init__(self):",
      "    if self.width <= 0 or self.height <= 0:",
      "        raise ValueError(\"Dimensions must be positive\")"
    ],
    starterCode: "from dataclasses import dataclass\n\n# Define Rectangle with __post_init__ validation\n",
    solution: 'from dataclasses import dataclass\n\n@dataclass\nclass Rectangle:\n    width: float\n    height: float\n\n    def __post_init__(self):\n        if self.width <= 0 or self.height <= 0:\n            raise ValueError("Dimensions must be positive")',
    validation: {
      checks: [
        { type: "hasDataclass", message: "Apply the @dataclass decorator." },
        { type: "hasClass", name: "Rectangle", message: "Define a class named 'Rectangle'." },
        { type: "matchesRegex", pattern: "def\\s+__post_init__", message: "Define a __post_init__ method." },
        { type: "matchesRegex", pattern: "self\\.width\\s*<=\\s*0|self\\.height\\s*<=\\s*0", message: "Check that width and height are positive (e.g. self.width <= 0)." },
        { type: "matchesRegex", pattern: "raise\\s+ValueError", message: "Raise ValueError for invalid dimensions." }
      ],
      pyTests: [
        { code: "r = Rectangle(3, 4)\nassert r.width == 3 and r.height == 4", message: "Rectangle(3, 4) should construct normally." },
        { code: "raised = False\ntry:\n    Rectangle(-1, 4)\nexcept ValueError:\n    raised = True\nassert raised, 'Rectangle(-1, 4) should raise ValueError'", message: "Rectangle(-1, 4) should raise ValueError, since width isn't positive." }
      ]
    },
    explanation: `<p><code>__post_init__</code> is the right place for validation because it runs after all fields are set. If the validation fails, the object is never fully constructed -- the ValueError propagates to the caller.</p>`
  },
  {
    id: 121,
    title: "Structuring Nested Data",
    difficulty: "medium",
    topic: "Dataclasses",
    level: 4,
    xp: 20,
    instructions: `<p>Real records are rarely flat. A customer has an address, and an address is its own little bundle of fields, so a nested dataclass, one dataclass used as a field inside another, models that shape directly, instead of reaching for a dictionary of dictionaries where a typo in a key silently gives you <code>None</code> or a crash.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Define a <code>@dataclass</code> class <code>Address</code> with fields <code>city: str</code> and <code>zip_code: str</code>. Define a <code>@dataclass</code> class <code>Customer</code> with fields <code>name: str</code>, <code>address: Address</code>, and <code>orders: list</code> defaulting to an empty list.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">Customer("Homer", Address("Springfield", "00000"))</code></div>
  <div class="io-row"><span class="io-key">.address.city</span><code class="io-val">"Springfield"</code></div>
</div>`,
    hints: [
      "@dataclass\nclass Address:\n    city: str\n    zip_code: str",
      "@dataclass\nclass Customer:\n    name: str\n    address: Address\n    orders: list = field(default_factory=list)"
    ],
    starterCode: "from dataclasses import dataclass, field\n\n# Define Address, then Customer with a nested Address field\n",
    solution: "from dataclasses import dataclass, field\n\n@dataclass\nclass Address:\n    city: str\n    zip_code: str\n\n@dataclass\nclass Customer:\n    name: str\n    address: Address\n    orders: list = field(default_factory=list)",
    validation: {
      checks: [
        { type: "hasClass", name: "Address", message: "Define a class named 'Address'." },
        { type: "hasClass", name: "Customer", message: "Define a class named 'Customer'." },
        { type: "matchesRegex", pattern: "address\\s*:\\s*Address", message: "Give Customer an 'address: Address' field." },
        { type: "matchesRegex", pattern: "orders\\s*:\\s*list\\s*=\\s*field\\s*\\(\\s*default_factory\\s*=\\s*list\\s*\\)", message: "Give Customer an 'orders' field defaulting to an empty list via field(default_factory=list)." }
      ],
      pyTests: [
        { code: "a = Address('Springfield', '00000')\nc = Customer('Homer', a)\nassert c.name == 'Homer' and c.address.city == 'Springfield' and c.orders == []", message: "Customer('Homer', Address('Springfield', '00000')) should nest correctly and default orders to []." }
      ]
    },
    explanation: `<p><code>c.address.city</code> reads exactly like the sentence describing the data: the customer's address's city. Nesting dataclasses this way also means each level gets its own <code>__init__</code>, <code>__repr__</code>, and <code>__eq__</code> for free, generated independently.</p>`
  },
  {
    id: 68,
    title: "async def and await",
    difficulty: "medium",
    topic: "Async",
    level: 4,
    xp: 20,
    instructions: `<p>Calling an <code>async</code> function doesn't run its body immediately; it hands back a coroutine object that has to be driven to completion, usually with <code>await</code>. This is the foundation of Python's non-blocking I/O: an awaited operation can pause and let other work happen while it waits.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Define an <code>async</code> function <code>fetch_data</code> that takes a <code>url: str</code> parameter. Inside, simulate an async operation by doing <code>await asyncio.sleep(0)</code> (import asyncio), then return the string <code>f"Data from {url}"</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">fetch_data("http://x")</span><code class="io-val">resolves to "Data from http://x"</code></div>
</div>`,
    hints: [
      "import asyncio",
      "async def fetch_data(url: str):",
      "    await asyncio.sleep(0)",
      "    return f\"Data from {url}\""
    ],
    starterCode: "# Define an async fetch_data function\n",
    solution: 'import asyncio\n\nasync def fetch_data(url: str):\n    await asyncio.sleep(0)\n    return f"Data from {url}"',
    validation: {
      checks: [
        { type: "hasAsync", message: "Define the function with 'async def'." },
        { type: "hasAwait", message: "Use 'await' inside the async function." },
        { type: "hasValidDef", name: "fetch_data", message: "Name the function 'fetch_data' with a colon: async def fetch_data(url: str):" },
        { type: "hasImport", module: "asyncio", message: "Import asyncio." }
      ],
      pyTests: [
        { code: "def __run(coro):\n    while True:\n        try:\n            coro.send(None)\n        except StopIteration as e:\n            return e.value\nassert __run(fetch_data('http://x')) == 'Data from http://x'", message: "fetch_data('http://x') should eventually resolve to 'Data from http://x'." }
      ]
    },
    explanation: `<p><code>async def</code> defines a coroutine. It does not run immediately -- you need to <code>await</code> it or run it with <code>asyncio.run()</code>. FastAPI uses async functions for non-blocking request handling.</p>`
  },
  {
    id: 69,
    title: "asyncio.gather() Pattern",
    difficulty: "hard",
    topic: "Async",
    level: 4,
    xp: 30,
    instructions: `<p><code>asyncio.gather()</code> takes several coroutines and runs them concurrently, waiting until all of them finish before handing back their results in the same order you gave them. This is far faster than awaiting each one in turn when they're all independent, I/O-bound operations like network requests.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Define an async function <code>fetch_all</code> that takes a list of URLs <code>urls: list</code>. Use <code>asyncio.gather()</code> to concurrently call a pre-existing <code>fetch_data(url)</code> for each URL, and return the results as a list.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">fetch_all(["a", "b"])</span><code class="io-val">resolves to ["Data from a", "Data from b"]</code></div>
</div>`,
    hints: [
      "async def fetch_all(urls: list):",
      "    tasks = [fetch_data(url) for url in urls]",
      "    return await asyncio.gather(*tasks)"
    ],
    starterCode: "import asyncio\n\nasync def fetch_data(url):\n    await asyncio.sleep(0)\n    return f\"Data from {url}\"\n\n# Define fetch_all using asyncio.gather\n",
    solution: "import asyncio\n\nasync def fetch_data(url):\n    await asyncio.sleep(0)\n    return f\"Data from {url}\"\n\nasync def fetch_all(urls: list):\n    tasks = [fetch_data(url) for url in urls]\n    return await asyncio.gather(*tasks)",
    validation: {
      checks: [
        { type: "hasValidDef", name: "fetch_all", message: "Define a function named 'fetch_all' with a colon: async def fetch_all(...):" },
        { type: "hasAsync", message: "Define fetch_all as async." },
        { type: "matchesRegex", pattern: "asyncio\\.gather", message: "Use asyncio.gather() to run tasks concurrently." },
        { type: "matchesRegex", pattern: "\\*tasks|\\*\\[", message: "Unpack the tasks into asyncio.gather()." }
      ]
    },
    explanation: `<p><code>asyncio.gather(*coroutines)</code> schedules all coroutines to run concurrently. This is far faster than awaiting them one at a time when the operations are I/O-bound (like HTTP requests).</p>`
  },
  {
    id: 70,
    title: "Environment Variables",
    difficulty: "easy",
    topic: "Config",
    level: 4,
    xp: 10,
    instructions: `<p>Environment variables store configuration outside your code entirely, which keeps sensitive values like passwords and API keys out of source control. Read them with <code>os.environ.get(key, default)</code> rather than square brackets, so a missing variable falls back to a sensible default instead of crashing the program.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Import <code>os</code>. Create a variable <code>db_url</code> that reads the environment variable <code>"DATABASE_URL"</code>, with a fallback default of <code>"sqlite:///app.db"</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">DATABASE_URL unset</span><code class="io-val">db_url = "sqlite:///app.db"</code></div>
</div>`,
    hints: [
      "import os",
      "db_url = os.environ.get(\"DATABASE_URL\", \"sqlite:///app.db\")"
    ],
    starterCode: "# Import os and read DATABASE_URL env var\n",
    solution: 'import os\ndb_url = os.environ.get("DATABASE_URL", "sqlite:///app.db")',
    validation: {
      checks: [
        { type: "hasImport", module: "os", message: "Import the os module." },
        { type: "matchesRegex", pattern: "os\\.environ\\.get\\(", message: "Use os.environ.get() to read the variable." },
        { type: "codeContains", value: "DATABASE_URL", message: "Read the DATABASE_URL variable." },
        { type: "codeContains", value: "db_url", message: "Store the result in 'db_url'." }
      ],
      pyTests: [
        { code: "assert db_url == 'sqlite:///app.db'", message: "'db_url' should fall back to 'sqlite:///app.db' since DATABASE_URL isn't set." }
      ]
    },
    explanation: `<p>Always use <code>os.environ.get(key, default)</code> rather than <code>os.environ[key]</code> -- the latter raises a <code>KeyError</code> if the variable is not set. In production, environment variables store secrets like database passwords and API keys.</p>`
  },
  {
    id: 71,
    title: ".env File Pattern",
    difficulty: "easy",
    topic: "Config",
    level: 4,
    xp: 10,
    instructions: `<p>A <code>.env</code> file stores environment variables locally in a simple <code>KEY=value</code> format, so developers don't have to set them by hand every time. The third-party <code>python-dotenv</code> library reads that file and copies its values into <code>os.environ</code>, right where <code>os.environ.get()</code> can find them.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write the code that would load a <code>.env</code> file using <code>python-dotenv</code>. Import <code>load_dotenv</code> from <code>dotenv</code> and call it. Then read <code>SECRET_KEY</code> from environment variables into a variable named <code>secret</code>, with default <code>"dev-secret"</code>.</p>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>python-dotenv is a third-party package, so this one is checked on its code shape rather than actually run here.</span>
</div>`,
    hints: [
      "from dotenv import load_dotenv",
      "load_dotenv()",
      "import os",
      "secret = os.environ.get(\"SECRET_KEY\", \"dev-secret\")"
    ],
    starterCode: "# Load .env file and read SECRET_KEY\n",
    solution: 'from dotenv import load_dotenv\nimport os\n\nload_dotenv()\nsecret = os.environ.get("SECRET_KEY", "dev-secret")',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "from\\s+dotenv\\s+import|import\\s+dotenv", message: "Import from dotenv." },
        { type: "codeContains", value: "load_dotenv()", message: "Call load_dotenv() to load the .env file." },
        { type: "codeContains", value: "SECRET_KEY", message: "Read the SECRET_KEY variable." }
      ]
    },
    explanation: `<p><code>load_dotenv()</code> reads your <code>.env</code> file and sets the variables in <code>os.environ</code>. The <code>.env</code> file should never be committed to version control -- add it to <code>.gitignore</code>.</p>`
  },
  {
    id: 72,
    title: "Python Package Structure",
    difficulty: "medium",
    topic: "Project Structure",
    level: 4,
    xp: 20,
    instructions: `<p>A folder becomes an importable Python package the moment it contains an <code>__init__.py</code> file. Every other <code>.py</code> file inside that folder is a module belonging to the package, and <code>__init__.py</code> itself is what runs when the package is first imported.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write a minimal <code>__init__.py</code> for a package named <code>myapp</code>. It should define a variable <code>VERSION = "1.0.0"</code> and import the <code>create_app</code> function from a sibling module <code>.core</code> (relative import).</p>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>This one is checked on its code shape rather than actually run here, since relative imports only work inside a real package directory.</span>
</div>`,
    hints: [
      "VERSION = \"1.0.0\"",
      "from .core import create_app"
    ],
    starterCode: "# Write the contents of myapp/__init__.py\n",
    solution: 'VERSION = "1.0.0"\nfrom .core import create_app',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "VERSION\\s*=\\s*['\"]1\\.0\\.0['\"]", message: "Define VERSION = \"1.0.0\"." },
        { type: "matchesRegex", pattern: "from\\s+\\.\\w+\\s+import|from\\s+\\.\\s+import", message: "Use a relative import (starting with a dot)." },
        { type: "matchesRegex", pattern: "from\\s+\\.\\w+\\s+import.*create_app", message: "Import create_app via a relative import statement." }
      ]
    },
    explanation: `<p>Relative imports (starting with <code>.</code>) are for imports within the same package. <code>from .core import create_app</code> means "from the <code>core</code> module in the same package as this file."</p>`
  },
  {
    id: 73,
    title: "Relative Imports",
    difficulty: "medium",
    topic: "Project Structure",
    level: 4,
    xp: 20,
    instructions: `<p>Inside a package, relative imports reach sibling modules without spelling out the whole package path. A single leading dot <code>.</code> means "the current package"; two dots <code>..</code> means "one level up, the parent package."</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write an import statement that imports <code>User</code> from the <code>models</code> module in the same package (single dot relative import), and also imports <code>get_db</code> from a <code>database</code> module in the same package.</p>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>This one is checked on its code shape rather than actually run here, since relative imports only work inside a real package directory.</span>
</div>`,
    hints: [
      "from .models import User",
      "from .database import get_db"
    ],
    starterCode: "# Write two relative imports from the same package\n",
    solution: "from .models import User\nfrom .database import get_db",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "from\\s+\\.models\\s+import\\s+User", message: "Import User from .models." },
        { type: "matchesRegex", pattern: "from\\s+\\.database\\s+import\\s+get_db", message: "Import get_db from .database." }
      ]
    },
    explanation: `<p>Relative imports are more robust than absolute imports within a package -- they do not break if the package is renamed. FastAPI and Django projects use them extensively to import between route files, models, and services.</p>`
  },
  {
    id: 74,
    title: "requirements.txt Format",
    difficulty: "easy",
    topic: "Project Structure",
    level: 4,
    xp: 10,
    instructions: `<p>A <code>requirements.txt</code> file lists the packages a project depends on, one per line, each optionally pinned to a version. Anyone (or any deployment system) can then recreate the exact same set of dependencies with a single install command.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write a valid <code>requirements.txt</code> that includes: <code>fastapi</code> version <code>0.104.1</code> (exact), <code>uvicorn</code> version at least <code>0.24.0</code> (use <code>>=</code>), and <code>pydantic</code> with no version constraint.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">fastapi==0.104.1<br>uvicorn>=0.24.0<br>pydantic</code></div>
</div>`,
    hints: [
      "fastapi==0.104.1",
      "uvicorn>=0.24.0",
      "pydantic"
    ],
    starterCode: "# Write the requirements.txt content as Python comments or strings\nrequirements = \"\"\"\n# Add your packages here\n\"\"\"\n",
    solution: 'requirements = """\nfastapi==0.104.1\nuvicorn>=0.24.0\npydantic\n"""',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "fastapi==0\\.104\\.1|fastapi==", message: "Specify fastapi with an exact version (==)." },
        { type: "matchesRegex", pattern: "uvicorn>=", message: "Specify uvicorn with a minimum version (>=)." },
        { type: "codeContains", value: "pydantic", message: "Include pydantic without a version constraint." }
      ],
      pyTests: [
        { code: "assert 'fastapi==0.104.1' in requirements", message: "requirements should contain 'fastapi==0.104.1'." },
        { code: "assert 'uvicorn>=0.24.0' in requirements", message: "requirements should contain 'uvicorn>=0.24.0'." },
        { code: "assert 'pydantic' in requirements", message: "requirements should contain 'pydantic'." }
      ]
    },
    explanation: `<p>Version specifiers: <code>==</code> pins to an exact version, <code>>=</code> requires at least that version, <code>~=</code> allows patch updates. Pinning all versions in production ensures reproducible deployments.</p>`
  },
  {
    id: 128,
    title: "Command-Line Arguments",
    difficulty: "easy",
    topic: "CLI Tools",
    level: 4,
    xp: 15,
    instructions: `<p>Every Python script gets called with a list of the words typed after it on the command line -- <code>sys.argv</code>. <code>sys.argv[0]</code> is always the script's own name, so the actual arguments start at index <code>1</code>. Running <code>python greet.py Alice</code> gives <code>sys.argv == ["greet.py", "Alice"]</code>.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Using <code>sys.argv</code>, create <code>first_arg</code> as the first argument passed in (not the script name), and <code>arg_count</code> as how many arguments were passed (also not counting the script name).</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Command</span><code class="io-val">python greet.py apple banana</code></div>
  <div class="io-row"><span class="io-key">first_arg</span><code class="io-val">"apple"</code></div>
  <div class="io-row"><span class="io-key">arg_count</span><code class="io-val">2</code></div>
</div>`,
    hints: [
      "first_arg = sys.argv[1]",
      "arg_count = len(sys.argv) - 1"
    ],
    starterCode: "import sys\n\n# Create first_arg and arg_count from sys.argv\n",
    solution: "import sys\n\nfirst_arg = sys.argv[1]\narg_count = len(sys.argv) - 1",
    validation: {
      checks: [
        { type: "hasImport", module: "sys", message: "Import the sys module." },
        { type: "matchesRegex", pattern: "sys\\.argv\\s*\\[\\s*1\\s*\\]", message: "Read the first argument with sys.argv[1]." },
        { type: "matchesRegex", pattern: "len\\s*\\(\\s*sys\\.argv\\s*\\)", message: "Use len(sys.argv) to count arguments." }
      ],
      argv: ["apple", "banana"],
      pyTests: [
        { code: "assert first_arg == 'apple'", message: "'first_arg' should be the first command-line argument, 'apple'." },
        { code: "assert arg_count == 2", message: "'arg_count' should be 2 (not counting the script name)." }
      ]
    },
    explanation: `<p><code>sys.argv</code> is how a script sees what was typed after its name. Every CLI tool, from a two-line script to full frameworks like <code>argparse</code>, ultimately reads from this same list -- <code>argparse</code> just parses it for you instead of you indexing it by hand.</p>`
  },
  {
    id: 129,
    title: "Guided Project: Howler",
    kind: "project",
    source: "Tiny Python Projects #5, \"Howler: Working with Command-Line Arguments\"",
    difficulty: "medium",
    topic: "CLI Tools",
    level: 4,
    xp: 25,
    instructions: `<p>The <code>argparse</code> module builds a proper command-line interface for you: define what arguments a script accepts, and it handles reading <code>sys.argv</code>, converting types, and producing a <code>--help</code> message for free. <code>nargs='*'</code> on a positional argument means "collect zero or more values into a list."</p>
<span class="task-label">Your Task</span>
<p class="task-line">Build a script that "howls" whatever words are passed on the command line. Set up an <code>ArgumentParser</code> with one positional argument <code>words</code> using <code>nargs='*'</code>, join the collected words into a single phrase, and print it in uppercase.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Command</span><code class="io-val">python howler.py are you a mouse</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">ARE YOU A MOUSE</code></div>
</div>`,
    hints: [
      "parser.add_argument('words', nargs='*')",
      "args = parser.parse_args()",
      "phrase = ' '.join(args.words)",
      "print(phrase.upper())"
    ],
    starterCode: "import argparse\n\nparser = argparse.ArgumentParser()\n# Add a 'words' positional argument that collects zero or more values\n\nargs = parser.parse_args()\n# Join args.words into a phrase and print it uppercased\n",
    solution: "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument('words', nargs='*', help='words to howl')\nargs = parser.parse_args()\n\nphrase = ' '.join(args.words)\nprint(phrase.upper())",
    validation: {
      checks: [
        { type: "hasImport", module: "argparse", message: "Import the argparse module." },
        { type: "matchesRegex", pattern: "add_argument\\s*\\(\\s*['\"]words['\"]\\s*,\\s*nargs\\s*=\\s*['\"]\\*['\"]", message: "Add a 'words' positional argument with nargs='*'." },
        { type: "matchesRegex", pattern: "\\.upper\\(\\)", message: "Print the phrase in uppercase with .upper()." }
      ],
      argv: ["are", "you", "a", "mouse"],
      pyTests: [
        { code: "assert stdout_output == 'ARE YOU A MOUSE\\n'", message: "Running with 'are you a mouse' should print 'ARE YOU A MOUSE'." }
      ]
    },
    explanation: `<p>This is the real shape of most command-line tools: <code>argparse</code> declares the interface, <code>parse_args()</code> reads <code>sys.argv</code> and validates it against that declaration, and the rest of the script just uses the resulting <code>args</code> object. It scales to flags, defaults, and types far better than indexing <code>sys.argv</code> by hand.</p>`
  },
  {
    id: 130,
    title: "Guided Project: Word Count",
    kind: "project",
    source: "Tiny Python Projects #6, \"Words Count: Reading Files and Command-Line Arguments\"",
    difficulty: "medium",
    topic: "CLI Tools",
    level: 4,
    xp: 25,
    instructions: `<p>Not every program takes its input from arguments -- many read from standard input instead, so they can be fed piped text (<code>cat notes.txt | python wc.py</code>) as easily as typed input. <code>sys.stdin.read()</code> reads everything available on standard input as one string.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Read all of standard input, count how many words it contains (splitting on whitespace), and print <code>"There are {n} words in the input."</code> with the count filled in.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">the quick brown fox jumps over the lazy dog</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">There are 9 words in the input.</code></div>
</div>`,
    hints: [
      "text = sys.stdin.read()",
      "word_count = len(text.split())",
      "print(f\"There are {word_count} words in the input.\")"
    ],
    starterCode: "import sys\n\ntext = sys.stdin.read()\n# Count the words and print the sentence\n",
    solution: "import sys\n\ntext = sys.stdin.read()\nword_count = len(text.split())\nprint(f\"There are {word_count} words in the input.\")",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "sys\\.stdin\\.read\\(\\)", message: "Read standard input with sys.stdin.read()." },
        { type: "matchesRegex", pattern: "\\.split\\(\\)", message: "Split the text into words with .split()." }
      ],
      stdin: "the quick brown fox jumps over the lazy dog\n",
      pyTests: [
        { code: "assert stdout_output == 'There are 9 words in the input.\\n'", message: "For the sample input, output should be 'There are 9 words in the input.'" }
      ]
    },
    explanation: `<p>Reading from standard input instead of a fixed filename is what makes a script composable with other command-line tools -- it can sit anywhere in a pipeline, fed by whatever came before it.</p>`
  },
  {
    id: 75,
    title: "Exception Hierarchies",
    difficulty: "medium",
    topic: "Exceptions",
    level: 4,
    xp: 20,
    instructions: `<p>Exceptions form a hierarchy, and catching a parent class also catches every subclass beneath it. Building your own small hierarchy, one base error with several specific subclasses, lets calling code catch broadly with <code>except AppError</code> or narrowly with <code>except NotFoundError</code>, depending on what it actually needs to handle.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Define a base exception <code>AppError</code> inheriting from <code>Exception</code>. Define two subclasses: <code>NotFoundError</code> and <code>AuthError</code>, both inheriting from <code>AppError</code>. Each should store a <code>message</code> attribute set in <code>__init__</code> (call <code>super().__init__(message)</code>).</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">isinstance(NotFoundError("x"), AppError)</span><code class="io-val">True</code></div>
</div>`,
    hints: [
      "class AppError(Exception):",
      "    def __init__(self, message):",
      "        super().__init__(message)",
      "        self.message = message"
    ],
    starterCode: "# Define AppError and two subclasses\n",
    solution: "class AppError(Exception):\n    def __init__(self, message):\n        super().__init__(message)\n        self.message = message\n\nclass NotFoundError(AppError):\n    pass\n\nclass AuthError(AppError):\n    pass",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "class\\s+AppError\\s*\\(\\s*Exception\\s*\\)", message: "Define AppError inheriting from Exception." },
        { type: "matchesRegex", pattern: "class\\s+NotFoundError\\s*\\(\\s*AppError\\s*\\)", message: "Define NotFoundError inheriting from AppError." },
        { type: "matchesRegex", pattern: "class\\s+AuthError\\s*\\(\\s*AppError\\s*\\)", message: "Define AuthError inheriting from AppError." }
      ],
      pyTests: [
        { code: "e = NotFoundError('missing')\nassert isinstance(e, AppError) and e.message == 'missing'", message: "NotFoundError should be an AppError, with .message set from __init__." },
        { code: "assert isinstance(AuthError('no'), AppError)", message: "AuthError should also be an AppError." }
      ]
    },
    explanation: `<p>With this hierarchy, <code>except AppError</code> catches any of the subclasses. You can also catch specific subclasses individually. This pattern is standard in web frameworks for returning appropriate HTTP error codes.</p>`
  },
  {
    id: 76,
    title: "Logging Basics",
    difficulty: "medium",
    topic: "Config",
    level: 4,
    xp: 20,
    instructions: `<p>The <code>logging</code> module is the standard way to record what a program is doing, and it beats scattering <code>print()</code> calls everywhere: log messages carry a severity level, a source, and can be routed to a file, the console, or a remote service without changing the calling code.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Import <code>logging</code>. Configure basic logging with level <code>logging.INFO</code> using <code>basicConfig</code>. Create a logger named <code>"myapp"</code> using <code>logging.getLogger()</code>. Log the message <code>"App started"</code> at INFO level.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">logger.name</span><code class="io-val">"myapp"</code></div>
</div>`,
    hints: [
      "import logging",
      "logging.basicConfig(level=logging.INFO)",
      "logger = logging.getLogger(\"myapp\")",
      "logger.info(\"App started\")"
    ],
    starterCode: "# Set up logging and log a message\n",
    solution: 'import logging\n\nlogging.basicConfig(level=logging.INFO)\nlogger = logging.getLogger("myapp")\nlogger.info("App started")',
    validation: {
      checks: [
        { type: "hasImport", module: "logging", message: "Import the logging module." },
        { type: "codeContains", value: "basicConfig", message: "Call logging.basicConfig()." },
        { type: "matchesRegex", pattern: "getLogger\\(", message: "Create a logger with getLogger()." },
        { type: "matchesRegex", pattern: "logger\\.info\\(|logger\\.warning\\(|logger\\.error\\(", message: "Log a message using the logger." }
      ],
      pyTests: [
        { code: "assert logger.name == 'myapp'", message: "'logger' should be named 'myapp'." },
        { code: "import logging as __logging\nassert __logging.getLogger().level == __logging.INFO", message: "basicConfig(level=logging.INFO) should set the root logger's level to INFO." }
      ]
    },
    explanation: `<p>Loggers can be configured with different handlers (file, console, remote) and levels (DEBUG, INFO, WARNING, ERROR, CRITICAL). In production, you would configure JSON logging and ship logs to a service like Datadog or CloudWatch.</p>`
  },
  {
    id: 122,
    title: "Debugging with Logging and Assertions",
    difficulty: "medium",
    topic: "Config",
    level: 4,
    xp: 20,
    instructions: `<p>An <code>assert</code> statement checks that something you believe should always be true actually is, and raises <code>AssertionError</code> immediately if it isn't, which catches a bad assumption right where it happens instead of letting it cause confusing symptoms somewhere else later. Pairing that with a <code>logger.debug()</code> call gives you a trail of what the function was doing when something went wrong.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>calculate_average(numbers)</code> that asserts <code>numbers</code> isn't empty (with a clear message), logs a debug message with <code>logger.debug()</code>, then returns the average.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">calculate_average([2, 4, 6])</span><code class="io-val">4.0</code></div>
  <div class="io-row"><span class="io-key">calculate_average([])</span><code class="io-val">raises AssertionError</code></div>
</div>`,
    hints: [
      "assert len(numbers) > 0, \"Cannot average an empty list\"",
      "logger.debug(f\"Averaging {len(numbers)} numbers\")",
      "return sum(numbers) / len(numbers)"
    ],
    starterCode: "import logging\nlogger = logging.getLogger(\"myapp\")\n\n# Define calculate_average(numbers)\n",
    solution: 'import logging\nlogger = logging.getLogger("myapp")\n\ndef calculate_average(numbers):\n    assert len(numbers) > 0, "Cannot average an empty list"\n    logger.debug(f"Averaging {len(numbers)} numbers")\n    return sum(numbers) / len(numbers)',
    validation: {
      checks: [
        { type: "hasValidDef", name: "calculate_average", message: "Define a function named 'calculate_average' with a colon." },
        { type: "matchesRegex", pattern: "assert\\s+len\\(\\s*numbers\\s*\\)\\s*>\\s*0", message: "Assert that numbers isn't empty: assert len(numbers) > 0, ..." },
        { type: "matchesRegex", pattern: "logger\\.debug\\(", message: "Log a debug message with logger.debug()." }
      ],
      pyTests: [
        { code: "assert calculate_average([2, 4, 6]) == 4.0", message: "calculate_average([2, 4, 6]) should return 4.0." },
        { code: "raised = False\ntry:\n    calculate_average([])\nexcept AssertionError:\n    raised = True\nassert raised, 'calculate_average([]) should raise AssertionError'", message: "calculate_average([]) should raise AssertionError for an empty list." }
      ]
    },
    explanation: `<p>Unlike a regular <code>if</code> check, an <code>assert</code> is meant to catch bugs, situations that should be impossible if the rest of the code is correct, not to validate ordinary user input (which should be handled with a proper exception instead). Python can strip asserts out entirely when run with the <code>-O</code> optimization flag, so never rely on one for something that must always run.</p>`
  },
  {
    id: 77,
    title: "json.loads and json.dumps",
    difficulty: "easy",
    topic: "Modules",
    level: 4,
    xp: 10,
    instructions: `<p>The <code>json</code> module converts between Python objects and JSON text. <code>json.dumps(obj)</code> turns a Python object into a JSON string, and <code>json.loads(text)</code> does the reverse, parsing JSON text back into Python objects. Every web API you'll ever call speaks this format.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Given the dictionary <code>data</code> below, create <code>json_str</code> by serialising it. Then create <code>parsed</code> by deserialising <code>json_str</code> back to a Python object.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">data = {"name": "Alice", "age": 30}</code></div>
  <div class="io-row"><span class="io-key">json_str</span><code class="io-val">'{"name": "Alice", "age": 30}'</code></div>
</div>`,
    hints: [
      "import json",
      "json_str = json.dumps(data)",
      "parsed = json.loads(json_str)"
    ],
    starterCode: 'data = {"name": "Alice", "age": 30}\n# Serialise to JSON and deserialise back\n',
    solution: 'import json\n\ndata = {"name": "Alice", "age": 30}\njson_str = json.dumps(data)\nparsed = json.loads(json_str)',
    validation: {
      checks: [
        { type: "hasImport", module: "json", message: "Import the json module." },
        { type: "codeContains", value: "json.dumps(", message: "Use json.dumps() to serialise." },
        { type: "codeContains", value: "json.loads(", message: "Use json.loads() to deserialise." }
      ],
      pyTests: [
        { code: "assert isinstance(json_str, str)", message: "'json_str' should be a string." },
        { code: "assert parsed == data", message: "'parsed' should round-trip back to the original dictionary." }
      ]
    },
    explanation: `<p><code>json.dumps()</code> accepts optional arguments: <code>indent=2</code> for pretty-printing, <code>sort_keys=True</code> for sorted output. All web APIs communicate via JSON, so these two functions are used constantly.</p>`
  },
  {
    id: 123,
    title: "Reading and Writing Files",
    difficulty: "medium",
    topic: "Modules",
    level: 4,
    xp: 20,
    instructions: `<p>Writing to a file and reading it back is the most basic form of persistence: data that survives after your program ends. <code>f.read()</code> returns everything in the file as one string, and <code>.splitlines()</code> breaks that string apart at each newline into a list of lines, without keeping the newline characters themselves.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Write three lines to <code>"notes.txt"</code> separated by newlines, then read the file back and split it into a list named <code>lines</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">notes.txt contents</span><code class="io-val">"line1\\nline2\\nline3"</code></div>
  <div class="io-row"><span class="io-key">lines</span><code class="io-val">["line1", "line2", "line3"]</code></div>
</div>`,
    hints: [
      "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"line1\\nline2\\nline3\")",
      "with open(\"notes.txt\") as f:\n    lines = f.read().splitlines()"
    ],
    starterCode: "# Write three lines to notes.txt, then read them back into 'lines'\n",
    solution: 'with open("notes.txt", "w") as f:\n    f.write("line1\\nline2\\nline3")\n\nwith open("notes.txt") as f:\n    lines = f.read().splitlines()',
    validation: {
      checks: [
        { type: "hasContextManager", message: "Use a 'with' statement to open the file." },
        { type: "matchesRegex", pattern: "\\.write\\(", message: "Write to the file with .write()." },
        { type: "matchesRegex", pattern: "\\.splitlines\\(\\)", message: "Split the file's contents into lines with .splitlines()." }
      ],
      pyTests: [
        { code: "assert lines == ['line1', 'line2', 'line3']", message: "'lines' should be ['line1', 'line2', 'line3']." }
      ]
    },
    explanation: `<p><code>.splitlines()</code> is the right tool here rather than <code>.split("\\n")</code>, since it also handles the different line-ending conventions different operating systems use, without leaving a stray empty string if the file happens to end with a newline.</p>`
  },
  {
    id: 78,
    title: "pathlib.Path Usage",
    difficulty: "medium",
    topic: "Modules",
    level: 4,
    xp: 20,
    instructions: `<p><code>pathlib.Path</code> is the modern, object-oriented way to work with filesystem paths, replacing manual string concatenation with <code>os.path</code>. The <code>/</code> operator joins path segments safely and correctly regardless of operating system, since a <code>Path</code> object knows how to render itself with the right separators.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Import <code>Path</code> from <code>pathlib</code>. Create a <code>Path</code> object <code>base</code> pointing to <code>"/home/user/projects"</code>. Create a sub-path <code>config_file</code> pointing to <code>"/home/user/projects/myapp/config.json"</code> by using the <code>/</code> operator.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">config_file</span><code class="io-val">/home/user/projects/myapp/config.json</code></div>
</div>`,
    hints: [
      "from pathlib import Path",
      "base = Path(\"/home/user/projects\")",
      "config_file = base / \"myapp\" / \"config.json\""
    ],
    starterCode: "# Use pathlib.Path to build file paths\n",
    solution: 'from pathlib import Path\n\nbase = Path("/home/user/projects")\nconfig_file = base / "myapp" / "config.json"',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "from\\s+pathlib\\s+import\\s+Path|import\\s+pathlib", message: "Import Path from pathlib." },
        { type: "matchesRegex", pattern: "Path\\(", message: "Create a Path object." },
        { type: "matchesRegex", pattern: "base\\s*/\\s*['\"]", message: "Use the / operator to join path segments." }
      ],
      pyTests: [
        { code: "assert str(config_file) == '/home/user/projects/myapp/config.json'", message: "'config_file' should be /home/user/projects/myapp/config.json." }
      ]
    },
    explanation: `<p><code>pathlib</code>'s <code>/</code> operator joins path segments safely across operating systems. It also provides useful methods: <code>.exists()</code>, <code>.read_text()</code>, <code>.write_text()</code>, <code>.parent</code>, <code>.stem</code>, <code>.suffix</code>.</p>`
  },
  {
    id: 124,
    title: "Organizing Files",
    difficulty: "medium",
    topic: "Modules",
    level: 4,
    xp: 20,
    instructions: `<p><code>Path</code> objects don't just represent locations, they can act on them too. <code>.mkdir(exist_ok=True)</code> creates a directory (and quietly does nothing if it already exists, instead of raising an error), while <code>.write_text()</code> and <code>.read_text()</code> skip the <code>with open(...)</code> ceremony entirely for simple whole-file reads and writes.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Create a directory named <code>"reports"</code> (fine if it already exists), then write <code>"All systems normal"</code> to <code>reports/summary.txt</code> using pathlib.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">reports/summary.txt contains "All systems normal"</code></div>
</div>`,
    hints: [
      "reports_dir = Path(\"reports\")",
      "reports_dir.mkdir(exist_ok=True)",
      "(reports_dir / \"summary.txt\").write_text(\"All systems normal\")"
    ],
    starterCode: "from pathlib import Path\n\n# Create the reports directory and write summary.txt inside it\n",
    solution: 'from pathlib import Path\n\nreports_dir = Path("reports")\nreports_dir.mkdir(exist_ok=True)\nreport_file = reports_dir / "summary.txt"\nreport_file.write_text("All systems normal")',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\.mkdir\\(\\s*exist_ok\\s*=\\s*True\\s*\\)", message: "Create the directory with .mkdir(exist_ok=True)." },
        { type: "matchesRegex", pattern: "\\.write_text\\(", message: "Write the file's contents with .write_text()." }
      ],
      pyTests: [
        { code: "from pathlib import Path\nassert Path('reports').is_dir()", message: "'reports' should exist as a directory." },
        { code: "from pathlib import Path\nassert Path('reports/summary.txt').read_text() == 'All systems normal'", message: "reports/summary.txt should contain \"All systems normal\"." }
      ]
    },
    explanation: `<p><code>exist_ok=True</code> matters here: without it, calling <code>.mkdir()</code> on a directory that's already there raises <code>FileExistsError</code>, which is rarely what you want when the goal is just "make sure this directory exists."</p>`
  },
  {
    id: 125,
    title: "Guided Project: Word of the Day",
    difficulty: "medium",
    topic: "Modules",
    level: 4,
    xp: 20,
    kind: "project",
    source: "Tiny Python Projects #19, \"Word of the Day\"",
    instructions: `<p>The <code>csv</code> module handles the fiddly parts of reading comma-separated data, like quoted fields containing commas, that a plain <code>.split(",")</code> would get wrong. This project from <em>Tiny Python Projects</em> parses a small word-list CSV, using <code>csv.DictReader</code> so each row comes back as a dictionary keyed by column name instead of an unlabeled list.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Parse <code>data</code> using <code>csv.DictReader</code> wrapped in <code>io.StringIO(data)</code>, collect every row into a list <code>words</code>, then read the first row's <code>"word"</code> field into <code>first_word</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">first_word</span><code class="io-val">"serendipity"</code></div>
</div>`,
    hints: [
      "import csv, io",
      "reader = csv.DictReader(io.StringIO(data))",
      "words = list(reader)",
      "first_word = words[0][\"word\"]"
    ],
    starterCode: 'data = "word,definition\\nserendipity,a pleasant surprise\\nephemeral,lasting a short time\\n"\n# Parse data with csv.DictReader\n',
    solution: 'import csv\nimport io\n\ndata = "word,definition\\nserendipity,a pleasant surprise\\nephemeral,lasting a short time\\n"\nreader = csv.DictReader(io.StringIO(data))\nwords = list(reader)\nfirst_word = words[0]["word"]',
    validation: {
      checks: [
        { type: "hasImport", module: "csv", message: "Import the csv module." },
        { type: "matchesRegex", pattern: "csv\\.DictReader\\(", message: "Use csv.DictReader() to parse the data." },
        { type: "matchesRegex", pattern: "io\\.StringIO\\(", message: "Wrap data in io.StringIO() so csv can read it like a file." }
      ],
      pyTests: [
        { code: "assert first_word == 'serendipity'", message: "'first_word' should be \"serendipity\"." },
        { code: "assert len(words) == 2 and words[1]['word'] == 'ephemeral'", message: "'words' should have 2 rows, with the second word being \"ephemeral\"." }
      ]
    },
    explanation: `<p><code>io.StringIO</code> wraps a plain string so it behaves like an open file, which is exactly what <code>csv.DictReader</code> expects. This trick works with any function that wants a file object, letting you feed it in-memory text without ever touching the real filesystem.</p>`
  },
  {
    id: 126,
    title: "Guided Project: Web Scraping",
    difficulty: "hard",
    topic: "Modules",
    level: 4,
    xp: 30,
    kind: "project",
    source: "Automate the Boring Stuff with Python, ch.12, \"Web Scraping\"",
    instructions: `<p>The book's version of this chapter fetches a live web page over the network; this version skips the network entirely and parses a fixed HTML string instead, using the standard library's <code>html.parser.HTMLParser</code>, so the result is exactly the same every time it runs. Subclass it and override <code>handle_starttag</code>, <code>handle_endtag</code>, and <code>handle_data</code> to react as the parser walks through the markup.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Define a class <code>ListParser(HTMLParser)</code> that collects the text inside every <code>&lt;li&gt;</code> tag into <code>self.items</code>. Feed it <code>html_content</code> and store the result in <code>items</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">"&lt;ul&gt;&lt;li&gt;Apples&lt;/li&gt;&lt;li&gt;Bananas&lt;/li&gt;&lt;/ul&gt;"</code></div>
  <div class="io-row"><span class="io-key">items</span><code class="io-val">["Apples", "Bananas"]</code></div>
</div>`,
    hints: [
      "In handle_starttag, set self.in_li = True when tag == \"li\"",
      "In handle_endtag, set self.in_li = False when tag == \"li\"",
      "In handle_data, if self.in_li: self.items.append(data)"
    ],
    starterCode: 'from html.parser import HTMLParser\n\nhtml_content = "<ul><li>Apples</li><li>Bananas</li><li>Cherries</li></ul>"\n\n# Define ListParser, then parse html_content into items\n',
    solution: 'from html.parser import HTMLParser\n\nhtml_content = "<ul><li>Apples</li><li>Bananas</li><li>Cherries</li></ul>"\n\nclass ListParser(HTMLParser):\n    def __init__(self):\n        super().__init__()\n        self.items = []\n        self.in_li = False\n\n    def handle_starttag(self, tag, attrs):\n        if tag == "li":\n            self.in_li = True\n\n    def handle_endtag(self, tag):\n        if tag == "li":\n            self.in_li = False\n\n    def handle_data(self, data):\n        if self.in_li:\n            self.items.append(data)\n\nparser = ListParser()\nparser.feed(html_content)\nitems = parser.items',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "class\\s+ListParser\\s*\\(\\s*HTMLParser\\s*\\)", message: "Define ListParser as a subclass of HTMLParser." },
        { type: "matchesRegex", pattern: "def\\s+handle_starttag", message: "Override handle_starttag." },
        { type: "matchesRegex", pattern: "def\\s+handle_data", message: "Override handle_data." },
        { type: "matchesRegex", pattern: "\\.feed\\(", message: "Call .feed() to run the parser over html_content." }
      ],
      pyTests: [
        { code: "assert items == ['Apples', 'Bananas', 'Cherries']", message: "'items' should be ['Apples', 'Bananas', 'Cherries']." }
      ]
    },
    explanation: `<p><code>HTMLParser</code> calls your methods as it walks through the markup: <code>handle_starttag</code> on every opening tag, <code>handle_endtag</code> on every closing tag, and <code>handle_data</code> on the text between them. Tracking a simple <code>self.in_li</code> flag is enough to know whether the text you're currently seeing is inside the tag you care about.</p>`
  },
  {
    id: 131,
    title: "Guided Project: Excel Spreadsheets",
    kind: "project",
    source: "Automate the Boring Stuff with Python, ch.12, \"Working with Excel Spreadsheets\"",
    difficulty: "hard",
    topic: "Modules",
    level: 4,
    xp: 30,
    instructions: `<p>The third-party <code>openpyxl</code> library reads and writes real <code>.xlsx</code> files. A <code>Workbook()</code> starts as one blank sheet (<code>wb.active</code>); <code>.append(row)</code> adds a row of values to it, and <code>.save(filename)</code> writes the file. <code>load_workbook(filename)</code> reopens a saved file, and <code>.iter_rows(min_row=2, values_only=True)</code> walks its rows as plain tuples, skipping the header.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Given <code>sales_data</code> (a list of <code>(product, quantity, price)</code> tuples), build a workbook with a header row <code>["Product", "Quantity", "Price"]</code> followed by each row of <code>sales_data</code>, and save it as <code>"sales.xlsx"</code>. Then reopen that file and compute <code>total_revenue</code> (sum of <code>quantity * price</code> across every row) and <code>product_count</code> (how many product rows there are).</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">sales_data = [("Widget", 3, 9.99), ("Gadget", 5, 19.99), ("Gizmo", 2, 49.99)]</code></div>
  <div class="io-row"><span class="io-key">product_count</span><code class="io-val">3</code></div>
  <div class="io-row"><span class="io-key">total_revenue</span><code class="io-val">229.9</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Floating-point math can leave a total like 229.89999999999998 instead of an exact 229.9 -- that's normal, not a bug in your code.</span>
</div>`,
    hints: [
      "ws.append([\"Product\", \"Quantity\", \"Price\"]) for the header, then ws.append(row) for each row in sales_data",
      "wb.save(\"sales.xlsx\")",
      "wb2 = load_workbook(\"sales.xlsx\"); ws2 = wb2.active",
      "for product, quantity, price in ws2.iter_rows(min_row=2, values_only=True): ..."
    ],
    starterCode: 'from openpyxl import Workbook, load_workbook\n\nsales_data = [("Widget", 3, 9.99), ("Gadget", 5, 19.99), ("Gizmo", 2, 49.99)]\n\n# Build a workbook, write the header + sales_data rows, save as "sales.xlsx"\n\n# Reopen "sales.xlsx" and compute total_revenue and product_count\n',
    solution: 'from openpyxl import Workbook, load_workbook\n\nsales_data = [("Widget", 3, 9.99), ("Gadget", 5, 19.99), ("Gizmo", 2, 49.99)]\n\nwb = Workbook()\nws = wb.active\nws.append(["Product", "Quantity", "Price"])\nfor row in sales_data:\n    ws.append(row)\nwb.save("sales.xlsx")\n\nwb2 = load_workbook("sales.xlsx")\nws2 = wb2.active\n\ntotal_revenue = 0\nproduct_count = 0\nfor product, quantity, price in ws2.iter_rows(min_row=2, values_only=True):\n    total_revenue += quantity * price\n    product_count += 1',
    validation: {
      checks: [
        { type: "hasImport", module: "openpyxl", message: "Import Workbook and load_workbook from openpyxl." },
        { type: "matchesRegex", pattern: "\\.save\\(\\s*['\"]sales\\.xlsx['\"]\\s*\\)", message: "Save the workbook as 'sales.xlsx'." },
        { type: "matchesRegex", pattern: "load_workbook\\(\\s*['\"]sales\\.xlsx['\"]\\s*\\)", message: "Reopen the file with load_workbook('sales.xlsx')." }
      ],
      packages: ["openpyxl"],
      pyTests: [
        { code: "assert product_count == 3", message: "'product_count' should be 3." },
        { code: "assert round(total_revenue, 2) == 229.9", message: "'total_revenue' should round to 229.9." },
        { code: "from openpyxl import load_workbook\nwb3 = load_workbook('sales.xlsx')\nws3 = wb3.active\nassert ws3['A1'].value == 'Product'\nassert ws3['A2'].value == 'Widget'", message: "sales.xlsx should have a 'Product' header and 'Widget' as the first product." }
      ]
    },
    explanation: `<p>This is the same read-then-compute shape as parsing a CSV, just against a real binary spreadsheet format instead of plain text. Businesses hand off data as <code>.xlsx</code> constantly, and <code>openpyxl</code> means a script can read it, transform it, and write a new one without a human ever opening Excel.</p>`
  },
  {
    id: 79,
    title: "f-String Format Spec",
    difficulty: "medium",
    topic: "Strings",
    level: 4,
    xp: 20,
    instructions: `<p>f-strings support format specifiers after a colon inside the braces, written as <code>{value:spec}</code>. <code>.2f</code> rounds to 2 decimal places, <code>,</code> adds thousands separators, and <code>>N</code> right-aligns the result inside a field of width <code>N</code>, and you can combine several of these in one spec.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Given <code>amount</code>, create <code>money</code> formatted with 2 decimal places and a comma thousands separator, and <code>padded</code> right-aligned in a 20-character field.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">amount = 1234567.891</code></div>
  <div class="io-row"><span class="io-key">money</span><code class="io-val">"1,234,567.89"</code></div>
</div>`,
    hints: [
      "money = f\"{amount:,.2f}\"",
      "padded = f\"{amount:>20}\""
    ],
    starterCode: "amount = 1234567.891\n# Create money and padded formatted strings\n",
    solution: 'amount = 1234567.891\nmoney = f"{amount:,.2f}"\npadded = f"{amount:>20}"',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "money\\s*=.*f.*amount|money\\s*=.*f['\"].*\\{.*amount", message: "Assign 'money' using an f-string with 'amount'." },
        { type: "matchesRegex", pattern: "f['\"].*:,.2f|\\{.*:,.2f\\}", message: "Use ,.2f format spec for money formatting." },
        { type: "matchesRegex", pattern: "padded\\s*=.*f.*amount|padded\\s*=.*f['\"].*\\{.*amount", message: "Assign 'padded' using an f-string with 'amount'." },
        { type: "matchesRegex", pattern: "f['\"].*:>\\d+|\\{.*:>\\d+\\}", message: "Use >N format spec for right-alignment." }
      ],
      pyTests: [
        { code: "assert money == '1,234,567.89'", message: "'money' should be \"1,234,567.89\"." },
        { code: "assert len(padded) == 20 and padded.strip() == '1234567.891'", message: "'padded' should be amount right-aligned in a 20-character field." }
      ]
    },
    explanation: `<p>Format specs follow the mini language: <code>[fill][align][sign][#][0][width][grouping][.precision][type]</code>. You will use <code>:.2f</code> for currency and <code>:>N</code> for column alignment constantly in web applications that format data for display.</p>`
  },
  {
    id: 80,
    title: "Typed Dataclass with field()",
    difficulty: "hard",
    topic: "Dataclasses",
    level: 4,
    xp: 30,
    instructions: `<p>A mutable object like a list can't be used directly as a dataclass default; Python would create it once and share that exact same list across every instance. <code>field(default_factory=list)</code> solves this by calling <code>list()</code> fresh for each new instance instead.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Import <code>dataclass</code> and <code>field</code> from <code>dataclasses</code>. Define a <code>@dataclass</code> class <code>Team</code> with a <code>name: str</code> field and a <code>members: list</code> field that defaults to an empty list using <code>field(default_factory=list)</code>.</p>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Two separate Team instances should never share the same members list. Appending to one team's members shouldn't affect another team created afterward.</span>
</div>`,
    hints: [
      "from dataclasses import dataclass, field",
      "@dataclass",
      "class Team:",
      "    name: str",
      "    members: list = field(default_factory=list)"
    ],
    starterCode: "# Define Team dataclass with a mutable default field\n",
    solution: "from dataclasses import dataclass, field\n\n@dataclass\nclass Team:\n    name: str\n    members: list = field(default_factory=list)",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "from\\s+dataclasses\\s+import.*field", message: "Import field from dataclasses." },
        { type: "hasDataclass", message: "Apply the @dataclass decorator." },
        { type: "matchesRegex", pattern: "members\\s*:\\s*list\\s*=\\s*field\\s*\\(\\s*default_factory\\s*=\\s*list\\s*\\)", message: "Declare 'members: list = field(default_factory=list)' specifically." }
      ],
      pyTests: [
        { code: "t1 = Team('Red')\nt2 = Team('Blue')\nt1.members.append('Alice')\nassert t2.members == []", message: "Each Team's 'members' list should be independent, not shared between instances." }
      ]
    },
    explanation: `<p>Never use a mutable object (list, dict, set) as a direct default in a dataclass or function -- it would be shared across all instances. <code>field(default_factory=list)</code> creates a fresh empty list for each new instance.</p>`
  },
  {
    id: 127,
    title: "Time and Dates",
    difficulty: "medium",
    topic: "Modules",
    level: 4,
    xp: 20,
    instructions: `<p>The <code>datetime</code> module's <code>date</code> objects represent a calendar day, and subtracting one from another gives you a <code>timedelta</code> whose <code>.days</code> attribute is the number of days between them, handling month lengths and leap years correctly without you ever counting by hand. <code>.strftime()</code> turns a date into a formatted string using the same directive codes (<code>%Y</code>, <code>%B</code>, <code>%d</code>, and so on) as most other languages.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Given <code>start</code> and <code>end</code>, create <code>days_between</code> as the number of days between them, and <code>formatted</code> as <code>start</code> written out as <code>"Month DD, YYYY"</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">start = date(2024, 1, 1)<br>end = date(2024, 3, 15)</code></div>
  <div class="io-row"><span class="io-key">days_between</span><code class="io-val">74</code></div>
  <div class="io-row"><span class="io-key">formatted</span><code class="io-val">"January 01, 2024"</code></div>
</div>`,
    hints: [
      "days_between = (end - start).days",
      "formatted = start.strftime(\"%B %d, %Y\")"
    ],
    starterCode: "from datetime import date\n\nstart = date(2024, 1, 1)\nend = date(2024, 3, 15)\n# Create days_between and formatted\n",
    solution: 'from datetime import date\n\nstart = date(2024, 1, 1)\nend = date(2024, 3, 15)\ndays_between = (end - start).days\nformatted = start.strftime("%B %d, %Y")',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\(\\s*end\\s*-\\s*start\\s*\\)\\.days", message: "Compute the difference with (end - start).days." },
        { type: "matchesRegex", pattern: "\\.strftime\\(", message: "Format the date with .strftime()." }
      ],
      pyTests: [
        { code: "assert days_between == 74", message: "'days_between' should be 74." },
        { code: "assert formatted == 'January 01, 2024'", message: "'formatted' should be \"January 01, 2024\"." }
      ]
    },
    explanation: `<p>Subtracting two <code>date</code> objects gives a <code>timedelta</code>, not a plain number, since a duration is its own kind of thing (it also has <code>.seconds</code> for time-of-day differences on <code>datetime</code> objects). <code>.days</code> pulls out the whole-day count you usually want.</p>`
  }
];
