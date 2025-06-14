import React from "react";
import Sidebar from "../components/layout/Sidebar";
import RightWidgets from "../components/layout/RightWidgets";
import { Box } from "@mui/material";


function MainLayout({ children }) {
    return (
        <Box sx={{ backgroundColor: "#FDFBF5", minHeight: "100vh" }}>
            {/* 🔹 사이트 상단 선 (메인컬러) */}
            <Box sx={{ height: "42px", backgroundColor: "#707C5C" }} />

            {/* 🔸 가운데 전체 콘텐츠 (좌측 메뉴 + 중앙 콘텐츠 + 우측 위젯) */}
            <Box sx={{ display: "flex", height: "100%" }}>
                {/* 왼쪽 사이드바 */}
                <Box sx={{ width: "260px", flexShrink: 0 }}>
                    <Sidebar />
                </Box>

                {/* 중앙 콘텐츠 */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        padding: "0 20px",
                    }}
                >
                    {children}
                </Box>


                {/* 우측 위젯 */}
                <Box sx={{ width: "220px", flexShrink: 0 }}>
                    {/* <RightWidgets /> */}
                </Box>
            </Box>
        </Box>
    );
}

export default MainLayout;
