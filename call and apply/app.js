var obj = {
  name: "James",
  greet: function(param) {
    console.log(`Hello ${this.name} + ${param}`);
  }
};

obj.greet();
obj.greet.call({ name: "John Doe" }, "Hattersley");
obj.greet.apply({ name: "John Doe" }, ["Hattersley"]);
