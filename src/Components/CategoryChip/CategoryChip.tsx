import { Chip } from '@mui/material';

import styles from './CategoryChip.module.css';

import { Category } from 'Types/category.types';

interface CategoryChipProps {
  category: Category;
  onClick: (id: string) => void;
}

export const CategoryChip = ({ category, onClick}: CategoryChipProps) => {
  return (
    <Chip
      className={styles.chip}
      label={<div className={styles.label}><span>{category.name}</span><span>{category.linkedFrom.entryCollection.total}</span></div>}
      variant="outlined"
      color="secondary"
      onClick={() => onClick(category.sys.id)}
    />
  );
};