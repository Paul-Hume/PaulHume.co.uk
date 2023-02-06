import { Alert, AlertTitle } from '@mui/material';

import { useTags } from 'Context/tagsContext';
import { Tag } from 'Types';

interface NoDataAlertProps {
  message?: string;
  className?: string;
}

export const NoDataAlert = ({ message = 'No data available for current filters.' , className = '' }: NoDataAlertProps) => {
  const { tags, selectedTags } = useTags();

  const tagList = tags.reduce((acc: string[], tag: Tag) => {
    if (selectedTags.includes(tag.id || '')) {
      return [...acc, tag.name];
    }

    return acc;
  }, []);

  return (
    <Alert severity="info" className={className}>
      <AlertTitle>{message}</AlertTitle>
      Selected Filters: {tagList.join(', ')}
    </Alert>
  );
};