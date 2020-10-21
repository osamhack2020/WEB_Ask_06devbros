const Post = require('../models/post');

// ======== Post 주인 미들웨어 =======

const postAuthorize = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if(!post) {
        return res.status(400).json({
            message: "No Post"
        });
    }
    else {
        if(post.user._id.toString() !== req.userData._id.toString()) {
            return res.status(401).json({
                message: "Authhh Failed"
            });
        } else {
            req.postData = post;
            next();
        }
    }
  } catch (e) {
    return res.status(401).json({
        message: "Authorize Failed"
    });
  }
};

module.exports = postAuthorize;
