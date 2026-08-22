window.LEVEL3 = [
  {
    id: 41,
    title: "Define a Class",
    difficulty: "easy",
    topic: "Classes",
    level: 3,
    xp: 10,
    instructions: `<p>A <strong>class</strong> is a blueprint for creating objects: it groups together the data an object holds and the behavior it can perform. You define a class with the <code>class</code> keyword, and any function defined inside it becomes a <strong>method</strong> that instances of the class can call.</p>
<p>Every method you write inside a class needs <code>self</code> as its first parameter. When you call <code>my_dog.speak()</code>, Python automatically passes <code>my_dog</code> in as <code>self</code> behind the scenes -- that's how the method knows which specific object it's working with. You never type <code>self</code> yourself when calling the method, only when defining it.</p>
<ul>
  <li><strong>Class:</strong> the blueprint, defined once with <code>class</code>. Calling it like a function, e.g. <code>Dog()</code>, builds one actual object from it.</li>
  <li><strong>self:</strong> the first parameter of every method, automatically filled in with whichever object made the call -- you never type it yourself at the call site.</li>
</ul>
<p class="blueprint-line"><code>class Name:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;def method(self):</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>class Cat:
    def speak(self):
        return "Meow!"

print(Cat().speak())  # Output: Meow!</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Forgetting <code>self</code> as a method's first parameter causes a <code>TypeError</code> the moment you call the method -- Python always passes the calling object in as the first argument, whether you left a slot for it or not.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a class <code>Dog</code> with a single method <code>speak</code> that returns the string <code>"Woof!"</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">Dog().speak()</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">"Woof!"</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "assert Dog().speak() == 'Woof!'", message: "Dog().speak() should return \"Woof!\"." }
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
    instructions: `<p>The <code>__init__</code> method runs automatically the moment an object is created, which makes it the natural place to set up an object's starting data, called <strong>instance attributes</strong>. Whatever you attach to <code>self</code> inside <code>__init__</code> stays attached to that specific object for as long as it exists.</p>
<ul>
  <li><strong>Instance attributes:</strong> variables attached directly to a specific object. If you create two different Person objects, each keeps its own distinct copy of these variables (e.g., Alice has her name, Bob has his name) so their data never leaks into each other.</li>
  <li><strong>The self keyword:</strong> a temporary name Python uses to point directly to the specific object currently being built or modified.</li>
</ul>
<p class="blueprint-line"><code>class Person:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;def __init__(self, name, age):</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

alice = Person("Alice", 30)
bob = Person("Bob", 25)
print(alice.name)  # Output: Alice</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>In Python, <code>__init__</code> uses two underscores on both sides of the name. Writing <code>_init_</code> with single underscores will cause a silent failure where your data is never saved.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a class <code>Person</code> with an <code>__init__</code> method that takes <code>name</code> and <code>age</code> and stores them as instance attributes <code>self.name</code> and <code>self.age</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">Person("Alice", 30)</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">.name = "Alice", .age = 30</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "p = Person('Alice', 30)\nassert p.name == 'Alice' and p.age == 30", message: "Person('Alice', 30) should set .name to 'Alice' and .age to 30." }
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
    instructions: `<p>Instance methods operate on an object's own data, always receiving <code>self</code> as the first parameter so they can reach whatever was stored on that instance. Beyond that, they work just like any other function: take arguments, compute something, and return a result.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

print(Rectangle(3, 4).area())  # Output: 12</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Extend the <code>Person</code> class to include a method <code>introduce</code> that returns an f-string using the instance's <code>name</code> and <code>age</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">Person("Alice", 30).introduce()</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">"Hi, I'm Alice and I'm 30 years old."</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "assert Person('Alice', 30).introduce() == \"Hi, I'm Alice and I'm 30 years old.\"", message: "Person('Alice', 30).introduce() should return \"Hi, I'm Alice and I'm 30 years old.\"." }
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
    instructions: `<p>A <code>@classmethod</code> receives the class itself (<code>cls</code>) as its first argument instead of an instance, which makes it useful for building objects in alternative ways. A <code>@staticmethod</code> receives nothing special at all; it's just a regular function that happens to live inside the class's namespace because it's conceptually related.</p>
<p>Below, <code>Pizza.margherita()</code> is a classmethod that builds a pizza pre-configured with toppings, without the caller needing to know the exact list. <code>is_vegetarian</code> is a staticmethod: it doesn't touch <code>self</code> or <code>cls</code> at all, it's just a helper function that logically belongs with the class.</p>
<ul>
  <li><strong>cls:</strong> the class-method equivalent of <code>self</code> -- it refers to the class itself, not to any one instance, so calling <code>cls(...)</code> constructs a new object of that class.</li>
</ul>
<p><strong>Shorthand</strong></p>
<ul>
  <li><code>@classmethod</code> above a method means its first parameter is <code>cls</code> instead of <code>self</code> -- call it as <code>ClassName.method(...)</code>.</li>
  <li><code>@staticmethod</code> above a method means it takes no automatic first parameter -- call it as <code>ClassName.method(...)</code> like a plain function.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>class Pizza:
    def __init__(self, toppings):
        self.toppings = toppings

    @classmethod
    def margherita(cls):
        return cls(["tomato", "mozzarella"])

    @staticmethod
    def is_vegetarian(toppings):
        return "pepperoni" not in toppings

print(Pizza.margherita().toppings)  # Output: ['tomato', 'mozzarella']</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Add to the <code>Circle</code> class:</p>
<ul>
  <li>A <code>@classmethod</code> named <code>unit</code> that returns <code>cls(1)</code> (a circle with radius 1)</li>
  <li>A <code>@staticmethod</code> named <code>description</code> that returns <code>"A round shape"</code></li>
</ul>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Circle.unit().radius</span><code class="io-val">1</code></div>
  <div class="io-row"><span class="io-key">Circle.description()</span><code class="io-val">"A round shape"</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "assert Circle.unit().radius == 1", message: "Circle.unit().radius should be 1." },
        { code: "assert Circle.description() == 'A round shape'", message: "Circle.description() should return \"A round shape\"." }
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
    instructions: `<p><strong>Inheritance</strong> lets one class (the child) automatically pick up the attributes and methods of another (the parent), by naming the parent in parentheses after the child's class name. The child can then <strong>override</strong> any method by defining its own version with the same name.</p>
<p class="blueprint-line"><code>class Child(Parent):</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>class Shape:
    def area(self):
        return 0

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

print(Square(4).area())  # Output: 16</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a parent class <code>Animal</code> with a method <code>sound</code> returning <code>"..."</code>. Then define a child class <code>Cat</code> that inherits from <code>Animal</code> and overrides <code>sound</code> to return <code>"Meow"</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Animal().sound()</span><code class="io-val">"..."</code></div>
  <div class="io-row"><span class="io-key">Cat().sound()</span><code class="io-val">"Meow"</code></div>
</div>`,
    hints: [
      "class Cat(Animal): -- inherits from Animal",
      "Override the sound method in Cat."
    ],
    starterCode: "class Animal:\n    def sound(self):\n        return \"...\"\n\n# Define Cat inheriting from Animal\n",
    solution: 'class Animal:\n    def sound(self):\n        return "..."\n\nclass Cat(Animal):\n    def sound(self):\n        return "Meow"',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "class\\s+Cat\\s*\\(\\s*Animal\\s*\\)", message: "Define Cat as a subclass of Animal." },
        { type: "matchesRegex", pattern: "def\\s+sound", message: "Override the sound method in Cat." },
        { type: "matchesRegex", pattern: "['\"]Meow['\"]", message: "Return \"Meow\" from Cat's sound method." }
      ],
      pyTests: [
        { code: "assert Animal().sound() == '...'", message: "Animal().sound() should still return \"...\"." },
        { code: "assert Cat().sound() == 'Meow'", message: "Cat().sound() should return \"Meow\", overriding the parent." }
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
    instructions: `<p><code>super()</code> gives you a handle on the parent class from inside a child class, letting you call the parent's version of a method and then add to it, rather than rewriting everything from scratch. It's most common inside <code>__init__</code>, where the child wants the parent's setup plus a bit more of its own.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>class Vehicle:
    def __init__(self, wheels):
        self.wheels = wheels

class Car(Vehicle):
    def __init__(self, wheels, brand):
        super().__init__(wheels)
        self.brand = brand

print(Car(4, "Toyota").wheels)  # Output: 4</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>If a child class defines its own <code>__init__</code> and never calls <code>super().__init__(...)</code>, the parent's setup never runs at all, so any attributes the parent would normally set simply won't exist on the child's instances.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define <code>Employee</code> that inherits from <code>Person</code>. Its <code>__init__</code> should call <code>super().__init__(name, age)</code> and also set <code>self.role</code> from a third parameter.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">Employee("Bob", 40, "Manager")</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">.name = "Bob", .age = 40, .role = "Manager"</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "e = Employee('Bob', 40, 'Manager')\nassert e.name == 'Bob' and e.age == 40 and e.role == 'Manager'", message: "Employee('Bob', 40, 'Manager') should set .name, .age, and .role correctly." }
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
    instructions: `<p><code>__str__</code> defines the human-readable string shown by <code>print()</code>, while <code>__repr__</code> defines the more technical, developer-facing version you see in the REPL or when debugging. Defining both lets your objects describe themselves sensibly in every context Python might display them.</p>
<ul>
  <li><strong>__repr__:</strong> a dunder method Python falls back to any time <code>__str__</code> isn't defined, and the one used when you just type an object's name in the REPL.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>class Book:
    def __init__(self, title):
        self.title = title

    def __str__(self):
        return self.title

    def __repr__(self):
        return f"Book({self.title!r})"

print(str(Book("Dune")))   # Output: Dune
print(repr(Book("Dune")))  # Output: Book('Dune')</code></pre>
</div>
<p><strong>Shorthand</strong></p>
<ul>
  <li><code>__str__</code> and <code>__repr__</code> are both dunder methods -- the double underscores on each side are what Python's built-ins (<code>print()</code>, <code>str()</code>, <code>repr()</code>) look for automatically.</li>
</ul>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>If you only define one, define <code>__repr__</code> -- Python falls back to it for <code>str()</code> too when <code>__str__</code> is missing, but not the other way around.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Add both methods to the <code>Point</code> class. <code>__str__</code> should return <code>"(x, y)"</code> and <code>__repr__</code> should return <code>"Point(x, y)"</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">str(Point(3, 4))</span><code class="io-val">"(3, 4)"</code></div>
  <div class="io-row"><span class="io-key">repr(Point(3, 4))</span><code class="io-val">"Point(3, 4)"</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "p = Point(3, 4)\nassert str(p) == '(3, 4)'", message: "str(Point(3, 4)) should be \"(3, 4)\"." },
        { code: "p = Point(3, 4)\nassert repr(p) == 'Point(3, 4)'", message: "repr(Point(3, 4)) should be \"Point(3, 4)\"." }
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
    instructions: `<p><strong>Magic methods</strong> (also called dunder methods, for their double underscores) are how your own classes hook into Python's built-in operators and functions. Define <code>__len__</code> and suddenly <code>len(your_object)</code> works; define <code>__eq__</code> and <code>==</code> starts comparing your objects the way you tell it to.</p>
<p>When you write <code>bag1 == bag2</code>, Python calls <code>bag1.__eq__(bag2)</code> and uses whatever it returns. Same story with <code>len(bag)</code> -- Python calls <code>bag.__len__()</code>. Magic methods are just regular methods with reserved names that Python's built-in syntax already knows to call automatically.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>class Playlist:
    def __init__(self, songs):
        self.songs = songs

    def __len__(self):
        return len(self.songs)

    def __eq__(self, other):
        return self.songs == other.songs

print(len(Playlist(["a", "b"])))  # Output: 2</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Defining <code>__eq__</code> without also defining <code>__hash__</code> makes instances of your class unhashable by default, which means they can no longer be used as dictionary keys or put into a set.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Add to the <code>Bag</code> class:</p>
<ul>
  <li><code>__len__</code> that returns the number of items</li>
  <li><code>__eq__</code> that takes <code>other</code> and returns <code>True</code> if both bags have the same items (comparing the sets)</li>
</ul>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">len(Bag([1, 2, 3]))</span><code class="io-val">3</code></div>
  <div class="io-row"><span class="io-key">Bag([1,2,3]) == Bag([3,2,1])</span><code class="io-val">True</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "assert len(Bag([1, 2, 3])) == 3", message: "len(Bag([1, 2, 3])) should be 3." },
        { code: "assert Bag([1, 2, 3]) == Bag([3, 2, 1])", message: "Two bags with the same items in a different order should be equal." },
        { code: "assert Bag([1, 2]) != Bag([1, 2, 3])", message: "Bags with different items should not be equal." }
      ]
    },
    explanation: `<p>Magic methods let your objects integrate with Python's built-in syntax. With <code>__len__</code>, <code>len(bag)</code> works because Python calls <code>bag.__len__()</code> for you. With <code>__eq__</code>, <code>bag1 == bag2</code> is really <code>bag1.__eq__(bag2)</code> running behind the scenes -- Python just gives you a shorthand syntax for it.</p>`
  },
  {
    id: 49,
    title: "try / except Exception Handling",
    difficulty: "medium",
    topic: "Exceptions",
    level: 3,
    xp: 20,
    instructions: `<p><code>try</code> / <code>except</code> lets your program catch an error as it happens and handle it gracefully, instead of crashing outright. Code that might fail goes in the <code>try</code> block; the <code>except</code> block only runs if that specific error actually occurs.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def get_item(items, index):
    try:
        return items[index]
    except IndexError:
        return None

print(get_item([1, 2, 3], 10))  # Output: None</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>A bare <code>except:</code> with no error type catches everything, including bugs you'd actually want to see. Name the specific exception you expect, like <code>except ZeroDivisionError:</code>, instead.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a function <code>safe_divide</code> that takes <code>a</code> and <code>b</code>. If <code>b</code> is zero, catch the <code>ZeroDivisionError</code> and return <code>None</code>. Otherwise return <code>a / b</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">safe_divide(10, 2)</span><code class="io-val">5.0</code></div>
  <div class="io-row"><span class="io-key">safe_divide(5, 0)</span><code class="io-val">None</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "assert safe_divide(10, 2) == 5.0", message: "safe_divide(10, 2) should return 5.0." },
        { code: "assert safe_divide(5, 0) is None", message: "safe_divide(5, 0) should return None, not raise an error." }
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
    instructions: `<p>You can raise exceptions yourself with <code>raise</code>, and even define your own exception types by inheriting from <code>Exception</code> or one of its built-in subclasses. A custom exception lets callers catch precisely your error and nothing else, instead of catching something broad like every possible <code>ValueError</code>.</p>
<ul>
  <li><strong>raise:</strong> the keyword that triggers an exception immediately, stopping normal execution and handing control to the nearest matching <code>except</code> block, if any.</li>
</ul>
<p class="blueprint-line"><code>class CustomError(Exception):</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>class TooLongError(ValueError):
    pass

def check_length(word):
    if len(word) > 10:
        raise TooLongError("Word is too long")
    return word

print(check_length("hi"))  # Output: hi</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a custom exception class <code>NegativeError</code> inheriting from <code>ValueError</code>. Then define a function <code>sqrt_safe</code> that takes <code>n</code>: if <code>n</code> is negative, raise <code>NegativeError("Number must not be negative")</code>. Otherwise return <code>n ** 0.5</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">sqrt_safe(16)</span><code class="io-val">4.0</code></div>
  <div class="io-row"><span class="io-key">sqrt_safe(-4)</span><code class="io-val">raises NegativeError</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "assert sqrt_safe(16) == 4.0", message: "sqrt_safe(16) should return 4.0." },
        { code: "try:\n    sqrt_safe(-4)\n    assert False, 'should have raised NegativeError'\nexcept NegativeError:\n    pass", message: "sqrt_safe(-4) should raise NegativeError." }
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
    instructions: `<p>The <code>with</code> statement manages a resource automatically: it opens the resource, hands it to you, and guarantees cleanup happens afterward, even if an exception occurs partway through. For files, that means the file is always closed properly, without you ever having to call <code>f.close()</code> yourself.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>with open("notes.txt", "w") as f:
    f.write("first line")

print(f.closed)  # Output: True</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Opening a file without <code>with</code> and forgetting <code>f.close()</code> can leave the file locked or its data unflushed to disk, especially if an error happens before you reach the close call.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Write code that opens a file named <code>"data.txt"</code> for writing using a <code>with</code> statement. Inside, write the string <code>"Hello from Python"</code> to it. Assign the file object to <code>f</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">data.txt afterward</span><code class="io-val">"Hello from Python"</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "with open('data.txt') as check_f:\n    assert check_f.read() == 'Hello from Python'", message: "Reading data.txt back should give \"Hello from Python\"." }
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
    instructions: `<p>You're not limited to the <code>with</code> statement's built-in tools; you can create your own context manager by defining <code>__enter__</code> and <code>__exit__</code> on a class. <code>__enter__</code> runs when the <code>with</code> block starts, and its return value becomes whatever comes after <code>as</code>. <code>__exit__</code> runs when the block ends, no matter how it ends.</p>
