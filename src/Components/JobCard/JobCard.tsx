import { Fragment } from 'react';
import { Typography, useTheme } from '@mui/material';
import { TagLink } from 'contentful';
import { isFuture  } from 'date-fns';

import { RenderRichText } from 'Components/RenderRichText';
import { TagBlock } from 'Components/TagBlock';

import styles from './JobCard.module.css';

import { useMedia } from 'Hooks';
import { JobHistoryItem } from 'Types';
import { formatDate } from 'Utils';

interface JobCardProps {
  job: JobHistoryItem;
  tags?: TagLink[];
}

export const JobCard = ({ job, tags }: JobCardProps) => {
  const largeScreen = useMedia('md');
  const theme = useTheme();

  const details = [
    { label: 'Client', value: `${job.client}${job.project ? ` - ${job.project}` : ''}` },
    { label: 'Location', value: job.location },
  ];

  const subTitle = function(data: JobHistoryItem) {
    const title = [];

    if (data.location === 'Remote') title.push('Remote');
    if (data.contract) title.push('Contract');

    if (!title.length) return null;

    return `(${title.join(' ')})`;
  }(job);

  return (
    <section className={styles.container}>
      <section className={styles.title}>
        <Typography
          sx={{ color: theme.palette.primary.main }}
          variant="h5"
        >
          {job.role}
        </Typography>

        {subTitle && (
          <Typography variant={largeScreen ? 'h5' : 'subtitle1'} sx={{ color: theme.palette.primary.main }}>
            {subTitle}
          </Typography>
        )}
        
        <Typography
          variant="subtitle1"
        >
          {formatDate(job.from, 'MMM yyyy')} - {isFuture(new Date(job.to)) ? 'Present' :  formatDate(job.to, 'MMM yyyy')} 
        </Typography>
      </section>

      <section className={styles['item-collection']}>
        { details.map((detail) => {
          if (!detail.value) return null;

          return (
            <Fragment key={detail.label}>
              <span className={styles.label}>{detail.label}: </span>
              <span>{detail.value}</span>
            </Fragment>
          );
        })}
      </section>

      <RenderRichText content={job.description} />

      <TagBlock tags={tags} size="small" align="right" />

    </section>
  );
};