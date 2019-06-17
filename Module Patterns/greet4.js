// Using a function constructor
function Greeter() {
  this.greeting = "Hello World!!!!";
  this.greet = function() {
    console.log(this.greeting);
  };
}

// exporting the actual constructor function
module.exports = Greeter;
