import { TagChip } from 'Components/TagChip';

import styles from './TagBlock.module.css';

import { Tag } from 'Types/tag.types';

interface TagBlockProps {
  tags: Tag[];
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
}

export const TagBlock = ({ tags, color }: TagBlockProps) => {
  return (
    <section className={styles.container}>
      {tags.map((tag: Tag) => (<TagChip className={styles.chip} key={tag.id} tag={tag} color={color} />))}
    </section>
  );
};

TagBlock.defaultProps = {
  tags: [],
  color: 'secondary',
};