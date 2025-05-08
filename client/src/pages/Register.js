import React, { useState, useRef } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


function Register() {
    const emailRef = useRef();
    const pwdRef = useRef();
    const confirmPwdRef = useRef();
    const nicknameRef = useRef();
    const inputStyle = {
        "& label.Mui-focused": {
            color: "#768265",
        },
        "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff",

            "&.Mui-focused fieldset": {
                borderColor: "#768265",
            },
        },
    };

    const navigate = useNavigate();
    const [isEmailChecked, setIsEmailChecked] = useState(false);

    const [form, setForm] = useState({
        email: "",
        pwd: "",
        confirmPwd: "",
        nickname: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = () => {
        const { email, pwd, confirmPwd, nickname } = form;

        // 1. 빈값 검사 + 포커스 이동
        if (!email) {
            alert("이메일을 입력해주세요.");
            emailRef.current.focus();
            return;
        }
        if (!pwd) {
            alert("비밀번호를 입력해주세요.");
            pwdRef.current.focus();
            return;
        }
        if (!confirmPwd) {
            alert("비밀번호 확인을 입력해주세요.");
            confirmPwdRef.current.focus();
            return;
        }
        if (!nickname) {
            alert("사용자 이름을 입력해주세요.");
            nicknameRef.current.focus();
            return;
        }
        // 2. 비밀번호 일치 검사
        if (pwd !== confirmPwd) {
            alert("비밀번호가 일치하지 않습니다.");
            document.getElementsByName("confirmPwd")[0].focus();
            return;
        }
        // 3. 비번 글자수
        if (pwd.length < 6) {
            alert("비밀번호는 최소 6자 이상이어야 합니다.");
            return;
        }

        // 4. 이메일 중복체크
        if (!isEmailChecked) {
            alert("이메일 중복 확인을 해주세요.");
            return;
        }

        // 5. 유효성 통과 후 서버로 전송
        fetch("http://localhost:3005/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: form.email,
                pwd: form.pwd,
                nickname: form.nickname,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("서버 응답:", data);
                if (data.success) {
                    alert("회원가입이 완료되었습니다!");
                    navigate("/login")
                } else {
                    alert(data.message || "회원가입에 실패했습니다.");
                }
            })
            .catch((err) => {
                console.error("회원가입 요청 중 에러 발생:", err);
                alert("서버 오류가 발생했습니다.");
            });
    };

    return (
        <Box
            sx={{
                backgroundColor: "#fdfbf5",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    width: 300,
                    textAlign: "center",
                    backgroundColor: "#fffef6",
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        mb: 2,
                        fontWeight: "bold",
                        color: "#768265",
                        borderRadius: "10px",
                        padding: "5px 10px",
                        fontSize: "0.9rem",
                    }}
                >
                    무사 복귀를 위한, 감성 라이더들의 기록장
                </Typography>

                <img
                    src="/img/mubok-logo1.png"
                    alt="무북노트 로고"
                    style={{ width: 120, marginBottom: 16 }}
                />

                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                    회원가입
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>

                    <Box sx={{ position: "relative", mb: 1 }}>
                        <TextField
                            inputRef={emailRef}
                            fullWidth
                            name="email"
                            label="이메일"
                            variant="outlined"
                            value={form.email}
                            onChange={(e) => {
                                setForm({ ...form, email: e.target.value });
                                setIsEmailChecked(false);
                            }}
                            InputProps={{
                                readOnly: isEmailChecked,
                                style: {
                                    backgroundColor: isEmailChecked ? "#f8f8f8" : "#fff",
                                    cursor: isEmailChecked ? "default" : "text"
                                }
                            }}
                            sx={inputStyle}
                        />

                        {isEmailChecked && (
                            <Button
                                size="small"
                                onClick={() => {
                                    setIsEmailChecked(false);
                                    setTimeout(() => emailRef.current?.focus(), 0);
                                }}
                                sx={{
                                    mt: 0.5,
                                    mb: 1,
                                    fontSize: "0.8rem",
                                    color: "#768265",
                                    textTransform: "none"
                                }}
                            >
                                이메일 수정하기
                            </Button>
                        )}
                    </Box>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                            if (!form.email) return alert("이메일을 입력해주세요.");
                            fetch(`http://localhost:3005/user/check-email?email=${form.email}`)
                                .then((res) => res.json())
                                .then((data) => {
                                    alert(data.message);
                                    if (data.success) setIsEmailChecked(true);
                                })
                                .catch(() => alert("중복 확인 중 오류 발생"));
                        }}
                        sx={{
                            color: "#94b8c4",
                            fontWeight: "bold",
                            borderWidth: "2px",
                            borderColor: "#94b8c4",       // ✅ 이거!
                            "&:hover": {
                                backgroundColor: "#94b8c4",
                                color: "white",
                                borderColor: "#94b8c4",     // ✅ hover 시도 같이 지정
                            },
                        }}
                    >
                        중복확인
                    </Button>
                    
                    <TextField
                        inputRef={pwdRef}
                        fullWidth
                        name="pwd"
                        label="비밀번호"
                        type="password"
                        variant="outlined"
                        value={form.pwd}
                        onChange={handleChange}
                        error={form.pwd.length > 0 && form.pwd.length < 6}
                        helperText={
                            form.pwd.length > 0 && form.pwd.length < 6
                                ? "비밀번호는 최소 6자 이상이어야 합니다."
                                : " "
                        }
                        sx={inputStyle}
                    />
                    <TextField
                        inputRef={confirmPwdRef}
                        fullWidth
                        name="confirmPwd"
                        label="비밀번호 확인"
                        type="password"
                        variant="outlined"
                        value={form.confirmPwd}
                        onChange={handleChange}
                        error={form.confirmPwd.length > 0 && form.confirmPwd !== form.pwd}
                        helperText={
                            form.confirmPwd.length > 0 && form.confirmPwd !== form.pwd
                                ? "비밀번호가 일치하지 않습니다."
                                : " "
                        }
                        sx={inputStyle}
                    />
                    <TextField
                        inputRef={nicknameRef}
                        fullWidth
                        name="nickname"
                        label="닉네임"
                        variant="outlined"
                        value={form.nickname}
                        onChange={handleChange}
                        sx={inputStyle}
                    />
                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleRegister}
                    sx={{
                        mt: 3,
                        backgroundColor: "#94b8c4",
                        color: "white",
                        fontWeight: "bold",
                        "&:hover": {
                            backgroundColor: "#4f7f91",
                        },
                    }}
                >
                    회원가입
                </Button>
                <Typography variant="body2" marginTop={"32px"}>
                    이미 계정이 있으신가요?{" "}
                    <Link href="/login" underline="hover">
                        로그인
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}

const inputStyle = {
    mb: 2,
    "& label.Mui-focused": {
        color: "#768265",
    },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "#768265",
        },
    },
};

export default Register;