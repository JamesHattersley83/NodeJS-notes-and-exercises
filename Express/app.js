var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var port = process.env.PORT || 3000;

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// create application/json parser
var jsonParser = bodyParser.json();

// middleware
app.use("/assets", express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.use("/", function(req, res, next) {
  console.log("Request Url:" + req.url);
  next();
});

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/person/:id", function(req, res) {
  res.render("Person", { ID: req.params.id, Qstr: req.query.qstr });
});

app.post("/person", urlencodedParser, function(req, res) {
  res.send("Thank you!");
  console.log(req.body.firstname);
  console.log(req.body.lastname);
});

app.post("/personjson", jsonParser, function(req, res) {
  res.send("Thank you for the JSON data!");
  console.log(req.body.firstname);
  console.log(req.body.lastname);
});

app.get("/api", function(req, res) {
  res.json({
    firstname: "James",
    lastname: "Hattersley"
  });
});

// RESTful API

app.get("/api/person/:id", function(req, res) {
  // get data from database
  res.json({
    firstname: "James",
    lastname: "Hattersley"
  });
});

app.post("/api/person", jsonParser, function(req, res) {
  //  save person to database
});

app.delete("/api/person/:id", function(req, res) {
  // delete person from database
});

app.listen(port);
