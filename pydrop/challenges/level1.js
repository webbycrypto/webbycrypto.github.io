window.LEVEL1 = [
  {
    id: 1,
    title: "Create Your First Variable",
    difficulty: "easy",
    topic: "Variables",
    level: 1,
    xp: 10,
    instructions: `<p>A <strong>variable</strong> is a name you give to a value so you can use it again later. In Python you don't declare a type first: write a name, an <code>=</code> sign, and a value, and it exists.</p>
<p>Variables track information like a score, a username, or a total while a program runs.</p>
<ul>
  <li><strong>Assignment operator:</strong> the <code>=</code> sign doesn't mean "equals" here, it means "store the thing on the right under the name on the left."</li>
  <li><strong>Comment (#):</strong> anything after a <code>#</code> on a line is ignored by Python -- it's a note for whoever reads the code, not an instruction that runs.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code># Store 42 under the name "answer"
answer = 42
print(answer)  # Output: 42</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Python is case-sensitive: <code>answer</code> and <code>Answer</code> are two completely different names.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Assign the integer <code>42</code> to a variable named <code>answer</code>.</p>`,
    hints: [
      "Use the = sign to assign: answer = 42",
      "No quotes needed around 42, since it's a number, not a string."
    ],
    starterCode: "# Assign 42 to a variable named answer\n",
    solution: "answer = 42",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\banswer\\s*=\\s*42\\b", message: "Create a variable named 'answer' and set it to 42." }
      ],
      pyTests: [
        { code: "assert 'answer' in dir(), 'no variable'", message: "You need a variable named 'answer'." },
        { code: "assert answer == 42", message: "'answer' should equal 42." },
        { code: "assert isinstance(answer, int)", message: "'answer' should be a whole number (int), not a string or float." }
      ]
    },
    explanation: `<p>Python doesn't make you declare a type. Write <code>answer = 42</code> and the variable just exists, holding an int since that's what you typed. That's really all there is to it.</p>`
  },
  {
    id: 2,
    title: "String Assignment",
    difficulty: "easy",
    topic: "Variables",
    level: 1,
    xp: 10,
    instructions: `<p>A <strong>string</strong> is text, wrapped in quotes so Python knows where it starts and ends.</p>
<p>Single and double quotes work identically; pick whichever's easier to read (double quotes are handy when your text has an apostrophe in it).</p>
<ul>
  <li><strong>Quotes:</strong> anything between matching <code>'</code> or <code>"</code> marks is text, not code, so Python doesn't try to run it or do math with it.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>greeting = "Hello, World!"
print(greeting)  # Output: Hello, World!</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Mixing quote styles, like starting with <code>"</code> and ending with <code>'</code>, causes a syntax error. The opening and closing quote have to match.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create a variable named <code>greeting</code> and assign it the string <code>"Hello, World!"</code>.</p>`,
    hints: [
      "Strings are wrapped in quotes: greeting = \"Hello, World!\"",
      "You can use single or double quotes, both are valid."
    ],
    starterCode: "# Create a string variable named greeting\n",
    solution: 'greeting = "Hello, World!"',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\bgreeting\\s*=\\s*['\"]", message: "Assign a string value to 'greeting' using quotes." }
      ],
      pyTests: [
        { code: "assert 'greeting' in dir()", message: "You need a variable named 'greeting'." },
        { code: "assert greeting == 'Hello, World!'", message: "'greeting' should be exactly \"Hello, World!\" (matching punctuation and capitalization)." }
      ]
    },
    explanation: `<p>Both quote styles create the exact same kind of string in Python, so there's no real difference between <code>'...'</code> and <code>"..."</code>. Use whichever makes your code easier to read.</p>`
  },
  {
    id: 3,
    title: "Integer and Float Types",
    difficulty: "easy",
    topic: "Variables",
    level: 1,
    xp: 10,
    instructions: `<p>Python has two everyday number types. A whole number like <code>5</code> is an <strong>int</strong>; a number with a decimal point like <code>3.14</code> is a <strong>float</strong>. Python figures out which one you meant just from how you type it.</p>
<p>Mixing an int and a float in a calculation always gives you a float back.</p>
<ul>
  <li><strong>float:</strong> a number with a decimal point, like <code>9.99</code>, even if the digits after the dot are just <code>0</code>.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>age = 25
price = 9.99
print(type(age))    # Output: &lt;class 'int'&gt;
print(type(price))  # Output: &lt;class 'float'&gt;</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create two variables: <code>age</code> set to <code>25</code> (an integer) and <code>price</code> set to <code>9.99</code> (a float).</p>`,
    hints: [
      "age = 25",
      "price = 9.99  (the decimal point makes it a float)"
    ],
    starterCode: "# Create age (integer) and price (float)\n",
    solution: "age = 25\nprice = 9.99",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\bage\\s*=\\s*25\\b", message: "Set 'age' to the integer 25." },
        { type: "matchesRegex", pattern: "\\bprice\\s*=\\s*9\\.99\\b", message: "Set 'price' to the float 9.99." }
      ],
      pyTests: [
        { code: "assert age == 25 and isinstance(age, int)", message: "'age' should be the integer 25." },
        { code: "assert price == 9.99 and isinstance(price, float)", message: "'price' should be the float 9.99." }
      ]
    },
    explanation: `<p>Ints are whole numbers, floats have a decimal point, and Python figures out which one you meant just by looking at how you wrote the number. You never declare the type yourself.</p>`
  },
  {
    id: 4,
    title: "Boolean Values",
    difficulty: "easy",
    topic: "Variables",
    level: 1,
    xp: 10,
    instructions: `<p>A <strong>boolean</strong> is a value that can only be <code>True</code> or <code>False</code>, always capitalized in Python. Comparing two things, like checking if one number is bigger than another, always produces a boolean answer.</p>
<ul>
  <li><strong>Capitalization:</strong> it's <code>True</code> and <code>False</code>, not <code>true</code> and <code>false</code>. Python treats the lowercase versions as undefined names, not booleans.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>is_online = True
print(is_online)  # Output: True</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Typing <code>true</code> in lowercase raises a <code>NameError</code> instead of giving you a boolean. Always capitalize the first letter.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create two variables: <code>is_online</code> set to <code>True</code> and <code>is_admin</code> set to <code>False</code>.</p>`,
    hints: [
      "is_online = True  (capital T)",
      "is_admin = False  (capital F)"
    ],
    starterCode: "# Create boolean variables\n",
    solution: "is_online = True\nis_admin = False",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\bis_online\\s*=\\s*True\\b", message: "Set 'is_online' to True (capital T)." },
        { type: "matchesRegex", pattern: "\\bis_admin\\s*=\\s*False\\b", message: "Set 'is_admin' to False (capital F)." }
      ],
      pyTests: [
        { code: "assert is_online is True", message: "'is_online' should be True." },
        { code: "assert is_admin is False", message: "'is_admin' should be False." }
      ]
    },
    explanation: `<p>Booleans are always <code>True</code> or <code>False</code>, always capitalized. You'll use them everywhere: conditions, comparisons, and flags that keep track of on/off states.</p>`
  },
  {
    id: 5,
    title: "String Concatenation",
    difficulty: "easy",
    topic: "Strings",
    level: 1,
    xp: 10,
    instructions: `<p>You can stick two strings together using the <code>+</code> sign. This is called <strong>concatenation</strong>: it joins them end to end rather than doing any math.</p>
<p>It only works between strings, though. Adding a string and a number with <code>+</code> causes an error, so convert the number to text first with <code>str()</code>.</p>
<ul>
  <li><strong>Concatenation:</strong> <code>+</code> between two strings glues them into one, with no space added automatically -- you have to include any spacing yourself.</li>
</ul>
<div class="note-block">
  <span class="note-label">Note</span>
  <span><code>"a" + 1</code> raises a <code>TypeError</code>. Python won't silently convert a number to text for you, so wrap it in <code>str()</code> first.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>first</code> and <code>second</code> as shown below, then create a third variable <code>result</code> that joins them together.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">first = "Python"<br>second = " Rocks"</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">"Python Rocks"</code></div>
</div>`,
    hints: [
      "result = first + second",
      "You can also do it in one line: result = first + second"
    ],
    starterCode: 'first = "Python"\nsecond = " Rocks"\n# Join them into result\n',
    solution: 'first = "Python"\nsecond = " Rocks"\nresult = first + second',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\bresult\\s*=\\s*first\\s*\\+\\s*second\\b", message: "Use + to join 'first' and 'second' into 'result'." }
      ],
      pyTests: [
        { code: "assert 'result' in dir()", message: "You need a variable named 'result'." },
        { code: "assert result == 'Python Rocks'", message: "'result' should equal \"Python Rocks\" (first + second)." }
      ]
    },
    explanation: `<p>The <code>+</code> operator glues strings together. It only works on strings though: <code>"a" + 1</code> raises a <code>TypeError</code>, so convert numbers with <code>str()</code> first, or use an f-string instead.</p>`
  },
  {
    id: 6,
    title: "f-String Formatting",
    difficulty: "easy",
    topic: "Strings",
    level: 1,
    xp: 10,
    instructions: `<p>An <strong>f-string</strong> builds text that includes variables, without gluing pieces together yourself. Put an <code>f</code> right before the quotes, wrap a variable name in curly braces, and Python swaps in its value automatically. You can even do simple math inside the braces.</p>
<p class="blueprint-line"><code>f"...{variable}..."</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>name = "Alice"
age = 30
print(f"{name} is {age} years old")  # Output: Alice is 30 years old</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Forgetting the <code>f</code> before the quotes is a common slip -- without it, Python prints the curly braces and variable names literally instead of substituting the values.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create a variable <code>message</code> using an f-string that greets someone by name and age, in the shape shown below.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">name = "Alice"<br>age = 30</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">"Alice is 30 years old"</code></div>
</div>`,
    hints: [
      "Start with f\"...\" to make it an f-string.",
      "Use {name} and {age} inside the string: f\"{name} is {age} years old\""
    ],
    starterCode: 'name = "Alice"\nage = 30\n# Create message using an f-string\n',
    solution: 'name = "Alice"\nage = 30\nmessage = f"{name} is {age} years old"',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "f['\"].*\\{name\\}.*\\{age\\}", message: "Use an f-string that embeds both {name} and {age}." },
        { type: "matchesRegex", pattern: "\\bmessage\\s*=\\s*f['\"]", message: "Assign the f-string result to a variable named 'message'." }
      ],
      pyTests: [
        { code: "assert 'message' in dir()", message: "You need a variable named 'message'." },
        { code: "assert message == 'Alice is 30 years old'", message: "'message' should equal \"Alice is 30 years old\"." }
      ]
    },
    explanation: `<p>f-strings (formatted string literals) are the modern way to build strings in Python. Prefix with <code>f</code> and place any expression in <code>{}</code>. They are cleaner and faster than older methods like <code>%</code> formatting or <code>.format()</code>.</p>`
  },
  {
    id: 7,
    title: "List Creation and Access",
    difficulty: "easy",
    topic: "Lists",
    level: 1,
    xp: 10,
    instructions: `<p>A <strong>list</strong> holds several items together in order, written inside square brackets and separated by commas. You grab any item by its position, called an index, and Python starts counting from <code>0</code>, so the first item is always at index <code>0</code>.</p>
<p class="blueprint-line"><code>my_list[index]</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>fruits = ["apple", "banana", "cherry"]
print(fruits[0])  # Output: apple</code></pre>
</div>
<p><strong>Shorthand</strong></p>
<ul>
  <li><code>fruits[0]</code> targets the first item.</li>
  <li><code>fruits[-1]</code> targets the last item, counting backward from the end.</li>
</ul>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Reaching for index <code>1</code> to get the first item is an easy off-by-one mistake. The first item is always at index <code>0</code>.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create a variable <code>fruits</code> containing three strings, then create <code>first_fruit</code> holding the first element.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">fruits</span><code class="io-val">["apple", "banana", "cherry"]</code></div>
  <div class="io-row"><span class="io-key">first_fruit</span><code class="io-val">"apple"</code></div>
</div>`,
    hints: [
      "fruits = [\"apple\", \"banana\", \"cherry\"]",
      "List indexing starts at 0: first_fruit = fruits[0]"
    ],
    starterCode: "# Create a list and access the first item\n",
    solution: 'fruits = ["apple", "banana", "cherry"]\nfirst_fruit = fruits[0]',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\bfruits\\s*=\\s*\\[.*apple.*banana.*cherry", message: "Create a list 'fruits' with \"apple\", \"banana\", \"cherry\" in that order." },
        { type: "matchesRegex", pattern: "\\bfirst_fruit\\s*=.*fruits\\[0\\]", message: "Access the first element with fruits[0] and store it in 'first_fruit'." }
      ],
      pyTests: [
        { code: "assert fruits == ['apple', 'banana', 'cherry']", message: "'fruits' should be [\"apple\", \"banana\", \"cherry\"] in that exact order." },
        { code: "assert first_fruit == 'apple'", message: "'first_fruit' should be fruits[0], i.e. \"apple\"." }
      ]
    },
    explanation: `<p>Lists count from <code>0</code>, not <code>1</code>, so the first item sits at index <code>0</code>. You can also count from the end with negative indexes: <code>fruits[-1]</code> gives you the last item.</p>`
  },
  {
    id: 220,
    title: "Reading a Traceback",
    difficulty: "easy",
    topic: "Debugging",
    level: 1,
    xp: 10,
    instructions: `<p>Sooner or later your code will crash, and when it does, Python prints a <strong>traceback</strong>: a report showing exactly where things went wrong. It looks intimidating, but you only need to read two parts of it -- the line pointing at your code, and the very last line.</p>
<ul>
  <li><strong>Exception type:</strong> the word before the colon on the traceback's last line (like <code>IndexError</code> or <code>NameError</code>) -- it names the general category of what went wrong.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>fruits = ["apple", "banana", "cherry"]
print(fruits[3])
# Traceback (most recent call last):
#   File "script.py", line 2, in &lt;module&gt;
#     print(fruits[3])
# IndexError: list index out of range</code></pre>
</div>
<p><strong>Common exception types</strong></p>
<ul>
  <li><code>IndexError</code>: asked a list for a position that doesn't exist (like index 3 in a 3-item list).</li>
  <li><code>NameError</code>: used a variable that was never created -- almost always a typo.</li>
  <li><code>KeyError</code>: asked a dictionary for a key it doesn't have.</li>
</ul>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Read a traceback from the bottom up: the last line tells you what broke, the line above it shows exactly which line of your code triggered it. Skip the middle the first time through.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">The code below crashes with an <code>IndexError</code>. Read the traceback it would produce, then fix the bug so <code>favorite</code> correctly holds <code>fruits[2]</code>, <code>"cherry"</code>, without the program crashing.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">fruits</span><code class="io-val">["apple", "banana", "cherry"]</code></div>
  <div class="io-row"><span class="io-key">favorite</span><code class="io-val">"cherry"</code></div>
</div>`,
    hints: [
      "The list only has 3 items, at indexes 0, 1, and 2 -- index 3 doesn't exist.",
      "favorite = fruits[2]"
    ],
    starterCode: 'fruits = ["apple", "banana", "cherry"]\nfavorite = fruits[3]  # this crashes -- fix the index\n',
    solution: 'fruits = ["apple", "banana", "cherry"]\nfavorite = fruits[2]',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "favorite\\s*=\\s*fruits\\[\\s*2\\s*\\]", message: "Fix the index so favorite = fruits[2]." }
      ],
      pyTests: [
        { code: "assert favorite == 'cherry'", message: "'favorite' should be fruits[2], i.e. \"cherry\"." }
      ]
    },
    explanation: `<p>The traceback's last line, <code>IndexError: list index out of range</code>, told you exactly what kind of mistake it was before you even looked at the code. That's the whole point of reading it: it turns "my program crashed, why" into "I asked for an index that doesn't exist," which is a much faster problem to fix.</p>`
  },
  {
    id: 132,
    title: "Functions vs Methods: the Dot",
    difficulty: "easy",
    topic: "Lists",
    level: 1,
    xp: 10,
    instructions: `<p>In Python, every value you work with, such as ints, strings, and lists, is called an <strong>object</strong>. An object is a bundle of data plus a set of built-in actions it knows how to perform on itself, called <strong>methods</strong>.</p>
<p>A method is just a function that belongs to a specific object. You call it with a dot: <code>object.method()</code> instead of <code>function(object)</code>.</p>
<p class="blueprint-line"><code>function(object)</code>&nbsp;&nbsp;vs&nbsp;&nbsp;<code>object.method(args)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>fruits = ["apple", "banana", "apple", "cherry"]
print(len(fruits))            # Output: 4
print(fruits.count("apple"))  # Output: 2</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>The dot basically means "hey object, do this thing you know how to do." Both shapes give you information about the list, but the dot always means a method is attached to whatever's on its left.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>total</code> using the function <code>len()</code> on <code>fruits</code>, then create <code>apple_count</code> using the method <code>fruits.count("apple")</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">fruits = ["apple", "banana", "apple", "cherry"]</code></div>
  <div class="io-row"><span class="io-key">total</span><code class="io-val">4</code></div>
  <div class="io-row"><span class="io-key">apple_count</span><code class="io-val">2</code></div>
</div>`,
    hints: [
      "len(fruits) is a function call: the value goes inside the parentheses.",
      "fruits.count(\"apple\") is a method call: the value comes first, then a dot, then the method name.",
      "total = len(fruits)",
      "apple_count = fruits.count(\"apple\")"
    ],
    starterCode: 'fruits = ["apple", "banana", "apple", "cherry"]\n# Use len() and .count() to fill in total and apple_count\n',
    solution: 'fruits = ["apple", "banana", "apple", "cherry"]\ntotal = len(fruits)\napple_count = fruits.count("apple")',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\btotal\\s*=\\s*len\\(\\s*fruits\\s*\\)", message: "Use len(fruits) to create 'total'." },
        { type: "matchesRegex", pattern: "fruits\\.count\\(\\s*['\"]apple['\"]\\s*\\)", message: "Use fruits.count(\"apple\") to create 'apple_count'." }
      ],
      pyTests: [
        { code: "assert total == 4", message: "'total' should be len(fruits), i.e. 4." },
        { code: "assert apple_count == 2", message: "'apple_count' should be fruits.count(\"apple\"), i.e. 2." }
      ]
    },
    explanation: `<p><code>len(fruits)</code> is a function: it takes the list as an argument, inside the parentheses. <code>fruits.count("apple")</code> is a method: it's attached to the list itself with a dot, and only takes the arguments it actually needs (here, what to count). Same idea, "give me info about this list," just two different calling shapes. From the next challenge on, you'll see methods like <code>.append()</code> and <code>.remove()</code> written the exact same <code>value.method(args)</code> way.</p>`
  },
  {
    id: 8,
    title: "List Methods: append and remove",
    difficulty: "easy",
    topic: "Lists",
    level: 1,
    xp: 10,
    instructions: `<p>Lists can change after you create them. <code>append()</code> adds a new item to the end of a list, and <code>remove()</code> deletes the first item that matches what you give it. Both change the list itself in place instead of building a new one.</p>
<ul>
  <li><strong>In place:</strong> the method edits the existing list directly and gives back <code>None</code>, rather than handing you a new list to store.</li>
</ul>
<p class="blueprint-line"><code>my_list.append(item)</code>&nbsp;&nbsp;/&nbsp;&nbsp;<code>my_list.remove(item)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>colors = ["red", "green", "blue"]
colors.append("yellow")
colors.remove("green")
print(colors)  # Output: ['red', 'blue', 'yellow']</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span><code>remove()</code> deletes by value, not position, and raises a <code>ValueError</code> if the item isn't found. It also only removes the first match, even if the value shows up more than once.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Append <code>"yellow"</code> to <code>colors</code>, then remove <code>"green"</code> from it.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Before</span><code class="io-val">["red", "green", "blue"]</code></div>
  <div class="io-row"><span class="io-key">After</span><code class="io-val">["red", "blue", "yellow"]</code></div>
</div>`,
    hints: [
      "colors.append(\"yellow\")",
      "colors.remove(\"green\")"
    ],
    starterCode: 'colors = ["red", "green", "blue"]\n# Append "yellow" and remove "green"\n',
    solution: 'colors = ["red", "green", "blue"]\ncolors.append("yellow")\ncolors.remove("green")',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "colors\\.append\\(\\s*['\"]yellow['\"]\\s*\\)", message: "Use colors.append(\"yellow\") to add 'yellow'." },
        { type: "matchesRegex", pattern: "colors\\.remove\\(\\s*['\"]green['\"]\\s*\\)", message: "Use colors.remove(\"green\") to remove 'green'." }
      ],
      pyTests: [
        { code: "assert colors == ['red', 'blue', 'yellow']", message: "'colors' should be [\"red\", \"blue\", \"yellow\"] after appending \"yellow\" and removing \"green\"." }
      ]
    },
    explanation: `<p><code>append()</code> adds to the end of a list, and <code>remove()</code> deletes the first match it finds (raising an error if nothing matches). Both change the list in place rather than handing back a new one. You'll meet two more handy list methods, <code>pop()</code> and <code>sort()</code>, in the next couple of challenges.</p>`
  },
  {
    id: 133,
    title: "List Methods: pop",
    difficulty: "easy",
    topic: "Lists",
    level: 1,
    xp: 10,
    instructions: `<p><code>pop()</code> removes an item from a list and hands it back to you at the same time, which <code>remove()</code> doesn't do. Called with no arguments, <code>list.pop()</code> takes off the very last item. Give it an index, like <code>list.pop(0)</code>, and it removes and returns whatever's sitting at that position instead.</p>
<p class="blueprint-line"><code>my_list.pop(index)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>queue = ["ticket1", "ticket2", "ticket3"]
next_ticket = queue.pop(0)
print(next_ticket)  # Output: ticket1
print(queue)        # Output: ['ticket2', 'ticket3']</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>next_ticket</code> by popping the first item (index <code>0</code>) off <code>queue</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Before</span><code class="io-val">queue = ["ticket1", "ticket2", "ticket3"]</code></div>
  <div class="io-row"><span class="io-key">next_ticket</span><code class="io-val">"ticket1"</code></div>
  <div class="io-row"><span class="io-key">queue after</span><code class="io-val">["ticket2", "ticket3"]</code></div>
</div>`,
    hints: [
      "queue.pop(0) removes and returns the item at index 0.",
      "next_ticket = queue.pop(0)"
    ],
    starterCode: 'queue = ["ticket1", "ticket2", "ticket3"]\n# Pop the first ticket off the queue\n',
    solution: 'queue = ["ticket1", "ticket2", "ticket3"]\nnext_ticket = queue.pop(0)',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "next_ticket\\s*=\\s*queue\\.pop\\(\\s*0\\s*\\)", message: "Use queue.pop(0) and store the result in 'next_ticket'." }
      ],
      pyTests: [
        { code: "assert next_ticket == 'ticket1'", message: "'next_ticket' should be \"ticket1\", the item popped from index 0." },
        { code: "assert queue == ['ticket2', 'ticket3']", message: "'queue' should have \"ticket1\" removed, leaving [\"ticket2\", \"ticket3\"]." }
      ]
    },
    explanation: `<p><code>pop()</code> is different from <code>remove()</code> in one key way: <code>remove()</code> throws the item away, <code>pop()</code> hands it back to you while also taking it out of the list. Leave the parentheses empty and it pops the last item; give it an index and it pops from that specific spot instead.</p>`
  },
  {
    id: 134,
    title: "List Methods: sort",
    difficulty: "easy",
    topic: "Lists",
    level: 1,
    xp: 10,
    instructions: `<p><code>sort()</code> rearranges a list into order, smallest to largest by default, changing the list itself instead of giving you a new one back. Numbers sort numerically, strings sort alphabetically, and you can pass <code>reverse=True</code> for largest to smallest instead.</p>
<ul>
  <li><strong>In place, returns None:</strong> <code>sort()</code> rearranges the existing list and hands back nothing useful, so assigning its result wipes your data out.</li>
</ul>
<p class="blueprint-line"><code>my_list.sort(reverse=True/False)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>scores = [42, 17, 89, 3, 56]
scores.sort()
print(scores)  # Output: [3, 17, 42, 56, 89]</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Sort <code>scores</code> from smallest to largest, in place, using <code>.sort()</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Before</span><code class="io-val">scores = [42, 17, 89, 3, 56]</code></div>
  <div class="io-row"><span class="io-key">After</span><code class="io-val">[3, 17, 42, 56, 89]</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Just call <code>scores.sort()</code> on its own line. Don't write <code>scores = scores.sort()</code>, since <code>sort()</code> returns <code>None</code>, and that would wipe your list out entirely.</span>
</div>`,
    hints: [
      "scores.sort() rearranges the list in place.",
      "Don't assign the result: scores.sort() returns None, not the sorted list."
    ],
    starterCode: "scores = [42, 17, 89, 3, 56]\n# Sort scores from smallest to largest\n",
    solution: "scores = [42, 17, 89, 3, 56]\nscores.sort()",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "scores\\.sort\\(\\s*\\)", message: "Call scores.sort() to sort the list in place." },
        { type: "matchesRegex", pattern: "^(?!.*scores\\s*=\\s*scores\\.sort).*$", message: "Don't reassign scores to the result of sort() -- it returns None." }
      ],
      pyTests: [
        { code: "assert scores == [3, 17, 42, 56, 89]", message: "'scores' should be sorted smallest to largest: [3, 17, 42, 56, 89]." }
      ]
    },
    explanation: `<p><code>sort()</code> rearranges the list in place and returns <code>None</code>, so don't write <code>scores = scores.sort()</code>, that wipes out your list and replaces it with <code>None</code>. Just call <code>scores.sort()</code> on its own line. Pass <code>reverse=True</code>, like <code>scores.sort(reverse=True)</code>, to sort largest to smallest instead.</p>`
  },
  {
    id: 106,
    title: "List Slicing",
    difficulty: "easy",
    topic: "Lists",
    level: 1,
    xp: 10,
    instructions: `<p>Slicing lets you pull out a chunk of a list by giving a start and a stop position inside square brackets, written as <code>list[start:stop]</code>. The stop position is never included, so <code>list[1:4]</code> grabs indices 1 through 3. Negative numbers count backward from the end of the list.</p>
<ul>
  <li><strong>Omitted boundaries:</strong> leaving a side of the colon blank means "all the way to the start" or "all the way to the end."</li>
</ul>
<p class="blueprint-line"><code>my_list[start:stop]</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>numbers = [10, 20, 30, 40, 50]
print(numbers[1:4])  # Output: [20, 30, 40]
print(numbers[-2:])  # Output: [40, 50]</code></pre>
</div>
<p><strong>Shorthand</strong></p>
<ul>
  <li><code>list[1:4]</code> extracts items starting at index 1 up through index 3.</li>
  <li><code>list[-1]</code> targets the absolute last item in the list.</li>
  <li><code>list[-2:]</code> targets the second-to-last item and runs all the way to the end.</li>
</ul>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Python list indices start counting at 0, not 1. A slice of [1:4] will completely skip the very first item in your list.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>middle</code> as <code>numbers[1:4]</code> and <code>last_two</code> as <code>numbers[-2:]</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">numbers = [10, 20, 30, 40, 50]</code></div>
  <div class="io-row"><span class="io-key">middle</span><code class="io-val">[20, 30, 40]</code></div>
  <div class="io-row"><span class="io-key">last_two</span><code class="io-val">[40, 50]</code></div>
</div>`,
    hints: [
      "middle = numbers[1:4]  grabs index 1 up to (not including) index 4",
      "last_two = numbers[-2:]  grabs the last two items, however long the list is"
    ],
    starterCode: "numbers = [10, 20, 30, 40, 50]\n# Slice out middle and last_two\n",
    solution: "numbers = [10, 20, 30, 40, 50]\nmiddle = numbers[1:4]\nlast_two = numbers[-2:]",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\bmiddle\\s*=\\s*numbers\\[", message: "Use slicing on numbers to create 'middle'." },
        { type: "matchesRegex", pattern: "\\blast_two\\s*=\\s*numbers\\[\\s*-2\\s*:\\s*\\]", message: "Use numbers[-2:] to grab the last two items." }
      ],
      pyTests: [
        { code: "assert middle == [20, 30, 40]", message: "'middle' should be numbers[1:4], which is [20, 30, 40]." },
        { code: "assert last_two == [40, 50]", message: "'last_two' should be numbers[-2:], the last two items: [40, 50]." }
      ]
    },
    explanation: `<p><code>list[start:stop]</code> never includes the stop index itself, only up to it. Leaving out a side means "to the beginning" or "to the end": <code>numbers[:3]</code> is the same as <code>numbers[0:3]</code>, and <code>numbers[2:]</code> goes all the way to the end.</p>`
  },
  {
    id: 107,
    title: "Joining a List into a String",
    difficulty: "easy",
    topic: "Lists",
    level: 1,
    xp: 10,
    instructions: `<p>The <code>.join()</code> method builds a single string out of a list of strings, gluing them together with whatever separator you call it on. You call it on the separator, not the list: <code>", ".join(words)</code> reads as "join words using <code>", "</code> between each one."</p>
<p>It's the reverse of <code>.split()</code>.</p>
<p class="blueprint-line"><code>"separator".join(list_of_strings)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>words = ["red", "green", "blue"]
csv_line = ", ".join(words)
print(csv_line)  # Output: red, green, blue</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span><code>.join()</code> only works on a list of strings. Trying to join a list containing a number raises a <code>TypeError</code>, so convert every item with <code>str()</code> first if needed.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>csv_line</code> by joining <code>words</code> with <code>", "</code> between each one.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">words = ["red", "green", "blue"]</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">"red, green, blue"</code></div>
</div>`,
    hints: [
      'csv_line = ", ".join(words)',
      "The separator comes first, then .join(the_list)."
    ],
    starterCode: 'words = ["red", "green", "blue"]\n# Join words with ", " between each one\n',
    solution: 'words = ["red", "green", "blue"]\ncsv_line = ", ".join(words)',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\.join\\(\\s*words\\s*\\)", message: "Call .join() on words." },
        { type: "matchesRegex", pattern: "\\bcsv_line\\s*=", message: "Store the result in a variable named 'csv_line'." }
      ],
      pyTests: [
        { code: "assert csv_line == 'red, green, blue'", message: "'csv_line' should be \"red, green, blue\"." }
      ]
    },
    explanation: `<p><code>.join()</code> is called on the separator string, and takes the list as its argument. An empty separator <code>"".join(words)</code> mashes everything together with nothing between; a space <code>" ".join(words)</code> puts a single space between each word.</p>`
  },
  {
    id: 101,
    title: "Guided Project: Picnic",
    difficulty: "easy",
    topic: "Lists",
    level: 1,
    xp: 15,
    kind: "project",
    source: "Tiny Python Projects #3, \"Picnic\"",
    instructions: `<p>This project is adapted from <em>Tiny Python Projects</em>' Picnic exercise: turning a list into a sentence a person would actually read, the way you'd say it out loud instead of just printing the raw list. It combines two things you already know -- slicing with <code>items[:-1]</code> and <code>items[-1]</code>, and joining a list of strings with <code>", ".join(...)</code> -- inside an f-string.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>items = ["milk", "eggs"]
line = f"{', '.join(items[:-1])}, and {items[-1]}"
print(line)  # Output: milk, and eggs</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Build a variable <code>sentence</code> from the <code>items</code> list below, using <code>", ".join(...)</code> for everything except the last item.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">items = ["apples", "bananas", "cherries"]</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">"You are bringing apples, bananas, and cherries."</code></div>
</div>`,
    hints: [
      "Join everything except the last item with commas: ', '.join(items[:-1])",
      "Then add ', and ' plus the last item: items[-1]",
      "sentence = f\"You are bringing {', '.join(items[:-1])}, and {items[-1]}.\""
    ],
    starterCode: 'items = ["apples", "bananas", "cherries"]\n# Build the picnic sentence\n',
    solution: 'items = ["apples", "bananas", "cherries"]\nsentence = f"You are bringing {\', \'.join(items[:-1])}, and {items[-1]}."',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\bsentence\\s*=", message: "Create a variable named 'sentence'." },
        { type: "matchesRegex", pattern: "\\.join\\(", message: "Use .join() to combine the items with commas." }
      ],
      pyTests: [
        { code: "assert sentence == 'You are bringing apples, bananas, and cherries.'", message: "'sentence' should read \"You are bringing apples, bananas, and cherries.\" with commas between items and \"and\" before the last one." }
      ]
    },
    explanation: `<p>This is called the Oxford comma style, and it's how most style guides join three or more items. <code>", ".join(items[:-1])</code> handles everything except the last item, then you tack on <code>", and "</code> plus <code>items[-1]</code> for the ending.</p>`
  },
  {
    id: 9,
    title: "Tuple Creation",
    difficulty: "easy",
    topic: "Tuples",
    level: 1,
    xp: 10,
    instructions: `<p>A <strong>tuple</strong> looks a lot like a list, and you access items the same way with an index, but once created you can never change what's inside it. Tuples use round brackets instead of square ones.</p>
<p>They're a good fit for values that shouldn't change, like a pair of coordinates, and since they're locked in place, Python can even use them as dictionary keys, unlike lists.</p>
<ul>
  <li><strong>Immutable:</strong> once a tuple is created, you can't add, remove, or reassign any of its items. Trying to raises a <code>TypeError</code>.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>coordinates = (10, 20)
print(coordinates[0])  # Output: 10</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create a variable <code>coordinates</code> holding a tuple, then create <code>x</code> and <code>y</code> from its first and second elements.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">coordinates</span><code class="io-val">(10, 20)</code></div>
  <div class="io-row"><span class="io-key">x, y</span><code class="io-val">10, 20</code></div>
</div>`,
    hints: [
      "coordinates = (10, 20)",
      "x = coordinates[0]  and  y = coordinates[1]"
    ],
    starterCode: "# Create a tuple and unpack it\n",
    solution: "coordinates = (10, 20)\nx = coordinates[0]\ny = coordinates[1]",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\bcoordinates\\s*=\\s*\\(\\s*10\\s*,\\s*20\\s*\\)", message: "Create a tuple coordinates = (10, 20)." },
        { type: "matchesRegex", pattern: "\\bx\\s*=.*coordinates\\[0\\]", message: "Set 'x' from coordinates[0]." },
        { type: "matchesRegex", pattern: "\\by\\s*=.*coordinates\\[1\\]", message: "Set 'y' from coordinates[1]." }
      ],
      pyTests: [
        { code: "assert coordinates == (10, 20)", message: "'coordinates' should be the tuple (10, 20)." },
        { code: "assert x == 10", message: "'x' should be coordinates[0], i.e. 10." },
        { code: "assert y == 20", message: "'y' should be coordinates[1], i.e. 20." }
      ]
    },
    explanation: `<p>Tuples are locked once created, which makes them a good fit for fixed data like coordinates or RGB colors. Since they can't change, Python can even use them as dictionary keys, unlike lists.</p>`
  },
  {
    id: 10,
    title: "Dictionary Creation and Access",
    difficulty: "easy",
    topic: "Dictionaries",
    level: 1,
    xp: 10,
    instructions: `<p>A <strong>dictionary</strong> stores information as pairs: a key and the value that goes with it, instead of numbered positions. That makes dictionaries a good fit for something like a person, where each piece of information (name, age, city) has its own label.</p>
<p>Accessing a key that doesn't exist raises an error, unless you use the safer <code>.get()</code> method instead.</p>
<ul>
  <li><strong>Key:</strong> the label you look a value up by, written before the colon inside <code>{}</code>.</li>
  <li><strong>Value:</strong> the data attached to that key, written after the colon.</li>
</ul>
<p class="blueprint-line"><code>my_dict[key]</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>person = {"name": "Bob", "age": 28}
print(person["name"])  # Output: Bob</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Looking up a key that doesn't exist with square brackets, like <code>person["email"]</code>, raises a <code>KeyError</code> and crashes the program.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create a variable <code>person</code> with the keys shown below, then create <code>persons_name</code> by accessing the <code>"name"</code> key.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">person</span><code class="io-val">{"name": "Bob", "age": 28, "city": "London"}</code></div>
  <div class="io-row"><span class="io-key">persons_name</span><code class="io-val">"Bob"</code></div>
</div>`,
    hints: [
      "person = {\"name\": \"Bob\", \"age\": 28, \"city\": \"London\"}",
      "persons_name = person[\"name\"]"
    ],
    starterCode: "# Create a dictionary and access a key\n",
    solution: 'person = {"name": "Bob", "age": 28, "city": "London"}\npersons_name = person["name"]',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\bperson\\s*=\\s*\\{[^}]*['\"]name['\"]\\s*:\\s*['\"]Bob['\"]", message: "Create a dictionary 'person' with a \"name\": \"Bob\" entry." },
        { type: "matchesRegex", pattern: "\\bpersons_name\\s*=.*person\\[\\s*['\"]name['\"]\\s*\\]", message: "Access person[\"name\"] and store it in 'persons_name'." }
      ],
      pyTests: [
        { code: "assert person == {'name': 'Bob', 'age': 28, 'city': 'London'}", message: "'person' should have exactly the keys name/age/city with the given values." },
        { code: "assert persons_name == 'Bob'", message: "'persons_name' should be person[\"name\"], i.e. \"Bob\"." }
      ]
    },
    explanation: `<p>Dictionaries let you look values up by key instead of position. Square brackets raise an error on a missing key, while <code>.get()</code> quietly returns <code>None</code> instead, which is often safer.</p>`
  },
  {
    id: 11,
    title: "Dictionary Methods",
    difficulty: "easy",
    topic: "Dictionaries",
    level: 1,
    xp: 10,
    instructions: `<p>Dictionaries give you three ways to look at what's inside them: <code>.keys()</code> lists every key, <code>.values()</code> lists every value, and <code>.items()</code> pairs each key with its value together.</p>
<p>None of these hand you back a plain list, so wrap the result in <code>list()</code> if that's the format you need.</p>
<ul>
  <li><strong>View object:</strong> <code>.keys()</code>, <code>.values()</code>, and <code>.items()</code> return a live view, not a list -- it updates automatically if the dictionary changes, and you can't index into it directly.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>scores = {"alice": 95, "bob": 87}
print(list(scores.keys()))    # Output: ['alice', 'bob']
print(list(scores.items()))   # Output: [('alice', 95), ('bob', 87)]</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>all_keys</code>, <code>all_values</code>, and <code>all_items</code> from <code>scores</code> using the three methods above.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">scores = {"alice": 95, "bob": 87, "charlie": 92}</code></div>
  <div class="io-row"><span class="io-key">all_keys</span><code class="io-val">dict_keys(['alice', 'bob', 'charlie'])</code></div>
  <div class="io-row"><span class="io-key">all_values</span><code class="io-val">dict_values([95, 87, 92])</code></div>
  <div class="io-row"><span class="io-key">all_items</span><code class="io-val">dict_items([('alice', 95), ('bob', 87), ('charlie', 92)])</code></div>
</div>`,
    hints: [
      "all_keys = scores.keys()",
      "all_values = scores.values()",
      "all_items = scores.items()"
    ],
    starterCode: 'scores = {"alice": 95, "bob": 87, "charlie": 92}\n# Get keys, values, and items\n',
    solution: 'scores = {"alice": 95, "bob": 87, "charlie": 92}\nall_keys = scores.keys()\nall_values = scores.values()\nall_items = scores.items()',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\ball_keys\\s*=.*\\.keys\\(\\)", message: "Set all_keys using scores.keys()." },
        { type: "matchesRegex", pattern: "\\ball_values\\s*=.*\\.values\\(\\)", message: "Set all_values using scores.values()." },
        { type: "matchesRegex", pattern: "\\ball_items\\s*=.*\\.items\\(\\)", message: "Set all_items using scores.items()." }
      ],
      pyTests: [
        { code: "assert set(all_keys) == {'alice', 'bob', 'charlie'}", message: "'all_keys' should contain all the dictionary's keys." },
        { code: "assert set(all_values) == {95, 87, 92}", message: "'all_values' should contain all the dictionary's values." },
        { code: "assert dict(all_items) == scores", message: "'all_items' should contain all the dictionary's (key, value) pairs." }
      ]
    },
    explanation: `<p>These three methods give you different views into the same dictionary. They aren't plain lists, so wrap them in <code>list()</code> if you need to index into the result directly.</p>`
  },
  {
    id: 108,
    title: "Dictionary .get() with a Default",
    difficulty: "easy",
    topic: "Dictionaries",
    level: 1,
    xp: 10,
    instructions: `<p>Looking up a missing key with square brackets, like <code>prices["mango"]</code>, crashes the program with a <code>KeyError</code>. The <code>.get()</code> method is a safer alternative: <code>.get(key, default)</code> returns the value if the key exists, or your chosen default if it doesn't, without raising an error.</p>
<p class="blueprint-line"><code>my_dict.get(key, default)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>prices = {"apple": 1, "banana": 2}
print(prices.get("mango", 0))  # Output: 0</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>apple_price</code> and <code>mango_price</code> from <code>prices</code> using <code>.get(key, 0)</code> for both, even though one key is missing.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">prices = {"apple": 1, "banana": 2}</code></div>
  <div class="io-row"><span class="io-key">apple_price</span><code class="io-val">1</code></div>
  <div class="io-row"><span class="io-key">mango_price</span><code class="io-val">0</code></div>
</div>`,
    hints: [
      'apple_price = prices.get("apple", 0)',
      'mango_price = prices.get("mango", 0)  returns 0 since "mango" is missing'
    ],
    starterCode: 'prices = {"apple": 1, "banana": 2}\n# Use .get() with a default for both lookups\n',
    solution: 'prices = {"apple": 1, "banana": 2}\napple_price = prices.get("apple", 0)\nmango_price = prices.get("mango", 0)',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\.get\\(\\s*['\"]apple['\"]", message: "Use prices.get(\"apple\", ...) to look up apple_price." },
        { type: "matchesRegex", pattern: "\\.get\\(\\s*['\"]mango['\"]", message: "Use prices.get(\"mango\", ...) to look up mango_price." }
      ],
      pyTests: [
        { code: "assert apple_price == 1", message: "'apple_price' should be 1, since \"apple\" is in the dictionary." },
        { code: "assert mango_price == 0", message: "'mango_price' should be 0, the default, since \"mango\" isn't in the dictionary." }
      ]
    },
    explanation: `<p><code>prices["mango"]</code> would raise a <code>KeyError</code> here, since <code>"mango"</code> was never added. <code>prices.get("mango", 0)</code> sidesteps that entirely, handing back your fallback value instead of crashing.</p>`
  },
  {
    id: 102,
    title: "Guided Project: Gashlycrumb",
    difficulty: "easy",
    topic: "Dictionaries",
    level: 1,
    xp: 15,
    kind: "project",
    source: "Tiny Python Projects #7, \"Gashlycrumb\"",
    instructions: `<p>A dictionary is a natural fit whenever you need to look something up by a short code, like a letter, an ID, or a country abbreviation. This project is adapted from <em>Tiny Python Projects</em>: an alphabet book where each letter maps to a line of text. It combines two things you already know -- dictionary lookups and f-strings -- with one new piece: a safe lookup that doesn't crash on a missing key.</p>
<p class="blueprint-line"><code>dictionary.get(key, default)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>alphabet = {"A": "is for Amy who fell down the stairs"}
letter = "D"
line = alphabet.get(letter, "is a mystery")
print(line)  # Output: "is a mystery"</code></pre>
</div>
<p><code>.get(key, default)</code> looks up <code>key</code> like <code>alphabet[key]</code> does, but returns <code>default</code> instead of crashing with a <code>KeyError</code> when the key isn't there.</p>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>This shortened alphabet only has entries for A, B, and C -- looking up a letter like "D" is exactly what exercises the fallback, instead of crashing the program.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Build a variable <code>line</code> by looking up <code>letter</code> safely in <code>alphabet</code> with <code>.get(letter, "is a mystery")</code> and combining it with <code>letter</code> itself.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">letter = "B"</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">"B is for Basil assaulted by bears"</code></div>
</div>`,
    hints: [
      "Look the letter up safely: alphabet.get(letter, \"is a mystery\")",
      "Combine the letter and its line: f\"{letter} {alphabet.get(letter, 'is a mystery')}\"",
      "Store the result in a variable named 'line'."
    ],
    starterCode: 'alphabet = {\n    "A": "is for Amy who fell down the stairs",\n    "B": "is for Basil assaulted by bears",\n    "C": "is for Clara who wasted away"\n}\nletter = "B"\n# Build the line for this letter\n',
    solution: 'alphabet = {\n    "A": "is for Amy who fell down the stairs",\n    "B": "is for Basil assaulted by bears",\n    "C": "is for Clara who wasted away"\n}\nletter = "B"\nline = f"{letter} {alphabet.get(letter, \'is a mystery\')}"',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\.get\\(", message: "Use alphabet.get() to look up the letter safely." },
        { type: "matchesRegex", pattern: "\\bline\\s*=", message: "Store the result in a variable named 'line'." }
      ],
      pyTests: [
        { code: "assert line == 'B is for Basil assaulted by bears'", message: "'line' should read \"B is for Basil assaulted by bears\"." }
      ]
    },
    explanation: `<p>Using <code>.get(key, default)</code> instead of <code>alphabet[key]</code> means a missing letter falls back to your default text instead of crashing the program with a <code>KeyError</code>. That's the difference between a program that handles unexpected input gracefully and one that doesn't.</p>`
  },
  {
    id: 12,
    title: "Set Creation and Membership",
    difficulty: "easy",
    topic: "Sets",
    level: 1,
    xp: 10,
    instructions: `<p>A <strong>set</strong> holds a group of values where every duplicate gets automatically thrown out, so you only ever get the unique items back. Sets are also great for membership checks: the <code>in</code> keyword tests a set much faster than it does a list, especially as the collection grows.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>unique_numbers = {1, 2, 3, 2, 1}
print(unique_numbers)      # Output: {1, 2, 3}
print(3 in unique_numbers) # Output: True</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Sets don't keep any order, so you can't index into one with <code>my_set[0]</code>. Sort or convert to a list first if order matters.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>unique_numbers</code> as a set, then create <code>has_three</code> using <code>in</code> to check if <code>3</code> is in it.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">1, 2, 3, 2, 1</code></div>
  <div class="io-row"><span class="io-key">unique_numbers</span><code class="io-val">{1, 2, 3}</code></div>
  <div class="io-row"><span class="io-key">has_three</span><code class="io-val">True</code></div>
</div>`,
    hints: [
      "unique_numbers = {1, 2, 3, 2, 1}  (duplicates are dropped automatically)",
      "has_three = 3 in unique_numbers"
    ],
    starterCode: "# Create a set and check membership\n",
    solution: "unique_numbers = {1, 2, 3, 2, 1}\nhas_three = 3 in unique_numbers",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\bunique_numbers\\s*=\\s*\\{", message: "Create a set named 'unique_numbers'." },
        { type: "matchesRegex", pattern: "\\bhas_three\\s*=\\s*3\\s+in\\s+unique_numbers", message: "Use 'has_three = 3 in unique_numbers' to check membership." }
      ],
      pyTests: [
        { code: "assert unique_numbers == {1, 2, 3}", message: "'unique_numbers' should be the set {1, 2, 3} once duplicates are removed." },
        { code: "assert has_three is True", message: "'has_three' should be True, since 3 is in the set." }
      ]
    },
    explanation: `<p>Sets automatically remove duplicates for you, so <code>{1, 2, 3, 2, 1}</code> just becomes <code>{1, 2, 3}</code>. Checking membership with <code>in</code> is also much faster on a set than on a list.</p>`
  },
  {
    id: 13,
    title: "if / elif / else Conditionals",
    difficulty: "easy",
    topic: "Conditionals",
    level: 1,
    xp: 10,
    instructions: `<p><code>if</code>, <code>elif</code>, and <code>else</code> let your program choose between different pieces of code depending on what's true. Python checks each condition top to bottom, and as soon as one is <code>True</code> it runs that block and skips the rest.</p>
<p>Two rules make this work: every <code>if</code>/<code>elif</code>/<code>else</code> line ends with a colon <code>:</code>, and the lines belonging to that block are indented underneath it (4 spaces, by convention) instead of wrapped in curly braces.</p>
<ul>
  <li><strong>elif:</strong> short for "else if" -- only checked if every condition above it was <code>False</code>.</li>
  <li><strong>Truthy/falsy:</strong> a condition doesn't need a comparison at all -- <code>if some_list:</code> is true whenever the list isn't empty, since empty collections, <code>0</code>, and <code>None</code> all count as false, and everything else counts as true.</li>
</ul>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>temp = 50
if temp > 80:
    print("hot")
elif temp > 50:
    print("mild")
else:
    print("cold")
# Output: cold</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Mixing tabs and spaces, or indenting inconsistently, raises an <code>IndentationError</code>. Pick one style and stick with it throughout the block.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Given <code>score</code>, write a conditional that sets <code>grade</code> to:</p>
<ul>
  <li><code>"A"</code> if score >= 90</li>
  <li><code>"B"</code> if score >= 80</li>
  <li><code>"C"</code> if score >= 70</li>
  <li><code>"F"</code> otherwise</li>
</ul>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">score = 75</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">grade = "C"</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Watch the boundaries: a score of exactly 90 counts as "A", not "B", since each threshold is inclusive.</span>
</div>`,
    hints: [
      "Start with: if score >= 90:",
      "Use elif for the next conditions, else for the fallback."
    ],
    starterCode: "score = 75\n# Set grade based on the score\n",
    solution: 'score = 75\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelse:\n    grade = "F"',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "if\\s+score\\s*>=\\s*90\\s*:", message: "Start with 'if score >= 90:'." },
        { type: "matchesRegex", pattern: "elif\\s+score\\s*>=\\s*\\d", message: "Use 'elif' for the intermediate conditions." },
        { type: "matchesRegex", pattern: "else\\s*:", message: "Add an 'else:' block for the fallback case." },
        { type: "matchesRegex", pattern: "\\bgrade\\s*=\\s*['\"]", message: "Assign a string result to a variable named 'grade'." }
      ],
      pyTests: [
        { code: "assert grade == 'C'", message: "With score = 75, 'grade' should end up as \"C\" (>= 70 but < 80)." }
      ]
    },
    explanation: `<p>Python uses indentation, not curly braces, to mark code blocks. <code>elif</code> just means "else if", and once one condition matches, the rest are skipped entirely.</p>`
  },
  {
    id: 14,
    title: "for Loop Over a List",
    difficulty: "easy",
    topic: "Loops",
    level: 1,
    xp: 10,
    instructions: `<p>A <strong>for loop</strong> lets you run the same piece of code once for every item in a list, string, or other collection, without keeping track of a counter yourself. Python hands you each item in turn through your loop variable.</p>
<p class="blueprint-line"><code>for item in collection:</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>animals = ["cat", "dog"]
for animal in animals:
    print(animal.upper())
# Output: CAT
# Output: DOG</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Write a for loop that builds a new list <code>upper_animals</code> where each animal name is uppercased using <code>.upper()</code>. Use <code>append()</code> inside the loop.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">animals = ["cat", "dog", "bird"]</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">["CAT", "DOG", "BIRD"]</code></div>
</div>`,
    hints: [
      "Start with: upper_animals = []",
      "for animal in animals:  then upper_animals.append(animal.upper())"
    ],
    starterCode: 'animals = ["cat", "dog", "bird"]\n# Build upper_animals using a for loop\nupper_animals = []\n',
    solution: 'animals = ["cat", "dog", "bird"]\nupper_animals = []\nfor animal in animals:\n    upper_animals.append(animal.upper())',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "for\\s+\\w+\\s+in\\s+animals\\s*:", message: "Write a for loop iterating over 'animals' (don't forget the colon)." },
        { type: "matchesRegex", pattern: "upper_animals\\.append\\(\\s*\\w+\\.upper\\(\\)\\s*\\)", message: "Call .upper() on each animal and append it to 'upper_animals'." }
      ],
      pyTests: [
        { code: "assert upper_animals == ['CAT', 'DOG', 'BIRD']", message: "'upper_animals' should be [\"CAT\", \"DOG\", \"BIRD\"], in the same order as 'animals'." }
      ]
    },
    explanation: `<p>The <code>for x in iterable</code> pattern is Python's standard way to loop. It works the same on lists, strings, dictionaries, and more, so you never need to manage an index counter yourself.</p>`
  },
  {
    id: 15,
    title: "while Loop with Counter",
    difficulty: "easy",
    topic: "Loops",
    level: 1,
    xp: 10,
    instructions: `<p>A <strong>while loop</strong> keeps repeating as long as its condition stays true, checking that condition again before every pass. Unlike a for loop, nothing moves forward on its own, so you have to change something inside the loop yourself, or it runs forever.</p>
<ul>
  <li><strong>Condition check:</strong> Python re-checks the condition before every pass through the loop, including the very first one -- if it's already <code>False</code>, the loop body never runs at all.</li>
</ul>
<p class="blueprint-line"><code>while condition:</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>count = 0
while count < 3:
    count += 1
print(count)  # Output: 3</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Write a while loop that increments <code>count</code> by 1 each iteration until it reaches <code>5</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Before</span><code class="io-val">count = 0</code></div>
  <div class="io-row"><span class="io-key">After</span><code class="io-val">count = 5</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Forget to increment count inside the loop and this would run forever. Always double check the condition can eventually become false.</span>
</div>`,
    hints: [
      "while count < 5:  then increment: count += 1",
      "count += 1 is shorthand for count = count + 1"
    ],
    starterCode: "count = 0\n# Loop until count reaches 5\n",
    solution: "count = 0\nwhile count < 5:\n    count += 1",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "while\\s+count\\s*<\\s*5\\s*:", message: "Write 'while count < 5:'." },
        { type: "matchesRegex", pattern: "count\\s*\\+=\\s*1|count\\s*=\\s*count\\s*\\+\\s*1", message: "Increment count by 1 inside the loop." }
      ],
      pyTests: [
        { code: "assert count == 5", message: "'count' should equal 5 once the loop finishes." }
      ]
    },
    explanation: `<p>while loops are perfect when you don't know ahead of time how many times you'll need to repeat something, like waiting for a value to reach a target. Just make sure the condition eventually becomes false, or it never stops.</p>`
  },
  {
    id: 103,
    title: "Guided Project: Jump the Five",
    difficulty: "easy",
    topic: "Dictionaries",
    level: 1,
    xp: 15,
    kind: "project",
    source: "Tiny Python Projects #4, \"Jump the Five\"",
    instructions: `<p>This project is adapted from <em>Tiny Python Projects</em>' Jump the Five exercise: a real substitution cipher where every digit trades places with the one five away from it (0 and 5 swap, 1 and 6 swap, and so on). It combines two things you already know -- dictionary lookups and building a string with <code>+=</code> in a loop -- with one new piece: looping over a string steps through it one character at a time, the same way a for loop steps through a list.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>word = "cat"
for char in word:
    print(char)
# Output: c
# Output: a
# Output: t</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Loop over <code>code</code> and build <code>encoded</code> by looking up each digit in <code>jump</code> and adding it on.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">code = "1234567890"</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">"6789012345"</code></div>
</div>`,
    hints: [
      "Loop over each character: for digit in code:",
      "Look up its replacement: jump[digit]",
      "Add it to encoded as you go: encoded += jump[digit]"
    ],
    starterCode: 'jump = {"0": "5", "1": "6", "2": "7", "3": "8", "4": "9", "5": "0", "6": "1", "7": "2", "8": "3", "9": "4"}\ncode = "1234567890"\nencoded = ""\n# Build encoded by jumping each digit\n',
    solution: 'jump = {"0": "5", "1": "6", "2": "7", "3": "8", "4": "9", "5": "0", "6": "1", "7": "2", "8": "3", "9": "4"}\ncode = "1234567890"\nencoded = ""\nfor digit in code:\n    encoded += jump[digit]',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "for\\s+\\w+\\s+in\\s+code\\s*:", message: "Write a for loop iterating over each character in 'code'." },
        { type: "matchesRegex", pattern: "encoded\\s*\\+=|encoded\\s*=\\s*encoded\\s*\\+", message: "Build up 'encoded' inside the loop using += ." }
      ],
      pyTests: [
        { code: "assert encoded == '6789012345'", message: "'encoded' should be \"6789012345\" after jumping every digit by five." }
      ]
    },
    explanation: `<p>Looping over a string with <code>for digit in code:</code> works exactly like looping over a list, since a string is just a sequence of characters. Each digit comes out one at a time, ready to be looked up in the <code>jump</code> dictionary and appended to the result, the same <code>+=</code> pattern from the while loop above.</p>`
  },
  {
    id: 16,
    title: "Nested List Access",
    difficulty: "easy",
    topic: "Lists",
    level: 1,
    xp: 10,
    instructions: `<p>Lists can hold other lists inside them, which is a simple way to represent a grid or table of values. To reach something inside a nested list you use two sets of brackets in a row: the first picks which inner list, or row, you want, and the second picks the item inside that row.</p>
<p>Once you've got the row, indexing into it works exactly like indexing into any other list, you're just doing it twice in a row.</p>
<p class="blueprint-line"><code>matrix[row][column]</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(matrix[1])     # Output: [4, 5, 6]
print(matrix[1][1])  # Output: 5</code></pre>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create a variable <code>middle</code> that holds the center element of <code>matrix</code> (row 1, column 1).</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">5</code></div>
</div>`,
    hints: [
      "matrix[1] gives you [4, 5, 6]",
      "matrix[1][1] gives you 5"
    ],
    starterCode: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n# Get the center element (5)\n",
    solution: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nmiddle = matrix[1][1]",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\bmiddle\\s*=\\s*matrix\\[1\\]\\[1\\]", message: "Access matrix[1][1] to get the center element." }
      ],
      pyTests: [
        { code: "assert middle == 5", message: "'middle' should be matrix[1][1], i.e. 5." }
      ]
    },
    explanation: `<p>Nested indexing works one bracket at a time: <code>matrix[1]</code> grabs the second row <code>[4, 5, 6]</code>, then <code>[1]</code> grabs the second item in that row, which is <code>5</code>.</p>`
  },
  {
    id: 17,
    title: "String Methods",
    difficulty: "easy",
    topic: "Strings",
    level: 1,
    xp: 10,
    instructions: `<p>Strings come with built-in methods for working with text, and every one of them returns a brand new string instead of changing the original, since strings can't be changed once created. <code>.upper()</code> makes everything uppercase, <code>.strip()</code> removes extra spaces from the start and end, and <code>.split()</code> breaks a string apart into a list of pieces.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>raw = "  hello world  "
print(raw.strip().split(" "))  # Output: ['hello', 'world']</code></pre>
</div>
<p><strong>Shorthand</strong></p>
<ul>
  <li><code>.upper()</code> uppercases every letter.</li>
  <li><code>.strip()</code> trims whitespace from both ends only, leaving interior spacing alone.</li>
  <li><code>.split(" ")</code> breaks the string into a list wherever a space appears.</li>
</ul>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>shouted</code> (uppercased), <code>trimmed</code> (stripped), and <code>words</code> (stripped and split by a single space) from <code>raw</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">raw = "  hello world  "</code></div>
  <div class="io-row"><span class="io-key">shouted</span><code class="io-val">"  HELLO WORLD  "</code></div>
  <div class="io-row"><span class="io-key">trimmed</span><code class="io-val">"hello world"</code></div>
  <div class="io-row"><span class="io-key">words</span><code class="io-val">["hello", "world"]</code></div>
</div>`,
    hints: [
      "shouted = raw.upper()",
      "trimmed = raw.strip()",
      "words = raw.strip().split(\" \")"
    ],
    starterCode: 'raw = "  hello world  "\n# Create shouted, trimmed, and words\n',
    solution: 'raw = "  hello world  "\nshouted = raw.upper()\ntrimmed = raw.strip()\nwords = raw.strip().split(" ")',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\bshouted\\s*=\\s*raw\\.upper\\(\\)", message: "Use raw.upper() to create 'shouted'." },
        { type: "matchesRegex", pattern: "\\btrimmed\\s*=\\s*raw\\.strip\\(\\)", message: "Use raw.strip() to create 'trimmed'." },
        { type: "matchesRegex", pattern: "\\bwords\\s*=.*\\.split\\(", message: "Use .split() to create 'words'." }
      ],
      pyTests: [
        { code: "assert shouted == '  HELLO WORLD  '", message: "'shouted' should be raw.upper(): whitespace stays, letters become uppercase." },
        { code: "assert trimmed == 'hello world'", message: "'trimmed' should be raw.strip(), with no leading or trailing spaces." },
        { code: "assert words == ['hello', 'world']", message: "'words' should be the stripped string split on a single space: ['hello', 'world']." }
      ]
    },
    explanation: `<p>None of these methods change the original string, since strings can't be modified once created. Chaining them, like <code>raw.strip().split()</code>, lets you clean and process text in one line.</p>`
  },
  {
    id: 104,
    title: "Guided Project: The Crow's Nest",
    difficulty: "easy",
    topic: "Strings",
    level: 1,
    xp: 15,
    kind: "project",
    source: "Tiny Python Projects #2, \"The Crow's Nest\"",
    instructions: `<p>This project is adapted from <em>Tiny Python Projects</em>' Crow's Nest exercise: pulling a string apart into pieces using slicing, a skill you already used on lists. The new piece is a third slice value, the step, which lets you skip through a sequence instead of just taking a start and stop.</p>
<p class="blueprint-line"><code>sequence[start:stop:step]</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>letters = "abcdef"
print(letters[::2])   # Output: ace
print(letters[::-1])  # Output: fedcba</code></pre>
</div>
<p><strong>New pieces in this project</strong></p>
<ul>
  <li><code>[::step]</code>: the third slice value skips through the sequence that many at a time; a negative step, like <code>-1</code>, walks backward and reverses it.</li>
</ul>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>first_word</code> as the first 3 characters, <code>last_word</code> as the last 4 characters, and <code>reversed_text</code> as the whole string reversed.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">text = "The Crow's Nest"</code></div>
  <div class="io-row"><span class="io-key">first_word</span><code class="io-val">"The"</code></div>
  <div class="io-row"><span class="io-key">last_word</span><code class="io-val">"Nest"</code></div>
  <div class="io-row"><span class="io-key">reversed_text</span><code class="io-val">"tseN s'worC ehT"</code></div>
</div>`,
    hints: [
      "first_word = text[:3]  takes the first 3 characters",
      "last_word = text[-4:]  takes the last 4 characters",
      "reversed_text = text[::-1]  reverses the whole string"
    ],
    starterCode: 'text = "The Crow\'s Nest"\n# Slice out first_word, last_word, and reversed_text\n',
    solution: 'text = "The Crow\'s Nest"\nfirst_word = text[:3]\nlast_word = text[-4:]\nreversed_text = text[::-1]',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\bfirst_word\\s*=\\s*text\\[", message: "Use slicing on text to create 'first_word'." },
        { type: "matchesRegex", pattern: "\\blast_word\\s*=\\s*text\\[", message: "Use slicing on text to create 'last_word'." },
        { type: "matchesRegex", pattern: "\\breversed_text\\s*=\\s*text\\[::-1\\]", message: "Use text[::-1] to reverse the string into 'reversed_text'." }
      ],
      pyTests: [
        { code: "assert first_word == 'The'", message: "'first_word' should be the first 3 characters: \"The\"." },
        { code: "assert last_word == 'Nest'", message: "'last_word' should be the last 4 characters: \"Nest\"." },
        { code: "assert reversed_text == \"tseN s'worC ehT\"", message: "'reversed_text' should be the whole string reversed." }
      ]
    },
    explanation: `<p>Slicing syntax is <code>text[start:stop]</code>, where either side can be left out to mean "from the beginning" or "to the end." Adding a third number, the step, lets <code>text[::-1]</code> walk the string backward one character at a time, which is a quick way to reverse it.</p>`
  },
  {
    id: 105,
    title: "Guided Project: Apples and Bananas",
    difficulty: "easy",
    topic: "Strings",
    level: 1,
    xp: 15,
    kind: "project",
    source: "Tiny Python Projects #8, \"Apples and Bananas\"",
    instructions: `<p>This project is adapted from <em>Tiny Python Projects</em>' Apples and Bananas exercise: swapping every vowel in a sentence for a single vowel of your choice. It uses the dot-method calls you already know, with one new method: <code>.replace(old, new)</code>.</p>
<p class="blueprint-line"><code>string.replace(old, new)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>text = "cat"
print(text.replace("a", "u"))  # Output: cut</code></pre>
</div>
<p><strong>New pieces in this project</strong></p>
<ul>
  <li><code>.replace(old, new)</code>: swaps every occurrence of <code>old</code> for <code>new</code> and returns a brand new string, since strings can't change in place. Because it returns a fresh string, you can chain several calls in a row: <code>text.replace("a", "x").replace("e", "y")</code>.</li>
</ul>
<span class="task-label">Your Task</span>
<p class="task-line">Build <code>result</code> by chaining <code>.replace()</code> calls so every lowercase vowel (a, e, i, o, u) in <code>sentence</code> becomes <code>new_vowel</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">sentence = "I like apples"<br>new_vowel = "o"</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">"I loko opplos"</code></div>
</div>`,
    hints: [
      "Chain .replace() calls, one per vowel: sentence.replace(\"a\", new_vowel)",
      "Keep chaining: .replace(\"e\", new_vowel).replace(\"i\", new_vowel)...",
      "Each .replace() returns a new string, so you can call another .replace() right after it."
    ],
    starterCode: 'sentence = "I like apples"\nnew_vowel = "o"\n# Replace every lowercase vowel with new_vowel\n',
    solution: 'sentence = "I like apples"\nnew_vowel = "o"\nresult = sentence.replace("a", new_vowel).replace("e", new_vowel).replace("i", new_vowel).replace("o", new_vowel).replace("u", new_vowel)',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\.replace\\(\\s*['\"]a['\"]", message: "Chain .replace() calls starting with 'a'." },
        { type: "matchesRegex", pattern: "\\bresult\\s*=", message: "Store the final result in a variable named 'result'." }
      ],
      pyTests: [
        { code: "assert result == 'I loko opplos'", message: "'result' should be \"I loko opplos\" once every lowercase vowel is swapped for \"o\"." }
      ]
    },
    explanation: `<p>Because <code>.replace()</code> always hands back a new string, chaining five of them in a row, one per vowel, works exactly like piping the text through five separate swaps. The capital <code>I</code> stays untouched since <code>.replace("i", ...)</code> only matches the lowercase letter.</p>`
  },
  {
    id: 18,
    title: "Type Conversion",
    difficulty: "easy",
    topic: "Variables",
    level: 1,
    xp: 10,
    instructions: `<p>Turning one type of value into another is called <strong>casting</strong> in Python. <code>int()</code> and <code>float()</code> turn text into numbers, and <code>str()</code> turns a number back into text.</p>
<p>Anything typed by a user, or read from a file, arrives as text by default, even if it looks like a number, so you have to convert it before doing any math with it.</p>
<ul>
  <li><strong>Casting:</strong> wrapping a value in <code>int()</code>, <code>float()</code>, or <code>str()</code> doesn't change the original variable -- it produces a new value of the requested type.</li>
</ul>
<p class="blueprint-line"><code>int(value)</code>&nbsp;&nbsp;/&nbsp;&nbsp;<code>float(value)</code>&nbsp;&nbsp;/&nbsp;&nbsp;<code>str(value)</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>num_str = "100"
num_int = int(num_str)
print(num_int)  # Output: 100</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span><code>int("abc")</code> raises a <code>ValueError</code> since "abc" isn't a valid number. Only convert text you know actually looks like a number.</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>num_int</code> and <code>num_float</code> from <code>num_str</code>, then create <code>back_to_str</code> by converting <code>num_int</code> back to a string.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">num_str = "100"</code></div>
  <div class="io-row"><span class="io-key">num_int</span><code class="io-val">100</code></div>
  <div class="io-row"><span class="io-key">num_float</span><code class="io-val">100.0</code></div>
  <div class="io-row"><span class="io-key">back_to_str</span><code class="io-val">"100"</code></div>
</div>`,
    hints: [
      "num_int = int(num_str)",
      "num_float = float(num_str)",
      "back_to_str = str(num_int)"
    ],
    starterCode: 'num_str = "100"\n# Convert to int, float, and back to string\n',
    solution: 'num_str = "100"\nnum_int = int(num_str)\nnum_float = float(num_str)\nback_to_str = str(num_int)',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\bnum_int\\s*=\\s*int\\(\\s*num_str\\s*\\)", message: "Use int(num_str) to create 'num_int'." },
        { type: "matchesRegex", pattern: "\\bnum_float\\s*=\\s*float\\(\\s*num_str\\s*\\)", message: "Use float(num_str) to create 'num_float'." },
        { type: "matchesRegex", pattern: "\\bback_to_str\\s*=\\s*str\\(\\s*num_int\\s*\\)", message: "Use str(num_int) to create 'back_to_str'." }
      ],
      pyTests: [
        { code: "assert num_int == 100 and isinstance(num_int, int)", message: "'num_int' should be the integer 100." },
        { code: "assert num_float == 100.0 and isinstance(num_float, float)", message: "'num_float' should be the float 100.0." },
        { code: "assert back_to_str == '100' and isinstance(back_to_str, str)", message: "'back_to_str' should be the string \"100\"." }
      ]
    },
    explanation: `<p>Converting types comes up constantly, especially with user input, which always arrives as text. <code>int()</code> raises an error on something like <code>int("abc")</code>, so wrap risky conversions in try/except.</p>`
  },
  {
    id: 19,
    title: "Multiple Assignment and Swap",
    difficulty: "easy",
    topic: "Variables",
    level: 1,
    xp: 10,
    instructions: `<p>Python lets you set several variables at once on a single line, matching up values on the right with names on the left in order.</p>
<p>This also makes swapping two variables simple: <code>a, b = b, a</code> swaps their values in one step, with no temporary variable needed, since Python works out the whole right side before assigning anything to either name.</p>
<p class="blueprint-line"><code>a, b = b, a</code></p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>a, b = 10, 20
a, b = b, a
print(a, b)  # Output: 20 10</code></pre>
</div>
<p><strong>Shorthand</strong></p>
<ul>
  <li><code>a, b = 10, 20</code> assigns both variables in one line, no separate statements needed.</li>
  <li><code>a, b = b, a</code> swaps two variables' values without a temporary variable.</li>
</ul>
<span class="task-label">Your Task</span>
<p class="task-line">Create <code>a</code> and <code>b</code> in one line, then swap their values in another single line (without a temporary variable).</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Before</span><code class="io-val">a = 10, b = 20</code></div>
  <div class="io-row"><span class="io-key">After</span><code class="io-val">a = 20, b = 10</code></div>
</div>`,
    hints: [
      "a, b = 10, 20  assigns both at once",
      "a, b = b, a  swaps them in one line"
    ],
    starterCode: "# Assign a and b in one line, then swap them\n",
    solution: "a, b = 10, 20\na, b = b, a",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\ba\\s*,\\s*b\\s*=\\s*10\\s*,\\s*20", message: "Assign a and b in one line: a, b = 10, 20." },
        { type: "matchesRegex", pattern: "\\ba\\s*,\\s*b\\s*=\\s*b\\s*,\\s*a", message: "Swap a and b using tuple unpacking: a, b = b, a" }
      ],
      pyTests: [
        { code: "assert (a, b) == (20, 10)", message: "After the swap, 'a' should be 20 and 'b' should be 10." }
      ]
    },
    explanation: `<p>The swap trick <code>a, b = b, a</code> works because Python builds the whole right side first, then assigns it all at once, so neither variable gets overwritten too early.</p>`
  },
  {
    id: 20,
    title: "Input Simulation",
    difficulty: "easy",
    topic: "Variables",
    level: 1,
    xp: 10,
    instructions: `<p>When a real program calls <code>input()</code>, it pauses and waits for the user to type something, then hands that text back as a <strong>string</strong>, even if what they typed was just digits. Since you can't do math directly with a string of digits, you'll need to convert it with <code>int()</code> or <code>float()</code> first.</p>
<div class="example-block">
  <span class="example-label">Quick Example</span>
  <pre><code>user_input = "42"
number = int(user_input)
print(number * 2)  # Output: 84</code></pre>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>Forgetting to convert the string before doing math causes a <code>TypeError</code> (numbers) or unwanted text repetition (like <code>"42" * 2</code> giving <code>"4242"</code> instead of <code>84</code>).</span>
</div>
<span class="task-label">Your Task</span>
<p class="task-line">Simulate typed input with <code>user_input</code>, convert it to an integer named <code>number</code>, then create <code>doubled</code> as <code>number * 2</code>.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">user_input</span><code class="io-val">"42"</code></div>
  <div class="io-row"><span class="io-key">number</span><code class="io-val">42</code></div>
  <div class="io-row"><span class="io-key">doubled</span><code class="io-val">84</code></div>
</div>`,
    hints: [
      "user_input = \"42\"",
      "number = int(user_input)",
      "doubled = number * 2"
    ],
    starterCode: "# Simulate user input and process it\n",
    solution: 'user_input = "42"\nnumber = int(user_input)\ndoubled = number * 2',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\buser_input\\s*=\\s*['\"]42['\"]", message: "Set user_input to the string \"42\"." },
        { type: "matchesRegex", pattern: "\\bnumber\\s*=\\s*int\\(\\s*user_input\\s*\\)", message: "Convert user_input to int and store in 'number'." },
        { type: "matchesRegex", pattern: "\\bdoubled\\s*=\\s*number\\s*\\*\\s*2", message: "Create 'doubled' as number * 2." }
      ],
      pyTests: [
        { code: "assert user_input == '42' and isinstance(user_input, str)", message: "'user_input' should be the string \"42\"." },
        { code: "assert number == 42", message: "'number' should be int(user_input), i.e. 42." },
        { code: "assert doubled == 84", message: "'doubled' should be number * 2, i.e. 84." }
      ]
    },
    explanation: `<p>Real programs process user input constantly, and it's always text to start with. Always convert and check it before trusting that it's a valid number.</p>`
  }
];
