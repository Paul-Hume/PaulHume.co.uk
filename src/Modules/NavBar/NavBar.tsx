import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { NavLink } from 'Components';

export const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/journal">Journal</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/history">History</NavLink>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'right' }}>
              Paul Hume
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};