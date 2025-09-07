import { Box, Button, Grid, TextField } from "@mui/material";
import "../../index.css";
import ProjectList from "./ProjectList";

function Project() {
  return (
    <>
      <form>
        <Box className="page-heading">
          <h1>Project</h1>
        </Box>
        <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
          <Grid item xs={3}>
            <TextField label="Title" variant="outlined" />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained">Create Project</Button>
          </Grid>
        </Grid>
      </form>

      <ProjectList />
    </>
  );
}

export default Project;
