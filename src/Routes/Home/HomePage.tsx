import { SkillsTable } from 'Components';
import { PageContent } from 'Modules/PageContent';

export const HomePage = () => {
  return (
    <section>
      <PageContent page="pageHome" />

      <SkillsTable />
    </section>
  );
};