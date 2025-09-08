import { Box, Button, Grid, TextField } from "@mui/material";
import "../../index.css";
import ProjectList from "./ProjectList";
import axios from "axios";
import { useForm } from "react-hook-form";
import { errorToaster, successToaster } from "../../Utils/Toasters.util";
import { useEffect, useState } from "react";

function Project() {

  const { register, handleSubmit, reset, formState: { errors }} = useForm({ defaultValues: { name: "" } });

  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/project`);

      if (response.data.status) {
        setProjects(response.data?.data);
      }
    } catch (error) {
      errorToaster(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onProjectSubmit = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/project/create`, { ...data });

      if (response.data.status) {
        successToaster(response.data.message);
        fetchProjects();
        reset();
      }
    } catch (error) {
      errorToaster(error.response?.data?.message);
    }
  };


  return (
    <>
      <form method="post" onSubmit={handleSubmit(onProjectSubmit)}>
        <Box className="page-heading">
          <h1>Project</h1>
        </Box>
        <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
          <Grid item xs={3}>
            <TextField label="Title" variant="outlined" name="name"
              {...register("name", {
                required: { value: true, message: "Title is required" },
              })}
              error={!!errors.name} helperText={errors.name ? errors.name.message : ""} />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" type="submit">
              Create Project
            </Button>
          </Grid>
        </Grid>
      </form>
      <ProjectList projects={projects} />
    </>
  );
}

export default Project;
