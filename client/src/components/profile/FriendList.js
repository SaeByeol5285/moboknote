import React from "react";
import FriendCard from "./FriendCard";
import { Box, Typography } from "@mui/material";

const dummyFriends = [
  { member_no: 1, nickname: "ridegirl", profile_img: "ridegirl.jpg" },
  { member_no: 2, nickname: "mubok0", profile_img: "mubok0.jpg" },
];

const FriendList = () => {
  const handleUnfollow = (targetNo) => {
    // TODO: 서버에 언팔로우 요청 보내고 리스트 갱신
    console.log("언팔로우 요청:", targetNo);
  };

  return (
    <Box>
      {dummyFriends.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 4 }}>
          팔로우한 사용자가 없습니다.
        </Typography>
      ) : (
        dummyFriends.map((user) => (
          <FriendCard key={user.member_no} user={user} onUnfollow={handleUnfollow} />
        ))
      )}
    </Box>
  );
};

export default FriendList;
