import { Paper } from '@mui/material';

import { CvDownloadButton } from 'Components';

import styles from './DownloadBar.module.css';

export const DownloadBar = () => {

  return (
    <Paper className={styles.container}>
      <CvDownloadButton />
    </Paper>
  );
};