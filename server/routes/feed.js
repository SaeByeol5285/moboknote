const express = require("express");
const router = express.Router();
const db = require("../db");
const dayjs = require("dayjs");
const upload = require("../middleware/upload");


// 게시글 등록
router.post("/", async (req, res) => {
  const conn = await db.getConnection(); // 트랜잭션용
  try {
    const {
      member_no,
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
    res.json({ success: true, insertId: feed_no });

  } catch (err) {
    await conn.rollback();
    console.error("❌ 게시물 등록 중 오류:", err);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  } finally {
    conn.release();
  }
});

// 첨부파일 업로드
router.post("/upload", upload.array("files"), async (req, res) => {
  const feedNo = req.body.feed_no;

  if (!feedNo) {
    return res.status(400).json({ success: false, message: "feed_no가 필요합니다." });
  }

  // ✅ 첫 번째 파일만 썸네일 처리
  const files = req.files.map((file, idx) => ({
    file_name: file.filename,
    file_path: `uploads/${file.filename}`.replace(/\\/g, "/"), // ✅ 슬래시 치환
    is_thumbnail: idx === 0 ? "Y" : "N",
  }));

  try {
    for (const file of files) {
      await db.query(
        `INSERT INTO feed_img (feed_no, file_name, file_path, is_thumbnail, cdatetime)
         VALUES (?, ?, ?, ?, NOW())`,
        [feedNo, file.file_name, file.file_path, file.is_thumbnail]
      );
    }

    console.log("📦 DB 저장 완료:", files);
    res.json({ success: true, files });
  } catch (err) {
    console.error("⛔ DB 저장 오류:", err);
    res.status(500).json({ success: false, message: "DB 저장 실패" });
  }
});

//리스트
router.get("/", async (req, res) => {
  try {
    let sql = "SELECT F.*, I.file_path as file_path, M.nickname, M.profile_img FROM feed F LEFT JOIN feed_img I ON F.feed_no = I.feed_no AND I.is_thumbnail = 'Y' INNER JOIN member M ON F.member_no = M.member_no ORDER BY F.feed_no DESC"
    const [rows] = await db.query(sql);
    res.json({ list: rows });
  } catch (err) {
    console.error("피드 목록 오류:", err);
    res.status(500).send("DB 오류");
  }
});

//상세보기
router.get("/:no", async (req, res) => {
  const { no } = req.params;
  try {
    // 1. 피드 정보
    const [feedRows] = await db.query("SELECT f.*, m.nickname, m.profile_img FROM feed f JOIN member m ON f.member_no = m.member_no WHERE f.feed_no = ?", [no]);
    const feedInfo = feedRows[0];

    // 2. 첨부 이미지
    const [imgRows] = await db.query(
      `SELECT file_name, file_path 
       FROM feed_img 
       WHERE feed_no = ? ORDER BY cdatetime ASC`,
      [no]
    );

    // 3. 댓글 리스트
    const [cmtRows] = await db.query(
      `SELECT comment_no, member_no, content, cdatetime 
       FROM comment 
       WHERE feed_no = ? ORDER BY cdatetime ASC`,
      [no]
    );

    // 4. 코스
    const [courseRows] = await db.query(
      `SELECT * 
       FROM course 
       WHERE feed_no = ?`,
      [no]
    );

    res.json({
      success: true,
      info: feedInfo,
      images: imgRows,
      comments: cmtRows,
      course: courseRows
    });

  } catch (err) {
    console.error("❌ 상세보기 데이터 조회 실패:", err);
    res.status(500).json({ success: false });
  }
});

// 게시글 수정
router.put("/:no", async (req, res) => {
  const conn = await db.getConnection();
  const { no } = req.params;
  const {
    title,
    content,
    region,
    season,
    bariType,
    locationType,
    ccType,
    courseList = []
  } = req.body;

  try {
    await conn.beginTransaction();

    // 1. feed 테이블 update
    await conn.query(
      `UPDATE feed 
       SET title = ?, content = ?, region = ?, season = ?, 
           bari_type = ?, place_type = ?, bike_cc = ?, udatetime = NOW()
       WHERE feed_no = ?`,
      [title, content, region, season, bariType, locationType, ccType, no]
    );

    // 2. 기존 course 삭제
    await conn.query(`DELETE FROM course WHERE feed_no = ?`, [no]);

    // 3. course 새로 insert
    for (let i = 0; i < courseList.length; i++) {
      const { name, lat, lng } = courseList[i];
      if (!name || lat == null || lng == null) continue;

      await conn.query(
        `INSERT INTO course (feed_no, order_no, place_name, latitude, longitude)
         VALUES (?, ?, ?, ?, ?)`,
        [no, i, name, lat, lng]
      );
    }

    await conn.commit();
    res.json({ success: true });
  } catch (err) {
    await conn.rollback();
    console.error("❌ 게시글 수정 중 오류:", err);
    res.status(500).json({ success: false, message: "서버 오류" });
  } finally {
    conn.release();
  }
});

// 댓글작성
router.post("/:no/comment", async (req, res) => {
  const { no } = req.params;
  const { member_no, content } = req.body;

  try {
    await db.query(
      `INSERT INTO comment (feed_no, member_no, content, cdatetime) VALUES (?, ?, ?, NOW())`,
      [no, member_no, content]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("❌ 댓글 저장 실패:", err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;