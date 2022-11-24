import { createContext, useCallback,useContext, useMemo, useState } from 'react';

export interface CategoriesContext {
  selectedCategories: string[];
  updateSelectedCategories: (category: string) => void;
}

const Categories = createContext<CategoriesContext>({
  selectedCategories: [],
  updateSelectedCategories: () => {},
});

const CategoriesProvider = (props: object) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const updateSelectedCategories = useCallback((category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
  }, []);

  const value: CategoriesContext = useMemo(
    () => ({
      selectedCategories,
      updateSelectedCategories,
    }),
    [selectedCategories, updateSelectedCategories],
  );

  return <Categories.Provider value={value} {...props} />;
};

const useCategories = () => useContext(Categories);

export { CategoriesProvider, useCategories };
