const e = require("express");
const comment = require("../Models/comment");



exports.addComment = async (req, res) => {
    try {
        let { video, message } = req.body;
        const newComment = new comment({
            video,
            user: req.user._id,
            message
        });
        await newComment.save();
        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}


exports.getCommentsByVideoId = async (req, res) => {
    try {
        const comments = await comment.find({ video: req.params.videoId }).populate("user", "channelName profilePic username createdAt");
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}