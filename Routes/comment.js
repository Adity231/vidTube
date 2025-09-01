const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const commentController = require('../Controllers/comment');



router.post('/comment', auth, commentController.addComment);
router.get('/comment/:videoId', commentController.getCommentsByVideoId);

module.exports = router;