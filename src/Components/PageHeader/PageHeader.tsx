import { Typography } from '@mui/material';

import styles from './PageHeader.module.css';

interface PageHeaderProps {
  title: string;
  subTitle?: string;
  className?: string;
}

export const PageHeader = ({ title, subTitle, className}: PageHeaderProps) => {
  return (
    <section className={`${styles.container} ${className || ''}`}>
      {subTitle && <Typography variant="h6" className={styles.subTitle}>{subTitle}</Typography>}
      <Typography variant="h3">{title}</Typography>
    </section>
  );
};