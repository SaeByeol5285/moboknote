import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms";

function ChatInput({ room, onMessageSent }) {
  const user = useRecoilValue(userState);
  const [text, setText] = useState("");
  const receiver_no = room.member1_no === user.member_no ? room.member2_no : room.member1_no;


  const handleSend = () => {
    if (!text.trim()) return;

    fetch(`http://localhost:3005/chat/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_no: room.room_no,
        sender_no: user.member_no,
        receiver_no: receiver_no, 
        message: text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setText("");
          onMessageSent?.();
        }
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ p: 2, borderTop: "1px solid #ccc", display: "flex" }}>
      <TextField
        fullWidth
        size="small"
        placeholder="메시지를 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        multiline
        maxRows={4}
      />
      <IconButton onClick={handleSend} sx={{ ml: 1 }}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default ChatInput;
