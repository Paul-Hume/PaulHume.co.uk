import { createClient } from 'contentful';

export const useContentfulClient = () => {
  const contentfulClient = createClient({
    space: `${process.env.REACT_APP_SPACE}`,
    accessToken: `${process.env.REACT_APP_READ_ONLY_TOKEN}`,
  });

  const fetchAsset = async (assetId: string) => {
    return contentfulClient.getAsset(assetId);
  };

  const fetchEntry = async (entryId: string) => {
    return contentfulClient.getEntry(entryId);
  };

  const fetchEntries = async (contentType: string) => {
    return contentfulClient.getEntries({
      content_type: contentType,
    });
  };

  return {
    fetchAsset,
    fetchEntry,
    fetchEntries,
  };
};