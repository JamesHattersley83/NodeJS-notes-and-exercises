// object literal structure
var person = {
  firstName: "James",
  lastName: "Hattersley",
  greet: function() {
    console.log("Hello " + this.firstName + " " + this.lastName);
  }
};

person.greet();

// access object using bracket notation
console.log(person["firstName"]);
