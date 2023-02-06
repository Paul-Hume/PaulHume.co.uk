import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { LoadingButton } from '@mui/lab';
import { useQuery } from '@tanstack/react-query';

import { useContentfulClient } from 'Hooks';
import { formatDate } from 'Utils';

export const CvDownloadButton = () => {
  const { fetchAsset } = useContentfulClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['cv'],
    queryFn: () => fetchAsset('7iVwue1zT6M7BFHwEQCUUH'),
    staleTime: Infinity,
  });

  return (
    <LoadingButton 
      variant="contained" 
      size="small" 
      startIcon={<CloudDownloadIcon />}
      loading={isLoading} 
      disabled={!!error || isLoading || !data}
      href={data?.fields?.file?.url || ''}
      target="_blank"
    >
      {!data?.fields?.file?.url && !isLoading && 'CV Unavailable'}

      {data?.fields?.file?.url && !isLoading && `CV ${formatDate(data?.sys?.updatedAt, 'MMM yyyy')}`}
    </LoadingButton>
  );
};