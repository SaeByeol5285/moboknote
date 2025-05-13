import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Divider,
    TextField,
    Button,
    IconButton
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import { useNavigate, useParams } from "react-router-dom";
import FeedDetailImageSlider from "../components/FeedDetailImageSlider";
import KakaoCourseMap from "../components/KakaoCourseMap"; // 코스 지도 컴포넌트

function FeedDetail() {
    const navigate = useNavigate();
    const currentUserId = "mubok_user"; // 하드코딩된 사용자
    //피드
    const { no } = useParams();
    const [feed, setFeed] = useState(null);
    // 댓글 상태
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    // 이미지
    const [images, setImages] = useState([]);
    // 코스
    const [courseList, setCourseList] = useState([]);
    // esc 누르면 리스트로 이동
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                navigate(-1); // 이전 페이지로 이동
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // 컴포넌트 언마운트 시 이벤트 제거
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3005/feed/${no}`)
            .then(res => res.json())
            .then(data => {
                console.log("course ===>", data.course)
                if (data.success) {
                    setFeed(data.info);        // 피드 본문
                    setImages(data.images);    // 이미지 배열
                    setComments(data.comments); // 댓글 배열
                    setCourseList(data.course); // 코스 데이터
                }
            });
    }, [no]);

    const handleAddComment = () => {
        if (!comment.trim()) return;

        fetch(`/feed/${no}/comment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ member_no: 1, content: comment.trim() }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setComment("");
                    // 새로고침 없이 즉시 반영
                    setComments(prev => [...prev, {
                        member_no: 1,
                        content: comment.trim(),
                        cdatetime: new Date().toISOString(),
                    }]);
                }
            });
    };

    // 좋아요
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(50); // 초기 좋아요 수
    const handleToggleLike = () => {
        setLiked(!liked);
        setLikeCount(prev => liked ? prev - 1 : prev + 1);
    };

    // 북마크
    const [bookmarked, setBookmarked] = useState(false);
    const handleToggleBookmark = () => {
        setBookmarked(prev => !prev);
    };

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.4)", // 반투명 배경
                zIndex: 1300,
            }}
        >
            {/* 닫기 버튼 */}
            <IconButton
                onClick={() => navigate(-1)}
                sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    color: "#fff",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 1400,
                }}
            >
                <CloseIcon />
            </IconButton>

            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#fff",
                    width: "min(95vw, 900px)",        // ✅ 반응형: 화면이 줄어들어도 깨지지 않게
                    height: "min(90vh, 600px)",       // ✅ 높이도 유동 + 최대 600px 제한
                    display: "grid",                  // ✅ grid로 명확히 영역 나눔
                    gridTemplateColumns: "1fr 350px", // ✅ 좌:비율 / 우:고정
                    borderRadius: "8px",
                    overflow: "hidden",
                    zIndex: 1350,
                }}
            >

                {/* 좌측 이미지 */}
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Box sx={{ flex: 1 }}>
                        <FeedDetailImageSlider images={images} courseList={courseList} />
                    </Box>
                </Box>
                {/* 우측 정보 */}
                <Box sx={{ width: 350, display: "flex", flexDirection: "column", height: "100%" }}>
                    {feed && (
                        <>
                            {/* 1. 제목 영역 */}
                            <Box sx={{ padding: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Box sx={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#ccc" }} />
                                    <Typography fontWeight="bold">{`user_${feed.member_no}`}</Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ marginLeft: "auto" }}>
                                        {new Date(feed.cdatetime).toLocaleDateString()}
                                    </Typography>
                                </Box>

                                {/* 2. 본문 */}
                                <Typography variant="body2" sx={{ mt: 2 }}>
                                    <strong>{`user_${feed.member_no}`}</strong> {feed.title}<br />
                                    {feed.content}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#888", mt: 1 }}>
                                    #{feed.region} #{feed.season} #{feed.place_type}
                                </Typography>
                            </Box>

                            {/* 3. 좋아요/아이콘 */}
                            <Box sx={{ px: 2 }}>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                    <Box>
                                        <IconButton onClick={handleToggleLike}>
                                            {liked ? (
                                                <FavoriteIcon sx={{ color: "#e74c3c" }} />
                                            ) : (
                                                <FavoriteBorderIcon sx={{ color: "#94B8C4" }} />
                                            )}
                                        </IconButton>

                                        <IconButton><ChatBubbleOutlineIcon sx={{ color: "#94B8C4" }} /></IconButton>
                                        <IconButton><SendIcon sx={{ color: "#94B8C4" }} /></IconButton>
                                    </Box>
                                    <IconButton onClick={handleToggleBookmark}>
                                        {bookmarked ? (
                                            <BookmarkIcon sx={{ color: "#707C5C" }} />
                                        ) : (
                                            <BookmarkBorderIcon sx={{ color: "#94B8C4" }} />
                                        )}
                                    </IconButton>
                                </Box>

                                <Typography variant="caption" fontWeight="bold" mb={1}>
                                    좋아요 {likeCount}개
                                </Typography>
                            </Box>
                        </>
                    )}

                    {/* 4. 댓글 리스트 */}
                    <Box sx={{ flex: 1, px: 2, overflowY: "auto", mb: 1 }}>
                        {comments.map((c, i) => (
                            <Box key={i} sx={{ mb: 1 }}>
                                <Typography variant="body2">
                                    <strong>{`user_${c.member_no}`}</strong> {c.content}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* 5. 댓글 입력창 */}
                    <Box sx={{ px: 2, py: 1, borderTop: "1px solid #eee", display: "flex", gap: 1 }}>
                        <TextField
                            variant="standard"
                            placeholder="댓글 달기..."
                            fullWidth
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{
                                "& .MuiInput-underline:after": {
                                    borderBottomColor: "#94B8C4",
                                },
                            }}
                        />
                        <Button
                            variant="text"
                            onClick={handleAddComment}
                            sx={{
                                color: "#707C5C",
                                fontWeight: "bold",
                                "&:hover": {
                                    color: "#5e6a4a",
                                },
                            }}
                        >
                            게시
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default FeedDetail;
