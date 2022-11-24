import { createTheme } from '@mui/material/styles';

export const draculaTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bd93f9',
    },
    secondary: {
      main: '#ff79c6'
    },
    error: {
      main: '#ff5555'
    },
    warning: {
      main: '#f1fa8c'
    },
    info: {
      main: '#8be9fd'
    },
    success: {
      main: '#50fa7b'
    },
    text: {
      primary: '#f8f8f2'
    },
    background: {
      paper: '#282a36',
      default: '#282a36',
    }
  }
});