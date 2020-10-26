const express = require('express');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const postAuthorize = require('../middleware/postAuthorize');

const postController = require('../controllers/post');

const router = express.Router();

//get all posts
router.get('/', postController.getPosts);
// add one post
router.post('/', jwtMiddleware, postController.addPost);
// get one post
router.get('/:id', postController.getPostById);
// edit one post
router.put('/:id/', jwtMiddleware, postAuthorize, postController.editPostById);
// delete post
router.delete('/:id', jwtMiddleware, postAuthorize, postController.deletePostById);

module.exports = router;
