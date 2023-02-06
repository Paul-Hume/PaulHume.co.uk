import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { ErrorAlert,LoadingSpinner,Title } from 'Components';

import styles from './SkillsTable.module.css';

import { useContentfulClient } from 'Hooks';
import { Skill } from 'Types/skill.types';
import { formatDuration } from 'Utils';

export const SkillsTable = () => {
  const { fetchEntries } = useContentfulClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['skills'],
    queryFn: () => fetchEntries<Skill>('skill', { order: '-fields.date' }),
    staleTime: Infinity,
  });

  return (
    <section className={styles.container}>
      <Title className={styles.title} type="h5" title="Key Skills" />

      {isLoading && <LoadingSpinner />}

      {!!error && <ErrorAlert error="Error retrieving skills list" />}

      {!isLoading && !error && (
        <Table>
          <TableBody>
            {data?.items?.map(item => (
              <TableRow key={item.sys.id}>
                <TableCell>{item.fields.skill}</TableCell>
                <TableCell className={styles.date}>{formatDuration(item.fields.date, new Date())}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );  
};