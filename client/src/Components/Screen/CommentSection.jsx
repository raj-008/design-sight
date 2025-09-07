import React, { useState } from "react";
import { Box, Typography, Button, TextField, Avatar, Stack, Divider } from "@mui/material";

function Comment({ comment, onReply }) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplyText("");
    setShowReplyBox(false);
  };

  return (
    <Box sx={{ ml: comment.parentId ? 4 : 0, mt: 2 }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar>{comment.author[0]}</Avatar>
        <Box>
          <Typography variant="subtitle2">{comment.author}</Typography>
          <Typography variant="body2">{comment.text}</Typography>

          <Button size="small" onClick={() => setShowReplyBox(!showReplyBox)} sx={{ textTransform: "none", mt: 0.5 }}>
            Reply
          </Button>

          {showReplyBox && (
            <Box sx={{ mt: 1 }}>
              <TextField size="small" fullWidth value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." />
              <Button sx={{ mt: 1 }} size="small" variant="contained" onClick={handleReply}>
                Submit
              </Button>
            </Box>
          )}
        </Box>
      </Stack>

      {/* Render nested replies */}
      {comment.replies?.map((reply) => (
        <Comment key={reply.id} comment={reply} onReply={onReply} />
      ))}
    </Box>
  );
}

export default function CommentThread() {
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "This is the first comment",
      author: "Alice",
      parentId: null,
      replies: [],
    },
    {
      id: 2,
      text: "This is another comment",
      author: "Bob",
      parentId: null,
      replies: [],
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const addComment = (parentId, text) => {
    const newEntry = {
      id: Date.now(),
      text,
      author: "You",
      parentId,
      replies: [],
    };

    if (!parentId) {
      setComments((prev) => [...prev, newEntry]);
    } else {
      const addReply = (list) => list.map((item) => (item.id === parentId ? { ...item, replies: [...item.replies, newEntry] } : { ...item, replies: addReply(item.replies) }));
      setComments((prev) => addReply(prev));
    }
  };

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    addComment(null, newComment);
    setNewComment("");
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Comment input */}
      <Box sx={{ mb: 3 }}>
        <TextField fullWidth multiline rows={2} placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <Button sx={{ mt: 1 }} variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>

      <Box
        sx={{
          maxHeight: "300px", // 👈 fixed height
          overflowY: "auto", // 👈 scrolling enabled
          pr: 1, // padding for scrollbar spacing
        }}
      >
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onReply={addComment} />
        ))}
      </Box>
    </Box>
  );
}