<p>Real-world context managers usually guard something that needs cleanup no matter what happens, like a database connection or a file lock. That's why <code>__exit__</code> always runs, even if the code inside the <code>with</code> block crashes: if <code>exc_type</code> is <code>None</code>, the block finished normally; otherwise <code>exc_type</code>/<code>exc_val</code>/<code>exc_tb</code> tell you what went wrong and where.</p>
<p class="blueprint-line"><code>def __enter__(self):</code><br><code>def __exit__(self, exc_type, exc_val, exc_tb):</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>class Resource:
    def __enter__(self):
        print("open")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("closed")

with Resource() as r:
    pass
# Output: open
# Output: closed</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a class <code>Timer</code> that acts as a context manager. <code>__enter__</code> should print <code>"Starting"</code> and return <code>self</code>. <code>__exit__</code> should accept <code>exc_type, exc_val, exc_tb</code> and print <code>"Done"</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Timer().__enter__()</span><code class="io-val">returns the Timer instance itself</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "t = Timer()\nassert t.__enter__() is t", message: "Timer().__enter__() should return the same instance (self)." },
        { code: "with Timer() as t2:\n    assert t2 is not None", message: "Using Timer() in a with statement should work without raising an error." }
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
    instructions: `<p>A generator function uses <code>yield</code> instead of <code>return</code>, pausing at each one rather than ending the function. Calling the function doesn't run any of its code yet; it hands back a generator object, and each call to <code>next()</code> (or each step of a <code>for</code> loop) resumes execution up to the next <code>yield</code>.</p>
<ul>
  <li><strong>yield:</strong> pauses the function and hands back a value, but keeps all of its local state so it can pick up right where it left off on the next call.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def count_up(n):
    i = 1
    while i <= n:
        yield i
        i += 1

print(list(count_up(3)))  # Output: [1, 2, 3]</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Calling a generator function, like <code>count_up(3)</code>, does not run any of its code right away -- it only creates the generator object. The body only starts executing once you call <code>next()</code> on it or iterate over it.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a generator function <code>countdown</code> that takes <code>n</code> and yields values from <code>n</code> down to <code>1</code> (inclusive).</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">list(countdown(3))</span><code class="io-val">[3, 2, 1]</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "assert list(countdown(3)) == [3, 2, 1]", message: "list(countdown(3)) should be [3, 2, 1]." },
        { code: "assert list(countdown(1)) == [1]", message: "list(countdown(1)) should be [1]." }
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
    instructions: `<p>A generator expression looks like a list comprehension but with round brackets instead of square ones, and it produces values lazily, one at a time, rather than building the whole sequence in memory up front. Wrap it in <code>list()</code> whenever you actually need every value at once.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>words = ["hi", "hey", "hello"]
