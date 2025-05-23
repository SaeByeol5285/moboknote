const express = require('express');
const cors = require('cors');
const app = express();
const path = require("path");


const userRouter = require('./routes/user');
const feedRouter = require('./routes/feed');
const followRouter = require('./routes/follow');
const bookmarkRouter = require('./routes/bookmark')



app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/feed", feedRouter);
app.use('/follow', followRouter);
app.use('/bookmark', bookmarkRouter);
// 📌 정적 파일 공개 (브라우저에서 접근 가능하게)
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));



app.listen(3005, () => {
    console.log("서버 실행중!")
})  