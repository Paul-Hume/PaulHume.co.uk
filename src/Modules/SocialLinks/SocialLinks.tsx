import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';
import { Button } from '@mui/material';

import styles from './SocialLinks.module.css';

export const SocialLinks = () => {
  return (
    <section className={styles.container}>
      <Button color="inherit" startIcon={<LinkedIn />} href="https://www.linkedin.com/in/paulhume/" target="_blank">LinkedIn</Button>
      <Button color="inherit" startIcon={<GitHub />} href="https://github.com/Paul-Hume" target="_blank">GitHub</Button>
      <Button color="inherit" startIcon={<Twitter />} href="https://twitter.com/Paul_A_Hume" target="_blank">Twitter</Button>
    </section>
  );
};