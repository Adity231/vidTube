const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  video: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
},{timestamps: true});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
