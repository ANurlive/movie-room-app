import { useEffect, useRef, useState } from 'react';
import { LS_KEYS } from '../../constants/shared';
import { useNavigate, useSearchParams } from 'react-router-dom';

type Result = {
  inputValue: string;
  setInputValue: (value: string) => void;
  saveValueToLS: (inputValue: string) => void;
};

export default function useLocalStorage(): Result {
  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem(LS_KEYS.INPUT_VALUE) || ''
  );
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // I use `hasRun` to ensure this effect runs only once even though `searchParams` and `navigate` are in the deps.
  // Without it, the logic might re-run unnecessarily when the component updates.
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const saved = localStorage.getItem(LS_KEYS.INPUT_VALUE);
    if (saved && !searchParams.get('query')) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('query', saved);
      navigate(`?${newParams.toString()}`, { replace: true });
    }
  }, [navigate, searchParams]);

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
