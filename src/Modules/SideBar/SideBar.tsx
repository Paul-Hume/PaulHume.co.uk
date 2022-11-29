import { Typography } from '@mui/material';

import { TagChip } from 'Components';

import styles from './SideBar.module.css';

import { useTags } from 'Context/tagsContext';

export const SideBar = () => {
  const { tags } = useTags();

  return (
    <aside className={styles.container}>
      <Typography className={styles.title} variant="h6">Tags</Typography>

      {tags.map((tag) => (
        <TagChip key={tag.sys.id} tag={tag} />
      ))}
    </aside>
  );
};