import React from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";

const ProfileHeader = () => {
  // TODO: 로그인한 유저 정보는 props나 recoil 등으로 추후 교체
  const profile = {
    nickname: "Mubok_",
    intro: "저는 자연을 사랑하는 라이더입니다. 길을 찾았다면 함께 이 소중한 코스를 공유하고 있습니다!",
    postCount: 3,
    followerCount: 100,
    followingCount: 100,
    profileImg: "", // 없으면 기본 아바타
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
      {/* 프로필 사진 */}
      <Avatar
        sx={{ width: 120, height: 120, mr: 4 }}
        src={profile.profileImg || ""}
      />

      {/* 닉네임 + 버튼 + 수치 + 소개글 */}
      <Box>
        {/* 닉네임 + 편집 버튼 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Typography variant="h5" fontWeight="bold">
            {profile.nickname}
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
          <Typography variant="body2">게시물 {profile.postCount}</Typography>
          <Typography variant="body2">팔로잉 {profile.followingCount}</Typography>
          <Typography variant="body2">팔로워 {profile.followerCount}</Typography>
        </Box>

        {/* 소개글 */}
        <Typography variant="body2" color="text.secondary">
          {profile.intro}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
