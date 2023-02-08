import { Table, TableBody, TableCell,TableRow } from '@mui/material';

import { ErrorAlert, LoadingSpinner, NoDataAlert, Title } from 'Components';

import styles from './ExperiencePreview.module.css';

import { useExperience } from 'Hooks';

export const ExperiencePreview = () => {
  const { data, isLoading, error } = useExperience({ limit: 5 });

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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
};