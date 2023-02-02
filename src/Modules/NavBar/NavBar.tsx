import { useState } from 'react';
import { FilterAlt } from '@mui/icons-material';
import { Drawer, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { NavLink, ThemeToggleSwitch } from 'Components';
import { TagDrawer } from 'Modules/TagDrawer';

import styles from './NavBar.module.css';

import { useUi } from 'Context/uiContext';
import { useMedia } from 'Hooks';

interface NavBarProps {
  location?: 'header' | 'footer';
}

export const NavBar = ({ location = 'header' }: NavBarProps) => {
  const { theme, toggleTheme, currentTheme } = useUi();
  const largeScreen = useMedia('md');
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={`${styles.buttons} ${location === 'footer' ? styles.footer : ''}`}>
          {largeScreen && location === 'header' && <ThemeToggleSwitch checked={theme === 'dark'} onChange={toggleTheme} theme={currentTheme} />}
          {!largeScreen && location === 'header' && (
            <>
              <IconButton color="inherit" onClick={() => toggleDrawer(true)}>   
                <FilterAlt />
              </IconButton>

              <TagDrawer open={open} onClose={() => toggleDrawer(false)} />
            </>
          )}
          {((largeScreen && location === 'header') || (!largeScreen && location === 'footer')) && (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/journal">Journal</NavLink>
              {/* <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/history">History</NavLink> */}
            </>
          )}

          {location === 'header' && (
            <Typography variant="h6" component="div" sx={{ flex: 1, textAlign: 'right' }}>
            Paul Hume
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};