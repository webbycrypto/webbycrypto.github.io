#!/usr/bin/env python3
"""
pyoffline — centralized offline Python package manager
Downloads and installs packages for FastAPI, Django, Flask, and XRPL projects.
"""

import argparse
import subprocess
import sys
import os
import json
import webbrowser
import html as html_escape_module
from pathlib import Path

STORE_DIR = Path("D:/pyoffline")
REGISTRY_FILE = STORE_DIR / ".registry.json"
GUIDES_DIR = Path("D:/pyoffline-guides")

BUNDLES = {
    "fastapi": [
        # Core
        "fastapi",
        "uvicorn[standard]",
        "starlette",
        "pydantic",
        "pydantic-settings",
        "pydantic-extra-types",
        # HTTP / async
        "httpx",
        "aiofiles",
        "anyio",
        "h11",
        "sniffio",
        "websockets",
        "python-multipart",
        # Auth / security
        "python-jose[cryptography]",
        "passlib[bcrypt]",
        "bcrypt==4.0.1",
        "itsdangerous",
        "cryptography",
        # Database
        "sqlalchemy",
        "alembic",
        "psycopg2-binary",
        "asyncpg",
        "aiosqlite",
        "databases[postgresql]",
        "redis",
        "motor",
        # Email / validation
        "email-validator",
        "resend",
        # Background tasks / queues
        "celery",
        "apscheduler",
        # Rate limiting / caching
        "slowapi",
        "cachetools",
        # Serialization / parsing
        "orjson",
        "ujson",
        "python-dotenv",
        # Dev / testing
        "pytest",
        "pytest-asyncio",
        "pytest-cov",
        "coverage",
        "faker",
        "factory-boy",
    ],
    "django": [
        # Core
        "django",
        "asgiref",
        "sqlparse",
        # REST / API
        "djangorestframework",
        "djangorestframework-simplejwt",
        "drf-spectacular",
        "django-filter",
        "django-cors-headers",
        # Auth / security
        "django-allauth",
        "django-guardian",
        "argon2-cffi",
        # Database
        "psycopg2-binary",
        "mysqlclient",
        "django-redis",
        "redis",
        "celery",
        "kombu",
        # Config / env
        "django-environ",
        "python-dotenv",
        "python-decouple",
        # File / storage
        "Pillow",
        "django-storages",
        "boto3",
        "whitenoise",
        # Forms / templates
        "django-crispy-forms",
        "django-widget-tweaks",
        # Admin
        "django-import-export",
        "django-extensions",
        # Async / websockets
        "channels",
        "channels-redis",
        "daphne",
        "gunicorn",
        # Dev / testing
        "pytest",
        "pytest-django",
        "pytest-cov",
        "coverage",
        "faker",
        "factory-boy",
        "model-bakery",
        "django-debug-toolbar",
    ],
    "flask": [
        # Core
        "flask",
        "werkzeug",
        "jinja2",
        "itsdangerous",
        "click",
        "markupsafe",
        # Extensions
        "flask-sqlalchemy",
        "flask-migrate",
        "flask-login",
        "flask-wtf",
        "flask-cors",
        "flask-mail",
        "flask-caching",
        "flask-limiter",
        "flask-jwt-extended",
        "flask-restful",
        "flask-marshmallow",
        "flask-admin",
        "flask-babel",
        "flask-socketio",
        # Auth / security
        "passlib[bcrypt]",
        "bcrypt==4.0.1",
        "itsdangerous",
        "cryptography",
        # Database
        "sqlalchemy",
        "alembic",
        "psycopg2-binary",
        "redis",
        "pymongo",
        "marshmallow",
        "marshmallow-sqlalchemy",
        # Forms / validation
        "wtforms",
        "email-validator",
        # Config / env
        "python-dotenv",
        # Server
        "gunicorn",
        "gevent",
        "eventlet",
        # Dev / testing
        "pytest",
        "pytest-flask",
        "pytest-cov",
        "coverage",
        "faker",
        "factory-boy",
    ],
    "xrpl": [
        # Core
        "xrpl-py",
        "websockets",
        "httpx",
        "anyio",
        # Wallet / crypto
        "mnemonic",
        "base58",
        "ecdsa",
        "pycryptodome",
        "pysha3",
        "bip32utils",
        "hdwallet",
        # Encoding / serialization
        "cbor2",
        "protobuf",
        # Async support
        "aiohttp",
        "aiofiles",
        # Dev / testing
        "pytest",
        "pytest-asyncio",
        "pytest-cov",
        "coverage",
    ],
}

# Common utilities useful across all stacks
COMMON = [
    # HTTP
    "requests",
    "httpx",
    "urllib3",
    "aiohttp",
    # Config / env
    "python-dotenv",
    "python-decouple",
    "PyYAML",
    "toml",
    "tomli",
    # Data / validation
    "pydantic",
    "marshmallow",
    "attrs",
    "dacite",
    # CLI
    "click",
    "typer",
    "rich",
    "colorama",
    "tqdm",
    "tabulate",
    "argparse",
    # Security / crypto
    "cryptography",
    "passlib",
    "bcrypt==4.0.1",
    "PyJWT",
    # Database
    "sqlalchemy",
    "alembic",
    "redis",
    "pymongo",
    # Date / time
    "python-dateutil",
    "arrow",
    "pendulum",
    # Files / parsing
    "python-magic",
    "chardet",
    "openpyxl",
    "xlrd",
    "python-docx",
    "pypdf2",
    "pillow",
    # Logging / monitoring
    "loguru",
    "sentry-sdk",
    "structlog",
    # Testing
    "pytest",
    "pytest-cov",
    "pytest-asyncio",
    "coverage",
    "faker",
    "factory-boy",
    "responses",
    "freezegun",
    # Dev tools
    "black",
    "isort",
    "flake8",
    "mypy",
    "pre-commit",
    "bandit",
    # Async
    "anyio",
    "trio",
    "tenacity",
    # Serialization
    "orjson",
    "ujson",
    "msgpack",
]


# ---------------------------------------------------------------------------
# Guide content
# ---------------------------------------------------------------------------

