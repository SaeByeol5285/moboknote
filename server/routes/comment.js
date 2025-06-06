const express = require("express");
const router = express.Router();
const db = require("../db");

// 댓글 등록
router.post("/:feed_no", async (req, res) => {
  const { feed_no } = req.params;
  const { member_no, content } = req.body;
  try {
    const sql = "INSERT INTO comment (feed_no, member_no, content, cdatetime) VALUES (?, ?, ?, NOW())";
    await db.query(sql, [feed_no, member_no, content]);
    res.json({ success: true });
  } catch (error) {
    console.error("댓글 등록 오류:", error);
    res.status(500).json({ success: false });
  }
});

// 댓글 목록 조회
router.get("/:feed_no", async (req, res) => {
  const { feed_no } = req.params;
  try {
    const sql = "SELECT c.*, m.nickname FROM comment c INNER JOIN member m ON c.member_no = m.member_no WHERE c.feed_no = ? ORDER BY c.cdatetime ASC";
    const [rows] = await db.query(sql, [feed_no]);
    res.json({ success: true, comments: rows });
  } catch (error) {
    console.error("댓글 조회 오류:", error);
    res.status(500).json({ success: false });
  }
});

// 댓글 수정
router.put("/:feed_no/:comment_no", async (req, res) => {
  const { comment_no } = req.params;
  const { content } = req.body;
  try {
    const sql = "UPDATE comment SET content = ? WHERE comment_no = ?";
    await db.query(sql, [content, comment_no]);
    res.json({ success: true });
  } catch (error) {
    console.error("댓글 수정 오류:", error);
    res.status(500).json({ success: false });
  }
});

// 댓글 삭제
router.delete("/:feed_no/:comment_no", async (req, res) => {
  const { comment_no } = req.params;
  try {
    const sql = "DELETE FROM comment WHERE comment_no = ?";
    await db.query(sql, [comment_no]);
    res.json({ success: true });
  } catch (error) {
    console.error("댓글 삭제 오류:", error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;