import { useQuery } from '@tanstack/react-query';

import { useContentfulClient } from '../useContentfulClient';

import { useTags } from 'Context/tagsContext';
import { JobHistoryItem } from 'Types';

interface UseExperienceProps {
  limit?: number;
}

export const useExperience = ({ limit }: UseExperienceProps = {}) => {
  const { fetchEntries } = useContentfulClient();
  const { selectedTags } = useTags();

  return useQuery({
    queryKey: ['useExperience', selectedTags, limit],
    queryFn: () => fetchEntries<JobHistoryItem>(
      'jobHistoryItem',
      {
        limit,
        order: '-fields.from',
        'metadata.tags.sys.id[in]': selectedTags.length ? selectedTags.join(',') : undefined,
      }
    ),
    staleTime: Infinity,
  });
};