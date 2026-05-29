window.LEVEL1 = [
  {
    id: 1,
    title: "Create Your First Variable",
    difficulty: "easy",
    topic: "Variables",
    level: 1,
    xp: 10,
    instructions: `<p>Variables store data. In Python, you create one by writing a name, then <code>=</code>, then a value.</p>
<p>Assign the integer <code>42</code> to a variable named <code>answer</code>.</p>`,
    hints: [
      "Use the = sign to assign: answer = 42",
      "No quotes needed around 42 -- it is a number, not a string."
    ],
    starterCode: "# Assign 42 to a variable named answer\n",
    solution: "answer = 42",
    validation: {
      checks: [
        { type: "codeContains", value: "answer", message: "You need a variable named 'answer'." },
        { type: "matchesRegex", pattern: "answer\\s*=\\s*42", message: "The variable 'answer' should equal 42." }
      ]
    },
    explanation: `<p>Python variables need no type declaration. Just write <code>answer = 42</code> and the variable exists. The type (integer here) is inferred automatically.</p>`
  },
  {
    id: 2,
    title: "String Assignment",
    difficulty: "easy",
    topic: "Variables",
    level: 1,
    xp: 10,
    instructions: `<p>A string is a sequence of characters wrapped in quotes. Single quotes <code>'hello'</code> and double quotes <code>"hello"</code> both work.</p>
<p>Create a variable named <code>greeting</code> and assign the string <code>"Hello, World!"</code> to it.</p>`,
    hints: [
      "Strings are wrapped in quotes: greeting = \"Hello, World!\"",
      "You can use single or double quotes -- both are valid."
    ],
    starterCode: "# Create a string variable named greeting\n",
    solution: 'greeting = "Hello, World!"',
    validation: {
      checks: [
        { type: "codeContains", value: "greeting", message: "Create a variable named 'greeting'." },
        { type: "matchesRegex", pattern: "greeting\\s*=\\s*['\"]", message: "Assign a string value to 'greeting' using quotes." }
      ]
    },
    explanation: `<p>Strings in Python are sequences of characters. You can use single quotes <code>'...'</code> or double quotes <code>"..."</code>. Both create the same type of object.</p>`
  },
  {
    id: 3,
    title: "Integer and Float Types",
    difficulty: "easy",
    topic: "Variables",
    level: 1,
    xp: 10,
    instructions: `<p>Python has two main number types:</p>
<ul>
  <li><strong>int</strong> -- whole numbers like <code>5</code>, <code>-3</code>, <code>100</code></li>
  <li><strong>float</strong> -- decimal numbers like <code>3.14</code>, <code>-0.5</code></li>
</ul>
<p>Create two variables: <code>age</code> set to <code>25</code> (an integer) and <code>price</code> set to <code>9.99</code> (a float).</p>`,
    hints: [
      "age = 25",
      "price = 9.99  (the decimal point makes it a float)"
    ],
    starterCode: "# Create age (integer) and price (float)\n",
    solution: "age = 25\nprice = 9.99",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "age\\s*=\\s*25", message: "Set 'age' to the integer 25." },
        { type: "matchesRegex", pattern: "price\\s*=\\s*9\\.99", message: "Set 'price' to the float 9.99." }
      ]
    },
    explanation: `<p>Integers (<code>int</code>) are whole numbers. Floats (<code>float</code>) contain a decimal point. Python automatically picks the right type based on how you write the number.</p>`
  },
  {
    id: 4,
    title: "Boolean Values",
    difficulty: "easy",
    topic: "Variables",
    level: 1,
    xp: 10,
    instructions: `<p>A boolean is either <code>True</code> or <code>False</code>. Note the capital first letter -- Python is case-sensitive.</p>
<p>Create two variables: <code>is_online</code> set to <code>True</code> and <code>is_admin</code> set to <code>False</code>.</p>`,
    hints: [
      "is_online = True  (capital T)",
      "is_admin = False  (capital F)"
    ],
    starterCode: "# Create boolean variables\n",
    solution: "is_online = True\nis_admin = False",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "is_online\\s*=\\s*True", message: "Set 'is_online' to True (capital T)." },
        { type: "matchesRegex", pattern: "is_admin\\s*=\\s*False", message: "Set 'is_admin' to False (capital F)." }
      ]
    },
    explanation: `<p>Booleans represent truth values. In Python they are <code>True</code> and <code>False</code> -- always capitalised. They are used in conditions, comparisons, and flags.</p>`
  },
  {
    id: 5,
    title: "String Concatenation",
    difficulty: "easy",
    topic: "Strings",
    level: 1,
    xp: 10,
    instructions: `<p>You can join strings together using the <code>+</code> operator. This is called concatenation.</p>
<p>Create a variable <code>first</code> set to <code>"Python"</code> and <code>second</code> set to <code>" Rocks"</code>. Then create a third variable <code>result</code> that joins them together.</p>`,
    hints: [
      "result = first + second",
      "You can also do it in one line: result = first + second"
    ],
    starterCode: 'first = "Python"\nsecond = " Rocks"\n# Join them into result\n',
    solution: 'first = "Python"\nsecond = " Rocks"\nresult = first + second',
    validation: {
      checks: [
        { type: "codeContains", value: "result", message: "Create a variable named 'result'." },
        { type: "matchesRegex", pattern: "result\\s*=.*first.*second|result\\s*=.*second.*first|result\\s*=.*\\+", message: "Use + to join the strings into 'result'." }
      ]
    },
    explanation: `<p>The <code>+</code> operator joins strings. Note: you can only concatenate strings with strings -- you cannot add a string and a number directly.</p>`
  },
  {
    id: 6,
    title: "f-String Formatting",
    difficulty: "easy",
    topic: "Strings",
    level: 1,
    xp: 10,
    instructions: `<p>f-strings let you embed variables directly inside a string. Prefix the string with <code>f</code> and wrap variable names in curly braces <code>{}</code>.</p>
<p>Given <code>name = "Alice"</code> and <code>age = 30</code>, create a variable <code>message</code> using an f-string that produces: <code>"Alice is 30 years old"</code>.</p>`,
    hints: [
      "Start with f\"...\" to make it an f-string.",
      "Use {name} and {age} inside the string: f\"{name} is {age} years old\""
    ],
    starterCode: 'name = "Alice"\nage = 30\n# Create message using an f-string\n',
    solution: 'name = "Alice"\nage = 30\nmessage = f"{name} is {age} years old"',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "f['\"].*\\{.*\\}", message: "Use an f-string (prefix the string with f and use {} to embed variables)." },
        { type: "codeContains", value: "message", message: "Assign the result to a variable named 'message'." },
        { type: "matchesRegex", pattern: "\\{name\\}", message: "Embed {name} inside the f-string." },
        { type: "matchesRegex", pattern: "\\{age\\}", message: "Embed {age} inside the f-string." }
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
    instructions: `<p>A list is an ordered collection of items, written with square brackets.</p>
<p>Create a variable <code>fruits</code> containing three strings: <code>"apple"</code>, <code>"banana"</code>, <code>"cherry"</code>. Then create a variable <code>first_fruit</code> that holds the first element.</p>`,
    hints: [
      "fruits = [\"apple\", \"banana\", \"cherry\"]",
      "List indexing starts at 0: first_fruit = fruits[0]"
    ],
    starterCode: "# Create a list and access the first item\n",
    solution: 'fruits = ["apple", "banana", "cherry"]\nfirst_fruit = fruits[0]',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "fruits\\s*=\\s*\\[", message: "Create a list named 'fruits'." },
        { type: "codeContains", value: "apple", message: "Include 'apple' in the list." },
        { type: "matchesRegex", pattern: "first_fruit\\s*=.*fruits\\[0\\]", message: "Access the first element with fruits[0] and store it in 'first_fruit'." }
      ]
    },
    explanation: `<p>Lists use zero-based indexing: the first element is at index <code>0</code>, the second at <code>1</code>, and so on. You can also use negative indices: <code>fruits[-1]</code> is the last item.</p>`
  },
  {
    id: 8,
    title: "List Methods: append and remove",
    difficulty: "easy",
    topic: "Lists",
    level: 1,
    xp: 10,
    instructions: `<p>Lists are mutable -- you can add and remove items after creation.</p>
<ul>
  <li><code>list.append(item)</code> -- adds an item to the end</li>
  <li><code>list.remove(item)</code> -- removes the first occurrence of an item</li>
</ul>
<p>Start with <code>colors = ["red", "green", "blue"]</code>. Append <code>"yellow"</code> to it, then remove <code>"green"</code> from it.</p>`,
    hints: [
      "colors.append(\"yellow\")",
      "colors.remove(\"green\")"
    ],
    starterCode: 'colors = ["red", "green", "blue"]\n# Append "yellow" and remove "green"\n',
    solution: 'colors = ["red", "green", "blue"]\ncolors.append("yellow")\ncolors.remove("green")',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "colors\\.append\\(", message: "Use colors.append() to add 'yellow'." },
        { type: "matchesRegex", pattern: "colors\\.remove\\(", message: "Use colors.remove() to remove 'green'." }
      ]
    },
    explanation: `<p><code>append()</code> adds to the end. <code>remove()</code> finds and deletes the first matching value. Other useful list methods: <code>insert()</code>, <code>pop()</code>, <code>sort()</code>, <code>reverse()</code>.</p>`
  },
  {
    id: 9,
    title: "Tuple Creation",
    difficulty: "easy",
    topic: "Tuples",
    level: 1,
    xp: 10,
    instructions: `<p>A tuple is like a list but <strong>immutable</strong> -- you cannot change it after creation. Tuples use round brackets.</p>
<p>Create a variable <code>coordinates</code> that holds the tuple <code>(10, 20)</code>. Then create <code>x</code> set to the first element and <code>y</code> set to the second.</p>`,
    hints: [
      "coordinates = (10, 20)",
      "x = coordinates[0]  and  y = coordinates[1]"
    ],
    starterCode: "# Create a tuple and unpack it\n",
    solution: "coordinates = (10, 20)\nx = coordinates[0]\ny = coordinates[1]",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "coordinates\\s*=\\s*\\(10,\\s*20\\)", message: "Create a tuple coordinates = (10, 20)." },
        { type: "codeContains", value: "x", message: "Create a variable x from the first element." },
        { type: "codeContains", value: "y", message: "Create a variable y from the second element." }
      ]
    },
    explanation: `<p>Tuples are immutable sequences. They are great for fixed data like coordinates, RGB colors, or records. Because they cannot be changed, they are slightly faster than lists and can be used as dictionary keys.</p>`
  },
  {
    id: 10,
    title: "Dictionary Creation and Access",
    difficulty: "easy",
    topic: "Dictionaries",
    level: 1,
    xp: 10,
    instructions: `<p>A dictionary stores key-value pairs. Keys must be unique. Use curly braces with <code>key: value</code> pairs.</p>
<p>Create a variable <code>person</code> with keys <code>"name"</code> (value: <code>"Bob"</code>), <code>"age"</code> (value: <code>28</code>), and <code>"city"</code> (value: <code>"London"</code>). Then create a variable <code>persons_name</code> that accesses the <code>"name"</code> key.</p>`,
    hints: [
      "person = {\"name\": \"Bob\", \"age\": 28, \"city\": \"London\"}",
      "persons_name = person[\"name\"]"
    ],
    starterCode: "# Create a dictionary and access a key\n",
    solution: 'person = {"name": "Bob", "age": 28, "city": "London"}\npersons_name = person["name"]',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "person\\s*=\\s*\\{", message: "Create a dictionary named 'person'." },
        { type: "codeContains", value: '"name"', message: "Include a 'name' key in the dictionary." },
        { type: "matchesRegex", pattern: "persons_name\\s*=.*person\\[", message: "Access person['name'] and store it in 'persons_name'." }
      ]
    },
    explanation: `<p>Dictionaries are key-value stores. Access values with <code>dict[key]</code> or the safer <code>dict.get(key)</code> which returns <code>None</code> instead of raising an error if the key is missing.</p>`
  },
  {
    id: 11,
    title: "Dictionary Methods",
    difficulty: "easy",
    topic: "Dictionaries",
    level: 1,
    xp: 10,
    instructions: `<p>Dictionaries have useful methods for inspecting their contents:</p>
<ul>
  <li><code>.keys()</code> -- returns all keys</li>
  <li><code>.values()</code> -- returns all values</li>
  <li><code>.items()</code> -- returns all key-value pairs as tuples</li>
</ul>
<p>Given <code>scores = {"alice": 95, "bob": 87, "charlie": 92}</code>, create three variables: <code>all_keys</code>, <code>all_values</code>, and <code>all_items</code> using the three methods above.</p>`,
    hints: [
      "all_keys = scores.keys()",
      "all_values = scores.values()",
      "all_items = scores.items()"
    ],
    starterCode: 'scores = {"alice": 95, "bob": 87, "charlie": 92}\n# Get keys, values, and items\n',
    solution: 'scores = {"alice": 95, "bob": 87, "charlie": 92}\nall_keys = scores.keys()\nall_values = scores.values()\nall_items = scores.items()',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "\\.keys\\(\\)", message: "Call .keys() to get all keys." },
        { type: "matchesRegex", pattern: "\\.values\\(\\)", message: "Call .values() to get all values." },
        { type: "matchesRegex", pattern: "\\.items\\(\\)", message: "Call .items() to get all key-value pairs." }
      ]
    },
    explanation: `<p>These three methods let you iterate over different aspects of a dictionary. They return view objects, not lists -- wrap them in <code>list()</code> if you need a plain list.</p>`
  },
  {
    id: 12,
    title: "Set Creation and Membership",
    difficulty: "easy",
    topic: "Sets",
    level: 1,
    xp: 10,
    instructions: `<p>A set is an unordered collection of <strong>unique</strong> values. Duplicates are automatically removed.</p>
<p>Create a variable <code>unique_numbers</code> as a set containing <code>1, 2, 3, 2, 1</code>. Then use the <code>in</code> operator to create a boolean variable <code>has_three</code> that checks if <code>3</code> is in the set.</p>`,
    hints: [
      "unique_numbers = {1, 2, 3, 2, 1}  (duplicates are dropped automatically)",
      "has_three = 3 in unique_numbers"
    ],
    starterCode: "# Create a set and check membership\n",
    solution: "unique_numbers = {1, 2, 3, 2, 1}\nhas_three = 3 in unique_numbers",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "unique_numbers\\s*=\\s*\\{", message: "Create a set named 'unique_numbers'." },
        { type: "matchesRegex", pattern: "in\\s+unique_numbers", message: "Use the 'in' operator to check membership." },
        { type: "codeContains", value: "has_three", message: "Store the result in 'has_three'." }
      ]
    },
    explanation: `<p>Sets automatically deduplicate. <code>{1, 2, 3, 2, 1}</code> stores only <code>{1, 2, 3}</code>. The <code>in</code> operator tests membership and is very fast on sets (O(1) average case).</p>`
  },
  {
    id: 13,
    title: "if / elif / else Conditionals",
    difficulty: "easy",
    topic: "Conditionals",
    level: 1,
    xp: 10,
    instructions: `<p>Use <code>if</code>, <code>elif</code>, and <code>else</code> to run different code depending on conditions.</p>
<p>Given a variable <code>score = 75</code>, write a conditional that sets <code>grade</code> to:</p>
<ul>
  <li><code>"A"</code> if score >= 90</li>
  <li><code>"B"</code> if score >= 80</li>
  <li><code>"C"</code> if score >= 70</li>
  <li><code>"F"</code> otherwise</li>
</ul>`,
    hints: [
      "Start with: if score >= 90:",
      "Use elif for the next conditions, else for the fallback."
    ],
    starterCode: "score = 75\n# Set grade based on the score\n",
    solution: 'score = 75\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelse:\n    grade = "F"',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "if\\s+score\\s*[><=!]", message: "Start with an 'if' condition comparing 'score' (e.g. if score >= 90:)." },
        { type: "codeContains", value: "elif", message: "Use 'elif' for intermediate conditions." },
        { type: "codeContains", value: "else", message: "Add an 'else' block for the fallback case." },
        { type: "codeContains", value: "grade", message: "Assign the result to a variable named 'grade'." }
      ]
    },
    explanation: `<p>Python uses indentation (4 spaces) to define code blocks. <code>elif</code> is short for "else if". Conditions are checked from top to bottom -- the first one that is true runs, and the rest are skipped.</p>`
  },
  {
    id: 14,
    title: "for Loop Over a List",
    difficulty: "easy",
    topic: "Loops",
    level: 1,
    xp: 10,
    instructions: `<p>A <code>for</code> loop iterates over each item in a sequence.</p>
<p>Given the list <code>animals = ["cat", "dog", "bird"]</code>, write a for loop that builds a new list <code>upper_animals</code> where each animal name is uppercased using <code>.upper()</code>. You can use <code>append()</code> inside the loop.</p>`,
    hints: [
      "Start with: upper_animals = []",
      "for animal in animals:  then upper_animals.append(animal.upper())"
    ],
    starterCode: 'animals = ["cat", "dog", "bird"]\n# Build upper_animals using a for loop\nupper_animals = []\n',
    solution: 'animals = ["cat", "dog", "bird"]\nupper_animals = []\nfor animal in animals:\n    upper_animals.append(animal.upper())',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "for\\s+\\w+\\s+in\\s+animals\\s*:", message: "Write a for loop iterating over 'animals' (don't forget the colon)." },
        { type: "matchesRegex", pattern: "\\.upper\\(\\)", message: "Call .upper() to uppercase each name." },
        { type: "codeContains", value: "upper_animals", message: "Store results in 'upper_animals'." }
      ]
    },
    explanation: `<p>The <code>for x in iterable</code> pattern is the standard way to loop in Python. The loop variable (<code>animal</code> here) takes on each value in turn. This same pattern works on lists, strings, dictionaries, and any other iterable.</p>`
  },
  {
    id: 15,
    title: "while Loop with Counter",
    difficulty: "easy",
    topic: "Loops",
    level: 1,
    xp: 10,
    instructions: `<p>A <code>while</code> loop runs as long as a condition is true. You must update the condition inside the loop or it will run forever.</p>
<p>Write a while loop that starts with <code>count = 0</code> and increments it by 1 each iteration until <code>count</code> reaches <code>5</code>. When the loop finishes, <code>count</code> should equal <code>5</code>.</p>`,
    hints: [
      "while count < 5:  then increment: count += 1",
      "count += 1 is shorthand for count = count + 1"
    ],
    starterCode: "count = 0\n# Loop until count reaches 5\n",
    solution: "count = 0\nwhile count < 5:\n    count += 1",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "while\\s+count", message: "Write a while loop that checks 'count'." },
        { type: "matchesRegex", pattern: "count\\s*\\+=\\s*1|count\\s*=\\s*count\\s*\\+\\s*1", message: "Increment count by 1 inside the loop." }
      ]
    },
    explanation: `<p>The <code>while</code> loop is useful when you do not know in advance how many iterations you need. Always ensure the condition eventually becomes false, otherwise you get an infinite loop.</p>`
  },
  {
    id: 16,
    title: "Nested List Access",
    difficulty: "easy",
    topic: "Lists",
    level: 1,
    xp: 10,
    instructions: `<p>Lists can contain other lists (nested lists). Access nested items by chaining index brackets.</p>
<p>Given <code>matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]</code>, create a variable <code>middle</code> that holds the center element <code>5</code> (row 1, column 1).</p>`,
    hints: [
      "matrix[1] gives you [4, 5, 6]",
      "matrix[1][1] gives you 5"
    ],
    starterCode: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n# Get the center element (5)\n",
    solution: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nmiddle = matrix[1][1]",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "middle\\s*=.*matrix\\[1\\]\\[1\\]", message: "Access matrix[1][1] to get the center element." }
      ]
    },
    explanation: `<p>Nested indexing: <code>matrix[row][col]</code>. <code>matrix[1]</code> gets the second row <code>[4, 5, 6]</code>, then <code>[1]</code> gets the second element of that row: <code>5</code>.</p>`
  },
  {
    id: 17,
    title: "String Methods",
    difficulty: "easy",
    topic: "Strings",
    level: 1,
    xp: 10,
    instructions: `<p>Strings have many built-in methods. Here are three common ones:</p>
<ul>
  <li><code>.upper()</code> -- convert to uppercase</li>
  <li><code>.strip()</code> -- remove leading/trailing whitespace</li>
  <li><code>.split(sep)</code> -- split into a list by a separator</li>
</ul>
<p>Given <code>raw = "  hello world  "</code>, create three variables: <code>shouted</code> (uppercased), <code>trimmed</code> (stripped), and <code>words</code> (split by space after stripping).</p>`,
    hints: [
      "shouted = raw.upper()",
      "trimmed = raw.strip()",
      "words = raw.strip().split(\" \")"
    ],
    starterCode: 'raw = "  hello world  "\n# Create shouted, trimmed, and words\n',
    solution: 'raw = "  hello world  "\nshouted = raw.upper()\ntrimmed = raw.strip()\nwords = raw.strip().split(" ")',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "raw\\.(upper|strip|split)\\(", message: "Call .upper(), .strip(), or .split() on 'raw'." },
        { type: "matchesRegex", pattern: "\\.upper\\(\\)", message: "Use .upper() to create 'shouted'." },
        { type: "matchesRegex", pattern: "\\.strip\\(\\)", message: "Use .strip() to create 'trimmed'." },
        { type: "matchesRegex", pattern: "\\.split\\(", message: "Use .split() to create 'words'." }
      ]
    },
    explanation: `<p>String methods do not modify the original string -- they return a new one. You can chain them: <code>raw.strip().split()</code> first strips whitespace, then splits on whitespace (the default separator when no argument is given).</p>`
  },
  {
    id: 18,
    title: "Type Conversion",
    difficulty: "easy",
    topic: "Variables",
    level: 1,
    xp: 10,
    instructions: `<p>Python provides built-in functions to convert between types:</p>
<ul>
  <li><code>int("5")</code> -- string to integer</li>
  <li><code>float("3.14")</code> -- string to float</li>
  <li><code>str(42)</code> -- number to string</li>
</ul>
<p>Given <code>num_str = "100"</code>, create <code>num_int</code> (convert to int) and <code>num_float</code> (convert to float). Also create <code>back_to_str</code> by converting <code>num_int</code> back to a string.</p>`,
    hints: [
      "num_int = int(num_str)",
      "num_float = float(num_str)",
      "back_to_str = str(num_int)"
    ],
    starterCode: 'num_str = "100"\n# Convert to int, float, and back to string\n',
    solution: 'num_str = "100"\nnum_int = int(num_str)\nnum_float = float(num_str)\nback_to_str = str(num_int)',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "int\\s*\\(\\s*\\w+", message: "Use int() with an argument to convert to an integer." },
        { type: "matchesRegex", pattern: "float\\(", message: "Use float() to convert to a float." },
        { type: "matchesRegex", pattern: "str\\(", message: "Use str() to convert back to a string." }
      ]
    },
    explanation: `<p>Type conversion (casting) is common when handling user input, which always arrives as a string. <code>int()</code> raises a <code>ValueError</code> if the string cannot be converted -- use try/except to handle that safely.</p>`
  },
  {
    id: 19,
    title: "Multiple Assignment and Swap",
    difficulty: "easy",
    topic: "Variables",
    level: 1,
    xp: 10,
    instructions: `<p>Python lets you assign multiple variables in one line using tuple unpacking.</p>
<p>Create variables <code>a = 10</code> and <code>b = 20</code> using a single assignment line. Then swap their values in another single line (without a temporary variable).</p>`,
    hints: [
      "a, b = 10, 20  assigns both at once",
      "a, b = b, a  swaps them in one line"
    ],
    starterCode: "# Assign a and b in one line, then swap them\n",
    solution: "a, b = 10, 20\na, b = b, a",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "a,\\s*b\\s*=|a\\s*=.*b\\s*=", message: "Assign both a and b." },
        { type: "matchesRegex", pattern: "a,\\s*b\\s*=\\s*b,\\s*a", message: "Swap a and b using tuple unpacking: a, b = b, a" }
      ]
    },
    explanation: `<p>Tuple unpacking lets you assign multiple variables from a sequence. The swap trick <code>a, b = b, a</code> works because Python evaluates the right side completely before assigning, so no temporary variable is needed.</p>`
  },
  {
    id: 20,
    title: "Input Simulation",
    difficulty: "easy",
    topic: "Variables",
    level: 1,
    xp: 10,
    instructions: `<p>In real Python programs, <code>input()</code> reads from the user. Since we cannot run real Python here, we simulate it by pre-assigning the value.</p>
<p>Imagine a user typed <code>"42"</code> as input. Create a variable <code>user_input = "42"</code> (simulating the input). Then convert it to an integer named <code>number</code>, and create <code>doubled</code> which is <code>number * 2</code>.</p>`,
    hints: [
      "user_input = \"42\"",
      "number = int(user_input)",
      "doubled = number * 2"
    ],
    starterCode: "# Simulate user input and process it\n",
    solution: 'user_input = "42"\nnumber = int(user_input)\ndoubled = number * 2',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "user_input\\s*=\\s*['\"]42['\"]", message: "Set user_input to the string \"42\"." },
        { type: "matchesRegex", pattern: "number\\s*=\\s*int\\(", message: "Convert user_input to int and store in 'number'." },
        { type: "matchesRegex", pattern: "doubled\\s*=.*\\*\\s*2|doubled\\s*=\\s*2\\s*\\*", message: "Create 'doubled' by multiplying number by 2." }
      ]
    },
    explanation: `<p>Real web applications process user input constantly. Always convert and validate input before using it -- never trust that a string is a valid number until you have tried to convert it.</p>`
  }
];
