const mongoose = require('mongoose');
const chatbotResponse = require('../lib/chat');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const chatSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  chat: String,
  replyChat: String,
  chatType: String,
  danger: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Chat', chatSchema);
