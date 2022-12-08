import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { PageHeader, RenderRichText, TagBlock } from 'Components';

import styles from './JournalItemPage.module.css';

import { useFetchContentful } from 'Hooks';
import { JournalEntry, JournalEntryQuery } from 'Types';
import { formatDate } from 'Utils';

export const JournalItemPage = () => {
  const { journalId } = useParams();
  const apiCall = useFetchContentful();
  
  const foo = 'blar';
  console.log(foo);

  const query = `
  {
    journalEntryCollection(where: { slug: "${journalId}" }) {
      items {
        ${JournalEntryQuery}
      }
    }
  }
  `;

  const fetchJournalItem = async () => {
    const response = await apiCall({ query});
    return response.journalEntryCollection.items[0];
  };

  const { data } = useQuery({ queryKey: ['journalItem', journalId], queryFn: fetchJournalItem, staleTime: Infinity, select: (data: JournalEntry) => {
    return data || {};
  }});

  return (
    <section>
      <PageHeader title={data?.title || ''} subTitle={formatDate(data?.sys?.firstPublishedAt || '')} />
      
      { data?.content && <RenderRichText className={styles.container} content={data?.content} />}

      { data?.contentfulMetadata?.tags?.length && <TagBlock align="right" size="medium" tags={data?.contentfulMetadata?.tags} /> }
    </section>
  );
};