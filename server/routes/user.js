const express = require("express");
const router = express.Router();
const db = require("../db");

// 테스트용 회원 목록
router.get("/list", async (req, res) => {
    const [rows] = await db.query("SELECT * FROM member");
    res.json(rows);
});

module.exports = router;