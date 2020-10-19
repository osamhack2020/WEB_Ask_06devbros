const Post = require('../models/post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({
        posts: posts
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.addPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({
      title: title,
      content: content,
      user: req.userData
    });
    const post = await newPost.save();
    res.status(201).json({
        newPost: post
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) {
      res.status(409).json({
        message: "bad id"  
      });
    }
    res.status(200).json({
        post: post
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.editPostById = async (req, res) => {
  try {
    console.log('hello');
    const post = req.postData;
    const user = req.userData._id;
    const { title, content } = req.body;
    const editedAt = Date.now();
    const createdAt = post.createdAt;
    const newPost = {
      user,
      title,
      content,
      editedAt,
      createdAt,
    }
    await Post.findByIdAndUpdate(post._id, newPost);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.deletePostById = async (req, res) => {
  try {
    const postId = req.postData._id;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({
        message: "post deleted"
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

