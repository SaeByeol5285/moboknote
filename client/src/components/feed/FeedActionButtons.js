import React from "react";
import { Box, Typography, IconButton, Divider, } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms";
import { useNavigate } from "react-router-dom";


function FeedActionButtons({
    likeCount,
    LikeComponent,
    BookmarkComponent = null,
    showSend = true,
    feedOwnerNo,
}) {
    const user = useRecoilValue(userState);
    const navigate = useNavigate();

    const handleStartChat = () => {
        fetch("http://localhost:3005/chat/room", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                member1_no: user.member_no,
                member2_no: feedOwnerNo,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    navigate("/chat");
                }
            });
    };

    return (
        <Box sx={{ px: 2 }}>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                    {LikeComponent}

                    <IconButton>
                        <ChatBubbleOutlineIcon sx={{ color: "#94B8C4" }} />
                    </IconButton>

                    {showSend && (
                        <IconButton onClick={handleStartChat}>
                            <SendIcon sx={{ color: "#94B8C4" }} />
                        </IconButton>
                    )}
                </Box>
                {BookmarkComponent && BookmarkComponent}

            </Box>

            <Typography variant="caption" fontWeight="bold" sx={{ mt: 0, ml: 0.5 }}>
                좋아요 {likeCount}개
            </Typography>
        </Box>


    );
};
export default FeedActionButtons