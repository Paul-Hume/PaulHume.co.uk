import { useOutlet } from 'react-router-dom';
import { Container, CssBaseline,Paper  } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Footer, Header, SideBar } from 'Modules';
import { HomePage } from 'Routes/Home';

import styles from './Root.module.css';

import { TagsProvider } from 'Context/tagsContext';
import { useUi } from 'Context/uiContext';
import { useMedia } from 'Hooks';

const queryClient = new QueryClient();

export const Root = () => {
  const outlet = useOutlet();
  const { currentTheme } = useUi();
  const mediumScreen = useMedia('md');
    
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline enableColorScheme />
      <QueryClientProvider client={queryClient}>
        <TagsProvider>
          <Paper className={`${styles.container} ${mediumScreen ? styles['medium-screen'] : ''}`} elevation={0}>
            <header className={styles.header}>
              <Header />
            </header>
            <section className={`${styles.content} ${mediumScreen ? styles['medium-screen'] : ''}`}>
              {mediumScreen && (
                <aside className={styles.aside}>
                  <SideBar />
                </aside>
              )}
              <article className={`${styles['page-content']} ${mediumScreen ? styles['medium-screen'] : ''}`}>
                <Container className={styles['page-container']}>
                  {outlet || <HomePage />}
                </Container>
              </article>
            </section>
            
            <footer className={styles.footer}>
              <Footer />
            </footer>
          </Paper>
        </TagsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};