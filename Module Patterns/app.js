// Pattern 1
var greet = require("./greet1");
greet();

// Pattern 2
var greet2 = require("./greet2").greet;
greet2();

// Pattern 3
var greet3 = require("./greet3");
greet3.greet();
greet3.greeting = "changed Hello World";

// node caches modules so greet3b references the cache of the original object
var greet3b = require("./greet3");
greet3b.greet();

// Pattern 4
var Greet4 = require("./greet4");
// create new object from function constructor
var grt = new Greet4();
grt.greet();

// Pattern 5
var greet5 = require("./greet5");
greet5.greet();
