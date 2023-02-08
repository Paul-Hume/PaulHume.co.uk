import { Grid, SkillsTable } from 'Components';
import { ExperiencePreview } from 'Modules';
import { PageContent } from 'Modules/PageContent';

import styles from './HomePage.module.css';

export const HomePage = () => {
  return (
    <section>
      <PageContent className={styles['content-container']} pageTag="pageHome" />

      <Grid>
        <SkillsTable />
        <ExperiencePreview />
      </Grid>
    </section>
  );
};