gen = (w.upper() for w in words)
print(list(gen))  # Output: ['HI', 'HEY', 'HELLO']</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>A generator expression can only be looped through once. Once you've exhausted it, whether by converting it to a list or finishing a <code>for</code> loop over it, it's empty for good and needs to be recreated to use again.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Given <code>numbers = range(1, 11)</code>, create a generator expression <code>gen</code> that produces the square of each number. Then convert it to a list named <code>squares</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">numbers = range(1, 11)</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">squares = [1, 4, 9, ..., 100]</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "assert squares == [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]", message: "'squares' should be [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]." }
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
    instructions: `<p>An <strong>iterator</strong> implements two methods: <code>__iter__</code> (which just returns itself) and <code>__next__</code> (which returns the next value, or raises <code>StopIteration</code> once there's nothing left). Any object with both methods can be used directly in a <code>for</code> loop, the same as a list or a range.</p>
<p class="blueprint-line"><code>def __iter__(self):</code><br><code>def __next__(self):</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>class Evens:
    def __init__(self, limit):
        self.n = 0
        self.limit = limit

    def __iter__(self):
        return self

    def __next__(self):
        if self.n >= self.limit:
            raise StopIteration
        value = self.n
        self.n += 2
        return value

print(list(Evens(6)))  # Output: [0, 2, 4]</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Forgetting to raise <code>StopIteration</code> when the sequence is exhausted leaves <code>__next__</code> with nothing to signal the end, so a <code>for</code> loop or <code>list()</code> call over it will run forever.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a class <code>Counter</code> that counts from <code>start</code> to <code>stop</code> (exclusive). Implement <code>__iter__</code> and <code>__next__</code>. Raise <code>StopIteration</code> when the count reaches <code>stop</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">list(Counter(2, 5))</span><code class="io-val">[2, 3, 4]</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "assert list(Counter(2, 5)) == [2, 3, 4]", message: "list(Counter(2, 5)) should be [2, 3, 4]." },
        { code: "assert list(Counter(0, 0)) == []", message: "list(Counter(0, 0)) should be an empty list." }
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
    instructions: `<p>A <strong>decorator</strong> is a function that takes another function and returns a modified version of it, typically by wrapping it in a new function that adds behavior before or after the original runs. This is how you add reusable behavior, like logging or timing, to many different functions without repeating the same code in each one.</p>
