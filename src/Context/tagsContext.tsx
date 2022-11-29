import { createContext, useCallback,useContext, useEffect, useMemo, useState } from 'react';
import Contentful, {createClient} from 'contentful';

export interface TagsContext {
  tags: Contentful.Tag[];
  selectedTags: string[];
  updateSelectedTags: (category: string) => void;
}

const Tags = createContext<TagsContext>({
  tags: [],
  selectedTags: [],
  updateSelectedTags: () => {},
});

const TagsProvider = (props: object) => {
  const [tags, setTags] = useState<Contentful.Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const contentfulClient = createClient({
    space: `${process.env.REACT_APP_SPACE}`,
    accessToken: `${process.env.REACT_APP_READ_ONLY_TOKEN}`,
  });

  useEffect(() => {
    contentfulClient.getTags().then(response => {
      setTags(response.items);
    });
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
