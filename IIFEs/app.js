// Immediately Invoked Function Expressions (IIFEs)

(function(lastname) {
  // variable is scoped to this function scope
  let firstname = "James";
  console.log(firstname);
  console.log(lastname);
})("Hattersley");

// variable is scoped to global scope
let firstname = "John";
console.log(firstname);
