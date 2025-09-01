const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String},
  url: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  thumbnail: { type: String, required: true },
  videoType: { type: String, default:"All" },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 }
},{timestamps: true});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
