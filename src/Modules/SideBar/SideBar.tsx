import { useState } from 'react';
import { Button, Typography } from '@mui/material';

import { LoadingSpinner, TagChip } from 'Components';

import styles from './SideBar.module.css';

import { useTags } from 'Context/tagsContext';

export const SideBar = () => {
  const { loadingTags, tags } = useTags();
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);

  return (
    <section className={styles.container}>
      <Typography className={styles.title} variant="h6">Filters</Typography>

      <section className={styles['tags-container']}>
        {loadingTags && <LoadingSpinner />}

        {!loadingTags && tags.filter(tag => showMore ? tag.name : tag.count >= 3).map((tag) => (
          <TagChip className={styles.tag} size="medium" key={tag.id} tag={tag} />
        ))}

        <Button size="small" onClick={toggleShowMore}>{showMore ? 'Show Less' : 'Show More'}</Button>
      </section>
    </section>
  );
};