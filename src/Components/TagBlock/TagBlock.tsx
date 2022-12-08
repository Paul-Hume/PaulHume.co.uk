import { TagChip } from 'Components/TagChip';

import styles from './TagBlock.module.css';

import { Tag } from 'Types/tag.types';

interface TagBlockProps {
  tags: Tag[];
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  align?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium';
}

export const TagBlock = ({ tags, color, align, size }: TagBlockProps) => {
  if (tags.length === 0) return null;

  return (
    <section className={`${styles.container} ${styles[`align-${align}`]}`}>
      {tags.map((tag: Tag) => (<TagChip className={styles.chip} key={tag.id} tag={tag} color={color} size={size} />))}
    </section>
  );
};

TagBlock.defaultProps = {
  tags: [],
  color: 'secondary',
  align: 'left',
  size: 'small',
};