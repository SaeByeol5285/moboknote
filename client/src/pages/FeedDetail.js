import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";

// mui
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// 컴포넌트
import FeedDetailImageSlider from "../components/feed/FeedDetailImageSlider"; // 이미지 슬라이더
import FeedOptions from "../components/feed/FeedOptions";
import FeedHeader from "../components/feed/FeedHeader";
import FeedActionButtons from "../components/feed/FeedActionButtons";
import BookmarkBtn from "../components/feed/BookmarkBtn";
import LikeBtn from "../components/feed/LikeBtn";
import CommentList from "../components/comment/CommentList";

function FeedDetail() {
    //페이지 이동
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state?.backgroundLocation;

    const handleClose = () => {
        navigate(background || "/home", { replace: true });
    };

    const user = useRecoilValue(userState);
    const currentUserId = user.member_no;

    const { no } = useParams();
    const [feed, setFeed] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [images, setImages] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [likeCount, setLikeCount] = useState(0);


    // esc 누르면 리스트로 이동
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                navigate(background || "/home", { replace: true });
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
            body: JSON.stringify({ member_no: currentUserId, content: comment.trim() }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setComment("");
                    setComments(prev => [...prev, {
                        member_no: currentUserId,
                        content: comment.trim(),
                        cdatetime: new Date().toISOString(),
                    }]);
                }
            });
    };

    useEffect(() => {
        if (!feed || !feed.feed_no) return;

        fetch(`http://localhost:3005/like/count?feed_no=${feed.feed_no}`)
            .then(res => res.json())
            .then(data => setLikeCount(data.count));
    }, [feed]);

    console.log("💬 댓글 렌더링용 feed_owner_no:", feed?.member_no);



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
                onClick={handleClose}
                sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    color: "#fff",
                    backgroundColor: "rgba(0, 0, 0, 0.77)",
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
                            <Box sx={{ padding: 2 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: 1,
                                    }}
                                >
                                    <FeedHeader feed={feed} currentUserId={currentUserId} profileImg={user.profile_img} />
                                    <FeedOptions feed={feed} />
                                </Box>
                                <Typography variant="body2" sx={{ mt: 2 }}>
                                    <strong>{feed.nickname}</strong> {feed.title}<br />
                                    {feed.content}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#888", mt: 1 }}>
                                    #{feed.region} #{feed.season} #{feed.place_type}
                                </Typography>
                            </Box>
                            {feed.member_no !== user.member_no && (
                                <FeedActionButtons
                                    likeCount={likeCount}
                                    BookmarkComponent={<BookmarkBtn feed_no={feed.feed_no} />}
                                    LikeComponent={<LikeBtn feed_no={feed.feed_no} feed_owner_no={feed.member_no} onCountChange={delta => setLikeCount(prev => prev + delta)} />}
                                />
                            )}
                        </>
                    )}
                    {feed && feed.member_no && currentUserId &&
                        <CommentList
                            feedNo={feed.feed_no}
                            currentUserId={user.member_no}
                            feed_owner_no={feed.member_no} 
                        />
                    }
                </Box>
            </Box>
        </Box >
    );
}

export default FeedDetail;
