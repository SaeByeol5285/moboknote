import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

function CommentList({ feedNo, currentUserId, feed_owner_no }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3005/comment/${feedNo}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setComments(data.comments);
      });
  }, [feedNo]);

  const handleAdd = (newComment) => {
    setComments(prev => [...prev, newComment])
  };

  const handleUpdate = (commentNo, newContent) => {
    setComments(prev =>
      prev.map(c => c.comment_no === commentNo ?
        { ...c, content: newContent }
        : c));
  };

  const handleDelete = (commentNo) => {
    setComments(prev => prev.filter(c => c.comment_no !== commentNo));
  };

  return (
    <>
      {currentUserId &&

        <Box sx={{ flex: 1, px: 2, overflowY: "auto", mb: 1 }}>
          {comments.map(c => (
            <CommentItem
              key={c.comment_no}
              comment={c}
              feedNo={feedNo}
              currentUserId={currentUserId}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </Box>
      }

      <CommentForm
        feedNo={feedNo}
        memberNo={currentUserId}
        onAdd={handleAdd}
        receiverNo={feed_owner_no}
      />

    </>
  )
}

export default CommentList;