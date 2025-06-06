import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItemButton, ListItemIcon, ListItemText, Badge } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "../auth/LogoutBtn";
import NotificationDrawer from "../notification/NotificationDrawer";
import NotificationBadge from "../notification/NotificationBadge";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms";




function Sidebar() {
    const navigate = useNavigate();
    const user = useRecoilValue(userState);

    const [notiOpen, setNotiOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3005/notification/unreadCount?member_no=${user.member_no}`)
            .then(res => res.json())
            .then(data => {
                console.log("넘어온 카운트===> ", data.count);
                setNotificationCount(data.count)
            });
    }, []);


    return (
        <Box
            sx={{
                height: "100%",
                backgroundColor: "#FDFBF5",
                padding: "30px 20px",
                borderRight: "1px solid #ddd",
                position: "sticky",  // 고정 옵션
                top: "0",
            }}
        >
            {/* 로고 + 부제 */}
            <Box sx={{ textAlign: "center", marginBottom: "40px" }}>
                <img src="/img/mubok-logo1.png" alt="무복노트 로고" width="120" style={{ marginBottom: "10px" }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: "12px" }}>
                    무사 복귀를 위한,<br /> 감성 라이더들의 기록장
                </Typography>
            </Box>

            {/* 메뉴 리스트 */}
            <List>
                <ListItemButton onClick={() => navigate("/home")}>
                    <ListItemIcon>
                        <HomeRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="홈" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <SendRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="메시지" />
                </ListItemButton>

                <ListItemButton onClick={() => setNotiOpen(true)}>
                    <ListItemIcon>
                        <NotificationBadge
                            onClick={() => setNotiOpen(true)}
                            count={notificationCount}
                        />
                    </ListItemIcon>
                    <ListItemText primary="알림" />
                </ListItemButton>


                <NotificationDrawer 
                    open={notiOpen} 
                    onClose={() => setNotiOpen(false)} 
                    onUpdateCount={(newCount) => setNotificationCount(newCount)}

                />

                <ListItemButton onClick={() => navigate("/feedWrite")}>
                    <ListItemIcon>
                        <AddBoxRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="글쓰기" />
                </ListItemButton>

                <ListItemButton onClick={() => navigate("/profile")}>
                    <ListItemIcon>
                        <PersonOutlineRoundedIcon sx={{ color: "#aaa" }} />
                    </ListItemIcon>
                    <ListItemText primary="프로필" />
                </ListItemButton>

                <LogoutBtn />
            </List>
        </Box>
    );
}

export default Sidebar;
