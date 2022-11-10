import { Link as ReactRouterLink } from "react-router-dom";

interface LinkProps {
  to: string;
  children: React.ReactNode;
}

export const Link = ({ to, children }: LinkProps) => {
  return <ReactRouterLink to={to}>{children}</ReactRouterLink>;
};