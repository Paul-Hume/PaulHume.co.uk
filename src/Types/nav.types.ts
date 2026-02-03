import { IconType } from 'Components/Icon/Icon';

export interface NavItem {
  id?: number;
  url: string;
  title: string;
  icon?: IconType;
  show: boolean;
  sortOrder: number;
}