import React from "react";
import { Box, Typography } from "@mui/material";

function ChatMessageItem({ message, isMine }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isMine ? "flex-end" : "flex-start",
        mb: 1,
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: "60%",
          bgcolor: isMine ? "#94B8C4" : "#e0e0e0",
          color: isMine ? "white" : "black",
          borderRadius: 2,
          px: 2,
          py: 1,
        }}
      >
        <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
          {message.message}
        </Typography>
        <Typography variant="caption" sx={{ display: "block", mt: 0.5, textAlign: "right", opacity: 0.6 }}>
          {new Date(message.cdatetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
      </Box>
    </Box>
  );
}

export default ChatMessageItem;