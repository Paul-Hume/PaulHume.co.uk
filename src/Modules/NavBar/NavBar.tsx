import { useState } from 'react';
import { Description,DeveloperMode,FilterAlt, Home } from '@mui/icons-material';
import { Avatar, IconButton  } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { NavLink, ThemeToggleSwitch } from 'Components';
import { SocialLinks } from 'Modules/SocialLinks';
import { TagDrawer } from 'Modules/TagDrawer';

import styles from './NavBar.module.css';

import { useUi } from 'Context/uiContext';
import { useMedia } from 'Hooks';

interface NavBarProps {
  location?: 'header' | 'footer';
}

export const NavBar = ({ location = 'header' }: NavBarProps) => {
  const { profileImage } = useUi();
  const largeScreen = useMedia('md');
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={`${styles.buttons} ${location === 'footer' ? styles.footer : ''}`}>
          {largeScreen && location === 'header' && <ThemeToggleSwitch />}
          {!largeScreen && location === 'header' && (
            <>
              <IconButton color="inherit" onClick={() => toggleDrawer(true)}>   
                <FilterAlt />
              </IconButton>

              <ThemeToggleSwitch />

              <TagDrawer open={open} onClose={() => toggleDrawer(false)} />
            </>
          )}
          {((largeScreen && location === 'header') || (!largeScreen && location === 'footer')) && (
            <>
              <NavLink to="/" icon={<Home />}>Home</NavLink>
              <NavLink to="/experience" icon={<DeveloperMode />}>Experience</NavLink>
              <NavLink to="/journal" icon={<Description />}>Journal</NavLink>
              {/* <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/history">History</NavLink> */}
            </>
          )}

          {profileImage && location === 'header' && <Avatar sx={{ marginLeft: 'auto', border: '1px solid white'}} src={profileImage} alt="Paul Hume" />}
          {location === 'header' && (
            <Typography variant="h6" component="div" sx={{ textAlign: 'right', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
            Paul Hume
            </Typography>
          )}

          {largeScreen && location === 'footer' && (
            <SocialLinks />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};