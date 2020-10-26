const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const postSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
      type: String,
      required: true
    },
  content: {
      type: String,
      required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  editedAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Post', postSchema);
