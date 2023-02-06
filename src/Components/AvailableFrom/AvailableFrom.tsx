import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { isFuture, isPast, subWeeks } from 'date-fns';

import { useContentfulClient } from 'Hooks';
import { JobHistoryItem } from 'Types';
import { formatDate } from 'Utils';

export const AvailableFrom = () => {
  const { fetchEntries } = useContentfulClient();

  const { data } = useQuery({
    queryKey: ['available-from'],
    queryFn: () => fetchEntries<JobHistoryItem>('jobHistoryItem', {
      limit: 1,
      order: '-fields.from',
    }),
    staleTime: Infinity,
  });

  const { to, client } = data?.items[0]?.fields ?? {};

  if (!to) {
    return <Typography></Typography>;
  }

  const availableFrom = () => {
    if (isPast(new Date(to))) {
      return 'Available now';
    }

    if (isFuture(new Date(to)) && isFuture(subWeeks(new Date(to), 4))) {
      return `Currently in contract with ${client}`;
    }

    return `Available from ${formatDate(to, 'dd MMMM yyyy')}`;
  };

  return (
    <Typography variant="h6">{availableFrom()}</Typography>
  );
};