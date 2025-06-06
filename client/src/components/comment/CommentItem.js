import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

function CommentItem({comment,feedNo,currentUserId,onUpdate,onDelete}){
  const[isEdit, setIsEdit] = useState(false);
  const[editValue, setEditValue] = useState(comment.content);

  const handleUpdate = () => {
    fetch(`http://localhost:3005/comment/${feedNo}/${comment.comment_no}`, {
      method : "PUT",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({content : editValue}),
    })
    .then(res=> res.json())
    .then(data => {
      if(data.success){
        onUpdate(comment.comment_no, editValue);
        setIsEdit(false);
      }
    });
  };
  
  const handleDelete = () => {
    fetch(`http://localhost:3005/comment/${feedNo}/${comment.comment_no}`, {
      method: "DELETE",
    })
    .then(res=> res.json())
    .then(data => {
      if(data.success){
        onDelete(comment.comment_no);
      }
    });
  };

  return(
    <>
      <Box sx={{mb : 1}}>
        {isEdit? (
          <Box sx={{display:"flex", gap:1}}>
            <TextField
              variant="standard"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              fullWidth
            />
            <Button onClick={handleUpdate}>저장</Button>
          </Box>
        ) : (
          <Typography variant="body2">
            <strong>{comment.nickname}</strong> {comment.content}
            {comment.member_no === currentUserId && (
              <>
                <IconButton onClick={() => setIsEdit(true)} size="small">
                  <EditIcon fontSize="small"/>
                </IconButton>
                <IconButton onClick={handleDelete} size="small">
                  <DeleteIcon fontSize="small"/>
                </IconButton>
              </>
            )}
          </Typography>
        )}
      </Box>
    </>
  )


}

export default CommentItem;