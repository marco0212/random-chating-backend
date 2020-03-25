const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const randomstring = require('randomstring');
const {
  CONNECTION,
  DISCONNECTION,
  LOGIN,
  MESSAGE,
  CHAT_START,
  TYPING,
  CHAT_END,
  LEAVE_ROOM
} = require('./constants');

const queue = [];
const roomsById = {};
const usersById = {};
const namesById = {};

io.on(CONNECTION, (socket) => {
  const userId = socket.id;

  socket.on(LOGIN, (name) => {
    usersById[userId] = socket;
    namesById[userId] = name;

    FindPeer();
  });

  socket.on(TYPING, () => {
    const roomId = roomsById[userId];

    socket.to(roomId).broadcast.emit(TYPING);
  });

  socket.on(MESSAGE, (message) => {
    const roomId = roomsById[userId];

    socket.to(roomId).broadcast.emit(MESSAGE, message);
  });

  socket.on(LEAVE_ROOM, () => {
    const roomId = roomsById[userId];

    socket.to(roomId).broadcast.emit(CHAT_END);
    socket.leave(roomId);
    delete roomsById[userId];
    FindPeer();
  });

  socket.on(DISCONNECTION, () => {
    const roomId = roomsById[userId];

    if (roomId) {
      socket.to(roomId).broadcast.emit(CHAT_END);
      socket.leave(roomId);
      delete roomsById[userId];
    } else {
      const index = queue.indexOf(userId);

      queue.splice(index, 1);
    }

    delete usersById[userId];
    delete namesById[userId];
  });

  function FindPeer() {
    if (queue.length) {
      const peerId = queue.pop();
      const peer = usersById[peerId];
      const roomId = randomstring.generate();

      roomsById[peerId] = roomId;
      roomsById[userId] = roomId;

      peer.join(roomId);
      socket.join(roomId);

      peer.emit(CHAT_START, namesById[userId]);
      socket.emit(CHAT_START, namesById[peerId]);
    } else {
      queue.push(userId);
    }
  }
});

module.exports = server;
