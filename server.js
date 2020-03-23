const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.send('index');
});

io.on('connection', function (socket) {
  socket.on('login', function (data) {
    console.log(data);
  });

  socket.on('send message', function(data) {
    console.log(data);
  });
});

module.exports = server;
