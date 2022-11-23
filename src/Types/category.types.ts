import Contentful from 'contentful';

export interface Category {
  linkedFrom: {
    entryCollection: {
      total: number;
    }
  }
  sys: Contentful.Sys;
  name: string;
}

export const CategoryQuery = `
  linkedFrom {
    entryCollection {
      total
    }
  }
  sys {
    id,
  }
  name
`;