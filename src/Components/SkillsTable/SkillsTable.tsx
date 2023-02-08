import { Table, TableBody, TableCell, TableRow } from '@mui/material';

import { ErrorAlert,LoadingSpinner,Title } from 'Components';

import styles from './SkillsTable.module.css';

import { useSkills } from 'Hooks';
import { formatDuration } from 'Utils';

export const SkillsTable = () => {

  const { data, isLoading, error } = useSkills();

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