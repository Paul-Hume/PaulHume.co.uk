import { Card as MuiCard, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Contentful from 'contentful';

import { TagBlock } from 'Components/TagBlock';

import styles from './Card.module.css';

interface CardProps {
  image?: Contentful.Asset;
  title: Contentful.EntryFields.Text;
  description?: Contentful.EntryFields.Text;
  tags?: Contentful.TagLink[];
  onClick: () => void;
}

export const Card = ({ onClick, image, title, description, tags }: CardProps) => {
  return (
    <MuiCard className={styles.container}>
      <CardActionArea className={styles['action-area']} onClick={onClick}>
        {image && <CardMedia className={styles.image} image={image.fields.file.url} title="foofoo" />}
        <CardContent className={styles.content}>
          <Typography className={styles.title} gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          {description && (
            <Typography className={styles.description} variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
          {tags && <TagBlock tags={tags} />}
        </CardContent>
      </CardActionArea>
    </MuiCard>
  );
};