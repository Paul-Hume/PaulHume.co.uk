import { createContext, useCallback,useContext, useEffect, useMemo, useState } from 'react';
import { createClient } from 'contentful';

import { Tag } from 'Types/tag.types';

export interface TagsContext {
  tags: Tag[];
  selectedTags: string[];
  updateSelectedTags: (category: string) => void;
}

const Tags = createContext<TagsContext>({
  tags: [],
  selectedTags: [],
  updateSelectedTags: () => {},
});

const TagsProvider = (props: object) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const contentfulClient = createClient({
    space: `${process.env.REACT_APP_SPACE}`,
    accessToken: `${process.env.REACT_APP_READ_ONLY_TOKEN}`,
  });

  useEffect(() => {
    contentfulClient.getTags().then((response) => {    
      setTags(response.items.map((tag) => ({ id: tag.sys.id, name: tag.name })));
    });
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
      tags,
      selectedTags,
      updateSelectedTags,
    }),
    [selectedTags, tags, updateSelectedTags],
  );

  return <Tags.Provider value={value} {...props} />;
};

const useTags = () => useContext(Tags);

export { TagsProvider, useTags };
