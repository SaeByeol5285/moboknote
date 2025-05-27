import React from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import FollowToggleBtn from "../FollowToggleBtn";

const FriendCard = ({ currentUserId, friend, setFriends }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderBottom: "1px solid #eee",
      }}
    >
      {/* 친구 프로필 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={friend.profile_img ? `http://localhost:3005/uploads/profile/${friend.profile_img}` : ""}
          sx={{ width: 48, height: 48 }}
        />
        <Typography fontWeight="bold">{friend.nickname}</Typography>
      </Box>

      {/* 언팔로우 버튼 */}
      <FollowToggleBtn
        currentUserId={currentUserId}
        targetUserId={friend.member_no}
        onUnfollow={()=>{
          setFriends((prev)=>{
            prev.filter((f) => f.member_no !== friend.member_no);
          })
        }}
        
        >
      </FollowToggleBtn>
    </Box>
  );
};

export default FriendCard;
