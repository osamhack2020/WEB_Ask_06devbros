const Comment = require('../models/comment');
const Post = require('../models/post');

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({post: req.postid});
    res.status(200).json({
        comments: comments
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.postid);
    const comment = new Comment({
        user: req.userData,
        post: post._id,
        comment: req.body.comment
    });
    await comment.save();
    res.status(201).json({
        message: "Successfully created comment",
        comment: comment
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentid);
    if(!comment) {
      res.status(400).json({
        message: "bad id"  
      });
    }
    res.status(200).json({
        comment: comment
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.editCommentById = async (req, res) => {
  try {
    const oldComment = req.commentData;
    const { comment } = req.body;
    const newComment = {
      user: req.userData._id,
      comment: comment,
      post: req.postid,
      editedAt: Date.now(),
      createdAt: oldComment.createdAt,
    }
    await Comment.findByIdAndUpdate(oldComment._id, newComment);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.deleteCommentById = async (req, res) => {
  try {
    const commentid = req.commentData._id;
    await Comment.findByIdAndDelete(commentid);
    res.status(200).json({
        message: "comment deleted"
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

