var express = require("express");
var app = express();

var port = process.env.PORT || 3000;

// middleware
app.use("/assets", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.send(
    "<html><head><link href='assets/style.css' type='text/css' rel='stylesheet'/></head><body><h1>Hello World</h1></body></html>"
  );
});

app.get("/", function(req, res, next) {
  console.log("Request Url:" + req.url);
  next();
});

app.get("/person/:id", function(req, res) {
  res.send("Person: " + req.params.id);
});

app.get("/api", function(req, res) {
  res.json({
    firstname: "James",
    lastname: "Hattersley"
  });
});

app.listen(port);
