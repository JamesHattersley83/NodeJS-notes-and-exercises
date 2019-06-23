var EventEmitter = require("events");
var util = require("util");

function Greetr() {
  this.greeting = "Hello World";
}

// sets up prototype chain so any objects created from Greetr has access to methods and props of EventEmitter
util.inherits(Greetr, EventEmitter);

// add our own methods to Greetr obj
Greetr.prototype.greet = function(data) {
  console.log(this.greeting + ": " + data);
  this.emit("greet", data);
};

// create new obj that has access to both Greetr and EventEmitter
var greeter1 = new Greetr();

greeter1.on("greet", function(data) {
  console.log("someone said hello: ", data);
});

// pass data to the greet method
greeter1.greet("James");
