import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { PageHeader } from 'Components';

import { useFetchContentful } from 'Hooks';
import { JournalEntryQuery } from 'Types';

export const JournalItemPage = () => {
  const { journalId } = useParams();
  const apiCall = useFetchContentful();

  const query = `
  {
    journalEntryCollection(where: { slug: "${journalId}" }) {
      items {
        ${JournalEntryQuery}
      }
    }
  }
  `;

  const fetchJournalItem = async () => {
    const response = await apiCall({ query});
    return response.journalEntryCollection.items[0];
  };

  const { isLoading, data, error } = useQuery({ queryKey: ['journalItem', journalId], queryFn: fetchJournalItem, staleTime: Infinity });

  return (
    <section>
      <PageHeader title={data?.title} />
    </section>
  );
};