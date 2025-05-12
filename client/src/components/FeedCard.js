import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useNavigate, useLocation } from "react-router-dom";



function FeedCard({ feed }) {
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <Card
      onClick={() => navigate(`/feed/${feed.feed_no}`, {
        state: { backgroundLocation: location },
      })}
      sx={{ cursor: "pointer", margin : "14px" }}
    >

      {/* 상단 작성자 정보 */}
      <CardContent sx={{ display: "flex", alignItems: "center", padding: "14px" }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: "#cfcfcf",
            marginRight: "10px"
          }}
        />
        <Typography variant="subtitle2" fontWeight={600}>
          {feed.userId}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ marginLeft: "auto" }}
        >
          {feed.cdatetime}
        </Typography>
      </CardContent>

      {/* 이미지 */}
      <CardMedia
        component="img"
        height="360"
        image={feed.imgUrl}
        alt="피드 이미지"
      />

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
          <strong>{feed.userId}</strong>{" "}
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
