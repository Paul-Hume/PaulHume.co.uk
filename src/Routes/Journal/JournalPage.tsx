import { useOutlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Link, PageHeader } from 'Components';

import { useTags } from 'Context/tagsContext';
import { useFetchContentful } from 'Hooks';
import { JournalEntry, JournalEntryQuery } from 'Types';

interface JournalResponse {
  journalEntryCollection: {
    total: number;
    items: JournalEntry[];
  }
}

export const JournalPage = () => {
  const outlet = useOutlet();
  const apiCall = useFetchContentful();
  const { selectedTags } = useTags();

  const filter = `where: {contentfulMetadata: { tags: { id_contains_some: [${selectedTags.map(tag => `"${tag}"`)}]} }} `;
  console.log(filter);
  const query = `
    {
      journalEntryCollection(${selectedTags.length > 0 ? filter : ''}order: sys_firstPublishedAt_DESC) {
        total
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

  const { isLoading, data, error } = useQuery({ queryKey: ['journals', selectedTags], queryFn: fetchJournal, staleTime: Infinity, select: (data: JournalResponse) => {
    return data?.journalEntryCollection || {};
  }});
  
  return outlet || (
    <section>
      <PageHeader title="Journal" subTitle={isLoading ? 'Loading ....' : `${data?.total} ${data && data?.total > 1 ? 'items' : 'item'}`}/>    

      {!!error && <p>Error loading journal</p>}
      
      {!error && data?.items?.map((journalItem: JournalEntry) => (
        <div key={journalItem.sys.id}>
          <h3>{journalItem.title}</h3>
          <Link to={`${journalItem.slug}`}>View</Link>
        </div>
      ))}
    </section>
  );
};