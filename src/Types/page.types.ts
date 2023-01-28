import { ItemContent } from './util.types';

export interface PageSection {
  sys: {
    id: string;
  };
  showTitle: boolean;
  title: string;
  subTitle?: string;
  content: ItemContent;
}