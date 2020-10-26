const SocketIO = require('socket.io');


module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io);
  const room = io.of('/room');
  const chat = io.of('/chat');

  // 채팅방과 연결
  room.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 접속 해제');
    });
  });

  //채팅과 연결
  chat.on('connection', (socket) => {
    let roomId = '';
    socket.on('joinRoom', (_roomId) => {
      roomId = _roomId
      socket.join(roomId);
    });

    socket.on('disconnect', () => {
      socket.leave(roomId);
    });
  });
};
