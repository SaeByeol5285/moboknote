import React from "react";
import MyPostList from "./MyPostList";
import BookmarkList from "./BookmarkList";
import FriendList from "./FriendList";

const ProfileContent = ({ tabIndex }) => {
  return (
    <>
      {tabIndex === 0 && <MyPostList />}
      {tabIndex === 1 && <BookmarkList />}
      {tabIndex === 2 && <FriendList />}
    </>
  );
};

export default ProfileContent;