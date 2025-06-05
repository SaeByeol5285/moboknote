import React from "react";
import { Box, Typography, IconButton, Divider, } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";


function FeedActionButtons({
    likeCount,
    LikeComponent,
    BookmarkComponent = null,
    showSend = true,
}) {
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
                        <IconButton>
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