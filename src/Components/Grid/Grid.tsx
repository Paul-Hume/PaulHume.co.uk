import styles from './Grid.module.css';

interface GridProps {
  children: React.ReactNode;
  minWidth?: number;
}

export const Grid = ({ children, minWidth = 300 }: GridProps) => {
  return (
    <section className={styles.grid} style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, 1fr))` }}>
      {children}
    </section>
  );
};