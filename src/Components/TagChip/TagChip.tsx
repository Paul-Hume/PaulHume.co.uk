import { Chip } from '@mui/material';

import styles from './TagChip.module.css';

import { useTags } from 'Context/tagsContext';
import { useAnalytics } from 'Hooks/useAnalytics/useAnalytics';
import { Tag } from 'Types/tag.types';

interface TagChipProps {
  tag: Tag,
  size?: 'small' | 'medium',
  className?: string,
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'default',
}

export const TagChip = ({ tag, size, className, color }: TagChipProps) => {
  const { selectedTags, updateSelectedTags } = useTags();
  const { buttonClick } = useAnalytics();

  return (
    <Chip
      className={`${styles.tag} ${className}`}
      size={size}
      label={(
        <div className={styles.container}>
          <span>{tag.name}</span>
          {tag.count > 0 && <span className={tag.count ? styles['tag-count'] : ''}>{tag.count}</span>}
        </div>
      )}
      variant={selectedTags.includes(tag?.id || tag.id || '') ? undefined : 'outlined'}
      color={color}
      onClick={(event) => {
        event.stopPropagation();
        buttonClick({ button: `Tag - ${tag.name}` });
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