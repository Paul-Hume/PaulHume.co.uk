import { Document } from '@contentful/rich-text-types';
import Contentful from 'contentful';

import { Tag } from './tag.types';

export interface JournalEntry {
  sys: {
    id: string;
    firstPublishedAt: string;
  };
  contentfulMetadata: {
    tags: Tag[];
  };
  title: string;
  slug: string;
  content: {
    json: Document;
  }
  project: {
    sys: Contentful.Sys;
    title: string;
  }
}

export const JournalEntryQuery = `
  sys {
    id
    firstPublishedAt
  }
  contentfulMetadata {
    tags {
      id
      name
    }
  }
  title
  slug
  content {
    json
  }
  project {
    ... on Project {
      sys {
        id
      }
      title
    }
  }
`;