import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import FolderIcon from "@mui/icons-material/Folder";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

function ProjectList({ projects }) {

  return (
    <Box sx={{ flexGrow: 1, maxWidth: "100%", mt: 5 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 12 }}>
          <List>
            <Divider component="li" />
            {projects.map((project, index) => (
              <Box key={index}>
                <Link to={`/screen/${project._id}`} className="text-decoration-none">
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={project.name} />
                  </ListItem>
                </Link>
                <Divider component="li" />
              </Box>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProjectList;
