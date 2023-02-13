import { Helmet } from 'react-helmet-async';
import { useOutlet } from 'react-router-dom';

import { Title } from 'Components';
import { JournalGrid } from 'Modules';

import { useUi } from 'Context/uiContext';
import { useAnalytics } from 'Hooks/useAnalytics/useAnalytics';

export const JournalPage = () => {
  const outlet = useOutlet();
  const { pageTitle } = useUi();
  const { pageView } = useAnalytics();

  pageView();

  return outlet || (
    <>
      <Helmet>
        <title>Journal Page {pageTitle}</title>
      </Helmet>
      <section>
        <Title title="Journal" />    
        <JournalGrid />      
      </section>
    </>
  );
};