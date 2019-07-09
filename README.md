# Learning and understanding NodeJS

This is a repo containing all my notes and code exercises from the learning and understanding nodeJS course.

---

## Modules, Exports and Require

### How Node modules really work

- **require** is a function, that you pass a 'path' too.
- **module.exports** is what the require function returns.
- this happens because our code is wrapped in a function that is passed these things as parameters.

### JSON - JavaScript Object Notation

- A standard for structuring data.
- Inspired by JavaScript Object Literals.
- JS engines are built to understand it.
- No functions are sent in JSON, just data.
- The V8 engine has ability to convert JSON into a JavaScript Object.

```javascript
// Example JSON
{
  "firstname": "James",
  "lastname": "Hattersley",
}
```

### More on require

The **require** function is used to organise complex modules. If a folder is passed to require it will automatically look for an index.js file. The index.js file can be used as a point to access all modules and the export them as an object.

### Module Patterns

- **Reveaing Module Pattern**: Exposing only the props and methods you want to access via an returned object. This is one of the most popular and common ways to structure and protect code within modules.

### Exports vs Module.exports

- **exports** is a shorthand for **module.exports** but doesn't work with all module patterns.
- **module.exports** is the recommended way.

### Requiring Native Core Modules

- NodeJS comes with built in native core modules that are available to use.
- You can require a core module by not using the ('./') syntax.

```javascript
var util = require("util");
```

## Events and the Event Emitter

### Events

An **event** is something that has happened in our app that we can respond to.

In NodeJS the two events we talk about are:

- System Events - come from the C++ Core using a library called libuv. These events come from the computer system.
- Custom Events - come from the JavaScript core. The **Event Emitter** is a file inside the JS core where we have custom events.

### The Event Emitter

An **Event Listener** is the code that responds to an event. In JS terms the listener would be a function.

You can have many **Event listeners** in your app that are listening for the same event. When the event occurs all the **Event listeners** will invoke or run one at a time.

### Magic Strings

This is a string that has some special meaning to the code. This is bad as it makes it easy for a typo that can cause a bug. This will make it hard for us to use tools to find the bug.

A way around this problem is to save the event names as strings in a config module.

```javascript
// config.js
module.exports = {
  events: {
    GREET: "greet"
  }
};
```

We can then use the property name in place of the string. This means if we had to change the name of the string we only have to do it in one place.

```javascript
// app.js
var Emitter = require("./emitter");
var eventConfig = require("./config").events;

var emtr = new Emitter();

emtr.on(eventConfig.GREET, function() {
  console.log("Someone said hello!");
});
```

### Object.create and Prototypes

Other than using function constructors to create objects and set up the prototype chain we can use the **Object.create** method.
This is a simple way by using an object literal to set up the basis or template for creating any new objects.

```javascript
// app.js
var person = {
  firstname: "",
  lastname: "",
  greet: function() {
    return this.firstname + " " + this.lastname;
  }
};

var james = Object.create(person);
james.firstname = "James";
james.lastname = "Hattersley";
```

Any new object created will have its prototype pointing to the original person object.

### Inheriting From the Event Emitter - Part 1

- The .inherits() function is used as another method to create the prototype chain.
- The **utils** core module holds this method and helps us with inheritance.

```javascript
// utils.js
exports.inherits = function(ctor, superCtor) {
  ....
}
```

- ctor - the constructor function you want to add properties and methods to that are available to new objects created from it.
- superCtor - the constructor function that has the properties and methods you want your new objects to have access to.

### Node ES6 and Template Literals

Node now supports ES6 as with the new updates to the V8 engine. One of the new features of ES6 is **Template Literals** which is a new and clean way to concatenate strings.

```javascript
var name = "James";

var greet = `Hello ${name}`;
```

### .call() and .apply()

- These are two more ways to invoke a function.
- They are used to bind the .this keyword inside the function.
- The only difference between **.call()** and **.apply()** is that you can pass parameters as arrays with **.apply()**.

