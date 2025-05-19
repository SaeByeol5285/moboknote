const express = require("express");
const router = express.Router();
const db = require("../db");


//follow 여부 확인
router.get("/check", async (req, res) => {
    const { from, to } = req.query;

    try {
        const [result] = await db.query(
            "SELECT COUNT(*) AS cnt FROM follow WHERE follower_no = ? AND following_no = ?",
            [from, to]
        );
        res.json({ result: result[0].cnt }); // 1이면 팔로우 중, 0이면 안 함
    } catch (err) {
        console.error("팔로우 여부 조회 실패:", err);
        res.status(500).json({ error: "서버 오류" });
    }
});

//follow추가
router.post("/", async (req, res) => {
    const { follower_no, following_no } = req.body;

    try {
        await db.query(
            "INSERT INTO follow (follower_no, following_no, cdatetime) VALUES (?, ?, NOW())",
            [follower_no, following_no]
        );
        res.json({ message: "팔로우 완료" });
    } catch (err) {
        console.error("팔로우 실패:", err);
        res.status(500).json({ error: "서버 오류" });
    }
});

//follow취소
router.delete("/", async (req, res) => {
    const { follower_no, following_no } = req.body;

    try {
        await db.query(
            "DELETE FROM follow WHERE follower_no = ? AND following_no = ?",
            [follower_no, following_no]
        );
        res.json({ message: "언팔로우 완료" });
    } catch (err) {
        console.error("언팔로우 실패:", err);
        res.status(500).json({ error: "서버 오류" });
    }
});




module.exports = router;