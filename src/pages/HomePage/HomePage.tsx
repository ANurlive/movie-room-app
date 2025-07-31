import { HOME_PAGE_MESSAGES } from './messages';
import SearchBar from '../../components/SearchBar';
import MovieList from '../../components/MovieList';
import ErrorButton from '../../components/ErrorButton';
import Pagination from '../../components/Pagination';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import type { LoaderData } from '../../types/types';
import useLocalStorage from './useLocalStorage';

export default function HomePage() {
  const { movies, page, totalPages } = useLoaderData<LoaderData>();
  const navigate = useNavigate();
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
    // navigate(`/?query=${trimmedValue}`);
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCardClick = (id: number) => {
    const params = new URLSearchParams(searchParams);
    navigate(`/${id}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <h2 className="visually-hidden">{HOME_PAGE_MESSAGES.HEADING}</h2>

      <SearchBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        inputValue={inputValue}
      />
      <div className="flex gap-6">
        <section className={`${isDetailsOpen ? 'w-1/2' : 'w-full'}`}>
          <MovieList movieList={movies} handleCardClick={handleCardClick} />
          {movies.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              className=""
            />
          )}
          <ErrorButton className="flex justify-end" />
        </section>

        {isDetailsOpen && (
          <section className="w-1/2 relative">
            <Outlet />
          </section>
        )}
      </div>
    </div>
  );
}
