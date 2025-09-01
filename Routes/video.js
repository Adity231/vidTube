const express = require('express');
const router = express.Router();
const  videoController = require('../Controllers/video');
const auth = require('../middleware/authentication');

router.post('/video',auth, videoController.uploadVideo)
router.get("/allVideos",videoController.getAllVideos);
router.get("/getVideoById/:id", videoController.getVideoById);
router.get("/:userId/channel", videoController.getAllVideosByUserId);

module.exports = router;