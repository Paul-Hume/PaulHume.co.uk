import { useQuery } from '@tanstack/react-query';

import { useContentfulClient } from '../useContentfulClient';

import { ProjectItem } from 'Types';

export const useProjectsApi = () => {
  const { fetchEntries } = useContentfulClient();

  return useQuery({
    queryKey: ['useProjectsApi'],
    queryFn: () => fetchEntries<ProjectItem>('project', {
      order: '-sys.createdAt',
    }),
    staleTime: Infinity,
  });
};