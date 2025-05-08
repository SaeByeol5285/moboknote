const express = require('express');
const cors = require('cors');
const app = express();

const userRouter = require('./routes/user');
const feedRouter = require('./routes/feed');



app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/feed", feedRouter);




app.listen(3005, () => {
    console.log("서버 실행중!")
})