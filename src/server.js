var express = require("express");
var server = express();
var wsServer = require("express-ws")(server);
var clients = new Array;

server.use("/", express.static("public"));

function serverStart() {
  var port = this.address().port;
  console.log("Server listening on port " + port);
}

function handleClient(thisClient, request) {
  console.log("New Connection");
  clients.push(thisClient);

  function endClient() {
    var position = clients.indexOf(thisClient);
    clients.splice(position, 1);
    console.log("connection closed");
  }

  function clientResponse(data) {
    console.log(request.connection.remoteAddress + ": " + data);
    broadcast(data);
  }

  thisClient.on("message", clientResponse);
  thisClient.on("close", endClient);
}

function broadcast(data) {
  for (let c in clients) {
    clients[c].send(data);
  }
}

server.listen(process.env.PORT || 3000, serverStart);
server.ws("/", handleClient);
