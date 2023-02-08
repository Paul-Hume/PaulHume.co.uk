import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Theme } from '@mui/material';
import { createClient } from 'contentful';

import { draculaTheme } from 'Themes/dracular';
import { lightTheme } from 'Themes/light';
import { getCookie, setCookie } from 'Utils';

export interface UiContext {
  theme: string;
  currentTheme: Theme;
  toggleTheme: () => void;
  profileImage?: string;
}

const Ui = createContext<UiContext>({
  theme: getCookie('theme') || 'dark',
  currentTheme: draculaTheme,
  toggleTheme: () => {},
});

const UiProvider = (props: object) => {
  const [theme, setTheme] = useState<string>(getCookie('theme') || 'dark');
  const [profileImage, setProfileImage] = useState<string>('');

  const contentfulClient = createClient({
    space: `${process.env.REACT_APP_SPACE}`,
    accessToken: `${process.env.REACT_APP_READ_ONLY_TOKEN}`,
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      setCookie('theme', next);
      return next;
    });
  };

  useEffect(() => {
    contentfulClient.getAsset('7eVoW9cfu0vsZ7Ayi6jyn6').then(asset => {
      const url = asset?.fields?.file?.url;
      if (url) {
        setProfileImage(url);
      }
    });
  }, [contentfulClient]);


  const currentTheme: Theme = useMemo(() => theme === 'dark' ? draculaTheme : lightTheme, [theme]);

  const value: UiContext = useMemo(
    () => ({
      theme,
      currentTheme,
      toggleTheme,
      profileImage,
    }),
    [theme, currentTheme, profileImage],
  );

  return <Ui.Provider value={value} {...props} />;
};

const useUi = () => useContext(Ui);

export { UiProvider, useUi };
