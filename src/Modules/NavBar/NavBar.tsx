import { Switch } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { NavLink, ThemeToggleSwitch } from 'Components';

import { useUi } from 'Context/uiContext';

export const NavBar = () => {
  const { theme, toggleTheme, currentTheme } = useUi();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <ThemeToggleSwitch checked={theme === 'dark'} onChange={toggleTheme} theme={currentTheme} />
          <NavLink to="/">Home</NavLink>
          <NavLink to="/journal">Journal</NavLink>
          {/* <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/history">History</NavLink> */}
          <Typography variant="h6" component="div" sx={{ flex: 1, textAlign: 'right' }}>
              Paul Hume
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};