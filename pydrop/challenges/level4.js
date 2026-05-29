window.LEVEL4 = [
  {
    id: 61,
    title: "Type Hints: Function Parameters",
    difficulty: "easy",
    topic: "Type Hints",
    level: 4,
    xp: 10,
    instructions: `<p>Type hints annotate what types a function expects. They are optional and do not enforce types at runtime, but they improve readability and enable static analysis tools.</p>
<p>Define a function <code>repeat</code> that takes a string <code>text</code> and an integer <code>times</code> with proper type hints, and returns the string repeated that many times.</p>`,
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
    instructions: `<p>Use the <code>-></code> arrow to annotate the return type of a function.</p>
<p>Define a function <code>is_even</code> that takes an integer <code>n</code> with a type hint and returns a <code>bool</code>. Annotate the return type with <code>-> bool</code>.</p>`,
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
    instructions: `<p><code>Optional[X]</code> means the value is either <code>X</code> or <code>None</code>. In Python 3.10+, you can write <code>X | None</code> instead.</p>
<p>Import <code>Optional</code> from the <code>typing</code> module. Define a function <code>find_first</code> that takes a list <code>items</code> (type <code>list</code>) and a value <code>target</code> (type <code>int</code>), and returns <code>Optional[int]</code> -- the index of the first occurrence, or <code>None</code> if not found.</p>`,
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
    instructions: `<p>Type hints can describe the contents of lists and dictionaries. Use <code>List[type]</code> and <code>Dict[key_type, value_type]</code> from <code>typing</code>, or in Python 3.9+ use built-in <code>list[type]</code> and <code>dict[key, value]</code>.</p>
<p>Import <code>List</code> and <code>Dict</code> from <code>typing</code>. Define a function <code>count_words</code> that takes a <code>List[str]</code> named <code>words</code> and returns a <code>Dict[str, int]</code> with each word as a key and its count as the value.</p>`,
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
    instructions: `<p>The <code>@dataclass</code> decorator automatically generates <code>__init__</code>, <code>__repr__</code>, and <code>__eq__</code> from annotated class attributes.</p>
<p>Import <code>dataclass</code> from <code>dataclasses</code>. Define a <code>@dataclass</code> class <code>Product</code> with fields: <code>name: str</code>, <code>price: float</code>, and <code>in_stock: bool</code>.</p>`,
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
    instructions: `<p>Dataclass fields can have default values, making them optional when creating instances.</p>
<p>Define a <code>@dataclass</code> class <code>Config</code> with: <code>host: str = "localhost"</code>, <code>port: int = 8000</code>, and <code>debug: bool = False</code>.</p>`,
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
    instructions: `<p>The <code>__post_init__</code> method on a dataclass is called automatically after the generated <code>__init__</code>. Use it for validation or computed fields.</p>
<p>Define a <code>@dataclass</code> class <code>Rectangle</code> with fields <code>width: float</code> and <code>height: float</code>. Add a <code>__post_init__</code> that raises a <code>ValueError</code> if either dimension is not positive.</p>`,
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
      ]
    },
    explanation: `<p><code>__post_init__</code> is the right place for validation because it runs after all fields are set. If the validation fails, the object is never fully constructed -- the ValueError propagates to the caller.</p>`
  },
  {
    id: 68,
    title: "async def and await",
    difficulty: "medium",
    topic: "Async",
    level: 4,
    xp: 20,
    instructions: `<p>An <code>async</code> function returns a coroutine. Inside it, you can <code>await</code> other coroutines or awaitables. This is the foundation of Python's non-blocking I/O.</p>
<p>Define an <code>async</code> function <code>fetch_data</code> that takes a <code>url: str</code> parameter. Inside, simulate an async operation by doing <code>await asyncio.sleep(0)</code> (import asyncio), then return the string <code>f"Data from {url}"</code>.</p>`,
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
    instructions: `<p><code>asyncio.gather()</code> runs multiple coroutines concurrently and returns all their results.</p>
<p>Define an async function <code>fetch_all</code> that takes a list of URLs <code>urls: list</code>. Use <code>asyncio.gather()</code> to concurrently call a pre-existing <code>fetch_data(url)</code> for each URL, and return the results as a list.</p>`,
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
    instructions: `<p>Environment variables store configuration outside your code. Read them with <code>os.environ.get()</code> to avoid hardcoding sensitive values.</p>
<p>Import <code>os</code>. Create a variable <code>db_url</code> that reads the environment variable <code>"DATABASE_URL"</code>, with a fallback default of <code>"sqlite:///app.db"</code>.</p>`,
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
    instructions: `<p>A <code>.env</code> file stores environment variables in a simple <code>KEY=value</code> format. Libraries like <code>python-dotenv</code> load them into the process environment.</p>
<p>Write the code that would load a <code>.env</code> file using <code>python-dotenv</code>. Import <code>load_dotenv</code> from <code>dotenv</code> and call it. Then read <code>SECRET_KEY</code> from environment variables into a variable named <code>secret</code>, with default <code>"dev-secret"</code>.</p>`,
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
    instructions: `<p>A folder becomes a Python package when it contains an <code>__init__.py</code> file. Other files in the package are modules.</p>
<p>Write a minimal <code>__init__.py</code> for a package named <code>myapp</code>. It should define a variable <code>VERSION = "1.0.0"</code> and import the <code>create_app</code> function from a sibling module <code>.core</code> (relative import).</p>`,
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
    instructions: `<p>In a package, use relative imports to import from sibling modules. A single dot <code>.</code> means the current package; two dots <code>..</code> means the parent package.</p>
<p>Write an import statement that imports <code>User</code> from the <code>models</code> module in the same package (single dot relative import), and also imports <code>get_db</code> from a <code>database</code> module in the same package.</p>`,
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
    instructions: `<p>A <code>requirements.txt</code> file lists the Python packages your project depends on. Each line is a package name, optionally with a version constraint.</p>
<p>Write a valid <code>requirements.txt</code> that includes: <code>fastapi</code> version <code>0.104.1</code> (exact), <code>uvicorn</code> version at least <code>0.24.0</code> (use <code>>=</code>), and <code>pydantic</code> with no version constraint.</p>`,
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
      ]
    },
    explanation: `<p>Version specifiers: <code>==</code> pins to an exact version, <code>>=</code> requires at least that version, <code>~=</code> allows patch updates. Pinning all versions in production ensures reproducible deployments.</p>`
  },
  {
    id: 75,
    title: "Exception Hierarchies",
    difficulty: "medium",
    topic: "Exceptions",
    level: 4,
    xp: 20,
    instructions: `<p>Python exceptions form a hierarchy. You can catch a parent class to handle all its subclasses.</p>
<p>Define a base exception <code>AppError</code> inheriting from <code>Exception</code>. Define two subclasses: <code>NotFoundError</code> and <code>AuthError</code>, both inheriting from <code>AppError</code>. Each should store a <code>message</code> attribute set in <code>__init__</code> (call super().__init__(message)).</p>`,
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
    instructions: `<p>The <code>logging</code> module is the standard way to log messages in Python. It is far better than <code>print()</code> for production code.</p>
<p>Import the <code>logging</code> module. Configure basic logging with level <code>logging.INFO</code> using <code>basicConfig</code>. Create a logger named <code>"myapp"</code> using <code>logging.getLogger()</code>. Log the message <code>"App started"</code> at INFO level.</p>`,
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
      ]
    },
    explanation: `<p>Loggers can be configured with different handlers (file, console, remote) and levels (DEBUG, INFO, WARNING, ERROR, CRITICAL). In production, you would configure JSON logging and ship logs to a service like Datadog or CloudWatch.</p>`
  },
  {
    id: 77,
    title: "json.loads and json.dumps",
    difficulty: "easy",
    topic: "Modules",
    level: 4,
    xp: 10,
    instructions: `<p>The <code>json</code> module converts between Python objects and JSON strings.</p>
<ul>
  <li><code>json.dumps(obj)</code> -- Python object to JSON string</li>
  <li><code>json.loads(str)</code> -- JSON string to Python object</li>
</ul>
<p>Given a Python dictionary <code>data = {"name": "Alice", "age": 30}</code>, create <code>json_str</code> by serialising it. Then create <code>parsed</code> by deserialising <code>json_str</code> back to a Python object.</p>`,
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
      ]
    },
    explanation: `<p><code>json.dumps()</code> accepts optional arguments: <code>indent=2</code> for pretty-printing, <code>sort_keys=True</code> for sorted output. All web APIs communicate via JSON, so these two functions are used constantly.</p>`
  },
  {
    id: 78,
    title: "pathlib.Path Usage",
    difficulty: "medium",
    topic: "Modules",
    level: 4,
    xp: 20,
    instructions: `<p><code>pathlib.Path</code> is the modern, object-oriented way to work with filesystem paths. It is better than string manipulation with <code>os.path</code>.</p>
<p>Import <code>Path</code> from <code>pathlib</code>. Create a <code>Path</code> object <code>base</code> pointing to <code>"/home/user/projects"</code>. Create a sub-path <code>config_file</code> pointing to <code>"/home/user/projects/myapp/config.json"</code> by using the <code>/</code> operator.</p>`,
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
      ]
    },
    explanation: `<p><code>pathlib</code>'s <code>/</code> operator joins path segments safely across operating systems. It also provides useful methods: <code>.exists()</code>, <code>.read_text()</code>, <code>.write_text()</code>, <code>.parent</code>, <code>.stem</code>, <code>.suffix</code>.</p>`
  },
  {
    id: 79,
    title: "f-String Format Spec",
    difficulty: "medium",
    topic: "Strings",
    level: 4,
    xp: 20,
    instructions: `<p>f-strings support format specifiers after a colon inside the braces: <code>{value:spec}</code>. Common specs: <code>.2f</code> for 2 decimal places, <code>>10</code> for right-align in 10 chars, <code>,</code> for thousands separator.</p>
<p>Given <code>amount = 1234567.891</code>, create three formatted strings:</p>
<ul>
  <li><code>money</code> formatted with 2 decimal places and comma thousands separator: e.g. <code>"1,234,567.89"</code></li>
  <li><code>padded</code> right-aligned in a 20-character field</li>
</ul>`,
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
    instructions: `<p>Use <code>field(default_factory=...)</code> for mutable defaults in dataclasses. You cannot use a list literal as a default -- it would be shared across all instances.</p>
<p>Import <code>dataclass</code> and <code>field</code> from <code>dataclasses</code>. Define a <code>@dataclass</code> class <code>Team</code> with a <code>name: str</code> field and a <code>members: list</code> field that defaults to an empty list using <code>field(default_factory=list)</code>.</p>`,
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
      ]
    },
    explanation: `<p>Never use a mutable object (list, dict, set) as a direct default in a dataclass or function -- it would be shared across all instances. <code>field(default_factory=list)</code> creates a fresh empty list for each new instance.</p>`
  }
];
