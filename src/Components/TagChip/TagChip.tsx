import { Chip } from '@mui/material';

import { useTags } from 'Context/tagsContext';
import { Tag } from 'Types/tag.types';

interface TagChipProps {
  tag: Tag,
  size?: 'small' | 'medium',
  className?: string,
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'default',
}

export const TagChip = ({ tag, size, className, color }: TagChipProps) => {
  const { selectedTags, updateSelectedTags } = useTags();

  return (
    <Chip
      className={className}
      size={size}
      label={tag.name}
      variant={selectedTags.includes(tag?.id || tag.id || '') ? undefined : 'outlined'}
      color={color}
      onClick={(event) => {
        event.stopPropagation();
        updateSelectedTags(tag?.id || '');
      }}
    />
  );
};

TagChip.defaultProps = {
  size: 'small',
  className: '',
  color: 'primary',
};