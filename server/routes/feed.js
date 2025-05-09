const express = require("express");
const router = express.Router();
const db = require("../db");
const dayjs = require("dayjs");

// 게시글 등록
router.post("/", async (req, res) => {
    const conn = await db.getConnection(); // 트랜잭션용
    try {
      const {
        member_no=1,
        title,
        content,
        region,
        season,
        bariType,
        locationType,
        ccType,
        courseList = []
      } = req.body;

      console.log(courseList);
  
      await conn.beginTransaction();
  
      // 1. feed 테이블 insert
      const [feedResult] = await conn.query(
        `INSERT INTO feed 
         (member_no, title, content, region, season, bari_type, place_type, bike_cc, cdatetime, udatetime) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [member_no, title, content, region, season, bariType, locationType, ccType]
      );
  
      const feed_no = feedResult.insertId;
  
      // 2. course 테이블 insert (order_no 기준)
      for (let i = 0; i < courseList.length; i++) {
        const { name, lat, lng } = courseList[i];
        if (!name || lat == null || lng == null) continue; // 유효성 검사
  
        await conn.query(
          `INSERT INTO course (feed_no, order_no, place_name, latitude, longitude)
           VALUES (?, ?, ?, ?, ?)`,
          [feed_no, i, name, lat, lng]
        );
      }
  
      await conn.commit();
      res.json({ success: true, message: "게시물 등록 완료", feed_no });
  
    } catch (err) {
      await conn.rollback();
      console.error("❌ 게시물 등록 중 오류:", err);
      res.status(500).json({ success: false, message: "서버 오류 발생" });
    } finally {
      conn.release();
    }
  });
  

module.exports = router;