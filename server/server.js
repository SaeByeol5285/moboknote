const express = require('express');
const cors = require('cors');
const app = express();
const path = require("path");


const userRouter = require('./routes/user');
const feedRouter = require('./routes/feed');
const followRouter = require('./routes/follow');
const bookmarkRouter = require('./routes/bookmark');
const likeRouter = require('./routes/like');
const commentRouter = require('./routes/comment');
const notificationRouter = require('./routes/notification');
const chatRouter = require('./routes/chat');



app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/feed", feedRouter);
app.use('/follow', followRouter);
app.use('/bookmark', bookmarkRouter);
app.use('/like', likeRouter);
app.use('/comment', commentRouter);
app.use('/notification', notificationRouter);
app.use('/chat', chatRouter);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));



app.listen(3005, () => {
    console.log("서버 실행중!")
})  