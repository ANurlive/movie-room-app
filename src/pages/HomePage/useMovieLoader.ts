import { useCallback, useEffect, useState } from 'react';
import type { MovieItem } from '../../types';
import movieService from '../../services/movieAPIs';
import { LS_KEYS } from '../../constants';
import { ApiError } from '../../helpers/handleAPIErrors';
import { HOME_PAGE_MESSAGES } from './messages';

type ErrorType = number | 'unexpected' | null;

type UseMovieLoaderResult = {
  inputValue: string;
  setInputValue: (value: string) => void;
  movieList: MovieItem[];
  loading: boolean;
  error: ErrorType;
  setSearchValue: (searchValue: string) => void;
};

export default function useMovieLoader(): UseMovieLoaderResult {
  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem(LS_KEYS.INPUT_VALUE) || ''
  );
  const [searchValue, setSearchValue] = useState<string>(
    localStorage.getItem(LS_KEYS.INPUT_VALUE) || ''
  );
  const [movieList, setMovieList] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>(null);

  const loadContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    let movieList: MovieItem[];

    try {
      const finalValue = searchValue?.trim() ?? '';
      if (finalValue === '') {
        movieList = await movieService.getMoviesList();
      } else {
        localStorage.setItem(LS_KEYS.INPUT_VALUE, finalValue);
        movieList = await movieService.searchMovie(finalValue);
      }

      setMovieList(movieList);
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(error.serverMessage);
        setError(error.status);
      } else {
        console.log(HOME_PAGE_MESSAGES.UNEXPECTED_API_MESSAGE);
        setError('unexpected');
      }
    } finally {
      setLoading(false);
    }
  }, [searchValue]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return {
    inputValue,
    setInputValue,
    movieList,
    loading,
    error,
    setSearchValue,
  };
}