<ul>
  <li><strong>wrapper:</strong> the inner function a decorator defines and returns -- it's what actually runs in place of the original function, calling the original somewhere inside itself.</li>
  <li><strong>*args, **kwargs:</strong> used in the wrapper so it can accept whatever arguments the original function takes, no matter how many or what kind, and pass them straight through.</li>
</ul>
<p class="blueprint-line"><code>def decorator(func):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;def wrapper(*args, **kwargs):</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def logged(func):
    def wrapper(*args, **kwargs):
        print("calling", func.__name__)
        return func(*args, **kwargs)
    return wrapper

@logged
def add(a, b):
    return a + b

print(add(2, 3))  # Output: calling add
                   # Output: 5</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>A decorator must <code>return wrapper</code> (the function itself), not <code>return wrapper()</code> (a call to it). Returning the call runs it immediately and hands back its result instead of the reusable wrapped function.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a decorator <code>shout</code> that wraps a function: it calls the original function, takes its string result, and returns it in uppercase.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">shout(lambda: "hi")()</span><code class="io-val">"HI"</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "wrapped = shout(lambda: 'hi')\nassert wrapped() == 'HI'", message: "shout(lambda: 'hi')() should return 'HI'." },
        { code: "wrapped = shout(lambda name: 'hello ' + name)\nassert wrapped('sam') == 'HELLO SAM'", message: "shout should still pass arguments through to the wrapped function." }
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
    instructions: `<p>Apply a decorator by placing <code>@decorator_name</code> directly above a function definition. It's shorthand for calling the decorator on the function afterward and reassigning the name, <code>greet = shout(greet)</code>, just written in a way that reads clearly right next to the function it modifies.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>def loud(func):
    def wrapper():
        return func().upper()
    return wrapper

@loud
def name():
    return "sam"

print(name())  # Output: SAM</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Given the <code>shout</code> decorator (pre-written), define a function <code>greet</code> that returns <code>"hello"</code>, and apply the <code>@shout</code> decorator to it.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">greet()</span><code class="io-val">"HELLO"</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "assert greet() == 'HELLO'", message: "greet() should return 'HELLO', uppercased by @shout." }
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
    instructions: `<p>The <code>@property</code> decorator lets a method be accessed like a plain attribute, no parentheses needed, which is handy for values that are computed from other data rather than stored directly. Pairing it with <code>@name.setter</code> lets assignment (<code>obj.name = value</code>) run your own logic too, instead of just overwriting a variable.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def diameter(self):
        return self._radius * 2

    @diameter.setter
    def diameter(self, value):
        self._radius = value / 2

