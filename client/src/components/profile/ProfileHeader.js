import React, { useEffect, useState } from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms";

const ProfileHeader = () => {
  const user = useRecoilValue (userState);
  const currentUserId = user.member_no;

  const [summary, setSummary] = useState({
    postCount: 0,
    followingCount: 0,
    followerCount: 0,
  });
  useEffect(() => {
    if(!user?.member_no) return;
    fetch(`http://localhost:3005/user/${currentUserId}/summary`)
      .then((res) => res.json())
      .then((data) => {
        setSummary(data);
      })
  }, [currentUserId])

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
      {/* 프로필 사진 */}
      <Avatar
        sx={{ width: 120, height: 120, mr: 4 }}
        src={user.profile_img ? `http://localhost:3005/uploads/profile/${user.profile_img}` : ""}
      />

      <Box>
        {/* 닉네임 + 편집 버튼 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Typography variant="h5" fontWeight="bold">
            {user.nickname}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderColor: "#707C5C",
              color: "#707C5C",
              textTransform: "none",
              fontWeight: 500,
              px: 2,
              py: 0.5,
              fontSize: "0.8rem",
              borderRadius: "12px",
            }}
          >
            프로필 편집
          </Button>
        </Box>

        {/* 수치 정보 */}
        <Box sx={{ display: "flex", gap: 3, mb: 1 }}>
          <Typography variant="body2">게시물 {summary.postCount}</Typography>
          <Typography variant="body2">팔로잉 {summary.followingCount}</Typography>
          <Typography variant="body2">팔로워 {summary.followerCount}</Typography>
        </Box>

        {/* 소개글 */}
        <Typography variant="body2" color="text.secondary">
          {user.intro || "소개글이 없습니다."}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
