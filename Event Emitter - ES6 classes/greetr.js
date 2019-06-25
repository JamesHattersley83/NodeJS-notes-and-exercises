"use strict";

var EventEmitter = require("events");

// extends replaces util.inherits(Greetr, EventEmitter)
// module.exports turns the class into a module to be used else where
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
