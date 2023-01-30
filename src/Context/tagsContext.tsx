import { createContext, useCallback,useContext, useEffect, useMemo, useState } from 'react';
import { createClient } from 'contentful';
import { sortBy } from 'lodash';

import { Tag } from 'Types/tag.types';

export interface TagsContext {
  loadingTags: boolean;
  tags: Tag[];
  selectedTags: string[];
  updateSelectedTags: (category: string) => void;
}

const Tags = createContext<TagsContext>({
  loadingTags: false,
  tags: [],
  selectedTags: [],
  updateSelectedTags: () => {},
});

const TagsProvider = (props: object) => {
  const [loadingTags, setLoadingTags] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const contentfulClient = createClient({
    space: `${process.env.REACT_APP_SPACE}`,
    accessToken: `${process.env.REACT_APP_READ_ONLY_TOKEN}`,
  });

  const priorityTags = [
    { name: 'React', sortOrder: 1 },
    { name: 'React Context', sortOrder: 2 },
    { name: 'ReactQuery', sortOrder: 3 },
  ];

  useEffect(() => {
    setLoadingTags(true);
    contentfulClient.getTags({
      entries: {
        
      },
    }).then((response) => {
      const modifiedTags = response.items.map((tag) => ({ id: tag.sys.id, name: tag.name, sortOrder: priorityTags.find(item => tag.name === item.name)?.sortOrder || 99 })).filter(tag => !tag.name.toLowerCase().includes('page'));

      setTags(sortBy(modifiedTags, ['sortOrder', 'name']));
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

  const value: TagsContext = useMemo(
    () => ({
      loadingTags,
      tags,
      selectedTags,
      updateSelectedTags,
    }),
    [loadingTags, selectedTags, tags, updateSelectedTags],
  );

  return <Tags.Provider value={value} {...props} />;
};

const useTags = () => useContext(Tags);

export { TagsProvider, useTags };
