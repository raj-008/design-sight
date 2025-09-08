import { useEffect, useState } from "react";
import { Box, Button, Grid, ButtonGroup } from "@mui/material";
import "../../index.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Comment from "./CommentSection";
import axios from "axios";
import { errorToaster, successToaster } from "../../Utils/Toasters.util";
import { useParams } from "react-router-dom";

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

  const { project } = useParams();
  const feedbackAvailable = 1;
  const [screens, setScreens] = useState([]);
  const [screen, setScreenId] = useState({});

  const fetchScreens = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/screen/${project}`);

      if (response.data.status) {
        setScreens(response.data.data);
      }
    } catch (error) {
      errorToaster(error.response?.data?.message || "Failed to fetch screens");
    }
  };

  useEffect(() => {
    fetchScreens();
  }, []);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("project_id", project);

    for (let i = 0; i < files.length; i++) {
      formData.append("screens", files[i]);
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/screen/upload-screen`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status) {
        successToaster(response.data.message);
        fetchScreens();
        setFiles([]);
      }
    } catch (error) {
      errorToaster(error.response?.data?.message || "Something went wrong");
    }
  };

  const [feedbackModal, setFeedbackModal] = useState(false);
  const openFeedbackModal = () => {
    setFeedbackModal(true);
    for (let i = 0; i < 10000; i++) {
      console.log(i);
    }
  };
  const closeFeedbackModal = () => setFeedbackModal(false);

  const [commentModal, setCommentModal] = useState(false);

  const openCommentModal = async (screen) => {
    setScreenId(screen);
    setCommentModal(true);
  };

  const closeCommentModal = () => setCommentModal(false);

  return (
    <>
      <form onSubmit={handleUpload} method="post">
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
          {screens.map((screen, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <Card sx={{ height: 360 }}>
                <CardMedia component="img" image={screen.path} alt="screen_image" sx={{ width: "100%", height: "auto", maxHeight: "300px" }} />
                <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <ButtonGroup aria-label="Basic button group">
                    {feedbackAvailable ? <Button onClick={openFeedbackModal}>Get Feedback</Button> : <Button>Show Feedback</Button>}
                    <Button onClick={() => openCommentModal(screen)}>Comments</Button>
                  </ButtonGroup>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FeedBackModal */}
      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={feedbackModal} onClose={closeFeedbackModal} closeAfterTransition slots={{ backdrop: Backdrop }} 
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
        open={commentModal}
        onClose={closeCommentModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={commentModal}>
          <Box sx={style}>
            <Comment screen={screen} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default Screen;
