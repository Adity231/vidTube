const mongoose = require("mongoose");

//vidtube Backend
mongoose
  .connect("mongodb://localhost:27017/vidtubeBackend")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });