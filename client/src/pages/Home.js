import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";

import HeaderFilter from "../components/HeaderFilter";
import FeedList from "./FeedList";

import {
  Box,

} from "@mui/material";

function Home() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const currentUserId = user.member_no;


  useEffect(() => {
    // localStorage에서 token꺼내서 로그인 정보 있는지 확인
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인 후 사용해주세요.");
      navigate("/login");
    } else {
      console.log("로그인 ===> ", currentUserId)
    }
  }, []);

  return (
    <>
      {/* 필터 */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", maxWidth: "1200px", px: 2 }}>
          <HeaderFilter />
        </Box>
      </Box>

      {/* 피드 */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", maxWidth: "600px", px: 2 }}>
          <FeedList />
        </Box>
      </Box>
    </>
  );
}

export default Home;
