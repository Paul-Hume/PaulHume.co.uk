import { createContext, useContext, useMemo, useState } from 'react';
import { Theme } from '@mui/material';

import { draculaTheme } from 'Themes/dracular';
import { lightOrangeTheme } from 'Themes/lightOrange';
import { getCookie, setCookie } from 'Utils';

export interface UiContext {
  theme: string;
  currentTheme: Theme;
  toggleTheme: () => void;
}

const Ui = createContext<UiContext>({
  theme: getCookie('theme') || 'dark',
  currentTheme: draculaTheme,
  toggleTheme: () => {},
});

const UiProvider = (props: object) => {
  const [theme, setTheme] = useState<string>(getCookie('theme') || 'dark');

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      setCookie('theme', next);
      return next;
    });
  };

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
