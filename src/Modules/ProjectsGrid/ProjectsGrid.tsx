import { useNavigate } from 'react-router-dom';

import { Card, ErrorAlert, Grid, LoadingSpinner, NoDataAlert } from 'Components';

import { useProjectsApi } from 'Hooks';

export const ProjectsGrid = () => {
  const { data, isLoading, error } = useProjectsApi();
  const navigate = useNavigate();

  const navigateProjectItem = (slug: string) => {
    navigate(`/projects/${slug}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert error="Error retrieving projects list" />;
  }

  if (!isLoading && !error && !data?.items?.length) {
    return <NoDataAlert />;
  }

  return (
    <Grid>
      {data?.items?.map(project => (
        <Card 
          key={project.sys.id}
          image={project?.fields?.heroImage}
          title={project.fields.title}
          description={project.fields.shortDescription}
          tags={project.metadata.tags}
          onClick={() => navigateProjectItem(project.fields.slug)}
        />
      ))}
    </Grid>
  );
};