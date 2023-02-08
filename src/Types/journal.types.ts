import Contentful from 'contentful';

import { ProjectItem } from './project.types';

export interface JournalEntryItem {
  title: Contentful.EntryFields.Text;
  slug: Contentful.EntryFields.Text;
  image: Contentful.Asset;
  content: Contentful.EntryFields.RichText;
  project: Contentful.Entry<ProjectItem>;
}