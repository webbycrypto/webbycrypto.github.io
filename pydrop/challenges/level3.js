window.LEVEL3 = [
  {
    id: 41,
    title: "Define a Class",
    difficulty: "easy",
    topic: "Classes",
    level: 3,
    xp: 10,
    instructions: `<p>A class is a blueprint for creating objects. Define one with the <code>class</code> keyword.</p>
<p>Define a class <code>Dog</code> with a single method <code>speak</code> that returns the string <code>"Woof!"</code>.</p>`,
    hints: [
      "class Dog:",
      "    def speak(self):",
      "        return \"Woof!\""
    ],
    starterCode: "# Define a Dog class with a speak method\n",
    solution: 'class Dog:\n    def speak(self):\n        return "Woof!"',
    validation: {
      checks: [
        { type: "hasClass", name: "Dog", message: "Define a class named 'Dog'." },
        { type: "matchesRegex", pattern: "def\\s+speak\\s*\\(\\s*self\\s*\\)", message: "Define a speak method that accepts self." },
        { type: "matchesRegex", pattern: "def\\s+speak[\\s\\S]*?return", message: "The speak method should return a value." }
      ]
    },
    explanation: `<p>Instance methods always receive <code>self</code> as their first parameter -- it is a reference to the object the method is called on. You never pass <code>self</code> explicitly when calling a method.</p>`
  },
  {
    id: 42,
    title: "Instance Attributes and __init__",
    difficulty: "easy",
    topic: "Classes",
    level: 3,
    xp: 10,
    instructions: `<p>The <code>__init__</code> method is called when an object is created. Use it to set up instance attributes (data attached to each object).</p>
<p>Define a class <code>Person</code> with an <code>__init__</code> method that takes <code>name</code> and <code>age</code> and stores them as instance attributes <code>self.name</code> and <code>self.age</code>.</p>`,
    hints: [
      "def __init__(self, name, age):",
      "    self.name = name",
      "    self.age = age"
    ],
    starterCode: "# Define a Person class with name and age attributes\n",
    solution: "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age",
    validation: {
      checks: [
        { type: "hasClass", name: "Person", message: "Define a class named 'Person'." },
        { type: "matchesRegex", pattern: "def\\s+__init__", message: "Define an __init__ method." },
        { type: "matchesRegex", pattern: "self\\.name\\s*=", message: "Set self.name inside __init__." },
        { type: "matchesRegex", pattern: "self\\.age\\s*=", message: "Set self.age inside __init__." }
      ]
    },
    explanation: `<p><code>__init__</code> is Python's constructor. It is called automatically when you create an object: <code>p = Person("Alice", 30)</code>. The attributes you set on <code>self</code> belong to that specific instance.</p>`
  },
  {
    id: 43,
    title: "Instance Methods",
    difficulty: "easy",
    topic: "Classes",
    level: 3,
    xp: 10,
    instructions: `<p>Instance methods operate on an object's data. They always receive <code>self</code> as the first parameter.</p>
<p>Extend the <code>Person</code> class to include a method <code>introduce</code> that returns an f-string like <code>"Hi, I'm Alice and I'm 30 years old."</code> using the instance's <code>name</code> and <code>age</code>.</p>`,
    hints: [
      "def introduce(self):",
      "    return f\"Hi, I'm {self.name} and I'm {self.age} years old.\""
    ],
    starterCode: "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    # Add an introduce method\n",
    solution: "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def introduce(self):\n        return f\"Hi, I'm {self.name} and I'm {self.age} years old.\"",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "def\\s+introduce\\s*\\(\\s*self\\s*\\)", message: "Define an introduce method with self." },
        { type: "matchesRegex", pattern: "self\\.name", message: "Reference self.name in the method." },
        { type: "matchesRegex", pattern: "f['\"]", message: "Use an f-string to build the return value." }
      ]
    },
    explanation: `<p>Inside an instance method, access the object's attributes via <code>self.attribute_name</code>. The method can read, modify, or compute based on those attributes.</p>`
  },
  {
    id: 44,
    title: "Class Methods and Static Methods",
    difficulty: "medium",
    topic: "Classes",
    level: 3,
    xp: 20,
    instructions: `<p>A <code>@classmethod</code> receives the class itself (<code>cls</code>) as the first argument. A <code>@staticmethod</code> receives nothing special -- it is just a regular function namespaced in a class.</p>
<p>Add to the <code>Circle</code> class:</p>
<ul>
  <li>A <code>@classmethod</code> named <code>unit</code> that returns <code>cls(1)</code> (a circle with radius 1)</li>
  <li>A <code>@staticmethod</code> named <code>description</code> that returns <code>"A round shape"</code></li>
</ul>`,
    hints: [
      "@classmethod",
      "def unit(cls): return cls(1)",
      "@staticmethod",
      "def description(): return \"A round shape\""
    ],
    starterCode: "class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n\n    # Add @classmethod unit and @staticmethod description\n",
    solution: 'class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n\n    @classmethod\n    def unit(cls):\n        return cls(1)\n\n    @staticmethod\n    def description():\n        return "A round shape"',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "@classmethod", message: "Add a @classmethod decorator." },
        { type: "matchesRegex", pattern: "def\\s+unit\\s*\\(\\s*cls\\s*\\)", message: "Define unit(cls) as the class method." },
        { type: "matchesRegex", pattern: "@staticmethod", message: "Add a @staticmethod decorator." },
        { type: "matchesRegex", pattern: "def\\s+description\\s*\\(\\s*\\)", message: "Define description() as the static method." }
      ]
    },
    explanation: `<p>Use <code>@classmethod</code> for alternative constructors or factory methods. Use <code>@staticmethod</code> for utility functions that logically belong to the class but do not need the instance or the class itself.</p>`
  },
  {
    id: 45,
    title: "Inheritance",
    difficulty: "medium",
    topic: "Classes",
    level: 3,
    xp: 20,
    instructions: `<p>Inheritance lets a class (child) inherit attributes and methods from another class (parent). Pass the parent class name in parentheses.</p>
<p>Define a parent class <code>Animal</code> with a method <code>sound</code> returning <code>"..."</code>. Then define a child class <code>Cat</code> that inherits from <code>Animal</code> and overrides <code>sound</code> to return <code>"Meow"</code>.</p>`,
    hints: [
      "class Cat(Animal):  -- inherits from Animal",
      "Override the sound method in Cat."
    ],
    starterCode: "class Animal:\n    def sound(self):\n        return \"...\"\n\n# Define Cat inheriting from Animal\n",
    solution: 'class Animal:\n    def sound(self):\n        return "..."\n\nclass Cat(Animal):\n    def sound(self):\n        return "Meow"',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "class\\s+Cat\\s*\\(\\s*Animal\\s*\\)", message: "Define Cat as a subclass of Animal." },
        { type: "matchesRegex", pattern: "def\\s+sound", message: "Override the sound method in Cat." },
        { type: "matchesRegex", pattern: "['\"]Meow['\"]", message: "Return \"Meow\" from Cat's sound method." }
      ]
    },
    explanation: `<p>The child class inherits all methods from the parent. When you call <code>cat.sound()</code>, Python looks for <code>sound</code> in <code>Cat</code> first. If it is not there, it looks in <code>Animal</code>. Overriding replaces the parent's version.</p>`
  },
  {
    id: 46,
    title: "Calling super()",
    difficulty: "medium",
    topic: "Classes",
    level: 3,
    xp: 20,
    instructions: `<p><code>super()</code> gives you access to the parent class, letting you extend rather than fully replace its behavior.</p>
<p>Define <code>Employee</code> that inherits from <code>Person</code>. Its <code>__init__</code> should call <code>super().__init__(name, age)</code> and also set <code>self.role</code> from a third parameter.</p>`,
    hints: [
      "class Employee(Person):",
      "    def __init__(self, name, age, role):",
      "        super().__init__(name, age)",
      "        self.role = role"
    ],
    starterCode: "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n# Define Employee inheriting from Person\n",
    solution: "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\nclass Employee(Person):\n    def __init__(self, name, age, role):\n        super().__init__(name, age)\n        self.role = role",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "class\\s+Employee\\s*\\(\\s*Person\\s*\\)", message: "Define Employee as a subclass of Person." },
        { type: "matchesRegex", pattern: "super\\(\\).__init__\\(", message: "Call super().__init__() to run the parent constructor." },
        { type: "matchesRegex", pattern: "self\\.role\\s*=", message: "Set self.role as an instance attribute." }
      ]
    },
    explanation: `<p><code>super().__init__(...)</code> delegates to the parent class constructor. This ensures the parent's initialisation runs correctly, so you only add the child-specific logic in the child's <code>__init__</code>.</p>`
  },
  {
    id: 47,
    title: "__str__ and __repr__",
    difficulty: "medium",
    topic: "Classes",
    level: 3,
    xp: 20,
    instructions: `<p><code>__str__</code> defines the human-readable string representation (used by <code>print()</code>). <code>__repr__</code> defines the developer-facing representation (used in the REPL and debugging).</p>
<p>Add both methods to the <code>Point</code> class. <code>__str__</code> should return <code>"(x, y)"</code> and <code>__repr__</code> should return <code>"Point(x, y)"</code>.</p>`,
    hints: [
      "def __str__(self): return f\"({self.x}, {self.y})\"",
      "def __repr__(self): return f\"Point({self.x}, {self.y})\""
    ],
    starterCode: "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    # Add __str__ and __repr__\n",
    solution: "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return f\"({self.x}, {self.y})\"\n\n    def __repr__(self):\n        return f\"Point({self.x}, {self.y})\"",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "def\\s+__str__", message: "Define a __str__ method." },
        { type: "matchesRegex", pattern: "def\\s+__repr__", message: "Define a __repr__ method." },
        { type: "matchesRegex", pattern: "f['\"]", message: "Use f-strings to build the representations." }
      ]
    },
    explanation: `<p>If you only define one, define <code>__repr__</code> -- Python falls back to it for both. The convention: <code>__repr__</code> should ideally produce a string that could recreate the object, while <code>__str__</code> is for display.</p>`
  },
  {
    id: 48,
    title: "__len__ and __eq__ Magic Methods",
    difficulty: "medium",
    topic: "Classes",
    level: 3,
    xp: 20,
    instructions: `<p>Magic methods (dunder methods) make your class work with built-in operators and functions.</p>
<p>Add to the <code>Bag</code> class:</p>
<ul>
  <li><code>__len__</code> that returns the number of items</li>
  <li><code>__eq__</code> that takes <code>other</code> and returns <code>True</code> if both bags have the same items (comparing the sets)</li>
</ul>`,
    hints: [
      "def __len__(self): return len(self.items)",
      "def __eq__(self, other): return set(self.items) == set(other.items)"
    ],
    starterCode: "class Bag:\n    def __init__(self, items):\n        self.items = list(items)\n\n    # Add __len__ and __eq__\n",
    solution: "class Bag:\n    def __init__(self, items):\n        self.items = list(items)\n\n    def __len__(self):\n        return len(self.items)\n\n    def __eq__(self, other):\n        return set(self.items) == set(other.items)",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "def\\s+__len__", message: "Define a __len__ method." },
        { type: "matchesRegex", pattern: "def\\s+__eq__\\s*\\(\\s*self\\s*,\\s*\\w+\\s*\\)", message: "Define a __eq__ method that takes self and other." },
        { type: "matchesRegex", pattern: "return\\s+len\\(self\\.items\\)", message: "__len__ should return len(self.items)." }
      ]
    },
    explanation: `<p>Magic methods let your objects integrate with Python's built-in syntax. With <code>__len__</code>, <code>len(bag)</code> works. With <code>__eq__</code>, <code>bag1 == bag2</code> works. Python calls these automatically.</p>`
  },
  {
    id: 49,
    title: "try / except Exception Handling",
    difficulty: "medium",
    topic: "Exceptions",
    level: 3,
    xp: 20,
    instructions: `<p>Use <code>try</code> / <code>except</code> to catch errors and handle them gracefully instead of crashing.</p>
<p>Define a function <code>safe_divide</code> that takes <code>a</code> and <code>b</code>. If <code>b</code> is zero, catch the <code>ZeroDivisionError</code> and return <code>None</code>. Otherwise return <code>a / b</code>.</p>`,
    hints: [
      "try: return a / b",
      "except ZeroDivisionError: return None"
    ],
    starterCode: "# Define safe_divide\n",
    solution: "def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None",
    validation: {
      checks: [
        { type: "hasValidDef", name: "safe_divide", message: "Define a function named 'safe_divide' with a colon: def safe_divide(a, b):" },
        { type: "hasException", message: "Use try/except to handle the error." },
        { type: "codeContains", value: "ZeroDivisionError", message: "Catch specifically ZeroDivisionError." }
      ]
    },
    explanation: `<p>Catching specific exceptions is better than bare <code>except:</code> which silences all errors including bugs. <code>ZeroDivisionError</code> is only raised when you divide by zero, so this catch is precise.</p>`
  },
  {
    id: 50,
    title: "Raising Custom Exceptions",
    difficulty: "medium",
    topic: "Exceptions",
    level: 3,
    xp: 20,
    instructions: `<p>You can raise exceptions yourself using <code>raise</code>, and create custom exception classes by inheriting from <code>Exception</code>.</p>
<p>Define a custom exception class <code>NegativeError</code> inheriting from <code>ValueError</code>. Then define a function <code>sqrt_safe</code> that takes <code>n</code>: if <code>n</code> is negative, raise <code>NegativeError("Number must not be negative")</code>. Otherwise return <code>n ** 0.5</code>.</p>`,
    hints: [
      "class NegativeError(ValueError): pass",
      "if n < 0: raise NegativeError(\"Number must not be negative\")"
    ],
    starterCode: "# Define NegativeError and sqrt_safe\n",
    solution: 'class NegativeError(ValueError):\n    pass\n\ndef sqrt_safe(n):\n    if n < 0:\n        raise NegativeError("Number must not be negative")\n    return n ** 0.5',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "class\\s+NegativeError\\s*\\(\\s*ValueError\\s*\\)", message: "Define NegativeError inheriting from ValueError." },
        { type: "hasValidDef", name: "sqrt_safe", message: "Define a function named 'sqrt_safe' with a colon: def sqrt_safe(n):" },
        { type: "matchesRegex", pattern: "raise\\s+NegativeError", message: "Raise NegativeError when n is negative." }
      ]
    },
    explanation: `<p>Custom exceptions let callers catch your specific error type. Inheriting from a built-in exception (like <code>ValueError</code>) means your exception fits into the existing exception hierarchy. The <code>pass</code> body is fine when you do not need extra attributes.</p>`
  },
  {
    id: 51,
    title: "Context Manager with 'with'",
    difficulty: "medium",
    topic: "Context Managers",
    level: 3,
    xp: 20,
    instructions: `<p>The <code>with</code> statement manages resources automatically -- it ensures cleanup happens even if an exception occurs.</p>
<p>Write code that opens a file named <code>"data.txt"</code> for writing using a <code>with</code> statement. Inside, write the string <code>"Hello from Python"</code> to it. Assign the file object to <code>f</code>.</p>`,
    hints: [
      "with open(\"data.txt\", \"w\") as f:",
      "    f.write(\"Hello from Python\")"
    ],
    starterCode: "# Open data.txt for writing using a with statement\n",
    solution: 'with open("data.txt", "w") as f:\n    f.write("Hello from Python")',
    validation: {
      checks: [
        { type: "hasContextManager", message: "Use a 'with' statement." },
        { type: "matchesRegex", pattern: "open\\(.*['\"]w['\"]", message: "Open the file in write mode (\"w\")." },
        { type: "matchesRegex", pattern: "f\\.write\\(", message: "Call f.write() inside the with block." }
      ]
    },
    explanation: `<p>The <code>with</code> statement calls <code>__enter__</code> at the start and <code>__exit__</code> at the end (even on exceptions). For files, this means the file is always closed properly -- no manual <code>f.close()</code> needed.</p>`
  },
  {
    id: 52,
    title: "Custom Context Manager",
    difficulty: "hard",
    topic: "Context Managers",
    level: 3,
    xp: 30,
    instructions: `<p>You can create your own context manager by defining <code>__enter__</code> and <code>__exit__</code> on a class.</p>
<p>Define a class <code>Timer</code> that acts as a context manager. <code>__enter__</code> should print <code>"Starting"</code> and return <code>self</code>. <code>__exit__</code> should accept <code>exc_type, exc_val, exc_tb</code> and print <code>"Done"</code>.</p>`,
    hints: [
      "def __enter__(self): print(\"Starting\"); return self",
      "def __exit__(self, exc_type, exc_val, exc_tb): print(\"Done\")"
    ],
    starterCode: "# Define a Timer context manager class\n",
    solution: 'class Timer:\n    def __enter__(self):\n        print("Starting")\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        print("Done")',
    validation: {
      checks: [
        { type: "hasClass", name: "Timer", message: "Define a class named 'Timer'." },
        { type: "matchesRegex", pattern: "def\\s+__enter__", message: "Define __enter__ method." },
        { type: "matchesRegex", pattern: "def\\s+__exit__", message: "Define __exit__ method." },
        { type: "matchesRegex", pattern: "return\\s+self", message: "__enter__ should return self." }
      ]
    },
    explanation: `<p><code>__exit__</code> receives exception info if an error occurred inside the <code>with</code> block. If it returns a truthy value, the exception is suppressed. Return nothing (or <code>None</code>) to let exceptions propagate normally.</p>`
  },
  {
    id: 53,
    title: "Generator Function with yield",
    difficulty: "medium",
    topic: "Generators",
    level: 3,
    xp: 20,
    instructions: `<p>A generator function uses <code>yield</code> instead of <code>return</code>. Each call to <code>next()</code> resumes execution until the next <code>yield</code>. Generators are lazy -- they produce values on demand.</p>
<p>Define a generator function <code>countdown</code> that takes <code>n</code> and yields values from <code>n</code> down to <code>1</code> (inclusive).</p>`,
    hints: [
      "def countdown(n):",
      "    while n > 0:",
      "        yield n",
      "        n -= 1"
    ],
    starterCode: "# Define a countdown generator\n",
    solution: "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1",
    validation: {
      checks: [
        { type: "hasValidDef", name: "countdown", message: "Define a function named 'countdown' with a colon: def countdown(n):" },
        { type: "matchesRegex", pattern: "yield\\s+n", message: "Use yield to produce each value." },
        { type: "matchesRegex", pattern: "while\\s+n|n\\s*-=\\s*1|n\\s*=\\s*n\\s*-\\s*1", message: "Use a loop and decrement n -- a single yield n is not enough." }
      ]
    },
    explanation: `<p>A generator pauses at each <code>yield</code> and resumes where it left off on the next call. This makes generators memory-efficient for large sequences -- they never store the whole sequence at once.</p>`
  },
  {
    id: 54,
    title: "Generator Expression",
    difficulty: "medium",
    topic: "Generators",
    level: 3,
    xp: 20,
    instructions: `<p>A generator expression is like a list comprehension but with round brackets. It produces values lazily.</p>
<p>Given <code>numbers = range(1, 11)</code>, create a generator expression <code>gen</code> that produces the square of each number. Then convert it to a list named <code>squares</code>.</p>`,
    hints: [
      "gen = (n ** 2 for n in numbers)",
      "squares = list(gen)"
    ],
    starterCode: "numbers = range(1, 11)\n# Create a generator expression and convert to list\n",
    solution: "numbers = range(1, 11)\ngen = (n ** 2 for n in numbers)\nsquares = list(gen)",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\(.*for.*in.*\\)", message: "Use a generator expression with round brackets." },
        { type: "codeContains", value: "gen", message: "Assign the generator to 'gen'." },
        { type: "matchesRegex", pattern: "squares\\s*=\\s*list\\(", message: "Convert gen to a list using list()." }
      ]
    },
    explanation: `<p>Generator expressions use round brackets instead of square brackets. They do not compute all values upfront -- they yield them one at a time. Use them when you only need to iterate once or when the sequence is large.</p>`
  },
  {
    id: 55,
    title: "Iterator Protocol",
    difficulty: "hard",
    topic: "Iterators",
    level: 3,
    xp: 30,
    instructions: `<p>An iterator implements two methods: <code>__iter__</code> (returns self) and <code>__next__</code> (returns the next value or raises <code>StopIteration</code>).</p>
<p>Define a class <code>Counter</code> that counts from <code>start</code> to <code>stop</code> (exclusive). Implement <code>__iter__</code> and <code>__next__</code>. Raise <code>StopIteration</code> when the count reaches <code>stop</code>.</p>`,
    hints: [
      "def __iter__(self): return self",
      "def __next__(self):",
      "    if self.current >= self.stop: raise StopIteration",
      "    self.current += 1; return self.current - 1"
    ],
    starterCode: "# Define a Counter iterator class\n",
    solution: "class Counter:\n    def __init__(self, start, stop):\n        self.current = start\n        self.stop = stop\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.current >= self.stop:\n            raise StopIteration\n        value = self.current\n        self.current += 1\n        return value",
    validation: {
      checks: [
        { type: "hasClass", name: "Counter", message: "Define a class named 'Counter'." },
        { type: "matchesRegex", pattern: "def\\s+__iter__", message: "Define __iter__ method." },
        { type: "matchesRegex", pattern: "def\\s+__next__", message: "Define __next__ method." },
        { type: "codeContains", value: "StopIteration", message: "Raise StopIteration when exhausted." }
      ]
    },
    explanation: `<p>Any object with <code>__iter__</code> and <code>__next__</code> can be used in a <code>for</code> loop. Python calls <code>next()</code> repeatedly until <code>StopIteration</code> is raised. Generator functions implement this protocol automatically.</p>`
  },
  {
    id: 56,
    title: "Decorator Definition",
    difficulty: "medium",
    topic: "Decorators",
    level: 3,
    xp: 20,
    instructions: `<p>A decorator is a function that wraps another function, adding behavior before or after it runs.</p>
<p>Define a decorator <code>shout</code> that wraps a function: it calls the original function, takes its string result, and returns it in uppercase.</p>`,
    hints: [
      "def shout(func):",
      "    def wrapper(*args, **kwargs):",
      "        result = func(*args, **kwargs)",
      "        return result.upper()",
      "    return wrapper"
    ],
    starterCode: "# Define a shout decorator\n",
    solution: "def shout(func):\n    def wrapper(*args, **kwargs):\n        result = func(*args, **kwargs)\n        return result.upper()\n    return wrapper",
    validation: {
      checks: [
        { type: "hasValidDef", name: "shout", message: "Define a function named 'shout' with a colon: def shout(func):" },
        { type: "matchesRegex", pattern: "def\\s+wrapper", message: "Define an inner wrapper function." },
        { type: "matchesRegex", pattern: "return\\s+wrapper", message: "Return the wrapper function (not its result)." },
        { type: "matchesRegex", pattern: "\\.upper\\(\\)", message: "Return the result uppercased." }
      ]
    },
    explanation: `<p>The decorator pattern works by replacing the original function with the wrapper. Using <code>*args, **kwargs</code> in the wrapper makes it accept any arguments the original function might take.</p>`
  },
  {
    id: 57,
    title: "Applying a Decorator",
    difficulty: "medium",
    topic: "Decorators",
    level: 3,
    xp: 20,
    instructions: `<p>Apply a decorator by placing <code>@decorator_name</code> directly above the function definition. This is syntactic sugar for <code>func = decorator(func)</code>.</p>
<p>Given the <code>shout</code> decorator (pre-written), define a function <code>greet</code> that returns <code>"hello"</code>, and apply the <code>@shout</code> decorator to it.</p>`,
    hints: [
      "@shout",
      "def greet():",
      "    return \"hello\""
    ],
    starterCode: 'def shout(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper()\n    return wrapper\n\n# Apply @shout to a greet function\n',
    solution: 'def shout(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper()\n    return wrapper\n\n@shout\ndef greet():\n    return "hello"',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "@shout", message: "Apply the @shout decorator." },
        { type: "hasValidDef", name: "greet", message: "Define a function named 'greet' with a colon: def greet():" },
        { type: "matchesRegex", pattern: "return\\s+['\"]hello['\"]", message: "Return the string \"hello\"." }
      ]
    },
    explanation: `<p><code>@shout</code> above <code>greet</code> is exactly equivalent to writing <code>greet = shout(greet)</code> after the definition. The decorator modifies or wraps the function at definition time.</p>`
  },
  {
    id: 58,
    title: "@property and @setter",
    difficulty: "hard",
    topic: "Classes",
    level: 3,
    xp: 30,
    instructions: `<p>The <code>@property</code> decorator lets you define computed attributes that are accessed like regular attributes. The <code>@name.setter</code> decorator defines how to handle assignment.</p>
<p>Define a <code>Temperature</code> class with a private attribute <code>_celsius</code>. Add a <code>@property</code> named <code>fahrenheit</code> that returns the Fahrenheit equivalent (<code>celsius * 9/5 + 32</code>). Add a <code>@fahrenheit.setter</code> that converts Fahrenheit to Celsius and stores it.</p>`,
    hints: [
      "@property",
      "def fahrenheit(self): return self._celsius * 9/5 + 32",
      "@fahrenheit.setter",
      "def fahrenheit(self, value): self._celsius = (value - 32) * 5/9"
    ],
    starterCode: "# Define Temperature with @property fahrenheit\n",
    solution: "class Temperature:\n    def __init__(self, celsius):\n        self._celsius = celsius\n\n    @property\n    def fahrenheit(self):\n        return self._celsius * 9/5 + 32\n\n    @fahrenheit.setter\n    def fahrenheit(self, value):\n        self._celsius = (value - 32) * 5/9",
    validation: {
      checks: [
        { type: "hasClass", name: "Temperature", message: "Define a class named 'Temperature'." },
        { type: "matchesRegex", pattern: "self\\._celsius\\s*=", message: "Store the value in a private attribute self._celsius." },
        { type: "matchesRegex", pattern: "@property", message: "Add the @property decorator." },
        { type: "matchesRegex", pattern: "@fahrenheit\\.setter", message: "Add the @fahrenheit.setter decorator." },
        { type: "matchesRegex", pattern: "9/5|9\\.0/5", message: "Use the Celsius to Fahrenheit formula." }
      ]
    },
    explanation: `<p>Properties look like attributes from the outside: <code>t.fahrenheit</code> not <code>t.fahrenheit()</code>. They let you add validation or computation without changing the external interface of the class.</p>`
  },
  {
    id: 59,
    title: "Nested Comprehension",
    difficulty: "hard",
    topic: "Comprehensions",
    level: 3,
    xp: 30,
    instructions: `<p>You can nest comprehensions to flatten or transform nested structures.</p>
<p>Given <code>matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]</code>, create a list <code>flat</code> that contains all numbers in a single flat list using a nested list comprehension.</p>`,
    hints: [
      "flat = [num for row in matrix for num in row]",
      "The outer loop iterates over rows, the inner loop over each number in the row."
    ],
    starterCode: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n# Flatten matrix using a nested list comprehension\n",
    solution: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nflat = [num for row in matrix for num in row]",
    validation: {
      checks: [
        { type: "hasListComp", message: "Use a list comprehension." },
        { type: "matchesRegex", pattern: "for.*in.*matrix.*for.*in", message: "Use a nested comprehension with two 'for' clauses." },
        { type: "codeContains", value: "flat", message: "Store the result in 'flat'." }
      ]
    },
    explanation: `<p>In a nested comprehension, the leftmost <code>for</code> is the outer loop. Reading left to right matches how you would read the equivalent nested for-loop. The result is a single flat list.</p>`
  },
  {
    id: 60,
    title: "Walrus Operator :=",
    difficulty: "hard",
    topic: "Conditionals",
    level: 3,
    xp: 30,
    instructions: `<p>The walrus operator <code>:=</code> (assignment expression) lets you assign and use a value in the same expression.</p>
<p>Given a list <code>data = [1, 5, 2, 8, 3, 9, 4]</code>, write a list comprehension that filters values greater than 5. Use the walrus operator to assign each item to <code>v</code> inside the comprehension condition and include <code>v</code> in the output. Store the result in <code>big</code>.</p>`,
    hints: [
      "big = [v for item in data if (v := item) > 5]",
      "The walrus operator assigns and returns the value simultaneously."
    ],
    starterCode: "data = [1, 5, 2, 8, 3, 9, 4]\n# Use walrus operator in a comprehension\n",
    solution: "data = [1, 5, 2, 8, 3, 9, 4]\nbig = [v for item in data if (v := item) > 5]",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: ":=", message: "Use the walrus operator :=" },
        { type: "hasListComp", message: "Use a list comprehension." },
        { type: "codeContains", value: "big", message: "Store the result in 'big'." }
      ]
    },
    explanation: `<p>The walrus operator is useful when you need a value both in a condition and in the expression -- avoiding calling the same function twice. It is most commonly seen in while loops and comprehensions.</p>`
  }
];
