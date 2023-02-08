import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardHeader } from '@mui/material';

import { ErrorAlert, Grid, LoadingSpinner, NoDataAlert, TagBlock } from 'Components';

import { useJournal } from 'Hooks';
import { formatDate } from 'Utils';

interface JournalGridProps {
  limit?: number;
  journalId?: string;
}

export const JournalGrid = ({ limit, journalId }: JournalGridProps) => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useJournal({ limit, journalId });

  const navigateJournalItem = (slug: string) => {
    navigate(`/journal/${slug}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert error="Error retrieving journal list" />;
  }

  if (!isLoading && !error && !data?.items?.length) {
    return <NoDataAlert />;
  }

  return (
    <Grid>
      {data?.items?.map((journalItem) => (
        <Card key={journalItem.sys.id}>
          <CardActionArea onClick={() => navigateJournalItem(journalItem.fields.slug)} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <CardHeader title={journalItem.fields.title} subheader={formatDate(journalItem.sys.createdAt)} />
            <CardContent>
              <TagBlock tags={journalItem.metadata.tags} />
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