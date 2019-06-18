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

# Events and the Event Emitter

## Events

An **event** is something that has happened in our app that we can respond to.

In NodeJS the two events we talk about are:

- System Events - come from the C++ Core using a library called libuv. These events come from the computer system.
- Custom Events - come from the JavaScript core. The **Event Emitter** is a file inside the JS core where we have custom events.

## The Event Emitter

An **Event Listener** is the code that responds to an event. In JS terms the listener would be a function.
