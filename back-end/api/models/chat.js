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
  chatType: String,
  danger: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 여기서 chat를 바탕으로 ai 답변을 해줌(newchat = ai(chat))
chatSchema.methods.replyChat =  function () {
  const answer =  chatbotResponse(this.chat);
  console.log(answer, '답안');
  return answer;
};

module.exports = mongoose.model('Chat', chatSchema);
