var express = require("express");
var app = express();
var port = 4000
const cookieParser = require("cookie-parser");  
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

require("./Connection/conn");
const AuthRoutes = require("./Routes/user");
const VideoRoutes = require("./Routes/video");
const CommentRoutes = require("./Routes/comment");


app.use('/auth', AuthRoutes);
app.use('/api', VideoRoutes);
app.use('/commentApi', CommentRoutes);

const path = require("path");

// Serve React frontend build
app.use(express.static(path.join(__dirname, "vidtube-frontend", "build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "vidtube-frontend", "build", "index.html")
  );
});


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})