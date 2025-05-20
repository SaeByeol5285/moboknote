import React from "react";
import { Box, Typography } from "@mui/material";
import PostCard from "./PostCard"; // 이름 바꾼 카드 컴포넌트

const BookmarkList = () => {
    // TODO: 북마크된 게시물 리스트를 서버에서 받아와야 함
    const dummyBookmarks = [
        {
            feed_no: 21,
            file_path: "uploads/feed/sample3.jpg",
            content: "경주 벚꽃길 정말 예뻤어요 🌸",
            cdatetime: "2025-04-10T10:00:00",
        },
        {
            feed_no: 22,
            file_path: "uploads/feed/sample4.jpg",
            content: "속초 해안도로 야경 추천합니다!",
            cdatetime: "2025-04-12T19:30:00",
        },
    ];

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
                {dummyBookmarks.map((post) => (
                    <PostCard key={post.feed_no} post={post} />
                ))}
            </Box>
        </Box>
    );
};

export default BookmarkList;
