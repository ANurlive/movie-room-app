import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext/ThemeContext';

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="w-10 h-10 rounded-full border-2 ">
      {theme === 'dark' ? <Sun className="" /> : <Moon className="" />}
    </button>
  );
}
