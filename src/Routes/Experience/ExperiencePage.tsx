import { ErrorAlert,JobCard, LoadingSpinner, NoDataAlert, Title } from 'Components';

import { useExperience } from 'Hooks';

export const ExperiencePage = () => {
  const { data, isLoading, error} = useExperience();

  return (
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
  );
};