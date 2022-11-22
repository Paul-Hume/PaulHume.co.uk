import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useFetchContentful } from 'Hooks';
import { JournalEntry, JournalEntryQuery } from 'Types';

interface JournalItemResponse {
  journalEntry: JournalEntry;
}

export const JournalItemPage = () => {
  const { journalId } = useParams();
  const apiCall = useFetchContentful();

  const query = `
  {
    journalEntry(id: "${journalId}") {
      ${JournalEntryQuery}
    }
  }
  `;

  const fetchJournalItem = async () => {
    const response = await apiCall({ query});
    return response;
  };

  const { isLoading, data, error } = useQuery({ queryKey: ['journalItem', journalId], queryFn: fetchJournalItem, staleTime: Infinity, select: (data: JournalItemResponse) => {
    return data?.journalEntry;
  }});

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if (error) {
    return (
      <div>Error</div>
    );
  }

  return (
    <section>
      <h3>{data?.title}</h3>
    </section>
  );
};