import { Chip } from '@mui/material';

import styles from './CategoryChip.module.css';

import { useCategories } from 'Context/categoriesContext';
import { Category } from 'Types/category.types';

interface CategoryChipProps {
  category: Category;
}

export const CategoryChip = ({ category }: CategoryChipProps) => {
  const { selectedCategories, updateSelectedCategories } = useCategories();

  return (
    <Chip
      className={styles.chip}
      label={<div className={styles.label}><span>{category.name}</span><span>{category.linkedFrom.entryCollection.total}</span></div>}
      variant={selectedCategories.includes(category.sys.id) ? undefined : 'outlined'}
      color="primary"
      onClick={() => updateSelectedCategories(category.sys.id)}
    />
  );
};