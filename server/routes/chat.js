const express = require("express");
const router = express.Router();
const db = require("../db");


//1. 내가 속한 채팅방 목록 
router.get("/room/:member_no", async (req, res) => {
    const { member_no } = req.params;
    const sql = `
        SELECT r.*, 
        IF(r.member1_no = ?, r.member2_no, r.member1_no) AS opponent_no,
        m.nickname AS opponent_nickname
        FROM room r
        JOIN member m ON m.member_no = IF(r.member1_no = ?, r.member2_no, r.member1_no)
        WHERE r.member1_no = ? OR r.member2_no = ?
        ORDER BY r.cdatetime DESC
    `;
    const [rows] = await db.query(sql, [member_no, member_no,member_no, member_no]);
    res.json({ success: true, rooms: rows })
});

//2. 채팅방 생성 or 기존방
router.post("/room", async (req, res) => {
    const { member1_no, member2_no } = req.body;
    const findSql = `
        SELECT * FROM room WHERE
        (member1_no = ? AND member2_no = ?) OR
        (member1_no = ? AND member2_no = ?)
    `;

    const [found] = await db.query(findSql, [member1_no, member2_no, member2_no, member1_no]);
    if (found.length > 0) {
        return res.json({ success: true, room: found[0] });
    }

    const insertSql = `INSERT INTO room (member1_no, member2_no, cdatetime) VALUES(?,?,NOW())`;
    const [result] = await db.query(insertSql, [member1_no, member2_no]);

    const [newRoom] = await db.query(`SELECT * FROM room WHERE room_no = ?`, [result.insertId]);
    res.json({ success: true, room: newRoom[0] });

});

//3. 채팅 메시지 조회
router.get("/message/:room_no", async (req, res) => {
    const { room_no } = req.params;
    const sql = `
        SELECT * FROM chat_message
        WHERE room_no = ?
        ORDER BY cdatetime ASC
    `;
    const [rows] = await db.query(sql, [room_no]);
    res.json({ success: true, message: rows });
});

//4. 메시지 전송
router.post("/message", async (req, res) => {
    const { room_no, sender_no, receiver_no, message } = req.body;
    const sql = `
        INSERT INTO chat_message(room_no, sender_no, receiver_no, message, cdatetime)
        VALUES (?,?,?,?,NOW())    
    `;
    await db.query(sql, [room_no, sender_no, receiver_no, message]);
    res.json({ success: true });
});



module.exports = router;
