const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/unreadCount", async (req, res) => {
const { member_no } = req.query;

  if (!member_no) {
    return res.status(400).json({ success: false, message: "member_no is required" });
  }

  try {
    const [rows] = await db.execute(
      "SELECT COUNT(*) AS count FROM notification WHERE receiver_no = ? AND is_read = 'N'",
      [member_no]
    );

    return res.json({ success: true, count: rows[0].count });
  } catch (err) {
    console.error("❌ 알림 개수 조회 오류:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
    const { sender_no, receiver_no, type, feed_no} = req.body;

    try {
        const sql = `INSERT INTO notification (sender_no, receiver_no, type, feed_no, is_read, cdatetime)
        VALUES(?,?,?,?,'N',NOW())`;
        await db.query(sql,[sender_no, receiver_no, type, feed_no]);
        res.json({success:true});
    } catch (error) {
        console.error("알림 등록 오류 : ", error);
        res. status(500).json({success:false, error:error.message});
    }
});

router.get("/:receiver_no", async (req, res) => {
  const { receiver_no } = req.params;

  try {
    const sql = `
      SELECT n.*, m.nickname 
      FROM notification n
      JOIN member m ON n.sender_no = m.member_no
      WHERE n.receiver_no = ?
      ORDER BY n.cdatetime DESC
    `;

    const [rows] = await db.query(sql, [receiver_no]);
    res.json({ success: true, list: rows });
  } catch (err) {
    console.error("알림 조회 오류:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put("/:notification_no", async (req, res) => {
  const { notification_no } = req.params;

  try {
    const sql = `UPDATE notification SET is_read = 'Y' WHERE notification_no = ?`;
    await db.query(sql, [notification_no]);
    res.json({ success: true });
  } catch (err) {
    console.error("알림 읽음 처리 오류:", err);
    res.status(500).json({ success: false });
  }
});




module.exports = router;