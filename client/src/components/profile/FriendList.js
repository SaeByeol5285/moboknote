import React from "react";
import { useEffect, useState } from "react";
import { userState } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import FriendCard from "./FriendCard";
import { Box, Typography } from "@mui/material";

const dummyFriends = [
  { member_no: 1, nickname: "ridegirl", profile_img: "ridegirl.jpg" },
  { member_no: 2, nickname: "mubok0", profile_img: "mubok0.jpg" },
];

const FriendList = () => {
  const user = useRecoilValue(userState);
  const [friends, setFriends] = useState([]);
  useEffect(()=>{
    if(!user?.member_no) return;
    fetch(`http://localhost:3005/user/${user.member_no}/friend`)
    .then(res => res.json())
    .then(data => {
      setFriends(data.list);
    })

  },[user.member_no])

  const handleUnfollow = (targetNo) => {
    // TODO: 서버에 언팔로우 요청 보내고 리스트 갱신
    console.log("언팔로우 요청:", targetNo);
  };

  if(!user?.member_no) return null;

  return (
    <Box>
      {friends.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 4 }}>
          팔로우한 사용자가 없습니다.
        </Typography>
      ) : (
        friends.map((friend) => (
          <FriendCard key={user.member_no} user={friend} onUnfollow={handleUnfollow} />
        ))
      )}
    </Box>
  );
};

export default FriendList;
