import { Title } from 'Components';
import { JournalGrid } from 'Modules';
import { PageContent } from 'Modules/PageContent';

export const HomePage = () => {
  return (
    <section>
      <PageContent page="pageHome" />

      <Title type="h4" title="Latest Journal Entries" />
      <JournalGrid limit={3} />
    </section>
  );
};