GUIDES = {
    "fastapi": {
        "title": "FastAPI",
        "color": "#009688",
        "description": "Build a REST API with JWT authentication, SQLite database, and interactive HTML pages that talk to your API.",
        "install": "pyoffline install --bundle fastapi",
        "run": "uvicorn main:app --reload",
        "steps": [
            {
                "title": "Project Structure",
                "explanation": "Create this folder layout before writing any code. Each file has one job — keeping them separate makes the project easy to navigate.",
                "files": [
                    {
                        "name": "structure.txt",
                        "lang": "text",
                        "code": """\
myapp/
  main.py          ← FastAPI app, routes
  database.py      ← database connection setup
  models.py        ← SQLAlchemy table definitions
  schemas.py       ← Pydantic request/response shapes
  auth.py          ← JWT token helpers
  static/
    login.html     ← login page
    items.html     ← protected data table page
    upload.html    ← file upload page
  uploads/         ← saved uploaded files
  .env             ← SECRET_KEY and other settings
  requirements.txt"""
                    }
                ]
            },
            {
                "title": "Database Setup",
                "explanation": "database.py creates the connection to SQLite (a single file database — no server needed). get_db() is a helper that opens and closes the database session automatically for each request.",
                "files": [
                    {
                        "name": "database.py",
                        "lang": "python",
                        "code": """\
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# SQLite stores everything in a single file called app.db
DATABASE_URL = "sqlite:///./app.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

# This function is used as a FastAPI dependency.
# It opens a database session, yields it to the route, then closes it.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()"""
                    }
                ]
            },
            {
                "title": "Models & Schemas",
                "explanation": "models.py defines the actual database tables using SQLAlchemy. schemas.py defines what data looks like when it comes in from the user (request) or goes out in a response — Pydantic validates this automatically.",
                "files": [
                    {
                        "name": "models.py",
                        "lang": "python",
                        "code": """\
from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class User(Base):
    __tablename__ = "users"
    id       = Column(Integer, primary_key=True, index=True)
    email    = Column(String, unique=True, index=True)
    password = Column(String)  # stored as a bcrypt hash, never plain text

class Item(Base):
    __tablename__ = "items"
    id      = Column(Integer, primary_key=True, index=True)
    title   = Column(String)
    done    = Column(Boolean, default=False)
    user_id = Column(Integer)  # which user owns this item"""
                    },
                    {
                        "name": "schemas.py",
                        "lang": "python",
                        "code": """\
from pydantic import BaseModel, EmailStr

# Used when a user registers — what we expect them to send
class UserCreate(BaseModel):
    email: EmailStr
    password: str

# Used in responses — we never send the password back
class UserOut(BaseModel):
    id: int
    email: str
    model_config = {"from_attributes": True}

class ItemCreate(BaseModel):
    title: str

class ItemOut(BaseModel):
    id: int
    title: str
    done: bool
    model_config = {"from_attributes": True}"""
                    }
                ]
            },
            {
                "title": "JWT Authentication Helpers",
                "explanation": "auth.py handles password hashing and JWT token creation. A JWT (JSON Web Token) is a small signed string the user gets after logging in — they send it with every request so the server knows who they are.",
                "files": [
                    {
                        "name": "auth.py",
                        "lang": "python",
                        "code": """\
from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db
import models, os

SECRET_KEY = os.getenv("SECRET_KEY", "change-this-in-production")
ALGORITHM  = "HS256"
TOKEN_EXPIRE_HOURS = 48

pwd_context    = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme  = OAuth2PasswordBearer(tokenUrl="/auth/token")

def hash_password(plain: str) -> str:
    return pwd_context.hash(plain)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_token(data: dict) -> str:
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(hours=TOKEN_EXPIRE_HOURS)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# Dependency — add this to any route that needs a logged-in user
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user"""
                    }
                ]
            },
            {
                "title": "Main App — Routes",
                "explanation": "main.py wires everything together. The /auth routes handle register and login. The /items routes are protected — only logged-in users can access them. FastAPI serves the HTML pages from the static/ folder.",
                "files": [
                    {
                        "name": "main.py",
                        "lang": "python",
                        "code": """\
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, BackgroundTasks
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import engine, get_db
import models, schemas, auth, shutil, os

models.Base.metadata.create_all(bind=engine)  # creates tables if they don't exist

app = FastAPI(title="My App")
app.mount("/static", StaticFiles(directory="static"), name="static")

# --- Auth routes ---

@app.post("/auth/register", response_model=schemas.UserOut)
def register(data: schemas.UserCreate, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    user = models.User(email=data.email, password=auth.hash_password(data.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@app.post("/auth/token")
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form.username).first()
    if not user or not auth.verify_password(form.password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    token = auth.create_token({"sub": user.id})
    return {"access_token": token, "token_type": "bearer"}

# --- Item routes (protected) ---

@app.get("/items", response_model=list[schemas.ItemOut])
def list_items(current_user=Depends(auth.get_current_user), db: Session = Depends(get_db)):
    return db.query(models.Item).filter(models.Item.user_id == current_user.id).all()

@app.post("/items", response_model=schemas.ItemOut)
def create_item(data: schemas.ItemCreate, current_user=Depends(auth.get_current_user), db: Session = Depends(get_db)):
    item = models.Item(title=data.title, user_id=current_user.id)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@app.delete("/items/{item_id}")
def delete_item(item_id: int, current_user=Depends(auth.get_current_user), db: Session = Depends(get_db)):
    item = db.query(models.Item).filter(models.Item.id == item_id, models.Item.user_id == current_user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"deleted": item_id}

# --- File upload ---

os.makedirs("uploads", exist_ok=True)

@app.post("/upload")
def upload_file(file: UploadFile = File(...)):
    allowed = {".jpg", ".jpeg", ".png", ".pdf", ".txt"}
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in allowed:
        raise HTTPException(status_code=400, detail=f"File type {ext} not allowed")
    save_path = f"uploads/{file.filename}"
    with open(save_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    return {"filename": file.filename, "saved_to": save_path}

# --- Background task example ---

def send_welcome_email(email: str):
    # In a real app this would call an email service.
    # Running as a background task means the HTTP response
    # returns immediately without waiting for this to finish.
    print(f"[background] Sending welcome email to {email}")

@app.post("/auth/register-with-email", response_model=schemas.UserOut)
def register_with_email(data: schemas.UserCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    user = models.User(email=data.email, password=auth.hash_password(data.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    background_tasks.add_task(send_welcome_email, data.email)  # fires after response is sent
    return user"""
                    }
                ]
            },
            {
                "title": "Login Page",
                "explanation": "The login form sends the user's email and password to /auth/token. When the server responds with a token, JavaScript stores it in localStorage so future requests can include it. Each JS line is commented.",
                "files": [
                    {
                        "name": "static/login.html",
                        "lang": "html",
                        "code": """\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Login</title>
  <style>
    body { font-family: sans-serif; max-width: 400px; margin: 80px auto; padding: 0 20px; }
    input { display: block; width: 100%; padding: 8px; margin: 8px 0; box-sizing: border-box; }
    button { padding: 10px 20px; background: #009688; color: white; border: none; cursor: pointer; }
    #msg { color: red; margin-top: 10px; }
  </style>
</head>
<body>
  <h2>Login</h2>
  <form id="loginForm">
    <input type="email" id="email" placeholder="Email" required>
    <input type="password" id="password" placeholder="Password" required>
    <button type="submit">Login</button>
  </form>
  <p id="msg"></p>

  <script>
    // Wait for the form's submit event
    document.getElementById("loginForm").addEventListener("submit", async function(e) {
      e.preventDefault(); // stop the page from reloading on submit

      // OAuth2 expects form data, not JSON, so we use URLSearchParams
      const body = new URLSearchParams({
        username: document.getElementById("email").value,
        password: document.getElementById("password").value
      });

      // Send a POST request to the login endpoint
      const response = await fetch("/auth/token", {
        method: "POST",
        body: body
      });

      const data = await response.json(); // parse the JSON the server sends back

      if (response.ok) {
        // Save the token so we can use it on other pages
        localStorage.setItem("token", data.access_token);
        // Send the user to the items page
        window.location.href = "/static/items.html";
      } else {
        // Show the error message from the server
        document.getElementById("msg").textContent = data.detail;
      }
    });
  </script>
</body>
</html>"""
                    }
                ]
            },
            {
                "title": "Data Table with Delete Button",
                "explanation": "items.html loads the user's items by calling the API as soon as the page opens, then builds the table rows with JavaScript. The delete button sends a DELETE request and removes the row from the page without refreshing.",
                "files": [
                    {
                        "name": "static/items.html",
                        "lang": "html",
                        "code": """\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Items</title>
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }
    table { width: 100%; border-collapse: collapse; }
    td, th { padding: 8px; border-bottom: 1px solid #ddd; text-align: left; }
    button.del { background: #e53935; color: white; border: none; padding: 4px 10px; cursor: pointer; }
    input { padding: 8px; width: 70%; }
    #addBtn { padding: 8px 16px; background: #009688; color: white; border: none; cursor: pointer; }
  </style>
</head>
<body>
  <h2>My Items</h2>

  <!-- Add new item -->
  <input type="text" id="newItem" placeholder="New item title">
  <button id="addBtn">Add</button>

  <table>
    <thead><tr><th>Title</th><th></th></tr></thead>
    <tbody id="itemList"></tbody>
  </table>

  <script>
    // Retrieve the token we saved during login
    const token = localStorage.getItem("token");

    // If there's no token, send the user back to the login page
    if (!token) window.location.href = "/static/login.html";

    // Build the Authorization header — the server requires this on every request
    const headers = { "Authorization": "Bearer " + token, "Content-Type": "application/json" };

    // Load items when the page opens
    async function loadItems() {
      const res  = await fetch("/items", { headers });       // ask the server for items
      const items = await res.json();                         // parse the response
      const tbody = document.getElementById("itemList");
      tbody.innerHTML = "";                                   // clear old rows first

      items.forEach(item => {                                 // loop over each item
        const tr = document.createElement("tr");
        tr.id = "row-" + item.id;                            // store the id on the row
        tr.innerHTML = `
          <td>${item.title}</td>
          <td><button class="del" onclick="deleteItem(${item.id})">Delete</button></td>`;
        tbody.appendChild(tr);                               // add row to the table
      });
    }

    // Delete an item by id
    async function deleteItem(id) {
      await fetch("/items/" + id, { method: "DELETE", headers }); // tell the server to delete it
      document.getElementById("row-" + id).remove();              // remove the row from the page
    }

    // Add a new item
    document.getElementById("addBtn").addEventListener("click", async () => {
      const title = document.getElementById("newItem").value.trim();
      if (!title) return;                                          // do nothing if input is empty
      await fetch("/items", {
        method: "POST",
        headers,
        body: JSON.stringify({ title })                           // send title as JSON
      });
      document.getElementById("newItem").value = "";             // clear the input field
      loadItems();                                               // refresh the list
    });

    loadItems(); // run immediately when the page loads
  </script>
</body>
</html>"""
                    }
                ]
            },
            {
                "title": "File Upload Page",
                "explanation": "A simple upload form. The file is sent as multipart form data — standard browser behaviour. The server validates the file extension before saving it.",
                "files": [
                    {
                        "name": "static/upload.html",
                        "lang": "html",
                        "code": """\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Upload File</title>
  <style>
    body { font-family: sans-serif; max-width: 400px; margin: 80px auto; padding: 0 20px; }
    button { padding: 10px 20px; background: #009688; color: white; border: none; cursor: pointer; }
    #result { margin-top: 16px; }
  </style>
</head>
<body>
  <h2>Upload a File</h2>
  <p>Allowed types: .jpg .jpeg .png .pdf .txt</p>

  <!-- enctype="multipart/form-data" is required for file uploads -->
  <form id="uploadForm" enctype="multipart/form-data">
    <input type="file" name="file" id="fileInput" required>
    <br><br>
    <button type="submit">Upload</button>
  </form>
  <div id="result"></div>

  <script>
    document.getElementById("uploadForm").addEventListener("submit", async function(e) {
      e.preventDefault();

      // FormData automatically packages the file in the right format
      const formData = new FormData();
      formData.append("file", document.getElementById("fileInput").files[0]);

      const res  = await fetch("/upload", { method: "POST", body: formData });
      const data = await res.json();

      const result = document.getElementById("result");
      if (res.ok) {
        result.innerHTML = `<p style="color:green">Saved: <strong>${data.filename}</strong></p>`;
      } else {
        result.innerHTML = `<p style="color:red">Error: ${data.detail}</p>`;
      }
    });
  </script>
</body>
</html>"""
                    }
                ]
            },
        ]
    },

    "django": {
        "title": "Django",
        "color": "#092e20",
        "description": "Build a full web app with models, views, templates, forms, pagination, search, signals, and custom middleware.",
        "install": "pyoffline install --bundle django",
        "run": "python manage.py runserver",
        "steps": [
            {
                "title": "Project Setup",
                "explanation": "Django uses manage.py to create projects and apps. A project is your whole website; an app is one section of it (like a blog). Run these commands in your terminal after activating your virtual environment.",
                "files": [
                    {
                        "name": "terminal",
                        "lang": "bash",
                        "code": """\
# Install Django, then create project and app
pip install django

django-admin startproject mysite .   # the dot means "use current folder"
python manage.py startapp blog       # creates the blog/ app folder

# After creating your models, run migrations to create the database tables
python manage.py makemigrations
python manage.py migrate

# Create an admin user so you can log in to /admin
python manage.py createsuperuser

# Start the development server
python manage.py runserver"""
                    },
                    {
                        "name": "mysite/settings.py (add these)",
                        "lang": "python",
                        "code": """\
INSTALLED_APPS = [
    # ... existing apps ...
    'blog',  # register your new app here
]

# Tell Django where to find templates (one global templates/ folder)
TEMPLATES = [{
    ...
    'DIRS': [BASE_DIR / 'templates'],
    ...
}]

# Where uploaded files go
MEDIA_URL  = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'"""
                    }
                ]
            },
            {
                "title": "Model",
                "explanation": "A model is a Python class that maps to a database table. Django creates the table for you when you run makemigrations and migrate. The __str__ method controls what shows in the admin panel.",
                "files": [
                    {
                        "name": "blog/models.py",
                        "lang": "python",
                        "code": """\
from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title      = models.CharField(max_length=200)
    body       = models.TextField()
    author     = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)  # set once when created
    updated_at = models.DateTimeField(auto_now=True)      # updated every time you save

    class Meta:
        ordering = ['-created_at']  # newest first

    def __str__(self):
        return self.title  # shows the title in the admin panel

# Register in blog/admin.py so it appears in the admin panel
# from django.contrib import admin
# from .models import Post
# admin.site.register(Post)"""
                    }
                ]
            },
            {
                "title": "Form with CSRF Token",
                "explanation": "Django forms validate input on the server. The {% csrf_token %} tag adds a hidden security field to every form — Django will reject the submission without it. This prevents cross-site request forgery attacks.",
                "files": [
                    {
                        "name": "blog/forms.py",
                        "lang": "python",
                        "code": """\
from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model  = Post
        fields = ['title', 'body']  # only show these fields in the form
        widgets = {
            'title': forms.TextInput(attrs={'placeholder': 'Post title', 'class': 'input'}),
            'body':  forms.Textarea(attrs={'rows': 6, 'class': 'textarea'}),
        }"""
                    },
                    {
                        "name": "blog/views.py",
                        "lang": "python",
                        "code": """\
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import PostForm
from .models import Post

@login_required  # redirects to login page if not logged in
def create_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)   # don't save to db yet
            post.author = request.user       # set the author to the logged-in user
            post.save()                      # now save to db
            return redirect('post_list')     # go to the list page after saving
    else:
        form = PostForm()  # blank form for GET requests
    return render(request, 'blog/create.html', {'form': form})"""
                    },
                    {
                        "name": "templates/blog/create.html",
                        "lang": "html",
                        "code": """\
{% extends "base.html" %}
{% block content %}

<h2>New Post</h2>

<form method="post">
  {% csrf_token %}   {# required security field — Django rejects forms without it #}

  {{ form.title.label_tag }}
  {{ form.title }}
  {% if form.title.errors %}
    <ul class="errors">{% for e in form.title.errors %}<li>{{ e }}</li>{% endfor %}</ul>
  {% endif %}

  {{ form.body.label_tag }}
  {{ form.body }}
  {% if form.body.errors %}
    <ul class="errors">{% for e in form.body.errors %}<li>{{ e }}</li>{% endfor %}</ul>
  {% endif %}

  <button type="submit">Save Post</button>
</form>

{% endblock %}"""
                    }
                ]
            },
            {
                "title": "Base Template & Template Tags",
                "explanation": "A base template defines the page shell (header, nav, footer). Other templates extend it and fill in the {% block content %} section. Template tags like {% for %}, {% if %}, and filters like |date and |truncatechars are Django's way of adding logic to HTML.",
                "files": [
                    {
                        "name": "templates/base.html",
                        "lang": "html",
                        "code": """\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{% block title %}My Site{% endblock %}</title>
  <style>
    body { font-family: sans-serif; max-width: 700px; margin: 40px auto; padding: 0 20px; }
    nav a { margin-right: 16px; text-decoration: none; color: #009688; }
    .errors li { color: red; }
  </style>
</head>
<body>
  <nav>
    <a href="{% url 'post_list' %}">Posts</a>
    <a href="{% url 'create_post' %}">New Post</a>
    {% if user.is_authenticated %}
      <a href="{% url 'logout' %}">Logout ({{ user.username }})</a>
    {% else %}
      <a href="{% url 'login' %}">Login</a>
    {% endif %}
  </nav>
  <hr>
  {% if messages %}
    {% for message in messages %}
      <div class="msg {{ message.tags }}">{{ message }}</div>
    {% endfor %}
  {% endif %}
  {% block content %}{% endblock %}
</body>
</html>"""
                    },
                    {
                        "name": "templates/blog/list.html",
                        "lang": "html",
                        "code": """\
{% extends "base.html" %}
{% block title %}Posts{% endblock %}
{% block content %}

<h2>All Posts</h2>

{% for post in posts %}
  <article>
    <h3><a href="{% url 'post_detail' post.pk %}">{{ post.title }}</a></h3>
    <small>
      By {{ post.author.username }}
      on {{ post.created_at|date:"N j, Y" }}  {# formats the date nicely #}
    </small>
    <p>{{ post.body|truncatechars:150 }}</p>  {# shows only the first 150 characters #}
  </article>
{% empty %}
  <p>No posts yet. <a href="{% url 'create_post' %}">Create the first one.</a></p>
{% endfor %}

{# Pagination controls — only shown when there are multiple pages #}
{% if page_obj.has_previous or page_obj.has_next %}
  <div>
    {% if page_obj.has_previous %}
      <a href="?page={{ page_obj.previous_page_number }}">← Previous</a>
    {% endif %}
    Page {{ page_obj.number }} of {{ page_obj.paginator.num_pages }}
    {% if page_obj.has_next %}
      <a href="?page={{ page_obj.next_page_number }}">Next →</a>
    {% endif %}
  </div>
{% endif %}

{% endblock %}"""
                    }
                ]
            },
            {
                "title": "Pagination & Search",
                "explanation": "Pagination splits a long list of results across multiple pages. Search works by reading a ?q= query string from the URL and filtering the queryset. Both work without any JavaScript.",
                "files": [
                    {
                        "name": "blog/views.py (list view)",
                        "lang": "python",
                        "code": """\
from django.core.paginator import Paginator
from django.shortcuts import render
from .models import Post

def post_list(request):
    query = request.GET.get('q', '')  # read the search term from the URL, default to empty

    posts = Post.objects.all()
    if query:
        # Filter posts where title contains the search term (case-insensitive)
        posts = posts.filter(title__icontains=query)

    paginator = Paginator(posts, 5)             # show 5 posts per page
    page_number = request.GET.get('page', 1)    # read the current page number from the URL
    page_obj = paginator.get_page(page_number)  # get the posts for that page

    return render(request, 'blog/list.html', {
        'posts': page_obj,
        'page_obj': page_obj,
        'query': query,
    })"""
                    },
                    {
                        "name": "templates/blog/list.html (search bar)",
                        "lang": "html",
                        "code": """\
{# Add this search bar above the post list #}
<form method="get" action="">
  <input type="text" name="q" value="{{ query }}" placeholder="Search posts...">
  <button type="submit">Search</button>
  {% if query %}<a href="{% url 'post_list' %}">Clear</a>{% endif %}
</form>"""
                    }
                ]
            },
            {
                "title": "Class-Based Views",
                "explanation": "Class-based views (CBVs) replace repetitive function-based views with reusable classes. ListView, DetailView, and CreateView handle the common patterns automatically — you just specify the model and template.",
                "files": [
                    {
                        "name": "blog/views.py (class-based)",
                        "lang": "python",
                        "code": """\
from django.views.generic import ListView, DetailView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from .models import Post
from .forms import PostForm

# Replaces the post_list function view
class PostListView(ListView):
    model = Post
    template_name = 'blog/list.html'
    context_object_name = 'posts'   # name used in the template
    paginate_by = 5

    def get_queryset(self):
        qs = super().get_queryset()
        q = self.request.GET.get('q')
        if q:
            qs = qs.filter(title__icontains=q)
        return qs

# Replaces a post_detail function view
class PostDetailView(DetailView):
    model = Post
    template_name = 'blog/detail.html'

# Replaces the create_post function view
class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    form_class = PostForm
    template_name = 'blog/create.html'
    success_url = reverse_lazy('post_list')

    def form_valid(self, form):
        form.instance.author = self.request.user  # set author before saving
        return super().form_valid(form)"""
                    }
                ]
            },
            {
                "title": "Signals — Auto-Create a Profile",
                "explanation": "A Django signal fires automatically when something happens — like a user being saved. This is useful for side effects you don't want to put in a view, like creating a related Profile record every time a new User is created.",
                "files": [
                    {
                        "name": "blog/models.py (add Profile)",
                        "lang": "python",
                        "code": """\
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio  = models.TextField(blank=True)

    def __str__(self):
        return f"Profile({self.user.username})"

# This function runs automatically every time a User is saved
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:  # only when a brand-new user is created, not on updates
        Profile.objects.create(user=instance)"""
                    },
                    {
                        "name": "blog/apps.py",
                        "lang": "python",
                        "code": """\
from django.apps import AppConfig

class BlogConfig(AppConfig):
    name = 'blog'

    def ready(self):
        import blog.models  # importing the module registers the @receiver signals"""
                    }
                ]
            },
            {
                "title": "Custom Middleware",
                "explanation": "Middleware sits between the web server and your views — every request passes through it. This example logs each request method and path to a file. Register it in settings.py to activate it.",
                "files": [
                    {
                        "name": "blog/middleware.py",
                        "lang": "python",
                        "code": """\
import logging, time

logger = logging.getLogger(__name__)

class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response  # get_response is the next layer (a view or another middleware)

    def __call__(self, request):
        start = time.time()
        response = self.get_response(request)  # hand the request to the view
        duration = round((time.time() - start) * 1000)  # ms
        logger.info(f"{request.method} {request.path} → {response.status_code} ({duration}ms)")
        return response"""
                    },
                    {
                        "name": "mysite/settings.py (register it)",
                        "lang": "python",
                        "code": """\
MIDDLEWARE = [
    # ... existing middleware ...
    'blog.middleware.RequestLoggingMiddleware',  # add at the end
]"""
                    }
                ]
            },
        ]
    },

    "flask": {
        "title": "Flask",
        "color": "#000000",
        "description": "Build a web app using the application factory pattern, Blueprints, Jinja2 templates, WTForms, file uploads, and custom error pages.",
        "install": "pyoffline install --bundle flask",
        "run": "flask run",
        "steps": [
            {
                "title": "Project Structure",
                "explanation": "Flask is unopinionated about structure, but this layout scales well. The application factory (create_app) lets you create different versions of the app for development and production.",
                "files": [
                    {
                        "name": "structure.txt",
                        "lang": "text",
                        "code": """\
myapp/
  run.py              ← entry point: python run.py
  config.py           ← config classes for dev/prod
  app/
    __init__.py       ← create_app() factory
    models.py         ← SQLAlchemy models
    extensions.py     ← db, login_manager instances
    auth/
      __init__.py     ← Blueprint definition
      routes.py       ← login, register, logout views
      forms.py        ← WTForms form classes
    posts/
      __init__.py
      routes.py
      forms.py
    templates/
      base.html
      auth/
        login.html
        register.html
      posts/
        list.html
        create.html
    static/
      style.css
  uploads/            ← saved uploaded files"""
                    }
                ]
            },
            {
                "title": "Application Factory & Config",
                "explanation": "The create_app() pattern lets you create a fresh app instance with different settings — useful for testing or running multiple environments. Extensions like SQLAlchemy are initialized separately and then bound to the app.",
                "files": [
                    {
                        "name": "config.py",
                        "lang": "python",
                        "code": """\
import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-change-this")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///app.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAX_CONTENT_LENGTH = 2 * 1024 * 1024  # 2 MB max upload size
    UPLOAD_FOLDER = "uploads"

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False"""
                    },
                    {
                        "name": "app/extensions.py",
                        "lang": "python",
                        "code": """\
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate

# Create the extension objects here — they get bound to the app in create_app()
db            = SQLAlchemy()
login_manager = LoginManager()
migrate       = Migrate()"""
                    },
                    {
                        "name": "app/__init__.py",
                        "lang": "python",
                        "code": """\
from flask import Flask
from config import DevelopmentConfig
from app.extensions import db, login_manager, migrate
import os

def create_app(config=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config)

    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    # Bind extensions to this app instance
    db.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)

    login_manager.login_view = "auth.login"  # where to redirect unauthenticated users

    # Register blueprints (groups of related routes)
    from app.auth.routes import auth_bp
    from app.posts.routes import posts_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(posts_bp, url_prefix="/posts")

    # Register custom error pages
    from app.errors import register_errors
    register_errors(app)

    return app"""
                    },
                    {
                        "name": "run.py",
                        "lang": "python",
                        "code": """\
from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)"""
                    }
                ]
            },
            {
                "title": "Model",
                "explanation": "SQLAlchemy models work the same as in other frameworks. The load_user function is required by Flask-Login — it tells the login manager how to look up a user by their ID stored in the session.",
                "files": [
                    {
                        "name": "app/models.py",
                        "lang": "python",
                        "code": """\
from app.extensions import db, login_manager
from flask_login import UserMixin
from datetime import datetime

class User(UserMixin, db.Model):
    id         = db.Column(db.Integer, primary_key=True)
    email      = db.Column(db.String(120), unique=True, nullable=False)
    password   = db.Column(db.String(200), nullable=False)
    posts      = db.relationship('Post', backref='author', lazy=True)

class Post(db.Model):
    id         = db.Column(db.Integer, primary_key=True)
    title      = db.Column(db.String(200), nullable=False)
    body       = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id    = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Flask-Login calls this to get the logged-in user object from their session cookie
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))"""
                    }
                ]
            },
            {
                "title": "WTForms Form",
                "explanation": "WTForms handles form field definitions, validation, and rendering. FlaskForm automatically adds CSRF protection. Validators like DataRequired and Email run on the server before the data touches your database.",
                "files": [
                    {
                        "name": "app/posts/forms.py",
                        "lang": "python",
                        "code": """\
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length

class PostForm(FlaskForm):
    title  = StringField('Title',   validators=[DataRequired(), Length(min=3, max=200)])
    body   = TextAreaField('Body',  validators=[DataRequired()])
    submit = SubmitField('Save Post')"""
                    },
                    {
                        "name": "app/posts/routes.py",
                        "lang": "python",
                        "code": """\
from flask import Blueprint, render_template, redirect, url_for, flash
from flask_login import login_required, current_user
from app.extensions import db
from app.models import Post
from .forms import PostForm

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/')
def list_posts():
    page  = request.args.get('page', 1, type=int)
    posts = Post.query.order_by(Post.created_at.desc()).paginate(page=page, per_page=5)
    return render_template('posts/list.html', posts=posts)

@posts_bp.route('/create', methods=['GET', 'POST'])
@login_required
def create_post():
    form = PostForm()
    if form.validate_on_submit():  # True only on POST with valid data
        post = Post(title=form.title.data, body=form.body.data, author=current_user)
        db.session.add(post)
        db.session.commit()
        flash('Post created!', 'success')        # success message shown on the next page
        return redirect(url_for('posts.list_posts'))  # redirect to prevent double-submit
    return render_template('posts/create.html', form=form)"""
                    },
                    {
                        "name": "app/templates/posts/create.html",
                        "lang": "html",
                        "code": """\
{% extends "base.html" %}
{% block content %}

<h2>New Post</h2>

<form method="post" novalidate>
  {{ form.hidden_tag() }}  {# renders the CSRF token hidden field #}

  <div>
    {{ form.title.label }}
    {{ form.title(placeholder="Post title") }}
    {% for error in form.title.errors %}
      <span class="error">{{ error }}</span>  {# show validation errors inline #}
    {% endfor %}
  </div>

  <div>
    {{ form.body.label }}
    {{ form.body(rows=8) }}
    {% for error in form.body.errors %}
      <span class="error">{{ error }}</span>
    {% endfor %}
  </div>

  {{ form.submit() }}
</form>

{% endblock %}"""
                    }
                ]
            },
            {
                "title": "File Upload",
                "explanation": "Flask reads uploaded files from request.files. werkzeug's secure_filename sanitizes the filename to prevent directory traversal attacks (e.g. someone naming their file ../../etc/passwd).",
                "files": [
                    {
                        "name": "app/posts/routes.py (upload)",
                        "lang": "python",
                        "code": """\
from flask import request, current_app
from werkzeug.utils import secure_filename
import os

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf'}

def allowed_file(filename):
    # Check that there's a dot in the name and the extension is in our allowed set
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@posts_bp.route('/upload', methods=['GET', 'POST'])
@login_required
def upload_file():
    if request.method == 'POST':
        file = request.files.get('file')
        if not file or file.filename == '':
            flash('No file selected', 'error')
            return redirect(request.url)
        if not allowed_file(file.filename):
            flash('File type not allowed', 'error')
            return redirect(request.url)
        filename = secure_filename(file.filename)  # removes dangerous characters
        file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        flash(f'Uploaded: {filename}', 'success')
        return redirect(url_for('posts.upload_file'))
    return render_template('posts/upload.html')"""
                    },
                    {
                        "name": "app/templates/posts/upload.html",
                        "lang": "html",
                        "code": """\
{% extends "base.html" %}
{% block content %}

<h2>Upload a File</h2>

{% with messages = get_flashed_messages(with_categories=true) %}
  {% for category, message in messages %}
    <p class="{{ category }}">{{ message }}</p>
  {% endfor %}
{% endwith %}

<!-- enctype="multipart/form-data" is required for file uploads -->
<form method="post" enctype="multipart/form-data">
  {{ form.hidden_tag() if form is defined else "" }}
  <input type="file" name="file" accept=".png,.jpg,.jpeg,.gif,.pdf">
  <button type="submit">Upload</button>
</form>

{% endblock %}"""
                    }
                ]
            },
            {
                "title": "Blueprints",
                "explanation": "Blueprints group related routes into separate modules. This keeps your code organized as the project grows. Each blueprint gets its own URL prefix, templates folder, and routes file.",
                "files": [
                    {
                        "name": "app/auth/routes.py",
                        "lang": "python",
                        "code": """\
from flask import Blueprint, render_template, redirect, url_for, flash
from flask_login import login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from app.extensions import db
from app.models import User
from .forms import LoginForm, RegisterForm

auth_bp = Blueprint('auth', __name__, template_folder='templates')

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        user = User(
            email    = form.email.data,
            password = generate_password_hash(form.password.data)
        )
        db.session.add(user)
        db.session.commit()
        flash('Account created. Please log in.', 'success')
        return redirect(url_for('auth.login'))
    return render_template('auth/register.html', form=form)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and check_password_hash(user.password, form.password.data):
            login_user(user)  # creates the session cookie
            return redirect(url_for('posts.list_posts'))
        flash('Invalid email or password', 'error')
    return render_template('auth/login.html', form=form)

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()  # clears the session cookie
    return redirect(url_for('auth.login'))"""
                    }
                ]
            },
            {
                "title": "Custom Error Pages",
                "explanation": "Flask lets you register custom HTML pages for HTTP errors like 404 (not found) and 500 (server error). Without these, users see a plain white error page from the browser.",
                "files": [
                    {
                        "name": "app/errors.py",
                        "lang": "python",
                        "code": """\
from flask import render_template

def register_errors(app):
    @app.errorhandler(404)
    def not_found(e):
        return render_template('errors/404.html'), 404

    @app.errorhandler(500)
    def server_error(e):
        return render_template('errors/500.html'), 500"""
                    },
                    {
                        "name": "app/templates/errors/404.html",
                        "lang": "html",
                        "code": """\
{% extends "base.html" %}
{% block content %}
<div style="text-align:center; padding: 60px 0;">
  <h1 style="font-size: 5rem; margin:0;">404</h1>
  <p>That page doesn't exist.</p>
  <a href="{{ url_for('posts.list_posts') }}">Go back home</a>
</div>
{% endblock %}"""
                    },
                    {
                        "name": "app/templates/errors/500.html",
                        "lang": "html",
                        "code": """\
{% extends "base.html" %}
{% block content %}
<div style="text-align:center; padding: 60px 0;">
  <h1 style="font-size: 5rem; margin:0;">500</h1>
  <p>Something went wrong on our end. Try again shortly.</p>
  <a href="{{ url_for('posts.list_posts') }}">Go back home</a>
</div>
{% endblock %}"""
                    }
                ]
            },
        ]
    },

    "xrpl": {
        "title": "XRPL",
        "color": "#346AA9",
        "description": "Interact with the XRP Ledger testnet — create wallets, check balances, send payments, set trust lines, create escrows, and mint NFTs. All examples use a thin FastAPI backend with HTML pages.",
        "install": "pyoffline install --bundle xrpl fastapi",
        "run": "uvicorn main:app --reload  (then open http://localhost:8000/static/index.html)",
        "steps": [
            {
                "title": "Project Setup",
                "explanation": "These examples use xrpl-py to talk to the XRP Ledger testnet and a small FastAPI server to expose it to the browser. Never use your real mainnet wallet seed in code — always start with a testnet wallet.",
                "files": [
                    {
                        "name": "structure.txt",
                        "lang": "text",
                        "code": """\
xrpl_app/
  main.py        ← FastAPI app with all XRPL endpoints
  xrpl_client.py ← shared XRPL client helper
  static/
    index.html   ← wallet dashboard
    send.html    ← send payment page
    history.html ← transaction history page
    escrow.html  ← escrow page
    nft.html     ← NFT page
  .env           ← WALLET_SEED (testnet only!)"""
                    },
                    {
                        "name": "xrpl_client.py",
                        "lang": "python",
                        "code": """\
from xrpl.clients import JsonRpcClient

# Testnet URL — safe to use for development, tokens have no real value
TESTNET_URL = "https://s.altnet.rippletest.net:51234"

def get_client():
    return JsonRpcClient(TESTNET_URL)"""
                    }
                ]
            },
            {
                "title": "Create & Fund a Wallet",
                "explanation": "The XRPL testnet has a faucet that creates a wallet and sends it 1000 test XRP for free. The wallet has two important values: the classic_address (public, like an account number) and the seed (private, like a password — never share it).",
                "files": [
                    {
                        "name": "main.py (wallet endpoint)",
                        "lang": "python",
                        "code": """\
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from xrpl.wallet import generate_faucet_wallet
from xrpl.models.requests import AccountInfo
from xrpl_client import get_client
import xrpl.utils

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.post("/wallet/create")
def create_wallet():
    client = get_client()
    # generate_faucet_wallet creates a new wallet AND funds it with 1000 test XRP
    wallet = generate_faucet_wallet(client, debug=True)
    return {
        "address": wallet.classic_address,  # public — share this to receive XRP
        "seed":    wallet.seed,             # PRIVATE — never share or store in plain text
        "balance": "1000 XRP (testnet)"
    }"""
                    },
                    {
                        "name": "static/index.html",
                        "lang": "html",
                        "code": """\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>XRPL Wallet</title>
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; background: #f0f4f8; }
    .card { background: white; padding: 20px; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 1px 4px rgba(0,0,0,.1); }
    button { padding: 10px 20px; background: #346AA9; color: white; border: none; cursor: pointer; border-radius: 4px; }
    .address { font-family: monospace; word-break: break-all; background: #f5f5f5; padding: 8px; border-radius: 4px; }
    nav a { margin-right: 12px; color: #346AA9; text-decoration: none; }
  </style>
</head>
<body>
  <nav>
    <a href="index.html">Wallet</a>
    <a href="send.html">Send</a>
    <a href="history.html">History</a>
    <a href="escrow.html">Escrow</a>
    <a href="nft.html">NFTs</a>
  </nav>

  <div class="card">
    <h2>Create Testnet Wallet</h2>
    <p>Creates a new wallet and funds it with 1,000 test XRP from the faucet.</p>
    <button onclick="createWallet()">Create Wallet</button>
    <div id="result" style="margin-top:16px;"></div>
  </div>

  <script>
    async function createWallet() {
      // Tell the user something is happening
      document.getElementById("result").textContent = "Creating wallet...";

      // Ask our FastAPI backend to create the wallet
      const res  = await fetch("/wallet/create", { method: "POST" });
      const data = await res.json(); // parse the JSON response

      if (res.ok) {
        // Display the wallet address and seed
        document.getElementById("result").innerHTML = `
          <p><strong>Address</strong> (public — safe to share):</p>
          <div class="address">${data.address}</div>
          <p><strong>Seed</strong> (PRIVATE — save this securely, never share it):</p>
          <div class="address" style="color:red">${data.seed}</div>
          <p>Balance: ${data.balance}</p>`;

        // Save address and seed so other pages can use them
        localStorage.setItem("xrpl_address", data.address);
        localStorage.setItem("xrpl_seed", data.seed);
      } else {
        document.getElementById("result").textContent = "Error: " + data.detail;
      }
    }
  </script>
</body>
</html>"""
                    }
                ]
            },
            {
                "title": "Check Balance",
                "explanation": "AccountInfo returns all information about an account including its XRP balance. The balance is stored in drops (1 XRP = 1,000,000 drops) so we divide by a million to get the human-readable amount.",
                "files": [
                    {
                        "name": "main.py (balance endpoint)",
                        "lang": "python",
                        "code": """\
from xrpl.models.requests import AccountInfo
import xrpl.utils

@app.get("/balance/{address}")
def get_balance(address: str):
    client = get_client()
    request  = AccountInfo(account=address, ledger_index="validated")
    response = client.request(request)
    if response.is_successful():
        drops  = int(response.result["account_data"]["Balance"])
        xrp    = xrpl.utils.drops_to_xrp(str(drops))  # convert drops to XRP
        return {"address": address, "balance_xrp": float(xrp), "balance_drops": drops}
    return {"error": response.result.get("error_message", "Unknown error")}"""
                    }
                ]
            },
            {
                "title": "Send Payment",
                "explanation": "A Payment transaction transfers XRP from one address to another. It must be signed with the sender's seed (private key) before being submitted to the ledger.",
                "files": [
                    {
                        "name": "main.py (payment endpoint)",
                        "lang": "python",
                        "code": """\
from pydantic import BaseModel
from xrpl.models.transactions import Payment
from xrpl.transaction import submit_and_wait
from xrpl.wallet import Wallet
import xrpl.utils

class PaymentRequest(BaseModel):
    seed:        str    # sender's private seed
    destination: str    # receiver's address
    amount_xrp:  float  # how much XRP to send

@app.post("/payment/send")
def send_payment(data: PaymentRequest):
    client = get_client()
    wallet = Wallet.from_seed(data.seed)  # reconstruct the wallet from the seed
    drops  = xrpl.utils.xrp_to_drops(data.amount_xrp)  # convert XRP to drops

    tx = Payment(
        account=wallet.classic_address,
        destination=data.destination,
        amount=drops,
        destination_tag=0,  # required by some exchanges; use 0 if unsure
    )

    response = submit_and_wait(tx, client, wallet)  # sign, submit, and wait for confirmation
    if response.is_successful():
        return {"tx_hash": response.result["hash"], "status": "confirmed"}
    return {"error": response.result.get("engine_result_message", "Failed")}"""
                    },
                    {
                        "name": "static/send.html",
                        "lang": "html",
                        "code": """\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><title>Send XRP</title>
  <style>
    body { font-family: sans-serif; max-width: 500px; margin: 40px auto; padding: 0 20px; }
    input { display: block; width: 100%; padding: 8px; margin: 6px 0; box-sizing: border-box; }
    button { padding: 10px 20px; background: #346AA9; color: white; border: none; cursor: pointer; border-radius: 4px; }
    #result { margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; display: none; }
  </style>
</head>
<body>
  <h2>Send XRP</h2>

  <label>Your Seed (private key)</label>
  <!-- Pre-fill with the seed saved on the wallet page -->
  <input type="text" id="seed" placeholder="sXXXXXX...">

  <label>Destination Address</label>
  <input type="text" id="destination" placeholder="rXXXXXX...">

  <label>Amount (XRP)</label>
  <input type="number" id="amount" placeholder="10" min="1" step="0.000001">

  <button onclick="sendPayment()">Send</button>

  <div id="result"></div>

  <script>
    // Pre-fill the seed from localStorage if available
    const saved = localStorage.getItem("xrpl_seed");
    if (saved) document.getElementById("seed").value = saved;

    async function sendPayment() {
      const result = document.getElementById("result");
      result.style.display = "block";
      result.textContent = "Submitting transaction...";

      // Collect the form values
      const body = {
        seed:        document.getElementById("seed").value,
        destination: document.getElementById("destination").value,
        amount_xrp:  parseFloat(document.getElementById("amount").value)
      };

      // Send to our backend as JSON
      const res  = await fetch("/payment/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();

      if (res.ok) {
        result.innerHTML = `
          <p style="color:green">Payment confirmed!</p>
          <p>Transaction hash:<br>
          <code>${data.tx_hash}</code></p>`;
      } else {
        result.innerHTML = `<p style="color:red">Error: ${data.error}</p>`;
      }
    }
  </script>
</body>
</html>"""
                    }
                ]
            },
            {
                "title": "Transaction History",
                "explanation": "account_tx returns a list of all transactions involving an account. We pull the important fields from each one and return them as a table on the page.",
                "files": [
                    {
                        "name": "main.py (history endpoint)",
                        "lang": "python",
                        "code": """\
from xrpl.models.requests import AccountTx

@app.get("/history/{address}")
def get_history(address: str, limit: int = 10):
    client   = get_client()
    request  = AccountTx(account=address, limit=limit)
    response = client.request(request)
    if not response.is_successful():
        return {"error": "Could not fetch history"}

    rows = []
    for entry in response.result.get("transactions", []):
        tx = entry.get("tx", {})
        rows.append({
            "type":        tx.get("TransactionType"),
            "amount_drops": tx.get("Amount", "N/A"),
            "destination": tx.get("Destination", "—"),
            "hash":        tx.get("hash", ""),
            "date":        tx.get("date", ""),
        })
    return {"transactions": rows}"""
                    },
                    {
                        "name": "static/history.html",
                        "lang": "html",
                        "code": """\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><title>Transaction History</title>
  <style>
    body { font-family: sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; }
    table { width: 100%; border-collapse: collapse; font-size: 0.9em; }
    th, td { padding: 8px 12px; border-bottom: 1px solid #ddd; text-align: left; }
    th { background: #346AA9; color: white; }
    code { font-size: 0.8em; word-break: break-all; }
    button { padding: 8px 16px; background: #346AA9; color: white; border: none; cursor: pointer; }
    input { padding: 8px; width: 60%; }
  </style>
</head>
<body>
  <h2>Transaction History</h2>

  <!-- Pre-filled with the address saved on the wallet page -->
  <input type="text" id="address" placeholder="rXXXXXX...">
  <button onclick="loadHistory()">Load</button>

  <table id="historyTable" style="margin-top:16px; display:none;">
    <thead><tr><th>Type</th><th>Amount (drops)</th><th>Destination</th><th>Hash</th></tr></thead>
    <tbody id="rows"></tbody>
  </table>

  <script>
    // Pre-fill address from localStorage
    const saved = localStorage.getItem("xrpl_address");
    if (saved) document.getElementById("address").value = saved;

    async function loadHistory() {
      const address = document.getElementById("address").value;

      // Fetch the history from our backend
      const res  = await fetch(`/history/${address}`);
      const data = await res.json();

      const tbody = document.getElementById("rows");
      tbody.innerHTML = ""; // clear previous rows

      if (data.error) {
        tbody.innerHTML = `<tr><td colspan="4" style="color:red">${data.error}</td></tr>`;
      } else {
        data.transactions.forEach(tx => {   // loop over each transaction
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${tx.type}</td>
            <td>${tx.amount_drops}</td>
            <td>${tx.destination}</td>
            <td><code>${tx.hash.slice(0, 16)}...</code></td>`;   // show first 16 chars of hash
          tbody.appendChild(tr);
        });
      }

      document.getElementById("historyTable").style.display = "table"; // show the table
    }
  </script>
</body>
</html>"""
                    }
                ]
            },
            {
                "title": "Trust Lines",
                "explanation": "A trust line tells the ledger that you trust a specific issuer to owe you a custom token (like a stablecoin). Without it, you cannot receive that token. TrustSet sets the maximum amount you're willing to hold.",
                "files": [
                    {
                        "name": "main.py (trust line endpoint)",
                        "lang": "python",
                        "code": """\
from xrpl.models.transactions import TrustSet
from xrpl.models.amounts import IssuedCurrencyAmount

class TrustLineRequest(BaseModel):
    seed:     str    # your private seed
    issuer:   str    # the address of the token issuer
    currency: str    # 3-letter currency code, e.g. "USD"
    limit:    str    # maximum amount you trust them to owe you, e.g. "1000"

@app.post("/trustline/set")
def set_trust_line(data: TrustLineRequest):
    client = get_client()
    wallet = Wallet.from_seed(data.seed)

    tx = TrustSet(
        account=wallet.classic_address,
        limit_amount=IssuedCurrencyAmount(
            currency=data.currency,
            issuer=data.issuer,
            value=data.limit
        )
    )

    response = submit_and_wait(tx, client, wallet)
    if response.is_successful():
        return {"status": "trust line set", "tx_hash": response.result["hash"]}
    return {"error": response.result.get("engine_result_message")}"""
                    }
                ]
            },
            {
                "title": "Escrow",
                "explanation": "An escrow locks XRP until either a set time passes or a crypto-condition is fulfilled. This is useful for delayed payments or trustless agreements. EscrowCreate locks the funds; EscrowFinish releases them.",
                "files": [
                    {
                        "name": "main.py (escrow endpoints)",
                        "lang": "python",
                        "code": """\
from xrpl.models.transactions import EscrowCreate, EscrowFinish
from xrpl.models.requests import AccountInfo
import time

class EscrowRequest(BaseModel):
    seed:         str    # sender's seed
    destination:  str    # who receives the XRP when it unlocks
    amount_xrp:   float
    finish_after_seconds: int  # how many seconds from now until the funds unlock

@app.post("/escrow/create")
def create_escrow(data: EscrowRequest):
    client    = get_client()
    wallet    = Wallet.from_seed(data.seed)
    drops     = xrpl.utils.xrp_to_drops(data.amount_xrp)

    # XRPL time is seconds since Jan 1 2000, not Unix epoch
    xrpl_epoch_offset = 946684800
    finish_after = int(time.time()) - xrpl_epoch_offset + data.finish_after_seconds

    tx = EscrowCreate(
        account=wallet.classic_address,
        destination=data.destination,
        amount=drops,
        finish_after=finish_after
    )

    response = submit_and_wait(tx, client, wallet)
    if response.is_successful():
        return {
            "tx_hash": response.result["hash"],
            "sequence": response.result["Sequence"],  # needed to finish/cancel the escrow later
            "unlocks_in_seconds": data.finish_after_seconds
        }
    return {"error": response.result.get("engine_result_message")}

class EscrowFinishRequest(BaseModel):
    seed:            str
    owner:           str  # address that created the escrow
    offer_sequence:  int  # the Sequence from the EscrowCreate response

@app.post("/escrow/finish")
def finish_escrow(data: EscrowFinishRequest):
    client = get_client()
    wallet = Wallet.from_seed(data.seed)
    tx = EscrowFinish(
        account=wallet.classic_address,
        owner=data.owner,
        offer_sequence=data.offer_sequence
    )
    response = submit_and_wait(tx, client, wallet)
    if response.is_successful():
        return {"status": "escrow released", "tx_hash": response.result["hash"]}
    return {"error": response.result.get("engine_result_message")}"""
                    }
                ]
            },
            {
                "title": "Mint an NFT",
                "explanation": "NFTokenMint creates a non-fungible token on the XRPL. The URI field typically points to the token's metadata (a JSON file describing the NFT). Flags=8 means the NFT can be transferred to others.",
                "files": [
                    {
                        "name": "main.py (NFT endpoint)",
                        "lang": "python",
                        "code": """\
from xrpl.models.transactions import NFTokenMint

class NFTMintRequest(BaseModel):
    seed:         str
    uri:          str   # URL pointing to the NFT metadata (e.g. ipfs://... or https://...)
    taxon:        int   # a number you choose to categorize your NFTs
    transfer_fee: int   # royalty in basis points (0–50000). 1000 = 10%

@app.post("/nft/mint")
def mint_nft(data: NFTMintRequest):
    client = get_client()
    wallet = Wallet.from_seed(data.seed)

    # URI must be hex-encoded
    uri_hex = data.uri.encode("utf-8").hex().upper()

    tx = NFTokenMint(
        account=wallet.classic_address,
        uri=uri_hex,
        nftoken_taxon=data.taxon,
        transfer_fee=data.transfer_fee,
        flags=8,  # tfTransferable — allows this NFT to be sold/transferred
    )

    response = submit_and_wait(tx, client, wallet)
    if response.is_successful():
        # The NFT ID is in the metadata of the transaction
        nfts = response.result.get("meta", {}).get("nftoken_id", "")
        return {"status": "minted", "tx_hash": response.result["hash"], "nftoken_id": nfts}
    return {"error": response.result.get("engine_result_message")}"""
                    },
                    {
                        "name": "static/nft.html",
                        "lang": "html",
                        "code": """\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><title>Mint NFT</title>
  <style>
    body { font-family: sans-serif; max-width: 500px; margin: 40px auto; padding: 0 20px; }
    input { display: block; width: 100%; padding: 8px; margin: 6px 0; box-sizing: border-box; }
    button { padding: 10px 20px; background: #346AA9; color: white; border: none; cursor: pointer; border-radius: 4px; }
    #result { margin-top: 16px; background: #f5f5f5; padding: 12px; border-radius: 4px; display: none; word-break: break-all; }
  </style>
</head>
<body>
  <h2>Mint an NFT</h2>

  <label>Your Seed</label>
  <input type="text" id="seed" placeholder="sXXXXXX...">

  <label>Metadata URI (where the NFT's data lives)</label>
  <input type="text" id="uri" placeholder="https://example.com/nft/1.json">

  <label>Taxon (your category number, e.g. 0)</label>
  <input type="number" id="taxon" value="0" min="0">

  <label>Transfer Fee (basis points, e.g. 1000 = 10%)</label>
  <input type="number" id="fee" value="0" min="0" max="50000">

  <button onclick="mintNFT()">Mint NFT</button>
  <div id="result"></div>

  <script>
    const savedSeed = localStorage.getItem("xrpl_seed");
    if (savedSeed) document.getElementById("seed").value = savedSeed;

    async function mintNFT() {
      const result = document.getElementById("result");
      result.style.display = "block";
      result.textContent = "Minting...";

      // Collect values from the form
      const body = {
        seed:         document.getElementById("seed").value,
        uri:          document.getElementById("uri").value,
        taxon:        parseInt(document.getElementById("taxon").value),
        transfer_fee: parseInt(document.getElementById("fee").value)
      };

      const res  = await fetch("/nft/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)   // send as JSON to the backend
      });
      const data = await res.json();

      if (res.ok) {
        result.innerHTML = `
          <p style="color:green"><strong>NFT Minted!</strong></p>
          <p>Transaction hash:<br><code>${data.tx_hash}</code></p>
          <p>NFToken ID:<br><code>${data.nftoken_id || "See transaction on explorer"}</code></p>`;
      } else {
        result.innerHTML = `<p style="color:red">Error: ${data.error}</p>`;
      }
    }
  </script>
</body>
</html>"""
                    }
                ]
            },
        ]
    },
}


