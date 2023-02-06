import { Paper } from '@mui/material';

import { AvailableFrom, CvDownloadButton } from 'Components';

import styles from './DownloadBar.module.css';

import { useMedia } from 'Hooks';

export const DownloadBar = () => {
  const largeScreen = useMedia('md');
  return (
    <Paper className={`${styles.container} ${largeScreen ? styles.large : ''}`}>
      <AvailableFrom />
      <CvDownloadButton className={largeScreen ? '' : styles.block} />
    </Paper>
  );
};