import React, { useState } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabs from "../components/profile/ProfileTabs";
import ProfileContent from "../components/profile/ProfileContent";
import { Box } from "@mui/material";

const Profile = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box
      sx={{
        backgroundColor: "#FDFBF5",
        display: "flex",
        justifyContent: "center",
        paddingTop: 4,
        paddingBottom: 10,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px", // ✅ 콘텐츠 최대 너비 제한
          padding: "0 30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ProfileHeader />
        <ProfileTabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
        <ProfileContent tabIndex={tabIndex} />
      </Box>
    </Box>
  );
};

export default Profile;
