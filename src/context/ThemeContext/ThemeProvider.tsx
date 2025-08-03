import { useEffect, useState } from 'react';
import { Theme, ThemeContext } from './ThemeContext';
import { LS_KEYS } from '../../constants/shared';
import getInitTheme from '../../helpers/getInitTheme';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getInitTheme());

  useEffect(() => {
    localStorage.setItem(LS_KEYS.THEME, theme);
    document.documentElement.classList.toggle(Theme.DARK, theme === Theme.DARK);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
