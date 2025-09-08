import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Button, TextField, Avatar, Stack, Divider } from "@mui/material";
import getCurrentRole from "../../Utils/GetCurrentRole.util";
import axios from "axios";
import { errorToaster } from "../../Utils/Toasters.util";
const role = getCurrentRole();

function Comment({ comment, screen, fetchComments }) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = async () => {
    if (!replyText.trim()) return;

    const data = {
      message: replyText,
      author: role,
      screen_id: screen._id,
      parent_id: comment._id,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/comment/create`, data);
      if (response.data.status) {
        setReplyText("");
        fetchComments();
        setShowReplyBox(false);
      }
    } catch (error) {
      errorToaster(error.response?.data?.message);
    }
  };

  return (
    <Box sx={{ ml: comment.parent_id ? 4 : 0, mt: 2 }} key={comment._id}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar>{role == comment.author ? "Y" : comment.author[0]}</Avatar>
        <Box>
          <Typography variant="subtitle2">{role == comment.author ? "You" : comment.author}</Typography>
          <Typography variant="body2">{comment.message}</Typography>

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

      {/* nested replies */}
      {comment.replies?.map((reply) => (
        <Comment key={reply._id} comment={reply} screen={screen} fetchComments={fetchComments} />
      ))}
    </Box>
  );
}

export default function CommentThread({ screen }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/comment/${screen._id}`);
      if (response.data.status) {
        setComments(response.data.data);
      }
    } catch (error) {
      errorToaster(error.response?.data?.message || "Failed to fetch screens");
    }
  }, [screen]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentOnchange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const data = {
      message: newComment,
      author: role,
      screen_id: screen._id,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/comment/create`, data);
      if (response.data.status) {
        setNewComment("");
        fetchComments();
      }
    } catch (error) {
      errorToaster(error.response?.data?.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Box component="img" src={screen.path} alt="Preview" sx={{ width: 120, height: 80, objectFit: "cover", boxShadow: 1 }} />
      </Box>

      {/* Comment input */}
      <Box sx={{ mb: 3 }}>
        <TextField fullWidth multiline rows={2} placeholder="Write a comment..." value={newComment} onChange={(e) => handleCommentOnchange(e)} />
        <Button sx={{ mt: 1 }} variant="contained" onClick={handleCommentSubmit}>
          Submit
        </Button>
      </Box>

      <Box sx={{ maxHeight: "300px", overflowY: "auto", pr: 1 }}>
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} screen={screen} fetchComments={fetchComments} />
        ))}
      </Box>
    </Box>
  );
}
