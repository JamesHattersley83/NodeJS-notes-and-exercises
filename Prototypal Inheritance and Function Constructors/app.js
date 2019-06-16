// create function constructor
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

// create prototype
Person.prototype.greet = function() {
  console.log("Hello, " + this.firstName + " " + this.lastName);
};

var james = new Person("James", "Hattersley");
console.log(james);
console.log(james.firstName);
james.greet();
console.log(james.__proto__);
