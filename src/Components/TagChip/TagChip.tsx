import { Chip } from '@mui/material';
import Contentful from 'contentful';

import styles from './TagChip.module.css';

import { useTags } from 'Context/tagsContext';

interface TagChipProps {
  tag: Contentful.Tag;
}

export const TagChip = ({ tag }: TagChipProps) => {
  const { selectedTags, updateSelectedTags } = useTags();

  return (
    <Chip
      className={styles.chip}
      label={<div className={styles.label}><span>{tag.name}</span></div>}
      variant={selectedTags.includes(tag.sys.id) ? undefined : 'outlined'}
      color="primary"
      onClick={() => updateSelectedTags(tag.sys.id)}
    />
  );
};