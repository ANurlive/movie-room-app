import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEYS.INPUT_VALUE);
    if (saved && !searchParams.get('query')) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('query', saved);
      navigate(`?${newParams.toString()}`, { replace: true });
    }

    //To set the initial value from localstorage only once

    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
