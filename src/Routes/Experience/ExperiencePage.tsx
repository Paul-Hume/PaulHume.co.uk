import { useQuery } from '@tanstack/react-query';

import { ErrorAlert,JobCard, LoadingSpinner, NoDataAlert, Title } from 'Components';

import { useTags } from 'Context/tagsContext';
import { useContentfulClient } from 'Hooks';
import { JobHistoryItem } from 'Types';

export const ExperiencePage = () => {
  const { fetchEntries } = useContentfulClient();
  const { selectedTags } = useTags();

  

  const { data, isLoading, error } = useQuery({
    queryKey: ['experience', selectedTags],
    queryFn: () => fetchEntries<JobHistoryItem>('jobHistoryItem', {
      order: '-fields.from',
      'metadata.tags.sys.id[in]': selectedTags.length ? selectedTags.join(',') : undefined,
    }),
    staleTime: Infinity,
  });



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