import { useQuery } from '@tanstack/react-query';

import { useContentfulClient } from '../useContentfulClient';

import { useTags } from 'Context/tagsContext';
import { ProjectItem } from 'Types';

export const useProjectsApi = () => {
  const { fetchEntries } = useContentfulClient();
  const { selectedTags } = useTags();

  return useQuery({
    queryKey: ['useProjectsApi', selectedTags],
    queryFn: () => fetchEntries<ProjectItem>('project', {
      order: '-sys.createdAt',
      'metadata.tags.sys.id[in]': selectedTags.length ? selectedTags.join(',') : undefined,
    }),
    staleTime: Infinity,
  });
};

interface UseProjectItemProps {
  slug?: string;
}

export const useProjectItemApi = ({ slug }: UseProjectItemProps) => {
  const { fetchEntries } = useContentfulClient();

  return useQuery({
    queryKey: ['useJournalItem', slug],
    queryFn: () => fetchEntries<ProjectItem>(
      'project',
      {
        limit: 1,
        'fields.slug': slug,
      }
    )
  });
};