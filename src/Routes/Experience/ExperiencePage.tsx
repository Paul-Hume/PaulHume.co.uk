import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import { ErrorAlert,JobCard, LoadingSpinner, NoDataAlert, Title } from 'Components';

import { useUi } from 'Context/uiContext';
import { useExperience } from 'Hooks';
import { useAnalytics } from 'Hooks/useAnalytics/useAnalytics';

export const ExperiencePage = () => {
  const { data, isLoading, error} = useExperience();
  const { pageTitle } = useUi();
  const { pageView } = useAnalytics();
  const { pathname } = useLocation();

  useEffect(() => {
    pageView(pathname);
  }, [pathname, pageView]);

  return (
    <>
      <Helmet>
        <title>Experience {pageTitle}</title>
      </Helmet>
      <section>
        <Title title="Experience" />

        {isLoading && <LoadingSpinner />}

        {!!error && <ErrorAlert error="Error retrieving experience list" />}

        {!isLoading && !error && !data?.items?.length && (
          <NoDataAlert />
        )}

        {!isLoading && !error && data && (
          <section>
            {data?.items?.map(item => (
              <JobCard key={item.sys.id} job={item.fields} tags={item.metadata.tags} />
            ))}
          </section>
        )}
      </section>
    </>
  );
};