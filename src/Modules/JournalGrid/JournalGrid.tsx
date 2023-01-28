import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardHeader } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { Grid, TagBlock } from 'Components';

import { useTags } from 'Context/tagsContext';
import { useFetchContentful } from 'Hooks';
import { JournalEntryPartialQuery } from 'Queries/journal.query';
import { JournalEntryPartial } from 'Types';
import { formatDate } from 'Utils';

interface JournalResponse {
  journalEntryCollection: {
    total: number;
    items: JournalEntryPartial[];
  }
}

interface JournalGridProps {
  limit?: number;
  journalId?: string;
}

export const JournalGrid = ({ limit, journalId }: JournalGridProps) => {
  const apiCall = useFetchContentful();
  const { selectedTags } = useTags();
  const navigate = useNavigate();

  const filter = `
    where: { 
      ${selectedTags.length > 0 ? `
        contentfulMetadata: { 
          tags: { 
            id_contains_some: [${selectedTags.map(tag => `"${tag}"`)}]
          }
        }
      ` : ''}
      ${journalId ? `sys: { id_not: "${journalId}" }` : ''}
    } `;

  const query = `
    {
      journalEntryCollection(limit: ${limit} ${filter} order: sys_firstPublishedAt_DESC) {
        total
        items {
          ${JournalEntryPartialQuery}
        }
      }
    }
  `;

  const fetchJournal = async () => {
    const response = await apiCall({ query});
    return response;
  };


  const { isLoading, data, error } = useQuery({ queryKey: ['journals', selectedTags, limit, journalId], queryFn: fetchJournal, staleTime: Infinity, select: (data: JournalResponse) => {
    return data?.journalEntryCollection || {};
  }});

  const navigateJournalItem = (slug: string) => {
    navigate(`/journal/${slug}`);
  };

  if (isLoading) {
    return <section>Loading...</section>;
  }

  if (error) {
    return <section>Error loading journal</section>;
  }

  return (
    <Grid>
      {!error && data?.items?.map((journalItem: JournalEntryPartial) => (
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
  );
};

JournalGrid.defaultProps = {
  limit: 100,
};