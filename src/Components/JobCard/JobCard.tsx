import { Fragment } from 'react';
import { Typography, useTheme } from '@mui/material';
import { TagLink } from 'contentful';
import { isFuture  } from 'date-fns';

import { RenderRichText } from 'Components/RenderRichText';
import { TagBlock } from 'Components/TagBlock';

import styles from './JobCard.module.css';

import { useTags } from 'Context/tagsContext';
import { JobHistoryItem, Tag } from 'Types';
import { formatDate, formatDuration } from 'Utils';

interface JobCardProps {
  job: JobHistoryItem;
  tags?: TagLink[];
}

export const JobCard = ({ job, tags }: JobCardProps) => {
  const { convertTagLinks } = useTags();
  const theme = useTheme();

  const details = [
    { label: 'Project', value: job.project },
    { label: 'Role', value: `${job.role} (${job.location})`},
  ];

  return (
    <section className={styles.container}>
      <section className={styles.title}>
        <Typography
          sx={{ color: theme.palette.primary.main }}
          variant="h5"
        >
          {job.client} {job.contract && '(Contract)'}
        </Typography>
        <section className={styles.date}>
          <Typography
            variant="subtitle1"
          >
            {formatDate(job.from, 'MMM yyyy')} - {isFuture(new Date(job.to)) ? 'Present' :  formatDate(job.to, 'MMM yyyy')} 
          </Typography>
          <Typography variant="caption">({formatDuration(job.from, job.to)})</Typography>
        </section>
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

      <TagBlock tags={convertTagLinks(tags || [])} size="small" align="right" />

    </section>
  );
};