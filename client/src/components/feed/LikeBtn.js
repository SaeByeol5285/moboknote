import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms";

function LikeBtn({ feed_no, onCountChange, feed_owner_no }) {
  const user = useRecoilValue(userState);
  const [liked, setLiked] = useState(false);


  useEffect(() => {
    if (!user.member_no) return;
    fetch(`http://localhost:3005/like/check?feed_no=${feed_no}&member_no=${user.member_no}`)
      .then(res => res.json())
      .then(data => setLiked(data.liked));
  }, [feed_no, user.member_no]);

  const handleToggleLike = () => {
    const method = liked ? "DELETE" : "POST";
    fetch(`http://localhost:3005/like`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feed_no, member_no: user.member_no }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setLiked(!liked);
          onCountChange && onCountChange(liked ? -1 : 1);

          if(!liked && feed_owner_no !== user.member_no){
            fetch(`http://localhost:3005/notification`, {
              method : "POST", 
              headers : {"Content-Type" : "application/json"},
              body : JSON.stringify({
                sender_no : user.member_no,
                receiver_no : feed_owner_no, 
                feed_no : feed_no, 
                type : "like",
              })
            });
          }
        }
      });
  };

  return (
    <IconButton onClick={(e) => {
        e.stopPropagation();
        handleToggleLike();
    }}>
      {liked ? <FavoriteIcon sx={{ color: "#e74c3c" }} /> : <FavoriteBorderIcon sx={{ color: "#94B8C4" }} />}
    </IconButton>
  );
}

export default LikeBtn;