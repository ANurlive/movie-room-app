import { HOME_PAGE_MESSAGES } from './messages';
import SearchBar from '../../components/SearchBar';
import MovieList from '../../components/MovieList';
import useMovieLoader from './useLocalStorage';
import ErrorButton from '../../components/ErrorButton';
import Pagination from '../../components/Pagination';
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  type Location,
} from 'react-router-dom';
import type { LoaderData } from '../../types';
import { useEffect, useLayoutEffect, useRef } from 'react';

export default function HomePage() {
  const { movies, page, totalPages } = useLoaderData() as LoaderData;
  const navigate = useNavigate();
  const location = useLocation();
  const isDetailsOpen = /^\/\d+$/.test(location.pathname);
  const lastPageLocation = useRef<Location>(location);
  const scrollRef = useRef<number | null>(null);
  const { inputValue, setInputValue, saveValueToLS } = useMovieLoader();

  useEffect(() => {
    if (!isDetailsOpen) {
      lastPageLocation.current = location;
    }
  }, [isDetailsOpen, location]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveValueToLS(inputValue);
    navigate(`/search?query=${inputValue.trim()}`);
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleCardClick = (id: number) => {
    console.log(id);
    scrollRef.current = window.scrollY;
    navigate(`/${id}`);
  };

  useLayoutEffect(() => {
    if (scrollRef.current !== null) {
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollRef.current as number);
      });
    }
  }, []);

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
            <Outlet context={{ lastLocation: lastPageLocation }} />
          </section>
        )}
      </div>
    </div>
  );
}
