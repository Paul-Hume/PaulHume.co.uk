import { Typography } from '@mui/material';

import { LoadingSpinner, TagChip } from 'Components';

import styles from './SideBar.module.css';

import { useTags } from 'Context/tagsContext';

export const SideBar = () => {
  const { loadingTags, tags } = useTags();

  return (
    <section className={styles.container}>
      <Typography className={styles.title} variant="h6">Filters</Typography>

      <section className={styles['tags-container']}>
        {loadingTags && <LoadingSpinner />}

        {!loadingTags && tags.map((tag) => (
          <TagChip className={styles.tag} size="medium" key={tag.id} tag={tag} />
        ))}
      </section>
    </section>
  );
};