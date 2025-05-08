const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../db");
const router = express.Router();



// 로그인
const JWT_KEY = "secret_key_muboknote";

router.post("/login", async (req, res) => {
    const { email, pwd } = req.body;

    try {
        // 1. 해당 이메일로 사용자 정보 조회
        const [rows] = await db.query("SELECT * FROM member WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(400).json({ success: false, message: "존재하지 않는 이메일입니다." });
        }

        const user = rows[0];

        // 2. bcrypt로 비밀번호 비교
        const isMatch = await bcrypt.compare(pwd, user.pwd);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "비밀번호가 일치하지 않습니다." });
        } else {
            // 3. 로그인 성공 jwt발급
            let payload = {
                member_no: user.member_no,
                email: user.email,
                nickname: user.nickname,
                profile_img: user.profile_img
            }
            const token = jwt.sign(payload, JWT_KEY, { expiresIn: '1h' });
            res.json({
                message: "로그인 성공!",
                success: true,
                token: token,
            });
        }


    } catch (err) {
        console.error("로그인 중 에러 발생:", err);
        res.status(500).send("Server Error");
    }
});

// 회원가입
router.post("/register", async (req, res) => {
    let { email, pwd, nickname } = req.body;

    try {
        let hashPwd = await bcrypt.hash(pwd, 10);
        let query = "INSERT INTO member(email, pwd, nickname) VALUES(?,?,?)";
        let [user] = await db.query(query, [email, hashPwd, nickname]);
        if (user.affectedRows > 0) {
            res.json({
                message: "회원가입 성공",
                info: user[0]
            });
        } else {
            res.status(500).json({ success: false, message: "DB 에러 발생" });
        }

    } catch (err) {
        console.log("에러 발생");
        res.status(500).send("Server Error");
    }
})

//아이디 중복체크
router.get("/check-email", async (req, res) => {
    const { email } = req.query;
    try {
      const [rows] = await db.query("SELECT * FROM member WHERE email = ?", [email]);
      if (rows.length > 0) {
        return res.json({ success: false, message: "이미 존재하는 이메일입니다." });
      }
      res.json({ success: true, message: "사용 가능한 이메일입니다." });
    } catch (err) {
      res.status(500).json({ success: false, message: "서버 오류" });
    }
  });

module.exports = router;