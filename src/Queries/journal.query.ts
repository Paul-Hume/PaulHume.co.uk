import { ContentQuery, MetaDataQuery, SysQuery } from './util.query';

export const JournalEntryPartialQuery = `
  ${SysQuery}
  ${MetaDataQuery}
  title
  slug
`;

export const JournalEntryFullQuery = `
  ${JournalEntryPartialQuery}
  ${ContentQuery}
  project {
    ... on Project {
      sys {
        id
      }
      title
    }
  }
`;