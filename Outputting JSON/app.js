var http = require("http");

http
  .createServer(function(req, res) {
    res.writeHead(200, { "content-type": "application/json" });
    var obj = {
      firstname: "James",
      lastname: "Hattersley"
    };
    res.end(JSON.stringify(obj));
  })
  .listen(3000, "127.0.0.1");
