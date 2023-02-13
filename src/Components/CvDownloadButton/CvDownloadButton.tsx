import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { LoadingButton } from '@mui/lab';
import { useQuery } from '@tanstack/react-query';

import { useContentfulClient } from 'Hooks';
import { useAnalytics } from 'Hooks/useAnalytics/useAnalytics';
import { formatDate } from 'Utils';

interface CvDownloadButtonProps {
  className?: string;
}

export const CvDownloadButton = ({ className = '' }: CvDownloadButtonProps) => {
  const { fetchAsset } = useContentfulClient();
  const { buttonClick } = useAnalytics();

  const { data, isLoading, error } = useQuery({
    queryKey: ['cv'],
    queryFn: () => fetchAsset('7iVwue1zT6M7BFHwEQCUUH'),
    staleTime: Infinity,
  });

  return (
    <LoadingButton
      className={className}
      variant="contained" 
      size="small" 
      startIcon={<CloudDownloadIcon />}
      loading={isLoading} 
      disabled={!!error || isLoading || !data}
      href={data?.fields?.file?.url || ''}
      onClick={() => { buttonClick({ button: 'CV Download'}); }}
      target="_blank"
    >
      {!data?.fields?.file?.url && !isLoading && 'CV Unavailable'}

      {data?.fields?.file?.url && !isLoading && `CV ${formatDate(data?.sys?.updatedAt, 'MMM yyyy')}`}
    </LoadingButton>
  );
};