import { NavBar } from 'Modules/NavBar';

import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.container}>
      <h1>paulhume.co.uk</h1>
      <NavBar />
    </header>
  );
};