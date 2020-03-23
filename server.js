const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const randomstring = require('randomstring');

const queue = [];
const rooms = {};
const allUsers = {};
const allNames = {};

io.on('connection', function (socket) {
  socket.on('login', name => {
    const userId = socket.id;

    allUsers[userId] = socket;
    allNames[userId] = name;

    if (queue.length) {
      const peerId = queue.pop();
      const peer = allUsers[peerId];
      const roomId = randomstring.generate();

      peer.join(roomId);
      socket.join(roomId);
      rooms[peerId] = roomId;
      rooms[userId] = roomId;
      peer.emit('chat start', { name: allNames[userId], roomId });
      socket.emit('chat start', { name: allNames[peerId], roomId } );
    } else {
      queue.push(userId);
    }
  });
});

module.exports = server;
