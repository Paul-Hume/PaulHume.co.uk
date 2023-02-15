import { useQuery } from '@tanstack/react-query';

import { useContentfulClient } from '../useContentfulClient';

import { useTags } from 'Context/tagsContext';
import { JournalEntryItem } from 'Types';

interface UseJournalProps {
  limit?: number;
  journalId?: string;
  projectId?: string;
}

export const useJournal = ({ limit, journalId, projectId }: UseJournalProps = {}) => {
  const { fetchEntries } = useContentfulClient();
  const { selectedTags } = useTags();

  return useQuery({
    queryKey: ['useJournal', limit, selectedTags, journalId],
    queryFn: () => fetchEntries<JournalEntryItem>(
      'journalEntry',
      {
        limit,
        order: '-sys.createdAt',
        'metadata.tags.sys.id[in]': selectedTags.length ? selectedTags.join(',') : undefined,
        'fields.project.sys.id[match]': projectId ? projectId : undefined,
        'sys.id[ne]': journalId,
      }
    )
  });
};

interface UseJournalItemProps {
  slug?: string;
}

export const useJournalItem = ({ slug }: UseJournalItemProps) => {
  const { fetchEntries } = useContentfulClient();

  return useQuery({
    queryKey: ['useJournalItem', slug],
    queryFn: () => fetchEntries<JournalEntryItem>(
      'journalEntry',
      {
        limit: 1,
        'fields.slug': slug,
      }
    )
  });
};