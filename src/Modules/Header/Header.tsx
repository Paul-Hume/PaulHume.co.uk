import { DownloadBar } from 'Modules/DownloadBar';
import { NavBar } from 'Modules/NavBar';

import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.container}>
      <NavBar />
      <DownloadBar />
    </header>
  );
};