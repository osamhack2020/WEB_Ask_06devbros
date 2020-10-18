const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const chatSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  chat: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 여기서 chat를 바탕으로 ai 답변을 해줌(newchat = ai(chat))
chatSchema.methods.replyChat = function () {
  return (this.chat + '이것은 답변이여');
};

module.exports = mongoose.model('Chat', chatSchema);
