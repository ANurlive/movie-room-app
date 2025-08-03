import { LS_KEYS } from '../constants/shared';
import { Theme } from '../context/ThemeContext/ThemeContext';

export default function getInitTheme() {
  const saved = localStorage.getItem(LS_KEYS.THEME);
  return saved === Theme.DARK ? Theme.DARK : Theme.LIGHT;
}
