import { useOutlet } from 'react-router-dom';
import { Container, Paper } from '@mui/material';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Header, SideBar } from 'Modules';
import { HomePage } from 'Routes/Home';

import styles from './Root.module.css';

const queryClient = new QueryClient();

export const Root = () => {
  const outlet = useOutlet();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
    
  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <Paper className={styles.container} elevation={8}>
          <Header />     

          <section className={styles.content}>
            <SideBar />
            <section className={styles['page-content']}>
              <Container>
                {outlet || <HomePage />}
              </Container>
            </section>
          </section>

          
        </Paper>
      </QueryClientProvider>
    </ThemeProvider>
  );
};