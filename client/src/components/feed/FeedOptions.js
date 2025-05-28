import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms";
import { useNavigate } from "react-router-dom";

function FeedOptions({ feed }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = () => {
    handleMenuClose();
    navigate(`/feed/edit/${feed.feed_no}`);
  };

  const handleDelete = () => {
    handleMenuClose();
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    fetch(`/feed/${feed.feed_no}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("삭제 완료!");
        navigate("/home");
      });
  };

  // 작성자일 때만 노출
  if (user.member_no !== feed.member_no) return null;

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <MoreHorizIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>수정</MenuItem>
        <MenuItem onClick={handleDelete}>삭제</MenuItem>
      </Menu>
    </>
  );
}

export default FeedOptions;