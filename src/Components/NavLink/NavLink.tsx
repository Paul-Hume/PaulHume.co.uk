import { Link } from 'react-router-dom';

import styles from './NavLink.module.css';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export const NavLink = ({ to, children }: NavLinkProps) => {
  return <Link className={styles.link} to={to}>{children}</Link>;
};