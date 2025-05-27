import React from "react";
import { useEffect, useState } from "react";
import { userState } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import FriendCard from "./FriendCard";
import { Box, Typography } from "@mui/material";


const FriendList = () => {
  const user = useRecoilValue(userState);
  const currentUserId = user.member_no;
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    if (!user?.member_no) return;
    fetch(`http://localhost:3005/user/${currentUserId}/friend`)
      .then(res => res.json())
      .then(data => {
        //친구 목록 null이면 막기
        if(Array.isArray(data.list)){
          setFriends(data.list);
        }else{
          setFriends([]);
        }
      })
  }, [currentUserId]);
  if (!Array.isArray(friends)) return null;

  return (
    <Box>
      {friends.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 4 }}>
          팔로우한 사용자가 없습니다.
        </Typography>
      ) : (
        friends.map((friend) => (
          <FriendCard
            key={friend.member_no}
            currentUserId={currentUserId}
            friend={friend}
            setFriends={setFriends}
          />
        ))
      )}
    </Box>
  );
};

export default FriendList;
