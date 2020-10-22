const express = require('express');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const checkIsPro = require('../middleware/checkIsPro');
const checkIsNotpro = require('../middleware/checkIsNotpro');

const chatController = require('../controllers/chat');

const router = express.Router();

// 모든 룸 정보 요청
router.get('/', jwtMiddleware, checkIsPro, chatController.getRooms);

// 새로운 룸 만들기
router.post('/', jwtMiddleware , chatController.postNewRoom);

// 해당 룸 가져오기
router.get('/:id', jwtMiddleware, checkIsPro, chatController.getOneRoom);

// 해당 룸 가져오기
router.post('/search', jwtMiddleware, checkIsPro, chatController.getOneRoomBySearch);

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
router.post('/:id/chat', jwtMiddleware, chatController.postChat);

// 특정 채팅 가져오기 
router.get('/:id/chat/:chatid', jwtMiddleware, chatController.getChatById);


module.exports = router;