import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import FeedWrite from "../pages/FeedWrite";
import MyPage from "../pages/MyPage";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import FeedDetail from "../pages/FeedDetail";

function AppRouter() {
    const location = useLocation();
    const state = location.state;
    const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 로그인 후 접근 가능한 메인 홈 페이지 */}
            <Route
                path="/home"
                element={
                    <MainLayout>
                        <Home />
                    </MainLayout>
                }
            />

            <Route
                path="/feedWrite"
                element={
                    <MainLayout>
                        <FeedWrite />
                    </MainLayout>
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

            {/* ✅ 모달은 backgroundLocation 있을 때만 */}
            {state?.backgroundLocation && (

                <Route path="/feed/:no" element={
                    <MainLayout>
                        <FeedDetail />
                    </MainLayout>

                } />

            )}
        </Routes>
    );
}

export default AppRouter;
