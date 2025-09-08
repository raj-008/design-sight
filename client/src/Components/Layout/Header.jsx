import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel, Select } from "@mui/material";

function Header() {
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "Designer";
  });

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="a" href="/"
            sx={{ mr: 2, display: { xs: "none", md: "flex" }, fontFamily: "monospace", fontWeight: 700, color: "inherit", textDecoration: "none" }}>
            DesignSight
          </Typography>

          <Typography variant="h5" noWrap component="a" href="#app-bar-with-responsive-menu"
            sx={{ mr: 2, display: { xs: "flex", md: "none" }, flexGrow: 1, fontFamily: "monospace", fontWeight: 700, color: "inherit", textDecoration: "none" }}>
            DesignSight
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <FormControl
              sx={{
                m: 1,
                minWidth: 120,
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black", // label stays black on focus
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black", // outline stays black on focus
                },
              }}
            >
              <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
              <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={role} label="Role" onChange={handleChange}>
                <MenuItem value="Designer">Designer</MenuItem>
                <MenuItem value="Reviewer">Reviewer</MenuItem>
                <MenuItem value="Product Manager">Product Manager</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
