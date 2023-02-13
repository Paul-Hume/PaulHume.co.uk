import { Helmet } from 'react-helmet-async';

import { Grid, SkillsTable } from 'Components';
import { ExperiencePreview } from 'Modules';
import { PageContent } from 'Modules/PageContent';

import styles from './HomePage.module.css';

import { useUi } from 'Context/uiContext';
import { useAnalytics } from 'Hooks/useAnalytics/useAnalytics';

export const HomePage = () => {
  const { pageView } = useAnalytics();
  const { pageTitle } = useUi();

  pageView();

  return (
    <>
      <Helmet>
        <title>Home {pageTitle}</title>
      </Helmet>
      <section>
        <PageContent className={styles['content-container']} pageTag="pageHome" />

        <Grid>
          <SkillsTable />
          <ExperiencePreview />
        </Grid>
      </section>
    </>
  );
};