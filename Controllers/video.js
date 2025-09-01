const Video = require('../Models/video');


exports.uploadVideo = async (req, res) => {
    try {
        const { title, description, url, videoType, thumbnail } = req.body;
        const videoUpload = new Video({
            title,
            description,
            url,
            videoType,
            thumbnail,
            user: req.user._id
        });
        await videoUpload.save();
        res.status(201).json({ message: "Video uploaded successfully", video: videoUpload });
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
};

exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find().populate("user", "channelName profilePic username createdAt");
        res.status(200).json({ success: true, "videos": videos });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getVideoById = async (req, res) => {
    try {
        let {id} = req.params;
        const video = await Video.findById(id).populate(
          "user",
          "channelName profilePic username createdAt"
        );
        res.status(200).json({ success: true, "video": video });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getAllVideosByUserId = async (req, res) => {
    try {
        let {userId} = req.params;
        const videos = await Video.find({ user: userId }).populate(
            "user",
            "channelName profilePic username createdAt about"
        );
        res.status(200).json({ success: true, videos });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};