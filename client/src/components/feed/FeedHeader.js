import React from "react";
import { Box, Avatar, Typography, } from "@mui/material";
import FollowToggleBtn from "../profile/FollowToggleBtn";


function FeedHeader({ feed, currentUserId, profileImg }) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
                src={
                    profileImg
                        ? `http://localhost:3005/uploads/profile/${profileImg}`
                        : "default.png"
                }
            />
            <Typography fontWeight="bold">{feed.nickname}</Typography>
            {feed.member_no !== currentUserId && (
                <FollowToggleBtn
                    currentUserId={currentUserId}
                    targetUserId={feed.member_no}>
                </FollowToggleBtn>
            )}
            <Typography variant="caption" color="text.secondary">
                {new Date(feed.cdatetime).toLocaleDateString()}
            </Typography>
        </Box>
    )

}

export default FeedHeader