c = Circle(5)
print(c.diameter)  # Output: 10</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Define a <code>Temperature</code> class with a private attribute <code>_celsius</code>. Add a <code>@property</code> named <code>fahrenheit</code> that returns the Fahrenheit equivalent (<code>celsius * 9/5 + 32</code>). Add a <code>@fahrenheit.setter</code> that converts Fahrenheit to Celsius and stores it.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Temperature(0).fahrenheit</span><code class="io-val">32.0</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>The leading underscore in <code>_celsius</code> is just a convention -- Python doesn't actually stop anyone from accessing <code>t._celsius</code> directly. It's a signal to other developers that "this is internal, use the property instead." Python doesn't enforce true privacy the way some other languages do.</span>
</div>`,
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
      ],
      pyTests: [
        { code: "assert Temperature(0).fahrenheit == 32.0", message: "Temperature(0).fahrenheit should be 32.0." },
        { code: "t = Temperature(0)\nt.fahrenheit = 212\nassert round(t._celsius, 2) == 100.0", message: "Setting .fahrenheit = 212 should update _celsius to 100.0." }
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
    instructions: `<p>Comprehensions can be nested to flatten or transform structures that have more than one level, like a list of lists. Reading a nested comprehension left to right matches how you'd write the equivalent nested <code>for</code> loops: the leftmost <code>for</code> is the outer loop.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>groups = [["a", "b"], ["c"], ["d", "e"]]
