window.LEVEL1 = [
  {
    id: 1,
    title: "Create Your First Variable",
    difficulty: "easy",
    topic: "Variables",
    level: 1,
    xp: 10,
    instructions: `<p>A <strong>variable</strong> is simply a name you give to a value so you can use it again later. In Python you don't need to declare a type first: you just write a name, an <code>=</code> sign, and a value, and that's it, the variable now exists and holds that value until you change it. Variables are how almost every program keeps track of information, like a score, a username, or a total, while it runs.</p>
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
    instructions: `<p>A <strong>string</strong> is just text, wrapped in quotes so Python knows where it starts and ends. You can use single quotes or double quotes; they work exactly the same way, so pick whichever is easier to read (double quotes are handy when your text has an apostrophe in it). Strings are everywhere in programming: names, messages, and anything else made of words or characters gets stored as a string.</p>
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
    instructions: `<p>Python has two everyday number types. A whole number like <code>5</code> or <code>100</code> is called an <strong>int</strong>. A number with a decimal point like <code>3.14</code> is called a <strong>float</strong>. You don't have to tell Python which one you're making; it figures that out just from how you type the number. This matters later on, since mixing an int and a float in a calculation always gives you a float back.</p>
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
    instructions: `<p>A <strong>boolean</strong> is a value that can only be <code>True</code> or <code>False</code>, nothing else, and it always starts with a capital letter in Python. You'll run into booleans constantly once you start writing conditions, since comparing two things, like checking if one number is bigger than another, always produces a <code>True</code> or <code>False</code> answer. They're the building block behind every decision a program makes.</p>
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
    instructions: `<p>You can stick two strings together using the <code>+</code> sign. This is called <strong>concatenation</strong>, and it just means "join them end to end" rather than doing any math. It only works between strings though: trying to add a string and a number with <code>+</code> causes an error, so you'd need to turn the number into text first with <code>str()</code>. You'll use this constantly whenever you build a message out of smaller pieces.</p>
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
    instructions: `<p>An <strong>f-string</strong> is a handy way to build text that includes variables, without gluing the pieces together yourself. Just put an <code>f</code> right before the quotes, then wrap any variable name in curly braces and Python will swap in its value automatically. You can even do simple math inside the braces. f-strings are the easiest and most common way to combine text and data in modern Python.</p>
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
    instructions: `<p>A <strong>list</strong> holds several items together in order, written inside square brackets and separated by commas. You can grab any item by its position, called an index, and Python starts counting from <code>0</code> instead of <code>1</code>, so the first item is always at index <code>0</code>. Lists are one of the most useful tools in Python, since you can add, remove, or change items whenever you like.</p>
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
    id: 8,
    title: "List Methods: append and remove",
    difficulty: "easy",
    topic: "Lists",
    level: 1,
    xp: 10,
    instructions: `<p>Lists can change after you create them, which is what makes them so useful. The <code>append()</code> method adds a new item to the end of a list, and <code>remove()</code> deletes the first item that matches what you give it. Together with a few other methods like <code>pop()</code> and <code>sort()</code>, these let you update a list's contents directly instead of building a brand new one every time something changes.</p>
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
    explanation: `<p><code>append()</code> adds to the end of a list, and <code>remove()</code> deletes the first match it finds (raising an error if nothing matches). A few other handy methods: <code>insert()</code>, <code>pop()</code>, <code>sort()</code>, <code>reverse()</code>.</p>`
  },
  {
    id: 106,
    title: "List Slicing",
    difficulty: "easy",
    topic: "Lists",
    level: 1,
    xp: 10,
    instructions: `<p>Slicing lets you pull out a chunk of a list by giving a start and a stop position inside square brackets, written as <code>list[start:stop]</code>. The stop position is never included, so <code>list[1:4]</code> grabs index 1 through 3. Negative numbers count backward from the end, so <code>-1</code> is the last item and <code>-2</code> is the second-to-last, which makes grabbing "the last few items" easy without knowing exactly how long the list is.</p>
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
    instructions: `<p>The <code>.join()</code> method builds a single string out of a list of strings, gluing them together with whatever separator you call it on. You call it on the separator, not the list, which trips a lot of people up at first: <code>", ".join(words)</code> reads as "join words together using <code>", "</code> between each one." It's the reverse of <code>.split()</code>, and it's the standard way to turn a list back into readable text.</p>
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
    instructions: `<p>Real programs often need to turn a list into a sentence a person would actually read, not just print the raw list. This short guided project is adapted from <em>Tiny Python Projects</em>: build the classic "who's bringing what" picnic sentence, joining everything except the last item with commas, then adding "and" before the final one.</p>
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
    instructions: `<p>A <strong>tuple</strong> looks a lot like a list, since you access items the same way with an index, but once you create a tuple you can never change what's inside it. Tuples use round brackets instead of square ones. They're a good fit for values that shouldn't change, like a pair of coordinates, and since they're locked in place, Python can even use them as dictionary keys, which lists aren't allowed to be.</p>
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
    instructions: `<p>A <strong>dictionary</strong> stores information as pairs: a key and the value that goes with it, instead of numbered positions. You look things up by their key rather than counting positions, which makes dictionaries perfect for representing something like a person, where each piece of information (name, age, city) has its own label. Accessing a key that doesn't exist raises an error, unless you use the safer <code>.get()</code> method instead.</p>
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
    instructions: `<p>Dictionaries give you three simple ways to look at what's inside them. <code>.keys()</code> lists every key, <code>.values()</code> lists every value, and <code>.items()</code> gives you every key paired with its value together, which is great when you want to loop through both at once. None of these hand you back a plain list though, so wrap the result in <code>list()</code> if that's the format you actually need.</p>
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
    instructions: `<p>Looking up a missing key with square brackets, like <code>prices["mango"]</code>, crashes the program with a <code>KeyError</code>. The <code>.get()</code> method is a safer alternative: <code>.get(key, default)</code> returns the value if the key exists, or your chosen default if it doesn't, without ever raising an error. This is especially useful when you don't control what keys might show up, like data pulled from a file or typed by a user.</p>
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
    instructions: `<p>A dictionary is a natural fit whenever you need to look something up by a short code, like a letter, an ID, or a country abbreviation. This guided project is adapted from <em>Tiny Python Projects</em>: an alphabet book where each letter maps to a line of text, and you look up whichever letter you're given.</p>
<span class="task-label">Your Task</span>
<p class="task-line">Build a variable <code>line</code> by looking up <code>letter</code> safely in <code>alphabet</code> with <code>.get(letter, "is a mystery")</code> and combining it with <code>letter</code> itself.</p>
<div class="example-block">
  <span class="example-label">Example</span>
  <div class="io-row"><span class="io-key">Input</span><code class="io-val">letter = "B"</code></div>
  <div class="io-row"><span class="io-key">Output</span><code class="io-val">"B is for Basil assaulted by bears"</code></div>
</div>
<div class="note-block">
  <span class="note-label">Note</span>
  <span>This shortened alphabet only has entries for A, B, and C. Try a letter like "D" and the fallback text kicks in instead of crashing.</span>
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
    instructions: `<p>A <strong>set</strong> holds a group of values where every duplicate gets automatically thrown out, so no matter what you put in, you only ever get the unique items back. This makes sets great for removing duplicates from data or checking whether something exists in a collection, since the <code>in</code> keyword can check membership in a set much faster than it can in a list, especially as the collection grows larger.</p>
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
    instructions: `<p><code>if</code>, <code>elif</code>, and <code>else</code> let your program choose between different pieces of code depending on what's true. Python checks each condition one by one, from top to bottom, and as soon as one is <code>True</code> it runs that block and skips the rest. Instead of curly braces like some languages use, Python relies on indentation (spaces) to show which lines belong together, so getting that right really matters.</p>
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
    instructions: `<p>A <strong>for loop</strong> lets you run the same piece of code once for every item in a list, string, or other collection, without you having to keep track of a counter yourself. Python hands you each item in turn through your loop variable. This is the most common way to work through a collection in Python, whether you're printing each item or building up a brand new list as you go.</p>
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
    instructions: `<p>A <strong>while loop</strong> keeps repeating as long as its condition stays true, checking that condition again before every single pass. Unlike a for loop, nothing moves forward on its own, so you have to change something inside the loop yourself, or it will run forever. while loops are handy when you don't know ahead of time how many times you'll need to repeat something, like waiting for a specific value to be reached.</p>
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
    instructions: `<p>A cipher swaps each character for another one using a fixed rule, and a dictionary is a natural way to store that rule as a lookup table. This project is adapted from <em>Tiny Python Projects</em>: it's a real substitution cipher called "jump the five," where every digit trades places with the one five away from it (0 and 5 swap, 1 and 6 swap, and so on). You'll combine two things you already know, looping over a sequence and looking things up in a dictionary, to encode a whole string one character at a time.</p>
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
    instructions: `<p>Lists can hold other lists inside them, which is a simple way to represent a grid or table of values. To reach something inside a nested list you use two sets of brackets in a row: the first picks which inner list, or row, you want, and the second picks the item inside that row. You can nest as many levels deep as you need, though two levels is by far the most common case you'll run into.</p>
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
    instructions: `<p>Strings come with a bunch of built-in methods for working with text, and every one of them gives you back a brand new string instead of changing the original, since strings can't be changed once created. <code>.upper()</code> makes everything uppercase, <code>.strip()</code> removes extra spaces from the start and end, and <code>.split()</code> breaks a string apart into a list of pieces. It's common to chain a few of these together in one line.</p>
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
    instructions: `<p>Slicing lets you pull out a piece of a string (or a list) by giving a start and stop position inside square brackets, without writing a loop. A negative index counts backward from the end, so <code>-1</code> is the last character. This project is adapted from <em>Tiny Python Projects</em>' Crow's Nest exercise, which is really about getting comfortable pulling strings apart into pieces, a skill you'll use constantly once you start working with real text.</p>
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
    instructions: `<p>Every string has a <code>.replace(old, new)</code> method that swaps every occurrence of one piece of text for another, and returns a brand new string rather than changing the original. Since each call returns a fresh string, you can chain several <code>.replace()</code> calls one after another to swap out several different things in a row. This project is adapted from <em>Tiny Python Projects</em>' Apples and Bananas exercise: swapping every vowel in a sentence for a single vowel of your choice.</p>
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
    instructions: `<p>Sometimes you need to turn one type of value into another, which Python calls <strong>casting</strong>. <code>int()</code> and <code>float()</code> turn text into numbers, and <code>str()</code> turns a number back into text. This comes up constantly, because anything typed by a user, or read from a file, arrives as text by default, even if it looks like a number, so you have to convert it before doing any math with it.</p>
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
    instructions: `<p>Python lets you set several variables at once on a single line, matching up values on the right with names on the left in order. This also makes swapping two variables really simple: writing <code>a, b = b, a</code> swaps their values in one step, with no extra temporary variable needed, since Python works out the whole right side first before assigning anything to either name.</p>
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
    instructions: `<p>When a real program calls <code>input()</code>, it pauses and waits for the user to type something, then hands that text back as a <strong>string</strong>, even if what they typed was just digits. Since you can't do math directly with a string of digits, you'll almost always need to convert it with <code>int()</code> or <code>float()</code> first. Reading input and then converting it is one of the very first patterns you'll use in almost any program.</p>
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
