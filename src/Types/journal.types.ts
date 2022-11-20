import { Document } from '@contentful/rich-text-types';
import Contentful from 'contentful';

export interface JournalEntry {
  sys: Contentful.Sys;
  title: string;
  dateCreated: string;
  content: {
    json: Document;
  }
  project: {
    sys: Contentful.Sys;
  }
}