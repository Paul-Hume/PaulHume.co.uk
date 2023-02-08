import { useState } from 'react';
import { Button, Typography } from '@mui/material';

import { LoadingSpinner, TagChip } from 'Components';

import styles from './SideBar.module.css';

import { useTags } from 'Context/tagsContext';

export const SideBar = () => {
  const { isLoading, tags } = useTags();
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);

  return (
    <section className={styles.container}>
      <Typography className={styles.title} variant="h6">Filters</Typography>

      <section className={styles['tags-container']}>
        {isLoading && <LoadingSpinner />}

        {!isLoading && tags.filter(tag => showMore ? tag.count >= 1 : tag.count >= 3).map((tag) => (
          <TagChip className={styles.tag} size="medium" key={tag.id} tag={tag} />
        ))}

        <Button size="small" onClick={toggleShowMore}>{showMore ? 'Show Less' : 'Show More'}</Button>
      </section>
    </section>
  );
};