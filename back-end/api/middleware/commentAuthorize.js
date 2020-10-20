const Comment = require('../models/comment');

// ======== Comment 주인 미들웨어 =======

const commentAuthorize = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId);
    if(!comment) {
        return res.status(409).json({
            message: "No Comment"
        });
    }
    else {
        if(comment.user._id.toString() !== req.userData._id.toString()) {
            return res.status(401).json({
                message: "Authhh Failed"
            });
        } else {
            req.commentData = comment;
            next();
        }
    }
  } catch (e) {
    return res.status(401).json({
        message: "Authorize Failed"
    });
  }
};

module.exports = commentAuthorize;
