"use strict"; // Makes the V8 engine look at the code in a more strict way as to avoid mistakes

class Person {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  greet() {
    console.log(`Hello ${this.firstname} ${this.lastname}`);
  }
}

var james = new Person("James", "Hattersley");
james.greet();