# ---------------------------------------------------------------------------
# HTML renderer
# ---------------------------------------------------------------------------

def _e(text: str) -> str:
    return html_escape_module.escape(str(text))


# ---- Syntax highlighter (Python-side, outputs <span> tags) ----

_PY_KEYWORDS = {
    'def','class','import','from','return','if','else','elif','for','while',
    'with','try','except','finally','True','False','None','and','or','not',
    'in','is','pass','yield','async','await','raise','lambda','as','global',
    'nonlocal','del','break','continue','assert','print',
}
_PY_BUILTINS = {
    'len','range','str','int','float','bool','list','dict','set','tuple',
    'type','isinstance','hasattr','getattr','setattr','open','super',
    'property','staticmethod','classmethod','enumerate','zip','map','filter',
    'sorted','reversed','any','all','min','max','sum','abs','round',
}


def _hl_python(code: str) -> str:
    out, i, n = [], 0, len(code)
    while i < n:
        c = code[i]
        # Comment
        if c == '#':
            end = code.find('\n', i)
            end = n if end == -1 else end
            out.append(f'<span class="hl-comment">{_e(code[i:end])}</span>')
            i = end
        # Triple-quoted string
        elif code[i:i+3] in ('"""', "'''"):
            q = code[i:i+3]
            end = code.find(q, i + 3)
            end = (n if end == -1 else end + 3)
            out.append(f'<span class="hl-string">{_e(code[i:end])}</span>')
            i = end
        # Single/double quoted string
        elif c in ('"', "'"):
            j = i + 1
            while j < n:
                if code[j] == '\\':
                    j += 2; continue
                if code[j] == c or code[j] == '\n':
                    j += (1 if code[j] == c else 0); break
                j += 1
            out.append(f'<span class="hl-string">{_e(code[i:j])}</span>')
            i = j
        # Decorator
        elif c == '@':
            j = i + 1
            while j < n and (code[j].isalnum() or code[j] in ('_', '.')):
                j += 1
            out.append(f'<span class="hl-decorator">{_e(code[i:j])}</span>')
            i = j
        # Number
        elif c.isdigit() or (c == '.' and i + 1 < n and code[i + 1].isdigit()):
            j = i
            while j < n and (code[j].isdigit() or code[j] in ('.', '_', 'x', 'X', 'e', 'E', 'b', 'B', 'o', 'O')):
                j += 1
            out.append(f'<span class="hl-number">{_e(code[i:j])}</span>')
            i = j
        # Identifier
        elif c.isalpha() or c == '_':
            j = i
            while j < n and (code[j].isalnum() or code[j] == '_'):
                j += 1
            word = code[i:j]
            if word in _PY_KEYWORDS:
                out.append(f'<span class="hl-keyword">{_e(word)}</span>')
            elif word in _PY_BUILTINS:
                out.append(f'<span class="hl-builtin">{_e(word)}</span>')
            else:
                out.append(_e(word))
            i = j
        else:
            out.append(_e(c))
            i += 1
    return ''.join(out)


