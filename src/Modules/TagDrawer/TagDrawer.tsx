import { Drawer } from '@mui/material';

import { SideBar } from 'Modules/SideBar';

import styles from './TagDrawer.module.css';

interface TagDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const TagDrawer = ({ open, onClose }: TagDrawerProps) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className={styles.container}>
        <SideBar />
      </div>
    </Drawer>
  );
};