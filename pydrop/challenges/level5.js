window.LEVEL5 = [
  {
    id: 81,
    title: "Flask: Create the App",
    difficulty: "easy",
    topic: "Flask",
    level: 5,
    xp: 10,
    instructions: `<p>Flask is a lightweight Python web framework. Creating a Flask app takes two lines.</p>
<p>Import <code>Flask</code> from <code>flask</code>. Create a Flask application instance named <code>app</code> using <code>Flask(__name__)</code>.</p>`,
    hints: [
      "from flask import Flask",
      "app = Flask(__name__)"
    ],
    starterCode: "# Create a Flask app instance\n",
    solution: "from flask import Flask\napp = Flask(__name__)",
    validation: {
      checks: [
        { type: "hasImport", module: "flask", message: "Import Flask from flask." },
        { type: "hasFlaskApp", message: "Create a Flask app with Flask(__name__)." },
        { type: "codeContains", value: "app", message: "Assign the Flask instance to 'app'." }
      ]
    },
    explanation: `<p><code>Flask(__name__)</code> creates the application. The <code>__name__</code> argument tells Flask where to look for templates and static files relative to the current module. Every Flask project starts with this line.</p>`
  },
  {
    id: 82,
    title: "Flask: Define a GET Route",
    difficulty: "easy",
    topic: "Flask",
    level: 5,
    xp: 10,
    instructions: `<p>A route maps a URL path to a Python function. Use the <code>@app.route()</code> decorator.</p>
<p>Given an existing <code>app</code>, define a route for <code>/hello</code> that returns the string <code>"Hello, World!"</code>. Name the function <code>hello</code>.</p>`,
    hints: [
      "@app.route(\"/hello\")",
      "def hello():",
      "    return \"Hello, World!\""
    ],
    starterCode: "from flask import Flask\napp = Flask(__name__)\n\n# Add a /hello route\n",
    solution: 'from flask import Flask\napp = Flask(__name__)\n\n@app.route("/hello")\ndef hello():\n    return "Hello, World!"',
    validation: {
      checks: [
        { type: "hasFlaskRoute", message: "Use @app.route() to define the route." },
        { type: "matchesRegex", pattern: "@app\\.route\\(['\"]/?hello['\"]\\)", message: "Route the path to exactly /hello (not /hello-world etc.)." },
        { type: "hasValidDef", name: "hello", message: "Name the view function 'hello' and include the colon: def hello():" },
        { type: "hasReturn", message: "Return a response from the function." }
      ]
    },
    explanation: `<p>The <code>@app.route("/hello")</code> decorator registers the function as the handler for GET requests to <code>/hello</code>. Flask infers GET by default. To handle POST as well, use <code>methods=["GET", "POST"]</code>.</p>`
  },
  {
    id: 83,
    title: "Flask: Dynamic Route",
    difficulty: "easy",
    topic: "Flask",
    level: 5,
    xp: 10,
    instructions: `<p>Dynamic routes extract values from the URL path. Wrap the variable name in angle brackets: <code>&lt;variable&gt;</code>. The value is passed as a parameter to the view function.</p>
<p>Define a route <code>/greet/&lt;name&gt;</code> whose view function <code>greet_user</code> takes <code>name</code> as a parameter and returns <code>f"Hello, {name}!"</code>.</p>`,
    hints: [
      "@app.route(\"/greet/<name>\")",
      "def greet_user(name):",
      "    return f\"Hello, {name}!\""
    ],
    starterCode: "from flask import Flask\napp = Flask(__name__)\n\n# Add a /greet/<name> dynamic route\n",
    solution: 'from flask import Flask\napp = Flask(__name__)\n\n@app.route("/greet/<name>")\ndef greet_user(name):\n    return f"Hello, {name}!"',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "@app\\.route\\(.*<\\w+>", message: "Use <variable> syntax in the route path." },
        { type: "hasValidDef", name: "greet_user", message: "Name the function 'greet_user' with a colon: def greet_user(name):" },
        { type: "matchesRegex", pattern: "def\\s+greet_user\\s*\\(\\s*name\\s*\\)", message: "Accept 'name' as a function parameter." },
        { type: "matchesRegex", pattern: "f['\"]", message: "Return an f-string response." }
      ]
    },
    explanation: `<p>Flask injects the URL variable as a keyword argument to the view function. You can add type converters: <code>&lt;int:user_id&gt;</code> converts the value to an integer automatically and returns a 404 if it cannot.</p>`
  },
  {
    id: 84,
    title: "Flask: Return JSON",
    difficulty: "easy",
    topic: "Flask",
    level: 5,
    xp: 10,
    instructions: `<p>Use <code>jsonify()</code> to return a JSON response from a Flask route. It sets the correct <code>Content-Type: application/json</code> header automatically.</p>
<p>Define a route <code>/api/status</code> that returns a JSON object with keys <code>"status"</code> (value: <code>"ok"</code>) and <code>"version"</code> (value: <code>"1.0"</code>).</p>`,
    hints: [
      "from flask import Flask, jsonify",
      "@app.route(\"/api/status\")",
      "def status(): return jsonify({\"status\": \"ok\", \"version\": \"1.0\"})"
    ],
    starterCode: "from flask import Flask\napp = Flask(__name__)\n\n# Add /api/status route returning JSON\n",
    solution: 'from flask import Flask, jsonify\napp = Flask(__name__)\n\n@app.route("/api/status")\ndef status():\n    return jsonify({"status": "ok", "version": "1.0"})',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "from\\s+flask\\s+import.*jsonify", message: "Import jsonify from flask." },
        { type: "matchesRegex", pattern: "jsonify\\s*\\(\\s*\\{", message: "Pass a dictionary to jsonify(), e.g. jsonify({...})." },
        { type: "matchesRegex", pattern: "@app\\.route\\(.*api/status", message: "Route to /api/status." }
      ]
    },
    explanation: `<p><code>jsonify()</code> accepts a dictionary or keyword arguments and returns a <code>Response</code> object with the JSON body and correct headers. Never just return a raw string of JSON -- use <code>jsonify()</code>.</p>`
  },
  {
    id: 85,
    title: "Flask: Query Parameters",
    difficulty: "medium",
    topic: "Flask",
    level: 5,
    xp: 20,
    instructions: `<p>Query parameters (the <code>?key=value</code> part of a URL) are accessed via <code>request.args</code> in Flask.</p>
<p>Import <code>request</code> from flask. Define a route <code>/search</code> that reads a query parameter <code>q</code> (default: empty string) and returns a JSON response with key <code>"query"</code> containing the value of <code>q</code>.</p>`,
    hints: [
      "from flask import Flask, jsonify, request",
      "@app.route(\"/search\")",
      "def search():",
      "    q = request.args.get(\"q\", \"\")",
      "    return jsonify({\"query\": q})"
    ],
    starterCode: "from flask import Flask, jsonify\napp = Flask(__name__)\n\n# Add /search route with query parameter\n",
    solution: 'from flask import Flask, jsonify, request\napp = Flask(__name__)\n\n@app.route("/search")\ndef search():\n    q = request.args.get("q", "")\n    return jsonify({"query": q})',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "from\\s+flask\\s+import.*request", message: "Import request from flask." },
        { type: "matchesRegex", pattern: "request\\.args\\.get\\s*\\(['\"]q['\"]", message: "Use request.args.get('q', ...) to read the 'q' query parameter." },
        { type: "codeContains", value: "jsonify(", message: "Return a JSON response with jsonify()." }
      ]
    },
    explanation: `<p><code>request.args</code> is a dictionary-like object. Use <code>.get(key, default)</code> to safely read params that might be absent. For POST body data, use <code>request.json</code> (JSON body) or <code>request.form</code> (form data).</p>`
  },
  {
    id: 86,
    title: "Flask: Blueprint",
    difficulty: "medium",
    topic: "Flask",
    level: 5,
    xp: 20,
    instructions: `<p>Blueprints let you split a Flask app into reusable components. Each blueprint has its own routes.</p>
<p>Create a blueprint named <code>users_bp</code> with a URL prefix of <code>/users</code>. Add a route <code>/</code> (which resolves to <code>/users/</code>) named <code>list_users</code> that returns the string <code>"user list"</code>.</p>`,
    hints: [
      "from flask import Blueprint",
      "users_bp = Blueprint(\"users\", __name__, url_prefix=\"/users\")",
      "@users_bp.route(\"/\")",
      "def list_users(): return \"user list\""
    ],
    starterCode: "from flask import Blueprint\n\n# Create a blueprint and add a route\n",
    solution: 'from flask import Blueprint\n\nusers_bp = Blueprint("users", __name__, url_prefix="/users")\n\n@users_bp.route("/")\ndef list_users():\n    return "user list"',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "from\\s+flask\\s+import.*Blueprint|Blueprint\\s*=", message: "Import Blueprint from flask." },
        { type: "matchesRegex", pattern: "Blueprint\\(['\"]\\w+['\"]", message: "Create a Blueprint instance." },
        { type: "matchesRegex", pattern: "url_prefix\\s*=", message: "Set a url_prefix on the blueprint." },
        { type: "matchesRegex", pattern: "@\\w+_bp\\.route|@users_bp\\.route", message: "Define a route on the blueprint." }
      ]
    },
    explanation: `<p>Blueprints are registered on the main app with <code>app.register_blueprint(users_bp)</code>. They are the standard way to organise routes in a real Flask project -- one blueprint per feature area.</p>`
  },
  {
    id: 87,
    title: "Flask: Jinja2 Template",
    difficulty: "medium",
    topic: "Flask",
    level: 5,
    xp: 20,
    instructions: `<p>Flask uses Jinja2 templates to render HTML. Use <code>render_template()</code> to render a template file and pass data to it.</p>
<p>Import <code>render_template</code> from flask. Define a route <code>/profile</code> that calls <code>render_template("profile.html", username="Alice", score=100)</code> and returns the result.</p>`,
    hints: [
      "from flask import Flask, render_template",
      "@app.route(\"/profile\")",
      "def profile():",
      "    return render_template(\"profile.html\", username=\"Alice\", score=100)"
    ],
    starterCode: "from flask import Flask\napp = Flask(__name__)\n\n# Add /profile route using render_template\n",
    solution: 'from flask import Flask, render_template\napp = Flask(__name__)\n\n@app.route("/profile")\ndef profile():\n    return render_template("profile.html", username="Alice", score=100)',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "from\\s+flask\\s+import.*render_template", message: "Import render_template from flask." },
        { type: "codeContains", value: "render_template(", message: "Call render_template()." },
        { type: "matchesRegex", pattern: "render_template\\s*\\(['\"][\\w/]+\\.html['\"]\\s*,", message: "Pass the template filename then keyword arguments to render_template()." },
        { type: "matchesRegex", pattern: "username\\s*=|score\\s*=", message: "Pass context variables (username, score) to the template." }
      ]
    },
    explanation: `<p>Template files live in a <code>templates/</code> folder. Any keyword arguments you pass to <code>render_template()</code> become variables available in the template, accessible with Jinja2 syntax like <code>{{ username }}</code>.</p>`
  },
  {
    id: 88,
    title: "FastAPI: Create the App",
    difficulty: "easy",
    topic: "FastAPI",
    level: 5,
    xp: 10,
    instructions: `<p>FastAPI is a modern, high-performance Python web framework. Creating an app is similar to Flask but uses the <code>FastAPI</code> class.</p>
<p>Import <code>FastAPI</code> from <code>fastapi</code>. Create an application instance named <code>app</code>.</p>`,
    hints: [
      "from fastapi import FastAPI",
      "app = FastAPI()"
    ],
    starterCode: "# Create a FastAPI app instance\n",
    solution: "from fastapi import FastAPI\napp = FastAPI()",
    validation: {
      checks: [
        { type: "hasImport", module: "fastapi", message: "Import FastAPI from fastapi." },
        { type: "hasFastAPIApp", message: "Create a FastAPI instance with FastAPI()." },
        { type: "codeContains", value: "app", message: "Assign the instance to 'app'." }
      ]
    },
    explanation: `<p>FastAPI automatically generates interactive API docs at <code>/docs</code> (Swagger UI) and <code>/redoc</code>. Unlike Flask, FastAPI is built for async from the ground up and uses type hints for automatic validation.</p>`
  },
  {
    id: 89,
    title: "FastAPI: GET Endpoint",
    difficulty: "easy",
    topic: "FastAPI",
    level: 5,
    xp: 10,
    instructions: `<p>FastAPI route decorators include the HTTP method: <code>@app.get()</code>, <code>@app.post()</code>, etc.</p>
<p>Given an existing <code>app</code>, define a GET endpoint at <code>/</code> named <code>root</code> that returns the dictionary <code>{"message": "Welcome to the API"}</code>.</p>`,
    hints: [
      "@app.get(\"/\")",
      "def root():",
      "    return {\"message\": \"Welcome to the API\"}"
    ],
    starterCode: "from fastapi import FastAPI\napp = FastAPI()\n\n# Add a GET / endpoint\n",
    solution: 'from fastapi import FastAPI\napp = FastAPI()\n\n@app.get("/")\ndef root():\n    return {"message": "Welcome to the API"}',
    validation: {
      checks: [
        { type: "hasFastAPIRoute", message: "Use @app.get() to define a GET route." },
        { type: "matchesRegex", pattern: "@app\\.get\\(['\"]/?['\"]", message: "Route to the / path." },
        { type: "hasValidDef", name: "root", message: "Name the function 'root' with a colon: def root():" },
        { type: "matchesRegex", pattern: "return\\s*\\{", message: "Return a dictionary (FastAPI auto-converts to JSON)." }
      ]
    },
    explanation: `<p>FastAPI automatically serialises Python dictionaries to JSON responses. Unlike Flask, there is no need for <code>jsonify()</code> -- just return a dict. You can also return Pydantic models for type-safe responses.</p>`
  },
  {
    id: 90,
    title: "FastAPI: Path Parameter",
    difficulty: "easy",
    topic: "FastAPI",
    level: 5,
    xp: 10,
    instructions: `<p>Path parameters in FastAPI use the same <code>{variable}</code> syntax in the path, and the function parameter's type hint is used for automatic validation.</p>
<p>Define a GET endpoint at <code>/items/{item_id}</code>. The function <code>get_item</code> should accept <code>item_id: int</code> and return <code>{"item_id": item_id}</code>.</p>`,
    hints: [
      "@app.get(\"/items/{item_id}\")",
      "def get_item(item_id: int):",
      "    return {\"item_id\": item_id}"
    ],
    starterCode: "from fastapi import FastAPI\napp = FastAPI()\n\n# Add GET /items/{item_id} endpoint\n",
    solution: 'from fastapi import FastAPI\napp = FastAPI()\n\n@app.get("/items/{item_id}")\ndef get_item(item_id: int):\n    return {"item_id": item_id}',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "@app\\.get\\(.*\\{\\w+\\}", message: "Use {variable} syntax in the route path." },
        { type: "matchesRegex", pattern: "def\\s+get_item\\s*\\(\\s*item_id\\s*:\\s*int", message: "Annotate item_id as int." },
        { type: "hasValidDef", name: "get_item", message: "Name the function 'get_item' with a colon: def get_item(item_id: int):" },
        { type: "matchesRegex", pattern: "return.*item_id|\\{['\"]item_id['\"]", message: "Return item_id in the response dict." }
      ]
    },
    explanation: `<p>FastAPI uses the type hint <code>int</code> to automatically validate the path parameter. If someone sends a non-integer, FastAPI returns a 422 Unprocessable Entity error automatically -- no manual validation needed.</p>`
  },
  {
    id: 91,
    title: "FastAPI: Query Parameter",
    difficulty: "easy",
    topic: "FastAPI",
    level: 5,
    xp: 10,
    instructions: `<p>In FastAPI, any function parameter that is not a path parameter is automatically treated as a query parameter.</p>
<p>Define a GET endpoint at <code>/search</code>. The function <code>search</code> should accept a query parameter <code>q: str</code> with a default of <code>""</code> and a <code>limit: int</code> with a default of <code>10</code>. Return <code>{"q": q, "limit": limit}</code>.</p>`,
    hints: [
      "@app.get(\"/search\")",
      "def search(q: str = \"\", limit: int = 10):",
      "    return {\"q\": q, \"limit\": limit}"
    ],
    starterCode: "from fastapi import FastAPI\napp = FastAPI()\n\n# Add GET /search with query parameters\n",
    solution: 'from fastapi import FastAPI\napp = FastAPI()\n\n@app.get("/search")\ndef search(q: str = "", limit: int = 10):\n    return {"q": q, "limit": limit}',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "@app\\.get\\(.*search", message: "Route to /search." },
        { type: "matchesRegex", pattern: "q\\s*:\\s*str\\s*=", message: "Define q as a string query parameter with a default." },
        { type: "matchesRegex", pattern: "limit\\s*:\\s*int\\s*=\\s*10", message: "Define limit as int with a default of 10: limit: int = 10." }
      ]
    },
    explanation: `<p>FastAPI detects query parameters automatically. Parameters with defaults are optional; parameters without defaults are required. You can access <code>/search?q=python&limit=5</code> with no extra code.</p>`
  },
  {
    id: 92,
    title: "FastAPI: Pydantic Request Model",
    difficulty: "medium",
    topic: "FastAPI",
    level: 5,
    xp: 20,
    instructions: `<p>Pydantic models define the shape and types of request bodies. FastAPI uses them to validate incoming JSON automatically.</p>
<p>Import <code>BaseModel</code> from <code>pydantic</code>. Define a Pydantic model <code>Item</code> with fields: <code>name: str</code>, <code>price: float</code>, and <code>in_stock: bool = True</code>.</p>`,
    hints: [
      "from pydantic import BaseModel",
      "class Item(BaseModel):",
      "    name: str",
      "    price: float",
      "    in_stock: bool = True"
    ],
    starterCode: "# Import BaseModel and define Item\n",
    solution: "from pydantic import BaseModel\n\nclass Item(BaseModel):\n    name: str\n    price: float\n    in_stock: bool = True",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "from\\s+pydantic\\s+import.*BaseModel", message: "Import BaseModel from pydantic." },
        { type: "hasPydanticModel", message: "Define a class inheriting from BaseModel." },
        { type: "matchesRegex", pattern: "name\\s*:\\s*str", message: "Declare name: str field." },
        { type: "matchesRegex", pattern: "price\\s*:\\s*float", message: "Declare price: float field." },
        { type: "matchesRegex", pattern: "in_stock\\s*:\\s*bool\\s*=\\s*True", message: "Declare in_stock: bool = True with the default value." }
      ]
    },
    explanation: `<p>Pydantic validates the incoming JSON against the model. If a required field is missing or the wrong type, FastAPI returns a 422 error with a clear description of what is wrong. No manual validation code needed.</p>`
  },
  {
    id: 93,
    title: "FastAPI: POST Endpoint with Body",
    difficulty: "medium",
    topic: "FastAPI",
    level: 5,
    xp: 20,
    instructions: `<p>Use a Pydantic model as a POST endpoint parameter to receive and validate a JSON request body.</p>
<p>Given the <code>Item</code> model, define a POST endpoint at <code>/items/</code> named <code>create_item</code> that accepts an <code>Item</code> body and returns <code>{"created": item.name}</code>.</p>`,
    hints: [
      "@app.post(\"/items/\")",
      "def create_item(item: Item):",
      "    return {\"created\": item.name}"
    ],
    starterCode: "from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Item(BaseModel):\n    name: str\n    price: float\n\n# Add POST /items/ endpoint\n",
    solution: 'from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Item(BaseModel):\n    name: str\n    price: float\n\n@app.post("/items/")\ndef create_item(item: Item):\n    return {"created": item.name}',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "@app\\.post\\(", message: "Use @app.post() for the POST route." },
        { type: "matchesRegex", pattern: "def\\s+create_item\\s*\\(\\s*\\w+\\s*:\\s*Item\\s*\\)", message: "Accept an Item body in the function signature." },
        { type: "matchesRegex", pattern: "item\\.name", message: "Access item.name in the response." }
      ]
    },
    explanation: `<p>When a Pydantic model appears as a parameter, FastAPI knows it is the request body. It reads the JSON body, validates it against the model, and passes the validated model instance to your function.</p>`
  },
  {
    id: 94,
    title: "FastAPI: Response Model",
    difficulty: "medium",
    topic: "FastAPI",
    level: 5,
    xp: 20,
    instructions: `<p>Use the <code>response_model=</code> parameter on a route decorator to specify what the response looks like. FastAPI filters and validates the response against this model.</p>
<p>Define a Pydantic model <code>UserOut</code> with <code>id: int</code> and <code>name: str</code>. Create a GET endpoint at <code>/users/{user_id}</code> with <code>response_model=UserOut</code>. Return a dict that matches the model.</p>`,
    hints: [
      "class UserOut(BaseModel):",
      "    id: int",
      "    name: str",
      "@app.get(\"/users/{user_id}\", response_model=UserOut)"
    ],
    starterCode: "from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\n# Define UserOut and a GET /users/{user_id} endpoint\n",
    solution: 'from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass UserOut(BaseModel):\n    id: int\n    name: str\n\n@app.get("/users/{user_id}", response_model=UserOut)\ndef get_user(user_id: int):\n    return {"id": user_id, "name": "Alice"}',
    validation: {
      checks: [
        { type: "hasPydanticModel", message: "Define a Pydantic model for the response." },
        { type: "matchesRegex", pattern: "response_model\\s*=", message: "Pass response_model= to the route decorator." },
        { type: "matchesRegex", pattern: "@app\\.get\\(.*users.*\\{", message: "Route to /users/{user_id}." }
      ]
    },
    explanation: `<p><code>response_model</code> tells FastAPI to filter the response to only include fields defined in the model. This is critical for security -- you can return a full database object but only expose the safe fields.</p>`
  },
  {
    id: 95,
    title: "FastAPI: Async Endpoint",
    difficulty: "medium",
    topic: "FastAPI",
    level: 5,
    xp: 20,
    instructions: `<p>FastAPI supports both sync and async route functions. Use <code>async def</code> for I/O-bound operations like database calls or HTTP requests.</p>
<p>Define an async GET endpoint at <code>/async-data</code> named <code>get_async_data</code>. Inside, simulate an async database call with <code>await asyncio.sleep(0)</code>, then return <code>{"result": "async data"}</code>.</p>`,
    hints: [
      "import asyncio",
      "@app.get(\"/async-data\")",
      "async def get_async_data():",
      "    await asyncio.sleep(0)",
      "    return {\"result\": \"async data\"}"
    ],
    starterCode: "from fastapi import FastAPI\nimport asyncio\n\napp = FastAPI()\n\n# Add an async GET /async-data endpoint\n",
    solution: 'from fastapi import FastAPI\nimport asyncio\n\napp = FastAPI()\n\n@app.get("/async-data")\nasync def get_async_data():\n    await asyncio.sleep(0)\n    return {"result": "async data"}',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "@app\\.get\\(", message: "Use @app.get() specifically (not @app.post or others)." },
        { type: "hasAsync", message: "Define the function with 'async def'." },
        { type: "hasAwait", message: "Use 'await' inside the async function." }
      ]
    },
    explanation: `<p>Use <code>async def</code> for routes that call async libraries (async database drivers, httpx for HTTP calls). Use regular <code>def</code> for CPU-bound tasks or when calling synchronous libraries. FastAPI handles both correctly.</p>`
  },
  {
    id: 96,
    title: "Django: Model Definition",
    difficulty: "medium",
    topic: "Django",
    level: 5,
    xp: 20,
    instructions: `<p>In Django, a model is a Python class that defines the structure of a database table. Each class attribute represents a column.</p>
<p>Import <code>models</code> from <code>django.db</code>. Define a model class <code>Article</code> that inherits from <code>models.Model</code> with fields: <code>title</code> (CharField, max_length=200), <code>body</code> (TextField), and <code>created_at</code> (DateTimeField, auto_now_add=True).</p>`,
    hints: [
      "from django.db import models",
      "class Article(models.Model):",
      "    title = models.CharField(max_length=200)",
      "    body = models.TextField()",
      "    created_at = models.DateTimeField(auto_now_add=True)"
    ],
    starterCode: "# Define a Django Article model\n",
    solution: "from django.db import models\n\nclass Article(models.Model):\n    title = models.CharField(max_length=200)\n    body = models.TextField()\n    created_at = models.DateTimeField(auto_now_add=True)",
    validation: {
      checks: [
        { type: "hasImport", module: "django.db", message: "Import models from django.db." },
        { type: "hasDjangoModel", message: "Define a class inheriting from models.Model." },
        { type: "matchesRegex", pattern: "title\\s*=.*models\\.CharField", message: "Declare title using models.CharField." },
        { type: "matchesRegex", pattern: "body\\s*=.*models\\.TextField", message: "Declare body using models.TextField." },
        { type: "matchesRegex", pattern: "created_at\\s*=.*models\\.DateTimeField", message: "Declare created_at using models.DateTimeField." }
      ]
    },
    explanation: `<p>Django models define both the data structure and the database schema. After defining or changing a model, you run <code>python manage.py makemigrations</code> and <code>python manage.py migrate</code> to update the database.</p>`
  },
  {
    id: 97,
    title: "Django: View Function",
    difficulty: "easy",
    topic: "Django",
    level: 5,
    xp: 10,
    instructions: `<p>A Django view is a function that takes an <code>HttpRequest</code> and returns an <code>HttpResponse</code>.</p>
<p>Import <code>HttpResponse</code> from <code>django.http</code>. Define a view function <code>home</code> that takes a <code>request</code> parameter and returns <code>HttpResponse("Welcome home!")</code>.</p>`,
    hints: [
      "from django.http import HttpResponse",
      "def home(request):",
      "    return HttpResponse(\"Welcome home!\")"
    ],
    starterCode: "# Define a Django view function\n",
    solution: 'from django.http import HttpResponse\n\ndef home(request):\n    return HttpResponse("Welcome home!")',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "from\\s+django\\.http\\s+import.*HttpResponse", message: "Import HttpResponse from django.http." },
        { type: "hasValidDef", name: "home", message: "Define a function named 'home' with a colon: def home(request):" },
        { type: "matchesRegex", pattern: "def\\s+home\\s*\\(\\s*request\\s*\\)", message: "Accept 'request' as the first parameter." },
        { type: "matchesRegex", pattern: "return\\s+HttpResponse", message: "Return an HttpResponse." }
      ]
    },
    explanation: `<p>Every Django view follows this pattern: receive a request, do some work, return a response. The <code>request</code> object contains headers, body, method, user info, and more. <code>HttpResponse</code> wraps the response body and status code.</p>`
  },
  {
    id: 98,
    title: "Django: URL Pattern",
    difficulty: "easy",
    topic: "Django",
    level: 5,
    xp: 10,
    instructions: `<p>Django routes URLs to views in a <code>urls.py</code> file using the <code>path()</code> function.</p>
<p>Import <code>path</code> from <code>django.urls</code> and import <code>home</code> and <code>about</code> from <code>.views</code>. Create a <code>urlpatterns</code> list with two entries: <code>path("", home, name="home")</code> and <code>path("about/", about, name="about")</code>.</p>`,
    hints: [
      "from django.urls import path",
      "from .views import home, about",
      "urlpatterns = [path(\"\", home, name=\"home\"), path(\"about/\", about, name=\"about\")]"
    ],
    starterCode: "# Define Django urlpatterns\n",
    solution: 'from django.urls import path\nfrom .views import home, about\n\nurlpatterns = [\n    path("", home, name="home"),\n    path("about/", about, name="about"),\n]',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "from\\s+django\\.urls\\s+import.*path", message: "Import path from django.urls." },
        { type: "codeContains", value: "urlpatterns", message: "Define the urlpatterns list." },
        { type: "matchesRegex", pattern: "path\\(", message: "Use path() to define URL patterns." },
        { type: "matchesRegex", pattern: "name\\s*=", message: "Give each URL a name= argument." }
      ]
    },
    explanation: `<p>URL names are used in templates and views with <code>reverse("home")</code> or <code>{% url 'home' %}</code> to generate URLs dynamically. This means you can change the path without breaking links throughout your project.</p>`
  },
  {
    id: 99,
    title: "Django: Class-Based View",
    difficulty: "medium",
    topic: "Django",
    level: 5,
    xp: 20,
    instructions: `<p>Class-based views (CBVs) provide reusable, composable view logic. <code>ListView</code> is a built-in CBV that lists objects from a queryset.</p>
<p>Import <code>ListView</code> from <code>django.views.generic</code>. Define a class <code>ArticleListView</code> inheriting from <code>ListView</code> with <code>model</code> set to <code>Article</code> and <code>template_name</code> set to <code>"articles/list.html"</code>.</p>`,
    hints: [
      "from django.views.generic import ListView",
      "class ArticleListView(ListView):",
      "    model = Article",
      "    template_name = \"articles/list.html\""
    ],
    starterCode: "from django.db import models\n\nclass Article(models.Model):\n    title = models.CharField(max_length=200)\n\n# Define ArticleListView\n",
    solution: 'from django.db import models\nfrom django.views.generic import ListView\n\nclass Article(models.Model):\n    title = models.CharField(max_length=200)\n\nclass ArticleListView(ListView):\n    model = Article\n    template_name = "articles/list.html"',
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "from\\s+django\\.views\\.generic\\s+import.*ListView", message: "Import ListView from django.views.generic." },
        { type: "matchesRegex", pattern: "class\\s+ArticleListView\\s*\\(\\s*ListView\\s*\\)", message: "Define ArticleListView inheriting from ListView." },
        { type: "matchesRegex", pattern: "model\\s*=\\s*Article", message: "Set model = Article." },
        { type: "matchesRegex", pattern: "template_name\\s*=", message: "Set template_name." }
      ]
    },
    explanation: `<p>CBVs give you a lot for free. <code>ListView</code> automatically queries all objects, paginates, and passes them to the template as <code>object_list</code>. You only need to specify the model and template.</p>`
  },
  {
    id: 100,
    title: "Django: ORM Query Basics",
    difficulty: "medium",
    topic: "Django",
    level: 5,
    xp: 20,
    instructions: `<p>Django's ORM lets you query the database using Python instead of SQL. Every model has a <code>objects</code> manager for queries.</p>
<p>Write three ORM queries (as variable assignments) using the <code>Article</code> model:</p>
<ul>
  <li><code>all_articles</code> -- get all articles</li>
  <li><code>published</code> -- filter articles where <code>published=True</code></li>
  <li><code>first_article</code> -- get the article with id=1</li>
</ul>`,
    hints: [
      "all_articles = Article.objects.all()",
      "published = Article.objects.filter(published=True)",
      "first_article = Article.objects.get(id=1)"
    ],
    starterCode: "# Write three Django ORM queries\n# Assume Article model is imported and available\n",
    solution: "all_articles = Article.objects.all()\npublished = Article.objects.filter(published=True)\nfirst_article = Article.objects.get(id=1)",
    validation: {
      checks: [
        { type: "matchesRegex", pattern: "all_articles\\s*=.*\\.objects\\.all\\s*\\(\\)", message: "Assign .objects.all() to 'all_articles'." },
        { type: "matchesRegex", pattern: "published\\s*=.*\\.objects\\.filter\\s*\\(", message: "Assign .objects.filter(...) to 'published'." },
        { type: "matchesRegex", pattern: "first_article\\s*=.*\\.objects\\.get\\s*\\(", message: "Assign .objects.get(...) to 'first_article'." }
      ]
    },
    explanation: `<p>The Django ORM builds SQL queries lazily. <code>all()</code> returns a QuerySet, <code>filter()</code> adds WHERE clauses, and <code>get()</code> returns exactly one object (raises exceptions if zero or more than one match). Chain methods: <code>Article.objects.filter(published=True).order_by("-created_at")</code>.</p>`
  }
];
