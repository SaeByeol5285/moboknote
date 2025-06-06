import { ListItemButton, ListItemText } from "@mui/material";

function NotificationItem({ notification, onClick }) {
  const isRead = notification.is_read === "Y";

  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        backgroundColor: isRead ? "#f5f5f5" : "#ffffff", // 읽은 알림은 옅은 회색 배경
        opacity: isRead ? 0.7 : 1,                      // 읽은 건 약간 흐리게
        "&:hover": {
          backgroundColor: isRead ? "#eaeaea" : "#f0f0f0"
        },
      }}
    >
      <ListItemText
        primaryTypographyProps={{
          fontWeight: isRead ? "normal" : "bold",       // 안 읽은 건 bold
        }}
        primary={`${notification.nickname}님이 ${notification.type === "like" ? "좋아요를 눌렀습니다" : "댓글을 남겼습니다."}`}
        secondary={new Date(notification.cdatetime).toLocaleString()}
      />
    </ListItemButton>
  );
}

export default NotificationItem;
