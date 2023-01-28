import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { RenderRichText, TagBlock,Title } from 'Components';
import { JournalGrid } from 'Modules';

import styles from './JournalItemPage.module.css';

import { useFetchContentful } from 'Hooks';
import { JournalEntryFullQuery } from 'Queries/journal.query';
import { JournalEntryFull } from 'Types';
import { formatDate } from 'Utils';

export const JournalItemPage = () => {
  const { journalId } = useParams();
  const apiCall = useFetchContentful();

  const query = `
  {
    journalEntryCollection(limit: 1, where: { slug: "${journalId}" }) {
      items {
        ${JournalEntryFullQuery}
      }
    }
  }
  `;

  const fetchJournalItem = async () => {
    const response = await apiCall({ query});
    return response.journalEntryCollection.items[0];
  };

  const { data } = useQuery({ queryKey: ['journalItem', journalId], queryFn: fetchJournalItem, staleTime: Infinity, select: (data: JournalEntryFull) => {
    return data || {};
  }});

  return (
    <section>
      <Title title={data?.title || ''} subTitle={formatDate(data?.sys?.firstPublishedAt || '')} />
      
      <TagBlock align="right" size="medium" tags={data?.contentfulMetadata?.tags} />

      { data?.content && <RenderRichText className={styles.container} content={data?.content} />}

      <Title title="Latest Entries" type="h4" />

      <JournalGrid limit={2} journalId={data?.sys?.id} />
    </section>
  );
};