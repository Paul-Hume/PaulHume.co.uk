import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation,useNavigate,useParams  } from 'react-router-dom';
import { Button } from '@mui/material';

import { ErrorAlert, LoadingSpinner, NoDataAlert, RenderRichText,TagBlock,Title  } from 'Components';
import { JournalGrid } from 'Modules';

import styles from './JournalItemPage.module.css';

import { useUi } from 'Context/uiContext';
import { useJournalItem,useMedia   } from 'Hooks';
import { useAnalytics } from 'Hooks/useAnalytics/useAnalytics';
import { formatDate } from 'Utils';

export const JournalItemPage = () => {
  const { slug, journalSlug } = useParams();
  const { pageTitle } = useUi();
  const { pageView } = useAnalytics();
  const { data, isLoading, error } = useJournalItem({ slug: journalSlug || slug });
  const { pathname } = useLocation();
  const largeScreen = useMedia('md');
  const navigate = useNavigate();

  const journalEntry = data?.items[0];
  const project = journalEntry?.fields?.project?.fields;

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
      
        <section className={styles['tag-container']}>
          {project && (
            <Button className={`${styles['project-button']} ${largeScreen ? styles['no-margin'] : ''}`} onClick={() => navigate(`/projects/${project.slug}`)}>
                Project: {journalEntry?.fields?.project?.fields?.title}
            </Button>
          )}
          <TagBlock align={largeScreen ? 'right' : 'left'} size="medium" tags={journalEntry?.metadata.tags} />
        </section>

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