import { Typography } from '@mui/material';

import styles from './Title.module.css';

interface TitleProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  title: string;
  subTitle?: string;
  className?: string;
}

export const Title = ({ title, subTitle, className, type}: TitleProps) => {
  return (
    <section className={`${styles.container} ${className || ''}`}>
      <Typography variant={type}>{title}</Typography>
      {subTitle && <Typography variant="h6" className={styles.subTitle}>{subTitle}</Typography>}
    </section>
  );
};

Title.defaultProps = {
  type: 'h3',
};