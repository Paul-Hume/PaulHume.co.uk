import { Table, TableBody, TableCell,TableRow, Typography } from '@mui/material';

import { ErrorAlert, LoadingSpinner, NoDataAlert, Title } from 'Components';

import styles from './ExperiencePreview.module.css';

import { useExperience, useMedia } from 'Hooks';
import { formatDuration } from 'Utils';

export const ExperiencePreview = () => {
  const { data, isLoading, error } = useExperience({ limit: 5 });
  const mediumScreen = useMedia('md');
  const largeScreen = useMedia('lg');

  return (
    <section>
      <Title className={styles.title} type="h5" title="Previous Experience" />

      {isLoading && <LoadingSpinner />}

      {!!error && <ErrorAlert error="Error retrieving experience list" />}

      {!isLoading && !error && !data?.items?.length && (
        <NoDataAlert />
      )}

      {!isLoading && !error && (
        <Table>
          <TableBody>
            {data?.items?.map(item => (
              <TableRow key={item.sys.id}>
                <TableCell>
                  {item.fields.role} - {item.fields.client}
                  {!mediumScreen && <Typography variant="caption"><br />{formatDuration(item.fields.from, item.fields.to)}</Typography>}
                </TableCell>
                {largeScreen && <TableCell className={styles.date}>{formatDuration(item.fields.from, item.fields.to)}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
};