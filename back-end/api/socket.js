const SocketIO = require('socket.io');


module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io);
  const room = io.of('/room');
  const chat = io.of('/chat');
  const socketIds = [];

  // 채팅방과 연결
  room.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 접속 해제');
    });
  });

  //채팅과 연결
  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스에 접속');
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
    });
    // const roomId = referer
    //   .split('/')[referer.split('/').length - 1]
    //   .replace(/\?.+/, '');
    // socket.join(roomId);

    socket.on('disconnect', (roomId) => {
      console.log('chat 네임스페이스 접속 해제');
        console.log('finished');
        socket.leave(roomId);
    });
  });
};
