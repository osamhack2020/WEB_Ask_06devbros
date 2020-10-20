const express = require('express');
const jwtMiddleware = require('../middleware/jwtMiddleware');
// const postAuthorize = require('../middleware/postAuthorize');

const commentController = require('../controllers/comment');

const router = express.Router();

//get all posts
router.get('/', commentController.getComments);
// add one post
router.post('/add', jwtMiddleware, commentController.addComment);
// // get one post
// router.get('/:id', postController.getPostById);
// // edit one post
// router.put('/:id/edit', jwtMiddleware, postController.editPostById);
// // delete post
// router.delete('/:id', jwtMiddleware, postController.deletePostById);

module.exports = router;
