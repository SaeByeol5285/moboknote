import React from "react";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { userState } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import { Box, Typography } from "@mui/material";

const BookmarkList = () => {
    const user = useRecoilValue(userState);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        if (!user?.member_no) return;

        fetch(`http://localhost:3005/user/${user.member_no}/bookmark`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPosts(data.list)
            })
            .catch(error => console.error("게시글 불러오기 실패", error))
    }, [user.member_no])

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
                {posts.map((post) => (
                    <PostCard key={post.feed_no} post={post} />
                ))}
            </Box>
        </Box>
    );
};

export default BookmarkList;
