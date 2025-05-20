import React from "react";
import { Box } from "@mui/material";
import PostCard from "./PostCard";

const dummyPosts = [
  {
    feed_no: 1,
    file_path: "uploads/feed/sample1.jpg",
    content: "강릉 바다 코스 정말 멋져요!",
    cdatetime: "2025-05-15T12:34:56",
  },
  {
    feed_no: 2,
    file_path: "uploads/feed/sample2.jpg",
    content: "지리산 구불길 후기가 왔습니다.",
    cdatetime: "2025-05-16T09:12:30",
  },
];

const MyPostList = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          maxWidth: "960px",
        }}
      >
        {dummyPosts.map((post) => (
          <PostCard key={post.feed_no} post={post} />
        ))}
      </Box>
    </Box>
  );
};

export default MyPostList;
