import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext/ThemeContext';

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? (
        <Sun className="h-15 w-15" data-testid="sun" />
      ) : (
        <Moon className="w-15 h-15" data-testid="moon" />
      )}
    </button>
  );
}
