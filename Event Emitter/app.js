var Emitter = require("./emitter");
var eventConfig = require("./config").events;

var emtr = new Emitter();

emtr.on(eventConfig.GREET, function() {
  console.log("Someone said hello!");
});

emtr.on(eventConfig.GREET, function() {
  console.log("another event happened!");
});

console.log("hello");
emtr.emit(eventConfig.GREET);
