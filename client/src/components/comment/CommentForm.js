import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

function CommentForm({ feedNo, memberNo, onAdd }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;

    fetch(`http://localhost:3005/comment/${feedNo}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        member_no: memberNo,
        content: value.trim(),
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          onAdd({
            comment_no: data.comment_no || Date.now(),
            member_no: memberNo,
            content: value,
            cdatetime: new Date().toISOString(),
          });
          setValue("");
        }
      });
  };

  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        borderTop: "1px solid #eee",
        display: "flex",
        gap: 1,
      }}
    >
      <TextField
        variant="standard"
        placeholder="댓글 달기..."
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          "& .MuiInput-underline:after": {
            borderBottomColor: "#94B8C4",
          },
        }}
      />
      <Button
        variant="text"
        onClick={handleSubmit}
        sx={{
          color: "#707C5C",
          fontWeight: "bold",
          "&:hover": {
            color: "#5e6a4a",
          },
        }}
      >
        게시
      </Button>
    </Box>
  );
}

export default CommentForm;