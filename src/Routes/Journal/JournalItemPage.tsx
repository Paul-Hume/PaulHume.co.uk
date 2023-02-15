import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation,useParams  } from 'react-router-dom';

import { ErrorAlert, LoadingSpinner, NoDataAlert, RenderRichText,TagBlock,Title  } from 'Components';
import { JournalGrid } from 'Modules';

import styles from './JournalItemPage.module.css';

import { useUi } from 'Context/uiContext';
import { useJournalItem  } from 'Hooks';
import { useAnalytics } from 'Hooks/useAnalytics/useAnalytics';
import { formatDate } from 'Utils';

export const JournalItemPage = () => {
  const { slug, journalSlug } = useParams();
  const { pageTitle } = useUi();
  const { pageView } = useAnalytics();
  const { data, isLoading, error } = useJournalItem({ slug: journalSlug || slug });
  const { pathname } = useLocation();

  const journalEntry = data?.items[0];

  useEffect(() => {
    if (journalEntry?.fields?.title) {
      pageView(pathname);
    }
  }, [journalEntry?.fields?.title, pageView, pathname]);


  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert error="Error retrieving journal entry" />;
  }

  if (!isLoading && !error && !data?.items?.length) {
    return <NoDataAlert />;
  }
    
  return (
    <>
      <Helmet>
        <title>{journalEntry?.fields?.title} {pageTitle}</title>
      </Helmet>
      <section>
        <Title title={journalEntry?.fields.title || ''} subTitle={formatDate(journalEntry?.sys.createdAt || '')} />
      
        <TagBlock align="right" size="medium" tags={journalEntry?.metadata.tags} />

        { journalEntry?.fields.content && <RenderRichText className={styles.container} content={journalEntry.fields.content} />}

        {!journalSlug && (
          <>
            <Title title="Latest Entries" type="h4" />

            <JournalGrid limit={2} journalId={journalEntry?.sys?.id} />
          </>
        )}
      </section>
    </>
  );
};