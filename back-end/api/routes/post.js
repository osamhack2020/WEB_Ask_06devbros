const express = require('express');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const postAuthorize = require('../middleware/postAuthorize');

const Post = require('../models/post');

const router = express.Router();

router.get('/', async (req, res) => {
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
});

router.post('/add', jwtMiddleware, async (req, res) => {
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
});

router.get('/:id', async (req, res) => {
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
});

router.put('/:id/edit', jwtMiddleware, postAuthorize, async (req, res) => {
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
});

router.delete('/:id', jwtMiddleware, postAuthorize, async (req, res) => {
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
});

module.exports = router;
