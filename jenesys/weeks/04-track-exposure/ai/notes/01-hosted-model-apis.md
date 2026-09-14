# What a hosted AI model API actually is

[← Back to Week 4: Track exposure](../../README.md)

"AI" gets talked about like it's magic living inside an app. It isn't. When you use a chatbot, a coding assistant, or any product with an "AI" label, somewhere underneath there is a running program (the model) that takes text in and produces text out. That program is enormous: modern language models are made of hundreds of billions of numbers (called parameters) that all need to be loaded into very expensive, specialized computer chips (GPUs) at the same time to produce a single response. Your laptop cannot run one of these. Almost nobody's laptop can.

So companies like Groq and Anthropic run the model on their own large computers, all day, every day, and let other people's code talk to it over the internet. That's what "hosted" means: the model is hosted somewhere else, on someone else's hardware, and you rent access to it by the request. This is no different in spirit from a company hosting a database or a website for you instead of you running a server in your bedroom. You're borrowing someone else's expensive infrastructure instead of buying it yourself. This week's code talks to Groq specifically, because its free tier needs no billing setup at all; starting Week 5 you'll talk to Anthropic instead, in exactly the same spirit, just with a different company on the other end and a real bill attached.

## It's the same request/response pattern you already know

Back in Week 1, you learned that most software on the internet works by one computer (a client) sending a request to another computer (a server), and the server sending back a response. That's what an API is: an agreed-upon way of asking a server to do something and getting an answer back.

A hosted AI model API is exactly that pattern, with one specific kind of request and response:

- Your Python code (the client) sends a request containing some text.
- The provider's server receives that text, runs it through the model, and generates new text as a reply.
- The server sends that reply text back to your code as the response.

That's the entire mechanism. There's no chat window, no typing animation, none of the interface polish you're used to from a product like a chatbot app. Underneath all of that polish is exactly this: a request goes out over the internet carrying some text, and a response comes back carrying some text. Everything you build this week is you writing the client side of that exchange yourself, in Python, instead of using someone else's pre-built interface.

## Why this matters before you write any code

Once you see a hosted model as "just another API," a few things stop being mysterious:

- Normally, it costs money to use, the same way any other paid API or hosted service does, because someone has to pay for the electricity and hardware that ran your request. This week is a deliberate exception: Groq's free tier means today's requests genuinely cost nothing, specifically so you can experiment without setting up any billing at all. Don't let that free tier give you the wrong impression of the norm; the cost-and-billing note below explains what changes once you're on a paid provider starting Week 5.
- It can be slow, or time out, or return an error, for all the same reasons any other network request can: your internet connection drops, the server is overloaded, you asked for something malformed.
- It has no memory of its own between separate requests. Each request is handled independently, the same way a web server doesn't automatically remember your previous visit unless something (cookies, a database) reminds it who you are. Building "memory" into a chatbot, which you'll do in this week's project, means your own code has to resend the earlier conversation every single time. The model doesn't remember you; your code reminds it, over and over.

Keep that last point in mind. It quietly explains almost everything else in this week's notes.
