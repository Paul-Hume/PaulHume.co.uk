import { createContext, useCallback,useContext, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TagLink } from 'contentful';
import { orderBy } from 'lodash';

import { useContentfulClient } from 'Hooks';
import { useTagCount } from 'Hooks/useTagCount/useTagCount';
import { Tag } from 'Types/tag.types';

export interface TagsContext {
  isLoading: boolean;
  error: boolean;
  tags: Tag[];
  selectedTags: string[];
  updateSelectedTags: (category: string) => void;
  convertTagLinks: (tagLinks: TagLink[]) => Tag[],
}

const Tags = createContext<TagsContext>({
  isLoading: false,
  error: false,
  tags: [],
  selectedTags: [],
  updateSelectedTags: () => {},
  convertTagLinks: () => [],
});

const TagsProvider = (props: object) => {
  const { fetchTags } = useContentfulClient();
  const { data: tagCount, isLoading: loadingTagCount, error: errorTagCount } = useTagCount();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data, isLoading, error } = useQuery({
    enabled: !loadingTagCount && !errorTagCount && Object.keys(tagCount).length > 0,
    queryKey: ['tags'],
    queryFn: fetchTags,
    staleTime: Infinity,
  });

  const updateSelectedTags = useCallback((category: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
  }, []);

  const sortedTags = useMemo((): Tag[] => {
    if (!data) return [];

    return orderBy(data.items.map(tag => ({ id: tag.sys.id, name: tag.name, count: tagCount[tag.sys.id], selected: selectedTags.includes(tag.sys.id) })), ['selected', 'count', 'name'], ['desc','desc', 'asc']);
  }, [data, selectedTags, tagCount]);

  const convertTagLinks = useCallback((tagLinks: TagLink[]): Tag[] => {
    return tagLinks.reduce((arr: Tag[], current: TagLink) => {
      const tag = sortedTags?.find((tag) => tag.id === current.sys.id);
      if (tag) {
        arr.push({
          ...tag,
          count: 0,
        });
      }
      return arr;
    }, []);
  }, [sortedTags]);

  const value: TagsContext = useMemo(
    () => ({
      isLoading: loadingTagCount || isLoading,
      error: !!error || errorTagCount,
      tags: sortedTags || [],
      selectedTags,
      updateSelectedTags,
      convertTagLinks,
    }),
    [loadingTagCount, isLoading, error, errorTagCount, sortedTags, selectedTags, updateSelectedTags, convertTagLinks],
  );

  return <Tags.Provider value={value} {...props} />;
};

const useTags = () => useContext(Tags);

export { TagsProvider, useTags };
