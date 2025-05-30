const express = require("express");
const router = express.Router();
const db = require("../db");

//좋아요 체크
router.get("/check", async (req, res) => {
    const { feed_no, member_no } = req.query;
    try {
        const sql = `SELECT COUNT(*) AS cnt FROM feed_like WHERE feed_no = ? AND member_no = ?`
        const [rows] = db.query(sql,[feed_no, member_no]);
        res.json({ "liked" : rows[0].cnt > 0 }); //true of false반환함

    } catch (error) {
        console.error("좋아요 체크 오류 : ", error);
        res.status(500).json({error : "서버오류"});
    }
});

//좋아요 등록
router.post("/", async (req, res) => {
    const { feed_no, member_no } = req.body;
    try {
        const sql = `INSERT INTO feed_like VALUES(null, ?, ?, NOW())`
        const [rows] = db.query(sql,[feed_no, member_no]);
        res.json({ "success" : rows[0].cnt > 0 }); //true of false반환함

    } catch (error) {
        console.error("좋아요 체크 오류 : ", error);
        res.status(500).json({error : "서버오류"});
    }
});


module.exports = router;