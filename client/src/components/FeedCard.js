import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";

//mui
import Button from "@mui/material/Button";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Avatar,

} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";


function FeedCard({ feed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useRecoilValue(userState);
  const currentUserId = user.member_no;
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (currentUserId !== feed.member_no) {
      fetch(`http://localhost:3005/follow/check?from=${currentUserId}&to=${feed.member_no}`)
        .then(res => res.json())
        .then(data => setIsFollowing(data.result === 1)); // result: 1이면 팔로우 중
    }
  }, [currentUserId, feed.member_no]);

  const handleFollowToggle = (e) => {
    e.stopPropagation(); // 카드 클릭 이벤트 막기

    const method = isFollowing ? "DELETE" : "POST";
    fetch(`http://localhost:3005/follow`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        follower_no: currentUserId,
        following_no: feed.member_no,
      }),
    })
      .then((res) => res.json())
      .then(() => setIsFollowing(!isFollowing));
  };



  return (
    <Card
      onClick={() => navigate(`/feed/${feed.feed_no}`, {
        state: { backgroundLocation: location },
      })}
      sx={{ cursor: "pointer", margin: "14px" }}
    >

      {/* 상단 작성자 정보 */}
      <CardContent sx={{ display: "flex", alignItems: "center", padding: "14px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src={
              user.profile_img
                ? `http://localhost:3005/uploads/profile/${user.profile_img}`
                : "default.png"
            }
          />
          <Typography fontWeight="bold">{feed.nickname}</Typography>
          {/* 팔로우 버튼 조건부 렌더링 */}
          {currentUserId !== feed.member_no && (
            <Button
              size="small"
              onClick={handleFollowToggle}
              sx={{
                ml: 1,
                backgroundColor: isFollowing ? "#fff" : "#707C5C",
                color: isFollowing ? "#707C5C" : "#fff",
                border: "1px solid #707C5C",
                "&:hover": {
                  backgroundColor: isFollowing ? "#f2f2f2" : "#5a6b4f", // 호버 시 색
                },
                textTransform: "none", // 대문자 방지
                fontWeight: 500,
                fontSize: "0.75rem",
                padding: "4px 10px",
                borderRadius: "12px",
                minWidth: "auto",
              }}
            >
              {isFollowing ? "언팔로우" : "팔로우"}
            </Button>
          )}
          <Typography variant="caption" color="text.secondary">
            {new Date(feed.cdatetime).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>


      {/* 이미지 */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1 / 1", // ✅ 정사각형 유지 (지원 안 되면 fallback 필요)
          backgroundColor: "#000",
          overflow: "hidden",
        }}
      >

        <img
          src={`http://localhost:3005/${feed.file_path}`}
          alt="피드 이미지"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // ✅ 꽉 채우고 잘라도 됨
            display: "block",
          }}
        />
      </Box>



      {/* 아이콘 버튼들 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", px: 2, pt: 1 }}>
        <Box>
          <IconButton><FavoriteBorderIcon /></IconButton>
          <IconButton><ChatBubbleOutlineIcon /></IconButton>
          <IconButton><SendIcon /></IconButton>
        </Box>
        <IconButton>
          <BookmarkBorderIcon />
        </IconButton>
      </Box>

      {/* 본문 + 댓글 */}
      <CardContent sx={{ pt: 0 }}>
        {/* 좋아요 */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          좋아요 50개
        </Typography>

        {/* 본문 (더보기 포함) */}
        <Typography variant="body2">
          <strong>{feed.nickname}</strong>{" "}
          {feed.content.slice(0, 30)}
          <span style={{ color: "#888", cursor: "pointer" }}>... 더보기</span>
        </Typography>

        {/* 댓글 모두 보기 */}
        <Typography variant="body2" sx={{ color: "#888", mt: 1 }}>
          댓글 4개 모두 보기
        </Typography>

        {/* 댓글 달기 */}
        <Typography variant="body2" sx={{ color: "#888", mt: 0.5 }}>
          댓글 달기...
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FeedCard;
