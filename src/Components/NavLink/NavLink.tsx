import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';

import { useMedia } from 'Hooks';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const NavLink = ({ to, children, icon }: NavLinkProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const largeScreen = useMedia('md');

  const navigateTo = () => {
    navigate(to);
  };

  if (largeScreen) {
    return <Button color={pathname === to ? 'secondary' : 'inherit'} startIcon={icon} onClick={navigateTo}>{children}</Button>;
  } else {
    return <IconButton size="large" color={pathname === to ? 'secondary' : 'inherit'} onClick={navigateTo}>{icon}</IconButton>;
  }
};