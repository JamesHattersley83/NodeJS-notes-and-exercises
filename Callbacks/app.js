function greet(callback) {
  console.log("hello");
  var data = {
    name: "James Hattersley"
  };
  callback(data);
}

greet(function(data) {
  console.log("Someone said hello");
  console.log(data);
});

greet(function(data) {
  console.log("Someone said hello");
  console.log(data.name);
});
