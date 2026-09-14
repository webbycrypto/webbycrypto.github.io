# How the internet and APIs work

[← Back to Week 1: Foundations I](../README.md)

## Client and server: ordering at a counter

Picture ordering food at a counter. You (the customer) walk up and place an order: "one coffee, medium, oat milk." The person behind the counter (the kitchen) doesn't know what you want until you ask, prepares exactly what you asked for, and hands it back to you. You don't need to know how the espresso machine works internally; you just need to know how to place an order and what you'll get back.

This is almost exactly how most of the software you use every day works, just with computers instead of coffee. The **client** is the program asking for something: your web browser, your phone's app, or a Python script you write. The **server** is a program (running on some computer, somewhere) that's always available, listening for requests, and capable of preparing a response. When you open a news website, your browser (the client) sends a request to that site's server, and the server sends back the page's content, which your browser then displays. When an app on your phone loads your account balance, it's doing the same thing behind the scenes: client asks, server answers.

Almost nothing you'd call "using the internet" is more complicated than this pattern, repeated constantly: a client requests, a server responds.

## What a URL and HTTP actually are

A URL (`https://example.com/products/42`) is an address: it tells a client exactly which server to talk to (`example.com`), and what it's asking for at that server (`/products/42`). HTTP (HyperText Transfer Protocol) is the shared language clients and servers use to have this conversation, a set of agreed-upon rules for what a request looks like and what a response looks like, so that any client can talk to any server without them needing to have been built by the same people.

Every HTTP request has a **method**, which describes the kind of action being requested. The two you'll use constantly:

- **GET**: "give me this thing." Reading, no changes made. Loading a webpage is a GET request.
- **POST**: "here's some new data, create something with it." Submitting a form, creating a new account, posting a comment.

(There are others, like PUT, PATCH, and DELETE, mostly used for updating and removing things; you'll meet those properly in Week 2.)

Every HTTP response comes back with a **status code**, a three-digit number telling the client what happened. You've almost certainly seen `404` before (not found); that's an HTTP status code. A few worth knowing now:

- `200`: OK, everything worked, here's your data.
- `404`: Not Found, whatever you asked for doesn't exist at that address.
- `500`: Internal Server Error, something broke on the server's side while trying to handle your request.

## What an API actually is

A regular website is built for humans: it returns a page laid out with images, buttons, and formatting meant to be looked at in a browser. An **API** (Application Programming Interface) is a way for a server to expose data or actions meant to be used *by other programs*, not stared at by a human in a browser. Instead of a nicely laid-out page, an API typically hands back plain structured data, and it's designed to be predictable and consistent enough that code (not a human eyeball) can reliably make sense of it.

Think of an API as a fixed, published menu of things a server is willing to do for you, each with a specific address and specific rules about what you need to send and what you'll get back, rather than an open-ended, human-facing webpage. "Call the weather API" means "send a request to a specific address that a weather service has published, following their documented rules, and get back weather data in a predictable format," as opposed to opening a weather website meant for a person to read.

## What JSON actually is

Almost every modern API sends its data back in a format called **JSON** (JavaScript Object Notation, though you'll use it constantly in Python; the name is a historical artifact, not a restriction). JSON is just a way of writing structured information as plain text, using labeled key/value pairs, in a way both humans and programs can read easily. Think of it like a form with labeled blanks filled in:

```json
{
  "name": "Ada Lovelace",
  "age": 28,
  "is_member": true,
  "hobbies": ["writing", "mathematics"]
}
```

Each label (`"name"`, `"age"`) is called a **key**, and what follows the colon is its **value**. Values can be text (in quotes), numbers (no quotes), `true`/`false`, or even a list of things (`[...]`), and objects can be nested inside other objects. This maps almost directly onto a Python dictionary and list, which is exactly why working with JSON in Python feels natural: when your code reads a JSON response, Python's `requests` library (which you'll use in this week's project) converts it directly into a Python dictionary you can work with using the tools you already know, like looking up a value by its key (`data["name"]`).

## What hosting actually means

A server has to be a real computer, physically running somewhere, powered on, connected to the internet, and running a program that's listening for requests, essentially all the time, since you never know when a client might show up asking for something. **Hosting** means paying (or in some cases, using a free tier of) a company that owns and maintains such computers, so you don't have to buy, power, secure, and maintain your own physical machine just to keep a small program available to the world. "This app is hosted on [some cloud provider]" simply means: a computer owned by that provider is running this app around the clock, and that's the computer clients are actually talking to when they use the app, wherever in the world they are.

## Where this is going

In this week's project, you'll write a Python script that acts as a *client*: it sends a GET request to a public API (a server someone else runs, that you don't control and don't need to understand internally), receives a JSON response back, and does something with the data inside it. This is the exact same client/server, request/response pattern described above, just with your own Python code standing in as the client instead of a web browser. Weeks 2 and 3 flip this around: you'll build and run the *server* side yourself.

## What to watch for

- Confusing an API with a website. A website is built to be looked at by a human in a browser; an API returns structured data meant to be used by code.
- Assuming JSON is somehow tied to JavaScript because of its name. It's a plain text data format used across essentially every programming language, Python included.
- Forgetting that GET means "read" and shouldn't be used to change anything on the server; that's what POST (and friends) are for. You'll only be using GET this week.
