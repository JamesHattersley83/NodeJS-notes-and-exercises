var http = require("http");
var fs = require("fs");

http
  .createServer(function(req, res) {
    res.writeHead(200, { "content-type": "text/html" });
    var html = fs.readFileSync(__dirname + "/index.html", "utf-8");
    var message = "Hello World...";
    html = html.replace("{message}", message);
    res.end(html);
  })
  .listen(3000, "127.0.0.1");
