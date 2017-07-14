const express = require('express');
const http = require('http');
const url = require('url');
const wsServer = require('ws').Server;

const port = process.env.PORT || 3000;

const app = express();

app.get('/ping', ping);
app.get('/headers', headers);

app.use(express.static('client'));

const server = http.createServer(app);
const wss = new wsServer({
  server: server
});

wss.on('connection', function(ws, req) {
  //const location = url.parse(req.url, true);

  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function(message) {
    console.log('received', message);

    wss.clients.forEach(function(client) {
      // Don't send message to same sender
      if (client !== ws) {
        client.send(message);
      }      
    });
  });

  ws.send('something');
});

server.listen(port, function() {
  console.log('Listening on %d', server.address().port);
});

function ping(req, res) {
  res.send('pong');

  wss.clients.forEach(function(client) {
    client.send('ping');    
  });
}

function headers(req, res) {
  res.send(req.headers);
}