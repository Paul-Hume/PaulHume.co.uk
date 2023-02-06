import { Paper } from '@mui/material';

import { AvailableFrom, CvDownloadButton } from 'Components';

import styles from './DownloadBar.module.css';

export const DownloadBar = () => {

  return (
    <Paper className={styles.container}>
      <AvailableFrom />
      <CvDownloadButton />
    </Paper>
  );
};