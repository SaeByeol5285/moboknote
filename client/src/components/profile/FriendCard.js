import React from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";

const FriendCard = ({ user, onUnfollow }) => {
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
      {/* 왼쪽: 프로필 이미지 + 닉네임 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={user.profile_img ? `http://localhost:3005/uploads/profile/${user.profile_img}` : ""}
          sx={{ width: 48, height: 48 }}
        />
        <Typography fontWeight="bold">{user.nickname}</Typography>
      </Box>

      {/* 오른쪽: 언팔로우 버튼 */}
      <Button
        variant="outlined"
        size="small"
        onClick={() => onUnfollow(user.member_no)}
        sx={{
          borderColor: "#707C5C",
          color: "#707C5C",
          textTransform: "none",
          fontSize: "0.75rem",
          borderRadius: "12px",
          px: 2,
          py: 0.5,
        }}
      >
        언팔로우
      </Button>
    </Box>
  );
};

export default FriendCard;
