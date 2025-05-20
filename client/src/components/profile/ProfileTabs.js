import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

const tabList = ["내 게시물", "저장한 코스", "친구 목록"];

const ProfileTabs = ({ tabIndex, setTabIndex }) => {
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        textColor="inherit"
        TabIndicatorProps={{ style: { backgroundColor: "#707C5C" } }}
      >
        {tabList.map((label, idx) => (
          <Tab
            key={idx}
            label={label}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: tabIndex === idx ? "#707C5C" : "#888",
              fontSize: "0.95rem",
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default ProfileTabs;
