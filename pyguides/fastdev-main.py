# ── Imports ───────────────────────────────────────────────────────────────────
from fastapi import FastAPI, HTTPException, Form, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

# FastAPI()      → creates the app. Everything hangs off this object.
# Form           → reads data submitted from an HTML <form> (not a query string)
# Request        → represents the incoming HTTP request; required to render templates
# HTMLResponse   → tells FastAPI the response is HTML, not JSON
# RedirectResponse → sends the browser to a different URL after a form submission
# StaticFiles    → serves CSS, images, etc. from a folder
# Jinja2Templates → renders .html files with {{ }} placeholders filled in by Python

app = FastAPI()

# Mount the static folder so the browser can load /static/style.css etc.
# The "static" string in name= is how you reference it in HTML: href="/static/style.css"
app.mount("/static", StaticFiles(directory="static"), name="static")

# Tell FastAPI where your HTML template files live
templates = Jinja2Templates(directory="templates")


# ── In-memory store ───────────────────────────────────────────────────────────
# A plain Python dict acting as the database.
# Resets every time the server restarts — swap for SQLite/PostgreSQL later.
db = {}
next_id = 1


# ── SERVE THE HTML PAGE ───────────────────────────────────────────────────────
# GET /  →  render index.html and pass all current items into the template
# The browser visits this URL to load the page — also called after every form
# submission so the page always shows fresh data
@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    # templates.TemplateResponse renders index.html
    # The dict is the "context" — variables you pass from Python into the HTML
    # request is always required by Jinja2
    # items is your list of tasks/items, available in HTML as {{ items }}
    return templates.TemplateResponse("index.html", {
        "request": request,
        "items": list(db.values())   # pass all stored items to the template
    })


# ── CREATE ────────────────────────────────────────────────────────────────────
# POST /items/create  →  called when the Create form is submitted
# Form(...) reads the value from the HTML <input name="name"> field
# The parameter name here MUST match the name= attribute in your HTML input
@app.post("/items/create")
def create_item(
    name: str = Form(...),               # Form(...) = required field
    description: str = Form(None)        # Form(None) = optional field, defaults to None
):
    global next_id
    db[next_id] = {"id": next_id, "name": name, "description": description}
    next_id += 1
    # RedirectResponse sends the browser back to the homepage after saving
    # status_code=303 is the standard "redirect after POST" code
    return RedirectResponse("/", status_code=303)


# ── UPDATE ────────────────────────────────────────────────────────────────────
# POST /items/update  →  called when the Update form is submitted
# HTML forms only support GET and POST — so update uses POST too
# We read item_id from a hidden <input type="hidden" name="item_id"> in the form
@app.post("/items/update")
def update_item(
    item_id: int = Form(...),            # which item to update (from hidden input)
    name: str = Form(None),              # new name — None if left blank
    description: str = Form(None)        # new description — None if left blank
):
    if item_id not in db:
        raise HTTPException(status_code=404, detail="Item not found")
    if name:                             # only update if a new value was provided
        db[item_id]["name"] = name
    if description:
        db[item_id]["description"] = description
    return RedirectResponse("/", status_code=303)


# ── DELETE ────────────────────────────────────────────────────────────────────
# POST /items/delete  →  called when a Delete button form is submitted
# Again, HTML forms can't send DELETE requests, so we use POST
# item_id comes from a hidden input inside each item's delete form
@app.post("/items/delete")
def delete_item(item_id: int = Form(...)):
    if item_id not in db:
        raise HTTPException(status_code=404, detail="Item not found")
    del db[item_id]
    return RedirectResponse("/", status_code=303)
