import { useOutlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Link } from 'Components';

import { useFetchContentful } from 'Hooks';
import { JournalEntry, JournalEntryQuery } from 'Types';

interface JournalResponse {
  journalEntryCollection: {
    items: JournalEntry[];
  }
}

export const JournalPage = () => {
  const outlet = useOutlet();
  const apiCall = useFetchContentful();

  const query = `
    {
      journalEntryCollection(order: sys_firstPublishedAt_DESC) {
        items {
          ${JournalEntryQuery}
        }
      }
    }
  `;

  const fetchJournal = async () => {
    const response = await apiCall({ query});
    return response;
  };

  const { isLoading, data, error } = useQuery({ queryKey: ['journals'], queryFn: fetchJournal, staleTime: Infinity, select: (data: JournalResponse) => {
    return data?.journalEntryCollection?.items || [];
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
  
  return outlet || (
    <section>
      <h1>Journal</h1>
      
      {data?.map((journalItem: JournalEntry) => (
        <div key={journalItem.sys.id}>
          <h3>{journalItem.title}</h3>
  
          <Link to={`${journalItem.sys.id}`}>View</Link>
        </div>
      ))}
    </section>
  );
};