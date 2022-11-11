import { useOutlet } from 'react-router-dom';

import { Header } from 'Modules';
import { HomePage } from 'Routes/Home';

export const Root = () => {
  const outlet = useOutlet();

  return (
    <div>
      <Header />     
      
      {outlet || <HomePage />}
    </div>
  );
};