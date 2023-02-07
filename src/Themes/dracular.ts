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
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: '#333540',
          color: '#50fa7b',
          border: '1px solid #50fa7b',
        },
        standardError: {
          backgroundColor: '#333540',
          color: '#ff5555',
          border: '1px solid #ff5555',
        },
        standardInfo: {
          backgroundColor: '#333540',
          color: '#8be9fd',
          border: '1px solid #8be9fd',
        },
        standardWarning: {
          backgroundColor: '#333540',
          color: '#f1fa8c',
          border: '1px solid #f1fa8c',
        },
      }
    }
  }
});