import { useMediaQuery,useTheme } from '@mui/material';

type Direction = 'up' | 'down';
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const useMedia = (breakpoint: Breakpoint, direction: Direction = 'up') => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints[direction](breakpoint));

  return matches;
};