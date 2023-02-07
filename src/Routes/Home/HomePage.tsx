import { Grid, SkillsTable } from 'Components';
import { ExperiencePreview } from 'Modules';
import { PageContent } from 'Modules/PageContent';

export const HomePage = () => {
  return (
    <section>
      <PageContent page="pageHome" />

      <Grid>
        <SkillsTable />
        <ExperiencePreview />
      </Grid>
    </section>
  );
};