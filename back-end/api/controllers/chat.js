const Room = require('../models/room');
const Chat = require('../models/chat');

const client = require('../lib/chat');

exports.getRooms = (req, res) => {
  Room.find({})
    .exec()
    .then((rooms) => {
      res.status(200).json({
        message: 'Successfully get rooms',
        rooms: rooms,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.postNewRoom = async (req, res, next) => {
  try {
    const newRoom = await Room.create({
      user: req.userData,
      chats: [],
    });
    const io = req.app.get('io');
    io.of('/room').emit('newRoom', newRoom);
    res.status(201).json({
      message: 'new Room Created',
      newRoom: newRoom,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getOneRoom = async (req, res, next) => {
  try {
    const room = await Room.findOne({ _id: req.params.id });
    if (!room) {
      return res.status(401).json({
        message: 'No Room',
      });
    }
    return res.status(200).json({
      room: room,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getOneRoomBySearch = async (req, res, next) => {
  try {
    const roomId = req.body.roomId;
    const room = await Room.findOne({ _id: roomId });
    if (!room) {
      return res.status(400).json({
        message: 'No Room',
      });
    }
    return res.status(200).json({
      room: room,
    });
  } catch (error) {
    return next(error);
  }
};

exports.postChat = async (req, res, next) => {
  try {
    const chat = await Chat.create({
      user: req.userData,
      chat: req.body.chat,
    });
    const room = await Room.findOne({ _id: req.params.id });
    room.chats.push(chat);
    await room.save();
    // nlp 처리후 reply
    client
    .chatBot()
    .sendMessage({clientChat: chat.chat })
    .then(result => {
      const newchat = result.serverChat;
      req.app.get('io').of('/chat').emit('chat', newchat);
      res.status(201).json({
        chat: chat,
      });
    })
    .catch(err => {
      console.log(err);
    });
  } catch (error) {
    next(error);
  }
};

exports.getChatById = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.chatid);
    const room = await Room.findById(req.params.id);
    if(!room) {
      return res.status(400).json({
        message: 'No Room',
      });
    } else if(!chat) {
      return res.status(400).json({
        message: 'No Chat',
      });
    }
    else if (!room.chats.includes(chat._id)) {
      return res.status(400).json({
        message: 'wrong room and chat',
      });
    }

    res.status(200).json({
      chat: chat,
    });
  } catch (error) {
    next(error);
  }
};
