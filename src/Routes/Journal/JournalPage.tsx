import { useOutlet } from 'react-router-dom';

import { Title } from 'Components';
import { JournalGrid } from 'Modules';

export const JournalPage = () => {
  const outlet = useOutlet();

  return outlet || (
    <section>
      <Title title="Journal" />    
      <JournalGrid />      
    </section>
  );
};