def _hl_html(code: str) -> str:
    """Highlight HTML including Jinja2/Django template tags."""
    import re
    # Work on raw code, emit spans around tokens
    out, i, n = [], 0, len(code)
    while i < n:
        # Template comment {# ... #}
        if code[i:i+2] == '{#':
            end = code.find('#}', i + 2)
            end = (n if end == -1 else end + 2)
            out.append(f'<span class="hl-comment">{_e(code[i:end])}</span>')
            i = end
        # Template tag {% ... %}
        elif code[i:i+2] == '{%':
            end = code.find('%}', i + 2)
            end = (n if end == -1 else end + 2)
            out.append(f'<span class="hl-template">{_e(code[i:end])}</span>')
            i = end
        # Template variable {{ ... }}
        elif code[i:i+2] == '{{':
            end = code.find('}}', i + 2)
            end = (n if end == -1 else end + 2)
            out.append(f'<span class="hl-template">{_e(code[i:end])}</span>')
            i = end
        # HTML comment <!-- ... -->
        elif code[i:i+4] == '<!--':
            end = code.find('-->', i + 4)
            end = (n if end == -1 else end + 3)
            out.append(f'<span class="hl-comment">{_e(code[i:end])}</span>')
            i = end
        # HTML tag
        elif code[i] == '<':
            j = i + 1
            # collect tag until >
            depth = 1
            while j < n and depth > 0:
                if code[j] == '>': depth -= 1
                j += 1
            tag_raw = code[i:j]
            # Highlight inside the tag: tag name, attrs, strings
            tag_hl = _hl_tag_interior(tag_raw)
            out.append(tag_hl)
            i = j
        else:
            out.append(_e(code[i]))
            i += 1
    return ''.join(out)


