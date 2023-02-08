import { useQuery } from '@tanstack/react-query';

import { useContentfulClient } from '../useContentfulClient';

import { PageSection, PageTag } from 'Types';

interface UsePageContentProps {
  pageTag: PageTag;
}

export const usePageContent = ({ pageTag }: UsePageContentProps) => {
  const { fetchEntries } = useContentfulClient();

  return useQuery({
    queryKey: ['usePageContent', pageTag],
    queryFn: () => fetchEntries<PageSection>(
      'pageSections',
      {
        order: 'fields.sortOrder',
        'metadata.tags.sys.id[in]': pageTag,
      }
    ),
    staleTime: Infinity,
  });
};