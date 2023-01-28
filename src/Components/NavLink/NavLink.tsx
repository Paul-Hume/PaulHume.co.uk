import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export const NavLink = ({ to, children }: NavLinkProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navigateTo = () => {
    navigate(to);
  };

  return <Button color={pathname === to ? 'secondary' : 'inherit'} onClick={navigateTo}>{children}</Button>;
};