def _hl_tag_interior(tag: str) -> str:
    """Color the inside of an HTML tag (<...>)."""
    import re
    # tag name
    result = tag
    # Escape first, then wrap spans (safe because we're working on raw text)
    esc = _e(tag)
    # Tag name: first word after < or </
    esc = re.sub(
        r'(&lt;/?)([\w-]+)',
        r'\1<span class="hl-tag">\2</span>',
        esc, count=1
    )
    # Attribute names (word before =)
    esc = re.sub(
        r'\b([\w-]+)(=)',
        r'<span class="hl-attr">\1</span>\2',
        esc
    )
    # Attribute values in quotes
    esc = re.sub(
        r'(=)(&quot;[^&]*?&quot;|&#x27;[^&]*?&#x27;)',
        r'\1<span class="hl-string">\2</span>',
        esc
    )
    return esc


def _hl_bash(code: str) -> str:
    out, i, n = [], 0, len(code)
    _bash_kw = {'if','then','else','fi','for','while','do','done','case','esac',
                'function','return','export','source','echo','cd','pip','python',
                'python3','uvicorn','flask','django-admin','manage','gunicorn'}
    while i < n:
        c = code[i]
        # Comment
        if c == '#':
            end = code.find('\n', i)
            end = n if end == -1 else end
            out.append(f'<span class="hl-comment">{_e(code[i:end])}</span>')
            i = end
        # String
        elif c in ('"', "'"):
            j = i + 1
            while j < n:
                if code[j] == '\\':
                    j += 2; continue
                if code[j] == c:
                    j += 1; break
                j += 1
            out.append(f'<span class="hl-string">{_e(code[i:j])}</span>')
            i = j
        # Variable $VAR or ${VAR}
        elif c == '$':
            j = i + 1
            if j < n and code[j] == '{':
                end = code.find('}', j)
                j = end + 1 if end != -1 else n
            else:
                while j < n and (code[j].isalnum() or code[j] == '_'):
                    j += 1
            out.append(f'<span class="hl-attr">{_e(code[i:j])}</span>')
            i = j
        # Identifier / keyword
        elif c.isalpha() or c == '_':
            j = i
            while j < n and (code[j].isalnum() or code[j] in ('_', '-', '.')):
                j += 1
            word = code[i:j]
            if word in _bash_kw:
                out.append(f'<span class="hl-keyword">{_e(word)}</span>')
            else:
                out.append(_e(word))
            i = j
        else:
            out.append(_e(c))
            i += 1
    return ''.join(out)


