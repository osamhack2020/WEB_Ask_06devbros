const express = require('express');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const commentAuthorize = require('../middleware/commentAuthorize');
const censorComment = require('../middleware/censorComment');

const commentController = require('../controllers/comment');

const router = express.Router();

//get all comments
router.get('/', commentController.getComments);
// add one comment
router.post('/', jwtMiddleware, censorComment ,commentController.addComment);
// get one comment
router.get('/:commentid', commentController.getCommentById);
// edit one comment
router.put('/:commentid', jwtMiddleware, commentAuthorize, commentController.editCommentById);
// delete comment
router.delete('/:commentid', jwtMiddleware, commentAuthorize, commentController.deleteCommentById);

module.exports = router;
