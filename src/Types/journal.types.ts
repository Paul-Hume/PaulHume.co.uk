import Contentful from 'contentful';

import { Tag } from './tag.types';
import { ItemContent, ItemSys } from './util.types';

export interface JournalEntryPartial {
  sys: ItemSys;
  contentfulMetadata: {
    tags: Tag[];
  };
  title: string;
  slug: string;
}

export interface JournalEntryFull extends JournalEntryPartial {
  content: ItemContent;
  project: {
    sys: Contentful.Sys;
    title: string;
  }
}