def _highlight(code: str, lang: str) -> str:
    if lang == 'python':
        return _hl_python(code)
    if lang in ('html', 'jinja2'):
        return _hl_html(code)
    if lang == 'bash':
        return _hl_bash(code)
    return _e(code)  # plain text / unknown


def _render_step(step: dict, idx: int) -> str:
    files = step.get("files", [])
    tabs_html = ""
    panels_html = ""
    step_id = f"step{idx}"

    for fi, f in enumerate(files):
        active = "active" if fi == 0 else ""
        tab_id = f"{step_id}_tab{fi}"
        tabs_html += f'<button class="tab-btn {active}" onclick="switchTab(\'{step_id}\',{fi})" id="{tab_id}">{_e(f["name"])}</button>'
        code = _highlight(f["code"], f["lang"])
        panels_html += f'''
<div class="tab-panel {active}" id="{step_id}_panel{fi}">
  <div class="code-header">
    <span class="lang-label">{_e(f["lang"])}</span>
    <button class="copy-btn" onclick="copyCode(this)">Copy</button>
  </div>
  <pre><code>{code}</code></pre>
</div>'''

    return f'''
<div class="step" id="{step_id}">
  <div class="step-number">{idx}</div>
  <div class="step-content">
    <h3>{_e(step["title"])}</h3>
    <p class="explanation">{_e(step["explanation"])}</p>
    <div class="tabs" data-step="{step_id}">
      <div class="tab-bar">{tabs_html}</div>
      {panels_html}
    </div>
  </div>
</div>'''


