import { createContext, useContext, useMemo, useState } from 'react';
import { Theme } from '@mui/material';

import { draculaTheme } from 'Themes/dracular';
import { lightOrangeTheme } from 'Themes/lightOrange';

type ThemeOptions = 'light' | 'dark';

export interface UiContext {
  theme: ThemeOptions;
  currentTheme: Theme;
  toggleTheme: () => void;
}

const Ui = createContext<UiContext>({
  theme: 'dark',
  currentTheme: draculaTheme,
  toggleTheme: () => {},
});

const UiProvider = (props: object) => {
  const [theme, setTheme] = useState<ThemeOptions>('dark');

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const currentTheme: Theme = useMemo(() => theme === 'dark' ? draculaTheme : lightOrangeTheme, [theme]);

  const value: UiContext = useMemo(
    () => ({
      theme,
      currentTheme,
      toggleTheme,
    }),
    [theme, currentTheme],
  );

  return <Ui.Provider value={value} {...props} />;
};

const useUi = () => useContext(Ui);

export { UiProvider, useUi };
