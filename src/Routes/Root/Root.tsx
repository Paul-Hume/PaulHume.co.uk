import { useOutlet } from 'react-router-dom';
import { Container, CssBaseline,Paper  } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Header, SideBar } from 'Modules';
import { HomePage } from 'Routes/Home';

import styles from './Root.module.css';

import { TagsProvider } from 'Context/tagsContext';
import { useUi } from 'Context/uiContext';
import { useMedia } from 'Hooks';

const queryClient = new QueryClient();

export const Root = () => {
  const outlet = useOutlet();
  const { currentTheme } = useUi();
  const smallScreen = useMedia('sm', 'down');
    
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline enableColorScheme />
      <QueryClientProvider client={queryClient}>
        <TagsProvider>
          <Paper className={`${styles.container} ${smallScreen ? '' : styles.largeScreen}`} elevation={0}>
            <header className={styles.header}>
              <Header />
            </header>
            <section className={`${styles.content} ${smallScreen ? '' : styles.largeScreen}`}>
              {!smallScreen && (
                <aside className={styles.aside}>
                  <SideBar />
                </aside>
              )}
              <article className={`${styles['page-content']} ${smallScreen ? '' : styles.largeScreen}`}>
                <Container className={styles['page-container']}>
                  {outlet || <HomePage />}
                </Container>
              </article>
            </section>
            {smallScreen && (
              <footer className={styles.footer}>
                This is the footer
              </footer>
            )}
          </Paper>
        </TagsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};