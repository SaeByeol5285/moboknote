import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import FeedWrite from "../pages/FeedWrite";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import FeedDetail from "../pages/FeedDetail";
import FeedEdit from "../pages/FeedEdit";
import AppInitializer from "../components/AppInitializer";


function AppRouter() {
  const location = useLocation();
  const state = location.state;
  const background = state?.backgroundLocation || location;

  return (
    <>
      <AppInitializer />

      {/* 1. 백그라운드 페이지 라우팅 */}
      <Routes location={background}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/feedWrite" element={<MainLayout><FeedWrite /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/feed/edit/:no" element={<MainLayout><FeedEdit /></MainLayout>} />
      </Routes>

      {/* 2. 모달 페이지 렌더링 (현재 location 기준) */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/feed/:no" element={<MainLayout><FeedDetail /></MainLayout>} />
        </Routes>
      )}
    </>
  );
}

export default AppRouter;
