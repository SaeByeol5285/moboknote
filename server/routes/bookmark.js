const express = require("express");
const db = require("../db");
const router = express.Router();

//북마크 여부 확인
router.get('/check', async (req, res) => {
    try {
        const { member_no, feed_no } = req.query;
        const sql = "SELECT * FROM bookmark WHERE member_no = ? AND feed_no = ?"
        const [rows] = await db.query(sql, [member_no, feed_no]);
        if (rows.length > 0) {
            res.json({
                result: true
            })
        } else {
            res.json({ result: false })
        }
    } catch (error) {
        console.error("피드 목록 오류:", err);
        res.status(500).send("DB 오류");
    }
})

//북마크 on
router.post('/', async (req, res) => {
    const { member_no, feed_no } = req.body;
    try {
        const sql = "INSERT INTO bookmark VALUES(NULL,?,?,NOW())"
        const [rows] = await db.query(sql, [member_no, feed_no]);
        res.json({success : true})
    } catch (error) {
        console.error("피드 목록 오류:", error);
        res.status(500).send("DB 오류");
    }
})
//북마크 off
router.delete('/', async (req, res) => {
    const { member_no, feed_no } = req.body;
    try {
        const sql = "DELETE FROM bookmark WHERE member_no = ? AND feed_no = ?"
        const [rows] = await db.query(sql, [member_no, feed_no]);
        res.json({success : true})
    } catch (error) {
        console.error("피드 목록 오류:", error);
        res.status(500).send("DB 오류");
    }
})

module.exports = router;