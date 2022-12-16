import { useOutlet } from 'react-router-dom';
import { Container, CssBaseline,Paper  } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Header, SideBar } from 'Modules';
import { HomePage } from 'Routes/Home';

import styles from './Root.module.css';

import { TagsProvider } from 'Context/tagsContext';
import { useUi } from 'Context/uiContext';

const queryClient = new QueryClient();

export const Root = () => {
  const outlet = useOutlet();
  const { currentTheme } = useUi();
    
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline enableColorScheme />
      <QueryClientProvider client={queryClient}>
        <TagsProvider>
          <Paper className={styles.container} elevation={0}>
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
        </TagsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};