flat = [letter for group in groups for letter in group]
print(flat)  # Output: ['a', 'b', 'c', 'd', 'e']</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>The order of the <code>for</code> clauses matters -- swapping them, or getting the loop variable names backward, is a common mistake that raises a <code>NameError</code> instead of flattening correctly.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Given <code>matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]</code>, create a list <code>flat</code> that contains all numbers in a single flat list using a nested list comprehension.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">[1, 2, 3, 4, 5, 6, 7, 8, 9]</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "assert flat == [1, 2, 3, 4, 5, 6, 7, 8, 9]", message: "'flat' should be [1, 2, 3, 4, 5, 6, 7, 8, 9]." }
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
    instructions: `<p>The <strong>walrus operator</strong> <code>:=</code> lets you assign a value to a name and use that value in the same expression, instead of needing a separate assignment line first. It's most useful when you'd otherwise have to compute the same thing twice, once to test it and once to use it.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>readings = [12, 45, 8, 33]
loud = [r for r in readings if (r := r * 2) > 50]
print(loud)  # Output: [90, 66]</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>The walrus operator needs its own parentheses when used inside a comprehension condition, like <code>(v := item)</code> -- leaving them off is a syntax error.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Given a list <code>data</code>, write a list comprehension that filters values greater than 5. Use the walrus operator to assign each item to <code>v</code> inside the comprehension condition and include <code>v</code> in the output. Store the result in <code>big</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">data = [1, 5, 2, 8, 3, 9, 4]</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">big = [8, 9]</code></div>
</div>`,
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
      ],
      pyTests: [
        { code: "assert big == [8, 9]", message: "'big' should be [8, 9], the values greater than 5." }
      ]
    },
    explanation: `<p>The walrus operator is useful when you need a value both in a condition and in the expression -- avoiding calling the same function twice. It is most commonly seen in while loops and comprehensions.</p>`
  },
  {
    id: 120,
    title: "Guided Project: Tic-Tac-Toe",
    difficulty: "hard",
    topic: "Classes",
    level: 3,
    xp: 30,
    kind: "project",
    source: "Tiny Python Projects #21, \"Tic-Tac-Toe\"",
    instructions: `<p>A tic-tac-toe board is nine cells and eight possible winning lines: three rows, three columns, and two diagonals. This capstone project, adapted from <em>Tiny Python Projects</em>, combines what you already know -- a class with its own instance state and a method that mutates it -- with two new pieces: unpacking a tuple straight in a <code>for</code> loop, and a chained comparison to check three cells at once.</p>
<p class="blueprint-line"><code>for a, b, c in triples:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;if cells[a] == cells[b] == cells[c] != " ":</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>triples = [(0, 1, 2), (3, 4, 5)]
values = ["X", "X", "X", "O", " ", "O"]
for a, b, c in triples:
    if values[a] == values[b] == values[c] != " ":
        print(a, b, c)  # Output: 0 1 2</code></pre>
</div>
<p><strong>New pieces in this project</strong></p>
<ul>
  <li>Unpacking a tuple in a <code>for</code> loop: <code>for a, b, c in triples:</code> pulls the three numbers out of each tuple directly into three names, instead of indexing into it by hand.</li>
  <li>Chained comparison: <code>x == y == z != " "</code> checks all three conditions at once -- true only if x, y, and z all match each other and none of them is blank.</li>
</ul>
<span class="task-label">Your Task</span>
<p class="task-line">Define a class <code>Board</code> with a <code>move(position, mark)</code> method that places <code>"X"</code> or <code>"O"</code> at one of 9 cells (indexed 0 to 8), and a <code>winner()</code> method that returns <code>"X"</code> or <code>"O"</code> if that player has completed a row, column, or diagonal, or <code>None</code> if nobody has won yet.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Board layout</span><code class="io-val">0 1 2 / 3 4 5 / 6 7 8</code></div>
  <div class="io-row"><span class="io-key">X at 0, 1, 2</span><code class="io-val">winner() returns "X"</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>This grades the board logic only, not a live playable game. Turn-taking and an actual interface are outside what a one-shot script can be graded on here, but the win-checking is the real core of the game either way.</span>
</div>`,
    hints: [
      "self.cells = [\" \"] * 9  in __init__",
      "def move(self, position, mark): self.cells[position] = mark",
      "Check all 8 lines: 3 rows, 3 columns, 2 diagonals, e.g. (0,1,2), (0,3,6), (0,4,8)",
      "A line wins if all three cells match and aren't blank: self.cells[a] == self.cells[b] == self.cells[c] != \" \""
    ],
    starterCode: "# Define a Board class with move() and winner()\n",
    solution: 'class Board:\n    def __init__(self):\n        self.cells = [" "] * 9\n\n    def move(self, position, mark):\n        self.cells[position] = mark\n\n    def winner(self):\n        lines = [\n            (0, 1, 2), (3, 4, 5), (6, 7, 8),\n            (0, 3, 6), (1, 4, 7), (2, 5, 8),\n            (0, 4, 8), (2, 4, 6)\n        ]\n        for a, b, c in lines:\n            if self.cells[a] != " " and self.cells[a] == self.cells[b] == self.cells[c]:\n                return self.cells[a]\n        return None',
    validation: {
      checks: [
        { type: "hasClass", name: "Board", message: "Define a class named 'Board'." },
        { type: "matchesRegex", pattern: "def\\s+move\\s*\\(\\s*self\\s*,", message: "Define a move(self, position, mark) method." },
        { type: "matchesRegex", pattern: "def\\s+winner\\s*\\(\\s*self\\s*\\)", message: "Define a winner(self) method." }
      ],
      pyTests: [
        { code: "b = Board()\nassert b.winner() is None", message: "A brand new Board should have no winner yet." },
        { code: "b = Board()\nb.move(0, 'X')\nb.move(1, 'X')\nb.move(2, 'X')\nassert b.winner() == 'X'", message: "X across the top row (0, 1, 2) should make X the winner." },
        { code: "b = Board()\nb.move(0, 'O')\nb.move(4, 'O')\nb.move(8, 'O')\nassert b.winner() == 'O'", message: "O across the diagonal (0, 4, 8) should make O the winner." },
        { code: "b = Board()\nb.move(0, 'X')\nb.move(4, 'O')\nb.move(1, 'X')\nassert b.winner() is None", message: "A few scattered moves with no completed line should still have no winner." }
      ]
    },
    explanation: `<p>Checking all eight lines the same way, "are these three cells equal to each other and not blank", avoids writing eight separate special cases. This pattern, representing a grid as a flat list and defining the winning combinations as index tuples, comes up again anywhere you need to check lines on a grid: bingo cards, word searches, and other small board games.</p>`
  }
];
