const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  post: {
    type: ObjectId,
    required: true,
    ref: 'Post'
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  editedAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Comment', commentSchema);
