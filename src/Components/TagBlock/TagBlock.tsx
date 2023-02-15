import { TagLink } from 'contentful';

import { TagChip } from 'Components/TagChip';

import styles from './TagBlock.module.css';

import { useTags } from 'Context/tagsContext';

interface TagBlockProps {
  className?: string;
  tags: TagLink[];
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  align?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium';
}

export const TagBlock = ({ className = '', tags, color, align, size }: TagBlockProps) => {
  const { convertTagLinks } = useTags();

  if (tags.length === 0) return null;

  const convertedTags = convertTagLinks(tags) || [];

  return (
    <section className={`${styles.container} ${styles[`align-${align}`]} ${className}`}>
      {convertedTags.map((tag) => (<TagChip className={styles.chip} key={tag.id} tag={tag} color={color} size={size} />))}
    </section>
  );
};

TagBlock.defaultProps = {
  tags: [],
  color: 'secondary',
  align: 'left',
  size: 'small',
};