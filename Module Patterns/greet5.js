var greeting = "Hello World!!!!!";

var greet = function() {
  console.log(greeting);
};

// Revealng Module Pattern
module.exports = {
  greet: greet
};