```javascript
var obj = {
  name: "James",
  greet: function(param1, param2) {
    console.log(`Hello ${this.name}`);
  }
};

obj.greet();
obj.greet.call({ name: "John Doe" }, param1, param2);
obj.greet.apply({ name: "John Doe" }, [param1, param2]);
```

### Inheriting From the Event Emitter - Part 2

One issue when inheriting from the EventEmitter obj is that we dont have access to any methods or properties that are added directly to the object and not to the prototype. A way around this is to use the **.call()** function inside our new constructor function.
Anything that is added to the EventEmitter we will access to in our new object.

```javascript
function Greetr() {
  EventEmitter.call(this);
  this.greeting = "Hello World";
}
```

### ES6 Classes

Classes are a new way of creating objects in javascript. This is just **Syntactic Sugar**.

- **Syntactic Sugar** - A feature that only changes how you write something and doesnt affect anything under the hood.

```javascript
"use strict";

class Person {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  greet() {
    console.log(`Hello ${this.firstname} ${this.lastname}`);
  }
}

var james = new Person("James", "Hattersley");
james.greet(); // Hello James Hattersley
```

### Inheriting From the Event Emitter - Part 3

The function constructor can be converted into an ES6 class and exported as a module to be used else where.

```javascript
module.exports = class Greetr extends EventEmitter {
  constructor() {
    super(); // replaces EventEmitter.call(this)
    this.greeting = "Hello World";
  }

  // adds greet function to prototype
  greet(data) {
    console.log(`${this.greeting}: ${data}`);
    this.emit("greet", data);
  }
};
```

- **extends EventEmitter** replaces **utils.inherits()**
- **super** replaces **EventEmitter.call(this)**
- **module.exports** exports the class as a module

## Asynchronous Code libuv The Event Loop Streams Files and more

### Javascript is Synchronous

**Asynchronous** means more than one running simultanenously.
Node does things asynchronously, V8 does not.

**Synchronous** is one process executing at a time.
Javascript is synchronous. This means one line of code executing at a time.
NodeJs is asychronous which means it can do other things at the same time.

### Callbacks

A function passed to another function assuming it will be invoked at some point.
The function 'calls back' invoking the function you give it when its done doing its work.

**Non-blocking** means doing things without stopping the program from running.
Node makes this happnen by doing things asynchronously.

### Libuv

**libuv** is a library that deals with events occuring on the operating system. It has a queue which holds events that have completed. This runs at the same time the V8 engine is running its code.
Inside **libuv** is something called the **Event Loop**. The **Event Loop** is constantly checking the queue to see that something has happened.
Once the **Event Loop** sees that something is complete in the queue is processes it and runs a callback to the V8 engine. The V8 engine will only run this code once it has finished processing what it is currently running. This is because JavaScript is synchronous.

### Streams and Buffers

**Buffer** - A temporary holding spot for data being moved from one place to another. It is intentionally limited in size.

**Stream** - A sequence of data made available over time. These are pieces of data that eventually combine into something whole.

### Binary Data Character Sets and Encodings

**Binary Data** - Data stored in binary (sets of 1's and 0's).
The core of the math that computers are based on. Each one or zero is called a **'bit'** or **'binary digit'**.

**Character Set** - A representation of characters as numbers.
Each character gets a number. **Unicode** and **ASCII** are character sets.

**Character Encoding** - How characters are stored in binary.
The numbers (or **code points**) are converted and stored in binary. **UTF-8** is an example of character encoding.

### ES6 Typed Arrays

**Byte** - 8 bits, e.g 01001001

## HTTP and being a Web Server

### Build a Web Server in Node

```javascript
var http = require("http");

http
  .createServer(function(req, res) {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Hello World\n");
  })
  .listen(3000, "127.0.0.1");
```

### HTML and Templates

**Templates** - Text designed to be the basis for the final text or content after being processed.
Usually a template language is used so the template system knows how to replace placeholders with real values.

### APIs and Endpoints

