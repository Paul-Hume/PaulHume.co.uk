import { useQuery } from '@tanstack/react-query';

import { useContentfulClient } from 'Hooks/useContentfulClient';
import { NavItem } from 'Types/nav.types';

export const useNavApi = () => {
  const { fetchEntries } = useContentfulClient();

  return useQuery({
    queryKey: ['useNavApi'],
    queryFn: () => fetchEntries<NavItem>('navBarItem', {
      order: 'fields.sortOrder',
      'fields.show': true,
    })
  });
};