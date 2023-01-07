import { Document } from '@contentful/rich-text-types';

export interface PageSection {
  sys: {
    id: string;
  };
  showTitle: boolean;
  title: string;
  subTitle?: string;
  content: {
    json: Document;
  }
}