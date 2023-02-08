import { useQueries } from '@tanstack/react-query';

import { useContentfulClient } from '../useContentfulClient';

interface UseTagCountReturn {
  isLoading: boolean;
  error: boolean;
  data: { [key: string]: number };
}

export const useTagCount = (): UseTagCountReturn => {
  const {fetchEntries} = useContentfulClient();

  const entryTypes = ['project', 'journalEntry', 'jobHistoryItem'];

  const entryQueries = useQueries({
    queries: entryTypes.map(
      entryType => ({ 
        queryKey: ['entryTags', entryType], 
        queryFn: () => fetchEntries(entryType, { limit: 999, select: 'metadata.tags', include: 10 }),
        staleTime: Infinity,
      })
    ),
  });

  const entryTagsLoading = entryQueries.some(query => query.isLoading);
  const entryTagsError = entryQueries.some(query => !!query.error);

  const entryTagsData = entryQueries.reduce((acc, query) => {
    if (query.data) {
      const tags = query.data.items.map(item => item.metadata.tags.map(tag => tag.sys.id)).flat();
      return [...acc, ...tags];
    }
    return acc;
  }, [] as string[]);

  const tagCount = entryTagsData.reduce((acc, tag) => {
    if (acc[tag]) {
      acc[tag]++;
    } else {
      acc[tag] = 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  return {
    isLoading: entryTagsLoading,
    error: entryTagsError,
    data: tagCount || {},
  };
};