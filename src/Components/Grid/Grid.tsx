import styles from './Grid.module.css';

interface GridProps {
  children: React.ReactNode;
}

export const Grid = ({ children }: GridProps) => {
  return (
    <section className={styles.grid}>
      {children}
    </section>
  );
};