export const SysQuery = `
  sys {
    id
    firstPublishedAt
  }
`;

export const MetaDataQuery = `
  contentfulMetadata {
    tags {
      id
      name
    }
  }
`;

export const ContentQuery = `
  content {
    json
    links {
      assets {
        block {
          ${SysQuery}
          title
          url
        }
      }
    }
  }
`;