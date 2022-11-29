import { useOutlet } from 'react-router-dom';
import { Container, Paper } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Header, SideBar } from 'Modules';
import { HomePage } from 'Routes/Home';

import styles from './Root.module.css';

import { TagsProvider } from 'Context/tagsContext';

const queryClient = new QueryClient();

export const Root = () => {
  const outlet = useOutlet();
    
  return (
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
  );
};