def _render_guide(name: str, guide: dict) -> str:
    color = guide["color"]
    steps_html = "".join(_render_step(s, i + 1) for i, s in enumerate(guide["steps"]))
    nav_items = "".join(
        f'<li><a href="#step{i+1}">{_e(s["title"])}</a></li>'
        for i, s in enumerate(guide["steps"])
    )

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{_e(guide["title"])} Guide — pyoffline</title>
{_shared_styles(color)}
</head>
<body>
<div class="layout">
  <aside class="sidebar">
    <a href="index.html" class="back-link">← All Guides</a>
    <h2>{_e(guide["title"])}</h2>
    <nav><ol>{nav_items}</ol></nav>
    <div class="install-box">
      <p><strong>Install</strong></p>
      <code>{_e(guide["install"])}</code>
      <p style="margin-top:12px"><strong>Run</strong></p>
      <code>{_e(guide["run"])}</code>
    </div>
    <div class="theme-row">
      <span class="theme-label">Dark</span>
      <label class="toggle-switch">
        <input type="checkbox" id="themeToggle">
        <span class="slider"></span>
      </label>
      <span class="theme-label">Light</span>
    </div>
  </aside>
  <main>
    <header class="guide-header" style="border-left: 5px solid {color}">
      <h1>{_e(guide["title"])}</h1>
      <p>{_e(guide["description"])}</p>
    </header>
    <div class="steps">{steps_html}</div>
  </main>
</div>
{_shared_scripts()}
</body>
</html>'''


def _render_index() -> str:
    cards = ""
    for name, guide in GUIDES.items():
        color = guide["color"]
        step_count = len(guide["steps"])
        cards += f'''
<a href="{name}.html" class="card" style="border-top: 4px solid {color}">
  <h2 style="color:{color}">{_e(guide["title"])}</h2>
  <p>{_e(guide["description"])}</p>
  <span class="badge">{step_count} steps</span>
</a>'''

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>pyoffline Knowledge Base</title>
{_shared_styles("#555")}
<style>
  .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; padding: 0 40px 40px; }}
  .card {{ background: var(--surface); padding: 24px; border-radius: 8px; text-decoration: none; color: inherit; display: block; transition: transform .15s, box-shadow .15s; box-shadow: 0 1px 4px var(--shadow); }}
  .card:hover {{ transform: translateY(-3px); box-shadow: 0 4px 12px var(--shadow); }}
  .card h2 {{ margin: 0 0 8px; font-size: 1.3rem; }}
  .card p {{ color: var(--text-muted); font-size: 0.9rem; margin: 0 0 12px; }}
  .badge {{ background: var(--surface2); padding: 3px 8px; border-radius: 12px; font-size: 0.8rem; color: var(--text-dim); }}
  .hero {{ padding: 48px 40px 28px; text-align: center; }}
  .hero h1 {{ font-size: 2.2rem; margin-bottom: 8px; }}
  .hero p {{ color: var(--text-muted); font-size: 1rem; margin-bottom: 20px; }}
</style>
</head>
<body>
<div class="hero">
  <h1>pyoffline Knowledge Base</h1>
  <p>Step-by-step guides for building real apps — works fully offline</p>
  <div class="theme-row" style="justify-content:center">
    <span class="theme-label">Dark</span>
    <label class="toggle-switch">
      <input type="checkbox" id="themeToggle">
      <span class="slider"></span>
    </label>
    <span class="theme-label">Light</span>
  </div>
</div>
<div class="grid">{cards}</div>
{_shared_scripts()}
</body>
</html>'''


def _shared_styles(accent: str) -> str:
    return f'''<style>
/* ── Theme variables ───────────────────────────────────────── */
:root {{
  --bg:          #121212;
  --surface:     #1e1e1e;
  --surface2:    #2a2a2a;
  --sidebar-bg:  #1a1a1a;
  --text:        #e0e0e0;
  --text-muted:  #aaa;
  --text-dim:    #666;
  --border:      #333;
  --code-bg:     #1e1e1e;
  --code-text:   #d4d4d4;
  --shadow:      rgba(0,0,0,.4);
  /* syntax — dark (VSCode Dark+) */
  --hl-keyword:  #569cd6;
  --hl-string:   #ce9178;
  --hl-comment:  #6a9955;
  --hl-number:   #b5cea8;
  --hl-decorator:#dcdcaa;
  --hl-builtin:  #4ec9b0;
  --hl-tag:      #4ec9b0;
  --hl-attr:     #9cdcfe;
  --hl-template: #c586c0;
}}
html.light {{
  --bg:          #f5f7fa;
  --surface:     #ffffff;
  --surface2:    #eef0f3;
  --sidebar-bg:  #ffffff;
  --text:        #1a1a1a;
  --text-muted:  #555;
  --text-dim:    #888;
  --border:      #dde1e7;
  --code-bg:     #f8f8f8;
  --code-text:   #24292e;
  --shadow:      rgba(0,0,0,.1);
  /* syntax — light (VSCode Light) */
  --hl-keyword:  #0000ff;
  --hl-string:   #a31515;
  --hl-comment:  #008000;
  --hl-number:   #098658;
  --hl-decorator:#795e26;
  --hl-builtin:  #267f99;
  --hl-tag:      #800000;
  --hl-attr:     #e50000;
  --hl-template: #af00db;
}}

/* ── Syntax span classes ───────────────────────────────────── */
.hl-keyword  {{ color: var(--hl-keyword);  }}
.hl-string   {{ color: var(--hl-string);   }}
.hl-comment  {{ color: var(--hl-comment); font-style: italic; }}
.hl-number   {{ color: var(--hl-number);   }}
.hl-decorator{{ color: var(--hl-decorator);}}
.hl-builtin  {{ color: var(--hl-builtin);  }}
.hl-tag      {{ color: var(--hl-tag);      }}
.hl-attr     {{ color: var(--hl-attr);     }}
.hl-template {{ color: var(--hl-template); }}

/* ── Base ──────────────────────────────────────────────────── */
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{ background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; transition: background .2s, color .2s; }}
a {{ color: {accent}; }}

/* ── Layout ────────────────────────────────────────────────── */
.layout {{ display: flex; min-height: 100vh; }}
.sidebar {{ width: 260px; min-width: 260px; background: var(--sidebar-bg); border-right: 1px solid var(--border); padding: 24px 16px; position: sticky; top: 0; height: 100vh; overflow-y: auto; }}
.sidebar h2 {{ font-size: 1.1rem; margin: 16px 0 8px; color: var(--text); }}
.sidebar nav ol {{ padding-left: 18px; }}
.sidebar nav li {{ margin: 6px 0; }}
.sidebar nav a {{ color: var(--text-muted); text-decoration: none; font-size: 0.85rem; }}
.sidebar nav a:hover {{ color: {accent}; }}
.back-link {{ color: var(--text-dim); text-decoration: none; font-size: 0.85rem; display: block; margin-bottom: 8px; }}
.install-box {{ margin-top: 24px; background: var(--bg); border: 1px solid var(--border); padding: 12px; border-radius: 6px; font-size: 0.8rem; }}
.install-box code {{ display: block; word-break: break-all; color: var(--hl-comment); font-family: monospace; }}
main {{ flex: 1; padding: 40px; max-width: 860px; }}
.guide-header {{ padding: 20px 20px 20px 24px; background: var(--surface); border-radius: 8px; margin-bottom: 32px; box-shadow: 0 1px 3px var(--shadow); }}
.guide-header h1 {{ font-size: 1.8rem; margin-bottom: 8px; }}
.guide-header p {{ color: var(--text-muted); }}

/* ── Steps ─────────────────────────────────────────────────── */
.step {{ display: flex; gap: 16px; margin-bottom: 40px; }}
.step-number {{ width: 32px; min-width: 32px; height: 32px; background: {accent}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9rem; margin-top: 4px; color: #fff; }}
.step-content {{ flex: 1; }}
.step-content h3 {{ font-size: 1.1rem; margin-bottom: 8px; color: var(--text); }}
.explanation {{ color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 14px; }}

/* ── Code tabs ─────────────────────────────────────────────── */
.tabs {{ background: var(--surface); border-radius: 6px; overflow: hidden; border: 1px solid var(--border); }}
.tab-bar {{ display: flex; background: var(--surface2); overflow-x: auto; border-bottom: 1px solid var(--border); }}
.tab-btn {{ padding: 8px 16px; background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.8rem; white-space: nowrap; border-bottom: 2px solid transparent; margin-bottom: -1px; }}
.tab-btn.active {{ color: var(--text); border-bottom-color: {accent}; }}
.tab-panel {{ display: none; }}
.tab-panel.active {{ display: block; }}
.code-header {{ display: flex; justify-content: space-between; align-items: center; padding: 5px 12px; background: var(--surface2); border-bottom: 1px solid var(--border); }}
.lang-label {{ font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: .04em; }}
.copy-btn {{ background: none; border: 1px solid var(--border); color: var(--text-muted); padding: 2px 8px; cursor: pointer; border-radius: 3px; font-size: 0.72rem; }}
.copy-btn:hover {{ color: var(--text); border-color: var(--text-muted); }}
pre {{ overflow-x: auto; padding: 16px; background: var(--code-bg); }}
code {{ font-family: "Fira Code", "Cascadia Code", "Consolas", monospace; font-size: 0.82rem; line-height: 1.65; color: var(--code-text); }}

/* ── Theme toggle switch ───────────────────────────────────── */
.theme-row {{ display: flex; align-items: center; gap: 8px; margin-top: 20px; }}
.theme-label {{ font-size: 0.78rem; color: var(--text-muted); }}
.toggle-switch {{ position: relative; display: inline-block; width: 40px; height: 22px; }}
.toggle-switch input {{ opacity: 0; width: 0; height: 0; }}
.slider {{ position: absolute; cursor: pointer; inset: 0; background: var(--surface2); border: 1px solid var(--border); border-radius: 22px; transition: background .2s; }}
.slider:before {{ content: ""; position: absolute; width: 16px; height: 16px; left: 2px; top: 2px; background: var(--text-muted); border-radius: 50%; transition: transform .2s, background .2s; }}
.toggle-switch input:checked + .slider {{ background: {accent}; border-color: {accent}; }}
.toggle-switch input:checked + .slider:before {{ transform: translateX(18px); background: #fff; }}
</style>'''


