import {
    Box, Drawer, Typography, List, Divider
} from "@mui/material";
import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms";

function NotificationDrawer({ open, onClose, onUpdateCount }) {
    const [notifications, setNotifications] = useState([]);
    const user = useRecoilValue(userState);
    const navigate = useNavigate();

    useEffect(() => {
        if (!open) return;
        fetch(`http://localhost:3005/notification/${user.member_no}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setNotifications(data.list);
            });
    }, [open, user.member_no]);

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 320, p: 2 }}>
                <Typography variant="h6">알림</Typography>
                <Divider sx={{ my: 2 }} />
                <List>
                    {notifications.map(n => (
                        <NotificationItem
                            key={n.notification_no}
                            notification={n}
                            onClick={() => {
                                // 1. 읽음 처리
                                fetch(`http://localhost:3005/notification/${n.notification_no}`, {
                                    method: "PUT",
                                }).then(() => {
                                    // 2. 리스트 상태 업데이트 (회색 처리용)
                                    setNotifications(prev =>
                                        prev.map(item =>
                                            item.notification_no === n.notification_no
                                                ? { ...item, is_read: "Y" }
                                                : item
                                        )
                                    );

                                    // 3. 최신 개수 다시 요청
                                    fetch(`http://localhost:3005/notification/unreadCount?member_no=${user.member_no}`)
                                        .then(res => res.json())
                                        .then(data => {
                                            if (data.success) {
                                                onUpdateCount(data.count); // ✅ Sidebar에 count 전달!
                                            }
                                        });
                                });

                                // 4. 이동 + 닫기
                                navigate(`/feed/${n.feed_no}`);
                                onClose();
                            }}
                        />
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}

export default NotificationDrawer;
