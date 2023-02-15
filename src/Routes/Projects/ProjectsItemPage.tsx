import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation,useOutlet,useParams  } from 'react-router-dom';
import { GitHub, InsertLink } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';

import { ErrorAlert, LoadingSpinner, NoDataAlert, RenderRichText,TagBlock,Title  } from 'Components';
import { JournalGrid } from 'Modules';

import styles from './ProjectsItemPage.module.css';

import { useUi } from 'Context/uiContext';
import { useProjectItemApi  } from 'Hooks';
import { useAnalytics } from 'Hooks/useAnalytics/useAnalytics';

export const ProjectsItemPage = () => {
  const outlet = useOutlet();
  const { slug } = useParams();
  const { pageTitle } = useUi();
  const { pageView } = useAnalytics();
  const { data, isLoading, error } = useProjectItemApi({ slug });
  const { pathname } = useLocation();

  const project = data?.items[0];

  useEffect(() => {
    if (!outlet && project?.fields?.title) {
      pageView(pathname);
    }
  }, [project?.fields?.title, pageView, pathname, outlet]);


  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert error="Error retrieving project details" />;
  }

  if (!isLoading && !error && !data?.items?.length) {
    return <NoDataAlert />;
  }
    
  return outlet || (
    <>
      <Helmet>
        <title>{project?.fields?.title} {pageTitle}</title>
      </Helmet>
      <section>
        <Title image={project?.fields.heroImage} title={project?.fields.title || ''} />

        { (project?.fields?.url || project?.fields?.repo) && (
          <section className={styles.links}>
            <Typography>
              Links:
            </Typography>
            {project?.fields?.url && <Button startIcon={<InsertLink />} href={project.fields.url} target="_blank">View Project</Button>}
            {project?.fields?.repo && <Button startIcon={<GitHub />} href={project.fields.repo} target="_blank">View Repo</Button>}
          </section>
        )}

        { project?.fields.description && <RenderRichText className={styles.container} content={project.fields.description} />}
      
        <TagBlock className={styles['tag-block']} align="right" size="medium" tags={project?.metadata.tags} />

        <Title type="h4" title="Related Journal Entries" />

        <JournalGrid projectId={project?.sys.id} />

      </section>
    </>
  );
};