def _shared_scripts() -> str:
    return '''<script>
(function() {
  // Restore saved theme preference before first paint
  var saved = localStorage.getItem("pyoffline-theme");
  if (saved === "light") {
    document.documentElement.classList.add("light"); // apply class immediately
  }
  // Once DOM is ready, sync the checkbox state
  document.addEventListener("DOMContentLoaded", function() {
    var toggle = document.getElementById("themeToggle");
    if (!toggle) return;
    toggle.checked = (localStorage.getItem("pyoffline-theme") === "light");
    toggle.addEventListener("change", function() {
      if (this.checked) {
        document.documentElement.classList.add("light");    // switch to light
        localStorage.setItem("pyoffline-theme", "light");  // remember the choice
      } else {
        document.documentElement.classList.remove("light"); // back to dark
        localStorage.setItem("pyoffline-theme", "dark");
      }
    });
  });
})();

function switchTab(stepId, idx) {
  // Find all tab buttons and panels belonging to this step
  var step   = document.getElementById(stepId);
  var btns   = step.querySelectorAll(".tab-btn");
  var panels = step.querySelectorAll(".tab-panel");
  // Remove active from all, then add it to the clicked one
  btns.forEach(function(b) { b.classList.remove("active"); });
  panels.forEach(function(p) { p.classList.remove("active"); });
  btns[idx].classList.add("active");
  panels[idx].classList.add("active");
}

function copyCode(btn) {
  // Walk up to the panel, find the code block, copy its plain text (no HTML tags)
  var code = btn.closest(".tab-panel").querySelector("code").innerText;
  navigator.clipboard.writeText(code).then(function() {
    var orig = btn.textContent;
    btn.textContent = "Copied!";                              // briefly show confirmation
    setTimeout(function() { btn.textContent = orig; }, 1500); // restore after 1.5s
  });
}
</script>'''


# ---------------------------------------------------------------------------
# Command handlers
# ---------------------------------------------------------------------------

def run(cmd: list[str]) -> int:
    result = subprocess.run(cmd)
    return result.returncode


def load_registry() -> dict:
    if REGISTRY_FILE.exists():
        return json.loads(REGISTRY_FILE.read_text())
    return {"downloaded": []}


def save_registry(data: dict):
    REGISTRY_FILE.write_text(json.dumps(data, indent=2))


def cmd_download(args):
    STORE_DIR.mkdir(parents=True, exist_ok=True)
    registry = load_registry()

    if args.bundle:
        bundles = args.bundle
        if "all" in bundles:
            bundles = list(BUNDLES.keys())
        packages = []
        for b in bundles:
            if b not in BUNDLES:
                print(f"[error] Unknown bundle '{b}'. Available: {', '.join(BUNDLES)}")
                sys.exit(1)
            packages.extend(BUNDLES[b])
        if args.common:
            packages.extend(COMMON)
    elif args.packages:
        packages = args.packages
    elif args.requirements:
        req_path = Path(args.requirements)
        if not req_path.exists():
            print(f"[error] File not found: {req_path}")
            sys.exit(1)
        packages = [f"-r {req_path}"]
    else:
        print("[error] Specify --bundle, --packages, or --requirements")
        sys.exit(1)

    # Deduplicate while preserving order
    seen = set()
    unique = []
    for p in packages:
        if p not in seen:
            seen.add(p)
            unique.append(p)

    print(f"\n[pyoffline] Downloading {len(unique)} package(s) to {STORE_DIR}\n")

    failed = []
    for pkg in unique:
        cmd = [sys.executable, "-m", "pip", "download", "-d", str(STORE_DIR), pkg]
        code = run(cmd)
        if code == 0:
            if pkg not in registry["downloaded"]:
                registry["downloaded"].append(pkg)
        else:
            failed.append(pkg)
            print(f"  [skip] {pkg} — not compatible or not found, continuing...\n")

    save_registry(registry)

    print(f"\n[pyoffline] Done. Store: {STORE_DIR}")
    print(f"  Downloaded: {len(unique) - len(failed)}/{len(unique)}")
    if failed:
        print(f"  Skipped ({len(failed)}):")
        for p in failed:
            print(f"    - {p}")


def cmd_install(args):
    if not STORE_DIR.exists():
        print(f"[error] Store not found at {STORE_DIR}. Run 'pyoffline download' first.")
        sys.exit(1)

    if args.requirements:
        req_path = Path(args.requirements)
        if not req_path.exists():
            print(f"[error] File not found: {req_path}")
            sys.exit(1)
        targets = ["-r", str(req_path)]
    elif args.packages:
        targets = args.packages
    elif args.bundle:
        bundles = args.bundle
        if "all" in bundles:
            bundles = list(BUNDLES.keys())
        targets = []
        for b in bundles:
            if b not in BUNDLES:
                print(f"[error] Unknown bundle '{b}'")
                sys.exit(1)
            targets.extend(BUNDLES[b])
    else:
        print("[error] Specify --bundle, --packages, or --requirements")
        sys.exit(1)

    print(f"\n[pyoffline] Installing from {STORE_DIR} (offline)\n")

    cmd = [
        sys.executable, "-m", "pip", "install",
        "--no-index",
        f"--find-links={STORE_DIR}",
    ] + targets

    code = run(cmd)
    if code != 0:
        print("\n[pyoffline] Install had errors — package may not be in the store.")
        sys.exit(code)


def cmd_list(args):
    if not STORE_DIR.exists():
        print(f"[info] Store not found at {STORE_DIR}. Nothing downloaded yet.")
        return

    files = sorted(STORE_DIR.glob("*.whl")) + sorted(STORE_DIR.glob("*.tar.gz"))
    if not files:
        print(f"[info] Store is empty: {STORE_DIR}")
        return

    if args.bundle:
        bundle = args.bundle
        if bundle not in BUNDLES:
            print(f"[error] Unknown bundle '{bundle}'")
            sys.exit(1)
        print(f"\nExpected packages for '{bundle}':")
        for p in BUNDLES[bundle]:
            print(f"  {p}")
        return

    print(f"\n[pyoffline] Store: {STORE_DIR}")
    print(f"  {len(files)} file(s) cached\n")
    for f in files:
        print(f"  {f.name}")


def cmd_config(args):
    pip_ini = Path(os.environ.get("APPDATA", Path.home())) / "pip" / "pip.ini"

    if args.offline:
        pip_ini.parent.mkdir(parents=True, exist_ok=True)
        pip_ini.write_text(
            f"[global]\nno-index = true\nfind-links = {STORE_DIR}\n"
        )
        print(f"[pyoffline] pip set to offline mode — {pip_ini}")
        print(f"  All pip installs will now use {STORE_DIR}")

    elif args.online:
        if pip_ini.exists():
            pip_ini.unlink()
            print(f"[pyoffline] pip.ini removed — pip is back to online mode.")
        else:
            print("[pyoffline] pip.ini not found — already in online mode.")

    elif args.show:
        if pip_ini.exists():
            print(f"\n[{pip_ini}]\n")
            print(pip_ini.read_text())
        else:
            print(f"[info] No pip.ini found at {pip_ini} — pip is in online mode.")


def cmd_bundles(_args):
    print("\nAvailable bundles:\n")
    for name, packages in BUNDLES.items():
        print(f"  {name} ({len(packages)} packages)")
        for p in packages:
            print(f"    - {p}")
    print(f"\n  common ({len(COMMON)} packages) — add with --common flag")
    for p in COMMON:
        print(f"    - {p}")


def cmd_guide(args):
    if args.generate:
        bundles = [args.bundle] if args.bundle else list(GUIDES.keys())
        for b in bundles:
            if b not in GUIDES:
                print(f"[error] Unknown bundle '{b}'. Available: {', '.join(GUIDES)}")
                sys.exit(1)

        GUIDES_DIR.mkdir(parents=True, exist_ok=True)

        # Always write the index
        index_path = GUIDES_DIR / "index.html"
        index_path.write_text(_render_index(), encoding="utf-8")
        print(f"[pyoffline] Generated: {index_path}")

        for b in bundles:
            out = GUIDES_DIR / f"{b}.html"
            out.write_text(_render_guide(b, GUIDES[b]), encoding="utf-8")
            print(f"[pyoffline] Generated: {out}")

        print(f"\n[pyoffline] Done. Open {GUIDES_DIR / 'index.html'} in your browser.")
        print(f"  Or run: pyoffline guide --open")

    elif args.open:
        target = GUIDES_DIR / (f"{args.bundle}.html" if args.bundle else "index.html")
        if not target.exists():
            print(f"[error] Guide not found at {target}. Run 'pyoffline guide --generate' first.")
            sys.exit(1)
        webbrowser.open(target.as_uri())
        print(f"[pyoffline] Opening {target}")


def main():
    parser = argparse.ArgumentParser(
        prog="pyoffline",
        description="Centralized offline Python package manager for FastAPI, Django, Flask & XRPL",
    )
    sub = parser.add_subparsers(dest="command", required=True)

    # download
    dl = sub.add_parser("download", help="Download packages to the local store (requires internet)")
    dl.add_argument("--bundle", nargs="+", metavar="BUNDLE",
                    help="Bundle name(s): fastapi django flask xrpl all")
    dl.add_argument("--packages", nargs="+", metavar="PKG",
                    help="Individual package names")
    dl.add_argument("--requirements", "-r", metavar="FILE",
                    help="requirements.txt file")
    dl.add_argument("--common", action="store_true",
                    help="Also download common utilities (requests, pytest, rich, etc.)")

    # install
    ins = sub.add_parser("install", help="Install packages from the local store (offline)")
    ins.add_argument("--bundle", nargs="+", metavar="BUNDLE",
                     help="Bundle name(s): fastapi django flask xrpl all")
    ins.add_argument("--packages", nargs="+", metavar="PKG",
                     help="Individual package names")
    ins.add_argument("--requirements", "-r", metavar="FILE",
                     help="requirements.txt file")

    # list
    ls = sub.add_parser("list", help="List packages in the local store")
    ls.add_argument("--bundle", metavar="BUNDLE",
                    help="Show expected packages for a bundle")

    # config
    cfg = sub.add_parser("config", help="Configure pip for online/offline mode")
    mode = cfg.add_mutually_exclusive_group(required=True)
    mode.add_argument("--offline", action="store_true", help="Set pip to use local store only")
    mode.add_argument("--online", action="store_true", help="Remove offline config, restore pip to normal")
    mode.add_argument("--show", action="store_true", help="Show current pip.ini")

    # bundles
    sub.add_parser("bundles", help="List all available bundles and their packages")

    # guide
    guide = sub.add_parser("guide", help="Generate or open the HTML knowledge base")
    guide_mode = guide.add_mutually_exclusive_group(required=True)
    guide_mode.add_argument("--generate", action="store_true", help="Generate HTML guide files")
    guide_mode.add_argument("--open",     action="store_true", help="Open guides in browser")
    guide.add_argument("--bundle", metavar="BUNDLE",
                       help="Only generate/open one bundle's guide (fastapi django flask xrpl)")

    args = parser.parse_args()

    dispatch = {
        "download": cmd_download,
        "install":  cmd_install,
        "list":     cmd_list,
        "config":   cmd_config,
        "bundles":  cmd_bundles,
        "guide":    cmd_guide,
    }
    dispatch[args.command](args)


if __name__ == "__main__":
    main()
