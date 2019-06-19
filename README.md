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

You can have many **Event listeners** in your app that are listening for the same event. When the event occurs all the **Event listeners** will invoke or run one at a time.

## Magic Strings

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

## Object.create and Prototypes

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
