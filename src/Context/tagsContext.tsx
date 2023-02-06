import { createContext, useCallback,useContext, useEffect, useMemo, useState } from 'react';
import { createClient, TagLink } from 'contentful';

import { useFetchContentful } from 'Hooks';
import { Tag } from 'Types/tag.types';

interface EntitiesResponse {
  [key: string]: {
    items: {
      contentfulMetadata: {
        tags: Tag[];
      }
    }[]
  }
}

export interface TagsContext {
  loadingTags: boolean;
  tags: Tag[];
  selectedTags: string[];
  updateSelectedTags: (category: string) => void;
  convertTagLinks: (tagLinks: TagLink[]) => Tag[];
}

const Tags = createContext<TagsContext>({
  loadingTags: false,
  tags: [],
  selectedTags: [],
  updateSelectedTags: () => {},
  convertTagLinks: () => [],
});

const TagsProvider = (props: object) => {
  const [loadingTags, setLoadingTags] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const apiCall = useFetchContentful();

  const contentfulClient = createClient({
    space: `${process.env.REACT_APP_SPACE}`,
    accessToken: `${process.env.REACT_APP_READ_ONLY_TOKEN}`,
  });

  const getTagCounts = async () => {
    const response: EntitiesResponse = await apiCall({
      query: `
      {
        projectCollection {
          items {
            contentfulMetadata {
              tags {
                id
              }
            }
          }
        }
        journalEntryCollection {
          items {
            contentfulMetadata {
              tags {
                id
              }
            }
          }
        }
        jobHistoryItemCollection {
          items {
            contentfulMetadata {
              tags {
                id
              }
            }
          }
        }
      }
      `
    });

    const entities = Object.keys(response).reduce((acc, key) => {
      const items = response[key].items;
      const tags = items.reduce((acc, item) => {
        const tags = item.contentfulMetadata.tags;
        return [...acc, ...tags];
      }, [] as Tag[]);
      return [...acc, ...tags];
    }, [] as Tag[]);

    // Count the unique tags in entities
    const tagCounts = entities.reduce((acc, tag) => {
      if (acc[tag.id as string]) {
        acc[tag.id as string] += 1;
      } else {
        acc[tag.id as string] = 1;
      }
      return acc;
    }
    , {} as { [key: string]: number });

    return tagCounts;
  };


  useEffect(() => {
    setLoadingTags(true);
    contentfulClient.getTags({
      entries: {
        
      },
    }).then(async (tagsResponse) => {
      const tagCounts = await getTagCounts();

      return tagsResponse.items.map((tag) => ({ id: tag.sys.id, name: tag.name, count: tagCounts[tag.sys.id] })).filter(tag => !tag.name.toLowerCase().includes('page'));
    }).then(response => {
      setTags(response);
    }).finally(() => setLoadingTags(false));

  // * Need this disabled because contentfulClient is not memoized
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const updateSelectedTags = useCallback((category: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
  }, []);

  const convertTagLinks = useCallback((tagLinks: TagLink[]): Tag[] => {
    return tagLinks.reduce((arr: Tag[], current: TagLink) => {
      const tag = tags.find((tag) => tag.id === current.sys.id);
      if (tag) {
        arr.push({
          ...tag,
          count: 0,
        });
      }
      return arr;
    }, []);
  }, [tags]);

  const value: TagsContext = useMemo(
    () => ({
      loadingTags,
      tags: tags.sort((a, b) => b.count - a.count),
      selectedTags,
      updateSelectedTags,
      convertTagLinks,
    }),
    [convertTagLinks, loadingTags, selectedTags, tags, updateSelectedTags],
  );

  return <Tags.Provider value={value} {...props} />;
};

const useTags = () => useContext(Tags);

export { TagsProvider, useTags };
