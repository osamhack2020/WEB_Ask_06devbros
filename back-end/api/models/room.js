const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const roomSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  chats: [{
    type: ObjectId,
    ref: 'Chat'
  }],
  // password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Room', roomSchema);
