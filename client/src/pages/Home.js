import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";

import HeaderFilter from "../components/layout/HeaderFilter";
import FeedList from "./FeedList";

import { Box, } from "@mui/material";

function Home() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    region: "",
    season: "",
    bariType: "",
    locationType: "",
    ccType: "",
    keyword: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인 후 사용해주세요.");
      navigate("/login");
    }
  }, []);

  return (
    <>
      {/* 필터 */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", maxWidth: "1200px", px: 2 }}>
          <HeaderFilter filters={filters} setFilters={setFilters} />
        </Box>
      </Box>

      {/* 피드 */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", maxWidth: "600px", px: 2 }}>
          <FeedList filters={filters} />
        </Box>
      </Box>
    </>
  );
}

export default Home;
