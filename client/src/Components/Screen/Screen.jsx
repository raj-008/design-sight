import * as React from "react";
import { Box, Button, Grid, ButtonGroup } from "@mui/material";
import "../../index.css";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Comment from "./CommentSection";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Screen() {
  const [files, setFiles] = useState([]);
  const feedbackAvailable = 1;

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("Uploading files:", files);
  };

  const [feedbackModal, setFeedbackModal] = useState(false);
  const openFeedbackModal = () => {
    setFeedbackModal(true);
    for (let i = 0; i < 10000; i++) {
      console.log(i);
    }
  };
  const closeFeedbackModal = () => setFeedbackModal(false);

  const [commentkModal, setCommentModal] = useState(false);
  const openCommentModal = () => {
    setCommentModal(true);
    for (let i = 0; i < 10000; i++) {
      console.log(i);
    }
  };
  const closeCommentModal = () => setCommentModal(false);

  return (
    <>
      <form onSubmit={handleUpload}>
        <Box className="page-heading">
          <h1>Project Title 1</h1>
        </Box>
        <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
          <Grid item xs={3}>
            <Button variant="contained" component="label">
              Upload Screens
              <input type="file" hidden multiple onChange={handleFileChange} />
            </Button>

            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
            {files.length > 0 && (
              <Button variant="outlined" type="submit">
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ height: 360 }}>
              <CardMedia
                component="img"
                image="https://cdn.dribbble.com/userupload/27776491/file/original-cf888d1e8a8d4d8b79ff11a09e102a71.jpg?resize=1024x773&vertical=center"
                alt="screen_image"
                sx={{ width: "100%", height: "auto" }}
              />
              <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ButtonGroup aria-label="Basic button group">
                  {feedbackAvailable ? <Button onClick={openFeedbackModal}>Get Feedback</Button> : <Button>Show Feedback</Button>}
                  <Button onClick={openCommentModal}>Comments</Button>
                </ButtonGroup>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ height: 360 }}>
              <CardMedia
                component="img"
                image="https://cdn.dribbble.com/userupload/12504910/file/original-888e1619708f0ba85a6bfd17f134dd7f.png?resize=1200x889&vertical=center"
                alt="screen_image"
                sx={{ width: "100%", height: "auto" }}
              />
              <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ButtonGroup aria-label="Basic button group">
                  {feedbackAvailable ? <Button onClick={openFeedbackModal}>Get Feedback</Button> : <Button>Show Feedback</Button>}
                  <Button onClick={openCommentModal}>Comments</Button>
                </ButtonGroup>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ height: 360 }}>
              <CardMedia
                component="img"
                image="https://cdn.dribbble.com/userupload/26505953/file/original-a5893afe3fee652707bdc6e6c7840c72.png?resize=1200x900&vertical=center"
                alt="screen_image"
                sx={{ width: "100%", height: "auto" }}
              />
              <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ButtonGroup aria-label="Basic button group">
                  {feedbackAvailable ? <Button onClick={openFeedbackModal}>Get Feedback</Button> : <Button>Show Feedback</Button>}
                  <Button onClick={openCommentModal}>Comments</Button>
                </ButtonGroup>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* FeedBackModal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={feedbackModal}
        onClose={closeFeedbackModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={feedbackModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              AI Feedback
            </Typography>
            <Divider />
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>

      {/* Comment Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={commentkModal}
        onClose={closeCommentModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={commentkModal}>
          <Box sx={style}>
            <Comment />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default Screen;
