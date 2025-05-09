import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import FeedList from "../pages/FeedList";
import FeedWrite from "../pages/FeedWrite";
import MyPage from "../pages/MyPage";
import MainLayout from "../layouts/MainLayout";

function AppRouter() {
    const location = useLocation();

    const isAuthPage =
        location.pathname === "/login" || location.pathname === "/register";

    return (
        <Routes>
            {/* ✅ 루트 경로에 접근하면 로그인으로 리다이렉트 */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* 레이아웃 없이 보여줄 페이지 */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* MainLayout이 감싸는 페이지 */}
            <Route
                path="/"
                element={
                    <MainLayout>
                        <FeedList />
                    </MainLayout>
                }
            />
            <Route
                path="/feedWrite"
                element={
                    // <MainLayout>
                        <FeedWrite />
                    // </MainLayout>
                }
            />
            <Route
                path="/mypage"
                element={
                    <MainLayout>
                        <MyPage />
                    </MainLayout>
                }
            />
        </Routes>
    );
}

export default AppRouter;