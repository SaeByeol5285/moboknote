import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";

import HeaderFilter from "../components/HeaderFilter";
import FeedList from "./FeedList";


function Home() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const currentUserId = user.member_no;

  useEffect(() => {
    if (!user.isLogin) {
      alert("로그인 후 사용해주세요.");
      navigate("/login");
    }else {
      console.log("로그인 ===> ", currentUserId)
    }
  }, []);

  return (
    <>
      <FeedList />
    </>
  );
}

export default Home;
