// adding a property to exports by mutating the object will not break reference with module.exports
exports.greet = function() {
  console.log("Hello");
};

// both exports and module.exports return the function
console.log(exports);
console.log(module.exports);
