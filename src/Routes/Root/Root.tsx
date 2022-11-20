import { useOutlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

import { Header } from 'Modules';
import { HomePage } from 'Routes/Home';

const queryClient = new QueryClient();

export const Root = () => {
  const outlet = useOutlet();

  axios.defaults.baseURL = process.env.REACT_APP_PATH;
  axios.defaults.headers.Authorization = `Bearer ${process.env.REACT_APP_TARQUIN}`;
    
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />     
      
        {outlet || <HomePage />}
      </div>
    </QueryClientProvider>
  );
};