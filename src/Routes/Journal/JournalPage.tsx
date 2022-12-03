import { useNavigate, useOutlet } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardHeader } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { Grid, PageHeader, TagBlock, TagChip } from 'Components';

import { useTags } from 'Context/tagsContext';
import { useFetchContentful } from 'Hooks';
import { JournalEntry, JournalEntryQuery } from 'Types';
import { formatDate } from 'Utils';

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
  const navigate = useNavigate();

  const filter = `where: {contentfulMetadata: { tags: { id_contains_some: [${selectedTags.map(tag => `"${tag}"`)}]} }} `;

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

  const navigateJournalItem = (slug: string) => {
    navigate(`/journal/${slug}`);
  };
  
  return outlet || (
    <section>
      <PageHeader title="Journal" subTitle={isLoading ? 'Loading ....' : `${data?.total} ${data && data?.total > 1 ? 'items' : 'item'}`}/>    

      {!!error && <p>Error loading journal</p>}
      <Grid>
        {!error && data?.items?.map((journalItem: JournalEntry) => (
          <Card key={journalItem.sys.id}>
            <CardActionArea onClick={() => navigateJournalItem(journalItem.slug)} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <CardHeader title={journalItem.title} subheader={formatDate(journalItem.sys.firstPublishedAt)} />
              <CardContent>
                <TagBlock tags={journalItem.contentfulMetadata.tags} />
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </section>
  );
};