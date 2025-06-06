import { IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

function NotificationBadge({ onClick, count }) {
  return (
    <IconButton onClick={onClick}>
      <Badge badgeContent={count} color="error" showZero>
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}

export default NotificationBadge;