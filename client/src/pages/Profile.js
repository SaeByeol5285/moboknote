import React from "react";
import MainLayout from "../layouts/MainLayout";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabs from "../components/profile/ProfileTabs";
import ProfileContent from "../components/profile/ProfileContent";

import { Box } from "@mui/material";

const Profile = () => {
  return (
      <Box sx={{ padding: "30px 50px", backgroundColor: "#FDFBF5" }}>
        {/* 프로필 상단 (이미지, 소개글 등) */}
        <ProfileHeader />

        {/* 탭 (내 게시물 / 저장한 코스 / 친구 목록) */}
        <ProfileTabs />

        {/* 탭에 따라 바뀌는 내용 */}
        <ProfileContent />
      </Box>
  );
};

export default Profile;