import { HOME_PAGE_MESSAGES } from './messages';
import SearchBar from '../../components/SearchBar';
import MovieList from '../../components/MovieList';
import ErrorButton from '../../components/ErrorButton';
import Pagination from '../../components/Pagination';
import { Outlet, useLoaderData, useSearchParams } from 'react-router-dom';
import type { LoaderData } from '../../types/types';
import useLocalStorage from './useLocalStorage';
import Flyout from '../../components/Flyout';

export default function HomePage() {
  const { movies, page, totalPages } = useLoaderData<LoaderData>();
  const { inputValue, setInputValue, saveValueToLS } = useLocalStorage();
  const [searchParams, setSearchParams] = useSearchParams();
  const isDetailsOpen = /^\/\d+/.test(location.pathname);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    saveValueToLS(trimmedValue);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('query', trimmedValue.toString());
    setSearchParams(newParams);
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h2 className="visually-hidden">{HOME_PAGE_MESSAGES.HEADING}</h2>

      <SearchBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        inputValue={inputValue}
      />
      <div className="flex gap-6">
        <section
          className={`flex flex-col gap-10 ${isDetailsOpen ? 'w-1/3' : 'w-full'} `}
        >
          <MovieList movieList={movies} compactCards={isDetailsOpen} />
          {movies.length > 0 && (
            <div className="flex flex-col items-center gap-10">
              <Flyout />
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                className=""
              />
            </div>
          )}
          <ErrorButton />
        </section>

        {isDetailsOpen && (
          <section className="relative w-2/3">
            <Outlet />
          </section>
        )}
      </div>
    </div>
  );
}
