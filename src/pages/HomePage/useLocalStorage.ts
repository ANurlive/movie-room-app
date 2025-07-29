import { useState } from 'react';
import { LS_KEYS } from '../../constants';

type Result = {
  inputValue: string;
  setInputValue: (value: string) => void;
  saveValueToLS: (inputValue: string) => void;
};
export default function useLocalStorage(): Result {
  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem(LS_KEYS.INPUT_VALUE) || ''
  );

  const saveValueToLS = (inputValue: string) => {
    const trimmed = inputValue.trim();
    localStorage.setItem(LS_KEYS.INPUT_VALUE, trimmed);
  };

  return {
    inputValue,
    setInputValue,
    saveValueToLS,
  };
}
