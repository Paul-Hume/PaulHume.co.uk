import axios from 'axios';

interface ApiCall {
  query: string;
}

export const useFetchContentful = () => {
  const call = async ({ query }: ApiCall) => {
    return axios.post(`${process.env.REACT_APP_PATH}`, { query }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_READ_ONLY_TOKEN}`,
      }
    }).then(response => response.data.data);
  };

  return call;
};

useFetchContentful.defaultProps = {
  url: process.env.REACT_APP_PATH,
};