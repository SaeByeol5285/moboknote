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

function FeedDetail() {
    const navigate = useNavigate();
    const currentUserId = "mubok_user"; // 하드코딩된 사용자
    //피드
    const { no } = useParams();
    const [feed, setFeed] = useState(null);

    useEffect(() => {
        fetch(`/feed/${no}`)
            .then(res => res.json())
            .then(data => {
                console.log("📦 응답 확인:", data);   // ✅ 구조 확인
                setFeed(data.info); // 혹은 setFeed(data) depending on structure
            });
    }, [no]);

    // 댓글 상태
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([
        { id: "user1", text: "감성 뿜뿜이네요!" },
        { id: "user2", text: "주말에 가볼게요!" },
    ]);
    const handleAddComment = () => {
        if (!comment.trim()) return;

        const newComment = {
            id: currentUserId,
            text: comment.trim(),
        };

        setComments([...comments, newComment]);
        setComment(""); // 입력창 초기화
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
                    width: "900px",
                    height: "600px",
                    display: "flex",
                    borderRadius: "8px",
                    overflow: "hidden",
                    zIndex: 1350,
                }}
            >

                {/* 좌측 이미지 */}
                <Box sx={{ flex: 1, backgroundColor: "#000" }}>
                    <img
                        src="/img/${feed.img_path}"
                        alt="피드 이미지"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </Box>

                {/* 우측 정보 */}
                <Box sx={{ width: 350, display: "flex", flexDirection: "column", padding: 2 }}>
                    {feed && (
                        <>
                            {/* 작성자 + 날짜 */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                <Box sx={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#ccc" }} />
                                <Typography fontWeight="bold">{`user_${feed.member_no}`}</Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ marginLeft: "auto" }}>
                                    {new Date(feed.cdatetime).toLocaleDateString()}
                                </Typography>
                            </Box>

                            {/* 본문 */}
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                <strong>{`user_${feed.member_no}`}</strong> {feed.title}<br />
                                {feed.content}<br />
                                <span style={{ color: "#888", cursor: "pointer" }}>
                                    #{feed.region} #{feed.season} #{feed.place_type}
                                </span>
                            </Typography>

                            <Divider sx={{ mb: 2 }} />
                        </>
                    )}

                    {/* 아이콘 + 좋아요 */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Box>
                            <IconButton onClick={handleToggleLike}>
                                {liked ? (
                                    <FavoriteIcon sx={{ color: "#e74c3c" }} />
                                ) : (
                                    <FavoriteBorderIcon />
                                )}
                            </IconButton>
                            <IconButton><ChatBubbleOutlineIcon /></IconButton>
                            <IconButton><SendIcon /></IconButton>
                        </Box>
                        <IconButton onClick={handleToggleBookmark}>
                            {bookmarked ? (
                                <BookmarkIcon sx={{ color: "#707C5C" }} />
                            ) : (
                                <BookmarkBorderIcon />
                            )}
                        </IconButton>
                    </Box>

                    <Typography variant="caption" fontWeight="bold" mb={1}>
                        좋아요 {likeCount}개
                    </Typography>


                    {/* ✅ 댓글 입력창 */}
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TextField
                            variant="standard"
                            placeholder="댓글 달기..."
                            fullWidth
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button variant="text" onClick={handleAddComment}>게시</Button>
                    </Box>



                </Box>

            </Box>
        </Box>
    );
}

export default FeedDetail;
