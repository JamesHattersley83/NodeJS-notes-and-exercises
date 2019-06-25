"use strict";

var Greetr = require("./greetr");

// create new obj that has access to both Greetr and EventEmitter
var greeter1 = new Greetr();

greeter1.on("greet", function(data) {
  console.log("someone said hello: ", data);
});

// pass data to the greet method
greeter1.greet("James");
