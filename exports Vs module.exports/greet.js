// assigning a new value to exports breaks the reference to the same
// object that module.exports is pointing to
exports = function() {
  console.log("Hello");
};

console.log(exports); // logs new function [function: exports]
console.log(module.exports); // reference is broken so logs empty object {}
