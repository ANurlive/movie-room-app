import { createContext, useContext } from 'react';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.DARK,
  toggleTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};
