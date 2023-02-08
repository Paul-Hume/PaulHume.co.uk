import { useQuery } from '@tanstack/react-query';

import { useContentfulClient } from '../useContentfulClient';

import { Skill } from 'Types/skill.types';

export const useSkills = () => {
  const { fetchEntries } = useContentfulClient();

  return useQuery({
    queryKey: ['useSkills'],
    queryFn: () => fetchEntries<Skill>(
      'skill',
      {
        order: '-fields.date',
      }
    ),
    staleTime: Infinity,
  });
};