**API** - A set of tools for building a Web Application.
Stands for 'Application Programming Interface'. On the Web the tools are made available via a set or URLs which accept and send only data via HTTP and TCP/IP.

**Endpoint** - One URL in a Web API. Sometimes that endpoint (URL) does multiple things by making choices depending on the HTTP request headers.

### Outputting JSON

**Serialize** - Translating an object into a format that can be stored or transferred. JSON, CSV, XML are all popular.
**Deserialize** - This is the opposite so converting back into an object.

```javascript
var http = require("http");

http
  .createServer(function(req, res) {
    res.writeHead(200, { "content-type": "application/json" });
    var obj = {
      firstname: "James",
      lastname: "Hattersley"
    };
    res.end(JSON.stringify(obj));
  })
  .listen(3000, "127.0.0.1");
```

### Routing

**Routing** is mapping a HTTP request to a source of content. This could be actual existing files on the server or not.

```javascript
var http = require("http");
var fs = require("fs");

http
  .createServer(function(req, res) {
    if (req.url === "/") {
      fs.createReadStream(__dirname + "/index.html").pipe(res);
    } else if (req.url === "/api") {
      res.writeHead(200, { "content-type": "application/json" });
      var obj = {
        firstname: "James",
        lastname: "Hattersley"
      };
      res.end(JSON.stringify(obj));
    } else {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(3000, "127.0.0.1");
```

## Express

Express is a fast, unopinionated, minimalist web framework for Node.js.

**Environment Variables** - Global variables specific to the environment(server) our code is living in.
Different servers can have different variable settings, and we can access those variables in code.

**HTTP Method** - Specifies the type of action the request wishes to make.
GET, POST, DELETE, and others. Also called **verbs**.

Example server built with Express

```javascript
var express = require("express");
var app = express();

var port = process.env.PORT || 3000;

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.get("/api", function(req, res) {
  res.json({
    firstname: "James",
    lastname: "Hattersley"
  });
});

app.listen(port);
```

### Express Routing

We can pass variables via the route using the **req.params** object.
**:id** is the variable passed to the object.

```javascript
app.get("/person/:id", function(req, res) {
  res.send("Person: " + req.params.id);
});
```

### Static files and Middleware

**Middleware** - Code that sits between two layers of software. In the case of Express, sitting between the request and the response.

Middleware can deliver static files via HTTP request.

```javascript
// middleware
app.use("/assets", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.send(
    "<html><head><link href='assets/style.css' type='text/css' rel='stylesheet'/></head><body><h1>Hello World</h1></body></html>"
  );
});

// We can also add our own Middleware
app.use("/", function(req, res, next) {
  console.log("Request Url:" + req.url);
  next();
});
```

### Template and Template Engines

Express allows you to use many template engines such as jade, ejs and handlebars.
Once the template engine is installed using npm, you can use it using:

```javascript
app.set("view engine", "ejs");
```

By default express looks inside a folder called **views** for the template files.

### Querying and Post Parameters

- **GET** request the querystring is embedded in the URL.
- **POST** request the querystring is moved to the body.

To pull the querystrings from the body of the POST request we need to use a middlewear called **body-parser**.

### RESTful APIs and JSON

**REST** - An architechtural style for building APIs.
Stands for 'Representational State Transfer'. We decide that HTTP verbs and URLs mean something.

Example RESTful API

```javascript
// RESTful API

app.get("/api/person/:id", function(req, res) {
  // get data from database
  res.json({
    firstname: "James",
    lastname: "Hattersley"
  });
});

app.post("/api/person", jsonParser, function(req, res) {
  // save person to database
});

app.delete("/api/person/:id", function(req, res) {
  // delete person from database
});
```

## Javascript JSON and Databases

### Relational Databases and SQL

A relational database is a table that has columns or fields and rows of data. Data can be split up into different tables but linked using an id.

**SQL** - (Structured Query Language) is used to ask questions of the database.

In javascript we store data as Objects. Therefore we can represent the data from a table as an array of objects.
