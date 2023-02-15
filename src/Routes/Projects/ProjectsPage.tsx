import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation,useOutlet } from 'react-router-dom';

import { Title } from 'Components';
import { ProjectsGrid } from 'Modules';

import { useUi } from 'Context/uiContext';
import { useAnalytics } from 'Hooks/useAnalytics/useAnalytics';

export const ProjectsPage = () => {
  const outlet = useOutlet();
  const { pageTitle } = useUi();
  const { pageView } = useAnalytics();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!outlet) {
      pageView(pathname);
    }
  });

  return (
    <>
      <Helmet>
        <title>Projects {pageTitle}</title>
      </Helmet>

      <Title title="Projects" />

      <ProjectsGrid />
    </>
  );
};