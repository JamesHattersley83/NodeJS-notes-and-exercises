var person = {
  firstname: "",
  lastname: "",
  greet: function() {
    return this.firstname + " " + this.lastname;
  }
};

var james = Object.create(person);
james.firstname = "James";
james.lastname = "Hattersley";
console.log(james.greet());
