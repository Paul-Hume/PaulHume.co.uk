import { useEffect, useState } from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Button, Paper } from '@mui/material';
import { Asset } from 'contentful';

import styles from './DownloadBar.module.css';

import { useContentfulClient } from 'Hooks';
import { formatDate } from 'Utils';

export const DownloadBar = () => {
  const { fetchAsset } = useContentfulClient();
  const [cv, setCv] = useState<Asset>();

  const fetchCv = async () => {
    const cvAsset = await fetchAsset('7iVwue1zT6M7BFHwEQCUUH');

    setCv(cvAsset);
  };

  useEffect(() => {
    if (!cv) {
      fetchCv();  
    }
  }, []);

  if (!cv) {
    return null;
  }

  return (
    <Paper className={styles.container}>
      <Button disabled={!cv} variant="contained" size="small" startIcon={<CloudDownloadIcon />} href={cv?.fields?.file?.url} target="_blank">CV {formatDate(cv?.sys?.updatedAt, 'MMM yyyy')}</Button>
    </Paper>
  );
};