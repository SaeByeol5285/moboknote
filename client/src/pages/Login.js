import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/atoms";
import { jwtDecode } from "jwt-decode";


function Login() {
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);


    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const handleLogin = () => {
        fetch("http://localhost:3005/user/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email, pwd })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem("token", data.token);
                    const decoded = jwtDecode(data.token);

                    setUser({
                        isLogin: true,
                        member_no: decoded.member_no,
                        email: decoded.email,
                        nickname: decoded.nickname,
                        profile_img: decoded.profile_img,
                    });
                    navigate("/home");
                }
            })
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
                        fontSize: "0.9rem"
                    }}
                >
                    무사 복귀를 위한, 감성 라이더들의 기록장
                </Typography>

                <img
                    src="/img/mubok-logo1.png"
                    alt="무북노트 로고"
                    style={{ width: 120, marginBottom: 16 }}
                />

                <TextField
                    fullWidth
                    label="이메일"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        mb: 2,
                        "& label.Mui-focused": {
                            color: "#768265", // ✅ 라벨 포커스 색
                        },
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: "#768265", // ✅ 포커스 테두리 색
                            },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="비밀번호"
                    type="password"
                    variant="outlined"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    sx={{
                        mb: 2,
                        "& label.Mui-focused": {
                            color: "#768265", // ✅ 라벨 포커스 색
                        },
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: "#768265", // ✅ 포커스 테두리 색
                            },
                        },
                    }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleLogin}
                    sx={{
                        backgroundColor: "#94b8c4", // 기본 Sky Blue
                        color: "white",
                        fontWeight: "bold",
                        mb: 1,
                        "&:hover": {
                            backgroundColor: "#4f7f91", // hover 시 Bike Blue
                        },
                    }}
                >
                    로그인
                </Button>

                <Box
                    sx={{
                        borderTop: "1px solid #ccc",
                        my: 2,
                        width: "100%",
                        marginTop: "46px",
                        marginBottom: "40px",
                    }}
                />


                <Typography variant="body2" sx={{ mb: 1 }}>
                    비밀번호를 잊으셨나요?
                </Typography>

                <Typography variant="body2">
                    계정이 없으신가요?{" "}
                    <Link href="/register" underline="hover">
                        가입하기
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}

export default Login;