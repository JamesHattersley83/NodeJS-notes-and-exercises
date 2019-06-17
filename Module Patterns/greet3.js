// Using a function constructor
function Greeter() {
  this.greeting = "Hello World!!!";
  this.greet = function() {
    console.log(this.greeting);
  };
}

// this is only run once. The results are cached to memory
module.exports = new Greeter();
