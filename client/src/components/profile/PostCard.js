import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

const MyPostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/feed/${post.feed_no}`)}
      sx={{
        width: 280,
        margin: 1,
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { transform: "scale(1.01)" },
      }}
    >
      {/* 썸네일 이미지 */}
      <CardMedia
        component="img"
        height="180"
        image={`http://localhost:3005/${post.file_path}`}
        alt="게시물 이미지"
        sx={{ objectFit: "cover" }}
      />

      {/* 본문 */}
      <CardContent sx={{ padding: 1.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {new Date(post.cdatetime).toLocaleDateString()}
        </Typography>
        <Typography variant="subtitle2" fontWeight={600} noWrap>
          {post.content || "내용 없음"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MyPostCard;
