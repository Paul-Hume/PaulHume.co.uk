interface ApiCall {
  query: string;
}

export const useFetchContentful = () => {
  const call = async ({ query }: ApiCall) => {
    const response = await fetch(`${process.env.REACT_APP_PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_READ_ONLY_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }).then((response) => response.json()).then((response) => response.data);

    return response;
  };

  return call;
};

useFetchContentful.defaultProps = {
  url: process.env.REACT_APP_PATH,
};