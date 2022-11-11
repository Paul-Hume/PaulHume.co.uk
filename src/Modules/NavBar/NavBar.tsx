import { NavLink } from 'Components';

export const NavBar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="journal">Journal</NavLink>
    </nav>
  );
};