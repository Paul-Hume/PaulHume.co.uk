import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { orderBy } from 'lodash';

import { CategoryChip } from 'Components/CategoryChip/CategoryChip';

import styles from './SideBar.module.css';

import { useFetchContentful } from 'Hooks';
import { Category, CategoryQuery } from 'Types/category.types';

interface CategoryResponse {
  categoryCollection: {
    items: Category[];
  }
}

export const SideBar = () => {
  const apiCall = useFetchContentful();

  const query = `
  {
    categoryCollection {
      items {
        ${CategoryQuery}
      }
    }
  }
  `;

  const fetchCategories = async () => {
    const response = await apiCall({ query });
    return response;
  };
  
  const { isLoading, data, error } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories, staleTime: Infinity, select: (data: CategoryResponse) => data.categoryCollection.items });

  const sortedData = orderBy(data, [(item: Category) => item.linkedFrom.entryCollection.total], ['desc']);

  return (
    <aside className={styles.container}>
      <Typography className={styles.title} variant="h6">Filters</Typography>

      {sortedData?.map(category => (
        <CategoryChip key={category.sys.id} category={category} />
      ))}
    </aside>
  );
};