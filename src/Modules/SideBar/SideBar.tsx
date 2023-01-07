import { Typography } from '@mui/material';

import { TagChip } from 'Components';

import styles from './SideBar.module.css';

import { useTags } from 'Context/tagsContext';

export const SideBar = () => {
  const { tags } = useTags();

  const sortedTags = tags.sort((a, b) => a.name.localeCompare(b.name)).filter(tag => !tag.name.toLowerCase().includes('page'));

  return (
    <aside className={styles.container}>
      <Typography className={styles.title} variant="h6">Tags</Typography>

      <section className={styles.tags}>
        {sortedTags.map((tag) => (
          <TagChip className={styles.tag} size="medium" key={tag.id} tag={tag} />
        ))}
      </section>
    </aside>
  );
};