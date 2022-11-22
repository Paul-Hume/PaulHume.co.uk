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
  categoriesCollection: {
    items: {
      sys: Contentful.Sys;
    }
  }
}

export const JournalEntryQuery = `
  sys {
    id
  }
  title
  content {
    json
  }
  project {
    sys {
      id
    }
  }
  categoriesCollection {
    items {
      sys {
        id
      }
    }
  }
`;