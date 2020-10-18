const express = require('express');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const checkIsPro = require('../middleware/checkIsPro');
const checkIsNotpro = require('../middleware/checkIsNotpro');


const Room = require('../models/room');
const Chat = require('../models/chat');

const router = express.Router();

// 모든 룸 정보 요청
router.get('/room', jwtMiddleware, checkIsPro, (req, res) => {
  Room.find({})
  .exec()
  .then(rooms => {
    res.status(200).json({
        message: 'Successfully get rooms',
        rooms: rooms,
    });
  })
  .catch(err => {
    res.status(500).json({
        error: err
    })
  });
});

// 새로운 룸 만들기
router.post('/room', jwtMiddleware ,async (req, res, next) => {
  try {
    const newRoom = await Room.create({
      user: req.userData,
      chats: []
    });
    const io = req.app.get('io');
    io.of('/room').emit('newRoom', newRoom);
    res.status(201).json({
        message: 'new Room Created',
        newRoom: newRoom
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 해당 룸 가져오기
router.get('/room/:id', jwtMiddleware, checkIsPro, async (req, res, next) => {
  try {
    const room = await Room.findOne({ _id: req.params.id });
    if (!room) {
      return res.status(401).json({
        message: 'No Room'
      });
    }
    return res.status(200).json({
      room: room,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// router.delete('/room/:id', async (req, res, next) => {
//   try {
//     await Room.remove({ _id: req.params.id });
//     await Chat.remove({ room: req.params.id });
//     res.send('ok');
//     setTimeout(() => {
//       req.app.get('io').of('/room').emit('removeRoom', req.params.id);
//     }, 2000);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// 특정 룸에서 채팅하기
router.post('/room/:id/chat', jwtMiddleware, async (req, res, next) => {
  try {
    const chat = await Chat.create({
      user: req.userData,
      chat: req.body.chat,
    });
    const room = await Room.findOne({ _id: req.params.id });
    room.chats.push(chat);
    await room.save();


    const newchat = chat.replyChat();
    
    req.app.get('io').of('/chat').emit('chat', newchat);
    res.send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;