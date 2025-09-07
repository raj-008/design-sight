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

function ProjectList() {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: "100%", mt: 5 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 12 }}>
          <List>
            <Divider component="li" />
            <Link to="/" className="text-decoration-none">
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Project 1" />
              </ListItem>
            </Link>
            <Divider component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Project 2" />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Project 3" />
            </ListItem>
            <Divider component="li" />
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProjectList;
