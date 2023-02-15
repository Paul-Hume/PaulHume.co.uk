import { Typography } from '@mui/material';
import Contentful from 'contentful';

import styles from './Title.module.css';

import { useUi } from 'Context/uiContext';

interface TitleProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  title: string;
  subTitle?: string;
  className?: string;
  image?: Contentful.Asset;
}

export const Title = ({ image, title, subTitle, className, type}: TitleProps) => {
  const imageUrl = image?.fields?.file?.url;
  const { theme } = useUi();
  return (
    <section className={`${styles['outer-container']} ${imageUrl ? styles.image : ''} ${className || ''}`} style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : ''}}>
      <section className={`${styles.container} ${styles[theme]} ${imageUrl ? styles.image : ''}`}>
        <Typography variant={type}>{title}</Typography>
        {subTitle && <Typography variant="h6" className={styles.subTitle}>{subTitle}</Typography>}
      </section>
    </section>
  );
};

Title.defaultProps = {
  type: 'h3',
};